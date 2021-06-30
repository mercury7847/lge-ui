//KRP0007
(function () {
    var productItemTemplate =
    '<li data-uniq-id="{{uniqId}}">' +
        '<div class="item plp-item" data-ec-product="{{ecProduct}}">' +
        '{{#if promotionBadges}}'+
            '<div class="badge">' +
                '<div class="flag-wrap image-type left">'+
                    '{{#each badge in promotionBadges}}'+
                        '<span class="big-flag">'+
                            '<img src="{{badge.badgeImgUrl}}" alt="{{badge.badgeName}}" onError="lgkorUI.addImgErrorEvent(this);">'+
                        '</span>'+
                    '{{/each}}'+
                '</div>'+
            '</div>'+
        '{{/if}}' +
        '<div class="product-image" aria-hidden="true">' +
            '<div class="slide-wrap ui_plp_carousel">' +
                '<div class="indi-wrap">' +
                    '<ul class="indi-conts ui_carousel_dots">' +
                        '<li><button type="button" class="btn-indi"><span class="blind">##no##번 내용 보기</span></button></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="slide-content ui_carousel_list">' +
                    '<div class="slide-track ui_carousel_track">' +
                        '{{#each (image, idx) in sliderImages}}'+
                            '<div class="slide-conts ui_carousel_slide">' +
                            '<a href="{{modelUrlPath}}"><img data-lazy="{{image}}" alt="{{categoryName}} {{modelDisplayAltName}} {{sku}} 썸네일" style="opacity:0;"></a>' +
                            //'<a href="{{modelUrlPath}}"><img data-lazy="{{image}}" alt="{{imageAltText}} {{idx + 1}}번 이미지" style="opacity:0;"></a>' +
                            '</div>' +
                        '{{/each}}'+
                    '</div>' +
                '</div>' +
                '<div class="slide-controls">' +
                    '<button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>' +
                    '<button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="product-contents">' +
        /*
            '{{#if siblings}}'+
                '{{#each sibling in siblings}}'+
                '<div class="product-option ui_smooth_scrolltab {{sibling.siblingType}}">' +
                    '<div class="ui_smooth_tab">' +
                        '<ul class="option-list" role="radiogroup">' +
                            '{{#each item in sibling.siblingModels}}'+
                                '<li>'+
                                    '<div role="radio" class="{{#if sibling.siblingType=="color"}}chk-wrap-colorchip {{item.siblingCode}}{{#else}}rdo-wrap{{/if}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                                        '<input type="radio" data-category-id="{{categoryId}}" id="product-{{sibling.siblingType}}-{{item.modelId}}" name="nm_{{sibling.siblingType}}_{{modelId}}" value="{{item.modelId}}" {{#if modelId==item.modelId}}checked{{/if}}>'+
                                        '{{#if sibling.siblingType=="color"}}'+
                                            '<label for="product-{{sibling.siblingType}}-{{item.modelId}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                                        '{{#else}}'+
                                            '<label for="product-{{sibling.siblingType}}-{{item.modelId}}">{{item.siblingValue}}</label>'+
                                        '{{/if}}'+
                                    '</div>'+
                                '</li>'+
                            '{{/each}}' +
                        '</ul>' +
                    '</div>' +
                    '<div class="scroll-controls ui_smooth_controls">' +
                        '<button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">이전</span></button>' +
                        '<button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">다음</span></button>' +
                    '</div>' +
                '</div>' +
                '{{/each}}'+
            '{{/if}}'+
            */
            '<div class="flag-wrap bar-type">' +
                '{{#if bestBadgeFlag}}<span class="flag">{{bestBadgeName}}</span>{{/if}}' +
                '{{#if newProductBadgeFlag}}<span class="flag">{{newProductBadgeName}}</span>{{/if}}' +
                '{{#if (obsSellingPriceNumber > 1000000 && obsBtnRule == "enable" && bizType == "PRODUCT" && isShow)}}<span class="flag cardDiscount">신한카드 5% 청구할인</span>{{/if}}' +
            '</div>' +
            '<div class="product-info">' +
                '<div class="product-name">' +
                    '<a href="{{modelUrlPath}}">{{#raw modelDisplayName}}</a>' +
                '</div>' +
                '<div class="sku">{{#if modelName}}{{modelName}}{{/if}}</div>' +
                    '<div class="review-info">' +
                        // '{{#if salesModelCode}}' +
                        // '<div class="crema-product-reviews-score" data-product-code="{{salesModelCode}}" data-format="{{{stars}}} {{{score}}}({{{reviews_count}}})" data-hide-ifzero="1">' +
                        // '{{/if}}' +
                        '<a href="#">' +
                            '{{#if (reviewsCount != "0")}}' +
                            '<div class="star is-review"><span class="blind">리뷰있음</span></div>' +
                            '<div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>' +
                            '<div class="review-count"><span class="blind">리뷰 수</span>({{reviewsCount}})</div>' +
                            '{{/if}}' +
                        '</a>' +
                    '</div>' +
                    '<ul class="spec-info">' +
                        '{{#if firstBulletName}}<li>{{firstBulletName}}</li>{{/if}}'+
                        '{{#if showBulletFeatures}}' +
                            '{{#each item in showBulletFeatures}}' +
                                '<li>{{#raw item.specText}}</li>' +
                            '{{/each}}' +
                        '{{/if}}' +
                        '{{#if lastBulletName}}<li>{{lastBulletName}}</li>{{/if}}'+
                    '</ul>' +
                '</div>' +
            '</div>' +
            '<div class="product-bottom">' +
                '{{#if bizType != "CARESOLUTION" && obsBtnRule == "enable"}}'+
                '<div class="flag-wrap icon-type">' +
                    '{{#if cashbackBadgeFlag}}<span class="flag cash">{{cashbackBadgeName}}</span>{{/if}}' +
                '</div>' +
                '{{/if}}'+
                '{{#if checkPriceFlag}}'+
                    '{{#if bizType == "CARESOLUTION"}}' +
                        '<div class="price-area care">' +
                            '<div class="total-price">' +
                                '<em class="text">기본 월 요금</em>' +
                                '<span class="price"><em>월</em> {{years1TotAmt}}<em>원</em></span>' +
                            '</div>' +
                            '<span class="small-text">({{visitPer}}개월/1회 방문)</span>' +
                        '</div>' +
                    '{{#else}}' +
                        '<div class="price-area">' +
                            '{{#if obsTotalDiscountPrice}}'+
                                '{{#if obsOriginalPrice}}<div class="original">' +
                                    '<em class="blind">판매가격</em>' +
                                    '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                                '</div>{{/if}}' +
                                '{{#if obsSellingPrice}}<div class="total">' +
                                    '<em class="blind">총 판매가격</em>' +
                                    '<span class="price">{{obsSellingPrice}}<em>원</em></span>' +
                                '</div>{{/if}}' +
                            '{{#else}}'+
                                '{{#if obsOriginalPrice}}<div class="total">' +
                                    '<em class="blind">총 판매가격</em>' +
                                    '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                                '</div>{{/if}}' +
                            '{{/if}}'+
                        '</div>' +
                    '{{/if}}' +
                '{{/if}}'+
                '<div class="btn-area-wrap">' +
                    '<div class="wishlist">' +
                        '<span class="chk-wish-wrap large">' +
                            //'<input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-wish-list-id="{{wishListId}}" data-wish-item-id="" {{#if wishListFlag}}checked{{/if}}>' +
                            //'<input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-wish-list-id="{{wishListId}}" data-wish-item-id="" {{#if wishListFlag}}checked{{/if}} {{#if !checkBtnFlag}}disabled{{/if}}>' +
                            '<input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-wish-list-id="{{wishListId}}" data-wish-item-id="" {{#if wishListFlag}}checked{{/if}}>' +
                            '<label for="wish-{{modelId}}"><span class="blind">찜하기</span></label>' +
                        '</span>' +
                    '</div>' +
                    '<div class="cart">' +
                        //'<a href="#n" class="btn-cart{{#if obsBtnRule != "enable"}} disabled{{/if}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-rtSeq="{{rtModelSeq}}" data-type-flag="{{bizType}}" {{#if obsBtnRule != "enable"}}disabled{{/if}}><span class="blind">장바구니 담기</span></a>' +
                        '<a href="#n" class="btn-cart{{#if !checkBtnFlag}} disabled{{/if}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-rtSeq="{{rtModelSeq}}" data-type-flag="{{bizType}}" {{#if !checkBtnFlag}}disabled{{/if}}><span class="blind">장바구니 담기</span></a>' +
                    '</div>' +
                    '<div class="btn-area">' +
                        '<a href="{{modelUrlPath}}" class="btn border size-m" data-id="{{modelId}}">자세히 보기</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '{{#if arFlag=="Y"}}' +
            '<div class="product-ar">' +
			    '<a href="#" data-ar-model-id="{{modelName}}"><span>AR 체험</span></a>' +
			'</div>' +
            '{{/if}}' +
            '{{#if bizType != "DISPOSABLE"}}'+
            '<div class="product-compare">' +
                '<a href="#" data-id="{{modelId}}"><span>비교하기</span></a>' +
            '</div>' +
            '{{/if}}'+
        '</div>' +
    '</li>';
                    
    $(document).ready(function(){
        if(!document.querySelector('.KRP0007')) return false;

        $('.KRP0007').buildCommonUI();

        //04-06 app에서 plp진입시 메뉴 내려달라는 수정사항에 의해 추가
        lgkorUI.showAppBottomMenu(false);

        var categoryId = lgkorUI.getHiddenInputData().categoryId;
        var storageName = categoryId+'_lgeProductFilter';
        var saveListDataStorageName = categoryId+'_lgeProductFilterSaveListData';
        
        var savedFilterArr = firstFilterList || []; // CMS에서 넣어준 firstFilterList를 이용

        var KRP0007 = {
            init: function() {
                var self = this;

                self.savedPLPData = {};
                self.savedPLPData.listData = [];
                self.savedPLPData.pagination = {page:0, totalCount:0};
                self.savedPLPData.isNew = false;
                
                self.setting();
                self.bindEvents();

                //더보기 버튼 체크
                self.setPageData(lgkorUI.getHiddenInputData());

                //breackpoint 이벤트 초기실행
                self.fnBreakPoint();
                //비교하기 체크
                self.setCompares();

                vcui.require(['search/filterLayer.min'], function () {
                    self.filterLayer = new FilterLayer(self.$layFilter, self.$categorySelect, self.$listSorting, self.$btnFilter, "defalutUnfoldFlag", function (data) {
                        lgkorUI.setStorage(storageName, data, true);
    
                        var param = {};
                        var filterdata = JSON.parse(data.filterData);
                        for(var key in filterdata){
                            param[key] = filterdata[key].join(",");
                        }
                        var sort = data.sortType ? data.sortType : data.order;
                        param.sortType = sort;
                        param.page = 1;
                        if(param) {
                            self.requestSearch(param, true);
                        }
                    });
    
                    self.filterLayer.updateFilter(savedFilterArr);
    
                    //스토리지에 저장된 필터 체크
                    //페이지에 선언된 필터와 비교해서 합침 // 전체항목이 생기면서 제거
                    var storageFilters = {};//lgkorUI.getStorage(storageName);
                    var filterData = firstEnableFilter ? firstEnableFilter : {};

                    var change = false;
                    if(!(vcui.isEmpty(storageFilters)) && storageFilters.filterData) {
                        var storageFilterData = JSON.parse(storageFilters.filterData);
                        var firstSortType = self.$orderSorting.find('option').eq(0).val();

                        if(Object.keys(storageFilterData).length) change = true;
                        else{
                            if(firstSortType != storageFilters.sortType) change = true;
                        }

                        for(key in filterData) {
                            storageFilterData[key] = filterData[key]; 
                        }
                        filterData = storageFilterData;
                    }

                    var hash = location.hash.replace("#","");
                    if(hash && hash.length == 8) {
                        self.savedPLPData = lgkorUI.getStorage(saveListDataStorageName);
                        if(self.savedPLPData.listData && self.savedPLPData.listData.length > 0) {
                            //필터데이타 복구
                            self.filterLayer.resetFilter(filterData, false);
                            if(self.savedPLPData.isNew) {
                                self.$productList.empty();
                            }
                            //ajax로 요청했던 리스트 데이타 복구
                            self.updateProductList(self.savedPLPData.listData, true);
                            //페이지 정보 복구
                            self.setPageData(self.savedPLPData.pagination);
                            //토탈 카운트 복수
                            self.setTotalCount(self.savedPLPData.totalCount);
                            //PDP아이템을 눌렀을 경우 이동
                            var $li = self.$productList.find('li[data-uniq-id="' + hash + '"]:eq(0)');
                            if($li.length > 0) {
                                //크롬에 추가된 히스토리 복구 옵션 안쓰도록 함
                                if ('scrollRestoration' in history) {
                                    history.scrollRestoration = 'manual';
                                }
                                //마지막에 클릭한 아이템으로 이동
                                $('html, body').animate({scrollTop: $li.offset().top - 100}, 0);
                            }
                        } else {
                            self.filterLayer.resetFilter(filterData, change);
                        }
                    } else {
                        self.filterLayer.resetFilter(filterData, change);
                    }

                    //21-04-15 모바일 사업부 종료에 따른 공지 팝업 뛰우기
                    self.showMobileClosePopup();
                });

                var ajaxUrl = self.$section.attr('data-wish-url');
                lgkorUI.checkWishItem(ajaxUrl);
            },

            //21-04-15 모바일 사업부 종료에 따른 공지 팝업 뛰우기
            showMobileClosePopup: function() {
                var pathName = location.pathname.toLowerCase();
                if(pathName.indexOf("smartphones") > -1 || pathName.indexOf("feature-phones") > -1) {
                    //모바일 카테고리
                    var $mobileClosePopup = $('#mobile-close-popup');
                    if($mobileClosePopup.length > 0) {
                        //모바일 종료 안내 팝업이 존재하는가
                        var closeCookie = lgkorUI.getCookie('mobileClosePopup');
                        if(!closeCookie || closeCookie != "Y") {
                            //모바일 종료 안내 팝업 다시보지 않기 선택 여부 확인
                            
                            //모바일 종료 안내 팝업 자세히 보기 이동
                            $mobileClosePopup.on('click', 'button[data-link-url]', function(e) {
                                e.preventDefault();
                                var buttonLinkUrl = $(this).attr('data-link-url');
                                var isNew = $(this).attr('data-open-new');
                                if(buttonLinkUrl) {
                                    if(isNew == "Y") {
                                        setTimeout(function () {
                                            window.open(buttonLinkUrl);
                                        },250);
                                    } else {
                                        setTimeout(function () {
                                            location.href = buttonLinkUrl;
                                        },250);
                                    }
                                }
                            });

                            //모바일 종료 안내 팝업 푸터 닫기 버튼
                            $mobileClosePopup.on('click','.pop-footer button',function(e){
                                e.preventDefault();
                                //다시보지 않기 선택에 따른 쿠키 처리
                                var check = $mobileClosePopup.find('#check-today').is(':checked');
                                if(check) {
                                    lgkorUI.setCookie('mobileClosePopup', "Y", false, 1);
                                }
                                $mobileClosePopup.vcModal('close');
                            });

                            setTimeout(function(e){
                                $mobileClosePopup.vcModal();
                            },100);
                        }
                    }
                }
            },

            setting: function() {
                var self = this;
                self.$section = $('.KRP0007');

                //필터
                self.$layFilter = self.$section.find('div.lay-filter');
                //모바일 필터열기버튼
                self.$btnFilter = self.$section.find('div.btn-filter');
                //정렬옵션
                self.$listSorting = self.$section.find('div.list-sorting');
                //카테고리 셀렉트
                self.$categorySelect = self.$section.find('div.cate-scroll-wrap.ui_smooth_scrolltab');

                //순서 셀렉트 풀다운
                self.$orderSorting = self.$listSorting.find('select[name=sortType]');

                //토탈 카운트
                self.$totalCount = self.$listSorting.find('#totalCount');
                //더보기 버튼
                self.$btnMore = self.$section.find('div.read-more-area button.read-more');

                //리스트
                self.$productList = self.$section.find('div.list-wrap ul.product-items');

                //모바일 카테고리 풀다운 메뉴
                self.$cateFulldown = self.$section.find('.cate-m .cate-wrap .cate-list .mobile-more-btn a');

                self.addCarouselModule();

                self.$productList.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

                self.cateWrapStatus();
            },

            bindEvents: function() {
                var self = this;

                self.$productList.on('click','a', function(e){
                    var $li = $(this).parents('li');
                    var uniqId = $li.data('uniqId');
                    if(uniqId && uniqId.length == 8) {
                        location.hash = uniqId;
                    }        
                });

                //찜하기
                self.$productList.on('change','li div.btn-area-wrap div.wishlist input',function(e){
                    var isLogin = lgkorUI.getHiddenInputData().isLogin;
                    if(isLogin == "N"){
                        lgkorUI.alert("", {
                            title: "로그인이 필요합니다."
                        }, this);

                        $(this).prop('checked', false);
                    } else{
                        var $this = $(this);
                        var _id = $this.attr('data-id');
                        var sku = $this.attr('data-model-name');
                        var wishListId = $this.data("wishListId");
                        var wishItemId = $this.data("wishItemId");
                        var wish = $this.is(':checked');
                        var param = {
                            "id":_id,
                            "sku":sku,
                            "wishListId": wishListId,
                            "wishItemId": wishItemId
                        }
                        if(wish){
                            param.type = "add";
                        } else{
                            param.type = "remove";
                        }

                        var ajaxUrl = self.$section.attr('data-wish-url');
                        
                        var success = function(data) {
                            $this.data("wishItemId",data.wishItemId);
                            $this.prop("checked",wish);
                        };
                        var fail = function(data) {
                            $this.prop("checked",!wish);
                        };
    
                        lgkorUI.requestWish(
                            param,
                            wish,
                            success,
                            fail,
                            ajaxUrl,
                            this
                        );
                    }
                });

                //장바구니
                self.$productList.on('click','li div.btn-area-wrap div.cart a',function(e){
                    e.preventDefault();

                    var typeflag = $(this).attr('data-type-flag');
                    var sendflag = (typeflag == "PRODUCT" || typeflag == "DISPOSABLE") ? "P" : "C";

                    if(!$(this).hasClass('disabled')){
                        var $this = $(this);
                        var param = {
                            "id":$this.attr('data-id'),
                            "sku":$this.attr('data-model-name'),
                            "rtSeq":$this.attr('data-rtSeq'),
                            "typeFlag": sendflag,
                            "pageType": "plp"
                        }
                        var ajaxUrl = self.$section.attr('data-cart-url');
                        lgkorUI.requestCart(ajaxUrl, param, true);
                    }
                });

                //자세히보기
                /*
                self.$productList.on('click','li div.btn-area-wrap div.btn-area a',function(e){
                    e.preventDefault();
                });
                */

                //비교하기
                self.$productList.on('click', 'li .product-compare a', function(e){
                    e.preventDefault();
                    self.setCompareState(e.currentTarget);
                });

                //sibling
                self.$productList.on('change', '.product-option input[type=radio]', function(e){
                    self.requestSibling(this);
                })

                //AR체험하기 클릭
                self.$productList.on('click','div.product-ar a', function (e){
                    e.preventDefault();
                    var modelId = this.dataset.arModelId;
                    if(!lgkorUI.openAR(modelId)) {
                        $('#arPlayPop').vcModal({opener: this});
                    }
                });

                $(window).on('appNotInstall', function(e){
                    $('#arPlayPop').vcModal();
                });

                //모바일 카테고리 풀다운메뉴
                self.$cateFulldown.on('click', function(e){
                    e.preventDefault();

                    var catewrap = $(this).closest('.cate-wrap');
                    catewrap.toggleClass('open');

                    if(catewrap.hasClass('open')){
                        self.$categorySelect.vcSmoothScrollTab("initPosition", false);
                    } else{
                        self.$categorySelect.vcSmoothScrollTab("initPosition", true);
                    }

                    $(this).closest('.cate-m').parent().height(catewrap.outerHeight(true));
                });

                //비교하기 컴포넌트 변화 체크
                $(window).on("changeStorageData", function(){
                    self.setCompares();
                })

                // 브레이크포인트 이벤트 처리
                $(window).on('breakpointchange.filter', function(e,data){
                    self.fnBreakPoint();
                });

                //더보기
                self.$btnMore.on('click', function(e) {
                    e.preventDefault();

                    var filterLayerData = self.filterLayer.getDataFromFilter();

                    var param = {};
                    var filterdata = JSON.parse(filterLayerData.filterData);
                    for(var key in filterdata){
                        param[key] = filterdata[key].join(",");
                    }
                    param.sortType = filterLayerData.sortType;

                    var hiddenData = lgkorUI.getHiddenInputData();
                    param.page = parseInt(hiddenData.page) + 1;
                    if(param) {
                        self.requestSearch(param, false);
                    }
                });

                if(!$('.cate-m .cate-wrap').length){
                    $(window).on('resizeend', function(){
                        self.cateWrapStatus();
                    })
                }
            },

            setPageData: function(param) {
                var self = this;
                if(param && param.page && param.totalCount) {
                    var page = parseInt(param.page);
                    var totalCount = parseInt(param.totalCount);
                    if (page < totalCount) {
                        self.$btnMore.show();
                    } else {
                        //더이상 없다
                        self.$btnMore.hide();
                    }

                    lgkorUI.setHiddenInputData({
                        totalCount: totalCount,
                        page: page
                    });
                } else {
                    //아예 데이타가 없다
                    self.$btnMore.hide();
                }
            },

            setTotalCount: function (totalCount) {
                var self = this;
                self.$totalCount.text(vcui.number.addComma(totalCount) + "개");
            },

            requestSearch: function(data, isNew){
                var self = this;
                var ajaxUrl = self.$section.attr('data-prod-list');
                //if(!isHash) {
                    data.categoryId = categoryId;
                    data.pageType = "plp";
                    //var hash = lgkorUI.obj2HashString(data);
                    //var hash = encodeURIComponent(JSON.stringify(data));
                    //location.hash = categoryId;
                //}

                lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result){
                    var data = result.data[0];
                    
                    var totalCount = data.productTotalCount ? data.productTotalCount : 0;
                    self.savedPLPData.totalCount = totalCount;
                    self.setTotalCount(totalCount);
                    
                    if(isNew) {
                        self.$productList.empty();
                        self.savedPLPData.listData = [];
                        self.savedPLPData.pagination = {page:0, totalCount:0};
                        self.savedPLPData.isNew = true;
                    }

                    var arr = (data.productList && data.productList instanceof Array) ? data.productList : [];

                    if(arr.length){
                        self.updateProductList(arr, false);

                        self.savedPLPData.pagination = data.pagination;
                        self.setPageData(data.pagination);

                        self.savedPLPData.listData = self.savedPLPData.listData.concat(arr);
                        lgkorUI.setStorage(saveListDataStorageName, self.savedPLPData, false);

                        /*
                        var ajaxUrl = self.$section.attr('data-wish-url');
                        lgkorUI.checkWishItem(ajaxUrl);
                        */
                    } else{
                        self.setPageData({page:0, totalCount:0});
                    }

                    //전달된 필터 기본값으로 열기
                    if(data.filterList) {
                        self.filterLayer.openFilterSection(data.filterList, "defalutUnfoldFlag");
                    }
                    //2021-03-16 필터 활성/비활성 기능. 서버에서 enableList가 제대로 안들어옴 수정후 사용할것
                    if(data.filterEnableList) {
                        self.filterLayer.enableFilterList(data.filterEnableList);
                    }

                    //nodata 체크
                    if(self.$productList.find('>li').length > 0) {
                        self.$productList.siblings('.no-data').hide();
                        self.$listSorting.show();
                    } else {
                        self.$productList.siblings('.no-data').show();
                        self.$btnMore.hide();
                        self.$listSorting.hide();
                    }
                });
            },

            updateProductList: function(arr, restoreList) {
                var self = this;
                arr.forEach(function(item, index) {
                    if(!restoreList) {
                        item.uniqId = vcui.getUniqId(8);
                    }
                    var listItem = self.makeListItem(item);
                    self.$productList.append(listItem);
                });

                self.$productList.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

                self.addCarouselModule();

                self.fnBreakPoint();

                self.setCompares();
            },

            requestSibling: function(rdo){
                var self = this;

                var modelId = $(rdo).val();
                var changeItem = $(rdo).closest('.plp-item').parent();
                var ajaxurl = self.$section.attr('data-sibling-url');
                var sendata = {
                    "modelId": modelId,
                    "pageType": "plp",
                    "callType": "productSummary",
                    "categoryId": lgkorUI.getHiddenInputData().categoryId
                }

                lgkorUI.requestAjaxDataPost(ajaxurl, sendata, function(result){

                    var arr = (result.data && result.data instanceof Array) ? result.data : [];

                    if(arr.length){
                        var item = arr[0];
                        var uniqId = changeItem.data('uniqId');
                        if(uniqId) {
                            item.uniqId = uniqId;
                        } else {
                            item.uniqId = vcui.getUniqId(8);
                        }
                        var listItem = self.makeListItem(item);
                        changeItem.before(listItem);
                        changeItem.remove();

                        self.$productList.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

                        self.addCarouselModule();

                        self.fnBreakPoint();
                    };
                }, true);
            },

            checkBtnFlag: function(item) {
                if(item.bizType == "PRODUCT") {
                    var btnFlag = item.obsCartFlag ?  item.obsCartFlag : (item.buyBtnFlag ? item.buyBtnFlag: "N");
                    if(lgkorUI.stringToBool(btnFlag) && item.obsBtnRule=="enable" && item.careshipOnlyFlag != "Y") {
                        return true
                    } else {
                        return false;
                    }
                } else if(item.bizType == "CARESOLUTION") {
                    /* BTOCSITE-520 */
                    if (item.years1TotAmt && item.years1TotAmt != "") {
                        return true;
                    } else {
                        return false;
                    }
                    /* //BTOCSITE-520 */
                } else {
                    //소모품 DISPOSABLE
                    if (item.obsInventoryQty > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            checkPriceFlag: function(item) {
                if(item.bizType == "PRODUCT") {
                    if(lgkorUI.stringToBool(item.obsSellFlag) && item.obsBtnRule=="enable") {
                        return true
                    } else {
                        return false;
                    }
                } else if(item.bizType == "CARESOLUTION") {
                    if ((item.rTypeCount && item.rTypeCount != "") || (item.cTypeCount && item.cTypeCount != "")) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    //소모품 DISPOSABLE
                    if(item.obsTotalDiscountPrice && item.obsTotalDiscountPrice != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },

            makeListItem: function(item){
                var self = this;

                for(var str in item.siblings){
                    var siblingType = item.siblings[str].siblingType ? item.siblings[str].siblingType.toLowerCase() : '';
                    item.siblings[str].siblingType = (siblingType == "color") ? "color" : "text";
                }

                var sliderImages = [item.mediumImageAddr];
                if(item.rollingImages && item.rollingImages.length){
                    item.rollingImages.forEach(function(obj, idx) {
                        if(obj && obj.mediumImageAddr) {
                            sliderImages.push(obj.mediumImageAddr);
                        }
                    });
                }

                /*
                var sliderImages = [];
                if(item.rollingImages && item.rollingImages.length){
                    item.rollingImages.forEach(function(obj, idx) {
                    if(obj && obj.smallImageAddr) {
                        sliderImages.push(obj.smallImageAddr);
                        }
                    });
                } else {
                    sliderImages.push(item.smallImageAddr);
                }
                */
                item.sliderImages = sliderImages;
                
                item.checkBtnFlag = self.checkBtnFlag(item);
                item.checkPriceFlag = self.checkPriceFlag(item);

                item.obsOriginalPrice = (item.obsOriginalPrice != null) ? vcui.number.addComma(item.obsOriginalPrice) : null;
                item.obsTotalDiscountPrice = (item.obsTotalDiscountPrice != null) ? vcui.number.addComma(item.obsTotalDiscountPrice) : null;
                /* 20210527 추가 */
                // BTOSCITE-940 가격이 100원 이상일때 뱃지추가
                item.obsSellingPriceNumber = (item.obsSellingPrice != null) ? item.obsSellingPrice : null;  
                // BTOSCITE-940 가격이 100원 이상일때 뱃지추가
                /* 20210527 추가 */
                item.obsSellingPrice = (item.obsSellingPrice != null) ? vcui.number.addComma(item.obsSellingPrice) : null;
                
                item.reviewsCount = (item.reviewsCount != null) ? vcui.number.addComma(item.reviewsCount) : "0";

                item.years1TotAmt = (item.years1TotAmt != null) ? vcui.number.addComma(item.years1TotAmt) : null;

                //flag
                item.newProductBadgeFlag = lgkorUI.stringToBool(item.newProductBadgeFlag);
                item.bestBadgeFlag = lgkorUI.stringToBool(item.bestBadgeFlag);
                item.cashbackBadgeFlag = lgkorUI.stringToBool(item.cashbackBadgeFlag);

                var inputdata = lgkorUI.getHiddenInputData();
                item.newProductBadgeName = inputdata.newProductBadgeName;
                item.bestBadgeName = inputdata.bestBadgeName;
                item.cashbackBadgeName = inputdata.cashbackBadgeName;
                
                //장바구니
                item.wishListFlag = lgkorUI.stringToBool(item.wishListFlag);
                //찜하기
                item.cartListFlag = lgkorUI.stringToBool(item.cartListFlag);
                if(!item.wishListId) item.wishListId = "";
                if(!item.wishItemId) item.wishItemId = "";

                if(!item.rtModelSeq) item.rtModelSeq = "";

                var bulletLength, showLength;
                item.firstBulletName = null;
                item.lastBulletName = null;
                item.showBulletFeatures = [];
                if(item.bizType == "PRODUCT"){
                    if(item.bulletFeatures && item.bulletFeatures.length > 0){
                        bulletLength = item.bulletFeatures.length;
                        showLength = item.cTypeCount > 0 ? 4 : bulletLength;
                        if(showLength > bulletLength) showLength = bulletLength;
                        for(var i=0;i<showLength;i++) item.showBulletFeatures.push(item.bulletFeatures[i]);
                    }

                    if(item.cTypeCount > 0) item.lastBulletName = inputdata.lastBulletName;
                } else if(item.bizType == "CARESOLUTION"){
                    if(item.bulletFeatures && item.bulletFeatures.length > 0){
                        bulletLength = item.bulletFeatures.length;
                        showLength = bulletLength > 4 ? 4 : bulletLength;
                        if(showLength > bulletLength) showLength = bulletLength;
                        for(i=0;i<showLength;i++) item.showBulletFeatures.push(item.bulletFeatures[i]);
                    }
                    item.lastBulletName = inputdata.lastBulletName;
                } else if(item.bizType == "DISPOSABLE"){
                    if(item.compatibleModels && item.compatibleModels.length > 0){
                        item.firstBulletName = inputdata.lastBulletName;
                        bulletLength = item.compatibleModels.length;
                        showLength = bulletLength > 5 ? 5 : bulletLength;
                        for(i=0;i<showLength;i++) item.showBulletFeatures.push({specText:item.compatibleModels[i].model});

                        if(showLength < bulletLength) item.showBulletFeatures.push({specText:"총 " + bulletLength + "개"});
                    }
                }

                if(!item.obsBtnRule) item.obsBtnRule = "";

                if(!item.sku) item.sku = item.modelName;

                if(!item.obsSellingPrice) item.obsSellingPrice = "";

                item.modelDisplayAltName = item.modelDisplayName.replace(/(<([^>]+)>)/ig, "");

                item.modelUrlPath = (item.bizType == "CARESOLUTION") ? item.modelUrlPath + "?dpType=careTab" : item.modelUrlPath;
                //console.log("### item.siblingType ###", item.siblingType);

                function getEcCategoryName(item){
                    if( item.subCategoryName == "" || item.subCategoryName == undefined) {
                        return item.superCategoryName + "/" + item.categoryName 
                    } else {
                        return item.superCategoryName + "/" + item.categoryName  + '/' + item.subCategoryName
                    }
                }

                function getGubunValue(bizType){
                    var curValue = "";
                    switch(bizType) {
                        case "PRODUCT": 
                            curValue = "일반제품"
                            break;
                        case "CARESOLUTION": 
                            curValue = "케어솔루션"
                            break;
                        case "DISPOSABLE": 
                            curValue = "케어용품/소모품"
                            break;                            
                    }
                    return curValue;
                }

                var ecProduct = {
                    "model_name": item.modelDisplayName.replace(/(<([^>]+)>)/ig,""),
                    "model_id": item.modelId,
                    "model_sku": item.modelName, 
                    "model_gubun": getGubunValue(item.bizType),
                    "price": vcui.number.addComma(item.obsOriginalPrice), 
                    "discounted_price": vcui.number.addComma(item.obsSellingPrice), 
                    "brand": "LG",
                    "category": getEcCategoryName(item) 
                }
                item.ecProduct = JSON.stringify(ecProduct);
                item.isShow = lgkorUI.isShowDate('20210601','20210901')
                return vcui.template(productItemTemplate, item);
            },

            // 상품 아이템 롤링기능을 PC,MOBILE일 때 교체.
            fnBreakPoint:function(){
                var self = this;
                var name = window.breakpoint.name;

                self.$productList.find('.ui_plp_carousel').each(function(idx, item){
                    var slideLength = $(item).find('.slide-conts').length;
                    var applyMode = $(item).data("applyMode");
                    if(slideLength > 1){
                        if(applyMode != name){
                            $(item).data('applyMode', name);
                            $(item).off('mouseover mouseout mouseleave').vcCarousel("setOption", {autoplay:false,'speed':300}, true);

                            if(name == 'pc'){
                                $(item).vcCarousel("setOption", {'speed':0}, true ).on('mouseover mouseout mouseleave', function(e){
                                    // 상품 아이템을 오버시 이미지를 롤링.
                                    if($(e.currentTarget).data('ui_carousel')){
                                        if(e.type == 'mouseover'){
                                            $(e.currentTarget).vcCarousel('play');
                                            
                                        }else{
                                           $(e.currentTarget).vcCarousel('stop');
                                            setTimeout(function(){
                                                $(e.currentTarget).vcCarousel('goTo', 0);
                                            }, 500);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },

            addCarouselModule: function(){
                var self = this;

                self.$productList.find('.ui_plp_carousel').each(function(idx, item){
                    if(!$(item).data("isApplyCarousel")){
                        $(item).data('isApplyCarousel', true);

                        $(item).vcCarousel({
                            indicatorNoSeparator:/##no##/,
                            infinite:true, 
                            autoplaySpeed:500, 
                            speed:0, 
                            easing:'easeInOutQuad'
                        }).on("carousellazyloadrrror", function(e, carousel, imgs){
                            //console.log("### carousellazyloadrrror ###", imgs.attr('src'));
                            imgs.attr('src', lgkorUI.NO_IMAGE);
                        });
                    }
                });
            },

            //비교하기 저장 유무 체크...
            setCompares:function(){
                var self = this;

                var compare = self.$productList.find('li .product-compare a');
                compare.removeClass('on');
                if(!compare.find('.blind').length) compare.append('<span class="blind">선택안됨</span>');
                else compare.find('.blind').text('선택안됨');

                var categoryId = lgkorUI.getHiddenInputData().categoryId;
                var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY, categoryId);
                var isCompare = vcui.isEmpty(storageCompare);
                if(!isCompare){
                    storageCompare['data'].forEach(function (item) {
                        var modelID = item['id'];
                        compare = self.$productList.find('li .product-compare a[data-id=' + modelID + ']');
                        compare.addClass('on');
                        compare.find('.blind').text('선택됨');
                    });
                }
            },

            //비교하기 담기
            setCompareState:function(atag){
                var $this = $(atag);
                var _id = $this.data('id');
                var categoryId = lgkorUI.getHiddenInputData().categoryId;
                if(!$this.hasClass('on')){
                    var compare = $this.closest('.product-compare');
                    var contents = compare.siblings('.product-contents');
                    var productName = contents.find('.product-info .product-name a').text();
                    var productID = contents.find('.product-info .sku').text();
                    var image = compare.siblings('.product-image');
                    var productImg = image.find('.slide-content .slide-conts.on a img').attr("src");
                    var productAlt = image.find('.slide-content .slide-conts.on a img').attr("alt");

                    var compareObj = {
                        "id": _id,
                        "productName": productName,
                        "productID": productID,
                        "productImg": productImg,
                        "productAlt": productAlt
                    }
                    
                    var isAdd = lgkorUI.addCompareProd(categoryId, compareObj);
                    if(isAdd) $this.addClass("on");
                } else{
                    lgkorUI.removeCompareProd(categoryId, _id);
                }
            },

            cateWrapStatus: function(){
                if(!$('.cate-m .cate-wrap').length){
                    if($(window).innerWidth() > 1024) $('.cate-m').hide();
                    else $('.cate-m').show();
                }
            }
        };
        KRP0007.init();
    });
})();