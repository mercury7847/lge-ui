$(document).ready(function() {
	if(!document.querySelector('.KRC0026')) return false;

	vcui.require([ 
		'ui/lazyLoader',
		'ui/carousel',
		'ui/modal'
	], function () {
		$('.KRC0026').vcLazyLoader();

		$('.KRC0026').find('a[data-control=custom_modal]').each(function(idx, item){
			var modal = $(item).attr("href");

			$(modal).find('.ui_carousel_slider').each(function(sdx, slide){

			});

			$(item).on('click', function(e){
				e.preventDefault();

				var modalID = $(this).attr('href');
				$(modalID).vcModal()
				.on('modalshown', function(){
					$(modalID).find(".ui_carousel_slider").vcCarousel({
						infinite: false,
						autoplay: false,
						swipeToSlide: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						prevArrow:'.btn-arrow.prev',
						nextArrow:'.btn-arrow.next'
					});
				});
			})
		});
	});

});