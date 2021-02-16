(function() {
    var validation;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myModelArea = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepInput = self.$cont.find('#stepInput');

            self.isLogin = lgkorUI.isLogin;

            vcui.require(['ui/validation', 'ui/formatter'], function () {
                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    userName: {
                        required: true,
                        maxLength: 30,
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
                    },
                    phoneNo: {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block',
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                    },
                    email:{
                        required: true,
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        minLength: 1,
                        maxLength: 50,
                        msgTarget: '.err-block',
                        errorMsg: '이메일 주소를 입력해주세요.',
                        patternMsg: '올바른 이메일 형식이 아닙니다.'
                    },
                    replyCheck: {
                        required: true,
                        msgTarget: '.reply-err-block',
                        errorMsg: '회신 여부를 체크해주세요.'
                    },
                    title: {
                        required: true,
                        maxLength: 100,
                        msgTarget: '.err-block',
                        errorMsg: '제목을 입력해주세요.'
                    },
                    content: {
                        required: true,
                        maxLength: 1000,
                        msgTarget: '.err-block',
                        errorMsg: '내용을 입력해주세요.'
                    }
                }

                validation = new vcui.ui.CsValidation('#submitForm', {register:register});

                self.$cont.commonModel({
                    register: register
                });

                $('.ui_imageinput').vcImageFileInput();

                self.bindEvent();
            });
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();
            var formData = new FormData();
   
            for (var key in param) {
                formData.append(key, param[key]);
            }

            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    result.data.seq && $('#seq').val(result.data.seq);
                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            }, 'POST');
        },
        bindEvent: function() {
            var self = this;

            $('.contents').on('reset', function() {
                self.$myModelArea.show();
                self.$completeBtns.hide();

                self.$cont.commonModel('next', self.$stepModel);
                self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                }); 
            });

            $('.contents').on('complete', function(e, data, url) {
                self.$cont.commonModel('updateSummary', {
                    product: [data.categoryName, data.subCategoryName, data.modelCode],
                    reset: 'product'
                });
                
                self.$myModelArea.hide();
                self.$completeBtns.show();

                self.$cont.commonModel('next', self.$stepInput);
                self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                });
            });

            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    lgkorUI.confirm('', {
                        title:'저장 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            self.requestComplete();
                        }
                    });       
                }
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();