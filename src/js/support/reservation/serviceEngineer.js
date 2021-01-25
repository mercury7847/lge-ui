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
    var engineerTmpl =
    '{{#each (item, index) in engineerList}}' +
    '<div class="slide-conts ui_carousel_slide">' +
        '<div class="engineer-box">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
            '{{# } else { #}}' +
            '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
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
    var authManager;
    var addressFinder;
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

            self.$solutionsBanner = self.$cont.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            self.$fanBox = self.$stepInput.find("#fanBox");
            self.$bdTypeBox = self.$stepInput.find("#bdTypeBox");
            self.$tvPositionBox = self.$stepInput.find('#tvPositionBox');
            self.$installTypeBox = self.$stepInput.find('#installTypeBox');
            self.$addFanBox = self.$stepInput.find('#addFanBox');

            self.$stepDate = self.$cont.find('#stepDate');
            self.$dateWrap = self.$stepDate.find('.date-wrap');
            self.$timeWrap = self.$stepDate.find('.time-wrap');

            self.$stepEngineer = self.$cont.find('#stepEngineer');
            self.$engineerPopup = $('#choiceEngineerPopup');
            self.$engineerSlider = self.$engineerPopup.find('.engineer-slider');

            self.$authPopup = $('#certificationPopup');

            self.autoFlag = false;
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
                    required: true,
                    msgTarget: '.err-block' 
                },
                phoneNo: {
                    required: true,
                    msgTarget: '.err-block'
                },
                zipCode: {
                    required: true,
                    msgTarget: '.address-err-msg'
                },
                userAddress: {
                    required: true,
                    msgTarget: '.address-err-msg'
                },
                detailAddress: {
                    required: true,
                    msgTarget: '.address-err-msg'
                },
                date: {
                    required: true,
                    msgTarget: '.err-msg'
                },
                time: {
                    required: true,
                    msgTarget: '.err-msg'
                }
            }
            var authManager = {
                elem: {
                    popup: '#certificationPopup',
                    name: '#authName',
                    phone: '#authPhoneNo',
                    number: '#authNo'
                },
                register: {
                    authName: {
                        required: true,
                        msgTarget: '.err-block',
                        pattern: /^[가-힣a-zA-Z]+$/,
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
                    },
                    authPhoneNo: {
                        required: true,
                        msgTarget: '.err-block',
                        pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                    },
                    authNo:{
                        required: true,
                        msgTarget: '.err-block'
                    }
                }
            };
            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                addressFinder = new AddressFind();

                if (!self.isLogin) authManager = new AuthManager(authManager);

                $('#route').val(lgkorUI.isMobile() ? 'WWW2' : 'WWWW1');

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

                self.$dateWrap.calendar({
                    inputTarget: '#date'
                });

                self.$timeWrap.timeCalendar({
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
            }, null, "html", true);
        },
        requestDate: function() {
            var self = this;
            var url = self.$stepInput.data('ajax'),
                param = validation.getAllValues(),
                result;

            var productCode = $('#productCode').val();

            if ($('[name=bdType]:checked').val() == 4) {
                productCode = 'CRB';
            }

            param = $.extend(param, {
                topic: $('input[name=topic]:checked').val(),
                subTopic: $('input[name=subTopic]:checked').val(),
                serviceType: $('#serviceType').val(),
                productCode: productCode,
                category: $('#category').val(),
                subCategory: $('#subCategory').val()
            });

            result = validation.validate(['topic', 'subTopic', 'bdType', 'fan', 'addFan', 'installType', 'tvPosition', 'userNm', 'phoneNo', 'zipCode', 'userAddress', 'detailAddress']);

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

                            self.$stepInput.find('.step-btn-wrap').hide();
                            self.$stepDate.addClass('active');
                            self.$stepEngineer.removeClass('active');
                            self.$completeBtns.hide();
                        }
                    } else {
                        if (data.resultMessage) {
                            if (data.tAlert == 'Y') {
                                self.$stepInput.find('.step-btn-wrap').show();
                                self.$stepDate.removeClass('active');
                                self.$stepEngineer.removeClass('active');
                                self.$completeBtns.hide();
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

            var productCode = $('#productCode').val();

            if ($('[name=bdType]:checked').val() == 4) {
                productCode = 'CRB';
            }

            param = $.extend(param, {
                topic: $('input[name=topic]:checked').val(),
                subTopic: $('input[name=subTopic]:checked').val(),
                serviceType: $('#serviceType').val(),
                productCode: productCode,
                category: $('#category').val(),
                subCategory: $('#subCategory').val(),
                date: $('#date').val()
            });
            param['zipId'] = self.dateParam.zipId;
            param['custNo'] = self.dateParam.custNo;

            result = validation.validate(['topic', 'subTopic', 'bdType', 'fan', 'addFan', 'installType', 'tvPosition', 'userNm', 'phoneNo', 'zipCode', 'userAddress', 'detailAddress']);

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
                                self.$stepInput.find('.step-btn-wrap').show();
                                self.$stepDate.removeClass('active');
                                self.$stepEngineer.removeClass('active');
                                self.$completeBtns.hide();
                            }
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            }
        },
        reqestEngineer: function(url, param) {
            var self = this;

            param = $.extend(param, self.dateParam);

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.engineerList instanceof Array ? data.engineerList : []; 

                if (data.resultFlag == 'Y') {  
                    if (arr.length) {
                        self.updateEngineer(arr[0]);
                        if (arr.length > 1) {
                            var html = vcui.template(engineerTmpl, data);
                            
                            self.$engineerSlider.find('.slide-track').html(html);
                            self.$engineerSlider.vcCarousel('reinit');
                            self.$stepEngineer.find('.btn').show();
                        } else {
                            self.$stepEngineer.find('.btn').hide();
                        }
                        self.$stepEngineer.addClass('active');
                        self.$completeBtns.show();
                    }
                }
            });
        },
        updateEngineer: function(data) {
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
            $resultBox.find('.topic').html(topicNm + '&gt;' + subTopicNm);
            $resultBox.find('.name').html(data.engineerName);

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);

            self.dateParam['resrvSeq'] = data.resrvSeq;
        },
        requestComplete: function() {
            var self = this;

            if ($('[name=bdType]:checked').val() == 4) {
                $('#productCode').val('CRB');
            }

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            formData = $.extend(formData, self.dateParam);

            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
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
            self.$cont.on('reset', function(e) {
                self.$solutionsBanner.hide();
                self.$fanBox.hide();
                self.$bdTypeBox.hide();
                self.$tvPositionBox.hide();
                self.$installTypeBox.hide();
                self.$addFanBox.hide();
                self.$myModelArea.show();

                $('#engineerNm').val('');
                $('#engineerCode').val('');
                $('#centerNm').val('');
                $('#centerCode').val('');
                $('#date').val('');
                $('#time').val('');
                self.$stepInput.find('input[type=radio]').prop('checked', false);
                
                $('[name=buyingdate]').closest('.conts').find('.form-text').remove();

                $('#rentalN').prop('checked', true);

                var notInput = '';
                if (self.isLogin) {
                    notInput += '#userNm, #phoneNo';
                    if ($('#detailAddress').prop('readonly')) {
                        notInput += ', #zipCode, #userAddress, #detailAddress';
                    }
                }
                $('input[type=text], textarea').not(notInput).val('');

                $('#fanEtc').prop('disabled', true);

                $('.date-wrap').calendar('reset');

                $('.time-wrap').timeCalendar('reset');

                self.$completeBtns.hide();
                self.$stepInput.find('.step-btn-wrap').show();
                self.autoFlag = false;

                self.$cont.commonModel('next', self.$stepModel);
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data, url) {    
                var param = {
                    modelCode: data.modelCode,
                    serviceType: $('#serviceType').val(),
                    category: data.category,
                    subCategory: data.subCategory
                };

                if (data.memberModel) {
                    param = $.extend(param, {
                        salesDt: data.salesDt,
                        memberModel: data.memberModel
                    });
                }

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var resultData = result.data;

                    self.$cont.commonModel('updateSummary', {
                        product: [data.categoryName, data.subCategoryName, data.modelCode],
                        reset: 'product'
                    });
                
                    
                    // 에어컨 > 시스템 에어컨 OR 창문형/이동식 선택 시
                    if (data.category == 'CT50019183') {
                        if (data.subCategory == "CT50019259"){
                            self.$fanBox.show();
                            self.$bdTypeBox.show();
                        } else if (data.subCategory != "CT50019229") {
                            self.$fanBox.show();
                            self.$bdTypeBox.hide();
                        }
                    }
                    
                    // 드럼 세탁기 OR 의류 건조기 선택 시
                    if (data.subCategory == "CT50019309" || data.subCategory == "CT50019275") {
                        self.$installTypeBox.show();
                    } else {
                        self.$installTypeBox.hide();
                    }
                    
                    // TV/프로젝터 > 올레드, 울트라HD, LED/LCD, PDP 선택 시
                    if (data.subCategory == "CT50019082" || data.subCategory == "CT50019037" || data.subCategory == "CT50019052" || data.subCategory == "CT50019067") {
                        self.$tvPositionBox.show();
                    } else {
                        self.$tvPositionBox.hide();
                    }

                    self.setTopicList(resultData);

                    if (resultData.warrantyText && resultData.warrantValue) {
                        $('[name=buyingdate]').closest('.conts').append('<p class="form-text">'+resultData.warrantyText+'</p>');
                        $('[name=buyingdate]').filter('[value='+resultData.warrantValue+']').prop('checked', true);
                        
                        $('[name=buyingdate]').closest('.rdo-list-wrap').hide();
                    } else {
                        $('[name=buyingdate]').closest('.conts').find('.form-text').remove();
                        $('[name=buyingdate]').prop('checked', false);

                        $('[name=buyingdate]').closest('.rdo-list-wrap').show();
                    }

                    
                    self.$myModelArea.hide();

                    self.$cont.commonModel('next', self.$stepInput);
                    self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                        self.$selectedModelBar.vcSticky();
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
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('readonly', false);

                    self.$cont.find('.btm-more.both .chk-wrap').show();

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

                var productCode = $('#productCode').val();

                if ($('[name=bdType]:checked').val() == 4) {
                    productCode = 'CRB';
                }

                param = {
                    serviceType: $('#serviceType').val(),
                    category: $('#category').val(),
                    subCategory: $('#subCategory').val(),
                    lockUserId: $('#lockUserId').val(),
                    zipCode: $('#zipCode').val(),
                    userAddress: $('#userAddress').val(),
                    detailAddress: $('#detailAddress').val(),
                    productCode: productCode,
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
                }

                param = $.extend(param, infoData);

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            self.$engineerPopup.vcModal('hide');
                            
                            lgkorUI.alert("", {
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
                        authManager.open(function() {
                            $('#authName').val($('#userNm').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
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



            $('[name=fan]').on('change', function() {
                if ($(this).attr('id') == 'fan09') {
                    $('#fanEtc').prop('disabled', false);
                } else {
                    $('#fanEtc').prop('disabled', true);
                    $('#fanEtc').val('');
                }
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();