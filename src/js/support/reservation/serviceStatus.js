(function() {
    var listTmpl = 
        '<li class="{{typeClass}}">' +
            '<a href="{{url}}" class="item" data-number="{{number}}">' +
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
    
    var searchPage = {
        init: function() {
            var self = this;

            vcui.require([
                'ui/validation'
            ], function() {
                var authRegister = {
                    userName2: {
                        msgTarget: '.err-block',
                        pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z\*]+$/,
                        maxLength: 30
                    },
                    phoneNo: {
                        msgTarget: '.err-block',
                        pattern: /^[0-9]+$/,
                        maxLength: 11
                    },
                    authNo: {
                        msgTarget: '.err-block',
                    }
                };

                self.numberValidation = new vcui.ui.CsValidation('#numberForm', {
                    register: {
                        userName1: {
                            msgTarget: '.err-block',
                            pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z\*]+$/,
                            maxLength: 30
                        },
                        number: {
                            msgTarget: '.err-block',
                            pattern: /^[a-z|A-Z|0-9]+$/,
                            maxLength: 20
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
                    success && self.requestComplete();
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
                self.changeSetting();
                self.cancelSetting();
                self.authSetting();
                self.solutionsSetting();
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
                        form: '#reservationTimePopup',
                        name: '#authName',
                        phone: '#authPhoneNo',
                        number: '#authNo'
                    },
                    register: authRegister
                }
            
            self.authManager = new AuthManager(managerOpt);
            self.$sendBtn = self.$datePopup.find('.btn-send');

            self.$sendBtn.on('click', function() {
                self.authManager.send();
            });
        },
        changeSetting: function() {
            if (!$('#reservationTimePopup').length) return;

            var self = this;
        
            self.$dateOpenBtn = $('[data-href="#reservationTimePopup"]');
            self.$datePopup = $('#reservationTimePopup');
            self.$date = self.$datePopup.find('.date-wrap');
            self.$time = self.$datePopup.find('.time-wrap');

            self.$date.calendar();
            self.$time.timeCalendar();

            // 예약 변경
            self.$dateOpenBtn.on('click', function() {
                self.requestDate();
            });
            self.$date.on('dateselected', function() {
                self.requestTime();
            }); 
            self.$datePopup.on('modalhide', function() {
                self.$date.calendar('reset');
                self.$time.timeCalendar('reset');
            }).on('click', '.btn-group .btn:last-child', function() {
                self.authManager.confirm(this, function(success, result) {
                    self.completeAuth(success, result);
                });
            });
        },
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

                $reason.find('options.placeholder').prop('selected', true);
                $reason.vcSelectbox('update');
                $reasonEtc.val('');
                self.cancelValidation.reset();
            }).on('change', '#reason', function() {
                var $reason = $(this),
                    $reasonEtc = $('#reasonEtc'),
                    reansonValue = $reason.val();

                reansonValue && $reasonEtc.prop('disabled', false);
            }).on('click', '.btn-group .btn:first-child', function() {
                lgkorUI.confirm('예약 취소가 완료되지 않았습니다.<br />중단하시겠습니까?', {
                    title:'', okBtnName:'확인', cancelBtnName:'취소',
                    ok: function() {
                        self.$cancelPopup.vcModal('hide');
                    }
                });
            }).on('click', '.btn-group .btn:last-child', function() {
                var url = self.$cancelPopup.data('cancelUrl');
                var result = self.cancelValidation.validate(),
                    param;

                if (result.success) {
                    param = self.cancelValidation.getAllValues();
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            location.href = url;
                        } else {
                            lgkorUI.hideLoading();
                            if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                        }
                    });
                }
            });
        },
        requestDate: function() {
            var self = this;
            var url = self.$datePopup.data('dateUrl'),
                param;

            param = {
                
            };
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr;

                if (data.resultFlag == 'Y') {
                    arr = data.dateList instanceof Array ? data.dateList : [];
                    if (arr.length) {
                        self.$date.calendar('update', arr);
                        self.$datePopup.vcModal();
                    }
                } else {
                    if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                }
            });
        },
        requestTime: function() {
            var self = this;
            var url = self.$datePopup.data('timeUrl'),
                param;

            param = {
                
            };
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    arr = data.timeList instanceof Array ? data.timeList : [];
                    if (arr.length) {
                        self.$time.timeCalendar('update', arr);
                    }
                } else {
                    if (data.resultMessage) lgkorUI.alert("", {title: data.resultMessage});
                }
            });
        },
        completeAuth: function(success, result) {
            var self = this;
            var data = result.data;

            if (success) {
                location.href = data.url;
            } else {

            }
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