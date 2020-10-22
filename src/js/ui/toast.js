
vcui.define('ui/toast', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var toastTemplate = 
    '<div class="toast-message-box">'+
    '   <div class="inner">'+
    '       <p class="toast-text"></p>'+
    '       <span class="btn-area"><a href="#" role="button">확인</a></span>'+
    '   </div>'+
    '</div>';

    var Toast = core.ui('Toast', {
        bindjQuery: true,
        defaults: {
            delaytime: 1500
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$el.empty();
            self.$el.html(toastTemplate);
            
            self._delayTimer = null;

            self._bindEvent();
        },

        _bindEvent: function(){
            var self = this;

            self.$el.on('click', '.btn-area a', function(e){
                e.preventDefault();

                self.close();
            });

            $(window).on('toastshow', function(e, msg){
                self.show(msg);
            });
        },

        show: function(msg){
            var self = this;

            self.$el.find('.toast-text').text(msg);
            self.$el.stop().css({
                display:'block', 
                opacity:0,
                left: $(window).width()/2 - self.$el.width()/2
            }).animate({opacity:1}, 150);

            self._delayTimer = setTimeout(function(){
                self.close();
            }, self.options.delaytime);
        },

        close: function(){
            var self = this;

            clearTimeout(self._delayTimer);
            self._delayTimer = null;

            self.$el.stop()
            .animate({opacity:0}, 120, function(){
                self.$el.css('display', 'none');
            });
        }
        
    });

    return Toast;
});