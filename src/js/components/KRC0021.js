$(window).ready(function(){
    if(!document.querySelector('.KRC0021')) return false;

    $('.KRC0021').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0021').find('.ui_carousel_slider').vcCarousel({
            settings: {
                unbuilded:true
            },
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        unbuilded:true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });

})