(function() {
    var inquiryTmpl = 
    '{{#each (item, index) in inquiryList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="subsection" id="inquiry{{index}}" value="{{item.value}}" data-inquiry-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="subsection" id="inquiry{{index}}" value="{{item.value}}" data-inquiry-name="{{item.name}}">' +
            '{{# } #}}' +
            '<label for="inquiry{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';

    var validation;

    var reservation = {
        init: function() {
            var self = this;

            self.$cont = $('.contents');
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myModelArea = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepTerms = self.$cont.find('#stepTerms');
            self.$stepInquiry = self.$cont.find('#stepInquiryType');

            self.$stepInput = self.$cont.find('#stepInput');
            self.$inquiryBox = self.$cont.find('#inquiryBox');
            self.$inquiryListWrap = self.$cont.find('#inquiryList');
            self.$inquiryList = self.$inquiryListWrap.find('.rdo-list');
            self.$recordBox = self.$stepInput.find('#recordBox');
            self.$rcptNoBox = self.$stepInput.find('#rcptNoBox');

            self.isDefault = self.$cont.find('#category').val() ? true : false;

            vcui.require(['ui/validation', 'ui/formatter', 'ui/imageFileInput'], function () {
                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block',
                        errorMsg: '개인정보 수집 및 이용에 동의 하셔야 이용 가능합니다.'
                    },
                    subsection: {
                        required: true,
                        msgTarget: '.type-msg',
                        errorMsg: '정확한 제품증상을 선택해주세요.'
                    },
                    cRcptNo: {
                        msgTArget: '.err-block',
                        errorMsg: '접수 번호를 입력해주세요.'
                    },
                    inquiryTitle: {
                        msgTarget: '.err-block',
                        errorMsg: '제목을 입력해주세요.'
                    },
                    inquiryContent: {
                        msgTarget: '.err-block',
                        errorMsg: '내용을 입력해주세요.'
                    },
                    userName: {
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.'
                    },
                    userEmail: {
                        msgTarget: '.err-block',
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        errorMsg: '이메일 주소를 입력해주세요.',
                        patternMsg: '이메일 주소를 정확히 입력해주세요.'
                    },
                }

                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                self.$cont.commonModel({register: register, isDefault: self.isDefault});

                self.$cont.find('.ui_imageinput').vcImageFileInput({
                    totalSize: '10485760',
                    format: 'jpg|jpeg|png|gif',
                    message: {
                        format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                        size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다.'
                    }
                });

                self.bindEvent();

                if (self.isDefault && !self.$stepTerms.length) {
                    self.$cont.commonModel('complete');
                }
            });
        },
        selectModel: function(data, url) {
            var self = this;

            if (data.isRequest || self.isDefault) {
                self.loadInquiry(data, url);
            } else {
                self.$inquiryBox.hide();
                self.nextStepInput(data);
            }
        },
        loadInquiry: function(data, url) {
            var self = this;
            var param = {
                category: data.category,
                subCategory: data.subCategory,
                modelCode: data.modelCode,
                serviceType: $('#serviceType').val()
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var resultData = result.data;
                var result = resultData.inquiryList instanceof Array ? resultData.inquiryList.length : false;
                var html = '';

                self.$inquiryList.empty();

                if (result) {
                    html = vcui.template(inquiryTmpl, resultData);
                    self.$inquiryList.html(html);
                    self.$inquiryBox.show();

                    self.nextStepInput(data);
                } else {
                    self.$inquiryBox.hide();
                }
                lgkorUI.hideLoading();
            });
        },
        nextStepInput: function(data) {
            var self = this;
            var summaryOpt = {
                product: [data.categoryName, data.subCategoryName, data.modelCode],
                reset: 'type'
            };

            self.$myModelArea.hide();
            self.$completeBtns.show();

            self.$cont.commonModel('updateSummary', summaryOpt);
            self.$cont.commonModel('next', self.$stepInput);
            self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                self.$selectedModelBar.vcSticky();
            });
        },
        requestComplete: function() {
            var self = this;
            var url = self.$submitForm.data('ajax'),
                param = validation.getAllValues(),
                formData = new FormData;

            for (var key in param) {
                formData.append(key, param[key]);
            }

            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert("", { title: data.resultMessage });
                    }
                }
            }, 'POST');
        },
        reset: function() {
            var self = this;

            self.$recordBox.hide();
            self.$rcptNoBox.hide();
            self.$inquiryBox.hide();
            self.$inquiryList.empty();
            self.$myModelArea.show();

            self.$stepInput.find('[name=subsection]').prop('checked', false);
            self.$stepInput.find('[name=record]').eq(0).prop('checked', true);
            self.$stepInput.find('#cRcptNo').val('');
            self.$stepInput.find('#inquiryTitle').val('');
            self.$stepInput.find('#inquiryContent').val('');
            self.$stepInput.find('#userName').val('');
            self.$stepInput.find('#userEmail').val('');

            self.$cont.find('.ui_imageinput').vcImageFileInput('removeAll');
            self.$cont.commonModel('next', self.$stepInquiry);
        },
        bindEvent: function() {
            var self = this;

            // 모델 선택 & 문의 재선택
            self.$cont.on('complete', function(e, data, url) {
                self.selectModel(data, url);
            }).on('reset', function() {
                self.reset();
            });

            // 문의 유형 선택 시
            self.$inquiryBox.on('change', '[name=subsection]', function() {
                self.$recordBox.find('input[type=radio]').eq(0).prop('checked', true);
                self.$recordBox[$(this).data('inquiryName') == 'A/S' ? 'show':'hide']();
            });

            // 상담/서비스 이력 선택 시
            self.$recordBox.on('change', '[name=record]', function() {
                if ($(this).val() == '0') {
                    self.$rcptNoBox.hide();
                    self.$rcptNoBox.find('input').val('');
                } else {
                    self.$rcptNoBox.show();
                }
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    lgkorUI.confirm('', {
                        title:'예약 하시겠습니까?',
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