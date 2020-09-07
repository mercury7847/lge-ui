
vcui.define('ui/imageSwitch', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var ImageSwitch = core.ui('ImageSwitch', {
        bindjQuery: true,
        defaults: {
            pc_prefix: "pc",
            mobile_prefix: "m"
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            self.mode = "";

            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
        },

        _resize: function(){
            var self = this,
                mode, winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth < 768) mode = self.options.mobile_prefix;
            else mode = self.options.pc_prefix;

            if(self.mode != mode) self._changeImage(mode);
        },

        _changeImage: function(mode){
            var self = this, imgsrc;
            
            self.mode = mode;

            imgsrc = self.$el.attr("data-" + self.mode + "-src");
            if(self.$el.hasClass('ui_bg_switch')){
                self.$el.css({
                    'background-image': 'url(' + imgsrc + ')'
                });
            }
        }
    });

    return ImageSwitch;
});