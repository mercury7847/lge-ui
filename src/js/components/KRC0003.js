$(window).ready(function(){
	if(!document.querySelector('.KRC0003')) return false;

	$('.KRC0003').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0003').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: true,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1
			});
		});
	});
})