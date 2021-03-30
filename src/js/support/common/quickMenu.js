vcui.define('support/common/quickMenu.min', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var QuickMenu = core.ui('QuickMenu', /** @lends vcui.ui.vcQuickMenu# */{
        bindjQuery: 'quickMenu',
        defaults: {
            
        },
        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            }
            
            self._setting();
            self._bindEvent();
        },
        _setting: function setting() {
            var self = this;
        
            self.$service = self.$el.find('.service-menu');
            self.$history = self.$el.find('.history');

            self.$topBtn = self.$el.find('.btn-top');
            self.$menuBtn = self.$el.find('.btn-expand');
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$service.find('.btn-expand').on('click', function() {
                self.$history.removeClass('on');
            });
            self.$history.find('.btn-expand').on('click', function() {
                self.$service.removeClass('on');
            });

            self.$menuBtn.on('click', function() {
                var $item = $(this).parent();
                $item[$item.hasClass('on') ? 'removeClass':'addClass']('on');
            });

            self.$topBtn.on('click', function (e) {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest(self.$el).length) {
                    self.$el.find('.on').removeClass('on');
                }
            });

            $(window).on('scroll resize', function(){
                if (self.$el.find('.on').length > 0) {
                    self.$el.find('.on').removeClass('on');
                }

                if ($(this).scrollTop() > 100) {
                    self.$topBtn.removeClass('off');
                } else {
                    self.$topBtn.addClass('off');
                }
            });
        }
    });

    return QuickMenu;
});