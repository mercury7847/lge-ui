
vcui.define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            modalTemplate:                 
                '<div class="video-modal video-box-closeset youtube">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{youtube_url}}?autoplay=1"></iframe>'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            layerTemplate:
                '<div class="video-asset video-box-closeset">'+
                '   <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{youtube_url}}?autoplay=1"></iframe>'+
                '   <button class="close-video">Close Video</button>'+
                '</div>'
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            self._bindEvent();
        },

        _bindEvent: function(){
            var self = this;

            self.$el.find(".see-video").on('click', function(e){
                e.preventDefault();

                self._addVideo($(this));
            });
        },

        _addVideo: function(item){
            var self = this,
                isModal, videoTemplate, youtube_url, videoLayer;

            isModal = item.data('target') == "modal" ? true : false;

            youtube_url = item.attr('data-src');
            videoTemplate = isModal ? self.options.modalTemplate : self.options.layerTemplate;
            videoLayer = vcui.template(videoTemplate, {youtube_url:youtube_url});

            self.$videoLayer = $(videoLayer).get(0);
            $(self.$videoLayer).find(".close-video").on('click', function(e){
                e.preventDefault();

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
        },

        close: function(){
            var self = this;
            
            self._removeVideoLayer();
        }
    });

    return YoutubeBox;
});