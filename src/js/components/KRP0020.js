$(window).ready(function(){
    if(!document.querySelector('.KRP0020')) return false;

    $('.KRP0020').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0020').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 250,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        dots: true,
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