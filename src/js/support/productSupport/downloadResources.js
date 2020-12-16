(function() {
    var manualListTemplate = 
        '<li>' +
            '<p class="tit">{{type}}</p>' +
            '<p class="desc">{{title}}</p>' +
            '<div class="info-wrap">' +
                '<ul class="options">' +
                    '<li>{{date}}</li>' +
                    '<li>{{language}}</li>' +
                    '{{# if (typeof petName != "undefined") { #}}' +
                    '<li>{{petName}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof os != "undefined") { #}}' +
                    '<li>{{os}}</li>' +
                    '{{# } #}}' +
                ' </ul>' +
                '<div class="btns-area">' +
                    '{{# for (var i = 0; i < file.length; i++) { #}}' +
                    '<a href="{{file[i].src}}" class="btn border size btn-download"><span>{{file[i].type}}</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>';
    var driverListTemplate = 
        '<li>' +
            '<div class="head">' +
                '<div class="file-box">' +
                    '<p class="tit"><button type="button" class="btn-info" data-href="{{detailUrl}}" data-cseq="{{cSeq}}">{{os}} {{title}}</button></p>' +
                    '<ul class="options">' +
                        '<li>{{version}}  {{category}}</li>' +
                        '<li>{{driver}}</li>' +
                        '<li>{{date}}</li>' +
                    '</ul>' +
                    '<div class="btn-area">' +
                        '<div class="box">' +
                            '<a href="{{file.src}}" class="btn border size"><span>다운로드 {{file.size}}</span></a>' +
                        '</div>' +
                        '{{# if (typeof prevVersion != "undefined") { #}}' +
                        '<div class="box">' +
                            '<a href="#" class="accord-btn ui_accord_toggle" data-open-text="이전 버전 보기" data-close-text="이전 버전 닫기"><span class="ui_accord_text">이전 버전 보기</span></a>' +
                        '</div>' +
                        '{{# } #}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '{{# if (typeof prevVersion != "undefined" && prevVersion.length) { #}}' +
            '<div class="accord-cont ui_accord_content">' +
                '<ul class="driver-list">' +
                    '{{# for (var i = 0; i < prevVersion.length; i++) { #}}' +
                    '<li>' +
                        '<div class="file-box">' +
                            '<p class="tit"><button type="button" class="btn-info" data-href="{{detailUrl}}" data-cseq="{{cSeq}}">{{os}} {{title}}</button></p>' +
                            '<ul class="options">' +
                                '<li>{{version}}  {{category}}</li>' +
                                '<li>{{driver}}</li>' +
                                '<li>{{date}}</li>' +
                            '</ul>' +
                            '<div class="btn-area">' +
                                '<div class="box">' +
                                    '<a href="{{file.src}}" class="btn border size"><span>다운로드 {{file.size}}</span></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                    '{{# } #}}' +
                '</ul>' +
            '</div>' +
            '{{# } #}}' +
        '</li>';

    var defaultParam;

    function getObject(parameter) {
        var valueObject = {}, hash;
        var hashes = parameter.split('&');
        for(var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            valueObject[hash[0]] = hash[1];
        }
            
        return valueObject;
    }

    $(window).ready(function() {
        var download = {
            initialize: function() {
                var self = this;

                self.manualSec = $('.manual-section');
                self.driverSec = $('.driver-section');
                
                self.driverSec.find('.ui_list_accordion').vcAccordion({
                    toggleSelector: '>.head .ui_accord_toggle'
                });
                self.driverSec.find('.pagination').pagination();

                defaultParam = getObject($('#submitForm').serialize());

                self.bindEvent();
            },
            setManualList: function(list) {
                var self = this;
                var listArr = list.listData instanceof Array ? list.listData : [];
                var html = "";

                $('#page').val(list.listPage.page);

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template(manualListTemplate, item);
                    });
                    self.manualSec.find('.manual-list').append(html).show();
                    self.manualSec.find('.no-data').hide();
                } else {
                    self.manualSec.find('.manual-list').html('').hide();
                    self.manualSec.find('.no-data').show();
                }

                if (list.listPage.view == 'Y') {
                    self.manualSec.find('.btn-moreview').show();
                } else {
                    self.manualSec.find('.btn-moreview').hide();
                }
            },
            setDriverList: function(list) {
                var self = this;
                var listArr = list.listData instanceof Array ? list.listData : [];
                var pageInfo = list.listPage;
                var html = "";
            
                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template(driverListTemplate, item);
                    });
                    self.driverSec.find('.driver-list').html(html).show();
                    self.driverSec.find('.pagination').show();
                    self.driverSec.find('.pagination').pagination('update', list.listPage);
                    self.driverSec.find('.no-data').hide();
                } else {
                    self.driverSec.find('.driver-list').html('').hide();
                    self.driverSec.find('.pagination').hide();
                    self.driverSec.find('.no-data').show();
                }
            },
            setOsOption: function(list) {
                var listArr = list instanceof Array ? list : [];
                var html = "";

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template('<option value="{{value}}">{{option}}</option>', item);
                    });
                } else {
                    html = '<option value="">없음</option>';
                    this.driverSec.find('select').vcSelectbox ('disabled');
                }
                
                this.driverSec.find('#os').html(html);
                this.driverSec.find('#os').vcSelectbox('update');
            },
            setDriverOption: function(list) {
                var listArr = list instanceof Array ? list : [];
                var html = "";

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template('<option value="{{value}}">{{option}}</option>', item);
                    });
                
                    this.driverSec.find('#driver').html(html);
                    this.driverSec.find('#driver').vcSelectbox('update');
                    this.driverSec.find('#driver').closest('.forms').show();
                } else {
                    this.driverSec.find('#driver').closest('.forms').hide();
                }
            },
            setDriverType: function(list) {
                var listArr = list instanceof Array ? list : [];
                var html = "";
                listArr.forEach(function(item) {
                    html += vcui.template('<li><a href="#">{{type}}({{count}})</a></li>', item);
                });
                this.driverSec.find('.tabs-wrap ul').html(html);
                this.driverSec.find('.tabs-wrap').vcTab('update').vcTab('select', 0);
            },
            searchAllList: function(formData) {
                var self = this;
                var ajaxUrl = '/lg5-common/data-ajax/support/downloadList.json';

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    self.setManualList(data.manual);
                    self.setDriverList(data.driver);
                    self.setOsOption(data.driver.osOption);
                    self.setDriverOption(data.driver.driverOption);
                    self.setDriverType(data.driver.driver);

                    lgkorUI.hideLoading();
                });
            },
            searchManualList: function(formData) {
                var self = this;
                var ajaxUrl = self.manualSec.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    self.setManualList(data.manual);

                    lgkorUI.hideLoading();
                });
            },
            searchDriverList: function(formData) {
                var self = this;
                var ajaxUrl = self.driverSec.data('ajax');;

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    self.setDriverList(data.driver);

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;

                $(document).on('click', '.btn-download', function(e) {
                    e.preventDefault();

                    var fileUrl = $(this).attr('href'),
                        infoArr = fileUrl.split('?'),
                        url = infoArr[0],
                        param = infoArr[1] + '&check="R"';

                    lgkorUI.requestAjaxData(url, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            location.href = fileUrl + '&check=true';
                        }
                    });  
                });

                self.manualSec.find('.btn-moreview').on('click', function() {
                    var param = $.extend({}, defaultParam, {
                        page: parseInt($('#page').val()) + 1
                    });

                    self.searchManualList(param);
                });

                self.driverSec.find('#os').on('change', function() {
                    var param = $.extend({}, defaultParam, {
                        os: $('#os').val(),
                        driver: $('#driver').val(),
                        page: 1
                    });
                    
                    self.searchDriverList(param);
                });
                self.driverSec.find('#driver').on('change', function() {
                    var param = $.extend({}, defaultParam, {
                        os: $('#os').val(),
                        driver: $('#driver').val(),
                        page: 1
                    });

                    self.searchDriverList(param);

                    if (val) {
                        self.driverSec.find('.tabs-wrap').hide();
                    } else {
                        self.driverSec.find('.tabs-wrap').show();
                        self.driverSec.find('.tabs-wrap').vcTab('select', 0);
                    }
                });
                self.driverSec.find('.tabs-wrap').on('tabchange', function(e, data) {
                    var param = $.extend({}, defaultParam, {
                        os: $('#os').val(),
                        driver: $(data.button).data('value'),
                        page: 1
                    });

                    self.searchDriverList(param);
                });

                self.driverSec.find('.pagination').on('pageClick', function(e) {
                    var param = $.extend({}, defaultParam, {
                        os: $('#os').val(),
                        driver: $('#driver').val(),
                        page: e.page
                    });

                    self.searchDriverList(param);
                });

                self.driverSec.find('.driver-list-wrap').on('click', '.btn-info', function() {
                    var ajaxUrl = $(this).data('href'),
                        param = $.extend({}, defaultParam, {
                            cSeq: $(this).data('cseq')
                        });

                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                        $('#fileDetailPopup').html(result).vcModal();
                        $('#fileDetailPopup').on('click', '.btn-more', function() {
                            var $list = $(this).parent();
        
                            if ($list.hasClass('on')) {
                                $list.removeClass('on');
                            } else {
                                $list.addClass('on');
                            }
                        });
                    }, null, "html");
                });
            }
        }

        download.initialize();
    });
})();