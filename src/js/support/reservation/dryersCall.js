(function() {
    var validation;
    var authManager;
    var termsValidation;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$productBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWarp = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepTerms = self.$cont.find('#stepTerms');
            self.$stepModel = self.$cont.find('#stepModel');

            self.$stepInput = self.$cont.find('#stepInput');
            self.$topicBox = self.$cont.find('#topicBox');
            self.$topicWrap = self.$cont.find('#topicList');
            self.$topicList = self.$topicWrap.find('.rdo-list');
            self.$subTopicBox = self.$cont.find('#subTopicBox');
            self.$subTopicWrap = self.$cont.find('#subTopicList');
            self.$subTopicList = self.$subTopicWrap.find('.rdo-list');
            self.$solutionsBanner = self.$cont.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');
            self.$calendarWrap = self.$cont.find('.calendar-area');
            self.$calendarDate = self.$calendarWrap.find('.date-wrap');
            self.$calendarTime = self.$calendarWrap.find('.time-wrap');

            self.$authPopup = $('#certificationPopup');

            self.isLogin = lgkorUI.isLogin;

            var register = {
                userNm: {
                    required: true,
                    maxLength: 30,
                    pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                },
                phoneNo: {
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                    msgTarget: '.err-block',
                    errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                    patternMsg: '정확한 휴대전화 번호를 입력해주세요.',
                    validate : function(value){
                        return validatePhone(value);
                    } 
                }
            };
            var authOptions = {
                elem: {
                    popup: '#certificationPopup',
                    name: '#authName',
                    phone: '#authPhoneNo',
                    number: '#authNo'
                },
                register: {
                    authName: {
                        required: true,
                        maxLength: 30,
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                    },
                    authPhoneNo: {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        msgTarget: '.err-block',
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        validate : function(value){
                            return validatePhone(value);
                        } 
                    },
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '인증번호를 입력해주세요.',
                    }
                }
            };
            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                termsValidation = new vcui.ui.CsValidation('#stepTerms', {
                    register: {
                        privcyCheck: { msgTarget: '.err-block' }
                    }
                });
                if (!self.isLogin) authManager = new AuthManager(authOptions);

                $('#route').val(lgkorUI.isMobile() ? 'WWW2' : 'WWWW1');

                self.bindEvent();
            });
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    $('#acptNo').val(data.acptNo);
                } else {
                    lgkorUI.hideLoading();
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
                self.$submitForm.submit();
            }, 'POST');
        },
        
        bindEvent: function() {
            var self = this;

            $('#stepTerms .btn-next').click(function() {
                var result;
                
                //개인정보 수집 및 이용에 대한 동의 유효성 체크
                result = termsValidation.validate();
                if (result.success) {
                    $('.step-box').removeClass('active');
                    $('#stepInput').addClass('active');
                    $('.btn-group').show();    
                }
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (self.isLogin) {
                        lgkorUI.confirm('', {
                            title:'예약 하시겠습니까?',
                            okBtnName: '확인',
                            cancelBtnName: '취소',
                            ok: function() {
                                self.requestComplete();
                            }
                        });       
                    } else {
                        authManager.open(function() {
                            $('#authName').val($('#userNm').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
                    }
                }
            });

            // 인증문자 보내기
            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            // 인증 완료 하기
            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function(success, result) {
                    success && self.requestComplete();
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();