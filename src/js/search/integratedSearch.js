(function() {
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span><span class="price">{{price}}원</span>' +
        '</div></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text"><span class="search-word">“{{text}}”</span> 찾으시나요?</a>'

    var recentItemTemplate = '<li><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제" data-text="{{text}}"><span class="blind">삭제</span></button></li>';
    var suggestedTagItemTemplate = '<li><a href="#{{text}}" class="rounded"><span class="text">#{{text}}</span></a></li>';
    
    var minLength = 2;
    var searchDelay = 2000;
    var searchTimer = null;
    //var serchMouseOverTimer = null;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                var self = this;

                //통합검색 레이어
                self.$searchLayer = $('#layerSearch');
                //검색어 입력input
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                //검색버튼
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                //검색결과
                self.$search_result_area = self.$searchLayer.find('div.search-result-area');
                
                //검색어 리스트 공간
                self.$searchKeywordArea = self.$searchLayer.find('div.search-keyword-area');
                //최근 검색어 리스트
                self.$inputSearchList = self.$search_result_area.find('div.recent-keyword');
                //인기 검색어 리스트
                self.$popularKeywordList = self.$searchKeywordArea.find('dl.popular-keyword');
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

                /*
                self.$resultCount = self.$search_result_area.find('span.result-title');
                self.$resultCategory = self.$search_result_area.find('div.result-category');
                self.$resultPreview = self.$search_result_area.find('div.result-preview-list');
                //
                self.$searchKeywordArea = self.$searchLayer.find('div.search-keyword-area');
                self.$recentKeywordList = self.$searchKeywordArea.find('dl.recent-keyword'); 
                self.$popularKeywordList = self.$searchKeywordArea.find('dl.popular-keyword');
                self.$suggestedTagsList = self.$searchKeywordArea.find('div.suggested-tags');
                //
                self.$searchSimilar = self.$searchLayer.find('div.search-similar');

                var _self = this;
                self.$inputSearchList.hide();
                _self.updateRecentSearcheList();

                */
                self.$searchResultArea.hide();
                self.$searchSimilar.hide();
                self.bindEvents();
            },

            bindEvents: function() {
                var self = this;

                //통합검색 노출
                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    self.showAnimation(self.$searchLayer);
                });

                //통합검색 닫음
                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    console.log('통합검색 닫음');
                    clearTimeout(searchTimer);
                    self.hideAnimation(self.$searchLayer);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    console.log('검색 클릭')
                    clearTimeout(searchTimer);
                    var searchVal = self.$inputSearch.val();
                    console.log(searchVal);
                    self.requestSearch(searchVal);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        self.requestSearch(searchVal);
                    }, searchDelay);
                });

                self.$autoComplete.on('click', 'div ul li a', function(e){
                    e.preventDefault();
                    self.searchItem($(this));
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

/*
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

                //추천태그 클릭
                searchItemTarget = 'dl dd.list ul li a';
                self.$suggestedTagsList.on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    _self.clickSearchItem($(this));
                });

                //연관검색어 클릭
                searchItemTarget = 'a';
                self.$searchSimilar.on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    _self.clickSearchItem($(this));
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
                    if(searchedList.length > 5) {
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

            //검색어 입력중 검색
            requestSearch:function(value) {
                console.log('ajax',value);
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
                    /*
                    data.autocomplete = null;
                    data.preview = null;
                    data.category = null;
                    data.similarText = null;
                    */

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
                        self.hideAnimation(self.$searchKeywordArea);
                        self.showAnimation(self.$searchResultArea);
                        self.$searchSimilar.hide();
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

                    /*
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

                    //추천태그 갱신
                    arr = data.suggested instanceof Array ? data.suggested : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$suggestedTagsList.find('dl dd.list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(suggestedTagItemTemplate, {"text":item}));
                        });
                        self.$suggestedTagsList.show();
                    } else {
                        self.$suggestedTagsList.hide();
                    }

                    //검색어 갱신
                    arr = data.search instanceof Array ? data.search : [];

                    if(arr.length > 0) {
                        var $list_ul = self.$inputSearchList.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(inputSearchListItemTemplate, {"input":item, "text":item.replaceAll(searchedValue,replaceText)}));
                        });

                        _self.showAnimation(self.$inputSearchList);
                    } else {
                        _self.hideAnimation(self.$inputSearchList);
                    }
                    */
                });
            },

            /*
            requestSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$searchLayer.attr('data-url-search');
                //console.log(ajaxUrl,searchValue);

                lgkorUI.requestAjaxData(ajaxUrl, {"search":searchValue}, function(result) {
                    var param = result.param;
                    var data = result.data;
                
                    searchedValue = param.searchedValue;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //최근검색어 갱신
                    _self.addRecentSearcheText(searchedValue);

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

                    //추천태그 갱신
                    arr = data.suggested instanceof Array ? data.suggested : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$suggestedTagsList.find('dl dd.list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(suggestedTagItemTemplate, {"text":item}));
                        });
                        self.$suggestedTagsList.show();
                    } else {
                        self.$suggestedTagsList.hide();
                    }

                    //검색결과-카테고리 갱신
                    var showResult = false;
                    var resultCount = 0;

                    arr = data.category instanceof Array ? data.category : [];
                    resultCount += arr.length;
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text.replaceAll(searchedValue,replaceText)}));
                        });
                        self.$resultCategory.show();
                    } else {
                        self.$resultCategory.hide();
                    }

                    //검색결과-제품 갱신
                    arr = data.preview instanceof Array ? data.preview : [];
                    resultCount += arr.length;
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

                    //검새결과 수
                    if(resultCount > 0) {
                        self.$resultCount.text('검색 결과 (' + vcui.number.addComma(data.resultCount) + ')');
                        self.$resultCount.show();
                    } else {
                        self.$resultCount.hide();
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
                });
            }
            */
        }

        intergratedSearch.init();
    });
})();