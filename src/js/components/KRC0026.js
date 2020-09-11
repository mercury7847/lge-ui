$(document).ready(function() {
	if(!document.querySelector('.KRC0026')) return false;

	var KRC0026 = {
		init: function(){
			var self = this;
			var component = $('.KRC0026');

			vcui.require([ 
				'ui/lazyLoader',
				'ui/carousel',
				'ui/modal',
				"ui/youtubeBox",
				"ui/imageSwitch"
			], function () {
				component.vcLazyLoader();
				component.vcImageSwitch();
				component.find('.youtube-box').vcYoutubeBox();
		
				component.find('a[data-control=custom_modal]').each(function(idx, item){		
					$(item).on('click', function(e){
						e.preventDefault();
		
						var modalID = $(this).attr('href');
						$(modalID).vcModal()
						.off('modalshown')
						.on('modalshown', function(e, data){
							self.modalShown(data.module);
						});
					});
				});
			});
		},

		modalShown: function(modal){
			var self = this;

			modal.$el.find(".ui_carousel_slider").vcCarousel({
				infinite: false,
				autoplay: false,
				swipeToSlide: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next'
			}).off('carouselbeforechange')
			.on('carouselbeforechange', function(e, slide, prev, next){
				self.changeVisualContents(modal, prev, next);
			});

			var carousel = modal.$el.find(".ui_carousel_slider").vcCarousel('instance');
			var slideID = carousel.currentSlide;
			modal.$el.find('.visual-box-belt').css('opacity', 1)
			modal.$el.find('.visual-box-belt .visual-box').each(function(idx, item){
				var opacity = slideID == idx ? 1 : 0;
				$(item).css('opacity', opacity);
			});
		},

		changeVisualContents: function(modal, prev, next){
			var self = this,
				visualBox;
			
			visualBox = modal.$el.find('.visual-box-belt .visual-box').eq(prev);
			visualBox.find('.youtube-box').vcYoutubeBox('close');
			visualBox.stop().css('opacity', 0);

			visualBox = modal.$el.find('.visual-box-belt .visual-box').eq(next);
			visualBox.stop().css('opacity', 0).animate({opacity:1}, 350);
		}
	}
	KRC0026.init();
});