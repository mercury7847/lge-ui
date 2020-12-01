(function() {
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';

    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text"><span class="search-word">“{{text}}”</span> 찾으시나요?</a>'

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

                //검색 결과 - 카테고리
                self.$searchResultCategory = self.$contentsSearch.find('div.search-result-category');
                //카테고리 더보기 버튼
                self.searchResultCategoryMore = self.$searchResultCategory.find('a.btn-moreview');

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

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearch(searchVal, false);
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
                    self.requestSearch(searchVal, true);
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
                self.searchResultCategoryMore.on('click', function(e){
                    e.preventDefault();
                    if(self.$searchResultCategory.hasClass('open')) {
                        self.$searchResultCategory.removeClass('open');
                        /*
                        if(window.breakpoint.isMobile) {
                            self.$searchResultCategory.find('div.inner').css('height','100px');
                        } else {
                            self.$searchResultCategory.find('div.inner').css('height','108px');
                        }
                        */
                    } else {
                        self.$searchResultCategory.addClass('open');
                        /*
                        self.$searchResultCategory.find('div.inner').css('height','auto');
                        */
                    }
                });
                /*
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
                */

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
            requestSearch:function(value, force) {
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-search-url');
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
                    self.$relatedKeywordList.addClass('open');

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

                    self.$searchResultCategory.removeClass('open');
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
                        self.searchResultCategoryMore.show();
                    } else {
                        self.searchResultCategoryMore.hide();
                    }
                    */
                    
                    //최근검색어 저장
                    console.log(searchedValue);
                    self.addRecentSearcheText(searchedValue);
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
            }
        }

        intergratedSearch.init();
    });
})();