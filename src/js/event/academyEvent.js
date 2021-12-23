(function() {
    var validation;
    // loginFlag = digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? "Y" : "N";
    // birthDt = digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.birthDt;
    var loginFlag = "Y";
    var birthDt = 20010101;
    // 아카데미 회원 임시 변수
    var academyMember = false;

    var emailCertified = {
        init: function() {
            var self = this;
            if(lgkorUI.stringToBool(loginFlag)) {
                if(academyMember){
                    alert('아카데미기획전 상세페이지로 넘기기')
                    // location.href='/benefits/exhibitions';
                } else{
                    if( birthDt > 19920101 && birthDt < 20040102){
                        $('.login-ok').show();
                        $('.login-no').hide();
                    } else {
                        $('#academyPopup01').vcModal('show'); 
                    }
                }
            } else {
                $('.login-no').show();
                $('.login-ok').hide();
            }

            self.$cont = $('#academyPopup02');
            self.$submitForm = $('#emailCertifiedForm');
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
                e.preventDefault();

                var result = validation.validate();

                if (result.success === true) {

                    var url = self.$submitForm.data('ajax');
                    var allData = validation.getAllValues();

                    lgkorUI.showLoading();

                    lgkorUI.requestAjaxFileData(url, allData, function(result) {
                        var data = result.data;
                        
                        if (data.resultFlag == 'Y') {
                            console.log(data.resultFlag, url);
                            lgkorUI.hideLoading();
                            self.$submitForm.submit();
                            $('.email-certified-info').show();
                            $('#academyPopup02 .pop-footer').show();
                            $('#academyPopup02 .pop-conts').animate({
                                scrollTop: 200
                            }, 500);
                        } else {
                            lgkorUI.hideLoading();
                            if (data.resultMessage) {
                                lgkorUI.alert("", {
                                    title: data.resultMessage,
                                    okBtnName: '확인',
                                    ok: function() {
                                        alert(academyMember);
                                    }
                                });
                            }
                        }
                    }, 'POST');
                } else{
                    $('.email-certified-info').hide();
                    $('#academyPopup02 .pop-footer').hide();
                }
            });
            $('#btnLogin').on('click', function(e) {
                location.href='/sso/api/emp/Login';
            });
            $('#academyPopup01 .btn-list').on('click', function(e) {
                $('#academyPopup01').vcModal('hide'); 
                location.href='/benefits/exhibitions';
            });
    
            $('#academyPopup02 .btn-confirm').on('click', function(e) {
                $('#academyPopup02').vcModal('hide'); 
                location.reload();
            });
        }
    }

    $(window).ready(function() {
        emailCertified.init();
       // $('#academyPopup02').vcModal('show');
    });
})();