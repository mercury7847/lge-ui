(function() {
    var listTmpl = 
        '<li class="{{typeClass}}">' +
            '<a href="{{url}}" class="item">' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag green">{{type}}</span>' +
                    '{{#if (status)}}<span class="flag">{{status}}</span>{{/if}}' +
                '</div>' +
                '<p class="tit">{{topic}} &gt; {{subTopic}}</p>' +
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
                                title: result.data.resultMessage
                            });
                        }

                        lgkorUI.hideLoading();
                    });
                }
            });

            $('#phoneForm').find('.btn-confirm').on('click', function() {
                self.authManager.confirm(this);
            });

            $('.btn-send').on('click', function() {
                self.authManager.send(this);
            });
        }
    }

    var listPage = {
        init: function() {
            var self = this;

            self.$listPage = $('.service-status-list');
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
                var phoneNo = self.$listPage.find('#phoneNumber').val();
                var param = {
                    page: e.page,
                    userName: userNm,
                    phoneNumber: phoneNo
                };
                self.requestData(param);
            });
        }
    }

    $(window).ready(function() {
        if ($('.service-status-list').length) listPage.init();
        if ($('.service-status').length) searchPage.init();
    });
})();