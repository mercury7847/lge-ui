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
        var self = this,
            element = this.element = elem,
            $element = $(element),
            $pageList, $prev, $next,
            currentPage, startPage, endPage, totalPage;

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
            $pageList = $element.find('.page_num');
            $prev = $element.find(self.options.prevClass);
            $next = $element.find(self.options.nextClass);
        }
        self._update = function() {
            var startPage = self.options.startPage,
                endPage = self.options.endPage,
                page = self.options.page,
                html = '';

            for (var i = startPage; i <= endPage; i++) {
                if (page === i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<a href="#" title="' + i + '페이지 보기">' + i + '</a>';
                }
            }
            
            self.options.prevBtn ? $prev.attr('aria-disabled', false) : $prev.attr('aria-disabled', true) 
            self.options.nextBtn ? $next.attr('aria-disabled', false) : $next.attr('aria-disabled', true)
            $pageList.html(html);
        }
        self._move = function() {
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
        }

        _initialize();
    }

    Plugin.prototype = {
        update: function(data) {
            var self = this;

            self.options = $.extend({}, self.defaults, data);
            self._update();
        },
        reset: function() {
            startPage = currentPage = 1;
            endPage = totalPage <= this.options.pageToShow ? totalPage : startPage + this.options.pageToShow - 1;
            
            this._move();
        }
    }

    $.fn[pluginName] = function(options, callback) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
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

    function test() {
        if (!$('.related-info-wrap').length) return false;

        vcui.require(['ui/carousel'], function () {
            $('.ui_carousel_slider').vcCarousel({
                infinite: false,
                swipeToSlide: true,
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
        })
    }

    function commonInit(){
        setTableScrollbar();
        checkPrivacy();
        selectEngineer();
        test();
    }

    // CS.UI.elem.$win.ready( commonInit );
    document.addEventListener('DOMContentLoaded', commonInit);
})(jQuery);