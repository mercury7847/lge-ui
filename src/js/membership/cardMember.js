//cardInfoPopup
(function() {
    $(window).ready(function() {
        var cardMember = {
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.contents.membership');
                self.$cardInfoPopup = $('#cardInfoPopup');
            },

            bindEvents: function() {
                var self = this;

                //카테고리탭
                self.$contents.on('click', 'div.application-btn a', function(e){
                    e.preventDefault();
                    self.$cardInfoPopup.vcModal({opener:$(this)});
                });

                self.$cardInfoPopup.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e) {
                    var url = self.$cardInfoPopup.attr('data-url');
                    if(!(!url)) {
                        location.href = url;
                    }
                });
            }
        };

        cardMember.init();
    });

})();