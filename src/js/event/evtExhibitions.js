
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

//BTOCSITE-11191 지점별 필터 기능 추가
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
        self.storeFilterUrl = self.$container.data('storeFilterUrl');
        self.planEventId = self.$container.data('planEventId');

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
            var formData = {};
            formData.callType = 'CITY';
            formData.planEventId = self.planEventId;
            formData.areaName = 'CITY';
            formData.areaDetailName = '';
            self.requestCityList(formData);

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
                var formData = {};
                formData.callType = 'COUNTY';
                formData.planEventId = self.planEventId;
                formData.areaName = $("#evFilterCity option:checked").text();
                formData.areaDetailName = e.target.value+' ';

                self.selectSingleReset(null, self.$countySelect, false);
                self.selectSingleReset(null, self.$shopSelect, true);
                self.requestCountyList(formData);
            }
        });

        // 구/군 선택 시 매장 목록 호출
        self.$countySelect.on('change', function(e) {
            if(e.target.value == "") {
                self.selectSingleReset(null, self.$shopSelect, true);
            } else {
                var formData = {};
                formData.callType = 'SHOP';
                formData.planEventId = self.planEventId;
                formData.areaName = $("#evFilterCity option:checked").text();
                formData.areaDetailName = self.$citySelect.val()+' '+e.target.value;

                self.selectSingleReset(null, self.$shopSelect, false);
                self.requestShopList(formData);

            }
        });

        // 매장 선택 시 매장 예약 버튼 노출
        self.$shopSelect.on('change', function(e) {
            if(e.target.value == "") {
                self.$reservationButton.removeClass('is-active');
            } else {
                var baseUrl = self.$reservationButton.find(".btn").data('baseUrl');

                self.$reservationButton.find(".btn").attr('href', baseUrl + '&orgcode=' + e.target.value)
                self.$reservationButton.addClass('is-active');

                var formData = {};
                formData.callType = 'PRODUCT';
                formData.planEventId = self.planEventId;
                formData.areaName = $("#evFilterCity option:checked").text();
                formData.areaDetailName = self.$citySelect.val()+' '+self.$countySelect.val();
                formData.hrOrgCode = e.target.value;
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
     * 시/도 목록 데이터 호출
     */
    requestCityList: function(formData) {
        var self = this;
        var optionTemplate = '<option value="{{areaName}}">{{areaCode}}</option>';

        lgkorUI.requestAjaxDataPost(self.storeFilterUrl, formData, function(result) {
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
     */
    requestCountyList: function(formData) {
        var self = this;
        var optionTemplate = '<option value="{{areaName}}">{{areaName}}</option>';

        lgkorUI.requestAjaxDataPost(self.storeFilterUrl, formData, function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$countySelect.find("option:gt(0)").remove();

                dataArray.forEach(function (item, index) {
                    var option = vcui.template(optionTemplate, item);
                    self.$countySelect.append($(option).get(0));
                });

                self.$countySelect.vcSelectbox('update');
            }
        });
    },

    /**
     * 매장 목록 데이터 호출
     */
    requestShopList: function(formData) {
        var self = this;
        var optionTemplate = '<option value="{{hrOrgCode}}">{{hrOrgName}}</option>';

        lgkorUI.requestAjaxDataPost(self.storeFilterUrl, formData, function(result) {
            var data = result.data;
            var dataArray = (data && data instanceof Array) ? data : [];

            if(dataArray.length) {
                self.$shopSelect.find("option:gt(0)").remove();

                dataArray.forEach(function (item, index) {
                    var option = vcui.template(optionTemplate, item);
                    self.$shopSelect.append($(option).get(0));
                });

                self.$shopSelect.vcSelectbox('update');
            }
        });
    }
}

$(function(){
    evFilter.init();
});