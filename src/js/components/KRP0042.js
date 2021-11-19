$(window).ready(function(){
	if(!document.querySelector('.KRP0042')) return false;

	$('.KRP0042').buildCommonUI();

	vcui.require(['ui/carousel'], function () {

		$('.KRP0042').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).on('carouselinit', function(e,data){

				vcui.require(['ui/videoBox','ui/youtubeBox'], function(){

					$('.KRP0042').find(".ui_carousel_slider .youtube-box").vcYoutubeBox();
					$('.KRP0042').find(".ui_carousel_slider .animation-box").vcVideoBox();
				});

			}).vcCarousel({
				infinite: false,
				autoplay: true,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				playSelector: '.btn-play.play',
				adaptiveHeight:true,
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				speed: 150,
				touchThreshold: 100

			}).on('carouselbeforechange', function(e, slide, prev, next){

				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).pause();
				}
			}).on('carouselafterchange', function(e, slide, prev, next){

				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).play();
				}
			});
		});
	});
	$(document).on('click', '.banner-btn a', function(e){
		var target = this.getAttribute('target');
		if(target == "_blank"){
			if(isApp()) {
				e.preventDefault();
				var appUrl = $(this).attr('href');
				if (!(appUrl.match('https://'))) {
					appUrl = 'https://'+window.LGEAPPHostName+appUrl;
				} 
				if(vcui.detect.isIOS){
					var jsonString = JSON.stringify({'url': appUrl, 'command':'sendOutLink'});
					webkit.messageHandlers.callbackHandler.postMessage(jsonString);
				} else {
					android.openLinkOut(appUrl);
				}
			} 
		}
	})
})