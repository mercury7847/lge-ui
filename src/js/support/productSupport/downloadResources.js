(function() {
    
    var manualListTemplate = 
        '<li {{#if typeof seq != "undefined"}}data-seq="{{seq}}"{{/if}} {{#if typeof language_list != "undefined"}}data-language="{{language_list}}"{{/if}} {{#if typeof date != "undefined"}}data-date="{{date}}"{{/if}} {{#if typeof fileId != "undefined"}}data-file-id="{{fileId}}"{{/if}}>' +
            '<p class="tit">{{type}}</p>' +
            '<p class="desc">{{title}}</p>' +
            '<div class="info-wrap">' +
                '{{# if (typeof language != "undefined" || typeof date != "undefined" || typeof os != "undefined" || language != "" || date !="" || os != "") { #}}' +
                '<ul class="options">' +
                    '{{# if (typeof language != "undefined" || language != "") { #}}' +
                    '<li>{{language}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof date != "undefined" || date != "") { #}}' +
                    '<li>{{date}}</li>' +
                    '{{# } #}}' +
                    // start 210621 BTOCSITE-1902 사용설명서의 OS 정보 노출 요청 추가
                    '{{# if (os != "") { #}}' +
                    '<li>OS</li>' +
                    '{{# } #}}' +
                    '{{# if (os != "") { #}}' +
                    '<li>{{os}}</li>' +
                    '{{# } #}}' +
                    // end 210621 BTOCSITE-1902 사용설명서의 OS 정보 노출 요청 추가
                ' </ul>' +
                '{{# } #}}' +
                '<div class="btn-wrap">' +
                    '{{# for (var i = 0; i < file.length; i++) { #}}' +
                    '<a href="{{file[i].src}}" class="btn border size btn-download" data-type="{{file[i].type}}"><span>{{file[i].type}}</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>';
    var driverListTemplate = 
        '{{#each (item, index) in listData}}' +
        '<li>' +
            '{{# if (typeof item.detailUrl != "undefined" && item.detailUrl) { #}}' +
            '<p class="tit"><button type="button" class="btn-info" data-href="{{item.detailUrl}}" data-file-id="{{item.fileId}}" data-cseq="{{item.cSeq}}" data-os="{{item.os}}" title="상세내용 보기">{{#if item.os}}[{{item.os}}] {{/if}}{{item.title}}</button></p>' +
            '{{# } else { #}}' +
                '{{# if (typeof item.os == "string" && item.os) { #}}' +
                '<p class="tit">[{{item.os}}] {{item.title}}</p>' +
                '{{# } else { #}}' +
                '<p class="tit">{{item.title}}</p>' +
                '{{# } #}}' +
            '{{# } #}}' +
            '<div class="info-wrap">' +
                '{{# if (typeof item.category != "undefined" || typeof item.date != "undefined") { #}}' +
                '<ul class="options">' +
                    '{{# if (typeof item.category != "undefined") { #}}' +
                    '<li>{{item.category}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof item.date != "undefined") { #}}' +
                    '<li>{{item.date}}</li>' +
                    '{{# } #}}' +
                ' </ul>' +
                '{{# } #}}' +
                '<div class="btn-wrap">' +
                    '{{# if(!vcui.detect.isMobileDevice) { #}}' +
                    '<a href="{{item.file.src}}" class="btn border size btn-download"><span>다운로드 {{#if item.file.size}}{{item.file.size}}{{/if}}{{#if item.file.os}}{{item.file.os}}{{/if}}</span></a>' +
                    '{{# } else { #}}' +
                    '<a href="{{item.file.src}}" class="btn border size btn-download"><span>이메일 보내기</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>' +
        '{{/each}}';
            
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
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
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

    var detect = vcui.detect;
    
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

            vcui.require(['ui/validation', 'support/common/searchModel.min'], function () {
                if (detect.isMobileDevice) {
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
                }

                self.setting();
                self.bindEvent();

                if (!self.isPSP) {
                    self.$cont.vcSearchModel({model:self.param});
                } else {
                    $.extend(self.manualPara, {
                        category:      $('#category').val(),
                        categoryNm:    $('#categoryNm').val(), 
                        subCategory:   $('#subCategory').val(),
                        subCategoryNm: $('#subCategoryNm').val(), 
                        modelCode:     $('#modelCode').val(),
                        productCode:   $('#productCode').val()
                    });
                    $.extend(self.driverParam, {
                        category:      $('#category').val(),
                        categoryNm:    $('#categoryNm').val(), 
                        subCategory:   $('#subCategory').val(),
                        subCategoryNm: $('#subCategoryNm').val(), 
                        modelCode:     $('#modelCode').val(),
                        productCode:   $('#productCode').val()
                    });
                }

                self.$manualPagination.data('page', 1);
                self.$driverPagination.pagination();
            });
        },
        setting: function() {
            var self = this;
            var data = $.extend({}, self.options);

            // 옵션
            self.resultUrl = self.$searchModelWrap.data('resultUrl');
            self.manualUrl = self.$manualSec.data('manualUrl');
            self.driverUrl = self.$driverSec.data('driverUrl');
            self.isPSP = self.$cont.hasClass('psp');
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
            var $listWrap  = self.$manualSec.find('.download-list-wrap'),
                $list = $listWrap.find('.download-list'),
                $noData = self.$manualSec.find('.no-data');
            var listArr = data.listData instanceof Array ? data.listData : [];
                page = data.listPage,
                html = "";

            self.$manualCount.html(page.totalCount);

            if (listArr.length) {
                listArr.forEach(function(item) {
                    html += vcui.template(manualListTemplate, item);
                });
                $list.append(html);
                $listWrap.show();
                $noData.hide();
            } else {
                $listWrap.hide();
                $list.empty();
                $noData.show();
            }

            self.$manualPagination.data('page', page.page);
            // self.$manualPagination[page.view == 'Y' ? 'show': 'hide']();
            
            if(page.view=='Y'){
                self.$manualPagination.css('display','block');
            }else{
                self.$manualPagination.css('display','none');
            }
        },
        setDriverList: function(data) {
            var self = this;
            var $listWrap = self.$driverSec.find('.download-list-wrap'),
                $list = $listWrap.find('.download-list'),
                $noData = self.$driverSec.find('.no-data');
            var listArr = data.listData instanceof Array ? data.listData : [],
                page = data.listPage,
                html = "";

            self.$driverCount.html(page.totalCount);
        
            if (listArr.length) {
                html = vcui.template(driverListTemplate, data);
                $list.html(html);
                $listWrap.show();
                $list.find('>li').each(function(i) {
                    var $this = $(this);
                    for (var key in listArr[i]) {
                        if (key == 'file') {
                            if (listArr[i][key].os) $this.data('os', listArr[i][key].os);    
                            continue;
                        }
                        $this.data(key.toString(), listArr[i][key]);
                    }
                });
                $noData.hide();
                self.$driverPagination.show();
                self.$driverPagination.pagination('update', page);
            } else {
                $listWrap.hide();
                $list.html('');
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
            
            if (data) {
                self.$surveyWrap.find('.point').html(model);
                self.$surveyPopup.find('.model').html(model);
            
                for (var key in data) {
                    self.$surveyPopup.find('[name='+key+']').length && self.$surveyPopup.find('[name='+key+']').val(data[key]);
                }
            }
        },
        searchAllList: function() {
            var self = this;
            var param = $.extend({}, self.param);
            lgkorUI.setAcecounter('www.lge.co.kr/acecount/driverList.do', '/acecount/driverListm.do');            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.resultUrl, param, function(result){
                var data = result.data;

                if (result.status == 'fail') {
                    var data = {
                        manual: {
                            listPage: {
                                totalCount: 0
                            }
                        },
                        driver: {
                            osOption: '',
                            listPage: {
                                totalCount: 0
                            }
                        },
                        satisfy: ''
                    }
                    self.$surveyWrap.hide();
                } else {
                    self.$surveyWrap.show();
                }

                self.setManualList(data.manual);
                self.setDriverList(data.driver);
                self.setOsActive(data.driver.osOption)

                self.$cont.vcSearchModel('updateSummary', {
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

                lgkorUI.hideLoading();
            }, 'POST', 'json' ,true);
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

                self.$manualSec.find('.download-list').empty();
                self.$manualPagination.data('page', 1);

                self.$driverSec.find('.download-list').empty();
                self.$driverSec.find('.old-keyword').remove();
                self.$driverKeyword.val('').trigger('update');

                otherService.reset();
                relatedInfo.reset();
                
                bannerToggle();
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data) {    
                $.extend(self.param, data);
                $.extend(self.manualParam, data);
                $.extend(self.driverParam, data);

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
                var $keywordBox = $(this).closest('.keyword-box');
                var historyBox = $('<div class="search-history" />');
                var $history = $('.search-history');
                var oldSearch = '<div class="old-keyword">“<span class="color-3">' + keyword + '</span>” 검색 결과<button class="btn-clear-old"><span class="blind">삭제</span></button></div>';

                if (keyword.length) { 
                    self.driverParam = $.extend(self.driverParam, {
                        keyword: self.$driverKeyword.val(),
                        page: 1
                    });
                    self.searchDriverList();
                    $error.hide();

                    if( $history.length ) {
                        $history.html(oldSearch);
                    } else {
                        historyBox.append(oldSearch)
                        $keywordBox.after(historyBox);
                    }

                } else {
                    $error.show();
                }
            });

            $(document).on('click', '.search-history .btn-clear-old', function(e){
                var $this = $(this);
                var $oldKeyword = $this.closest('.old-keyword');

                $oldKeyword.remove();

                self.$driverKeyword.val('').trigger('update');
                self.driverParam = $.extend(self.driverParam, {
                    keyword: "",
                    page: 1
                });
                self.searchDriverList();
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
                        fileId: $this.data('fileId'),
                        cSeq: $this.data('cseq'),
                        os: $this.data('os')
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

            self.$fileDetailPopup.on('click', '.btn-download', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveDownloadClick.do', '/acecount/driveDownloadClickm.do');
            });

            self.$manualSec.on('click', '.btn-download', function() {
                var fileType = $(this).data('type').toLowerCase();
                
                if (fileType == 'pdf') {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveManualPDF.do', '/acecount/driveManualPDFm.do');
                } else  if (fileType == 'zip') {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveManualZIP.do', '/acecount/driveManualZIPm.do');
                } else if (fileType == 'html') {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveManualHTML.do', '/acecount/driveManualHTMLm.do');
                } else if (fileType == 'chm') {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveManualCHM.do', '/acecount/driveManualCHMm.do');
                }
            });

            // 다운로드 버튼 클릭
            self.$driverSec.on('click', '.btn-download', function(e){
                var $this = $(this);
                var fileUrl = $this.attr('href');
                var $item = $this.closest('li');
                var data = $item.data();

                if (detect.isMobileDevice) {
                    e.preventDefault();
                    for(var key in data) {
                        $('#fileSendToEmail').data(key, data[key]);
                    }
                    $('#fileSendToEmail').data('fileUrl', fileUrl).vcModal();
                } else {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/driveDownloadClick.do', '/acecount/driveDownloadClickm.do');
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
                        date: $popup.data('date') || $popup.data('issue_date') || ''
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

            // BTOCSITE-13601 모델명 확인 방법 > 이미지 확대 추가
            var $imgView = $('.btn-img-view');
            $('#select2').on('change', function(){
    
                // 이미지가 없는 경우 no-img 삭제
                if(!(lgkorUI.NO_IMAGE_MODEL_NAME != $imgView.find('img').attr('src'))) {
                    $imgView.find('img').removeClass('no-img');
                }
            })

            // BTOCSITE-13601 모델명 확인 방법 > 이미지 확대 추가
            $imgView.on('click', function(e) {
                e.preventDefault();
            
                if($(this).find('img').hasClass('no-img')) return;
    
                var domain=location.origin;
                var agent = navigator.userAgent;
                var imgUrl=domain + $(this).attr('href');
                var imgAlt = $(this).find('img').attr('alt');
                if(!vcui.detect.isMobileDevice){
                    window.open(imgUrl, '', '');
                    return
                }

                var currOption = $('#select2 option:selected');
                var popTitle = currOption.hasClass('placeholder') ? '모델명 확인 방법' : currOption.text();
                var $zoomPopup = $('#imgZoomPopup');
                var $zoomImg = $('#imgZoomPopup img');
                $zoomImg.attr('src', imgUrl);
                $zoomImg.attr('alt', imgAlt);

                $zoomPopup.find('.tit').html('<span>'+popTitle+'</span>');
                $zoomPopup.vcModal('open');
            })
    
        }
    }

    $(window).ready(function() {
        download.initialize();
    });
})();