(function() {
    var listTmpl = 
        '<li class="{{typeClass}}">' +
            '<a href="{{url}}" class="item" data-number="{{registNumber}}">' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag green">{{type}}</span>' +
                    '{{#if (status)}}<span class="flag">{{status}}</span>{{/if}}' +
                '</div>' +
                '<p class="tit">{{topic}}{{#if (modelCode)}} &gt; {{subTopic}}{{/if}}</p>' +
                '<ul class="options">' +
                    '<li>{{category}} &gt; {{subCategory}}{{#if (modelCode)}} : {{modelCode}} {{/if}}</li>' +
                    '<li>접수번호 {{registNumber}}</li>' +
                    '<li>접수일 {{registDate}}</li>' +
                '</ul>' +
            '</a>' +
        '</li>';
    var engineerTmpl =
        '{{#each (item, index) in engineerList}}' +
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="engineer-box">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
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
                        pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '이름을 입력해 주세요.',
                        patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
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
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '인증번호를 입력해주세요.',
                    }
                };

                self.numberValidation = new vcui.ui.CsValidation('#numberForm', {
                    register: {
                        userName1: {
                            required: true,
                            maxLength: 30,
                            pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
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
    
                self.authManager = new AuthManager({
                    elem: {
                        form: '#phoneForm',
                        name: '#userName2',
                        phone: '#phoneNo',
                        number: '#authNo'
                    },
                    register: authRegister
                });

                self.bindEvent();
            });
        },
        bindEvent: function() {
            var self = this;

            $('#numberForm').find('.btn-confirm').on('click', function() {
                var result = self.numberValidation.validate(),
                    data = self.numberValidation.getAllValues();

                if (result.success) {
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
                self.authManager.confirm(this, function(success, result) {
                    success && self.complete();
                });
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
                self.requestData(param);
            });

            self.$list.on('click', 'a', function(e) {
                e.preventDefault();

                var $this = $(this),
                    number = $this.data('number');

                self.$form.find('#number').val(number);
                self.$form.submit();
            });
        }
    };

    var detailPage = {
        init: function() {
            var self = this;

            vcui.require(['ui/validation'], function () {
                self.changeSetting.init();
                self.cancelSetting();
                //self.authSetting();
                self.centerSetting();
                self.solutionsSetting();
            });
        },
        centerSetting: function() {
            $('.btn-center-link').on('click', function(){
                var url = $(this).attr("href");
                var windowHeight = $(window).innerHeight();
                window.open(url, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });
        },

        solutionsSetting: function() {
            if (!$('#solutionsPopup').length) return;

            var self = this;

            self.$solutionsOpenBtn = $('[data-href="#solutionsPopup"]');
            self.$solutionsPopup = $('#solutionsPopup');

            // 제품 문제 해결
            self.$solutionsOpenBtn.on('click', function() {
                self.requestSolutions({page:1}, false);
            });
        },
        
        // changeSetting: function() {
        cancelSetting: function() {
            if (!$('#cancelServicePopup').length) return;

            var self = this;
            var register = {
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
                        self.authManager.confirm(this, function(success, result) {
                            self.completeAuth(success, result);
                        });
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
                });

                self.el.closeBtn.on('click', function(e){
                    self.layerhide();
                })
            },
            slideConfig : {
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
                                self.el.slider.find('.slide-track').html(html);
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
            update: function(data) {
                var self = this,
                    $stepEngineer = $('#stepEngineer'),
                    $engineerBox = $stepEngineer.find('.engineer-info'),
                    $resultBox = $stepEngineer.find('.engineer-desc'),
                    topicNm = $('#topic').val(),
                    subTopicNm = $('#subtopic').val(),
                    tid = 0;
    
                $stepEngineer.find('.engineer-img img').attr({
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
                                $formSection.find('button:visible').first().focus();
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
                if (!$('#reservationTimePopup').length) return;
    
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
                
                self.authManager = new AuthManager(managerOpt);
                
    
                self.el.popup.find('.btn-send').on('click', function() {
                    self.authManager.send(this);
                });
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
                        $('#acptNo').val(result.data.acptNo);
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

    $(window).ready(function() {
        if ($('.service-status').length) searchPage.init();
        if ($('.service-status-list').length) listPage.init();
        if ($('.service-status-detail').length) detailPage.init();
    });
})();