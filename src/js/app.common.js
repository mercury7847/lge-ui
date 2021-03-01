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
        //Quick메뉴 삭제
        $('.KRP0005,.KRP0032,.quick-menu-list').remove();
        //Quick메뉴 AR 버튼 추가
        $(".KRP0004").before('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
        $("#quickMenu").prepend('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
        //제조번호 카메라 버튼 노출
        //$('#appType').addClass("app-type");

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
});