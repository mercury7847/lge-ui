if ('scrollRestoration' in history) {
    //BTOCSITE-2216 뒤로가기로 페이지 진입했을때 강제 스크롤이동을 위한 히스토리 스크롤값 수동으로 변경
    history.scrollRestoration = 'manual';
}

(function() {
    //자동완성
    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    //최근검색어
    var recentItemTemplate = '<li><span class="box"><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제"><span class="blind">삭제</span></button></span></li>';
    //연관검색어
    var relatedItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    //인기검색어
    var popularItemTemplate = '<li><a href="#{{text}}">{{index}}.{{text}}</a></li>';
    //추천카테고리
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';

    var productItemTemplate = '<li><div class="item{{#if obsFlag!="Y"}} discontinued{{/if}}" data-ec-product="{{ga}}">' +
        '<div class="result-thumb"><a href="{{url}}"><img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<div class="result-info">' +
            '<div class="info-text{{#if (obsFlag == "N" && rentalTabFlag == "N") || originalPrice == 0}} mar{{/if}}">' +
                '<div class="detail-wrap">' +
                    '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                    '<div class="result-tit"><a href="{{url}}">{{#raw title}}</a></div>' +
                    '<div class="result-detail">' +
                        '<div class="sku">{{#raw sku}}</div>' +
                        '<div class="review-info">' +
                            '{{#if review > 0}}' +
                            '<a href="{{url}}">' +
                                // BTOCSITE-16 검색 결과 구획 정리
                                '<div class="star">'+
									'<div class="star-rating" {{#if rating > 0 }} style="width:{{(rating*100)/5}}%;" {{/if}}>'+
										'<span class="blind">현재 별점 : {{rating}}</span>'+
									'</div>'+
								'</div>'+
                                '<div class="average-rating"><span class="blind">평점</span>{{rating}}</div>' +
                                '<div class="review-count"><span class="blind">리뷰 수</span>({{review}})</div>' + 
                            '</a>' +
                            '{{/if}}' +
                        '</div>' +

                        // BTOCSITE-16 검색 결과 구획 정리
                        '{{#if obsFlag=="Y" || rentalTabFlag=="Y"}}' +
                            '{{#if originalPrice != 0 || carePrice != 0}}' + 
                                '<div class="info-price mo-only">' +
                                    '<a href="{{url}}">' +
                                        '{{#if rentalTabFlag=="Y" && carePrice != 0}}' +
                                            '<div class="price-info rental">' +
                                                '<p class="tit">렌탈</p><span class="price"><em>월</em> {{carePrice}}<em>원</em></span>' +
                                            '</div>' +
                                        '{{/if}}' +
                                        '<div class="price-info sales">' +
                                            '{{#if obsFlag=="Y"}}' +
                                                '{{#if price == originalPrice}}' +
                                                    '<div class="price-in">' +
                                                        '<span class="price">{{originalPrice}}<em>원</em></span>' +
                                                    '</div>' +
                                                '{{#else}}' +
                                                    '<div class="original">' +
                                                        '{{#if originalPrice != 0}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                                                    '</div>' +
                                                    '<div class="price-in">' +
                                                        '{{#if price != 0}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                                                    '</div>' +
                                                '{{/if}}' +
                                            '{{/if}}' +
                                        '</div>' +
                                    '</a>' +
                                '</div>' +
                            '{{/if}}' +
                        '{{/if}}' +

                        // BTOCSITE-16 검색 결과 구획 정리 - 삭제
                        // '<div class="info-btm">' +
                        //     /* BTOCSITE-3404 검색, PLP > 얼음정수기냉장고 1년무상케어 태그 추가 건*/ 
                        //     '<div class="care">'+
                        //     '{{#if ctypeCnt > 0 && !rentalFlag}}<span class="text careflag">케어십 가능</span>' +
                        //     '{{#if (subCategoryId == "CT50000070")}}<span class="care-n"></span><span class="redcare-option">1년 무상케어</span>{{/if}}' + '{{/if}}' +
                        //     '</div>'+
                        //     /* BTOCSITE-3404 검색, PLP > 얼음정수기냉장고 1년무상케어 태그 추가 건*/
                        //     '<div class="text hashtag-wrap">' +
                        //         '{{#each item in hash}}<span class="hashtag"><span>#</span>{{item}}</span>{{/each}}' +
                        //     '</div>' +
                        // '</div>' +
                    '</div>' +
                '</div>' +
                '{{#if techSpecs && techSpecs.length > 0}}' +
                    '<div class="spec-info"><ul>' +
                        '{{#each item in techSpecs}}' +
                            '<li><span>{{item.SPEC_NAME}}</span>{{#raw item.SPEC_VALUE_NAME}}</li>' +
                        '{{/each}}' +
                    '</ul></div>' +
                '{{/if}}' +
            '</div>' +

            // BTOCSITE-16 검색 결과 구획 정리
            '{{#if obsFlag=="Y" || rentalTabFlag=="Y"}}' +
                '{{#if originalPrice != 0 || carePrice != 0}}' + 
                    '<div class="info-price pc-only">' +
                        '<a href="{{url}}">' +
                            '{{#if rentalTabFlag=="Y" && carePrice != 0}}' +
                                '<div class="price-info rental">' +
                                    '<p class="tit">렌탈</p><span class="price"><em>월</em> {{carePrice}}<em>원</em></span>' +
                                '</div>' +
                            '{{/if}}' +
                            '<div class="price-info sales">' +
                                '{{#if obsFlag=="Y"}}' +
                                    '{{#if price == originalPrice}}' +
                                        '<div class="price-in">' +
                                            '<span class="price">{{originalPrice}}<em>원</em></span>' +
                                        '</div>' +
                                    '{{#else}}' +
                                        '<div class="original">' +
                                            '{{#if originalPrice != 0}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                                        '</div>' +
                                        '<div class="price-in">' +
                                            '{{#if price != 0}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                                        '</div>' +
                                    '{{/if}}' +
                                '{{/if}}' +
                            '</div>' +
                        '</a>' +
                    '</div>' +
                '{{/if}}' +
            '{{/if}}' +
            
        '</div>' +
    '</div></li>';
    var eventItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb">' +
            '<div>' +
                '<img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}">' +
                '{{#if isEnd}}<span class="flag-end-wrap"><span class="flag">종료</span></span>{{/if}}' +
            '</div>' +
        '</div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="info-btm">' +
                        '<span class="text date">{{startDate}} ~ {{endDate}}</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';
    var storyItemTemplate = '<li><a href="{{url}}" class="item item-type2">' +
        '<div class="result-thumb"><div><img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}">{{#if isVideo}}<span class="video-play-btn"><span class="hidden">동영상</span></span>{{/if}}</div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="desc"><span>{{#raw desc}}</span></div>' +
                    // '<div class="info-btm">' +
                    //     '{{#if hash && hash.length>0}}' +
                    //         '<div class="text hashtag-wrap">' +
                    //             '{{#each item in hash}}<span class="hashtag"><span>#</span>{{item}}</span>{{/each}}' +
                    //         '</div>' +
                    //     '{{/if}}' +
                    //     '<span class="text date"><span>{{date}}</span>' +
                    // '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>';

    //BTOCSITE-1101 GA data-ec-product 삽입
    var additionalItemTemplate = '<li><a href="{{url}}" class="item{{#if obsFlag!="Y"}} discontinued{{/if}}" data-ec-product="{{ga}}">' +
        '<div class="result-thumb"><div><img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}"></div></div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{#raw sku}}</div>' +
                    // BTOCSITE-16 검색 결과 구획 정리
                    '{{#if obsFlag=="Y" && hasPrice}}' +
                    '<div class="info-price mo-only">' +
                        '{{#if carePrice}}' +
                        '<div class="price-info rental">' +
                            '<p class="tit">케어솔루션</p><span class="price"><em>월</em> {{carePrice}}<em>원</em></span>' +
                        '</div>' +
                        '{{/if}}' +
                        '<div class="price-info sales">' +
                            '<div class="original">' +
                                '{{#if originalPrice}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                            '</div>' +
                            '<div class="price-in">' +
                                '{{#if price}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '{{/if}}' +
                    // BTOCSITE-16 검색 결과 구획 정리 - 삭제
                    // '<div class="info-btm">' +
                    //     '<div class="text model">{{desc}}</div>' +
                    // '</div>' +
                '</div>' +
            '</div>' +
            '{{#if obsFlag=="Y" && hasPrice}}' +
            // BTOCSITE-16 검색 결과 구획 정리
            '<div class="info-price pc-only">' +
                '{{#if carePrice}}' +
                '<div class="price-info rental">' +
                    '<p class="tit">케어솔루션</p><span class="price"><em>월</em> {{carePrice}}<em>원</em></span>' +
                '</div>' +
                '{{/if}}' +
                '<div class="price-info sales">' +
                    '<div class="original">' +
                        '{{#if originalPrice}}<em class="blind">원가</em><span class="price">{{originalPrice}}<em>원</em></span>{{/if}}' +
                    '</div>' +
                    '<div class="price-in">' +
                        '{{#if price}}<span class="price">{{price}}<em>원</em></span>{{/if}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '{{/if}}' +
        '</div>' +
    '</a></li>';
    var shopItemTemplate = '<li><div class="item">' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">' +
                    '{{#each item in flag}}<span class="flag{{#if item.class}} blue{{/if}}">{{item.title}}</span>{{/each}}' +
                '</div>' +
                '<div class="result-tit">' +
                    '<a href="{{url}}" target="_blank">{{#raw title}}</a>' +
                '</div>' +
                '<div class="result-detail">' +
                    '<div href="{{url}}" class="shop-info" target="_blank">' +
                        '<a href="{{url}}" class="desc add" target="_blank">{{#raw address}}</a>' +
                        '<a href="{{url}}" class="desc time" target="_blank">' +
                        '{{#each item in time}}' +
                            '<span><em>{{item.week}}</em> {{item.time}}</span>' +
                        '{{/each}}' +
                        '</a>' +
                    '</div>' +
                    '<div class="shop-state"><span class="{{#if shopState=="원활"}}skyblue{{#elsif shopState=="보통"}}olive{{#elsif shopState=="혼잡"}}red{{#else}}{{/if}}">{{shopState}}</span></div>' +
                '</div>' +
            '</div>' +
            '<div class="btn-area">' +
                '{{#each item in linkItem}}<a href="{{item.url}}" class="btn border size-m" target="_blank" title="새창열림"><span>{{item.title}}</span></a>{{/each}}' +
            '</div>' +
        '</div>' +
    '</div></li>';
    var customerProductItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="result-thumb">' +
            '<div><img onError="lgkorUI.addImgErrorEvent(this);" src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
        '</div>' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="result-tit"><strong>{{#raw title}}</strong></div>' +
                '<div class="result-detail">' +
                    '<div class="sku">{{#raw sku}}</div>' +
                    '<div class="info-btm">' +
                        '{{#each item in category}}<span class="text">{{item}}</span>{{/each}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</a></li>'
    var customerDownloadItemTemplate = '<li><div class="item">' +
        '<div class="result-info">' +
            '<div class="info-text">' +
                '<div class="flag-wrap bar-type">{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}</div>' +
                '<div class="result-tit">' +
                    '<a href="{{url}}">{{#raw title}}</a>' +
                    '<a href="{{url}}" class="cs">' +
                        '<span class="cs-inner">' +
                            '{{#each (item, index) in category}}{{#if index != 0}}>{{/if}}<span>{{item}}</span>{{/each}}' +
                        '</span>' +
                        '{{#if desc}}<span class="cs-inner">{{desc}}</span>{{/if}}' +
                    '</a>' +
                '</div>' +
                '<div class="result-detail"><div class="info-btm">' +
                    '<span class="text">{{date}}</span>' +
                    '{{#each item in hash}}<span class="text">{{item}}</span>{{/each}}' +
                '</div></div>' +
            '</div>' +
            '{{#if linkItem}}<div class="btn-area">' +
                '{{#each item in linkItem}}<button type="button" class="btn border size-m" data-file-url="{{item.url}}"><span>{{item.title}}</span></button>{{/each}}' +
            '</div>{{/if}}' +
            '{{#if isVideo}}<div class="video-info"><span class="hidden">동영상 포함</span></div>{{/if}}' +
        '</div>' +
    '</div></li>';
    var companyTemplate =
    	'<li>'
		+   '<a href="{{url}}" class="item item-type2">'
		+		'<div class="result-info">'
		+			'<div class="info-text">'
		+				'<div class="flag-wrap bar-type"><span class="flag">{{flag}}</span></div>'
		+				'{{#if title}}'
		+					'<div class="result-tit"><strong>{{#raw title}}</strong></div>'
		+				'{{/if}}'
		+				'<div class="result-detail">'
		+					'{{#if content}}'
		+						'<div class="desc">'
		+							'<span>{{#raw content}}</span>'
		+						'</div>'
		+					'{{/if}}'
		+					'<div class="cs">'
		+						'<span class="cs-inner">'
		+							'<span>{{#raw breadcrumb}}</span>'
		+						'</span>'
		+					'</div>'
		+				'</div>'
		+			'</div>'
		+		'</div>'
		+	'</a>'
		+'</li>';
    
    var searchBnrTemplate = '<a href="{{url}}" target="{{target}}">'+
        '<img src="{{pcImage}}" alt="{{#if desc}}{{desc}}{{#else}}광고배너{{/if}}" class="pc-only">' +
        '<img src="{{mobileImage}}" alt="{{#if desc}}{{desc}}{{#else}}광고배너{{/if}}" class="mo-only">' +
        // '<div class="text-area">'+
        //     '<strong class="title">{{#raw title}}</strong>'+
        //     '<span class="sub-copy">{{#raw desc}}</span>'+
        // '</div>'+
    '</a>'

    $(window).ready(function() {
        var search = {
            init: function() {
                var self = this;
                self.uniqId = vcui.getUniqId(8);
                
                //vcui.require(['ui/tab'], function () {
                    $(window).scrollTop(0); //BTOCSITE-2216
                    self.setting();
                    self.updateRecentSearchList();
                    self.bindEvents();

                    self.curationLayer = new Curation(self.$contentsSearch, function(data, sendData){
                        var tab = self.getTabItembyCategoryID('product');
                        if(tab.length > 0) {
                            var value = self.$contentsSearch.attr('data-search-value');
                            value = !value ? null : value.trim(); 
                            var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));
                            self.sendSearchPage(tab.attr('href'),value,force,sendData,null);
                        }
                    }, function(curation){
                        var tab = self.getTabItembyCategoryID('product');
                        if(curation && tab.length > 0) {
                            var value = self.$contentsSearch.attr('data-search-value');
                            value = !value ? null : value.trim(); 
                            var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));
                            self.sendSearchPage(tab.attr('href'),value,force,null,curation);
                        }
                    });

                    var hash = location.hash.replace("#","");
                    var savedData = lgkorUI.getStorage(hash);
                    // BTOCSITE-2216
                    if(savedData && savedData.href) self.scrollHref = savedData.href;
                    // if(savedData && savedData.search) {
                    //     if(savedData.href) self.scrollHref = savedData.href;
                    // }

                    //입력된 검색어가 있으면 선택된 카테고리로 값 조회
                    var value = self.$contentsSearch.attr('data-search-value');
                    value = !value ? null : value.trim(); 
                    var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));
                    if(!(!value)) {
                        //현재 선택된 카테고리 기준으로 검색
                        self.setinputSearchValue(value);
                        self.requestSearchData(value, force);
                    } else {
                        self.setinputSearchValue("");
                        self.requestSearchData("", force);
                    }

                    self.updateBasicData();
                //});
            },

            makeProductGAData: function(item) {
                var param = {
                    "model_name":item.modelDisplayName,
                    "model_id":item.modelId,
                    "model_sku":item.salesModelCode + '.' + item.salesSuffixCode,
                    "model_gubun":(item.rentalTabFlag == "Y" && item.obsFlag == "N") ? "케어솔루션" : "일반제품",
                    "rental_price":(item.carePrice && item.carePrice > 0) ? ""+item.carePrice : "",
                    "price":(item.originalPrice && item.originalPrice > 0) ? ""+item.originalPrice : "",
                    "discounted_price":(item.price && item.price > 0) ? ""+item.price : "",
                    "brand":"LG",
                    "category":item.superCategoryName + "/" + item.categoryName
                }
                return JSON.stringify(param);
            },
            makeAdditionalGAData: function(item) {
                var param = {
                    "model_name":item.title,
                    "model_id":item.model_id,
                    "model_sku":item.sku,
                    "model_gubun":item.model_gubun,
                    "rental_price":(item.rental_price && item.rental_price > 0) ? ""+item.carePrice : "",
                    "price":(item.originalPrice && item.originalPrice > 0) ? ""+item.originalPrice : "",
                    "discounted_price":(item.price && item.price > 0) ? ""+item.price : "",
                    "brand":"LG",
                    "category":item.category
                }
                return JSON.stringify(param);
            },
            
            setting: function() {
                var self = this;

                //타이머
                self.searchTimer = null;

                //통합검색 레이어
                self.$contentsSearch = $('div.contents.search');
                //탭
                self.$tab = self.$contentsSearch.find('.ui_tab').vcTab();
                
                //input-keyword
                self.$inputKeyword = self.$contentsSearch.find('div.input-keyword:eq(0)');
                //검색어 입력input
                self.$inputSearch = self.$inputKeyword.find('div.input-sch input.txt');
                //스크롤 fixed 검색어 입력창
                var inputSearchFixed = self.$contentsSearch.find('div.input-keyword:eq(1)');
                self.$inputSearchFixed = inputSearchFixed.find('div.input-sch input.txt');

                //검색버튼
                self.$buttonSearch = self.$inputKeyword.find('div.input-sch button.btn-search');
                self.$buttonSearchFixed = inputSearchFixed.find('div.input-sch button.btn-search');

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

                self.$autoComplete.hide();
                self.$notResult.hide();

                //배너
                self.$searchBanner = self.$contentsSearch.find('div.search-banner');

                //검색 결과 - 카테고리
                self.$searchResultCategory = self.$contentsSearch.find('div.search-result-category');
                //카테고리 더보기 버튼
                //self.$searchResultCategoryMore = self.$searchResultCategory.find('a.btn-moreview');

                //cont-wrap
                self.$contWrap = self.$contentsSearch.find('div.cont-wrap');
                self.$listSorting = self.$contWrap.find('div.list-sorting');

                //noData용
                self.$searchNotResult = self.$contentsSearch.find('div.search-not-result');
                self.$resultListNoData = self.$contWrap.find('div.result-list-wrap.list-no-data');
            },

            sendSearchPage: function(searchUrl, search, force, smartFilter, curation) {
                if(searchUrl) {
                    var fi = searchUrl.indexOf('?');
                    var url = searchUrl + ((fi<0) ? "?" : "&") +"search="+encodeURIComponent(search)+"&force="+force;
                    if(curation) {
                        url += ("&curation="+encodeURIComponent(curation));

                    } else if(smartFilter) {
                        url += ("&smartFilter="+encodeURIComponent(smartFilter));
                    }
                    location.href = url;
                }
            },

            bindEvents: function() {
                var self = this;

                self.$tab.on("tabchange", function(e, data){
                    var index = data.selectedIndex;
                    var $li = self.$tab.find('li a:eq("'+index+'")');
                    var href = $li.attr('href');

                    var careType = lgkorUI.getParameterByName('careType')
                    if(careType) {
                        href += (href.indexOf("?") === -1 ? "?" : "&");
                        href += "careType="+careType;
                    }

                    var value = self.$contentsSearch.attr('data-search-value');
                    value = !value ? null : value.trim(); 
                    var force =  lgkorUI.stringToBool(self.$contentsSearch.attr('data-search-force'));

                    self.sendSearchPage(href,value,force);
                });

                //검색어 창 동기화
                self.$inputSearch.on("input change", function(e) {
                    self.$inputSearchFixed.val($(this).val()).trigger("update");
                });
                self.$inputSearchFixed.on("input change", function(e) {
                    self.$inputSearch.val($(this).val()).trigger("update");
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
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

                self.$buttonSearchFixed.on('click', function(e){
                    clearTimeout(self.searchTimer);
                    var searchVal = self.$inputSearch.val();
                    self.requestSearchInput(searchVal);
                });

                self.$inputSearchFixed.keydown(function(key) {
                    if (key.keyCode == 13) {
                        key.preventDefault();
                        self.$buttonSearchFixed.trigger('click');
                    }
                });
                
                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(self.searchTimer);
                    
                    var searchVal = this.value;
                    if (searchVal.length < lgkorUI.SEARCH_AUTOCOMPLETE_MIN_LENGTH) {
                        self.$searchKeywordArea.show();
                        self.$autoComplete.hide();
                        self.$notResult.hide();
                        self.openSearchInputLayer(true);
                    } else {
                        self.searchTimer = setTimeout(function() {
                            self.requestSearchAutoComplete(searchVal);
                        }, lgkorUI.SEARCH_AUTOCOMPLETE_TIMER);
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

                // BTOCSITE-16 검색 결과 구획 정리
                //연관검색어 리스트 클릭
                // self.$relatedKeywordList.on('click', 'ul li a', function(e){
                //     e.preventDefault();
                //     self.searchItem($(this));
                // });

                //기존입력 검색어 클릭
                self.$similarText.on('click', function(e){
                    e.preventDefault();
                    clearTimeout(self.searchTimer);
                    var searchVal = $(this).attr('href').replace("#", "");
                    self.setinputSearchValue(searchVal);
                    //현재 선택된 카테고리 기준으로 검색
                    self.requestSearchData(searchVal, true);
                });

                // BTOCSITE-16 검색 결과 구획 정리
                //연관검색어 펼치기
                // self.$relatedKeywordMobileMoreButton.on('click', 'a', function(e){
                //     e.preventDefault();
                //     if(self.$relatedKeywordList.hasClass('open')) {
                //         self.$relatedKeywordList.removeClass('open');
                //     } else {
                //         self.$relatedKeywordList.addClass('open');
                //     }
                // });
                
                //카테고리 더보기 클릭
                /*
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
                */

                //전체검색 항목별 더보기 클릭
                var $searchResult = self.$contWrap.find('div.search-result-wrap.all');
                $searchResult.find('div.result-list-wrap').on('click', 'a.btn-link',function(e){
                    e.preventDefault();
                    var _id = $(this).attr('href').replace("#", "");
                    self.getTabItembyCategoryID(_id).trigger('click');
                });

                //메뉴얼, 드라이버 등의 파일 다운로드
                var $resultListWrap = $searchResult.find('div.result-list-wrap');
                $resultListWrap.on('click','div.btn-area button',function(e){
                    var url = $(this).attr('data-file-url');
                    if(!(!url)) {
                        window.location = url;
                        /*
                        var a = document.createElement("a");
                        a.href = url;
                        document.body.appendChild(a); //firefox
                        a.click();
                        a.remove();
                        */
                    }
                });

                //검색 이동 로그 쌓기
                $('ul.result-list').on('click', 'a', function(e){
                    self.sendLog(this);
                    //리스트 아이템 이동후 back했을 경우 기억했다가 이동하기 위함
                    var href = $(this).attr('href');
                    if(href){
                        //extend
                        var scrollTop = $(document).scrollTop();
                        lgkorUI.setStorage(self.uniqId, {"href":scrollTop}, true);
                        location.hash = self.uniqId;
                    }
                });

                // BTOCSITE-16 검색 결과 구획 정리
                //리사이즈 체크
                // $(window).on('resizeend', function(e){   
                //     self.updateRelatedKeywordMoreButton();
                // });

                //스크롤 이벤트
                $(window).on('scroll', function(e){
                    self._setScrollMoved();
                });
                self._setScrollMoved();
            },

            sendLog: function(dm) {
                var self = this;
                var search = self.$contentsSearch.attr('data-search-value');
                var index = $(dm).parents('.result-list-wrap').data('logIndex');
                var param = {
                    "index":index,
                    "linkUrl":dm.href,
                    "search":search
                };
                var ajaxUrl = self.$contentsSearch.data('logUrl');
                if(ajaxUrl) {
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, null, true);
                }
            },

            _setScrollMoved: function() {
                var self = this;
                var scrolltop = $(window).scrollTop();
                if((self.$contWrap.offset().top - 110) < scrolltop) {
                    self.$listSorting.addClass('fixed');
                } else {
                    self.$listSorting.removeClass('fixed');
                }
            },

            //검색어 검색창에 입력하기 (fixed와 같이 동기화 하기 위함)
            setinputSearchValue:function(val) {
                var self = this;
                self.$inputSearch.val(val).change();
            },

            //검색어창에 입력후 검색
            searchItem:function($item) {
                var self = this;
                var searchVal = $item.attr('href').replace("#", "");
                self.setinputSearchValue(searchVal);
                self.$buttonSearch.trigger('click');
            },

            openSearchInputLayer: function(open) {
                var self = this;
                if(open) {
                    self.updateRecentSearchList();
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

            checkSubCountData:function(item) {
                return item ? (item.subcount ? item.subcount : 0) : 0;
            },

            checkArrayData:function(item) {
                return item ? (item.data instanceof Array ? item.data : []) : [];
            },

            getTabItembySelected:function() {
                var self = this;
                return self.$tab.find('ul li.on a');
            },

            getTabItembyIndex:function(index) {
                var self = this;
                var idx = parseInt(index) + 0;
                return self.$tab.find('ul li:eq('+idx+') a');
            },

            getTabItembyCategoryID:function(_id) {
                var self = this;
                return self.$tab.find('ul li a[data-category-id='+_id+']');
            },
/*
            getSearchResultWrap:function(index) {
                var self = this;
                return self.$contWrap.find('div.search-result-wrap:eq(' + index +')');
            },
*/
            setTabCount:function(index, count) {
                var self = this;
                var $tab_li = self.getTabItembyIndex(index).parent();
                if(count > 0) {
                    $tab_li.find('span').text("("+vcui.number.addComma(count)+")");
                    $tab_li.show();
                    self.$tab.parents('.search-tabs-wrap').show();
                } else {
                    $tab_li.hide();
                }
                self.$tab.vcSmoothScroll('update');
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
                    var arr = (data && data.listData instanceof Array) ? data.listData : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$autoComplete.find('div.keyword-list ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":vcui.string.replaceAll(item, searchedValue, replaceText)}));
                        });
                        showAutoComplete = true;
                    }

                    self.$searchKeywordArea.hide();
                    if(showAutoComplete) {
                        //검색결과가 있는 경우.
                        self.$autoComplete.show();
                        //self.$notResult.hide();
                        self.openSearchInputLayer(true);
                    } else {
                        //검색결과를 표시할것이 없을경우
                        self.$autoComplete.hide();
                        //self.$notResult.show();
                        self.openSearchInputLayer(false);
                    }
                });
            },

            //검색버튼 검색
            requestSearchInput:function(value) {
                //BTOCSITE-91 검색 바로가기 개발요청
                var self = this;
                var ajaxUrl = self.$contentsSearch.attr('data-search-url');
                
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
                            self.openSearchInputLayer(false);
                            var data = result.data;
                            //검색어 저장
                            self.$contentsSearch.attr('data-search-value',value);
                            self.$contentsSearch.attr('data-search-force',false);
                            var tab = self.getTabItembyCategoryID(data.category);
                            self.sendSearchPage(tab.attr('href'),value,false);
                        });
                    }
                });
            },

            //전체 검색
            requestSearchData:function(value, force) {
                var self = this;
                var ajaxUrl = self.getTabItembySelected().attr('data-search-url');
                var postData = {"search":value, "force":force};
                var careType = lgkorUI.getParameterByName('careType')
                if(careType) vcui.extend(postData,{ "careType" : careType });

                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, postData, function(result) {
                    self.openSearchInputLayer(false);

                    var data = result.data;
                    var param = result.param;

                    var searchedValue = param.search;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';

                    /* BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */
                    var $maxTextPro = searchedValue.substring(0, 20) + "...";

                    //검색한 검색어
                    self.$searchResultText.html('<span class="search-word">“<em class="word">' + searchedValue + '</em>”</span>' + ' 검색 결과'); //원본
                    //self.$searchResultText.html('<span class="search-word">“<em class="word">' + $maxTextPro + '</em>”</span>' + ' 검색 결과');
                    /* //BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */

                    //원래입력된 기존 검색어 이동
                    var inputValue = param.inputValue;
                    if(inputValue && inputValue != searchedValue) {
                        /* BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */
                        var $shortenTxt_1 = inputValue.substring(0, 10);
                        var $shortenTxt_2 = inputValue.substr(inputValue.length-10, 10);

                        // console.log($shortenTxt_1);
                        // console.log("---------------");
                        // console.log($shortenTxt_2);
                        
                        //self.$similarText.text('“' + inputValue + '” 검색 결과로 이동').attr('href','#'+inputValue); //원본
                        self.$similarText.text('“' + $shortenTxt_1 + ' ~ '+ $shortenTxt_2 +'” 검색 결과로 이동').attr('href','#'+inputValue);
                        self.$searchSimilar.show();

                        if(searchedValue.length < 20) {
                            self.$similarText.text('“' + inputValue + '” 검색 결과로 이동').attr('href','#'+inputValue); //원본
                        } else {
                            self.$searchResultText.html('<span class="search-word">“<em class="word">' + $maxTextPro + '</em>”</span>' + ' 검색 결과');
                        }
                    } else {
                        self.$searchSimilar.hide();
                    }

                    // console.log("--------------");
                    // console.log(searchedValue.length);
                    // console.log("--------------");
                    // console.log(inputValue);
                    /* //BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */

                    // -S- BTOCSITE-16 검색 결과 구획 정리 -- 제품탭 이외 삭제
                    //연관 검색어 리스트 갱신
                    // var arr = data.related instanceof Array ? data.related : [];
                    // if(arr.length > 0) {
                    //     showResult = true;
                    //     var $list_ul = self.$relatedKeywordList.find('ul');
                    //     $list_ul.empty();
                    //     arr.forEach(function(item, index) {
                    //         $list_ul.append(vcui.template(relatedItemTemplate, {"text":item}));
                    //     });
                    //     self.$relatedKeywordList.show();

                    //     self.updateRelatedKeywordMoreButton();
                    // } else {
                    //     self.$relatedKeywordList.hide();
                    // }

                    // self.$relatedKeywordList.removeClass('open');
                    // -E- BTOCSITE-16 검색 결과 구획 정리 -- 제품탭 이외 삭제

                    //noData체크

                    //nodata Test
                    /*
                    data.count = null;
                    data.category = null;
                    data.product = null;
                    data.event = null;
                    data.story = null;
                    data.additional = null;
                    data.shop = null;
                    data.customer = null;
                    */
                   
                    var noData = true;
                    var count = self.checkCountData(data);
                    self.setTabCount(0, data.allCount);
                    /*
                    if(count > 0) {
                        noData = false;
                    }
                    */

                    self.$contWrap.removeClass('w-filter');
                    var $searchResult = self.$contWrap.find('div.search-result-wrap');

                    //카테고리 리스트 갱신
                    arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        var $list_ul = self.$searchResultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text}));
                        });
                        self.$searchResultCategory.show();
                        self.$searchResultCategory.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                        //noData = false;
                    } else {
                        self.$searchResultCategory.hide();
                    }

                    //self.$searchResultCategory.removeClass('on');
                    //self.$searchResultCategoryMore.find('span').text('더보기');

                    //센터 배너
                    if(data.searchBanner && !vcui.isEmpty(data.searchBanner)) {
                        data.searchBanner.mobileImage = data.searchBanner.mobileImage ? data.searchBanner.mobileImage : data.searchBanner.pcImage;
                        self.$searchBanner.html(vcui.template(searchBnrTemplate, data.searchBanner));
                        self.$searchBanner.show();
                    } else {
                        self.$searchBanner.hide();
                    }

                    //제품/케어솔루션
                    //BTOCSITE-3602
                    var $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="product"]');
                    arr = self.checkArrayData(data.product);
                    count = self.checkCountData(data.product);
                    self.setTabCount(1, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        var $div = $("<div/>");
                        arr.forEach(function(item, index) {
                            if(!item.hash) {
                                item.hash = [];
                            }
                            if(item.techSpecs) {
                                item.techSpecs.forEach(function(obj, index) {
                                    obj.SPEC_VALUE_NAME = $div.html(obj.SPEC_VALUE_NAME).text();
                                });
                            }

                            // BTOCSITE-16 검색 결과 구획 정리
                            if(item.salesModelFlag === "Y" && item.caresolutionSalesModelCode) {
                                if(!item.techSpecs) item.techSpecs = [];
                                item.techSpecs.push({
                                    'SPEC_NAME' : '렌탈제품모델명',
                                    'SPEC_VALUE_NAME' : item.caresolutionSalesModelCode
                                });
                            }   

                            item.ga = self.makeProductGAData(item);
                            //item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.sku = vcui.string.replaceAll(item.sku, searchedValue, replaceText);
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                            item.rentalFlag = lgkorUI.stringToBool(item.rentalFlag);
                            item.ctypeCnt = item.ctypeCnt ? parseInt(item.ctypeCnt) : 0;
                            $list_ul.append(vcui.template(productItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }

                    //케어용품/소모품
                    //BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="additional"]');
                    arr = self.checkArrayData(data.additional);  
                    count = self.checkCountData(data.additional);
                    self.setTabCount(2, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.ga = self.makeAdditionalGAData(item); //BTOCSITE-1101 GA data-ec-product 삽입
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.price = item.price ? vcui.number.addComma(item.price) : null;
                            item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                            item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                            item.hasPrice = (item.price || item.carePrice);
                            $list_ul.append(vcui.template(additionalItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }


                    //스토리
                    //BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="story"]');
                    arr = self.checkArrayData(data.story);
                    count = self.checkCountData(data.story);
                    self.setTabCount(3, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        var $div = $("<div/>");
                        arr.forEach(function(item, index) {
                            if(index > 1) return; //BTOCSITE-3128 스토리 노출 건 4개에서 2개로 변경
                            if(!item.hash) {
                                item.hash = [];
                            }
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                            item.isVideo = lgkorUI.stringToBool(item.isVideo);
                            item.desc = vcui.string.replaceAll($div.html(item.desc).text(), searchedValue, replaceText); //html strip
                            $list_ul.append(vcui.template(storyItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 3) { //BTOCSITE-3128 스토리 노출 건 4개에서 2개로 변경
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }

                    //이벤트/기획전
                    //BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="event"]');
                    arr = self.checkArrayData(data.event); //
                    count = self.checkCountData(data.event);
                    self.setTabCount(4, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                            item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                            item.isEnd = lgkorUI.stringToBool(item.isEnd);
                            $list_ul.append(vcui.template(eventItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }

                    //센터매장
                    //BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="shop"]');
                    arr = self.checkArrayData(data.shop);
                    count = self.checkCountData(data.shop);
                    self.setTabCount(5, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            item.address = vcui.string.replaceAll(item.address, searchedValue, replaceText);
                            item.linkItem.forEach(function(obj, idx){
                                obj.url = encodeURI(obj.url);
                            });
                            $list_ul.append(vcui.template(shopItemTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }

                    //고객지원
                    //BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="customer"]');
                    arr = self.checkArrayData(data.customer);
                    count = self.checkCountData(data.customer);
                    self.setTabCount(6, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            if(!item.hash) {
                                item.hash = [];
                            }
                            item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                            if(item.type=="product") {
                                $list_ul.append(vcui.template(customerProductItemTemplate, item));
                            } else {
                                item.isVideo = !item.isVideo?false:true;
                                item.linkItem = !item.linkItem ? [] : item.linkItem;
                                item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                                $list_ul.append(vcui.template(customerDownloadItemTemplate, item));
                            }
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }
                    
                    //회사소개
                	//BTOCSITE-3602
                    $resultListWrap = $searchResult.find('div.result-list-wrap[data-log-index="company"]');
                    arr = self.checkArrayData(data.company);
                    count = self.checkCountData(data.company);
                    self.setTabCount(7, count);
                    if(arr.length > 0) {
                        var $list_ul = $resultListWrap.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                        	item.flag = item.breadcrumb.substr(item.breadcrumb.lastIndexOf('>') + 1);
                        	item.breadcrumb = vcui.string.replaceAll(item.breadcrumb, searchedValue, replaceText);
                        	if (item.flag == item.title) {
                        		item.title = '';
                        	} else {
                        		item.title = vcui.string.replaceAll(item.title, searchedValue, replaceText);
                        	}
                        	item.content = vcui.string.replaceAll(item.content, searchedValue, replaceText);
                        	
                            $list_ul.append(vcui.template(companyTemplate, item));
                        });
                        $resultListWrap.show();
                        noData = false;

                        var $btnLink = $resultListWrap.find('div.btn-area a.btn-link:eq(0)');
                        if($btnLink.length > 0 && count < 5) {
                            $btnLink.hide();
                        } else {
                            $btnLink.show();
                        }
                    } else {
                        $resultListWrap.hide();
                    }

                    //스마트 필터
                    self.curationLayer.setCurationData(data);

                    //noData 체크
                    if(noData) {
                        if(data.noDataList && (data.noDataList instanceof Array)) {
                            var $list_ul = self.$resultListNoData.find('ul.result-list');
                            $list_ul.empty();
                            var $div = $("<div/>");
                            data.noDataList.forEach(function(item, index) {
                                if(!item.hash) {
                                    item.hash = [];
                                }
                                if(item.techSpecs) {
                                    item.techSpecs.forEach(function(obj, index) {
                                        obj.SPEC_VALUE_NAME = $div.html(obj.SPEC_VALUE_NAME).text();
                                    });
                                }
                                item.ga = self.makeProductGAData(item);
                                item.price = item.price ? vcui.number.addComma(item.price) : null;
                                item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                                item.carePrice = item.carePrice ? vcui.number.addComma(item.carePrice) : null;
                                item.rentalFlag = lgkorUI.stringToBool(item.rentalFlag);
                                item.ctypeCnt = item.ctypeCnt ? parseInt(item.ctypeCnt) : 0;
                                $list_ul.append(vcui.template(productItemTemplate, item));
                            });
                            if(data.noDataList.length > 0) {
                                self.$resultListNoData.show();
                            } else {
                                self.$resultListNoData.hide();
                            }
                        } else {
                            self.$resultListNoData.hide();
                        }
                        self.$resultListNoData.show();

                        /* BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */
                        var $searchTxtMax = self.$searchNotResult.find('em').text('“' + searchedValue + '”');
                        //console.log($searchTxtMax.text().slice(1,-1).length);
                        //console.log($searchTxtMax.text().substring(0, self.$searchNotResult.find('em').text().indexOf('”')));
                        //console.log($searchTxtMax.text().substring(1, self.$searchNotResult.find('em').text().slice(1,-1)));
                        if($searchTxtMax.text().slice(1,-1).length > 20){
                            self.$searchNotResult.find('em').text(self.$searchNotResult.find('em').text().substring(0, 21)+"...”");
                        }
                        //console.log("------------------");
                        //console.log($searchTxtMax.text());
                        /* //BTOCSITE-5017 : 모니터링 - 검색결과가 상이하게 표시됨 수정 2021-09-02 */

                        self.$searchNotResult.show();
                    } else {
                        //self.$tab.parents('.search-tabs-wrap').show();
                        //self.$tab.vcSmoothScroll('refresh');
                        //self.$tab.show();
                        //self.$contWrap.show();
                        self.$resultListNoData.hide();
                        self.$searchNotResult.hide();
                    }

                    //검색어 저장
                    self.$contentsSearch.attr('data-search-value',searchedValue);
                    self.$contentsSearch.attr('data-search-force',force);
                    //최근검색어 저장
                    if(!noData) {
                        self.addRecentSearcheText(searchedValue);
                    }

                    var $selectTab = self.getTabItembySelected();
                    self.$tab.vcSmoothScroll('scrollToElement',$selectTab[0],0);

                    if(self.scrollHref) {
                        // $(window).scrollTop(self.scrollHref);
                        // self.scrollHref = null;
                        // BTOCSITE-2216
                        
                        if( $('.result-list img').last().length ) {
                            $('.result-list img').last().on('load', function(){
                                $('html,body').stop().animate({scrollTop: self.scrollHref});
                                self.scrollHref = null;
                            });
                        } else {
                            $('html,body').stop().animate({scrollTop: self.scrollHref});
                            self.scrollHref = null;
                        }
                    }
                });
            },

            // BTOCSITE-16 검색 결과 구획 정리
            //연관검색어 더보기 버튼 노출 여부 체크
            // updateRelatedKeywordMoreButton:function () {
            //     var self = this;
            //     var $list_ul = self.$relatedKeywordList.find('ul');
            //     var $li = $list_ul.find('>li:eq(0)');
            //     if($li.length > 0 && $list_ul.height() > $li.outerHeight(true)) {
            //         self.$relatedKeywordMobileMoreButton.show();
            //     } else {
            //         self.$relatedKeywordMobileMoreButton.hide();
            //     }    
            // },

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
                /*
                var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
                if(!searchedList) {
                    searchedList = [];
                }
                var findIndex = $.inArray(text, searchedList);
                if(findIndex < 0) {
                    //searchedList.push(text);
                    searchedList.unshift(text);
                    if(searchedList.length > self.maxSaveRecentKeyword) {
                        //searchedList.shift();
                        searchedList.pop();
                    }
                    localStorage.searchedList = JSON.stringify(searchedList);
                }
                self.updateRecentSearchList();
                */
                lgkorUI.addCookieArrayValue(lgkorUI.INTERGRATED_SEARCH_VALUE, text, lgkorUI.MAX_SAVE_RECENT_KEYWORD);
                self.updateRecentSearchList();
            },

            //최근 검색어 리스트 갱신
            updateRecentSearchList:function() {
                var self = this;
                //var searchedList = localStorage.searchedList ? JSON.parse(localStorage.searchedList) : [];
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
                var ajaxUrl = self.$contentsSearch.data('basicUrl');
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
                });
            },
        }

        search.init();
    });
})();
