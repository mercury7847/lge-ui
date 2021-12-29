(function() {
    var validation;

    var reservation = {
        init: function() {
            var self = this;
            self.param = {};

            self.addressFinder = new AddressFind();
            self.$cont = $('.company.container');
            self.$submitForm = self.$cont.find('#loveSharingForm');
            self.$writeForm = self.$cont.find('.write-form');
            self.$viewWriteForm = self.$cont.find('.write-form-confirm');
            self.$completeBtns = self.$cont.find('.btn-wrap');

            vcui.require(['ui/validation'], function () {
                var register = {
                    //담당자
                    userName: {
                        required: true,
                        maxLength: 25,
                        pattern: /^[가-힣a-zA-Z0-9\s]+$/,
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
                        pattern: /^[가-힣a-zA-Z0-9\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '특수문자는 입력이 불가합니다.'
                    },
                    //단체명
                    groupName: {
                        required: true,
                        maxLength: 25,
                        pattern: /^[가-힣a-zA-Z0-9\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '단체명을 입력해 주세요.',
                        patternMsg: '특수문자는 입력이 불가합니다.'
                    },
                    //고유번호증
                    groupNumber: {
                        required: true,
                        minLength: 10,
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
                        errorMsg: '필수 입력정보가 입력되지 않았습니다.',
                        patternMsg: '정확한 주소를 입력해주세요.'
                    },
                    userAddress: {
                        required: true,
                        msgTarget: '.address-err-msg',
                        errorMsg: '필수 입력정보가 입력되지 않았습니다.',
                        patternMsg: '정확한 주소를 입력해주세요.'
                    },
                    detailAddress: {
                        required: true,
                        msgTarget: '.address-err-msg',
                        errorMsg: '필수 입력정보가 입력되지 않았습니다.',
                        patternMsg: '정확한 주소를 입력해주세요.'
                    },
                    //제안 내용
                    commentContent: {
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '내용을 입력해 주세요.'
                    },
                    //고유번호증 사본첨부
                    fileUpload: {
                        required: true
                    },
                    //사업계획서 첨부
                    fileUpload2: {
                        required: true
                    }
                }

                //고유번호증 사본첨부, 사업계획서 첨부
                $('.ui_fileinput').vcFileInput({
                    separateType: true,
                    regex: /^.+$/gi,
                    format: 'txt|doc|docm|docx|pptx|ppt|pdf|xlsx|xls|xml|jpeg|jpg|png|svg|zip|7z|bz|bz2',
                    totalSize: '2000000',
                    maxLength: 1,
                    message: {
                        length: '첨부 파일은 최대 1개까지 가능합니다.',
                        name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                        format: '첨부할 수 없는 파일입니다.',
                        size: '첨부파일 최대 용량은 2MB까지 등록 가능 합니다.'
                    }
                });

                validation = new vcui.ui.CsValidation('#loveSharingForm', {register:register});
                self.bindEvent();
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

            // 특수문자 제거
            $(document).on('keydown', '#phoneNo, #groupNumber, #groupTel', function(e){
                if( e.keyCode == 189 || e.keyCode == 187 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 110 || e.keyCode == 190) {
                    e.preventDefault();
                }
            });

            $(document).on('input', 'input[type="number"]', function(){
                if (this.maxLength > 0 && this.value.length > this.maxLength){
                    this.value = this.value.slice(0, this.maxLength);
                }
            });

            $('input[type="number"]').on({
                keyup : function(e){
                    var $this = $(this);
                    var v = $this.val();

                    if( e.keyCode != 8 && e.keyCode != 46) {
                        if( v != null && v != "") {
                            $this.data('oldValue', v);
                        }
                    } else {
                        $this.data('oldValue', v);
                    }
                },
                blur : function(e){
                    var $this = $(this);
                    var v = $this.val();
                    var oldVal = $this.data('oldValue');

                    if( v == null || v == "") {
                        $this.val(oldVal);
                    }
                }
            });

            // 주소 찾기 팝업
            self.$cont.find('.btn-address').on('click', function() {
                self.addressFinder.open(function(data) {
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('disabled', false);
                });
            });
            
            //신청 버튼 클릭시
            self.$completeBtns.find('.applyBtn').on('click', function() {
                var result = validation.validate();

                self.param = validation.getAllValues();

                if (result.success === true) {
                    lgkorUI.showLoading();
                    self.$writeForm.hide();
                    self.$viewWriteForm.show();
                    registerInfoForm();
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500);
                    lgkorUI.hideLoading();
                }else{
                    lgkorUI.alert('', {
                        title:'필수 입력정보가<br>입력되지 않았습니다.'
                    });
                }
            });

            //취소 버튼 클릭시
            self.$completeBtns.find('.cancelBtn').on('click', function() {
                lgkorUI.confirm('', {
                    title:'입력하신 신청 정보를<br>취소 하시겠습니까?',
                    okBtnName: '네',
                    cancelBtnName: '아니오',
                    ok: function() {
                        location.href = "/company/sustainable/socialContribution#com-tabs02"
                    }
                });
            });
            
            //신청 버튼 클릭 후 입력 내용 확인 페이지에 value 값 추가
            function registerInfoForm(){
                self.$viewWriteForm.find('.write-data').each(function(){
                    var $this = $(this);
                    var $feild = $(this).data("value");
                    $.each(self.param,function(key, value){
                        if(key === $feild){
                            if(key === "fileUpload" || key === "fileUpload2"){
                                $this.text(value.name);
                            }else if(key === "homepage"){
                                value === "" ? $this.text("-") : $this.text(value);
                            }else{
                                $this.text(value);
                            }
                        }
                    })
                })
            };

            //완료 버튼 클릭시
            self.$completeBtns.find('.submitBtn').on('click', function() {
                self.requestComplete();
            });

            //수정 버튼 클릭시
            self.$completeBtns.find('.modifyBtn').on('click', function() {
                lgkorUI.showLoading();
                self.$writeForm.find('.btn-wrap .cancelBtn span').text("수정 취소");
                self.$writeForm.find('.btn-wrap .applyBtn span').text("수정 신청");
                self.$writeForm.show();
                self.$viewWriteForm.hide();
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                lgkorUI.hideLoading();
            });
        },
        requestComplete: function(){
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
                    lgkorUI.hideLoading();
                    lgkorUI.alert("", {
                        title: "사랑나눔 신청이 완료 되었습니다.",
                        okBtnName: '확인',
                        ok: function() {
                            self.$submitForm.submit();
                            location.href = "/company/sustainable/socialContribution#com-tabs02"
                        }
                    });
                } else {
                    lgkorUI.hideLoading();
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage,
                            okBtnName: '확인',
                            ok: function() {
                                location.href = "/company/sustainable/socialContribution#com-tabs02"
                            }
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