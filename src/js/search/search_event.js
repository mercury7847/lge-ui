if ('scrollRestoration' in history) {
    //BTOCSITE-2216 뒤로가기로 페이지 진입했을때 강제 스크롤이동을 위한 히스토리 스크롤값 수동으로 변경
    history.scrollRestoration = 'manual';
}

(function() {
    //자동완성
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    //최근검색어
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}" data-contents="최근 검색어">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;
    //연관검색어
    var relatedItemTemplate = '<li><a href="#{{text}}" data-contents="연관 검색어">{{text}}</a></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;
    //인기검색어
    var popularItemTemplate = '<li><a href="#{{text}}" data-contents="인기 검색어">{{index}}.{{text}}</a></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;
    //var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    
    var productItemTemplate = '<li><div class="item{{#if obsFlag!="Y"}} discontinued{{/if}}" data-ec-product="{{ga}}">' +
        '<div class="result-thumb"><a href="{{url}}"><img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="detail-wrap">' +
                    '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                    '<div class="result-tit"><a href="{{url}}">{{#raw title}}</a></div>' +
                    '<div class="result-detail">' +
                        '<div class="sku">{{#raw sku}}</div>' +
                        '<div class="review-info">' +
                            '{{#if review > 0}}' +
                            '<a href="{{url}}">' +
                                '<div class="star is-review"><span class="blind">리뷰있음</span></div>' +
                                '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div>' +
                                '<div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' + 
                            '</a>' +
                            '{{/if}}' +
                        '</div>' +
                            /* BTOCSITE-3404 검색, PLP > 얼음정수기냉장고 1년무상케어 태그 추가 건*/
                            '<div class="info-btm">' +
                            '<div class="care">'+
                            '{{#if ctypeCnt > 0 && !rentalFlag}}<span class="text careflag">케어십 가능</span>' +
                            '{{#if (subCategoryId == "CT50000070")}}<span class="care-n"></span><span class="redcare-option">1년 무상케어</span>{{/if}}' + '{{/if}}' +
                            '</div>'+
                            /* BTOCSITE-3404 검색, PLP > 얼음정수기냉장고 1년무상케어 태그 추가 건*/
                            '<div class="text hashtag-wrap">' +
                                '{{#each item in hash}}<span class="hashtag"><span>#</span>{{item}}</span>{{/each}}' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '{{#if techSpecs && techSpecs.length > 0}}' +
                    '<div class="spec-info"><ul>' +
                        '{{#each item in techSpecs}}' +
                            '<li><span>{{item.SPEC_NAME}}</span>{{#raw item.SPEC_VALUE_NAME}}</li>' +
                        '{{/each}}' +
                    '</ul></div>' +
                '{{/if}}' +
            '</div>' +
            '{{#if obsFlag=="Y" || rentalTabFlag=="Y"}}' +
            '<div class="info-price">' +
                '<a href="{{url}}">' +
                    '{{#if rentalTabFlag=="Y" && carePrice != "0"}}' +
                    '<div class="price-info rental">' +
                        '<p class="tit">케어솔루션</p><span class="price"><em>월</em> {{carePrice}}<em>원</em></span>' +
                    '</div>' +
                    '{{/if}}' +
                    '<div class="price-info sales">' +
                    '{{#if obsFlag=="Y"}}' +
                        '<div class="original">' +
                            '{{#if originalPrice != "0"}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                        '</div>' +
                        '<div class="price-in">' +
                            '{{#if price != "0"}}<p class="tit">구매</p><span class="price">{{price}}<em>원</em></span>{{/if}}' +
                        '</div>' +
                    '{{/if}}' +
                    '</div>' +
                '</a>' +
            '</div>' +
            '{{/if}}' +
        '</div>' +
    '</div></li>';
    var eventItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb">' +
            '<div>' +
                '<img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}">' +
                '{{#if isEnd}}<span class="flag-end-wrap"><span class="flag">종료</span></span>{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="info-btm">' +
                        '<span class="text date">{{startDate}} ~ {{endDate}}</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';

    var serviceLinkTemplate = 
        '<ul>'+
            '{{#each item in serviceLinkers}}'+ 
            '<li><a href="{{item.url}}" target="{{item.target}}" class="btn-text"><span>{{item.title}}</span><img src="{{item.image}}" alt="{{item.title}}"></a></li>'+
            '{{/each}}'+
        '</ul>';

    $(window).ready(function() {
        var search = {
            init: function() {
                var self = this;
                self.uniqId = vcui.getUniqId(8);
                $(window).scrollTop(0); //BTOCSITE-2216
                
                vcui.require(['ui/pagination', 'ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {
                    self.setting();
                    self.updateRecentSearchList();
                    self.bindEvents();
                    self.savedFilterData = null;
                    
                    self.filterLayer = new FilterLayer(self.$layFilter, null, self.$listSorting, self.$btnFilter, null, function (data) {
                        if(self.savedFilterData) {
                            var category1 = self.getCategoryFromFilter(self.savedFilterData.filterData);
                            var category2 = self.getCategoryFromFilter(data.filterData);
                            if(!category1) category1 = [];
                            if(!category2) category2 = [];
                            var diffCat = vcui.array.different(category1,category2);
                            if(diffCat.length > 0) {
                                if(category2 && category2.length > 0) {
                                    data.filterData = JSON.stringify({"sourcetype":category2});
                                } else {
                                    data.filterData =  JSON.stringify({});
                                }
                            }
                        }
                        self.savedFilterData = JSON.parse(JSON.stringify(data));
                        self.requestSearch(self.makeFilterData(data));
                    });

                    var hash = location.hash.replace("#","");
                    var savedData = lgkorUI.getStorage(hash);
                    if(savedData && savedData.search) {
                        self.savedFilterData = JSON.parse(JSON.stringify(savedData));
                        if(self.savedFilterData.filterData) {
                            var filterData = JSON.parse(self.savedFilterData.filterData);
                            var str;
                            for (key in filterData) {
                                str = filterData[key];
                                filterData[key] = str.split("||");
                            }
                            self.savedFilterData.filterData =  JSON.stringify(filterData);
                        }
                        if(savedData.href) self.scrollHref = savedData.href;
                        if(savedData.search) self.$inputSearch.val(savedData.search);
                        self.requestSearchData(savedData.search,savedData.force,savedData, true);
                    } else {
                        //입력된 검색어가 있으면 선택된 카테고리로 값 조회
                        var value = self.$contentsSearch.attr('data-search-value');
                        value = !value ? null : value.trim();
                        var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));
                        if(!(!value)) {
                            //현재 선택된 카테고리 기준으로 검색
                            self.setinputSearchValue(value);
                            var filterQueryData = self.getListSortingData();
                            self.requestSearchData(value, force, filterQueryData, true);
                        }
                    }

                    self.updateBasicData();
                });
            },

            getCategoryFromFilter: function(filterData) {
                if(!filterData) return null;
                var filterData = JSON.parse(filterData);
                var category = filterData["sourcetype"];
                return category ? category : [];
            },

            makeFilterData: function(data) {
                var filterdata = JSON.parse(data.filterData);
                var makeData = {};
                for(key in filterdata) {
                    makeData[key] = filterdata[key].join("||");
                }
                data.filterData = JSON.stringify(makeData);
                return data;
            },

            makeProductGAData: function(item) {
                var param = {
                    "model_name":item.modelDisplayName,
                    "model_id":item.modelId,
                    "model_sku":item.salesModelCode + '.' + item.salesSuffixCode,
                    "model_gubun":(item.rentalTabFlag == "Y" && item.obsFlag == "N") ? "케어솔루션" : "일반제품",
                    "rental_price":(item.carePrice && item.carePrice > 0) ? item.carePrice : "",
                    "price":(item.originalPrice && item.originalPrice > 0) ? item.originalPrice : "",
                    "discounted_price":(item.price && item.price > 0) ? item.price : "",
                    "brand":"LG",
                    "category":item.superCategoryName + "/" + item.categoryName
                }
                return JSON.stringify(param);
            },
            
            setting: function() {
                var self = this;

                //타이머
                self.searchTimer = null;

                //통합검색 레이어
                self.$contentsSearch = $('div.contents.search');
                //탭
                self.$tab = self.$contentsSearch.find('.ui_tab').vcTab();
                
                //input-keyword
                self.$inputKeyword = self.$contentsSearch.find('div.input-keyword:eq(0)');
                //검색어 입력input
                self.$inputSearch = self.$inputKeyword.find('div.input-sch input.txt');
                //스크롤 fixed 검색어 입력창
                var inputSearchFixed = self.$contentsSearch.find('div.input-keyword:eq(1)');
                self.$inputSearchFixed = inputSearchFixed.find('div.input-sch input.txt');

                //검색버튼
                self.$buttonSearch = self.$inputKeyword.find('div.input-sch button.btn-search');
                self.$buttonSearchFixed = inputSearchFixed.find('div.input-sch button.btn-search');

                //검색어 리스트 레이어
                self.$searchInputLayer = self.$inputKeyword.find('div.search-input-layer');
                //검색어 리스트 공간
                self.$searchKeywordArea = self.$searchInputLayer.find('div.search-keyword-area');
                //최근 검색어 리스트
                self.$recentKeywordList = self.$searchKeywordArea.find('div.recent-keyword');
                //인기 검색어 리스트
                self.$popularKeywordList = self.$searchKeywordArea.find('div.popular-keyword');
                //자동 완성 리스트
                self.$autoComplete = self.$searchInputLayer.find('div.auto-complete');
                //검색어 결과 없음
                self.$notResult = self.$searchInputLayer.find('div.not-result');
                //검색어 리스트 닫기 버튼
                self.buttonClose = self.$searchInputLayer.find('button.btn-close');

                //연관검색어 리스트
                self.$relatedKeywordList = self.$contentsSearch.find('div.related-keyword');
                //모바일용 연관검색어 펼치기 버튼
                self.$relatedKeywordMobileMoreButton = self.$relatedKeywordList.find('div.mobile-more-btn');
                //검색어 검색 결과
                self.$searchSimilar = self.$contentsSearch.find('div.search-similar');
                //검색한 검색어
                self.$searchResultText = self.$searchSimilar.find('div.search-result-text');
                //원래입력된 기존 검색어 이동
                self.$similarText = self.$searchSimilar.find('a.similar-text');

                self.$autoComplete.hide();
                self.$notResult.hide();

                //cont-wrap
                self.$contWrap = self.$contentsSearch.find('div.cont-wrap');
                self.$searchResult = self.$contWrap.find('div.search-result-wrap');
                self.$listSorting = self.$searchResult.find('div.list-sorting');
                
                //필터
                self.$layFilter = self.$contWrap.find('div.lay-filter');
                //모바일 필터열기버튼
                self.$btnFilter = self.$contWrap.find('div.btn-filter');

                //추천상품 recommend-list-box
                self.$recommendListBox = self.$contWrap.find('div.recommend-list-box');

                //페이지
                self.$pagination = self.$contWrap.find('div.pagination');
                self.$pagination.vcPagination();

                //noData용
                self.$searchNotResult = self.$contentsSearch.find('div.search-not-result');
                self.$resultListNoData = self.$contWrap.find('div.result-list-wrap.list-no-data');
            },

            getListSortingData: function() {
                var self = this;
                var data = {};
                self.$listSorting.find('input').each(function(idx, el){
                    switch(el.type) {
                        case "checkbox":
                            data[el.name] = el.checked ? "Y" : "N";
                            break;
                        case "text":
                            var value = $(el).attr('data-searchValue');
                            if(value) {
                                data[el.name] = value;
                            }
                            break;
                        default:
                            break;
                    }
                });

                self.$listSorting.find('.ui_selectbox').each(function(idx, el){
                    data[el.name] = $(el).vcSelectbox('selectedOption').value;
                });
                return data;
            },

            sendSearchPage: function(searchUrl, search, force) {
                if(searchUrl) {
                    var fi = searchUrl.indexOf('?');
                    var url = searchUrl + ((fi<0) ? "?" : "&") +"search="+encodeURIComponent(search)+"&force="+force;
                    location.href = url;
                }
            },

            bindEvents: function() {
                var self = this;

                self.$tab.on("tabchange", function(e, data){
                    var index = data.selectedIndex;
                    var $li = self.$tab.find('li a:eq("'+index+'")');
                    var href = $li.attr('href');

                    var value = self.$contentsSearch.attr('data-search-value');
                    value = !value ? null : value.trim(); 
                    var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));

                    self.sendSearchPage(href,value,force);
                });

                //검색어 창 동기화
                self.$inputSearch.on("input change", function(e) {
                    self.$inputSearchFixed.val($(this).val()).trigger("update");
                });
                self.$inputSearchFixed.on("input change", function(e) {
                    self.$inputSearch.val($(this).val()).trigger("update");
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearchInput(searchVal);
                });

                self.$inputSearch.keydown(function(key) {
                    if (key.keyCode == 13) {
                        key.preventDefault();
                        self.$buttonSearch.trigger('click');
                    }
                });

                self.$buttonSearchFixed.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearchInput(searchVal);
                });

                self.$inputSearchFixed.keydown(function(key) {
                    if (key.keyCode == 13) {
                        key.preventDefault();
                        self.$buttonSearchFixed.trigger('click');
                    }
                });
                
                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(self.searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < lgkorUI.SEARCH_AUTOCOMPLETE_MIN_LENGTH) {
                        self.$searchKeywordArea.show();
                        self.$autoComplete.hide();
                        self.$notResult.hide();
                        self.openSearchInputLayer(true);
                    } else {
                        self.searchTimer = setTimeout(function() {
                            self.requestSearchAutoComplete(searchVal);
                        }, lgkorUI.SEARCH_AUTOCOMPLETE_TIMER);
                    }
                });

                //검색어 리스트 닫기 버튼
                self.buttonClose.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    self.openSearchInputLayer(false);
                    self.$inputSearch.focus();
                });

                //최근검색어 클릭
                self.$recentKeywordList.on('click', 'div.keyword-list ul li span a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //최근검색어 삭제 클릭
                self.$recentKeywordList.on('click', 'div.keyword-list ul li span button', function(e){
                    var text = $(this).siblings('a').first().attr('href').replace("#", "");
                    self.removeRecentSearcheText(text);
                });

                //인기검색어 클릭
                self.$popularKeywordList.on('click', 'div.keyword-list ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //자동완성 리스트 클릭
                self.$autoComplete.on('click', 'div.keyword-list ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //연관검색어 리스트 클릭
                self.$relatedKeywordList.on('click', 'ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //기존입력 검색어 클릭
                self.$similarText.on('click', function(e){
                    e.preventDefault();
                    clearTimeout(self.searchTimer);
                    var searchVal = $(this).attr('href').replace("#", "");
                    self.setinputSearchValue(searchVal);
                    //현재 선택된 카테고리 기준으로 검색
                    var filterQueryData = self.getListSortingData();
                    self.requestSearchData(searchVal, true, filterQueryData, true);
                });

                //연관검색어 펼치기
                self.$relatedKeywordMobileMoreButton.on('click', 'a', function(e){
                    e.preventDefault();
                    if(self.$relatedKeywordList.hasClass('open')) {
                        self.$relatedKeywordList.removeClass('open');
                    } else {
                        self.$relatedKeywordList.addClass('open');
                    }
                });

                //페이지
                self.$pagination.on('page_click', function(e, data) {
                    //기존에 입력된 데이타와 변경된 페이지로 검색
                    var postData = self.makeFilterData(self.filterLayer.getDataFromFilter());
                    postData.page = data;
                    self.requestSearch(postData);
                });

                //검색 이동 로그 쌓기
                $('ul.result-list').on('click', 'a', function(e){
                    self.sendLog(this);
                    //리스트 아이템 이동후 back했을 경우 기억했다가 이동하기 위함
                    var href = $(this).attr('href');
                    if(href){
                        //extend
                        var scrollTop = $(document).scrollTop();
                        lgkorUI.setStorage(self.uniqId, {"href":scrollTop}, true);
                        location.hash = self.uniqId;
                    }
                });
                
                //리사이즈 체크
                $(window).on('resizeend', function(e){   
                    self.updateRelatedKeywordMoreButton();
                });

                //스크롤 이벤트
                $(window).on('scroll', function(e){
                    self._setScrollMoved();
                });
                self._setScrollMoved();
                
            },

            sendLog: function(dm) {
                var self = this;
                var search = self.$contentsSearch.attr('data-search-value');
                var index = $(dm).parents('.result-list-wrap').data('logIndex');
                var param = {
                    "index":index,
                    "linkUrl":dm.href,
                    "search":search
                };
                var ajaxUrl = self.$contentsSearch.data('logUrl');
                if(ajaxUrl) {
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, null, true);
                }
            },

            _setScrollMoved: function() {
                var self = this;
                var scrolltop = $(window).scrollTop();
                if((self.$contWrap.offset().top - 110) < scrolltop) {
                    self.$listSorting.addClass('fixed');
                } else {
                    self.$listSorting.removeClass('fixed');
                    self.$listSorting.show();
                }
            },

            //검색어 검색창에 입력하기 (fixed와 같이 동기화 하기 위함)
            setinputSearchValue:function(val) {
                var self = this;
                self.$inputSearch.val(val).change();
            },

            //검색어창에 입력후 검색
            searchItem:function($item) {
                var self = this;
                var searchVal = $item.attr('href').replace("#", "");
                self.setinputSearchValue(searchVal);
                self.$buttonSearch.trigger('click');
            },

            openSearchInputLayer: function(open) {
                var self = this;
                if(open) {
                    self.updateRecentSearchList();
                    self.$searchInputLayer.show();
                    self.$inputKeyword.addClass('focus-on');

                } else {
                    self.$searchInputLayer.hide();
                    self.$inputKeyword.removeClass('focus-on');
                }
            },

            checkCountData:function(item) {
                return item ? (item.count ? item.count : 0) : 0;
            },

            checkSubCountData:function(item) {
                return item ? (item.subcount ? item.subcount : 0) : 0;
            },

            checkArrayData:function(item) {
                return item ? (item.data instanceof Array ? item.data : []) : [];
            },

            getTabItembySelected:function() {
                var self = this;
                return self.$tab.find('ul li.on a');
            },

            getTabItembyIndex:function(index) {
                var self = this;
                var idx = parseInt(index) + 0;
                return self.$tab.find('ul li:eq('+idx+') a');
            },

            getTabItembyCategoryID:function(_id) {
                var self = this;
                return self.$tab.find('ul li a[data-category-id='+_id+']');
            },

            setTabCount:function(index, count) {
                var self = this;
                var $tab_li = self.getTabItembyIndex(index).parent();
                if(count > 0) {
                    $tab_li.find('span').text("("+vcui.number.addComma(count)+")");
                    $tab_li.show();
                    self.$tab.parents('.search-tabs-wrap').show();
                } else {
                    $tab_li.hide();
                }
                self.$tab.vcSmoothScroll('update');
            },

            //검색어 입력중 검색
            requestSearchAutoComplete:function(value) {
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-autocomplete-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                    var param = result.param;
                    var data = result.data;

                    var searchedValue = param.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';
                    
                    var showAutoComplete = false;

                    //자동완성 리스트 갱신
                    var arr = (data && data.listData instanceof Array) ? data.listData : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$autoComplete.find('div.keyword-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":vcui.string.replaceAll(item, searchedValue, replaceText)}));
                        });
                        showAutoComplete = true;
                    }

                    self.$searchKeywordArea.hide();
                    if(showAutoComplete) {
                        //검색결과가 있는 경우.
                        self.$autoComplete.show();
                        //self.$notResult.hide();
                        self.openSearchInputLayer(true);
                    } else {
                        //검색결과를 표시할것이 없을경우
                        self.$autoComplete.hide();
                        //self.$notResult.show();
                        self.openSearchInputLayer(false);
                    }
                });
            },

            //검색버튼 검색
            requestSearchInput:function(value) {
                //BTOCSITE-91 검색 바로가기 개발요청
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-search-url');
                
                lgkorUI.requestAjaxData('/search/searchKeyword.lgajax', {"keyword":value}, function(result) {
                    if(result.data && result.data.success == 'Y' && result.data.url) {
                        if(result.data.linkTarget == 'self') {
                            location.href = result.data.url;
                        } else {
                            window.open(result.data.url,'_blank');
                        }
                    } else {
                        lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                            self.openSearchInputLayer(false);
                            var data = result.data;
                            //검색어 저장
                            self.$contentsSearch.attr('data-search-value',value);
                            self.$contentsSearch.attr('data-search-force',false);
                            var tab = self.getTabItembyCategoryID(data.category);
                            self.sendSearchPage(tab.attr('href'),value,false);
                        });
                    }
                });
            },

            //필터 검색
            requestSearch:function(filterQueryData) {
                var self = this;
                var value = self.$contentsSearch.attr('data-search-value').trim();
                var force = self.$contentsSearch.attr('data-search-force');
                self.requestSearchData(value,force,filterQueryData, true);
            },
            
            //검색
            requestSearchData:function(value, force, filterQueryData, filterSearch) {
                var self = this;
                var ajaxUrl = self.getTabItembySelected().attr('data-search-url');

                var postData = {"search":value, "force":force};
                if(!filterQueryData) {
                    //postData.filter = null;
                } else {
                    //Object.assign(postData,filterQueryData);
                    $.extend(postData,filterQueryData);
                    //postData.filter = JSON.stringify(filterQueryData);
                }

                lgkorUI.setStorage(self.uniqId, postData);
                location.hash = self.uniqId;
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, postData, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;
                    var param = result.param;

                    var searchedValue = param.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //검색내 검색어 세팅
                    if(self.$listSorting.find('div.search-inner input').length > 0) {
                        self.$listSorting.find('div.search-inner input').attr('data-searchvalue', param.searchIn).val(param.searchIn);
                    }

                    if(self.$layFilter.find('div.search-inner input').length > 0) {
                        self.$layFilter.find('div.search-inner input').val(param.searchIn);
                    }

                    //검색한 검색어
                    self.$searchResultText.html('<span class="search-word">“<em class="word">' + searchedValue + '</em>”</span>' + ' 검색 결과');

                    //원래입력된 기존 검색어 이동
                    var inputValue = param.inputValue;
                    if(inputValue && inputValue != searchedValue) {
                        self.$similarText.text('“' + inputValue + '” 검색 결과로 이동').attr('href','#'+inputValue);
                        self.$searchSimilar.show();
                    } else {
                        self.$searchSimilar.hide();
                    }

                    //연관 검색어 리스트 갱신
                    var arr = data.related instanceof Array ? data.related : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$relatedKeywordList.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(relatedItemTemplate, {"text":item}));
                        });
                        self.$relatedKeywordList.show();

                        self.updateRelatedKeywordMoreButton();
                    } else {
                        self.$relatedKeywordList.hide();
                    }

                    self.$relatedKeywordList.removeClass('open');

                    //nodata Test
                    //data.count = null;
                    //data.event = null;

                    var noData = true;
                    var count = self.checkCountData(data);
                    self.setTabCount(0, data.allCount);
                    /*
                    if(count > 0) {
                        noData = false;
                    }
                    */

                    //필터세팅
                    var filterShow = false;
                    if(data.filterList && data.filterList.length > 0) {
                        filterShow = true;
                        self.filterLayer.updateFilter(data.filterList);
                        //모바일일 경우 필터섹션이 2개 이하이면 모두 열어둔다
                        if(vcui.detect.isMobile){
                            self.filterLayer.openFilterSectionAll(2);
                        }
                        
                        if(self.savedFilterData && self.savedFilterData.filterData) {
                            var filterData = JSON.parse(self.savedFilterData.filterData);
                            self.filterLayer.resetFilter(filterData);
                        }
                    }

                    //리스트 세팅
                    var $resultListWrap = self.$searchResult.find('div.result-list-wrap:eq(0)');
                    arr = self.checkArrayData(data.event);
                    count = self.checkCountData(data.event);
                    self.setTabCount(4, count);
                    var subcount = self.checkSubCountData(data.event);
                    if(subcount) {
                        self.$searchResult.find('p.list-count').text('총 '+vcui.number.addComma(subcount)+'개').show();
                    } else {
                        self.$searchResult.find('p.list-count').hide();
                    }
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                            item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                            item.isEnd = lgkorUI.stringToBool(item.isEnd);
                            $list_ul.append(vcui.template(eventItemTemplate, item));
                        });
                        $resultListWrap.show();
                        //self.$listSorting.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                        //self.$listSorting.hide();
                    }

                    //제품
                    count = self.checkCountData(data.product);
                    self.setTabCount(1, count);

                    //케어용품/소모품
                    count = self.checkCountData(data.additional);
                    self.setTabCount(2, count);

                    //스토리
                    count = self.checkCountData(data.story);
                    self.setTabCount(3, count);

                    //센터매장
                    count = self.checkCountData(data.shop);
                    self.setTabCount(5, count);

                    //고객지원
                    count = self.checkCountData(data.customer);
                    self.setTabCount(6, count);

                    //추천 제품
                    /*
                    self.$recommendListBox.empty();
                    if(data.recommendList && data.recommendList.length){
                        self.$recommendListBox.append(vcui.template(recommendProdTemplate, {recommendList: data.recommendList}))
                    }
                    */

                    //서비스 링크
                    $('.service-link, .mobile-service-link').empty();
                    if(data.serviceLinkers && data.serviceLinkers.length){
                        $('.service-link').append(vcui.template(serviceLinkTemplate, {serviceLinkers: data.serviceLinkers}));
                        $('.mobile-service-link').append(vcui.template(serviceLinkTemplate, {serviceLinkers: data.serviceLinkers}));
                    }

                    //noData 체크
                    if(noData) {
                        if(data.noDataList && (data.noDataList instanceof Array)) {
                            var $list_ul = self.$resultListNoData.find('ul.result-list');
                            $list_ul.empty();
                            var $div = $("<div/>");
                            data.noDataList.forEach(function(item, index) {
                                if(!item.hash) {
                                    item.hash = [];
                                }
                                if(item.techSpecs) {
                                    item.techSpecs.forEach(function(obj, index) {
                                        obj.SPEC_VALUE_NAME = $div.html(obj.SPEC_VALUE_NAME).text();
                                    });
                                }
                                item.ga = self.makeProductGAData(item);
                                item.price = item.price ? vcui.number.addComma(item.price) : null;
                                item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                                item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                                item.rentalFlag = lgkorUI.stringToBool(item.rentalFlag);
                                item.ctypeCnt = item.ctypeCnt ? parseInt(item.ctypeCnt) : 0;
                                $list_ul.append(vcui.template(productItemTemplate, item));
                            });
                            if(data.noDataList.length > 0) {
                                self.$resultListNoData.show();
                            } else {
                                self.$resultListNoData.hide();
                            }
                        } else {
                            self.$resultListNoData.hide();
                        }
                        self.$searchNotResult.show();

                        self.$pagination.hide();
                        self.$recommendListBox.hide();
                        self.$contWrap.removeClass('w-filter');
                        self.$layFilter.hide();
                        self.$btnFilter.hide();
                        //
                        //정렬 셀렉트 박스
                        self.$listSorting.find('.sort-select-wrap').hide();
                    } else {
                        //self.$tab.parents('.search-tabs-wrap').show();
                        //self.$tab.vcSmoothScroll('refresh');
                        self.$resultListNoData.hide();
                        self.$searchNotResult.hide();

                        self.$pagination.show();
                        self.$recommendListBox.show();
                        if(filterShow) {
                            self.$contWrap.addClass('w-filter');
                            self.$layFilter.css('display', '');
                        }
                        self.$btnFilter.show();
                        //
                        self.$listSorting.find('.sort-select-wrap').show();
                    }

                    //페이지
                    self.$pagination.vcPagination('setPageInfo', param.pagination);

                    //검색어 저장
                    self.$contentsSearch.attr('data-search-value',searchedValue);
                    self.$contentsSearch.attr('data-search-force',force);
                    //최근검색어 저장
                    if(!noData) {
                        self.addRecentSearcheText(searchedValue);
                    }

                    var $selectTab = self.getTabItembySelected();
                    self.$tab.vcSmoothScroll('scrollToElement',$selectTab[0],0);

                    if(self.scrollHref) {
                        // $(window).scrollTop(self.scrollHref);
                        // self.scrollHref = null;
                        // BTOCSITE-2216
                        if( $('.result-list img').last().length ) {
                            $('.result-list img').last().on('load', function(){
                                $('html,body').stop().animate({scrollTop: self.scrollHref});
                                self.scrollHref = null;
                            });
                        } else {
                            $('html,body').stop().animate({scrollTop: self.scrollHref});
                            self.scrollHref = null;
                        }
                    }
                });
            },

            //연관검색어 더보기 버튼 노출 여부 체크
            updateRelatedKeywordMoreButton:function () {
                var self = this;
                var $list_ul = self.$relatedKeywordList.find('ul');
                var $li = $list_ul.find('>li:eq(0)');
                if($li.length > 0 && $list_ul.height() > $li.outerHeight(true)) {
                    self.$relatedKeywordMobileMoreButton.show();
                } else {
                    self.$relatedKeywordMobileMoreButton.hide();
                }    
            },

            //최근 검색어 삭제
            removeRecentSearcheText:function(text) {
                var self = this;
                /*
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }

                var findIndex = $.inArray(text, searchedList);
                if(findIndex >= 0) {
                    searchedList.splice(findIndex, 1);
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                */
                lgkorUI.removeCookieArrayValue(lgkorUI.INTERGRATED_SEARCH_VALUE, text)
                self.updateRecentSearchList();
            },

            //최근 검색어 추가
            addRecentSearcheText:function(text) {
                if(!text || text.length < 1) return;
                var self = this;
                /*
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }
                var findIndex = $.inArray(text, searchedList);
                if(findIndex < 0) {
                    //searchedList.push(text);
                    searchedList.unshift(text);
                    if(searchedList.length > self.maxSaveRecentKeyword) {
                        //searchedList.shift();
                        searchedList.pop();
                    }
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                self.updateRecentSearchList();
                */
                lgkorUI.addCookieArrayValue(lgkorUI.INTERGRATED_SEARCH_VALUE, text, lgkorUI.MAX_SAVE_RECENT_KEYWORD);
                self.updateRecentSearchList();
            },

            //최근 검색어 리스트 갱신
            updateRecentSearchList:function() {
                var self = this;
                //var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                var cookieValue = lgkorUI.getCookie(lgkorUI.INTERGRATED_SEARCH_VALUE);
                var searchedList = cookieValue ? cookieValue.split('|') : [];
                //searchedList = vcui.array.reverse(searchedList);
                
                var arr = searchedList instanceof Array ? searchedList : [];
                var $list_ul = self.$recentKeywordList.find('div.keyword-list ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recentItemTemplate, {"text":item}));
                    });
                    self.$recentKeywordList.show();
                    self.$recentKeywordList.find('div.no-data').hide();
                } else {
                    self.$recentKeywordList.hide();
                    self.$recentKeywordList.find('div.no-data').show();
                }
            },

            //기초 데이타 갱신
            updateBasicData:function() {
                var self = this;
                var ajaxUrl = self.$contentsSearch.data('basicUrl');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                    var data = result.data;
                    //인기검색어
                    var arr = (data.popular && data.popular instanceof Array) ? data.popular : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$popularKeywordList.find('div.keyword-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(popularItemTemplate, {"text":item, "index":index+1}));
                        });
                        self.$popularKeywordList.show();
                    } else {
                        self.$popularKeywordList.hide();
                    }
                });
            },
        }

        search.init();
    });
})();