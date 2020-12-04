(function() {
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';
    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    //var similarTextTemplate = '<a href="#{{text}}" class="similar-text"><span class="search-word">“{{text}}”</span> 찾으시나요?</a>'

    var productItemTemplate = '<li><div class="item">' +
        '<div class="result-thumb"><a href="{{url}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
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
                    '<div class="hashtag-wrap">' +
                        '{{#each item in hash}}<span class="hashtag">#{{item}}</span>{{/each}}' +
                    '</div>' + 
                    '{{#if hasCare}}<div class="careflag"><span>케어십 가능</span></div>{{/if}}' +
                '</div>' +
            '</div>' +
            '<div class="info-price">' +
                '<div class="price-info sales">' +
                    '<p class="tit">구매</p>' +
                    '{{#if price}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                    '<div class="original">' +
                        '<em class="blind">원가</em>' +
                        '{{#if originalPrice}}<span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                    '</div>' +
                '</div>' +
                '<div class="price-info rental">' +
                    '<p class="tit">케어솔루션</p>' +
                    '{{#if carePrice}}<span class="price"><em>월</em> {{carePrice}}<em>원</em></span>{{/if}}' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div></li>';
    var eventItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb">' +
            '<div>' +
                '<img src="{{imageUrl}}" alt="{{imageAlt}}">' +
                '{{#if isEnd}}<span class="flag-end-wrap"><span class="flag">종료</span></span>{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="date">' +
                        '<span>{{startDate}} ~ {{endDate}}</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';
    var storyItemTemplate = '<li><a href="{{url}}" class="item item-story">' +
        '<div class="result-thumb"><div><img src="{{imageUrl}}" alt="{{imageAlt}}"></div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="desc"><span>{{desc}}</span></div>' +
                    '<div class="hashtag-wrap">' +
                        '{{#each item in hash}}<span class="hashtag">#{{item}}</span>{{/each}}' +
                    '</div>' + 
                    '<div class="date"><span>{{date}}</span></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';
    var additionalItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="result-thumb"><div><img src="{{imageUrl}}" alt="{{imageAlt}}"></div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="result-tit"><strong>{{title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{sku}}</div>' +
                   '<div class="model"><span>{{desc}}</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="info-price type2">' +
                '<div class="price-info">{{#if price}}<span class="price">{{price}}<em>원</em></span>{{/if}}</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';

    //필터 템플릿
    var filterSliderTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{title}}</div>' +
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
                '<div class="tit">{{title}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="rdo-wrap">' +
                    '<input type="radio" name="{{filterId}}" value="{{item.value}}" id="rdo-{{filterId}}-{{idx}}" {{#if idx==0}}checked{{/if}}>' +
                    '<label for="rdo-{{filterId}}-{{idx}}">{{item.title}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterColorTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{title}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap-colorchip {{item.color}}">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.value}}" id="color-{{filterId}}-{{idx}}">' +
                    '<label for="color-{{filterId}}-{{idx}}">{{item.title}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterCheckboxTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{title}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
        '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.value}}" id="chk-{{filterId}}-{{idx}}">' +
                    '<label for="chk-{{filterId}}-{{idx}}">{{item.title}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';

    $(window).ready(function() {
        var tabIndexAll = 0;
        var tabIndexProduction = 1;

        var intergratedSearch = {
            init: function() {
                var self = this;

                self.setting();
                self.updateRecentSearchList();
                self.bindEvents();
                vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {
                    self.filterSetting();
                    self.filterBindEvents();
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
                self.$tab = self.$contentsSearch.find('.ui_tab');
                self.tabInstance = self.$tab.vcTab('instance');
                //input-keyword
                self.$inputKeyword = self.$contentsSearch.find('div.input-keyword');
                //검색어 입력input
                self.$inputSearch = self.$inputKeyword.find('div.input-sch input.txt');
                //검색버튼
                self.$buttonSearch = self.$inputKeyword.find('div.input-sch button.btn-search');
                
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

                //배너
                self.$searchBanner = self.$contentsSearch.find('div.search-banner');

                //검색 결과 - 카테고리
                self.$searchResultCategory = self.$contentsSearch.find('div.search-result-category');
                //카테고리 더보기 버튼
                self.$searchResultCategoryMore = self.$searchResultCategory.find('a.btn-moreview');

                //cont-wrap
                self.$contWrap = self.$contentsSearch.find('div.cont-wrap');
                //filter
                self.$filter = self.$contWrap.find('div.lay-filter');
                //mobile화면 하단 service link
                self.$mobileServiceLink = self.$contWrap.find('div.mobile-service-link');
                //추천상품 recommend-list-box
                self.$recommendListBox = self.$contWrap.find('div.recommend-list-box');
                //search-not-result
                self.$searchNotResult = self.$contentsSearch.find('div.search-not-result');

                //필터
                self.$layFilter = self.$contentsSearch.find('div.lay-filter');

                self.$autoComplete.hide();
                self.$notResult.hide();
/*
                //추천 태그 리스트
                self.$suggestedTagsList = self.$searchKeywordArea.find('div.suggested-tags');

                //검색 결과 공간
                self.$searchResultArea = self.$contentsSearch.find('div.search-result-area');
                
                //검색 결과
                self.$resultPreview = self.$searchResultArea.find('div.result-preview');
                //검색 결과 - 카테고리
                self.$resultCategory = self.$resultPreview.find('div.result-category');
                //검색 결과 - 리스트
                self.$resultPreviewList = self.$resultPreview.find('div.result-preview-list');

                //연관검색어
                self.$searchSimilar = self.$contentsSearch.find('div.search-similar');
*/
                //self.$searchResultArea.hide();
                //self.$searchSimilar.hide();
            },

            bindEvents: function() {
                var self = this;

                self.$tab.on("tabbeforechange", function(e, data){
                    var index = data.selectedIndex;
                    //var ajaxUrl = self.getTabItem(index).attr('data-search-url');
                    //var searchValue = self.$inputKeyword.attr('data-searchValue');
                    $('.lay-filter').removeClass('open');
                    switch(index) {
                        case tabIndexAll:
                            //전체
                            self.hideFilter();
                            self.$searchResultCategory.show();
                            self.$searchBanner.show();
                            self.$mobileServiceLink.hide();
                            self.$recommendListBox.hide();
                            break;
                        case tabIndexProduction:
                            //제품/케어솔루션 setFilter 위치 옮길것
                            self.setFilter();
                            self.$searchResultCategory.hide();
                            self.$searchBanner.hide();
                            self.$mobileServiceLink.css('display', '');
                            self.$recommendListBox.show();
                            break;
                        case 2:
                            //이벤트/기획전
                            self.setFilter();
                            self.$searchResultCategory.hide();
                            self.$searchBanner.hide();
                            self.$mobileServiceLink.hide();
                            self.$recommendListBox.hide();
                            break;
                        default:
                            break;
                    }
                });

                self.$tab.on("tabchange", function(e, data){
                    var index = data.selectedIndex;
                    switch(index) {
                        case tabIndexAll:
                            //전체
                            break;
                        case tabIndexProduction:
                            //제품/케어솔루션 setFilter 위치 옮길것
                            self.requestSearch(null,false);
                            break;
                        case 2:
                            //이벤트/기획전
                            break;
                        default:
                            break;
                    }
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.resetFilter();
                    self.requestSearchAll(searchVal, false);
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
                    self.$inputSearch.val(searchVal);
                    self.requestSearchAll(searchVal, true);
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
                    var index = $(this).attr('href').replace("#", "");
                    self.getTabItem(index).trigger('click');
                });
            },

            //검색어창에 입력후 검색
            searchItem:function($item) {
                var self = this;
                var searchVal = $item.attr('href').replace("#", "");
                self.$inputSearch.val(searchVal);
                self.$buttonSearch.trigger('click');
            },

            //필터 세팅
            setFilter:function(data) {
                var self = this;
                self.$contWrap.addClass('w-filter');
                self.$filter.css('display', '');
                self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);
            },

            //필터 감추기
            hideFilter:function() {
                var self = this;
                self.$contWrap.removeClass('w-filter');
                self.$filter.hide();
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

            getTabItem:function(index) {
                var self = this;
                var idx = parseInt(index) + 0;
                return self.$tab.find('ul li:eq('+idx+') a');
            },

            getSearchResultWrap:function(index) {
                var self = this;
                return self.$contWrap.find('div.search-result-wrap:eq(' + index +')');
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
                            $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":item.replaceAll(searchedValue,replaceText)}));
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

            //카테고리 선택 검색
            requestSearch:function(queryData, searchInResult) {
                var self = this;
                
                var isSearchInResult = searchInResult;
                var tabIndex = self.tabInstance.vcTab('getSelectIdx');
                var ajaxUrl = self.getTabItem(tabIndex).attr('data-search-url');
                var postData = queryData ? queryData : {};
                var searchValue = self.$inputKeyword.attr('data-searchValue');
                postData.search = searchValue;
                console.log(tabIndex, ajaxUrl, postData);

                lgkorUI.requestAjaxData(ajaxUrl, postData, function(result) {
                    console.log(result);
                    var data = result.data;
                    var param = result.param;
                    
                    var searchedValue = data.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    self.$inputSearch.val(searchedValue);
                    self.getSearchResultWrap(tabIndex).find('div.search-inner input').attr('data-searchvalue', param.searchIn).val(param.searchIn);
                    self.$layFilter.find('div.search-inner input').val(param.searchIn);

                    //필터세팅
                    if(!isSearchInResult) {
                        self.updateFilter(data.filterList);
                    }

                    //리스트 세팅

                });
            },

            //검색버튼 검색
            requestSearchAll:function(value, force) {
                var self = this;
                var ajaxUrl = self.getTabItem(0).attr('data-search-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value, "force":force}, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;

                    var searchedValue = data.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //검색한 검색어
                    self.$searchResultText.html(replaceText + ' 검색 결과');

                    //원래입력된 기존 검색어 이동
                    var inputValue = data.inputValue;
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

                    //카테고리 리스트 갱신
                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$searchResultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text}));
                        });
                        self.$searchResultCategory.show();
                    } else {
                        self.$searchResultCategory.hide();
                    }

                    self.$searchResultCategory.removeClass('on');
                    self.$searchResultCategoryMore.find('span').text('더보기');

                    //nodata Test
                    /*
                    data.product = null;
                    data.event = null;
                    data.story = null;
                    data.additional = null;
                    */

                    var noData = true;

                    self.$contWrap.removeClass('w-filter');
                    var $searchResult = self.$contWrap.find('div.search-result-wrap.all');

                    //제품/케어솔루션
                    var $resultListWrap = $searchResult.find('div.result-list-wrap:eq(0)');
                    arr = self.checkArrayData(data.product);
                    var count = self.checkCountData(data.product);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                            item.title = item.title.replaceAll(searchedValue,replaceText);
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
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = item.title.replaceAll(searchedValue,replaceText);
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
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
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
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            $list_ul.append(vcui.template(additionalItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;
                    } else {
                        $resultListWrap.hide();
                    }

                    if(noData) {
                        self.$contWrap.hide();
                        self.$searchNotResult.find('em').text('“' + searchedValue + '”');
                        self.$searchNotResult.show();
                    } else {
                        self.$contWrap.show();
                        self.$searchNotResult.hide();
                    }

                    //최근검색어 저장
                    console.log(searchedValue);
                    self.$inputKeyword.attr('data-searchValue',searchedValue);
                    if(!noData) {
                        self.addRecentSearcheText(searchedValue);
                    }

                    self.getTabItem(0).trigger('click');
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
                        self.requestSearch(self.getDataFromFilter(), true);
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
                    self.requestSearch(self.getDataFromFilter(), true);
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
                    self.requestSearch(self.getDataFromFilter(), true);
                });

                // 초기화버튼 이벤트 처리
                self.$layFilter.on('click', 'div.btn-reset button', function(e){
                    self.resetFilter();
                });

                var $listSorting = $('div.list-sorting');

                //품절상품 확인
                $listSorting.on('change', 'input[type="checkbox"]', function(e){
                    self.requestSearch(self.getDataFromFilter(), true);
                });

                //리스트 정렬 선택시 필터의 정렬 값도 선택하게함
                $listSorting.find('.ui_selectbox').on('change', function(e,data){
                    var value = e.target.value;
                    self.$layFilter.find('input[name="sorting"][value="'+ value +'"]').prop('checked', true);
                    self.requestSearch(self.getDataFromFilter(), true);

                });

                // 필터의 정렬 선택시 리스트의 정렬값도 선택하게 함
                self.$layFilter.find('.ui_order_accordion div.ui_accord_content').on('change', 'input[name="sorting"]',function(e){
                    var idx = $('input[name="sorting"]').index(this);
                    var tabIndex = self.tabInstance.vcTab('getSelectIdx');
                    var $target = self.getSearchResultWrap(tabIndex).find('div.list-sorting .ui_selectbox');
                    $target.vcSelectbox('selectedIndex', idx, false);
                    self.requestSearch(self.getDataFromFilter(), true);
                });

                //검색내 검색 버튼
                $listSorting.find('div.search-inner button').on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    $input.attr('data-searchvalue', searchIn);
                    self.requestSearch(self.getDataFromFilter(), true);
                });

                //필터의 검색내 검색 버튼
                self.$layFilter.find('div.search-inner button').on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    var tabIndex = self.tabInstance.vcTab('getSelectIdx');
                    var $target = self.getSearchResultWrap(tabIndex).find('div.search-inner input');                    
                    $target.attr('data-searchvalue', searchIn);
                    self.requestSearch(self.getDataFromFilter(), true);
                });

                self.filterBindCustomEvents();
            },

            getDataFromFilter: function() {
                var self = this;
                var tabIndex = self.tabInstance.vcTab('getSelectIdx');
                var $listSorting = self.getSearchResultWrap(tabIndex).find('div.list-sorting');
                
                var data = {};
                $listSorting.find('input').each(function(idx, el){
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

                $listSorting.find('.ui_selectbox').each(function(idx, el){
                    data[el.name] = $(el).vcSelectbox('selectedOption').value;
                });

                if(tabIndex != 0) {
                    //전체검색이 아닐 경우 선택된 필터 데이타 반영
                    var filterData = {};
                    self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                        var $el = $(el);
                        var values = JSON.parse($el.attr('data-values'));
                        var min = $el.attr('data-min');
                        var max = $el.attr('data-max');
                        var tempArray = values.slice(min,parseInt(max)+1).map(function(a) {return a.filterValue;});
                        filterData[$el.attr('name')] = tempArray;
                    });

                    self.$layFilter.find('.ui_filter_accordion input').each(function(idx, el){
                        if(el.checked) {
                            var tempArray = filterData[el.name];
                            if(!tempArray) {
                                tempArray = [];
                            }
                            tempArray.push(el.value);
                            filterData[el.name] = tempArray;
                        }
                    });

                    data["filterData"] = filterData;
                }

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
                            case "slider":
                                hasSlider = true;
                                item.filterValues.forEach(function(obj, idx){
                                    obj.value = idx;
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
            },

            resetFilter: function() {
                var self = this;
                var tabIndex = self.tabInstance.vcTab('getSelectIdx');

                //필터 정렬박스
                self.$layFilter.find('input[name="sorting"]:eq(0)').prop('checked', true);
                //리스트 정렬박스
                var $listSorting = self.getSearchResultWrap(tabIndex).find('div.list-sorting');
                var $target = $listSorting.find('.ui_selectbox');
                $target.vcSelectbox('selectedIndex', 0, false);

                //솔드아웃 버튼
                $listSorting.find('input[type="checkbox"]').prop('checked', false);

                //검색내 검색어
                $listSorting.find('div.search-inner input').attr('data-searchvalue', '').val('');
                self.$layFilter.find('div.search-inner input').val('');

                //필터 슬라이더
                self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                    var $el = $(el);
                    var values = JSON.parse($el.attr('data-values'));
                    var min = 0;
                    var max = values.length - 1;
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

        intergratedSearch.init();
    });
})();