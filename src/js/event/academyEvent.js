(function() {
    var validation;
    
    var emailCertified = {
        init: function() {
            var self = this;
            //self.param = {};

            self.$cont = $('#academyPopup02');
            self.$submitForm = self.$cont.find('#emailCertifiedForm');
            self.$completeBtn = $('#btnCertified');
            self.$loginBtn = $('#btnLogin');


            vcui.require(['ui/validation'], function () {
                var register = {
                    //이메일
                    userEmail: {
                        required: true,
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        minLength: 1,
                        maxLength: 50,
                        msgTarget: '.err-block',
                        errorMsg: '이메일 주소를 입력해주세요.',
                        patternMsg: '@ac.kr 계정의 이메일을 입력해 주세요.',
                        validate : function(value){
                            var _pattern = new RegExp(this.pattern);
                            if( _pattern.test(value) == true) {
                                if( value.split('@')[0].length <= 30 && value.split('@')[1].length <= 20) {
                                    console.log( value.split('@')[1]);
                                    if(value.split('@')[1] === 'ac.kr'){
                                        return true;
                                    } else{
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }
                    },
                    //약관동의
                    agreeUserCheck: {
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '약관에 동의해 주시기 바랍니다.'
                    }
                }
                validation = new vcui.ui.CsValidation('#emailCertifiedForm', {register:register});
                self.bindEvent();
            });

        },
        bindEvent: function() {
            var self = this;
            //이메일 인증 버튼 클릭시
            self.$completeBtn.on('click', function(e) {
                var result = validation.validate();
                //self.param = validation.getAllValues();

                if (result.success === true) {
                    $('.email-certified-info').show();
                    $('#academyPopup02 .pop-footer').show();
                    $('#academyPopup02 .pop-conts').animate({
                        scrollTop: 200
                    }, 500);
                    // lgkorUI.showLoading();
                    // $('html, body').animate({
                    //     scrollTop: 0
                    // }, 500);
                    // lgkorUI.hideLoading();
                }else{
                    $('.email-certified-info').hide();
                    $('#academyPopup02 .pop-footer').hide();
                    // lgkorUI.alert('', {
                    //     title:'필수 입력정보가<br>입력되지 않았습니다.'
                    // });
                }
            });
            $('#btnLogin').on('click', function(e) {
                $('#academyPopup01').vcModal('show'); 
            });
            $('#academyPopup01 .btn-list').on('click', function(e) {
                $('#academyPopup01').vcModal('hide'); 
                location.href='/benefits/exhibitions';
            });
    
            $('#academyPopup02 .btn-confirm').on('click', function(e) {
                $('#academyPopup02').vcModal('hide'); 
                location.reload();
            });
        },
    }

    $(window).ready(function() {
        emailCertified.init();
       // $('#academyPopup02').vcModal('show');
    });
})();