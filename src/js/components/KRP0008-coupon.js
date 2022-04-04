(function () {
    // prettier-ignore
    var couponItemTemplate = '<li>'+
        '<div class="cp-box {{_state}}">'+
            '<div class="cp-cont">'+
                '<em class="title">{{_cpDiscPrice}}<i class="unit">원</i></em>'+
                '<p class="description">{{cpDispName}}</p>'+
                '<div class="info">'+
                    '<p>{{_publUseEdDate}} 종료({{_leftDayCnt}}일전)</p>'+
                '</div>'+
                '<div class="cp-btn">'+
                    '<button type="button" class="download"><em>다운로드</em></button>'+
                '</div>'+
            '</div>'+
            '<div class="cp-open-view">'+
                '<a href="#n" class="text">상세정보</a>'+
                '<div class="cp-cont-view">'+
                    '<strong class="sub-tit">유효기간</strong>'+
                    '<div class="sub-cont">{{publUseStDate}} 부터 <br>{{publUseEdDate}} 까지</div>'+
                    '<strong class="sub-tit">할인조건</strong>'+
                    '<div class="sub-cont">{{_cpDiscMinPrice}}원 이상 구매 시 최대 {{_cpDiscMaxPrice}}원 할인</div>'+
                    '<strong class="sub-tit">대상 카테고리</strong>'+
                    '<div class="sub-cont">{{cpCatgDesc}}</div>'+
                '</div>'+
            '</div>'+                         
        '</div>'+
    '</li>';

    var pdpCoupon = {
        variable: {
            couponList: [],
            couponCnt: 0,
        },
        el: {
            $couponWrap: null,
            $popCoupon: null,
            $popCouponList: null,
        },
        selector: {
            couponWrap: ".lists.coupon-item",
            popCoupon: "#coupon-pop",
            popCouponList: ".coupon-list",
        },
        setProperty: function () {
            var $pdpInfo = this.el.$pdpInfo;

            this.$couponWrap = $pdpInfo.find(this.selector.couponWrap);
            this.$popCoupon = $(this.selector.popCoupon);
            this.$popCouponList = this.$popCoupon.find(this.selector.popCouponList);
        },
        setStyle: function () {},
        bindEvents: function () {
            $("body").on("click", ".cp-open-view > .text", function () {
                $(this).parents(".cp-box").toggleClass("active");
            });
        },
        handler: {},
        init: function (el) {
            this.el.$pdpInfo = $(el);

            if (!this.el.$pdpInfo.length > 0) {
                return;
            }
            this.setProperty();
            this.setStyle();

            this.requestPdpCoupon();
            this.bindEvents();
        },
        requestPdpCoupon: function () {
            var ajaxUrl = this.el.$pdpInfo.attr("data-coupon-list-ajax");
            var param = {};
            param.catgCode = lgePdpSendData.categoryId;
            param.prodCode = lgePdpSendData.sku;
            param.userId = vcui.Cookie.get("UNIFY_ID");

            lgkorUI.requestAjaxDataPost(
                ajaxUrl,
                param,
                function (result) {
                    if (result.result === "S") {
                        //success
                        this.variable.couponCnt = result.total;
                        this.variable.couponList = result.data.couponList;
                    }
                    this.renderCounponList();
                }.bind(this),
                true,
                true
            );
        },
        renderCounponList: function () {
            if (this.variable.couponCnt === 0) {
                //no Data
                this.$couponWrap.hide();
            } else {
                this.$couponWrap.show();
                this.$popCouponList.empty();

                for (var i = 0; i < this.variable.couponCnt; i++) {
                    var item = this.variable.couponList[i];
                    item._cpDiscPrice = vcui.number.addComma(item.cpDiscPrice);
                    item.publUseStDate = item.publUseStDate.replace(".0", "");
                    item.publUseEdDate = item.publUseEdDate.replace(".0", "");
                    item._publUseEdDate = vcui.date.format(item.publUseEdDate, "yyyy년 M월 dd일");

                    if (item.cpStat === "APPR") {
                        item._state = "lge-before";
                    } else {
                        item._state = "lge-after";
                    }
                    item._leftDayCnt = String(item.leftDayCnt);
                    item._cpDiscMinPrice = vcui.number.addComma(item.cpDiscMinPrice);
                    item._cpDiscMaxPrice = vcui.number.addComma(item.cpDiscMaxPrice);
                    this.$popCouponList.append(vcui.template(couponItemTemplate, item));
                }
            }
        },
    };

    $(window).ready(function () {
        pdpCoupon.init(".pdp-info-area");
    });
})();
