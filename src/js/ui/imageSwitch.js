
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
            if(winwidth > 767) mode = self.options.pc_prefix;
            else mode = self.options.mobile_prefix;

            if(self.mode != mode) self._changeImage(mode);
        },

        _changeImage: function(mode){
            var self = this;
            
            self.mode = mode;

            self.$el.find('.ui_bg_switch').each(function(idx, item){
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                $(item).css({
                    'background-image': 'url(' + imgsrc + ')'
                });
            });

            self.$el.find('img').each(function(idx, item){
                var pcsrc = $(item).attr('data-pc-src');
                if(pcsrc !== undefined){
                    var imgsrc = $(item).attr("data-" + self.mode + "-src");
                    $(item).attr('src', imgsrc);
                }
            })
        }
    });

    return ImageSwitch;
});