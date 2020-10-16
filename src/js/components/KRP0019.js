$(window).ready(function(){
    if(!document.querySelector('.KRP0019')) return false;

    $('.KRP0019').buildCommonUI();
    
    lgkorUI.loadKakaoSdkForShare();
});