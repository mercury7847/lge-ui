(function() {
    var inquiryTmpl = 
    '{{#each (item, index) in inquiryList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="inquiry" id="inquiry{{index}}" value="{{item.value}}" data-inquiry-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="inquiry" id="inquiry{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="inquiry{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';

    var validation;
    var authManager;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$inquiryBox = self.$cont.find('#inquiryBox');
            self.$inquiryListWrap = self.$cont.find('#inquiryList');
            self.$inquiryList = self.$inquiryListWrap.find('.rdo-list');

            self.$authPopup = $('#certificationPopup');

            vcui.require(['ui/validation', 'ui/formatter', 'ui/imageFileInput'], function () {
                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    inquiryType: {
                        msgTarget: '.type-msg'
                    },
                    inquiryTitle: {
                        msgTarget: '.err-block'
                    },
                    inquiryContent: {
                        msgTarget: '.err-block'
                    },
                    userName: {
                        msgTarget: '.err-block'
                    },
                    userEmail: {
                        msgTarget: '.err-block'
                    },
                }

                var authRegister = {
                    authName: {
                        pattern: /^[가-힣a-zA-Z]+$/,
                        msgTarget: '.err-block'
                    },
                    authPhoneNo: {
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    authNo:{
                        msgTarget: '.err-block'
                    }
                };

                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                authManager = new AuthManager({
                    elem: {
                        popup: '#certificationPopup',
                        name: '#authName',
                        phone: '#authPhoneNo',
                        number: '#authNo'
                    },
                    register: authRegister
                });

                self.$cont.commonModel({
                    register: register
                });

                $('.ui_imageinput').vcImageFileInput({
                    totalSize: '10485760',
                    format: 'jpg|jpeg|png|gif',
                    message: {
                        format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                        size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다.'
                    }
                });

                self.bindEvent();
            });
        },
        setInquIryType: function(data) {
            var self = this;

            var html;

            html = vcui.template(inquiryTmpl, data);
            self.$inquiryList.html(html);
            self.$inquiryBox.show();
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();
            var formData = new FormData;

            for (var key in param) {
                formData.append(key, param[key]);
            }

            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert('', {
                            title: data.resultMessage
                        });
                    }
                }
            }, 'POST');
        },
        bindEvent: function() {
            var self = this;

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, module, info, data, callback) {
                self.$completeBtns.show();

                if (module.caseType == 'product') {
                    self.setInquIryType(data);
                } else {
                    self.$inquiryBox.hide();
                }
                callback();
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                var isLogin = $('.header').data('ui_header').isLogin;

                if (result.success == true) {    
                    if (isLogin) {
                        lgkorUI.confirm('', {
                            title:'예약 하시겠습니까?',
                            okBtnName: '확인',
                            cancelBtnName: '취소',
                            ok: function() {
                                self.requestComplete();
                            }
                        });       
                    } else {
                        authManager.open();
                    }
                }
            });

            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send();
            });

            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function() {
                    self.requestComplete();
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();