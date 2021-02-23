(function() {
    
    var manualListTemplate = 
        '<li>' +
            '<p class="tit">{{type}}</p>' +
            '<p class="desc">{{title}}</p>' +
            '<div class="info-wrap">' +
                '{{# if (typeof language != "undefined" || typeof date != "undefined") { #}}' +
                '<ul class="options">' +
                    '{{# if (typeof language != "undefined") { #}}' +
                    '<li>{{language}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof date != "undefined") { #}}' +
                    '<li>{{date}}</li>' +
                    '{{# } #}}' +
                ' </ul>' +
                '{{# } #}}' +
                '<div class="btn-wrap">' +
                    '{{# for (var i = 0; i < file.length; i++) { #}}' +
                    '<a href="{{file[i].src}}" class="btn border size btn-download"><span>{{file[i].type}}</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>';
    var driverListTemplate = 
        '<li>' +
            '<p class="tit"><button type="button" class="btn-info" data-href="{{detailUrl}}" data-cseq="{{cSeq}}">{{#if os}}{{os}} {{/if}}{{#if title}}{{title}}{{/if}}</button></p>' +
            '<div class="info-wrap">' +
                '{{# if (typeof category != "undefined" || typeof date != "undefined") { #}}' +
                '<ul class="options">' +
                    '{{# if (typeof category != "undefined") { #}}' +
                    '<li>{{category}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof date != "undefined") { #}}' +
                    '<li>{{date}}</li>' +
                    '{{# } #}}' +
                ' </ul>' +
                '{{# } #}}' +
                '<div class="btn-wrap">' +
                    '<a href="{{file.src}}" class="btn border size btn-download"><span>다운로드 {{#if file.size}}{{file.size}}{{/if}}{{#if file.os}}{{file.os}}{{/if}}</span></a>' +
                '</div>' +
            '</div>' +
        '</li>';
        
    var otherService = {
        template : 
            '<li>' +
                '<a href="{{url}}">' +
                    '<div class="icon"><img src="{{imgUrl}}" alt=""></div>' + 
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
            var data = data.serviceMenu;
            var serviceList = data instanceof Array ? data : [];
            var htmlData = "";

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
        el : {
            wrap : $('.related-info'),
            slider : $('.related-info .info-slider')
        },
        slideActiveClass : "is-active",
        slideConfig : {
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
        },
        initialize : function(){
            var self = this;
            vcui.require(['ui/carousel'], function () {    
                // LG제품에 관련된 정보를 확인하세요!
                if( !self.el.slider.hasClass(self.slideActiveClass) ) {
                    self.el.slider.not('.is-active').vcCarousel(self.slideConfig);
                    self.el.slider.addClass(self.slideActiveClass);
                } else {
                    var activeSlider = self.el.slider.filter('.' + self.slideActiveClass);
                    activeSlider.vcCarousel('update');
                    activeSlider.vcCarousel('reinit');
                }
                self.el.wrap.show();
            });
        },
        reset : function(){
            this.el.wrap.hide();
        }
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
    
    var download = {
        options: {
            category: '',
            categoryNm: '',
            subCategory: '',
            subCategoryNm: '', 
            modelCode: '', 
            productCode: '',
            page:1
        },
        initialize: function() {
            var self = this;

            self.$cont = $('.contents');
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myModelWrap = self.$cont.find('.my-product-wrap');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');

            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$stepArea.find('#stepModel');
            self.$stepInput = self.$stepArea.find('#stepInput');

            self.$manualSec = self.$cont.find('.manual-section');
            self.$manualCount = self.$manualSec.find('#manualCount');
            self.$manualPagination = self.$manualSec.find('.btn-moreview');
            self.$driverSec = self.$cont.find('.driver-section');
            self.$driverCount = self.$driverSec.find('#driverCount');
            self.$driverPagination = self.$driverSec.find('.pagination');
            self.$driverKeyword = self.$driverSec.find('#driverKeyword');
            self.$driverBtn = self.$driverSec.find('.btn-search');
            
            self.$fileDetailPopup = $('#fileDetailPopup');

            self.setting();
            self.bindEvent();

            self.$cont.commonModel({
                register: {},
                selected: self.param
            });

            self.$manualPagination.data('page', 1);
            self.$driverPagination.pagination();
        },
        setting: function() {
            var self = this;
            var url = location.search;
            var data = $.extend({}, self.options);

            // 옵션
            self.resultUrl = self.$searchModelWrap.data('resultUrl');
            self.manualUrl = self.$manualSec.data('manualUrl');
            self.driverUrl = self.$driverSec.data('driverUrl');
            
            if (url.indexOf("?") > -1) {
                var search = url.substring(1);
                var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

                for (var key in searchObj) {
                    data[key] = decodeURIComponent(searchObj[key]);
                    if (key == 'mktModelCd') data['modelCode'] = searchObj.mktModelCd;
                }

                data.category = $('#category').val();
                data.categoryNm = $('#categoryNm').val();
                data.subCategory = $('#subCategory').val();
                data.subCategoryNm = $('#subCategoryNm').val();
            }

            self.isLogin = lgkorUI.isLogin;
            self.param = data;
            self.manualParam = data;
            self.driverParam = $.extend(data, {
                keyword: ''
            });
        },
        setManualList: function(data) {
            var self = this;
            var $list = self.$manualSec.find('.download-list'),
                $noData = self.$manualSec.find('.no-data');
            var listArr = data.listData instanceof Array ? data.listData : [];
                page = data.listPage,
                html = "";

            self.$manualCount.html(page.totalCount);

            if (listArr.length) {
                listArr.forEach(function(item) {
                    html += vcui.template(manualListTemplate, item);
                });
                $list.append(html).show();
                $noData.hide();
            } else {
                $list.hide().empty();
                $noData.show();
            }

            self.$manualPagination.data('page', page.page);
            self.$manualPagination[page.view == 'Y' ? 'show': 'hide']();
        },
        setDriverList: function(data) {
            var self = this;
            var $list = self.$driverSec.find('.download-list'),
                $noData = self.$driverSec.find('.no-data');
            var listArr = data.listData instanceof Array ? data.listData : [],
                page = data.listPage,
                html = "";

            self.$driverCount.html(page.totalCount);
        
            if (listArr.length) {
                listArr.forEach(function(item) {
                    html += vcui.template(driverListTemplate, item);
                });
                $list.html(html).show();
                $noData.hide();
                self.$driverPagination.show();
                self.$driverPagination.pagination('update', page);
            } else {
                $list.html('').hide();
                $noData.show();
                self.$driverPagination.hide();
            }

            self.$driverKeyword.val(self.driverParam.keyword);
        },
        setOsOption: function(data) {
            var self = this;
            var $select = self.$driverSec.find('#os');
            var listArr = data instanceof Array ? data : [],
                html = "";

            if (listArr.length) {
                listArr.forEach(function(item) {
                    html += vcui.template('<option value="{{code}}">{{codeName}}</option>', item);
                });
            } else {
                html = '<option value="">없음</option>';
                $select.vcSelectbox('disabled');
            }
            
            $select.html(html);
            $select.vcSelectbox('update');
        },
        setOsActive: function(os) {
            var self = this;
            var $formWrap = self.$driverSec.find('.form-wrap');
            var subCategory = self.param.subCategory;

            if (subCategory == "CT50019564" || subCategory == "CT50019585" ) {
                self.setOsOption(os);
                $formWrap.show();
            } else {
                $formWrap.hide();
            }
        },
        searchAllList: function() {
            var self = this;
            var param = $.extend({}, self.param);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.resultUrl, param, function(result){
                var data = result.data;

                self.setManualList(data.manual);
                self.setDriverList(data.driver);
                self.setOsActive(data.driver.osOption)

                self.$cont.commonModel('updateSummary', {
                    product: [param.categoryNm, param.subCategoryNm, param.modelCode],
                    reset: 'product'
                });
                
                self.isLogin && self.$myModelWrap.hide();
                
                //업데이트 센터 바로가기 배너
                bannerToggle(param.subCategory)

                //하단 다른 서비스 추천
                otherService.initialize(data);

                //하단 관련 메뉴
                relatedInfo.initialize(data);

                //만족도 평가 박스 모델코드 삽입
                $('.survey-banner-wrap .model').html(param.modelCode);

                self.$cont.commonModel('next', self.$stepInput);
                self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                });
                lgkorUI.hideLoading();
            });
        },
        searchManualList: function() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.manualUrl, self.manualParam, function(result){
                self.setManualList(result.data.manual);
                lgkorUI.hideLoading();
            });
        },
        searchDriverList: function() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.driverUrl, self.driverParam, function(result){
                self.setDriverList(result.data.driver);
                lgkorUI.hideLoading();
            });
        },
        bindEvent: function() {
            var self = this;
            
            //모델 재설정 : 초기화
            self.$cont.on('reset', function(e) {
                var data = $.extend({}, self.options);

                self.param = data;

                self.isLogin && self.$myModelWrap.show();
                self.$cont.commonModel('next', self.$stepModel);
                
                self.$manualSec.find('.download-list').empty();
                self.$manualPagination.data('page', 1);

                self.$driverSec.find('.download-list').empty();
                self.$driverKeyword.val('');

                otherService.reset();
                relatedInfo.reset();
                
                bannerToggle();
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data) {    
                var param = {
                    category: data.category,
                    categoryNm: data.categoryName,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryName,
                    modelCode: data.modelCode,
                    productCode: data.productCode
                };

                self.param = $.extend(self.param, param);
                self.manualParam = $.extend(self.manualParam, param);
                self.driverParam = $.extend(self.driverParam, param);

                self.searchAllList();
            });

            self.$manualPagination.on('click', function() {
                self.manualParam = $.extend(self.manualParam, {
                    page: parseInt($(this).data('page')) + 1
                });

                self.searchManualList();
            });

            //키워드 입력후 엔터시 검색
            self.$driverKeyword.on('keyup', function(e){
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$driverBtn.trigger('click');
                }
            }).on('input', function() {
                var $error = self.$driverSec.find('.search-error');
                var keyword = $(this).val().trim();

                keyword.length && $error.hide(); 
            });

            //키워드 입력후 검색버튼 클릭시 검색
            self.$driverBtn.on('click', function(e) {
                var $error = self.$driverSec.find('.search-error');
                var keyword = self.$driverKeyword.val().trim();

                if (keyword.length) { 
                    self.driverParam = $.extend(self.driverParam, {
                        keyword: self.$driverKeyword.val(),
                        page: 1
                    });
                    self.searchDriverList();
                    $error.hide();
                } else {
                    $error.show();
                }
            });

            self.$driverSec.find('#os').on('change', function() {
                self.driverParam = $.extend(self.driverParam, {
                    os : $('#os').val(),
                    page: 1
                });
                self.searchDriverList();
            });
            self.$driverSec.find('.pagination').on('pageClick', function(e) {
                self.driverParam = $.extend(self.driverParam, {
                    page: e.page
                });

                self.searchDriverList();
            });
            
            self.$driverSec.on('click', '.btn-info', function() {
                var $this = $(this);
                var url = $this.data('href'),
                    param = $.extend(self.param, {
                        cSeq: $this.data('cseq')
                    });

                lgkorUI.requestAjaxData(url, param, function(result){
                    self.$fileDetailPopup.html(result).vcModal();
                }, null, "html", true);
            });

            self.$fileDetailPopup.on('click', '.btn-more', function() {
                var $list = $(this).parent();

                if ($list.hasClass('on')) {
                    $list.removeClass('on');
                } else {
                    $list.addClass('on');
                }
            });
            
        }
    }

    $(window).ready(function() {
        download.initialize();
    });
})();