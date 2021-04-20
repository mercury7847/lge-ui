(function() {
    var RumorEvent = {
        init: function() {
            var self = this;
            self.setting();
            self.bindEvent();
        },

        setting: function() {
            var self = this;
            self.$event4 = $('.event04');
            self.$btns = self.$event4.find('.apply-wrap .btns');
            self.$snsPopup = $('#apply');
        },

        bindEvent: function() {
            var self = this;

            //해쉬태그 복사
            self.$btns.on('click','a.hash',function (e) {
                e.preventDefault();
                var hash = self.$event4.data('hash');
                if(hash) {
                    vcui.dom.copyToClipboard(hash, {
                        onSuccess: function () {
                            $(window).trigger("toastshow", "해쉬태그가 복사되었습니다.");
                        }
                    });
                }
            });

            //이벤트 응모
            self.$btns.on('click','a.event',function (e) {
                e.preventDefault();
                //로그인을 해야 하는가
                var login = self.$event4.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                self.$snsPopup.vcModal({opener: this});
            });

            //팝업 참여하기
            self.$snsPopup.on('click','.pop-footer .btn-group button',function (e) {
                console.log('222?');
                e.preventDefault();
                //로그인을 해야 하는가
                var login = self.$event4.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                 //체크
                var param = {};
                var $chk = self.$snsPopup.find('#chk1-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$snsPopup.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                $chk = self.$snsPopup.find('#chk3-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '콘텐츠 저작권 양도 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk3 = "Y"
                    }
                }

                var reply = self.$replyPopup.find('#reply').val();
                var checkReply = vcui.string.replaceAll(reply," ","");
                if(checkReply.length > 0) {
                    param.reply = reply;
                } else {
                    lgkorUI.alert("", {title: 'URL주소를 입력해주세요.'});
                    return;
                }

                var eventId = self.$event4.data('eventId');
                param.eventId = eventId;

                var isApplication = isApp();
                param.isApp = isApplication ? "Y" : "N";

                var ajaxUrl = self.$event4.data('sendUrl');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl,param,function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        lgkorUI.alert("", {title: "이벤트에 참여되었습니다.", ok: function(){
                            if(typeof dataLayer !== 'undefined' && dataLayer) {
                                dataLayer.push({				
                                'event': 'customEvent',				
                                'customEventCategory': '이벤트',				
                                'customEventAction': '이벤트 - 신청 완료',				
                                'customEventLabel': '컨텐츠 : ' + eventId
                                });
                            }
                        }});

                        console.log('clise?');
                        self.$snsPopup.vcModal('close');
                    }
                });
            });
        }
    }

    $(document).ready(function() {
        RumorEvent.init();
    });
})();