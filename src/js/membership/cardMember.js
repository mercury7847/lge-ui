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
                self.$btnBack = $('.mobile-nav-wrap').find('.btn-back');
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

                //BTOCSITE-6130 렌탈 청약시 납부정보 카드혜택 팝업 오류
                self.$btnBack.on('click', function(e){
                    var paramFlag = lgkorUI.getParameterByName("careSolution");
                    
                    if( paramFlag != undefined && paramFlag != "" ) {
                        if( paramFlag == "true" || paramFlag == true) {
                            e.preventDefault();
                            window.close();
                        }
                    }
                });
            }
        };

        cardMember.init();
    });

})();