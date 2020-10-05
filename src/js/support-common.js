var CS = CS || {};
CS.MD = CS.MD || {};
CS.UI = CS.UI || {};

CS.UI.elem = {};

/*
* validation cehck
*/
CS.MD.validation = function() {
    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el,
        self.errorList = [];
        self.elements;

        var defaults = {
            valid: function() {},
            inValid: function() {}
        };

        self.options = $.extend({}, defaults, opt);
    
        self.elements = self.$el.find('[name]');
    }

    $.extend(Plugin, {
        rules: {
            required: function() {

            },
            email: function() {

            },
            date: function() {

            },
            tel: function() {

            },
            file: function() {

            },
            number: function() {

            },
            alphabet: function() {

            },
            minLength: function() {

            },
            maxLength: function() {

            },
        }
    })

    Plugin.prototype = {
        start: function() {
            var self = this,
                options = self.options;

            self.errorList = [];

            self.elements.each(function(index, item) {
                var $element = $(item);

                self._validationCheck(item);
            });

            if (self.errorList.length) {
                $.each(self.errorList, function(index, item) {
                    self._accessibility(item);
                    self._invalid(item);
                });

                self._focus(self.errorList[0]);

                return false;
            }

            return true;
        },
        _getRules: function(el) {
            var self = this;


        },
        _invalid: function(el) {
            var self = this;

            
        },
        _accessibility: function(el) {
            var self = this;


        },
        _focus: function(el) {
            var self = this,
                $el = $(el);

            if (el.type.indexOf('select') && $el.data('ui_selectbox')) {
                $el.vcSelectbox('open');
            } else {
                $el.focus();
            }
        },
        _validationCheck: function(el) {
            var self = this,
                rules = self._getRules(el),
                rule;

            for (var item in rules) {
                if (rule = Plugin.rules[item]) {
                    if (!rule(el)) {
                        self.errorList.push({
                            rule: item,
                            el: el
                        });
                    } 
                }
            }
        }
    }

    $.fn.validation = function(options){
        return this.each(function() {
            new Plugin(this, options);
        });
    };
}

/*
* 셀렉트박스 타겟
* @option data-url
* @option data-target
* @option callback()
* */
CS.MD.drawOption = function() {

    var pluginName = 'drawOption';

    function Plugin(elem, opt) {
        var _this = this;
            element = this.element = elem;

        var defaults = {};
            
        defaults = $.extend({}, $(element).data(), opt);
    

        function ajaxEventListener() {
            var formData = $(element).serialize();

            $.ajax({
                url: defaults.url,
                method: 'POST',
                dataType: 'json',
                data: formData,
                beforeSend: function(xhr) {
                    // loading bar start
                },
                success: function(data) {
                    if (data) {
                        drawEventListener(data);
                        defaults.callback && defaults.callback(); 
                    }
                },
                error: function(err){
                    console.log(err);
                },
                complete: function() {
                    // loading bar end
                }
            });
        }   
        function drawEventListener(data) {
            var html = '';

            for (var key in data) {
                html += '<option value="'+ key +'">'+ data[key] +'</option>'
            }

            $(defaults.target).html(html);
            $(defaults.target).vcSelectbox('update');
        }
        function setEventListener() {
            $(element).on('change', ajaxEventListener);
        }

        setEventListener();
    }

    Plugin.prototype = {

    };

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
}();

