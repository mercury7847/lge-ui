$(document).ready(function() {
	if(!document.querySelector('.KRC0026')) return false;

    $('.KRC0026').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0026').find('.ui_carousel_slider').vcCarousel({
			infinite: false,
			autoplay: false,
			swipeToSlide: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow:'.btn-arrow.prev',
			nextArrow:'.btn-arrow.next',
			playSelector: '.btn-play.play'
		});
	});
});