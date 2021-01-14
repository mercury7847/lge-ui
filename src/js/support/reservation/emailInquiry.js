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

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$inquiryBox = self.$cont.find('#inquiryBox');
            self.$inquiryListWrap = self.$cont.find('#inquiryList');
            self.$inquiryList = self.$inquiryListWrap.find('.rdo-list');

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

                validation = new vcui.ui.CsValidation('.step-area', {register:register});

                self.$cont.commonModel({
                    register: register
                });

                self.$cont.find('.ui_imageinput').vcImageFileInput({
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
                self._next(self.$stepInquiry);
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, module, data, url) {
                var param = {
                    category: data.category,
                    categoryNm: data.categoryName,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryName
                };
                var summaryOpt = {
                    product: [data.categoryName, data.subCategoryName, data.modelCode],
                    reset: 'inquiry'
                };

                var callback = function() {
                    module.$myModelArea.hide();
                    self.$completeBtns.show();

                    module._next(module.$stepInput);
                    module._focus(module.$selectedModelBar, function() {
                        module.$selectedModelBar.vcSticky();
                    });
                }

                if (data.type == 'inquiry') {
                    module._updateSummary(summaryOpt);
                
                    self.$inquiryBox.hide();
                    
                    callback();
                } else {
                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var resultData = result.data;
    
                        module._updateSummary(summaryOpt);
                    
                        self.setInquIryType(resultData);

                        callback();
                    });
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