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

/*
* validation cehck
*/
CS.MD.validation = function() {
    var pluginName = 'validation';
    var authFlag = false;
    
    function Plugin(el, opt) {
        var self = this;
            self.$el = $(el),
            self.el = el;

        var defaults = {
            success: function() {},
            error: function() {}
        };

        self.options = $.extend({}, defaults, opt);
    
        var register = self.options.register;
        var tempObj = {};

        self.$el.find('[name]').each(function(index, el) {
            var $el = $(el),
                msgTarget = $el.data('msgTarget'),
                errorMsg = $el.data('errorMsg'),
                requiredMsg = $el.data('requiredMsg');

            if (msgTarget) {
                tempObj[el.name] = tempObj[el.name] || {};

                if (tempObj[el.name]){       
                    tempObj[el.name]['msgTarget'] = msgTarget;
                    errorMsg && (tempObj[el.name]['errorMsg'] = errorMsg);
                    requiredMsg && (tempObj[el.name]['requiredMsg'] = requiredMsg);
                    
                    if (tempObj[el.name]['auth']) {
                        self.authApt = tempObj[el.name]; 
                        self.$btn = $(tempObj[el.name]['auth'].btn);
                        self.$phone = $(tempObj[el.name]['auth'].target);
                        self.$auth = $el;
                    }
                }

                tempObj[el.name] = $.extend(tempObj[el.name], register[el.name] || {});
            }
        });

        self.register = tempObj;
    }

    Plugin.prototype = {
        start: function() {
            var self = this;

            self.errorObjs = self._validationCheck();

            self._setMessage();
            
            if (!Object.keys(self.errorObjs).length) {
                self.$el.trigger('success');
            } else {
                self._focus();
                self.$el.trigger('error');
            }
        },
        checkValidation: function(register) {
            var self = this,
                $el = self.$el.find('[name="'+name+'"]');

            self._validationCheck();
        },
        reset: function() {
            var self = this;

            for (var key in self.register) {
                var $target = self.$el.find('[name="' + key + '"]');
                var msgTarget = self.register[key].msgTarget;

                $target.val('');

                if ($target.siblings(msgTarget).length) {
                    $target.siblings(msgTarget).hide();
                } else if ($target.parent().siblings(msgTarget).length) {
                    $target.parent().siblings(msgTarget).hide();
                } else {
                    self.$el.find(msgTarget).hide();
                }

                if ($target.closest('.input-wrap, .select-wrap').length) {
                    $target.closest('.input-wrap, .select-wrap').removeClass('error');
                }
            }
        },
        _validationCheck: function(register) {
            var self = this,
                register = register || self.register,
                objs = {},
                $target;

            for (var key in register) {
                var $target = self.$el.find('[name="' + key + '"]');
                var opt = register[key];
                var value = $target.val();

                if ($target.is(':disabled')) break;

                if ($target.is(':radio') || $target.is(':checkbox') ){
                    var $checked = $target.filter(':checked');
                    if ($checked) {
                        value = $checked.val();
                    }
                }

                if (opt.required) {
                    if (!self._valueCheck(value)) {
                        objs[key] = self.register[key]['requiredMsg'];
                    } else if (opt.pattern) {                        
                        if (!self._regexCheck(opt.pattern, value)) {
                            objs[key] = self.register[key]['errorMsg'];
                        }
                    }
                } else {
                    if (opt.pattern) {                        
                        if (!self._regexCheck(opt.pattern, value)) {
                            objs[key] = self.register[key]['errorMsg'];
                        }
                    }
                }
            }

            return objs;
        },
        _regexCheck: function(pattern, val) {
            return pattern.test(val);
        },
        _valueCheck: function(val) {
            return $.trim(val) ? true : false;
        },
        _setMessage: function() {
            var self = this;
            
            for (var key in self.register) {
                var $target = self.$el.find('[name="' + key + '"]');
                var msgTarget = self.register[key].msgTarget;

                if ($target.siblings(msgTarget).length) {
                    $target.siblings(msgTarget).hide();
                } else if ($target.parent().siblings(msgTarget).length) {
                    $target.parent().siblings(msgTarget).hide();
                } else {
                    self.$el.find(msgTarget).hide();
                }

                if ($target.closest('.input-wrap, .select-wrap').length) {
                    $target.closest('.input-wrap, .select-wrap').removeClass('error');
                }
            }

            for (var key in self.errorObjs) {
                var $target = self.$el.find('[name="' + key + '"]');
                var msgTarget = self.register[key].msgTarget;
                var errOpj = self.errorObjs[key];

                if ($target.siblings(msgTarget).length) {
                    $target.siblings(msgTarget).text(errOpj).show();
                } else if ($target.parent().siblings(msgTarget).length) {
                    $target.parent().siblings(msgTarget).text(errOpj).show();
                } else {
                    self.$el.find(msgTarget).text(errOpj).show();
                }

                if ($target.closest('.input-wrap, .select-wrap').length) {
                    $target.closest('.input-wrap, .select-wrap').addClass('error');
                }
            }
        },
        _focus: function() {
            var self = this,
                $el = self.$el.find('[name="' + Object.keys(self.errorObjs)[0] + '"]');

            if ($el[0].type.indexOf('select') && $el.data('ui_selectbox')) {
                $el.vcSelectbox('focus');
            } else {
                $el.focus();
            }
        }
    }

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

    CS.MD.plugin(pluginName, Plugin);
}();

