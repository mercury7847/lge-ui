$(window).ready(function(){
	if(!document.querySelector('.KRC0001')) return false;

	$('.KRC0001').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0001').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				swipeToSlide: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				}]
			});
		});
	});
})