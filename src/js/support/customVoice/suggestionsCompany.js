(function() {
    var validation;

    var custom = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');

            vcui.require(['ui/validation', 'ui/formatter', 'ui/imageFileInput'], function () {
                $('#phoneNo').vcFormatter({'format':'num', "maxlength":11});

                $('.ui_imageinput').vcImageFileInput({
                    totalSize: '10485760',
                    format: 'jpg|jpeg|png|gif',
                    message: {
                        format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                        size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다.'
                    }
                });

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
                    replyCheck: {
                        msgTarget: '.reply-err-block'
                    },
                    title: {
                        msgTarget: '.err-msg'
                    },
                    content: {
                        msgTarget: '.err-msg'
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

                            $.ajax({
                                type : 'POST',
                                url : ajaxUrl,
                                dataType : 'json',
                                data : data,
                                enctype: 'multipart/form-data',
                                processData: false,
                                contentType: false
                            }).done(function (result) {
                                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                                    location.reload();                
                                    return;
                                }
                                
                                if(result.status != 'success'){
                                    alert(result.message ? result.message : '오류발생');
                                    return;
                                }

                                if (result.data.resultFlag == 'Y') {
                                    self.$form.submit();
                                }
                            }).fail(function(err){
                                alert(err.message);
                            });
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