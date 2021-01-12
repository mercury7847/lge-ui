(function() {
    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}">' +
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
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="subTopic{{index}}">{{item.name}}</label>' +
        '</span>' +
    '</li>' +
    '{{/each}}';
    var engineerTmpl =
        '{{#each (item, index) in engineerList}}' +
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="engineer-box">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" value="{{index}}">' +
                '{{# } #}}' +
                '<label for="engineer{{index}}">' +
                    '<div class="img">' +
                        '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                    '</div>' +
                    '<p class="tit">{{item.engineerName}}</p>' +
                    '<p class="desc">{{item.centerName}}</p>' +
                '</label>' +
            '</div>' +  
        '</div>' +
        '{{/each}}';

    var validation;
    var addressFinder;
    var authManager;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepInput = self.$cont.find('#stepInput');
            self.$topicBox = self.$stepInput.find('#topicBox');
            self.$topicListWrap = self.$stepInput.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');

            self.$subTopicBox = self.$stepInput.find('#subTopicBox');
            self.$subTopicListWrap = self.$stepInput.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');

            self.$solutionsBanner = self.$cont.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            self.$fanBox = self.$stepInput.find("#fanBox");
            self.$bdTypeBox = self.$stepInput.find("#bdTypeBox");
            self.$tvPositionBox = self.$stepInput.find('#tvPositionBox');
            self.$installTypeBox = self.$stepInput.find('#installTypeBox');
            self.$addFanBox = self.$stepInput.find('#addFanBox');

            self.$stepDate = self.$cont.find('#stepDate');
            self.$dateWrap = self.$stepDate.find('.visit-calendar');
            self.$timeWrap = self.$stepDate.find('.visit-timetable');

            self.$stepEngineer = self.$cont.find('#stepEngineer');
            self.$engineerPopup = $('#choiceEngineerPopup');
            self.$engineerSlider = self.$engineerPopup.find('.engineer-slider');

            self.$authPopup = $('#certificationPopup');

            self.autoFlag = false;
            self.isLogin = $('.header').data('ui_header').isLogin;

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
                    bdType: {
                        required: true,
                        msgTarget: '.bd-type-msg'
                    },
                    fan: {
                        required: true,
                        msgTarget: '.fan-msg'
                    },
                    addFan: {
                        required: true,
                        msgTarget: '.add-fan-msg'
                    },
                    installType: {
                        required: true,
                        msgTarget: '.install-type-msg'
                    },
                    tvPosition: {
                        required: true,
                        msgTarget: '.tv-position-msg'
                    },
                    userNm: {
                        msgTarget: '.err-block' 
                    },
                    phoneNo: {
                        msgTarget: '.err-block'
                    },
                    zipCode: {
                        msgTarget: '.err-block'
                    },
                    userAddress: {
                        msgTarget: '.err-block'
                    },
                    detailAddress: {
                        msgTarget: '.err-block'
                    },
                    date: {
                        msgTarget: '.err-msg'
                    },
                    time: {
                        msgTarget: '.err-msg'
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
                addressFinder = new AddressFind();

                if (!self.isLogin) {
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

                self.$engineerSlider.vcCarousel({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 10000,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint:767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });

                self.$cont.commonModel({
                    register: register
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
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(url, param, true);
                });
            }, null, "html");
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

            result = validation.validate(['topic', 'subTopic', 'bdType', 'fan', 'addFan', 'installType', 'tvPosition', 'userNm', 'phoneNo', 'zipCode', 'userAddress', 'detailAddress']);

            if (result.success) {
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.date-wrap').calendar({
                            dateArr: data.dateList,
                            inputTarget: '#date'
                        });

                        self.$stepInput.find('.step-btn-wrap').hide();
                        self.$stepDate.addClass('active');
                        self.$stepEngineer.removeClass('active');
                        self.$completeBtns.hide();
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert('', {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
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
                        $('.time-wrap').timeCalendar({
                            timeArr: data.timeList,
                            inputTarget: '#time'
                        });
                        $('.time-wrap').find('.box-desc').hide();
                        $('.time-wrap').find('.box-table').show();
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert('', {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
        },
        reqestEngineer: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {  
                    console.log(data.engineerList[0]);
                    self.updateEngineer(data.engineerList[0]);

                    if (data.engineerList.length && data.engineerList.length > 1) {
                        var html = '';
                        
                        html = vcui.template(engineerTmpl, data);
                        
                        self.$engineerSlider.find('.slide-track').html(html);
                        self.$engineerSlider.vcCarousel('reinit');

                        self.$stepEngineer.find('.btn').show();
                    } else {
                        self.$stepEngineer.find('.btn').hide();
                    }

                    self.$stepEngineer.addClass('active');
                    self.$completeBtns.show();
                }
            });
        },
        updateEngineer: function(data) { console.log(data);
            var self = this,
                $engineerBox = self.$stepEngineer.find('.engineer-info'),
                $resultBox = self.$stepEngineer.find('.engineer-desc'),
                topicNm = self.$stepInput.find('[name=topic]:checked').data('topicName'),
                subTopicNm = self.$stepInput.find('[name=subTopic]:checked').data('subTopicName')

            self.$stepEngineer.find('.engineer-img img').attr({
                'src': data.image,
                'alt': data.engineerName
            });                             
            $engineerBox.find('.name').html(data.engineerName);
            $engineerBox.find('.center').html(data.centerName);

            $resultBox.find('.date').html(vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm"));
            $resultBox.find('.name').html(topicNm + '&gt;' + subTopicNm);

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    // self.$submitForm[0].data.value = JSON.stringify(formData);
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
                // 에어컨 > 시스템 에어컨 선택 시
                if (info.category == '1019'){
                    if (info.subCategory == "1129"){
                        self.$fanBox.show();
                        self.$bdTypeBox.show();
                    } else if (info.subCategory != "1083") {
                        self.$fanBox.show();
                        self.$bdTypeBox.hide();
                    }
                }
                
                // 드럼 세탁기 선택 시
                if (info.subCategory == "1086" || info.subCategory == "1021") {
                    self.$installTypeBox.show();
                } else {
                    self.$installTypeBox.hide();
                }
                
                // TV/프로젝터 > 올레드, 울트라HD, LED/LCD, PDP 선택 시
                if (info.subCategory == "D002795" || info.subCategory == "1040" || info.subCategory == "1041" || info.subCategory == "1043") {
                    self.$tvPositionBox.show();
                } else {
                    self.$tvPositionBox.hide();
                }

                self.setTopicList(data)

                callback();
            });

            // 에어컨 실외기 위치
            self.$fanBox.on('change', 'input[type=radio]', function() {
                var val = $(this).val();

                if (val == 0 || val == 1) {
                    self.$addFanBox.show();
                } else {
                    self.$addFanBox.hide();
                }
            });

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                    
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

            // 주소 찾기
            self.$cont.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) {
                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(data.roadAddress);
                    self.$cont.find('#detailAddress').val('');

                    if (self.autoFlag) self.requestDate();
                }); 
            });

            // 희망 일자 선택하기 버튼
            self.$stepInput.find('.step-btn-wrap .btn').on('click', function() {
                self.autoFlag = true;
                self.requestDate();
            });

            // 날짜 선택
            $('.date-wrap').on('dateselected', function() {
                self.requestTime();
            });

            // 시간 선택
            $('.time-wrap').on('timeselected', function() {
                var url = self.$stepDate.data('ajax'),
                    param;

                param = {
                    serviceType: $('#serviceType').val(),
                    category: $('#category').val(),
                    subCategory: $('#subCategory').val(),
                    lockUserId: $('#lockUserId').val(),
                    zipCode: $('#zipCode').val(),
                    userAddress: $('#userAddress').val(),
                    detailAddress: $('#detailAddress').val(),
                    date: $('#date').val(),
                    time: $('#time').val()
                }

                self.reqestEngineer(url, param);
            });

            // 엔지니어 선택 팝업 오픈
            self.$engineerPopup.on('modalshown', function() {
                self.$engineerSlider.vcCarousel('resize');
            });

            // 엔지니어 선택
            self.$engineerPopup.find('.btn-group .btn').on('click', function() {
                var url = self.$engineerPopup.data('lockUrl'),
                    $this = self.$engineerPopup.find('[name=engineer]').filter(':checked'),
                    infoData = $this.data(),
                    param;

                param = {
                    serviceType: $('#serviceType').val(),
                    date: $('#date').val(),
                    time: $('#time').val(),
                    lockUserId: $('#lockUserId').val(),
                    productCode: $('#productCode').val(),
                    engineerCode: $('#engineerCode').val(),
                    centerCode: $('#centerCode').val() 
                }

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            self.$engineerPopup.vcModal('hide');
                            
                            lgkorUI.alert('', {
                                title: data.resultMessage
                            });
                        }
                    }
                });
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