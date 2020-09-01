/*!
 * @module vcui.ui.ScrollNavi
 * @license MIT License
 * @description ScrollNavi
 * @copyright VinylC UID Group
 * 

 * 
 */
vcui.define('ui/scrollNavi', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var $win = $(window)

    /**
     * @class
     * @description .
     * @name vcui.ui.ScrollNavi
     * @extends vcui.ui.View
     */

    var ScrollNavi = core.ui('ScrollNavi', /** @lends vcui.ui.ScrollNavi# */{
        bindjQuery: 'scrollNavi',
        defaults: {    
            isSnap : true
        },
        selectors: {
            items : 'li'
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            

            self._build();
            self._bindEvent();   
            
        },

        _build: function _build() {
            var self = this;
            self.posArr = [];
            self.selectedIndex = 0;
            self.paddingLeft = parseInt(self.$el.css('paddingLeft'), 10);

            self.areaWidth = self.$el.width();

            self.smoothScroll = new vcui.ui.SmoothScroll(self.$el, {autoCenterScroll:false, center:false});



            //self.$el.vcSmoothScroll({autoCenterScroll:false, center:false});
        },

        _bindEvent  : function _bindEvent() {
            var self = this;
            $win.on('resizeend', function(e){
                self.update();
            });
            self.$el.on('smoothscrollstart smoothscrollend', function(e, data){

                if(e.type == 'smoothscrollstart'){
                    self.isScrollEnd = false;
                }else if(e.type == 'smoothscrollend'){

                    //if(!self.isScrollEnd) {
                        self.isScrollEnd = true;
                        self.selectedIndex = self._getIndexWithX(self.posArr, -data.x+self.areaWidth/2);
                        
                        // console.log(self.selectedIndex);
                        /*
                        if(self.interval != null) {
                            clearInterval(self.interval);
                        }                    
                        self.interval = setInterval(function(){
                            self._scrollToIndex(self.selectedIndex, 200);
                            clearInterval(self.interval);
                        }, 1000);    
                        */                    

                        
                    //};                     
                }


            });

            $win.trigger('resizeend');
        },

        _getIndexWithX : function _getIndexWithX(pArr,xp){
            var self = this;
            var sIdx = 0;

            for(var i=0; i<pArr.length-1; i++){
                if(xp >= pArr[i] && xp < pArr[i+1]){
                    sIdx = i;
                    break;
                }
            }
            return sIdx;
        },

        update : function update(){
            var self = this;
            self.smoothScroll.scrollTo(0,0);
            var width = self.$el.width();
            var xp,fx=0,wd = 0;
            self.totalWidth = 0;
            self.posArr = [-self.paddingLeft];

            var target = self.$items.filter('.on');
            var sx = Math.ceil(target.length > 0? target.eq(0).position().left : 0);
            self.$items.each(function (idx) {
                xp = Math.ceil($(this).position().left);
                wd = Math.ceil($(this).outerWidth(true));
                if(width+fx < xp+wd+self.paddingLeft){
                    fx = xp;
                    self.posArr.push(fx);
                }
                if(idx===self.$items.length-1){
                    self.posArr.push(xp+wd);
                }
            });

            
            self.totalWidth = xp + wd - width;
            self.selectedIndex = self._getIndexWithX(self.posArr,sx);
            self._scrollToIndex(self.selectedIndex);
        },

        _scrollToIndex : function _scrollToIndex(idx, duration){
            var self = this;
            var px = self.posArr[idx];
            var dx = self.totalWidth - px;
            self.smoothScroll.scrollTo(dx<0? -px-dx : px*-1, 0, duration? duration : 0);
            //self.$el.vcSmoothScroll('scrollTo', dx<0? -px-dx : px*-1, 0, duration? duration : 0);
        },

        prevPage : function prevPage(){
            var self = this;
            self.selectedIndex = Math.max(self.selectedIndex-1, 0);
            self._scrollToIndex(self.selectedIndex, 200);
        },

        nextPage : function nextPage(){
            var self = this;
            self.selectedIndex = Math.min(self.selectedIndex+1, self.posArr.length-2);
            self._scrollToIndex(self.selectedIndex, 200);
        },



    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return ScrollNavi;
});