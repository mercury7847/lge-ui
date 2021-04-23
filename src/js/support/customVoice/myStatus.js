(function() {



    $(window).ready(function() {
        vcui.require([
            'ui/validation'
        ], function() {
            var numberValidation = new vcui.ui.CsValidation('#numberForm', {
                register: {
                    userName1: {
                        msgTarget: '.err-block',
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        maxLength: 30
                    },
                    number: {
                        patternMsg: '접수번호를 입력해 주세요.',
                        errorMsg: '접수번호를 입력해 주세요.',
                        msgTarget: '.err-block',
                        pattern: /^[a-z|A-Z|0-9]+$/,
                        maxLength: 20
                    }
                }
            });

            var authRegister = {
                userName2: {
                    required: true,
                    maxLength: 30,
                    pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해 주세요.',
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
                },
                authNo:{
                    required: true,
                    msgTarget: '.err-block',
                    errorMsg: '인증번호를 입력해주세요.',
                }
            };

            if( $('#phoneForm').length ) { 
                self.authManager = new AuthManager({
                    elem: {
                        form: '#phoneForm',
                        name: '#userName2',
                        phone: '#phoneNo',
                        number: '#authNo'
                    },
                    register: authRegister
                });

            }


            $('#numberForm').find('.btn-confirm').on('click', function() {
                var result = numberValidation.validate(),
                    data = numberValidation.getAllValues();

                if (result.success) {
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost($('#numberForm').data('ajax'), data, function(result) {
                        var data = result.data;

                        if (result.data.resultFlag == 'Y') {
                            $('#numberForm').attr('action', result.data.url).submit();
                        } else if (result.data.resultFlag == 'N') {
                            lgkorUI.alert("", {
                                title: result.data.resultMessage
                            });
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('#phoneForm').find('.btn-confirm').on('click', function() {
                self.authManager.confirm(this, function(success, result) {
                    //success && self.complete();
                });
            });

            $('.btn-send').on('click', function() {
                self.authManager.send(this);
            });
        });
    });
})();