(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRC0020')) return false;

    	$('.KRC0020').buildCommonUI();		

		//vcui.require 위치 이동 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
		vcui.require(['ui/carousel', 'libs/intersection-observer.min'], function () {
			$('.KRC0020').each(function(){
				var root = this;	
	
				var KRC0020 = {
					init: function() {
						var self = this;	
						self.setting();
						self.bindEvents();

						if( $(root).data('autoplay') == true) {
							self.viewportEvent();//이벤트추가 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						}
					},
		
					setting: function() {
						var self = this;
						self.isDragging = false;
						self.$obj = $(root);
						self.timer = null; //반복재생을 위한 timer 세팅 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						self.viewInFlag = false; //슬라이드가 화면에 들어왔는지에 대한 Boolean값 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						self.autoSpeed = 5000; //기본 반복재생 시간 세팅 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
	
						var txtType = $(root).filter('.no-img').length > 0 ? true : false;
	
						var setttingOpt = {
							dots: true,
							slidesToShow: 3,
							slidesToScroll: 3,
							swipeToSlide: false,
							prevArrow:'.btn-arrow.prev',
							nextArrow:'.btn-arrow.next',
						};
						if(txtType){
		
							setttingOpt = {
								dots: true,
								slidesToShow: 1,
								slidesToScroll: 1,
								swipeToSlide: false,
								prevArrow:'.btn-arrow.prev',
								nextArrow:'.btn-arrow.next',
							}
						}
						
		
						self.$carousel = self.$obj.find('.ui_carousel_slider');
		
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
								settings: {
									dots: false,
									slidesToShow: 6,
									slidesToScroll: 1,
									swipeToSlide: true,
								}
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


						//BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 -start
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
						//BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건 -end
					},
					intervalClear: function(){
						//반복 재생 초기화 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						//console.log('clear');
						clearInterval(self.timer);
					},
					enterEvent: function(){
						//화면 중앙에 컴포넌트가 들어왔을때 이벤트 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var $currentVideo = $(root).find('.slider-for .group.active').find('.animation-box video');
						
						self.intervalClear();
	
						if( $currentVideo.length > 0 ) {
							self.autoSpeed = $currentVideo.get(0).duration * 1000	
							$currentVideo.get(0).play();
						} else {
							self.autoSpeed = $(root).data('autoSpeed') != undefined && $(root).data('autoSpeed') != "" ? $(root).data('autoSpeed') : 5000
						}
						self.timer = setInterval(function(){
							var $next = $(root).find('.slider-nav .ui_carousel_slide.active').next();
							var currentIndex = $next.length > 0 ? $next.index() : 0;
							
							$(root).find('.slider-nav .ui_carousel_slide').eq(currentIndex).find('a').trigger('click');
							if( window.innerWidth < 768) {
								self.$carousel.vcCarousel('goTo', currentIndex)
							}
							self.enterEvent();
						}, self.autoSpeed)
	
					},
					leaveEvent: function(){
						//화면 중앙에 컴포넌트가 벗어났을때 이벤트 - BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var $currentVideo = $(root).find('.slider-for .group.active').find('.animation-box video');
	
						self.intervalClear();
	
						if( $currentVideo.length > 0) {
							$currentVideo.get(0).pause();
							$currentVideo.get(0).currentTime = 0;
						}
					},
					viewportEvent: function(){
						//추가: BTOCSITE-8039 WCMS 컴포넌트 개선 요청 건
						var self = this;
						var io = new IntersectionObserver(function(entries, observer) {
							entries.forEach((entry) => {
								if( entry.isIntersecting ) {
									//console.log('enter')
									self.viewInFlag = true;
									self.enterEvent();
								} else {
									//console.log('leave')
									self.viewInFlag = false;
									self.leaveEvent();
								}
							});                            
						}, {root: null, threshold: 0.5})
						io.observe(root);
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