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
			$(modal).css('display', 'block');
			$(modal).find(".ui_carousel_slider").vcCarousel();
			$(modal).css('display', 'none');

			$(item).on('click', function(e){
				e.preventDefault();

				var modalID = $(this).attr('href');
				$(modalID).vcModal();
			})
		});
	});

});