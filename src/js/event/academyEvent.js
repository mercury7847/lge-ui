(function() {
    var validation;

    var emailCertified = {
        init: function() {
            var self = this;
            //self.param = {};

            self.$cont = $('#academyPopup02');
            self.$submitForm = self.$cont.find('#emailCertifiedForm');
            self.$completeBtn = $('#btnCertified');

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
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }
                    }
                }
                validation = new vcui.ui.CsValidation('#emailCertifiedForm', {register:register});
                self.bindEvent();
            });

        },
        bindEvent: function() {
            var self = this;
            
            //신청 버튼 클릭시
            self.$completeBtn.on('click', function() {
                var result = validation.validate();
                //console.log(result);
                //self.param = validation.getAllValues();

                // if (result.success === true) {
                //     lgkorUI.showLoading();
                //     $('html, body').animate({
                //         scrollTop: 0
                //     }, 500);
                //     lgkorUI.hideLoading();
                // }else{
                //     lgkorUI.alert('', {
                //         title:'필수 입력정보가<br>입력되지 않았습니다.'
                //     });
                // }
            });
        },
    }

    $(window).ready(function() {
        emailCertified.init();
    });
})();