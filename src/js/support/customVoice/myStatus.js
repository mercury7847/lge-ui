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
            var phoneValidation = new vcui.ui.CsValidation('#phoneForm', {
                register: {
                    userName2: {
                        msgTarget: '.err-block',
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        maxLength: 30
                    },
                    phoneNo: {
                        minLength: 10,
                        maxLength: 11,
                        msgTarget: '.err-block',
                        errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                        patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                        validate : function(value){
                            return validatePhone(value);
                        } 
                    },
                    authNo: {
                        msgTarget: '.err-block',
                    }
                }
            });


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
                var result = phoneValidation.validate(),
                    data = phoneValidation.getAllValues();

                if (result.success) {
                    if ($('#authNo').prop('disabled')) {
                        $('#laypop1').vcModal(); 
                        return false;
                    }

                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost($('#numberForm').data('ajax'), data, function(result) {

                        if (result.data.resultFlag == 'Y') {
                            $('#phoneForm').submit();
                        } else if (result.data.resultFlag == 'N') {
                            lgkorUI.alert("", {
                                title: result.data.resultMessage
                            });
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('.btn-send').on('click', function() {
                var result = phoneValidation.validate(['userName2', 'phoneNo']),
                    ajaxUrl = $(this).data('ajax'),
                    data = phoneValidation.getValues(['userName2','phoneNo']);

                if (result.success) {
                    lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                        var data = result.data;
    
                        if (data.resultFlag == 'Y') {
                            $(this).html('인증 번호 재발송');
                            $('#authNo').prop('disabled', false);
                        }

                        lgkorUI.alert("", {
                            title: result.data.resultMessage
                        });
                    });
                }
            });
        });
    });
})();
