
define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            templateID: "tmpl-yt-full-modal"
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

            self.$opener = self.$el.find('a.see-video')
            self.$youtubeURL = self.$opener.attr("data-src");

            lgkorUI.getTemplate(self.options.templateID, self._completeTemplate.bind(self));

            self._bindModalEvent();
        },

        _completeTemplate: function(){
            var self = this;

            self.templateLoaded = true;
        },

        _bindModalEvent: function(){
            var self = this;

            self.$el.find("a.see-video").each(function(idx, item){
                var youtube_url = $(item).attr("data-src");
                var isAcc = $(item).hasClass('acc-video-content');

                $(item).on('click', function(e){
                    e.preventDefault();

                    if(self.templateLoaded) self._addModal(youtube_url);
                })
            });
        },

        _addModal: function(youtube_url){
            var self = this;

            var modal = vcui.template($('#'+self.options.templateID).html(), {youtube_url:youtube_url});
            self.$modal = $(modal).get(0);
            $(self.$modal).find(".close-video").on('click', function(e){
                e.preventDefault();
                
                self._removeModal();
            })

            $('body').addClass('modal-open').append(self.$modal);
        },

        _removeModal: function(){
            var self = this;

            $(self.$modal).find(".close-video").off('click');
            $(self.$modal).remove();
            self.$modal = null;

            $('body').removeClass('modal-open');
        }
    });

    return YoutubeBox;
});