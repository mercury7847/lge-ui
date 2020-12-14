$(window).ready(function(){
    if(!document.querySelector('.KRC0002')) return false;

    $('.KRC0002').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$('.KRC0002').find(".ui_carousel_5_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 5,
                slidesToScroll: 5,

				responsive: [{
					breakpoint: 100000,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 5,
					}
				},{
					breakpoint: 1320,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},{
					breakpoint: 1100,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
                }]
                
            });
        });
	});
})