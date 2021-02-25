$(window).ready(function(){
    if(!document.querySelector('.KRC0018')) return false;
    
    $('.KRC0018').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$('.KRC0018').find('.ui_carousel_slider_0018').vcCarousel({
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
	});
})