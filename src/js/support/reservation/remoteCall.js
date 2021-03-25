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
    var detect = vcui.detect;
    var isLogin = lgkorUI.isLogin;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');
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

            self.resultUrl = self.$searchModelWrap.data('resultUrl');

            self.$cont.find('#route').val(detect.isMobile ? 'WWW2' : 'WWWW1');

            var register = {
                privcyCheck: {
                    required: true,
                    msgTarget: '.err-block',
                    errorMsg: '개인정보 수집 및 이용에 동의 하셔야 이용 가능합니다.'
                },
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
                    errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                    patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                    validate : function(value){
                        return validatePhone(value);
                    } 
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

            vcui.require(['ui/validation', 'support/common/searchModel.min'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                
                if (!isLogin) {
                    authManager = new AuthManager({
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
                                errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                                patternMsg: '정확한 휴대폰번호를 입력해주세요.',
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
                    });
                }

                self.bindEvent();

                self.$calendarDate.calendar({inputTarget:'#date'});
                self.$calendarTime.timeCalendar({inputTarget:'#time'});
                self.$cont.vcSearchModel(); 
            });
        },
        completeModel: function() {
            var self = this;
            var param = {
                category: self.model.category,
                subCategory: self.model.subCategory,
                modelCode: self.model.modelCode,
                serviceType: self.model.serviceType
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.resultUrl, param, function(result) {
                var data = result.data;

                self.setWarranty(data);
                self.setTopic(data);
                self.setCalendar(data);
                
                self.nextInputStep();

                lgkorUI.hideLoading();
            });
        },
        nextInputStep: function() {
            var self = this;
            var summaryOpt = {
                product: [self.model.categoryNm, self.model.subCategoryNm, self.model.modelCode],
                reset: 'product'
            };

            self.$completeBtns.show();
            self.$cont.vcSearchModel('updateSummary', summaryOpt);
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
        setSolutions: function(param, isShown) {
            var self = this;
            var url = self.$solutionsPopup.data('listUrl');

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var param = {
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(param, true);
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
                    lgkorUI.hideLoading();
                    
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            }, 'POST');
        },
        reset: function() {
            var self = this;

            self.$topicList.empty();
            self.$subTopicList.empty();
            self.$subTopicBox.hide();
            self.$solutionsBanner.hide();
            self.$completeBtns.hide();
        
            self.$stepInput.find('[name=buyingdate]').closest('.conts').find('.form-text').remove();
            self.$stepInput.find('[name=buyingdate]').prop('checked', false);
            self.$stepInput.find('#content').val('');
            
            if (!isLogin) {
                self.$stepInput.find('#userNm').val('');
                self.$stepInput.find('#phoneNo').val('');
            } else {
                self.$myProductWarp.show();
            }
            
            validation.reset();
            self.$calendarDate.calendar('reset');
            self.$calendarTime.timeCalendar('reset');
            self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
            self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
        },
        bindEvent: function() {
            var self = this;
            
            // 모델 선택 & 문의 재선택
            self.$cont.on('complete', function(e, data) {
                self.model = data;
                self.completeModel();
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
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };   

                self.setSolutions(param, false);
            });

            // 날짜 선택
            self.$calendarDate.on('dateselected', function() {
                validation.validate(['date']);
                self.requestTime();
            });

            // 날짜 선택
            self.$calendarTime.on('timeselected', function() {
                validation.validate(['time']);
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

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