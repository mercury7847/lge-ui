$(window).ready(function(){
    var componentID = "KRP0013";

    if(!document.querySelector('.' + componentID)) return false;
    
    vcui.require(['ui/carousel'], function () {
        $('.' + componentID).each(function(idx, item){
            $(item).find(".ui_carousel_slider").each(function(cdx, slide){
                if($(slide).hasClass("rowColumn")){
                    $(slide).vcCarousel({
                        infinite: false,
                        swipeToSlide: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    })
                } else{
                    $(slide).vcCarousel({
                        infinite: false,
                        prevArrow:'.btn-arrow.prev',
                        nextArrow:'.btn-arrow.next',
                        swipeToSlide: true,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 2
                                }
                            }, 
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1
                                }
                            }
                        ]
                    });
                }
            });
        });
    });
})