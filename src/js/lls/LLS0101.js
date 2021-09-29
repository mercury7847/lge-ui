var llc = {
    init: function(){
        var self = this;

        self.settings();
        self.alertRedirect();
        self.bindEvents();
    },
    settings: function(){
        var self = this;

        self.$frameContainer= $('.lls-frame-container');
        self.$frameContent = self.$frameContainer.find('.lls-frame-content');
        self.$btnClose = self.$frameContainer.find('.lls-frame-close');
        self.homeUrl = "/livecommerce";
    },
    bindEvents: function(){
        var self = this;

        // self.$btnClose.on('click', function(e){
        //     e.preventDefault();
        //     location.href = self.homeUrl
        // });
    },
    alertRedirect:function(){
        var self = this;

        if( !vcui.detect.isMobileDevice ) {
            self.$frameContent.hide();
            lgkorUI.alert("", {
                title: "LGE.COM APP을 설치하시면 <br>모바일에서 엘라쇼 최신 하이라이트 영상을 <br>편리하게 이용하실 수 있습니다.",
                ok: function(el) {
                    location.href = self.homeUrl
                }
            });
        } else {
            self.$frameContent.show();
        }
    }
}


$(function(){
    llc.init();
});
