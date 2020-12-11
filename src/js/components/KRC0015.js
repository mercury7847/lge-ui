$(window).ready(function(){
    if(!document.querySelector('.KRC0015')) return false;

    $('.KRC0015').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        $('.KRC0015').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: true,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            playSelector: '.btn-play.play'
        }).on('carouselbeforechange', function(e, slide, prev, next){
            if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
                $(slide.$slides.get(prev)).find("video").get(0).pause();
            }            
        }).on('carouselafterchange', function(e, slide, prev, next){
            if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
                $(slide.$slides.get(prev)).find("video").get(0).play();
            }            
        });
    });
});