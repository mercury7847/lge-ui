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
    });

    $('.vertical-fixed table').clone(true).appendTo('.tb_row').addClass('tb-clone');

    //멤버십 가입 팝업
    $('.memPopup').click(function(){
        lgkorUI.confirm('', {
            title:'고객님은 멤버십 회원입니다. <br> 멤버십 관리 화면으로 이동할까요?', 
            cancelBtnName: '취소', okBtnName: '확인', 
            ok: function(){
                location.href = "/my-page/membership-info";
            }
        });
    });
    /* //BTOCSITE-3002 멤버십 페이지 수정 */
});
