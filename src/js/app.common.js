$(document).ready(function(){
    if (isApp()) {
        //헤더 앱 설정 버튼
        $('.mapExclusive').addClass('active');
        $('.mapExclusiveDss').hide();
        $(".app-settings-button").on({
            click : function(){
                document.location.href="/mobile-app/option";
            }
        });
        //Quick메뉴, Easy-path 삭제
        $('.KRP0005,.KRP0032,.quick-menu-list,.easy-path').remove();

        //Quick메뉴 AR 버튼 추가
        $(".KRP0004").before('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
        $("#quickMenu").prepend('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
        //Quick메뉴 AR 버튼 이벤트
        $(".btn-app-ar a").off("click").on({
            click : function(){
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                    var obj = new Object();
                    obj.command = "showAR";
                    var jsonString= JSON.stringify(obj);
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }else{
                    void android.openAR(null);
                }
            }
        });
    }

    /*
    setBarcode();
    $(window).on({
        resize : function(){
            setBarcode();
        }
    });
    */
});

/*
var setBarcode = function(){
    if(window.breakpoint.isMobile) {
        //제조번호 카메라 버튼 노출
        $('#appType').addClass("app-type");
        //제조번호 카메라 버튼 이벤트
        $(".app-exec").off("click").on({
            click : function(){
                if (isApp()) {
                    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                        var obj = new Object();
                        obj.command = "scanBarcode";
                        obj.callback ="returnBarcode";
                        var jsonString= JSON.stringify(obj);
                        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    }else{
                        void android.openBarcodeScanner("returnBarcode");
                    }
                }else{
                    var obj = {title:'', typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};

                    obj = $.extend(obj, {title:'', cancelBtnName:'취소', okBtnName:'설치'});
                    var desc = '바코드로 편리하게 제품등록<br>하기위해 APP을 설치하시겠습니까?';

                    lgkorUI.confirm(desc, obj);
                }
            }
        });
    } else {
        //제조번호 카메라 버튼 노출
        $('#appType').removeClass("app-type");
        //제조번호 카메라 버튼 이벤트
        $(".app-exec").off("click");
    }
}

var returnBarcode = function(barcode) {
    if(barcode != null && barcode != "" && barcode != undefined){
        $("#inp02").val(barcode);
    }
}
*/