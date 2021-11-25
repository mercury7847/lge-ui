(function() {
    var authManager;
    var authFlag = lgkorUI.isLogin;

    var custom = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');
            self.$authPopup = $('#certificationPopup');

            vcui.require(['ui/validation', 'ui/formatter'], function () {
               var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    // userName: {
                    //     required: true,
                    //     maxLength: 30,
                    //     pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                    //     msgTarget: '.err-block',
                    //     errorMsg: '이름을 입력해주세요.',
                    //     patternMsg: '이름은 한글 또는 영문만 입력 가능합니다.'
                    // },
                    // phoneNo: {
                    //     required: true,
                    //     minLength: 10,
                    //     maxLength: 11,
                    //     msgTarget: '.err-block',
                    //     errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                    //     patternMsg: '정확한 휴대폰번호를 입력해주세요.'
                    // },
                    // contactPhoneNo1 : {
                    //     pattern: /^(010|011|016|017|018|019)$/,
                    //     msgTarget: '.contact-box-err-blocK',
                    //     patternMsg: '정확한 휴대폰번호를 입력해주세요.'
                    // },
                    // contactPhoneNo2 : {
                    //     pattern: /^d{3,4}$/,
                    //     msgTarget: '.contact-box-err-blocK',
                    //     patternMsg: '정확한 휴대폰번호를 입력해주세요.'
                    // },
                    // contactPhoneNo3 : {
                    //     pattern: /^d{4}$/,
                    //     msgTarget: '.contact-box-err-blocK',
                    //     patternMsg: '정확한 휴대폰번호를 입력해주세요.'
                    // },
                    email:{
                        required: true,
                        //pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        pattern : /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                        minLength: 1,
                        maxLength: 50,
                        msgTarget: '.err-block',
                        errorMsg: '이메일 주소를 입력해주세요.',
                        patternMsg: '올바른 이메일 형식이 아닙니다.',
                        validate : function(value){
                            var _pattern = new RegExp(this.pattern);

                            if( _pattern.test(value) == true) {
                                if( value.split('@')[0].length <= 30 && value.split('@')[1].length <= 20) {
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }
                    },
                    // contactPhoneNo1: {
                    //     required: true,
                    //     pattern: /^0[1-9]{1,2}/,
                    // },
                    // contactPhoneNo2: {
                    //     required: true,
                    //     minLength : 3,
                    //     maxLength : 4
                    // },
                    // contactPhoneNo3: {
                    //     required: true,
                    //     minLength : 4
                    // },
                    title: {
                        required: true,
                        maxLength: 100,
                        msgTarget: '.err-block',
                        errorMsg: '제목을 입력해주세요.'
                    },
                    content: {
                        required: true,
                        maxLength: 1000,
                        msgTarget: '.err-block',
                        errorMsg: '내용을 입력해주세요.'
                    }
                }

                var authOptions = {
                    elem: {
                        popup: '#certificationPopup',
                        name: '#authName',
                        phone: '#authPhoneNo',
                        number: '#authNo'
                    },
                    target: {
                        name: '#userName',
                        phone: '#phoneNo'
                    },
                    register: {
                        authName: {
                            required: true,
                            maxLength: 30,
                            pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                            msgTarget: '.err-block',                        
                            errorMsg: '이름을 입력해주세요.',
                            patternMsg: '이름은 한글 또는 영문만 입력 가능합니다.'
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
                };

                self.validation = new vcui.ui.CsValidation('#submitForm', {register:register});
                authManager = new AuthManager(authOptions);

                self.bindEvent();
            });
        },
        
        bindEvent: function() {
            var self = this;

            self.$form.find('.btn-confirm').on('click', function() {
                var contactPhoneNo1 = $('#contactPhoneNo1').val();
                var contactPhoneNo2 = $('#contactPhoneNo2').val();
                var contactPhoneNo3 = $('#contactPhoneNo3').val();
                var contractCheck = vcui.isEmpty(contactPhoneNo1) && vcui.isEmpty(contactPhoneNo2) && vcui.isEmpty(contactPhoneNo3) ? false : true;

                if(contractCheck) {
                    if(!/^0[1-9]{1,2}/.test(contactPhoneNo1)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo1').focus();
                        return;
                    }
    
                    if(!/^\d{3,4}/.test(contactPhoneNo2)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo2').focus();
                        return;
                    }
    
                    if(!/^\d{4,4}/.test(contactPhoneNo3)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo3').focus();
                        return;
                    }

                    $('.err-block.contact-box-err-blocK').hide();
                }

                var result = self.validation.validate();

                if (authFlag && result.success == true) {   
                    lgkorUI.confirm('', {
                        title:'저장 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            var ajaxUrl = self.$form.data('ajax');
                            var data = self.validation.getAllValues();

                            lgkorUI.showLoading();
                            lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                                if (result.data.resultFlag == 'Y') {
                                    result.data.nomemberId && $('#nomemberId').val(result.data.nomemberId);
                                    self.$form.submit();
                                } else {
                                    lgkorUI.hideLoading();

                                    if (result.data.resultMessage) {
                                        lgkorUI.alert('', {
                                            title: result.data.resultMessage,
                                            okBtnName: '확인'
                                        });
                                    }
                                }
                            })
                        }
                    });
                } else if (!authFlag) {
                    lgkorUI.alert('', {
                        title:'휴대전화 인증이 필요합니다.',
                        okBtnName: '확인'
                    }, $('.btn-open')[0]);
                }
            });
            self.$form.find('.btn-cancel').on('click', function() {
                var url = $(this).data('url');
                lgkorUI.confirm('', {
                    title:'취소 하시겠습니까?',
                    okBtnName: '확인',
                    cancelBtnName: '취소',
                    ok: function() {
                        location.href = url;
                    }
                });
            });

            self.$authPopup.on('modalhide', function() {
                var $this = $(this);

                self.$authPopup.find('.btn-send').text('인증번호 발송');
                $this.find('#authNo').prop('disabled', true);
                $this.find('input').val('');
            });

            $('.btn-open, #userName, #phoneNo').on('click', function() {
                var result = self.validation.validate(['privcyCheck']);

                if (!authFlag && result.success) {
                    authManager.open(function() {
                        if ($('#userName').val()) {
                            $('#authName').val($('#userName').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);
                        }
                    });
                }
            });

            // 인증문자 보내기
            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            // 인증 완료 하기
            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm('.btn-open', function(success, result) {
                    authFlag = success;
                });
            });

            // 연락가능 전화번호 밸리데이션
            $('[name="contactPhoneNo1"], [name="contactPhoneNo2"], [name="contactPhoneNo3"]').on('change', function(e){
                var contactPhoneNo1 = $('#contactPhoneNo1').val();
                var contactPhoneNo2 = $('#contactPhoneNo2').val();
                var contactPhoneNo3 = $('#contactPhoneNo3').val();
                var contractCheck = vcui.isEmpty(contactPhoneNo1) && vcui.isEmpty(contactPhoneNo2) && vcui.isEmpty(contactPhoneNo3) ? false : true;

                if(contractCheck) {
                    if(!/^0[1-9]{1,2}/.test(contactPhoneNo1)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo1').focus();
                        return;
                    }
    
                    if(!/^\d{3,4}/.test(contactPhoneNo2)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo2').focus();
                        return;
                    }
    
                    if(!/^\d{4,4}/.test(contactPhoneNo3)) {
                        $('.err-block.contact-box-err-blocK').show();
                        $('#contactPhoneNo3').focus();
                        return;
                    }
                    $('.err-block.contact-box-err-blocK').hide();
                }
            });
        }
    }

    $(window).ready(function() {
        custom.init();
    });
})();