$(window).ready(function(){
    if(!document.querySelector('.KRP0020')) return false;

    $('.KRP0020').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0020').find('.ui_carousel_slider').vcCarousel({
            infinite: true,
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
                        infinite: true,
                        dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
});