$(document).ready(function() {
    // BTOCSITE-4785 s
    if ($('.btn-pdp-alert').length) {
        goPdpUrl();
    }
    // BTOCSITE-4785 e
    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        $wrap.find('.ui_objet_carousel').vcCarousel({         
            slidesToShow: 3,
            // slidesToScroll: 1,
            // centerPadding:'60px',
            dots: false,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 3,
                        centerMode:true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })
});

// BTOCSITE-4785 s
function goPdpUrl() {
    $('.btn-pdp-alert').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        //BTOCSITE-9570 진열기획전 페이지 수정 요청 문구 수정
        lgkorUI.alert('해당 페이지는 제품 정보만 확인 가능합니다.<br>&#39;구매 매장 확인/예약 하기&#39;를 통해 구매 가능합니다.<br><br>매장 진열된 제품으로(생산 단종)<br>정가보다 할인해서 구매 가능한 모델입니다.', {
            title: "",
            okBtnName: "확인",
            ok: function(){
                location.href = href;
            }
        });
    });
}
// BTOCSITE-4785 e

// BTOCSITE-11191 지점별 필터 기능 추가
// evFilter.makeListItem() 에서 사용하는 template
var evFilterItemTemplate =
'<li>' +
    '<div class="item evt-item">' +
        '{{#if promotionBadges}}'+
        '<div class="badge">' +
            '<div class="flag-wrap image-type left">'+
                '{{#each badge in promotionBadges}}'+
                    '{{#if badge.badgeImgUrl}}'+
                    '<span class="big-flag">'+
                        '<img src="{{badge.badgeImgUrl}}" alt="{{badge.badgeName}}">'+
                    '</span>'+
                    '{{/if}}'+
                '{{/each}}'+
            '</div>'+
        '</div>'+
        '{{/if}}' +
        '<div class="product-image" aria-hidden="true">' +
            '<a href="{{modelUrlPath}}" class="btn-pdp-alert"><img src="{{mediumImageAddr}}" alt="{{categoryName}} {{modelDisplayAltName}} {{sku}} 썸네일"></a>' +
        '</div>' +
        '<div class="product-contents">' +
            '<div class="product-info">' +
                '<div class="product-name">' +
                    '<a href="{{modelUrlPath}}" class="btn-pdp-alert">{{#raw modelDisplayName}}</a>' +
                '</div>' +
                '<div class="sku">{{#if modelName}}{{modelName}}{{/if}}</div>' +
                '<div class="review-info">' +
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
                    '{{#if lastBulletName}}<li>{{lastBulletName}}' +
                    '{{#if (subCategoryId == "CT50000070")}}<span class="care-n">,</span><span class="redcare-option">1년 무상케어</span>{{/if}}' +
                    '</li>{{/if}}'+
                '</ul>' +
            '</div>' +
        '</div>'+
        '<div class="product-bottom">' +
           '{{#if checkPriceFlag}}'+

                //케어솔루션 경우
                '{{#if bizType == "CARESOLUTION"}}' +
                '<div class="price-area care">' +
                    '<div class="total-price">' +
                        '<em class="text">기본 월 요금</em>' +
                        '<span class="price"><em>월</em> {{years1TotAmt}}<em>원</em></span>' +
                    '</div>' +

                    '{{#if visitPer != "0"}}' +
                     '<span class="small-text">({{visitPer}}개월/1회 방문)</span>' +
                    '{{/if}}' +
                    '{{#if visitPer == "0"}}' +
                     '<span class="small-text">(방문없음/자가관리)</span>' +
                    '{{/if}}' +
                '</div>' +
                '{{#else}}' +
                '<div class="price-area">' +
                '{{#if obsTotalDiscountPrice}}' +
                    '{{#if obsBtnRule == "enable"}}'+
                        '{{#if obsTotalDiscountPrice == 0 || obsSellingPrice == obsOriginalPrice}}' + // BTOCSITE-5387 세일가격이 값0 이였을때
                            '{{#if obsOriginalPrice}}' +
                            '<div class="total">' +
                                '<em class="blind">판매가격</em>' +
                                '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                            '</div>' +
                            '{{/if}}' +

                            '{{#else}}' +

                             '{{#if obsOriginalPrice}}' +
                                '<div class="original">' +
                                    '<em class="blind">판매가격</em>' +
                                    '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                                '</div>' +
                             '{{/if}}' +

                            '{{#if obsSellingPrice}}' +
                                '<div class="total">' +
                                    '<em class="blind">총 판매가격</em>' +
                                    '<span class="price">{{obsSellingPrice}}<em>원</em></span>' +
                                '</div>' +
                            '{{/if}}' +
                        '{{/if}}' +
                    '{{/if}}' +

                '{{#else}}' +
                 '{{#if obsOriginalPrice}}' +
                    '<div class="total">' +
                        '<em class="blind">총 판매가격</em>' +
                        '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                    '</div>' +
                    '{{/if}}' +
                '{{/if}}' +
             '{{/if}}' +
           '{{/if}}' +

            '<div class="btn-area-wrap">' +
                '<div class="btn-area">' +
                    '<a href="{{storeUrlPath}}" class="btn border size-m btn-store">구매 매장 확인/예약하기</a>' +
                '</div>' +
                '<div class="btn-area">' +
                    '<a href="{{modelUrlPath}}" class="btn border size-m btn-pdp-alert">제품 정보 확인하기</a>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</li>';


