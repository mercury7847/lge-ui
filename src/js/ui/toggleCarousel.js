
vcui.define('ui/toggleCarousel', ['jquery', 'vcui', 'ui/carousel'], function ($, core) {
    "use strict";

    var ToggleCarousel = core.ui('ToggleCarousel', {
        bindjQuery: 'toggleCarousel',
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._setting();
            self._bindEvents();
        },

        _bindEvents: function(){
            var self = this;

            $(window).off("breakpointchange"+self.eventNS).on("breakpointchange"+self.eventNS, function(){
                self._setting();
            })
        },

        _setting: function(){
            var self = this;

            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                self.$el.vcCarousel(options);
            } else{
                self.$el.vcCarousel('destroy');

            }
        },

        update: function(){
            var self = this;            
            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                self.$el.vcCarousel('update');
            }
        },
        destroy: function () {
            var self = this;
            $(window).off("breakpointchange"+self.eventNS);
            if(self.$el) self.$el.vcCarousel('destroy');            

            self.supr();
            
        }
    });

    return ToggleCarousel;
});