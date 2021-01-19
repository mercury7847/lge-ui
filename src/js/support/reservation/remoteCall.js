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
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$topicBox = self.$cont.find('#topicBox');
            self.$topicListWrap = self.$cont.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');

            self.$subTopicBox = self.$cont.find('#subTopicBox');
            self.$subTopicListWrap = self.$cont.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');

            self.$solutionsBanner = self.$cont.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            self.$dateWrap = self.$cont.find('.date-wrap');
            self.$timeWrap = self.$cont.find('.timte-wrap');

            self.$authPopup = $('#certificationPopup');

            self.autoFlag = false;
            self.isLogin = $('#topLoginFlag').length ? $('#topLoginFlag').val() : 'N';

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
            vcui.require(['ui/validation', 'ui/formatter'], function () {

                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                
                if (self.isLogin != 'Y') {
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
        setTopicList: function(data) {
            var self = this;

            var html;

            html = vcui.template(topicTmpl, data);
            self.$topicList.html(html);
        },
        setReserveDate: function(data) {
            var html;
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
        requestDate: function() {
            var self = this;
            var url = self.$stepInput.data('ajax'),
                param = validation.getAllValues(),
                result;

            param = $.extend(param, {
                topic: $('input[name=topic]:checked').val(),
                subTopic: $('input[name=subTopic]:checked').val(),
                serviceType: $('#serviceType').val(),
                productCode: $('#productCode').val(),
                category: $('#category').val(),
                subCategory: $('#subCategory').val()
            });

            result = validation.validate(['topic', 'subTopic', 'userNm', 'phoneNo']);

            if (result.success) {
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data,
                        dateArr = data.dateList instanceof Array ? data.dateList : [],
                        fastDate;

                    if (data.resultFlag == 'Y') {
                        if (dateArr.length) {
                            fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');
                        
                            self.$stepDate.find('.calendar-info .date').html(fastDate);    
                            $('.date-wrap').calendar('update', data.dateList);
                            self.dateParam = result.param;

                            self.$stepDate.addClass('active');
                        }
                    } else {
                        if (data.resultMessage) {
                            if (data.tAlert == 'Y') {
                            }
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
        },
        requestTime: function() {
            var self = this,
                url = $('.calendar-area').data('timeUrl'),
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

            result = validation.validate(['topic', 'subTopic', 'userNm', 'phoneNo']);

            if (result.success) {
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.time-wrap').timeCalendar('update', data.timeList);
                        $('.time-wrap').find('.box-desc').hide();
                        $('.time-wrap').find('.box-table').show();
                    } else {
                        if (data.resultMessage) {
                            if (data.tAlert == 'Y') {

                            }
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
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
        bindEvent: function() {
            var self = this;

            self.$cont.on('reset', function(e, module) {
                self.$solutionsBanner.hide();
                module._next(module.$stepModel);
            });
            
            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, module, data, url) {
                var param = {
                    modelCode: data.modelCode,
                    serviceType: $('#serviceType').val(),
                    category: data.category,
                    subCategory: data.subCategory
                };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var resultData = result.data;
                    var fastDate;

                    module._updateSummary({
                        product: [data.categoryName, data.subCategoryName, data.modelCode],
                        reset: true
                    });
                    
                    self.$dateWrap.calendar('update', resultData.dateList);

                    fastDate = dateUtil.format(resultData.fastDate + '' + resultData.fastTime + '00', 'yyyy.MM.dd hh:mm');
                    $('.calendar-info .date').html(fastDate);

                    self.setTopicList(resultData)
                    self.$completeBtns.show();
                    module.$myModelArea.hide();

                    module._next(module.$stepInput);
                    module._focus(module.$selectedModelBar, function() {
                        module.$selectedModelBar.vcSticky();
                    });
                });
            });

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                
                self.$solutionsBanner.hide();
                self.requestSubTopic(url, param);
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

                if (self.autoFlag) self.requestDate();
            });

            /// 솔루션 배너
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

            /// 날짜 선택
            $('.date-wrap').on('dateselected', function() {
                self.requestTime();
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (self.isLogin == 'Y') {
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