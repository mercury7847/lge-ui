(function() {
    function setMessage($el, msg) {
        var msgTarget = $el.data('msgTarget');

        $(msgTarget).text(msg).show();
    }

    $(window).ready(function() {
        var custom = {
            init: function() {
                var _self = this;
                
                CS.UI.$form = $('#submitForm');
                CS.UI.$confirmPop = $('#layPop');

                $('.btn-cancel').on('click', function() {
                    var obj = {title:'', typeClass:'', ok : function(){ 
            
                    }};
                    var desc = '';
                    obj = $.extend(obj, {
                        title:'취소 하시겠습니까?'
                    });
                    lgkorUI.confirm(desc, obj);
                });

                vcui.require(['ui/validation', 'ui/formatter'], function () {
                    $('#input-phoneNo').vcFormatter({'format':'num', "maxlength":11});

                    var register = {
                        privacy: {
                            required: true,
                            errorMsg: '개인정보 수집 및 이용에 동의 하셔야 이용 가능합니다',
                            msgTarget: '.err-block'
                        },
                        inputName: {
                            required: true,
                            msgTarget: '.err-block'
                        },
                        inputPhoneNo: {
                            required: true,
                            pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                            msgTarget: '.err-block'
                        },
                        inputEmail:{
                            required: true,
                            pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            msgTarget: '.err-block'
                        },
                        replay: {
                            required: true,
                            errorMsg: '회신 여부를 선택해주세요.',
                            msgTarget: '.err-block'
                        },
                        inputTitle: {
                            required: true,
                            msgTarget: '.err-block'
                        },
                        inputContent: {
                            required: true,
                            msgTarget: '.err-block'
                        },
                        desc: {
                            required: true,
                            errorMsg: '전달사항을 입력해주세요.',
                            msgTarget: '.err-block'
                        }
                    }
    
                    // CS.UI.validation = new vcui.ui.CsValidation('#submitForm', {register:register});
                    var validation = new vcui.ui.CsValidation('#submitForm', {register:register});
                    
                    $('.btn-confirm').on('click', function(e) {
                        var result = validation.validate();
        
                        if (result.success == true) {
                            var id = $(e.currentTarget).data('id');
                            var obj = {title:'', typeClass:'', ok : function(){ 
                
                            }};
                            var desc = '';
                
                            if (id == "#confirmPop") {
                                obj = $.extend(obj, {
                                    title:'저장 하시겠습니까?'
                                });
                            }
                            lgkorUI.confirm(desc, obj);
                        }
                    });

                    _self.bindEvent();
                });
            },
            bindEvent: function() {
                var _self = this;

                $('#certificationPopup').on('modalshown', function() {
                    var register = {
                        authName: {
                            required: true,
                            pattern: /^[가-힣a-zA-Z]+$/,
                            msgTarget: '.err-block'
                        },
                        authPhoneNo: {
                            required: true,
                            pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                            msgTarget: '.err-block'
                        },
                        authNo:{
                            required: true,
                            validate: function(name, val) {
                                var $el = $('[name="'+name+'"]');

                                if ($el.is(':disabled')) {
                                    setMessage($('#authNo'), '인증 번호 발송 버튼을 선택해 주세요');
                                    return false;
                                }

                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    url: url,
                                    dataType: 'json',
                                    data: data
                                }).done(function (result) {
                                    if (result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != '') {
                                        location.href = result.ssoCheckUrl;                    
                                        return;
                                    }
                    
                                    if(result.status != 'success'){
                                        alert(result.message ? result.message : '오류발생');
                                        return;
                                    }
                                    
                                    if (result.data.resultFlag == 'N') {
                                        setMessage($('#authNo'), '입력하신 인증 번호가 발송된 인증 번호와 맞지 않습니다');
                                    } else {
                                        setMessage($('#authNo'), '휴대전화 인증이 완료되었습니다');
                                    }
                                    
                                }).fail(function(err){
                                    alert(err.message);
                                });
                            },
                            msgTarget: '.err-block'
                        }
                    }
                    var validation = new vcui.ui.CsValidation('#certificationPopup .form-wrap', {register:register});

                    $('#certificationPopup').find('.btn-auth').off('click').on('click', function() {
                        validation.validate();
                    });

                    $('#certificationPopup').find('.btn-send').off('click').on('click', function() {
                        var url = '/lg5-common/data-ajax/support/auth.json',
                            data = '';

                        $.ajax({
                            type: 'POST',
                            url: url,
                            dataType: 'json',
                            data: data
                        }).done(function (result) {
                            if (result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != '') {
                                location.href = result.ssoCheckUrl;                    
                                return;
                            }
            
                            if(result.status != 'success'){
                                alert(result.message ? result.message : '오류발생');
                                return;
                            }
                            
                            if (result.data.resultFlag == 'Y') {
                                $(this).text('인증번호 재발송');
                                $('#authNo').prop('disabled', false);
                                setMessage($('#authNo'), '입력하신 휴대 전화 번호로 인증 번호를 보내드렸습니다');
                            } else {
                                setMessage($('#authNo'), '1분 당 2회만 인증 번호 발송이 가능합니다');
                            }
                            
                        }).fail(function(err){
                            alert(err.message);
                        });
                    });
                });
                $('#certificationPopup').on('modalhide', function() {
                    
                });

                CS.UI.$form.find('.btn-confirm').on('click', function() {
                    CS.UI.validation.validate();
                });
                CS.UI.validation.on('success', function() {
                    var $item;

                    for (var key in CS.UI.validation.nameArr) { 
                        $item = CS.UI.validation.$el.find('[name="'+key+'"]');
                        $item.closest('.input-wrap, .select-wrap').addClass('error');
                    }

                    CS.UI.$confirmPop.vcModal();
                    CS.UI.$confirmPop.find('.btn-wrap .btn:not(.ui_modal_close)').off('click').on('click', function() {
                        var url = CS.UI.$form.data('ajax'),
                            params = CS.UI.$form.serialize();
                        
                        lgkorUI.showLoading();
                        lgkorUI.requestAjaxData(url, params, function(d) {
                            CS.UI.$form.submit(); 
                        });
                    });
                });
                CS.UI.validation.on('validerror', function(e, errors) {
                    var $error;

                    for (var key in errors) {
                        $error = $('[name="'+key+'"]');

                        if ($error.length > 0) {
                            // $error.closest('.input-wrap, .select-wrap').addClass('error');
                        }
                    }
                });
                CS.UI.validation.on('errors', function(obj) {
                    console.log(obj);
                });
            }
        }
        custom.init();
    });
})();