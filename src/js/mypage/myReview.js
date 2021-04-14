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
    var myReview = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            var $section = $('.contents.mypage');
            var $contWrap = $section.find('.lnb-contents');

            if(vcui.detect.isMobile){
                $contWrap.append('<style>.crema-reviews > iframe { max-width: 100% !important; }</style> <div class="crema-reviews" data-type="managing-reviews"></div>');
            } else {
                $contWrap.append('<div class="crema-reviews" data-type="managing-reviews"></div>');
            }

            //크레마 리로드
            lgkorUI.cremaReload();
        }
    }

    $(document).ready(function(){
        myReview.init();
    });
})();