$(document).ready(function() {
	if(!document.querySelector('.KRC0026')) return false;

	vcui.require([ 
		'ui/lazyLoader'
	], function () {
		$('.KRC0026').vcLazyLoader();
	});
});