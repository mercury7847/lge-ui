$(window).ready(function(){
    if(!document.querySelector('.KRC0029')) return false;

    $('.KRC0029').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0029').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            playSelector: '.btn-play.play',
            adaptiveHeight: true,
            lazyLoad: 'anticipated' //수정 jsw
        });
    });
});