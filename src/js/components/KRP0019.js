$(window).ready(function(){
    if(!document.querySelector('.KRP0019')) return false;

    $('.KRP0019').buildCommonUI();
    
    lgkorUI.loadKakaoSdkForShare(startShare);

    function startShare(){
        vcui.require([
            'helper/sharer'
        ], function (Sharer) {
            // 공유하기 헬퍼 빌드
            Sharer.init({
                selector: '.sns-share > li >  a',
                attr: 'data-link-name' // sns서비스명을 가져올 속성
            });
    
        
            $('.KRP0019').find('.sns-area button.sns').on('click', function(e){
                    e.preventDefault();
    
                    toggleSnsPop();
                });
    
                function toggleSnsPop(){
                    var listpop = $('.KRP0019').find('.sns-area .list');
                    listpop.toggleClass('active');
                }
            });
        }
});