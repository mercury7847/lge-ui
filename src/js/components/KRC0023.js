$(window).ready(function(){
    if(!document.querySelector('.KRC0023')) return false;
    
    $('.KRC0023').buildCommonUI();

    $('.KRC0023').find('.ui_carousel_slider2').vcCarousel({
        settings: "unslick",
        responsive: [
            {
                breakpoint: 10000,
                settings: "unslick"
            },
            {
                breakpoint: 768,
                settings: {
                    infinite: false,
                    dots: true,
                    slidesToShow: 1, 
                    slidesToScroll: 1
                }
            }
        ]
    });
})