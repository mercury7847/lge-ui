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
                attr: 'data-link-name', // sns서비스명을 가져올 속성
                metas: {
                    image: { // 공식 메타태그가 아닌 메타태그에 있는 이미지를 공유하고자 할 경우 이 옵션 설정
                        // kakaotalk: 'kakao:image',
                    }
                },
                // 공유하기 직전에
                onBeforeShare: function ($btn, data) {
                    if ($btn.attr('data-link-name') == 'copy_url') {
                        // url 복사하기 인 경우
                        vcui.dom.copyToClipboard(location.href, {
                            onSuccess: function () {
                                alert('URL을 복사했습니다.');
                            }
                        });
                        // false를 반환하면 공유를 위한 팝업을 안띄운다.
                        return false;
                    }
                    
                },
                // 공유를 했을 때 서버 로그 페이지에 관련데이타를 보내준다.
                onShrered: function ($btn, data) {
                    // console.log(data);
                }
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