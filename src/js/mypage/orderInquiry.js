(function() {
    var ORDER_INQUIRY_LIST_URL;

    var inquiryListTemplate =
        '<div class="box">'+
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
                        '<div class="col-table" data-model-id="{{item.modelID}}">'+
                            '<div class="col col1">'+
                                '<span class="blind">제품정보</span>'+
                                '<div class="product-info">'+
                                    '<div class="thumb">'+
                                        '<a href="{{item.productPDPurl}}"><img src="{{item.productImage}}" alt="{{item.productNameKR}}"></a>'+
                                    '</div>'+
                                    '<div class="infos">'+
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
                                        '<p class="count">수량 : {{item.productTotal}}</p>'+
                                    '</div>'+
                                    '<p class="price">'+
                                        '<span class="blind">구매가격</span>{{item.productPrice}}원'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col col2">'+
                                '<div class="state-box">'+
                                    '<p class="tit {{item.orderStatus.statusClass}}"><span class="blind">진행상태</span>{{item.orderStatus.statusText}}</p>'+
                                    '{{#if item.orderStatus.deliveryDate !=""}}<p class="desc">배송희망일 {{item.orderStatus.deliveryDate}}</p>{{/if}}'+
                                    '{{#if item.statusButtonList && item.statusButtonList.length > 0}}'+
                                    '<div class="state-btns">'+
                                        '{{#each status in item.statusButtonList}}'+
                                        '<a href="#n" class="btn size border {{status.className}}-btn"><span>{{status.buttonName}}</span></a>'+
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
            '{{#if takebackAbled == "Y"}}'+
            '<a href="#n" class="btn-link takeBack-btn">반품신청</a>'+
            '{{/if}}'+
            '<div class="btns">'+
                '<a href="#n" class="btn-link">주문/배송 상세보기</a>'+
            '</div>'+
        '</div>';

    function init(){
        console.log("Order Inquiry Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/modal', 'ui/calendar'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        ORDER_INQUIRY_LIST_URL = $('.contents.mypage').data('orderInquiryList');
        
        var hiddenData = lgkorUI.getHiddenInputData();
        var startdate = new Date(vcui.date.format(hiddenData.startDate,'yyyy-MM-dd'));     
        $('.startDate').vcCalendar('setDate', startdate);

        var endate = new Date(vcui.date.format(hiddenData.endDate,'yyyy-MM-dd'));     
        $('.endDate').vcCalendar('setDate', endate);
    }

    function bindEvents(){
        $('.inquiryPeriodFilter').on('change', 'input[type=radio]', function(e){
            var period = parseInt($('.inquiryPeriodFilter input[type=radio]:checked').val());
            setBeforePeriod(period)
        }).on('click', '.calendarInquiry-btn', function(e){
            e.preventDefault();

            setOrderListInquiry();
        });

        $('.startDate, .endDate').on('calendarselected', function(e){
            $('.inquiryPeriodFilter input[type=radio]').prop('checked', false);
        });

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
        }).on('click', '.deliveryInquiry-btn, .deliveryRequest-btn, .takeBackInner-btn, .productReview-btn', function(e){
            e.preventDefault();

            var matchIdx;
            var modelID = $(this).closest('.col-table').data('modelId');

            matchIdx = $(this).attr('class').indexOf('deliveryInquiry');
            if(matchIdx > -1){
                setDeliveryInquiry(modelID);
                return;
            }

            matchIdx = $(this).attr('class').indexOf('deliveryRequest');
            if(matchIdx > -1){
                setDeliveryRequest(modelID);
                return;
            }

            matchIdx = $(this).attr('class').indexOf('takeBackInner');
            if(matchIdx > -1){
                setTakeBack(modelID);
                return;
            }

            matchIdx = $(this).attr('class').indexOf('productReview');
            if(matchIdx > -1){
                setProductReview(modelID);
                return;
            }
        }).on('click', '.btn-moreview', function(e){
            e.preventDefault();

            setMoreOrderList();
        });
    }

    function setBeforePeriod(period){
        console.log(period)
        var endate = $('.endDate').vcCalendar('getCurrentDate');
        var startdate = new Date(vcui.date.format(endate,'yyyy-MM-dd'));
        startdate.setDate(startdate.getDate() - period);
        
        $('.startDate').vcCalendar('setDate', startdate);
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

    function setDeliveryInquiry(modelID){
        console.log("[setDeliveryInquiry]", modelID);
    }

    function setDeliveryRequest(modelID){
        console.log("[setDeliveryRequest]", modelID);
    }

    function setTakeBack(modelID){
        console.log("[setTakeBack]", modelID);
    }

    function setProductReview(modelID){
        console.log("[setProductReview]", modelID);
    }

    function setNoData(){
        $('.inquiry-list-wrap').empty().append('<div class="no-data"><p>주문 내역이 없습니다.</p></div>');
        $('.inquiry-list-notify').hide();
        $('.btn-moreview').hide();
    }

    function setMoreOrderList(){
        var hiddenData = lgkorUI.getHiddenInputData();
        requestOrderInquiry(hiddenData.startDate, hiddenData.endDate, hiddenData.page+1);
    }

    function setOrderListInquiry(){
        var startDate = $('.contents.mypage .startDate').vcCalendar('getyyyyMMdd');
        var endDate = $('.contents.mypage .endDate').vcCalendar('getyyyyMMdd');
        
        var datevalidate = getDateValidation(startDate, endDate);
        if(!datevalidate.result){
            lgkorUI.alert("", {
                title: datevalidate.alert
            });

            return;
        }

        requestOrderInquiry(startDate, endDate);
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
                    lgkorUI.setHiddenInputData({
                        total: result.data.total,
                        page: result.data.page,
                        startDate: result.data.startDate,
                        endDate: result.data.endDate
                    });

                    $('.inquiry-list-notify').show();

                    if(result.data.page >= result.data.total) $('.btn-moreview').hide();
                    else $('.btn-moreview').show();

                    if(result.data.page == 1) $('.inquiry-list-wrap').empty();

                    var list = result.data.orderList;
                    for(var idx in list){
                        var templateList = vcui.template(inquiryListTemplate, list[idx]);
                        $('.inquiry-list-wrap').append(templateList);
                    }
                } else{
                    setNoData();
                }
            }

            lgkorUI.hideLoading();
        });
    }

    function getDateValidation(startdate, endate){
        if(startdate == null || endate == null) return {result: false, alert: "조회기간을 확인해 주세요."};

        var startime = new Date(vcui.date.format(startdate,'yyyy-MM-dd'));
        var endtime = new Date(vcui.date.format(endate,'yyyy-MM-dd'));
        var period = endtime.getTime() - startime.getTime();
        if(period < 0) return {result: false, alert: "조회기간을 확인해 주세요."};

        var limitperiod = 2 * 1000 * 60 * 60 * 24 * 365;
        if(period > limitperiod) return {result: false, alert: "최대 조회 기간은<br>2년을 넘을 수 없습니다."};

        return {result: true};
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();