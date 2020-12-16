$(window).ready(function(){
    if(!document.querySelector('.KRC0035')) return false;
    
    $('.KRC0035').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$('.KRC0035').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				// prevArrow:'.btn-arrow.prev',
				// nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true
			});
		});
	});
})