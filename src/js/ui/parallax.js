/*!
 * @module vcui.ui.Parallax
 * @license MIT License
 * @description Parallax 컴포넌트
 * @copyright VinylC UID Group
 * 
 */
vcui.define('ui/parallax', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    var $win = $(window);

    var Parallax = core.ui('Parallax', {/**@lends vcui.ui.Parallax# */
        bindjQuery: 'parallax',
        defaults: {
            wrap: true,
            wrapWith: '<div>',
            firstMarginTop : 0,
            marginTop: 0,
            stickyClass: 'fixed',
            totalFrame:0,
        },
        selectors:{
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }   

            if(self.$el.next().length == 0){
                $('<div style="margin:0px;padding:0px;"></div>').insertAfter(self.$el);
            }
            self.$nextElement = self.$el.next();
            self.active = false;
            
            core.util.loadImages($('img[data-src]')).done(function(){
                self.update();
                self._bindEvents();
                // console.log('loadImages complete');
            });
            
        },


        _bindEvents: function _bindEvents() {
            var self = this;

            $win.on('scroll resize load', function(e) {
                self.scrollTop = $win.scrollTop();                

                switch (e.type) {
                    case 'resize':
                        self._handleResize(e);
                        break;
                    default:                        
                        self._setPosition();
                        
                }
            });

            $win.trigger('resize');
        },


        update : function update(){
            var self = this;
            var opt = self.options;            
            self.marginTop = opt.marginTop;
            
            self.vpHeight = $win.height();
            self.vpWidth = $win.width();

            if(opt.wrap){
                self.$el.wrap(opt.wrapWith).parent().css({ 
                    height: opt.totalFrame? parseInt(opt.totalFrame) : self.$el.outerHeight()
                });
            }

            self._setPosition();

        },

        _handleResize: function _handleResize(e) {
            var self = this;
            var opt = self.options;
            self.update();
        },

        _setPosition: function _setPosition() {
            var self = this;
            var opt = self.options;
            var $el = self.$el;
            self._clearCss();

            self.stickyRect = self._getRectangle(self.$el);
            self.nextElementRect = self._getRectangle(self.$nextElement);

            var ht = self.nextElementRect.top - self.stickyRect.top - self.stickyRect.height;
            var sy = self.scrollTop-self.stickyRect.top + self.marginTop;
            var percent = parseInt(opt.totalFrame)/ht*sy/parseInt(opt.totalFrame)*100;
            percent = Math.max(0, Math.min(100, percent));

            // console.log(self.percent, percent)

            if(self.percent == percent){
                self.isComplete = true;
            }else{
                self.isComplete = false;
                self.percent = percent;
            }


            
            
            if (self.scrollTop >= self.stickyRect.top - self.marginTop) {

                $el.css({
                    position: 'fixed',
                    width: $el.width(),
                    'visibility' : '',
                    left: self.stickyRect.left
                });
                self.active = true; 
                
                if (self.scrollTop + self.stickyRect.height > self.nextElementRect.top - self.marginTop) {
                    
                    $el.removeClass(opt.stickyClass);
                    if(self.nextElementRect.top > self.scrollTop){
                        $el.css({
                            'visibility' : '',
                            top: self.nextElementRect.top - (self.scrollTop + self.stickyRect.height)
                        });
                        if(!self.isComplete){
                            self.triggerHandler('updatetimeline', [100]);
                        }
                        
                    }else{
                        $el.css({
                            'visibility' : 'hidden',
                            top: -self.stickyRect.height - self.marginTop
                        });
                    }
                    self.active = false; 

                } else {
                    $el.addClass(opt.stickyClass);
                    $el.css({
                        'visibility' : '',
                        top: self.marginTop
                    });
                    
                    if(!self.isComplete){
                        self.triggerHandler('updatetimeline', [self.percent]);
                    }
                }
                
            } else {
                $el.removeClass(opt.stickyClass);
                self._clearCss();
                if(!self.isComplete){
                    self.triggerHandler('updatetimeline', [0]);
                }
                self.active = false;
            }

            
        },

        _clearCss: function _clearCss() {
            var self = this;
            self.$el.css({
                position: '',
                width: '',
                top: '',
                left: '',
                'visibility' : '',
            });
        },

        _getRectangle: function _getRectangle($el) {
            var self = this;
            self._clearCss();
            var top = $el.offset().top;        
            var left = $el.offset().left;
            var width = $el.outerWidth();            
            var height = $el.outerHeight();
            return { top: top, bottom: top + height , left: left, right: left + width, width: width, height: height };
        },

        setMarginTop : function setMarginTop(top){
            var self = this;
            self.marginTop = top;
            self._setPosition();
        },

       

    });

    return Parallax;
});