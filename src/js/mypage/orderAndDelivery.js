(function() {
    var ORDER_INQUIRY_LIST_URL;
    var PRODUCT_STATUS_URL;
    var ORDER_DETAIL_URL;
    var ORDER_CANCEL_POP;

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
                            '<p class="name"><a href="{{listData.productPDPurl}}"><span class="blind">제품명</span>{{listData.productNameKR}}</a></p>'+
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

    var cancelInfoTemplate = 
        '<div class="tit-wrap">'+
            '<h2 class="h2-tit">취소 정보</h2>'+
        '</div>'+
        '<div class="tb-scroll">'+
            '<div class="tb_row tb-row-bl">'+
                '<table>'+
                    '<caption>취소 정보를 제품금액, 할인 금액 합계, 취소 신청 멤버십 포인트, 취소 신청 금액 순으로 안내</caption>'+
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
                            '{{#if mempointPrices != "0"}} <th scope="col">취소 신청 멤버십 포인트</th>{{/if}}'+
                            '<th scope="col">취소 신청 금액</th>'+
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

    var txtMasking;

    var PRICE_INFO_DATA;
    var cancelAllChecker;

    function init(){
        if(!$('.contents.mypage').data('consumables')) {
            vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar', 'ui/datePeriodFilter', 'helper/textMasking'], function () {             
                setting();
                bindEvents();

                var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");

                requestOrderInquiry(dateData.startDate, dateData.endDate);
            });
        } else {
            bindEventsConsumables();
        }
    }

    function setting(){
        ORDER_INQUIRY_LIST_URL = $('.contents.mypage').data('orderInquiryList');
        ORDER_CANCEL_POP = $('.contents.mypage').data('orderInquiryList');
        PRODUCT_STATUS_URL = $('.contents.mypage').data('productStatus');
        ORDER_DETAIL_URL = $('.contents.mypage').data('orderDetail');
        txtMasking = new vcui.helper.TextMasking();

        $('.inquiryPeriodFilter').vcDatePeriodFilter({dateBetweenCheckEnable:false});
    }

    function bindEvents(){
        $('.inquiryPeriodFilter').on('dateFilter_submit', function(e, data){
            requestOrderInquiry(data.startDate, data.endDate);
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
                    setTakeBack(dataID, prodID);
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
                location.href = ORDER_DETAIL_URL + "?orderNumber=" + ORDER_LIST[dataID].orderNumber;
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

            cancelConfirm();
        });
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
    }

    function openCancelPop(dataId){
        lgkorUI.showLoading();
    
        var memInfos = lgkorUI.getHiddenInputData();
        var isNonMember = $('.contents.mypage').hasClass('non-members');    
        var orderNumber = isNonMember ? memInfos.sendOrderNumber : $('.contents.mypage').data('orderNumber');

        var sendata = {
            callType: "cancelPopup",
            orderNumber: orderNumber,
            sendOrderNumber: orderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_CANCEL_POP, sendata, function(result){
            lgkorUI.hideLoading();

            PRICE_INFO_DATA = [];

            var prodListWrap = $('#popup-cancel').find('.info-tbl-wrap .tbl-layout .tbody').empty();
            var productList = result.data.listData[0].productList;
            var productPrices = 0;
            var discountPrices = 0;
            var mempointPrices = 0;
            for(var idx in productList){
                var listdata = productList[idx];
                listdata["prodID"] = idx;
                listdata["addCommaProdPrice"] = vcui.number.addComma(listdata["productPrice"]);

                var productPrice = listdata.productPrice ? parseInt(listdata.productPrice) : 0;
                var discountPrice = listdata.discountPrice ? parseInt(listdata.discountPrice) : 0;
                var mempointPrice = listdata.memberShipPoint ? parseInt(listdata.memberShipPoint) : 0;

                if(listdata.itemCancelAbleYn == "N") listdata.orderStatus.disabled = "disabled";
                else{
                    productPrices += productPrice;
                    discountPrices += discountPrice;
                    mempointPrices += mempointPrice;
                }
            
                PRICE_INFO_DATA.push({
                    productPrice: productPrice,
                    discountPrice: discountPrice,
                    mempointPrice: mempointPrice
                })

                prodListWrap.append(vcui.template(prodListTemplate, {listData:listdata, isCheck:true}));
            }
            $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('update');
            $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setAllChecked');

            $('#popup-cancel').find('.sect-wrap.cnt01').empty().eq(1).remove();
            var totalPrice = productPrices - discountPrices - mempointPrices;
            var discountComma = vcui.number.addComma(mempointPrices);
            $('#popup-cancel').find('.sect-wrap.cnt01').append(vcui.template(cancelInfoTemplate, {
                productPrices: vcui.number.addComma(productPrices),
                discountPrices: vcui.number.addComma(discountPrices),
                mempointPrices: discountComma == "0" ? "0" : "-"+discountComma,
                totalPrice: vcui.number.addComma(totalPrice)
            }));

            $('#popup-cancel').find('textarea').attr('disabled', "disabled").val('');

            var backSelect = $('#popup-cancel').find('.bank-input-box select').empty().append('<option value="" class="placeholder">선택</option>');
            var bankList = result.data.bankList;
            for(idx in bankList){
                var bank = bankList[idx];
                var opt = '<option value="' + bank.commonCodeId + '" data-sort-id="' + bank.sortNo + '">' + bank.commonCodeName + '</option>';
                backSelect.append(opt);
            }
            backSelect.vcSelectbox('update');

            $('#popup-cancel').vcModal();
        });        
    }

    function cancelConfirm(){
        lgkorUI.confirm("주문 취소 신청시 제품을<br>다시 처음부터 구매하셔야 합니다.<br>주문하신 제품을 취소신청 하시겠어요?", {
            title: "",
            cancelBtnName: "아니오",
            okBtnName: "네",
            ok: function(){
                $('#popup-cancel').vcModal('close');
            }
        });
    }



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
    }


    function openTakebackPop(dataId){
        $('#popup-takeback').vcModal();
    }

    function setDeliveryInquiry(dataID, prodID){
        console.log("[setDeliveryInquiry]", dataID, prodID);
    }

    function setDeliveryRequest(dataID, prodID){
        console.log("[setDeliveryRequest]", dataID, prodID);
    }

    function setTakeBack(dataID, prodID){
        console.log("[setTakeBack]", dataID, prodID);
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
        var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
        requestOrderInquiry(dateData.startDate, dateData.endDate, CURRENT_PAGE+1);
    }

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
    }

    function requestOrderInquiry(startDate, endDate, page){
        lgkorUI.showLoading();
    
        var memInfos = lgkorUI.getHiddenInputData();
        var isNonMember = $('.contents.mypage').hasClass('non-members');    
        var orderNumber = isNonMember ? memInfos.sendOrderNumber : $('.contents.mypage').data('orderNumber');

        var sendata = {
            startDate: startDate,
            endDate: endDate,
            page: page || 1,
            orderNumber: orderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendOrderNumber: orderNumber,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber,
            purPathCode: vcui.detect.isMobile ? 3 : 2
        }
        lgkorUI.requestAjaxData(ORDER_INQUIRY_LIST_URL, sendata, function(result){

            var data = result.data;

            var prodcnt = data.productOrderCount ? data.productOrderCount : 0;
            $('.lnb-contents .tabs-wrap .tabs > li:nth-child(1) .count').text('('+prodcnt+')');

            var carecnt = data.caresolutionOrdercount ? data.caresolutionOrdercount : 0;
            $('.lnb-contents .tabs-wrap .tabs > li:nth-child(2) .count').text('('+carecnt+')');

            if(isNonMember) data.listData = [data.listData];

            if(data.listData && data.listData.length){
                if(result.param){
                    CURRENT_PAGE = result.param.pagination.page;
                    TOTAL_PAGE = result.param.pagination.totalCount;
                } else{
                    CURRENT_PAGE = TOTAL_PAGE = 1;
                }

                $('.inquiry-list-notify').show();

                if(CURRENT_PAGE >= TOTAL_PAGE) $('.btn-moreview').hide();
                else $('.btn-moreview').show();

                if(CURRENT_PAGE == 1){
                    ORDER_LIST = [];
                    $('.inquiry-list-wrap').empty();
                }

                var leng, cdx, idx, templateList;
                var list = data.listData;
                for(idx in list){
                    leng = ORDER_LIST.length;
                    list[idx]['dataID'] = leng.toString();

                    templateList = $(vcui.template(inquiryListTemplate, list[idx])).get(0);
                    $('.inquiry-list-wrap').append(templateList);

                    for(cdx in list[idx].productList){
                        list[idx].productList[cdx]["prodID"] = cdx;
                        list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);

                        var prodlist = list[idx].productList[cdx];
                        $(templateList).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist, isCheck:false}));
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

                    var template = isNonMember ? noneMemPaymentTemplate : paymentListTemplate;
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

            lgkorUI.hideLoading();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();