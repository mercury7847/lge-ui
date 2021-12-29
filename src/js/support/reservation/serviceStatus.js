(function() {
    var listTmpl = 
        '<li class="{{typeClass}}">' +
            '<a href="{{url}}" class="item" data-number="{{registNumber}}">' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag green">{{type}}</span>' +
                    '{{#if (status)}}<span class="flag">{{status}}</span>{{/if}}' +
                '</div>' +
                '<p class="tit">{{topic}}{{#if (subTopic)}} &gt; {{subTopic}}{{/if}}</p>' +
                '<ul class="options">' +
                    '<li>{{category}}{{#if (subCategory)}} &gt; {{subCategory}}{{/if}}{{#if (modelCode)}} : {{modelCode}} {{/if}}</li>' +
                    '<li>접수번호 {{registNumber}}</li>' +
                    '<li>접수일 {{registDate}}</li>' +
                '</ul>' +
            '</a>' +
        '</li>';
    var engineerTmpl =
        '{{#each (item, index) in engineerList}}' +

        /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
        // BTOCSITE-7660 슬라이드 원본
        // '<div class="slide-conts ui_carousel_slide">' +
        //     '<div class="engineer-box">' +
        //         '{{# if (index == 0) { #}}' +
        //         '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
        //         '{{# } else { #}}' +
        //         '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
        //         '{{# } #}}' +
        //         '<label for="engineer{{index}}">' +
        //             '<div class="img">' +
        //                 '<img src="{{item.image}}" alt="" aria-hidden="true">' +
        //             '</div>' +
        //             '<p class="tit">{{item.engineerName}}</p>' +
        //             '<p class="desc">{{item.centerName}}</p>' +
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
        /* //BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
        '{{/each}}';
    var detect = vcui.detect;
    
    var searchPage = {
        init: function() {
            var self = this;

            vcui.require([
                'ui/validation'
            ], function() {
                var authRegister = {
                    userName2: {
                        required: true,
                        maxLength: 30,
                        pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해 주세요.',
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
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '인증번호를 입력해주세요.',
                    }
                };

                self.numberValidation = new vcui.ui.CsValidation('#numberForm', {
                    register: {
                        privcyCheck: {
                            msgTarget: '.err-block'
                        },
                        userName1: {
                            required: true,
                            maxLength: 30,
                            pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                            msgTarget: '.err-block',
                            errorMsg: '이름을 입력해 주세요.',
                            patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                        },
                        number: {
                            required: true,
                            maxLength: 20,
                            pattern: /^[a-z|A-Z|0-9]+$/,
                            msgTarget: '.err-block',
                            errorMsg: '접수번호를 입력해 주세요.',
                            patternMsg: '정확한 접수번호를 입력해 주세요.'
                        }
                    }
                });
                
                if( $('#phoneForm').length ) { 
                    self.authManager = new AuthManager({
                        elem: {
                            form: '#phoneForm',
                            name: '#userName2',
                            phone: '#phoneNo',
                            number: '#authNo'
                        },
                        register: authRegister,
                        pass: false
                    });
    
                }
                self.bindEvent();
            });
        },
        bindEvent: function() {
            var self = this;

            $('#numberForm').find('.btn-confirm').on('click', function() {
                var result = self.numberValidation.validate(),
                    data = self.numberValidation.getAllValues();

                if (result.success) {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusNumberClick.do', '/acecount/statusNumberClickm.do');
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost($('#numberForm').data('ajax'), data, function(result) {
                        if (result.data.resultFlag == 'Y') {
                            $('#numberForm').attr('action', result.data.url).submit();
                        } else if (result.data.resultFlag == 'N') {
                            lgkorUI.alert("", {
                                title: result.data.resultMessage,
                                ok: function(el) {
                                    if (result.data.url) {
                                        location.href = result.data.url; 
                                    } else {
                                        $(el).vcModal('hide');
                                    }
                                }
                            });
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('#phoneForm').find('.btn-confirm').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusPhoneClick.do', '/acecount/statusPhoneClickm.do');
                self.authManager.confirm(this);
            });

            $('.btn-send').on('click', function() {
                self.authManager.send(this);
            });
        }
    };

    var listPage = {
        init: function() {
            var self = this;

            self.$listPage = $('.service-status-list');
            self.$form = self.$listPage.find('form');
            self.$list = self.$listPage.find('.list-wrap');
            self.$listPagination = self.$listPage.find('.pagination');
            self.$noData = self.$listPage.find('.no-data');

            self.$listPagination.pagination();

            self.bindEvent();
        },
        requestData: function(param) {
            var self = this;
            var url = self.$listPage.data('listUrl');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.listData instanceof Array ? data.listData : [],
                    page = data.listPage,
                    html = '';

                self.$list.find('ul').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
                        html += vcui.template(listTmpl, item);
                    });
                    self.$listPagination.pagination('update', page);

                    self.$list.find('ul').html(html);
                    self.$list.show();
                    self.$listPagination.show();
                    self.$noData.hide();
                } else {
                    self.$list.hide();
                    self.$listPagination.hide();
                    self.$noData.show();
                }

                lgkorUI.hideLoading();
            });
        },
        bindEvent: function() {
            var self = this;

            self.$listPagination.on('pageClick', function(e) {
                var userNm = self.$listPage.find('#userName').val();
                var phoneNo = self.$listPage.find('#phoneNo').val();
                var clothFlag = self.$listPage.find('#clothFlag').val();
                var param = {
                    page: e.page,
                    userName: userNm,
                    phoneNumber: phoneNo,
                    clothFlag: clothFlag
                };

                self.$form.find('#page').val(e.page);
                self.requestData(param);
            });

            self.$list.on('click', 'a', function(e) {
                e.preventDefault();

                var $this = $(this),
                    number = $this.data('number');

                // lgkorUI.historyBack({
                //     page: self.$form.find('#page').val()
                // });

                self.$form.find('#number').val(number);
                self.$form.submit();
            });
        }
    };

    var detailPage = {
        init: function() {
            var self = this;

            vcui.require(['ui/validation'], function () {
                self.setPage();
                self.changeSetting.init();
                self.cancelSetting();
                self.centerSetting();
                self.solutionsSetting();
            });
        },
        setPage: function() {
            var pageValue = $('#pageGubun').val();
            
            if (pageValue && pageValue.indexOf('cancelCompletePage') > -1) {
                var pageCode = pageValue.charAt(0);
                switch(pageCode) {
                    case 'A':
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusEngineerCancelClick.do', '/acecount/statusEngineerCancelClickm.do');
                        break;
                    case 'B':
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusCenterCancelClick.do', '/acecount/statusCenterCancelClickm.do');
                        break;
                    case 'C':
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusCallCancelClick.do', '/acecount/statusCallCancelClickm.do');
                        break;
                    case 'E':
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusRemoteCancelClick.do', '/acecount/statusRemoteCancelClickm.do');
                        break;
                }
            }
        },
        centerSetting: function() {
            $('.btn-center-link').on('click', function(e){
                var url = $(this).data("href") || $(this).attr('href');
                var windowHeight = $(window).innerHeight();
                window.open(url, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
                // window.open(url)
                e.preventDefault();
            });
        },

        solutionsSetting: function() {
            if (!$('#solutionsPopup').length) return;

            var self = this;

            self.$solutionsOpenBtn = $('[data-href="#solutionsPopup"]');
            self.$solutionsPopup = $('#solutionsPopup');

            // 제품 문제 해결
            self.$solutionsOpenBtn.on('click', function() {
                var pageValue = $('#pageGubun').val();
                if (pageValue) {
                    if (pageValue.indexOf('reserveResultPage') > -1) {
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/statusSolutionsClick.do', '/acecount/statusSolutionsClickm.do');
                    } else if (pageValue.indexOf('CompletePage') > -1) {
                        if (pageValue.indexOf('business') > -1) {
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/engineerCompleteSolutionsClick.do', '/acecount/engineerCompleteSolutionsClickm.do');
                        } else if (pageValue.indexOf('videoCounsel') > -1) {
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/videoconsultingCompleteSolutionsClick.do', '/acecount/videoconsultingCompleteSolutionsClickm.do');
                        } else if (pageValue.indexOf('counsel') > -1) {
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/callCompleteSolutionsClick.do', '/acecount/callCompleteSolutionsClickm.do');
                        } else if (pageValue.indexOf('visit') > -1) {
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/visitCompleteSolutionsClick.do', '/acecount/visitCompleteSolutionsClickm.do');
                        } else if (pageValue.indexOf('remote') > -1) {
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/remoteCompleteSolutionsClick.do', '/acecount/remoteCompleteSolutionsClickm.do');
                        }
                    }
                }
                self.requestSolutions({page:1}, false);
            });
        },
        
        cancelSetting: function() {
            if (!$('#cancelServicePopup').length) return;

            var self = this;
            var register = {
                    privcyCheck: {
                        msgTarget: '.err-block'
                    },
                    reason: {
                        msgTarget: '.err-block'
                    },
                    reasonEtc: {
                        msgTarget: '.err-msg'
                    }
                };

            self.$cancelPopup = $('#cancelServicePopup');
            self.cancelValidation = new vcui.ui.CsValidation('#cancelServicePopup', {register:register});

            // 예약 취소
            self.$cancelPopup.on('modalhide', function() {
                var $reason = $('#reason'),
                    $reasonEtc = $('#reasonEtc');

                $reason.find('option.placeholder').prop('selected', true);
                $reason.vcSelectbox('update');
                $reasonEtc.val('').prop('disabled', true);
                self.cancelValidation.reset();
            }).on('change', '#reason', function() {
                var $reason = $(this),
                    $reasonEtc = $('#reasonEtc'),
                    reansonValue = $reason.find('option:selected').text().trim().replace(/ /g,"");

                    if(reansonValue.indexOf('직접입력') > -1) {
                        $reasonEtc.prop('disabled', false);
                    } else {
                        $reasonEtc.val('');
                        $reasonEtc.prop('disabled', true);
                    }
            }).on('click', '.btn-group .btn-cancel', function() {
                lgkorUI.confirm('예약 취소가 완료되지 않았습니다.<br />중단하시겠습니까?', {
                    title:'', okBtnName:'확인', cancelBtnName:'취소',
                    ok: function() {
                        self.$cancelPopup.vcModal('hide');
                    }
                });
            }).on('click', '.btn-group .btn-confirm', function() {
                var url = self.$cancelPopup.data('cancelUrl'),
                    result = self.cancelValidation.validate(),
                    $cencelForm = $('#reservationCancelForm'),
                    param;

                if (result.success) {
                    param = self.cancelValidation.getAllValues();
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var data = result.data;

                        if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});

                        if (data.resultFlag == 'Y') {
                            $cencelForm.attr('action', data.url);
                            $cencelForm.submit();
                        } 
                        lgkorUI.hideLoading();
                    });
                }
            });
        },
        
        changeSetting : {
            validation : null,
            authManager : null,
            register : {
                date: {
                    required: true,
                    msgTarget: '.err-msg'
                },
                time: {
                    required: true,
                    msgTarget: '.err-msg'
                }
            },
            el : {
                popup                   : $('#reservationTimePopup'),
                selectedEngineer        : $('#reservationTimePopup .engineer-to-visit'),
                toggleOtherBtn          : $('#reservationTimePopup .engineer-to-visit .engineer-desc button'),
                stepEngineer            : $('#reservationTimePopup #stepEngineer'),
                toggleLayer             : $('#reservationTimePopup .toggle-layer'),
                closeBtn                : $('#reservationTimePopup .toggle-layer .btn-layer-close'),
                selectBtn               : $('#reservationTimePopup .toggle-layer .btn-select-engineer'),
                slider                  : $('#reservationTimePopup .toggle-layer .engineer-slider'),
                dateOpenBtn             : $('[data-href="#reservationTimePopup"]'),
                date                    :  $('#reservationTimePopup .date-wrap'),
                time                    :  $('#reservationTimePopup .time-wrap'),
            },
            init : function(){
                if (!$('#reservationTimePopup').length) return;

                var self = this;

                self.authSetting();
            
                self.el.date.calendar({
                    inputTarget: '#date'
                });
                self.el.time.timeCalendar({
                    inputTarget: '#time'
                }); 

                // 예약 변경
                self.el.dateOpenBtn.on('click', function() {
                    self.requestDate();
                });
                
                self.el.date.on('dateselected', function() {
                    self.requestTime();
                }); 
                
                self.el.time.on('timeselected', function() {
                    var param = {
                        zipId: $('input[name=zipId]').val(),
                        productCode: $('input[name=productCode]').val(),
                        userNm: $('input[name=userNm]').val(),
                        phoneNo: $('input[name=phoneNo]').val(),
                        svcType: $('input[name=svcType]').val(),
                        lockUserId: $('input[name=lockUserId]').val(),
                        date : $('input[name=date]').val(),
                        time : $('input[name=time]').val(),
                    }
                                       
                    self.layerhide();
                    self.request(param);
                });

                self.el.popup.on('modalhide', function() {
                    self.el.date.calendar('reset');
                    self.el.time.timeCalendar('reset');
                    self.el.stepEngineer.removeClass('active');
                }).on('click', '.btn-group .btn-confirm', function() {
                    var result = self.validation.validate();
                    if( result.success == true) {
                        if(!lgkorUI.isLogin) {

                            self.authManager.confirm(this, function(success, result) {
                                self.completeAuth(success, result);
                            });
                        } else {
                            var $changePopup = $('#reservationTimePopup');
                            var url = $changePopup.data('auth-url');
                            var formData = {
                                userNm : $('#userNm').val(),
                                phoneNo : $('#phoneNo').val(),
                                numberName : ''
                            };
                            lgkorUI.showLoading();
                            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                                var data = result.data;
                                
                                if (data.resultFlag == 'Y') {
                                    lgkorUI.hideLoading();
                                    self.complete();
                                } else {
                                    if (data.resultMessage) {
                                        lgkorUI.alert("", {
                                            title: data.resultMessage
                                        });
                                    }
                                    lgkorUI.hideLoading();
                                }
                            }, 'POST');
                        }
                    }
                });

                self.validation = new vcui.ui.CsValidation('#reservationTimePopup .calendar-area', {
                    register: self.register
                });

                self.el.toggleOtherBtn.on('click', function(e){
                    self.layerToggle();
                })

                self.el.selectBtn.on('click', function(e){
                    var url = self.el.toggleLayer.data('lockUrl');
                    var checkedTarget = self.el.slider.find('[name=engineer]').filter(':checked');
                    var currentData = checkedTarget.data();
                    var param ;

                    param = {
                        serviceType: $('#serviceType').val(),
                        date: $('#date').val(),
                        time: $('#time').val(),
                        lockUserId: $('#lockUserId').val(),
                        productCode: $('#productCode').val(),
                        beforeEngineerCode: $('#engineerCode').val()
                    }
                    
                    param = $.extend(param, currentData);

                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            self.update(currentData);
                            self.layerhide();
                        } else {
                            if (data.resultMessage) {
                                self.el.toggleLayer.stop().slideUp();
                                
                                lgkorUI.alert("", {
                                    title: data.resultMessage
                                });
                            }
                        }
                    });
                    $('#reservationTimePopup .pop-conts').scrollTop(640);

                });

                self.el.closeBtn.on('click', function(e){
                    self.layerhide();
                    self.engineerFocus();
                })
            },
            slideConfig : {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: false,
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            infinite: false,
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint:767,
                        settings: {
                            infinite: false,
                            variableWidth : true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            },
            layerShow : function(){
                var self = this;
                self.el.toggleLayer.not('.active').stop().slideDown(function(){
                    var $this = $(this);
                    var $slider = $this.find('.engineer-slider');
                    $this.addClass('active');

                    $slider.filter('.is-loaded').vcCarousel('reinit');
                    $slider.not('.is-loaded').addClass('is-loaded').vcCarousel(self.slideConfig)
                });
                
            },
            layerhide : function(){
                var self = this;

                if( self.el.toggleLayer.hasClass('active')) {
                    self.el.toggleLayer.stop().slideUp(function(){
                        $(this).removeClass('active');
                    })
                } 
                
            },
            layerToggle : function(){
                var self = this;
                if( self.el.toggleLayer.hasClass('active')) {
                    self.el.toggleLayer.stop().slideDown(function(){
                        $(this).addClass('removeClass');
                    })
                } else {
                    self.el.toggleLayer.stop().slideDown(function(){
                        var $this = $(this);
                        var $slider = $this.find('.engineer-slider');
                        $this.addClass('active');

                        $slider.filter('.is-loaded').vcCarousel('reinit');
                        $slider.not('.is-loaded').addClass('is-loaded').vcCarousel(self.slideConfig)
                    });
                }
            },
            request : function(param) {
                var self = this;
                var url = self.el.stepEngineer.data('ajax');
    
                param = $.extend(param, self.dateParam);
    
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data,
                        arr = data.engineerList instanceof Array ? data.engineerList : []; 
    
                    if (data.resultFlag == 'Y') {  
                        if (arr.length) {
                            self.update(arr[0]);
                            if (arr.length > 1) {
                                var html = vcui.template(engineerTmpl, data);
                                
                                /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
                                // self.el.slider.find('.slide-track').html(html); //주영
                                self.el.slider.find('.engineer-infoP').html(html);
                                /* //BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

                                self.el.stepEngineer.find('.btn').show();
                            } else {
                                self.el.stepEngineer.find('.btn').hide();
                            }
                            self.el.stepEngineer.addClass('active');
                            //$('.choice-engineer .engineer-slider').vcCarousel('reinit');
                            //self.$completeBtns.show();
                        }
                    }
                });
            },

            engineerFocus: function() {
                // 예약 일시 변경 팝업 내에서 엔지니어 선택 영역으로 포커싱, 스크롤 이동
                var self = this;
                    $engineerPosition = $('#reservationTimePopup #stepEngineer').position();
                if ( $('windows').width() < 768) {
                    $('#reservationTimePopup .pop-conts').scrollTop($engineerPosition.top+400);
                } else {
                    $('#reservationTimePopup .pop-conts').scrollTop($engineerPosition.top);
                }
                $('#reservationTimePopup #stepEngineer').focus();
            },

            update: function(data) {
                var self = this,
                    $stepEngineer = $('#stepEngineer'),
                    $engineerBox = $stepEngineer.find('.engineer-infoP'),
                    $resultBox = $stepEngineer.find('.engineer-desc'),
                    topicNm = $('#topic').val(),
                    subTopicNm = $('#subtopic').val(),
                    tid = 0;
    
                $stepEngineer.find('.engineer-img img').attr({
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
    
                $('#resrvSeq').val(data.resrvSeq);

                var loginFlag = $('html').data('login') === 'Y' ? true : false;
                var $formSection = $engineerBox.closest('.section').next('.section');

                clearTimeout(tid);

                tid = setTimeout(function(){
                    if( loginFlag ) {
                        if($stepEngineer.find('button:visible').length) {
                            $stepEngineer.find('button:visible').first().focus();
                        } else {
                            $stepEngineer.attr('tabindex', '1').focus().removeAttr('tabindex');
                        }
                    } else {
                        
                        if( $formSection.length ) {
                            if( $formSection.find('button:visible').length ) {
                                // 날짜 선택 시 인증 번호 발송 버튼으로 포커싱
                                // $formSection.find('button:visible').first().focus();

                                // 날짜 선택 시 엔지니어 영역으로 포커싱
                                self.engineerFocus();
                            } else {
                                $stepEngineer.closest('.pop-conts').scrollTop($formSection.offset().top);
                            }
                        } 
                    }
                }, 100)

            },
            requestDate: function() {
                var self = this;
                var url = self.el.popup.data('dateUrl'),
                    param;
    
                param = {
                    zipId: $('input[name=zipId]').val(),
                    productCode: $('input[name=productCode]').val(),
                    userNm: $('input[name=userNm]').val(),
                    phoneNo: $('input[name=phoneNo]').val(),
                    svcType: $('input[name=svcType]').val(),
                    lockUserId: $('input[name=lockUserId]').val(),
                    date : $('input[name=date]').val(),
                };

                self.layerhide();
                self.el.stepEngineer.removeClass('active');

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data,
                        arr;
    
                    if (data.resultFlag == 'Y') {
                        arr = data.dateList instanceof Array ? data.dateList : [];
                        if (arr.length) {
                            self.el.date.calendar('update', arr);
                            self.el.popup.vcModal();
                        }
                    } else {
                        if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                    }
                });
            },
            requestTime: function() {
                var self = this;
                var url = self.el.popup.data('timeUrl'),
                    param;
    
                param = {
                    zipId: $('input[name=zipId]').val(),
                    productCode: $('input[name=productCode]').val(),
                    userNm: $('input[name=userNm]').val(),
                    phoneNo: $('input[name=phoneNo]').val(),
                    svcType: $('input[name=svcType]').val(),
                    lockUserId: $('input[name=lockUserId]').val(),
                    date : $('input[name=date]').val(),
                    time : $('input[name=time]').val(),
                };

                self.el.stepEngineer.removeClass("active");
                self.layerhide();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
    
                    if (data.resultFlag == 'Y') {
                        arr = data.timeList instanceof Array ? data.timeList : [];
                        if (arr.length) {
                            //self.requestEngineer(param)
                            self.el.time.timeCalendar('update', arr);
                        }
                    } else {
                        if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                    }
                });
            },
            authSetting: function() {
                if (!$('#reservationTimePopup').length || lgkorUI.isLogin) return;
    
                var self = this;
                var authRegister = {
                        authNo: {
                            msgTarget: '.err-block'
                        }
                    },
                    managerOpt = {
                        elem: {
                            popup: '#reservationTimePopup',
                            name: '#userNm',
                            phone: '#phoneNo',
                            number: '#authNo'
                        },
                        register: authRegister
                    }
                
                if( $('#authNo').length ) {

                    self.authManager = new AuthManager(managerOpt);
                    
                    self.el.popup.find('.btn-send').on('click', function() {
                        self.authManager.send(this);
                    });
                }
            },
            complete : function(){
                var self = this;


                // if ($('[name=bdType]:checked').val() == 4) {
                //     $('#productCode').val('CRB');
                // }

                var $form = $('#changeEngineerFormData');
                var url = $form.data('ajax');
                var formParam = {};
                var formData = self.validation.getAllValues();

                $form.find('input:hidden').each(function(){
                    var $this = $(this);
                    var _name = $this.attr('name');
                    var _value = $this.val();

                    formParam[_name] = _value;
                });

                formData = $.extend(formData, formParam);


                lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y' && data.url !== "") {
                        formData = $.extend(formData, {
                            acptNo : data.acptNo
                        })
                        $('#acptNo').val(data.acptNo);
                        $form.attr('action', result.data.url);
                        
                        $form.submit();
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                }, 'POST');
            },
            completeAuth: function(success, result) {
                var self = this;
                var data = result.data;
    
                if (success) {
                    self.complete();
                } else {
    
                }
            },
        },
        
        requestSolutions: function(data, isShown) {
            var self = this;
            var url = self.$solutionsPopup.data('listUrl'),
                param = {};

            param = $.extend(param, data);
            lgkorUI.requestAjaxData(url, param, function(result) {
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    self.requestSolutions({page:e.page}, true);
                });

                if (!isShown) self.$solutionsPopup.vcModal();
            }, null, "html", true);
        }
    };

    function getParam(sname) {
        var params = location.search.substr(location.search.indexOf("?") + 1);
        var sval = "";
        params = params.split("&");
        for (var i = 0; i < params.length; i++) {
            temp = params[i].split("=");
            if ([temp[0]] == sname) { sval = temp[1]; }
        }
        return sval;
    }

    function initModal(param){
        var curPopupName = '';
        switch(param) {
            default : 
                break;
            case "change" : 
                curPopupName = '#reservationTimePopup';
                break;
            case "cancel" : 
                curPopupName = '#cancelServicePopup';
                break;
            case "solutions" : 
                curPopupName = '#solutionsPopup';
                break;
        }
        $('[data-href="' + curPopupName + '"]').click();
    }
    
    

    $(window).ready(function() {
        if ($('.service-status').length) searchPage.init();
        if ($('.service-status-list').length) listPage.init();
        if ($('.service-status-detail').length) detailPage.init();
    });
    $(window).on('load', function(){
        if ($('.service-status-detail').length) {
            vcui.require(['ui/modal'], function ($, core) {
                setTimeout(function(){
                    initModal(getParam('popupType'))
                }, 200)
            });
        }
    })
})();