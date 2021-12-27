$(window).ready(function(){
	if(!document.querySelector('.KRC0032')) return false;

	$('.KRC0032').buildCommonUI();

	vcui.require(['ui/carousel', 'libs/intersection-observer.min'], function () {
		//해당 슬라이드 자동재생(autoplay) 시작 -BTOCSITE-8039
		function carouselPlay(target){
			$(target).vcCarousel('play');
		}
		
		//해당 슬라이드 자동재생(autoplay) 멈춤 -BTOCSITE-8039
		function carouselStop(target){
			$(target).vcCarousel('pause');
		}

		//슬라이드 이동 시 - 이전 슬라이드의 재생중인 비디오 정지 & 재생시간 초기화 -BTOCSITE-8039
		function prevVideoPause(slide, prev){
			if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
				$(slide.$slides.get(prev)).find("video").get(0).currentTime = 0;
				$(slide.$slides.get(prev)).find("video").get(0).pause();
			}
		}
		//슬라이드 이동 시 - 이전 슬라이드의 활성화된 유튜브레이어 닫기 -BTOCSITE-8039
		function prevYoutubeBoxClose(slide, prev){
			if($(slide.$slides.get(prev)).find('.youtube-box .video-box-closeset').length){
				$(slide.$slides.get(prev)).find(".close-video").trigger('click');
			}
		}

		//슬라이드가 화면 중앙에 올 때 이벤트 -BTOCSITE-8039
		function sectionEnterEvent(target){
			carouselPlay(target)
		}

		//슬라이드가 화면 중앙에서 벗어날 때 이벤트 -BTOCSITE-8039
		function sectionLeaveEvent(target){
			carouselStop(target)
		}
		
		//슬라이드가 화면 중앙인지 아닌지를 체크하여 해당 이벤트 실행 -BTOCSITE-8039
		var io = new IntersectionObserver(function(entries, observer) {
			entries.forEach((entry) => {
				entry.isIntersecting ? sectionEnterEvent(entry.target) : sectionLeaveEvent(entry.target);
			});                            
		}, {root: null, threshold: 0.5});
		
		$('.KRC0032').find(".ui_carousel_slider").each(function(cdx, slide){
			var $slide = $(this);
			var autoPlaySpeed = $slide.data('autoSpeed') != undefined && $slide.data('autoSpeed') != "" ? $slide.data('autoSpeed') : 5000;
			var autoCount = $slide.data('autoCount') != undefined && $slide.data('autoCount') != "" ? $slide.data('autoCount') : false;

			if( autoCount != 'loop' && autoCount != undefined) {
				$slide.data('currentCount', 0);
			}

			if( $slide.find('.ui_carousel_slide').eq(0).find('video').length ) {
				autoPlaySpeed = $slide.find('.ui_carousel_slide').eq(0).find('video')[0].duration * 1000;
			}

			$slide.on('carouselinit', function(e,data){
				vcui.require(['ui/videoBox','ui/youtubeBox'], function(){
					$('.KRC0032').find(".ui_carousel_slider .youtube-box").vcYoutubeBox();
					$('.KRC0032').find(".ui_carousel_slider .animation-box").vcVideoBox();
					var $currentSlide = $(data.$slides[data.currentSlide]);
					if($currentSlide.attr("ui-modules") == "VideoBox"){
						//$currentSlide.find("video").get(0).play()
 					}					
				});

			}).vcCarousel({
				infinite: true,
				autoplay: false,
				autoplaySpeed: autoPlaySpeed,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				playSelector: '.btn-play.play',
				adaptiveHeight:true,
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				speed: 150,
				touchThreshold: 100,
				customPaging: function(slide, i) {      // 인디케이터 버튼 마크업
					var $slide = $(slide.$slider);

					if( $slide.hasClass('indi-type-bar')) {
						var currentSpeed = 5000;
						if( $slide.data('autoSpeed') != undefined && $slide.data('autoSpeed') > 0) {
							currentSpeed = $slide.data('autoSpeed');
						}
						return $('<button type="button" class="btn-indi-bar" />').html('<span class="blind">' + i + 1 + '번 내용 보기</span><span class="bar" style="animation-duration:' + currentSpeed/1000 + 's"></span>');
					} else if($slide.hasClass('indi-type-bar-text')){
						var currentSpeed = 5000;
						if( $slide.data('autoSpeed') != undefined && $slide.data('autoSpeed') > 0) {
							currentSpeed = $slide.data('autoSpeed');
						}

						return $('<button type="button" class="btn-indi-bar-text" />').html('<span class="text">' + $(slide.$slides[i]).data('slideTitle') + '</span><span class="bar" style="animation-duration:' + currentSpeed/1000 + 's"></span>');
					} else {
						return $('<button type="button" class="btn-indi" />').html('<span class="blind">' + i + 1 + '번 내용 보기</span>');
					}

					
				},
			}).on('carouselbeforechange', function(e, slide, prev, next){

				prevVideoPause(slide, prev);
				prevYoutubeBoxClose(slide, prev);

				if( prev == slide.$slides.length-1 && prev > next ) {
					var currentCount = $slide.data('currentCount');
					var autoCount = $slide.data('autoCount');

					if( autoCount != 'loop' && autoCount > 0) {
						if( currentCount < autoCount -1) {
							$slide.data('currentCount', currentCount + 1);
						} else {
							$slide.find('.ui_carousel_play.stop button').trigger('click');
						}
					}
				}
			}).on('carouselafterchange', function(e, slide, currentSlide){
				var $currentSlide = $(slide.$slides.get(currentSlide));
				var autoSpeed = $slide.data('autoSpeed') ? $slide.data('autoSpeed') : 5000;
				if($currentSlide.attr("ui-modules") == "VideoBox"){
					autoSpeed =	$currentSlide.find("video").get(0).duration * 1000;
					$currentSlide.find("video").get(0).play();
				} 
				$slide.find('.indi-wrap li').eq(currentSlide).find('.btn-indi-bar .bar').css({
					'animation-duration' : autoSpeed/1000 + 's'
				})
				$slide.find('.indi-wrap li').eq(currentSlide).find('.btn-indi-bar-text .bar').css({
					'animation-duration' : autoSpeed/1000 + 's'
				})
				$slide.vcCarousel('setOption', 'autoplaySpeed', autoSpeed)
			});	

			io.observe(slide);
		});
	});
})