$(document).ready(function(){
	var $KRC0035 = $('.KRC0035');

	//if(!document.querySelector('.KRC0035')) return false;
    if(!($KRC0035.length > 0)) return false;
	
	var $KRC0035 = $('.KRC0035');

    $KRC0035.buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$KRC0035.find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				lazyLoad: 'anticipated', //수정 jsw
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				touchThreshold: 100,
				speed: 150
			});
		});
		//$('body').vcLazyLoaderSwitch('reload',$KRC0035);
	});
})