$(window).ready(function(){
    if(!document.querySelector('.KRC0024')) return false;

    vcui.require(['ui/carousel'], function () {
        $('.KRC0024').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            playSelector: '.btn-play.play'
        });
    });
});