
vcui.define('common/footer', ['jquery', 'vcui', 'ui/dropdown' ], function ($, core) {
    "use strict";

    var Footer = core.ui('Footer', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
        },

        _resize: function(){
            var self = this,
                winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                self.$el.find('.ui_footer_accordion').vcAccordion('destory');
            } else{
                console.log("GGG")
                self.$el.find('.ui_footer_accordion').vcAccordion();
            }
        }
    });

    return Footer;
});