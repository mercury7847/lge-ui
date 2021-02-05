$(window).ready(function() {
    //구매 수량 선택
    $('.quantity-wrap').on('click', 'button.minus,button.plus',function (e) {
        var $input = $(this).siblings('input');
        var quantity = $input.val();
        if($(this).hasClass('minus')) {
            --quantity;
            if(quantity < 1) {
                quantity = 1;
            }
            
            if(quantity == 1) {
                $(this).attr('disabled',true);
            } else {
                $(this).removeAttr('disabled');
            }
        } else if($(this).hasClass('plus')) {
            ++quantity;

            if(quantity > 1) {
                $(this).siblings('button.minus').removeAttr('disabled');
            }
        }
        $input.val(quantity);
    });
    
    $(".search-input .btn-delete").click(function() {
        var temp_ul = $(this).parents('.model-infomation').find('.model-infomation-list');
        var temp_li = $(temp_ul).find('li');
        var $nodata = $('.no-data');

        $(this).siblings("#keyword").val("");
        temp_ul.show();
        temp_li.show();
        $nodata.hide();
    });

    $("#keyword").on("input", function() {
        var k = $(this).val();

        var temp_ul = $(this).parents('.model-infomation').find('.model-infomation-list');
        var temp_li = $(temp_ul).find('li');
        // var temp_visible = $(temp_ul).find('li:visible');
        var $nodata = $('.no-data');

        $(temp_li).hide();
        $(temp_ul).find("li:contains('" + k + "')").show();

        if( k == "") {
            temp_ul.show();
            $nodata.hide();
        } else {
            if( !$(temp_ul).find("li:contains('" + k + "')").length) {
                temp_ul.hide();
                $nodata.show();
            } else { 
                temp_ul.show()
                $nodata.hide();
            }
        }
    });
});