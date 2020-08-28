
console.log("videoBox")
define('ui/videoBox', ['jquery', 'vcui'], function ($, core) {
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
            self.$ctrler = self.$el.find('.controller-wrap button');

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
        }
    });

    return VideoBox;
});