$(window).ready(function(){
	if(!document.querySelector('.KRC0051')) return false;

	$('.KRC0051').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0051').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				swipeToSlide: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 1
					}
				}]
			});
		});
	});
})