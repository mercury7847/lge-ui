$(window).ready(function(){
	if(!document.querySelector('.KRC0032')) return false;

	$('.KRC0032').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0032').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				playSelector: '.btn-play.play',
			}).on('carouselbeforechange', function(e, slide, prev, next){
				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).pause();
				}
			}).on('carouselafterchange', function(e, slide, prev, next){
				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).play();
				}
			});;
		});
	});
})