(function() {
    
    var manualListTemplate = 
        '<li>' +
            '<p class="tit">{{type}}</p>' +
            '<p class="desc">{{title}}</p>' +
            '<div class="info-wrap">' +
                '<ul class="options">' +
                    '<li>{{date}}</li>' +
                    '<li>{{language}}</li>' +
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
                    '</div>' +
                '</div>' +
            '</div>' +
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

    var otherService = {
        template : 
            '<li class="{{currentClass}}">' +
                '<a href="{{url}}">' +
                    '<strong class="tit">{{name}}</strong>' +
                '</a>' +
            '</li>',
        el : {
            wrap : $('.service-menu'),
            title : $('.service-menu .banner-tit'),
            list : $('.service-menu .service-list')
        },
        initialize : function(data){
            var self = this;
    
            this.setMenuList(data);
        },
        reset : function(){
            var self = this;
            self.el.list.html('');
            self.el.wrap.hide();
        },
        setMenuList: function(data) {
            var self = this;
            var data = data.otherService;
            var serviceList = data.serviceList instanceof Array ? data.serviceList : [];
            var htmlData = "";
            
            if( data.title.length ) {
                self.el.title.html(data.title)
            }
            if( serviceList.length ) {
                serviceList.forEach(function(item){
                    htmlData += vcui.template(self.template, item);
                });
                self.el.list.html(htmlData);
                self.el.wrap.show();
            } else {
                self.reset();
            }
        },
    };

    var relatedInfo = {
        template : 
            '{{#each item in infoList}}' + 
                '<div class="item">' + 
                    '<a href="{{item.url}}" class="item-inner">' + 
                        '<div class="img">' + 
                            '<img src="{{item.imgUrl}}" alt="{{item.imgAlt}}">' + 
                        '</div>' + 
                        '<p class="txt">{{item.title}}</p>' + 
                    '</a>' + 
                '</div>' + 
            '{{/each}}',
        el : {
            wrap : $('.related-info'),
            title : $('.related-info .banner-tit'),
            list : $('.related-info .slide-track'),
            slider : $('.related-info .info-slider')
        },
        initialize : function(data){
            var self = this;
    
            self.setSlideContent(data);
            self.sliderInit();
        },
        reset : function(){
            var self = this;
            self.el.list.html('');
            self.el.wrap.hide();
        },
        sliderInit : function(){
            var self = this;
            vcui.require(['ui/carousel'], function () {    
                // LG제품에 관련된 정보를 확인하세요!
                if( !self.el.slider.hasClass('is-active') ) {
                    console.log('slider init')
                    self.el.slider.not('.is-active').vcCarousel({
                        infinite: false,
                        autoplay: false,
                        slidesToScroll: 3,
                        slidesToShow: 3,
                        responsive: [
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToScroll: 3,
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    arrows: false,
                                    slidesToScroll: 1,
                                    slidesToShow: 1,
                                    variableWidth: true
                                }
                            },
                            {
                                breakpoint: 20000,
                                settings: {
                                    slidesToScroll: 3,
                                    slidesToShow: 3
                                }
                            }
                        ]
                    });
                    self.el.slider.addClass('is-active');
                } else {
                    console.log('slider update reinit')
                    self.el.slider.filter('.is-active').vcCarousel('update');
                    self.el.slider.filter('.is-active').vcCarousel('reinit');
                }
            });
        },
        setSlideContent: function(data) {
            var self = this;
            var data = data.relatedInfo;
            var infoList = data.infoList instanceof Array ? data.infoList : [];
            var htmlData = "";

            if( data.title.length ) {
                self.el.title.html(data.title);
            }
            
            if( infoList.length ) {
                htmlData += vcui.template(self.template, data);
                self.el.list.html(htmlData);
                self.el.wrap.show();
            } else {
                self.reset();
            }
        },
    }

    //배너 토글
    function bannerToggle(modelType) {
        var $banner = $('.banner-wrap.toggle-banner');

        if( modelType == undefined) {
            $banner.removeClass('is-active');
        }

        if( modelType == "CT50019564" || modelType == "CT50019585") {
            $banner.addClass('is-active');
        } else {
            $banner.removeClass('is-active');
        }
    }

    //드라이버 OS 분류 셀렉트 옵션 값 업데이트
    function optionUpdate(target, option){
        var $target = $(target);
        var _options = "";

        if( option.length ) {
            option.forEach(function(v, i){
                _options += '<option value="' + v.code + '">' + v.codeName + '<' + '/option>';
            })
            console.log(_options);
            $target.html(_options);
        }
        $target.vcSelectbox('update');
    }
    

    

    $(window).ready(function() {
        //테스트

        var download = {
            initialize: function() {
                var self = this;

                self.$cont = $('.contents');
                self.$productBar = self.$cont.find('.prod-selected-wrap');
                self.$myProductWarp = self.$cont.find('.my-product-wrap');
                self.$submitForm = self.$cont.find('#submitForm');
                self.$stepArea = self.$cont.find('.step-area');
                self.$completeBtns = self.$cont.find('.btn-group');

                self.$stepModel = self.$cont.find('#stepModel');

                self.$stepInput = self.$cont.find('#stepInput');

                self.manualSec = $('.manual-section');
                self.driverSec = $('.driver-section');
                
                // self.driverSec.find('.ui_list_accordion').vcAccordion({
                //     toggleSelector: '>.head .ui_accord_toggle'
                // });
                self.driverSec.find('.pagination').pagination();

                defaultParam = getObject($('#submitForm').serialize());

                $('.contents').commonModel({
                    register:{}
                })

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

                $('.contents').on('reset', function(e) {
                    self.$myProductWarp.show();
                    self.$cont.commonModel('next', self.$stepModel);
                    otherService.reset();
                    relatedInfo.reset();
                    $('#driverKeyword').val('');
                    bannerToggle();
                });

                // 모델 선택 후 이벤트
                $('.contents').on('complete', function(e, data, url) {    
                    var param = {
                        modelCode: data.modelCode,
                        serviceType: $('#serviceType').val(),
                        category: data.category,
                        subCategory: data.subCategory
                    };
                    defaultParam = param;

                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var resultData = result.data;

                        $('.contents').commonModel('updateSummary', {
                            product: [data.categoryName, data.subCategoryName, data.modelCode],
                            reset: 'product'
                        });
                        
                        self.$myProductWarp.hide();
                        
                        //업데이트 센터 바로가기 배너
                        bannerToggle(data.subCategory)

                        //하단 다른 서비스 추천
                        otherService.initialize(resultData);

                        //하단 관련 메뉴
                        relatedInfo.initialize(resultData);

                        //만족도 평가 박스 모델코드 삽입
                        $('.survey-banner-wrap .model').html(data.modelCode);

                        optionUpdate('#os', resultData.driver.osOption);

                        

                        $('.contents').commonModel('next', self.$stepInput);
                        $('.contents').commonModel('focus', self.$productBar, function() {
                            self.$productBar.vcSticky();
                        });
                    });

                    
                });

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
                        keyword: $('#driverKeyword').val(),
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
                
                //드라이버 다운로드 키워드 검색
                function downloadSearchKeyword(){
                    var param = $.extend({}, defaultParam, {
                        os : $('#os').val(),
                        keyword: $('#driverKeyword').val(),
                        page: 1
                    });
                    self.searchDriverList(param);
                }

                //키워드 입력후 엔터시 검색
                self.driverSec.find('#driverKeyword').on('keyup', function(e){
                    if ( e.keyCode == 13 ) {
                        e.preventDefault();
                        downloadSearchKeyword();
                    }
                })

                //키워드 입력후 검색버튼 클릭시 검색
                $(document).on('click', '.driver-inner-search button', function(e){
                    downloadSearchKeyword();
                });

                self.driverSec.find('.driver-list-wrap').on('click', '.btn-info', function() {
                    var ajaxUrl = $(this).data('href'),
                        param = $.extend({}, defaultParam, {
                            cSeq: $(this).data('cseq')
                        });

                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                        $('#fileDetailPopup').html(result).vcModal();
                        $('#fileDetailPopup').off('click').on('click', '.btn-more', function() {
                            var $list = $(this).parent();
        
                            if ($list.hasClass('on')) {
                                $list.removeClass('on');
                            } else {
                                $list.addClass('on');
                            }
                        });
                    }, null, "html", true);
                });

                
            }
        }

        download.initialize();
    });
})();