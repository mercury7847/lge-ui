(function() {
    var validation;
    var addressFinder;

    var modalInit = {
        el : {
            container : '[data-role="modal-init"]',
            check : '[data-role="today-cookie-check"] input:checkbox'
        },
        hiddenClass : '.hidden',
        hidden : function(target){
            $(target).each(function(){
                var $this = $(this);
                var cookieName = $this.attr('id');
                var cookieFlag = lgkorUI.cookie.getCookie(cookieName);
        
                if( cookieFlag == "done" ) {
                    $this.addClass('hidden');
                } 
            });
        },
        init : function(){
            var self = this;

            self.hidden(self.el.container);
            if( $(self.el.container).not(self.hiddenClass).length == 1 ) {
                $(self.el.container).not(self.hiddenClass).vcModal();
            }

            $(self.el.container).on('modalhide', function(){
                var $this = $(this);
                var cookieName = $this.attr('id');
                var $chk = $this.find(self.el.check);
        
                if ( $chk.prop('checked')) {
                    lgkorUI.cookie.setCookie(cookieName, "done", 1);
                }
            })
        }
    }
    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepModel = self.$cont.find('#stepModel');
            self.$aircareBox = self.$cont.find('#aircareBox');
            self.$aircareListWrap = self.$cont.find('#aircareList');
            self.$aircareList = self.$aircareListWrap.find('.rdo-list');
            
            self.$authPopup = $('#certificationPopup');
            self.isLogin = lgkorUI.isLogin;

            self.modelCheckUrl = self.$stepModel.data('modelCheckUrl');
            self.serialCheckUrl = self.$stepModel.data('serialCheckUrl');

            var register = {
                privcyCheck: {
                    msgTarget: '.err-block'
                },
                productFamily: {
                    required: true,
                    msgTarget: '.err-block'
                },
                modelCode: {
                    required: true,
                    pattern : /^[A-Za-z0-9+]*$/,
                    msgTarget: '.err-block'
                },
                serialNumber: {
                    required: true,
                    msgTarget: '.err-block'
                },
                userName: {
                    required: true,
                    maxLength: 30,
                    pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                },
                phoneNo: {
                    required: true,
                    pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                    msgTarget: '.err-block'
                },
                zipcode: {
                    required: true,
                    msgTarget: '.address-err-msg'
                },
                userAddress: {
                    required: true,
                    msgTarget: '.address-err-msg'
                },
                detailAddress: {
                    required: true,
                    msgTarget: '.address-err-msg'
                }
            }
            var authOptions = {
                target: {
                    name: '#userName',
                    phone: '#phoneNo'
                },
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
                        msgTarget: '.err-block',
                        pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                    },
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '인증번호를 입력해주세요.'
                    }
                }
            };

            

            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                addressFinder = new AddressFind();
                authManager = new AuthManager(authOptions);

                self.bindEvent();

                self.$cont.commonModel({
                    register: register
                });
            });
        },

        setairfilterType: function(data) {
            var self = this;
            var html;

            html = vcui.template(airfilterTmpl, data);
            self.$airfilterList.html(html);
            self.$airfilterBox.show();
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
                lgkorUI.hideLoading();
            }, 'POST');
        },

        bindEvent: function() {
            var self = this;

            $('#modelCode').siblings('.btn-search').on('click', function() {
                var param = {
                    productFamily: $('#productFamily').val(),
                    modelCode: $('#modelCode').val()
                };
                var result = validation.validate(['productFamily', 'modelCode']);

                if (result.success) {
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.modelCheckUrl, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            $('#serialNumber').prop('disabled', false);
                            $('#serialNumber').siblings('.btn-search').prop('disabled', false);
                        } else {
                            $('#serialNumber').prop('disabled', true);
                            $('#serialNumber').siblings('.btn-search').prop('disabled', true);
                            $('#modelCode').val('');
                            validation.validate(['modelCode']);
                        }
                        lgkorUI.hideLoading();
                    });
                }
            });

            $('#serialNumber').siblings('.btn-search').on('click', function() {
                var param = {
                    productFamily: $('#productFamily').val(),
                    modelCode: $('#modelCode').val(),
                    serialNumber: $('#serialNumber').val()
                };
                var result = validation.validate(['productFamily', 'modelCode', 'serialNumber']);

                if (result.success) {
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.serialCheckUrl, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'N') {
                            if (data.resultMessage) {
                                if (data.url) {
                                    lgkorUI.confirm('', {
                                        title: data.resultMessage,
                                        okBtnName: '확인',
                                        cancelBtnName: '취소',
                                        ok: function() {
                                            location.href = data.url;
                                        },
                                        cancel : function(){
                                            $('#serialNumber').val('');
                                        }
                                    });
                                } else {
                                    lgkorUI.alert('', {
                                        title: data.resultMessage,
                                        okBtnName: '확인'
                                    });
                                }
                            }
                        }
                        lgkorUI.hideLoading();
                    });
                }
            });

            // 주소 찾기
            self.$cont.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) { 
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('readonly', false);

                    self.$cont.find('.btm-more.both .chk-wrap').show();
                }); 
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    lgkorUI.confirm('', {
                        title:'공기청정 필터 신청을 접수하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            self.requestComplete();
                        }
                    });       
                }
            });
        
            // 인증문자 보내기
            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            // 인증 완료 하기
            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm('.btn-open');
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
        modalInit.init();
    });
})();