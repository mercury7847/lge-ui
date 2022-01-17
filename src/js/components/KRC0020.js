(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRC0020')) return false;

    	$('.KRC0020').buildCommonUI();		

		//vcui.require 위치 이동 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
		vcui.require(['ui/carousel', 'libs/intersection-observer.min'], function () {
			var KRC0020PKG = new Array(); // BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건(IE)
			$('.KRC0020').each(function(){
				var root = this;	
	
				var KRC0020 = {
					init: function() {
						var self = this;
						KRC0020PKG.push(self);// BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건(IE)
						self.setting();
						self.bindEvents();

						if( self.autoPlay == true) {
							self.viewportEvent();//이벤트추가 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						}
					},
		
					setting: function() {
						var self = this;
						self.isDragging = false;
						self.$obj = $(root);
						/* s : BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 */
						self.timer = null; //반복재생을 위한 timer 세팅
						self.viewInFlag = false; //슬라이드가 화면에 들어왔는지에 대한 Boolean값
						self.intervalCount = 0; // 반복된 횟수 카운트
						self.autoPlay = $(root).data('autoplay') != undefined && $(root).data('autoplay') != "" ? $(root).data('autoplay') : false; // autoplay 기본값 설정
						self.autoSpeed = $(root).data('autoSpeed') != undefined && $(root).data('autoSpeed') != "" ? $(root).data('autoSpeed') : 3000; //기본 반복재생 시간 세팅
						self.autoCount = $(root).data('autoCount') != undefined && $(root).data('autoCount') != "" ? $(root).data('autoCount'): "loop"; // autoplay 반복 횟수(0 or loop 무한반복)
						self.$carousel = self.$obj.find('.ui_carousel_slider');
						
						var txtType = $(root).filter('.no-img').length > 0 ? true : false;
						var setttingOpt = (txtType) ? {
							dots: true,
							slidesToShow: 1,
							slidesToScroll: 1,
							swipeToSlide: false,
							prevArrow:'.btn-arrow.prev',
							nextArrow:'.btn-arrow.next',
						}:{
							dots: true,
							slidesToShow: 3,
							slidesToScroll: 3,
							swipeToSlide: false,
							prevArrow:'.btn-arrow.prev',
							nextArrow:'.btn-arrow.next',
						};
						var settingOptPc = {
							dots: self.autoPlay,
							slidesToShow: 6,
							slidesToScroll: 6,
							swipeToSlide: false,
							prevArrow:'.btn-arrow.prev',
							nextArrow:'.btn-arrow.next',
						};
						/* e : BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 */
		
						if(txtType){
							self.$carousel.on('carouselinit carouselafterchange', function(e,data,crrentIdx){
								var $target = self.$carousel.find('.slider-nav .ui_carousel_slide a');	
								if($target.length > 0){
									$target.eq(crrentIdx).trigger('click');	
								}								
							});
						}
						self.$carousel.vcCarousel({
							infinite: false,
							cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
							speed: 150,
							touchThreshold: 100,
							responsive: [
							{
								breakpoint: 768,
								settings: setttingOpt
							},
							{
								breakpoint: 999999,
								settings: settingOptPc
							}]
						});
					},
	
					selectIndex:function(e){
	
						e.preventDefault();
						var $this = $(this).closest('.ui_carousel_slide');
						var thisIndex = $this.index();
						$this.siblings().removeClass('active').attr('aria-selected', false); //PJTWAUS-1 :  20191223 modify
						$this.addClass('active').attr('aria-selected', true); //PJTWAUS-1 : 20191223 modify
						
						$(this).parents('.KRC0020').attr('data-index',thisIndex);
						$(this).parents('.KRC0020').find('.slider-for .group.active').removeClass('active');
						$(this).parents('.KRC0020').find('.slider-for .group:nth-child(' + (thisIndex+1) + ')').addClass('active');
					},
		
					bindEvents: function() {
						var self = this;
						
						self.$carousel.on('mouseenter', '.slider-nav .ui_carousel_slide', function() {
							$(this).addClass('hover');
						}).on('mouseleave', '.slider-nav .ui_carousel_slide', function() {
							$(this).removeClass('hover');
						});
		
						self.$carousel.on('click', '.slider-nav .ui_carousel_slide a', self.selectIndex);
						/* s : BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 */
						// autoplay 슬라이드 컨트롤 버튼
						self.$carousel.on('click', '.ui_carousel_play .btn-play', function() {
							var $playWrap = $(this).parents('.ui_carousel_play');
							if($playWrap.hasClass('play')) {
								self.viewInFlag = true;
								self.enterEvent();
							}else {
								self.viewInFlag = false;
								clearInterval(self.timer);
								$playWrap.removeClass('stop').addClass('play');
							}

							if($(root).data('loopComplete')) {
								$(root).data('loopComplete', false);
								self.intervalCount = 0;
								self.viewInFlag = true;
								self.enterEvent();
							}
						});
						//화면에 들어왔을때 컴포넌트안에 마우스, 포커스에 따라 반복 재생/정지
						$(root).on('mouseenter touchstart mouseleave focusin focusout touchend', function(e){
							var autoPlayFlag = $(root).data('autoplay') != undefined && $(root).data('autoplay') != "" && $(root).data('autoplay') == true;
							if( e.type == "mouseenter" || e.type == 'touchstart' || e.type == 'focusin' ) {
								if( autoPlayFlag) {
									clearInterval(self.timer);
								}
							}
							if( e.type == "mouseleave" || e.type == 'touchend' || e.type == 'focusout' ) {
								if( autoPlayFlag && self.viewInFlag == true) {
									self.enterEvent();
								}
							}
						})
						/* e : BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 */
					},
					intervalClear: function(){
						//반복 재생 초기화 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var $playWrap = self.$carousel.find('.ui_carousel_play');
						$playWrap.removeClass('stop').addClass('play');
						clearInterval(self.timer);
					},
					enterEvent: function(){
						//화면 중앙에 컴포넌트가 들어왔을때 이벤트 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var $currentVideo = $(root).find('.slider-for .group.active').find('.animation-box video');
						var $playWrap = self.$carousel.find('.ui_carousel_play');

						self.intervalClear();
						if(self.autoCount == 'loop' || self.autoCount > self.intervalCount) {
							$playWrap.removeClass('play').addClass('stop');
		
							if( $currentVideo.length > 0  && $currentVideo.get(0).hasAttribute('autoplay')) {
								self.autoSpeed = $currentVideo.get(0).duration * 1000	
								$currentVideo.get(0).play();
							} else {
								self.autoSpeed = $(root).data('autoSpeed') != undefined && $(root).data('autoSpeed') != "" ? $(root).data('autoSpeed') : 5000
							}
							self.timer = setInterval(function(){
								var $next = $(root).find('.slider-nav .ui_carousel_slide.active').next();
								var currentIndex = $next.length > 0 ? $next.index() : 0;
								if(currentIndex == $(root).find('.slider-for .group').size()-1) self.intervalCount++;
								$(root).find('.slider-nav .ui_carousel_slide').eq(currentIndex).find('a').trigger('click');
								if( !$(root).find('.slider-nav .ui_carousel_slide').eq(currentIndex).hasClass('on')) {
									self.$carousel.vcCarousel('goTo', currentIndex)
								}
								self.enterEvent();
							}, self.autoSpeed);
						}else {
							$(root).data('loopComplete', true);
							self.$carousel.vcCarousel('stop');
							self.intervalClear();
						}
	
					},
					leaveEvent: function(){
						//화면 중앙에 컴포넌트가 벗어났을때 이벤트 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var $currentVideo = $(root).find('.slider-for .group.active').find('.animation-box video');
	
						self.intervalClear();
						self.intervalCount = 0;
						$(root).data('loopComplete', false);
	
						if( $currentVideo.length > 0) {
							$currentVideo.get(0).pause();
							$currentVideo.get(0).currentTime = 0;
						}
					},
					viewportEvent: function(){
						//추가: BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						if(vcui.detect.isIE) { // BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건(IE)
							if(checkVisible(self.$carousel)) {
								self.viewInFlag = true;
								self.enterEvent();
							}
							$(window).off('scroll.viewportEvent').on('scroll.viewportEvent',function() {
								$('.KRC0020').each(function(i) {
									if(KRC0020PKG[i].autoPlay) {
										if(checkVisible($(this))) {
											KRC0020PKG[i].viewInFlag = true;
											KRC0020PKG[i].enterEvent();
										}else {
											KRC0020PKG[i].viewInFlag = false;
											KRC0020PKG[i].leaveEvent();
										}
										
									}
								})
							})
	
							function checkVisible( elm, eval ) {
								eval = eval || "object visible";
								var viewportHeight = $(window).height(),
									scrolltop = $(window).scrollTop(),
									y = $(elm).offset().top,
									elementHeight = $(elm).height();   
								
								if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
								if (eval == "above") return ((y < (viewportHeight + scrolltop)));
							}
						} else {
							var io = new IntersectionObserver(function(entries, observer) {
								entries.forEach(function(entry){
									if( entry.isIntersecting ) {
										self.viewInFlag = true;
										self.enterEvent();
									} else {
										self.viewInFlag = false;
										self.leaveEvent();
									}
								});                            
							}, {root: null, threshold: 0.5})
							io.observe(root);
						}
					}
				};
		
				KRC0020.init();
			})
		});
    });
})();

