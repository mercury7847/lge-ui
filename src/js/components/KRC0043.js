$(window).ready(function(){
    if(!document.querySelector('.KRC0043')) return false;

    $('.KRC0043').buildCommonUI();

    ;(function($, _$){   
        
        vcui.require(['ui/carousel'], function () {

            $('.ui_carousel_slider').vcCarousel({
                infinite: false,
                fade:true,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        fade:false,
                        swipeToSlide:false
                    }
                }],
                asNavFor: '.ui_carousel_thumb_slider'
            })

            $('.ui_carousel_thumb_slider').vcCarousel({
                infinite: false,
                prevArrow:'.btn-arrow.prev',
                nextArrow:'.btn-arrow.next',
                swipeToSlide: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                focusOnChange:true,
                focusOnSelect: true,
                asNavFor: '.ui_carousel_slider'
            });

        });           
        
    })(
        function (selector){
            return $('.KRC0043').find(selector); 
        }, $
    );


})