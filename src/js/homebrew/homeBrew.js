(function(){
    var homeBrew = {
        init: function(){
            var self = this;
            self.setting();
            self.bindEvents();
        },

        setting: function() {
            var self = this;
            self.$contents = $('div.contents.care-plan');
            self.$btnArea = self.$contents.find('div.btn-area');
        },

        bindEvents: function() {
            var self = this;
            self.$btnArea.on('click','button', function(e){
                e.preventDefault();
                var index = $(this).index();
                if(index == 0) {
                    //YES
                    var url = self.$contents.data('gotoUrl');
                    if(url) {
                        //하루만 저장
                        lgkorUI.setCookie(lgkorUI.HOMEBREW_CHECK_COOKIE_NAME, "Y", false, 1);
                        location.href = url;
                    }
                } else {
                    //NO 홈이동
                    var url = self.$contents.data('cancelUrl');
                    if(url && url != "null") {
                        location.href = url;
                    } else {
                        history.back();
                        /*
                        var referrer = document.referrer;
                        var index = referrer.indexOf('lge.co.kr');
                        if(index > 0) {
                            history.back();
                        } else {
                            location.href = "/";
                        }
                        */
                    }
                }
            });
        }
    }

    $(document).ready(function() {
        homeBrew.init();
    });
})();