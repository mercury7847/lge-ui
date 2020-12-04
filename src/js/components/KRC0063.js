$(window).ready(function(){
    if(!document.querySelector('.KRC0063')) return false;

    $('.KRC0063').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0063').find('.ui_carousel_slider').vcCarousel({
            infinite: true,
            autoplay: true,
            autoplaySpeed:3000,
            fade:true,
            swipeToSlide: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    });
})