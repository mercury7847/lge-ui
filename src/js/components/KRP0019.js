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