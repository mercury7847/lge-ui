$(window).ready(function(){
    if(!document.querySelector('.KRC0023')) return false;
    
    $('.KRC0023').buildCommonUI();

    vcui.require(['ui/toggleCarousel'], function () {

        $('.KRC0023').find('.ui_carousel_slider2').vcToggleCarousel({
            pcOption: "unbuild",
            mobileOption: {
                infinite: true,
                dots: true,
                slidesToShow: 1, 
                slidesToScroll: 1
            }
        });

        console.log('asdfsadf');
    });    

})