$(document).ready(function() {
	if(!document.querySelector('.KRC0016')) return false;

    $('.KRC0016').buildCommonUI();

	var componentAnimateObj = $('.KRC0016');
	
	componentAnimateObj.each(function(){
		var visualObj = $(this).find('.visual-area');
		var visualTarget = visualObj.find('.show-cut');
		var playTimer = 1000;
		var easing = 'easeOutCubic';
		$(window).resize(function(){
			$(window).scroll(function(){
				var windowTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var brw_btm = (windowTop + windowHeight);
				var positionFix = visualObj.height()/2;
				var objPosition = visualObj.offset().top + positionFix;
				if ( windowTop < objPosition && objPosition < brw_btm ) {
					if (visualObj.hasClass('show-cut-bt') && !visualObj.hasClass('center')) {
						visualTarget.addClass('center');
					} else if ( visualObj.hasClass('show-cut-rl') && !visualObj.hasClass('center')) {
						visualTarget.addClass('center');
					} else {
						return false;
					}
				}
			});
		}).resize();
	});
});