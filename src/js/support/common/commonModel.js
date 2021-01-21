vcui.define('support/common/CommonModel', ['jquery', 'vcui'], function ($, core) {
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
                    '{{# if (product[i]) { #}}' +
                    '<li>{{product[i]}}</li>' +
                    '{{# } #}}' +
                    '{{# } #}}' +
                '</ul>' +
                '{{# } #}}' +
            '</div>' +
            '{{# if (typeof reset != "undefined") { #}}' +
            '<div class="prod-btn">' +
                '{{# if (reset == "inquiry") { #}}' +
                '<button type="button" class="btn border size reset btn-reset">문의유형 재선택</button>' +
                '{{# } else { #}}' +
                '<button type="button" class="btn border size reset btn-reset">제품 재선택</button>' +
                '{{# } #}}' +
            '</div>' +
            '{{# } #}}' +
        '</div>';

    var modelListTmpl = 
        '<div class="slide-conts">' +
            '{{# if (modelCode != "") { #}}' +
            '<a href="#" class="item" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-name="{{categoryNm}}" data-sub-category-name="{{subCategoryNm}}">' +
            '{{# } else { #}}' +
            '<a href="#" class="item no-model" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-name="{{categoryNm}}" data-sub-category-name="{{subCategoryNm}}">' +
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

    var CommonModel = core.ui('CommonModel', /** @lends vcui.ui.vcCommonModel# */{
        bindjQuery: 'CommonModel',
        defaults: {
            stepClass: 'step-box',
            stepActiveClass: 'active',
            register: {},
            page: 1,
            total: 0,
            caseType: 'product',
            param: {},
            summary: {
                tit: '제서비스 이용을 위해 제품을 선택해주세요.'
            }
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._optionsSetting();
            self._termsSetting();

            // 스텝 영역
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

            // 검색 영역 : 카테고리 > 서브카테고리
            self.$categoryBox = self.$searchArea.find('.category-box');
            self.$categoryDepth1 = self.$categoryBox.find('.category');
            self.$categoryDepth2 = self.$categoryBox.find('.subCategory');
            self.$categoryOpenBtn = self.$categoryBox.find('.btn-open');
            self.$categoryCloseBtn = self.$categoryBox.find('.btn-close');

            // 검색 영역 : 모델
            self.$modelBox = self.$searchArea.find('.model-box');
            self.$modelFilter = self.$modelBox.find('.form-wrap');
            self.$modelCategory = self.$modelBox.find('#categorySelect');
            self.$modelSubCategory = self.$modelBox.find('#subCategorySelect');
            self.$modelInput = self.$modelBox.find('input[type=text]');
            self.$modelButton = self.$modelBox.find('.btn-search');
            self.$modelSlider = self.$modelBox.find('.model-slider');
            self.$modelNoData = self.$modelBox.find('.no-data');

            self.$categoryDepth1.vcSelectTarget();
            self.$myModelSlider.vcCarousel({
                slidesToScroll: 3,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            variableWidth: true,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                        }
                    }
                ]
            });

            self.param = {
                pageCode: $('#pageCode').val()
            }

            lgkorUI.searchModelName();
        },
        _optionsSetting: function _optionsSetting() {
            var self = this;
            var opts = self.options;

            self.page = opts.page;
            self.totalCount = opts.totalCount;
            self.inquiryType = opts.inquiryType;
            self.param = opts.param;
            self.isLogin = $('#topLoginFlag').length ? $('#topLoginFlag').val() : 'N';
        },
        _termsSetting: function _termsSetting() {
            if (!$('#stepTerms').length) return;

            var self = this;

            self.$stepTerms = self.$el.find('#stepTerms');
            self.termsValidation = new vcui.ui.CsValidation('#stepTerms', {register: {
                privcyCheck: {
                        msgTarget: '.err-block'
                }
            }});

            // 약관 동의 다음 버튼
            self.$stepTerms.find('.btn-next').on('click', function() {
                var result = self.termsValidation.validate();
                
                if (result.success) {
                    self._next(self.$stepModel);
                    self._focus(self.$selectedModelBar);
                }
            });
        },
        reset: function reset() {
            var self = this;
                options = self.options;

            self.page = options.page;
            self.totalCount = options.totalCount;
            self.inquiryType = options.inquiryType;
            self.param = options.param;

            self.$el.find('[type=hidden]').not('[name=serviceType], [name=lockUserId]').val('');
            
            if (self.isLogin == 'Y') {
                self.$el.find('input[type=text], textarea').not('#userNm, #phoneNo, ').val('');
            } else {
                self.$el.find('input[type=text], textarea').val('');
            }

            self.$el.find('input[type=radio]').prop('checked', false);
            
            self.$categoryBox.find('.box').removeClass('on off');
            self.$categoryBox.addClass(options.stepActiveClass);
            self.$modelBox.removeClass(options.stepActiveClass);
            self.$modelBox.find('.keyword-search').hide();
            self.$modelSlider.find('.slide-track').empty();
            self.$modelCategory.vcSelectTarget('reset', 'default');

            self.$keywordBox.show();
            self.$keywordBox.find('.desc').hide();
            
            self.$myModelArea.show();
            
            self.$el.trigger('reset', [self]);

            self._updateSummary();

            $('.prod-selected-wrap').vcSticky('destroy');
        },
        _updateSummary: function _updateSummary(summary) {
            var self = this;
                summary = summary || self.options.summary;

            if (summary) self.$selectedModelBar.html(vcui.template(selectedBarTmpl, summary));
        },
        _resetFlexibleBox: function _resetFlexibleBox() {
            var self = this;

            self.$el.find('.ui_carousel_track .ui_carousel_current').each(function(idx, item){
                var maxheight = 0;
                $(item).find('.slide-conts').each(function(cdx, child){
                    var flexiblebox = $(child).find('.info');
                    maxheight = Math.max(maxheight, flexiblebox.outerHeight(true));
                });

                $(item).find('.slide-conts').height(maxheight);
            });
        },
        _toggleArrow: function _toggleArrow($arrow, flag) {
            $arrow[flag ? 'removeClass' : 'addClass']('disabled')
                        .prop('disabled', !flag)
                        .attr('aria-disabled', (!flag).toString());
        },
        _focus: function _focus($target, callback) {
            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, function() {
                callback && callback();
            });
        },
        _next: function _next($target) {
            var self = this,
                opt = self.options;
                
            $target.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
            $target.addClass(opt.stepActiveClass);
        },
        _requestData: function _requestData() {
            var self = this,
                url = self.$searchArea.data('modelUrl');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, self.param, function(result) {
                var data = result.data,
                    arr = data.listData instanceof Array ? data.listData : [];

                self.page = data.listPage.page;
                self.totalCount = data.listPage.totalCount;

                self.totalPage = Math.floor(self.totalCount == 0 ? 1 : (self.totalCount - 1)  / self.pageCount + 1);
                

                self.$modelSlider.find('.slide-track').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
                        item.name = item.modelCode.replaceAll(self.param.keyword, '<em class="word">'+self.param.keyword+'</em>');
                        self.$modelSlider.find('.slide-track').append(vcui.template(modelListTmpl, item))
                    });
                    self.$modelSlider.show();
                    self.$modelNoData.hide();

                    if (!self.$modelSlider.hasClass('ui_carousel_initialized')) {
                        self.$modelSlider.vcCarousel({
                            rows:3,
                            slidesPerRow: 4,
                            slidesToShow: 1,
                            slidesToScroll: 1,
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
                } else {
                    self.$modelSlider.hide();
                    
                    self.$modelNoData.find('.word').html(self.param.keyword);
                    self.$modelNoData.show();
                }

                self._focus(self.$selectedModelBar);

                lgkorUI.hideLoading();
            });
        },
        complete: function complete(data) {
            var self = this;
            var url = self.$searchArea.data('resultUrl'),
                data = data instanceof Object ? data : {};

            if (data) {
                self.$el.find('#category').val(data.category);
                self.$el.find('#categoryNm').val(data.categoryName);
                self.$el.find('#subCategory').val(data.subCategory);
                self.$el.find('#subCategoryNm').val(data.subCategoryName);
                self.$el.find('#modelCode').val(data.modelCode);
                self.$el.find('#productCode').val(data.productCode);
            }

            self.$el.trigger('complete', [self, data, url]);
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            // 보유제품 선택
            self.$myModelSlider.find('a').on('click', function(e) {
                e.preventDefault();
                var data = $(this).data();

                if ($(this).hasClass('disabled')) {
                    $(window).trigger("toastshow", "예약가능한 제품이 아닙니다.");
                } else {
                    self.complete(data);
                }
            });

            // 보유제품 펼침/닫힘
            self.$myModelArea.find('.btn-toggle').on('click', function() {
                var $this = $(this),
                    $toggleBox = $this.closest('.box');

                if ($toggleBox.hasClass('open')) {
                    self.$myModelSlider.stop().slideUp(function() {
                        $toggleBox.removeClass('open');
                    });
                    $this.html('보유제품 펼치기');
                } else {
                    self.$myModelSlider.stop().slideDown(function() {
                        $toggleBox.addClass('open');
                    });
                    $this.html('보유제품 접기');
                }
            });

            // 제품 재선택
            self.$selectedModelBar.on('click', '.btn-reset', function() {
                self.reset();
            });

            // 문의유형 : 제품선택
            self.$stepInquiry.find('.btn-next').on('click', function() {
                var result = termsValidation.validate();
                
                if (result.success) {
                    self._next(self.$stepModel);
                    self._focus(self.$selectedModelBar);
                }
            });

            // 문의유형 선택
            self.$stepInquiry.find('.btn-type').on('click', function() {
                var $this = $(this),
                    result = termsValidation.validate(),
                    data = $this.data();

                if (result.success) {
                    self.$el.find('#category').val(data.category);
                    self.$el.find('#categoryNm').val(data.categoryName);
                    self.$el.find('#subCategory').val(data.subCategory);
                    self.$el.find('#subCategoryNm').val(data.subCategoryName);
                    
                    data.type = 'inquiry';

                    self.$el.trigger('complete', [self, data]);
                }
            });

            // 검색어 검색
            self.$keywordInput.on('input', function(e) {
                var $this = $(this),
                    value = $this.val().toUpperCase(),
                    opt = self.options;

                if (!self.$modelBox.hasClass(opt.stepActiveClass)) {
                    if (value.length > 1) {
                        self.$categoryBox.removeClass(opt.stepActiveClass);
                        self.$modelBox.addClass(opt.stepActiveClass);
                        self.$keywordBox.find('.desc').show();
                        self.$keywordBox.find('.err-msg').hide();
                        self.param = $.extend(self.param, {
                            keyword: value,
                            page: 1
                        });

                        self._updateSummary({
                            tit: "서비스 이용을 위해 제품을 선택해주세요."
                        });
                        self._requestData();
                    } else {
                        self.$keywordBox.find('.err-msg').show();
                    }
                } else {
                    if (value.length > 1 || !value) {

                        self.param = $.extend(self.param, {
                            keyword: value,
                            page: 1
                        });
                        
                        self._requestData();
                    }
                }
            });

            self.$keywordButton.on('click', function() {
                var opt = self.options;
                
                if (result.success) {
                    self.param = $.extend(self.param, {
                        keyword: self.$keywordInput.val().toUpperCase(),
                        page: 1
                    });

                    self._updateSummary({
                        tit: "서비스 이용을 위해 제품을 선택해주세요."
                    });
                    self._requestData();

                    self.$categoryBox.removeClass(opt.stepActiveClass);
                    self.$modelBox.addClass(opt.stepActiveClass);
                }
            });

            // 카테고리 > 검색어 검색
            self.$modelInput.on('input', function() {
                var $this = $(this),
                    value = $this.val().toUpperCase();
                    
                if (value.length > 1 || !value) {
                    self.param = $.extend(self.param, {
                        keyword: value,
                        page: 1
                    });

                    self._requestData();
                }
            });

            self.$modelButton.on('click', function() {
                if (result.success) {
                    self.param = $.extend(self.param, {
                        keyword: self.$modelInput.val().toUpperCase(),
                        page: 1
                    });

                    self._requestData();
                }
            });

            // 카테고리 선택
            self.$categoryBox.find('.btn-open').on('click', function() {
                $(this).closest('.box').addClass('on');
                $(this).closest('li').siblings().each(function(index, item) {
                    var $item = $(item);

                    if ($item.find('.box').hasClass('on')) {
                        $item.find('.box').removeClass('on').addClass('off');
                    }
                });
            });

            // 카테고리 취소
            self.$categoryBox.find('.btn-close').on('click', function() {
                $(this).closest('.box').removeClass('on').addClass('off');
            });

            // 서브 카테고리 선택
            self.$categoryBox.find('.sub-category-list button').on('click', function() {
                var $this = $(this),
                    data = $this.data();
                    opt = self.options;

                self.param = $.extend(self.param, {
                    category: data.categor,
                    categoryNm: data.categoryName,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryName,
                    page: 1
                });

                self._updateSummary({
                    product: [data.categoryName, data.subCategoryName]
                });
                self._requestData();

                self.$keywordBox.hide();

                self.$modelBox.find('.keyword-search').show();
                self.$modelBox.find('#categorySelect').val(data.category);
                self.$modelBox.find('#categorySelect').vcSelectbox('update').trigger('change', [data.subCategory]);

                self.$categoryBox.removeClass(opt.stepActiveClass);
                self.$modelBox.addClass(opt.stepActiveClass);
            });

            // 모델명 선택
            self.$modelBox.on('click', '.model-slider a', function(e) {
                e.preventDefault();
                var data = $(this).data();
                
                self.complete(data);
            });
            
            // 모델명 선택 - 서브 카테고리 선택
            self.$modelBox.find('#subCategorySelect').on('change', function() {
                var $this = $(this),
                    $category = self.$modelBox.find('#categorySelect');

                self.param = $.extend(self.param, {
                    category: $category.val(),
                    categoryNm: $category.find('option:selected').text(),
                    subCategory: $this.val(),
                    subCategoryNm: $this.find('option:selected').text(),
                    page: 1
                });

                self._requestData();
            });
            
            // 모델 리스트 슬라이더
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
        }
    });

    return CommonModel;
});