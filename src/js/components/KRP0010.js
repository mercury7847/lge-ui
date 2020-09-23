$(window).ready(function(){
    if(!document.querySelector('.KRP0010')) return false;

    $('.KRP0010').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRP0010').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            
        });
    });
})