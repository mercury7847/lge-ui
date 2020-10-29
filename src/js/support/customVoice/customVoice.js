(function() {


    $(window).ready(function() {
        var custom = {
            init: function() {
                var _self = this;
                
                CS.UI.$form = $('#submitForm');

                vcui.require(['ui/formatter'], function () {
                    $('#input-phoneNumber2').vcFormatter({'format':'num','maxlength':11});

                    var register = {
                        privacy: {
                            required: true,
                            requiredMsg: '개인정보 수집 및 이용에 동의 하셔야 이용 가능합니다'
                        },
                        name: {
                            required: true,
                            requiredMsg: '이름을 입력해주세요',
                            errorMsg: '이름은 한글 또는 영문으로만 입력해주세요'
                        },
                        phoneNumber: {
                            required: true,
                            pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                            requiredMsg: '휴대전화를 정확히 입력해주세요',
                            errorMsg: '휴대전화를 정확히 입력해주세요'
                        },
                        email:{
                            required: true,
                            pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,						
                            requiredMsg: '이메일 주소를 입력해주세요',
                            errorMsg:'올바른 이메일 형식이 아닙니다. '
                        },
                        replay: {
                            required: true,
                            requiredMsg: '회신 여부를 선택해주세요.'
                        },
                        title: {
                            required: true,
                            requiredMsg: '제목을 입력해주세요.'
                        },
                        content: {
                            required: true,
                            requiredMsg: '내용을 입력해주세요.'
                        }
                    }
    
                    CS.UI.validation = CS.UI.$form.validation({
                        register: register
                    });
                    
                    _self.bindEvent();
                });
            },
            bindEvent: function() {
                var _self = this;

                CS.UI.$form.find('.btn-confirm').on('click', function() {
                    CS.UI.validation.validation('start');
                });
                CS.UI.$form.on('success', function() {
                    $('#laypop').vcModal();
                    $('#laypop').find('.btn-wrap .btn:not(.ui_modal_close)').off('click').on('click', function() {
                        var url = CS.UI.$form.attr('ajax'),
                            params = CS.UI.$form.serialize();
                        
                        lgkorUI.showLoading();
                        lgkorUI.requestAjaxData(url, params, function(d) {
                            CS.UI.$form.submit(); 
                        });
                    });
                });
                CS.UI.$form.on('error', function() {

                });
            }
        }
        
        custom.init();
    });
})();