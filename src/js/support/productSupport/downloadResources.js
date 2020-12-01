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
                    '<a href="{{file[i].src}}" class="btn border size"><span>{{file[i].type}}</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>';
    var driverListTemplate = 
        '<li>' +
            '<div class="head">' +
                '<div class="file-box">' +
                    '<p class="tit"><button type="button" class="" data-href="#fileDetailPopup" data-control="modal">{{os}} {{title}}</button></p>' +
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
                '<ul class="file-list">' +
                    '{{# for (var i = 0; i < prevVersion.length; i++) { #}}' +
                    '<li>' +
                        '<div class="file-box">' +
                            '<p class="tit"><button type="button" class="" data-href="#fileDetailPopup" data-control="modal">{{os}} {{title}}</button></p>' +
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


    $(window).ready(function() {
        var download = {
            initialize: function() {
                var _self = this;

                _self.manualSec = $('.manual-section');
                _self.driverSec = $('.driver-section');

                _self.bindEvent();
                _self.searchList();
            },
            setManualList: function(list) {
                var _self = this;
                var listArr = list.listData instanceof Array ? list.listData : [];
                var html = "";

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template(manualListTemplate, item);
                    });
                    
                    _self.manualSec.find('.manual-list').append(html).show();
                    _self.manualSec.find('.no-data').hide();

                    if (list.listPage.view == 'Y') {
                        _self.manualSec.find('.btn-wrap').show();
                    } else {
                        _self.manualSec.find('.btn-wrap').hide();
                    }
                } else {
                    _self.driverSec.find('.manual-list').html('').hide();
                    _self.driverSec.find('.no-data').show();
                }
            },
            setDriverList: function(list) {
                var _self = this;
                var listArr = list.listData instanceof Array ? list.listData : [];
                var html = "";
            
                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template(driverListTemplate, item);
                    });
                    _self.driverSec.find('.file-list').html(html).show();
                    _self.driverSec.find('.pagination').show();
                    _self.driverSec.find('.pagination').pagination('update', list.listPage);
                    _self.driverSec.find('.no-data').hide();
                } else {
                    _self.driverSec.find('.file-list').html('').hide();
                    _self.driverSec.find('.pagination').hide();
                    _self.driverSec.find('.no-data').show();
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
            searchList: function(formData) {
                var _self = this;
                var ajaxUrl = '/lg5-common/data-ajax/support/downloadList.json';

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    _self.setManualList(data.manual);
                    _self.setDriverList(data.driver);
                    _self.setOsOption(data.driver.osOption);
                    _self.setDriverOption(data.driver.driverOption);
                    _self.setDriverType(data.driver.driver);

                    lgkorUI.hideLoading();
                });
            },
            searchManualList: function(formData) {
                var _self = this;
                var ajaxUrl = '/lg5-common/data-ajax/support/downloadList.json';

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    _self.setManualList(data.manual);

                    lgkorUI.hideLoading();
                });
            },
            searchDriverList: function(formData) {
                var _self = this;
                var ajaxUrl = '/lg5-common/data-ajax/support/downloadList.json';

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    var data = result.data;
    
                    _self.setDriverList(data.driver);

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var _self = this;

                _self.manualSec.find('.btn-more').on('click', function() {
                    var param = {};

                    _self.searchManualList(param);
                });

                _self.driverSec.find('#os').on('change', function() {
                    var param = {};

                    _self.searchDriverList(param);
                });
                _self.driverSec.find('#driver').on('change', function() {
                    var param = {};
                    var val = $(this).val();

                    _self.searchDriverList(param);

                    if (val) {
                        _self.driverSec.find('.tabs-wrap').hide();
                    } else {
                        _self.driverSec.find('.tabs-wrap').show();
                        _self.driverSec.find('.tabs-wrap').vcTab('select', 0);
                    }
                });
                _self.driverSec.find('.tabs-wrap').on('tabchange', function() {
                    var param = {};

                    _self.searchDriverList(param);
                });
                _self.driverSec.find('.pagination').on('pageClick', function(e) {
                    var param = {};

                    _self.searchDriverList(param);
                });

                $(document).on('click', '.btn-more', function() {
                    var $list = $(this).parent();

                    if ($list.hasClass('on')) {
                        $list.removeClass('on');
                    } else {
                        $list.addClass('on');
                    }
                });
            }
        }

        download.initialize();
    });
})();