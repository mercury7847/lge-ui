$(window).ready(function(){
    vcui.require(['ui/carousel'], function () {
        $('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1270,
                settings: {
                    slidesToShow: 5
                }
            }, {
                breakpoint: 1060,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });
})