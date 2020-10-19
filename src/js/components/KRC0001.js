$(window).ready(function(){
	if(!document.querySelector('.KRC0001')) return false;

	$('.KRC0001').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0001').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 4,
				slidesToScroll: 4,
				responsive: [{
					breakpoint: 100000,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}]
			});
		});
	});
})