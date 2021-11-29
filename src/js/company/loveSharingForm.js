(function() {
    var validation;
    var dateUtil = vcui.date;
    var detect = vcui.detect;
    var isLogin = lgkorUI.isLogin;

    var reservation = {
        init: function() {
            var self = this;

            self.addressFinder = new AddressFind();
            self.$cont = $('.company.container');
            self.$submitForm = self.$cont.find('#loveSharingForm');
            self.$completeBtns = self.$cont.find('.btn-wrap');

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
                        msgTarget: '.err-block',
                        errorMsg: '휴대폰번호를 입력해주세요.',
                        patternMsg: '휴대폰번호를 정확히 입력해주세요.',
                        validate : function(value){
                            return self.validatePhone(value);
                        }
                    },
                    //이메일
                    userEmail: {
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
                        patternMsg: '특수문자는 입력이 불가합니다.'
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
                        //maxLength: 10,
                        msgTarget: '.err-block',
                        errorMsg: '고유번호증을 입력해 주세요.',
                        patternMsg: '정확한 고유번호를 입력해주세요.'
                    },
                    //사무실 전화번호
                    groupTel: {
                        required: true,
                        minLength: 9,
                        maxLength: 11,
                        msgTarget: '.err-block',
                        errorMsg: '전화번호를 정확히 입력해주세요.',
                        patternMsg: '정확한 휴대폰번호를 입력해주세요.'
                    },
                    //주소
                    zipCode: {
                        required: true,
                        msgTarget: '.address-err-msg',
                        errorMsg: '정확한 주소를 입력해주세요.'
                    },
                    userAddress: {
                        required: true,
                        msgTarget: '.address-err-msg',
                        errorMsg: '정확한 주소를 입력해주세요.'
                    },
                    detailAddress: {
                        required: true,
                        msgTarget: '.address-err-msg',
                        errorMsg: '정확한 주소를 입력해주세요.'
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

                self.$cont.find('.ui_fileinput').vcFileInput({
                    regex: /^.+$/gi,
                    format: 'jpg|jpeg|png|gif|xlsx|hwp|pptx|ppt|psd|txt|docx|zip|html|pdf',
                    totalSize: '2000000',
                    maxLength: 1,
                    message: {
                        length: '첨부 파일은 최대 1개까지 가능합니다.',
                        name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.!!!',
                        format: '파일 형식을 확인해 주세요.',
                        size: '첨부파일 용량은 2MB 이내로 등록 가능합니다.'
                    }
                });

            });
        },
        validatePhone: function(value){
            var self = this;
            var _pattern = new RegExp(/^(010|016|011|017|018|019)\d{3,4}\d{4}$/);
            if( _pattern.test(value) == true) {
                var _length = value.length;
                var firstVal = value.substr(0,3);
                var num4th = value.substr(3,1);
                var num3 = value.substr(3,3);
                var num4 = value.substr(3,4);

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
        bindEvent: function() {
            var self = this;

            self.$cont.on('reset', function() {
                self.$completeBtns.hide();

                // validation.reset();

                // self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
                // self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
                // self.$cont.find('.ui_imageinput').vcImageFileInput('removeAll');
            });

            // 특수문자 제거
            $(document).on('keydown', '#phoneNo, #groupNumber, #groupTel', function(e){
                if( e.keyCode == 189 || e.keyCode == 187 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 110 || e.keyCode == 190) {
                    e.preventDefault();
                }
            });

            $(document).on('keyup', 'input[type="number"]', function(e){
                var $this = $(this);
                var v = $this.val();

                if( e.keyCode != 8 && e.keyCode != 46) {
                    if( v != null && v != "") {
                        $this.data('oldValue', v);
                    }
                } else {
                    $this.data('oldValue', v);
                }
            });

            $(document).on('blur', 'input[type="number"]', function(e){
                var $this = $(this);
                var v = $this.val();
                var oldVal = $this.data('oldValue');

                if( v == null || v == "") {
                    $this.val(oldVal);
                }
            });

            // 주소 찾기 팝업
            self.$cont.find('.btn-address').on('click', function() {
                self.addressFinder.open(function(data) {
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('readonly', false);
                });
            });

            self.$completeBtns.find('.estimateBtn').on('click', function() {
                var result = validation.validate();
console.log("result",result);
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
        },
        requestComplete: function(){
            var self = this;

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();
            var formData = new FormData();

console.log("param",param);

            for (var key in param) {
                formData.append(key, param[key]);
            }

            lgkorUI.showLoading();
            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    //result.data.nomemberId && $('#nomemberId').val(result.data.nomemberId);
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
    }

    $(window).ready(function() {
        reservation.init();
    });
})();