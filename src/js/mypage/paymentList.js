;(function(){
    var PAYMENT_LIST_DATA;
    var PAYMENT_DETAIL_DATA;
    var txtMasking;

    var listTableTemplate = 
        '<div class="tb-scroll">'+
            '<div class="tb_row tb-row-bl">'+
                '<table>'+
                    '<caption>연차별 납부내역을 회차, 납부일, 청구금액, 할인금액, 납부금액순으로 안내</caption>'+
                    '<colgroup>'+
                        '<col style="width:12%">'+
                        '<col>'+
                        '<col>'+
                        '<col>'+
                        '<col>'+
                    '</colgroup>'+
                    '<thead>'+
                        '<tr>'+
                            '<th scope="col">회차</th>'+
                            '<th scope="col">납부일</th>'+
                            '<th scope="col">청구금액</th>'+
                            '<th scope="col">할인금액</th>'+
                            '<th scope="col">납부금액</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    '{{#each (item, i) in paymentList}}'+
                        '<tr>'+
                            '<td>{{item.turnNumber}}</td>'+
                            '<td>{{item.paymentDate}}</td>'+
                            '<td>{{item.chargePrice}}원</td>'+
                            '<td>{{item.discountPrice}}원</td>'+
                            '<td>'+
                                '<p>{{item.paymentPrice}}원</p>'+
                                //'{{#if item.paymentPrice != 0 }}<button type="button" class="btn-link size payMentBtn" data-contLineSeq="{{item.contLineSeq}}" data-accountReceivableId="{{item.accountReceivableId}}" data-turnNumber="{{item.turnNumber}}"><span>자세히</span></button>{{/if}}'+
                                '{{#if (item.paymentPrice != 0 && testFlag == "N") || (item.paymentPrice != 0 && testFlag == "Y" && testUserFlag == "Y")}}'+
                                    '<button type="button" class="btn-link size payMentBtn" data-contLineSeq="{{item.contLineSeq}}" data-accountReceivableId="{{item.accountReceivableId}}" data-turnNumber="{{item.turnNumber}}">'+
                                        '<span>자세히</span>'+
                                    '</button>'+
                                '{{/if}}'+
                            '</td>'+
                        '</tr>'+
                    '{{/each}}'+
                    '</tbody>'+
                '</table>'+
            '</div>'+
        '</div>'+
        '<ul class="bullet-list">'+
        '{{#each bullet in description}}'+
            '<li class="b-txt">{{bullet}}</li>'+
        '{{/each}}'+
        '</ul>';

    var periodOptionTemplate = 
        '{{#each option in periodSortList}}'+
            '<option value="{{option.value}}"{{#if option.value == periodSortSelect}} selected{{/if}}>{{option.name}}</option>'+
        '{{/each}}';

    function init(){
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'ui/tab', 'helper/textMasking'], function () {             
            setting();
            bindEvents();
            loadPaymentList();
            //loadPaymentDetail();
        });
    }

    function setting(){
        PAYMENT_LIST_DATA = $('.contents.mypage').data('paymentListUrl');
        PAYMENT_DETAIL_DATA = $('.contents.mypage').data('paymentDetailUrl');
        txtMasking = new vcui.helper.TextMasking();
    }

    function bindEvents(){
        $('#contractInfo').on('change', function(e){
            loadPaymentList(-1);
        });

        $('#usePeriod').on('change', function(e){
            var idx = $(this).find('option:selected').index();
            loadPaymentList(idx);
        });
    }

    function loadPaymentList(idx){
        lgkorUI.showLoading();

        var paymentID = $('#contractInfo').find('option:selected').val();
        var period = idx > -1 ? $('#usePeriod').find('option').eq(idx).val() : "";

        var sendata = {
            paymentID: paymentID,
            period: period
        }
        //210705 추가 요청사항 : paymentID가 있을때만 노출
        if(sendata.paymentID) {
            lgkorUI.requestAjaxData(PAYMENT_LIST_DATA, sendata, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    //console.log("데이타값을 불러와서 success로 떨어져서 데이터값이");
                    $('.section-wrap .sects').find('.tb-scroll').remove();
                    $('.section-wrap .sects').find('.bullet-list').remove();
                    $('.section-wrap').find('.no-data').remove();
    
                    if(result.data.paymentList && result.data.paymentList.length > 0){
                        //console.log("데이타값이 있으면");
                        $('.section-wrap .sects').show();

                        var list = vcui.template(listTableTemplate, result.data);
    
                        $('.section-wrap .sects').append(list);
                        var payOpenbtn = $('.payMentBtn');
                        payOpenbtn.each(function(index){
                            $(this).on('click', function(e){
                                //console.log(index);
    
                                console.log("this %o data %o ",$(this),$(this).data())//개발에 파라미터 던지는 확인
    
                                loadPaymentDetail($(this).data());
                            });
                        });
    
        
                        $('.sort-select-wrap select').empty();
        
                        var options = vcui.template(periodOptionTemplate, result.data);
                        $('.sort-select-wrap select').append(options).vcSelectbox('update');
                    } else{
                        //console.log("데이터값이 없으면");
                        $('.section-wrap .sects').hide();
                        $('.section-wrap').append('<div class="no-data"><p>검색된 결과가 없습니다.</p></div>');
                    }
                }
                lgkorUI.hideLoading();
            });
        } else {
            console.log("paymentId 없음");
            lgkorUI.hideLoading();
        }
        // 210705 추가 요청사항
    }

    function loadPaymentDetail( param ){
        lgkorUI.showLoading();
        lgkorUI.requestAjaxData(PAYMENT_DETAIL_DATA, param, function(result, index){
            if(lgkorUI.stringToBool(result.data.success)){

                var listPopTemplate =   
                '<div class="pop-paymentArea">'+                          
                    '<header class="pop-header">'+
                        '<h1 class="tit"><span>{{turnNumber}}회차 결제 정보</span></h1>'+
                    '</header>'+
                    '<div class="priceContent">'+
                        '<ul class="priceList">'+
                            '{{#each popDetail in paymentDetailList}}'+
                            '<li>'+
                                '<div class="list-info">'+
                                    '<h3>{{popDetail.receiptBankCodeNm}}</h3>'+
                                    '<span>{{popDetail.receiptBankAccountNo}}</span>'+
                                '</div>'+
                                '<div class="list-price">{{popDetail.paymentPrice}}원</div>'+
                            '</li>'+
                            '{{/each}}'+
                        '</ul>'+
                        '<div class="priceTotal">'+
                            '<h4>총계</h4>'+
                            '<p>{{totalPrice}}원</p>'+
                        '</div>'+
                        '<p class="priceTxt">본 회차에 해당되는 결제 정보가 표시됩니다.</p>'+
                    '</div>'+
                '</div>';

                // result.data.paymentDetailList[1].receiptBankAccountNo = txtMasking.card(result.data.paymentDetailList[1].receiptBankAccountNo)
                
                //반복문 마스킹 forEach 따로 선언
                result.data.paymentDetailList.forEach(function(item){ 
                    if (item.billType === "BANK") {
                        item.receiptBankAccountNo = txtMasking.substr(item.receiptBankAccountNo, 4);
                    } 
                    
                    if (item.billType === "CARD") {
                        item.receiptBankAccountNo = txtMasking.card(item.receiptBankAccountNo);
                    } 

                });

                // console.log(result.data.paymentDetailList);

                var listPop = vcui.template(listPopTemplate, result.data);
                $('#popup-paymentHistory .pop-paymentArea').remove();
                $('#popup-paymentHistory').prepend(listPop);
                $('#popup-paymentHistory').vcModal();

            }
            lgkorUI.hideLoading();
        });
    }


    // function loadPaymentDetail(){
    //     lgkorUI.showLoading();
    //     lgkorUI.requestAjaxData(PAYMENT_DETAIL_DATA, {}, function(result){
    //         if(lgkorUI.stringToBool(result.data.success)){
    //             var payOpenbtn = $('.payMentBtn');
    //             payOpenbtn.each(function(index){
    //                 $(this).on('click', function(){
    //                     var listPopTemplate =   
    //                     '<div class="pop-paymentArea">'+                          
    //                         '<header class="pop-header">'+
    //                             '<h1 class="tit"><span>{{turnNumber}}회차 결제 정보</span></h1>'+
    //                         '</header>'+
    //                         '<div class="priceContent">'+
    //                             '<ul class="priceList">'+
    //                                 '{{#each popDetail in paymentDetailList}}'+
    //                                 '<li>'+
    //                                     '<div class="list-info">'+
    //                                         '<h3>{{popDetail.receiptBankCodeNm}}</h3>'+
    //                                         '<span>{{popDetail.receiptBankAccountNo}}</span>'+
    //                                     '</div>'+
    //                                     '<div class="list-price">{{popDetail.paymentPrice}}원</div>'+
    //                                 '</li>'+
    //                                 '{{/each}}'+
    //                             '</ul>'+
    //                             '<div class="priceTotal">'+
    //                                 '<h4>총계</h4>'+
    //                                 '<p>{{totalPrice}}원</p>'+
    //                             '</div>'+
    //                             '<p class="priceTxt">본 회차에 해당되는 결제 정보가 표시됩니다.</p>'+
    //                         '</div>'+
    //                     '</div>';

    //                     //var payTotalprice = result.data.paymentPop[index].totalCardPrice;
    //                     //result.data.paymentPop[index].totalCardPrice = vcui.number.addComma(payTotalprice);

    //                     //var $cardPri = result.data.paymentDetailList[index].cardPrice;
    //                     //result.data.paymentDetailList[index].cardPrice = vcui.number.addComma($cardPri);

    //                     var listPop = vcui.template(listPopTemplate, result.data);
    //                     $('#popup-paymentHistory .pop-paymentArea').remove();
    //                     $('#popup-paymentHistory').prepend(listPop);
    //                     $('#popup-paymentHistory').vcModal();
    //                 });
    //             });
    //         }
    //         lgkorUI.hideLoading();
    //     });
    // }


    $(window).load(function(){
        init();
    });
})();