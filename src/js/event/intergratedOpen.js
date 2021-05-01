$(document).ready(function() {    

    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        $wrap.find('.ui_benefit_carousel').vcCarousel({         
            slidesToShow: 3,
            // slidesToScroll: 1,
            // centerPadding:'60px',
            dots: true,
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
                        centerMode:true,
                        slidesToScroll: 1
                    }
                }
            ]
        });

    })
});
