$(window).ready(function(){
    if(!document.querySelector('.KRC0017')) return false;

    $('.KRC0017').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0017').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 20000,
                settings: {
                    slidesToShow: 6
                }
            }, {
                breakpoint: 1270,
                settings: {
                    slidesToShow: 5
                }
            }, {
                breakpoint: 1100,
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