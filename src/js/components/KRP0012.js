//크레마
(function(i,s,o,g,r,a,m){
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
})(window,document,'script','cremajssdk','//widgets.cre.ma/lge.co.kr/init.js');

(function() {
    var KRP0012 = {
        init: function() {
            var self = this;
            if(typeof digitalData !== 'undefined') {
                if(digitalData.userInfo && !vcui.isEmpty(digitalData.userInfo)) {
                    window.cremaAsyncInit = function () {
                        crema.init("이름",digitalData.userInfo.unifyId);
                    };
                } else {
                    window.cremaAsyncInit = function () {
                        crema.init(null,null);
                    };
                }
            } else {
                window.cremaAsyncInit = function () {
                    crema.init(null,null);
                };
            }

            var $section = $('.KRP0012');
            var $contWrap = $section.find('.cont-wrap');
            $contWrap.empty();
            //상품 리뷰 위젯
            var productcode = $section.data('productcode');
            if(productcode) {
                $contWrap.append('<div class="crema-product-reviews" data-productcode="' + productcode + '"></div>');
            }

            //상품 소셜 위젯
            var widgetId = $section.data('widgetId');
            if(productcode && widgetId) {
                $contWrap.append('<div class="crema-product-reviews" data-productcode="' + productcode + '" data-widget-id="' + widgetId + '"></div>');
            }
        }
    }

    $(window).ready(function(){
        if(!document.querySelector('.KRP0012')) return false;
        //$('.KRP0012').buildCommonUI();
        KRP0012.init();
    });
})();