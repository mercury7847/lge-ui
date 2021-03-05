
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
            //self.mode = "m";
            self.$el.find('.ui_bg_switch').each(function(idx, item){
                /*
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                $(item).css({
                    'background-image': 'url(' + imgsrc + ')'
                });
                */
                var imgsrc = item.dataset[(self.mode + "Src")];
                if(imgsrc && item.dataset.backgroundImage != imgsrc) {
                    item.style.backgroundImage = 'url(' + imgsrc + ')';
                    item.dataset.backgroundImage = imgsrc;
                }
            });

            self.$el.find('img[data-pc-src],img[data-m-src]').each(function(idx, item){
                /*
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                if(!imgsrc) {
                    imgsrc = $(item).attr('data-pc-src');
                }
                $(item).attr('src', imgsrc);
                */
                var imgsrc = item.dataset[(self.mode + "Src")];
                //imgsrc += '?test=test2';
                //var test = imgsrc.substring(imgsrc.lastIndexOf('/') + 1);
                //console.log(test);
                //console.log(self.mode + "Src",imgsrc,item.src);
                if(imgsrc && imgsrc != item.dataset.currentImage) {
                    item.src = imgsrc;
                    item.dataset.currentImage = imgsrc;
                }
            })
        },

        reload: function(){
            var self = this;
            self.mode = "";
            self._resize();
        },
    });

    return ImageSwitch;
});