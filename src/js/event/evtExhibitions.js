$(document).ready(function() { 
    // BTOCSITE-4785 s
    if ($('.btn-pdp-alert').length) {
        goPdpUrl();
    }
    // BTOCSITE-4785 e
    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        $wrap.find('.ui_objet_carousel').vcCarousel({         
            slidesToShow: 3,
            // slidesToScroll: 1,
            // centerPadding:'60px',
            dots: false,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 3,
                        centerMode:true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })
});

// BTOCSITE-4785 s
function goPdpUrl() {
    $('.btn-pdp-alert').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        lgkorUI.alert('해당 제품은 매장 진열된 제품으로(생산 단종)<br>정가보다 할인해서 구매 가능한 모델입니다.<br>&#39;진열제품 구매가능매장 확인하기&#39;를 통해<br>매장에서 저렴하게 구매하실 수 있습니다.', {
            title: "",
            okBtnName: "확인",
            ok: function(){
                location.href = href;
            }
        });
    });
}
// BTOCSITE-4785 e