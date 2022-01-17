(function() {
    //최근검색어
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}" data-contents="최근 검색어">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;
    //인기검색어
    var popularItemTemplate = '<li><a href="#{{text}}" data-contents="인기 검색어">{{index}}.{{text}}</a></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;
    //추천태그
    var recommendItemTemplate = '<li><a href="#{{text}}" data-contents="추천태그" class="rounded"><span class="text">#{{text}}</span></a></li>'; //BTOCSITE-1057 : data-contents 추가 2021-08-09;

    //자동완성
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    //카테고리아이템
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    //제품미리보기
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img src="{{imageUrl}}" alt="{{imageAlt}}" onError="lgkorUI.addImgErrorEvent(this);"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span>' +
            '<span class="price"{{#if !obsFlag}} style="visibility: hidden;"{{/if}}>{{price}}원</span>' +
        '</div></a></li>';
    //연관검색어
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text"><span class="search-word">“{{text}}”</span> 찾으시나요?</a>'

    var intergratedSearch = {
        init: function() {
            var self = this;
            self.setting();
            self.bindEvents();
        },

        setting: function() {
            var self = this;

            // 메인 스티키 헤더 체크 변수
            self.isMainStickyHeader = false;

            //타이머
            self.searchTimer = null;

            //통합검색 레이어
            self.$searchLayer = $('#layerSearch');
            //검색어 입력input
            self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
            self.$inputSearch.attr('data-autofocus',true);
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

            $('li.search>a[href="#layerSearch"]').removeAttr('data-control');
            self.$searchLayer.attr("aria-hidden",true).show();

            //self.$searchResultArea.hide();
            self.hideSearchResultArea();
            self.$searchSimilar.hide();
        },

        sendSearchPage: function(searchUrl, search, force) {
            if(searchUrl) {
                var fi = searchUrl.indexOf('?');
                var url = searchUrl + ((fi<0) ? "?" : "&") +"search="+encodeURIComponent(search)+"&force="+force;
                location.href = url;
            }
        },
        
        bindEvents: function() {
            var self = this;

            $('li.search>a[href="#layerSearch"]').off('.intergrated').on("click.intergrated", function(e) {
                e.preventDefault();
                self.updateBasicData();
                self.updateRecentSearchList();
                //self.openSearchPopup();
                //직접 구문이 작성되야 최신아이폰에서 포커스시 키보드가 열린다

                self.$searchLayer.attr("aria-hidden",false).addClass('open');
                self.$inputSearch.focus();


                // 메인 페이지에서 하단 앱바 열릴시 오류 수정
                if($('body').hasClass('is-main-sticky-header')) {
                    self.isMainStickyHeader = true;
                    $('body').removeClass('is-main-sticky-header')
                }

                
                //
                var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
                if(!ignoreOverflow){
                    // BTOCSITE-5938-285 scroll-lock 클래스 추가 : 팝업 뛰울시 바닥페이지 스크롤 밀림 방지 class
                    $('body').addClass('scroll-lock');
                }
            });

            //통합검색 닫음
            self.$searchLayer.find('button.btn-close').off('.intergrated').on("click.intergrated", function(e) {
                e.preventDefault();

                // 메인 페이지에서 하단 앱바 열릴시 오류 수정
                if(self.isMainStickyHeader) {
                    self.isMainStickyHeader = false;
                    $('body').addClass('is-main-sticky-header')
                }

                self.closeSearchPopup();
            });

            //검색버튼
            self.$buttonSearch.off('.intergrated').on('click.intergrated', function(e){
                e.preventDefault();
                clearTimeout(self.searchTimer);

                var searchVal = self.$inputSearch.val();
                self.requestSearchInput(searchVal);
            });

            self.$inputSearch.keydown(function(key) {
                if (key.keyCode == 13) {
                    key.preventDefault();
                    self.$buttonSearch.trigger('click');
                }
            });

            //검색 타이머
            self.$inputSearch.off('.intergrated').on("input.intergrated", function(e) {
                clearTimeout(self.searchTimer);
                
                var searchVal = this.value;
                if (searchVal.length < lgkorUI.SEARCH_AUTOCOMPLETE_MIN_LENGTH) {
                    self.openSearchInputLayer(true);
                    self.$searchSimilar.hide();
                    //self.hideAnimation(self.$searchResultArea);
                    self.hideSearchResultArea();
                    return;
                }  
                
                self.searchTimer = setTimeout(function() {
                    self.requestSearchAutoComplete(searchVal);
                }, lgkorUI.SEARCH_AUTOCOMPLETE_TIMER);
            });

            //자동완성 리스트 클릭
            self.$autoComplete.off('.intergrated').on('click.intergrated', 'div.keyword-list ul li a', function(e){
                e.preventDefault();
                self.searchItem($(this), true);
            }).on('mouseover.intergrated', 'div.keyword-list ul li a', function(e){
                //자동완성 리스트 오버
            
                e.preventDefault();
                self.searchItem($(this),false);
            });/*.on('mouseout', 'div.keyword-list ul li a', function(e){
                e.preventDefault();
            });*/

            //연관검색어 클릭
            self.$searchSimilar.off('.intergrated').on('click.intergrated', 'a', function(e){
                e.preventDefault();
                self.searchItem($(this),true);
            });

            //인기검색어 클릭
            self.$popularKeywordList.off('.intergrated').on('click.intergrated', 'div.keyword-list ul li a', function(e){
                e.preventDefault();
                self.searchItem($(this),true);
            });

            //추천태그 클릭
            self.$suggestedTagsList.off('.intergrated').on('click.intergrated', 'div.keyword-list ul li a', function(e){
                e.preventDefault();
                self.searchTagItem($(this),true);
            });

            //최근검색어 클릭
            self.$recentKeywordList.off('.intergrated').on('click.intergrated', 'div.keyword-list ul li span a', function(e){
                e.preventDefault();
                self.searchItem($(this),true);
            }).on('click.intergrated', 'div.keyword-list ul li span button', function(e){
                //최근검색어 삭제 클릭
                var text = $(this).siblings('a').first().attr('href').replace("#", "");
                self.removeRecentSearcheText(text);
            });
        },

        openSearchPopup: function() {
            var self = this;
            self.$searchLayer.attr("aria-hidden",false).addClass('open');

            self.$inputSearch.focus();
            
            //
            var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
            if(!ignoreOverflow){
                $('html, body').css({
                    overflow:"hidden"
                });
            }
                /*
            self.bodyOvewflow = $('body').css('overflow').toLowerCase();
            self.ignoreOverflow = (self.bodyOvewflow != "hidden") && !$('body').hasClass('ignore-overflow-hidden');
            console.log('open',self.ignoreOverflow,self.bodyOvewflow);
            if(self.ignoreOverflow){
                $('html, body').css({
                    overflow:"hidden"
                });
            }
            */
        },

        closeSearchPopup: function() {
            var self = this;
            clearTimeout(self.searchTimer);
            self.$searchLayer.attr("aria-hidden",true).removeClass('open');

            var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
            if(!ignoreOverflow){
                // BTOCSITE-5938-285 scroll-lock 클래스 추가 : 팝업 뛰울시 바닥페이지 스크롤 밀림 방지 class
                $('body').removeClass('scroll-lock');
            }
                
                /*
            console.log('close',self.ignoreOverflow,self.bodyOvewflow);
            if(self.ignoreOverflow) {
                if(self.bodyOvewflow) {
                    $('html, body').css({
                        overflow:self.bodyOvewflow
                    });
                } else {
                    $('html, body').css({
                        overflow:"visible"
                    });
                }
            }
            */
        },

        //검색어창에 입력후 검색
        searchItem:function($item, sendSearchPage) {
            var self = this;
            var searchVal = $item.attr('href').replace("#", "");
            if(sendSearchPage) {
                self.$inputSearch.val(searchVal);
                self.$buttonSearch.trigger('click');
                self.closeSearchPopup();
            } else {
                self.requestSearch(searchVal, false);
            }
        },

        //추천 태그 검색
        searchTagItem:function($item, sendSearchPage) {
            var self = this;
            var searchVal = $item.attr('href');
            if(sendSearchPage) {
                self.$inputSearch.val(searchVal);
                self.$buttonSearch.trigger('click');
                self.closeSearchPopup();
            } else {
                self.requestSearch(searchVal, false);
            }
        },


        openSearchInputLayer: function(open) {
            var self = this;
            if(open) {
                self.updateRecentSearchList();
                self.$searchKeywordArea.show();

            } else {
                self.$searchKeywordArea.hide();
            }
        },

        hideSearchResultArea:function() {
            var self = this;
            //자동완성
            self.$autoComplete.hide();
            //검색 결과
            self.$resultPreview.hide();
            //검색 결과 - 카테고리
            self.$resultCategory.hide();
            //검색 결과 - 리스트
            self.$resultPreviewList.hide();
        },

        //검색어 입력중 검색
        requestSearchAutoComplete:function(value) {
            var self = this;
            var ajaxUrl = self.$searchLayer.data('autocompleteUrl');
            lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                var param = result.param;
                var data = result.data;

                var searchedValue = param.search;
                var replaceText = '<span class="search-word">' + searchedValue + '</span>';
                
                //자동완성 리스트 갱신
                var arr = (data && data.listData instanceof Array) ? data.listData : [];
                if(arr.length > 0) {
                    var $list_ul = self.$autoComplete.find('div.keyword-list ul');
                    var searchItem = arr[0]; //BTOCSITE-5938-316 PC 검색 카테고리 미노출 오류
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":vcui.string.replaceAll(item, searchedValue, replaceText)}));
                    });
                    self.$autoComplete.show();
                    self.openSearchInputLayer(false);
                    self.$searchSimilar.hide();
                    self.requestSearch(searchItem, false); //BTOCSITE-5938-316 PC 검색 카테고리 미노출 오류
                    
                } else {
                    self.hideSearchResultArea();
                    //연관검색어가 있으면 연관검색어를 표시하고 아니면 숨기기
                    if(data.similarText) {
                        self.$searchSimilar.html(vcui.template(similarTextTemplate, {"text":data.similarText}));
                        self.$searchSimilar.show();
                        self.openSearchInputLayer(false);
                    } else {
                        self.$searchSimilar.hide();
                        self.openSearchInputLayer(true);
                    }
                }
            });
        },

        //검색어 미리보기 검색
        requestSearch:function(value, isSaveRecentKeyword) {
            var self = this;
            var ajaxUrl = self.$searchLayer.data('searchUrl');
            lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                var param = result.param;
                var data = result.data;

                var searchedValue = param.search;
                var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                if(data.searchCount && data.category && data.category.length > 0) {
                    self.$resultPreview.find('span.title-line em.count').text("(" + vcui.number.addComma(data.searchCount) + ")");
                } else {
                    self.$resultPreview.find('span.title-line em.count').text("");
                }
                
                //nodata 테스트
                //data.preview = null;
                //data.category = null;
                //data.similarText = null;
                
                var showSearchResultArea = false;

                //카테고리 리스트 갱신
                var arr = (data.category && data.category) instanceof Array ? data.category : [];
                var $list_ul = self.$resultCategory.find('ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":vcui.string.replaceAll(item.text, searchedValue, replaceText)}));
                    });
                    self.$resultCategory.show();
                    showSearchResultArea = true;
                } else {
                    self.$resultCategory.hide();
                }
                
                //검색 미리보기 리스트 갱신
                //210409 제거요청으로 제거
                /*
                arr = (data.preview && data.preview) instanceof Array ? data.preview : [];
                var $list_ul = self.$resultPreviewList.find('ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                        item.price = vcui.number.addComma(item.price);
                        item.obsFlag = lgkorUI.stringToBool(item.obsFlag);
                        $list_ul.append(vcui.template(previewItemTemplate, item));
                    });
                    self.$resultPreviewList.show();
                    showSearchResultArea = true;
                } else {
                    self.$resultPreviewList.hide();
                }
                */

                if(showSearchResultArea) {
                    //검색결과가 있는 경우.
                    self.openSearchInputLayer(false);
                    self.$resultPreview.show();
                    self.$searchSimilar.hide();
                    if(isSaveRecentKeyword) self.addRecentSearcheText(searchedValue);
                } else {
                    //검색결과를 표시할것이 없을경우
                    self.$searchSimilar.hide();
                    /*
                    //연관검색어가 있으면 연관검색어를 표시하고 아니면 숨기기
                    if(data.similarText) {
                        self.hideAnimation(self.$searchKeywordArea);
                        //self.hideAnimation(self.$searchResultArea);
                        self.hideSearchResultArea();
                        self.$searchSimilar.html(vcui.template(similarTextTemplate, {"text":data.similarText}));
                        self.$searchSimilar.show();
                    } else {
                        self.showAnimation(self.$searchKeywordArea);
                        //self.hideAnimation(self.$searchResultArea);
                        self.hideSearchResultArea();
                        self.$searchSimilar.hide();
                    }
                    */
                }
            });
        },

        //최근 검색어 삭제
        removeRecentSearcheText:function(text) {
            var self = this;
            /*
            var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
            if(!searchedList) {
                searchedList = [];
            }

            var findIndex = $.inArray(text, searchedList);
            if(findIndex >= 0) {
                searchedList.splice(findIndex, 1);
                localStorage.searchedList = JSON.stringify(searchedList);
            }
            */
            lgkorUI.removeCookieArrayValue(lgkorUI.INTERGRATED_SEARCH_VALUE, text)
            self.updateRecentSearchList();
        },

        //최근 검색어 추가
        addRecentSearcheText:function(text) {
            if(!text || text.length < 1) return;
            var self = this;

            lgkorUI.addCookieArrayValue(lgkorUI.INTERGRATED_SEARCH_VALUE, text, lgkorUI.MAX_SAVE_RECENT_KEYWORD);
            self.updateRecentSearchList();
        },

        //최근 검색어 리스트 갱신
        updateRecentSearchList:function() {
            var self = this;

            var cookieValue = lgkorUI.getCookie(lgkorUI.INTERGRATED_SEARCH_VALUE);
            var searchedList = cookieValue ? cookieValue.split('|') : [];
            //searchedList = vcui.array.reverse(searchedList);
            
            var arr = searchedList instanceof Array ? searchedList : [];
            var $list_ul = self.$recentKeywordList.find('div.keyword-list ul');
            $list_ul.empty();
            if(arr.length > 0) {
                arr.forEach(function(item, index) {
                    $list_ul.append(vcui.template(recentItemTemplate, {"text":item}));
                });
                self.$recentKeywordList.show();
                self.$recentKeywordList.find('div.no-data').hide();
            } else {
                self.$recentKeywordList.hide();
                self.$recentKeywordList.find('div.no-data').show();
            }
        },

        //기초 데이타 갱신
        updateBasicData:function() {
            var self = this;
            var ajaxUrl = self.$searchLayer.data('basicUrl');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                var data = result.data;

                //인기검색어
                var arr = (data.popular && data.popular instanceof Array) ? data.popular : [];
                if(arr.length > 0) {
                    var $list_ul = self.$popularKeywordList.find('div.keyword-list ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(popularItemTemplate, {"text":item, "index":index+1}));
                    });
                    self.$popularKeywordList.show();
                } else {
                    self.$popularKeywordList.hide();
                }

                //추천태그
                arr = (data.recommend && data.recommend instanceof Array) ? data.recommend : [];
                if(arr.length > 0) {
                    var $list_ul = self.$suggestedTagsList.find('ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(recommendItemTemplate, {"text":item}));
                    });
                    self.$suggestedTagsList.show();
                } else {
                    self.$suggestedTagsList.hide();
                }
            });
        },

        //검색버튼 검색
        requestSearchInput:function(value) {
            //BTOCSITE-91 검색 바로가기 개발요청
            var self = this;
            var ajaxUrl = self.$searchLayer.data('searchInputUrl');

            lgkorUI.requestAjaxData('/search/searchKeyword.lgajax', {"keyword":value}, function(result) {
                if(result.data && result.data.success == 'Y' && result.data.url) {
                    if(result.data.linkTarget == 'self') {
                        location.href = result.data.url;
                    } else {
                        if(isApp()) {   
                            if(vcui.detect.isIOS){
                                var jsonString = JSON.stringify({'command':'sendOutLink', 'url': result.data.url});
                                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                            } else {
                                void android.openLinkOut(result.data.url);
                            }
                        } else {
                            window.open(result.data.url,'_blank');
                        }
                    }
                } else {
                    lgkorUI.requestAjaxData(ajaxUrl, {"search":value}, function(result) {
                        self.hideSearchResultArea();
                        self.$searchSimilar.hide();
                        var data = result.data;
                        var url = self.$searchLayer.data(data.category+"Url");
                        if(url) {
                            self.sendSearchPage(url,value,false);
                        }
                    });
                }
            });
        },
    }

    $(document).ready(function() {
        intergratedSearch.init();
    });
})();