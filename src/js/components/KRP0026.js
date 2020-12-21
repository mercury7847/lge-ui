$(window).ready(function(){
    if(!document.querySelector('.KRP0026')) return false;

    $('.KRP0026').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0026').find('.ui_carousel_slider').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: "unslick"
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