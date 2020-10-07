$(window).ready(function(){
    if(!document.querySelector('.KRP0025')) return false;

    $('.KRP0025').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0025').find('.ui_carousel_slider').vcCarousel({
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