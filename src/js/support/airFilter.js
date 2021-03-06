(function() {
    var validation;
    var addressFinder;
    var authFlag = lgkorUI.isLogin;

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

            self.$stepInput = self.$cont.find('#stepInput');
            self.$aircareListWrap = self.$cont.find('#aircareList');
            self.$aircareList = self.$aircareListWrap.find('.rdo-list');
            
            self.$authPopup = $('#certificationPopup');
            self.isLogin = lgkorUI.isLogin;
            self.isModelCheck = false;
            self.isSerialCheck = false;

            self.modelCheckUrl = self.$stepInput.data('modelCheckUrl');
            self.serialCheckUrl = self.$stepInput.data('serialCheckUrl');

            var register = {
                privcyCheck: {
                    required: true,
                    msgTarget: '.err-block'
                },
                productFamily: {
                    required: true,
                    msgTarget: '.err-block'
                },
                modelCode: {
                    required: true,
                    pattern : /^[A-Za-z0-9+]*$/,
                    maxLength: 20,
                    msgTarget: '.err-block',
                    errorMsg: '????????? ?????? ??? ?????? ????????? ???????????? ?????????.',
                    patternMsg: '3M?????? ??????????????? ????????????. ???????????? ?????? ?????????????????? ????????????.'
                },
                serialNumber: {
                    required: true,
                    pattern : /^[A-Za-z0-9+]*$/,
                    maxLength:12,
                    msgTarget: '.err-block',
                    errorMsg: '?????? ?????? ?????? ??? ?????? ????????? ???????????? ?????????.',
                    patternMsg: '????????? ??????????????? ????????? ?????????.'
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
                        pattern: /^[???-???\s]|[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '????????? ??????????????????.',
                        patternMsg: '????????? ?????? ?????? ??????????????? ??????????????????.'
                    },
                    authPhoneNo: {
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '????????? ?????????????????? ??????????????????.',
                        patternMsg: '????????? ?????????????????? ??????????????????.',
                        validate : function(value){
                            return validatePhone(value);
                        } 
                    },
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '??????????????? ??????????????????.'
                    }
                }
            };

            vcui.require(['ui/validation', 'support/common/searchModel.min'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                addressFinder = new AddressFind();
                authManager = new AuthManager(authOptions);

                self.bindEvent();

                if (authFlag) {
                    self.$cont.vcSearchModel({onlyMyModel:true});
                    self.$cont.on('complete', function() {
                        $('html,body').stop().animate({
                            scrollTop: $('.cont-wrap').offset().top
                        });
                    });
                }
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

            $('#modelCode').on('input', function() {
                self.isModelCheck = false;
                self.isSerialCheck = false;
            });
            $('#serialNumber').on('input', function() {
                self.isSerialCheck = false;
            });

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
                            $('#serialNumber').prop('readonly', false);
                            $('#serialNumber').siblings('.btn-search').prop('disabled', false);
                            self.isModelCheck = true;
                        } else {
                            $('#serialNumber').prop('readonly', true);
                            $('#serialNumber').siblings('.btn-search').prop('disabled', true);
                            $('#modelCode').val('');
                            
                            self.isModelCheck = false;
                            self.isSerialCheck = false;
                        }

                        if (data.resultMessage) {
                            lgkorUI.alert('', {
                                title: data.resultMessage,
                                okBtnName: '??????'
                            });
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
                                        okBtnName: '??????',
                                        cancelBtnName: '??????',
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
                                        okBtnName: '??????'
                                    });
                                }
                            }
                            self.isSerialCheck = false;
                        } else {
                            self.isSerialCheck = true;

                            if (data.resultMessage) {
                                lgkorUI.alert('', {
                                    title: data.resultMessage,
                                    okBtnName: '??????'
                                });
                            }
                        }
                        lgkorUI.hideLoading();
                    });
                }
            });

            // ?????? ??????
            self.$cont.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) { 
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('readonly', false);
                }); 
            });

            // ?????? ??????
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (!self.isModelCheck) {
                        lgkorUI.alert('', {
                            title: '????????? ?????? ??? ?????? ????????? ???????????? ?????????.',
                        }, $('#modelCode')[0]);
                        return false;
                    } else if (!self.isSerialCheck) {
                        lgkorUI.alert('', {
                            title: '?????? ?????? ?????? ??? ?????? ????????? ???????????? ?????????.',
                        }, $('#serialNumber')[0]);
                        return false;
                    } else if (!authFlag) {
                        lgkorUI.alert('', {
                            title:'???????????? ????????? ???????????????.',
                            okBtnName: '??????',
                        }, $('.btn-open')[0]);
                        return false;
                    }

                    lgkorUI.confirm('', {
                        title:'???????????? ?????? ????????? ?????????????????????????',
                        okBtnName: '??????',
                        cancelBtnName: '??????',
                        ok: function() {
                            self.requestComplete();
                        }
                    });       
                }
            });

            $('.btn-open, #userName, #phoneNo').on('click', function() {
                var result = validation.validate(['privcyCheck']);

                if (!authFlag && result.success) {
                    authManager.open(function() {
                        if ($('#userName').val()) {
                            $('#authName').val($('#userName').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);
                        }
                    });
                }
            });
        
            // ???????????? ?????????
            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            // ?????? ?????? ??????
            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm('.btn-open', function(success, result) {
                    authFlag = success;
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
        modalInit.init();
    });
})();