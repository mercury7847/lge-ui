;(function(global){
    if(!global['lgkorUI']) global['lgkorUI'] = {};
    
    var csUI = {
        isLogin: $('#topLoginFlag').length ? ($('#topLoginFlag').val() == 'Y' ? true : false) : ($('html').data('login') == 'Y' ? true : false),
        initProductSlider: function() {
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
        },
        addPlugin: function(pluginName, Plugin) {
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
        },
        cookie: {
            setCookie: function(cookieName, value, expire) {
                var cookieText;
                var cookieExpire = new Date();

                
                cookieExpire.setDate(cookieExpire.getDate() + expire);
                cookieText = cookieName + '=' + escape(value) + ((expire == null) ? '' : '; expires=' + cookieExpire.toUTCString());

                document.cookie = cookieText;
            },
            getCookie: function(cookieName) {
                var cookieValue = null;

                if (document.cookie) {
                    var cookieKey = escape(cookieName) + "="; 
                    var cookieArr = document.cookie.split(";");

                    for (var i = 0; i < cookieArr.length; i++) {
                        if(cookieArr[i][0] === " ") {
                            cookieArr[i] = unescape(cookieArr[i].substring(1));
                        }
                        if(cookieArr[i].indexOf(cookieKey) === 0) {
                            cookieValue = unescape(cookieArr[i].slice(cookieKey.length, cookieArr[i].length));
                        }
                    }
                }

                return cookieValue;
            },
            deleteCookie: function(cookieName, value) {
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');
                    
                    if (cookieArr.indexOf(value.toString()) != -1) {
                        var index = -1;
                        for (var i = 0; i < cookieArr.length; i++) {
                            if (value == cookieArr[i]) {
                                index = i;
                                break;
                            }
                        }
                        
                        if (index != -1) {
                            cookieArr.splice(index, 1);
                            cookies = cookieArr.join(',');
                            cookie.setCookie(cookieName, cookies, 365);
                        }
                    }
                }
            },
            deleteAllCookie: function(cookieName) {
                this.setCookie(cookieName, '', '-1');
            }
        },
        recentlySearch: {
            cookieName: 'LG_SupportSearch',
            maxNum: 10,
            expire: 30,
            addCookie: function(value) {
                var self = this;
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(self.cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');

                    if (cookieArr.indexOf(value) != -1) {
                        cookie.deleteCookie(self.cookieName, value);
                        cookieArr.splice(cookieArr.indexOf(value), 1);
                        cookieArr.unshift(value);
                    } else {
                        cookieArr.unshift(value);
                        if (cookieArr.length > self.maxNum) cookieArr.length = self.maxNum;
                    }
                    cookies = cookieArr.join(',');
                    cookie.setCookie(self.cookieName, cookies, self.expire);
                } else {
                    cookie.setCookie(self.cookieName, value, self.expire);
                }
            }
        },
        recentlyKeyword: {
            cookieName: 'LG_SupportKeyword',
            maxNum: 5,
            expire: 30,
            addCookie: function(value) {
                var self = this;
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(self.cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');

                    if (cookieArr.indexOf(value) != -1) {
                        cookie.deleteCookie(self.cookieName, value);
                        cookieArr.splice(cookieArr.indexOf(value), 1);
                        cookieArr.unshift(value);
                    } else {
                        cookieArr.unshift(value);
                        if (cookieArr.length > self.maxNum) cookieArr.length = self.maxNum;
                    }
                    cookies = cookieArr.join(',');
                    cookie.setCookie(self.cookieName, cookies, self.expire);
                } else {
                    cookie.setCookie(self.cookieName, value, self.expire);
                }
            }
        },
        isMobile: function() {
            var userAgent = navigator.userAgent.toLowerCase();
            var mobile = new Array('iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'samsung', 'sonyericsson', 'opera mobi', 'iemobile', 'mot');
            var isMobile = 0;

            for(var count=0; count < mobile.length; count++) {
                if(userAgent.indexOf(mobile[count]) != -1) {
                    isMobile = true;
                    break;
                }
            }

            var platform = navigator.platform.toLowerCase();
            var platform_filter = new Array('win16', 'win32', 'win64', 'mac', 'macintel');

            for(var count=0; count < platform_filter.length; count++) {
                if(platform.indexOf(platform_filter[count]) != -1) {
                    isMobile = false;
                }
            }

            return isMobile;
        },
        searchParamsToObject: function(key) {
            var params = location.search.substr(location.search.indexOf("?") + 1);
            var temp, valueObject = {};

            params = params.split("&");
            
            for (var i = 0; i < params.length; i++) {
                temp = params[i].split("=");
                valueObject[temp[0]] = temp[1];
            }

            if (key) {
                return valueObject[key] || null;
            } else {
                return valueObject;
            }
        }
    }

    lgkorUI = $.extend({}, lgkorUI, csUI);
})(window);

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

