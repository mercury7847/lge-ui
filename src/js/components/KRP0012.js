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
})(window,document,'script','cremajssdk','//widgets.cre.ma/lge.co.kr/init.js');

(function() {
    var KRP0012 = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            var $section = $('.KRP0012');
            var $contWrap = $section.find('.cont-wrap');
            $contWrap.empty();

            var isMobile = vcui.detect.isMobile;
            var productcode = $section.data('productCode');
            //var widgetId = $section.data('widgetId');

            if(productcode) {
                //아이콘 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema_statistics_widget > iframe[src^="[http://review-api9.cre.ma/]http://review-api9.cre.ma";] { display: none !important; }</style>' +
                        '<div class="crema-product-reviews crema_statistics_widget" data-product-code="' + productcode +'" data-widget-id="' + "110" + '" data-widget-style="statistics"></div>');
                } else {
                    $contWrap.append('<style>.crema_statistics_widget > iframe[src^="[http://review-api9.cre.ma/]http://review-api9.cre.ma";] { display: none !important; }</style>' +
                        '<div class="crema-product-reviews crema_statistics_widget" data-product-code="' + productcode +'" data-widget-id="' + "109" + '" data-widget-style="statistics"></div>');
                }

                //상품 리뷰 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema-product-reviews > iframe { max-width: 100% !important; }</style><div class="crema-product-reviews" data-widget-id="' + "26" + '" data-product-code="' + productcode + '"></div>');
                } else {
                    $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '"></div>');
                }

                //상품 소셜 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema-product-reviews > iframe { max-width: 100% !important; }</style><div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + "40" + '"></div>');
                } else {
                    $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + "39" + '"></div>');
                }
            }

            /*
            if(productcode && widgetId) {
                $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + widgetId + '"></div>');
            }
            */
        }
    }

    $(document).ready(function(){
        if(!document.querySelector('.KRP0012')) return false;
        //$('.KRP0012').buildCommonUI();
        KRP0012.init();
    });
})();