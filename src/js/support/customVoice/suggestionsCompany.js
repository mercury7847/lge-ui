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
                        msgTarget: '.err-block'
                    },
                    userName: {
                        maxLength : 30,
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
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
                        msgTarget: '.err-block'
                    },
                    content: {
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