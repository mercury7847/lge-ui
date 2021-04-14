(function(i,s,o,g,r,a,m){
    var isMobile = false;
    if(vcui.detect.isMobile){
        isMobile = true;
    }
    
    if(location.hostname == "www.lge.co.kr") {
        r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
    } else {
        r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
    }

    if(s.getElementById(g)){
        return
    };
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.id=g;
    a.async=1;
    a.src=r;
    m.parentNode.insertBefore(a,m);
})(window,document,'script','crema-jssdk','//widgets.cre.ma/lge.co.kr/init.js');


(function() {
    var KRP0019 = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            var $section = $('.KRP0019');
			//갤러리형 위젯(SNS 리뷰)
            var mobileWidgetId = $section.data('mobileWidgetId');
            var pcWidgetId = $section.data('pcWidgetId');
            var isMobile = vcui.detect.isMobileDevice;
            var widgetId = isMobile ? mobileWidgetId : pcWidgetId;
            if(widgetId) {
                if(isMobile) {
                    $section.find('.cont-wrap').html('<style>.crema-reviews > iframe{max-width:100%!important;}</style><div class="crema-reviews" data-widget-id="' + widgetId + '"></div>');
                } else {
                    $section.find('.cont-wrap').html('<div class="crema-reviews" data-widget-id="' + widgetId + '"></div>');
                }
            }
        }
    }

    $(document).ready(function(){
        if(!document.querySelector('.KRP0019')) return false;
        //$('.KRP0019').buildCommonUI();
        KRP0019.init();
    });
})();