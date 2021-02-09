(function() {
    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}">' +
            '{{# } #}}' +
            '<label for="topic{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';
    var subTopicTmpl = 
    '{{#each (item, index) in subTopicList}}' +
    '<li>' +
        '<span class="rdo-wrap">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}" data-error-msg="정확한 세부증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}">' +
            '{{# } #}}' +
            '<label for="subTopic{{index}}">{{item.name}}</label>' +
        '</span>' +
    '</li>' +
    '{{/each}}';
    var validation;
    var authManager;
    var dateUtil = vcui.date;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$productBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWarp = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

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
                topic: {
                    required: true,
                    msgTarget: '.topic-msg',
                    errorMsg: '정확한 제품증상을 선택해주세요.'
                },
                subTopic: {
                    required: true,
                    msgTarget: '.sub-topic-msg',
                    errorMsg: '정확한 세부증상을 선택해주세요.'
                },
                userNm: {
                    required: true,
                    maxLength: 10,
                    pattern: /^[가-힣a-zA-Z]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '한글 또는 영문만 입력 가능합니다.'
                },
                phoneNo: {
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                    pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                    msgTarget: '.err-block',
                    errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                    patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                },
                date: {
                    required: true,
                    msgTarget: '.err-msg',
                    errorMsg: '날짜를 선택해주세요.'
                },
                time: {
                    required: true,
                    msgTarget: '.err-msg',
                    errorMsg: '시간을 선택해주세요.'
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
                        maxLength: 10,
                        pattern: /^[가-힣a-zA-Z]+$/,
                        msgTarget: '.err-block',                        
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
                    },
                    authPhoneNo: {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block',
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
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
                
                if (!self.isLogin) authManager = new AuthManager(authOptions);

                $('#route').val(lgkorUI.isMobile() ? 'WWW2' : 'WWWW1');

                self.bindEvent();

                self.$calendarDate.calendar({
                    inputTarget: '#date'
                });
                self.$calendarTime.timeCalendar({
                    inputTarget: '#time'
                });

                self.$cont.commonModel({
                    register: register,
                    selected: {
                        category: self.$cont.find('#category').val(),
                        categoryName: self.$cont.find('#categoryNm').val(),
                        subCategory: self.$cont.find('#subCategory').val(),
                        subCategoryName: self.$cont.find('#subCategoryNm').val(),
                        modelCode: self.$cont.find('#modelCode').val(),
                        productCode: self.$cont.find('#productCode').val()
                    }
                });
            });
        },
        completeModel: function(url) {
            var self = this;

            self.setInputStep(url);
        },
        nextInputStep: function() {
            var self = this;
            var data = self.model;
            var summaryOpt = {
                product: [data.categoryName, data.subCategoryName, data.modelCode],
                reset: 'product'
            };

            self.$myProductWarp.hide();
            self.$completeBtns.show();

            self.$cont.commonModel('updateSummary', summaryOpt);
            self.$cont.commonModel('next', self.$stepInput);
            self.$cont.commonModel('focus', self.$productBar, function() {
                self.$productBar.vcSticky();
            });
        },
        setInputStep: function(url) {
            var self = this;
            var param = {
                category: self.model.category,
                subCategory: self.model.subCategory,
                modelCode: self.model.modelCode,
                serviceType: $('#serviceType').val()
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var resultData = result.data;

                self.setWarranty(resultData);
                self.setTopic(resultData);
                self.setCalendar(resultData);
                
                self.nextInputStep();

                lgkorUI.hideLoading();
            });
        },
        setTopic: function(data) {
            var self = this;
            var success = (data.topicList instanceof Array && data.topicList.length) ? true : false;
            
            if (success) {
                self.$topicList.html(vcui.template(topicTmpl, data));
            }
        },
        setCalendar: function(data) {
            var self = this;
            var success = (data.dateList instanceof Array && data.dateList.length) ? true : false;
                fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');

            if (success) {
                self.$calendarWrap.find('.calendar-info .date').html(fastDate);
                self.$calendarDate.calendar('update', data.dateList);
            }
        },
        setWarranty: function(data) {
            var self = this;
            var $warranty = self.$stepInput.find('[name=buyingdate]');

            if (data.warrantyText && data.warrantValue) {
                $warranty.closest('.conts').append('<p class="form-text">'+data.warrantyText+'</p>');
                $warranty.filter('[value='+data.warrantValue+']').prop('checked', true);
                
                $warranty.closest('.rdo-list-wrap').hide();
            } else {
                $warranty.closest('.conts').find('.form-text').remove();
                $warranty.prop('checked', false);

                $warranty.closest('.rdo-list-wrap').show();
            }
        },
        setSolutions: function(url, param, isShown) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var url = self.$solutionsPopup.data('listUrl'),
                        param = {
                            topic : $('#topic').val(),
                            subToic : $('#subTopic').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(url, param, true);
                });
            }, null, "html", true);
        },
        requestSubTopic: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data,
                    html;
                    
                html = vcui.template(subTopicTmpl, data);

                self.$subTopicList.html(html);
                self.$subTopicBox.show();
            });
        },
        reqeustSolutions: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;
                
                if (data.resultFlag == 'Y') {
                    self.$solutionsBanner.show();
                } else {
                    self.$solutionsBanner.hide();
                }
            });
        },
        requestTime: function() {
            var self = this;
            var url = $('.calendar-area').data('timeUrl');
            var param = {
                serviceType: $('#serviceType').val(),
                productCode: $('#productCode').val(),
                category: $('#category').val(),
                subCategory: $('#subCategory').val(),
                date: $('#date').val()
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$calendarTime.timeCalendar('update', data.timeList);
                    self.$calendarTime.find('.box-desc').hide();
                    self.$calendarTime.find('.box-table').show();
                } else {
                    if (data.resultMessage) {                            
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
                lgkorUI.hideLoading();
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
        reset: function() {
            var self = this;

            self.$cont.commonModel('next', self.$stepModel);

            self.$topicList.empty();
            self.$solutionsBanner.hide();
            self.$completeBtns.hide();
        
            self.$stepInput.find('[name=buyingdate]').closest('.conts').find('.form-text').remove();
            self.$stepInput.find('[name=buyingdate]').prop('checked', false);
            self.$stepInput.find('#content').val('');
            
            if (!self.isLogin) {
                self.$stepInput.find('#userNm').val('');
                self.$stepInput.find('#phoneNo').val('');
            } else {
                self.$myProductWarp.show();
            }

            self.$calendarDate.calendar('reset');
            self.$calendarTime.timeCalendar('reset');
        },
        bindEvent: function() {
            var self = this;
            
            // 모델 선택 & 문의 재선택
            self.$cont.on('complete', function(e, data, url) {
                self.model = data;
                self.completeModel(url);
            }).on('reset', function(e) {
                self.reset();
            });

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        productCode: $('#productCode').val(),
                        serviceType: $('#serviceType').val()
                    };
                
                self.$solutionsBanner.hide();
                self.requestSubTopic(url, param);
            });

            // 세부 증상 선택
            self.$subTopicList.on('change', '[name=subTopic]', function() {
                var $this = $(this),
                    url = self.$subTopicWrap.data('ajax'),
                    param = {
                        topic : $('input[name=topic]:checked').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.reqeustSolutions(url, param);
            });

            // 솔루션 배너
            self.$solutionsBanner.find('.btn-link').on('click', function(){
                var url = $(this).data('href');
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };   

                self.setSolutions(url, param, false);
            });

            // 날짜 선택
            self.$calendarDate.on('dateselected', function() {
                self.requestTime();
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