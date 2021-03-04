(function() {
    var ORDER_INQUIRY_LIST_URL;
    var ORDER_DETAIL_URL;
    var PRODUCT_STATUS_URL;
    var ORDER_CANCEL_POP_URL;
    var ORDER_SAILS_URL;
    var BANK_CONFIRM_URL;

    var PAGE_TYPE_LIST = "orderListPage";
    var PAGE_TYPE_DETAIL = "orderDetailPage";
    var PAGE_TYPE_NONMEM = "orderNoneMemberPage";

    var TAB_FLAG_ORDER = "ORDER";
    var TAB_FLAG_CARE = "CARE";

    var inquiryListTemplate =
        '<div class="box" data-id="{{dataID}}">'+
            '<div class="info-wrap">'+
                '<ul class="infos">'+
                    '<li>주문일<em>{{orderDate}}</em></li>'+
                    '<li>주문번호<em>{{orderNumber}}</em></li>'+
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
    
    var shippingListTemplate = '<li><dl><dt>성명</dt><dd>{{maskingName}}</dd></dl></li>' +
        '<li><dl><dt>배송주소</dt><dd>{{postcode}} {{maskingAddress}}</dd></dl></li>' +
        '<li><dl><dt>휴대폰</dt><dd>{{maskingTelephone}}</dd></dl></li>' +
        '<li><dl><dt>연락처</dt><dd>{{maskingTelephonenumber}}</dd></dl></li>' +
        '<li><dl><dt>배송시 요청사항</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
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

    var noneMemPaymentTemplate = 
    '<li><dl><dt>결제 수단</dt><dd><span>{{paymentMethodName}}</span>'+
    '{{#if receiptUrl}}<a href="{{receiptUrl}}" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
    '</dd></dl></li>'+        
    '<li><dl><dt>주문 금액</dt><dd>{{orderPrice}}원</dd></dl></li>'+            
    '<li><dl><dt>총 결제 금액</dt><dd><em>{{totalPrice}}원</em></dd></dl></li>';

    var orderUserTemplate = 
        '<li>'+
            '<dl>'+
                '<dt>주문하는 분</dt>'+
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

    var CURRENT_PAGE, TOTAL_PAGE;

    var ORDER_LIST;
    var CARE_LIST;

    var LIST_VIEW_TOTAL = 10;

    var PAGE_TYPE;

    var TAB_FLAG;

    var txtMasking;

    var PRICE_INFO_DATA;
    var POP_PROD_DATA;
    var cancelAllChecker;

    var popBankInfo = {};
    var popBankConfirm = false;

    var START_DATE, END_DATE;

    var tabMenu;

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
        ORDER_SAILS_URL = $('.contents.mypage').data('orderSails');
        BANK_CONFIRM_URL = $('.contents.mypage').data('accountCheck');

        txtMasking = new vcui.helper.TextMasking();

        tabMenu = $('.lnb-contents .tabs-wrap .tabs');

        //클래스로 접속 페이지 타입 정의...
        var isOrderlist = $('.contents.mypage').hasClass('orderAndDelivery'); 
        var isOrderdetail = $('.contents.mypage').hasClass('orderAndDelivery-detail'); 
        var isNonemem = $('.contents.mypage').hasClass('non-members'); 
        if(isOrderlist) PAGE_TYPE = PAGE_TYPE_LIST;
        if(isOrderdetail) PAGE_TYPE = PAGE_TYPE_DETAIL;
        if(isNonemem) PAGE_TYPE = PAGE_TYPE_NONMEM;

        $('.inquiryPeriodFilter').vcDatePeriodFilter({dateBetweenCheckEnable:false});
        var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
        START_DATE = dateData.startDate;
        END_DATE = dateData.endDate;

        TAB_FLAG = TAB_FLAG_ORDER;
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
                location.href = ORDER_DETAIL_URL + "?orderNumber=" + ORDER_LIST[dataID].orderNumber + "&tabFlag=" + TAB_FLAG;
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
    }

    function changeTabFlag(tab){
        tabMenu.children().removeClass('on');
        tab.addClass('on');
        
        TAB_FLAG = tab.index() ? TAB_FLAG_CARE : TAB_FLAG_ORDER;
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
        //requestOrderInquiry(CURRENT_PAGE+1);
    }

    function setOrderListContents(){
        var list = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var leng = list.length;
        var start = CURRENT_PAGE;
        var end = start + LIST_VIEW_TOTAL;
        if(end > leng) end = leng;
    }

    function setTotalCount(){
        var total = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST.length : CARE_LIST.length;
        var div = parseInt(total/LIST_VIEW_TOTAL);
        var rest = total % LIST_VIEW_TOTAL;

        TOTAL_PAGE = div;
        if(rest) TOTAL_PAGE++;
    }


    //### REQUEST ###

    //페이지 목록 로드...
    function requestOrderInquiry(page){
        lgkorUI.showLoading();
    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = $('.contents.mypage').data('orderNumber');

        var sendata = {
            startDate: START_DATE,
            endDate: END_DATE,
            page: page || 1,
            orderNumber: orderNumber,

            sendInquiryType: memInfos.sendInquiryType,
            sendOrderNumber: memInfos.sendOrderNumber,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber,
            purPathCode: vcui.detect.isMobile ? 3 : 2
        }
        lgkorUI.requestAjaxData(ORDER_INQUIRY_LIST_URL, sendata, function(result){

            var data = result.data;

            if(PAGE_TYPE == PAGE_TYPE_NONMEM) data.listData = [data.listData];

            CURRENT_PAGE = 1;
            ORDER_LIST = [];
            CARE_LIST = [];

            if(data.listData && data.listData.length){

                $('.inquiry-list-notify').show();
                $('.inquiry-list-wrap').empty();

                var leng, cdx, idx, templateList;
                var list = data.listData;
                for(idx in list){
                    leng = ORDER_LIST.length;
                    list[idx]['dataID'] = leng.toString();

                    if(idx < LIST_VIEW_TOTAL){
                        templateList = $(vcui.template(inquiryListTemplate, list[idx])).get(0);
                        $('.inquiry-list-wrap').append(templateList);
                    }

                    for(cdx in list[idx].productList){
                        list[idx].productList[cdx]["prodID"] = cdx;
                        list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);

                        if(idx < LIST_VIEW_TOTAL){
                            var prodlist = list[idx].productList[cdx];
                            $(templateList).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist, isCheck:false}));
                        }
                    }

                    ORDER_LIST.push(list[idx]);
                }

                //배송정보
                var $listBox = $('.inner-box.shipping ul');
                if(data.shipping && $listBox.length > 0) {
                    var shipping = data.shipping;
                    shipping.maskingName = txtMasking.name(shipping.name);
                    shipping.maskingAddress = txtMasking.substr(shipping.city + " " + shipping.street,14);
                    shipping.maskingTelephone = txtMasking.phone(shipping.telephone);
                    shipping.maskingTelephonenumber = txtMasking.phone(shipping.telephonenumber);
                    shipping.instpectionVisit = lgkorUI.stringToBool(shipping.instpectionVisit);
                    shipping.recyclingPickup = lgkorUI.stringToBool(shipping.recyclingPickup);

                    $listBox.html(vcui.template(shippingListTemplate, shipping));
                }
                
                //결제정보
                $listBox = $('.inner-box.payment ul');
                if(data.payment && $listBox.length > 0) {
                    var payment = data.payment;
                    payment.orderPrice = vcui.number.addComma(payment.orderPrice);
                    payment.discountPrice = vcui.number.addComma(payment.discountPrice);
                    payment.memberShipPoint = vcui.number.addComma(payment.memberShipPoint);
                    payment.totalPrice = vcui.number.addComma(payment.totalPrice);

                    if(payment.discountPrice != "0") payment.discountPrice = "-" + payment.discountPrice;
                    if(payment.memberShipPoint != "0") payment.memberShipPoint = "-" + payment.memberShipPoint;

                    var template = PAGE_TYPE == PAGE_TYPE_NONMEM ? noneMemPaymentTemplate : paymentListTemplate;
                    $listBox.html(vcui.template(template, payment));
                }

                //주문자 정보
                $listBox = $('.inner-box.orderuser ul');
                if(data.orderUser && $listBox.length > 0) {
                    var orderusers = data.orderUser;
                    orderusers.userName = txtMasking.name(orderusers.userName);
                    orderusers.phoneNumber = txtMasking.phone(orderusers.phoneNumber);
                    orderusers.email = txtMasking.email(orderusers.email);

                    $listBox.html(vcui.template(orderUserTemplate, orderusers));
                }

            } else{
                setNoData();
            }

            CARE_LIST = [];
            if(data.careListData && data.careListData.length){
                list = data.careListData;
                for(idx in list){
                    leng = CARE_LIST.length;
                    list[idx]['dataID'] = leng.toString();

                    for(cdx in list[idx].productList){
                        list[idx].productList[cdx]["prodID"] = cdx;
                        list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);
                    }

                    CARE_LIST.push(list[idx]);
                }
            }

            var leng = ORDER_LIST.length;
            var cnt = leng ? "(" + leng + ")" : "";
            $('.lnb-contents .tabs-wrap .tabs > li:nth-child(1) .count').text(cnt);

            leng = CARE_LIST.length;
            cnt = leng ? "(" + leng + ")" : "";
            $('.lnb-contents .tabs-wrap .tabs > li:nth-child(2) .count').text(cnt);

            setTotalCount();
            if(CURRENT_PAGE < TOTAL_PAGE) $('.btn-moreview').show();
            else $('.btn-moreview').hide();

            lgkorUI.hideLoading();
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
    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = ORDER_LIST[dataId].orderNumber;

        var sendata = {
            callType: calltype,
            orderNumber: orderNumber,
            
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
            var productList = result.data.listData[0].productList;
            if(calltype == "ordercancel"){
                popup = $('#popup-cancel');
                infoTypeName = "취소";

                var prodListWrap = $('#popup-cancel').find('.info-tbl-wrap .tbl-layout .tbody').empty();                
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
                        quantityOrdered: listdata.quantityOrdered
                    })
    
                    prodListWrap.append(vcui.template(prodListTemplate, {listData:listdata, isCheck:true}));
                }
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

                var prodId = popup.data('prodId');

                var takebackProd = vcui.array.filter(productList, function(item, idx){
                    return item.modelID == ORDER_LIST[dataId].productList[prodId].modelID;
                });
    
                POP_PROD_DATA.push({
                    productNameKR: takebackProd.productNameKR,
                    productNameEN: takebackProd.productNameEN,
                    quantityOrdered: takebackProd.quantityOrdered
                })

                console.log("### takebackProd ###", takebackProd);
    
                productPrices = takebackProd[0].productPrice ? parseInt(takebackProd[0].productPrice) : 0;
                discountPrices = takebackProd[0].discountPrice ? parseInt(takebackProd[0].discountPrice) : 0;
                mempointPrices = takebackProd[0].memberShipPoint ? parseInt(takebackProd[0].memberShipPoint) : 0;
                
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
            popup.find('.sect-wrap.cnt01').append(vcui.template(priceInfoTemplate, {
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

    //반품신청...
    function takebackOk(){
        lgkorUI.showLoading();

        var dataId = $('#popup-takeback').data('dataId');    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = ORDER_LIST[dataId].orderNumber;

        var selectReason = $('#popup-takeback').find('#slt01 option:selected').val();
        var writeReason = $('#popup-takeback').find('textarea').val();
        var reson = writeReason ? writeReason : selectReason;

        var bankName = "";
        var bankAccountNo = "";
        if($('#popup-takeback').data("transType") == "B"){
            bankName = $('#popup-takeback').find('.bank-input-box select option:selected').val();
            bankAccountNo = $('#popup-takeback').find('.bank-input-box input').val();
        }

        var productList = [POP_PROD_DATA[0]];

        var sendata = {
            callType: "orderreturn",
            orderNumber: orderNumber,

            bankName: bankName,
            bankAccountNo: bankAccountNo,

            reson: reson,

            productList: JSON.stringify(productList),

            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }
        console.log("### takebackOk ###", sendata);
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_SAILS_URL, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            } else{
                $('#popup-takeback').vcModal('close');

                requestOrderInquiry();
            }
        });
    }

    //취소신청...
    function cancelOk(){
        lgkorUI.showLoading();

        var dataId = $('#popup-cancel').data('dataId');    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = ORDER_LIST[dataId].orderNumber;

        var selectReason = $('#popup-cancel').find('#cancelReason option:selected').val();
        var writeReason = $('#popup-cancel').find('textarea').val();
        var reson = writeReason ? writeReason : selectReason;

        var bankName = "";
        var bankAccountNo = "";
        if($('#popup-cancel').data("transType") == "B"){
            bankName = $('#popup-cancel').find('.bank-input-box select option:selected').val();
            bankAccountNo = $('#popup-cancel').find('.bank-input-box input').val();
        }

        var productList = [];
        var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
        chkItems.each(function(idx, item){
            var idx = $(item).val();
            productList.push(POP_PROD_DATA[idx]);
        });

        var sendata = {
            callType: "ordercancel",
            orderNumber: orderNumber,

            bankName: bankName,
            bankAccountNo: bankAccountNo,

            reson: reson,

            productList: JSON.stringify(productList),

            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }
        console.log("### cancelOk ###", sendata);
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_SAILS_URL, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            } else{
                $('#popup-cancel').vcModal('close');

                requestOrderInquiry();
            }
        });
    }

    //상품 클릭...
    function setProductStatus(dataId, prodId, pdpUrl){
        lgkorUI.showLoading();
        var sendata = {
            "sku": ORDER_LIST[dataId].productList[prodId].productNameEN
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(PRODUCT_STATUS_URL, sendata, function(result){
            if(result.data.success == "N"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            } else{
                location.href = pdpUrl;
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