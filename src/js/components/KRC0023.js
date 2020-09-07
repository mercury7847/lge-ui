$(window).ready(function(){
    if(!document.querySelector('.KRC0023')) return false;

    $('.KRC0023').buildCommonUI();
    vcui.require(['ui/carousel'], function () {
        $('.KRC0023').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    });

    function indiTop() {
        var indi = $(".indi-wrap");
        indi.each(function(){
            var visualArea = $(this).parent(".visual-m-area").find('.visual-m-box');
            var iH = visualArea.outerHeight();

            $(this).css('top', iH+16);
        });
    }
    $(window).resize(function(){
        indiTop();
    });
    indiTop();
})