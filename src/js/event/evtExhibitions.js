$(document).ready(function() { 
    if ($('.btn-pdp-alert').length) {
        goPdpUrl();
    }
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

function goPdpUrl() {
    $('.btn-pdp-alert').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        lgkorUI.alert('이동하실 제품 페이지의 가격 및 혜택은 LGE.COM 구매 가격입니다.<br>진열 제품은 ‘진열제품 구매가능매장 확인하기’를 통해 매장에서 저렴하게 구매하실 수 있습니다.', {
            title: "",
            okBtnName: "확인",
            ok: function(){
                location.href = href;
            }
        });
    });
}