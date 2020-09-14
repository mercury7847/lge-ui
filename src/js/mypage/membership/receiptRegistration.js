(function() {
    function comma(str) {
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
    function yyyyMMddString(str, seperator) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1' + seperator + '$2' + seperator + '$3');
    }

    function registrationReceipt(param) {
        var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/registration_receipt.json';
        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {

        });
    }

    $(window).ready(function() {
        var receiptRegist = {
            init: function() {

                vcui.require(["ui/tooltipTarget","ui/formatter"], function () {
                    $('.ui_tooltip-target').vcTooltipTarget({"tooltip":".tooltip-box"});
                    $('#input-receipt').vcFormatter({"format":"receipt","maxlength":17});
                });

                $('#btn-confirm').on('click',function (e) {
                    var param = {
                        'shop': $('#select1').vcSelectbox('selectedOption').value,
                        'receipt': $('#input-receipt').val().replace(/\D/g,'')
                    }
                    console.log(param);
                    registrationReceipt(param);
                });

                var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/shop_brand_list.json';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    console.log('ajax',d.data);
                    var contentHtml = "";
                    var data = d.data;
                    var arr = data instanceof Array ? data : [];
                    arr.forEach(function(item, index) {
                        contentHtml += ('<option value="' + item.code +'">' + item.name + '</option>');
                    });
                    $('#select1').html(contentHtml);
                    $('#select1').vcSelectbox('update');
                });

                //searchPurchaseHistory();
            }
        }
        receiptRegist.init();                
    });
})();