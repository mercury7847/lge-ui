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
            nextArrow:'.btn-arrow.next'
        });
    });

    function indiTop() {
        var indi = $('.KRC0012').find(".indi-wrap");
        indi.each(function(){
            var visualArea = $(this).parent(".items-group").find('.visual-wrap');
            var iH = visualArea.outerHeight();

            $(this).css('top', iH+24);
        });
    }
    $(window).resize(function(){
        indiTop();
    });
    indiTop();
})