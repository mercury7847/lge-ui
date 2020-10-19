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
        '<div class="product-image" aria-hidden="true"><a href="#"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-contents"><div class="flag-wrap">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
        '<div class="product-info"><div class="product-name"><a href="#">{{#raw title}}</a></div>' +
        '<div class="sku">{{sku}}</div>' +
        '<div class="review-info"><a href="#">' +
        '{{#if isReview}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{/if}}' +
        '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div><div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' +
        '</a></div></div>' +
        '<div class="price-area"><div class="total-price">' +
        '{{#if price}}<em class="blind">최대 혜택가격</em><span class="price">{{price}}<em>원</em></span>{{/if}}' +
        '</div>' +
        '<div class="product-price"><div class="discount-rate">' +
        '{{#if sale}}<em class="blind">할인율</em><span class="price">{{sale}}<em>%</em></span>{{/if}}' +
        '</div></div></div>' +
        '<div class="hashtag-wrap">{{#each item in hash}}<span class="hashtag">#{{item}} </span>{{/each}}' +
        '</div></div></div></li>';

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

                self.$resultWrap = self.$contentsSearch.find('div.search-result-wrap');
                self.$resultCategory = self.$resultWrap.find('div.result-category');
                self.$resultProduct = self.$resultWrap.find('#product');
                

                self.$noData = self.$contentsSearch.find();
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

            requestTimerSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-url-timer');

                console.log(ajaxUrl,searchValue,self.$inputSearchList);
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
                    console.log(self.$relatedKeywordList,arr);
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
                    var showResult = false;

                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text}));
                        });
                        self.$resultCategory.show();
                    } else {
                        self.$resultCategory.hide();
                    }


                    //제품
                    arr = data.product instanceof Array ? data.product : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultProduct.find('div.list-wrap ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            if (item.sale == "0" || item.sale == 0) {
                                item.sale = null;
                            }
                            item.price = vcui.number.addComma(item.price);
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            console.log(item);
                            $list_ul.append(vcui.template(productItemTemplate,item));
                        });
                        self.$resultProduct.show();
                    } else {
                        self.$resultProduct.hide();
                    }
                    /*
                    //검색결과-제품 갱신
                    arr = data.preview instanceof Array ? data.preview : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultPreview.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            item.price = vcui.number.addComma(item.price);
                            $list_ul.append(vcui.template(previewItemTemplate, item));
                        });
                        self.$resultPreview.vcImageSwitch('reload');
                        self.$resultPreview.show();
                    } else {
                        self.$resultPreview.hide();
                    }

                    
                    //연관 검색어
                    var similarText = data.similarText;
                    if(similarText) {
                        showResult = true;
                        self.$searchSimilar.html(vcui.template(similarTextTemplate, {"text":similarText}));
                        self.$searchSimilar.show();
                    } else {
                        self.$searchSimilar.hide();
                    }

                    //검색결과가 있을 경우 최근/인기/추천 검색어 숨김
                    if(showResult) {
                        self.$searchKeywordArea.hide();
                    } else {
                        self.$searchKeywordArea.show();
                    }
                    */

                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        }
        search.init();
    });
})();

