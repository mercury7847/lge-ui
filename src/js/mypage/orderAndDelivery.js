(function() {
    var inquiryListTemplate =
        '<div class="box" data-id="{{dataID}}">'+
            '<div class="info-wrap">'+
                '<ul class="infos">'+
                    '<li>{{dateTitle}}<em>{{orderDate}}</em></li>'+
                    '<li>{{orderNumberTitle}}<em>{{groupNumber}}</em></li>'+
                '</ul>'+
                '<p class="totals">총 {{orderTotal}}건</p>'+
            '</div>'+
            '<div class="tbl-layout sizeType3">'+
                '<div class="thead" aria-hidden="true">'+
                    '<span class="th col1">제품정보</span>'+
                    '<span class="th col2">결제금액</span>'+
                    '<span class="th col3">진행상태</span>'+
                '</div>'+
                '<div class="tbody">'+
                '</div>'+
            '</div>'+
            '<div class="btn-link-area">'+
                '{{#if orderCancelAbleYn == "Y"}}'+
                '<a href="#n" class="btn-link orderCancel-btn">취소신청</a>'+
                '{{/if}}'+
                '{{#if isDetailViewBtn}}<a href="#n" class="btn-link orderDetail-btn">주문/배송 상세보기</a>{{/if}}'+
            '</div>'+
            '{{#if isDetailViewBtn}}'+
            '<div class="btns">'+
                '<a href="#n" class="btn-link detailView-btn">주문/배송 상세보기</a>'+
            '</div>'+
            '{{/if}}'+
        '</div>';

    var careInquiryListTemplate = 
        '<div class="box" data-id="{{dataID}}">'+
            '<div class="info-wrap">'+
                '<ul class="infos">'+
                    '<li>{{dateTitle}}<em>{{orderDate}}</em></li>'+
                    '<li>{{orderNumberTitle}}<em>{{groupNumber}}</em></li>'+
                '</ul>'+
                '<p class="totals">총 {{orderTotal}}건</p>'+
            '</div>'+
            '<div class="tbl-layout sizeType3">'+
                '<div class="thead" aria-hidden="true">'+
                    '<span class="th col1">제품정보(청약 상세보기)</span>'+
                    '<span class="th col2">요금 정보</span>'+
                    '<span class="th col3">진행상태</span>'+
                '</div>'+
                '<div class="tbody">'+
                '</div>'+
            '</div>'+
            '<div class="btn-link-area">'+
                '{{#if orderCancelAbleYn == "Y"}}'+
                '<a href="#n" class="btn-link orderCancel-btn">취소신청</a>'+
                '{{/if}}'+
                '{{#if isDetailViewBtn}}<a href="#n" class="btn-link orderDetail-btn">청약 상세보기</a>{{/if}}'+
            '</div>'+
            '{{#if isDetailViewBtn}}'+
            '<div class="btns">'+
                '<a href="#n" class="btn-link detailView-btn">청약 상세보기</a>'+
            '</div>'+
            '{{/if}}'+
        '</div>';
        

        var prodListTemplate = 
            '<div class="row {{disabled}}">'+
                '<div class="col-table" data-prod-id="{{listData.prodID}}">'+
                    '<div class="col col1">'+
                        '<span class="blind">제품정보</span>'+
                        '<div class="product-info">'+
                            '<div class="thumb">'+
                                '<a {{#if listData.productPDPurl && listData.productPDPurl.length > 0}}href="{{listData.productPDPurl}}"{{/if}}><img onError="lgkorUI.addImgErrorEvent(this);" src="{{listData.productImage}}" alt="{{listData.productNameKR}}"></a>'+
                            '</div>'+
                            '<div class="infos">'+
                                '{{#if listData.productFlag}}<div class="flag-wrap"><span class="flag">{{listData.productFlag}}</span></div>{{/if}}'+
                                '<p class="name"><a {{#if listData.productPDPurl && listData.productPDPurl.length > 0}}href="{{listData.productPDPurl}}"{{/if}}><span class="blind">제품명</span>{{#raw listData.productNameKR}}</a></p>'+
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
                                '{{#if listData.orderedQuantity && isQuantity}}<p class="count">수량 : {{listData.orderedQuantity}}</p>{{/if}}'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col col1-2">'+
                        '<div class="payment-price">'+
                            //'{{#if listData.contDtlType != "C09"}}'+
                            '<p class="price">'+
                                '<span class="blind">구매가격</span>{{listData.addCommaProdPrice}}원'+
                            '</p>'+
                            //'{{/if}}'+
                        '</div>'+
                    '</div>'+
                    '<div class="col col2">'+
                        '<div class="state-box">'+
                            '<p class="tit {{listData.orderStatus.statusClass}}"><span class="blind">진행상태</span>{{listData.orderStatus.statusText}}</p>'+
                            '{{#if listData.itemCancelAbleMassege !=""}}<p class="desc">({{listData.itemCancelAbleMassege}})</p>{{/if}}'+
                            '{{#if listData.orderStatus.statusDate !=""}}<p class="desc">{{listData.orderStatus.statusDate}}</p>{{/if}}'+
                            '{{#if isBtnSet && listData.statusButtonList && listData.statusButtonList.length > 0}}'+
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
                    '<input type="checkbox" id="chk-cancel{{listData.prodID}}" value="{{listData.prodID}}" name="chk-cancel" {{disabled}}>'+
                    '<label for="chk-cancel{{listData.prodID}}"><span class="blind">해당 상품 선택</span></label>'+
                '</span>'+
                '{{/if}}'+
            '</div>';
        

            var careProdListTemplate = 
                '<div class="row {{disabled}}">'+
                    '<div class="col-table" data-prod-id="{{listData.prodID}}">'+
                        '<div class="col col1">'+
                            '<span class="blind">제품정보</span>'+
                            '<div class="product-info">'+
                                '<div class="thumb">'+
                                    '<a {{#if listData.productPDPurl && listData.productPDPurl.length > 0}}href="{{listData.productPDPurl}}"{{/if}}><img onError="lgkorUI.addImgErrorEvent(this);" src="{{listData.productImage}}" alt="{{listData.productNameKR}}"></a>'+
                                '</div>'+
                                '<div class="infos">'+
                                    '{{#if listData.productFlag}}<div class="flag-wrap"><span class="flag">{{listData.productFlag}}</span></div>{{/if}}'+
                                    '<p class="name"><a {{#if listData.productPDPurl && listData.productPDPurl.length > 0}}href="{{listData.productPDPurl}}"{{/if}}><span class="blind">제품명</span>{{#raw listData.productNameKR}}</a></p>'+
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
                                    //'{{#if listData.orderedQuantity}}<p class="count">수량 : {{listData.orderedQuantity}}</p>{{/if}}'+
                                    '{{#if listData.contDtlType == "C01" && listData.addCommaProdPrice != "0"}}'+
                                    '<p class="price">'+
                                        '<span class="blind">구매가격</span>{{listData.addCommaProdPrice}}원'+
                                    '</p>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col col1-2">'+
                            '<div class="payment-price">'+                            
                                '<p class="price"><span class="blind">월 요금</span>월 {{listData.addCommaMonthlyPrice}}원</p>'+
                                '{{#if isMonthlyPrice}}<a href="#" class="btn-link monthlyPrice-btn">할인 내역알아보기<a>{{/if}}'+
                            '</div>'+
                        '</div>'+
                        '<div class="col col2">'+
                            '<div class="state-box">'+
                                '<p class="tit {{listData.orderStatus.statusClass}}"><span class="blind">진행상태</span>{{listData.orderStatus.statusText}}</p>'+
                                //'{{#if listData.itemCancelAbleMassege !=""}}<p class="desc">{{listData.itemCancelAbleMassege}}</p>{{/if}}'+
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
                        '<input type="checkbox" id="chk-cancel{{listData.prodID}}" value="{{listData.prodID}}" name="chk-cancel" {{disabled}}>'+
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
                                '{{#if isMemberShip}} <th scope="col">{{typeName}} 신청 멤버십 포인트</th>{{/if}}'+
                                '<th scope="col">{{typeName}} 신청 금액</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr>'+
                                '<td class="originalTotalPrices">{{originalTotalPrices}}원</td>'+
                                '<td class="discountPrices">{{discountPrices}}원</td>'+
                                '{{#if isMemberShip}} <td class="mempointPrices">{{mempointPrices}}원</td>{{/if}}'+
                                '<td><em class="bold black productTotalPrices">{{productTotalPrices}}원</em></td>'+
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
                        '<td class="originalTotalPrices">{{originalTotalPrices}}원</td>'+
                        '<td><em class="bold black productTotalPrices">{{productTotalPrices}}원</em></td>'+
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
        '{{#if isBeforeVisit && instpectionVisit}}<li><dl><dt>사전 방문 신청</dt><dd>신청</dd></dl></li>{{/if}}' +
        //'{{#if recyclingPickup}}<li><dl><dt>폐가전 수거</dt><dd>수거신청</dd></dl></li>{{/if}}';
        // '{{#if isBeforeVisit}}<li><dl><dt>사전 방문 신청</dt><dd>{{#if instpectionVisit}}신청{{#else}}미신청{{/if}}</dd></dl></li>{{/if}}' +
        '<li><dl><dt>폐가전 수거</dt><dd>{{#if recyclingPickup}}수거신청{{#else}}해당없음{{/if}}</dd></dl></li>';
    
    var careShippingListTemplate = '<li><dl><dt>성명</dt><dd>{{maskingName}}</dd></dl></li>' +
        '<li><dl><dt>인수자 휴대폰</dt><dd>{{maskingTelephone}}</dd></dl></li>' +
        '<li><dl><dt>일반전화번호</dt><dd>{{maskingTelephonenumber}}</dd></dl></li>' +
        '<li><dl><dt>설치 주소</dt><dd>{{postcode}} {{maskingAddress}}</dd></dl></li>' +
        '<li><dl><dt>배송 요청사항</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>설치장소</dt><dd>{{installPlaceNm}}</dd></dl></li>' +
        '<li><dl><dt>설치희망 일시</dt><dd>{{instReqDate}}</dd></dl></li>' +
        '{{#if isBeforeVisit && instpectionVisit}}<li><dl><dt>사전 방문 신청</dt><dd>신청</dd></dl></li>{{/if}}' +
        //'{{#if recyclingPickup}}<li><dl><dt>폐가전 수거</dt><dd>수거신청</dd></dl></li>{{/if}}';
        // '{{#if isBeforeVisit}}<li><dl><dt>사전 방문 신청</dt><dd>{{#if instpectionVisit}}신청{{#else}}미신청{{/if}}</dd></dl></li>{{/if}}' +
        '<li><dl><dt>폐가전 수거</dt><dd>{{#if recyclingPickup}}수거신청{{#else}}해당없음{{/if}}</dd></dl></li>';

    var paymentListTemplate = 
        '{{#set method = paymentMethodName}}' +
        '<li><dl><dt>결제 수단</dt><dd>{{#if method}}<span>{{method}}</span>{{/if}}'+
        '{{#if receiptUrl}}<a href="{{receiptUrl}}" target="_blank" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
        '</dd></dl></li>'+        
        '<li><dl><dt>주문 금액</dt><dd>{{orderPrice}}원</dd></dl></li>'+        
        '<li><dl><dt>할인 금액</dt><dd>{{discountPrice}}원</dd></dl></li>'+        
        '<li><dl><dt>멤버십포인트</dt><dd>{{memberShipPoint}}원</dd></dl></li>'+        
        '<li><dl><dt>총 결제 금액</dt><dd><em>{{totalPrice}}원</em></dd></dl></li>';

    var carePaymentListTemplate = 
        '{{#set method = paymentMethodName}}' +
        '<li><dl><dt>결제 수단</dt><dd>{{#if method}}<span>{{method}}</span>{{/if}}'+
        '{{#if receiptUrl}}<a href="{{receiptUrl}}" target="_blank" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
        '</dd></dl></li>';

    var noneMemPaymentTemplate = 
    '{{#set method = paymentMethodName}}' +
    '<li><dl><dt>결제 수단</dt><dd>{{#if method}}<span>{{method}}</span>{{/if}}'+
    '{{#if receiptUrl}}<a href="{{receiptUrl}}" target="_blank" class="btn-link receiptList-btn">영수증 발급 내역</a>{{/if}}'+
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
            '<dd><span>{{monthlyPriceInfo}}</span></dd>'+
        '</dl></li>'+        
        '<li><dl><dt>월 납부 수단</dt><dd>{{transTypeNm}}</dd></dl></li>'+        
        '<li><dl><dt>은행(카드)명</dt><dd>{{transCorpName}}</dd></dl></li>'+        
        '<li><dl><dt>계좌(카드)번호</dt><dd>{{maskingTransAccountNum}}</dd></dl></li>';

    var receiptHeaderTemplate = 
        '<div class="info-tbl-wrap">'+
            '<div class="box title-type">'+
                '<div class="box-title">'+
                    '<p>주문 영수증 확인</p>'+
                '</div>'+
                '<div class="tbl-layout{{#if method != ""}} size3{{/if}}">'+
                    '<div class="thead" aria-hidden="true">'+    
                        '<span class="th col1">제품정보</span>'+    
                        '<span class="th col2">진행상태</span>'+    
                    '</div>'+
                    '<div class="tbody">'+
                    '</div>'+
                    '{{#if method != ""}}'+ 
                    '<div class="bill-btns">'+
                        '<div class="title">'+
                            '<p>영수증 내역</p>'+
                        '</div>'+
                        '<div class="btn-area">'+
                            '<a href="{{receiptUrl}}" target="_blank" class="btn size border methodReceipt-btn"><span>{{method}}</span></a>'+
                        '</div>'+
                    '</div>'+
                    '{{/if}}'+
                '</div>'+
                '<a href="#n" class="btn-link salesReceipt-btn">거래영수증</a>'+
            '</div>'+
        '</div>';

    var receiptPopInfoTemplate =     
        '<tr><th scope="row">주문번호</th><td>{{orderNumber}}</td>'+
        '<tr><th scope="row">거래일시</th><td>{{orderDate}}</td>'+
        '{{#if progressState}}<tr><th scope="row">진행상태</th><td>{{progressState}}</td>{{/if}}'+
        '<tr><th scope="row">상품명</th><td>{{productName}}</td>'+
        '<tr><th scope="row">총 거래금액</th><td>{{totalPrice}}</td>'+
        '<tr><th scope="row">결제수단</th><td>{{paymentMethod}}</td>'+
        '<tr><th scope="row">서명</th><td>{{orderUser}}</td>';

    var productOrderInfoTemplate =     
        '<li><dl><dt>배송 요청사항</dt><dd>{{shippingNoteTxt}}</dd></dl></li>' +
        '<li><dl><dt>배송 희망일</dt><dd>{{delivWish}}</dd></dl></li>';

    var pastListNotyfyVerPC = '<ul class="bullet-list pastlist-notyfy" style="margin-top:10px"><li class="b-txt">2020.04.13~2021.04.26 주문 건에 대한  주문취소/배송정보/반품/기타 사항에 대해서는 1661-2471로  문의 주세요. </li></ul>';
    var pastListNotyfyVerMobile = '<ul class="bullet-list pastlist-notyfy" style="margin-top:10px"><li class="b-txt">2020.04.13~2021.04.26 주문 건에 대한  주문취소/배송정보/반품/기타 사항에 대해서는 <a href="tel:1661-2471">1661-2471</a>로  문의 주세요. </li></ul>';
    
    var ORDER_INQUIRY_LIST_URL;     //리스트 조회 연동 json
    var ORDER_DETAIL_URL;               //상세 페이지 경로
    var PRODUCT_STATUS_URL;          //제품 상태 체크
    var ORDER_CANCEL_POP_URL;
    var ORDER_SAILS_URL;
    var ORDER_REQUEST_URL;
    var ORDER_BENEFIT_URL;


    var PAYMENT_METHOD_CONFIRM;
    var INFO_MODIFY_CONFIRM;
    var ARS_AGREE_URL;
    var ARS_AGREE_CHECK_URL;    // BTOCSITE-98 add
    var PAYMENT_SAVE_URL;

    var PAGE_TYPE_LIST = "orderListPage";
    var PAGE_TYPE_DETAIL = "orderDetailPage";
    var PAGE_TYPE_NONMEM_DETAIL = "orderNoneMemberPage";
    var PAGE_TYPE_CAREDETAIL = "careOrderDetailPage";
    var PAGE_TYPE_RECORD_DETAIL = "recordDetailPage";

    var TAB_FLAG_ORDER = "ORDER";
    var TAB_FLAG_CARE = "CARE";
    var TAB_FLAG_RECORD = "RECORD";

    var METHOD_CARD = "CARD";
    var METHOD_BANK = "BANK";

    var START_INDEX;

    var ORDER_LIST;
    var CARE_LIST;
    var RECORD_LIST;

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
    var arsAgree = "N";

    var START_DATE, END_DATE, SELECT_PERIOD;

    var CERTI_ID, BATCH_KEY;

    var CTI_REQUEST_KEY;

    var paymentInfo;
    var paymentMethod;

    var tabMenu;

    var cardValidation, bankValidation;

    var sendPaymentMethod;

    var arsAgreeConfirm = "N"; //BTOCSITE-98 add
    var isClickedarsAgreeConfirmBtn = false;    // BTOCSITE-98 add
    var isClickedarsAgreeConfirmCheckBtn = false;    // BTOCSITE-98 add

    var ajaxMethod = "GET";

    function init(){
        if(!$('.contents.mypage').data('consumables')) {
            vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar', 'ui/datePeriodFilter', 'ui/formatter', 'helper/textMasking'], function () {             
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
        
        ORDER_REQUEST_URL = $('.contents.mypage').data('orderRequest');

        ORDER_BENEFIT_URL = $('.contents.mypage').data('orderBenefit');

        PAYMENT_METHOD_CONFIRM = $('.contents.mypage').data('paymentMethodUrl');
        INFO_MODIFY_CONFIRM = $('.contents.mypage').data('modifyConfirmUrl');
        ARS_AGREE_URL = $('.contents.mypage').data('arsAgreeUrl');
        ARS_AGREE_CHECK_URL = $('.contents.mypage').data('arsAgreeCheckUrl');
        PAYMENT_SAVE_URL = $('.contents.mypage').data('paymentSaveUrl');

        txtMasking = new vcui.helper.TextMasking();

        tabMenu = $('.lnb-contents .tabs-wrap .tabs');

        //클래스로 접속 페이지 타입 정의...
        var isOrderlist = $('.contents.mypage').hasClass('orderAndDelivery'); 
        var isOrderdetail = $('.contents.mypage').hasClass('orderAndDelivery-detail'); 
        var isNonemem = $('.contents.mypage').hasClass('non-members'); 
        if(isOrderlist) PAGE_TYPE = PAGE_TYPE_LIST;
        if(isOrderdetail) PAGE_TYPE = PAGE_TYPE_DETAIL;
        if(isNonemem) PAGE_TYPE = PAGE_TYPE_NONMEM_DETAIL;

        //$('.inquiryPeriodFilter').vcDatePeriodFilter({dateBetweenCheckValue:"2y", minDate:new Date('2021-04-16')});
        $('.inquiryPeriodFilter').vcDatePeriodFilter({dateBetweenCheckValue:"2y"});
        var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
        START_DATE = dateData.startDate;
        END_DATE = dateData.endDate;
        SELECT_PERIOD = dateData.periodSelect;

        TAB_FLAG = $('.contents.mypage').data('tabFlag') ? $('.contents.mypage').data('tabFlag') : TAB_FLAG_ORDER;
        if(TAB_FLAG == TAB_FLAG_CARE && PAGE_TYPE == PAGE_TYPE_DETAIL) PAGE_TYPE = PAGE_TYPE_CAREDETAIL;

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
            SELECT_PERIOD = data.periodSelect;

            var tab = tabMenu.find('li[class=on]');
            TAB_FLAG = tab.index() ? TAB_FLAG_CARE : TAB_FLAG_ORDER;

            requestOrderInquiry();
        });

        tabMenu.find('li a').on('click', function(e){
            e.preventDefault();

            changeTabFlag($(this).parent());
        })

        $('.contents.mypage').on('click', '.orderCancel-btn', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            openCancelPop(dataID, $(this));
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
                    openTakebackPop(dataID, prodID, $(this));
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

                case "requestOrder":
                    setOrderRequest(dataID, prodID);
                    break;

                case "orderInfos":
                    openOrderInfoPop(dataID, prodID, $(this));
                    break;
            }
        }).on('click', '.btn-moreview', function(e){
            e.preventDefault();

            setMoreOrderList();
        }).on('click', '.receiptList-btn', function(e){
            e.preventDefault();

            setReceiptListPop($(this));
        }).on('click', '.monthlyPrice-btn', function(e){
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            var prodID = $(this).closest('.col-table').data('prodId');
            setMonthlyPricePop(dataID, prodID);
        }).on('click', '.thumb a', function(e){
            e.preventDefault();
            var $this = $(this);
            var pdpUrl = $this.attr("href");
            if(pdpUrl) {
                var dataID = $this.closest('.box').data("id");
                var prodID = $this.closest('.col-table').data('prodId');
                setProductStatus(dataID, prodID, pdpUrl);
            }
        }).on('click', '.infos .name a', function(e){
            e.preventDefault();
            var $this = $(this);
            var pdpUrl = $this.attr("href");
            //var wrapper = $this.closest(".contents");
            var dataID = $this.closest('.box').data("id");
            var prodID = $this.closest('.col-table').data('prodId');

            if(pdpUrl) {
                setProductStatus(dataID, prodID, pdpUrl);
            }
        }).on('click', '.lnb-contents > .btn-group button', function(e){
            e.preventDefault();

            sendListPage();
        }).on('click', '.detailView-btn, .orderDetail-btn', function(e){
            e.preventDefault();
            
            var dataID = $(this).closest('.box').data("id");
            sendDetailPage(dataID);
        }).on('click', '.recordList-btn', function(e){
            e.preventDefault();

            showRecordList();
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
        }).on('click', '.arsAgreeRequestCheck', function(e){
            e.preventDefault();

            arsAgreeConfirmCheck();
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal({opener:$(this)});
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal({opener:$(this)});
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

        $('#popup-receipt-list').on('click', ".salesReceipt-btn", function(e){
            e.preventDefault();

            setSalesReceiotPop($(this));
        });

        //영수증 팝업 인쇄
        $('#popup-salesReceipt').on('click',"div.btn-group button.pink", function(e){
            e.preventDefault();
            var receiptTemplate = '<html lang="ko" class="js">' +
                '<head>' +
                    '<meta charset="UTF-8">' +
                    '<meta http-equiv="X-UA-TextLayoutMetrics" content="gdi">' +
                    '<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">' +
                    '<title>영수증</title>' +
                    '<link rel="shortcut icon" href="/lg5-common/images/favicon.ico">' +
                    '<link rel="stylesheet" href="/lg5-common/css/reset.min.css">' +
                    '<link rel="stylesheet" href="/lg5-common/css/app.min.css">' +
                    '<link type="text/css" rel="stylesheet" href="/lg5-common/css/pages/MYC/MYC.min.css">' +
                '</head>' +
                '<body><article id="popup" class="win-popup-wrap">{{#raw html}}</article></body>' +
            '</html>'

            var html = $('#popup-salesReceipt').html();
            var setting = "width=640, height=800, all=no";
            var objWin = window.open('', 'print',setting);
            objWin.document.write(vcui.template(receiptTemplate, {"html":html}));
            objWin.focus(); 
            objWin.document.close();
            objWin.onload=function() {
                objWin.print();
                objWin.close();
            }
        });

        lgkorUI.addLimitedInputEvent($('input[name=birthDt]'));

        // .on('click', ".methodReceipt-btn", function(e){
        //     e.preventDefault();

        //     setMethodReceiptPop();
        // });
    }

    function sendDetailPage(dataID){
        var listdata = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : TAB_FLAG == TAB_FLAG_CARE ? CARE_LIST : RECORD_LIST;

        var prodlist = listdata[dataID].productList;
        var orderNumbers = [];
        for(var idx in prodlist) orderNumbers.push(prodlist[idx].orderNumber);
        var orderNumberList = JSON.stringify(orderNumbers);

        var sendata = {
            orderNumber: listdata[dataID].orderNumber,
            requestNo: listdata[dataID].requestNo,
            tabFlag: TAB_FLAG,
            startDate: START_DATE,
            endDate: END_DATE,
            periodSelect: SELECT_PERIOD,
            orderNumberList: orderNumberList
        }

        lgkorUI.setHiddenInputData(sendata);

        $('#goDetailForm').attr('action', ORDER_DETAIL_URL);

        setTimeout(function(){
            $('#goDetailForm').submit();  
        }, 100);
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
        var bankValue;

        if($('#' + popname).data('isBirthDt')){
            bankValue= $('#' + popname).find('input[name=birthDt]').val();
            if(!bankValue){
                lgkorUI.alert("", {
                    title: "생년월일을 입력해 주세요."
                });
    
                return false;
            }
        }

        bankValue = $('#' + popname).find('.bank-input-box select option:selected').val();
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
            e.preventDefault();

            var url = $('.contents.mypage').data('receiptUrl');
            var orderNo = $(this).data('orderNo');
            var serviceType = $(this).data('serviceType');

            var sendata = {
                orderNo: orderNo
            }

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, sendata, function(result){
                
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
                    } else if(payMethodCd == "03"){     // 무통장
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
        var selectReason = $('#popup-takeback').find('#slt01 option:selected').val();
        var writeReason = $('#popup-takeback').find('textarea').val();
        var selectReasonTrim = selectReason.replace(/[_-]/gi, '');
        var writeReasonTrim = writeReason.replace(/[_-]/gi, '');
        var reason = "";
        if(selectReasonTrim.length){
            reason = selectReason == "etc" ? writeReason : selectReason;
        }

        if(writeReasonTrim.length) reason = writeReason;

        if(reason == ""){
            lgkorUI.alert("", {
                title: "반품을 신청하시려면, 상세 사유가 필요합니다. 반품 사유를 입력해 주세요."
            });

            return;
        }

        if($('#popup-takeback').data('isBank')){
            if(!getBankBnumberValidation('popup-takeback')) return;
    
            var paymentBankNumber = $('#popup-takeback').find('.bank-input-box input').val();
            var paymentBank = $('#popup-takeback').find('.bank-input-box select option:selected').val();
            if(!popBankConfirm || popBankInfo.paymentBank != paymentBank || popBankInfo.paymentBankNumber != paymentBankNumber){
                lgkorUI.alert("", {
                    title: "'환불계좌확인' 버튼을 클릭하여 계좌번호를 확인해주세요."
                });
    
                return;
            }
    
            // if(!$("#popup-takeback").find('.chk-wrap.bottom input[type=checkbox]').prop("checked")){
            //     lgkorUI.alert("", {
            //         title: "환불을 위한 개인정보 수집 처리에 동의해 주세요."
            //     });
    
            //     return;
            // }
        }

        var isAgreeChk = $('#popup-takeback').data('isAgreeChk');
        if(isAgreeChk){
            if(!$('#popup-takeback').find('input[name=takebackPopAgree]').prop('checked')){
                lgkorUI.alert("", {
                    title: "스토어 주문 반품/취소 신청 환불 정보 수집에 동의해 주세요."
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
        //변수 추가 210824 BTOCSITE-4124
        var $cashChk = $('#popup-cancel').hasClass('cash-chk');
        //210824 BTOCSITE-4124 로직 변경 - 현금결제일 경우 체크
        if($cashChk == true){
            //console.log('현금결제');
            //openCancelPop(dataID);
            cancelOk();

        } else {
            //console.log('현금이외 결제'); //210823

            var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
            if(!chkItems.length){
                lgkorUI.alert("", {
                    title: "취소 대상 제품을 선택해 주세요."
                });

                return;
            }

            var selectReason = $('#popup-cancel').find('#cancelReason option:selected').val();
            var writeReason = $('#popup-cancel').find('textarea').val();
            var selectReasonTrim = selectReason.replace(/[_-]/gi, '');
            var writeReasonTrim = writeReason.replace(/[_-]/gi, '');
            var reason = "";
            if(selectReasonTrim.length){
                reason = selectReason == "etc" ? writeReason : selectReason;
            }

            if(writeReasonTrim.length) reason = writeReason;

            if(reason == ""){
                lgkorUI.alert("", {
                    title: "취소신청하시려면, 상세 사유가 필요합니다. 취소 사유를 입력해 주세요."
                });

                return;
            }
    
            if($('#popup-cancel').data('isBank')){
                if(!getBankBnumberValidation('popup-cancel')) return;
        
                var paymentBankNumber = $('#popup-cancel').find('.bank-input-box input').val();
                var paymentBank = $('#popup-cancel').find('.bank-input-box select option:selected').val();
                if(!popBankConfirm || popBankInfo.paymentBank != paymentBank || popBankInfo.paymentBankNumber != paymentBankNumber){
                    lgkorUI.alert("", {
                        title: "'환불계좌확인' 버튼을 클릭하여 계좌번호를 확인해주세요."
                    });
        
                    return;
                }
        
                // if(!$("#popup-cancel").find('.chk-wrap.bottom input[type=checkbox]').prop("checked")){
                //     lgkorUI.alert("", {
                //         title: "환불을 위한 개인정보 수집 처리에 동의해 주세요."
                //     });
        
                //     return;
                // }
            }

            var isAgreeChk = $('#popup-cancel').data('isAgreeChk');
            if(isAgreeChk){
                if(!$('#popup-cancel').find('input[name=cancelPopAgree]').prop('checked')){
                    lgkorUI.alert("", {
                        title: "스토어 주문 반품/취소 신청 환불 정보 수집에 동의해 주세요."
                    });
        
                    return;
                }
            }
            
            lgkorUI.confirm("주문하신 제품을 취소신청 하시겠어요?", {
                title: "",
                cancelBtnName: "아니오",
                okBtnName: "네",
                ok: function(){
                    cancelOk();
                }
            });
        }
        //로직 변경 210824 BTOCSITE-4124

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
        var originalTotalPrices = 0;
        var discountPrices = 0;
        var mempointPrices = 0;
        var productTotalPrices = 0;
        var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
        chkItems.each(function(idx, item){
            var idx = $(item).val();
            
            originalTotalPrices += PRICE_INFO_DATA[idx].originalTotalPrice;
            discountPrices += PRICE_INFO_DATA[idx].discountPrice;
            mempointPrices += PRICE_INFO_DATA[idx].mempointPrice;
            productTotalPrices += PRICE_INFO_DATA[idx].productTotalPrice;
        });
        $('#popup-cancel').find('.originalTotalPrices').text(vcui.number.addComma(originalTotalPrices)+"원");
        $('#popup-cancel').find('.discountPrices').text(vcui.number.addComma(discountPrices)+"원");
        $('#popup-cancel').find('.mempointPrices').text(vcui.number.addComma(mempointPrices)+"원");
        $('#popup-cancel').find('.productTotalPrices').text(vcui.number.addComma(productTotalPrices)+"원");

        //$('#popup-cancel').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', false);
    }

    function setDeliveryInquiry(dataID, prodID){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var orderStatus = listData[dataID].productList[prodID].orderStatus;
        
        void(window.open(orderStatus.deliveryUrl, "_blank", "width=360, height=600, scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));   
    }

    function setDeliveryRequest(dataID, prodID){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var productNameEN = listData[dataID].productList[prodID].productNameEN.split(".")[0];

        //2021-08-06 - BTOCSITE-4140
        var keyName = listData[dataID].productList[prodID].modelType.indexOf("A") > -1 ? "parts" : "mktModelCd";

        lgkorUI.confirm('이메일 배송 문의를 위해서는 개인정보 수집 및 이용에<br>동의 하셔야 이용 가능합니다.<br>동의 하시겠습니까?',{
            typeClass:'type2',
            title:'',
            okBtnName: '네',
            cancelBtnName: '아니요',
            ok: function() {
                location.href = "/support/email-inquiry?" + keyName + "=" + productNameEN
            },
            cancel: function() {
            }
        });
    }

    function setProductReview(dataID, prodID){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var url = listData[dataID].productList[prodID].productPDPurl;
        if(url && url.length > 0) {
            var productPDPurl = url + "#pdp_review";
            void(window.open(productPDPurl));
        }
    }

    function setUseReview(dataID, prodID){
        console.log("[setUseReview]", dataID, prodID);
    }

    function setContractStatus(dataID, prodID){
        console.log("[setContractStatus]", dataID, prodID);
    }

    function setMonthlyPricePop(dataId, prodId){
        var sendata = {
            rtModelSeq: CARE_LIST[dataId].productList[prodId].rtModelSeq,
            contDtlType: CARE_LIST[dataId].contDtlType,
            cardCorpCode: MONTHLY_PAYMENT_DATA.cardCorpCode,
            cardCorpName: MONTHLY_PAYMENT_DATA.cardCorpName,
            cardReqYn: MONTHLY_PAYMENT_DATA.cardReqYn,
            cardReqYnName: MONTHLY_PAYMENT_DATA.cardReqYnName,
            cardType: MONTHLY_PAYMENT_DATA.cardType
        }
        lgkorUI.requestAjaxData(ORDER_BENEFIT_URL, sendata, function(result){
            $('#popup-monthly-price').empty().html(result).vcModal({opener:$('.monthlyPrice-btn')});
        }, null, "html");
    }

    function setNoData(){
        $('.inquiry-list-wrap').empty().append('<div class="no-data"><p>주문 내역이 없습니다.</p></div>');
        $('.inquiry-list-notify').hide();
        $('.btn-moreview').css('display','none');
    }

    function setMoreOrderList(){
        START_INDEX += LIST_VIEW_TOTAL;

        if(TAB_FLAG == TAB_FLAG_RECORD) setRecordContents();
        else setOrderListContents();
    }

    //리스트 랜더...
    function setOrderListContents(){
        var list = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var leng = list.length;

        $('.pastlist-notyfy').remove();
        
        if(leng){
            $('.inquiry-list-notify').show();

            var isMonthlyPrice = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? true : false;

            var start = START_INDEX;
            var end = start + LIST_VIEW_TOTAL;
            if(end > leng) end = leng;

            if(start == 0) $('.inquiry-list-wrap').empty();            

            for(var idx=start;idx<end;idx++){
                var template = TAB_FLAG == TAB_FLAG_CARE ? careInquiryListTemplate : inquiryListTemplate;
                list[idx].isDetailViewBtn
                var templateList = $(vcui.template(template, list[idx])).get(0);
                $('.inquiry-list-wrap').append(templateList);

                for(var cdx in list[idx].productList){
                    var prodlist = list[idx].productList[cdx];
                    var years1TotAmt = prodlist.years1TotAmt ? prodlist.years1TotAmt : "0";
                    prodlist.addCommaMonthlyPrice = vcui.number.addComma(years1TotAmt);
                    template = TAB_FLAG == TAB_FLAG_CARE ? careProdListTemplate : prodListTemplate;
                    
                    prodlist.specList = vcui.array.filter(prodlist.specList, function(item){
                        var chk = item != null && item != "null" && item != undefined && item != "" ? true : false;
                        return chk;
                    });
                    
                    $(templateList).find('.tbody').append(vcui.template(template, {listData:prodlist, disabled:"", isCheck:false, isMonthlyPrice:isMonthlyPrice, isBtnSet:true, isQuantity:true}));
                }
            }

            if(end < leng) $('.btn-moreview').css('display','block');
            else $('.btn-moreview').css('display','none');
        } else{
            setNoData();
        }
    }

    //서비스 이전 내역 스타트...
    function showRecordList(){
        START_INDEX = 0;
        TAB_FLAG = TAB_FLAG_RECORD;

        $('.inquiryPeriodFilter').vcDatePeriodFilter("setStartDate", "20200413");
        $('.inquiryPeriodFilter').vcDatePeriodFilter("setEndDate", "20210426");
        $('.inquiryPeriodFilter').find("input[name=periodSelect]").prop('checked', false)

        setRecordContents();
    }

    //서비스 이전 내역 조회...
    function setRecordContents(){
        var leng = RECORD_LIST.length;        

        $('.pastlist-notyfy').remove();

        if(leng){
            $('.inquiry-list-notify').hide();

            var start = START_INDEX;
            var end = start + LIST_VIEW_TOTAL;
            if(end > leng) end = leng;

            $('.inquiry-list-wrap').empty();            

            for(var idx=start;idx<end;idx++){
                var templateList = $(vcui.template(inquiryListTemplate, RECORD_LIST[idx])).get(0);
                $('.inquiry-list-wrap').append(templateList);

                for(var cdx in RECORD_LIST[idx].productList){
                    var prodlist = RECORD_LIST[idx].productList[cdx];                    
                    prodlist.specList = vcui.array.filter(prodlist.specList, function(item){
                        var chk = item != null && item != "null" && item != undefined && item != "" ? true : false;
                        return chk;
                    });
                    
                    $(templateList).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist, disabled:"", isCheck:false, isMonthlyPrice:false, isBtnSet:true, isQuantity:true}));
                }
            }

            var notify = vcui.detect.isMobileDevice ? pastListNotyfyVerMobile : pastListNotyfyVerPC;
            if($('.open-before-order-history').length) $('.open-before-order-history .inner').append(notify);
            else $('.info-tbl-wrap.inquiry-list-wrap').after(notify);

            $('.btn-moreview').css('display','none');
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
    
    //취소/반품 확인 리스트 리로드...
    function reloadOrderInquiry(){
        requestOrderInquiry();
    }

    //카드/은행 셀렉트박스 리셋...
    function setDelectData(selector, list, selectId){

        var list = vcui.array.map(list, function(item, idx){
            item['text'] =  item.commonCodeName ;
            item['value'] = item.commonCodeId;
            return item;
        });

        var selected = vcui.array.filterOne(list, function(item, idx){
            var codes = item.commonCodeId.split("^");
            var obj = codes[0] === selectId ? true : false;
            return obj;
        });
        list.unshift({
            text: "선택해주세요.",
            value: "",
            placeholder: true
        });

        var idx = vcui.array.indexOf(list, selected);
        if(idx>0){
            selector.vcSelectbox('update', list).vcSelectbox('selectedIndex', idx);
        } else{
            selector.vcSelectbox('update', list);
        }
    }

    //납부정보 input 밸리데이션...
    function paymentFieldValidation(){
        var paymentMethodIndex = $('.monthly-payment-modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var result = paymentMethodIndex ? bankValidation.validate() : cardValidation.validate();
        
        return result.success;
    }
    //납부정보 입력 데이터 비교...
    function compareInputData(){
        var paymentMethodIndex = $('.monthly-payment-modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var values = paymentMethodIndex ? bankValidation.getAllValues() : cardValidation.getAllValues();
        var chk = true;
        for(var str in values){
            if(paymentInfo[str] !== values[str]){
                chk = false;

                break;
            }
        }

        return chk;
    }
    //납부정보 확인 유무...
    function paymentConfirmYN(){
        if(paymentMethodConfirm == "N"){
            paymentErrorAlert();
            return false;
        }

        return true;
    }

    //납부 확인 오류창...
    function paymentErrorAlert(){
        var paymentMethodIndex = $('.monthly-payment-modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        lgkorUI.alert("",{
            title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
        });
        arsAgree = "N";
    }

    //납부 정보 유효성 체크
    function paymentInfoValidation(){
        var chk = paymentConfirmYN();
        if(!chk) return false;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return false;
        }

        if(arsAgree == "N" && !vcui.detect.isIOS){
            lgkorUI.alert("",{
                title: "자동결제를 위해 ARS 출금동의 신청해주세요."
            });
            
            return false;
        }
        
        /* BTOCSITE-98 add */
        if(arsAgreeConfirm !== "Y" && vcui.detect.isIOS){

            //if (isClickedarsAgreeConfirmBtn == false){
            if (arsAgree !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 신청해주세요"
                });
                return false;
            }

            if (arsAgreeConfirm !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 확인 버튼을 클릭해 주세요"
                });
                return false;
            }
            
        }
        /* //BTOCSITE-98 add */

        if(!$('.monthly-payment-modify').find('input[name=selfClearingAgree]').prop('checked')){
            lgkorUI.alert("",{
                title: "자동결제를 위해 정기결제 신청을 동의해주세요."
            });
            return false;
        }
        
        return true;
    }

    //### REQUEST ###


    //페이지 리스트 로드...
    function requestOrderInquiry(page){
        lgkorUI.showLoading();
    
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = $('.contents.mypage').data('orderNumber');
        var requestNo = $('.contents.mypage').data('requestNo');

        var orderNumberList = $('.contents.mypage').data('orderNumberList');

        var sendata = 
        {
            startDate: START_DATE,
            endDate: END_DATE,
            page: page || 1,
            orderNumber: orderNumber,
            requestNo: requestNo,
            tabFlag: TAB_FLAG,

            orderNumberList: JSON.stringify(orderNumberList),

            sendInquiryType: memInfos.sendInquiryType,
            sendOrderNumber: memInfos.sendOrderNumber,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber,
            purPathCode: vcui.detect.isMobile ? 3 : 2
        }

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_INQUIRY_LIST_URL, sendata, function(result){
            if(result.status == "fail"){
                if(PAGE_TYPE == PAGE_TYPE_CAREDETAIL || PAGE_TYPE == PAGE_TYPE_DETAIL){
                    lgkorUI.alert("", {
                        title: result.message,
                        ok: function(){
                            location.href = "/my-page/order-status";
                        }
                    })
                } else{
                    lgkorUI.alert("", {
                        title: result.message
                    })
                }
            } else{

                var data = result.data;
    
                if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) data.listData = [data.listData];
    
                START_INDEX = 0;
                ORDER_LIST = [];
                CARE_LIST = [];
                RECORD_LIST = [];
                SHIPPING_DATA = {};
                PAYMENT_DATA = {};
                ORDER_USER_DATA = {};
                MONTHLY_PAYMENT_DATA = {};
    
                //구매목록 리스트...PAGE_TYPE_LIST, PAGE_TYPE_DETAIL, PAGE_TYPE_NONMEM_DETAIL
                if(data.listData && data.listData.length){
                    var leng, cdx, idx;
                    var list = data.listData;
                    for(idx in list){
                        leng = ORDER_LIST.length;
                        list[idx]['dataID'] = leng.toString();
    
                        list[idx].dateTitle = "주문일";
                        list[idx].orderNumberTitle = "주문번호";
                        list[idx].groupNumber = list[idx].orderNumber;
    
                        var chk = 0;
                        for(cdx in list[idx].productList){
                            list[idx].productList[cdx]["prodID"] = cdx;
                            list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["rowTotal"]);
    
                            if(list[idx].productList[cdx].orderCancelAbleYn == "Y") chk++;
                        }
    
                        if(chk > 0) list[idx].orderCancelAbleYn = "Y";
                        else list[idx].orderCancelAbleYn = "N";
    
                        if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL){
                            list[idx].apiType = "OBS";
                            list[idx].requestNo = "";
                        }
    
                        list[idx].isDetailViewBtn = PAGE_TYPE == PAGE_TYPE_LIST ? true : false;
    
                        ORDER_LIST.push(list[idx]);
                    }
                }
    
                
                //구매목록 리스트...PAGE_TYPE_CAREDETAIL
                if(data.careListData && data.careListData.length){
                    list = data.careListData;
                    for(idx in list){
                        leng = CARE_LIST.length;
                        list[idx]['dataID'] = leng.toString();
    
                        list[idx].dateTitle = "신청일";
                        list[idx].orderNumberTitle = "계약 요청 번호";
                        list[idx].groupNumber = list[idx].requestNo ? list[idx].requestNo : list[idx].orderNumber;
    
                        var chk = 0;
                        for(cdx in list[idx].productList){
                            list[idx].productList[cdx]["prodID"] = cdx;
                            var rowTotal = list[idx].productList[cdx]["rowTotal"];
                            list[idx].productList[cdx]["addCommaProdPrice"] = rowTotal ? vcui.number.addComma(rowTotal) : "0";
    
                            if(list[idx].productList[cdx].orderCancelAbleYn == "Y") chk++;
                        }
    
                        if(chk > 0) list[idx].orderCancelAbleYn = "Y";
                        else list[idx].orderCancelAbleYn = "N";
    
                        list[idx].isDetailViewBtn = PAGE_TYPE == PAGE_TYPE_LIST ? true : false;
    
                        CARE_LIST.push(list[idx]);
                    }
                }

                //서비스 개편 이전 내역 리스트...
                if(data.recordsListData && data.recordsListData.length){
                    list = data.recordsListData;
                    for(idx in list){
                        leng = RECORD_LIST.length;
                        list[idx]['dataID'] = leng.toString();
    
                        list[idx].dateTitle = "주문일";
                        list[idx].orderNumberTitle = "주문번호";
                        list[idx].groupNumber = list[idx].orderNumber;
    
                        var chk = 0;
                        for(cdx in list[idx].productList){
                            list[idx].productList[cdx]["prodID"] = cdx;
                            list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["rowTotal"]);
                        }
                        list[idx].orderCancelAbleYn = "N";
    
                        list[idx].isDetailViewBtn = PAGE_TYPE == PAGE_TYPE_LIST ? true : false;
    
                        RECORD_LIST.push(list[idx]);
                    }
                }
    
                //배송정보
                if(data.shipping) {
                    SHIPPING_DATA = resetShippingData(data.shipping);
                }
    
                //결제정보
                if(data.payment) {
                    if(Object.keys(data.payment).length){
                        var orderReceiptAbleYn;
                        if(TAB_FLAG == TAB_FLAG_RECORD) orderReceiptAbleYn = "N";
                        else orderReceiptAbleYn = TAB_FLAG == TAB_FLAG_ORDER ? data.listData[0].orderReceiptAbleYn : data.careListData[0].orderReceiptAbleYn;

                        PAYMENT_DATA = resetPaymentData(data.payment, orderReceiptAbleYn);
                    }
                }
    
                //주문자 정보
                if(data.orderUser) {
                    var orderusers = data.orderUser;
                    orderusers.nameTitle = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? "성명" : "주문하는 분";
                    orderusers.userName = orderusers.userName;
                    orderusers.phoneNumber = orderusers.phoneNumber;
                    orderusers.email = orderusers.email;
    
                    ORDER_USER_DATA = vcui.clone(orderusers);
                }
    
                //월 납부 정보...
                if(data.monthlyPayment){
                    var monthpayment = data.monthlyPayment;
                    if(monthpayment.cardReqYn == "N") monthpayment.requsetCardInfo = monthpayment.cardReqYnName;
                    else{
                        monthpayment.requsetCardInfo = monthpayment.cardReqYnName;
                        var suffix = " - ";
                        if(monthpayment.cardCorpName != ''){
                            suffix = " ";
                            monthpayment.requsetCardInfo += " - " + monthpayment.cardCorpName;
                         }
                         
                         if(monthpayment.cardTypeName != ""){
                             monthpayment.requsetCardInfo += suffix + monthpayment.cardTypeName;                         
                         }
                    }
    
                    monthpayment.monthlyPriceInfo = monthpayment.prepayFlagNm;
                    if(monthpayment.pointUseYnName) monthpayment.monthlyPriceInfo += " / " + monthpayment.pointUseYnName;
    
    
                    if(monthpayment.transType == METHOD_BANK){
                        paymentMethod = "bank";
                        bankInfo = {
                            paymentBank: monthpayment.transCorpCode,
                            paymentBankNumber: monthpayment.transAccountNum,
                            paymentUserName: monthpayment.transMemName
                        }
                        cardInfo = {
                            paymentCard: "",
                            paymentCardNumber: "",
                            paymentCardPeriod: "",
                        }
                    } else{
                        paymentMethod = "card";
                        cardInfo = {
                            paymentCard: monthpayment.transCorpCode,
                            paymentCardNumber: monthpayment.transAccountNum,
                            paymentCardPeriod: monthpayment.transCardExpiry
                        }
                        bankInfo = {
                            paymentBank: "",
                            paymentBankNumber: "",
                            paymentUserName: monthpayment.transMemName,
                        }
                    }
                    cardValidation.setValues(cardInfo);
                    bankValidation.setValues(bankInfo);        
    
                    setDelectData($('.monthly-payment-modify').find('select[name=paymentCard]'), data.cardList, cardInfo.paymentCard);
                    setDelectData($('.monthly-payment-modify').find('select[name=paymentBank]'), data.bankList, bankInfo.paymentBank);
    
                    monthpayment.maskingTransAccountNum = monthpayment.transType == METHOD_BANK ? txtMasking.substr(monthpayment.transAccountNum, 6) : txtMasking.card(monthpayment.transAccountNum);
    
                    //납부정보 변경 버튼 유무..
                    if(monthpayment.cancelFlag == "Y") monthpayment.isChangePayment = false;
                    else{
                        var listData = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? CARE_LIST[0] : ORDER_LIST[0];
                        var cancelProdList = vcui.array.filter(listData.productList, function(item){
                            return item.itemStatus != "Cancel Refunded";
                        });
    
                        if(cancelProdList.length) monthpayment.isChangePayment = true;
                        else monthpayment.isChangePayment = false;
                    }
    
                    MONTHLY_PAYMENT_DATA = vcui.clone(monthpayment);
    
                    paymentBlockInit();
                }
    
                renderPage();
            }
        });
    }


    //정보변경 확인...
    function sendChangeConfirm(){
        var sendata = {confirmType: "PAYMENT"};

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(INFO_MODIFY_CONFIRM, sendata, function(result){
            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                })
            } else{
                if(lgkorUI.stringToBool(result.data.success)){
                    lgkorUI.confirm("납부정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까?", {
                        title: "납부정보 변경",
                        cancelBtnName: "취소",
                        okBtnName: "본인인증",
                        ok: function(){         
                            void(window.open("", "popupChk", "width=500, height=550, scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));
                            document.form_chk.action = result.data.niceAntionUrl;
                            document.form_chk.m.value = result.data.m;
                            document.form_chk.EncodeData.value = result.data.sEncData;
                            document.form_chk.auth_type.value = result.data.auth_type;
                            document.form_chk.param_r1.value = result.data.param_r1;
                            document.form_chk.param_r2.value = result.data.param_r2;
                            document.form_chk.param_r3.value = result.data.param_r3;
                            document.form_chk.target = "popupChk";
                            document.form_chk.submit();
    
                            // editPaymentInfomation();        
                        }
                    });
                }
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
    function fnNiceFail(msg){
        if(msg){
            lgkorUI.alert("", {
                title: msg
            })
        }
    }
    window.editPaymentInfomation = editPaymentInfomation;
    window.fnNiceFail = fnNiceFail;

    //납부카드/계좌 확인...
    function paymentMethodAbled(item){
        var chk = paymentFieldValidation();
        if(!chk) return false;
        
        paymentInfo = {};

        CERTI_ID = BATCH_KEY = "";

        var sendata;
        if($(item).hasClass('paymentCardConfirm')){
            sendata = cardValidation.getValues();
            sendata.confirmType = METHOD_CARD;
        } else{
            sendata = bankValidation.getValues();
            sendata.confirmType = METHOD_BANK;
        }
        
        lgkorUI.requestAjaxData(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.CERTI_ID) CERTI_ID = result.data.CERTI_ID;
            if(result.data.BATCH_KEY) BATCH_KEY = result.data.BATCH_KEY;

            if(lgkorUI.stringToBool(result.data.success)){
                paymentInfo = sendata.confirmType == METHOD_CARD ? cardValidation.getAllValues() : bankValidation.getAllValues();
            }

            sendPaymentMethod = sendata.confirmType;

            paymentMethodConfirm = result.data.success;

            /* BTOSCITE-98 add */
            if (vcui.detect.isIOS){
                arsAgree = "N";
                arsAgreeConfirm = "N";
                $('.arsAgreeRequestCheck').attr('disabled', true);
            }
            /* //BTOSCITE-98 add */
        });
    }
    //ARS출금동의 신청...
    var arsCallingInterval = null;
    var iosAgreeCallCheck = false;
    function setArsAgreeConfirm(){
        /* BTOCSITE-98 add */
        isClickedarsAgreeConfirmBtn = true;

        if (vcui.detect.isIOS){
            lgkorUI.showLoading();
        }

        $('.arsAgreeRequest').attr('disabled', true);
        clearTimeout(arsCallingInterval);
        arsCallingInterval = setTimeout(function(){
            $('.arsAgreeRequest').attr('disabled', false);
            if (vcui.detect.isIOS){
                lgkorUI.hideLoading();
            }
        }, 5000);
        /* //BTOCSITE-98 add */

        var chk = paymentConfirmYN();
        if(!chk) return;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return;
        }

        lgkorUI.showLoading();

        CTI_REQUEST_KEY = "";

        var sendata = sendPaymentMethod == METHOD_CARD ? cardValidation.getValues() : bankValidation.getValues();
        arsAgree = "N";

        // BTOCSITE-98 add
        if (vcui.detect.isIOS){
            $('.arsAgreeRequestCheck').attr('disabled', false);
            arsAgreeConfirm = "N";
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
        } else {
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
            //arsAgree = result.data.success;                    
        }

        /* 
        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_URL, 180000, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });
            
            // BTOCSITE-98 add
            if (vcui.detect.isIOS){
                $('.arsAgreeRequestCheck').show();
                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
            } else {
                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                arsAgree = result.data.success;
                $('.arsAgreeRequestCheck').hide();
            }
            // //BTOCSITE-98 add
            
        }, ajaxMethod, null, true); */

        if(vcui.detect.isIOS) {
            if(!iosAgreeCallCheck ) {
                iosAgreeCallCheck = true;
                setTimeout(function (){
                    $.ajax({
                        method : ajaxMethod,
                        url : ARS_AGREE_URL,
                        data : sendata,
                        async : false,
                        success : function(result){
                            if ( !vcui.detect.isIOS ){
                                lgkorUI.alert(result.data.alert.desc, {
                                    title: result.data.alert.title
                                });
                            }             
                            
                            //alert('result.data.CTI_REQUEST_KEY', result.data.CTI_REQUEST_KEY);
                            // BTOCSITE-98 add
                            if (vcui.detect.isIOS){
                                //$('.arsAgreeRequestCheck').attr('disabled', false);
                                arsAgree = result.data.success;
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                                arsAgreeConfirm = "N";
                            } else {
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                                arsAgree = result.data.success;                    
                            }                
                            // //BTOCSITE-98 add
                            iosAgreeCallCheck = false;
                        },
                        error : function(error){
                            //alert('error');
                            iosAgreeCallCheck = false;
                        },
                        complete : function(){
                            //alert('complete');
                            lgkorUI.hideLoading();
                            iosAgreeCallCheck = false;
                        }
                    });
                },1000);
            }
        } else {
            $.ajax({
                method : ajaxMethod,
                url : ARS_AGREE_URL,
                data : sendata,
                async : false,
                success : function(result){
                    if ( !vcui.detect.isIOS ){
                        lgkorUI.alert(result.data.alert.desc, {
                            title: result.data.alert.title
                        });
                    }             
                    
                    //alert('result.data.CTI_REQUEST_KEY', result.data.CTI_REQUEST_KEY);
                    // BTOCSITE-98 add
                    if (vcui.detect.isIOS){
                        //$('.arsAgreeRequestCheck').attr('disabled', false);
                        arsAgree = result.data.success;
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                        arsAgreeConfirm = "N";
                    } else {
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                        arsAgree = result.data.success;                    
                    }                
                    // //BTOCSITE-98 add
                },
                error : function(error){
                    //alert('error');
                },
                complete : function(){
                    //alert('complete');
                    lgkorUI.hideLoading();
                }
            });
        }
    }
    // ARS 출금동의요청 체크 :: BTOCSITE-98 add
    var arsConfirmCallingInterval = null;
    function arsAgreeConfirmCheck(){
        isClickedarsAgreeConfirmCheckBtn = true;
        $('.arsAgreeRequestCheck').attr('disabled', true);
        // clearTimeout(arsConfirmCallingInterval);
        // arsConfirmCallingInterval = setTimeout(function(){
        //     $('.arsAgreeRequestCheck').attr('disabled', false);
        // }, 3000);

        lgkorUI.showLoading();

        //CTI_REQUEST_KEY = "";
        arsAgreeConfirm = "N";

        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_CHECK_URL, 180000, {}, function(result){
            //console.log('출금동의요청 체크 결과', result);
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
            arsAgreeConfirm = result.data.success;

            if (arsAgreeConfirm == "N"){
                arsAgree = "N";
            }
            
        }, ajaxMethod, null, true);
        
    }
    //납부 정보변경 취소...
    function savePaymentInfoCancel(){
        cardValidation.setValues(cardInfo);
        $('.ui_card_number').vcFormatter('update');

        bankValidation.setValues(bankInfo);

        paymentBlockInit();
    }    
    //납부변경 초기화...
    function paymentBlockInit(){        
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
        var chk = paymentInfoValidation();
        if(chk){
            var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST[0] : CARE_LIST[0];

            var sendata = {
                confirmType: sendPaymentMethod,
                CERTI_ID: CERTI_ID,
                BATCH_KEY: BATCH_KEY,
                CTI_REQUEST_KEY: CTI_REQUEST_KEY,

                requestNo: listData.requestNo,
                custRegNo: MONTHLY_PAYMENT_DATA.custRegNo,
                transMemName: MONTHLY_PAYMENT_DATA.transMemName
            }
            for(var key in paymentInfo) sendata[key] = paymentInfo[key];
            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(PAYMENT_SAVE_URL, sendata, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    requestOrderInquiry();
                }
            });
        } 
    }

    function renderPage(){


        if(TAB_FLAG == TAB_FLAG_RECORD) setRecordContents();
        else setOrderListContents();

        setStepInfoStatus();

        if(PAGE_TYPE == PAGE_TYPE_CAREDETAIL){
            $('.contents.mypage').find('.inner-box.shipping').remove();
            $('.contents.mypage').find('.inner-box.payment').remove();
            $('.contents.mypage').find('.inner-box.orderuser').remove();
        } else{
            orderInfoRender($('.contents.mypage'), SHIPPING_DATA, PAYMENT_DATA);
        }        


        //주문자 정보
        $listBox = $('.contents.mypage').find('.inner-box.orderuser');
        if($listBox.length > 0) {
            leng = Object.keys(ORDER_USER_DATA).length;
            if(leng){
                $listBox.show().find('ul').html(vcui.template(orderUserTemplate, ORDER_USER_DATA));
            } else{
                $listBox.hide();
            }
        }

        //납부정보
        var $listBox = $('.contents.mypage').find('.inner-box.monthly-payment');
        if($listBox.length > 0) {
            leng = Object.keys(MONTHLY_PAYMENT_DATA).length;
            if(leng){
                if(MONTHLY_PAYMENT_DATA.isChangePayment) $listBox.find('.changePayment-btn').show();
                else $listBox.find('.changePayment-btn').hide();
                
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


        /* BTOCSITE-98 add */
        if (vcui.detect.isIOS){
            $('.arsAgreeRequestCheck').attr('disabled', true).show();
            $('#iostxt').show();
        }

    }

    //주문정보 렌더링...
    function orderInfoRender(wrap, shippingData, paymentData, prodorderinfo){
        var template;
        //배송정보
        var $listBox = wrap.find('.inner-box.shipping');
        if($listBox.length > 0) {
            var leng = shippingData ? Object.keys(shippingData).length : 0;
            if(leng){
                template = PAGE_TYPE == PAGE_TYPE_CAREDETAIL ? careShippingListTemplate : shippingListTemplate;

                if(!shippingData.installPlaceNm) shippingData.installPlaceNm = "";
                if(!shippingData.instReqDate) shippingData.instReqDate = "";
                if(!shippingData.shippingNoteTxt) shippingData.shippingNoteTxt = "";

                $listBox.show().find('ul').html(vcui.template(template, shippingData));
            } else{
                $listBox.hide();
            }
        }

        //결제정보
        $listBox = wrap.find('.inner-box.payment');
        if($listBox.length > 0) {
            var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST[0] : CARE_LIST[0];
            
            leng = paymentData ? Object.keys(paymentData).length : 0;
            
            var isRender = false;
            if(PAGE_TYPE == PAGE_TYPE_CAREDETAIL){
                if(listData.contDtlType == "C01") isRender = true;
            } else isRender = true;

            if(isRender && leng){
                if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) template = noneMemPaymentTemplate;
                else if(PAGE_TYPE == PAGE_TYPE_CAREDETAIL) template = carePaymentListTemplate;
                else template = paymentListTemplate;

                console.log("paymentData:",paymentData)

                $listBox.show().find('ul').html(vcui.template(template, paymentData));
            } else{
                $listBox.hide();
            }
        }

        //제품 주문 정보
        $listBox = wrap.find('.inner-box.prodOrderInfo');
        if(prodorderinfo && TAB_FLAG == TAB_FLAG_CARE && $listBox.length > 0) {                
            leng = prodorderinfo ? Object.keys(prodorderinfo).length : 0;

            if(leng){
                $listBox.show().find('ul').html(vcui.template(productOrderInfoTemplate, prodorderinfo));
            } else{
                $listBox.hide();
            }
        }
    }

    //배송정보 데이터 추가 정의
    function resetShippingData(data){
        var newdata = vcui.clone(data);
        newdata.maskingName = data.name;
        newdata.maskingAddress = data.city + " " + data.street;
        newdata.maskingTelephone = data.telephone;
        newdata.maskingTelephonenumber = data.telephonenumber;
        newdata.instpectionVisit = lgkorUI.stringToBool(data.instpectionVisit);
        newdata.recyclingPickup = lgkorUI.stringToBool(data.recyclingPickup);

        newdata.isBeforeVisit = PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL ? false : true;

        return newdata;
    }
    //결제정보 데이터 추가 정의...
    function resetPaymentData(data, orderReceiptAbleYn){
        var payment = vcui.clone(data);
        payment.orderPrice = vcui.number.addComma(payment.originalTotalPrice);
        payment.discountPrice = vcui.number.addComma(payment.discount);
        payment.memberShipPoint = vcui.number.addComma(payment.membershipPoint);
        payment.totalPrice = vcui.number.addComma(payment.grandTotal);

        if(orderReceiptAbleYn != "Y") payment.receiptUrl = "";

        return payment;
    }

    //청약 주문상세 팝업
    function openOrderInfoPop(dataId, prodId, opener){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var productList = listData[dataId].productList[prodId];
        var shipping;

        //배송정보
        if(productList.shipping) {
            shipping = resetShippingData(productList.shipping);
        }

        //결제정보
        var leng = Object.keys(productList.paymentMethod).length;
        if(leng && listData[dataId].orderReceiptAbleYn != "Y") productList.paymentMethod.receiptUrl = "";
        
        orderInfoRender($('#popup-orderDetailView'), shipping, productList.paymentMethod, productList.orderShipping);

        $('#popup-orderDetailView').vcModal({opener:opener});
    }

    //주문접수...
    function setOrderRequest(dataId, prodId){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST[dataId] : CARE_LIST[dataId];
        // var productList = vcui.array.map(listData.productList, function(item, idx){
        //     return{
        //         orderedQuantity: item.orderedQuantity,
        //         reqLineSeq: item.reqLineSeq,
        //         productNameEN: item.productNameEN
        //     }
        // });

        var prodlist = listData.productList[prodId];
        var productList = [{
            orderedQuantity: prodlist.orderedQuantity,
            reqLineSeq: prodlist.reqLineSeq,
            productNameEN: prodlist.productNameEN,
        }];

        var sendata = {
            contDtlType: listData.contDtlType,
            requestNo: listData.requestNo,
            email: listData.email,

            productList: JSON.stringify(productList)
        }
        
        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_REQUEST_URL, sendata, function(result){
            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                })
            } else{
                if(result.data.obsDirectPurchaseUrl){
                    location.href = result.data.obsDirectPurchaseUrl;
    
                    return;
                }
    //
                if(result.data.success == "Y"){
                    var box = $('.box[data-id=' + dataId + ']');
                    var prodbox = box.find('.tbody .row .col-table[data-prod-id=' + prodId + ']');
                    prodbox.find('.col2 .state-box').empty().html('<p class="tit "><span class="blind">진행상태</span>주문접수</p><p class="desc">제품 주문은 자동으로 진행됩니다.</p>');
                } else{
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }  
            }          
        });   
    }

    //환불계좌 확인...
    function sendBankConfirm(popname){
        if(!getBankBnumberValidation(popname)) return;

        var sendata = {
            confirmType: "bank",
            paymentUser: $('#'+popname).data('userName'),
            paymentBankNumber: $('#'+popname).find('.bank-input-box input').val(),
            paymentBank: $('#'+popname).find('.bank-input-box select option:selected').val()
        }

        if($('#'+popname).data('isBirthDt')) sendata.birthDt = $('#' + popname).find('input[name=birthDt]').val();
        
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                })
            } else{
                lgkorUI.alert("",{
                    title: result.data.alert.title
                });
    
                if(result.data.success == "Y"){
                    popBankConfirm = true;
                    popBankInfo = {
                        paymentBankNumber: sendata.paymentBankNumber,
                        paymentBank: sendata.paymentBank
                    }
                } else{
                    popBankConfirm = false;
                }
            }
        });    
    }
    //취소/반품 신청을 위한 데이터 요정...후 팝업 열기
    function getPopOrderData(dataId, calltype, opener){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var memInfos = lgkorUI.getHiddenInputData();
        var orderNumber = listData[dataId].orderNumber;
        var requestNo = listData[dataId].requestNo;
        var apiType = listData[dataId].apiType;

        var prodlist = listData[dataId].productList;
        var orderNumbers = [];
        for(var idx in prodlist) orderNumbers.push(prodlist[idx].orderNumber);

        var sendata = {
            callType: calltype,
            orderNumber: orderNumber,
            requestNo: requestNo,
            apiType: apiType,
            tabFlag: TAB_FLAG,

            orderNumberList: JSON.stringify(orderNumbers),
            
            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }
        
        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_CANCEL_POP_URL, sendata, function(result){
            lgkorUI.hideLoading();

            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                });

                return;
            }
            
            if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) result.data.listData = [result.data.listData];

            PRICE_INFO_DATA = [];
            POP_PROD_DATA = [];
            var popup;
            var infoTypeName;
            var originalTotalPrices = 0;
            var discountPrices = 0;
            var mempointPrices = 0;
            var productTotalPrices = 0;
            var getListData = TAB_FLAG == TAB_FLAG_ORDER ? result.data.listData : result.data.careListData;
            var productList = getListData[0].productList;
            var dataChk = $('#popup-cancel').hasClass('data-chk');
            if(calltype == "ordercancel"){
                popup = $('#popup-cancel');
                infoTypeName = "취소";
                
                addPopProdductList(popup, productList, true);
                var $firstTab = $('.new-type .tabs').find("li").eq(0); //BTOCSITE-4124 수정 210906
                var isAllChecked = false;
                if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL && productList[0].itemStatus == "Ordered") {
                    isAllChecked = true;
                }else if(getListData[0].bundleCancelYn && getListData[0].bundleCancelYn == "Y") {
                    isAllChecked = true;
                }else if($firstTab.hasClass == true && result.data.payment.paymentType != undefined && result.data.payment.paymentType != null && result.data.payment.paymentType != "null") { //210906 BTOCSITE-4124 수정
                    if(result.data.payment.paymentType == "41" || result.data.payment.paymentType == "42" || result.data.payment.paymentType == "0") {
                        isAllChecked = true; //추가 210824 BTOCSITE-4124
                    }
                }else {
                    isAllChecked = false; // 210824 추가 BTOCSITE-4124
                }
                // isAllChecked = false //210824 수정 BTOCSITE-4124 
                
                //210824 수정 BTOCSITE-4124 - Start
                if(isAllChecked){
                    for(var idx in PRICE_INFO_DATA){
                        if(productList[idx].itemCancelAbleYn != "N"){
                            originalTotalPrices += PRICE_INFO_DATA[idx].originalTotalPrice;
                            discountPrices += PRICE_INFO_DATA[idx].discountPrice;
                            mempointPrices += PRICE_INFO_DATA[idx].mempointPrice;
                            productTotalPrices += PRICE_INFO_DATA[idx].productTotalPrice;
                        }
                    }
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('update');
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setAllChecked');
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setDisenabled', true);
                    $('#popup-cancel').on('change.disabled', '.ui_all_checkbox input[type=checkbox]',function(e){
                        e.preventDefault();
                        
                        $(this).prop('checked', true);
                    });
                } else {
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('update');
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
                    $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('setDisenabled', false);
                    $('#popup-cancel').off('change.disabled');
                }
                //210824 수정 BTOCSITE-4124 - End
                
                $('#popup-cancel').find('#cancelReason option').prop('selected', false);
                $('#popup-cancel').find('#cancelReason option').eq(0).prop('selected', true);
                $('#popup-cancel').find('#cancelReason').vcSelectbox('update');
                $('#popup-cancel').find('textarea').attr('disabled', "disabled").val('');

                $('#popup-cancel').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', false);
                
                // BTOCSITE-1775
                var isAllCancelDisable = true;  // 모두 취소 불가능
                //210824 BTOCSITE-4124 - S
                var isCashCheck = "";
                
                productList.forEach(function( data ){
                    //BTOCSITE-4124 수정 210906
                    if($firstTab.hasClass("on") == true){
                        if(data.itemCancelAbleYn == "Y" && (result.data.payment.paymentType == "41" || result.data.payment.paymentType == "42" || result.data.payment.paymentType == "0")){ //BTOCSITE-4124 210824 추가 41:계좌이체 / 42:네이버페이 / 0:기타
                        isAllCancelDisable = true;
                        isCashCheck = "현금결제"; 
                        } else { 
                            isAllCancelDisable = false;
                        }
                    }
                    //BTOCSITE-4124 수정 210906
                    
                });
