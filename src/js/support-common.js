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

            self.$el.on('change', function() {
                var params = $(element).serialize();

                self._ajax(params);
            });
        },
        _ajax: function(params) {
            var self = this;
            var opt = self.options;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, params, function(d) {
                if (d.data) {
                    self.draw(d.data);
                    if (opt.callback) opt.callback();
                }
                 
                lgkorUI.hideLoading();
            });
        },
        draw: function() {
            var self = this;
            var $target = $(self.options.target),
                html = '';

            for (var key in data) {
                html += '<option value="'+ key +'">'+ data[key] +'</option>'
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
*floating anchor tab 
**/
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

(function($){
    function commonInit(){
        $('#quickMenu').quickMenu();
    }

    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);
