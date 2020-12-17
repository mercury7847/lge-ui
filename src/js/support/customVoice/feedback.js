(function() {
    var validation;
    var authValidation;
    var sendValidation;

    var custom = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');
            self.$authPopup = $('#certificationPopup');

            vcui.require(['ui/validation', 'ui/formatter'], function () {
                $('#phoneNo').vcFormatter({'format':'num', "maxlength":11});

                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    userName: {
                        msgTarget: '.err-block'
                    },
                    phoneNo: {
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    email:{
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        msgTarget: '.err-block'
                    },
                    title: {
                        msgTarget: '.err-block'
                    },
                    content: {
                        msgTarget: '.err-block'
                    }
                }

                validation = new vcui.ui.CsValidation('#submitForm', {register:register});

                self.bindEvent();
            });
        },
        
        bindEvent: function() {
            var self = this;

            self.$form.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {   
                    lgkorUI.confirm('', {
                        title:'저장 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            var ajaxUrl = self.$form.data('ajax');
                            var data = validation.getAllValues();
                            lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                                if (result.data.resultFlag == 'Y') {
                                    self.$form.submit();
                                }
                            })
                        }
                    });
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
            self.$form.find('#privcyCheck').on('change', function() {
                if ($(this).is(':checked')) {
                    self.$form.find('.btn-open').prop('disabled', false);
                } else {
                    self.$form.find('.btn-open').prop('disabled', true);
                }
            });

            self.$authPopup.on('modalshown', function() {
                var $this = $(this);
                var register = {
                    authName: {
                        pattern: /^[가-힣a-zA-Z]+$/,
                        msgTarget: '.err-block'
                    },
                    authPhoneNo: {
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    authNo:{
                        msgTarget: '.err-block'
                    }
                };

                authValidation = new vcui.ui.CsValidation('#certificationPopup .form-wrap', {register:register});

                $this.find('.btn-send').off('click').on('click', function() {
                    var $btnSend = $(this),
                        ajaxUrl = $btnSend.data('ajax'),
                        data = authValidation.getValues(['authName','authPhoneNo']);

                    var result = authValidation.validate(['authName','authPhoneNo']);

                    if (result.success == true) {
                        lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                            if (result.data.resultFlag == 'Y') {
                                $btnSend.text('인증번호 재발송');
                                $this.find('#authNo').prop('disabled', false);
                            }
    
                            lgkorUI.alert('', {
                                title: result.data.resultMessage
                            });
                        })
                    }
                });

                $this.find('.btn-auth').off('click').on('click', function() {
                    var result = authValidation.validate(),
                        ajaxUrl = $this.find('.form-wrap').data('ajax'),
                        data = authValidation.getValues(['authName','authPhoneNo','authNo']);

                    if (result.success == true) {
                        if ($('#authNo').prop('disabled')) {
                            $('#laypop1').vcModal(); 
                            return false;
                        }

                        lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                            if (result.data.resultFlag == 'Y') {
                                self.$form.find('#userName').val(self.$authPopup.find('#authName').val());
                                self.$form.find('#phoneNo').val(self.$authPopup.find('#authPhoneNo').val());
                                self.$form.find('.btn-open span').html('휴대전화 인증 완료');
                                self.$form.find('.btn-open').prop('disabled', true);
                            
                                self.$authPopup.vcModal('hide');
                            }

                            lgkorUI.alert('', {title: result.data.resultMessage});
                        });
                    }
                });
            });

            self.$authPopup.on('modalhide', function() {
                var $this = $(this);

                self.$authPopup.find('.btn-send').text('인증번호 발송');
                $this.find('#authNo').prop('disabled', true);
                $this.find('input').val('');
            });
        }
    }

    $(window).ready(function() {
        custom.init();
    });
})();