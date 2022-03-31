(function () {
    // prettier-ignore
    var itemTemplate = '<li>'+
        '<div class="myact-cont {{_clContType}}">'+
            '<em class="status {{_clStatusType}}">{{_status}}</em>'+
            '<div class="prod-info">'+
                '<span class="cate">{{_category}}</span>'+
                '<span class="prod {{#if _clContType === "visit"}}date{{/if}}">{{_modelNm}}</span>'+
                '{{#if _modelId !== ""}}<span class="model">{{_modelId}}</span>{{/if}}'+
            '</div>'+
            '<a href="#" class="btn-myact"><i class="blind">바로가기</i></a>'+
        '</div>'+
    '</li>';

    var MAX_LIST_CNT = 2;

    var myHome = {
        variable: {
            orderListData: [],
            bestCounselList: [],
            visitInfoList: [],
            inquiryList: [],
            reservationList: [],
            orderListCnt: 0,
            bestCounselCnt: 0,
            visitInfoCnt: 0,
            inquiryListCnt: 0,
            reservationCnt: 0,
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
                    var txtCntCoupon = vcui.number.addComma(result["couponeCnt"]);

                    var totalFormat = function (val) {
                        if (val >= 100) {
                            return "99+";
                        } else {
                            return val;
                        }
                    };
                    $(".my-info .count")
                        .eq(1)
                        .html(totalFormat(txtCntCoupon) + '<i class="unit">장</i>');
                },
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
            var oSelf = this;
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
                        var totListCnt = 0;
                        if (result.orderList.dataFlag == "Y") {
                            this.variable.orderListData = result.orderList.data.dataList;
                            this.variable.orderListCnt = result.orderList.data.myShoppingCnt;
                            totListCnt += Number(this.variable.orderListCnt);

                            this.renderList(0, this.variable.orderListCnt);
                        }
                        if (result.bestCounselList.dataFlag == "Y") {
                            this.variable.bestCounselList = result.bestCounselList.data.bestCounselList;
                            this.variable.bestCounselCnt = result.bestCounselList.data.bestCounselCnt;
                            totListCnt += Number(this.variable.bestCounselCnt);

                            this.renderList(1, this.variable.bestCounselCnt);
                        }

                        if (result.visitInfoList.dataFlag == "Y") {
                            this.variable.visitInfoList = result.visitInfoList.data.nextList;
                            this.variable.visitInfoCnt = result.visitInfoList.data.nextListCnt;
                            totListCnt += Number(this.variable.visitInfoCnt);

                            this.renderList(2, this.variable.visitInfoCnt);
                        }

                        if (result.myInquiryList.dataFlag == "Y") {
                            this.variable.inquiryList = result.myInquiryList.data.inquiryList;
                            this.variable.inquiryListCnt = result.myInquiryList.data.inquiryListCnt;
                            totListCnt += Number(this.variable.inquiryListCnt);

                            this.renderList(3, this.variable.inquiryListCnt);
                        }

                        if (result.myInquiryList.dataFlag == "Y") {
                            this.variable.reservationList = result.myReservationList.data.reservationList;
                            this.variable.reservationCnt = result.myReservationList.data.reservationCnt;
                            totListCnt += Number(this.variable.reservationCnt);

                            this.renderList(4, this.variable.reservationCnt);
                        }
                        if (totListCnt > 0) {
                            this.el.$actSection.show();
                        } else {
                            this.el.$actSection.hide();
                        }
                    }
                }.bind(oSelf),
                true
            );
        },
        /**
         * @method renderList
         * @param {groupIdx, listCnt} [groupIdx: 데이터 출력(.my-act-group) index, listCnt:데이터 수]
         * @return {myCallback}  [list 영역 set 호출]
         */
        renderList: function (groupIdx, listCnt) {
            if (listCnt === 0) {
                this.el.$actGroup.eq(groupIdx).hide();
                return;
            }
            this.setTxtCount(groupIdx, listCnt);
            var cntList = Math.min(listCnt, MAX_LIST_CNT);
            for (var i = 0; i < cntList; i++) {
                this.addOrderList(groupIdx, i);
            }
        },
        /**
         * @method setTxtCount
         * @param {groupIdx, listCnt} [groupIdx: 데이터 출력(.my-act-group) index, listCnt:데이터 수]
         * @return {myCallback}  [게시글 수 출력, 게시글 2개 이상 일 경우 더보기 버튼 출력]
         */
        setTxtCount: function (groupIdx, listCnt) {
            var $actGroup = this.el.$actGroup.eq(groupIdx);
            var $moreBtnLink = $actGroup.find(".list-more");
            var $cntOrder = $actGroup.find(".count");
            var $actList = $actGroup.find(".my-activity-list");
            $actList.empty();

            if (listCnt === 0) {
                $actGroup.hide();
            } else {
                $actGroup.show();
            }

            $cntOrder.text(listCnt);
            if (listCnt >= 2) {
                $moreBtnLink.show();
            } else {
                $moreBtnLink.hide();
            }
        },
        /**
         * @method addOrderList
         * @param {groupIdx, listIdx} [groupIdx: 데이터 출력(.my-act-group) index, listIdx:데이터 index]
         * @return {myCallback}  [게시글 수 출력, 게시글 2개 이상 일 경우 더보기 버튼 출력]
         */
        addOrderList: function (groupIdx, listIdx) {
            var $actList = this.el.$actGroup.eq(groupIdx).find(".my-activity-list");
            var data;
            if (groupIdx === 0) {
                //주문/배송/청약조회
                data = this.variable.orderListData[listIdx];
                data._status = data.status;
                data._category = data.category;
                data._modelNm = data.productNameKR;
                data._modelId = data.modelID;
                data._clContType = "order";
                data._clStatusType = this.getClStatus("order", data._status);
            } else if (groupIdx === 1) {
                //마이베스트샵
                data = this.variable.bestCounselList[listIdx];
                data._status = data.progress;
                data._category = data.counselEventType;
                data._modelNm = data.modelDisplayName;
                data._modelId = data.modelName;
                data._clContType = "shop";
                data._clStatusType = "reservation";
            } else if (groupIdx === 2) {
                //렌탈/케어관리
                data = this.variable.visitInfoList[listIdx];
                data._status = "방문 일정/예약";
                data._category = "렌탈/케어 관리";
                data._modelNm = "방문 예정일 : " + vcui.date.format(data.CALC_DATE, "yyyy-MM-dd");
                data._modelId = data.CATEGORY_NM_KOR + "(" + data.CONT_LINE_SEQ + ")";
                data._clContType = "visit";
                data._clStatusType = "reservation";
            } else if (groupIdx === 3) {
                //칭찬/개선/제안 조회
                data = this.variable.inquiryList[listIdx];
                data._status = data.progress;
                data._category = data.categoryTitle;
                data._modelNm = data.newTitle;
                data._modelId = "";
                data._clContType = "voc";
                data._clStatusType = this.getClStatus("voc", data._status);
            } else if (groupIdx === 4) {
                //세비스 상담/예약조회
                data = this.variable.reservationList[listIdx];
                data._status = data.progress;
                data._category = data.inquiryType;
                data._modelNm = data.modelCategory;
                data._modelId = data.modelCd;
                data._clContType = "svc";
                data._clStatusType = "receipt";
                data._clStatusType = this.getClStatus("svc", data._status);
            }

            $actList.append(vcui.template(itemTemplate, data));
        },
        /**
         * @method getClStatus
         * @param {contType, status} [contType:list 클래스, status: 현재상태]
         * @return {myCallback}  [상태 클래스명 출력]
         */
        getClStatus: function (contType, status) {
            if (contType === "order") {
                switch (status) {
                    case "주문접수":
                        return "prod-01";
                        break;
                    case "주문완료":
                        return "prod-01";
                        break;
                    case "결제완료":
                        return "prod-02";
                        break;
                    case "배송준비중":
                        return "prod-03";
                        break;
                    case "배송중":
                        return "prod-04";
                        break;
                    case "배송완료":
                        return "prod-05";
                        break;
                    case "청약완료":
                        return "care-01";
                        break;
                    case "계약완료":
                        return "care-02";
                        break;
                }
            } else {
                switch (status) {
                    case "접수":
                        return "receipt";
                        break;
                    case "답변중":
                        return "progress";
                        break;
                    case "답변완료":
                        return "completion";
                        break;
                    case "답변대기":
                        return "ready";
                        break;
                    case "방문예정":
                        return "visit-ready";
                        break;
                    case "처리중":
                        return "svc-progress";
                        break;
                    case "처리완료":
                        return "svc-completion";
                        break;
                    case "상담예정":
                        return "counselling-ready";
                        break;
                }
            }
        },
    };

    $(window).ready(function () {
        myHome.init(".contents.mypage.mypage-main-new");
    });
})();
