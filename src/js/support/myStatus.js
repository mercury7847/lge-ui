(function() {



    $(window).ready(function() {
        vcui.require([
            'ui/validation'
        ], function() {   
            var numberValidation = new vcui.ui.CsValidation('#numberForm', {
                register: {
                    name1: {
                        pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z\*]+$/,
                        maxLength: 30
                    },
                    number: {
                        pattern: /^[0-9]+$/,
                        maxLength: 20
                    }
                }
            });
            var phoneValidation = new vcui.ui.CsValidation('#phoneForm', {
                register: {
                    name2: {
                        pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z\*]+$/,
                        maxLength: 30
                    },
                    phone: {
                        pattern: /^[0-9]+$/,
                        maxLength: 11
                    },
                    certiNumber: {
                        
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

                        if (data.resultFlag == 'Y') {
                            $('#numberForm').submit();
                        } else if (data.resultFlag == 'N') {
                            $('#laypop1').vcModal();
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('#phoneForm').find('.btn-confirm').on('click', function() {
                var result = phoneValidation.validate(),
                    data = phoneValidation.getAllValues();

                if (result.success) {
                    if ($('#certiNumber').prop('disabled')) {
                        $('#laypop2').vcModal(); 
                        return true;
                    }

                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost($('#numberForm').data('ajax'), data, function(result) {

                        if (data.resultFlag == 'Y') {
                            $('#phoneForm').submit();
                        } else if (data.resultFlag == 'N') {
                            $('#laypop1').vcModal();
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('.btn-certi').on('click', function() {
                var data = {
                    name2: $('#name2').val(),
                    phone: $('#phone').val()    
                }
                
                
                lgkorUI.requestAjaxDataPost($(this).data('ajax'), data, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $(this).find('span').html('인증 번호 재발송');
                        $('#certiNumber').prop('disabled', false).focus();
                    } else {
                        $('#laypop4').vcModal();
                    }
                });
                
            });
        });
    });
})();