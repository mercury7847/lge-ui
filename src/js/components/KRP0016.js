$(window).ready(function(){
    if(!document.querySelector('.KRP0016')) return false;

    $('.KRP0016').buildCommonUI();
    
    lgkorUI.loadKakaoSdkForShare();
});