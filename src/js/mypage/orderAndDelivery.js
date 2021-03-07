(function() {
    var ORDER_INQUIRY_LIST_URL;
    var ORDER_DETAIL_URL;
    var PRODUCT_STATUS_URL;
    var ORDER_CANCEL_POP_URL;
    var ORDER_SAILS_URL;
    var BANK_CONFIRM_URL;
    var ORDER_REQUEST_URL;


    var PAYMENT_METHOD_CONFIRM;
    var INFO_MODIFY_CONFIRM;
    var ARS_AGREE_URL;
    var PAYMENT_SAVE_URL;

    var PAGE_TYPE_LIST = "orderListPage";
    var PAGE_TYPE_DETAIL = "orderDetailPage";
    var PAGE_TYPE_NONMEM_DETAIL = "orderNoneMemberPage";
    var PAGE_TYPE_CAREDETAIL = "careOrderDetailPage";

    var TAB_FLAG_ORDER = "ORDER";
    var TAB_FLAG_CARE = "CARE";

    var METHOD_CARD = "CARD";
    var METHOD_BANK = "BANK";

    var inquiryListTemplate =
        '<div class="box" data-id="{{dataID}}">'+
            '<div class="info-wrap">'+
                '<ul class="infos">'+
                    '<li>{{dateTitle}}<em>{{orderDate}}</em></li>'+
                    '<li>{{orderNumberTitle}}<em>{{groupNumber}}</em></li>'+
                '</ul>'+
                '<p class="totals">총 {{orderTotal}}건</p>'+
            '</div>'+
            '<div class="tbl-layout ">'+
                '<div class="thead" aria-hidden="true">'+
                    '<span class="th col1">제품정보(주문/배송 상세보기)</span>'+
                    '<span class="th col2">진행상태</span>'+
                '</div>'+
                '<div class="tbody">'+
                '</div>'+
            '</div>'+
            '{{#if orderCancelAbleYn == "Y"}}'+
            '<a href="#n" class="btn-link orderCancel-btn">취소신청</a>'+
            '{{/if}}'+
            '{{#if requestOrderAbleYn == "Y"}}'+
            '<a href="#n" class="btn-link requestOrder-btn" style="right:90px;">주문접수</a>'+
            '{{/if}}'+
            '<div class="btns">'+
                '<a href="#n" class="btn-link">주문/배송 상세보기</a>'+
            '</div>'+
        '</div>';

    var prodListTemplate = 
        '<div class="row {{listData.orderStatus.disabled}}">'+
            '<div class="col-table" data-prod-id="{{listData.prodID}}">'+
                '<div class="col col1">'+
                    '<span class="blind">제품정보</span>'+
                    '<div class="product-info">'+
                        '<div class="thumb">'+
                            '<a href="{{listData.productPDPurl}}"><img onError="lgkorUI.addImgErrorEvent(this);" src="{{listData.productImage}}" alt="{{listData.productNameKR}}"></a>'+
                        '</div>'+
                        '<div class="infos">'+
                            '{{#if listData.productFlag}}<div class="flag-wrap"><span class="flag">{{listData.productFlag}}</span></div>{{/if}}'+
                            '<p class="name"><a href="{{listData.productPDPurl}}"><span class="blind">제품명</span>{{#raw listData.productNameKR}}</a></p>'+
                            '<p class="e-name"><span class="blind">영문제품번호</span>{{listData.productNameEN}}</p>'+
                            '{{#if listData.specList && listData.specList.length > 0}}'+
                            '<div class="more">'+
                                '<span class="blind">제품스펙</span>'+
                                '<ul>'+
                                    '{{#each spec in listData.specList}}'+
                                    '<li>{{spec}}</li>'+
                                    '{{/each}}'+                     
                                '</ul>'+
                            '</div>'+
                            '{{/if}}'+
                            '{{#if listData.productTotal}}<p class="count">수량 : {{listData.productTotal}}</p>{{/if}}'+
                        '</div>'+
                        '<p class="price">'+
                            '<span class="blind">구매가격</span>{{listData.addCommaProdPrice}}원'+
                        '</p>'+
                    '</div>'+
                '</div>'+
                '<div class="col col2">'+
                    '<div class="state-box">'+
                        '<p class="tit {{listData.orderStatus.statusClass}}"><span class="blind">진행상태</span>{{listData.orderStatus.statusText}}</p>'+
                        '{{#if listData.orderStatus.statusDate !=""}}<p class="desc">{{listData.orderStatus.statusDate}}</p>{{/if}}'+
                        '{{#if listData.statusButtonList && listData.statusButtonList.length > 0}}'+
                        '<div class="state-btns">'+
                            '{{#each status in listData.statusButtonList}}'+
                            '<a href="#n" class="btn size border stateInner-btn" data-type="{{status.className}}"><span>{{status.buttonName}}</span></a>'+
                            '{{/each}}'+
                        '</div>'+
                        '{{/if}}'+
                    '</div>'+
                '</div>'+
            '</div>'+
            '{{#if isCheck}}'+
            '<span class="chk-wrap cancel-select">'+
                '<input type="checkbox" id="chk-cancel{{listData.prodID}}" value="{{listData.prodID}}" name="chk-cancel" {{listData.orderStatus.disabled}}>'+
                '<label for="chk-cancel{{listData.prodID}}"><span class="blind">해당 상품 선택</span></label>'+
            '</span>'+
            '{{/if}}'+
        '</div>';

        var priceInfoTemplate = 
            '<div class="tit-wrap">'+
                '<h2 class="h2-tit">{{typeName}} 정보</h2>'+
            '</div>'+
            '<div class="tb-scroll">'+
                '<div class="tb_row tb-row-bl">'+
                    '<table>'+
                        '<caption>{{typeName}} 정보를 제품금액, 할인 금액 합계, 취소 신청 멤버십 포인트, 취소 신청 금액 순으로 안내</caption>'+
                        '<colgroup>'+
                            '<col style="width:25%">'+
                            '<col style="width:25%">'+
                            '<col style="width:25%">'+
                            '<col>'+
                        '</colgroup>'+
                        '<thead>'+
                            '<tr>'+
                                '<th scope="col">제품 금액</th>'+
                                '<th scope="col">할인 금액 합계</th>'+
                                '{{#if mempointPrices != "0"}} <th scope="col">{{typeName}} 신청 멤버십 포인트</th>{{/if}}'+
                                '<th scope="col">{{typeName}} 신청 금액</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td class="productPrices">{{productPrices}}원</td>'+
                                '<td class="discountPrices">{{discountPrices}}원</td>'+
                                '{{#if mempointPrices != "0"}} <td class="mempointPrices">{{mempointPrices}}원</td>{{/if}}'+
                                '<td><em class="bold black totalPrice">{{totalPrice}}원</em></td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'+
            '</div>';


    var nonememPriceInfoTemplate = 
    '<div class="tit-wrap">'+
        '<h2 class="h2-tit">{{typeName}} 정보</h2>'+
    '</div>'+
    '<div class="tb-scroll">'+
        '<div class="tb_row tb-row-bl">'+
            '<table>'+
                '<caption>{{typeName}} 정보를 제품금액, 할인 금액 합계, 취소 신청 멤버십 포인트, 취소 신청 금액 순으로 안내</caption>'+
                '<colgroup>'+
                    '<col style="width:50%">'+
                    '<col>'+
                '</colgroup>'+
                '<thead>'+
                    '<tr>'+
                        '<th scope="col">제품 금액</th>'+
                        '<th scope="col">{{typeName}} 신청 금액</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                    '<tr>'+
                        '<td class="productPrices">{{productPrices}}원</td>'+
                        '<td><em class="bold black totalPrice">{{totalPrice}}원</em></td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+
        '</div>'+
    '</div>';
    
    var shippingListTemplate = '<li><dl><dt>인수자 성명</dt><dd>{{maskingName}}</dd></dl></li>' +
        '<li><dl><dt>배송주소</dt><dd>{{postcode}} {{maskingAddress}}</dd></dl></li>' +
        '<li><dl><dt>휴대폰</dt><dd>{{maskingTelephone}}</dd></dl></li>' +
        '<li><dl><dt>연락처</dt><dd>{{maskingTelephonenumber}}</dd></dl></li>' +
        '<li><dl><dt>배송시 요청사항</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>사전 방문 신청</dt><dd>{{#if instpectionVisit}}신청{{#else}}미신청{{/if}}</dd></dl></li>' +
        '<li><dl><dt>폐가전 수거</dt><dd>{{#if recyclingPickup}}수거신청{{#else}}해당없음{{/if}}</dd></dl></li>';
    
    var careShippingListTemplate = '<li><dl><dt>성명</dt><dd>{{maskingName}}</dd></dl></li>' +
        '<li><dl><dt>인수자 휴대폰</dt><dd>{{maskingTelephone}}</dd></dl></li>' +
        '<li><dl><dt>일반전화번호</dt><dd>{{maskingTelephonenumber}}</dd></dl></li>' +
        '<li><dl><dt>설치 주소</dt><dd>{{postcode}} {{maskingAddress}}</dd></dl></li>' +
        '<li><dl><dt>배송 요청사항</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>설치장소</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>설치희망 일시</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>사전 방문 신청</dt><dd>{{#if instpectionVisit}}신청{{#else}}미신청{{/if}}</dd></dl></li>' +
        '<li><dl><dt>폐가전 수거</dt><dd>{{#if recyclingPickup}}수거신청{{#else}}해당없음{{/if}}</dd></dl></li>';

    var paymentListTemplate = 
        '<li><dl><dt>결제 수단</dt><dd><span>{{paymentMethodName}}</span>'+
        '{{#if receiptUrl}}<a href="{{receiptUrl}}" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
        '</dd></dl></li>'+        
        '<li><dl><dt>주문 금액</dt><dd>{{orderPrice}}원</dd></dl></li>'+        
        '<li><dl><dt>할인 금액</dt><dd>{{discountPrice}}원</dd></dl></li>'+        
        '<li><dl><dt>멤버십포인트</dt><dd>{{memberShipPoint}}원</dd></dl></li>'+        
        '<li><dl><dt>총 결제 금액</dt><dd><em>{{totalPrice}}원</em></dd></dl></li>';

    var carePaymentListTemplate = 
        '<li><dl><dt>결제 수단</dt><dd><span>{{paymentMethodName}}</span>'+
        '{{#if receiptUrl}}<a href="{{receiptUrl}}" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
        '</dd></dl></li>';

    var noneMemPaymentTemplate = 
    '<li><dl><dt>결제 수단</dt><dd><span>{{paymentMethodName}}</span>'+
    '{{#if receiptUrl}}<a href="{{receiptUrl}}" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
    '</dd></dl></li>'+        
    '<li><dl><dt>주문 금액</dt><dd>{{orderPrice}}원</dd></dl></li>'+            
    '<li><dl><dt>총 결제 금액</dt><dd><em>{{totalPrice}}원</em></dd></dl></li>';

    var orderUserTemplate = 
        '<li>'+
            '<dl>'+
                '<dt>{{nameTitle}}</dt>'+
                '<dd>{{userName}}</dd>'+
            '</dl>'+
        '</li>'+        
        '<li>'+
            '<dl>'+
                '<dt>휴대폰</dt>'+
                '<dd>{{phoneNumber}}</dd>'+
            '</dl>'+
        '</li>'+        
        '<li>'+
            '<dl>'+
                '<dt>이메일</dt>'+
                '<dd>{{email}}</dd>'+
            '</dl>'+
        '</li>';

    var monthlyPaymentTemplate = 
        '<li><dl><dt>제휴카드 신청</dt><dd>{{requsetCardInfo}}</dd></dl></li>'+        
        '<li><dl>'+
            '<dt>월 납부 금액</dt>'+
            '<dd><span>{{monthlyPriceInfo}}</span><a href="{{monthlyPriceUrl}}" class="btn-link monthlyPrice-btn">매월 납부금 할인 내역알아보기<a></dd>'+
        '</dl></li>'+        
        '<li><dl><dt>월 납부 수단</dt><dd>{{paymentMethodName}}</dd></dl></li>'+        
        '<li><dl><dt>은행(카드)명</dt><dd>{{paymentTypeName}}</dd></dl></li>'+        
        '<li><dl><dt>계좌(카드)번호</dt><dd>{{paymentNumber}}</dd></dl></li>';

    var START_INDEX;

    var ORDER_LIST;
    var CARE_LIST;

    var SHIPPING_DATA;
    var PAYMENT_DATA;
    var ORDER_USER_DATA;
    var MONTHLY_PAYMENT_DATA;

    var LIST_VIEW_TOTAL = 10;

    var PAGE_TYPE;

    var TAB_FLAG;

    var txtMasking;

    var PRICE_INFO_DATA;
    var POP_PROD_DATA;
    var cancelAllChecker;

    var popBankInfo = {};
    var popBankConfirm = false;
    var paymentMethodConfirm;
    var arsAgree;

    var START_DATE, END_DATE;

    var CERTI_ID, BATCH_KEY;

    var CTI_REQUEST_KEY;

    var paymentInfo;
    var paymentMethod;

    var tabMenu;

    var cardValidation, bankValidation;

    var sendPaymentMethod;

    function init(){
        if(!$('.contents.mypage').data('consumables')) {
            vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar', 'ui/datePeriodFilter', 'helper/textMasking'], function () {             
                setting();
                bindEvents();

                requestOrderInquiry();
            });
        } else {
            bindEventsConsumables();
        }
    }

    function setting(){
        //연동 유알엘 정의...
        ORDER_INQUIRY_LIST_URL = $('.contents.mypage').data('orderInquiryList');
        ORDER_DETAIL_URL = $('.contents.mypage').data('orderDetail');
        PRODUCT_STATUS_URL = $('.contents.mypage').data('productStatus');
        ORDER_CANCEL_POP_URL = $('.contents.mypage').data('orderCancelPopup');
        ORDER_SAILS_URL = $('.contents.mypage').data('orderSales');
        BANK_CONFIRM_URL = $('.contents.mypage').data('accountCheck');
        
        ORDER_REQUEST_URL = $('.contents.mypage').data('orderRequest');

        PAYMENT_METHOD_CONFIRM = $('.contents.mypage').data('paymentMethodUrl');
        INFO_MODIFY_CONFIRM = $('.contents.mypage').data('modifyConfirmUrl');
        ARS_AGREE_URL = $('.contents.mypage').data('arsAgreeUrl');
        PAYMENT_SAVE_URL = $('.contents.mypage').data('paymentSaveUrl');

        txtMasking = new vcui.helper.TextMasking();

        tabMenu = $('.lnb-contents .tabs-wrap .tabs');

        //클래스로 접속 페이지 타입 정의...
        var isOrderlist = $('.contents.mypage').hasClass('orderAndDelivery'); 
        var isOrderdetail = $('.contents.mypage').hasClass('orderAndDelivery-detail'); 
        var isNonemem = $('.contents.mypage').hasClass('non-members'); 
        var isCaredetail = $('.contents.mypage').hasClass('orderAndDelivery-careDetail'); 
        if(isOrderlist) PAGE_TYPE = PAGE_TYPE_LIST;
        if(isOrderdetail) PAGE_TYPE = PAGE_TYPE_DETAIL;
        if(isNonemem) PAGE_TYPE = PAGE_TYPE_NONMEM_DETAIL;
        if(isCaredetail) PAGE_TYPE = PAGE_TYPE_CAREDETAIL;

        $('.inquiryPeriodFilter').vcDatePeriodFilter({dateBetweenCheckEnable:false});
        var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
        START_DATE = dateData.startDate;
        END_DATE = dateData.endDate;

        var getDataTypeFlag = $('.contents.mypage').data('tabFlag') ? $('.contents.mypage').data('tabFlag') : "";
        TAB_FLAG = PAGE_TYPE == PAGE_TYPE_LIST ? TAB_FLAG_ORDER : getDataTypeFlag;
        console.log("TAB_FLAG:", TAB_FLAG);

        var register = {
            paymentCard:{
                required: true,
                errorMsg: "신용카드의 카드사를 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardNumber: {
                required: true,
                errorMsg: "신용카드의 카드번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardPeriod: {
                required: true,
                errorMsg: "신용카드의 유효기간을 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        cardValidation = new vcui.ui.Validation('.monthly-payment-modify .by-card',{register:register});

        register = {
            paymentBank: {
                required: true,
                errorMsg: "계좌이체할 은행명을 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentBankNumber: {
                required: true,
                errorMsg: "계좌번호를 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        bankValidation = new vcui.ui.Validation('.monthly-payment-modify .by-bank',{register:register});
    }

    function bindEvents(){
        $('.inquiryPeriodFilter').on('dateFilter_submit', function(e, data){
            START_DATE = data.startDate;
            END_DATE = data.endDate;

            requestOrderInquiry();
        });

        tabMenu.find('li a').on('click', function(e){
            e.preventDefault();

            changeTabFlag($(this).parent());
        })

        $('.contents.mypage').on('click', '.orderCancel-btn', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            openCancelPop(dataID);
        }).on('click', '.requestOrder-btn', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            setOrderRequest(dataID);
        }).on('click', '.stateInner-btn', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            var prodID = $(this).closest('.col-table').data('prodId');
            var btntype = $(this).data('type');

            switch(btntype){
                case "deliveryInquiry":
                    setDeliveryInquiry(dataID, prodID);
                    break;

                case "deliveryRequest":
                    setDeliveryRequest(dataID, prodID);
                    break;

                case "takeBackInner":
                    openTakebackPop(dataID, prodID);
                    break;

                case "productReview":
                    setProductReview(dataID, prodID);
                    break;

                case "useReview":
                    setUseReview(dataID, prodID);
                    break;

                case "contractStatus":
                    setContractStatus(dataID, prodID);
                    break;
            }
        }).on('click', '.btn-moreview', function(e){
            e.preventDefault();

            setMoreOrderList();
        }).on('click', '.receiptList-btn', function(e){
            e.preventDefault();

            setReceiptListPop();
        }).on('click', '.monthlyPrice-btn', function(e){
            e.preventDefault();

            setMonthlyPricePop();
        }).on('click', '.thumb a', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            var prodID = $(this).closest('.col-table').data('prodId');
            var pdpUrl = $(this).attr("href");
            setProductStatus(dataID, prodID, pdpUrl);
        }).on('click', '.infos .name a', function(e){
            e.preventDefault();

            var wrapper = $(this).closest(".contents");
            var dataID = $(this).closest('.box').data("id");
            var prodID = $(this).closest('.col-table').data('prodId');
            var pdpUrl = $(this).attr("href");
            if(wrapper.hasClass("orderAndDelivery-detail")){                
                setProductStatus(dataID, prodID, pdpUrl);
            } else{
                var listdata = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
                location.href = ORDER_DETAIL_URL + "?orderNumber=" + listdata[dataID].orderNumber + "&requestNo=" + listdata[dataID].requestNo + "&tabFlag=" + TAB_FLAG;
            }
        });

        cancelAllChecker = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('instance');
        cancelAllChecker.on("allCheckerChange", function(){
            resetCancelPriceInfo();
        })
        $('#popup-cancel').on('change', '#cancelReason', function(e){
            changeCancelReason();
        }).on('click', '.pop-footer .btn-group button:nth-child(2)', function(e){
            e.preventDefault();

            cancelSubmit();
        }).on('click', '.bank-input-box button', function(e){
            e.preventDefault();

            sendBankConfirm('popup-cancel');
        });

        $('#popup-takeback').on('change', '#slt01', function(e){
            changeTakebackReason();
        }).on('click', '.pop-footer .btn-group button:nth-child(2)', function(e){
            e.preventDefault();

            takebackSubmit();
        }).on('click', '.bank-input-box button', function(e){
            e.preventDefault();

            sendBankConfirm('popup-takeback');
        });


        $('.monthly-payment .changePayment-btn a').on('click', function(e){
            e.preventDefault();

            sendChangeConfirm();
        });
        $(".monthly-payment-modify").on('click', '.paymentCardConfirm, .paymentBankConfirm', function(e){
            e.preventDefault();

            paymentMethodAbled(this);
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();

            setArsAgreeConfirm();
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal();
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal();
        }).on('click', '.cancel-btn', function(e){
            e.preventDefault();

            savePaymentInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            savePaymentInfoOk();
        });

        $('#popup-selfClearing').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            $('.monthly-payment-modify').find('input[name=selfClearingAgree]').prop('checked', chk);

            if(chk) $('#popup-selfClearing').vcModal('close');
        });
    }

    function changeTabFlag(tab){
        tabMenu.children().removeClass('on');
        tab.addClass('on');
        
        TAB_FLAG = tab.index() ? TAB_FLAG_CARE : TAB_FLAG_ORDER;

        START_INDEX = 0;
        setOrderListContents();
        setStepInfoStatus();
    }

    function getBankBnumberValidation(popname){
        var bankValue = $('#' + popname).find('.bank-input-box select option:selected').val();
        if(!bankValue){
            lgkorUI.alert("", {
                title: "환불계좌 은행을 선택해 주세요."
            });

            return false;
        }

        bankValue = $('#' + popname).find('.bank-input-box input').val().replace(/\s/gi, '');
        if(!bankValue){
            lgkorUI.alert("", {
                title: "환불계좌 번호를 입력해 주세요."
            });

            return false;
        }

        return true;
    }

    function bindEventsConsumables() {
        $('.contents.mypage').on('click', '.tracking-btn', function(e){
            e.preventDefault();

            var $this = $(this);
            var trackingNo = $this.data('trackingNumber').toString();
            var url = '';

            trackingNo = trackingNo.replace(/[_-]/gi, '');

            if (trackingNo.length == 13) {
                //우체국
                url = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?displayHeader=N&sid1="+trackingNo;
                window.open( url,'tracking','scrollbars=yes,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0,top=20,left=20,width=750,height=800');
            } else {
                //CJ
                url = "https://www.cjlogistics.com/ko/tool/parcel/newTracking?gnbInvcNo="+trackingNo;
                window.open( url,'tracking','scrollbars=yes,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0,top=20,left=20,width=1300,height=800');
            }
        });

        $('.contents.mypage').on('click', '.receipt-btn', function(e) {
            var url = $('.contents.mypage').data('receiptUrl');
            var orderNo = $(this).data('orderNo');
            var serviceType = $(this).data('serviceType');

            var sendata = {
                orderNo: orderNo
            }

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, sendata, function(result){
                lgkorUI.hideLoading();
                
                var data = result.data;

                var LGD_MID = data.LGD_MID;
                var LGD_OID = data.LGD_OID;
                var LGD_TID = data.LGD_TID;
                var LGD_HASHDATA = data.LGD_HASHDATA;
                var payMethodCd = data.payMethodCd;
                var LGD_CUSTOM_USABLEPAY = "";
                var resultMsg = data.resultMsg;

                if (resultMsg != "") {
                    lgkorUI.alert('', {
                        title: resultMsg
                    });
                } else {
                    if(payMethodCd == "01"){
                        LGD_CUSTOM_USABLEPAY= "BANK";
                        showCashReceipts(LGD_MID,LGD_OID,1,LGD_CUSTOM_USABLEPAY, serviceType);   // test -> service
                    } else if(payMethodCd == "03"){		// 무통장
                        LGD_CUSTOM_USABLEPAY= "CAS";
                        showCashReceipts(LGD_MID,LGD_OID,'',LGD_CUSTOM_USABLEPAY, serviceType);   // test -> service
                    }else{
                        showReceiptByTID(LGD_MID, LGD_TID, LGD_HASHDATA); // 운영 , test 동일 
                    } 
                }
            });
        });
    }

    //반품신청 확인...
    function takebackSubmit(){
        var selectReason = $('#popup-takeback').find('#slt01 option:selected').val().replace(/[_-]/gi, '');
        var writeReason = $('#popup-takeback').find('textarea').val().replace(/[_-]/gi, '');
        if(!selectReason.length && !writeReason.length){
            lgkorUI.alert("", {
                title: "반품을 신청하시려면, 상세 사유가 필요합니다. 반품 사유를 입력해 주세요."
            });

            return;
        }

        var transtype = $('#popup-takeback').data('transType');        
        if(transtype == "B"){
            if(!getBankBnumberValidation('popup-takeback')) return;
    
            var bankNumber = $('#popup-takeback').find('.bank-input-box input').val();
            var bankName = $('#popup-takeback').find('.bank-input-box select option:selected').val();
            if(!popBankConfirm || popBankInfo.bankName != bankName || popBankInfo.bankNumber != bankNumber){
                lgkorUI.alert("", {
                    title: "'환불계좌확인' 버튼을 클릭하여 계좌번호를 확인해주세요."
                });
    
                return;
            }
    
            if(!$("#popup-takeback").find('.chk-wrap.bottom input[type=checkbox]').prop("checked")){
                lgkorUI.alert("", {
                    title: "환불을 위한 개인정보 수집 처리에 동의해 주세요."
                });
    
                return;
            }
        }

        lgkorUI.confirm("반품 신청 후에는 반품 철회를 할 수 없습니다.<br>주문하신 제품을 반품 신청 하시겠습니까?", {
            title: "",
            cancelBtnName: "아니오",
            okBtnName: "네",
            ok: function(){
                takebackOk();
            }
        });
    }
    //취소신청 확인...
    function cancelSubmit(){
        var selectReason = $('#popup-cancel').find('#cancelReason option:selected').val().replace(/[_-]/gi, '');
        var writeReason = $('#popup-cancel').find('textarea').val().replace(/[_-]/gi, '');
        if(!selectReason.length && !writeReason.length){
            lgkorUI.alert("", {
                title: "취소신청하시려면, 상세 사유가 필요합니다. 취소 사유를 입력해 주세요."
            });

            return;
        }

        var transtype = $('#popup-cancel').data('transType');        
        if(transtype == "B"){
            if(!getBankBnumberValidation('popup-cancel')) return;
    
            var bankNumber = $('#popup-cancel').find('.bank-input-box input').val();
            var bankName = $('#popup-cancel').find('.bank-input-box select option:selected').val();
            if(!popBankConfirm || popBankInfo.bankName != bankName || popBankInfo.bankNumber != bankNumber){
                lgkorUI.alert("", {
                    title: "'환불계좌확인' 버튼을 클릭하여 계좌번호를 확인해주세요."
                });
    
                return;
            }
    
            if(!$("#popup-cancel").find('.chk-wrap.bottom input[type=checkbox]').prop("checked")){
                lgkorUI.alert("", {
                    title: "환불을 위한 개인정보 수집 처리에 동의해 주세요."
                });
    
                return;
            }
        }

        lgkorUI.confirm("주문 취소 신청시 제품을<br>다시 처음부터 구매하셔야 합니다.<br>주문하신 제품을 취소신청 하시겠어요?", {
            title: "",
            cancelBtnName: "아니오",
            okBtnName: "네",
            ok: function(){
                cancelOk();
            }
        });
    }

    //반품사유 select 변경 시...
    function changeTakebackReason(){
        var selectOptValue = $('#slt01').find('option:selected').val();
        if(selectOptValue == "etc"){
            $('#popup-takeback').find('textarea').removeAttr('disabled');
            setTimeout(function(){
                $('#popup-takeback').find('textarea').focus();
            }, 10);
        } else{
            $('#popup-takeback').find('textarea').attr('disabled', "disabled").val('');
        }
    }
    //취소사유 sleect 변경 시...
    function changeCancelReason(){
        var selectOptValue = $('#cancelReason').find('option:selected').val();
        if(selectOptValue == "etc"){
            $('#popup-cancel').find('textarea').removeAttr('disabled');
            setTimeout(function(){
                $('#popup-cancel').find('textarea').focus();
            }, 10);
        } else{
            $('#popup-cancel').find('textarea').attr('disabled', "disabled").val('');
        }
    }

    function resetCancelPriceInfo(){
        var productPrices = 0;
        var discountPrices = 0;
        var mempointPrices = 0;
        var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
        chkItems.each(function(idx, item){
            var idx = $(item).val();
            
            productPrices += PRICE_INFO_DATA[idx].productPrice;
            discountPrices += PRICE_INFO_DATA[idx].discountPrice;
            mempointPrices += PRICE_INFO_DATA[idx].mempointPrice;
        });
        var totalPrice = productPrices - discountPrices - mempointPrices;
        $('#popup-cancel').find('.productPrices').text(vcui.number.addComma(productPrices)+"원");
        $('#popup-cancel').find('.discountPrices').text(vcui.number.addComma(discountPrices)+"원");
        $('#popup-cancel').find('.mempointPrices').text(vcui.number.addComma(mempointPrices)+"원");
        $('#popup-cancel').find('.totalPrice').text(vcui.number.addComma(totalPrice)+"원");

        $('#popup-cancel').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', false);
    }

    function setDeliveryInquiry(dataID, prodID){
        console.log("[setDeliveryInquiry]", dataID, prodID);
    }

    function setDeliveryRequest(dataID, prodID){
        console.log("[setDeliveryRequest]", dataID, prodID);
    }

    function setProductReview(dataID, prodID){
        console.log("[setProductReview]", dataID, prodID);
    }

    function setUseReview(dataID, prodID){
        console.log("[setUseReview]", dataID, prodID);
    }

    function setContractStatus(dataID, prodID){
        console.log("[setContractStatus]", dataID, prodID);
    }

    function setReceiptListPop(){
        $('#popup-receipt-list').vcModal();
    }

    function setMonthlyPricePop(){
        $('#popup-monthly-price').vcModal();
    }

    function setNoData(){
        $('.inquiry-list-wrap').empty().append('<div class="no-data"><p>주문 내역이 없습니다.</p></div>');
        $('.inquiry-list-notify').hide();
        $('.btn-moreview').hide();
    }

    function setMoreOrderList(){
        START_INDEX += LIST_VIEW_TOTAL;
        setOrderListContents();
    }

    function setOrderListContents(){
        var list = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var leng = list.length;

        if(leng){
            $('.inquiry-list-notify').show();

            var start = START_INDEX;
            var end = start + LIST_VIEW_TOTAL;
            if(end > leng) end = leng;

            if(start == 0) $('.inquiry-list-wrap').empty();

            for(var idx=start;idx<end;idx++){
                if(list[idx].requestOrderAbleYn === undefined) list[idx].requestOrderAbleYn = "N";
                var templateList = $(vcui.template(inquiryListTemplate, list[idx])).get(0);
                $('.inquiry-list-wrap').append(templateList);

                for(var cdx in list[idx].productList){
                    var prodlist = list[idx].productList[cdx];
                    $(templateList).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist, isCheck:false}));
                }
            }

            if(end < leng) $('.btn-moreview').show();
            else $('.btn-moreview').hide();
        } else{
            setNoData();
        }
    }

    function setStepInfoStatus(){
        if(TAB_FLAG == TAB_FLAG_ORDER){
            $('.buy-step-info').show();
            $('.care-step-info').hide();
        } else{
            $('.buy-step-info').hide();
            $('.care-step-info').show();
        }
    }


    //### REQUEST ###

    //취소/반품 확인 리스트 리로드...
    function reloadOrderInquiry(){
        requestOrderInquiry();
    }

    //페이지 목록 로드...
    function requestOrderInquiry(page){
        lgkorUI.showLoading();
    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = $('.contents.mypage').data('orderNumber');
        var requestNo = $('.contents.mypage').data('requestNo');

        var sendata = {
            startDate: START_DATE,
            endDate: END_DATE,
            page: page || 1,
            orderNumber: orderNumber,
            requestNo: requestNo,
            tabFlag: TAB_FLAG,

            sendInquiryType: memInfos.sendInquiryType,
            sendOrderNumber: memInfos.sendOrderNumber,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber,
            purPathCode: vcui.detect.isMobile ? 3 : 2
        }
        lgkorUI.requestAjaxData(ORDER_INQUIRY_LIST_URL, sendata, function(result){

            var data = result.data;

            if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) data.listData = [data.listData];

            START_INDEX = 0;
            ORDER_LIST = [];
            CARE_LIST = [];
            SHIPPING_DATA = {};
            PAYMENT_DATA = {};
            ORDER_USER_DATA = {};
            MONTHLY_PAYMENT_DATA = {};


            if(data.listData && data.listData.length){
                var leng, cdx, idx;
                var list = data.listData;
                for(idx in list){
                    leng = ORDER_LIST.length;
                    list[idx]['dataID'] = leng.toString();

                    list[idx].dateTitle = "주문일";
                    list[idx].orderNumberTitle = "주문번호";
                    list[idx].groupNumber = list[idx].orderNumber;


                    for(cdx in list[idx].productList){
                        list[idx].productList[cdx]["prodID"] = cdx;
                        list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);
                    }

                    ORDER_LIST.push(list[idx]);
                }
            }

            if(data.careListData && data.careListData.length){
                list = data.careListData;
                for(idx in list){
                    leng = CARE_LIST.length;
                    list[idx]['dataID'] = leng.toString();

                    list[idx].dateTitle = "신청일";
                    list[idx].orderNumberTitle = "계약 요청 번호";
                    list[idx].groupNumber = list[idx].requestNo ? list[idx].requestNo : list[idx].orderNumber;

                    for(cdx in list[idx].productList){
                        list[idx].productList[cdx]["prodID"] = cdx;
                        list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);
                    }

                    CARE_LIST.push(list[idx]);
                }
            }

            //배송정보
            if(data.shipping) {
                var shipping = data.shipping;
                shipping.maskingName = txtMasking.name(shipping.name);
                shipping.maskingAddress = txtMasking.substr(shipping.city + " " + shipping.street,14);
                shipping.maskingTelephone = txtMasking.phone(shipping.telephone);
                shipping.maskingTelephonenumber = txtMasking.phone(shipping.telephonenumber);
                shipping.instpectionVisit = lgkorUI.stringToBool(shipping.instpectionVisit);
                shipping.recyclingPickup = lgkorUI.stringToBool(shipping.recyclingPickup);

                SHIPPING_DATA = vcui.clone(shipping);
            }
            
            //결제정보
            if(data.payment) {
                var payment = data.payment;
                payment.orderPrice = vcui.number.addComma(payment.orderPrice);
                payment.discountPrice = vcui.number.addComma(payment.discountPrice);
                payment.memberShipPoint = vcui.number.addComma(payment.memberShipPoint);
                payment.totalPrice = vcui.number.addComma(payment.totalPrice);

                if(payment.discountPrice != "0") payment.discountPrice = "-" + payment.discountPrice;
                if(payment.memberShipPoint != "0") payment.memberShipPoint = "-" + payment.memberShipPoint;
                
                PAYMENT_DATA = vcui.clone(payment);
            }

            //주문자 정보
            if(data.orderUser) {
                var orderusers = data.orderUser;
                orderusers.nameTitle = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? "성명" : "주문하는 분";
                orderusers.userName = txtMasking.name(orderusers.userName);
                orderusers.phoneNumber = txtMasking.phone(orderusers.phoneNumber);
                orderusers.email = txtMasking.email(orderusers.email);

                ORDER_USER_DATA = vcui.clone(orderusers);
            }

            //월 납부 정보...
            if(data.monthlyPayment){
                var monthpayment = data.monthlyPayment;
                monthpayment.requsetCardInfo = monthpayment.requestCard + " - " + monthpayment.requestCardName;
                monthpayment.monthlyPriceInfo = monthpayment.paymentPriceInfo.join(" / ");

                cardInfo = {
                    paymentCard: monthpayment.cardInfo.cardComValue,
                    paymentCardNumber: monthpayment.cardInfo.cardNumber,
                    paymentCardPeriod: monthpayment.cardInfo.cardPeriod
                }
                cardValidation.setValues(cardInfo);
        
                bankInfo = {
                    paymentBank: monthpayment.bankInfo.bankValue,
                    paymentBankNumber: monthpayment.bankInfo.bankNumber,
                    paymentUserName: monthpayment.bankInfo.bankUser
                }
                bankValidation.setValues(bankInfo);

                MONTHLY_PAYMENT_DATA = vcui.clone(monthpayment);

                paymentMethod = MONTHLY_PAYMENT_DATA.paymentMethod;

                savePaymentInfoCancel();
            }

            renderPage();

            lgkorUI.hideLoading();
        });
    }


    //정보변경 확인...
    function sendChangeConfirm(){
        var sendata = {confirmType: "PAYMENT"};

        lgkorUI.confirm("납부정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까?", {
            title: "납부정보 변경",
            cancelBtnName: "취소",
            okBtnName: "본인인증",
            ok: function(){
                // lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(INFO_MODIFY_CONFIRM, sendata, function(result){
                //     if(lgkorUI.stringToBool(result.data.success)){

                //         window.open('', 'popupChk', 'width=500, height=640, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
                //         document.form_chk.action = result.data.niceAntionUrl;
                //         document.form_chk.m.value = result.data.m;
                //         document.form_chk.EncodeData.value = result.data.sEncData;
                //         document.form_chk.auth_type.value = result.data.auth_type;
                //         document.form_chk.param_r1.value = result.data.param_r1;
                //         document.form_chk.param_r2.value = result.data.param_r2;
                //         document.form_chk.param_r3.value = result.data.param_r3;
                //         document.form_chk.target = "popupChk";
                //         document.form_chk.submit();
                //     } else{
                //         console.log("Fail !!!");
                //     }
                // });

                editPaymentInfomation();
            }
        });
    }
    //나이스 콜백 -납부정보변경
    function editPaymentInfomation(){
        $('.monthly-payment').hide();
        $('.monthly-payment-modify').show();
        $('.monthly-payment-modify').find('input[name=selfClearingAgree]').prop('checked', false);

        paymentMethodConfirm = "N";
        arsAgree = "N";
    }
    //나이스 콜백 -인증실패
    function fnNiceFail(){
    }
    window.editPaymentInfomation = editPaymentInfomation;
    window.fnNiceFail = fnNiceFail;

    //납부 정보 유효성 체크
    function paymentInfoValidation(){
        var paymentMethodIndex = $('.monthly-payment-modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        console.log("paymentMethodConfirm:", paymentMethodConfirm)
        if(paymentMethodConfirm  == "N"){
            return{
                result: false,
                title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
            }
        }
        
        var chk = 0;
        var values = paymentMethodIndex ? bankValidation.getAllValues() : cardValidation.getAllValues();
        for(var key in values){
            if(values[key] == paymentInfo[key]) chk++;
        }
        
        if(chk != Object.keys(values).length){
            paymentMethodConfirm = "N";
            return{
                result: false,
                title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
            }
        }

        if(arsAgree == "N"){
            return{
                result: false,
                title: "자동결제를 위해 ARS 출금동의 신청해주세요."
            }
        }

        if(!$('.monthly-payment-modify').find('input[name=selfClearingAgree]').prop('checked')){
            return{
                result: false,
                title: "자동결제를 위해 정기결제 신청을 동의해주세요."
            }
        }

        return{
            result: true
        }
    }
    //납부카드/계좌 확인...
    function paymentMethodAbled(item){
        var sendata;
        var mode = $(item).hasClass('paymentCardConfirm') ? METHOD_CARD : METHOD_BANK;
        var result = mode == METHOD_CARD ? cardValidation.validate() : bankValidation.validate();
        if(!result.success) return false;

        paymentInfo = {};

        CERTI_ID = BATCH_KEY = "";

        if($(item).hasClass('paymentCardConfirm')){
            sendata = cardValidation.getValues();
            sendata.confirmType = METHOD_CARD;
        } else{
            sendata = bankValidation.getValues();
            sendata.confirmType = METHOD_BANK;
        }
        
        console.log("paymentMethodAbled(); sendata :", sendata);
        lgkorUI.requestAjaxData(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            console.log("### requestAjaxData ###", result)
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.CERTI_ID) CERTI_ID = result.data.CERTI_ID;
            if(result.data.BATCH_KEY) BATCH_KEY = result.data.BATCH_KEY;

            if(lgkorUI.stringToBool(result.data.success)){
                paymentInfo = sendata.confirmType == METHOD_CARD ? cardValidation.getAllValues() : bankValidation.getAllValues();
                paymentInfo.confirmType = sendata.confirmType;
            }

            sendPaymentMethod = sendata.confirmType;

            paymentMethodConfirm = result.data.success;
        });
    }
    //ARS출금동의 신청...
    function setArsAgreeConfirm(){
        CTI_REQUEST_KEY = "";

        var sendata = sendPaymentMethod == METHOD_CARD ? cardValidation.getValues() : bankValidation.getValues();

        console.log("### setArsAgreeConfirm ###", sendata);
        lgkorUI.requestAjaxData(ARS_AGREE_URL, sendata, function(result){
            console.log("### setArsAgreeConfirm [complete] ###", result)
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;

            arsAgree = result.data.success;
        });
    }
    //납부 정보변경 취소...
    function savePaymentInfoCancel(){
        cardValidation.setValues(cardInfo);
        $('.ui_card_number').vcFormatter('update');

        bankValidation.setValues(bankInfo);
        
        paymentMethodConfirm = "N";
        arsAgree = "N";
        
        $('.monthly-payment-modify').find('input[name=selfClearingAgree]').prop('checked', false);
        $('.monthly-payment-modify').find('input[name=pointUseAgree]').prop('checked', false);

        setPaymentModeCont();

        $('.monthly-payment').show();
        $('.monthly-payment-modify').hide();
    }
    function setPaymentModeCont(){
        $('.monthly-payment-modify input[data-visible-target]').prop("checked", false);
        $('.monthly-payment-modify input[data-visible-target=".by-' + paymentMethod + '"]').prop("checked", true);

        $('.monthly-payment-modify').find('.tab-panel').hide();
        $('.monthly-payment-modify').find('.tab-panel.by-' + paymentMethod).show();
    }
    //납부 정보변경 저장...
    function savePaymentInfoOk(){
        var payments = paymentInfoValidation();
        if(payments.result){
            lgkorUI.showLoading();

            var sendata = {
                CERTI_ID: CERTI_ID,
                BATCH_KEY: BATCH_KEY,
                CTI_REQUEST_KEY: CTI_REQUEST_KEY
            }
            for(var key in paymentInfo) sendata[key] = paymentInfo[key];

            console.log("savePaymentInfo : [sendata] ", sendata);
            lgkorUI.requestAjaxData(PAYMENT_SAVE_URL, sendata, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    requestOrderInquiry();
                }

                lgkorUI.hideLoading();
            });
        } else{
            lgkorUI.alert("", {
                title: payments.title
            });
        }
    }

    function renderPage(){

        setOrderListContents();

        setStepInfoStatus();

        var template;

        //배송정보
        var $listBox = $('.inner-box.shipping');
        if($listBox.length > 0) {
            if(SHIPPING_DATA.length){
                template = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? careShippingListTemplate : shippingListTemplate;
                $listBox.show().find('ul').html(vcui.template(template, SHIPPING_DATA));
            } else{
                $listBox.hide();
            }
        }

        //결제정보
        $listBox = $('.inner-box.payment');
        if($listBox.length > 0) {
            if(PAYMENT_DATA.length){
                if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) template = noneMemPaymentTemplate;
                else if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) template = carePaymentListTemplate;
                else template = paymentListTemplate;
                $listBox.show().find('ul').html(vcui.template(template, PAYMENT_DATA));
            } else{
                $listBox.hide();
            }
        }

        //주문자 정보
        $listBox = $('.inner-box.orderuser');
        if($listBox.length > 0) {
            if(ORDER_USER_DATA.length){
                $listBox.show().find('ul').html(vcui.template(orderUserTemplate, ORDER_USER_DATA));
            } else{
                $listBox.hide();
            }
        }

        //납부정보
        $listBox = $('.inner-box.monthly-payment');
        if($listBox.length > 0) {
            if(MONTHLY_PAYMENT_DATA.length){
                $listBox.show().find('ul').html(vcui.template(monthlyPaymentTemplate, MONTHLY_PAYMENT_DATA));
            } else{
                $listBox.hide();
            }            
        }

        var leng = ORDER_LIST.length;
        var cnt = leng ? "(" + leng + ")" : "";
        $('.lnb-contents .tabs-wrap .tabs > li:nth-child(1) .count').text(cnt);

        leng = CARE_LIST.length;
        cnt = leng ? "(" + leng + ")" : "";
        $('.lnb-contents .tabs-wrap .tabs > li:nth-child(2) .count').text(cnt);
    }

    //주문접수...
    function setOrderRequest(dataId){
        lgkorUI.showLoading();

        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST[dataId] : CARE_LIST[dataId];
        var productList = vcui.array.map(listData.productList, function(item, idx){
            return{
                orderedQuantity: item.orderedQuantity,
                reqLineSeq: item.reqLineSeq,
                productNameEN: item.productNameEN
            }
        });

        console.log("productList:", productList)

        var sendata = {
            contDtlType: listData.contDtlType,
            requestNo: listData.requestNo,
            email: listData.email,

            productList: JSON.stringify(productList)
        }
        console.log("### setOrderRequest ###", sendata);
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_REQUEST_URL, sendata, function(result){
            console.log("### setOrderRequest complete", result);
            
            lgkorUI.hideLoading();

            if(result.data.obsDirectPurchaseUrl){
                location.href = result.data.obsDirectPurchaseUrl;

                return;
            }

            if(result.data.success == "Y"){
                console.log("SUCCESS~");
            } else{
                console.log("FAIL~");
            }            
        });   
    }

    //환불계좌 확인...
    function sendBankConfirm(popname){
        if(!getBankBnumberValidation(popname)) return;

        var sendata = {
            confirmType: "bank",
            bankNumber: $('#'+popname).find('.bank-input-box input').val(),
            bankName: $('#'+popname).find('.bank-input-box select option:selected').val()
        }
        console.log("### sendBankConfirm ###", sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(BANK_CONFIRM_URL, sendata, function(result){
            console.log("### sendBankConfirm complete", result);

            lgkorUI.alert("",{
                title: result.data.alert.title
            });

            if(result.data.success == "Y"){
                popBankConfirm = true;
                popBankInfo = {
                    bankNumber: sendata.bankNumber,
                    bankName: sendata.bankName
                }
            } else{
                popBankConfirm = false;
            }
        });    
    }
    //취소/반품 신청을 위한 데이터 요정...
    function getPopOrderData(dataId, calltype){
        lgkorUI.showLoading();

        console.log("### getPopOrderData [TAB_FLAG]###", TAB_FLAG)
    
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = listData[dataId].orderNumber;
        var requestNo = listData[dataId].requestNo;
        var apiType = listData[dataId].apiType;

        var sendata = {
            callType: calltype,
            orderNumber: orderNumber,
            requestNo: requestNo,
            apiType: apiType,
            tabFlag: TAB_FLAG,
            
            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }
        console.log("### getPopOrderData ###", sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_CANCEL_POP_URL, sendata, function(result){
            console.log("### getPopOrderData complete", result)
            lgkorUI.hideLoading();

            PRICE_INFO_DATA = [];
            POP_PROD_DATA = [];
            var popup;
            var infoTypeName;
            var productPrices = 0;
            var discountPrices = 0;
            var mempointPrices = 0;
            var productList = TAB_FLAG == TAB_FLAG_ORDER ? result.data.listData[0].productList : result.data.careListData[0].productList;
            if(calltype == "ordercancel"){
                popup = $('#popup-cancel');
                infoTypeName = "취소";

                addPopProdductList(popup, productList, true);
                
                $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('update');
                $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');

                $('#popup-cancel').find('#cancelReason option').prop('selected', false);
                $('#popup-cancel').find('#cancelReason option').eq(0).prop('selected', true);
                $('#popup-cancel').find('#cancelReason').vcSelectbox('update');
                $('#popup-cancel').find('textarea').attr('disabled', "disabled").val('');

                $('#popup-cancel').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', true);
            } else{
                popup = $('#popup-takeback');
                infoTypeName = "반품";

                isCheck = false;

                var prodId = popup.data('prodId');

                var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
                productList = vcui.array.filter(productList, function(item, idx){
                    return item.modelID == listData[dataId].productList[prodId].modelID;
                });
                console.log("### takeback productList ###", productList);

                addPopProdductList(popup, productList, false);
    
                productPrices = productList[0].productPrice ? parseInt(productList[0].productPrice) : 0;
                discountPrices = productList[0].discountPrice ? parseInt(productList[0].discountPrice) : 0;
                mempointPrices = productList[0].memberShipPoint ? parseInt(productList[0].memberShipPoint) : 0;

                $('#popup-takeback').find('.info-tbl-wrap .info-wrap .infos').empty().append("<li>주문일<em>" + listData[dataId].orderDate + "</em></li>");
               
                $('#popup-takeback').find('#slt01 option').prop('selected', false);
                $('#popup-takeback').find('#slt01 option').eq(0).prop('selected', true);
                $('#popup-takeback').find('#slt01').vcSelectbox('update');
                $('#popup-takeback').find('textarea').attr('disabled', "disabled").val('');

                $('#popup-takeback').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', false);
            }

            //취소/반품 정보...
            popup.find('.sect-wrap.cnt01').empty().eq(1).remove();
            var totalPrice = productPrices - discountPrices - mempointPrices;
            var discountComma = vcui.number.addComma(mempointPrices);
            var template = PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL ? nonememPriceInfoTemplate : priceInfoTemplate;
            popup.find('.sect-wrap.cnt01').append(vcui.template(template, {
                typeName: infoTypeName,
                productPrices: vcui.number.addComma(productPrices),
                discountPrices: vcui.number.addComma(discountPrices),
                mempointPrices: discountComma == "0" ? "0" : "-"+discountComma,
                totalPrice: vcui.number.addComma(totalPrice)
            }));


            popup.data('transType', result.data.payment.transType);
            var bankInfoBlock = popup.find('.sect-wrap > .form-wrap > .forms:nth-child(2)');
            if(result.data.payment.transType == "B"){
                var backSelect = popup.find('.bank-input-box select').empty().append('<option value="" class="placeholder">선택</option>');
                var bankList = result.data.bankList;
                for(idx in bankList){
                    var bank = bankList[idx];
                    var opt = '<option value="' + bank.commonCodeId + '" data-sort-id="' + bank.sortNo + '">' + bank.commonCodeName + '</option>';
                    backSelect.append(opt);
                }
                backSelect.vcSelectbox('update');
    
                popup.find('.bank-input-box input').val('');
    
                popup.find('.chk-wrap.bottom input[type=checkbox]').prop("checked", false);

                bankInfoBlock.show();
            } else{
                bankInfoBlock.hide();
            }

            popBankInfo = {};
            popBankConfirm = false;

            popup.vcModal();
        });     
    }
    //취소/반품 팝업 리스트 추가
    function addPopProdductList(popup, productList, isCheck){
        var prodListWrap = popup.find('.info-tbl-wrap .tbl-layout .tbody').empty();                
        for(var idx in productList){
            var listdata = productList[idx];
            listdata["prodID"] = idx;
            listdata["addCommaProdPrice"] = vcui.number.addComma(listdata["productPrice"]);

            var productPrice = listdata.productPrice ? parseInt(listdata.productPrice) : 0;
            var discountPrice = listdata.discountPrice ? parseInt(listdata.discountPrice) : 0;
            var mempointPrice = listdata.memberShipPoint ? parseInt(listdata.memberShipPoint) : 0;

            if(listdata.itemCancelAbleYn == "N") listdata.orderStatus.disabled = "disabled";
        
            PRICE_INFO_DATA.push({
                productPrice: productPrice,
                discountPrice: discountPrice,
                mempointPrice: mempointPrice
            });

            POP_PROD_DATA.push({
                productNameKR: listdata.productNameKR,
                productNameEN: listdata.productNameEN,
                orderedQuantity: listdata.orderedQuantity
            })

            prodListWrap.append(vcui.template(prodListTemplate, {listData:listdata, isCheck:isCheck}));
        }
    }
    //반품 정보 요청...후 팝업 열기.
    function openTakebackPop(dataId, prodId){
        $('#popup-takeback').data('dataId', dataId);
        $('#popup-takeback').data('prodId', prodId);

        getPopOrderData(dataId, "orderreturn");
    }
    //취소 정보 요청...후 팝업열기.
    function openCancelPop(dataId){
        $('#popup-cancel').data('dataId', dataId);

        getPopOrderData(dataId, "ordercancel"); 
    }

    //취소/반품 공통 데이터 생성
    function setCancelTakebackData(popname, prodlist){
        var popup = $('#'+popname);

        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var dataId = popup.data('dataId');    
        
        var orderNumber = listData[dataId].orderNumber;
        var requestNo = listData[dataId].requestNo;
        var apiType = listData[dataId].apiType;

        var memInfos = lgkorUI.getHiddenInputData();

        var bankName = "";
        var bankAccountNo = "";
        if(popup.data("transType") == "B"){
            bankName = popup.find('.bank-input-box select option:selected').val();
            bankAccountNo = popup.find('.bank-input-box input').val();
        }

        var reasonId = popname == "popup-cancel" ? "cancelReason" : "slt01";
        var selectReason = popup.find('#'+reasonId + ' option:selected').val();
        var writeReason = popup.find('textarea').val();
        var reson = writeReason ? writeReason : selectReason;

        var sendata = {
            callType: popname == "popup-cancel" ? "ordercancel" : "orderreturn",

            orderNumber: orderNumber,
            requestNo: requestNo,
            apiType: apiType,
            tabFlag: TAB_FLAG,

            bankName: bankName,
            bankAccountNo: bankAccountNo,

            reson: reson,

            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber,
            
            productList: JSON.stringify(prodlist)
        }

        lgkorUI.showLoading();

        console.log("### " + sendata.callType + " ###", sendata);
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_SAILS_URL, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            } else{
                popup.vcModal('close');

                reloadOrderInquiry();
            }
        });
    }

    //반품신청...
    function takebackOk(){
        var productList = [POP_PROD_DATA[0]];
        
        setCancelTakebackData('popup-takeback', productList);
    }
    //취소신청...
    function cancelOk(){
        var productList = [];
        var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
        chkItems.each(function(idx, item){
            var idx = $(item).val();
            productList.push(POP_PROD_DATA[idx]);
        });
        
        setCancelTakebackData('popup-cancel', productList);
    }

    //상품 클릭...
    function setProductStatus(dataId, prodId, pdpUrl){
        lgkorUI.showLoading();
        
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var sendata = {
            "sku": listData[dataId].productList[prodId].productNameEN
        }

        console.log("### setProductStatus ###", sendata);
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(PRODUCT_STATUS_URL, sendata, function(result){
            if(result.data.success == "N"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            } else{
                //location.href = pdpUrl;
            }

            lgkorUI.hideLoading();
        });

        //리스트에서는 상품 이미지에서만 체크..go pdp
        //상세보기 둘다 체크후..go pdp
        //리스트에서는 네임은 상세로...
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();