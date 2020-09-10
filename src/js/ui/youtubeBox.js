
vcui.define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            modalTemplate: "tmpl-yt-full-modal",
            layerTemplate: "tmpl-yt-layer"
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self._loadTemplate();
        },

        _loadTemplate: function(){
            var self = this;

            self.$videoLayer = null;

            lgkorUI.getTemplate(self.options.modalTemplate, self._completeTemplate.bind(self));
        },

        _completeTemplate: function(){
            var self = this;
            
            self._bindEvent();
        },

        _bindEvent: function(){
            var self = this;
            console.log(this)

            self.$el.find("see-video").on('click', function(e){
                e.preventDefault();

                self._addVideo($(this));
            });
        },

        _addVideo: function(item){
            var self = this,
                isModal, templateID, youtube_url, videoLayer;

            isModal = item.data('target') == "modal" ? true : false;

            youtube_url = item.attr('data-src');
            templateID = isModal ? '#'+self.options.modalTemplate : '#'+self.options.layerTemplate;
            videoLayer = vcui.template($(templateID).html(), {youtube_url:youtube_url});

            self.$videoLayer = $(videoLayer).get(0);
            $(self.$videoLayer).find(".close-video").on('click', function(e){
                e.preventDefault();
                console.log(this)
                self._removeVideoLayer();
            });

            if(isModal) $('body').addClass('modal-open').append(self.$videoLayer);
            else self.$el.append(self.$videoLayer);
        },

        _removeVideoLayer: function(){
            var self = this;

            $(self.$videoLayer).find(".close-video").off('click');
            $(self.$videoLayer).remove();
            self.$videoLayer = null;

            $('body').removeClass('modal-open');
        }
    });

    return YoutubeBox;
});