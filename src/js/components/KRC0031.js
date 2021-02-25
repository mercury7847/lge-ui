$(window).ready(function(){
    if(!document.querySelector('.KRC0031')) return false;

    $('.KRC0031').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$('.KRC0031').find('.ui_carousel_slider').vcCarousel({
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