CS.MD.search = function() {
    var pluginName = 'search';
    var cookie = lgkorUI.cookie;
    var cookieKeyword = lgkorUI.recentlyKeyword

    function Plugin(el, opt) {
        var self = this;
        var defaults = {
            data: {},
            template: {
                autocompleteList: '<li><a href="#">{{keyword}}</a></li>',
                recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                keywordList: '<li><a href="#">{{keyword}}</a></li>'
            }
        };

        self.$el = $(el);
        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
        self._bindEvent();  
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;
            
            self.autoUrl = self.$el.data('autocompleteUrl');

            if (self.$el.find('.recently-keyword').length) self._setRecently();
        },
        _setRecently: function() {
            var self = this;
            var $recentlyKeyword = self.$el.find('.recently-keyword');
            var tmpl = self.options.template,
                keywordCookie = cookie.getCookie('LG_SupportKeyword'),
                arr = [];
            
            $recentlyKeyword.find('ul').empty();

            if (keywordCookie && keywordCookie.length > 0) {
                arr = keywordCookie.split(',');
                if (arr.length) {
                    arr.forEach(function(item) {
                        var html = tmpl.recentlyList.replace('{{keyword}}', item.toString());
                        $recentlyKeyword.find('ul').append(html);
                    });
                    $recentlyKeyword.find('ul').show();
                    $recentlyKeyword.find('.no-keyword').hide();
                } else {    
                    $recentlyKeyword.find('ul').hide();
                    $recentlyKeyword.find('.no-keyword').show();
                }
            } else {
                $recentlyKeyword.find('ul').hide();
                $recentlyKeyword.find('.no-keyword').show();
            }            
        },
        setPopularKeyword: function(data) {
            var self = this;
            var $popularKeyword = self.$el.find('.popular-keyword');
            var tmpl = self.options.template,
                arr = data instanceof Array ? data : [],
                html = '';

            $popularKeyword.find('ul').empty();

            if (arr.length) {
                arr.forEach(function(item) {
                    html += tmpl.keywordList.replace('{{keyword}}', item);
                });

                $popularKeyword.find('ul').html(html);
                $popularKeyword.find('ul').show();
                $popularKeyword.find('.no-keyword').hide();
            } else {
                $popularKeyword.find('ul').hide();
                $popularKeyword.find('.no-keyword').show();
            }
        },
        _setAutoComplete: function(data) {
            var self = this;
            var tmpl = self.options.template,
                arr = data instanceof Array ? data : [];

            self.$el.find('.autocomplete-box').find('ul').remove();

            if (arr.length) {
                var html = vcui.template(tmpl.autocompleteList, {
                    list: arr
                });
                self.$el.find('.autocomplete-box').find('.keyword-list').prepend(html);
                self.$el.find('.autocomplete-box').find('ul').show();
                self.$el.find('.autocomplete-box').find('.no-keyword').hide();
            } else {
                self.$el.find('.autocomplete-box').find('ul').hide();
                self.$el.find('.autocomplete-box').find('.no-keyword').show();
            }
        },
        _bindEvent: function() {
            var self = this;

            self.$el.on('click', '.search-layer .btn-delete', function() {
                var $box = $(this).closest('li');
                cookie.deleteCookie('LG_SupportKeyword', $box.find('a').text())
                self._setRecently();
            });

            self.$el.on('click', '.search-layer .btn-close', function() {
                self.$el.removeClass('on');
            });

            self.$el.on('click', '.search-layer .autocomplete-box a', function() {
                self.$el.trigger('autocompleteClick', [this]);
            });

            self.$el.on('click', '.search-layer .keyword-box a', function() {
                var val = $(this).text().trim();
                self.$el.find('input[type=text]').val(val);
                self.$el.removeClass('on');
            });

            self.$el.find('input[type=text]').on('focus', function() {
                if (self.$el.find('.keyword-box').length) {
                    self.$el.addClass('on');
                }
            }).on('input', function() {
                var val = $(this).val();

                if (val.length > 1) {
                    var param = {
                        keyword: val
                    };  
                    
                    self.$el.trigger('autocomplete', [param, self.autoUrl, function(result) {
                        self._setAutoComplete(result.searchList)
                        
                        $('.autocomplete-box').show();
                        $('.keyword-box').hide();
                        self.$el.addClass('on');
                    }]);

                    $('.search-error').hide();
                } else {
                    self.$el.find('.autocomplete-box').find('ul').empty();
                    $('.autocomplete-box').hide();
                    $('.keyword-box').show();
                }
            }).on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$el.find('.btn-search').trigger('click');
                }
            });

            self.$el.find('.btn-search').on('click', function() {
                var val = self.$el.find('input[type=text]').val().trim();
                if (val.length > 1) {
                    cookieKeyword.addCookie(val);
                    self._setRecently();    
                    $('.search-error').hide();
                } else {
                    $('.search-error').show();   
                }

                self.$el.removeClass('on');
            });

            $('body').on('click', function (e) {
                if (!$(e.target).parents('.keyword-search')[0]) {
                    self.$el.removeClass('on');
                }
            });
        }
    };

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.commonModel = function() {
    var pluginName = 'commonModel';
    var selectedBarTmpl = 
        '<div class="box">' +
            '<div class="prod-info">' +
                '{{# if (typeof tit != "undefined") { #}}' +
                '<p class="tit">서비스 이용을 위해 제품을 선택해주세요.</p>' +
                '{{# } #}}' +
                '{{# if (typeof product != "undefined") { #}}' +
                '<div class="product-box">' +
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
                    '<a href="#" class="btn-add-product"><span>보유제품 추가</span></a>' +
                    '{{# } #}}' +
                '</div>' +
                '{{# } #}}' +
            '</div>' +
            '{{# if (typeof reset != "undefined") { #}}' +
            '<div class="prod-btn">' +
                '{{# if (reset == "type") { #}}' +
                '<button type="button" class="btn border size reset btn-reset">문의유형 재선택</button>' +
                '{{# } #}}' +
                '{{# if (reset == "product") { #}}' +
                '<button type="button" class="btn border size reset btn-reset">제품 재선택</button>' +
                '{{# } #}}' +
            '</div>' +
            '{{# } #}}' +
        '</div>';

    var modelListTmpl = 
        '<div class="slide-conts">' +
            '{{# if (modelCode != "") { #}}' +
            '<a href="#" class="item" data-cst-flag="Y" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-name="{{categoryNm}}" data-sub-category-name="{{subCategoryNm}}">' +
            '{{# } else { #}}' +
            '<a href="#" class="item no-model" data-cst-flag="Y" data-category="{{category}}" data-sub-category="{{subCategory}}" data-model-code="{{modelCode}}" data-product-code="{{productCode}}" data-category-name="{{categoryNm}}" data-sub-category-name="{{subCategoryNm}}">' +
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

    var termsValidation;
    var myModel = [];

    function Plugin(el, opt) {
        var self = this;
        var defaults = {
            stepClass: 'step-box',
            stepActiveClass: 'active',
            page: 1,
            total: 0,
            register: {},
            isRequest: true,
            selected: {
                category: '',
                categoryName: '',
                subCategory: '',
                subCategoryName: '',
                modelCode: '',
                productCode: '',
            },
            defaultSummary: {
                tit: '서비스이용을 위해 제품을 선택해 주세요.'
            }
        };

        self.$el = $(el);
        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
        self._bindEvent();  
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;
            var opts = self.options;

            // 스텝 영역
            self.$stepBox = self.$el.find('.step-box');
            self.$stepTerms = self.$el.find('#stepTerms');
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
            self.$modelSlider = self.$modelBox.find('.model-slider');
            self.$modelNoData = self.$modelBox.find('.no-data');

            // 옵션
            self.isDefault = $('#category').val() ? true : false;
            self.modelUrl = self.$searchArea.data('modelUrl');
            self.resultUrl = self.$searchArea.data('resultUrl');
            self.isRequest = opts.isRequest;
            self.page = opts.page;
            self.totalCount = opts.totalCount;
            self.selected = opts.selected;
            self.param = {
                pageCode: self.$el.find('#pageCode').val(),
                serviceType: self.$el.find('#serviceType').val()
            };
            self.isModel = self.selected.modelCode ? true : false;
            self.isPrivacy = (self.$stepTerms.length && self.$stepTerms.hasClass('active')) ? true : false

            self.$modelFilter.find('.ui_select_target').vcSelectTarget();
            
            lgkorUI.searchModelName();

            self._initMyProduct();
            self._initStepTerms();
            
            if (self.isModel && !self.isPrivacy) self.$el.trigger('complete', [self.selected, self.resultUrl, true]);
        },
        _bindEvent: function() {
            var self = this;

            // 제품 재선택
            self.$selectedModelBar.on('click', '.btn-reset', function() {
                self.reset();
            });

            // 문의유형 : 제품선택
            self.$stepInquiry.find('.btn-next').on('click', function() {
                var result;
                

                if (self.isPrivacy) {
                    result = termsValidation.validate();
                    if (!result.success) {
                        return;
                    }
                }

                self.$selectedModelBar.show();
                if (self.isDefault) {
                    self.$el.trigger('complete', [self.selected, self.resultUrl]);
                } else {
                    self.$myModelArea.show();
                    self.next(self.$stepModel);
                    self.$myModelSlider.vcCarousel('resize');
                }
                
                self.focus(self.$selectedModelBar);
            });

            // 문의유형 선택
            self.$stepInquiry.find('.btn-type').on('click', function() {
                var $this = $(this),
                    data = $this.data(),
                    result;

                if (self.isPrivacy) {
                    result = termsValidation.validate();
                    if (!result.success) {
                        return;
                    }
                }

                self.$el.find('#category').val(data.category);
                self.$el.find('#categoryNm').val(data.categoryName);
                self.$el.find('#subCategory').val(data.subCategory);
                self.$el.find('#subCategoryNm').val(data.subCategoryName);
                
                data.isRequest = false;

                self.$el.trigger('complete', [data]);
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
            self.$categoryBox.find('.btn-close').on('click', function() {
                $(this).closest('.box').removeClass('on').addClass('off');
            });

            // 서브 카테고리 선택
            self.$categoryBox.find('.sub-category-list button').on('click', function() {
                var $this = $(this),
                    data = $this.data();
                    opt = self.options;

                self.param = $.extend(self.param, {
                    keyword: '',
                    category: data.category,
                    categoryNm: data.categoryName,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryName,
                    page: 1
                });

                self.updateSummary({
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

                var $this = $(this),
                    data = $this.data(),
                    url;

                url = self.$searchArea.data('resultUrl');  

                data.isRequest = true;
                self.$el.find('#category').val(data.category);
                self.$el.find('#categoryNm').val(data.categoryName);
                self.$el.find('#subCategory').val(data.subCategory);
                self.$el.find('#subCategoryNm').val(data.subCategoryName);
                self.$el.find('#modelCode').val(data.modelCode);
                self.$el.find('#productCode').val(data.productCode);
                self.$el.find('#isMyProduct').val('N');
                self.$el.trigger('complete', [data, url]);

                if (data.modelCode) lgkorUI.recentlySearch.addCookie(data.modelCode);
            });
            
            self.$modelBox.find('#categorySelect').on('change', function() {
                var $this = $(this),
                    $subCategory = self.$modelBox.find('#subCategorySelect');
                
                if (!$this.val()) {
                    self.param = $.extend(self.param, {
                        category: $this.val(),
                        categoryNm: $this.find('option:selected').text(),
                        subCategory: $subCategory.val(),
                        subCategoryNm: $subCategory.find('option:selected').text(),
                        page: 1
                    });
    
                    self._requestData();
                }
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
        },
        _initMyProduct: function() {
            var self = this;

            if (!self.$myModelSlider.length) return;

            self.$myModelSlider.find('a').each(function() {
                var modelCode = $(this).data('modelCode');
                myModel.push(modelCode);
            });

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

            self.$myModelSlider.find('a').on('click', function(e) {
                e.preventDefault();

                var $this = $(this),
                    data = $this.data(),
                    url = self.$searchArea.data('resultUrl');

                if ($this.hasClass('disabled')) {
                    $(window).trigger("toastshow", "예약가능한 제품이 아닙니다.");
                } else {
                    data.isRequest = true;

                    self.$el.find('#category').val(data.category);
                    self.$el.find('#categoryNm').val(data.categoryName);
                    self.$el.find('#subCategory').val(data.subCategory);
                    self.$el.find('#subCategoryNm').val(data.subCategoryName);
                    self.$el.find('#modelCode').val(data.modelCode);
                    self.$el.find('#productCode').val(data.productCode);
                    self.$el.find('#isMyProduct').val('Y');
                    self.$el.trigger('complete', [data, url]);
                }
            });

            self.$myModelArea.find('.btn-toggle').on('click', function() {
                var $this = $(this),
                    $toggleBox = $this.closest('.box');

                if ($toggleBox.hasClass('open')) {
                    self.$myModelSlider.stop().slideUp(function() {
                    });
                    $toggleBox.removeClass('open');
                    $this.html('보유제품 펼치기');
                } else {
                    self.$myModelSlider.stop().slideDown(function() {
                        
                    });
                    $toggleBox.addClass('open');
                    $this.html('보유제품 접기');
                }
            });
        },
        _initStepTerms: function() {
            var self = this;

            if (!self.$stepTerms.length || !self.isPrivacy) return;

            termsValidation = new vcui.ui.CsValidation('#stepTerms', {register: {
                privcyCheck: { msgTarget: '.err-block' }
            }});

            self.$stepTerms.find('.btn-next').on('click', function() {
                var result = termsValidation.validate();
                
                if (result.success) {
                    self.$selectedModelBar.show();

                    if (self.isModel) {
                        self.$el.trigger('complete', [self.selected, self.resultUrl]);
                    } else {
                        self.$myModelArea.show();
                        self.next(self.$stepModel);
                        self.$myModelSlider.vcCarousel('resize');
                    }
                    
                    self.focus(self.$selectedModelBar);
                }
            });
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
        _toggleArrow: function($arrow, flag) {
            $arrow[flag ? 'removeClass' : 'addClass']('disabled')
                        .prop('disabled', !flag)
                        .attr('aria-disabled', (!flag).toString());
        },
        _requestData: function() {
            var self = this;
            var url = self.modelUrl;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, self.param, function(result) {
                var data = result.data,
                    arr = data.listData instanceof Array ? data.listData : [];

                self.page = data.listPage.page;
                self.totalCount = data.listPage.totalCount;
                self.$modelSlider.find('.slide-track').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
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

                    self.$modelSlider.vcCarousel('resize');
                } else {
                    self.$modelSlider.hide();
                    self.$modelNoData.find('.word').html(self.param.keyword);
                    self.$modelNoData.show();
                }

                lgkorUI.hideLoading();
            });
        },
        _nextStepModel: function() {
            var self = this;
            
            self.$selectedModelBar.show();
            self.$myModelArea.show();
            self.$myModelSlider.vcCarousel('resize');
            self.next(self.$stepModel);
            self.focus(self.$selectedModelBar);
        },
        _nextStepResult: function() {
            var self = this;

            self.$selectedModelBar.show();
            self.$myModelArea.hide();
            self.next(self.$stepInput);
            self.focus(self.$selectedModelBar);
        },
        setModel: function(data) {
            var self = this;
            var opts = self.options,
                model = data || opts.selected;

            self.selected = $.extend(self.selected, model);
        },
        getModel: function() {
            var self = this;
            return self.selected;
        },
        updateSummary: function(summary) {
            var self = this;
            var summary = summary || self.options.defaultSummary;

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
        focus: function($target, callback) {
            $('html, body').stop().animate({
                scrollTop: $target.offset().top
            }, function() {
                callback && callback();
            });
        },
        next: function($target) {
            var self = this,
                opt = self.options;
                
            $target.siblings('.'+ opt.stepClass).removeClass(opt.stepActiveClass);
            $target.addClass(opt.stepActiveClass);
        },
        reset: function() {
            var self = this;
            var opts = self.options;

            self.page = opts.page;
            self.totalCount = opts.totalCount;
            self.param = opts.param;

            self.isDefault = false;
            self.isRequest = true;
            self.page = opts.page;
            self.totalCount = opts.totalCount;
            self.selected = opts.selected;
            self.param = {
                pageCode: self.$el.find('#pageCode').val(),
                serviceType: self.$el.find('#serviceType').val()
            }

            self.$el.find('#category').val('');
            self.$el.find('#categoryNm').val('');
            self.$el.find('#subCategory').val('');
            self.$el.find('#subCategoryNm').val('');
            self.$el.find('#modelCode').val('');
            self.$el.find('#productCode').val('');
            self.$el.find('#isMyProduct').val('N');

            self.$myModelArea.show();
            self.$keywordInput.val('');
            self.$categoryBox.find('.box').removeClass('on off');
            self.$categoryBox.addClass(opts.stepActiveClass);
            self.$modelBox.removeClass(opts.stepActiveClass);
            self.$modelBox.find('.keyword-search').hide();
            self.$modelInput.val('');
            self.$modelSlider.find('.slide-track').empty();
            self.$modelFilter.find('#categorySelect').vcSelectTarget('reset', 'default');
            self.$keywordBox.show();
            self.$keywordBox.find('.search-desc').hide();
            self.$selectedModelBar.vcSticky('destroy');

            self.updateSummary();

            self.$el.trigger('reset');
        },
        complete:function() {
            var self = this;
            self.$el.trigger('complete', [self.selected, self.resultUrl]);
        }
    };

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.calendar = function() {
    var dateUtil = vcui.date;
    var detect = vcui.detect;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateRegex = /[0-9]{4}.?[0-9]{2}.?[0-9]{2}/;

    var pluginName = 'calendar';

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            weekNames: ['일', '월', '화', '수', '목', '금', '토'],
            titleFormat: 'yyyy년 MM월 dd일',
            inputTarget: '', // 날짜를 선택했을 때, 날짜가 들어갈 인풋박스의 셀렉터
            date: new Date(), // 처음에 표시할 기본 날짜
            today: new Date(), // 오늘 날짜
            template: {
                header: '<div class="month-wrap">' + '<button type="button" class="arrow prev"><span class="blind">이전</span></button>' + '<span class="month"></span>' + '<button type="button" class="arrow next"><span class="blind">다음</span></button>' + '</div>',
                button: '<button type="button" class="day {{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}"><span>{{day}}</span></button>',
                timeButton: '<button type="button" class="{{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}"><span>{{time}}</span></button>'
            },
            caption: '캘린더입니다. 글은 일요일, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일 순으로 나옵니다',
            colWidth: 'calc(100% / 7)', // 셀 너비
            format: 'yyyy.MM.dd',
            paramFormat: 'yyyyMMdd'
        };

        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this,
                arr = self.options.dateArr instanceof Array ? self.options.dateArr : [];


            if (arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    arr.push(vcui.date.parse(arr[i]));
                }
                self.currDate = arr[0];
            } else {
                self.currDate = self.options.today;
            }

            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
            }

            self.dateArr = arr;

            self._render();
        },
        _render: function _render() {
            var self = this,
                opts = self.options,
                tmpl;

            tmpl = opts.template.header + '<div class="box-table"></div>';

            self._remove();
            self.$calendar = $(tmpl);
            self.$el.empty().append(self.$calendar);

            self.$el.find(self.$calendar).off('.calendar').on('click.calendar', '.arrow', function (e) {
                var $el = $(e.currentTarget),
                    isPrev = $el.hasClass('prev')

                if ($el.hasClass('disabled')) {
                    return;
                }

                self[isPrev ? 'prev' : 'next']();
                self.$calendar.find('.' + (isPrev ? 'prev' : 'next')).focus();
            }).on('click.calendar', '.day:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                if ($(e.currentTarget).hasClass('disabled')) {
                    return;
                }

                var $this = $(this).closest('td'),
                    data = $this.data(),
                    date = new Date(data.year, data.month -1, data.day),
                    format = dateUtil.format(date, opts.paramFormat || '');

                self.$calendar.find('.choice').removeClass('choice');
                self.activeDate = date;
                $this.addClass('choice');
                if (opts.inputTarget) {
                    self.$input.val(format);
                }

                self.$el.trigger('dateselected', [format]);
            })

            self._renderHeader();
            self._renderDate();

            return self;
        },
        /**
         * 달력 그리기
         * @returns {Calendar}
         * @private
         */
        _renderDate: function _renderDate() {
            var self = this,
                opts = self.options,
                date = self._getDateList(self.currDate),
                html = '',
                tmpl = vcui.template(opts.template[opts.type] || opts.template.button),
                isToday = false,
                isSelectDay = false,
                isOtherMonth = false,
                isDisabled = false,
                i, j, y, m, d, week, len, nowd;

            html += '<table class="tb-calendar"><caption>' + opts.caption + '</caption>';
            html += '<colgroup>';
            for (i = 0; i < 7; i++) {
                html += '<col width="' + opts.colWidth + '" />';
            }
            html += '</colgroup><thead>';
            for (i = 0; i < 7; i++) {
                html += '<th class="' + (i === 0 ? ' sun' : i === 6 ? ' ui-calendar-saturday' : '') + '" scope="col">';
                html += opts.weekNames[i];
                html += '</th>';
            }
            html += '</thead><tbody>';
            for (i = 0, len = date.length; i < len; i++) {
                week = date[i];

                html += '<tr>';
                for (j = 0; j < 7; j++) {
                    y = week[j].year, m = week[j].month, d = week[j].day;
                    nowd = new Date(y, m - 1, d);

                    if (self.activeDate) {
                        isSelectDay = self.activeDate.getFullYear() === y && self.activeDate.getMonth() + 1 === m && self.activeDate.getDate() === d;
                    }
                    isToday = opts.today.getFullYear() === y && opts.today.getMonth() + 1 === m && opts.today.getDate() === d;
                    isOtherMonth = self.currDate.getMonth() + 1 != m;
                    isDisabled = !self._compareDate(nowd);

                    html += '<td class="' + (isDisabled ? " disabled" : "");
                    
                    html += (j === 0 ? ' ui-calendar-sunday' : j === 6 ? ' ui-calendar-saturday' : '') + (isToday ? ' ui-calendar-today' : '') + (!isDisabled && isSelectDay ? ' choice' : '');
                    
                    html += '" data-year="' + y + '" data-month="' + m + '" data-day="' + d + '">';

                    if (!isOtherMonth) {
                        html += tmpl({
                            title: dateUtil.format(nowd, opts.titleFormat) + (isToday ? ' 오늘' : '') + (isDisabled ? " 선택할 수 없음" : isSelectDay ? ' 선택일' : ''),
                            isToday: isToday,
                            isOtherMonth: isOtherMonth,
                            isSunday: j === 0,
                            isSaturday: j === 6,
                            day: d,
                            date: nowd,
                            disabled: isDisabled
                        });
                    } else {
                        html += '&nbsp;';
                    }

                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            self.$el.find('.box-table').html(html);

            return self;
        },
        /**
         * 헤더에 현재 날짜에 대한 정보 표시
         * @private
         */
        _renderHeader: function _renderHeader() {
            var self = this;

            var currDate = new Date(self.currDate.getTime()),
                minDate = vcui.date.parse(self.dateArr[0]),
                maxDate = vcui.date.parse(self.dateArr[self.dateArr.length - 1]),
                html,
                $second = self.$el.find('.month-wrap');
                isFirst = currDate.getFullYear() === minDate.getFullYear() && currDate.getMonth() === minDate.getMonth(),
                isLast = currDate.getFullYear() === maxDate.getFullYear() && currDate.getMonth() === maxDate.getMonth();
            
            html = currDate.getFullYear() + '<span class="blind">년</span>.' + (currDate.getMonth() + 1)+ '<span class="blind">월</span>';
            $second.find('.month').html(html);
            
            $second.find('.prev').toggleClass('disabled', isFirst).prop('disabled', isFirst).attr('tabindex', isFirst ? '-1' : '0');
            $second.find('.next').toggleClass('disabled', isLast).prop('disabled', isLast).attr('tabindex', isLast ? '-1' : '0');
        },
        _remove: function _remove() {
            var self = this;

            if (self.$calendar) {
                self.$calendar.off();
                self.$calendar.remove();
                self.$calendar = null;
            }

            return self;
        },
        /**
         * 주어진 날짜가 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareDate: function _compareDate(date) {
            var self = this,
                flag = false;
            if (!(date instanceof Date)) {
                date = dateUtil.parse(date);
            }
            if (!date || isNaN(date)) {
                return null;
            }
            date.setHours(0, 0, 0, 0);

            self.dateArr.forEach(function(item) {
                item = vcui.date.parse(item);

                if (date.getTime() === item.getTime()) {
                    flag = true;
                    return false;
                }
            });

            return flag;
        },
        /**
         * 날짜 데이타 계산
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {Array}
         */
        _getDateList: function _getDateList(date) {
            date.setDate(1);

            var self = this,
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                startOnWeek = date.getDay() + 1,
                last = daysInMonth[date.getMonth()],
                // 마지막날
            prevLast = daysInMonth[date.getMonth() === 0 ? 11 : date.getMonth() - 1],
                // 이전달의 마지막날
            startPrevMonth = prevLast - startOnWeek,
                // 이전달의 시작일
            y = year,
                m = month;

            if (month > 12) {
                month -= 12, year += 1;
            } else {
                if (month == 2 && self._isLeapYear(year)) {
                    last = 29;
                }
            }

            var data = [],
                week = [];

            if (startOnWeek > 0) {
                if (month == 3 && self._isLeapYear(year)) {
                    startPrevMonth += 1;
                }
                if ((m = month - 1) < 1) {
                    m = 12, y = year - 1;
                }
                for (var i = 1; i < startOnWeek; i++) {
                    week.push({ year: y, month: m, day: startPrevMonth + i + 1 }); // ***** +1
                }
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            for (var i = 1; i <= last; i++) {
                week.push({ year: year, month: month, day: i });
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            if (week.length > 0 && week.length < 7) {
                if ((m = month + 1) > 12) {
                    m -= 12, y = year + 1;
                }
                for (var i = week.length, d = 1; i < 7; i++, d++) {
                    week.push({ year: y, month: m, day: d });
                }
            }
            week.length && data.push(week);
            return data;
        },
        update: function update(dateArr) {
            var self = this,
                arr = [];

            self.activeDate = null;
            self.dateArr = dateArr;

            for (var i = 0; i < self.dateArr.length; i++) {
                arr.push(vcui.date.parse(self.dateArr[i]));
            }

            self.currDate = arr[0];

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        reset: function reset() {
            var self = this;

            self.activeDate = null;
            self.currDate = self.options.today;
            self.dateArr = [];

            self.$el.find('.choice').removeClass('choice');

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        /**
         * 이전달
         * @returns {Calendar}
         */
        prev: function prev() {
            var self = this,
                currDate = vcui.date.add(self.currDate, 'M', -1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderHeader();
            self._renderDate();

            return this;
        },

        /**
         * 다음달
         * @returns {Calendar}
         */
        next: function next() {
            var self = this,
                currDate = vcui.date.add(self.currDate, 'M', 1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderHeader();
            self._renderDate();

            return this;
        },
        /**
         * 윤년 여부
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {boolean} 윤년 여부
         */
        _isLeapYear: function _isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.timeCalendar = function() {
    var dateUtil = vcui.date;
    var detect = vcui.detect;

    var dateRegex = /[0-9]{2}:?[0-9]{2}/;

    var pluginName = 'timeCalendar';

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            timeName: ['09', '10', '11', '12', '13', '14', '15', '16', '17'],
            titleFormat: 'hh시 mm분',
            template: {
                button: '<button type="button" class="{{disabled?"disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}><span>{{time}}분</span></button>'
            },
            caption: '시간 캘린더입니다. 글은 9시, 10시, 11시, 12시, 13시, 14시, 15시, 16시, 17시 순으로 나옵니다',
            colWidth: 'calc(85% / 6)', // 셀 너비
            format: 'hh:mm'
        };

        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;

            self.timeArr = self.options.timeArr instanceof Array ? self.options.timeArr : [];

            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
            }

            self._render();
        },
        _render: function _render() {
            var self = this,
                tmpl;

            tmpl = '<div class="box-table"></div>';

            self._remove();
            self.$calendar = $(tmpl);
            
            self.$el.find('>*:not(.box-desc)').remove()
            self.$el.append(self.$calendar);
            
            self.$calendar.off('.timecalendar').on('click.timecalendar', 'button:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                
                var $this = $(this).closest('td'),
                    data = $this.data(),
                    time = data.hour + '' + data.min;

                self.$calendar.find('.choice').removeClass('choice');
                self.activeTime = time;
                $this.addClass('choice');
                $this.siblings('th').addClass('choice');

                if (self.options.inputTarget) self.$input.val(time);

                self.$el.trigger('timeselected', [time]);
            });
            
            self._renderTime();

            return self;
        },
        /**
         * 시간 그리기
         * @returns {Calendar}
         * @private
         */
        _renderTime: function _renderTime() {
            var self = this,
                opts = self.options,
                html = '',
                tmpl = vcui.template(opts.template.button),
                isDisabled = false,
                i, j, time, nowd, hour, min;

            //time = self._getTimeList();

            html += '<table class="tb-timetable"><caption>' + opts.caption + '</caption>';
            html += '<colgroup>';
            for (i = 0; i < 7; i++) {
                if (i == 0) {
                    html += '<col width="' + '15%' + '" />';
                } else {
                    html += '<col width="' + opts.colWidth + '" />';
                }
            }
            html += '</colgroup><tbody>';
            for (i = 0; i < opts.timeName.length; i++) {
                html += '<tr>';

                html += '<th scope="row">'+ opts.timeName[i] +'시</th>';
                for (j = 0; j < 6; j++) {
                    
                    hour = opts.timeName[i];
                    min = j + '0';
 
                    nowd = hour + min;

                    isDisabled = !self._compareDate(nowd);
                    
                    html += '<td class="' + (isDisabled ? "disabled" : "");
                    html += '" data-hour="' + hour + '" data-min="' + min + '">';
                    
                    html += tmpl({
                        title: dateUtil.format(nowd, opts.titleFormat) + (isDisabled ? " 선택할 수 없음" : ""),
                        time: min,
                        disabled: isDisabled
                    });

                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            self.$el.find('.box-table').html(html);

            if (self.timeArr.length) {
                self.$el.find('.box-desc').hide();
                self.$el.find('.box-table').show();
            }

            return self;
        },
        /**
         * 주어진 날짜가 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareDate: function _compareDate(time) {
            var self = this,
                flag = false;
            
            if (!time || isNaN(time)) {
                return null;
            }

            self.timeArr.forEach(function(item) {
                if (time == item) {
                    flag = true;
                    return false;
                }
            });

            return flag;
        },
        _remove: function _remove() {
            var self = this;

            if (self.$calendar) {
                self.$calendar.off();
                self.$calendar.remove();
                self.$calendar = null;
            }

            return self;
        },
        update: function update(timeArr) {
            var self = this;

            self.timeArr = timeArr;
            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        reset: function reset() {
            var self = this;

            self.timeArr = [];
            self.$el.find('.box-desc').show();
            self.$el.find('.box-table').hide();
            self.$el.find('.choice').removeClass('choice');

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        }
    }

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

                    lgkorUI.alert("", {
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
                form: '',
                popup: '',
                name: '',
                phone: '',
                number: ''
            },
            // },
            // target: {
            //     name: '',
            //     phone: ''
            // },
            register: {}
        };

        self.options = options = $.extend({}, defaults, options);
        self.nameName = $(options.elem.name)[0].name;
        self.phoneName = $(options.elem.phone)[0].name;
        self.numberName = $(options.elem.number)[0].name;
        self.popFlag = options.elem.popup ? true : false;

        self.smsUrl = self.popFlag ? $(options.elem.popup).data('smsUrl') : $(options.elem.form).data('smsUrl');
        self.authUrl = self.popFlag ? $(options.elem.popup).data('authUrl') : $(options.elem.form).data('authUrl');

        var register = options.register || {};

        self.validation = new vcui.ui.CsValidation(self.popFlag ? options.elem.popup : options.elem.form, {
            register: register
        });
    }

    AuthManager.prototype = {
        send: function(el) {
            var self = this;
            var elem = self.options.elem,
                result = self.validation.validate([self.nameName, self.phoneName]),
                data, url;

            if (result.success) {
                url = self.smsUrl;
                data = self.validation.getValues([self.nameName, self.phoneName]);

                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    var resultData = result.data;

                    if (resultData.resultFlag == 'Y') {
                        $(el).find('span').html(RESENDTEXT);
                        $(elem.number).prop('disabled', false);
                    }

                    lgkorUI.alert("", {
                        title: resultData.resultMessage
                    });
                });
            }
        },
        open: function(completeCallback) {
            var self = this;
            var elem = self.options.elem;

            completeCallback && completeCallback();

            $(elem.popup).vcModal();
        },
        confirm: function(el, callback) {
            var self = this;
            var $button = $(el),
                elem = self.options.elem,
                target = self.options.target,
                result = self.validation.validate(),
                url, data, success = false;

            if (result.success == true) {
                url = self.authUrl;
                data = self.validation.getValues([self.nameName, self.phoneName, self.numberName]);

                if ($(elem.number).prop('disabled')) {
                    lgkorUI.alert("", {title: '인증번호 발송 버튼을 선택해 주세요.'});
                    return false;
                }

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    var resultData = result.data;

                    if (resultData.resultFlag == 'Y') {
                        success = true;

                        if (target) {
                            $button.prop('disabled', true);
                            $button.find('span').html(COMPLETETEXT);
                            $(target.name).val(data.authName);
                            $(target.phone).val(data.authPhoneNo);
                            $(elem.popup).vcModal('hide');
                        }

                        if (resultData.resultMessage) {
                            lgkorUI.alert("", {
                                title: resultData.resultMessage,
                                ok: function(el) {
                                    if (resultData.url) {
                                        $(self.options.elem.form).attr('action', resultData.url);
                                        $(self.options.elem.form).submit();
                                        // location.href = resultData.url;
                                    } else {
                                        $(el).vcModal('hide');
                                        callback && callback(success, result);
                                    }
                                }
                            });
                        } else if (resultData.url) {
                            $(self.options.elem.form).attr('action', resultData.url);
                            $(self.options.elem.form).submit();
                            // location.href = resultData.url;
                        } else {
                            callback && callback(success, result);
                        }
                    } else {
                        success = false;
                        
                        lgkorUI.alert("", {
                            title: resultData.resultMessage,
                            ok: function(el) {
                                if (resultData.url) {
                                    location.href = resultData.url;
                                } else {
                                    $(el).vcModal('hide');
                                    callback && callback(success, result);
                                }
                            }
                        });
                    }

                    lgkorUI.hideLoading();
                });
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
        vcui.require(['ui/selectbox'], function () {    
            // 퀵 메뉴 (미정)
            $('#quickMenu').quickMenu();
        });

        if( $('#surveyPopup').length) {
            vcui.require(['ui/selectbox', 'ui/satisfactionModal']);
        }

        if ($('.ui_common_scroll').length && !lgkorUI.isMobile()) $('.ui_common_scroll').mCustomScrollbar();
    }

    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);
