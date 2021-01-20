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
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}">' +
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
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myModelArea = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepInput = self.$cont.find('#stepInput');

            self.$topicBox = self.$stepInput.find('#topicBox');
            self.$topicListWrap = self.$stepInput.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');

            self.$subTopicBox = self.$stepInput.find('#subTopicBox');
            self.$subTopicListWrap = self.$stepInput.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');

            self.$solutionsBanner = self.$stepInput.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            self.$dateWrap = self.$stepInput.find('.date-wrap');
            self.$timeWrap = self.$stepInput.find('.time-wrap');

            self.$authPopup = $('#certificationPopup');

            vcui.require(['ui/validation', 'ui/formatter'], function () {
                var register = {
                    topic: {
                        required: true,
                        msgTarget: '.topic-msg'
                    },
                    subTopic: {
                        required: true,
                        msgTarget: '.sub-topic-msg'
                    },
                    userNm: {
                        msgTarget: '.err-block' 
                    },
                    phoneNo: {
                        msgTarget: '.err-block'
                    },
                    date: {
                        msgTarget: '.err-msg',
                    },
                    time: {
                        msgTarget: '.err-msg',
                    }
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

                if (!lgkorUI.isLogin) {
                    authManager = new AuthManager({
                        elem: {
                            popup: '#certificationPopup',
                            name: '#authName',
                            phone: '#authPhoneNo',
                            number: '#authNo'
                        },
                        register: authRegister
                    });
                }

                self.$cont.commonModel({
                    register: register
                });

                $('.date-wrap').calendar({
                    inputTarget: '#date'
                });

                $('.time-wrap').timeCalendar({
                    inputTarget: '#time'
                });

                self.bindEvent();
            });
        },
        selectModel: function(data, url) {
            var self = this;

            if (data.isRequest) {
                self.loadTopicList(data, url);
            } else {
                self.nextStepInput(data);
            }
        },
        loadTopicList: function(data, url) {
            var self = this;
            var param = {
                category: data.category,
                subCategory: data.subCategory,
                modelCode: data.modelCode,
                serviceType: $('#serviceType').val()
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var resultData = result.data,
                    fastDate = dateUtil.format(resultData.fastDate + '' + resultData.fastTime + '00', 'yyyy.MM.dd hh:mm');

                self.$cont.find('.calendar-info .date').html(fastDate);
                self.$dateWrap.calendar('update', resultData.dateList);
                self.$topicList.html(vcui.template(topicTmpl, data));
                
                self.nextStepInput(data);

                lgkorUI.hideLoading();
            });
        },
        loadSubTopic: function(url, param) {
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
                    if (data.solutionFlag) {
                        self.$solutionsBanner.show();
                    } else {
                        self.$solutionsBanner.hide();
                    }
                }
            });
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
        requestTime: function() {
            var url = $('.calendar-area').data('timeUrl'),
                param = validation.getAllValues(),
                result;

            param = $.extend(param, {
                topic: $('input[name=topic]:checked').val(),
                subTopic: $('input[name=subTopic]:checked').val(),
                serviceType: $('#serviceType').val(),
                productCode: $('#productCode').val(),
                category: $('#category').val(),
                subCategory: $('#subCategory').val(),
                date: $('#date').val()
            });

            result = validation.validate(['topic', 'subTopic', 'bdType', 'fan', 'addFan', 'installType', 'tvPosition', 'userNm', 'phoneNo', 'zipCode', 'userAddress', 'detailAddress']);

            if (result.success) {
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.time-wrap').timeCalendar('update', data.timeList);
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
        },
        nextStepInput: function(data) {
            var self = this;
            var summaryOpt = {
                product: [data.categoryName, data.subCategoryName, data.modelCode],
                reset: 'product'
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

            var url = self.$submitForm.data('ajax');
            var param = validation.getAllValues();

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
            }, 'POST');
        },
        reset: function() {
            var self = this;

            self.$topicList.empty();
            self.$solutionsBanner.hide();
            self.$myModelArea.show();

            self.$stepInput.find('[name=buyingdate]').prop('checked', false);
            self.$stepInput.find('#content').val('');
            self.$stepInput.find('#userNm').val('');
            self.$stepInput.find('#phoneNo').val('');

            self.$dateWrap.calendar('reset');
            self.$timeWrap.timeCalendar('reset');

            self.$cont.commonModel('next', self.$stepModel);
        },
        bindEvent: function() {
            var self = this;
            
            // 모델 선택 & 문의 재선택
            self.$cont.on('complete', function(e, data, url) {
                self.selectModel(data, url);
            }).on('reset', function(e) {
                self.reset();
            });

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.loadSubTopic(url, param);
            });

            // 세부 증상 선택
            self.$subTopicList.on('change', '[name=subTopic]', function() {
                var $this = $(this),
                    url = self.$subTopicListWrap.data('ajax'),
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
            self.$dateWrap.on('dateselected', function() {
                self.requestTime();
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (lgkorUI.isLogin) {
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