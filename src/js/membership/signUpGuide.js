$(document).ready(function() {

    var isAndroid = vcui.detect.isAndroid;
    var isIOS = vcui.detect.isIOS;
    var $content = $('.sign-up-guide');

    if(isAndroid){ 
        $content.find('.device-aos-qrcode').show();
        $content.find('.device-ios-qrcode').hide();
    }
    if(isIOS){ 
        $content.find('.device-aos-qrcode').hide();
        $content.find('.device-ios-qrcode').show();
    }
    /* BTOCSITE-3002 멤버십 페이지 수정 */
    $('.btn-mo-acc').click(function(){        
        $('.mo-only-acc').toggleClass('on');
    })
});
