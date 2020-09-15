(function() {
    function yyyyMMddString(str, seperator) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1' + seperator + '$2' + seperator + '$3');
    }

    function registrationReceipt(param) {
        var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/registration_receipt.json';
        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            registrationReceiptSuccessModal(d.data,d.message);
        });
    }

    function registrationReceiptSuccessModal(data, message) {
        var content = "<p>" + "구매일자 : " + yyyyMMddString(data.date,". ") + "</p>";
        content += "<p>" + "구매제품 : " + data.product + "</p>";

        $('#laypop .tit span').text(message);
        $('#laypop .lay-conts').html(content);

        $('#laypop').vcModal();
    }

    $(window).ready(function() {

        var receiptRegist = {
            init: function() {

                vcui.require(["ui/tooltipTarget","ui/formatter"], function () {
                    $('.ui_tooltip-target').vcTooltipTarget({"tooltip":".tooltip-box"});
                    $('#input-receipt').vcFormatter({"format":"receipt","maxlength":17});
                });

                $("#btn-confirm").attr("disabled", true);
                $('#btn-confirm').on('click',function (e) {
                    var param = {
                        'shop': $('#select1').vcSelectbox('selectedOption').value,
                        'receipt': $('#input-receipt').val().replace(/\D/g,'')
                    }
                    registrationReceipt(param);
                });

                $("#input-receipt").on("change", function() {
                    var val = $("#input-receipt").val();
                    $("#btn-confirm").attr("disabled", !(/^(\d{8})-(\d{8})/.test(val)));
                });

                var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/shop_brand_list.json';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    var contentHtml = "";
                    var data = d.data;
                    var arr = data instanceof Array ? data : [];
                    arr.forEach(function(item, index) {
                        contentHtml += ('<option value="' + item.code +'">' + item.name + '</option>');
                    });
                    $('#select1').html(contentHtml);
                    $('#select1').vcSelectbox('update');
                });
            }
        }
        receiptRegist.init();                
    });
})();