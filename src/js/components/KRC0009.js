$(window).ready(function(){
    var componentID = "KRC0009";

    if(!document.querySelector('.' + componentID)) return false;
    
    vcui.require(['ui/carousel'], function () {
        $('.' + componentID).each(function(idx, item){
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
})