var evFilter = {
    /**
     * 최초 실행 시 필요한 변수 정의 및 이벤트 함수 실행
     */
    init: function(){
        var self = this;

        self.$container = $(".exhibition");

        self.$filter = $(".ev-filter");
        self.$sort = self.$filter.find("[name='evFilterSort']");

        self.$shop = self.$filter.find(".ev-filter-shop");
        self.$citySelect = $("#evFilterCity");
        self.$countySelect = $("#evFilterCounty");
        self.$shopSelect = $("#evFilterShop");
        self.$reservationButton = self.$shop.find(".btn-wrap");

        self.$allProductList = self.$container.find("#allProductList");
        self.$shopProductList = self.$container.find("#shopProductList");
        self.shopProductListUrl = self.$container.data('shopProductListUrl');
        self.cityUrl = self.$container.data('cityUrl');
        self.countyUrl = self.$container.data('countyUrl');
        self.shopUrl = self.$container.data('shopUrl');

        if(self.$filter) {
            /**
             * 크롬에서 history back 시 선택했던 내용 캐싱되는 이슈 처리
             * 페이지 로드 시 전체보기 checked 처리 및 전체 보기 목록 영역 노출
             */
            self.$sort.filter('#evFilterSortAll').prop('checked', true);
            self.selectAllReset();
            self.$allProductList.show();
            self.$shopProductList.hide();
            
            // load 시 시/도 selectbox 목록 요청
            self.requestCityList();

            // load 시 이벤트 관련 함수 실행
            self.bindEvent();
        }
    },

    /**
     * 이벤트 관련
     */
    bindEvent: function(){
        var self = this;

        // 전체보기 또는 재고 보유 매장 확인하기 선택 시
        self.$sort.on('change', function(){
            var currentVal = self.$sort.filter(":checked").val();
            // 전체보기 선택 시
            if(currentVal == 'all'){
                self.$shop.removeClass('is-active');
                self.$allProductList.show();
                self.$shopProductList.hide();
                
                // 전체보기 선택 시 선택했던 지점 셀렉트박스 및 상담예약 버튼 노출 초기화
                self.selectAllReset();
            } else {
                // 재고 보유 매장 확인하기 선택 시
                self.$shop.addClass('is-active');
            }
        });

        // 시/도 선택 시 구/군 목록 호출
        self.$citySelect.on('change', function(e) {
            if(e.target.value == "") {
                self.selectSingleReset(null, self.$countySelect, true);
                self.selectSingleReset(null, self.$shopSelect, true);
            } else {
                self.selectSingleReset(null, self.$countySelect, true);
                self.selectSingleReset(null, self.$shopSelect, true);

                self.requestCountyList(e.target.value);
            }
        });

        // 구/군 선택 시 매장 목록 호출
        self.$countySelect.on('change', function(e) {
            if(e.target.value == "") {
                self.selectSingleReset(null, self.$shopSelect, true);
            } else {
                self.selectSingleReset(null, self.$shopSelect, true);
                self.requestShopList(self.$citySelect.val(), e.target.value);
            }
        });

        // 매장 선택 시 매장 예약 버튼 노출 & 매장 코드 붙여 (orgCode) href 삽입 & orgCode 기준 상품목록 재호출
        self.$shopSelect.on('change', function(e) {
            if(e.target.value == "") {
                self.$reservationButton.removeClass('is-active');
            } else {
                var baseUrl = self.$reservationButton.find(".btn").data('baseUrl');

                self.$reservationButton.find(".btn").attr('href', baseUrl + '?orgCord=' + e.target.value)
                self.$reservationButton.addClass('is-active');

                self.requestShopProductList(e.target.value)
            }
        });
    },

    /**
     * 개별 셀렉트박스 초기화
     * @param {string} type 시/군 일 경우에 실행되는 코드가 달라 분기하기 위해 추가
     * @param {string} element 리셋처리할 셀렉트박스 id
     * @param {boolean} disabled disabled 처리 여부
     */
    selectSingleReset: function(type, element, disabled){
        var self = this;

        if(type == 'city'){
            $(element).val('');
            $(element).vcSelectbox('update');
        } else {
            $(element).find("option:gt(0)").remove();
            $(element).prop('disabled', disabled);
            $(element).vcSelectbox('update');
        }

        self.$reservationButton.removeClass('is-active');
    },

    /**
     * 전체 셀렉트 박스 초기화
     */
    selectAllReset: function(){
        var self = this;

        self.selectSingleReset('city', self.$citySelect);
        self.selectSingleReset(null, self.$countySelect, true);
        self.selectSingleReset(null, self.$shopSelect, true);

        self.$reservationButton.removeClass('is-active');
    },

    /**
     * 상품 목록 버튼 플래그 관련
     * @param {string} item 상품 목록 data
     */
    checkBtnFlag: function(item) {
        if(item.bizType == "PRODUCT") {
            var btnFlag = item.obsCartFlag ?  item.obsCartFlag : (item.buyBtnFlag ? item.buyBtnFlag: "N");
            if(lgkorUI.stringToBool(btnFlag) && item.obsBtnRule=="enable" && item.careshipOnlyFlag != "Y") {
                return true
            } else {
                return false;
            }
        } else if(item.bizType == "CARESOLUTION") {
            if (item.years1TotAmt && item.years1TotAmt != "") {
                return true;
            } else {
                return false;
            }
        } else {
            //소모품 DISPOSABLE
            if (item.obsInventoryQty > 0) {
                return true;
            } else {
                return false;
            }
        }
    },

    /**
     * 상품 목록 가격 플래그 관련
     * @param {string} item 상품 목록 data
     */
    checkPriceFlag: function(item) {
        if(item.bizType == "PRODUCT") {
            if(lgkorUI.stringToBool(item.obsSellFlag) && item.obsBtnRule=="enable") {
                return true;
            } else if(item.obsTotalDiscountPrice == 0 || item.obsSellingPrice == 0) {
                return true;
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

    /**
     * 상품 목록 template 처리
     * KRP0007의 상품 목록 생성 코드를 기초하여 사용하는 부분만 조합하여 추가함.
     * 관련 함수 checkBtnFlag, checkPriceFlag 포함하여 작성됨
     * @param {string} item 상품 목록 data
     */
    makeListItem: function(item) {
        var self = this;

        var inputdata = lgkorUI.getHiddenInputData();

        item.checkBtnFlag = self.checkBtnFlag(item);
        item.checkPriceFlag = self.checkPriceFlag(item);

        item.obsOriginalPrice = (item.obsOriginalPrice != null) ? vcui.number.addComma(item.obsOriginalPrice) : null;
        item.obsTotalDiscountPrice = (item.obsTotalDiscountPrice != null) ? vcui.number.addComma(item.obsTotalDiscountPrice) : null;

        item.obsSellingPrice = (item.obsSellingPrice != null) ? vcui.number.addComma(item.obsSellingPrice) : null;

        item.reviewsCount = (item.reviewsCount != null) ? vcui.number.addComma(item.reviewsCount) : "0";

        item.years1TotAmt = (item.years1TotAmt != null) ? vcui.number.addComma(item.years1TotAmt) : null;

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

        // 20210728 BTOCSITE-3608 매장 키오스크 LGE.COM 노출 개선 요청
        var kiosk = lgkorUI.getParameterByName("kiosk");
        if(kiosk && item.modelUrlPath.indexOf('kiosk=') === -1) {
            item.modelUrlPath += (item.modelUrlPath.indexOf("?") === -1) ? "?" : "&";
            item.modelUrlPath += 'kiosk='+kiosk;
        }
        return vcui.template(evFilterItemTemplate, item);
    },

    /**
     * 상품 목록 데이터 호출
     * @param {string} orgCode 매장 코드
     */
    requestShopProductList: function(orgCode) {
        var self = this;
        var formData = {};

        if(orgCode) {
            formData.orgCode = orgCode;
        }

        lgkorUI.requestAjaxDataPost(self.shopProductListUrl, formData, function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$shopProductList.empty();
                dataArray.forEach(function (item, index) {
                    var listItem = self.makeListItem(item);
                    self.$shopProductList.append(listItem);
                });

                self.$allProductList.hide();
                self.$shopProductList.show();

                goPdpUrl();
            }
        });
    },

    /**
     * 시/도 목록 데이터 호출
     */
    requestCityList: function() {
        var self = this;
        var optionTemplate = '<option value="{{value}}">{{title}}</option>';

        lgkorUI.requestAjaxDataFailCheck(self.cityUrl, null,function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$citySelect.find("option:gt(0)").remove();

                dataArray.forEach(function (item, index) {
                    var option = vcui.template(optionTemplate, item);
                    self.$citySelect.append($(option).get(0));
                });

                self.$citySelect.vcSelectbox('update');
            }
        });
    },
    
    /**
     * 구/군 목록 데이터 호출
     * @param {string} city 시/도 value
     */
    requestCountyList: function(city) {
        var self = this;
        var optionTemplate = '<option value="{{value}}">{{title}}</option>';

        lgkorUI.requestAjaxDataFailCheck(self.countyUrl, {city:encodeURI(city)}, function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$countySelect.find("option:gt(0)").remove();

                dataArray.forEach(function (item, index) {
                    var option = vcui.template(optionTemplate, item);
                    self.$countySelect.append($(option).get(0));
                });

                self.$countySelect.prop('disabled', false);
                self.$countySelect.vcSelectbox('update');
            }
        });
    },

    /**
     * 매장 목록 데이터 호출
     * @param {string} city 시/도 value
     * @param {string} county 구/군 value
     */
    requestShopList: function(city, county) {
        var self = this;
        var optionTemplate = '<option value="{{orgCode}}">{{shopName}}</option>';

        lgkorUI.requestAjaxDataFailCheck(self.shopUrl, {city:encodeURI(city), county:encodeURI(county)}, function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$shopSelect.find("option:gt(0)").remove();

                dataArray.forEach(function (item, index) {
                    var option = vcui.template(optionTemplate, item);
                    self.$shopSelect.append($(option).get(0));
                });

                self.$shopSelect.prop('disabled', false);
                self.$shopSelect.vcSelectbox('update');
            }
        });
    }
}

$(function(){
    evFilter.init();
})