// BTOCSITE 4124 210906 수정
//                 if (isAllCancelDisable == true){
//                     $('#popup-cancel').find('.ui_all_checker').prop('disabled', true);
//                     $('#popup-cancel').find('#cancel_desc').hide();
//                     $('#popup-cancel').find('.pop-footer').hide();
//                     $('#popup-cancel').find('.not-cancel-footer').show();
//                 } else 
                if(dataChk == false && isAllChecked == true && isAllCancelDisable == true && isCashCheck == "현금결제"){ 
                    $('#popup-cancel').find('.ui_all_checker').prop('disabled', true);
                    $('#popup-cancel').find('.cancel-select input[type=checkbox]').prop('disabled',true);
                    $('#popup-cancel').find('#cancelPopAgree').prop('disabled',true);
                    $('#popup-cancel').find('.pop-footer').show();
                    $('#popup-cancel').find('.not-cancel-footer').hide();
                    $('#popup-cancel').addClass('cash-chk');
                } else if(dataChk == true && isAllChecked == true && isAllCancelDisable == true && isCashCheck == "현금결제"){
                    $('#popup-cancel').find('.ui_all_checker').prop('disabled', false);
                    $('#popup-cancel').find('#cancel_desc').show();
                    $('#cancel_desc').find('.cancelReasonField').prop('disabled', false);
                    $('#popup-cancel').find('#cancelPopAgree').prop('disabled',false);
                    $('#popup-cancel').find('.state-box > p.tit').html('<span class="blind">진행상태</span>결제완료');
                    $('#popup-cancel').find('.pop-footer').show();
                    $('#popup-cancel').find('.not-cancel-footer').hide();
                } else {
                    $('#popup-cancel').find('.ui_all_checker').prop('disabled', false);
                    $('#popup-cancel').find('#cancel_desc').show();
                    $('#popup-cancel').find('#cancelPopAgree').prop('disabled',false);
                    $('#popup-cancel').find('.pop-footer').show();
                    $('#popup-cancel').find('.not-cancel-footer').hide();
                }
                //210824 BTOCSITE-4124 - S
                // //BTOCSITE-1775
            } else{
                popup = $('#popup-takeback');
                infoTypeName = "반품";

                isCheck = false;

                var prodId = popup.data('prodId');

                var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
                productList = vcui.array.filter(productList, function(item, idx){
                    return item.modelID == listData[dataId].productList[prodId].modelID;
                });
                
                addPopProdductList(popup, productList, false);
                
                originalTotalPrices = productList[0].originalTotalPrice ? parseInt(productList[0].originalTotalPrice) : 0;
                discountPrices = productList[0].discountPrice ? parseInt(productList[0].discountPrice) : 0;
                mempointPrices = productList[0].memberShipPoint ? parseInt(productList[0].memberShipPoint) : 0;
                productTotalPrices = productList[0].productTotalPrice ? parseInt(productList[0].productTotalPrice) : 0;

                $('#popup-takeback').find('.info-tbl-wrap .info-wrap .infos').empty().append("<li>주문일<em>" + listData[dataId].orderDate + "</em></li>");
               
                $('#popup-takeback').find('#slt01 option').prop('selected', false);
                $('#popup-takeback').find('#slt01 option').eq(0).prop('selected', true);
                $('#popup-takeback').find('#slt01').vcSelectbox('update');
                $('#popup-takeback').find('textarea').attr('disabled', "disabled").val('');

                //$('#popup-takeback').find('.pop-footer .btn-group button:nth-child(2)').prop('disabled', false);
            }

            var thname = TAB_FLAG == TAB_FLAG_CARE ? "요금정보" : "결제금액";
            popup.find(".tbl-layout.sizeType3 .thead .th.col2").text(thname);
            
            popup.find('input[name=cancelPopAgree]').prop('checked', false);
            popup.find('input[name=takebackPopAgree]').prop('checked', false);

            var modeltypes = vcui.array.filterOne(productList, function(item){
                return item.modelType == "소모품(A)";
            });
            if(modeltypes) $('.supplies-notify').show();
            else $('.supplies-notify').hide();            

            //취소/반품 정보...
            popup.find('.sect-wrap.cnt01').empty().eq(1).remove();

            var isPriceBlock = true;
            if(TAB_FLAG == TAB_FLAG_CARE && productList[0].contDtlType != "C01") isPriceBlock = false;

            if(isPriceBlock){
                popup.find('.sect-wrap.cnt01').show();
                var discountComma = vcui.number.addComma(mempointPrices);
                var isMemberShip = productList[0].memberShipPoint != "0" ? true : false;
                var template = PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL ? nonememPriceInfoTemplate : priceInfoTemplate;
                popup.find('.sect-wrap.cnt01').append(vcui.template(template, {
                    typeName: infoTypeName,
                    isMemberShip: isMemberShip,
                    originalTotalPrices: vcui.number.addComma(originalTotalPrices),
                    discountPrices: vcui.number.addComma(discountPrices),
                    mempointPrices: discountComma == "0" ? "0" : discountComma,
                    productTotalPrices: vcui.number.addComma(productTotalPrices)
                }));

                popup.data('isAgreeChk', true);
                popup.find('.cancel-agree-box').show();
            } else{
                popup.find('.sect-wrap.cnt01').hide();

                popup.data('isAgreeChk', false);
                popup.find('.cancel-agree-box').hide();
            }

            var bankInfoBlock = popup.find('.sect-wrap > .form-wrap > .forms:nth-child(2)');
            
            if((result.data.payment && dataChk == true && isAllChecked == true && isAllCancelDisable == true && isCashCheck == "현금결제") || (result.data.payment && Object.keys(result.data.payment).length && result.data.payment.transType == METHOD_BANK && productList[0].itemStatus != "Ordered")){ //210826 추가 BTOCSITE-4124
                popup.data('isBank', true);

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

                var uname, isBirthDt = false;
                if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL) isBirthDt = true, uname = result.data.orderUser.userName;
                else uname = result.data.payment.bankAccountNm;
                popup.data('isBirthDt', isBirthDt);
                popup.data("userName", uname);
                popup.find('input[name=bankUserName]').val(uname);

                bankInfoBlock.show();
            } else{
                popup.data('isBank', false);
                bankInfoBlock.hide();
            }

            popBankInfo = {};
            popBankConfirm = false;

            popup.vcModal({opener:opener});
        });     
    }
    //취소/반품 팝업 리스트 추가
    function addPopProdductList(popup, productList, isCheck){
        var prodListWrap = popup.find('.info-tbl-wrap .tbl-layout .tbody').empty();   
        var prodPriceKey = TAB_FLAG == TAB_FLAG_CARE ? "years1TotAmt" : "rowTotal";
        for(var idx in productList){
            var listdata = productList[idx];
            listdata["prodID"] = idx;
            
            if(TAB_FLAG == TAB_FLAG_CARE) listdata["addCommaProdPrice"] = "월 " + vcui.number.addComma(listdata[prodPriceKey]);
            else listdata["addCommaProdPrice"] = vcui.number.addComma(listdata[prodPriceKey]);

            var originalTotalPrice = listdata.originalTotalPrice ? parseInt(listdata.originalTotalPrice) : 0;
            var discountPrice = listdata.discountPrice ? parseInt(listdata.discountPrice) : 0;
            var mempointPrice = listdata.memberShipPoint ? parseInt(listdata.memberShipPoint) : 0;
            var productTotalPrice = listdata.productTotalPrice ? parseInt(listdata.productTotalPrice) : 0;
        
            PRICE_INFO_DATA.push({
                originalTotalPrice: originalTotalPrice,
                discountPrice: discountPrice,
                mempointPrice: mempointPrice,
                productTotalPrice: productTotalPrice
            });

            POP_PROD_DATA.push({
                productNameKR: listdata.productNameKR,
                productNameEN: listdata.productNameEN,
                orderedQuantity: listdata.orderedQuantity,
                orderNumber: listdata.orderNumber
            });

            listdata.specList = vcui.array.filter(listdata.specList, function(item){
                var chk = item != null && item != "null" && item != undefined && item != "" ? true : false;
                return chk;
            });

            var disabled = listdata.itemCancelAbleYn == "N" ? "disabled" : "";
            prodListWrap.append(vcui.template(prodListTemplate, {listData:listdata, disabled:disabled, isCheck:isCheck, isBtnSet:false, isQuantity:true}));
        }
    }
    //반품 정보 요청...후 팝업 열기.
    function openTakebackPop(dataId, prodId, opener){
        $('#popup-takeback').data('dataId', dataId);
        $('#popup-takeback').data('prodId', prodId);

        getPopOrderData(dataId, "orderreturn", opener);
    }
    //취소 정보 요청...후 팝업열기.
    function openCancelPop(dataId){
        $('#popup-cancel').data('dataId', dataId);

        getPopOrderData(dataId, "ordercancel", opener); 
    }
    //반품신청...
    function takebackOk(){
        var productList = [POP_PROD_DATA[0]];
        var matchIds = [0];
        
        setCancelTakebackData('popup-takeback', productList, matchIds);
    }
    //취소신청...
    function cancelOk(){
        var productList = [];
        var matchIds = [];
        var chkData = $('#popup-cancel').hasClass('data-chk'); //210825 추가 BTOCSITE-4124
        var chkItems = $('#popup-cancel').find('.ui_all_checkbox').vcCheckboxAllChecker('getCheckItems');
        chkItems.each(function(idx, item){
            var id = $(item).val();
            productList.push(POP_PROD_DATA[id]);

            matchIds.push(id);
        });
                
        
        setCancelTakebackData('popup-cancel', productList, matchIds);
    }
    //취소/반품 공통 SUBMIT...
    function setCancelTakebackData(popname, prodlist, matchIds){
        var popup = $('#'+popname);

        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var dataId = popup.data('dataId');    
        
        var orderNumber = listData[dataId].orderNumber;
        var requestNo = listData[dataId].requestNo;
        var apiType = listData[dataId].apiType;

        var memInfos = lgkorUI.getHiddenInputData();

        var bankName = "";
        var bankAccountNo = "";
        var paymentUser = "";
        var birthDt = "";
        if(popup.data("isBank")){
            bankName = popup.find('.bank-input-box select option:selected').val();
            bankAccountNo = popup.find('.bank-input-box input').val();

            paymentUser = popup.data('userName');

            birthDt = popup.data('isBirthDt') ? popup.find('input[name=birthDt]').val() : "";
        }

        var reasonId = popname == "popup-cancel" ? "cancelReason" : "slt01";
        var selectReason = popup.find('#'+reasonId + ' option:selected').val();
        var writeReason = popup.find('textarea').val();
        var reason = writeReason ? writeReason : selectReason;

        var sendata = {
            callType: popname == "popup-cancel" ? "ordercancel" : "orderreturn",

            orderNumber: orderNumber,
            requestNo: requestNo,
            apiType: apiType,
            tabFlag: TAB_FLAG,

            paymentUser: paymentUser,
            birthDt: birthDt,

            bankName: bankName,
            bankAccountNo: bankAccountNo,

            reason: reason,

            sendOrderNumber: memInfos.sendOrderNumber,
            sendInquiryType: memInfos.sendInquiryType,
            sendUserName: memInfos.sendUserName,
            sendUserEmail: memInfos.sendUserEmail,
            sendPhoneNumber: memInfos.sendPhoneNumber
        }

        var sendRealData;
        if(PAGE_TYPE == PAGE_TYPE_NONMEM_DETAIL){
            sendRealData = sendata;
            sendRealData.productList = JSON.stringify(prodlist)
        } else{

            var newProductList = {};
            for(var idx in prodlist){
                var ordernum = prodlist[idx].orderNumber;
                if(!ordernum) ordernum = "noneOrderNumber";

                var match = "";
                for(var str in newProductList){
                    if(ordernum == str){
                        match = str;
                        break;
                    }
                }
    
                if(match == ""){
                    newProductList[ordernum] = [prodlist[idx]];
                } else{
                    newProductList[match].push(prodlist[idx]);
                }
            }
    
            var orderList = [];
            for(var key in newProductList){
                var clonedata = vcui.clone(sendata);
                clonedata.orderNumber = key;
                clonedata.productList = JSON.stringify(newProductList[key]);
                orderList.push(clonedata);
            }

            sendRealData = {
                orderList: JSON.stringify(orderList)
            }
        }
        
        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ORDER_SAILS_URL, sendRealData, function(result){
            lgkorUI.hideLoading();

            //BTOCSITE-4124 210902 수정
            if(result.status != "fail" && result.data.success == "Y" && result.data.msg =="VC1001") {

            } else {
                popup.vcModal('close');
            }
            //BTOCSITE-4124 210902 수정

            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                });
            } else{
                if(result.data.success == "N"){
                    if(result.data.alert){
                        lgkorUI.alert("", {
                            title: result.data.alert.title
                        });
                    } else{
                        lgkorUI.alert("", {
                            title: "취소신청에 실패하였습니다.<br>잠시 후 다시 시도해 주세요."
                        });
                    }
                } else{
                    if(PAGE_TYPE == PAGE_TYPE_LIST){
                        var box = $('.box[data-id=' + dataId + ']');
                        box.find('.orderCancel-btn, .requestOrder-btn').remove();
    
                        var resultMsg = sendata.callType == "ordercancel" ? "취소접수" : "반품접수";
                        // if( result.data.msg == "VC1001") {
                        //      resultMsg = sendata.callType == "ordercancel" ? "주문 접수" : "반품접수";
                        // }

                        for(var idx in matchIds){
                            var block = box.find('.tbody .row').eq(matchIds[idx]);
                            block.find('.col-table .col2 .state-box').empty().html('<p class="tit "><span class="blind">진행상태</span>' + resultMsg + '</p>');
                        }
                    } else reloadOrderInquiry();
                    
                    // BTOCSITE-4124 현금결제, 입금확인 대상자 체크 210823 - S
                    var flagChk = $('#popup-cancel').hasClass('cash-chk');
                    if(result.data.msg == "VC1001"){
                        if(flagChk == true){
                            lgkorUI.alert("", {
                                title: "현금(가상계좌) 입금이 확인되어 즉시 취소가 불가합니다.<br>주문취소 신청을 하시겠습니까? ",
                                ok: function(){
                                $('#popup-cancel').removeClass('cash-chk');
                                $('#popup-cancel').addClass('data-chk');
                                var dataID = $('#popup-cancel').data('dataId');
                                getPopOrderData(dataId, "ordercancel", opener); 
                                popup.vcModal('close');//BTOCSITE-4124 210902 수정
                                //cancelSubmit();
                                }
                            });                       
                        }
                    }
                    // BTOCSITE-4124 현금결제, 입금확인 대상자 체크 210823 - E
                }
            }
        });
    }

    //영수증 발급내역...
    function setReceiptListPop(opener){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var method = PAYMENT_DATA.transType == METHOD_CARD ? "카드영수증" : "현금영수증";
        if(PAYMENT_DATA.transType == METHOD_BANK && listData[0].cashReceiptAbleYn != "Y") method = "";
        var header = $(vcui.template(receiptHeaderTemplate, {receiptUrl:PAYMENT_DATA.receiptUrl, method:method})).get(0);
        $('#popup-receipt-list').find('.sect-wrap').empty().append(header);

        var isQuantity = TAB_FLAG == TAB_FLAG_ORDER ? true : false;
        for(var cdx in listData[0].productList){
            var prodlist = vcui.clone(listData[0].productList[cdx]);
            prodlist.statusButtonList = [];
            var years1TotAmt = prodlist.years1TotAmt ? prodlist.years1TotAmt : "0";
            prodlist.addCommaMonthlyPrice = vcui.number.addComma(years1TotAmt);
            $(header).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist, disabled:"", isCheck:false, isMonthlyPrice:false, isBtnSet:false, isQuantity:isQuantity}));
        }
        
        $('#popup-receipt-list').vcModal({opener:opener});
    }
    //거래 영수증 팝업...
    function setSalesReceiotPop(opener){
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST[0] : CARE_LIST[0];

        receiptdata = {};
        receiptdata.orderNumber = listData.groupNumber;
        receiptdata.orderDate = listData.orderDate;
        receiptdata.productName = listData.productList[0].productNameKR;
        if(listData.productList.length > 1) receiptdata.productName += " 외 " + (listData.productList.length-1) + "건";
        receiptdata.totalPrice = PAYMENT_DATA.totalPrice + "원";
        receiptdata.paymentMethod = PAYMENT_DATA.paymentMethodName;
        receiptdata.orderUser = SHIPPING_DATA.maskingName;

        receiptdata.progressState = listData.productList[0].itemStatus == "Cancel Refunded" ? "취소 완료" : "";

        $('#popup-salesReceipt').find('.tb-col table tbody').empty().append(vcui.template(receiptPopInfoTemplate, receiptdata));
        $('#popup-salesReceipt').vcModal({opener:opener});
    }
    //카드/현금 영수증 팝업...
    function setMethodReceiptPop(){

    }
    //상품 클릭...
    function setProductStatus(dataId, prodId, pdpUrl){
        //리스트에서는 상품 이미지에서만 체크..go pdp
        //상세보기 둘다 체크후..go pdp
        //리스트에서는 네임은 상세로...go detail
        
        var listData = TAB_FLAG == TAB_FLAG_ORDER ? ORDER_LIST : CARE_LIST;
        var sendata = {
            "sku": listData[dataId].productList[prodId].productNameEN,
            contDtlType: listData[dataId].productList[prodId].contDtlType,
            tabFlag: TAB_FLAG,
            rtModelSeq: listData[dataId].productList[prodId].rtModelSeq
        }

        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(PRODUCT_STATUS_URL, sendata, function(result){
            if(result.status == "fail"){
                lgkorUI.alert("", {
                    title: result.message
                })
            } else{
                if(result.data.success == "N"){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                } else{
                    location.href = pdpUrl;
                }
            }
        });
    }

    //주문/배송 목록가기...
    function sendListPage(){

    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})()