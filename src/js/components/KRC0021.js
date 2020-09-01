$(window).ready(function(){
    if(!document.querySelector('.KRC0021')) return false;
    
    var KRC0021 = {
        init: function(){
            vcui.require(['ui/carousel'], function () {
                $('.KRC0021').each(function(idx, item){
                    $(item).find('.ui_carousel_slider').vcCarousel({
                        infinite: false,
                        swipeToSlide: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        prevArrow:'.btn-arrow.prev',
                        nextArrow:'.btn-arrow.next'
                    });
                });
            });
        }
    }
    KRC0021.init();
})