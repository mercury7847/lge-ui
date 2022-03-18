(function () {
    // prettier-ignore
    var couponItemTemplate = '<li class="lists" data-json="{{jsonString}}">' +
        '<a href="#n" class="coupon-box{{#if type}} {{type}}{{/if}}{{#if end}} disabled{{/if}}" title="쿠폰 자세히 보기">' +
            '<div class="coupon-cont">' +
                '<div class="top">' +
                    '<p class="name">{{title}}</p>' +
                    '{{#if sale}}<p class="discount"><em>{{sale}}%</em> 할인</p>{{/if}}' +
                '</div>' +
                '<p class="desc">[{{desc}}]</p>' +
                '<div class="bottom">' +
                    '{{#if validDate}}<p>유효기간 : {{validDate}}</p>{{/if}}' +
                    '{{#if (startDate||endDate)}}<p>유효기간 : {{startDate}}~{{endDate}}</p>{{/if}}' +
                    '{{#if more}}<p class="more">{{more}}</p>{{/if}}' +
                '</div>' +
                '{{#if end}}<div class="end-flags">사용완료</div>{{/if}}' +
            '</div><span class="coupon-bg" aria-hidden="true"><em>LGE COUPON</em></span>' +
        '</a>' +
    '</li>'

    // prettier-ignore
    var couponPopupTemplate = '<header class="pop-header">' +
            '<h1 class="tit" id="modal_6_title"><span>{{title}}</span></h1>' +
        '</header>' +
        '<section class="pop-conts common-pop mypage" id="modal_6_content">' +
            '<div class="coupon-info-moreview">' + 
                '<p class="title">[{{desc}}]</p>' +
                '{{#if sale}}<p class="desc"><em>{{sale}}%</em>할인</p>{{/if}}' +
                '{{#if validDate}}<p class="info">유효기간 : {{validDate}}</p>{{/if}}' +
                '{{#if (startDate||endDate)}}<p class="info">유효기간 : {{startDate}}~{{endDate}}</p>{{/if}}' +
                '{{#if more}}<p class="info">{{more}}</p>{{/if}}' +
            '</div>' +
            '<ul class="bullet-list">' +
                '<li class="b-txt">온라인 전용 사용가능 / 쿠폰 중복 할인 불가능</li>' +
                '<li class="b-txt">제품에 따라 일부 제품에서 쿠폰 사용이 불가능 할 수 <br>있습니다.</li>' +
                '<li class="b-txt">장바구니 주문 결제 시 쿠폰 확인 여부를 확인 할 수 있습니다.</li>' +
            '</ul>' +
        '</section>' +
        '<footer class="pop-footer center" ui-modules="Footer">' +
            '<div class="btn-group">' +
                '{{#if end}}' +
                    '<button type="button" class="btn pink" disabled><span>기간만료/사용불가</span></button>' +
                '{{#else}}' +
                    '<button type="button" class="btn pink" data-coupon-url="{{url}}"><span>쿠폰 사용 하러 가기</span></button>' +
                '{{/if}}' +
            '</div>' +
        '</footer>' +
    '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>'

    // prettier-ignore
    var storeCouponItemTemplate = '<li class="lists" data-json="{{jsonString}}">'+
        '<div class="coupon-box bshop {{_clName}} {{_status}}">'+
            '<div class="coupon-cont">'+
                '<div class="top">'+
                    '<p class="name">{{cpnEventName}}</p>'+
                '</div>'+
                '<p class="desc">{{cpnMainTitle}}</p>'+
                '<div class="bottom">'+
                    '<p>유효기간 : {{cpnFromDate}}~{{cpnToDate}}</p>'+
                    '<p>{{#if _clName !== "shop-benefit"}}대상모델 : {{/if}}{{#if _clName === "shop-benefit"}}대상매장 : {{orgcodeName1}}{{/if}}</p>'+
                '</div>'+
                '<a href="#" class="btn-link-text" title="사용하기"><span>사용하기</span></a>'+
                '{{#if _status==="disabled"}}<div class="end-flags">{{_txtEndFlag}}</div>{{/if}}'+
            '</div>'+
            '<span class="coupon-bg" aria-hidden="true"><em>BEST SHOP</em></span>'+
        '</div>'+
    '</li>';

    // prettier-ignore
    var storeCouponPopupTemplate = '<header class="pop-header" data-cpnEventNo="{{cpnEventNo}}">'+
            '<h1 class="tit"><span>매장 방문 혜택 쿠폰</span></h1>'+
        '</header>'+
        '<section class="pop-conts common-pop mypage mybestshop">'+
            '<div class="coupon-info-moreview">'+
                '<strong class="title-info">{{cpnEventName}}</strong>'+
                '<p class="period-info">유효기간 : {{cpnFromDate}}~{{cpnToDate}}</p>'+
            '</div>'+
            '<div class="coupon-info-model">'+
                '<p class="sub-tit">대상매장</p>'+
                '<div class="sub-cont">{{orgcodeName2}}</div>'+
            '</div>'+
            '<ul class="bullet-list">'+
                '<li class="b-txt">본 쿠폰은 LG전자 베스트샵 매장에서만 사용할 수 있습니다.</li>'+
                '<li class="b-txt">대상 매장에 방문하여 매니저에게 쿠폰을 보여주세요.</li>'+ 
                '<li class="b-txt">"매니저 확인" 후 사용된 쿠폰은 사용취소가 불가합니다.</li>'+
                '<li class="b-txt">본 쿠폰은 매장 사정에 의해 조기 마감될 수 있습니다.</li>'+
            '</ul>'+
        '</section>'+
        '<footer class="pop-footer center">'+
            '<div class="btn-group">'+
                '<button type="button" class="btn pink confirmManage"><span>매니저 확인</span></button>'+
            '</div>'+
        '</footer>'+
        '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>';

    var TAB;
    var TAB_LGE = "LGE";
    var TAB_BESTSHOP_PRD = "BESTSHOP_PRD";
    var TAB_BESTSHOP_VISIT = "BESTSHOP_VISIT";
    var linkHost = window.LGEAPPHostName === "localhost" ? "https://www.lge.co.kr" : "";

    var coupon = {
        variable: {
            listData: [],
            visibleCount: 12,
            tabActIndex: 0,
            subTabActIndex: 1, //todo> subtab 생성 시 0으로 변경
            lgeOnPage: 0, //LGE.COM > 사용 가능 쿠폰 리스트 페이지
            lgeOffPage: 0, //LGE.COM > 종료 쿠폰 리스트 페이지
            bestShopPrdOnPage: 0, //베스트샵 > 매장 제품 할인 쿠폰 > 사용 가능 리스트 페이지
            bestShopPrdOffPage: 0, //베스트샵 > 매장 제품 할인 쿠폰 > 종료 쿠폰 리스트 페이지
            bestShopVisitOnPage: 0, //베스트샵 > 매장 방문 할인 쿠폰 > 사용 가능 리스트 페이지
            bestShopVisitOffPage: 0, //베스트샵 > 매장 방문 할인 쿠폰 > 종료 쿠폰 리스트 페이지
            selOptVal: "on", //셀렉트 박스 옵션 값 설정
        },
        el: {
            $contents: null,
            $tab: null,
            $subTab: null,
            $couponWrap: null,
            $couponList: null,
            $couponMore: null,
            $couponNoData: null,
            $couponPopup: null,
            $errorCoupon: null,
        },
        selector: {
            tab: ".tabs-wrap:eq(0)",
            subTab: "div.ui_tab",
            couponWrap: ".coupon-list-wrap",
            couponList: "div.coupon-lists ul",
            couponMore: "button.btn-moreview",
            noData: "div.no-data",
            couponPopup: "#couponPopup",
            errorCoupon: ".coupon-error-cont",
        },
        setProperty: function () {
            var $contents = this.el.$contents;
            this.el.$tab = $contents.find(this.selector.tab);
            this.el.$subTab = $contents.find(this.selector.subTab);

            this.el.$couponWrap = $contents.find(this.selector.couponWrap);
            this.el.$couponList = this.el.$couponWrap.find(this.selector.couponList);
            this.el.$couponMore = $contents.find(this.selector.couponMore);
            this.el.$couponNoData = $contents.find(this.selector.noData);
            this.el.$couponPopup = $(this.selector.couponPopup);
            this.el.$errorCoupon = $(this.selector.errorCoupon);
        },
        setStyle: function () {
            if (this.urlParam("tab") && this.urlParam("tab") === "bestshop" && this.urlParam("store_coupon") === "visit") {
                //베스트샵 > 매장 방문 혜택 쿠폰
                this.variable.tabActIndex = 1;
                this.variable.subTabActIndex = 1;
                this.el.$tab.find(">ul>li").eq(1).addClass("on");

                //todo> subtab 생성
                // this.el.$subTab.show();
                // this.el.$subTab.find(">ul>li").eq(1).addClass("on");
            } else if (this.urlParam("tab") && this.urlParam("tab") === "bestshop") {
                //베스트샵 > 매장 제품 할인 쿠폰
                this.variable.tabActIndex = 1;
                this.variable.subTabActIndex = 0;
                this.el.$tab.find(">ul>li").eq(1).addClass("on");

                //todo> subtab 생성
                // this.el.$subTab.show();
                // this.el.$subTab.find(">ul>li").eq(0).addClass("on");
            } else {
                //베스트샵 > 매장 제품 할인 쿠폰
                this.variable.tabActIndex = 0;
                this.el.$tab.find(">ul>li").eq(0).addClass("on");
            }

            this.el.$tab.find("li.on a .count").after('<em class="blind">선택됨</em>');

            //todo> subtab 생성
            // TAB = this.getTabName(this.variable.tabActIndex);
            // if (TAB === TAB_LGE) {
            //     this.el.$subTab.hide();
            // } else if (TAB === TAB_BESTSHOP_VISIT) {
            //     this.el.$subTab.show();
            // }
        },
        bindEvents: function () {
            //탭 클릭 시 > 데이터 연결
            this.el.$tab.on("click", ">ul >li >a", $.proxy(this.handler.clickTabMenu, this));

            //서브 탭 클릭 시 > 데이터 연결
            // this.el.$subTab.on("click", ">ul >li >a", $.proxy(this.handler.clickSubTabMenu, this));

            //쿠폰 상세 클릭 시 > 팝업 활성화
            this.el.$contents.find("div.coupon-lists").on("click", "li a", $.proxy(this.handler.clickCoupon, this));

            //더 보기 버튼 클릭 시 > 리스트 활성화
            this.el.$contents.find("button.btn-moreview").on("click", $.proxy(this.handler.clickBtnMoreView, this));

            //쿠폰 팝업 > 쿠폰 사용하러 가기 클릭 시 url 이동
            this.el.$couponPopup.on("click", "div.btn-group button", $.proxy(this.handler.clickBtnGroup, this));

            //쿠폰 팝업 > 매니저 확인 버튼 클릭 시 팝업 호출
            this.el.$couponPopup.on("click", ".confirmManage", $.proxy(this.handler.clickBtnCheckManage, this));

            //셀렉트 박스 변경 시 > 사용가능쿠폰/ 종료된 쿠폰 조회
            this.el.$contents.find(".ui_selectbox").vcSelectbox().on("change", $.proxy(this.handler.changeSelCoupon, this));

            //매장 방문 혜택 쿠폰 > 매니저확인 팝업 > 영문, 숫자만 입력 가능
            $(document).on("keyup.codeCoupon", ".comm-code", $.proxy(this.handler.keyupCodeCoupon, this));
            $(document).on("keydown.codeCoupon", ".comm-code", $.proxy(this.handler.keydownCodeCoupon, this));
        },
        handler: {
            /**
             * @callback clickTabMenu
             * @param {*} e
             * @return {myCallback} [탭 메뉴 클릭 시 api 호출]
             */
            clickTabMenu: function (e) {
                e.preventDefault();
                var $tab = $(e.currentTarget).parent();
                $tab.siblings("li.on").removeClass("on");
                $tab.addClass("on");

                this.el.$tab.find("li a > .blind").remove();
                this.el.$tab.find("li.on a .count").after('<em class="blind">선택됨</em>');

                //사용 가능 쿠폰 초기 값 셋팅
                this.el.$contents.find(".ui_selectbox").vcSelectbox("value", "on", true);
                this.variable.selOptVal = "on";

                //탭 변경 시 데이터 새로 고침
                this.variable.tabActIndex = $tab.index();
                this.requestCouponList();

                //todo> subtab 생성
                // TAB = this.getTabName($tab.index());
                // if ($tab.index() === 0) {
                //     this.el.$subTab.hide();
                // } else {
                //     this.el.$subTab.show();
                // }
            },
            clickSubTabMenu: function (e) {
                e.preventDefault();
                var $subTab = $(e.currentTarget).parent();

                //탭 변경 시 데이터 새로 고침
                this.variable.subTabActIndex = $subTab.index();
                this.requestCouponList();
            },
            /**
             * @callback clickCoupon
             * @param {*} e
             * @return {myCallback} [쿠폰 클릭 시 상세 팝업 호출]
             */
            clickCoupon: function (e) {
                e.preventDefault();
                var $li = $(e.currentTarget).closest("li");
                var obj = JSON.parse($li.attr("data-json"));
                var template;
                TAB = this.getTabName(this.variable.tabActIndex);
                if (TAB === TAB_LGE) {
                    template = couponPopupTemplate;
                } else if (TAB === TAB_BESTSHOP_VISIT) {
                    template = storeCouponPopupTemplate;
                }
                obj.jsonString = JSON.stringify(obj);
                this.el.$couponPopup.html(vcui.template(template, obj));
                this.el.$couponPopup.vcModal({ opener: $(this) });
            },
            /**
             * @callback clickBtnMoreView
             * @param {*} e
             * @return {myCallback} [더 보기 클릭 시 리스트 컨텐츠 추가]
             */
            clickBtnMoreView: function (e) {
                var page;
                TAB = this.getTabName(this.variable.tabActIndex);

                if (TAB === TAB_LGE) {
                    if (this.variable.selOptVal === "on") {
                        this.variable.lgeOnPage = this.variable.lgeOnPage + 1;
                        page = this.variable.lgeOnPage;
                    } else {
                        this.variable.lgeOffPage = this.variable.lgeOffPage + 1;
                        page = this.variable.lgeOffPage;
                    }
                } else if (TAB === TAB_BESTSHOP_VISIT) {
                    if (this.variable.selOptVal === "on") {
                        this.variable.bestShopVisitOnPage = this.variable.bestShopVisitOnPage + 1;
                        page = this.variable.bestShopVisitOnPage;
                    } else {
                        this.variable.bestShopVisitOffPage = this.variable.bestShopVisitOffPage + 1;
                        page = this.variable.bestShopVisitOffPage;
                    }
                }

                this.addCouponList(page);
            },
            clickBtnGroup: function (e) {
                var url = $(e.currentTarget).attr("data-coupon-url");
                if (!!url) {
                    location.href = url;
                }
            },
            /**
             * @callback clickBtnCheckManage
             * @param {*} e
             * @return {myCallback} [매장방문혜택 쿠폰 팝업 > 매니저 확인 버튼 클릭 > 쿠폰 사용 팝업 활성화]
             */
            clickBtnCheckManage: function (e) {
                e.preventDefault();
                var oSelf = this;
                var obj = { title: "", cancelBtnName: "", okBtnName: "", ok: function () {} };
                obj = $.extend(obj, {
                    title: "쿠폰을 사용 하시겠습니까?",
                    cancelBtnName: "취소",
                    okBtnName: "사용하기",
                    ok: $.proxy(oSelf.requestUseCoupon, oSelf),
                });

                var desc =
                    '<span class="input-wrap error">' +
                    '<input type="text" class="comm-code" placeholder="확인 코드를 입력해주세요." title="확인 코드를 입력해주세요." maxlength="9" data-min-length="8" data-max-length="9" data-required="true">' +
                    '<p class="err-msg" style="visibility:hidden">확인 코드가 올바르지 않습니다.</p>' +
                    "</span>";

                lgkorUI.confirm(desc, obj);

                $(".laypop .btn").eq(1).prop("disabled", true);
            },
            /**
             * @callback changeSelCoupon
             * @param {*} e
             * @return {myCallback} [셀렉트 박스 변경 시 > 사용가능쿠폰/ 종료된 쿠폰 조회]
             */
            changeSelCoupon: function (e) {
                if (this.variable.selOptVal === $(e.currentTarget).vcSelectbox("value")) {
                    return;
                }
                this.variable.selOptVal = $(e.currentTarget).vcSelectbox("value");
                this.setCouponList();
            },
            /**
             * @callback keyupCodeCoupon
             * @param {*} e
             * @return {myCallback} [매장방문혜택 쿠폰 팝업 > 매니저확인 팝업 확인코드 입력 시> 영문, 숫자만 입력 가능]
             */
            keyupCodeCoupon: function (e) {
                var inputVal = $(e.currentTarget).val();
                if (inputVal.length === 1) {
                    //첫번째 글자는 영문만 입력
                    $(e.currentTarget).val(inputVal.replace(/[^A-Za-z]/, ""));
                } else {
                    //나머지는 영문&숫자 입력
                    $(e.currentTarget).val(inputVal.replace(/[^A-Za-z0-9]/g, ""));
                }

                //에러메시지 코드 출력
                var reg_exp = new RegExp("^[a-zA-Z][a-zA-Z0-9]{7,8}$");
                var match = reg_exp.exec(inputVal);
                if (match == undefined) {
                    $(e.currentTarget).siblings(".err-msg").css("visibility", "visible");
                    $(e.currentTarget).closest(".lay-wrap").find(".btn").eq(1).prop("disabled", true);
                } else {
                    $(e.currentTarget).siblings(".err-msg").css("visibility", "hidden");
                    $(e.currentTarget).closest(".lay-wrap").find(".btn").eq(1).prop("disabled", false);
                }
            },
            /**
             * @callback keyupCodeCoupon
             * @param {*} e
             * @return {myCallback} [매장방문혜택 쿠폰 팝업 > 매니저확인 팝업 확인코드 입력 시> 영문, 숫자만 입력 가능]
             */
            keydownCodeCoupon: function (e) {
                var inputVal = $(e.currentTarget).val();
                if (inputVal.length === 1) {
                    //첫번째 글자는 영문만 입력
                    $(e.currentTarget).val(inputVal.replace(/[^A-Za-z]/, ""));
                } else {
                    //나머지는 영문&숫자 입력
                    $(e.currentTarget).val(inputVal.replace(/[^A-Za-z0-9]/g, ""));
                }
            },
        },
        init: function (el) {
            this.el.$contents = $(el);

            if (!this.el.$contents.length > 0) {
                return;
            }
            this.setProperty();
            this.setStyle();

            this.requestCouponList();

            this.bindEvents();
        },
        changeSubTabMenu: function (e) {
            var $subTab = $(e.currentTarget).parent();

            //탭 변경 시 데이터 새로 고침
            this.variable.subTabActIndex = $subTab.index();
            this.requestCouponList();
        },
        /**
         * @method getTabName
         * @memberof
         * @param {*} idx
         * @return {myCallback}  [활성화된 탭 이름 리턴]
         */
        getTabName: function (idx) {
            var oSelf = this;

            switch (idx) {
                case 0:
                    return TAB_LGE;
                    break;

                case 1:
                    if (oSelf.variable.subTabActIndex === 0) {
                        return TAB_BESTSHOP_PRD;
                        break;
                    }
                    return TAB_BESTSHOP_VISIT;
                    break;
            }
        },
        /**
         * @method requestCouponList
         * @memberof
         * @return {myCallback}  [coupon list API 요청]
         */
        requestCouponList: function () {
            var oSelf = this;
            var ajaxUrl;
            var tabCouponCnt0;
            var tabCouponCnt1;
            TAB = this.getTabName(this.variable.tabActIndex);
            if (TAB === TAB_LGE) {
                ajaxUrl = this.el.$contents.data("coupon-list-url");
                tabCouponCnt1 = this.el.$contents.data("bestshop-visit-coupon-list-url");
            } else if (TAB === TAB_BESTSHOP_VISIT) {
                ajaxUrl = this.el.$contents.data("bestshop-visit-coupon-list-url");
                tabCouponCnt0 = this.el.$contents.data("coupon-list-url");
            } else {
                this.el.$couponList.empty();
                this.el.$couponMore.hide();
                tabCouponCnt0 = this.el.$contents.data("coupon-list-url");
                tabCouponCnt1 = this.el.$contents.data("bestshop-visit-coupon-list-url");
            }
            var dataUrl = this.el.$contents.data();

            $.each(dataUrl, function (idx, val) {
                if (ajaxUrl && ajaxUrl === val) {
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost(
                        val,
                        {},
                        function (result) {
                            lgkorUI.hideLoading();

                            if (result.status.toUpperCase() === "ERROR") {
                                //로그인 풀릴 경우 > 로그인 화면으로 이동
                                if (result.message.toUpperCase() === "NOT_LOG_IN") {
                                    this.goLogin();
                                    return;
                                }

                                this.el.$couponWrap.hide();
                                this.el.$couponNoData.hide();
                                this.el.$couponMore.hide();
                                this.el.$errorCoupon.show();

                                // 게시글 수 출력
                                var $listCnt;
                                TAB = this.getTabName(this.variable.tabActIndex);
                                if (TAB === TAB_LGE) {
                                    $listCnt = this.el.$tab.find(".count span").eq(0);
                                } else if (TAB === TAB_BESTSHOP_VISIT) {
                                    $listCnt = this.el.$tab.find(".count span").eq(1);
                                }
                                $listCnt.text("");

                                //시스템 정기 점검 일 경우
                                if (result.downTimeStart) {
                                    $(".coupon-error-cont dl").show();
                                    $(".coupon-error-cont dd").text(result.downTimeStart + " ~ " + result.downTimeEnd);
                                } else {
                                    $(".coupon-error-cont dl").hide();
                                }
                                return;
                            }

                            if (result.status.toUpperCase() === "SUCCESS") {
                                this.el.$couponWrap.show();
                                this.el.$errorCoupon.hide();

                                var keyValue = Object.keys(result.data);
                                var aDataList;
                                $.each(keyValue, function (idx, val) {
                                    aDataList = result.data[val];
                                    if (val.toUpperCase().indexOf("ONLIST") >= 0 && typeof aDataList === "object") {
                                        oSelf.variable.listData["on"] = aDataList;
                                    }

                                    if (
                                        (val.toUpperCase().indexOf("OFFLIST") >= 0 || val.toUpperCase().indexOf("ENDLIST") >= 0) &&
                                        typeof aDataList === "object"
                                    ) {
                                        oSelf.variable.listData["end"] = aDataList;
                                    }

                                    if (val.toUpperCase().indexOf("ONLISTCOUNT") >= 0) {
                                        oSelf.variable.listData["onListCnt"] = aDataList;
                                    }
                                });

                                this.renderContents();
                            }
                        }.bind(oSelf),
                        true
                    );
                }

                if (tabCouponCnt0 === val || tabCouponCnt1 === val) {
                    lgkorUI.requestAjaxDataPost(
                        val,
                        {},
                        function (result) {
                            if (result.status.toUpperCase() === "ERROR") {
                                //로그인 풀릴 경우
                                if (result.message.toUpperCase() === "NOT_LOG_IN") {
                                    //로그인 화면으로 이동
                                    this.goLogin();
                                    return;
                                }

                                this.el.$tab.find('li:not(".on") a .count span').text("0");
                            }

                            if (result.status.toUpperCase() === "SUCCESS") {
                                var keyListCnt;
                                var keyValue = Object.keys(result.data);
                                $.each(keyValue, function (idx, val) {
                                    if (val.toUpperCase().indexOf("ONLISTCOUNT") >= 0) {
                                        keyListCnt = val;
                                    }
                                });

                                if (tabCouponCnt0 === val) {
                                    this.el.$tab.find("li a .count span").eq(0).text(result.data[keyListCnt]);
                                } else {
                                    this.el.$tab.find("li a .count span").eq(1).text(result.data[keyListCnt]);
                                }
                            }
                        }.bind(oSelf),
                        true
                    );
                }
            });
        },
        /**
         * @method requestUseCoupon
         * @memberof
         * @return {myCallback}  [coupon update API 요청]
         */
        requestUseCoupon: function () {
            var postData = {};
            postData.cpnEventNo = $("#couponPopup header").attr("data-cpnEventNo");
            postData.empNo = $(".comm-code").val();
            var desc = "<span class='blind'>message :: </span>";

            var ajaxUrl;
            if (document.URL.indexOf("ACCF7096.html") >= 0) {
                ajaxUrl = "/lg5-common/data-ajax/mypage/shopping/updateCoupon.json";
            } else {
                ajaxUrl = "/my-page/ajax/bestshop/updateCoupon";
            }

            lgkorUI.requestAjaxDataPost(
                ajaxUrl,
                postData,
                function (result) {
                    var obj = { title: "" };
                    if (result.status.toUpperCase() === "ERROR") {
                        //로그인 풀릴 경우 > 로그인 화면으로 이동
                        if (result.message.toUpperCase() === "NOT_LOG_IN") {
                            this.goLogin();
                            return;
                        }

                        obj = $.extend(obj, { title: "쿠폰이 정상적으로 사용되지 않았습니다." });
                        lgkorUI.alert(desc, obj);
                        return;
                    }

                    if (result.status.toUpperCase() === "SUCCESS") {
                        obj = $.extend(obj, { title: "쿠폰 사용이 완료되었습니다." });
                    } else if (result.status.toUpperCase() === "FAIL01") {
                        obj = $.extend(obj, { title: "쿠폰 사용기간이 지났습니다." });
                    } else if (result.status.toUpperCase() === "FAIL02") {
                        obj = $.extend(obj, { title: "이미 사용한 쿠폰입니다." });
                    } else if (result.status.toUpperCase() === "FAIL03") {
                        obj = $.extend(obj, { title: "쿠폰이 정상적으로 사용되지 않았습니다." });
                        desc = "<span class='blind'>message ::" + result.message + "</span>";
                    }
                    lgkorUI.alert(desc, obj);

                    if (result.status.toUpperCase() === "SUCCESS") {
                        $("#couponPopup .btn-close").trigger("click");
                    }
                }.bind(this),
                true
            );
        },
        /**
         * @method renderContents
         * @memberof
         * @return {myCallback}  [list > 게시글 수 출력, 데이터 리스트 출력]
         */
        renderContents: function () {
            // 게시글 수 출력
            var $listCnt;
            TAB = this.getTabName(this.variable.tabActIndex);
            if (TAB === TAB_LGE) {
                $listCnt = this.el.$tab.find(".count span").eq(0);
            } else if (TAB === TAB_BESTSHOP_VISIT) {
                $listCnt = this.el.$tab.find(".count span").eq(1);
            }
            $listCnt.text(this.variable.listData["onListCnt"]);

            this.setCouponList();
        },
        /**
         * @method setCouponList
         * @memberof
         * @return {myCallback}  [list > 데이터 리스트 출력]
         */
        setCouponList: function () {
            var oSelf = this;
            var targetList = this.el.$couponList;
            var noData = this.el.$couponNoData;

            var oDataList;
            if (this.variable.selOptVal === "on") {
                oDataList = this.variable.listData["on"];
            } else {
                oDataList = this.variable.listData["end"];
            }

            if (oDataList === undefined) {
                return;
            }

            var count = oDataList.length;

            TAB = this.getTabName(this.variable.tabActIndex);

            if (TAB === TAB_LGE) {
                if (this.variable.selOptVal === "on") {
                    page = this.variable.lgeOnPage;
                } else {
                    page = this.variable.lgeOffPage;
                }
            } else if (TAB === TAB_BESTSHOP_VISIT) {
                if (this.variable.selOptVal === "on") {
                    page = this.variable.bestShopVisitOnPage;
                } else {
                    page = this.variable.bestShopVisitOffPage;
                }
            }

            targetList.empty();
            if (count > 0) {
                noData.hide();
                targetList.show();

                for (var i = 0; i <= page; i++) {
                    oSelf.addCouponList(i);
                }
            } else {
                if (this.variable.selOptVal === "on") {
                    noData.find("p").text("사용 할 수 있는 쿠폰이 없습니다.");
                } else {
                    noData.find("p").text("종료된 쿠폰이 없습니다.");
                }
                noData.show();
                targetList.hide();
                this.el.$couponMore.hide();
            }
        },
        /**
         * @method addCouponList
         * @memberof
         * @return {myCallback}  [list > 데이터 상세 쿠폰 컴포넌트 출력]
         */
        addCouponList: function (page) {
            var listbottom = this.el.$couponList.offset().top + this.el.$couponList.height();
            var start = page * this.variable.visibleCount;
            var end = start + this.variable.visibleCount;

            var template;
            var _status;
            var _clName;
            var _txtEndFlag;
            var oDataList;
            if (this.variable.selOptVal === "on") {
                oDataList = this.variable.listData["on"];
            } else {
                oDataList = this.variable.listData["end"];
            }

            var totalList = oDataList.length;
            TAB = this.getTabName(this.variable.tabActIndex);
            if (TAB === TAB_LGE) {
                template = couponItemTemplate;
            } else if (TAB === TAB_BESTSHOP_VISIT) {
                template = storeCouponItemTemplate;
                _clName = "shop-benefit";

                if (this.variable.selOptVal === "on") {
                    _status = "";
                } else {
                    _status = "disabled";
                }
            }

            if (end > totalList) {
                end = totalList;
            }

            for (var i = start; i < end; i++) {
                var item = oDataList[i];
                delete item["unifyId"];

                if (item) {
                    item.startDate = !item.startDate ? null : vcui.date.format(item.startDate, "yyyy.MM.dd");
                    item.endDate = !item.endDate ? null : vcui.date.format(item.endDate, "yyyy.MM.dd");
                    item.jsonString = JSON.stringify(item);

                    if (TAB === TAB_BESTSHOP_VISIT) {
                        item._clName = _clName;
                        item._status = _status;
                        item._txtEndFlag = "";

                        if (item.cpnStatus === "F") {
                            item._txtEndFlag = "조기마감";
                        } else if (item.cpnStatus === "Y") {
                            item._txtEndFlag = "사용완료";
                        } else if (item.cpnStatus === "N") {
                            item._txtEndFlag = "기간만료";
                        }
                    }
                    this.el.$couponList.append(vcui.template(template, item));
                }
            }
            if (end >= totalList) {
                this.el.$couponMore.hide();
            } else {
                this.el.$couponMore.show();
            }

            if (page > 0) {
                $("html, body").stop().animate({ scrollTop: listbottom }, 420);
            }
        },
        /**
         * @method urlParam
         * @param {*} name
         * @memberof
         * @return {myCallback}  [도메인 파라미터에 name 값 있는지 체크]
         */
        urlParam: function (name) {
            var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return decodeURI(results[1]) || 0;
            }
        },
        /**
         * @method goLogin
         * @memberof
         * @return {myCallback}  [로그인 페이지로 이동]
         */
        goLogin: function () {
            location.href = linkHost + "/sso/api/emp/Login?state=" + encodeURIComponent(location.href.replace(location.origin, ""));
        },
    };

    $(window).ready(function () {
        coupon.init(".lnb-contents");
    });
})();
