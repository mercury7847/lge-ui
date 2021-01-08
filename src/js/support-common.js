var CS = CS || {};
CS.MD = CS.MD || {};
CS.UI = CS.UI || {};

CS.UI = {};
CS.UI.$doc = $(document);
CS.UI.$win = $(window);
CS.UI.$html = $('html');
CS.UI.$body = $('body');

CS.MD.plugin = function(pluginName, Plugin) {
    $.fn[pluginName] = function(options) {
        var arg = arguments; 

        return this.each(function() {
            var _this = this,
                $this = $(_this),
                plugin = $this.data('plugin_' + pluginName);

            if (!plugin) {
                $this.data('plugin_' + pluginName, new Plugin(this, options));
            } else {
                if (typeof options === 'string' && typeof plugin[options] === 'function') {
                    plugin[options].apply(plugin, [].slice.call(arg, 1));
                }
            }
        });
    }
}

CS.MD.commonModel = function() {
    var pluginName = 'commonModel';

    var selectedBarTmpl = 
        '<div class="box">' +
            '<div class="prod-info">' +
                '{{# if (typeof tit != "undefined") { #}}' +
                '<p class="tit">제품을 선택해 주세요</p>' +
                '{{# } #}}' +
                '{{# if (typeof product != "undefined") { #}}' +
                '<ul class="product">' +
                    '{{# for (var i = 0; i < product.length; i++) { #}}' +
                    '<li>{{product[i]}}</li>' +
                    '{{# } #}}' +
                '</ul>' +
                '{{# } #}}' +
                '{{# if (typeof desc != "undefined") { #}}' +
                '<p class="desc">{{desc}}</p>' +
                '{{# } #}}' +
            '</div>' +
            '{{# if (typeof reset != "undefined") { #}}' +
            '<div class="prod-btn">' +
                '<button type="button" class="btn border size reset btn-reset">제품 재선택</button>' +
            '</div>' +
            '{{# } #}}' +
            '{{# if (typeof inquiryReset != "undefined") { #}}' +
            '<div class="prod-btn">' +
                '<button type="button" class="btn border size reset btn-reset">문의유형 재선택</button>' +
            '</div>' +
            '{{# } #}}' +
        '</div>';

    var modelListTmpl = 
        '<div class="slide-conts">' +
            '<a href="#" class="item" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-name="{{categoryNm}}" data-sub-category-name="{{subCategoryNm}}">' +
                '<div class="info">' +
                    '{{# if (modelCode != "") { #}}' +
                        '<p class="name">{{#raw name}}</p>' +
                        '<p class="category"><span>{{categoryNm}} &gt; </span>{{subCategoryNm}}</p>' +
                    '{{# } else { #}}' +
                        '<p class="name">모델명을 모르겠어요.</p>' +
                        '<p class="category"><span>건너뛰기<span></p>' +
                    '{{# } #}}' +
                '</div>' +
            '</a>' +
        '</div>';
    
    var termsValidation;
    var modelValidation;  

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            stepIndex: 0,
            stepClass: 'step-box',
            stepActiveClass: 'active',
            selectedModel: [],
            register: {}
        };

        self.options = $.extend({}, defaults, self.$el.data(), opt);
        self.caseType = 'product';
        
        vcui.require(['ui/validation', 'ui/selectTarget'], function () {
            termsValidation = new vcui.ui.CsValidation('#stepTerms', {register: {
                privcyCheck: {
                    msgTarget: '.err-block'
                }
            }});
            modelValidation = new vcui.ui.CsValidation('#stepModel', {register: {
                keyword01: {
                    msgTarget: '.err-msg',
                    minLength: 2
                },
                keyword02: {
                    msgTarget: '.err-msg',
                    minLength: 2
                }
            }});
        
            self._initialize();
            self._bindEvent();  
        });
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;

            // 스텝 영역
            self.$stepTerms = self.$el.find('#stepTerms');
            self.$stepModel = self.$el.find('#stepModel');
            self.$stepInput = self.$el.find('#stepInput');

            self.$stepBox = self.$el.find('.step-box');
            self.stepLength = self.$stepBox.length;

            // 선택 제품 플로팅바
            self.$selectedModelBar = self.$el.find('.prod-selected-wrap');
            
            // 보유제품
            self.$myModelArea = self.$el.find('.my-product');
            self.$myModelSlider = self.$myModelArea.find('.my-product-slider');

            // 검색 영역
            self.$searchModelArea = self.$el.find('.prod-search-wrap');
            // 검색 영역 : 키워드
            self.$searchKeywordBox = self.$searchModelArea.find('>.keyword-search');
            self.$inputKeyword = self.$searchKeywordBox.find('input[type=text]');
            self.$buttonKeyword = self.$searchKeywordBox.find('.btn-search');
            // 검색 영역 : 카테고리 > 서브카테고리
            self.$searchCategoryBox = self.$searchModelArea.find('.category-search');
            // 검색 영역 : 모델
            self.$searchModelBox = self.$searchModelArea.find('.model-search');
            self.$modelFilter = self.$searchModelBox.find('.form-wrap');
            self.$modelInput = self.$searchModelBox.find('input[type=text]');
            self.$modelSlider = self.$searchModelBox.find('.model-slider');
            self.$modelNoData = self.$searchModelBox.find('.no-data');

            self.page = 1;
            self.total = 0;

            if (self.$myModelArea.length) self.$myModelSlider.vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 3,
                slidesToShow: 3,
                responsive: [
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

            if (self.$searchModelBox.length) {
                $('.ui_select_target').vcSelectTarget();
            }

            self.$searchModelBox.find('#categorySelect').vcSelectTarget({
                callback: function(data, target) {

                }
            });
            
            if (self.$searchKeywordBox.length) lgkorUI.searchModelName();
        },
        update: function(obj) {
            var self = this,
                html = '';

            if (obj) {
                html = vcui.template(selectedBarTmpl, obj);
                self.$selectedModelBar.html(html);
            }
        },
        reset: function() {
            var self = this;
                opt = self.options;

            self.$searchCategoryBox.find('.box').removeClass('on off');
            self.$searchCategoryBox.addClass(opt.stepActiveClass);
            self.$searchModelBox.removeClass(opt.stepActiveClass);
            self.$modelSlider.find('.slide-track').empty();

            self.$searchKeywordBox.show();
            self.$searchModelBox.find('.keyword-search').hide();

            if (self.caseType == 'product') {
                self.$stepModel.addClass(opt.stepActiveClass);
                self.$stepModel.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
            } else {
                $('#stepInquiryType').addClass(opt.stepActiveClass);
                $('#stepInquiryType').siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
            }


            if (self.$myModelArea.length) self.$myModelArea.show();

            opt.selectedModel = [];

            var updateObj = {
                tit: '제품을 선택해 주세요',
                desc: "예약내용 입력을 위해 제품을 선택해 주세요"
            }

            self.update(updateObj);
        },
        _resetFlexibleBox: function() {
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
        _requestData: function(param) {
            var self = this,
                url = self.$searchModelArea.data('modelUrl');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.listData instanceof Array ? data.listData : [];

                self.page = data.listPage.page;
                self.totalCount = data.listPage.totalCount;

                self.totalPage = Math.floor(self.totalCount == 0 ? 1 : (self.totalCount - 1)  / self.pageCount + 1);

                self.$modelSlider.find('.slide-track').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
                        item.name = item.modelCode.replaceAll(param.keyword, '<em class="word">'+param.keyword+'</em>');
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
                        self.$modelSlider.vcCarousel('reinit');
                    }
                } else {
                    self.$modelSlider.hide();
                    
                    self.$modelNoData.find('.word').html(param.keyword);
                    self.$modelNoData.show();
                }

                $('html, body').stop().animate({
                    scrollTop: self.$selectedModelBar.offset().top
                });

                lgkorUI.hideLoading();
            });
        },
        _bindEvent: function() {
            var self = this;

            self.$el.find('.model-slider').on('carouselinit carouselreInit carouselafterchange carouselresize', function() {
                self._resetFlexibleBox();
            });

            // 제품 재선택
            self.$selectedModelBar.on('click', '.btn-reset', function() {
                self.reset();
            });

            // 약관 동의 다음 버튼
            self.$stepTerms.find('.btn-next').on('click', function() {
                var result = termsValidation.validate(),
                    opt = self.options;
                
                if (result.success) {
                    self.$stepModel.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
                    self.$stepModel.addClass(opt.stepActiveClass);

                    $('html, body').stop().animate({
                        scrollTop: self.$selectedModelBar.offset().top
                    });
                }
            });

            $('#stepInquiryType').find('.btn-next').on('click', function() {
                var result = termsValidation.validate(),
                    opt = self.options;
                
                if (result.success) {
                    self.$stepModel.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
                    self.$stepModel.addClass(opt.stepActiveClass);

                    $('html, body').stop().animate({
                        scrollTop: self.$selectedModelBar.offset().top
                    });
                }
            });

            // 문의유형 선택
            $('#stepInquiryType').find('.btn-type').on('click', function() {
                var $this = $(this),
                    result = termsValidation.validate(),    
                    opt = self.options,
                    data = $this.data(),
                    updateObj;

                if (result.success) {
                    self.$el.find('#categoryNm').val(data.categoryName);
                    self.$el.find('#subCategoryNm').val(data.subCategoryName);
                    self.$el.find('#category').val(data.category);
                    self.$el.find('#subCategory').val(data.subCategory);

                    opt.selectedModel = [data.categoryName, data.subCategoryName];

                    updateObj = {
                        product: opt.selectedModel,
                        inquiryReset: true
                    }

                    self.caseType = 'company';

                    var info = {
                        category: data.category,
                        subCategory: data.subCategory
                    }

                    self.$el.trigger('complete', [self, info, '', function() {
                        self.update(updateObj);

                        self.$stepInput.siblings('.' + opt.stepClass).removeClass(opt.stepActiveClass);
                        self.$stepInput.addClass(opt.stepActiveClass);

                        $('html, body').stop().animate({
                            scrollTop: self.$selectedModelBar.offset().top
                        });
                    }]);
                }
            });

            // 검색어 검색
            self.$inputKeyword.on('input', function(e) {
                var $this = $(this),
                    opt = self.options,
                    result;
                    
                result = modelValidation.validate(['keyword01']);

                if (result.success) {
                    self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                    self.$searchModelBox.addClass(opt.stepActiveClass);

                    var updateObj = {
                        desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요"
                    }
                    var param = {
                        keyword: self.$inputKeyword.val().toUpperCase(),
                        category: self.$el.find('#category').val(),
                        subCategory: self.$el.find('#subCategory').val()
                    };

                    self.update(updateObj);
                    self._requestData(param);
                } else {
                    if ($this.val() == '') {
                        var param = {
                            keyword: self.$inputKeyword.val().toUpperCase(),
                            category: self.$el.find('#category').val(),
                            subCategory: self.$el.find('#subCategory').val()
                        };
    
                        self.update(updateObj);
                        self._requestData(param);
                    } else {

                    }
                }
            });

            self.$modelInput.on('input', function() {
                var $this = $(this),
                    result;
                    
                result = modelValidation.validate(['keyword02']);

                if (result.success) {
                    var param = {
                        keyword: $this.val().toUpperCase(),
                        category: self.$el.find('#category').val(),
                        subCategory: self.$el.find('#subCategory').val()
                    };

                    self._requestData(param);
                } else {
                    if ($this.val() == '') {
                        var param = {
                            keyword: $this.val().toUpperCase(),
                            category: self.$el.find('#category').val(),
                            subCategory: self.$el.find('#subCategory').val()
                        };
    
                        self._requestData(param);
                    }
                }
            });

            self.$buttonKeyword.on('click', function() {
                var opt = self.options,
                    result = modelValidation.validate(['keyword01']);
                
                if (result.success) {
                    self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                    self.$searchModelBox.addClass(opt.stepActiveClass);

                    var updateObj = {
                        desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요"
                    }
                    var param = {
                        keyword: self.$inputKeyword.val().toUpperCase(),
                        category: self.$el.find('#category').val(),
                        subCategory: self.$el.find('#subCategory').val()
                    };

                    self.update(updateObj);
                    self._requestData(param);
                }
            });

            // 카테고리 선택
            self.$searchCategoryBox.find('.btn-open').on('click', function() {
                $(this).closest('.box').addClass('on');
                $(this).closest('li').siblings().each(function(index, item) {
                    var $item = $(item);

                    if ($item.find('.box').hasClass('on')) {
                        $item.find('.box').removeClass('on').addClass('off');
                    }
                });
            });
            self.$searchCategoryBox.find('.btn-close').on('click', function() {
                $(this).closest('.box').removeClass('on').addClass('off');
            });

            // 서브 카테고리 선택
            self.$searchCategoryBox.find('.sub-category-list button').on('click', function() {
                var $this = $(this),
                    opt = self.options,
                    data = $this.data();

                self.$el.find('#categoryNm').val(data.categoryName);
                self.$el.find('#subCategoryNm').val(data.subCategoryName);
                self.$el.find('#category').val(data.category);
                self.$el.find('#subCategory').val(data.subCategory);

                self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                self.$searchModelBox.addClass(opt.stepActiveClass);

                opt.selectedModel = [data.name, data.subName];

                var updateObj = {
                    product: opt.selectedModel,
                    desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요. 모델명을 모르시면 ‘건너뛰기'를 눌러주세요."
                }

                var param = {
                    category: data.category,
                    subCategory: data.subCategory
                };

                self.update(updateObj);
                self._requestData(param);

                self.$searchKeywordBox.hide();
                self.$searchModelBox.find('.keyword-search').show();
                
                self.$searchModelBox.find('#categorySelect').val(data.category);
                self.$searchModelBox.find('#categorySelect').vcSelectbox('update').trigger('change', [data.subCategory]);
            });

            // 모델명 선택
            self.$searchModelBox.on('click', '.model-slider a', function(e) {
                e.preventDefault();

                var $this = $(this),
                    opt = self.options,
                    data = $this.data(),
                    updateObj, param, url;

                self.$el.find('#categoryNm').val(data.categoryName);
                self.$el.find('#subCategoryNm').val(data.subCategoryName);
                self.$el.find('#category').val(data.category);
                self.$el.find('#subCategory').val(data.subCategory);
                self.$el.find('#productCode').val(data.productCode);

                if (data.modelCode) {
                    self.$el.find('#modeCode').val(data.modelCode);
                    
                    opt.selectedModel = [data.categoryName, data.subCategoryName, data.modelCode];
                } else {
                    opt.selectedModel = [data.categoryName, data.subCategoryName];
                }   

                updateObj = {
                    product: opt.selectedModel,
                    reset: true
                }

                url = self.$searchModelArea.data('resultUrl');
                param = {
                    subCategory: data.subCategory,
                    serviceType: $('#serviceType').val()
                }   

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var ajaxData = result.data,
                        info = {
                            category: data.category,
                            subCategory: data.subCategory,
                            modelCode: data.modelCode
                        };

                    self.$el.trigger('complete', [self, info, ajaxData, function() {
                        self.update(updateObj);

                        self.$stepInput.siblings('.' + opt.stepClass).removeClass(opt.stepActiveClass);
                        self.$stepInput.addClass(opt.stepActiveClass);

                        $('html, body').stop().animate({
                            scrollTop: self.$selectedModelBar.offset().top
                        });
                    }]);
                });
            });
            
            // 모델명 선택 - 서브 카테고리 선택
            self.$searchModelBox.find('#subCategorySelect').on('change', function() {
                var param = {
                    keyword: self.$inputKeyword.val(),
                    category: self.$searchModelBox.find('#categorySelect').val(),
                    subCategory: $(this).val()
                };

                self._requestData(param);
            });
            
            // 모델 리스트 슬라이더
            self.$modelSlider.on('carouselbeforechange', function(e, module, before, after) {
                self.page = after;
            });
            self.$modelSlider.on('carouselafterchange', function(e, module, current) {
                
            });
            
            // 보유제품 선택
            self.$myModelArea.find('.slide-box').on('click', function(e) {
                e.preventDefault();

                var $this = $(this),
                    opt = self.options,
                    data = $this.data();

                if ($this.hasClass('disabled')) {
                    $(window).trigger("toastshow", "예약가능한 제품이 아닙니다.");
                } else {
                    
                    self.$el.find('#categoryNm').val(data.categoryName);
                    self.$el.find('#subCategoryNm').val(data.subCategoryName);
                    self.$el.find('#category').val(data.category);
                    self.$el.find('#subCategory').val(data.subCategory);
                    self.$el.find('#modelCode').val(data.modelCode);
                    self.$el.find('#productCode').val(data.productCode);
                    
                    opt.selectedModel = [data.categoryName, data.subCategoryName, data.modelCode];
                    
                    updateObj = {
                        product: opt.selectedModel,
                        reset: true
                    }
    
                    self.update(updateObj);

                    lgkorUI.requestAjaxDataPost(self.$searchModelArea.data('resultUrl'), {modelCode: data.code, serviceType: $('#serviceType').val()}, function(result) {
                        var ajaxData = result.data,
                            info = {
                                category: data.category,
                                subCategory: data.subCategory,
                                modelCode: data.modelCode
                            };
    
                        self.$el.trigger('complete', [self, info, ajaxData, function() {
                            self.update(updateObj);

                            self.$myModelArea.hide();
                            self.$stepInput.siblings('.' + opt.stepClass).removeClass(opt.stepActiveClass);
                            self.$stepInput.addClass(opt.stepActiveClass);

                            $('html, body').stop().animate({
                                scrollTop: self.$selectedModelBar.offset().top
                            });
                        }]);
                    });
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
        }
    };

    CS.MD.plugin(pluginName, Plugin);
}();

