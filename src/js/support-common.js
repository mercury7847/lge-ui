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

        function initialize() {
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

            firstPage === 1 ? $prev.attr('aria-disabled', true) : $prev.attr('aria-disabled', false);
            lastPage >= totalPage ? $next.attr('aria-disabled', true) : $next.attr('aria-disabled', false);

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

        initialize();
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
    function selectEngineer() {
        if (!$('.engineer-carousel').length) return false;

        vcui.require(['ui/carousel'], function () {
            $('.engineer-carousel').vcCarousel({
                swipeToSlide: true,
                slidesToShow: 4,
                arrows:false,
                customPaging: function(carousel, i) {
                    var $button = $('<button type="button" class="btn-indi"><span class="blind">'+(i+1)+'번 내용 보기'+'</span></button>');
                    return $button;
                },
                responsive: [{
                    breakpoint:768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }]
            });
        });
    }

    function commonInit(){
        setTableScrollbar();
        checkPrivacy();
        selectEngineer()
    }

    // CS.UI.elem.$win.ready( commonInit );
    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);