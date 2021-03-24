(function(i,s,o,g,r,a,m){
    var isMobile = false;
    if(vcui.detect.isMobile){
        isMobile = true;
    }
    
    if(location.hostname == "www.lge.co.kr") {
        r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
    } else {
        r = isMobile ? "//swidgets.cre.ma/lge.co.kr/mobile/init.js" : "//swidgets.cre.ma/lge.co.kr/init.js";
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

(function(){

    var myHome = {
        init: function() {
            //크레마
            lgkorUI.cremaLogin();
            
            //
            var cremaReviewTemplate =
                (vcui.detect.isMobile) ? '<a href="#" class="crema-new-review-link btn gray size" data-product-code="{{enModelName}}" review-source="mobile_my_orders">리뷰작성</a>':'<a href="#" class="crema-new-review-link btn gray size" data-product-code="{{enModelName}}">리뷰작성</a>';

            var $li = $('li.review-here[data-model-code]');
            $li.each(function(index, item){
                var enModelName = item.dataset.modelCode;
                $(item).append(vcui.template(cremaReviewTemplate, {"enModelName":enModelName}));
            });

            //크레마# 이동 막음
            $li.on('click','a.crema-new-review-link', function(e) {
                e.preventDefault();
            });

            //크레마 리로드
            lgkorUI.cremaReload();
        }
    }

    $(document).ready(function() {
        myHome.init();
    });
})();