/*
* pagination
* */
CS.MD.pagination = function() {
    var pluginName = 'pagination';

    function Plugin(el, opt) {
        var self = this,
            el = self.el = el,
            $el = self.$el = $(el);

        var defaults = {
            page: 1,
            totalCount: 1,
            pageCount:10,
            pageView: 5,
            prevClass: 'prev',
            nextClass: 'next',
            disabledClass: 'disabled',
            lastView: false
        };

        self.options = $.extend({}, defaults, self.$el.data(), opt);

        function _initialize() {
            $el.attr("role","navigation");
            $el.attr("aria-label","Pagination");

            self.$pageList = $el.find('.page_num');
            self.$prev = $el.find('.' + self.options.prevClass);
            self.$next = $el.find('.' + self.options.nextClass);

            self.pageTotal = Math.floor((self.options.totalCount - 1)  / self.options.pageCount + 1);

            self._setEvent();
            self._update();
        }

        _initialize();
    }

    Plugin.prototype = {
        _update: function(page) {
            var self = this,
                page = page || self.options.page,
                pageView = self.options.pageView,
                pageTotal = self.pageTotal,
                html = '';

            var startPage = parseInt((page - 1) / pageView) * pageView + 1; 
            var endPage = startPage + pageView - 1;
            if (endPage > pageTotal) {
                endPage = pageTotal;
            }

            for (var i = startPage; i <= endPage; i++) {
                if (page == i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<a href="#" data-page="' + i + '" title="' + i + '페이지 보기">' + i + '</a>';
                }
            }

            if (self.options.lastView && (startPage + pageView <= pageTotal)) {
                html += '<span class="dot">...</span>';
                html += '<a href="#" data-page="' + pageTotal + '" title="' + pageTotal + '페이지 보기">' + pageTotal + '</a>';
            }

            if (page > pageView) {
                self.$prev
                    .attr('aria-disabled', false)
                    .removeClass(self.options.disabledClass)
                    .data('page', startPage - 1);
            } else {
                self.$prev
                    .attr('aria-disabled', true)
                    .addClass(self.options.disabledClass)
                    .data('page', '');
            }

            if (startPage + pageView <= pageTotal) {
                self.$next
                    .attr('aria-disabled', false)
                    .removeClass(self.options.disabledClass)
                    .data('page', endPage + 1);
            } else {
                self.$next
                    .attr('aria-disabled', true)
                    .addClass(self.options.disabledClass)
                    .data('page', '');
            }
            
            self.$el.data('pageTotal', pageTotal);
            self.$el.data('totalCount', self.options.totalCount);
            self.$el.data('page', page);

            self.$pageList.html(html);
        },
        update: function(data) {
            var self = this;

            self.options.page = data.page;
            self.options.totalCount = data.totalCount;
            self.pageTotal = Math.floor(self.options.totalCount == 0 ? 1 : (self.options.totalCount - 1)  / self.options.pageCount + 1);

            self._update();
        },
        _setEvent: function() {
            var self = this;
            
            self.$el.on('click', 'a', function(e) {
                e.preventDefault();
                
                var $this = $(this),
                    page = $this.data('page');

                if ($this.hasClass(self.options.disabledClass) || $this.attr('aria-disabled') == true) return;

                if (!(self.options.lastView && ($this.hasClass(self.options.prevClass) || $this.hasClass(self.options.nextClass)))) {
                    self.$el.trigger({
                        type: 'pageClick',
                        page: page
                    });
                } else {    
                    self._update(page);
                }
            });
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

/*
* quick menu
*/
CS.MD.quickMenu = function() {
    var pluginName = 'quickMenu';
    
    function Plugin(el, opt) {
        var self = this;
            self.$el = $(el),
            self.el = el;

        // var defaults = {};
        // self.options = $.extend({}, defaults, opt);
    
        self.$topBtn = self.$el.find('.btn-top');
        self.$menuBtn = self.$el.find('.btn-expand');

        self._bindEvent();
    }

    Plugin.prototype = {
        _bindEvent: function() {
            var self = this;

            self.$menuBtn.on('click', function(e) {
                var $item = $(this).parent();

                if ($item.hasClass('on')) {
                    $item.removeClass('on');
                } else {
                    $item.addClass('on');
                    $('.history-list').removeClass('on');
                }
            });
            self.$topBtn.on('click', function (e) {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });

            CS.UI.$win.on('scroll resize', function(){
                if (self.$el.find('.on').length > 0) {
                    self.$el.find('.on').removeClass('on');
                }

                if (CS.UI.$win.scrollTop() > 100) {
                    self.$topBtn.removeClass('off');
                } else {
                    self.$topBtn.addClass('off');
                }
            });

            CS.UI.$doc.on('click', function(e) {
                if (!$(e.target).closest(self.$el).length) {
                    self.$el.find('.on').removeClass('on');
                }
            });

            CS.UI.$win.on('breakpointchange.'+pluginName, function(e, data){
                if (data.isMobile) {
                    $('.history-btn:first-child').off('click').on('click', function(e) {
                        if (!$('.history-list').hasClass('on')) {
                            e.preventDefault();
                            $('.history-list').addClass('on');
                            self.$menuBtn.parent().removeClass('on');
                        }
                    });
                }
            })
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

/*
* survey
*/
CS.MD.survey = function(addData) {
    if ($('#surveyPopup').length < 1) return false;

    vcui.require(['ui/validation'], function () {
        var $cont = $('.survey-pop');
        var register = {
            privcyCheck: {
                msgTarget: '.err-block'
            },
            userName: {
                msgTarget: '.err-block'
            },
            phoneNo: {
                msgTarget: '.err-block'
            },
            gender: {
                msgTarget: '.gender-err-block'
            },
            age: {
                msgTarget: '.err-block'
            },
            serviceName: {
                msgTarget: '.service-err-block'
            },
            csaFlag: {
                msgTarget: '.csa-err-block'
            },
            rating: {
                msgTarget: '.err-block'
            },
            content: {
                msgTarget: '.err-msg'
            }
        };
        var validation = new vcui.ui.CsValidation('.survey-pop', {register:register});

        $('#surveyPopup').find('.btn-confirm').on('click', function() {
            var result = validation.validate(),
                data = $.extend({}, addData, validation.getAllValues());

            if (result.success) {
                lgkorUI.requestAjaxDataPost($cont.data('ajax'), data, function(result) {
                    if (result.data.resultFlag == 'Y') {
                        $('#surveyPopup').vcModal('hide');
                    }

                    lgkorUI.alert('', {
                        title: result.data.resultMessage
                    });
                })
            }
        });

        $('#surveyPopup').on('modalhide', function(e) {
            $cont.find('input,textarea').not(':readonly').val('');
        });
    });
};

var AuthManager = function() {
    var SENDTEXT = '인증번호 발송';
    var RESENDTEXT = '인증번호 재발송';
    var COMPLETETEXT = '휴대전화 인증 완료';
    
    function AuthManager(options) {
        var self = this;
        var defaults = {
            elem: {
                popup: '',
                name: '',
                phone: '',
                number: ''
            },
            target: {
                name: '',
                phone: ''
            },
            register: {}
        };

        self.options = options = $.extend({}, defaults, options);
        self.nameName = $(options.elem.name)[0].name;
        self.phoneName = $(options.elem.phone)[0].name;
        self.numberName = $(options.elem.number)[0].name;

        var register = options.register || {};

        self.validation = new vcui.ui.CsValidation(options.elem.popup, {
            register: register
        });
    }

    AuthManager.prototype = {
        send: function() {
            var self = this;
            var elem = self.options.elem,
                result = self.validation.validate([self.nameName, self.phoneName]),
                data, url;

            if (result.success) {
                url = $(elem.popup).data('smsUrl');
                data = self.validation.getValues([self.nameName, self.phoneName]);

                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    var resultData = result.data;

                    if (resultData.resultFlag == 'Y') {
                        $(this).find('span').html(RESENDTEXT);
                        $(elem.number).prop('disabled', false);
                    }

                    lgkorUI.alert('', {
                        title: resultData.resultMessage
                    });
                });
            }
        },
        open: function() {
            var self = this;
            var elem = self.options.elem;

            $(elem.popup).vcModal();
        },
        confirm: function(el, callback) {
            var self = this;
            var $button = $(el),
                elem = self.options.elem,
                target = self.options.target,
                result = self.validation.validate(),
                url, data;

            if (result.success == true) {
                if ($(elem.number).prop('disabled')) {
                    lgkorUI.alert('', {title: '인증번호 발송 버튼을 선택해 주세요.'});
                    return false;
                }

                if (callback) {
                    callback();
                } else {
                    url = $(elem.popup).data('authUrl'),
                    data = self.validation.getValues([self.nameName, self.phoneName, self.numberName]);

                    lgkorUI.requestAjaxDataPost(url, data, function(result) {
                        var nameValue = $(elem.name).val(),
                            phoneValue = $(elem.phone).val();
                        
                        if (result.data.resultFlag == 'Y') {
                            $(target.name).val(nameValue);
                            $(target.phone).val(phoneValue);

                            $button.prop('disabled', true);
                            $button.find('span').html(COMPLETETEXT);
                        
                            $(elem.popup).vcModal('hide');
                        }

                        lgkorUI.alert('', {title: result.data.resultMessage});
                    });
                }
            }
        }
    };

    return AuthManager;
}();


$.fn.serializeObject = function() {
    var result = {}
    var extend = function(i, element) {
        var node = result[element.name]
        if ("undefined" !== typeof node && node !== null) {
            if ($.isArray(node)) {
                node.push(element.value)
            } else {
                result[element.name] = [node, element.value]
            }
        } else {
            result[element.name] = element.value
        }
    }
  
    $.each($(this).serializeArray(), extend)
    return result;
};

(function($){
    function commonInit(){
        vcui.require(['ui/selectbox', 'ui/carousel'], function () {    
            // 관련 소모품이 필요하신가요?
            $('.product-slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 4,
                slidesToShow: 4,
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
                            slidesToScroll: 4,
                            slidesToShow: 4
                        }
                    }
                ]
            });

            // LG제품에 관련된 정보를 확인하세요!
            $('.info-slider').vcCarousel({
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

            // 퀵 메뉴 (미정)
            $('#quickMenu').quickMenu();
        });
    }

    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);
