$(window).ready(function(){
    if(!document.querySelector('.KRC0012')) return false;

    $('.KRC0012').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0012').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            adaptiveHeight:true,
            lazyLoad:'anticipated', //수정 jsw
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            touchThreshold: 100,
            speed: 150
        });
    });
})