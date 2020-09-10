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
			if(modal.$el.find(".ui_carousel_slider").attr('ui-modules') == undefined){
				modal.$el.find(".ui_carousel_slider").vcCarousel({
					infinite: false,
					autoplay: false,
					swipeToSlide: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					prevArrow:'.btn-arrow.prev',
					nextArrow:'.btn-arrow.next'
				}).on('carouselbeforechange', function(e, slide, prev, next){
					if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
						$(slide.$slides.get(prev)).find("video").get(0).pause();
					}            
				}).on('carouselafterchange', function(e, slide, prev, next){
					if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
						$(slide.$slides.get(prev)).find("video").get(0).play();
					}            
				});
			}
			var carousel = modal.$el.find(".ui_carousel_slider").vcCarousel('instance');
			var slideID = carousel.currentSlide;
			modal.$el.find('.visual-box-belt').css('opacity', 1)
			modal.$el.find('.visual-box-belt .visual-box').each(function(idx, item){
				var opacity = slideID == idx ? 1 : 0;
				$(item).css('opacity', opacity);
			});

			modal.$el.find('.youtube-box').vcYoutubeBox();
		}
	}
	KRC0026.init();
});