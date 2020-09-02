$(window).ready(function(){
    if(!document.querySelector('.KRC0009')) return false;

    vcui.require(['ui/carousel'], function () {
        $('.KRC0009').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            swipeToSlide: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });
})