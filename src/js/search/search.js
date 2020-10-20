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

    var suggestedTagItemTemplate = '<li><a href="#{{text}}" class="rounded"><span class="text">#{{text}}</span></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text">이것을 찾으셨나요? “{{text}}”</a>'

    var searchInputLayerVisible = false;
    var minLength = 1;
    var searchDelay = 2000;
    var searchTimer = null;
    var searchedValue = null;

    $(window).ready(function() {
        var search = {
            init: function() {
                self.$contentsSearch = $('div.contents.search');
                self.$searchLayer = self.$contentsSearch.find('div.input-keyword');
                self.$resultLayer = self.$contentsSearch.find('div.cont-wrap').eq(0);
                self.$tab = self.$contentsSearch.find('div.tabs-wrap.ui_tab');

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


                self.$noData = self.$contentsSearch.find('div.search-not-result');
                self.$suggestedList = self.$contentsSearch.find('div.suggested-list-wrap');

                
                self.$searchInputLayer.hide();
                self.$relatedKeywordList.hide();
                self.$searchResultText.hide();
                self.$searchInputText.hide();

                
                var _self = this;
                _self.updateRecentSearcheList();

                _self.bindEvents();
            },

            bindEvents: function() {
                var _self = this;

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
        
                    var searchedValue = d.param.searchedValue;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    var data = d.data;
                    console.log(data);

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
                            $list_ul.append(vcui.template(inputSearchListItemTemplate, {"input":item, "text":item.replaceAll(searchedValue,replaceText)}));
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
                console.log(ajaxUrl,ignoreRelated,searchValue);

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

                        vcui.require([ 
                            "ui/youtubeBox",
                        ], function () {
                            self.$resultAllCustomerVideo.find('.youtube-box').vcYoutubeBox();
                        });

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
                    if(showResult) {
                        self.$noData.hide();
                        self.$suggestedList.hide();
                        self.$searchSimilar.show();
                        self.$resultLayer.show();
                    } else {
                        self.$noData.show();
                        self.$suggestedList.show();
                        self.$searchSimilar.hide();
                        self.$resultLayer.hide();
                    }


                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        }
        search.init();
    });
})();

