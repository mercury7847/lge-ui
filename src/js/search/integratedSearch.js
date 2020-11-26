(function() {
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span><span class="price">{{price}}원</span>' +
        '</div></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text"><span class="search-word">“{{text}}”</span> 찾으시나요?</a>'
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                var self = this;

                self.setting();
                self.updateRecentSearcheList();
                self.bindEvents();
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
                self.$searchLayer = $('#layerSearch');
                //검색어 입력input
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                //검색버튼
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                
                //검색어 리스트 공간
                self.$searchKeywordArea = self.$searchLayer.find('div.search-keyword-area');
                //최근 검색어 리스트
                self.$recentKeywordList = self.$searchKeywordArea.find('div.recent-keyword');
                //인기 검색어 리스트
                self.$popularKeywordList = self.$searchKeywordArea.find('div.popular-keyword');
                //추천 태그 리스트
                self.$suggestedTagsList = self.$searchKeywordArea.find('div.suggested-tags');

                //검색 결과 공간
                self.$searchResultArea = self.$searchLayer.find('div.search-result-area');
                //자동 완성 리스트
                self.$autoComplete = self.$searchResultArea.find('div.auto-complete');
                //검색 결과
                self.$resultPreview = self.$searchResultArea.find('div.result-preview');
                //검색 결과 - 카테고리
                self.$resultCategory = self.$resultPreview.find('div.result-category');
                //검색 결과 - 리스트
                self.$resultPreviewList = self.$resultPreview.find('div.result-preview-list');

                //연관검색어
                self.$searchSimilar = self.$searchLayer.find('div.search-similar');

                self.$searchResultArea.hide();
                self.$searchSimilar.hide();
            },

            bindEvents: function() {
                var self = this;

                //통합검색 노출
                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    self.showAnimation(self.$searchLayer);
                });

                //통합검색 닫음
                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    clearTimeout(self.searchTimer);
                    self.hideAnimation(self.$searchLayer);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearch(searchVal, true);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(self.searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < self.minLength) {
                        return;
                    }  
                  
                    self.searchTimer = setTimeout(function() {
                        self.requestSearch(searchVal, false);
                    }, self.searchDelay);
                });

                //자동완성 리스트 클릭
                self.$autoComplete.on('click', 'div.keyword-list ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //연관검색어 클릭
                self.$searchSimilar.on('click', 'a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //인기검색어 클릭
                self.$popularKeywordList.on('click', 'div.keyword-list ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
                });

                //추천태그 클릭
                self.$suggestedTagsList.on('click', 'div.keyword-list ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
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

                //검색타이머 마우스 오버
                /*
                var searchItemTarget = 'ul li a';
                self.$inputSearchList.on('mouseover', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    var searchVal = $(this).attr('href').replace("#", "");
                    serchMouseOverTimer = setTimeout(function() {
                        self.requestSearch(searchVal);
                    }, searchDelay);
                }).on('mouseout', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                }).on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    self.hideAnimation(self.$inputSearchList);
                    var searchVal = $(this).attr('href').replace("#", "");
                    if(searchedValue != searchVal) {
                        //새로운 값 선택
                        self.requestSearch(searchVal);
                    }
                });
                */
            },

            //검색어창에 입력후 검색
            searchItem:function($item) {
                var self = this;
                var searchVal = $item.attr('href').replace("#", "");
                self.$inputSearch.val(searchVal);
                self.$buttonSearch.trigger('click');
            },

            showAnimation:function($item) {
                $item.show();
                /*
                $item.css({'opacity':0});
                $item.show();
                $item.animate({opacity:1},100);
                */
            },

            hideAnimation:function($item) {
                $item.hide();
                /*
                $item.animate({opacity:0},100,function() {
                    $item.hide();
                    $item.css({'opacity':1});
                });
                */
            },

            //검색어 입력중 검색
            requestSearch:function(value, isSaveRecentKeyword) {
                var self = this;
                var ajaxUrl = self.$searchLayer.attr('data-search-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                    var param = result.param;
                    var data = result.data;

                    var searchedValue = param.searchedValue;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    if(data.searchCount) {
                        self.$resultPreview.find('span.title-line em.count').text("(" + vcui.number.addComma(data.searchCount) + ")");
                    } else {
                        self.$resultPreview.find('span.title-line em.count').text("");
                    }
                    
                    //nodata 테스트
                    // data.autocomplete = null;
                    // data.preview = null;
                    // data.category = null;
                    // data.similarText = null;
                    
                    var showSearchResultArea = false;
                    var showResultPreview = false;

                    //자동완성 리스트 갱신
                    var arr = data.autocomplete instanceof Array ? data.autocomplete : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$autoComplete.find('div.keyword-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":item.replaceAll(searchedValue,replaceText)}));
                        });
                        self.$autoComplete.show();
                        showSearchResultArea = true;
                    } else {
                        self.$autoComplete.hide();
                    }

                    //카테고리 리스트 갱신
                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$resultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text.replaceAll(searchedValue,replaceText)}));
                        });
                        self.$resultCategory.show();
                        showResultPreview = true;
                    } else {
                        self.$resultCategory.hide();
                    }
                    
                    //검색 미리보기 리스트 갱신
                    arr = data.preview instanceof Array ? data.preview : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$resultPreviewList.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            item.price = vcui.number.addComma(item.price);
                            $list_ul.append(vcui.template(previewItemTemplate, item));
                        });
                        self.$resultPreviewList.show();
                        showResultPreview = true;
                    } else {
                        self.$resultPreviewList.hide();
                    }

                    //카테고리나 검색미리보기 결과가 있다
                    if(showResultPreview) {
                        showSearchResultArea = true;
                    }

                    if(showSearchResultArea) {
                        //검색결과가 있는 경우.
                        self.hideAnimation(self.$searchKeywordArea);
                        self.showAnimation(self.$searchResultArea);
                        self.$searchSimilar.hide();
                        if(isSaveRecentKeyword) self.addRecentSearcheText(searchedValue);
                    } else {
                        //검색결과를 표시할것이 없을경우
                        //연관검색어가 있으면 연관검색어를 표시하고 아니면 숨기기
                        if(data.similarText) {
                            self.hideAnimation(self.$searchKeywordArea);
                            self.hideAnimation(self.$searchResultArea);
                            self.$searchSimilar.html(vcui.template(similarTextTemplate, {"text":data.similarText}));
                            self.$searchSimilar.show();
                        } else {
                            self.showAnimation(self.$searchKeywordArea);
                            self.hideAnimation(self.$searchResultArea);
                            self.$searchSimilar.hide();
                        }
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
                self.updateRecentSearcheList();
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
                self.updateRecentSearcheList();
            },

            //최근 검색어 리스트 갱신
            updateRecentSearcheList:function() {
                var self = this;
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                var arr = searchedList instanceof Array ? searchedList : [];
                if(arr.length > 0) {
                    var $list_ul = self.$recentKeywordList.find('div.keyword-list ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recentItemTemplate, {"text":item}));
                    });
                    self.$recentKeywordList.show();
                } else {
                    self.$recentKeywordList.hide();
                }
            }
        }

        intergratedSearch.init();
    });
})();