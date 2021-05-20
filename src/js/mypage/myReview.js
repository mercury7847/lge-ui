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