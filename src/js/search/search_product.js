(function() {
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';
    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    
    var productItemTemplate = '<li><div class="item">' +
        '<div class="result-thumb"><a href="{{url}}"><img onError="lgkorUI._addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><a href="{{url}}">{{#raw title}}</a></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{sku}}</div>' +
                    '<div class="review-info">' +
                        '<a href="{{url}}">' +
                            '{{#if hasReview}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
                            '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div>' +
                            '<div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' + 
                        '</a>' +
                    '</div>' +
                    '<div class="info-btm">' +
                        '<div class="text hashtag-wrap">' +
                            '{{#each item in hash}}<span class="hashtag"><span>#</span>{{item}}</span>{{/each}}' +
                        '</div>' + 
                        '{{#if hasCare}}<span class="text careflag">케어십 가능</span>{{/if}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="info-price">' +
                '<a href="#">' +
                    '<div class="price-info rental">' +
                        '{{#if ((price || originalPrice) && carePrice)}}<p class="tit">케어솔루션</p>{{/if}}{{#if carePrice}}<span class="price"><em>월</em> {{carePrice}}<em>원</em></span>{{/if}}' +
                    '</div>' +
                    '<div class="price-info sales">' +
                        '<div class="original">' +
                            '{{#if originalPrice}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                        '</div>' +
                        '<div class="price-in">' +
                            '{{#if (carePrice && price)}}<p class="tit">구매</p>{{/if}}{{#if price}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                        '</div>' +
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>' +
    '</div></li>';

    //필터 템플릿
    var filterSliderTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont"><div class="range-wrap">' +
                '<div name="{{filterId}}" class="ui_filter_slider ui_price_slider" data-range="0,{{length}}" data-values="{{filterValues}}" data-min="{{minFilterValue}}" data-max="{{maxFilterValue}}"></div>' +
                '<p class="min range-num">{{minTitle}}</p><p class="max range-num">{{maxTitle}}</p>' +
            '</div></div>' +
        '</div>' +
    '</li>';
    var filterRadioTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="rdo-wrap">' +
                    '<input type="radio" name="{{filterId}}" value="{{item.filterValueId}}" id="rdo-{{filterId}}-{{idx}}" {{#if idx==0}}checked{{/if}}>' +
                    '<label for="rdo-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterColorTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap-colorchip {{item.topFilterDisplayName}}">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="color-{{filterId}}-{{idx}}">' +
                    '<label for="color-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterCheckboxTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
        '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="chk-{{filterId}}-{{idx}}">' +
                    '<label for="chk-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';

    $(window).ready(function() {
        var search = {
            init: function() {
                var self = this;
                vcui.require(['ui/tab', 'ui/pagination', 'ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {
                    self.setting();
                    self.updateRecentSearchList();
                    self.bindEvents();

                    self.filterSetting();
                    self.filterBindEvents();
                    
                    //입력된 검색어가 있으면 선택된 카테고리로 값 조회
                    var value = self.$contentsSearch.attr('data-search-value');
                    value = !value ? null : value.trim(); 
                    var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));
                    if(!(!value) && value.length > 1) {
                        //현재 선택된 카테고리 기준으로 검색
                        self.setinputSearchValue(value);
                        self.requestSearchData(value, force);
                    }
                });
            },

            setting: function() {
                var self = this;

                //최근 검색어 저장 최대수
                self.maxSaveRecentKeyword = 5;
                //최소 검색어 글자수
                self.minLength = 2;
                //타이머
                self.searchTimer = null;
                //타이머 검색 딜레이
                self.searchDelay = 2000;

                //통합검색 레이어
                self.$contentsSearch = $('div.contents.search');
                //탭
                self.$tab = self.$contentsSearch.find('.ui_tab').vcTab();
                self.tabInstance = self.$tab.vcTab('instance');
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

            bindEvents: function() {
                var self = this;

                self.$tab.on("tabchange", function(e, data){
                    var index = data.selectedIndex;
                    var $li = self.$tab.find('li a:eq("'+index+'")');
                    var href = $li.attr('href');

                    var value = self.$contentsSearch.attr('data-search-value');
                    value = !value ? null : value.trim(); 
                    var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));

                    var url = href + "&search="+value+"&force="+force;
                    location.href = url;
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

                self.$buttonSearchFixed.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearchInput(searchVal);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(self.searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < self.minLength) {
                        self.$searchKeywordArea.show();
                        self.$autoComplete.hide();
                        self.$notResult.hide();
                        self.openSearchInputLayer(true);
                    } else {
                        self.searchTimer = setTimeout(function() {
                            self.requestSearchAutoComplete(searchVal);
                        }, self.searchDelay);
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
                    self.requestSearchData(searchVal, true);
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
                    var postData = self.getDataFromFilter();
                    postData.page = data;
                    self.requestSearch(postData);
                });

                //스크롤 이벤트
                $(window).on('scroll', function(e){
                    self._setScrollMoved();
                });
                self._setScrollMoved();
                
            },

            _setScrollMoved: function() {
                var self = this;
                var scrolltop = $(window).scrollTop();
                if((self.$contWrap.offset().top - 110) < scrolltop) {
                    self.$listSorting.addClass('fixed');
                } else {
                    self.$listSorting.removeClass('fixed');
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
                } else {
                    $tab_li.hide();
                }
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
                    var arr = data instanceof Array ? data : [];
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
                        self.$notResult.hide();
                    } else {
                        //검색결과를 표시할것이 없을경우
                        self.$autoComplete.hide();
                        self.$notResult.show();
                    }
                    self.openSearchInputLayer(true);
                });
            },

            //검색버튼 검색
            requestSearchInput:function(value) {
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-search-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                    self.openSearchInputLayer(false);
                    var data = result.data;
                    //검색어 저장
                    self.$contentsSearch.attr('data-search-value',value);
                    self.$contentsSearch.attr('data-search-force',false);
                    var tab = self.getTabItembyCategoryID(data.category);
                    var url = tab.attr('href') + "&search="+value;
                    location.href= url;
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
                    Object.assign(postData,filterQueryData);
                    //postData.filter = JSON.stringify(filterQueryData);
                }

                lgkorUI.requestAjaxData(ajaxUrl, postData, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;
                    var param = result.param;

                    var searchedValue = param.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //검색내 검색어 세팅
                    self.$searchResult.find('div.search-inner input').attr('data-searchvalue', param.searchIn).val(param.searchIn);
                    self.$layFilter.find('div.search-inner input').val(param.searchIn);

                    //검색한 검색어
                    self.$searchResultText.html(replaceText + ' 검색 결과');

                    //원래입력된 기존 검색어 이동
                    var inputValue = param.inputValue;
                    if(inputValue && inputValue != searchedValue) {
                        self.$similarText.text('“' + inputValue + '” 검색 결과로 이동').attr('href','#'+inputValue);
                        self.$similarText.show();
                    } else {
                        self.$similarText.hide();
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
                    } else {
                        self.$relatedKeywordList.hide();
                    }

                    self.$relatedKeywordList.removeClass('open');

                    //nodata Test
                    //data.count = null;
                    //data.product = null;

                    var noData = true;
                    var count = self.checkCountData(data);
                    self.setTabCount(0, data.count);
                    if(count > 0) {
                        noData = false;
                    }

                    //self.$contWrap.removeClass('w-filter');
                    //var $searchResult = self.$contWrap.find('div.search-result-wrap');

                    //필터세팅
                    if(!filterSearch) {
                        self.setFilter();
                        self.updateFilter(data.filterList);
                    }

                    //리스트 세팅
                    var $resultListWrap = self.$searchResult.find('div.result-list-wrap:eq(0)');
                    arr = self.checkArrayData(data.product);
                    count = self.checkCountData(data.product);
                    self.setTabCount(1, count);
                    self.$searchResult.find('p.list-count').text('총 '+vcui.number.addComma(count)+'개');
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                            $list_ul.append(vcui.template(productItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //이벤트/기획전
                    count = self.checkCountData(data.event);
                    self.setTabCount(2, count);

                    //스토리
                    count = self.checkCountData(data.story);
                    self.setTabCount(3, count);

                    //케어용품/소모품
                    count = self.checkCountData(data.additional);
                    self.setTabCount(4, count);

                    //센터매장
                    count = self.checkCountData(data.shop);
                    self.setTabCount(5, count);

                    //고객지원
                    count = self.checkCountData(data.customer);
                    self.setTabCount(6, count);

                    //noData 체크
                    if(noData) {
                        self.$contWrap.removeClass('w-filter');
                        self.$resultListNoData.show();
                        self.$searchNotResult.show();

                        self.$pagination.hide();
                        self.$recommendListBox.hide();
                        self.$layFilter.hide();
                        self.$btnFilter.hide();
                    } else {
                        self.$resultListNoData.hide();
                        self.$searchNotResult.hide();

                        self.$pagination.show();
                        self.$recommendListBox.show();
                        self.$btnFilter.show();
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

                });
            },

            //최근 검색어 삭제
            removeRecentSearcheText:function(text) {
                var self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }

                var findIndex = $.inArray(text, searchedList);
                if(findIndex >= 0) {
                    searchedList.splice(findIndex, 1);
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                self.updateRecentSearchList();
            },

            //최근 검색어 추가
            addRecentSearcheText:function(text) {
                if(!text || text.length < 1) return;
                var self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }
                var findIndex = $.inArray(text, searchedList);
                if(findIndex < 0) {
                    searchedList.push(text);
                    if(searchedList.length > self.maxSaveRecentKeyword) {
                        searchedList.shift();
                    }
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                self.updateRecentSearchList();
            },

            //최근 검색어 리스트 갱신
            updateRecentSearchList:function() {
                var self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                var arr = searchedList instanceof Array ? searchedList : [];
                var $list_ul = self.$recentKeywordList.find('div.keyword-list ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recentItemTemplate, {"text":item}));
                    });
                    //self.$recentKeywordList.show();
                    self.$recentKeywordList.find('div.no-data').hide();
                } else {
                    //self.$recentKeywordList.hide();
                    self.$recentKeywordList.find('div.no-data').show();
                }
            },


            ///필터 관련 메쏘드

            //필터 세팅
            setFilter:function(data) {
                var self = this;
                self.$contWrap.addClass('w-filter');
                self.$layFilter.css('display', '');
                self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);
            },

            filterSetting: function() {
                var self = this;
                self.$layFilter.find('.ui_filter_slider').vcRangeSlider();
                self.$layFilter.find('.ui_order_accordion').vcAccordion();
                self.$layFilter.find('.ui_filter_accordion').vcAccordion();
            },

            //커스텀 필터 이벤트 (필터 리스트를 새로 그리면 매번 실행할것)
            filterBindCustomEvents: function() {
                var self = this;
                // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
                self.$layFilter.find('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged', function (e, data) {
                    $(e.currentTarget).siblings('.min').text(vcui.number.addComma(data.minValue.title));
                    $(e.currentTarget).siblings('.max').text(vcui.number.addComma(data.maxValue.title));
                    if(e.type=='rangesliderchanged'){
                        $(this).attr({'data-min':data.minValue.value,'data-max':data.maxValue.value})
                        self.requestSearch(self.getDataFromFilter());
                    }
                });
            },

            filterUnbindCustomEvents: function() {
                var self = this;
                // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
                self.$layFilter.find('.ui_filter_slider').off('rangesliderinit rangesliderchange rangesliderchanged');
            },

            //필터 이벤트 (한번만 실행할것)
            filterBindEvents: function() {
                var self = this;

                // 필터 아코디언 오픈시 슬라이더 업데이트
                self.$layFilter.on('accordionexpand', '.ui_filter_accordion',function(e,data){
                    if(data.content.find('.ui_filter_slider').length > 0) {
                        data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                    }   
                });

                // 필터안 체크박스 이벤트 처리
                self.$layFilter.on('change', '.ui_filter_accordion input', function(e){
                    $parent = $(this).parents('li');
                    var length = $parent.find('input:checked').length;
                    $parent.find('span.sel_num').text('('+length+')');
                    self.requestSearch(self.getDataFromFilter());
                });

                // 모바일 필터박스 열기
                $('div.btn-filter a').on('click', function(e){
                    e.preventDefault();
                    self.$layFilter.addClass('open');
                    self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);
                });

                // 모바일 필터박스 닫기
                $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                    e.preventDefault();
                    self.$layFilter.removeClass('open');
                });

                // 모바일 필터박스 확인
                self.$layFilter.find('div.filter-btn-wrap button.ui_confirm_btn').on('click', function(e){
                    self.$layFilter.removeClass('open');
                    self.requestSearch(self.getDataFromFilter());
                });

                // 초기화버튼 이벤트 처리
                self.$layFilter.on('click', 'div.btn-reset button', function(e){
                    self.resetFilter();
                    self.requestSearch(self.getDataFromFilter());
                });

                //품절상품 확인
                self.$listSorting.on('change', 'input[type="checkbox"]', function(e){
                    self.requestSearch(self.getDataFromFilter());
                });

                //리스트 정렬 선택시 필터의 정렬 값도 선택하게함
                self.$listSorting.find('.ui_selectbox').on('change', function(e,data){
                    var value = e.target.value;
                    self.$layFilter.find('input[name="sorting"][value="'+ value +'"]').prop('checked', true);
                    self.requestSearch(self.getDataFromFilter());

                });

                // 필터의 정렬 선택시 리스트의 정렬값도 선택하게 함
                self.$layFilter.find('.ui_order_accordion div.ui_accord_content').on('change', 'input[name="sorting"]',function(e){
                    var idx = $('input[name="sorting"]').index(this);
                    var $target = self.$searchResult.find('div.list-sorting .ui_selectbox');
                    $target.vcSelectbox('selectedIndex', idx, false);
                    self.requestSearch(self.getDataFromFilter());
                });

                //검색내 검색 버튼
                self.$listSorting.find('div.search-inner button').on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    $input.attr('data-searchvalue', searchIn);
                    self.requestSearch(self.getDataFromFilter());
                });

                //필터의 검색내 검색 버튼
                self.$layFilter.find('div.search-inner button').on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    var $target = self.$searchResult.find('div.search-inner input');                    
                    $target.attr('data-searchvalue', searchIn);
                    self.requestSearch(self.getDataFromFilter());
                });

                self.filterBindCustomEvents();
            },

            getDataFromFilter: function() {
                var self = this;
                var $btnFilter = self.$searchResult.find('div.btn-filter');
                
                var data = {};
                self.$listSorting.find('input').each(function(idx, el){
                    switch(el.type) {
                        case "checkbox":
                            data[el.name] = el.checked;
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

                var filterData = {};
                var selectedFilter = false;
                self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                    var $el = $(el);
                    var values = JSON.parse($el.attr('data-values'));
                    var min = $el.attr('data-min');
                    var max = $el.attr('data-max');
                    var tempArray = values.slice(min,parseInt(max)+1).map(function(a) {return a.filterValue;});
                    if(tempArray.length != values.length) {
                        selectedFilter = true;
                        filterData[$el.attr('name')] = tempArray;
                    }
                });

                self.$layFilter.find('.ui_filter_accordion input').each(function(idx, el){
                    if(el.checked) {
                        if(!(el.value == null || el.value.trim().length == 0)) {
                            var tempArray = filterData[el.name];
                            if(!tempArray) {
                                tempArray = [];
                            }
                            tempArray.push(el.value);
                            filterData[el.name] = tempArray;
                            selectedFilter = true;
                        }
                    }
                });
                
                if(selectedFilter) {
                    $btnFilter.addClass('applied');
                    $btnFilter.find('a span').text('옵션 적용됨');
                    self.$layFilter.find('div.btn-reset button').show();
                } else {
                    $btnFilter.removeClass('applied');
                    $btnFilter.find('a span').text('옵션필터');
                    self.$layFilter.find('div.btn-reset button').hide();
                }

                data["filterData"] = JSON.stringify(filterData);

                return data;
            },

            updateFilter: function(data) {
                var self = this;
                
                var arr = data instanceof Array ? data : [];
                if(arr.length > 0) {

                    self.filterUnbindCustomEvents();

                    var $list_ul = self.$layFilter.find('div.ui_filter_accordion > ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        item.index = index;
                        var length = item.filterList instanceof Array ? item.filterList.length : 0;
                        item.length = (length > 0) ? (length - 1) : 0;
                        switch(item.filterType) {
                            case "range":
                                hasSlider = true;
                                item.filterValues.forEach(function(obj, idx){
                                    obj.value = idx;
                                    obj.filterValue = obj.filterValueId;
                                    obj.title = obj.filterValueName;
                                    item.maxTitle = obj.title;
                                    item.maxFilterValue = ""+idx;
                                    if(idx == 0) {
                                        item.minTitle = obj.title;
                                        item.minFilterValue = "0";
                                    }
                                });
                                item.filterValues = JSON.stringify(item.filterValues);
                                $list_ul.append(vcui.template(filterSliderTemplate, item));
                                break;
                            case "radio":
                                $list_ul.append(vcui.template(filterRadioTemplate, item));
                                break;
                            case "color":
                                $list_ul.append(vcui.template(filterColorTemplate, item));
                                break;
                            case "checkbox":
                                $list_ul.append(vcui.template(filterCheckboxTemplate, item));
                                break;
                        }
                    });
                }

                self.filterBindCustomEvents();

                //필터를 초기화 했으니 필터리셋버튼 숨김
                self.$layFilter.find('div.btn-reset button').hide();
            },

            resetFilter: function() {
                var self = this;

                //필터 정렬박스
                self.$layFilter.find('input[name="sorting"]:eq(0)').prop('checked', true);
                //리스트 정렬박스
                var $target = self.$listSorting.find('.ui_selectbox');
                $target.vcSelectbox('selectedIndex', 0, false);

                //솔드아웃 버튼
                self.$listSorting.find('input[type="checkbox"]').prop('checked', false);

                //검색내 검색어
                self.$listSorting.find('div.search-inner input').attr('data-searchvalue', '').val('');
                self.$layFilter.find('div.search-inner input').val('');

                //필터 슬라이더
                self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                    var $el = $(el);
                    var values = JSON.parse($el.attr('data-values'));
                    var min = 0;
                    var max = values.length - 1;
                    $el.attr('data-min',min);
                    $el.attr('data-max',max);
                    $el.vcRangeSlider('reset',min+','+max);
                });

                //필터 라디오버튼
                self.$layFilter.find('.ui_filter_accordion input[type="radio"]:eq(0)').each(function(idx, el){
                    $(el).prop('checked', true);
                });

                //필터 체크박스
                self.$layFilter.find('.ui_filter_accordion input[type="checkbox"]').each(function(idx, el){
                    $(el).prop('checked', false);
                });
            },
        }

        search.init();
    });
})();