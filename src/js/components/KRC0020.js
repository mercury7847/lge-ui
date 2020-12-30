(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRC0020')) return false;

    	$('.KRC0020').buildCommonUI();
        
        var KRC0020 = {
            init: function() {
                var self = this;

                self.setting();
                self.bindEvents();
            },

            setting: function() {
				var self = this;
				self.isDragging = false;
				self.$obj = $('.KRC0020');
				self.$carousel = self.$obj.find('.ui_carousel_slider');
				self.$dots = $('#dots');

				vcui.require(['ui/carousel'], function () {
					self.$carousel.vcCarousel({
						infinite: false,
						responsive: [
						{
							breakpoint: 768,
							settings: {
								dots: true,
								slidesToShow: 3,
								slidesToScroll: 3,
								swipeToSlide: false,
								prevArrow:'.btn-arrow.prev',
            					nextArrow:'.btn-arrow.next',
							}
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
				});

            },

            bindEvents: function() {
				var self = this;
				
				self.$carousel.on('mouseenter', '.slider-nav .icon', function() {
					$(this).addClass('hover');
				}).on('mouseleave', '.slider-nav .icon', function() {
					$(this).removeClass('hover');
				});

				self.$carousel.on('click', '.slider-nav .icon a', function(e){
					var $this = $(this).closest('.icon');
					var thisIndex = $this.index();
					$this.siblings().removeClass('active').attr('aria-selected', false); //PJTWAUS-1 :  20191223 modify
					$this.addClass('active').attr('aria-selected', true); //PJTWAUS-1 : 20191223 modify
					
					$(this).parents('.KRC0020').attr('data-index',thisIndex);
					$(this).parents('.KRC0020').find('.slider-for .group.active').removeClass('active');
					$(this).parents('.KRC0020').find('.slider-for .group:nth-child(' + (thisIndex+1) + ')').addClass('active');
				});

			}
			
        };

        KRC0020.init();
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