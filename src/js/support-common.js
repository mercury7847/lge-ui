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
        '</div>';

    var modelListTmpl = 
        '<li>' +
            '<a href="#" class="item ui_flexible_box" data-category="{{category}}" data-sub-category="{{subCategory}}" data-code="{{code}}">' +
                '<div class="info ui_flexible_cont">' +
                    '<p class="name">{{#raw name}}</p>' +
                    '<p class="category">{{categoryNm}} &gt; {{subCategoryNm}}</p>' +
                '</div>' +
            '</a>' +
        '</li>';
    
    var validation;

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            stepClass: 'step-box',
            stepActiveClass: 'active',
            selectedModel: [],
            register: {
                privcyCheck: {
                    msgTarget: '.err-block'
                },
                keyword: {
                    msgTarget: '.err-msg',
                    minLength: 2
                }   
            },
            callback: function() {}
        };

        self.options = $.extend({}, defaults, self.$el.data(), opt);
        
        vcui.require(['ui/validation', 'ui/selectTarget'], function () {
            validation = new vcui.ui.CsValidation('#submitForm', {register:self.options.register});
        
            self._initialize();
            self._bindEvent();  
        });
    }

    
    Plugin.prototype = {
        _initialize: function() {
            var self = this;

            // 스텝 영역
            self.$submitForm = self.$el.find('#submitForm');
            self.$stepTerms = self.$el.find('#stepTerms');
            self.$stepModel = self.$el.find('#stepModel');
            self.$stepInput = self.$el.find('#stepInput');

            // 선택 제품 플로팅바
            self.$selectedModelBar = self.$el.find('.prod-selected-wrap');
            
            // 보유제품
            self.$myModelArea = self.$el.find('.my-product');
            self.$myModelSlider = self.$myModelArea.find('.my-product-slider');

            // 검색 영역
            self.$searchModelArea = self.$el.find('.prod-search-wrap');
            // 검색 영역 : 키워드
            self.$searchKeywordBox = self.$searchModelArea.find('.keyword-search');
            self.$inputKeyword = self.$searchKeywordBox.find('#keyword');
            self.$buttonKeyword = self.$searchKeywordBox.find('.btn-search');
            // 검색 영역 : 카테고리 > 서브카테고리
            self.$searchCategoryBox = self.$searchModelArea.find('.category-search');
            // 검색 영역 : 모델
            self.$searchModelBox = self.$searchModelArea.find('.model-search');
            self.$modelFilter = self.$searchModelBox.find('.form-wrap');
            self.$modelListWrap = self.$searchModelBox.find('.model-list-wrap');
            self.$modelList = self.$modelListWrap.find('.model-list');
            self.$modelPagination = self.$searchModelBox.find('.pagination');
            self.$modelNoData = self.$searchModelBox.find('.no-data');

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
                self.$modelPagination.pagination();
                $('.ui_select_target').vcSelectTarget();
            }
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
            self.$modelList.empty();

            self.$stepModel.addClass(opt.stepActiveClass);
            self.$stepModel.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);

            self.$submitForm.find('input').val('');

            opt.selectedModel = [];

            var updateObj = {
                tit: '제품을 선택해 주세요',
                desc: "예약내용 입력을 위해 제품을 선택해 주세요"
            }

            self.update(updateObj);
        },
        _requestData: function(param) {
            var self = this,
                url = self.$searchModelArea.data('ajax');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.listData instanceof Array ? data.listData : [];
                    html = '';

                self.$modelList.empty();
                    
                if (arr.length) {
                    arr.forEach(function(item) {
                        item.name = item.code.replaceAll(param.keyword, '<em class="word">'+param.keyword+'</em>');
                        self.$modelList.append(vcui.template(modelListTmpl, item))
                    });
                    self.$modelListWrap.show();
                    self.$modelNoData.hide();
                    self.$modelPagination.pagination('update', data.listPage);
                } else {
                    self.$modelListWrap.hide();
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

            // 제품 재선택
            self.$selectedModelBar.on('click', '.btn-reset', function() {
                self.reset();
            });

            // 약관 동의 다음 버튼
            self.$stepTerms.find('.btn-next').on('click', function() {
                var result = validation.validate(['privcyCheck']),
                    opt = self.options;
                
                if (result.success) {
                    self.$stepModel.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
                    self.$stepModel.addClass(opt.stepActiveClass);

                    $('html, body').stop().animate({
                        scrollTop: self.$selectedModelBar.offset().top
                    });
                }
            });

            // 검색어 검색
            self.$searchKeywordBox.find('#keyword').on('keydown', function(e) {
                var opt = self.options,
                    result;
                
                if (e.keyCode == 13) {
                    result = validation.validate(['keyword']);

                    if (result.success) {
                        self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                        self.$searchModelBox.addClass(opt.stepActiveClass);
    
                        var updateObj = {
                            desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요",
                            reset: true
                        }
                        var param = {
                            keyword: self.$inputKeyword.val().toUpperCase()
                        };
    
                        self.update(updateObj);
                        self._requestData(param);
                    }
                }
            });
            self.$searchKeywordBox.find('.btn-search').on('click', function() {
                var opt = self.options,
                    result = validation.validate(['keyword']);
                
                if (result.success) {
                    self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                    self.$searchModelBox.addClass(opt.stepActiveClass);

                    var updateObj = {
                        desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요",
                        reset: true
                    }
                    var param = {
                        keyword: self.$inputKeyword.val().toUpperCase()
                    };

                    self.update(updateObj);
                    self._requestData(param);
                }
            });

            // 카테고리 선택
            self.$searchCategoryBox.find('.btn-open').on('click', function() {
                $(this).closest('.box').addClass('on');
            });
            self.$searchCategoryBox.find('.btn-close').on('click', function() {
                $(this).closest('.box').removeClass('on').addClass('off');
            });

            // 서브 카테고리 선택
            self.$searchCategoryBox.find('.sub-category ul button').on('click', function() {
                var $this = $(this),
                    opt = self.options,
                    data = $this.data();

                self.$submitForm.find('#category').val(data.category);
                self.$submitForm.find('#subCategory').val(data.subCategory);

                self.$searchCategoryBox.removeClass(opt.stepActiveClass);
                self.$searchModelBox.addClass(opt.stepActiveClass);

                opt.selectedModel = [data.name, data.subName];

                var updateObj = {
                    product: opt.selectedModel,
                    desc: "예약내용 입력을 위해 제품 모델명을 선택해 주세요. 모델명을 모르시면 ‘건너뛰기'를 눌러주세요.",
                    reset: true
                }

                var param = {
                    category: data.category,
                    subCategory: data.subCategory
                };

                self.update(updateObj);
                self._requestData(param);
            });

            // 모델명 선택
            self.$searchModelBox.on('click', '.model-list-wrap a', function(e) {
                e.preventDefault();

                var $this = $(this),
                    opt = self.options,
                    data = $this.data(),
                    updateObj;

                if (!$this.hasClass('no-model')) {
                    self.$submitForm.find('#category').val(data.category);
                    self.$submitForm.find('#subCategory').val(data.subCategory);
                    self.$submitForm.find('#modeCode').val(data.code);
                    
                    opt.selectedModel[2] = data.code;

                    updateObj = {
                        product: opt.selectedModel,
                        reset: true
                    }
                } else {
                    updateObj = {
                        product: opt.selectedModel,
                        reset: true
                    }
                }   

                self.update(updateObj);

                self.$stepInput.siblings('.' + opt.stepClass).removeClass(opt.stepActiveClass);
                self.$stepInput.addClass(opt.stepActiveClass);

                $('html, body').stop().animate({
                    scrollTop: self.$selectedModelBar.offset().top
                });

                opt.callback();
            });
            self.$searchModelBox.find('#categorySelect').on('change', function() {
                var param = {
                    keyword: self.$inputKeyword.val(),
                    category: $(this).val()
                };

                self._requestData(param);
            });
            self.$searchModelBox.find('#subCategorySelect').on('change', function() {
                var param = {
                    keyword: self.$inputKeyword.val(),
                    category: self.$searchModelBox.find('#categorySelect').val(),
                    subCategory: $(this).val()
                };

                self._requestData(param);
            });

            // 모델 리스트 페이지네이션
            self.$modelPagination.on('pageClick', function() {
                var param = {
                    category: self.$submitForm.find('#category').val(),
                    subCategory: self.$submitForm.find('#subCategory').val()
                };

                self._requestData(param);
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
                    opt.selectedModel = [data.name, data.subName, data.code];
                    
                    self.$submitForm.find('#category').val(data.category);
                    self.$submitForm.find('#subCategory').val(data.subCategory);
                    self.$submitForm.find('#modelCode').val(data.code);

                    var updateObj = {
                        product: opt.selectedModel,
                        reset: true
                    }
    
                    self.update(updateObj);

                    self.$stepInput.siblings('.' + opt.stepClass).removeClass(opt.stepActiveClass);
                    self.$stepInput.addClass(opt.stepActiveClass);

                    opt.callback();
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
* 셀렉트박스 타겟
* @option data-url
* @option data-target
* @option callback()
* */
CS.MD.drawOption = function() {
    var pluginName = 'drawOption';

    function Plugin(el, opt) {
        var self = this;
            self.$el = $(el),
            self.el = el;

        var defaults = {};

        self.options = $.extend({}, defaults, self.$el.data(), opt);
    
        self._bindEvent();
    }

    Plugin.prototype = {
        _bindEvent: function() {
            var self = this;

            self.$el.on('change', function(e) {
                var resetFlag = $(this.options[this.selectedIndex]).hasClass('placeholder');
                var params = $(this).serialize();

                if (resetFlag) {
                    self.reset();
                } else {
                    self._ajax(params);
                }
            });
        },
        _ajax: function(params) {
            var self = this;
            var url = self.$el.data('ajax'),
                opt = self.options;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, params, function(result) {
                if (result.data) {
                    self.draw(result.data.optionData);
                    if (opt.callback) opt.callback();
                }
                 
                lgkorUI.hideLoading();
            });
        },
        reset: function() {
            var self = this;
            var $target = $(self.options.target);

            $target.find('option').remove();
            $target.html('<option value="" class="placeholder">'+ $target.data('placeholder') +'</option>')
            $target.prop('disabled', true);
            $target.vcSelectbox('update');
        },
        draw: function(data) {
            var self = this;
            var $target = $(self.options.target),
                html = '';

            for (var key in data) {
                html += '<option value="'+ data[key] +'">'+ key +'</option>'
            }

            $target.html(html);
            $target.prop('disabled', false);
            $target.vcSelectbox('update');
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

            self.pageTotal = (self.options.totalCount - 1)  / self.options.pageCount + 1;

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
                if (page === i) {
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

            self.$pageList.html(html);
        },
        update: function(data) {
            var self = this;

            self.options.page = data.page;
            self.options.totalCount = data.totalCount;
            self.pageTotal = self.options.totalCount == 0 ? 1 : (self.options.totalCount - 1)  / self.options.pageCount + 1;

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
