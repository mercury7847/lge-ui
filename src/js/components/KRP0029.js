$(window).ready(function(){
	if(!document.querySelector('.KRP0029')) return false;

	$('.KRP0029').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRP0029').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: false,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 250,
                touchThreshold: 100,
                responsive: [{
                    breakpoint: 20000,
                    settings: {
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }]
			});
		});
	});
})