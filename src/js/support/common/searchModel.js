vcui.define('support/common/searchModel.min', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectedBarTmpl = 
        '<div class="box">' +
            '<div class="prod-info">' +
                '{{# if (typeof tit != "undefined") { #}}' +
                '<p class="tit">서비스 이용을 위해 제품을 선택해주세요.</p>' +
                '{{# } #}}' +
                '{{# if (typeof product != "undefined") { #}}' +
                    '<ul class="product">' +
                        '{{# for (var i = 0; i < product.length; i++) { #}}' +
                            '{{# if (product[i].name) { #}}' +
                                '{{# if (i == 2) { #}}' +
                                    '{{# if (!lgkorUI.isLogin) { #}}' +
                        '<li>{{product[i].name}}</li>' +
                                    '{{# } else if (product[i].isMyProduct) { #}}' +
                        '<li><span>보유</span>{{product[i].name}}</li>' +
                                    '{{# } else { #}}' +    
                        '<li>{{product[i].name}}</li>' +
                                    '{{# } #}}' + 
                                '{{# } else { #}}' +    
                        '<li>{{product[i].name}}</li>' +
                                '{{# } #}}' +    
                            '{{# } #}}' +
                        '{{# } #}}' +
                    '</ul>' +
                    '{{# if (product.length == 3 && product[2].name && lgkorUI.isLogin && !product[2].isMyProduct) { #}}' +
                    '<a href="/my-page/manage-products" class="btn-add-product"><span>보유제품 추가</span></a>' +
                    '{{# } #}}' +
                '{{# } #}}' +
            '</div>' +
            '{{# if (typeof reset != "undefined") { #}}' +
            '<div class="prod-btn">' +
                '{{# if (reset == "type") { #}}' +
                '<button type="button" class="btn size reset btn-reset">문의유형 재선택</button>' +
                '{{# } #}}' +
                '{{# if (reset == "product") { #}}' +
                '<button type="button" class="btn size reset btn-reset">제품 재선택</button>' +
                '{{# } #}}' +
                '{{# if (reset == "noProduct") { #}}' +
                '<button type="button" class="btn size reset btn-reset">제품 선택</button>' +
                '{{# } #}}' +
            '</div>' +
            '{{# } #}}' +
        '</div>';

    var modelListTmpl = 
        '<div class="slide-conts">' +
            '{{# if (modelCode != "") { #}}' +
            '<a href="#" class="item" data-cst-flag="Y" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-nm="{{categoryNm}}" data-sub-category-nm="{{subCategoryNm}}"{{#if typeof salesModelCode != "undefined"}} data-sales-model-code="{{salesModelCode}}"{{/if}}>' +
            '{{# } else { #}}' +
            '<a href="#" class="item no-model" data-cst-flag="Y" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-nm="{{categoryNm}}" data-sub-category-nm="{{subCategoryNm}}">' +
            '{{# } #}}' +
                '<div class="info">' +
                    '{{# if (modelCode != "") { #}}' +
                        '<p class="name">{{#raw name}}</p>' +
                        '<p class="category"><span>{{categoryNm}} &gt; </span>{{subCategoryNm}}</p>' +
                    '{{# } else { #}}' +
                        '<p class="name">모델명을 모르겠어요.</p>' +
                        '<p class="category"><span>건너뛰기</span></p>' +
                    '{{# } #}}' +
                '</div>' +
            '</a>' +
        '</div>';

    var myModel = [];

    var SearchModel = core.ui('SearchModel', /** @lends vcui.ui.vcSearchModel# */{
        bindjQuery: 'searchModel',
        defaults: {
            stepClass: 'step-box',
            stepActiveClass: 'active',
            page: 1,
            total: 0,
            useCookie: true,
            onlyMyModel: false,
            reset: false,
            model: {
                category: '',
                categoryNm: '전체',
                subCategory: '',
                subCategoryNm: '전체',
                modelCode: '',
                productCode: '',
                pageCode: $('#pageCode').val(),
                serviceType: $('#serviceType').val(),
                salesModelCode: $('#salesModelCode').val()
            },
            summary: {
                tit: '서비스이용을 위해 제품을 선택해 주세요.'
            },
            // BTOCSITE-3316 add :: 소형가전, IT 제품 선택시 안내 팝업 나올 카테고리 데이터 추가
            recommendVisitCenterCategoryArray : [ 'CT50019022', 'CT50019564', 'CT50019585', 'CT50019602', 'CT50019616', 'CT50019631', 'CT50019340', 'CT50019400', 'CT50019380', 'CT50019360', 'CT50019421', 'CT50019527', 'CT50019543', 'CT50019558', 'CT50019696', 'CT50019709', 'CT50019873', 'CT50019890', 'CT50019904' ]
        },
        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            }
            
            var opts = $.extend(true, {}, self.options, {
                model: {
                    category: self.$el.find('#category').val(),
                    categoryNm: self.$el.find('#categoryNm').val(),
                    subCategory: self.$el.find('#subCategory').val(),
                    subCategoryNm: self.$el.find('#subCategoryNm').val(),
                    modelCode: self.$el.find('#modelCode').val(),
                    productCode: self.$el.find('#productCode').val()
                }
            });
            //console.log(self.options);
            //console.log('self.$el', self.$el);

            // BTOCSITE-3312 add :: 출장예약페이지인지 확인
            self.isEngineerReservation = self.$el.hasClass('service-engineer');
            
            // 스텝 영역
            self.$stepBox = self.$el.find('.step-box');
            self.$stepInquiry = self.$el.find('#stepInquiryType');
            self.$stepModel = self.$el.find('#stepModel');
            self.$stepInput = self.$el.find('#stepInput');
            
            // 선택 제품 플로팅바
            self.$selectedModelBar = self.$el.find('.prod-selected-wrap');
            
            // 보유제품
            self.$myModelArea = self.$el.find('.my-product-wrap');
            self.$myModelSlider = self.$myModelArea.find('.my-product-slider');

            // 검색 영역
            self.$searchArea = self.$el.find('.prod-search-wrap');
            // 검색 영역 : 키워드
            self.$keywordBox = self.$searchArea.find('.keyword-box');
            self.$keywordInput = self.$keywordBox.find('input[type=text]');
            self.$keywordButton = self.$keywordBox.find('.btn-search');
            self.$keywordError = self.$keywordBox.find('.search-error');

            // 검색 영역 : 카테고리 > 서브카테고리
            self.$categoryBox = self.$searchArea.find('.category-box');
            self.$categoryDepth1 = self.$categoryBox.find('.category');
            self.$categoryDepth2 = self.$categoryBox.find('.subCategory');
            self.$categoryOpenBtn = self.$categoryBox.find('.btn-open');
            self.$categoryCloseBtn = self.$categoryBox.find('.btn-close');

            // 검색 영역 : 모델
            self.$modelBox = self.$searchArea.find('.model-box');
            self.$modelFilter = self.$modelBox.find('.form-wrap');
            self.$modelInput = self.$modelBox.find('input[type=text]');
            self.$modelButton = self.$modelBox.find('.btn-search');
            self.$modelError = self.$modelBox.find('.search-error');
            self.$modelSlider = self.$modelBox.find('.model-slider');
            self.$modelNoData = self.$modelBox.find('.no-data');

            // 팝업
            self.$modelPopup = $('#modelNamePopup');

            // 옵션
            self.subCategoryUrl = self.$searchArea.data('subCategoryUrl');
            self.modelUrl = self.$searchArea.data('modelUrl');
            self.resultUrl = self.$searchArea.data('resultUrl');
            self.page = opts.page;
            self.totalCount = opts.totalCount;
            self.hasModel = opts.model.subCategory ? true : false;
            self.model = $.extend(true, {}, opts.model);
            self.param = $.extend(true, {}, self.defaults.model, {
                keyword: ''
            });
            
            self._setMyModel();

            if (!opts.onlyMyModel) {
                self._bindEvent();
                
                lgkorUI.searchModelName();

                if (opts.reset) {
                    self.reset();
                } else {
                    if (lgkorUI.searchParamsToObject('mktModelCd')) {
                        self.options.useCookie = false;
                        self.model.modelCode = self.model.mktModelCd = lgkorUI.searchParamsToObject('mktModelCd');
                        self.hasModel = self.model.subCategory ? true : false;
                    }
                    
                    if (self.hasModel) {
                        if (self.options.useCookie) {
                            if (self.hasModel) {
                                lgkorUI.alert(
                                    self.model.categoryNm + ' &gt; ' +self.model.subCategoryNm + (self.model.modelCode ? '<br><span style="font-weight:700">"' +self.model.modelCode+ '"</span>' : '' ) +'<br>제품이 선택되어 있습니다.<br><br>다른 제품으로 변경하시려면<br>화면 상단 <span style="font-weight:700">"제품 재선택"</span> 버튼을 선택해주세요.', {
                                    okBtnName: '닫기',
                                    ok: function() {
                                        self.complete();
                                    }
                                });
                            }
                        } else {
                            if (self.model.mktModelCd || !self.model.modelCode) {
                                self.complete();
                            }
                        }
                    }
                }
            }
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            // 보유제픔 등록
            self.$selectedModelBar.on('click', '.btn-add-product', function(e) {
                e.preventDefault();
                var href = $(this).attr('href');
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/modelselectProductRegClick.do', '/acecount/modelselectProductRegClickm.do');
                location.href = href + '?modelCode=' + self.model.salesModelCode;
            });

            // 제품 재선택
            self.$selectedModelBar.on('click', '.btn-reset', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/modelselectReselectClick.do', '/acecount/modelselectReselectClickm.do');
                self.reset();
            });

            // 문의유형 : 제품선택
            self.$stepInquiry.find('.btn-next').on('click', function() {
                self.$selectedModelBar.show();
                if (self.hasModel) {
                    self.complete()
                } else {
                    self.$myModelArea.show();
                    self.next(self.$stepModel);
                    self.focus(self.$selectedModelBar);
                    self.$myModelSlider.vcCarousel('resize');
                }
            });

            // 문의유형 선택
            self.$stepInquiry.find('.btn-type').on('click', function() {
                var data = $(this).data();

                data.categoryNm = data.categoryName;
                data.subCategoryNm = data.subCategoryName;
                data.modelCode = '';
                data.productCode = '';

                self.complete(data);
            });

            
            // 검색어 입력
            self.$keywordInput.on('input', function(e) {
                var $this = $(this),
                    value = $this.val().toUpperCase(),
                    opt = self.options;

                var regex = /[^a-zA-Z0-9.\-]/g;

                if (regex.test(value)) {
                    $this.val(value.replace(regex,""));
                    return;
                }

                value = $this.val().toUpperCase();

                if (!self.$modelBox.hasClass(opt.stepActiveClass)) {
                    if (value.length > 1) {
                        self.$categoryBox.removeClass(opt.stepActiveClass);
                        self.$modelBox.addClass(opt.stepActiveClass);
                        self.$keywordBox.find('.search-desc').show();
                        self.param = $.extend(self.param, {
                            keyword: value,
                            page: 1
                        });

                        self._requestData();
                        self.$keywordError.hide();
                    } else {
                        self.$keywordError.show();
                    }
                } else {
                    if (value.length > 1 || !value) {

                        self.param = $.extend(self.param, {
                            keyword: value,
                            page: 1
                        });
                        self.$keywordError.hide();
                        self._requestData();
                    } else {
                        self.$keywordError.show();
                    }
                }
            });

            // 검색어 엔터
            self.$keywordInput.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$keywordButton.trigger('click');
                }
            });

            // 검색어 버튼 클릭
            self.$keywordButton.on('click', function() {
                var opt = self.options;
                var value = self.$keywordInput.val().toUpperCase();

                if (value.length > 1 || !value) {
                    self.param = $.extend(self.param, {
                        keyword: value,
                        page: 1
                    });

                    self._requestData();
                    self.$keywordError.hide();

                    self.$categoryBox.removeClass(opt.stepActiveClass);
                    self.$modelBox.addClass(opt.stepActiveClass);
                } else {
                    self.$keywordError.show();
                }
            });

            // 카테고리 > 검색어 입력
            self.$modelInput.on('input', function() {
                var $this = $(this),
                    value = $this.val().toUpperCase();

                var regex = /[^a-zA-Z0-9.\-]/g;

                if (regex.test(value)) {
                    $this.val(value.replace(regex,""));
                    return;
                }

                value = $this.val().toUpperCase();
                    
                if (value.length > 1 || !value) {
                    self.param = $.extend(self.param, {
                        keyword: value,
                        page: 1
                    });

                    self.$modelError.hide();
                    self._requestData();
                } else {
                    self.$modelError.show();
                }
            });

            // 카테고리 > 검색어 엔터
            self.$modelInput.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$modelButton.trigger('click');
                }
            });

            // 카테고리 > 검색어 버튼 클릭
            self.$modelButton.on('click', function() {
                var value = self.$modelInput.val().toUpperCase();

                if (value.length > 1 || !value) {
                    self.param = $.extend(self.param, {
                        keyword: value,
                        page: 1
                    });

                    self._requestData();
                    self.$modelError.hide();
                } else {
                    self.$modelError.show();
                }
            });

            // 카테고리 선택
            self.$categoryBox.find('a').on('click', function(e) {
                e.preventDefault();

                $(this).closest('.box').addClass('on');
                $(this).closest('li').siblings().each(function(index, item) {
                    var $item = $(item);

                    if ($item.find('.box').hasClass('on')) {
                        $item.find('.box').removeClass('on').addClass('off');
                    }
                });
            });
            self.$categoryBox.find('.btn-close').on('click', function() {
                $(this).closest('.box').removeClass('on').addClass('off');
            });

            // 서브 카테고리 선택
            self.$categoryBox.find('.sub-category-list button').on('click', function() {
                var $this = $(this),
                    data = $this.data(),
                    opt = self.options; 

                if (self.$el.hasClass('service-engineer') && (data.subCategory == 'CT50019259' || data.subCategory == 'CT50019244') && $('#hiDownTimeFlag').val() == 'Y') {                    
                    lgkorUI.alert('(자세한 내용은 공지사항을 확인하시기 바랍니다.)<br>점검시간 : '+ $('#hirunDownStartTime').val() +' ~ '+ $('#hirunDownEndTime').val(),{
                        title: '시스템 점검 중으로, <br>\'시스템에어컨\', \'업소용 스탠드형\'<br>신청 및 조회가 불가합니다.'
                    });
                    return;
                }

                /* BTOCSITE-3316 add :: 출장 예약 페이지일때 센터 예약 유도 카테고리 선택시 팝업 추가 */
                var isRecommendVisitCategory = self.options.recommendVisitCenterCategoryArray.indexOf(data.subCategory) > -1;
                
                if (isRecommendVisitCategory && self.isEngineerReservation){
                    //BTOCSITE-4376
                    /* BTOCSITE-5473 : 출장 서비스 예약 > 소형 가전제품 선택 시 안내 팝업 문구 수정 #3*/
                    var alertMsg = '<h6 class="ui-alert-msg">고객님,<br> 선택하신 제품은 <strong class="point">센터 방문</strong>을 하시면 보다 신속하게 서비스를 받으실 수 있습니다. <br><br>  ※ 출장 서비스 이용 시 출장비가 발생될 수 있습니다. (무상수리 대상 제외)</h6>';
                    /* //BTOCSITE-5473 : 출장 서비스 예약 > 소형 가전제품 선택 시 안내 팝업 문구 수정 #3*/
                    lgkorUI.alert(alertMsg,{
                        title:'',
                        ok: function() {
                            self.updateSummary({
                                product: [data.categoryName, data.subCategoryName]
                            });
                            
                            self.$keywordBox.hide();
            
                            self.$modelBox.find('.keyword-search').show();
                            self.$modelBox.find('#categorySelect').val(data.category);
                            self.$modelBox.find('#categorySelect').vcSelectbox('update').trigger('change', [data.subCategory]);
                            self.$modelPopup.data('category', data.category);
                            self.$modelPopup.data('subCategory', data.subCategory);
            
                            self.$categoryBox.removeClass(opt.stepActiveClass);
                            self.$modelBox.addClass(opt.stepActiveClass);
                            self.focus(self.$selectedModelBar);
                        }
                    });
                    return;
                }
                /* //BTOCSITE-3316 add */

                self.updateSummary({
                    product: [data.categoryName, data.subCategoryName]
                });
                
                self.$keywordBox.hide();

                self.$modelBox.find('.keyword-search').show();
                self.$modelBox.find('#categorySelect').val(data.category);
                self.$modelBox.find('#categorySelect').vcSelectbox('update').trigger('change', [data.subCategory]);
                self.$modelPopup.data('category', data.category);
                self.$modelPopup.data('subCategory', data.subCategory);

                self.$categoryBox.removeClass(opt.stepActiveClass);
                self.$modelBox.addClass(opt.stepActiveClass);
                self.focus(self.$selectedModelBar);
            });

            // 모델명 선택
            self.$modelBox.on('click', '.model-slider a', function(e) {
                e.preventDefault();

                var $this = $(this),
                    data = $this.data();
                
                /* BTOCSITE-3312 add :: 출장예약 페이지일때 모델명을 몰라요 클릭시 팝업 추가 */
                if (!!data.modelCode == false && self.isEngineerReservation){
                    //var alertMsg = '서비스 접수 확인 문자의 <strong class="point">[제품 / 설치 환경 사진등록]</strong> 으로 사진 업로드 하시면 정확하고 신속한 서비스가 가능 합니다.<br><br>모델명 입력을 건너뛰기 하시겠습니까?';
                    //BTOCSITE-4410
                    var alertMsg = '모델명을 입력하시면 신속 정확한 서비스가 가능 합니다.<br><br>접수 확인 문자 <strong class="point">[제품 / 설치 환경 사진등록]</strong> 에서도 모델명 사진 업로드 가능<br><br>모델명을 입력 하시겠습니까?';
                    lgkorUI.confirm(alertMsg,{
                        typeClass:'type2',
                        title:'',
                        okBtnName: '네',
                        cancelBtnName: '아니요',
                        ok: function() {
                            //self.complete(data);
                        },
                        cancel: function() {
                            self.complete(data);
                        }
                    });
                    return;                   
                }         
                /* //BTOCSITE-3312 add */

                self.complete(data);
            });
            
            // 모델명 선택 - 카테고리 선택
            self.$modelBox.find('#categorySelect').on('change', function(e, subValue) {
                var $this = $(this);
                var param = {
                    categorySelect: $this.val()
                };
                var value = typeof subValue === 'string' ? subValue : '';

                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.subCategoryUrl, param, function(result) {
                    lgkorUI.hideLoading();
                    
                    var $subCategory = self.$modelBox.find('#subCategorySelect');
                    var data = result.data.optionData || result.data,
                        arr = data instanceof Array ? data : [],
                        html = '';

                    $subCategory.find('option:not(.default)').remove();

                    if (arr.length) {
                        arr.forEach(function(item) {
                            html += vcui.template('<option value={{value}}>{{name}}</option>', item);
                        });
            
                        $subCategory
                            .append(html)
                            .val(value)
                            .prop('disabled', false);
                    }

                    $subCategory.vcSelectbox('update');

                    self.$modelPopup.data('category', $this.val());
                    self.$modelPopup.data('subCategory', value);
                    
                    self.param = $.extend(self.param, {
                        category: $this.val(),
                        categoryNm: $this.find('option:selected').text(),
                        subCategory: value,
                        subCategoryNm: $subCategory.find('option[value="'+value+'"]').text(),
                        page: 1
                    });

                    if (typeof subValue !== 'string') {
                        self.updateSummary({
                            product: [$this.find('option:selected').text(), $subCategory.find('option[value="'+value+'"]').text()]
                        });
                    }

                    self._requestData();
                });
            });

            // 모델명 선택 - 서브 카테고리 선택
            self.$modelBox.find('#subCategorySelect').on('change', function() {
                var $this = $(this),
                    $category = self.$modelBox.find('#categorySelect');

                if (self.$el.hasClass('service-engineer') && ($this.val() == 'CT50019259' || $this.val() == 'CT50019244') && $('#hiDownTimeFlag').val() == 'Y') {                    
                    lgkorUI.alert('(자세한 내용은 공지사항을 확인하시기 바랍니다.)<br>점검시간 : '+ $('#hirunDownStartTime').val() +' ~ '+ $('#hirunDownEndTime').val(),{
                        title: '시스템 점검 중으로, <br>\'시스템에어컨\', \'업소용 스탠드형\'<br>신청 및 조회가 불가합니다.'
                    });
                    return;
                }

                self.$modelPopup.data('category', $category.val());
                self.$modelPopup.data('subCategory', $this.val());

                self.param = $.extend(self.param, {
                    category: $category.val(),
                    categoryNm: $category.find('option:selected').text(),
                    subCategory: $this.val(),
                    subCategoryNm: $this.find('option:selected').text(),
                    page: 1
                });

                self.updateSummary({
                    product: [$category.find('option:selected').text(), $this.find('option:selected').text()]
                });

                self._requestData();
            });
            
            // 모델 리스트 슬라이더
            $(window).on('resize', function() {
                self._resetFlexibleBox();
            });
            self.$modelSlider.on('carouselinit carouselreInit carouselafterchange carouselresize', function() {
                self._resetFlexibleBox();
            });
            self.$modelSlider.on('carouselreinit', function(e, module) {
                var startPage = parseInt((self.page - 1) / 10) * 10 + 1;
                
                if (startPage != 1 && (self.page % 10 == 1)) {
                    self._toggleArrow(module.$prevArrow, true);
                    module.$prevArrow.addClass('btn-prev');
                }
            });
            self.$modelSlider.on('carouselbeforechange', function(e, module, before, after) {
                var page = after - before;
            
                self.page += page;
            });
            self.$modelSlider.on('carouselafterchange', function(e, module, after) {
                var startPage = parseInt((self.page - 1) / 10) * 10 + 1; 
                var endPage = startPage + 10 - 1;

                if (startPage != 1 && (self.page % 10 == 1)) {
                    self._toggleArrow(module.$prevArrow, true);
                    module.$prevArrow.addClass('btn-prev');
                } else {
                    module.$prevArrow.removeClass('btn-prev');
                }

                if (after == 9 && (endPage != self.totalCount)) {
                    self._toggleArrow(module.$nextArrow, true);
                    module.$nextArrow.addClass('btn-next');
                } else {
                    module.$nextArrow.removeClass('btn-next');
                }
            });
            self.$modelSlider.on('click', '.btn-prev', function() {
                self.param = $.extend(self.param, {
                    page: self.page - 1
                });
                
                self._requestData();
            });
            self.$modelSlider.on('click', '.btn-next', function() {
                self.param = $.extend(self.param, {
                    page: self.page + 1
                });
                
                self._requestData();
            });
        },
        _setMyModel: function _setMyModel() {
            var self = this;

            if (!self.$myModelSlider.length) return;

            self.$myModelSlider.find('a').each(function() {
                var modelCode = $(this).data('modelCode');
                myModel.push(modelCode);
            });

            self.$myModelArea.find('.btn-toggle').attr('aria-expanded', true);

            self.$myModelSlider.vcCarousel({

                slidesToScroll: 3,
                slidesToShow: 3,
                infinite: false,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3,
                            infinite: false
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToScroll: 2,
                            slidesToShow: 2,
                            infinite: false
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            variableWidth: true,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            infinite: false
                        }
                    }
                ]
            });

            self.$myModelSlider.on('click', 'a.slide-box', function(e) {
                e.preventDefault();

                var $this = $(this),
                    data = $this.data();
                if ($this.hasClass('disabled')) {
                    $(window).trigger("toastshow", "예약가능한 제품이 아닙니다.");
                // BTOCSITE-7947
                // } else if ($this.hasClass('regist-type')) {
                //     var href = $(this).attr('href');
                //     location.href = href;
                } else {
                    self.complete(data);
                }
            });

            self.$myModelArea.find('.btn-toggle').on('click', function() {
                var $this = $(this),
                    $toggleBox = $this.closest('.box');

                if ($toggleBox.hasClass('open')) {
                    $toggleBox.removeClass('open');
                    $this.attr('aria-expanded', false);
                    $this.html('보유제품 펼치기');
                    self.$myModelSlider.stop().slideUp();
                } else {
                    $toggleBox.addClass('open');
                    $this.attr('aria-expanded', true);
                    $this.html('보유제품 접기');
                    self.$myModelSlider.stop().slideDown();
                }
            });
        },
        _resetFlexibleBox: function _resetFlexibleBox() {
            var self = this;
            var maxheight = 0;

            self.$modelSlider.find('.ui_carousel_current').each(function(idx, item){
                $(item).find('.slide-conts').each(function(cdx, child){
                    var flexiblebox = $(child).find('.info');
                    maxheight = Math.max(maxheight, flexiblebox.outerHeight(true));
                });
            });

            self.$modelSlider.find('.slide-conts').height(maxheight);
        },
        _toggleArrow: function _toggleArrow($arrow, flag) {
            $arrow[flag ? 'removeClass' : 'addClass']('disabled')
                        .prop('disabled', !flag)
                        .attr('aria-disabled', (!flag).toString());
        },
        _requestData: function _requestData() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.modelUrl, self.param, function(result) {
                var data = result.data,
                    listArr = data.listData instanceof Array ? data.listData : [],
                    listPage = data.listPage;

                self.page = listPage.page;
                self.totalCount = listPage.totalCount;
                self.$modelSlider.find('.slide-track').empty();

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        if (item.modelCode) {
                            item.name = vcui.string.replaceAll(item.modelCode, self.param.keyword, '<em class="word">'+self.param.keyword+'</em>');
                        }
                        self.$modelSlider.find('.slide-track').append(vcui.template(modelListTmpl, item))
                    });

                    if (!self.$modelSlider.hasClass('ui_carousel_initialized')) {
                        self.$modelSlider.vcCarousel({
                            rows:3,
                            slidesPerRow: 4,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false,
                            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                            speed: 150,
                            touchThreshold: 100,
                            responsive: [
                                {
                                    breakpoint: 10000,
                                    settings: {
                                        rows:3,
                                        slidesPerRow: 4,
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        rows: 4,
                                        slidesPerRow: 3,
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 768,
                                    settings: {
                                        rows: 6,
                                        slidesPerRow: 2,
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        });
                    } else {
                        var initValue = (self.page % 10 == 0) ? 9 : 0;
                        self.$modelSlider.vcCarousel('setOption', 'initialSlide', initValue, false);
                        self.$modelSlider.vcCarousel('reinit');
                    }

                    self.$modelSlider.show();
                    self.$modelNoData.hide();
                } else {
                    self.$modelSlider.hide();
                    self.$modelNoData.find('.word').html(self.param.keyword);
                    self.$modelNoData.show();
                }

                lgkorUI.hideLoading();
            });
        },
        updateSummary: function updateSummary(summary) {
            var self = this;
            var summary = summary || self.options.summary;

            if (summary.product) {
                summary.product.forEach(function(item, index) {
                    var temp = {};

                    temp.name = item;
                    if (myModel.indexOf(item) != -1) {
                        temp.isMyProduct = true;
                    }
                    summary.product[index] = temp;
                });
            }
            self.$selectedModelBar.html(vcui.template(selectedBarTmpl, summary));
        },
        focus: function focus($target, callback) {
            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, function() {
                callback && callback();
            });
        },
        next: function next($target) {
            var self = this,
                opt = self.options;

            var $nextStep = $target ? $target : self.$stepModel.next();

            $nextStep.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
            $nextStep.addClass(opt.stepActiveClass);
        },
        reset: function reset() {
            var self = this;
            var defaults = $.extend(true, {}, self.defaults);
            var modelStepFirst = self.$stepBox.eq(0).attr('id') == 'stepModel' ? true : false;

            self.hasModel = false;
            self.page = defaults.page;
            self.totalCount = defaults.totalCount;
            self.model = $.extend(true, {}, defaults.model, {
                pageCode: self.$el.find('#pageCode').val(),
                serviceType: self.$el.find('#serviceType').val(),
                salesModelCode: self.$el.find('#salesModelCode').val()
            });
            self.param = $.extend(true, {}, defaults.model, {
                keyword: ''
            });

            self.$el.find('#category').val('');
            self.$el.find('#categoryNm').val('');
            self.$el.find('#subCategory').val('');
            self.$el.find('#subCategoryNm').val('');
            self.$el.find('#modelCode').val('');
            self.$el.find('#productCode').val('');
            self.$el.find('#salesModelCode').val('');
            self.$el.find('#isMyProduct').val('N');
            self.$el.find('.agree-wrap input[type=checkbox]').prop('checked', false);

            self.$searchArea.find('.search-error').hide();
            self.$keywordInput.val('');
            self.$categoryBox.find('.box').removeClass('on off');
            self.$categoryBox.addClass(defaults.stepActiveClass);
            self.$modelBox.removeClass(defaults.stepActiveClass);
            self.$modelBox.find('.keyword-search').hide();
            self.$modelInput.val('');
            self.$modelSlider.find('.slide-track').empty();
            self.$modelFilter.find('#categorySelect').find('option:first-child').prop('selected', true);
            self.$modelFilter.find('#categorySelect').vcSelectbox('update');
            self.$modelFilter.find('#subCategorySelect').find('option:not(.default)').remove();
            self.$modelFilter.find('#subCategorySelect').vcSelectbox('update');
            self.$keywordBox.show();
            self.$keywordBox.find('.search-desc').hide();
            self.$selectedModelBar.vcSticky('destroy');

            self.$el.trigger('reset');

            self.updateSummary();
            self.next(self.$stepBox.eq(0));

            if (modelStepFirst) {
                self.$myModelArea.show();
                self.$myModelSlider.vcCarousel('resize');
                self.focus(self.$selectedModelBar);
            } else {
                self.$selectedModelBar.hide();
                self.focus(self.$stepBox.eq(0));
            }
        },
        complete: function complete(data) {
            var self = this;
            var data = $.extend(self.model, data || {});

            if (data) {
                for (var key in data) {
                    if (self.$el.find('#'+key).length) {
                        self.$el.find('#'+key).val(data[key]);
                    }
                }
                
                if (myModel.indexOf(data.modelCode) != -1) self.$el.find('#isMyProduct').val('Y');
                if (data.modelCode) lgkorUI.recentlySearch.addCookie(data.modelCode);
            }
                
            self.$el.trigger('complete', [data]);

            if (!self.options.onlyMyModel) {
                self.$myModelArea.hide();
                self.next();
                self.focus(self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                });
            }
        }
    });

    return SearchModel;
});

// BTOCSITE-4086 : 보유제품 이메일로 등록 s
$(document).ready(function(){
    var emailReg = new RegExp('[\?&]emailReg([^&#]*)').exec(window.location.href);
    if(emailReg){
        setTimeout(function () {
            $('#stepInquiryType .btn-next').trigger('click');
        }, 100);
    };
});
// BTOCSITE-4086 : 보유제품 이메일로 등록 e
