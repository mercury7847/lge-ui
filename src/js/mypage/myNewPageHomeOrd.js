(function () {
    // prettier-ignore
    var wishItemTemplate = "<li>" +
            '<div class="item">' +
                '<div class="product-image" aria-hidden="true">' +
                    '<a href="{{pdpUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a>' +
            '</div>' +
            '<div class="product-contents">' +
                '<div class="product-info">' +
                    '<div class="product-name"><a href="{{pdpUrl}}">{{title}}</a></div>'+
                    '<div class="sku">{{sku}}</div>' +
                "</div>" +
            "</div>" +
        "</div>" +
    "</li>";

    // prettier-ignore
    var noDataTemplate='<div class="no-data"><span>{{msg}}</span></div>';

    var MAX_LIST_CNT = 2;

    var myHome = {
        variable: {
            wishList: [],
            wishListCnt: 0,
            wishListMsg: "",
        },
        el: {
            $contents: null,
            $actSection: null,
            $actGroup: null,
        },
        selector: {
            actSection: ".my-section",
            actGroup: ".my-act-group",
        },
        setProperty: function () {
            var $contents = this.el.$contents;
            this.el.$actSection = $contents.find(this.selector.actSection).eq(0);
            this.el.$actGroup = $contents.find(this.selector.actGroup);
        },
        handler: {},
        init: function (el) {
            this.el.$contents = $(el);
            if (!this.el.$contents.length > 0) {
                return;
            }

            //AS-IS > 크레마
            this.cremaLogin();
            this.setProperty();

            //쿠폰 갯수 API 연결
            this.requestCntCoupon();

            //커뮤니케이션 API 연결
            this.requestMyPageList();
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
        /**
         * @method totalFormat
         * @param {val} [val: 데이터]
         * @return {myCallback}  [값이 100개 이상일 경우 표기 ]
         */
        totalFormat: function (val) {
            if (val >= 100) {
                return "99+";
            } else {
                return val;
            }
        },
        /**
         * @method requestMyPageList
         * @memberof
         * @return {myCallback}  [정보관리 > 쿠폰 갯수 API ]
         */
        requestCntCoupon: function () {
            var sendUrl = this.el.$contents.data("member-info");
            lgkorUI.requestAjaxData(
                sendUrl,
                {},
                function (result) {
                    var txtCntCoupon = this.totalFormat(result["couponCnt"]);

                    $(".my-info .count")
                        .eq(1)
                        .html(txtCntCoupon + '<i class="unit">장</i>');
                }.bind(this),
                "GET",
                "json",
                true,
                null,
                true
            );
        },
        /**
         * @method requestMyPageList
         * @memberof
         * @return {myCallback}  [커뮤니케이션 영역 API 요청]
         */
        requestMyPageList: function () {
            var url = this.el.$contents.data("mypage-info");
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(
                url,
                {},
                function (result) {
                    lgkorUI.hideLoading();
                    if (result.status == "fail") {
                        lgkorUI.alert("", {
                            title: result.message,
                        });
                    } else {
                        //찜한 목록 데이터 연결
                        if (result.wishList) {
                            this.variable.wishListMsg = result.wishList.data.message;

                            if (result.wishList.dataFlag == "Y") {
                                this.variable.wishList = result.wishList.data.list;
                                this.variable.wishListCnt = result.wishList.data.wishCnt;
                            }
                            this.renderWishList();
                        }
                    }
                }.bind(this),
                true
            );
        },
        renderWishList: function () {
            var $wishWrap = $(".my-section-wrap .my-section").eq(0);
            var $txtCntWishList = $wishWrap.find(".count");
            var $prdList = $wishWrap.find(".my-prod-list");
            var cntList = Math.min(this.variable.wishListCnt, MAX_LIST_CNT);
            $prdList.empty();

            if (this.variable.wishListCnt > 0) {
                $txtCntWishList.text("(" + this.totalFormat(this.variable.wishListCnt) + ")");

                for (var i = 0; i < cntList; i++) {
                    $prdList.append(vcui.template(wishItemTemplate, this.variable.wishList[i]));
                }
            } else {
                $txtCntWishList.text("");
                var data = {};
                data.msg = this.variable.wishListMsg;
                $prdList.append(vcui.template(noDataTemplate, data));
            }
        },
    };

    $(window).ready(function () {
        myHome.init(".contents.mypage.mypage-main-new");
    });
})();