/*
* 페이징네이션
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
            pageView: 5,
            prevClass: 'prev',
            nextClass: 'next',
            disabledClass: 'disabled',
            lastView: false
        };

        opt = $.extend({}, opt, $el.data());
        self.options = $.extend({}, defaults, opt);

        function _initialize() {
            self.$pageList = $el.find('.page_num');
            self.$prev = $el.find('.' + self.options.prevClass);
            self.$next = $el.find('.' + self.options.nextClass);

            self.pageTotal = Math.ceil(self.options.totalCount / self.options.pageView);

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
            self.pageTotal = self.options.totalCount == 0 ? 1 : Math.ceil(self.options.totalCount / self.options.pageView);

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

/* PSP floating anchor tab */
CS.MD.anchorTab  = function() {
    var pluginName = 'anchorTab';

    function Plugin(el, opt) {
        var self = this,
            el = self.el = el,
            $el = self.$el = $(el);

        var defaults = {
            selectedIndex: 0,
            selectedClass: 'on',
            selectedText: '<span class="blind">선택됨</span>',
            floatingClass: 'floating',
            listSelector: 'ul',
            tabsSelector: 'ul>li>a'
        };

        self.options = $.extend({}, defaults, opt);

        function _initialize() {
            var index;

            self.$contents = $();
            self.$anchors = $el.find(self.options.tabsSelector);
            self.$anchors.each(function(index, anchor) {
                var $anchor = $(anchor),
                    href = $anchor.attr('href');
                
                if (href && $(href).length) {
                    self.$contents = self.$contents.add($(href));
                }
            });

            index = self.$anchors.parent().filter('.' + self.options.selectedClass);
            if (index >= 0) {
                self.options.selectedIndex = index;
            }
            
            self._updateProperty();
            self._select(self.options.selectedIndex);
        }
        function _setEventHandler() {
            self.$anchors.on('click', function(e) { 
                e.preventDefault();
                self.select($(e.currentTarget).parent().index());
            });

            CS.UI.$win.on('scroll resize', function() {
                var $win = CS.UI.$win,
                    scrollTop = $win.scrollTop(),
                    offsetTop = $el.offset().top,
                    floatingClass = self.options.floatingClass,
                    selectedIndex = 0;

                if (scrollTop >= offsetTop) {
                    !$el.hasClass(floatingClass) && $el.addClass(floatingClass);
                
                    self.$contents.each(function(index, content) {
                        var $content = $(content),
                            contOffsetTop = $content.offset().top - self.$el.outerHeight();
    
                        if (scrollTop >= contOffsetTop) {
                            selectedIndex = index;        
                        }
                    });
                    self._active(selectedIndex);
    
                    clearTimeout(self.timeout);
                    self.timeout = setTimeout(function () {
                        self._select(selectedIndex);
                        self.timeout = undefined;
                    }, 400);
                } else if (scrollTop < offsetTop && $el.hasClass(floatingClass)) {
                    $el.removeClass(floatingClass);
                }
            });
        }

        _initialize();
        _setEventHandler();
    }

    Plugin.prototype = {
        _updateProperty: function() {
            var self = this,
                listSelector = self.options.listSelector;
            
            self.$el.find(listSelector).attr('role', 'tablist');
            self.$anchors.each(function(index, anchor) {
                var $anchor = $(anchor),
                    href = $anchor.attr('href'),
                    id = $anchor.attr('id'),
                    $content = $(href);

                $anchor.attr({
                    'aria-controls': href.replace(/\#|\./g,''),
                    'aria-selected': false,
                    'role': 'tab'
                });
                $content.attr({
                    'aria-labelledby': id,
                    'role': 'tabpanel'
                });
            });
        },
        _focus: function() {
            var self = this,
                offsetTop = self.$contents.eq(self.options.selectedIndex).offset().top,
                tabHeight = self.$el.outerHeight();

            $('html, body').stop().animate({
                scrollTop: offsetTop - tabHeight
            }, 500);
        },
        _select: function(selectedIndex) {
            var self = this;
                selectedText = self.options.selectedText;
        
            self.options.selectedIndex = selectedIndex;

            self.$anchors.attr('aria-selected', false).parent().find('.blind').remove();
            self.$anchors.eq(selectedIndex).attr('aria-selected', true).append(selectedText).parent();
        },
        _active: function(index) {
            var self = this,
                selectedClass = self.options.selectedClass;

            self.$anchors.eq(index).parent().addClass(selectedClass).siblings().removeClass(selectedClass);
        },
        select: function(selectedIndex) {
            var self = this;
                
            self._select(selectedIndex);
            self._focus();
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

(function($){
    function _initQuickMenu() {
        
    }
    function commonInit(){
        _initQuickMenu();

        $('.scroll-x').mCustomScrollbar({
            axis:"x",
            advanced:{
                autoExpandHorizontalScroll:true
            }
        });
        $('.scroll-y').mCustomScrollbar({
            axis:"y"
        });
    }

    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);
