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

    /* BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
    // BTOCSITE-BTOCSITE-7660 슬라이드 원본
    // '<div class="slide-conts ui_carousel_slide">' +
    //     '<div class="engineer-box">' +
    //         '{{# if (index == 0) { #}}' +
    //             '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
    //         '{{# } else { #}}' +
    //             '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
    //         '{{# } #}}' +
    //         '<label for="engineer{{index}}">' +
    //             // '<div class="img">' +
    //             //     '<img src="{{item.image}}" alt="" aria-hidden="true">' +
    //             // '</div>' +
    //             // '<p class="tit">{{item.engineerName}}</p>' +
    //             // '<p class="desc">{{item.centerName}}</p>' +
    //             '<span>{{item.engineerName}}</span>' +
    //             '<span>{{item.centerName}}</span>' +
    //         '</label>' +
    //     '</div>' +  
    // '</div>' +

        '<li class="chk-wrap">' +
            '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
            '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
            '{{# } #}}' +
            '<label for="engineer{{index}}">' +
                // '<div class="img">' +
                //     '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                // '</div>' +
                // '<p class="tit">{{item.engineerName}}</p>' +
                // '<p class="desc">{{item.centerName}}</p>' +
                '<span>{{item.engineerName}}</span>' +
                '<span>{{item.centerName}}</span>' +
            '</label>' +
        '</li>' +
        /* BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
    '{{/each}}';

    var validation;
    var authManager;
    var addressFinder;
    var dateUtil = vcui.date;
    var detectUtil = vcui.detect;
    var isLogin = lgkorUI.isLogin;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');
            self.$myModelWrap = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');

            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepInput = self.$cont.find('#stepInput');
            self.$stepDate = self.$cont.find('#stepDate');
            self.$stepEngineer = self.$cont.find('#stepEngineer');

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
            
            self.$dateWrap = self.$stepDate.find('.date-wrap');
            self.$timeWrap = self.$stepDate.find('.time-wrap');

            self.$engineerOpener = $('[data-href="#choiceEngineerPopup"]');
            self.$engineerPopup = $('#choiceEngineerPopup');

            /* BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
            self.$engineerSlider = self.$engineerPopup.find('.engineer-popup');
            /* //BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

            self.$authPopup = $('#certificationPopup');

            self.resultUrl = self.$searchModelWrap.data('resultUrl');
            self.isOneView = 'N';
            self.hirun = false;
            self.autoFlag = false;

            if ($('#appCall').length) {
                isLogin = true;
                self.isOneView = $('#appCall').val();
            }

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
                bdType: {
                    required: true,
                    msgTarget: '.bd-type-msg',
                    errorMsg: '건물유형을 선택해주세요.'
                },
                fan: {
                    required: true,
                    msgTarget: '.fan-msg',
                    errorMsg: '실외기 위치를 선택해주세요.'
                },
                addFan: {
                    required: true,
                    msgTarget: '.add-fan-msg',
                    errorMsg: '실외기 위치를 선택해주세요.'
                },
                installType: {
                    required: true,
                    msgTarget: '.install-type-msg',
                    errorMsg: '설치형태를 선택해주세요.'
                },
                tvPosition: {
                    required: true,
                    msgTarget: '.tv-position-msg',
                    errorMsg: '설치 위치를 선택해주세요.'
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
                zipCode: {
                    required: true,
                    msgTarget: '.address-err-msg',
                    errorMsg: '정확한 주소를 입력해주세요.'
                },
                userAddress: {
                    required: true,
                    msgTarget: '.address-err-msg',
                    errorMsg: '정확한 주소를 입력해주세요.'
                },
                detailAddress: {
                    required: true,
                    msgTarget: '.address-err-msg',
                    errorMsg: '정확한 주소를 입력해주세요.'
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
            }

            vcui.require(['ui/validation', 'support/common/searchModel.min'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                addressFinder = new AddressFind();

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
                                pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
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

                /* BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 슬라이드 삭제 */
                // self.$engineerSlider.vcCarousel({
                //     slidesToShow: 4,
                //     slidesToScroll: 4,
                //     infinite: false,
                //     responsive: [
                //         {
                //             breakpoint: 10000,
                //             settings: {
                //                 infinite: false,
                //                 slidesToShow: 4,
                //                 slidesToScroll: 4,
                //             }
                //         },
                //         {
                //             breakpoint: 1024,
                //             settings: {
                //                 infinite: false,
                //                 slidesToShow: 3,
                //                 slidesToScroll: 3,
                //             }
                //         },
                //         {
                //             breakpoint:767,
                //             settings: {
                //                 infinite: false,
                //                 variableWidth : true,
                //                 slidesToShow: 1,
                //                 slidesToScroll: 1
                //             }
                //         }
                //     ]
                // });

                self.bindEvent();
                self.checkHirun();

                self.$dateWrap.calendar({inputTarget:'#date'});
                self.$timeWrap.timeCalendar({inputTarget:'#time'});
                self.$cont.vcSearchModel({
                    useCookie: !self.hirun,
                    reset: self.hirun
                });
            });
        },
        checkHirun: function() {
            var self = this;
            var subCategory = self.$cont.find('#subCategory').val()

            if ((subCategory == 'CT50019259' || subCategory == 'CT50019244') && $('#hiDownTimeFlag').val() == 'Y') {                    
                lgkorUI.alert('(자세한 내용은 공지사항을 확인하시기 바랍니다.)<br>점검시간 : '+ $('#hirunDownStartTime').val() +' ~ '+ $('#hirunDownEndTime').val(),{
                    title: '시스템 점검 중으로, <br>\'시스템에어컨\', \'업소용 스탠드형\'<br>신청 및 조회가 불가합니다.'
                });
                self.hirun = true;
            }
        },
        setTopicList: function(data) {
            var self = this;
            var html;
            var success = (data.topicList instanceof Array && data.topicList.length) ? true : false;

            if (success) {
                html = vcui.template(topicTmpl, data);
                self.$topicList.html(html); 
                self.$topicBox.show();
            } else {
                self.$topicBox.hide();
            }
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
        requestDate: function() {
            var self = this;
            var url = self.$stepInput.data('ajax'),
                param = validation.getAllValues(),
                result;

            var productCode = $('#productCode').val();
            // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
            productCode = self.getbdTypeParam();

            param = $.extend(param, {
                topic: $('input[name=topic]:checked').val(),
                subTopic: $('input[name=subTopic]:checked').val(),
                serviceType: $('#serviceType').val(),
                productCode: productCode,
                category: $('#category').val(),
                subCategory: $('#subCategory').val()
            });

            $('.time-wrap').timeCalendar('reset');

            result = validation.validate(['topic', 'subTopic', 'bdType', 'fan', 'addFan', 'installType', 'tvPosition', 'userNm', 'phoneNo', 'zipCode', 'userAddress', 'detailAddress']);

            if (result.success) {
                lgkorUI.showLoading();
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
                    lgkorUI.hideLoading();
                });
            }
        },
        getbdTypeParam: function(){
            // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
            var self = this;
            if ($('[name=bdType]:checked').val() == 0 && self.$bdTypeBox.data('current-product-code') != '' && self.$bdTypeBox.data('current-product-code') != undefined) {
                return self.$bdTypeBox.data('current-product-code');
            } else {
                return $('#productCode').val()
            }
        },
        requestTime: function() {
            var self = this,
                url = $('.calendar-area').data('timeUrl'),
                param = validation.getAllValues(),
                result;

            var productCode = $('#productCode').val();
            // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
            productCode = self.getbdTypeParam();

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
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.time-wrap').timeCalendar('update', data.timeList);
                        $('.time-wrap').find('.box-desc').hide();
                        $('.time-wrap').find('.box-table').show();

                        self.$stepEngineer.removeClass('active');
                        self.$completeBtns.hide();

                        if ($(window).data('breakpoint').isMobile) {
                            // $('html,body').animate({
                            //     scrollTop: $('.time-wrap').parent().offset().top - $('.prod-selected-wrap').outerHeight()
                            // }, function() {
                            //     $('.time-wrap').parent().attr('tabindex', '0').focus().removeAttr('tabindex');
                            // });
                            lgkorUI.scrollTo($('.time-wrap').parent(), $('.prod-selected-wrap').outerHeight());
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

                    lgkorUI.hideLoading();
                });
            }
        },
        reqestEngineer: function(url, param) {
            var self = this;

            param = $.extend(param, self.dateParam);
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.engineerList instanceof Array ? data.engineerList : []; 

                if (data.resultFlag == 'Y') {  
                    if (arr.length) {
                        self.updateEngineer(arr[0]);
                        if (arr.length > 1) {
                            // var html = vcui.template(engineerTmpl, data);
                            
                            // self.$engineerSlider.find('.slide-track').html(html);
                            // self.$engineerSlider.vcCarousel('reinit');
                            self.$stepEngineer.find('.btn').show();
                        } else {
                            self.$stepEngineer.find('.btn').hide();
                        }
                        self.$stepEngineer.addClass('active');
                        self.$completeBtns.show();

                        lgkorUI.scrollTo(self.$stepEngineer, $('.prod-selected-wrap').outerHeight());
                    }
                } else {

                }

                lgkorUI.hideLoading();
            });
        },
        updateEngineer: function(data) {
            var self = this,
                $engineerBox = self.$stepEngineer.find('.engineer-infoP'),
                $resultBox = self.$stepEngineer.find('.engineer-desc'),
                topicNm = self.$stepInput.find('[name=topic]:checked').data('topicName'),
                subTopicNm = self.$stepInput.find('[name=subTopic]:checked').data('subTopicName')

            self.$stepEngineer.find('.engineer-img img').attr({
                'src': data.image,
                'alt': data.engineerName + ' 엔지니어 사진'
            });                             
            $engineerBox.find('.name').html(data.engineerName);
            $engineerBox.find('.center').html(data.centerName);

            /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
            $resultBox.find('.date').html(vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm"));
            $resultBox.find('.topic').html(topicNm + '&gt;' + subTopicNm);
            $resultBox.find('.name').html(data.engineerName);
            $resultBox.find('.store').html('(' + data.centerName + ')');

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);

            self.dateParam['resrvSeq'] = data.resrvSeq;
        },
        requestComplete: function() {
            var self = this;

            // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
            if ($('[name=bdType]:checked').val() == 0 && self.$bdTypeBox.data('current-product-code') != '' && self.$bdTypeBox.data('current-product-code') != undefined) {
                $('#productCode').val(self.$bdTypeBox.data('current-product-code'));
            }

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            formData = $.extend(formData, self.dateParam);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    if (self.isOneView == 'Y') {
                        lgkorUI.hideLoading();
                        lgkorUI.alert('', {
                            title:'예약이 완료 되었습니다.',
                            okBtnName: '확인',
                            ok: function() {
                                window.close();
                            }
                        });   
                    } else {
                        $('#acptNo').val(data.acptNo);
                        self.$submitForm.submit();
                    }
                } else {
                    lgkorUI.hideLoading();
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage,
                            ok: function() {
                                if (self.isOneView == 'Y') {
                                    if (data.resultMessage.indexOf('휴대전화번호') != -1) {
                                        $('#phoneNo').prop('readonly', false);
                                        $('#phoneNo').focus();
                                    }
                                }
                            }
                        });
                    }
                }
            }, 'POST');
        },
        bindEvent: function() {
            var self = this;

            $('[data-href="#ratesWarrantyGuidePopup"]').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/engineerInfoClick.do', '/acecount/engineerInfoClickm.do');
            });

            self.$cont.on('reset', function(e) {
                self.$topicList.empty();
                self.$subTopicList.empty();
                self.$subTopicBox.hide();
                self.$solutionsBanner.hide();
                self.$fanBox.hide();
                self.$bdTypeBox.hide().data('product-code', '');
                self.$tvPositionBox.hide();
                self.$installTypeBox.hide();
                self.$addFanBox.hide();
                self.$completeBtns.hide();
                self.$stepInput.find('.step-btn-wrap').show();

                if (isLogin) {
                    var notInput = '#userNm, #phoneNo';
                    if ($('#detailAddress').data('defaultValue')) {
                        notInput += ', #zipCode, #userAddress, #detailAddress';
                        $('[data-default-value]').each(function() {
                            $(this).val($(this).data('defaultValue')).prop('readonly', true);
                        });
                    }
                }

                self.$stepInput.find('input[type=radio]').prop('checked', false);
                self.$stepInput.find('input[type=text], input[type=number], textarea').not(notInput).val('');
                self.$stepInput.find('#fanEtc').prop('disabled', true);
                self.$stepInput.find('#rentalN').prop('checked', true);
                self.$stepInput.find('[name=buyingdate]').closest('.conts').find('.form-text').remove();
                self.$stepEngineer.find('#engineerNm').val('');
                self.$stepEngineer.find('#engineerCode').val('');
                self.$stepEngineer.find('#centerNm').val('');
                self.$stepEngineer.find('#centerCode').val('');

                validation.reset();
                self.$dateWrap.calendar('reset');
                self.$timeWrap.timeCalendar('reset');
                self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
                self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });

                self.autoFlag = false;
                self.hirun = false;
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data) {    
                var param = data;

                self.checkHirun();

                if (self.hirun) {
                    self.$cont.vcSearchModel('reset');
                    return false;
                }

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(self.resultUrl, param, function(result) {
                    var resultData = result.data;
                    
                    self.$cont.vcSearchModel('updateSummary', {
                        product: [data.categoryNm, data.subCategoryNm, data.modelCode],
                        reset: 'product'
                    });
                    
                    // 에어컨 > 시스템 에어컨 OR 창문형/이동식 선택 시
                    // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
                    if (data.category == 'CT50019183') {
                        if (data.subCategory == "CT50019259"){
                            self.$fanBox.show();
                            self.$bdTypeBox.show().data('current-product-code', '')                         
                        } else if (data.subCategory != "CT50019229") {
                            self.$fanBox.show();
                            self.$bdTypeBox.hide().data('current-product-code', '');
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

                    
                    self.$myModelWrap.hide();

                    lgkorUI.hideLoading();
                });
            });

            self.$cont.find('[name=bdType]').on('change', function() {
                if (self.autoFlag) self.requestDate();
            });

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var currentTopic = this; //BTOCSITE_6554
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };

                // 20210610 세척서비스 증상 선택시 팝업 띄움
                var topicName = $(this).data('topicName');
                
                // BTOCSITE-6144 세척서비스 중지 팝업 다시 원래대로 원복
                var alertMsg = '가전 <strong class="point">세척 서비스</strong>는 <strong>콜센터 [1544-7777]로</strong><br>전화 주시거나, <strong>전화상담 예약</strong>을 하시면<br>전문 상담사 상담 후 접수를 도와 드리겠습니다.<br><br>전화 상담 예약을 안내해 드릴까요?';                
                if( topicName === "세척서비스" ){
                    lgkorUI.confirm(alertMsg,{
                        typeClass:'type2',
                        title:'',
                        okBtnName: '네',
                        cancelBtnName: '아니요',
                        ok: function() {
                            location.href = "/support/request-call-reservation";
                        },
                        cancel: function() {
                            $(currentTopic).prop('checked', false); //BTOCSITE_6554
                        }
                    });
                }
                
                /* BTOCSITE-3411 add :: 세척 서비스 팝업 얼렛으로 변경 */
                // var alertMsg = '<p>일시적으로 가전 <strong class="point">세척 서비스</strong> 제공을 중지합니다.<br>서비스 안정화 이후 다시 진행될 예정이오니 양해 바랍니다.</p>';
                // if( topicName === "세척서비스" ){
                //     $(this).prop('checked', false);
                //     lgkorUI.alert(alertMsg);
                // }
                /* BTOCSITE-3411 add :: 세척 서비스 팝업 얼렛으로 변경 */
                self.$solutionsBanner.hide();
                self.requestSubTopic(url, param);

                if (self.autoFlag) {
                    self.$stepInput.find('.step-btn-wrap').show();
                    self.$stepDate.removeClass('active');
                    self.$stepEngineer.removeClass('active');
                    self.$completeBtns.hide();
                    self.$dateWrap.calendar('reset');
                    self.$timeWrap.timeCalendar('reset');  
                    self.autoFlag = false;
                }
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
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };   
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/engineerSolutionsClick.do', '/acecount/engineerSolutionsClickm.do');
                self.setSolutions(param, false);
            });

            // 주소 찾기
            self.$cont.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) { 
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;

                    self.$cont.find('#zipCode').val(data.zonecode);
                    self.$cont.find('#userAddress').val(address);
                    self.$cont.find('#detailAddress').val('').prop('readonly', false);

                    if (self.autoFlag) {
                        self.$stepInput.find('.step-btn-wrap').show();
                        self.$stepDate.removeClass('active');
                        self.$stepEngineer.removeClass('active');
                        self.$completeBtns.hide();
                        self.$dateWrap.calendar('reset');
                        self.$timeWrap.timeCalendar('reset');  
                        self.autoFlag = false;
                    }
                }); 
            });

            // 희망 일자 선택하기 버튼
            self.$stepInput.find('.step-btn-wrap .btn').on('mousedown', function(e) {
                e.preventDefault();
            }).on('click', function() {
                self.autoFlag = true;
                self.requestDate();
            });

            // 날짜 선택
            self.$dateWrap.on('dateselected', function() {
                self.requestTime();
            });

            // 시간 선택
            self.$timeWrap.on('timeselected', function() {
                var url = self.$stepDate.data('ajax'),
                    param;

                var productCode = $('#productCode').val();
                // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
                productCode = self.getbdTypeParam();

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
            self.$engineerOpener.on('click', function() {
                var $this = $(this);
                var url = self.$engineerPopup.data('engineerListUrl'),
                    param;

                var productCode = $('#productCode').val();
                // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
                productCode = self.getbdTypeParam();

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

                param = $.extend(param, self.dateParam);
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data,
                        arr = data.engineerList instanceof Array ? data.engineerList : []; 

                    if (data.resultFlag == 'Y') {  
                        if (arr.length) {
                            var html = vcui.template(engineerTmpl, data);

                            /* BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
                            // self.$engineerSlider.find('.slide-track').html(html); // 원본
                            self.$engineerSlider.find('.engineer-infoP').html(html);
                            /* //BTOCSITE-BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

                            self.$engineerSlider.vcCarousel('reinit');
                        } else {
                            lgkorUI.alert('', {
                                title: '방문 가능한 다른 엔지니어가 없습니다.'
                            }, $this[0]);
                        }
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            }, $this[0]);
                        }
                    }

                    lgkorUI.hideLoading();
                });
            });

            self.$engineerSlider.on('carouselreinit', function() {
                self.$engineerPopup.vcModal();
            });

            // 엔지니어 선택
            self.$engineerPopup.find('.btn-group .btn').on('click', function() {
                var url = self.$engineerPopup.data('lockUrl'),
                    $this = self.$engineerPopup.find('[name=engineer]').filter(':checked'),
                    infoData = $this.data(),
                    param;

                var productCode = $('#productCode').val();
                // BTOCSITE-3200 출장서비스 예약 > 추가정보_건물유형 수정 등 
                productCode = self.getbdTypeParam();

                param = {
                    serviceType: $('#serviceType').val(),
                    date: $('#date').val(),
                    time: $('#time').val(),
                    lockUserId: $('#lockUserId').val(),
                    productCode: productCode,
                    beforeEngineerCode: $('#engineerCode').val()
                }

                param = $.extend(param, infoData);

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    lgkorUI.hideLoading();
                    
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            });

            self.$engineerPopup.on('modalhidden', function() {
                self.$engineerOpener.focus();
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
                        }, this);       
                    } else {
                        authManager.open(function() {
                            $('#authName').val($('#userNm').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
                    }
                }
            });

            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
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

            $('[name=tvPosition]').on('change', function() {
                if ($(this).attr('id') == 'tvPosition04') {
                    $('#tvPositionEtc').prop('disabled', false);
                } else {
                    $('#tvPositionEtc').prop('disabled', true);
                    $('#tvPositionEtc').val('');
                }
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();
