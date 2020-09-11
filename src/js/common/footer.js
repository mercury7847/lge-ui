
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
                self.$el.find('.ui_footer_accordion').each(function(idx, item){
                    var isModules = $(item).attr("ui-modules");
                    var isActAccord = $(item).data("act-accord");
                    if(isModules !== undefined){
                        if(isActAccord){
                            $(item).data('act-accord', false);
                            $(item).vcAccordion("destroy");
                        }
                    }
                });
            } else{
                self.$el.find('.ui_footer_accordion').each(function(idx, item){
                    var isModules = $(item).attr("ui-modules");
                    var isActAccord = $(item).data("act-accord");
                    if(isModules !== undefined){
                        if(!isActAccord){
                            $(item).data('act-accord', true);
                            $(item).vcAccordion("restart");
                        }
                    } else{
                        $(item).data('act-accord', true);
                        $(item).vcAccordion();
                    }
                });
            }
        }
    });

    return Footer;
});