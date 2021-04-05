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

(function(){

    var myHome = {
        init: function() {
            //크레마
            lgkorUI.cremaLogin();
            
            //
            var cremaReviewTemplate =
                (vcui.detect.isMobile) ? '<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}" review-source="mobile_my_orders">리뷰작성</a>':'<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}">리뷰작성</a>';

            var $li = $('li.review-here[data-model-code]');
            $li.each(function(index, item){
                if(item.dataset.reviewFlag.toLowerCase() == "s") {
                    var enModelName = item.dataset.modelCode;
                    $(item).append(vcui.template(cremaReviewTemplate, {"enModelName":enModelName}));
                }
            });

            //크레마# 이동 막음
            $li.on('click','a.crema-new-review-link', function(e) {
                if($(this).attr('href') == "#") {
                    e.preventDefault();
                }
            });

            //크레마 리로드
            lgkorUI.cremaReload();
        }
    }

    $(document).ready(function() {
        myHome.init();
    });
})();