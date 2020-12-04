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
    var filterSliderTemplate = '<li data-id="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{title}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont"><div class="range-wrap">' +
                '<div data-filter-id="{{filterId}}" class="ui_filter_slider ui_price_slider" data-range="{{min}},{{max}}" data-values="{{filterValues}}"></div>' +
                '<p class="min range-num">Min</p><p class="max range-num">Max</p>' +
            '</div></div>' +
        '</div>' +
    '</li>';
    var filterRadioTemplate = '<li data-id="{{filterId}}">' +
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
    var filterColorTemplate = '<li data-id="{{filterId}}">' +
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
    var filterCheckboxTemplate = '<li data-id="{{filterId}}">' +
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
        var intergratedSearch = {
            init: function() {
                var self = this;

                self.setting();
                self.updateRecentSearchList();
                self.bindEvents();
                vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {
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

                $('.ui_tab').on("tabbeforechange", function(e, data){
                    var index = data.selectedIndex;
                    var ajaxUrl = self.getTabItem(index).attr('data-search-url');
                    $('.lay-filter').removeClass('open');
                    switch(index) {
                        case 0:
                            //전체
                            self.hideFilter();
                            self.$searchResultCategory.show();
                            self.$searchBanner.show();
                            self.$mobileServiceLink.hide();
                            self.$recommendListBox.hide();
                            break;
                        case 1:
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
                })

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
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
                $('.ui_filter_slider').vcRangeSlider('update',true);
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
                var idx = parseInt(index) + 1;
                return $('.ui_tab ul li:nth-child('+idx+') a');
            },

            //검색어 입력중 검색
            requestSearchAutoComplete:function(value) {
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-autocomplete-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                    var param = result.param;
                    var data = result.data;

                    var searchedValue = param.searchedValue;
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

            //검색버튼 검색
            requestSearchAll:function(value, force) {
                var self = this;
                var ajaxUrl = self.getTabItem(0).attr('data-search-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value, "force":force}, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;

                    var searchedValue = data.searchedValue;
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
                    //self.$relatedKeywordList.addClass('open');
                    
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
                    /*
                    if(window.breakpoint.isMobile) {
                        var height = self.$relatedKeywordList.find('div.inner').height();
                        if(height > 29) {
                            self.$relatedKeywordList.removeClass('open');
                            self.$relatedKeywordMobileMoreButton.show();
                        } else {
                            self.$relatedKeywordMobileMoreButton.hide();
                        }
                    }
                    */

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
                    /*
                    self.$searchResultCategory.removeClass('open');
                    self.$searchResultCategory.find('div.inner').css('overflow','hidden');
                    if(window.breakpoint.isMobile) {
                        self.$searchResultCategory.find('div.inner').css('height','100px');
                    } else {
                        self.$searchResultCategory.find('div.inner').css('height','108px');
                    }
                    */

                    /*
                    var checkHeight = window.breakpoint.isMobile ? 50 : 54;
                    var height = self.$searchResultCategory.find('div.inner').height();
                    if(height > checkHeight) {
                        self.$searchResultCategoryMore.show();
                    } else {
                        self.$searchResultCategoryMore.hide();
                    }
                    */

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
                    var $resultListWrap = $searchResult.find('div.result-list-wrap:nth-child(1)');
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
                    $resultListWrap = $searchResult.find('div.result-list-wrap:nth-child(2)');
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
                    $resultListWrap = $searchResult.find('div.result-list-wrap:nth-child(3)');
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
                    $resultListWrap = $searchResult.find('div.result-list-wrap:nth-child(4)');
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
                    self.addRecentSearcheText(searchedValue);

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
            filterBindEvents: function() {
                var _self = this;
                //var self = this;
                
                // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
                $('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged',function (e, data) {
                    $(e.currentTarget).siblings('.min').text(vcui.number.addComma(data.minValue.title));
                    $(e.currentTarget).siblings('.max').text(vcui.number.addComma(data.maxValue.title));
                    if(e.type=='rangesliderchanged'){
                        //var filterId = $(e.currentTarget).data('filterId');
                        console.log(data.minValue.id,data.maxValue.id);
                    }
                }).vcRangeSlider();

                // 아코디언 설정
                $('.ui_order_accordion').vcAccordion();
                $('.ui_filter_accordion').vcAccordion();

                // 필터 아코디언 오픈시 슬라이더 업데이트
                $('.ui_filter_accordion').on('accordionexpand', function(e,data){
                    if(data.content.find('.ui_filter_slider').length > 0) {
                        data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                    }   
                });

                // 필터안 체크박스 이벤트 처리
                $('.ui_filter_accordion').on('change', 'input', function(e){
                    var name = e.target.name;
                    var valueStr = "";
                    $('.ui_filter_accordion').find('input[name="'+ name +'"]:checked').each(function(idx, item){
                        valueStr = valueStr + item.title+','
                    });
                    valueStr = valueStr.replace(/,$/,'');                    
                    if(valueStr==''){
                        delete storageFilters[name];
                        //lgkorUI.removeStorage(storageName, name);
                    }else{
                        storageFilters[name] = valueStr;
                        //lgkorUI.setStorage(storageName, storageFilters);
                    }
                    _self.setApplyFilter(storageFilters);
                });

                // 모바일 필터박스 열기
                $('div.btn-filter a').on('click', function(e){
                    e.preventDefault();
                    $('.lay-filter').addClass('open');
                    $('.ui_filter_slider').vcRangeSlider('update',true);
                });

                // 모바일 필터박스 닫기
                $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                    e.preventDefault();
                    $('.lay-filter').removeClass('open');
                });

                // 모바일 필터박스 확인
                $('.lay-filter').find('div.filter-btn-wrap button.ui_confirm_btn').on('click', function(e){
                    e.preventDefault();
                    $('.lay-filter').removeClass('open');
                    _self.requestSearchProduct(searchedValue);
                });

                // 초기화버튼 이벤트 처리
                $('.lay-filter').find('div.plp-filter-wrap div.btn-reset button').on('click', function(){
                    _self.reset();
                    $('.lay-filter').removeClass('open');
                });

                $('.ui_reset_btn').on('click', function(){
                    _self.reset();
                    $('.lay-filter').removeClass('open');
                });

                //품절상품 확인
                $('div.check-soldout span.chk-wrap').on('change', 'input[type="checkbox"]', function(e){
                    e.preventDefault();
                    _self.requestSearchProduct(searchedValue);
                });

                // 필터의 정렬 선택시 리스트의 정렬값도 선택하게 함
                //$('input[name="sorting"]').on('change', function(e){
                $('.lay-filter').find('div.list-acco-sorting ul li div.ui_accord_content div.cont').on('change', 'input[name="sorting"]',function(e){
                    e.preventDefault();
                    var idx = $('input[name="sorting"]').index(this);
                    var $target = $('#'+selectedTab).find('div.list-sorting').find('.ui_selectbox');
                    $target.vcSelectbox('selectedIndex', idx, false);
                    _self.setApplyFilter(storageFilters);
                });

                //리스트 정렬 선택시 필터의 정렬 값도 선택하게함
                $('div.list-sorting').find('.ui_selectbox').on('change', function(e,data){
                    var value = e.target.value;
                    $('input[name="sorting"][value="'+ value +'"]').prop('checked', true);
                    if(selectedTab == 'customer') {
                        _self.requestCustomerSearch(searchedValue);
                    } else {
                        _self.requestSearchProduct(searchedValue);
                    }
                });
            },
        }

        intergratedSearch.init();
    });
})();