$(window).ready(function(){
    if(!document.querySelector('.KRP0036')) return false;

    $('.KRP0036').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0036').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                        
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
});