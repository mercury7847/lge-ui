$(window).ready(function(){
    if(!document.querySelector('.KRC0039')) return false;

    $('.KRC0039').buildCommonUI();

    vcui.require(['ui/KRC0039'], function () {
        $('.KRC0064').find('.ui_carousel_slider').vcCarousel({
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