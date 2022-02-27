
vcui.define('ui/youtubeBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var YoutubeBox = core.ui('youtubeBox', {
        bindjQuery: true,
        defaults: {
            videoTitle : null, //'Simplicity &amp; LG SIGNATURE',
            videoInfo : null, //'단순함이 궁극의 세련미를 만듭니다.<br>가전, 작품이 되다',
            linkClass:'.see-video',
            modalTitleTemplate:                 
                '<div id="{{videoId}}" class="video-modal video-box-closeset animation">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           <div class="video-box">'+
                '               <video controls autoplay {{params}}>'+
                '                   <source src="{{video_url}}" type="video/mp4">'+
                '               </video>'+
                // '               <div class="video-controller">'+
                // '                   <button type="button" class="btn-video"><span class="blind">영상 재생</span></button>'+
                // '               </div>'+
                '           </div>'+
                '           <div class="video-info">'+
                '                <span class="title">{{#raw video_title}}</span>'+
                '                <p class="body-copy">{{#raw video_info}}</p>'+
                '            </div>'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            modalTemplate:                 
                '<div class="video-modal video-box-closeset youtube">'+
                '   <div class="modal-video-asset">'+
                '       <div class="video-asset">'+
                '           {{#if videoType == "youtube"}}'+
                '           <iframe id="videoPlayerCode" frameborder="0"  webkitallowfullscreen="1" mozallowfullscreen="1" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
                '           {{#else}}'+
                '           <video controls {{params}} style="width:100%;height:100%">'+
                '               <source src="{{video_url}}" type="video/mp4">'+
                '           </video>'+
                '           {{/if}}'+
                '       </div>'+
                '   </div>'+
                '   <button class="close-video">동영상 닫기</button>'+
                '</div>',
            layerTemplate:
                '<div class="video-asset video-box-closeset">'+
                '   {{#if videoType == "youtube"}}'+
                '   <iframe id="videoPlayerCode" frameborder="0" webkitallowfullscreen="1" mozallowfullscreen="1" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>'+
                '   {{#else}}'+
                '   <video controls {{params}} style="width:100%;height:100%">'+
                '       <source src="{{video_url}}" type="video/mp4">'+
                '   </video>'+
                '   {{/if}}'+
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

            var linkClass = self.options.linkClass;

            self.$el.find(linkClass).on('click', function(e){
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
            // console.log("isMp4:", isMp4)
            if(isMp4 < 0){
                videoType = "youtube";
            } else{
                videoType = "mp4";
                params = urlsplit.length > 1 ? urlsplit[1].split("&").join(" ") : "";
            }
            self.$el.data('boxCloseType', videoType);
            // console.log("videoType:",videoType);
            // console.log("video_url:",urlsplit[0]);                
            // console.log("params:",params);

            var videoTitle = self.options.videoTitle;
            var videoInfo = self.options.videoInfo;
            var videoId = vcui.getUniqId(8);

            videoTemplate = isModal ? (videoTitle? self.options.modalTitleTemplate:self.options.modalTemplate) : self.options.layerTemplate;
            videoLayer = vcui.template(videoTemplate, {videoId:videoId, videoType: videoType, video_title:videoTitle, video_info:videoInfo, video_url:urlsplit[0], params:params});

            self.$videoLayer = $(videoLayer).get(0);
            $(self.$videoLayer).find(".close-video").on('click', function(e){
                e.preventDefault();
                self._removeVideoLayer(e);
            });

            var caption = self.$el.find('article.cap-section');
            if(caption.length) $(self.$videoLayer).find('.modal-video-asset').append(caption.clone().show());

            if(isModal){ 
                $('body').addClass('modal-open').append(self.$videoLayer);
                var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
                if(!ignoreOverflow){
                    $('html, body').css({
                        overflow:"hidden"
                    });
                }
                setTimeout(function(){
                    if(videoType == 'youtube') {
                        $(self.$videoLayer).find('iframe').focus();
                    } else {
                        $(self.$videoLayer).find('video').focus();
                    }
                }, 300);
            }else{
                self.$el.append(self.$videoLayer);
            };

            var baseVideos = self.$el.find("div.video-asset");
            if(baseVideos.length > 1) {
                self.$baseVideo = $(baseVideos[0]).detach();
                self.baseIsModal = isModal;
            }

            /*
            // play
            $(document).on('click', '#'+videoId+' .video-controller .btn-video', function(e){                
                var $video = $('#'+videoId).find('video');
                if($video[0]) {
                    $video[0].play();
                }
            });

            // pause 
            $(document).on('click', '#'+videoId+' .video-controller .btn-pause', function(e){                
                var $video = $('#'+videoId).find('video');
                if($video[0]) {
                    $video[0].pause();
                }
            });
            */

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

            var ignoreOverflow = $('body').hasClass('ignore-overflow-hidden');
            if(!ignoreOverflow){
                $('html, body').css({
                    overflow:"visible"
                });
            }

            var closeType = self.$el.data('boxCloseType');
            var elType = self.$el.attr('data-type');
            if(elType && closeType && elType == closeType) {
                self.$el.focus();
            } else if(closeType) {
                var t = self.$el.find('[data-type="' + closeType +'"]:eq(0)');
                if(t.length > 0) {
                    t.focus();
                }
            }
        },

        close: function(){
            var self = this;
            self._removeVideoLayer();
        }
    });

    return YoutubeBox;
});