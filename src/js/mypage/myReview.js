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

(function() {
    var myReview = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            //var $section = $('.contents.mypage');
            //var $contWrap = $section.find('.lnb-contents');
        }
    }

    $(document).ready(function(){
        myReview.init();
    });
})();