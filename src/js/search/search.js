(function() {
    var inputSearchNoDataTemplate = '<p><span class="search-word">{{text}}</span>와(과) 연관된 검색어가 없습니다.</p>'
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';

    var recentItemTemplate = '<li><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제" data-text="{{text}}"><span class="blind">삭제</span></button></li>';
    var popularItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';

    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{text}}</span></a></li>';
    var productItemTemplate = '<li><div class="item result-item">' +
        '{{#if bigFlag_url}}<div class="badge-wrap"><img src="{{bigFlag_url}}" alt="{{bigFlag_alt}}"></div>' +
        '{{#elsif bigFlag}}<div class="badge-wrap big-flag green type2 left"><span>{{#raw bigFlag}}</span></div>{{/if}}' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents"><div class="flag-wrap">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
        '<div class="product-info"><div class="product-name"><a href="{{url}}">{{#raw title}}</a></div>' +
        '<div class="sku">{{sku}}</div>' +
        '<div class="review-info"><a href="{{url}}">' +
        '{{#if isReview}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
        '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div><div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' +
        '</a></div></div>' +
        '<div class="price-area"><div class="total-price">' +
        '{{#if price}}<em class="blind">최대 혜택가격</em><span class="price">{{price}}<em>원</em></span>{{/if}}' +
        '</div>' +
        '<div class="product-price"><div class="discount-rate">' +
        '{{#if sale}}<em class="blind">할인율</em><span class="price">{{sale}}<em>%</em></span>{{/if}}' +
        '</div></div></div>' +
        '<div class="hashtag-wrap">{{#each item in hash}}<span class="{{item.class}}">#{{item.tag}} </span>{{/each}}</div>' +
        // '<div class="hashtag-wrap">{{#each item in hash}}<span class="hashtag">#{{item}} </span>{{/each}}</div>' +
        '</div></div></li>';
    
    var productBannerTemplate = '<li class="item-banner large"><div class="item result-item">' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="banner-contents"><div class="inner">' +
            '<div class="banner-info"><div class="title">{{#raw title}}</div><div class="sub-copy">{{#raw subTitle}}</div></div>' +
            '<div class="banner-button"><a href="{{url}}" class="btn">{{buttonTitle}}</a></div>' +
        '</div></div>' +
        '</div></li>'

    var careItemTemplate = '<li><div class="item result-item">' +
        '{{#if bigFlag_url}}<div class="badge-wrap"><img src="{{bigFlag_url}}" alt="{{bigFlag_alt}}"></div>' +
        '{{#elsif bigFlag}}<div class="badge-wrap big-flag green type2 left"><span>{{#raw bigFlag}}</span></div>{{/if}}' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents"><div class="flag-wrap">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
        '<div class="product-info"><div class="product-name"><a href="{{url}}">{{#raw title}}</a></div>' +
        '<div class="sku">{{sku}}</div>' +
        '<div class="review-info"><a href="{{url}}">' +
        '{{#if isReview}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
        '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div><div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' +
        '</a></div></div>' +
        '<div class="price-area"><div class="total-price">' +
        '{{#if price}}<em class="blind">최대 혜택가격</em><span class="price"><em>월</em> {{price}}<em>원</em></span>{{/if}}' +
        '</div>' +
        '<div class="product-price"><div class="discount-rate">' +
        '{{#if sale}}<em class="blind">할인율</em><span class="price">{{sale}}<em>%</em></span>{{/if}}' +
        '</div></div><span class="small-text">({{desc}})</span></div></div></div></li>';

    var eventItemTemplate = '<li class="lists"><div class="list-inner"><a href="{{url}}">' +
        '<span class="thumb"><img src="{{image_url}}" alt="{{image_alt}}">' +
        '<div class="flag-wrap bg-type">{{#each item in thumbFlag}}<span class="flag"><span class="blind">제품 카테고리</span>{{item}}</span>>{{/each}}</div></span>' +
        '<div class="info">' +
        '<div class="flag-wrap">{{#each item in flag}}<span class="flag"><span class="blind">이벤트 구분</span>{{item}}</span>{{/each}}</div>' +
        '<p class="tit"><span class="blind">이벤트 제목</span>{{#raw title}}</p>' +
        '<p class="date"><span class="blind">이벤트 기간</span>{{startDate}}~{{endDate}}</p>' +
        '</div></a></div></li>'

    var storyItemTemplate = '<li class="lists"><div class="list-inner"><a href="{{url}}">' +
        '<span class="thumb"><img src="{{image_url}}" alt="{{image_alt}}"></span>' +
        '<div class="info">' +
            '<div class="flag-wrap">{{#each item in flag}}<span class="flag"><span class="blind">구분</span>{{item}}</span>{{/each}}</div>' +
            '<p class="tit"><span class="blind">이벤트 제목</span>{{#raw title}}</p>' +
            '<p class="date"><span class="blind">이벤트 기간</span>{{startDate}}~{{endDate}}</p>' +
            '<div class="hashtag">{{#each item in hash}}<span class="{{item.class}}">#{{item.tag}} </span>{{/each}}</div>' +
            '</div></a></div></li>';
    
    var additionalItemTemplate = '<li><div class="item result-item">' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents"><div class="product-info"><div class="product-name">' +
        '<a href="{{url}}">{{#raw title}}</a></div>' +
        '<div class="sku">S833MC85Q</div><p class="spec-info2">{{desc}}</p></div>' +        
        '<div class="price-area"><div class="total-price">' +
        '{{#if price}}<em class="blind">최대 혜택가격</em><span class="price">{{price}}<em>원</em></span>{{/if}}</div>' +
        '<div class="product-price"><div class="discount-rate">' +
        '{{#if sale}}<em class="blind">할인율</em><span class="price">{{sale}}<em>%</em></span>{{/if}}' +
        '</div></div></div></div></div></li>';

    var customerListItemTemplate = '<li><div class="item result-item">' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents"><div class="product-info"><div class="product-name">' +
        '<a href="#">{{#raw title}}</a></div>' +
        '<div class="sku">S833MC85Q</div></div></div>' +
        '<div class="product-button"><a href="{{url}}" class="btn">제품 지원 더보기</a></div></div></li>';
    
    var customerBoxItemTemplate = '<li class="lists"><div class="list-inner"><a href="{{url}}">' +
        '<span class="thumb"></span><div class="info">' +
        '<div class="flag-wrap">{{#each item in flag}}<span class="flag"><span class="blind">구분</span>{{item}}</span>{{/each}}</div>' +
        '<p class="tit"><span class="blind">고객지원 제목</span>{{#raw title}}</p>' +
        '<div class="category">{{#each list in category}}<ol>{{#each (item, index) in list}}<li>{{#if index > 0}}>{{/if}}{{#raw item}}</li>{{/each}}</ol>{{/each}}</div>' +
        '{{#if desc}}<p class="desc">{{#raw desc}}</p>{{/if}}' +
        '</div></a></div></li>';
    
    var customerVideoItemTemplate = '<li class="lists"><div class="list-inner">' +
        '<span class="thumb">' +
            '<div class="video-container video-box youtube-box">' +
            '<div class="video-asset video-box-closeset">' +
            '<iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{url}}"></iframe>' +
            '</div>' +
            '</div>' +
        '</span>' +
            '<div class="info">' +
            '<p class="tit2"><span class="blind">이벤트 제목</span>{{#raw title}}</p>' +
            '<div class="category twoLine">{{#each list in category}}<ol>{{#each (item, index) in list}}<li>{{#if index > 0}}>{{/if}}{{#raw item}}</li>{{/each}}</ol>{{/each}}</div>' +
            '</div></div></li>';

    var suggestedItemTemplate = '<li><div class="item">' +
        '{{#if badge}}<div class="badge-wrap thin-type"><span class="badge">{{badge}}</span></div>' +
        '{{#elsif bigFlag}}<div class="badge-wrap big-flag green type2 left"><span>{{#raw bigFlag}}</span></div>{{/if}}' +
        '<div class="product-image" aria-hidden="true"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents">' +
            '<div class="flag-wrap">{{#each item in flag}}<span class="flag"><span class="blind">구분</span>{{item}}</span>{{/each}}</div>' +
            '<div class="product-info">' +
                '<div class="product-name"><a href="{{url}}">{{#raw title}}</a></div>' +
                '<div class="sku">{{sku}}</div>' +
                '<div class="review-info"><a href="{{url}}">' +
                    '{{#if isReview}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
                    '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div><div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' +
            '</a></div></div>' +
            '<div class="price-area">' +
                '<div class="total-price">' +
                    '{{#if price}}<em class="blind">최대 혜택가격</em><span class="price">{{price}}<em>원</em></span>{{/if}}' +
                '</div>' +
                '<div class="product-price">' +
                    '<div class="purchase-price">' +
                        '{{#if originalPrice}}<em class="blind">판매가격</em><span class="price">5,200,000<em>원</em></span>{{/if}}' +
                    '</div>' +
                    '<div class="discount-rate">' +
                        '{{#if sale}}<em class="blind">할인율</em><span class="price">{{sale}}<em>%</em></span>{{/if}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="badge-benefit">{{#each item in hash}}<span class="{{item.class}}">{{item.tag}} </span>{{/each}}</div>' +
        '</div>' +
        '<div class="product-wish"><span class="chk-wish-wrap">' +
            '<input data-id={{id}} type="checkbox" id="chk{{index}}" name="chk{{index}}" {{#if isWish}}checked{{/if}}>' +
            '<label for="chk{{index}}"><span class="blind">{{#if isWish}}찜한상품{{#else}}찜하기{{/if}}</span></label>' +
        '</span></div>' +
        '<div class="product-button"><a href="{{buttonUrl}}" class="btn">장바구니 담기</a></div>' +
        '</div></li>';
    
    var recommendItemTemplate = '<li class="lists"><div class="list-inner">' +
        '<a href="{{url}}">' +
        '<span class="thumb"><img src="{{image_url}}" alt="{{image_alt}}"></span>' +
        '<div class="info"><p class="tit">{{#raw title}}</p><p class="copy">{{#raw subTitle}}</p></div>' +
        '</a>' +
        '<div class="btn-area btm"><a href="{{url}}" class="btn bd-gray"><span>{{buttonTitle}}</span></a></div>' +
        '</div></li>'

    var sortingInputTemplate = '<div class="rdo-wrap"><input type="radio" name="sorting" id="sort{{index}}" value="{{value}}" {{#if checked}}checked{{/if}}><label for="sort{{index}}">{{text}}</label></div>'

    var searchInputLayerVisible = false;
    var minLength = 1;
    var searchDelay = 2000;
    var searchTimer = null;
    var selectedTab = "";
    var customerSelectedTab = "";
    var searchedValue = "";
    var storageFilters = {};
    var savedFilterArr = [];
    var currentPage = "1";
    var customerCurrentPage = "1";

    $(window).ready(function() {
        var search = {
            init: function() {
                self.$contentsSearch = $('div.contents.search');
                self.$searchLayer = self.$contentsSearch.find('div.input-keyword');
                self.$resultLayer = self.$contentsSearch.find('div.cont-wrap').eq(0);
                self.$tab = self.$contentsSearch.find('div.tabs-wrap.btn-type.ui_tab');
                self.$customerTab = self.$contentsSearch.find('div.tabs-wrap.border-type.ui_tab');

                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                
            
                self.$searchInputLayer = self.$searchLayer.find('div.search-input-layer');
                self.$inputSearchList = self.$searchInputLayer.find('div.input-result-list');

                self.$relatedKeywordList = self.$searchLayer.find('div.related-keyword');

                self.$searchKeywordArea = self.$searchInputLayer.find('div.search-keyword-area');
                self.$recentKeywordList = self.$searchKeywordArea.find('dl.recent-keyword'); 
                self.$popularKeywordList = self.$searchKeywordArea.find('dl.popular-keyword');

                self.$noInputSearchData = self.$searchInputLayer.find('div.not-result');
                self.$searchInputClose = self.$searchInputLayer.find('button.btn-close');

                self.$searchSimilar = self.$searchLayer.find('div.search-similar');
                self.$searchResultText = self.$searchSimilar.find('div.search-result-text');
                self.$searchInputText = self.$searchSimilar.find('a');

                self.$resultAllWrap = self.$contentsSearch.find('div.search-result-wrap.all');
                self.$resultAllCategory = self.$resultAllWrap.find('div.result-category');
                self.$resultAllProduct = self.$resultAllWrap.find('div.result-list-wrap').eq(0);
                self.$resultAllCare = self.$resultAllWrap.find('div.result-list-wrap').eq(1);
                self.$resultAllEvent = self.$resultAllWrap.find('div.result-list-wrap').eq(2);
                self.$resultAllStory = self.$resultAllWrap.find('div.result-list-wrap').eq(3);
                self.$resultAllAdditional = self.$resultAllWrap.find('div.result-list-wrap').eq(4);
                self.$resultAllCustomer = self.$resultAllWrap.find('div.result-list-wrap').eq(5);
                self.$resultAllCustomerSupport = self.$resultAllCustomer.find('div.list-wrap');
                self.$resultAllCustomerDriver = self.$resultAllCustomer.find('div.box-list').eq(0);
                self.$resultAllCustomerTrouble = self.$resultAllCustomer.find('div.box-list').eq(1);
                self.$resultAllCustomerManual = self.$resultAllCustomer.find('div.box-list').eq(2);
                self.$resultAllCustomerFaq = self.$resultAllCustomer.find('div.box-list').eq(3);
                self.$resultAllCustomerVideo = self.$resultAllCustomer.find('div.search-video-list-wrap');

                self.$recommendList = self.$contentsSearch.find('div.recommend-list-wrap');

                self.$noData = self.$contentsSearch.find('div.search-not-result');
                self.$suggestedList = self.$contentsSearch.find('div.suggested-list-wrap');

                
                self.$searchInputLayer.hide();
                self.$relatedKeywordList.hide();
                self.$searchResultText.hide();
                self.$searchInputText.hide();

                self.$pagination = self.$contentsSearch.find('div.pagination');

                selectedTab = self.$tab.find('ul.tabs li a').eq(0).attr('href').replace("#", "");
                
                //$('.lay-filter').hide();
                $('.lay-filter').addClass('search-all');

                $('#customer').find('div.btn-filter').hide();
                var $list_sorting = $('#customer').find('div.list-sorting');
                var $list_count = $list_sorting.find('div.list-count');
                $list_sorting.hide();
                $list_count.hide();

                var _self = this;
                _self.updateRecentSearcheList();

                vcui.require(['ui/pagination', "ui/youtubeBox"], function () {
                    _self.bindEvents();
                });

                vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {
                    _self.filterBindEvents();
                });
            },

            bindEvents: function() {
                var _self = this;
                
                //탭 클릭
                var searchItemTarget = 'ul.tabs li a';
                self.$tab.on("click", searchItemTarget, function(e) {
                    clearTimeout(searchTimer);
                    _self.setSearchInputLayerVisible(false);
                    currentPage = "1";
                    selectedTab = $(this).attr('href').replace("#", "");
                    $('.lay-filter').find('div.service-link').not('.'+selectedTab).hide();
                    $('.lay-filter').find('div.service-link.'+selectedTab).show();
                    var $list_sorting = $('#'+selectedTab).find('div.list-sorting');
                    switch(selectedTab) {
                        case "all":
                            $('.lay-filter').addClass('search-all');
                            self.$buttonSearch.trigger('click');
                            break;
                        case "event":
                            var $sortItems = $list_sorting.find('div.ui-selectbox-list div.ui-select-scrollarea ul li a');
                            _self.updateMobileSortFilter($sortItems);
                            $('.lay-filter').addClass('search-all');
                            _self.requestSearchProduct(searchedValue);
                            break;
                        case "customer":
                            var $sortItems = $list_sorting.find('div.ui-selectbox-list div.ui-select-scrollarea ul li a');
                            _self.updateMobileSortFilter($sortItems);
                            $('.lay-filter').addClass('search-all');
                            self.$customerTab.find('ul.tabs li a').eq(0).trigger('click');
                            break;
                        default:
                            var $sortItems = $list_sorting.find('div.ui-selectbox-list div.ui-select-scrollarea ul li a');
                            _self.updateMobileSortFilter($sortItems);
                            $('.lay-filter').removeClass('open search-all');
                            _self.requestSearchProduct(searchedValue);
                            break;
                    }
                });

                self.$customerTab.on("click", searchItemTarget, function(e) { 
                    currentPage = "1";
                    customerSelectedTab = $(this).attr('href').replace("#", "");
                    var $btn_filter = $('#customer').find('div.btn-filter');
                    var $list_sorting = $('#customer').find('div.list-sorting');
                    var $list_count = $list_sorting.find('div.list-count');
                    switch(customerSelectedTab) {
                        case "customer-all":
                            $('.lay-filter').addClass('search-all');
                            $btn_filter.hide();
                            $list_sorting.hide();
                            $list_count.hide();
                            break;
                        default:
                            $('.lay-filter').removeClass('open search-all');
                            $btn_filter.show();
                            $list_sorting.show();
                            $list_count.show();
                            break;
                    }
                    _self.requestCustomerSearch(searchedValue);
                });

                //페이지
                self.$pagination.vcPagination().on('page_click', function(e, data) {
                    //기존에 입력된 데이타와 변경된 페이지로 검색
                    if(selectedTab == 'customer') {
                        customerCurrentPage = data;
                        _self.requestCustomerSearch(searchedValue);
                    } else {
                        currentPage = data;
                        _self.requestSearchProduct(searchedValue);
                    }
                });

                //검색 닫기버튼
                self.$searchInputClose.on("click", function(e) {
                    clearTimeout(searchTimer);
                    _self.setSearchInputLayerVisible(false);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);

                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        //최근검색어,인기검색어 노출
                        self.$inputSearchList.hide();
                        self.$searchKeywordArea.show();
                        self.$noInputSearchData.hide();
                        _self.setSearchInputLayerVisible(true);
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        _self.requestTimerSearch(searchVal);
                    }, searchDelay);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(searchTimer);
                    _self.setSearchInputLayerVisible(false);
                    var searchVal = self.$inputSearch.val();
                    _self.requestSearch(searchVal, false);
                });

                //입력값으로 강제 검색하기
                self.$searchInputText.on('click', function(e){
                    clearTimeout(searchTimer);
                    _self.setSearchInputLayerVisible(false);
                    var searchVal = $(this).attr('href').replace("#", "");
                    self.$inputSearch.val(searchVal);
                    _self.requestSearch(searchVal, true);
                });

                //최근검색어 클릭
                searchItemTarget = 'dd.list ul li a';
                self.$recentKeywordList.on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    _self.clickSearchItem($(this));
                });

                //최근검색어 삭제 클릭
                searchItemTarget = 'dd.list ul li button';
                self.$recentKeywordList.on('click', searchItemTarget, function(e){
                    var data_text = $(this).attr('data-text');
                    _self.removeRecentSearcheText(data_text);
                });

                //인기검색어 클릭
                searchItemTarget = 'dd.list ul li a';
                self.$popularKeywordList.on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    _self.clickSearchItem($(this));
                });

                //연관검색어 클릭
                searchItemTarget = 'ul li a';
                self.$relatedKeywordList.on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    _self.clickSearchItem($(this));
                });

                //추천상품 찜하기 클릭
                searchItemTarget = 'div.result-list-wrap div.list-wrap ul li div.item div.product-wish span.chk-wish-wrap input';
                self.$suggestedList.on('click', searchItemTarget, function(e){
                    _self.changeBlindLabelTextSiblingCheckedInput(this, "찜한상품","찜하기");
                    _self.requestWish($(this).attr('data-id'),$(this).is(':checked'));
                });
            },

            clickSearchItem:function($item) {
                var searchVal = $item.attr('href').replace("#", "");
                self.$inputSearch.val(searchVal);
                self.$buttonSearch.trigger('click');
            },

            checkCountData:function(item) {
                return item ? (item.count ? item.count : 0) : 0;
            },

            checkArrayData:function(item) {
                return item ? (item.data instanceof Array ? item.data : []) : [];
            },

            showAnimation:function($item) {
                $item.css({'opacity':0});
                $item.show();
                $item.animate({opacity:1},100);
            },

            hideAnimation:function($item) {
                $item.animate({opacity:0},100,function() {
                    $item.hide();
                    $item.css({'opacity':1});
                });
            },

            setSearchInputLayerVisible:function(visible) {
                if(searchInputLayerVisible == visible) return;
                var _self = this;
                visible ? _self.showAnimation(self.$searchInputLayer) : _self.hideAnimation(self.$searchInputLayer);
                searchInputLayerVisible = visible;
            },

            removeRecentSearcheText:function(text) {
                var _self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }

                var findIndex = $.inArray(text, searchedList);
                if(findIndex >= 0) {
                    searchedList.splice(findIndex, 1);
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                _self.updateRecentSearcheList();
            },

            addRecentSearcheText:function(text) {
                if(!text || text.length < 1) return;
                var _self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }
                var findIndex = $.inArray(text, searchedList);
                if(findIndex < 0) {
                    searchedList.push(text);
                    if(searchedList.length > 5) {
                        searchedList.shift();
                    }
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                _self.updateRecentSearcheList();
            },

            updateRecentSearcheList:function() {
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                var arr = searchedList instanceof Array ? searchedList : [];
                if(arr.length > 0) {
                    var $list_ul = self.$recentKeywordList.find('dd.list ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recentItemTemplate, {"text":item}));
                    });
                    self.$recentKeywordList.show();
                } else {
                    self.$recentKeywordList.hide();
                }
            },

            updateTabLabel:function(tabItemIndex, count) {
                var tabItem = self.$tab.find('li').eq(tabItemIndex);
                var tabA = tabItem.find('a');
                if(count > 0) {
                    var em = tabA.children().clone();
                    var label = tabItem.attr('data-label');
                    tabA.text(label + '(' + vcui.number.addComma(count) + ')');
                    tabA.append(em);
                    tabItem.show();
                } else {
                    tabItem.hide();
                }
            },

            updateMobileSortFilter: function($sortItems) {

                var $sortList = $('.lay-filter').find('div.list-acco-sorting ul li div.ui_accord_content div.cont');
                $sortList.empty();

                var value = $('#'+selectedTab).find('div.list-sorting').find('.ui_selectbox').vcSelectbox('value');

                $sortItems.each(function(index, item) {
                    var itemValue = $(item).attr("data-value");
                    $sortList.append(vcui.template(sortingInputTemplate, {"index":(""+(index+1)),"value":itemValue, "text":$(item).attr("data-text"), "checked":(value==itemValue)}));
                });
            
            },

            updateRecommendList: function(listData) {
                var arr = listData instanceof Array ? listData : [];
                if(arr.length > 0) {
                    var $list_ul = self.$recommendList.find('ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recommendItemTemplate,item));
                    });
                    self.$recommendList.show();
                } else {
                    self.$recommendList.hide();
                }
            },

            changeBlindLabelTextSiblingCheckedInput:function (input, trueText, falseText) {
                $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
            },

            requestWish:function(productId, isWish) {
                //찜하기
                var ajaxUrl = self.$contentsSearch.attr('data-url-wish');
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    data: {"id":productId, "wish":isWish}
                })
            },

            requestTimerSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-url-timer');
                //console.log(ajaxUrl,searchValue);

                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var timerSearchedValue = d.param.searchedValue;
                    var replaceText = '<span class="search-word">' + timerSearchedValue + '</span>';

                    var data = d.data;
                    //console.log(data);

                    var param = d.param;

                    //인기검색어 갱신
                    var arr = data.popular instanceof Array ? data.popular : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$popularKeywordList.find('dd.list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(popularItemTemplate, {"text":item}));
                        });
                        self.$popularKeywordList.show();
                    } else {
                        self.$popularKeywordList.hide();
                    }

                    //검색어 갱신
                    arr = data.search instanceof Array ? data.search : [];

                    if(arr.length > 0) {
                        var $list_ul = self.$inputSearchList.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(inputSearchListItemTemplate, {"input":item, "text":item.replaceAll(timerSearchedValue,replaceText)}));
                        });

                        self.$inputSearchList.show();
                        self.$searchKeywordArea.hide();
                        self.$noInputSearchData.hide();
                        _self.setSearchInputLayerVisible(true);
                    } else {
                        self.$noInputSearchData.html(vcui.template(inputSearchNoDataTemplate, {"text":param.input}));

                        self.$inputSearchList.hide();
                        self.$searchKeywordArea.hide();
                        self.$noInputSearchData.show();
                        _self.setSearchInputLayerVisible(true);
                    }
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            //검색 ignoreRelated이 참일 경우 연관검색어 무시
            requestSearch:function(searchValue, ignoreRelated) {
                var _self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-url-search');
                //console.log(ajaxUrl,ignoreRelated,searchValue);

                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue, "ignoreRelated":ignoreRelated}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    searchedValue = d.param.searchedValue;
                    var searchedInput = d.param.searchedInput;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //최근검색어 갱신
                    _self.addRecentSearcheText(searchedValue);
                    
                    //자동변환 검색어 라벨
                    self.$searchResultText.find('span').text('“'+ searchedValue +'”');
                    self.$searchResultText.show();

                    //사용자 입력 검색어 라벨
                    if(searchedInput == searchedValue) {
                        self.$searchInputText.hide();
                    } else {
                        self.$searchInputText.attr('href','#' + searchedInput);
                        self.$searchInputText.text('“'+ searchedInput +'” 검색 결과로 이동');    
                        self.$searchInputText.show();
                    }
                    
                    var data = d.data;

                    //연관검색어
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

                    //검색결과-카테고리 갱신
                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$resultAllCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text}));
                        });
                        self.$resultAllCategory.show();
                    } else {
                        self.$resultAllCategory.hide();
                    }

                    var showResult = false;

                    //nodata test
                    /*
                    data.all = null;
                    data.product = null;
                    data.care = null;
                    data.event = null;
                    data.story = null;
                    data.additional = null;
                    data.customer = null;
                    */

                    //전체
                    var count = _self.checkCountData(data.all);
                    _self.updateTabLabel(0,count);

                    //제품
                    arr = _self.checkArrayData(data.product);
                    count = _self.checkCountData(data.product);
                    _self.updateTabLabel(1,count);
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultAllProduct.find('div.list-wrap ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            if (item.sale == "0" || item.sale == 0) {
                                item.sale = null;
                            }
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            $list_ul.append(vcui.template(productItemTemplate,item));
                        });
                        self.$resultAllProduct.show();
                    } else {
                        self.$resultAllProduct.hide();
                    }

                    //케어솔루션
                    arr = _self.checkArrayData(data.care);
                    count = _self.checkCountData(data.care);
                    _self.updateTabLabel(2,count);
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultAllCare.find('div.list-wrap ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            if (item.sale == "0" || item.sale == 0) {
                                item.sale = null;
                            }
                            item.price = item.price ? vcui.number.addComma(item.price) : null
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            $list_ul.append(vcui.template(careItemTemplate,item));
                        });
                        self.$resultAllCare.show();
                    } else {
                        self.$resultAllCare.hide();
                    }

                    //이벤트
                    arr = _self.checkArrayData(data.event);
                    count = _self.checkCountData(data.event);
                    _self.updateTabLabel(3,count);
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultAllEvent.find('div.box-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                            item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                            $list_ul.append(vcui.template(eventItemTemplate,item));
                        });
                        self.$resultAllEvent.show();
                    } else {
                        self.$resultAllEvent.hide();
                    }

                    //스토리
                    arr = _self.checkArrayData(data.story);
                    count = _self.checkCountData(data.story);
                    _self.updateTabLabel(4,count);
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultAllStory.find('div.box-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                            item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                            $list_ul.append(vcui.template(storyItemTemplate,item));
                        });
                        self.$resultAllStory.show();
                    } else {
                        self.$resultAllStory.hide();
                    }

                    //소모품
                    arr = _self.checkArrayData(data.additional);
                    count = _self.checkCountData(data.additional);
                    _self.updateTabLabel(5,count);
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultAllAdditional.find('div.list-wrap ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.price = item.price ? vcui.number.addComma(item.price) : null
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            $list_ul.append(vcui.template(additionalItemTemplate,item));
                        });
                        self.$resultAllAdditional.show();
                    } else {
                        self.$resultAllAdditional.hide();
                    }

                    //고객지원
                    var showCustomerResult = false;
                    var customerData = data.customer ? data.customer : {};

                    //고객지원-제품지원
                    arr = customerData.support instanceof Array ? customerData.support : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerSupport.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            $list_ul.append(vcui.template(customerListItemTemplate,item));
                        });
                        self.$resultAllCustomerSupport.show();
                    } else {
                        self.$resultAllCustomerSupport.hide();
                    }

                    //고객지원-드라이버
                    arr = customerData.driver instanceof Array ? customerData.driver : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerDriver.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                        });
                        self.$resultAllCustomerDriver.show();
                    } else {
                        self.$resultAllCustomerDriver.hide();
                    }

                    //고객지원-문제해결
                    arr = customerData.trouble instanceof Array ? customerData.trouble : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerTrouble.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                        });
                        self.$resultAllCustomerTrouble.show();
                    } else {
                        self.$resultAllCustomerTrouble.hide();
                    }

                    //고객지원-설명서
                    arr = customerData.manual instanceof Array ? customerData.manual : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerManual.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                        });
                        self.$resultAllCustomerManual.show();
                    } else {
                        self.$resultAllCustomerManual.hide();
                    }

                    //고객지원-FAQ
                    arr = customerData.faq instanceof Array ? customerData.faq : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerFaq.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                        });
                        self.$resultAllCustomerFaq.show();
                    } else {
                        self.$resultAllCustomerFaq.hide();
                    }

                    if(showCustomerResult) {
                        self.$resultAllCustomer.show();
                    } else {
                        self.$resultAllCustomer.hide();
                    }

                    //고객지원-비디오
                    arr = customerData.video instanceof Array ? customerData.video : [];
                    if(arr.length > 0) {
                        showResult = true;
                        showCustomerResult = true;
                        var $list_ul = self.$resultAllCustomerVideo.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(customerVideoItemTemplate,item));
                        });

                        self.$resultAllCustomerVideo.find('.youtube-box').vcYoutubeBox();

                        self.$resultAllCustomerVideo.show();
                    } else {
                        self.$resultAllCustomerVideo.hide();
                    }

                    count = _self.checkCountData(data.customer);
                    _self.updateTabLabel(6,count);
                    if(showCustomerResult) {
                        self.$resultAllCustomer.show();
                    } else {
                        self.$resultAllCustomer.hide();
                    }
                    
                    //데이타 없음 화면 처리

                    //데이타 없을때 나올 추천상품
                    arr = data.suggested instanceof Array ? data.suggested : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$suggestedList.find('div.result-list-wrap div.list-wrap ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            if (item.sale == "0" || item.sale == 0) {
                                item.sale = null;
                            }
                            item.index = index;
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            $list_ul.append(vcui.template(suggestedItemTemplate,item));
                        });
                    } else {
                        var $list_ul = self.$suggestedList.find('div.result-list-wrap div.list-wrap ul');
                        $list_ul.empty();
                    }

                    if(showResult) {
                        self.$noData.hide();
                        self.$suggestedList.hide();
                        self.$searchSimilar.show();
                        self.$resultLayer.show();
                    } else {
                        self.$noData.find('div.no-data p span em').text('“' + searchedValue + '”');
                        self.$noData.show();
                        self.$suggestedList.show();
                        self.$searchSimilar.hide();
                        self.$resultLayer.hide();
                    }

                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            requestSearchProduct:function(searchValue) {
                var _self = this;
                var searchItemTarget = 'ul.tabs li a[href="#' + selectedTab + '"]';
                var ajaxUrl = self.$tab.find(searchItemTarget).attr('data-url-search');

                var postData = (selectedTab == "event") ? {"search":searchValue} : vcui.extend(_self.convertPostData(storageFilters), {"search":searchValue});
                console.log(ajaxUrl,postData);
                
                $.ajax({
                    url: ajaxUrl,
                    data: postData,
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var data = d.data;
                    //console.log(d);

                    //제품 리스트
                    var arr = _self.checkArrayData(data);
                    var count = _self.checkCountData(data);
                    var paramSearchedValue = d.param.searchedValue;
                    var replaceText = '<span class="search-word">' + paramSearchedValue + '</span>';

                    var $list_sorting = $('#'+selectedTab).find('div.list-sorting');
                    var $list_count = $list_sorting.find('div.list-count');
                    $list_count.text('총 ' + vcui.number.addComma(count)+'개');

                    currentPage = d.param.pagination.page;
                    $pagination = $('#'+selectedTab).find('div.pagination');
                    $pagination.vcPagination('setPageInfo',d.param.pagination);

                    var $list = null;
                    var $list_ul = null;
                    switch(selectedTab) {
                        case "product":
                        case "care":
                        case "additional":
                            $list = $('#'+selectedTab).find('div.result-area');
                            $list_ul = $list.find('div.list-wrap ul');
                            $list_ul.empty();
                            break;
                        case "event":
                        case "story":
                            $list = $('#'+selectedTab).find('div.search-result-wrap');
                            $list_ul = $('#'+selectedTab).find('div.box-list ul');
                            $list_ul.empty();
                            break;
                        default:
                            break;
                    }

                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            switch(selectedTab) {
                                case "product": {
                                    if (item.sale == "0" || item.sale == 0) {
                                        item.sale = null;
                                    }
                                    item.price = item.price ? vcui.number.addComma(item.price) : null;
                                    switch(item.itemType) {
                                        case "1":
                                            item.title = item.title.replaceAll(paramSearchedValue,replaceText);
                                            $list_ul.append(vcui.template(productItemTemplate,item));
                                            break;
                                        case "2":
                                            $list_ul.append(vcui.template(productBannerTemplate,item));
                                            break;
                                        default:
                                            break;
                                    }
                                    break;
                                }

                                case "care": {
                                    if (item.sale == "0" || item.sale == 0) {
                                        item.sale = null;
                                    }
                                    item.price = item.price ? vcui.number.addComma(item.price) : null
                                    item.title = item.title.replaceAll(paramSearchedValue,replaceText);
                                    $list_ul.append(vcui.template(careItemTemplate,item));
                                    break;
                                }

                                case "event": {
                                    item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                                    item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                                    $list_ul.append(vcui.template(eventItemTemplate,item));
                                    break;
                                }

                                case "story": {
                                    item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                                    item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                                    $list_ul.append(vcui.template(storyItemTemplate,item));
                                    break;
                                }

                                case "additional": {
                                    item.price = item.price ? vcui.number.addComma(item.price) : null
                                    item.title = item.title.replaceAll(paramSearchedValue,replaceText);
                                    $list_ul.append(vcui.template(additionalItemTemplate,item));
                                    break;
                                }
                                default:
                                    break;
                            }
                        });
                        $list.show();
                    } else {
                        $list.hide();
                    }

                    //추천상품
                    _self.updateRecommendList(data.recommend);

                    //전체 검색용 noData화면 숨김
                    self.$noData.hide();
                    self.$suggestedList.hide();

                    //필터 메뉴
                    var enableList = d.filterEnableList;
                    var filterList = d.filterList;

                    var filterObj = vcui.array.reduce(filterList, function (prev, cur) {
                        if(prev[cur['filterId']]) prev[cur['filterId']].push(cur);
                        else prev[cur['filterId']] = [cur];
                        return prev;
                    }, {});

                    var newFilterArr = [];

                    for(var key in filterObj){
                        var filterValues = vcui.array.map(filterObj[key], function(item, index) {	
                            var enableArr = vcui.array.filter(enableList, function(target){
                                // ** facetValueId->filterValueId facetValueId 삭제됨. filterValueId로 대체되어야함.
                                if(target['filterId'] == item['filterId']){
                                    return vcui.array.filter(item['facetValueId'].split(','), function(fItem){
                                        return target['facetValueId'] == item['facetValueId'];
                                    });
                                }else{
                                    return false;
                                }
                                /*
                                if(target['filterId'] == item['filterId'] && target['filterValueId'] == item['filterValueId']){
                                    return true;
                                }else{
                                    return false;
                                }*/
                            });

                            var obj = {
                                'filterName' : item['filterName'], 
                                'filterValueName' : item['filterValueName'], 
                                'filterValueId' : item['filterValueId'], 
                                'facetValueId' : item['facetValueId'], 
                                'modelCount' : item['countModel'],
                                'filterTypeCode' : item['filterTypeCode'], //00(슬라이더),..
                                'rangePointStyle' : item['rangePointStyle'],
                                'facetSourceCode': item['facetSourceCode'], //COLR(칼라칩),..
                                'filterOrderNo': item['filterOrderNo'],
                            } 

                            if(enableArr.length>0){ 
                                var eArr = vcui.array.filter(enableArr, function(eItem){
                                    return eItem['facetValueId'] == obj['facetValueId'];
                                });
                                if(eArr.length>0){
                                    obj['modelCount'] = eArr[0]['modelCount'];
                                    obj['enable'] = eArr[0]['enable'];
                                }
                            };
                            
                            return obj;
                        });

                        filterValues = vcui.array.reduce(filterValues, function(prev, cur){
                            var items = vcui.array.filter(prev, function(item, index) {
                                return item['filterValueId'] === cur['filterValueId'];
                            });
                            if(items.length===0){ 
                                prev.push(cur);
                            }else{
                                //**facetValueId 삭제되면 주석처리 필요.
                                prev[prev.length-1]['facetValueId'] = prev[prev.length-1]['facetValueId'] +','+ cur['facetValueId'];
                            }	  
                            return prev;
                        },[]);

                        if(filterValues.length > 0){
                            newFilterArr.push({ 
                                filterId : key,
                                filterTypeCode : filterValues[0]['filterTypeCode'],
                                facetSourceCode : filterValues[0]['facetSourceCode'],
                                filterName : filterValues[0]['filterName'],
                                filterOrderNo : filterValues[0]['filterOrderNo'],
                                data : filterValues, 
                            });
                        }
                    }                       
                    
                    newFilterArr.sort(function(a, b) { 
                        return parseInt(a.filterOrderNo) < parseInt(b.filterOrderNo) ? -1 : parseInt(a.filterOrderNo) > parseInt(b.filterOrderNo) ? 1 : 0;
                    });

                    savedFilterArr = newFilterArr;
                    _self.updateFilter(newFilterArr);

                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            //고객지원 하위탭 조회 jsw
            requestCustomerSearch:function(searchValue) {
                var _self = this;
                var searchItemTarget = 'ul.tabs li a[href="#' + customerSelectedTab + '"]';
                var ajaxUrl = self.$customerTab.find(searchItemTarget).attr('data-url-search');

                var postData = (customerSelectedTab == "customer-all") ? {"search":searchValue} : vcui.extend(_self.convertPostData(storageFilters), {"search":searchValue});
                console.log(ajaxUrl,postData);
                
                $.ajax({
                    url: ajaxUrl,
                    data: postData,
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var customerData = d.data;
                    var count = _self.checkCountData(customerData);
                    var paramSearchedValue = d.param.searchedValue;
                    var replaceText = '<span class="search-word">' + paramSearchedValue + '</span>';

                    var $list_sorting = $('#'+selectedTab).find('div.list-sorting');
                    var $list_count = $list_sorting.find('div.list-count');
                    $list_count.text('총 ' + vcui.number.addComma(count)+'개');

                    customerCurrentPage = d.param.pagination.page;
                    var $pagination = $('#'+customerSelectedTab).find('div.pagination');
                    $pagination.vcPagination('setPageInfo',d.param.pagination);

                    if(customerSelectedTab == 'customer-all') {
                        //고객지원-제품지원
                        var arr = customerData.support instanceof Array ? customerData.support : [];
                        var $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(0);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.list-wrap ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                item.title = item.title.replaceAll(paramSearchedValue, replaceText);
                                $list_ul.append(vcui.template(customerListItemTemplate,item));
                            });
                            $list.show();
                        } else {
                            $list.hide();
                        }

                        //고객지원-드라이버
                        arr = customerData.driver instanceof Array ? customerData.driver : [];
                        $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(1);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.box-list ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                            });
                            $list.show();
                        } else {
                            $list.hide();
                        }

                        //고객지원-문제해결
                        arr = customerData.trouble instanceof Array ? customerData.trouble : [];
                        $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(2);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.box-list ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                            });
                            $list.show();
                        } else {
                            $list.hide();
                        }

                        //고객지원-설명서
                        arr = customerData.manual instanceof Array ? customerData.manual : [];
                        $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(3);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.box-list ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                            });
                            $list.show();
                        } else {
                            $list.hide();
                        }

                        //고객지원-FAQ
                        arr = customerData.faq instanceof Array ? customerData.faq : [];
                        $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(4);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.box-list ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                            });
                            $list.show();
                        } else {
                            $list.hide();
                        }

                        //고객지원-비디오
                        arr = customerData.video instanceof Array ? customerData.video : [];
                        $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(5);
                        if(arr.length > 0) {
                            var $list_ul = $list.find('div.box-list ul');
                            $list_ul.empty();
                            arr.forEach(function(item, index) {
                                $list_ul.append(vcui.template(customerVideoItemTemplate,item));
                            });

                            $list.find('.youtube-box').vcYoutubeBox();

                            $list.show();
                        } else {
                            $list.hide();
                        }
                    } else {
                        var arr = _self.checkArrayData(customerData);
                        var $list = $('#'+customerSelectedTab).find('div.result-list-wrap').eq(0);
                        var $list_ul = $list.find('div.box-list ul');
                        $list_ul.empty();
                        if(arr.length < 1) {
                            $list.hide();
                        }
                        switch(customerSelectedTab) {
                            case "customer-video":
                                arr.forEach(function(item, index) {
                                    $list_ul.append(vcui.template(customerVideoItemTemplate,item));
                                });
                                $list.find('.youtube-box').vcYoutubeBox();
                                $list.show();
                                break;
                            default:
                                arr.forEach(function(item, index) {
                                    $list_ul.append(vcui.template(customerBoxItemTemplate,item));
                                });
                                $list.show();
                                break;
                        }
                    }

                    /*
                    count = _self.checkCountData(data.customer);
                    _self.updateTabLabel(6,count);
                    if(showCustomerResult) {
                        self.$resultAllCustomer.show();
                    } else {
                        self.$resultAllCustomer.hide();
                    }
                    */

                    //추천상품
                    _self.updateRecommendList(customerData.recommend);

                    //전체 검색용 noData화면 숨김
                    self.$noData.hide();
                    self.$suggestedList.hide();


                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            // 필터 관련 처리

            filterBindEvents: function() {
                var _self = this;
                
                // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
                $('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged',function (e, data) {
                    $(e.currentTarget).siblings('.min').text(vcui.number.addComma(data.minValue));
                    $(e.currentTarget).siblings('.max').text(vcui.number.addComma(data.maxValue));
                    if(e.type=='rangesliderchanged'){
                        var filterId = $(e.currentTarget).data('filterId');
                        _self.setSliderData(filterId, data);
                    }
                }).vcRangeSlider({mode:true});

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
                        valueStr = valueStr + item.value+','
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

            // 필터 리셋후 데이터를 호출함.
            reset:function() {
                console.log('reset',savedFilterArr);
                var _self = this;
                for(var key in storageFilters) {	                        
                    var $parent = $('[data-id="'+ key +'"]');
                    $parent.find('input[name="'+key+'"]').prop('checked', false);                    
                    if($parent.find('[data-filter-id="'+ key +'"]').data('ui_rangeSlider')){
                       $parent.find('[data-filter-id="'+ key +'"]').vcRangeSlider('reset', 'Min,Max');
                    }
                }

                storageFilters = {};
                _self.setApplyFilter(storageFilters);
                //_self.requestSearchProduct(searchedValue);
            },

            // 슬라이더 값을 스토리지에 저장함.
            setSliderData:function(id, data) {
                var _self = this;
                var inputStr = ''
                for(var key in data) inputStr += data[key]+',';
                inputStr = inputStr.replace(/,$/,'');
                storageFilters[id] = inputStr;
                //lgkorUI.setStorage(storageName, storageFilters);
                _self.setApplyFilter(storageFilters);
            },

            // **필터에 상태를 설정후 데이터를 호출함 (슬라이더,체크박스를 저장된 값으로 설정).
            // setApplyFilter(obj, true) => 설정만 실행
            setApplyFilter:function(obj, noRequest) {
                var _self = this;
                for(var key in obj){		
                    var $parent = $('[data-id="'+ key +'"]');
                    var values = obj[key].split(',');
                    for(var i=0; i<values.length; i++){
                        $parent.find('input[data-value="'+ values[i] +'"]').prop('checked', true);
                    }
                    if($parent.find('[data-filter-id="'+ key +'"]').data('ui_rangeSlider')){
                        $parent.find('[data-filter-id="'+ key +'"]').vcRangeSlider('reset', obj[key]);
                    }
                    if(key == 'subCategoryId'){

                        $('#'+selectedTab).find('input[name="categoryCheckbox"]').each(function(idx, item){
                            var fArr = vcui.array.filter(values, function(target){
                                return target == item.value;
                            });
                            $(item).prop('checked', fArr.length > 0? true:false);
                        });
                                               
                        var len = $('input[name="categoryCheckbox"]:checked').length/2;
                        $('#categoryCnt').text(len + '개 선택'); 
                    }	
                }

                // 선택된 필터값이 있을경우 처리
                var keys = Object.keys(obj);
                if(keys.length > 0) {
                    $('#'+selectedTab).find('div.btn-filter').addClass('applied');
                    $('#'+selectedTab).find('div.btn-filter a span').text('옵션 적용됨');
                } else {
                    $('#'+selectedTab).find('div.btn-filter').removeClass('applied');
                    $('#'+selectedTab).find('div.btn-filter a span').text('옵션필터');
                }
                // 데이터를 호출함. 
                if(!noRequest) _self.requestSearchProduct(searchedValue);
            },

            // 필터의 비활성 및 선택 갯수를 업데이트
            updateFilter:function(arr) {

                for(var i=0; i<arr.length; i++){
                    var item = arr[i];
                    var itemArr = item.data;
                    var $parent = $('[data-id="'+ item['filterId'] +'"]');

                    for(var j=0; j<itemArr.length; j++){
                        $parent.find('input[value="'+ itemArr[j]['filterValueId']+'"]').prop('disabled', itemArr[j]['enable']=='N');
                    }

                    var len = $parent.find('input:checked').length;
                    $parent.find('.sel_num').html('<span class="blind">총 선택 갯수</span> ('+ len +')</span>');

                }
            },

            // 슬라이더(가격,사이즈)정보를 filterValueId 로 변경합.
            getSlideFilterValueId:function(arr, value, isMin) {
                var returnStr='';
                var num = parseInt(value);
                for(var i=0; i<arr.length; i++){
                    var value1 = parseInt(arr[i]['filterValueName']);
                    var value2 = parseInt(arr[i+1] && arr[i+1]['filterValueName']);
                    if(value1 <= num && value2 >= num ){
                        if(isMin){
                            if(value1==num){
                                returnStr = arr[i]['filterValueId'];
                            }else{
                                returnStr = arr[i+1]['filterValueId'];
                            }                            
                        }else{
                            if(value2==num){
                                returnStr = arr[i+1]['filterValueId'];
                            }else{
                                returnStr = arr[i]['filterValueId'];
                            }                            
                        }
                        break;
                    }
                }
                return returnStr;
            },

            // ajax 보내는 데이터를 변경.(가격정보,사이즈정보를 id값으로 변경합.)
            convertPostData:function(obj) {
                var _self = this;

                var $target = $('#'+selectedTab).find('div.list-sorting').find('.ui_selectbox');
                var sortValue = $target.vcSelectbox('selectedOption').value;

                $target = $('#'+selectedTab).find('div.check-soldout span.chk-wrap input[type="checkbox"]');
                var includeSoldOut = $target.is(':checked');
                
                var nObj = vcui.extend({
                    sort: sortValue,
                    includeSoldOut: includeSoldOut,
                    page : currentPage,
                }, obj);

                for(var key in obj){
                    var fArr = vcui.array.filter(savedFilterArr, function(item){
                        return item.filterId == key && item.filterTypeCode=='00';
                    });                    
                    if(fArr.length>0){
                        var filterName = fArr[0]['filterName'].toLowerCase();
                        if(filterName == 'price' || filterName == 'size'){
                            var values = fArr[0]['data'];
                            var sArr = obj[key].split(',');
                            if(sArr.length>1){
                                if(vcui.isNumber(parseInt(sArr[0]))){
                                    nObj[filterName+'Min'] = _self.getSlideFilterValueId(values, sArr[0], true);
                                }else{
                                    nObj[filterName+'Min'] = '';
                                }
                                if(vcui.isNumber(parseInt(sArr[1]))){
                                    nObj[filterName+'Max'] = _self.getSlideFilterValueId(values, sArr[1], false);
                                }else{
                                    nObj[filterName+'Max'] = '';
                                }
                            }
                            delete nObj[key];
                        }
                    }
                }
                return nObj;
            }
        }
        search.init();
    });
})();