
define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            templateUrl: "/lg5-common/template/modal-template.html"
        },
        selectors: { 
            template: $('<div class="template"></div>')
        }, 

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self._setModalMode();
        },

        _setModalMode: function(){
            var self = this;

            self.$modal = null;

            self.templateLoaded = false;

            self.$opener = self.$el.find('a.see-video').css('display', 'block');
            self.$youtubeURL = self.$opener.attr("data-src");
            
            self.$template.load( self.options.templateUrl, function(html){
                self._completeTemplate(html)
            });

            self._bindModalEvent();
        },

        _completeTemplate: function(html){
            var self = this;

            self.templateLoaded = true;

            var tmpltag = $('#tmpl-yt-full-modal');
            if(!tmpltag.length) $('head').append($(html));
        },

        _bindModalEvent: function(){
            var self = this;

            self.$opener.on('click', function(e){
                e.preventDefault();
                
                if(self.templateLoaded) self._addModal();
            })
        },

        _addModal: function(){
            var self = this;

            var modal = vcui.template($('#tmpl-yt-full-modal').html(), {youtube_url:self.$youtubeURL});
            self.$modal = $(modal).get(0);
            $(self.$modal).find(".close-video").on('click', function(e){
                e.preventDefault();
                
                self._removeModal();
            })

            $('body').addClass('modal-open').append(self.$modal);
        },

        _removeModal: function(){
            var self = this;

            $(self.$modal).remove();
            self.$modal = null;

            $('body').removeClass('modal-open');
        }
    });

    return YoutubeBox;
});