$(window).ready(function(){
    var componentID = "KRC0017";

    if(!document.querySelector('.' + componentID)) return false;
    
    vcui.require(['ui/carousel'], function () {
        $('.' + componentID).each(function(idx, item){
            $(item).find('.ui_carousel_slider').vcCarousel({
                infinite: false,
                prevArrow:'.btn-arrow.prev',
                nextArrow:'.btn-arrow.next',
                swipeToSlide: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 1270,
                    settings: {
                        slidesToShow: 5
                    }
                }, {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }]
            });
        });
    });
})