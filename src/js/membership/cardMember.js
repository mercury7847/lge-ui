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

                //BTOCSITE-6130 렌탈 청약시 납부정보 카드혜택 팝업 오류 //BTOCSITE-5938-326 [모니터링] 케어솔루션 할인 혜택 > '제휴카드 할인 혜택 자세히 보기' 이전버튼 반응 없음
                self.$btnBack.on('click', function(e){
                    var paramFlag = lgkorUI.getParameterByName("careSolution");
                    var paramFlagDisc = lgkorUI.getParameterByName("CareDiscount");
                    
                    if( paramFlag != undefined && paramFlag != "" || paramFlagDisc != undefined && paramFlagDisc != "") {
                        if( paramFlag == "true" || paramFlag == true || paramFlagDisc == "Y" ) {
                            // s BTOCSITE-5938-429 : 팝업이 아닌 경우 동장 안됨
                            try {
                                window.close();
                            } finally {
                                window.history.back();
                                e.preventDefault();
                            }
                            // e BTOCSITE-5938-429 : 팝업이 아닌 경우 동장 안됨

                        }
                    } 
                });
            }
        };

        cardMember.init();
    });

})();