/*
$(document).ready(function() {
	if(!document.querySelector('.KRC0020')) return false;

    $('.KRC0020').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRC0020').find('.ui_carousel_slider').vcCarousel({
			infinite: false,
			swipeToSlide: true,
			slidesToShow: 6,
			dots: false,
			responsive: [{
				breakpoint: 768,
				settings: {
					dots: true,
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}]
		});
	});


	var $obj = $('.KRC0020');
	var $objIndex = $obj.attr('data-index','0');

	$obj.each(function(){
		if ($(this).hasClass('bg-dark') || $(this).hasClass('bg-black')){
			$(this).find('.slider-nav .icon a').find('img.off').attr('src', '/lg5-common/images/KRC0020/icon-off.png');
		}	
		else {
			$(this).find('.slider-nav .icon a').find('img.off').attr('src', '/lg5-common/images/KRC0020/icon-off.png');
		}
	
	});
	
	var ani ={
		event: function(obj) {
			var $icon = $obj.find('.slider-nav .icon a');

			$icon.hover(function(){
				$(this).closest('.icon').addClass('hover');
			}, function(){
				$(this).closest('.icon').removeClass('hover');
			});
			$icon.on('click', function(){
				var $this = $(this).closest('.icon');
				var $thisIndex = $this.index();
				$this.siblings().removeClass('active').attr('aria-selected', false); //PJTWAUS-1 :  20191223 modify
				$this.addClass('active').attr('aria-selected', true); //PJTWAUS-1 : 20191223 modify
				//$(this).parents('.icon-area').next().find('.group').removeClass('active');
				//$(this).parents('.icon-area').next().find('.group').eq($thisIndex).addClass('active');
				$(this).parents('.icon-area').siblings('.text-area').find('.group.active').removeClass('active');
				$(this).parents('.icon-area').siblings('.text-area').find('.group').eq($thisIndex).addClass('active');
				$(this).parents('.KRC0020').attr('data-index',$thisIndex);
				return false;
			});
		}
	};

	ani.event();

});
*/