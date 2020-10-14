$(window).ready(function(){
    if(!document.querySelector('.KRP0019')) return false;

    $('.KRP0019').buildCommonUI();

    if(window.kakao){
        startShare();
    }else{
        var script = document.createElement('script');

        script.onload = function () {
            startShare();
        };
        script.onerror = function(e){ 
            alert('kakao api를 로드할수 없습니다.');
        }
        script.src = '//developers.kakao.com/sdk/js/kakao.min.js';        
        document.head.appendChild(script); 
    }


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