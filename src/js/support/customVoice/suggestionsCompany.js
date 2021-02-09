(function() {
    var validation;

    var custom = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');

            vcui.require(['ui/validation', 'ui/formatter', 'ui/imageFileInput'], function () {
                $('#phoneNo').vcFormatter({'format':'num', "maxlength":11});

                $('.ui_imageinput').vcImageFileInput();

                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    userName: {
                        maxLength : 30,
                        msgTarget: '.err-block'
                    },
                    phoneNo: {
                        maxLength : 11,
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    email:{
                        minLength: 1,
                        maxLength: 50,
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
                            var formData = new FormData();
   
                            for (var key in data) {
                                formData.append(key, data[key]);
                            }

                            $.ajax({
                                type : 'POST',
                                url : ajaxUrl,
                                dataType : 'json',
                                data : formData,
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