/*
* 페이징네이션
* */
CS.MD.pagination = function() {
    var pluginName = 'pagination';

    function Plugin(el, opt) {
        var self = this,
            el = this.el = el,
            $el = $(el);

        var defaults = {
            page: 1,
            startPage: 1,
            endPage: 5,
            totalCount: 59,
            pageToShow: 5,
            nextBtn: true,
            prevBtn: false,
            prevClass: '.prev',
            nextClass: '.next',
            disabledClass: 'disabled'
        };

        self.options = $.extend({}, defaults, opt);

        function _initialize() {
            self.$pageList = $el.find('.page_num');
            self.$prev = $el.find(self.options.prevClass);
            self.$next = $el.find(self.options.nextClass);
            self._update();
        }
        function _setEventHandler() {
            $el.on('click', 'button', function(e) {
                var $this = $(this);

                e.preventDefault();

                $(this).trigger('page_click', $this.val());
            });
        }

        _initialize();
        _setEventHandler();
    }

    Plugin.prototype = {
        _update: function() {
            var self = this,
                startPage = self.options.startPage,
                endPage = self.options.endPage,
                page = self.options.page,
                html = '';

            for (var i = startPage; i <= endPage; i++) {
                if (page === i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<button type="button" value="' + i + '" title="' + i + '페이지 보기">' + i + '</button>';
                }
            }
            
            self.options.prevBtn ? self.$prev.attr('aria-disabled', false).prop('disabled', false).val(startPage-1) : self.$prev.attr('aria-disabled', true).prop('disabled', true).val('');
            self.options.nextBtn ? self.$next.attr('aria-disabled', false).prop('disabled', false).val(endPage+1) : self.$next.attr('aria-disabled', true).prop('disabled', true).val('');
            self.$pageList.html(html);
        },
        _move: function() {
            var $target, html = '';

            if ($target) {
                if ($target.is(self.options.prevClass)) {
                    if (startPage === 1) return false;

                    startPage -= self.options.pageToShow;
                    endPage = startPage + self.options.pageToShow - 1;
                } else if ($target.is(self.options.nextClass)) { 
                    if (endPage === totalPage) return false;

                    startPage += self.options.pageToShow;
                    endPage = startPage + self.options.pageToShow - 1;

                    endPage >= totalPage && (endPage = totalPage);
                } else {
                    currentPage = parseInt($target.text());

                    if (currentPage === totalPage) {
                        startPage = currentPage - (currentPage - 1) % self.options.pageToShow;
					    endPage = currentPage;
                    }
                    callback && callback();
                }
            }

            startPage === 1 ? $prev.attr('aria-disabled', true) : $prev.attr('aria-disabled', false);
            endPage >= totalPage ? $next.attr('aria-disabled', true) : $next.attr('aria-disabled', false);

            for (var i = startPage; i <= endPage; i++) {
                if (currentPage === i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<a href="#" title="' + i + '페이지 보기">' + i + '</a>';
                }
            }

            if (self.options.pageToShow < totalPage && endPage < totalPage) {
                html += '<span class="dot">...</span>';

                if (currentPage === totalPage) {
                    html += '<strong><span class="blind">현재 페이지</span>' + totalPage + '</strong>';
                } else {
                    html += '<a href="#" title="' + totalPage + '페이지 보기">' + totalPage + '</a>';
                }
            }
    
            $pageList.html(html);
        },
        update: function(data) {
            var self = this;

            self.options = $.extend({}, self.defaults, data);
            self._update();
        },
        reset: function() {
            var self = this;

            startPage = currentPage = 1;
            endPage = totalPage <= self.options.pageToShow ? totalPage : startPage + self.options.pageToShow - 1;
            
            self._move();
        }
    }

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
}();

/* */
CS.MD.sorting  = function() {
    var pluginName = 'sorting';

    function Plugin(el, opt) {
        var self = this,
            el = this.el = el,
            $el = $(el);

        var defaults = {
            
        };

        self.options = $.extend({}, defaults, opt);

        function _initialize() {
            
        }
        function _setEventHandler() {
            
        }

        _initialize();
        _setEventHandler();
    }

    Plugin.prototype = {

    }

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
}();

(function($){
    $.fn.ajaxLoad = function(type) {
        var el = this;
    
        switch(type) {
            case 'start':
                $(el).append('<div class="loading-circle"><div class="lds-dual-ring"></div></div>');
                break;
            case 'end':
                $(el).find('.loading-circle').remove();
                break;
        }
    }

    function setTableScrollbar() {
        var $tableScroll = $(".tbl.scroll-x");

        if (!$tableScroll.length) return false;
        
        $tableScroll.mCustomScrollbar({
            axis:"x",
            advanced:{
                autoExpandHorizontalScroll:true
            }
        });
    }

    function checkPrivacy() {
        var $privacyBox = $('.privacy-box');

        if (!$privacyBox.length) return false;

        function setEventListener() {
            $('[type="checkbox"]').on('click', function(e) {
                var $this = $(this);
                
                if ($this.is(':checked')) {
                    e.preventDefault();
                
                    $('#privacyAgreeModal').vcModal();
                }
            });

            $('#privacyAgreeModal').find('.btn.black').on('click', function() {
                $privacyBox.find('[type="checkbox"]').prop('checked', true);
                $('#privacyAgreeModal').vcModal('hide');
            });
        }

        setEventListener();
    }


    function commonSlides() {
        vcui.require(['ui/carousel'], function () {
            $('.related-info').length && $('.related-info').vcCarousel({
                infinite: false,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: true,
                        }
                    }
                ]
            });

            $('.engineer-carousel').length && $('.engineer-carousel').vcCarousel({
                swipeToSlide: true,
                slidesToShow: 4,
                arrows:false,
                customPaging: function(carousel, i) {
                    var $button = $('<button type="button" class="btn-indi"><span class="blind">'+(i+1)+'번 내용 보기'+'</span></button>');
                    return $button;
                },
                responsive: [{
                    breakpoint:767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            });
        });
    }

    function commonInit(){
        CS.UI.elem.$doc = $(document);
        CS.UI.elem.$win = $(window);
        CS.UI.elem.$html = $('html');
        CS.UI.elem.$body = $('body');

        setTableScrollbar();
        checkPrivacy();
        commonSlides();
    }

    // CS.UI.elem.$win.ready( commonInit );
    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);