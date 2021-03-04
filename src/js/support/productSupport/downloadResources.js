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
            '{{# if (typeof detailUrl != "undefined" && detailUrl) { #}}' +
            '<p class="tit"><button type="button" class="btn-info" data-href="{{detailUrl}}" data-cseq="{{cSeq}}">{{#if os}}{{os}} {{/if}}{{title}}</button></p>' +
            '{{# } else { #}}' +
                '{{# if (typeof os == "string" && os) { #}}' +
                '<p class="tit">{{os}} {{title}}</p>' +
                '{{# } else { #}}' +
                '<p class="tit">{{title}}</p>' +
                '{{# } #}}' +
            '{{# } #}}' +
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
                    '{{# if(!vcui.detect.isMobileDevice) { #}}' +
                    '<a href="{{file.src}}" class="btn border size btn-download"><span>다운로드 {{#if file.size}}{{file.size}}{{/if}}{{#if file.os}}{{file.os}}{{/if}}</span></a>' +
                    '{{# } else { #}}' +
                    '<a href="{{file.src}}" class="btn border size btn-download"><span>이메일 보내기</span></a>' +
                    '{{# } #}}' +
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
        emailValidate : null,
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
            
            self.$surveyWrap = self.$cont.find('.survey-banner-wrap');

            self.$surveyPopup = $('#surveyPopup');
            self.$fileDetailPopup = $('#fileDetailPopup');

            if (vcui.detect.isMobileDevice) {
                vcui.require(['ui/validation'], function () {
                    var emailRegister = {
                        userEmail : {
                            required: true,
                            pattern : /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                            minLength: 1,
                            maxLength: 50,
                            msgTarget: '.err-block',
                            errorMsg: '이메일 주소를 입력해주세요.',
                            patternMsg: '올바른 이메일 형식이 아닙니다.',
                            validate : function(value){
                                var _pattern = new RegExp(this.pattern);
        
                                if( _pattern.test(value) == true) {
                                    if( value.split('@')[0].length <= 30 && value.split('@')[1].length <= 20) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                } else {
                                    return false;
                                }
                            }
                        }
                    }
    
                    self.emailValidate = new vcui.ui.CsValidation('#fileSendToEmail', {register:emailRegister});

                    self.setting();
                    self.bindEvent();

                    if (!self.isPSP) {
                        self.$cont.commonModel({
                            register: {},
                            selected: self.param
                        });
                    }

                    self.$manualPagination.data('page', 1);
                    self.$driverPagination.pagination();
                });
            } else {
                self.setting();
                self.bindEvent();

                if (!self.isPSP) {
                    self.$cont.commonModel({
                        register: {},
                        selected: self.param
                    });
                }

                self.$manualPagination.data('page', 1);
                self.$driverPagination.pagination();
            }

            
        },
        setting: function() {
            var self = this;
            var url = location.search;
            var data = $.extend({}, self.options);

            // 옵션
            self.resultUrl = self.$searchModelWrap.data('resultUrl');
            self.manualUrl = self.$manualSec.data('manualUrl');
            self.driverUrl = self.$driverSec.data('driverUrl');
            self.isPSP = self.$cont.hasClass('psp');
            
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
            } else {
                if (!self.isPSP) {
                    data.category = $('#category').val();
                    data.categoryNm = $('#categoryNm').val();
                    data.subCategory = $('#subCategory').val();
                    data.subCategoryNm = $('#subCategoryNm').val();
                    data.modelCode = $('#modelCode').val();
                    data.productCode = $('#productCode').val();
                }
            }

            if (self.isPSP) {
                data.category = $('#category').val();
                data.categoryNm = $('#categoryNm').val();
                data.subCategory = $('#subCategory').val();
                data.subCategoryNm = $('#subCategoryNm').val();
                data.modelCode = $('#modelCode').val();
                data.productCode = $('#productCode').val();
            }

            self.isLogin = lgkorUI.isLogin;
            self.param = $.extend({}, data);
            self.manualParam = $.extend({}, data, {
                type: 'manual'
            });
            self.driverParam = $.extend({}, data, {
                keyword: '',
                type: 'driver'
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
                $list.find('>li').each(function(i) {
                    var $this = $(this);
                    for (var key in listArr[i]) {
                        if (key == 'file') continue;
                        $this.data(key.toString(), listArr[i][key]);
                    }
                });
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
            var $listDesc = self.$driverSec.find('.download-list-wrap > .desc');
            var category = self.param.category;
            var subCategory = self.param.subCategory;

            if (subCategory == "CT50019564" || subCategory == "CT50019585" ) {
                self.setOsOption(os);
                $formWrap.show();
            } else {
                $formWrap.hide();
            }

            if (category == "CT50019096") {
                $listDesc.hide();
            } else {
                $listDesc.show();
            }
        },
        setSurvey: function(data) {
            var self = this;
            var model = self.param.modelCode;
            
            self.$surveyWrap.find('.point').html(model);
            self.$surveyPopup.find('.model').html(model);
        
            for (var key in data) {
                self.$surveyPopup.find('[name='+key+']').length && self.$surveyPopup.find('[name='+key+']').val(data[key]);
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
                self.setSurvey(data.satisfy);

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

                self.param = $.extend({}, data);
                self.manualParam = $.extend({}, data, {
                    type: 'manual'
                });
                self.driverParam = $.extend({}, data, {
                    keyword: '',
                    type: 'driver'
                });

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

            // 다운로드 버튼 클릭
            self.$driverSec.on('click', '.btn-download', function(e){
                var $this = $(this);
                var fileUrl = $this.attr('href');
                var $item = $this.closest('li');
                var data = $item.data();

                if( vcui.detect.isMobileDevice) {
                    e.preventDefault();
                    for(var key in data) {
                        $('#fileSendToEmail').data(key, data[key]);
                    }
                    $('#fileSendToEmail').data('fileUrl', fileUrl).vcModal();
                }
            })

            //이메일 주소 입력팝업 보내기 버튼 클릭시 
            $('#fileSendToEmail').on('click', '.btn-send', function(e){
                var $this = $(this);
                var $popup = $this.closest('#fileSendToEmail');
                var _url = $popup.data('ajax');
                var _fileUrl = $popup.data('fileUrl');
                
                if( self.emailValidate.validate().success ) {
                    var param = {
                        email : $popup.find('#userEmail').val(),
                        fileUrl : _fileUrl,
                        category: self.param.category,
                        categoryNm: self.param.categoryNm,
                        subCategory: self.param.subCategory,
                        subCategoryNm: self.param.subCategoryNm,
                        modelCode: self.param.modelCode,
                        title: $popup.data('title'),
                        os: $popup.data('os') || '',
                        date: $popup.data('date') || ''
                    };

                    lgkorUI.requestAjaxDataPost(_url, param, function(result){
                        var data = result.data;
                        
                        lgkorUI.alert("", {
                            title: data.resultMessage,
                            ok: function(el) {
                                $(el).vcModal('hide');
                                $('#fileSendToEmail').vcModal('hide');
                            }
                        });
                    })
                }
            });

            //이메일 주소 입력팝업 닫기버튼 클릭시 이메일주소값 초기화
            $('#fileSendToEmail').on('modalhide', function(){
                var $this = $(this);

                self.emailValidate.reset();
                $this.data('fileUrl', '');
                $this.find('#userEmail').val('');
            });
        }
    }

    $(window).ready(function() {
        download.initialize();
    });
})();