$(window).ready(function(){
    if(!document.querySelector('.KRP0016')) return false;

    $('.KRP0016').buildCommonUI();
    
    //lgkorUI.loadKakaoSdkForShare(); //BTOCSITE-5938-363 [모니터링] 스토리 > 가이드&팁 공유하기 url복사 두번 호출 오류
});