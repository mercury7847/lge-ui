(function() {
    var validation;
    var authManager;
    var detect = vcui.detect;
    var isLogin = lgkorUI.isLogin;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');
            self.$authPopup = $('#certificationPopup');

            self.$cont.find('#route').val(detect.isMobile ? 'WWW2' : 'WWWW1');

            var register = {
                privcyCheck: {
                    msgTarget: '.err-block'
                },
                userNm: {
                    required: true,
                    maxLength: 30,
                    pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                },
                phoneNo: {
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                    msgTarget: '.err-block',
                    errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                    patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                    validate : function(value){
                        return validatePhone(value);
                    } 
                }
            };

            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.CsValidation('#submitForm', {register:register});
                if (!isLogin) {
                    authManager = new AuthManager({
                        elem: {
                            popup: '#certificationPopup',
                            name: '#authName',
                            phone: '#authPhoneNo',
                            number: '#authNo'
                        },
                        register: {
                            authName: {
                                required: true,
                                maxLength: 30,
                                pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                                msgTarget: '.err-block',
                                errorMsg: '이름을 입력해주세요.',
                                patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                            },
                            authPhoneNo: {
                                required: true,
                                minLength: 10,
                                maxLength: 11,
                                msgTarget: '.err-block',
                                errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                                patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                                validate : function(value){
                                    return validatePhone(value);
                                } 
                            },
                            authNo:{
                                required: true,
                                msgTarget: '.err-block',
                                errorMsg: '인증번호를 입력해주세요.',
                            }
                        }
                    });
                }

                self.bindEvent();
            });
        },
        requestComplete: function() {
            var self = this;
            var url = self.$submitForm.data('ajax'),
                param = validation.getAllValues();

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$cont.find('#acptNo').val(data.acptNo);
                    self.$submitForm.submit();
                } else {
                    lgkorUI.hideLoading();

                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            });
        },
        bindEvent: function() {
            var self = this;

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (isLogin) {
                        lgkorUI.confirm('', {
                            title:'예약 하시겠습니까?',
                            okBtnName: '확인',
                            cancelBtnName: '취소',
                            ok: function() {
                                self.requestComplete();
                            }
                        });       
                    } else {
                        authManager.open(function() {
                            $('#authName').val($('#userNm').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
                    }
                }
            });

            // 인증문자 보내기
            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            // 인증 완료 하기
            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function(success, result) {
                    success && self.requestComplete();
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();