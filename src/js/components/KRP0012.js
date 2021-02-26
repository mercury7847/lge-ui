//크레마
window.cremaAsyncInit = function () {
    crema.init(null,null);
};

(function(i,s,o,g,r,a,m){
    if(s.getElementById(g)){
        return
    };
    a=s.createElement(o),m=s.getElementsByTagName(o)[0];
    a.id=g;
    a.async=1;
    a.src=r;
    m.parentNode.insertBefore(a,m);
    console.log('i',i);
    console.log('s',s);
    console.log('o',o);
    console.log('g',g);
    console.log('r',r);
    console.log('a',a);
    console.log('m',m);
})(window,document,'script','cremajssdk','//widgets.cre.ma/lge.co.kr/init.js');

(function() {
    var KRP0012 = {
        init: function() {
            var self = this;
            var $section = $('.KRP0012');
            var productcode = $section.data('productcode');
            if(productcode) {
                $section.find('.cont-wrap').html('<div class="crema-product-reviews" data-productcode="' + productcode + '"></div>');
            }
        }
    }

    $(window).ready(function(){
        if(!document.querySelector('.KRP0012')) return false;
        $('.KRP0012').buildCommonUI();
        KRP0012.init();
    });
})();