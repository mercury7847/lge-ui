(function() {
    var ORDER_INQUIRY_LIST_URL;

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
                    '{{#each item in productList}}'+
                    '<div class="row {{item.orderStatus.disabled}}">'+
                        '<div class="col-table" data-prod-id="{{item.prodID}}">'+
                            '<div class="col col1">'+
                                '<span class="blind">제품정보</span>'+
                                '<div class="product-info">'+
                                    '<div class="thumb">'+
                                        '<a href="{{item.productPDPurl}}"><img src="{{item.productImage}}" alt="{{item.productNameKR}}"></a>'+
                                    '</div>'+
                                    '<div class="infos">'+
                                        '{{#if item.productFlag}}<div class="flag-wrap"><span class="flag">{{item.productFlag}}</span></div>{{/if}}'+
                                        '<p class="name"><a href="{{item.productDetailUrl}}"><span class="blind">제품명</span>{{item.productNameKR}}</a></p>'+
                                        '<p class="e-name"><span class="blind">영문제품번호</span>{{item.productNameEN}}</p>'+
                                        '{{#if item.specList && item.specList.length > 0}}'+
                                        '<div class="more">'+
                                            '<span class="blind">제품스펙</span>'+
                                            '<ul>'+
                                                '{{#each spec in item.specList}}'+
                                                '<li>{{spec}}</li>'+
                                                '{{/each}}'+                     
                                            '</ul>'+
                                        '</div>'+
                                        '{{/if}}'+
                                        '{{#if item.productTotal}}<p class="count">수량 : {{item.productTotal}}</p>{{/if}}'+
                                    '</div>'+
                                    '<p class="price">'+
                                        '<span class="blind">구매가격</span>{{item.productPrice}}원'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col col2">'+
                                '<div class="state-box">'+
                                    '<p class="tit {{item.orderStatus.statusClass}}"><span class="blind">진행상태</span>{{item.orderStatus.statusText}}</p>'+
                                    '{{#if item.orderStatus.statusDate !=""}}<p class="desc">{{item.orderStatus.statusDate}}</p>{{/if}}'+
                                    '{{#if item.statusButtonList && item.statusButtonList.length > 0}}'+
                                    '<div class="state-btns">'+
                                        '{{#each status in item.statusButtonList}}'+
                                        '<a href="#n" class="btn size border stateInner-btn" data-type="{{status.className}}"><span>{{status.buttonName}}</span></a>'+
                                        '{{/each}}'+
                                    '</div>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '{{/each}}'+
                '</div>'+
            '</div>'+
            '{{#if cancelAbled == "Y"}}'+
            '<a href="#n" class="btn-link orderCancel-btn">취소신청</a>'+
            '{{/if}}'+
            '<div class="btns">'+
                '<a href="#n" class="btn-link">주문/배송 상세보기</a>'+
            '</div>'+
        '</div>';

    var CURRENT_PAGE, TOTAL_PAGE;

    var ORDER_LIST;

    function init(){
        console.log("Order Inquiry Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar', 'ui/datePeriodFilter'], function () {             
            setting();
            bindEvents();

            var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
            requestOrderInquiry(dateData.startDate, dateData.endDate);
        });
    }

    function setting(){
        ORDER_INQUIRY_LIST_URL = $('.contents.mypage').data('orderInquiryList');
        
        $('.inquiryPeriodFilter').vcDatePeriodFilter();
    }

    function bindEvents(){
        $('.inquiryPeriodFilter').on('dateFilter_submit', function(e, data){
            requestOrderInquiry(data.startDate, data.endDate);
        })

        $('.contents.mypage').on('click', '.orderCancel-btn, .takeBack-btn', function(e){
            e.preventDefault();

            var matchIdx;

            matchIdx = $(this).attr('class').indexOf('orderCancel');
            if(matchIdx > -1){
                openCancelPop(this);
                return;
            }

            matchIdx = $(this).attr('class').indexOf('takeBack');
            if(matchIdx > -1){
                openTakebackPop(this);
                return;
            }
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
            var href = $(this).attr('href');
            if(href == "#none" || href == ""){
                e.preventDefault();

                lgkorUI.alert("제품이 현재 품절/판매 중지<br>상태로 상세 정보를 확인 하실 수 없습니다", {
                    title:""
                });
            }
        });
    }

    function openCancelPop(item){
        //var tbody = $(item).siblings('.tbl-layout').find('.tbody').clone();

        //$('#popup-cancel').find('.tbl-layout .tbody').remove()
        //$('#popup-cancel').find('.tbl-layout').append(tbody);

        $('#popup-cancel').vcModal();
    }

    function openTakebackPop(item){
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

    function requestOrderInquiry(startDate, endDate, page){
        lgkorUI.showLoading();

        var sendata = {
            startDate: startDate,
            endDate: endDate,
            page: page || 1
        }
        lgkorUI.requestAjaxData(ORDER_INQUIRY_LIST_URL, sendata, function(result){
            if(result.data.success == "Y"){
                if(result.data.orderList && result.data.orderList.length){
                    CURRENT_PAGE = result.data.page;
                    TOTAL_PAGE = result.data.total;

                    $('.inquiry-list-notify').show();

                    if(CURRENT_PAGE >= TOTAL_PAGE) $('.btn-moreview').hide();
                    else $('.btn-moreview').show();

                    if(CURRENT_PAGE == 1){
                        ORDER_LIST = [];
                        $('.inquiry-list-wrap').empty();
                    }

                    var leng, cdx, idx, templateList;
                    var list = result.data.orderList;
                    for(idx in list){
                        leng = ORDER_LIST.length;
                        list[idx]['dataID'] = leng.toString();
                        for(cdx in list[idx].productList){
                            list[idx].productList[cdx]["prodID"] = cdx;
                        }

                        templateList = vcui.template(inquiryListTemplate, list[idx]);
                        $('.inquiry-list-wrap').append(templateList);

                        ORDER_LIST.push(list[idx]);
                    }
                } else{
                    setNoData();
                }
            }

            lgkorUI.hideLoading();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();