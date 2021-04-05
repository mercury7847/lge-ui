(function() {
    var validation;
    var dateUtil = vcui.date;
    var detect = vcui.detect;
    var isLogin = lgkorUI.isLogin;

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

            vcui.require(['ui/validation', 'ui/formatter', 'support/common/searchModel.min'], function () {
                var register = {
                    privcyCheck: {
                        required: true,
                        msgTarget: '.err-block'
                    },
                    userName: {
                        required: true,
                        maxLength: 30,
                        pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
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

                self.bindEvent();

                validation = new vcui.ui.CsValidation('#submitForm', {register:register});

                self.$cont.find('.ui_imageinput').vcImageFileInput();
                self.$cont.vcSearchModel(); 
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

            lgkorUI.showLoading();
            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    result.data.nomemberId && $('#nomemberId').val(result.data.nomemberId);
                    self.$submitForm.submit();
                } else {
                    lgkorUI.hideLoading();
                    
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

            self.$cont.on('reset', function() {
                self.$completeBtns.hide();

                validation.reset();

                self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
                self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
                self.$cont.find('.ui_imageinput').vcImageFileInput('removeAll');
            });

            self.$cont.on('complete', function(e, data) {
                self.$cont.vcSearchModel('updateSummary', {
                    product: [data.categoryNm, data.subCategoryNm, data.modelCode],
                    reset: 'product'
                });
                
                self.$completeBtns.show();
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