$(window).ready(function(){
    vcui.require(['ui/carousel'], function () {
        $('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.package-prev',
            nextArrow:'.package-next',
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

        $('.ui_carousel_slider2').vcCarousel({
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
        });
    });
})