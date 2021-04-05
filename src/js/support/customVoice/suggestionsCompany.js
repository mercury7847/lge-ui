(function() {
    var validation;

    var custom = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');

            vcui.require(['ui/validation', 'ui/formatter', 'ui/imageFileInput'], function () {
                $('.ui_imageinput').vcImageFileInput();

                var register = {
                    privcyCheck: {
                        required: true,
                        msgTarget: '.err-block'
                    },
                    userName: {
                        required: true,
                        maxLength : 30,
                        pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
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
                    email:{
                        required: true,
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
                    replyCheck: {
                        required: true,
                        msgTarget: '.reply-err-block'
                    },
                    title: {
                        required: true,
                        msgTarget: '.err-block'
                    },
                    content: {
                        required: true,
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
                            var $modal = $(this);
                            var url = self.$form.data('ajax'),
                                allData = validation.getAllValues(),
                                formData = new FormData();
   
                            for (var key in allData) {
                                formData.append(key, allData[key]);
                            }
                            
                            lgkorUI.showLoading();
                            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                                var data = result.data;
                                
                                $modal.vcModal('hide');

                                if (data.resultFlag == 'Y') {
                                    data.nomemberId && $('#nomemberId').val(data.nomemberId);
                                    self.$form.submit();
                                } else {
                                    if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                                    lgkorUI.hideLoading();
                                }
                            }, 'POST');
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
        }
    }

    $(window).ready(function() {
        custom.init();
    });
})();