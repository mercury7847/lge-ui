(function() {
    var validation;

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

            self.isLogin = $('#topLoginFlag').length ? $('#topLoginFlag').val() : 'N';

            vcui.require(['ui/validation', 'ui/formatter'], function () {

                var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    userName: {
                        msgTarget: '.err-block'
                    },
                    phoneNo: {
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    email:{
                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        msgTarget: '.err-block'
                    },
                    replyCheck: {
                        msgTarget: '.reply-err-block'
                    },
                    title: {
                        msgTarget: '.err-block'
                    },
                    content: {
                        msgTarget: '.err-block'
                    }
                }

                validation = new vcui.ui.CsValidation('#submitForm', {register:register});

                self.$cont.commonModel({
                    register: register
                });

                $('.ui_imageinput').vcImageFileInput({
                    totalSize: '50000',
                    format: 'jpg|jpeg',
                    message: {
                        format: 'JPG만 업로드 가능합니다.',
                        size: '첨부파일 크기는 50kb 이하로 등록 해주세요.'
                    }
                });

                self.bindEvent();
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

            $('.contents').on('complete', function(e, module, data, url) {
                var param = {
                    modelCode: data.modelCode,
                    serviceType: $('#serviceType').val(),
                    category: data.category,
                    subCategory: data.subCategory
                };

                self.$cont.commonModel('updateSummary', {
                    product: [data.categoryName, data.subCategoryName, data.modelCode],
                    reset: 'product'
                });
                
                self.$myModelArea.hide();
                self.$completeBtns.show();

                self.$cont.commonModel('next', self.$stepInput);
                self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                });
            });

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