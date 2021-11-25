(function() {
    var validation;
    var dateUtil = vcui.date;
    var detect = vcui.detect;
    var isLogin = lgkorUI.isLogin;

    var reservation = {
        init: function() {
            var self = this;

            self.$cont = $('.company.container');
            //self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            //self.$myModelArea = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#loveSharingForm');
            self.$completeBtns = self.$cont.find('.btn-wrap');

            //self.$stepArea = self.$cont.find('.step-area');
            //self.$stepModel = self.$cont.find('#stepModel');
            //self.$stepInput = self.$cont.find('#stepInput');

            vcui.require(['ui/validation'], function () {
                var register = {
                    //담당자
                    userName: {
                        required: true,
                        maxLength: 25,
                        pattern: /^[가-힣a-zA-Z0-9]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '특수문자는 입력이 불가합니다.'
                    },
                    //휴대폰
                    phoneNo: {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        //pattern: /^[0-9]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '휴대폰번호를 입력해주세요.',
                        patternMsg: '휴대폰번호를 정확히 입력해주세요.',
                        validate : function(value){
                            return self.validatePhone(value);
                        }
                    },
                    //이메일
                    userEmail:{
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
                    //대표자
                    groupOwner: {
                        required: true,
                        maxLength: 25,
                        pattern: /^[가-힣a-zA-Z0-9]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
                    },
                    //단체명
                    groupName: {
                        required: true,
                        maxLength: 25,
                        msgTarget: '.err-block',
                        errorMsg: '단체명을 입력해 주세요.'
                    },
                    //고유번호증
                    groupNumber: {
                        required: true,
                        minLength: 10,
                        msgTarget: '.err-block',
                        errorMsg: '고유번호증을 입력해 주세요.',
                        patternMsg: '정확한 고유번호를 입력해주세요.',
                        validate : function(value){
                            return validatePhone(value);
                        }
                    },
                    //사무실 전화번호
                    groupTel: {
                        required: true,
                        minLength: 9,
                        maxLength: 11,
                        msgTarget: '.err-block',
                        errorMsg: '전화번호를 정확히 입력해주세요.',
                        patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                        validate : function(value){
                            return validatePhone(value);
                        }
                    },
                    //제안 내용
                    content: {
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '내용을 입력해 주세요.'
                    }
                }

                validation = new vcui.ui.CsValidation('#loveSharingForm', {register:register});
                self.bindEvent();


                self.$cont.find('.ui_fileinput').vcFileinput();
                //self.$cont.vcSearchModel();
            });
        },
        validatePhone: function(value){
            var self = this;
            var _pattern = new RegExp(/^(010|016|011|017|018|019)\d{3,4}\d{4}$/);
            console.log(1);
            if( _pattern.test(value) == true) {
                var _length = value.length;
                var firstVal = value.substr(0,3);
                var num4th = value.substr(3,1);
                var num3 = value.substr(3,3);
                var num4 = value.substr(3,4);
                console.log(2);
                function validateNum10(){
                    if( 200<= num3 && num3 <= 899) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function rangeFlag(minNum, maxNum){
                    if( minNum <= num4 && num4 <= maxNum)  {
                        return true;
                    } else {
                        return false;
                    }
                }

                switch(firstVal){
                    case "010":
                        if( num4th == 0 || num4th == 1) {
                            return false;
                        }

                        if( value.length != 11) {
                            return false;
                        }
                        break;
                    case "011":
                        if( _length == 10) {
                            return validateNum10();
                        }
                        if( _length == 11) {
                            if(rangeFlag(9000, 9999) || rangeFlag(1700, 1799)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        break;
                    case "016": case "019":
                        if( _length == 10) {
                            return validateNum10();
                        }
                        if( _length == 11) {
                            return rangeFlag(9000, 9999);
                        }
                        break;
                    case "017": case "018":
                        if( _length == 10) {
                            return validateNum10();
                        } else {
                            return false;
                        }
                        break;
                }
            } else {
                return false;
            }
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

                // validation.reset();

                // self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
                // self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
                // self.$cont.find('.ui_imageinput').vcImageFileInput('removeAll');
            });

           /* self.$cont.on('complete', function(e, data) {
                self.$cont.vcSearchModel('updateSummary', {
                    product: [data.categoryNm, data.subCategoryNm, data.modelCode],
                    reset: 'product'
                });

                self.$completeBtns.show();
            });*/

            self.$completeBtns.find('.estimateBtn').on('click', function() {
                var result = validation.validate();

                console.log("result %o",result)

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