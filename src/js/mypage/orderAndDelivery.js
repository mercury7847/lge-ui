(function() {
    var ORDER_INQUIRY_LIST_URL;
    var PRODUCT_STATUS_URL;
    var ORDER_DETAIL_URL;

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
            '{{#if cancelAbled == "Y"}}'+
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
                            '<a href="{{listData.productPDPurl}}"><img onError="lgkorUI.addImgErrorEvent(this)" src="{{listData.productImage}}" alt="{{listData.productNameKR}}"></a>'+
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
        '</div>';

    var CURRENT_PAGE, TOTAL_PAGE;

    var ORDER_LIST;

    function init(){
        vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar', 'ui/datePeriodFilter'], function () {             
            setting();
            bindEvents();

            var dateData = $('.inquiryPeriodFilter').vcDatePeriodFilter("getSelectOption");
            requestOrderInquiry(dateData.startDate, dateData.endDate);
        });
    }

    function setting(){
        ORDER_INQUIRY_LIST_URL = $('.contents.mypage').data('orderInquiryList');
        PRODUCT_STATUS_URL = $('.contents.mypage').data('productStatus');
        ORDER_DETAIL_URL = $('.contents.mypage').data('orderDetail');
        
        $('.inquiryPeriodFilter').vcDatePeriodFilter();
    }

    function bindEvents(){
        $('.inquiryPeriodFilter').on('dateFilter_submit', function(e, data){
            requestOrderInquiry(data.startDate, data.endDate);
        })

        $('.contents.mypage').on('click', '.orderCancel-btn, .takeBack-btn', function(e){
            e.preventDefault();

            var matchIdx;
            var dataID = $(this).closest('.box').data("id");

            matchIdx = $(this).attr('class').indexOf('orderCancel');
            if(matchIdx > -1){
                openCancelPop(dataID);
                return;
            }

            matchIdx = $(this).attr('class').indexOf('takeBack');
            if(matchIdx > -1){
                openTakebackPop(dataID);
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
            e.preventDefault();

            var dataID = $(this).closest('.box').data("id");
            var pdpUrl = $(this).attr("href");
            setProductStatus(dataID, pdpUrl);
        }).on('click', '.infos .name a', function(e){
            e.preventDefault();

            var wrapper = $(this).closest(".contents");
            var dataID = $(this).closest('.box').data("id");
            var pdpUrl = $(this).attr("href");
            if(wrapper.hasClass("orderAndDelivery-detail")){                
                setProductStatus(dataID, pdpUrl);
            } else{
                location.href = ORDER_DETAIL_URL + "?orderNumber=" + ORDER_LIST[dataID].orderNumber;
            }
        });
    }

    function openCancelPop(dataId){
        var listInfo = ORDER_LIST[dataId];
        var prodListWrap = $('#popup-cancel').find('.info-tbl-wrap .tbl-layout .tbody').empty();
        var totalPrice = 0;
        var totalDiscount = 0;
        var totalMemPoint = 0;
        var totalRequestPrice = 0;
        for(var idx in listInfo.productList){
            var listdata = listInfo.productList[idx];
            
            totalPrice += parseInt(listdata.productPrice);
            totalPrice += parseInt(listdata.productPrice);
            totalPrice += parseInt(listdata.productPrice);
            totalPrice += parseInt(listdata.productPrice);
        }

        $('#popup-cancel').vcModal();
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

    function setProductStatus(dataId, pdpUrl){
        lgkorUI.showLoading();
        var sendata = {
            productNameEN: ORDER_LIST[dataId].productNameEN
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

        var sendata = {
            startDate: startDate,
            endDate: endDate,
            page: page || 1
        }
        lgkorUI.requestAjaxData(ORDER_INQUIRY_LIST_URL, sendata, function(result){
            console.log("result.data.success:", result.data.success)
            if(lgkorUI.stringToBool(result.data.success)){
                console.log("result.data.listData:", result.data.listData)
                if(result.data.listData && result.data.listData.length){
                    CURRENT_PAGE = result.param.pagination.page;
                    TOTAL_PAGE = result.param.pagination.totalCount;

                    $('.inquiry-list-notify').show();

                    if(CURRENT_PAGE >= TOTAL_PAGE) $('.btn-moreview').hide();
                    else $('.btn-moreview').show();

                    if(CURRENT_PAGE == 1){
                        ORDER_LIST = [];
                        $('.inquiry-list-wrap').empty();
                    }

                    var leng, cdx, idx, templateList;
                    var list = result.data.listData;
                    for(idx in list){
                        leng = ORDER_LIST.length;
                        list[idx]['dataID'] = leng.toString();

                        templateList = $(vcui.template(inquiryListTemplate, list[idx])).get(0);
                        $('.inquiry-list-wrap').append(templateList);

                        for(cdx in list[idx].productList){
                            list[idx].productList[cdx]["prodID"] = cdx;
                            list[idx].productList[cdx]["addCommaProdPrice"] = vcui.number.addComma(list[idx].productList[cdx]["productPrice"]);

                            var prodlist = list[idx].productList[cdx];
                            $(templateList).find('.tbody').append(vcui.template(prodListTemplate, {listData:prodlist}));
                        }

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