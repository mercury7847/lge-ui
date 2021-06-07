; (function () {
    var PAYMENT_LIST_DATA;

    var listTableTemplate =
        '<div class="tb-scroll">' +
        '<div class="tb_row tb-row-bl">' +
        '<table>' +
        '<caption>연차별 납부내역을 회차, 납부일, 청구금액, 할인금액, 납부금액순으로 안내</caption>' +
        '<colgroup>' +
        '<col style="width:12%">' +
        '<col>' +
        '<col>' +
        '<col>' +
        '<col>' +
        '</colgroup>' +
        '<thead>' +
        '<tr>' +
        '<th scope="col">회차</th>' +
        '<th scope="col">납부일</th>' +
        '<th scope="col">청구금액</th>' +
        '<th scope="col">할인금액</th>' +
        '<th scope="col">납부금액</th>' +
        '<th scope="col">결제정보</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '{{#each item in paymentList}}' +
        '<tr>' +
        '<td>{{item.turnNumber}}</td>' +
        '<td>{{item.paymentDate}}</td>' +
        '<td>{{item.chargePrice}}</td>' +
        '<td>{{item.discountPrice}}</td>' +
        '<td>{{item.paymentPrice}}</td>' +
        '<td>' +
        '<ul class="payment-info">' +
        '{{#each row in item.paymentInfo}}' +
        '<li>{{row.bank}}</li>' +
        '{{/each}}' +
        '</ul>' +
        '</td>' +
        '</tr>' +
        '{{/each}}' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '<ul class="bullet-list">' +
        '{{#each bullet in description}}' +
        '<li class="b-txt">{{bullet}}</li>' +
        '{{/each}}' +
        '</ul>';

    var periodOptionTemplate =
        '{{#each option in periodSortList}}' +
        '<option value="{{option.value}}"{{#if option.value == periodSortSelect}} selected{{/if}}>{{option.name}}</option>' +
        '{{/each}}';

    function init() {
        setting();
        bindEvents();
    }

    function setting() {
        PAYMENT_LIST_DATA = $('.contents.mypage').data('paymentListUrl');
    }

    function bindEvents() {
        $('#contractInfo').on('change', function (e) {
            loadPaymentList(-1);
        });

        $('#usePeriod').on('change', function (e) {
            var idx = $(this).find('option:selected').index();
            loadPaymentList(idx);
        });
    }

    function loadPaymentList(idx) {
        lgkorUI.showLoading();

        var paymentID = $('#contractInfo').find('option:selected').val();
        var period = idx > -1 ? $('#usePeriod').find('option').eq(idx).val() : "";

        var sendata = {
            paymentID: paymentID,
            period: period
        }
        lgkorUI.requestAjaxData(PAYMENT_LIST_DATA, sendata, function (result) {
            if (lgkorUI.stringToBool(result.data.success)) {
                $('.section-wrap .sects').find('.tb-scroll').remove();
                $('.section-wrap .sects').find('.bullet-list').remove();
                $('.section-wrap').find('.no-data').remove();

                if (result.data.paymentList && result.data.paymentList.length > 0) {
                    $('.section-wrap .sects').show();

                    var list = vcui.template(listTableTemplate, result.data);
                    $('.section-wrap .sects').append(list);

                    $('.sort-select-wrap select').empty();

                    var options = vcui.template(periodOptionTemplate, result.data);
                    $('.sort-select-wrap select').append(options).vcSelectbox('update');
                } else {
                    $('.section-wrap .sects').hide();
                    $('.section-wrap').append('<div class="no-data"><p>검색된 결과가 없습니다.</p></div>');
                }
            }

            lgkorUI.hideLoading();
        });
    }

    $(window).load(function () {
        init();
    });
})();