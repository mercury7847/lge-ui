
vcui.define('ui/videoBox', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var VideoBox = core.ui('VideoBox', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$videos = self.$el.find("video");
            var leng = self.$videos.length;
            for(var i=0; i<leng;i++){
                var video = self.$videos.get(i);
                video.setAttribute('playsinline', true);
                video.style.backgroundColor="#000000";
            }

            //self.$video = self.$el.find("video").get(0);
            //self.$video.setAttribute('playsinline', true);
            //self.$video.style.backgroundColor="#000000";
            //self.$defaultVname = self.$el.find("video").find('source').attr('src');
            self.$ctrler = self.$el.find('.controller-wrap button');
            self.$acctrler = self.$el.find(".play-animaion-btn");

            self.$captionBtn = self.$el.find('.caption-wrap button');

            if(self.$el.find("video").attr("autoplay") != 'autoplay'){
                self.$ctrler.removeClass("pause").addClass("play");
                self._ariaBuild();
            }
            
            self._addEvent();
        },

        _getCurrentVideo: function(){
            var self = this;

            var leng = self.$videos.length;
            if(leng < 2){
                return self.$videos.get(0);
            } else{
                var video;
                for(var i=0;i<leng;i++){
                    var video = self.$videos.get(i);
                    if($(video).css('display') == "block"){
                        break;
                    }
                }

                return video;
            }
        },

        _addEvent: function(){
            var self = this;
            self.$ctrler.on("click", function(e){
                e.preventDefault();

                self.$video = self._getCurrentVideo();
                
                var name = $(this).attr('name');
                if(name == "pause"){
                    self.$video.pause();
                } else if(name == "play"){
                    self.$video.play();
                }
            });

            self.$acctrler.on('click', function(e){
                e.preventDefault();

                self.$video = self._getCurrentVideo();
                
                if($(this).hasClass('acc-btn')){
                    var aniText = $(this).data('ani-text');					    
                    $(this).attr('aria-label', aniText).addClass('ani-btn').removeClass('acc-btn').text(aniText);
                    
                    self.$video.setAttribute('src', $(this).data('src'));
                    self.$video.setAttribute('muted', false);
                    self.$video.load();
                }else{
                    var accAniText = $(this).data('acc-ani-text');
                    $(this).attr('aria-label', accAniText).addClass('acc-btn').removeClass('ani-btn').text(accAniText);
                    
                    self.$video.setAttribute('src', self.$el.find("video").find('source').attr('src'));
                    self.$video.setAttribute('muted', true);
                    self.$video.load();
                }

                if(self.$el.find("video").attr("autoplay") != 'autoplay'){
                    self.$ctrler.removeClass("pause").addClass("play");
                    self._ariaBuild();
                }
            });

            self.$video = self._getCurrentVideo();
            $(self.$videos).on("pause ended play playing", function(e){
                switch(e.type){
                    case "ended":
                    case "pause":
                        self.$ctrler.removeClass("pause").addClass("play");
                        break;

                    case "play":
                    case "playing":
                        self.$ctrler.removeClass("play").addClass("pause");
                        break;
                }

                self._ariaBuild();
            });

            self.$captionBtn.on('click', function(e){
                e.preventDefault();

                self._addCaption();
            })
        },

        _addCaption: function(){
            var self = this;

            $('.component.ani-caption').remove();

            var caption = self.$el.find('article.cap-section');
            
            $('body').append('<div class="component ani-caption"><button type="button" class="btn-close"><span class="blind">닫기</span></button></div>');
            $('.component.ani-caption').prepend(caption.clone().show());
            $('.component.ani-caption').css({y:'100%'}).transition({y:0}, 350, 'easeOutQuart');
            $('.component.ani-caption').on('click', '.btn-close', function(e){
                e.preventDefault();

                $('.component.ani-caption').off('click', '.btn-close');
                $('.component.ani-caption').transition({y:'100%'}, 350, 'easeOutQuart', function(){
                    $('.component.ani-caption').remove();
                });
            })
        },

        _ariaBuild: function(){
            var self = this;
            
            if(self.$ctrler.hasClass('play')){
                self.$ctrler.attr('name', 'play')
                .attr("aria-label", "Play Video")
                .text(self.$ctrler.data("playText"));
            } else{
                self.$ctrler.attr('name', 'pause')
                .attr("aria-label", "Pause Video")
                .text(self.$ctrler.data("pauseText"));
            }
        },

        pause: function(){
            var self = this;

            self.$video = self._getCurrentVideo();
            self.$video.pause();
        },

        play: function(){
            var self = this;

            self.$video = self._getCurrentVideo();
            self.$video.play();
        },

        reset: function(){
            var self = this;
            if(!(self.$acctrler.hasClass('acc-btn'))) {
                self.$acctrler.trigger("click");
            }
            self.pause();
        }
    });

    return VideoBox;
});