
vcui.define('ui/toggleCarousel', ['jquery', 'vcui', 'ui/carousel'], function ($, core) {
    "use strict";

    var ToggleCarousel = core.ui('ToggleCarousel', {
        bindjQuery: 'toggleCarousel',
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }
            console.log("ToggleCarousel Start!!!");

            self.clones = [];
            self.$el.children().each(function(idx, item){
                self.clones.push($(item).clone());
            })

            self.isCarousel = false;

            self._setting();
            self._bindEvents();
        },

        _bindEvents: function(){
            var self = this;

            $(window).on("breakpointchange.togglecarousel", function(){
                self._setting();
            })
        },

        _setting: function(){
            var self = this;

            self.$el.vcCarousel("destroy");

            self.$el.empty();
            for(var idx in self.clones) self.$el.append(self.clones[idx].clone());

            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                if(self.isCarousel) self.$el.vcCarousel('reinit').vcCarousel('refresh');
               else self.$el.vcCarousel(options);

               self.isCarousel = true;
            } else{
                self.$el.find('.indi-wrap').hide();
                self.$el.find('.slide-controls').hide();
            }
        },

        update: function(){
            var self = this;
            
            var options = window.breakpoint.name == "mobile" ? self.options.mobileOption : self.options.pcOption;
            if(options !== "unbuild"){
                self.$el.vcCarousel('update')
            }
        }
    });

    return ToggleCarousel;
});