$(window).ready(function(){
    if(!document.querySelector('.KRC0009')) return false;
    
    var KRC0009 = {
        init: function(){
            vcui.require(['ui/carousel'], function () {
                $('.KRC0009').each(function(idx, item){
                    $(item).find('.ui_carousel_slider').vcCarousel({
                        infinite: false,
                        swipeToSlide: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        responsive: [{
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });
                });
            });
        }
    }
    KRC0009.init();
})