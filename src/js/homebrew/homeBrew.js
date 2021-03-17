(function(){
    var homeBrew = {
        init: function(){
            var self = this;
            self.setting();
            self.bindEvents();
        },

        setting: function() {
            console.log('asdasd');
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
                    console.log('yes',url);
                    if(url) {
                        lgkorUI.setCookie(lgkorUI.HOMEBREW_CHECK_COOKIE_NAME, "Y");
                        location.href = url;
                    }
                } else {
                    //NO 홈이동
                    console.log('no');
                    location.href = "/";
                }
            });
        }
    }

    $(document).ready(function() {
        homeBrew.init();
    });
})();