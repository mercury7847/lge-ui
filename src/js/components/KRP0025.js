$(window).ready(function(){
	if(!document.querySelector('.KRP0025')) return false;

	$('.KRP0025').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRP0025').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: false,
				// prevArrow:'.btn-arrow.prev',
				// nextArrow:'.btn-arrow.next',
				slidesToShow: 2,
				slidesToScroll: 2,
				responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 2,
                            slidesToShow: 2
                        }
                    }
                ]
			});
		});
	});
})