(function() {
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img data-pc-src="{{image_pc_url}}" data-m-src="{{image_m_url}}" alt="{{image_alt}}"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span><span class="price">{{price}}원</span>' +
        '</div></a></li>';
    var recentItemTemplate = '<li><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제" data-text="{{text}}"><span class="blind">삭제</span></button></li>';
    var popularItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var suggestedTagItemTemplate = '<li><a href="#{{text}}" class="rounded"><span class="text">#{{text}}</span></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text">이것을 찾으셨나요? “{{text}}”</a>'

    var minLength = 2;
    var searchDelay = 2000;
    var searchTimer = null;
    var serchMouseOverTimer = null;
    var searchedValue = null;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                self.$searchLayer = $('#layerSearch');
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                self.$search_result_area = self.$searchLayer.find('div.search-result-area');
                self.$inputSearchList = self.$search_result_area.find('div.input-result-list');
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

                _self.bindEvents();
            },

            bindEvents: function() {
                var _self = this;

                //통합검색 노출
                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    _self.showAnimation(self.$searchLayer);
                });

                //통합검색 닫음
                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    clearTimeout(searchTimer);
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    _self.hideAnimation(self.$searchLayer);
                });

                //검색창 입력중에는 최근/인기/추천 검색어 숨김
                self.$inputSearch.on('input', function(e){
                    _self.hideAnimation(self.$searchKeywordArea);
                    _self.hideAnimation(self.$searchSimilar);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(searchTimer);
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    var searchVal = self.$inputSearch.val();
                    _self.requestSearch(searchVal);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                    _self.hideAnimation(self.$inputSearchList);
                  
                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        _self.requestTimerSearch(searchVal);
                    }, searchDelay);
                });

                //검색타이머 마우스 오버
                var searchItemTarget = 'ul li a';
                self.$inputSearchList.on('mouseover', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    var searchVal = $(this).attr('href').replace("#", "");
                    serchMouseOverTimer = setTimeout(function() {
                        _self.requestSearch(searchVal);
                    }, searchDelay);
                }).on('mouseout', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                }).on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    var searchVal = $(this).attr('href').replace("#", "");
                    if(searchedValue != searchVal) {
                        //새로운 값 선택
                        _self.requestSearch(searchVal);
                    }
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
                var ajaxUrl = self.$searchLayer.attr('data-url-timer');

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
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            requestSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$searchLayer.attr('data-url-search');
                //console.log(ajaxUrl,searchValue);

                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    searchedValue = d.param.searchedValue;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    //최근검색어 갱신
                    _self.addRecentSearcheText(searchedValue);
                    
                    var data = d.data;

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

                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        }

        intergratedSearch.init();
    });
})();