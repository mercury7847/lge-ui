
define('common/footer', ['jquery', 'vcui', 'ui/dropdown' ], function ($, core) {
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

            self.$comInfo = self.$el.find('.comp-link');
            var winwidth = $(window).outerWidth(true);
            if(winwidth <= 768){
                self.$comInfo.data('mode', 'normal');
            } else{
                self.$comInfo.data('mode', 'accordion');
            }
            
            if(self.$comInfo.hasClass('open')) self.$comInfo.removeClass('open');

            self.$el.find('.comp-link').vcDropdown();
            self.$comInfoAcc = self.$el.find('.comp-link').vcDropdown('instance');
            

            self._resize();
            $(window).on('resize', function(){
                self._resize();
            });
        },

        _resize: function(){
            var self = this,
            winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth <= 768){

            }
        }
    });

    return Footer;
});