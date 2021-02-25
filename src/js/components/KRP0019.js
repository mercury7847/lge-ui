$(window).ready(function(){
	if(!document.querySelector('.KRP0019')) return false;

	$('.KRP0019').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRP0019').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				// prevArrow:'.btn-arrow.prev',
				// nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
			});
		});
	});
})