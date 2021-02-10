(function() {
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';
    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    
    var productItemTemplate = '<li><div class="item">' +
        '<div class="result-thumb"><a href="{{url}}"><img onError="lgkorUI.addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
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
    var eventItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb">' +
            '<div>' +
                '<img onError="lgkorUI.addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}">' +
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
    var storyItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb"><div><img onError="lgkorUI.addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}">{{#if isVideo}}<span class="video-play-btn"><span class="hidden">동영상</span></span>{{/if}}</div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="desc"><span>{{desc}}</span></div>' +
                    '<div class="info-btm">' +
                        '<span class="text date"><span>{{date}}</span>' +
                        '<div class="text hashtag-wrap">' +
                            '{{#each item in hash}}<span class="hashtag"><span>#</span>{{item}}</span>{{/each}}' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';
    var additionalItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="result-thumb"><div><img onError="lgkorUI.addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}"></div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{sku}}</div>' +
                    '<div class="info-btm">' +
                        '<div class="text model">{{desc}}</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="info-price">' +
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
            '</div>' +
        '</div>' +
    '</a></li>';
    var shopItemTemplate = '<li><div class="item">' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">' +
                    '{{#each item in flag}}<span class="flag {{item.class}}">{{item.title}}</span>{{/each}}' +
                '</div>' +
                '<div class="result-tit">' +
                    '<a href="{{url}}">{{#raw title}}</a>' +
                '</div>' +
                '<div class="result-detail">' +
                    '<div href="{{url}}" class="shop-info">' +
                        '<a href="{{url}}" class="desc add">{{address}}</a>' +
                        '<a href="{{url}}" class="desc time">{{time}}</a>' +
                    '</div>' +
                    '<div class="shop-state"><span class="{{shopStateColor}}">{{shopState}}</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="btn-area">' +
                '{{#each item in linkItem}}<a href="{{item.url}}" class="btn border size"><span>{{item.title}}</span></a>{{/each}}' +
            '</div>' +
        '</div>' +
    '</div></li>';
    var customerProductItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="result-thumb">' +
            '<div><img onError="lgkorUI.addImgErrorEvent(this)" src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
        '</div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{sku}}</div>' +
                    '<div class="info-btm">' +
                        '{{#each item in category}}<span class="text">{{item}}</span>{{/each}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>'
    var customerDownloadItemTemplate = '<li><div class="item">' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit">' +
                    '<a href="{{url}}">{{#raw title}}</a>' +
                    '<a href="{{url}}" class="cs">' +
                        '<span class="cs-inner">' +
                            '{{#each (item, index) in category}}{{#if index != 0}}>{{/if}}<span>{{item}}</span>{{/each}}' +
                        '</span>' +
                        '{{#if desc}}<span class="cs-inner">{{desc}}</span>{{/if}}' +
                    '</a>' +
                '</div>' +
                '<div class="result-detail"><div class="info-btm">' +
                    '<span class="text">{{date}}</span>' +
                    '{{#each item in hash}}<span class="text">{{item}}</span>{{/each}}' +
                '</div></div>' +
            '</div>' +
            '{{#if linkItem}}<div class="btn-area">' +
                '{{#each item in linkItem}}<button type="button" class="btn border size" data-file-url="{{item.url}}"><span>{{item.title}}</span></button>{{/each}}' +
            '</div>{{/if}}' +
            '{{#if isVideo}}<div class="video-info"><span class="hidden">동영상 포함</span></div>{{/if}}' +
        '</div>' +
    '</div></li>';

    var searchBnrTemplate = 
        '<a href="{{url}}">'+
            '<img data-pc-src="{{pcImage}}" data-m-src="{{mobileImage}}" alt="{{title}}">'+
            '<div class="text-area">'+
                '<strong class="title">{{#raw title}}</strong>'+
                '<span class="sub-copy">{{#raw desc}}</span>'+
            '</div>'+
        '</a>';

    $(window).ready(function() {
        var search = {
            init: function() {
                var self = this;
                vcui.require(['ui/tab'], function () {
                    self.setting();
                    self.updateRecentSearchList();
                    self.bindEvents();
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

                //배너
                self.$searchBanner = self.$contentsSearch.find('div.search-banner');

                //검색 결과 - 카테고리
                self.$searchResultCategory = self.$contentsSearch.find('div.search-result-category');
                //카테고리 더보기 버튼
                self.$searchResultCategoryMore = self.$searchResultCategory.find('a.btn-moreview');

                //cont-wrap
                self.$contWrap = self.$contentsSearch.find('div.cont-wrap');
                self.$listSorting = self.$contWrap.find('div.list-sorting');

                //noData용
                self.$searchNotResult = self.$contentsSearch.find('div.search-not-result');
                self.$resultListNoData = self.$contWrap.find('div.result-list-wrap.list-no-data');
            },

            sendSearchPage: function(searchUrl, search, force) {
                if(searchUrl) {
                    var fi = searchUrl.indexOf('?');
                    var url = searchUrl + ((fi<0) ? "?" : "&") +"search="+search+"&force="+force;
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
                
                //카테고리 더보기 클릭
                self.$searchResultCategoryMore.on('click', function(e){
                    e.preventDefault();
                    if(self.$searchResultCategory.hasClass('on')) {
                        self.$searchResultCategory.removeClass('on');
                        self.$searchResultCategoryMore.find('span').text('더보기');
                    } else {
                        self.$searchResultCategory.addClass('on');
                        self.$searchResultCategoryMore.find('span').text('접기');
                    }
                });

                //전체검색 항목별 더보기 클릭
                var $searchResult = self.$contWrap.find('div.search-result-wrap.all');
                $searchResult.find('div.result-list-wrap').on('click', 'a.btn-link',function(e){
                    e.preventDefault();
                    var _id = $(this).attr('href').replace("#", "");
                    self.getTabItembyCategoryID(_id).trigger('click');
                });

                //메뉴얼, 드라이버 등의 파일 다운로드
                var $resultListWrap = $searchResult.find('div.result-list-wrap');
                $resultListWrap.on('click','div.btn-area button',function(e){
                    var url = $(this).attr('data-file-url');
                    if(!(!url)) {
                        window.location = url;
                        /*
                        var a = document.createElement("a");
                        a.href = url;
                        document.body.appendChild(a); //firefox
                        a.click();
                        a.remove();
                        */
                    }
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
                    self.$listSorting.show();
                } else {
                    self.$listSorting.hide();
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
/*
            getSearchResultWrap:function(index) {
                var self = this;
                return self.$contWrap.find('div.search-result-wrap:eq(' + index +')');
            },
*/
            setTabCount:function(index, count) {
                var self = this;
                var $tab_li = self.getTabItembyIndex(index).parent();
                if(count > 0) {
                    $tab_li.find('span').text("("+vcui.number.addComma(count)+")");
                    $tab_li.show();
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
                    self.sendSearchPage(tab.attr('href'),value,false);
                });
            },

            //전체 검색
            requestSearchData:function(value, force) {
                var self = this;
                var ajaxUrl = self.getTabItembySelected().attr('data-search-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value, "force":force}, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;
                    var param = result.param;

                    var searchedValue = param.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

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

                    //noData체크

                    //nodata Test
                    /*
                    data.count = null;
                    data.category = null;
                    data.product = null;
                    data.event = null;
                    data.story = null;
                    data.additional = null;
                    data.shop = null;
                    data.customer = null;
                    */
                   
                    var noData = true;
                    var count = self.checkCountData(data);
                    self.setTabCount(0, data.allCount);
                    if(count > 0) {
                        noData = false;
                    }

                    self.$contWrap.removeClass('w-filter');
                    var $searchResult = self.$contWrap.find('div.search-result-wrap');

                    //카테고리 리스트 갱신
                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$searchResultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text}));
                        });
                        self.$searchResultCategory.show();
                        noData = false;
                    } else {
                        self.$searchResultCategory.hide();
                    }

                    self.$searchResultCategory.removeClass('on');
                    self.$searchResultCategoryMore.find('span').text('더보기');

                    //센터 배너
                    if(data.searchBanner) {
                        self.$searchBanner.html(vcui.template(searchBnrTemplate, data.searchBanner));
                        self.$searchBanner.show();
                    } else {
                        self.$searchBanner.hide();
                    }

                    //제품/케어솔루션
                    var $resultListWrap = $searchResult.find('div.result-list-wrap:eq(0)');
                    arr = self.checkArrayData(data.product);
                    count = self.checkCountData(data.product);
                    self.setTabCount(1, count);
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
                    $resultListWrap = $searchResult.find('div.result-list-wrap:eq(1)');
                    arr = self.checkArrayData(data.event);
                    count = self.checkCountData(data.event);
                    self.setTabCount(2, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                            item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                            $list_ul.append(vcui.template(eventItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //스토리
                    $resultListWrap = $searchResult.find('div.result-list-wrap:eq(2)');
                    arr = self.checkArrayData(data.story);
                    count = self.checkCountData(data.story);
                    self.setTabCount(3, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                            $list_ul.append(vcui.template(storyItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //케어용품/소모품
                    $resultListWrap = $searchResult.find('div.result-list-wrap:eq(3)');
                    arr = self.checkArrayData(data.additional);
                    count = self.checkCountData(data.additional);
                    self.setTabCount(4, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                            $list_ul.append(vcui.template(additionalItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //센터매장
                    $resultListWrap = $searchResult.find('div.result-list-wrap:eq(4)');
                    arr = self.checkArrayData(data.shop);
                    count = self.checkCountData(data.shop);
                    self.setTabCount(5, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            $list_ul.append(vcui.template(shopItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //고객지원
                    $resultListWrap = $searchResult.find('div.result-list-wrap:eq(5)');
                    arr = self.checkArrayData(data.customer);
                    count = self.checkCountData(data.customer);
                    self.setTabCount(6, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            if(item.type=="product") {
                                $list_ul.append(vcui.template(customerProductItemTemplate, item));
                            } else {
                                item.isVideo = !item.isVideo?false:true;
                                item.linkItem = !item.linkItem ? [] : item.linkItem;
                                $list_ul.append(vcui.template(customerDownloadItemTemplate, item));
                            }
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    //noData 체크
                    if(noData) {
                        //self.$tab.hide();
                        //self.$contWrap.hide();
                        self.$resultListNoData.show();
                        self.$searchNotResult.find('em').text('“' + searchedValue + '”');
                        self.$searchNotResult.show();
                    } else {
                        //self.$tab.show();
                        //self.$contWrap.show();
                        self.$resultListNoData.hide();
                        self.$searchNotResult.hide();
                    }

                    //검색어 저장
                    self.$contentsSearch.attr('data-search-value',searchedValue);
                    self.$contentsSearch.attr('data-search-force',force);
                    //최근검색어 저장
                    if(!noData) {
                        self.addRecentSearcheText(searchedValue);
                    }

                    //self.getTabItembyIndex(tabIndexAll).trigger('click');
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
        }

        search.init();
    });
})();