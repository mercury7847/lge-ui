//크레마
(function(i,s,o,g,r,a,m){

    if(vcui.detect.isMobile){
        r = "//widgets.cre.ma/lge.co.kr/mobile/init.js";
    }

    if(s.getElementById(g)){
        return
    };
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.id=g;
    a.async=1;
    a.src=r;
    m.parentNode.insertBefore(a,m);
    /*
    console.log('i',i);
    console.log('s',s);
    console.log('o',o);
    console.log('g',g);
    console.log('r',r);
    console.log('a',a);
    console.log('m',m);
    */
})(window,document,'script','cremajssdk','//swidgets.cre.ma/lge.co.kr/init.js');


(function() {
    var KRP0012 = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            var $section = $('.KRP0019');
			//갤러리형 위젯(SNS 리뷰)
            var widgetId = $section.data('widgetId');
            if(widgetId) {
                $section.find('.cont-wrap').html('<div class="crema-reviews" data-widget-id="'  + widgetId + '"></div>');
            }
        }
    }

    $(document).ready(function(){
        if(!document.querySelector('.KRP0019')) return false;
        //$('.KRP0019').buildCommonUI();
        KRP0012.init();
    });
})();

/*
$(window).ready(function(){
	if(!document.querySelector('.KRP0019')) return false;

	$('.KRP0019').buildCommonUI();

	vcui.require(['ui/carousel'], function () {
		$('.KRP0019').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				// prevArrow:'.btn-arrow.prev',
				// nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
			});
		});
	});
})
*/