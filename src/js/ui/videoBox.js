
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

            self.$video = self.$el.find("video").get(0);
            self.$defaultVname = self.$el.find("video").find('source').attr('src');
            self.$ctrler = self.$el.find('.controller-wrap button');
            self.$acctrler = self.$el.find(".play-animaion-btn");
            
            self._addEvent();
        },

        _addEvent: function(){
            var self = this;
            self.$ctrler.on("click", function(e){
                e.preventDefault();
                
                var name = $(this).attr('name');
                if(name == "pause"){
                    self.$video.pause();
                } else if(name == "play"){
                    self.$video.play();
                }
            });

            self.$acctrler.on('click', function(e){
                e.preventDefault();
                
                if($(this).hasClass('acc-btn')){
                    var aniText = $(this).data('ani-text');					    
                    $(this).attr('aria-label', aniText).addClass('ani-btn').removeClass('acc-btn').text(aniText);
                    
                    self.$video.setAttribute('src', $(this).data('src'));
                    self.$video.load();
                }else{
                    var accAniText = $(this).data('acc-ani-text');
                    $(this).attr('aria-label', accAniText).addClass('acc-btn').removeClass('ani-btn').text(accAniText);
                    
                    self.$video.setAttribute('src', self.$defaultVname);
                    self.$video.load();
                }
            });

            $(self.$video).on("play playing pause ended", function(e){
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
            console.log("GGG");
            console.log(self)
            self.$video.pause();
        }
    });

    return VideoBox;
});