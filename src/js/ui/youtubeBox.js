
vcui.define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            modalTemplate:                 
                '<div class="video-modal video-box-closeset youtube">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           {{#if videoType == "youtube"}}'+
                '           <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
                '           {{#else}}'+
                '           <video controls {{params}} style="width:100%">'+
                '               <source src="{{video_url}}" type="video/mp4">'+
                '           </video>'+
                '           {{/if}}'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            layerTemplate:
                '<div class="video-asset video-box-closeset">'+
                '   <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
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
                isModal, videoTemplate, video_url, videoLayer, videoType;

            isModal = item.data('target') == "modal" ? true : false;

            video_url = item.attr('data-src');

            var params = "";
            var urlsplit = video_url.split("?");
            var isMp4 = urlsplit[0].indexOf(".mp4");
            console.log("isMp4:", isMp4)
            if(isMp4 < 0){
                videoType = "youtube";
            } else{
                videoType = "mp4";
                params = urlsplit[1].split("&").join(" ");
            }
            console.log("videoType:",videoType);
            console.log("video_url:",urlsplit[0]);                
            console.log("params:",params);


            videoTemplate = isModal ? self.options.modalTemplate : self.options.layerTemplate;
            videoLayer = vcui.template(videoTemplate, {videoType: videoType, video_url:urlsplit[0], params:params});

            self.$videoLayer = $(videoLayer).get(0);
            $(self.$videoLayer).find(".close-video").on('click', function(e){
                e.preventDefault();

                self._removeVideoLayer(e);
            });

            if(isModal) $('body').addClass('modal-open').append(self.$videoLayer);
            else self.$el.append(self.$videoLayer);

            var baseVideos = self.$el.find("div.video-asset");
            if(baseVideos.length > 1) {
                self.$baseVideo = $(baseVideos[0]).detach();
                self.baseIsModal = isModal;
            }
        },

        _removeVideoLayer: function(e){
            var self = this;

            if(self.$baseVideo) {
                if(self.baseIsModal) $('body').addClass('modal-open').append(self.$baseVideo);
                else self.$el.append(self.$baseVideo);
                self.$baseVideo = null;
            }

            var videoLayer = $(e.currentTarget).parent('div');
            $(e.currentTarget).off('click');
            videoLayer.remove();
            //$(self.$videoLayer).find(".close-video").off('click');
            //$(self.$videoLayer).remove();
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