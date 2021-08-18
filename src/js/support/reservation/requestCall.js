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

            self.$stepTerms = self.$cont.find('#stepTerms');
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

            /* BTOCSITE-3629 add :: 렌탈케어링크 파라메터 분리 */
            var params = location.search.replace('?','').split('&');
            var paramObj = {};
            params.forEach(function( data ){
                var dataArray = data.split('=');
                paramObj[ dataArray[0] ] = dataArray[1];
            });
            
            self.isRentalCarePath = !!paramObj['rentalCare'] && paramObj['rentalCare'] == 'y' ? true : false;
            /* //BTOCSITE-3629 add :: 렌탈케어링크 파라메터 분리 */

            var register = {
                privcyCheck: {
                    msgTarget: '.err-block'
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
                    pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
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
                        maxLength: 30,
                        pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                    },
                    authPhoneNo: {
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                        pattern: /^(010|016|011|017|018|019)\d{3,4}\d{4}$/,
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
            };

            if(!vcui.detect.isMobileDevice){
                self.$cont.find('.directCall-wrap').on('click', 'a', function(e){
                    var exist = $(this).attr('href').indexOf("tel");
                    if(exist > -1){
                        e.preventDefault();
                    }
                });
            }

            vcui.require(['ui/validation', 'support/common/searchModel.min'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});

                if (!isLogin) authManager = new AuthManager(authOptions);

                self.bindEvent();

                self.$calendarDate.calendar({inputTarget:'#date'});
                self.$calendarTime.timeCalendar({inputTarget:'#time'});

                self.$cont.vcSearchModel();
            });
        },
        nextInputStep: function() {
            var self = this;
            var data = self.model;
            var summaryOpt = {
                product: [data.categoryNm, data.subCategoryNm, data.modelCode],
                reset: 'product'
            };

            self.$completeBtns.show();
            self.$cont.vcSearchModel('updateSummary', summaryOpt);
        },
        setInputStep: function() {
            var self = this;
            var param = {
                category: self.model.category,
                subCategory: self.model.subCategory,
                modelCode: self.model.modelCode,
                serviceType: self.model.serviceType
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.resultUrl, param, function(result) {
                var resultData = result.data;

                self.setWarranty(resultData);
                self.setTopic(resultData);
                self.setCalendar(resultData);
                
                self.nextInputStep();                

                // BTOCSITE-3629 add
                if (self.isRentalCarePath){
                    $('input[data-topic-name="렌탈/케어 관련"]').trigger('click');
                }

                lgkorUI.hideLoading();
                
            });
        },
        setTopic: function(data) {
            var self = this;
            var success = (data.topicList instanceof Array && data.topicList.length) ? true : false;
            
            if (success) {
                self.$topicList.html(vcui.template(topicTmpl, data));
                self.$topicBox.show();
            } else {
                self.$topicBox.hide();
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

            if (isLogin) {
                if (data.warrantyText && data.warrantValue) {
                    $warranty.closest('.conts').append('<p class="form-text">'+data.warrantyText+'</p>');
                    $warranty.filter('[value='+data.warrantValue+']').prop('checked', true);
                    
                    $warranty.closest('.rdo-list-wrap').hide();
                } else {
                    $warranty.closest('.rdo-list-wrap').show();
                }
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
            var url = self.$calendarWrap.data('timeUrl');
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

                    if ($(window).data('breakpoint').isMobile) {
                        lgkorUI.scrollTo(self.$calendarTime.parent(), $('.prod-selected-wrap').outerHeight());
                    }

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

            self.model = {};

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
            }

            validation.reset();
            self.$calendarDate.calendar('reset');
            self.$calendarTime.timeCalendar('reset');
            self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
            self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
        },
        bindEvent: function() {
            var self = this;

            $('[data-href="#ratesWarrantyGuidePopup"]').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/callInfoClick.do', '/acecount/callInfoClickm.do');
            });
            
            // 모델 선택 & 문의 재선택
            self.$cont.on('complete', function(e, data) {
                self.model = data;
                self.setInputStep();
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

                // BTOCSITE-4356 210817 세척서비스 증상 선택시 팝업 띄움 - START
                var topicName = $(this).data('topicName');
                /*
                var alertMsg = '가전 <strong class="point">세척 서비스</strong>는 <strong>콜센터 [1544-7777]로</strong><br>전화 주시거나, <strong>전화상담 예약</strong>을 하시면<br>전문 상담사 상담 후 접수를 도와 드리겠습니다.<br><br>전화 상담 예약을 안내해 드릴까요?';                
                if( topicName === "세척서비스" ){
                    $(this).prop('checked', false);
                    lgkorUI.confirm(alertMsg,{
                        typeClass:'type2',
                        title:'',
                        okBtnName: '네',
                        cancelBtnName: '아니요',
                        ok: function() {
                            location.href = "/support/request-call-reservation";
                        },
                        cancel: function() {}
                    });
                }
                */
                /* BTOCSITE-3411 add :: 세척 서비스 팝업 얼렛으로 변경 */
                var alertMsg = '<p>일시적으로 가전 <strong class="point">세척 서비스</strong> 제공을 중지합니다.<br>서비스 안정화 이후 다시 진행될 예정이오니 양해 바랍니다.</p>';
                if( topicName === "세척서비스" ){
                    $(this).prop('checked', false);
                    lgkorUI.alert(alertMsg);
                }
                /* BTOCSITE-3411 add :: 세척 서비스 팝업 얼렛으로 변경 */
                // BTOCSITE-4356 210817 세척서비스 증상 선택시 팝업 띄움 - END
                
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
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/callSolutionsClick.do', '/acecount/callSolutionsClickm.do');
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