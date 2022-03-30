(function () {
    // prettier-ignore
    var orderItemTemplate = '<li>'+
        '<div class="myact-cont order">'+
            '<em class="status {{_clStatusOrder}}">{{status}}</em>'+
            '<div class="prod-info">'+
                '<span class="cate">{{category}}</span>'+
                '<span class="prod">{{productNameKR}}</span>'+
                '<span class="model">{{status}}</span>'+
            '</div>'+
            '<a href="#" class="btn-myact"><i class="blind">바로가기</i></a>'+
        '</div>'+
    '</li>';

    var myHome = {
        variable: {
            orderListData: [],
            orderListCnt: 0,
        },
        el: {
            $contents: null,
            $actGroup: null,
        },
        selector: {},
        setProperty: function () {
            var $contents = this.el.$contents;

            this.el.$actGroup = $contents.find(".my-act-group");
        },
        setStyle: function () {},
        bindEvents: function () {},
        handler: {},
        init: function (el) {
            this.el.$contents = $(el);
            if (!this.el.$contents.length > 0) {
                return;
            }

            //AS-IS > 크레마
            //this.cremaLogin();

            this.setProperty();

            this.requestOrderList();

            this.bindEvents();
        },
        cremaLogin: function () {
            //크레마
            lgkorUI.cremaLogin();
            var cremaReviewTemplate = vcui.detect.isMobile
                ? '<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}" review-source="mobile_my_orders">리뷰작성</a>'
                : '<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}">리뷰작성</a>';
            var $li = $("li.review-here[data-model-code]");
            $li.each(function (index, item) {
                if (item.dataset.reviewFlag.toLowerCase() == "s") {
                    var enModelName = item.dataset.modelCode;
                    $(item).append(vcui.template(cremaReviewTemplate, { enModelName: enModelName }));
                }
            });
            //크레마# 이동 막음
            $li.on("click", "a.crema-new-review-link", function (e) {
                if ($(this).attr("href") == "#") {
                    e.preventDefault();
                }
            });
            //크레마 리로드
            lgkorUI.cremaReload();
        },
        requestOrderList: function () {
            var url = this.el.$contents.data("mypage-orderlist");
            var oSelf = this;

            lgkorUI.requestAjaxDataPost(
                url,
                {},
                function (result) {
                    if (result.status == "fail") {
                        lgkorUI.alert("", {
                            title: result.message,
                        });
                    } else {
                        if (result.orderList.dataFlag == "Y") {
                            this.variable.orderListData = result.orderList.data.dataList;
                            this.variable.orderListCnt = result.orderList.data.myShoppingCnt;
                            this.renderOrderList();
                        }
                    }
                }.bind(oSelf),
                true
            );
        },
        renderOrderList: function () {
            var $orderWrp = this.el.$actGroup.eq(0);
            var $moreBtnLink = $orderWrp.find(".list-more");
            var $cntOrder = $orderWrp.find(".count");
            var cntList = Math.min(this.variable.orderListCnt, 2);
            var actCont = this.el.$actGroup.eq(0).find(".my-activity-list");
            actCont.empty();
            if (this.variable.orderListCnt === 0) {
                $orderWrp.hide();
            } else {
                $orderWrp.show();
            }

            $cntOrder.text(this.variable.orderListCnt);
            if (this.variable.orderListCnt >= 2) {
                $moreBtnLink.show();
            } else {
                $moreBtnLink.hide();
            }
            for (var i = 0; i < cntList; i++) {
                this.addOrderList(i);
            }
        },
        addOrderList: function (i) {
            var actCont = this.el.$actGroup.eq(0).find(".my-activity-list");
            var data = this.variable.orderListData[i];

            var _clStatusOrder;
            if (data.status === "주문접수") {
                _clStatusOrder = "prod-01";
            } else if (data.status === "결제완료") {
                _clStatusOrder = "prod-02";
            } else if (data.status === "배송준비중") {
                _clStatusOrder = "prod-03";
            } else if (data.status === "배송중") {
                _clStatusOrder = "prod-04";
            } else if (data.status === "배송완료") {
                _clStatusOrder = "prod-05";
            } else if (data.status === "청약완료") {
                _clStatusOrder = "care-01";
            } else if (data.status === "계약완료") {
                _clStatusOrder = "care-02";
            }
            data._clStatusOrder = _clStatusOrder;

            actCont.append(vcui.template(orderItemTemplate, data));
        },
    };

    $(window).ready(function () {
        myHome.init(".contents.mypage.mypage-main-new");
    });
})();
