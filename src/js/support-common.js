var CS = CS || {};
CS.MD = CS.MD || {};
CS.UI = CS.UI || {};

CS.UI.elem = {};

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
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    }
}

/*
* 파일 다중 업로드
* */
CS.MD.uploadFile = function($target) {
    
    var pluginName = 'uploadFile';

    function Plugin(elem) {
        var _this = this;
        
        var _this = this,
            element = this.element = elem,
            $element = $(element);

        var defaults = {
            
        };

        defaults = $.extend({}, defaults, opt);
    }

    Plugin.prototype = {
        
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    }
}

/*
* 페이징네이션
* */
CS.MD.setPagination = function() {

    var pluginName = 'pagination';

    function Plugin(elem, opt, callback) {
        var _this = this,
            element = this.element = elem,
            $element = $(element),
            $pageList, $prev, $next,
            currentPage, firstPage, lastPage, totalPage;

        var defaults = {
            pageToShow: 5,
            interval: 4,
            prevClass: '.prev',
            nextClass: '.next',
            disabledClass: 'disabled'
        };

        defaults = $.extend({}, defaults, opt);

        function init() {
            $pageList = $element.find('.page_num'),
            $prev = $element.find(defaults.prevClass),
            $next = $element.find(defaults.nextClass),

            totalPage = parseInt($pageList.find('>:last-child').text().replace(/[^0-9]/g,''));
            firstPage = currentPage = 1;
            lastPage = totalPage <= defaults.pageToShow ? totalPage : firstPage + defaults.interval;
        }

        function drawPagination(e) {
            var $target, html = '';

            if (e) {
                e.preventDefault();
                $target = $(e.currentTarget);
            }

            if ($target) {
                if ($target.is(defaults.prevClass)) {
                    if (firstPage === 1) return false;

                    firstPage -= defaults.pageToShow;
                    lastPage = firstPage + defaults.interval;
                } else if ($target.is(defaults.nextClass)) { 
                    if (lastPage === totalPage) return false;

                    firstPage += defaults.pageToShow;
                    lastPage = firstPage + defaults.interval;

                    lastPage >= totalPage && (lastPage = totalPage);
                } else {
                    currentPage = parseInt($target.text());

                    if (currentPage === totalPage) {
                        firstPage = currentPage - (currentPage - 1) % defaults.pageToShow;
					    lastPage = currentPage;
                    }
                    callback && callback();
                }
            }

            firstPage === 1 ? $prev.addClass(defaults.disabledClass) : $prev.removeClass(defaults.disabledClass);
            lastPage >= totalPage ? $next.addClass(defaults.disabledClass) : $next.removeClass(defaults.disabledClass);

            for (var i = firstPage; i <= lastPage; i++) {
                if (currentPage === i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<a href="#" title="' + i + '페이지 보기">' + i + '</a>';
                }
            }

            if (defaults.pageToShow < totalPage && lastPage < totalPage) {
                html += '<span class="dot">...</span>';

                if (currentPage === totalPage) {
                    html += '<strong><span class="blind">현재 페이지</span>' + totalPage + '</strong>';
                } else {
                    html += '<a href="#" title="' + totalPage + '페이지 보기">' + totalPage + '</a>';
                }
            }
    
            $pageList.html(html);
        }

        function setEventListener() {
            $prev.on('click.page', drawPagination);
            $next.on('click.page', drawPagination);
            $pageList.on('click.page', 'a', drawPagination);
        }

        init();
        setEventListener();
    }

    Plugin.prototype = {
        reset: function() {
            firstPage = currentPage = 1;
            lastPage = totalPage <= defaults.pageToShow ? totalPage : firstPage + defaults.interval;
            drawPagination();
        },
    }

    $.fn[pluginName] = function(options, callback) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options, callback));
            }
        });
    }
};


(function($){
    CS.UI.elem.$doc = $(document);
    CS.UI.elem.$win = $(window);
    CS.UI.elem.$html = $('html');
    CS.UI.elem.$body = $('body');

    function setTableScrollbar() {
        var $tableWrap = $(".tbl.scroll-x");
        
        function initScrollbar() {
            $tableWrap.mCustomScrollbar({
                axis:"x",
                advanced:{
                    autoExpandHorizontalScroll:true
                },
                mouseWheel: true
            });
        }

        function destroyScrollbar() {
            $tableWrap.mCustomScrollbar('destroy');
        }

        CS.UI.elem.$win.on('breakpointchange', function (e, data) {
            if (data) {
                if (data.name === 'md' && $('.scroll-x').hasClass('mCustomScrollbar')) {
                    destroyScrollbar();
                } else if (data.name === 'sm' && !$('.scroll-x').hasClass('mCustomScrollbar')) {
                    initScrollbar();
                }
            }                
        });
        vcui.require(['helper/breakpointDispatcher'], function(BreakpointDispatcher) { 
            BreakpointDispatcher.start();
        });
    }

    function commonInit(){
        setTableScrollbar();
    }

    // CS.UI.elem.$win.ready( commonInit );
    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);