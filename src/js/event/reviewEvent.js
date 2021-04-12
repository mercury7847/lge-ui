(function() {
    var ReviewEvent = {
        init: function() {
            var self = this;
            self.setting();
            self.bindEvent();
        },

        setting: function() {
            var self = this;
            self.$contents = $('.contents.event');
            self.$event3 = self.$contents('.event03');
            var $inputs = self.$event3.find('dl.forms div.box div.input-wrap input');
            var $buttons = self.$event3.find('dl.forms div.box div.cell button');
            //모델번호
            self.$modelInput = $inputs.eq(0);
            self.$modelCheckOk = self.$modelInput.siblings('p.comp');
            self.$modelCheckOk.hide();
            self.$modelCheckButton = $buttons.eq(0);

            self.$reviewButton = self.$event3.find('.btns button');
        },

        bindEvent: function() {
            self.$reviewButton.on('click',function(e){
                e.preventDefault();
                 //체크
                 var param = {};
                 var $chk = self.$event3.find('#chk1-1');
                 if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$replyPopup.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                $chk = self.$replyPopup.find('#chk3-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '콘텐츠 저작권 양도 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk3 = "Y"
                    }
                }

                var modelCheck = self.$modelInput.data('check');
                var modelId = self.$modelInput.data('modelId');
                if(modelId && modelId) {

                } else {
                    lgkorUI.alert("", {title: '콘텐츠 저작권 양도 동의는 필수입니다.'});
                }

            });
        }
    }

    $(document).ready(function() {
        ReviewEvent.init();
    });
})();