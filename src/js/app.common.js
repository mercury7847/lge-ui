$(document).ready(function(){
    //헤더 앱 설정 버튼
    if (isApp()) {
        $('.mapExclusive').addClass('active');
        $('.mapExclusiveDss').hide();
        $(".app-settings-button").on({
            click : function(){
                document.location.href="/mobile-app/option";
            }
        });
        //Quick메뉴 삭제
        $('.KRP0005,.KRP0032,.quick-menu-list').remove();
    }
});