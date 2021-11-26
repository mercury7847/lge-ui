/*!
 * @module vcui.ui.LazyLoader
 * @license MIT License
 * @description LazyLoader 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/lazyLoaderSwitch', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var LazyLoaderSwitch = core.ui('LazyLoaderSwitch', {
        bindjQuery: 'lazyLoaderSwitch',
        defaults: {
            range: 200,
            selector: "",
            mode: 'vertical',
            container: 'window',
            //dataAttribute: 'data-src',
            pc_prefix: "pc",
            mobile_prefix: "m",
            useFade: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.mode = "";
            self.scrollTimer = null;

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = $(self.options.selector +":not(.ignore-lazyload)img[data-pc-src][data-m-src],.ui_bg_switch");

            self.$imgSwitch = $(self.options.selector +"img[data-pc-src][data-m-src],.ui_bg_switch").filter('.ignore-lazyload');
            
            self.$imgSwitch.each(function(idx, item){
                self._loadImage($(item),null);
            });

            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$con.on('scroll' + self.eventNS, function () {
                if(self.scrollTimer) {
                    clearTimeout(self.scrollTimer);
                }
                self.scrollTimer = setTimeout(function(){
                    self._action();
                }, 200);
            }).trigger('scroll' + self.eventNS);

            // $(window).on('resizeend', function(e){
            //     self._resize();
            // });

            //BTOCSITE-7335
            $(window).on('breakpointchange', function(e){
                var data = window.breakpoint;
                
                if(data.name == 'mobile'){
                    self._resize();
                }else if(data.name == 'pc'){
                    self._resize();
                }
            });   
        },

        _getContainerSize: function _getContainerSize() {
            return this.$con[this.isVert ? 'height' : 'width']();
        },

        _getScrollValue: function _getScrollValue() {
            return this.$con[this.isVert ? 'scrollTop' : 'scrollLeft']();
        },

        _action: function _action() {
            
            var self = this;

            var scrollValue = self._getScrollValue();

            if (scrollValue >= self.largestPosition) {
                self.$items = self.$items.filter(function () {
                    var $el = $(this),
                        pos = $el.offset()[self.isVert ? 'top' : 'left'];

                    if (scrollValue + self.options.range + self._getContainerSize() >= pos) {
                        if (self.options.useFade) {
                            $el.css('opacity', 0);
                        }
                        self._loadImage($el, /*function () {
                            if (self.options.useFade) {
                                $el.stop().animate({ opacity: 1 });
                            }
                        }*/null);
                        return false;
                    }
                    return true;
                });
                self.largestPosition = scrollValue;
            }

            self.triggerHandler('lazyLoaderscroll');
            if (!self.$items.length) {
                self.triggerHandler('lazyLoadercomplete');
                self.$con.off(self.eventNS);
            }
        },
        /*
        _loadImage: function _loadImage($img, cb) {
            var src = $img.attr('data-pc-src');
            $img.attr("src", src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        },
        */

        reload: function($dm){
            var self = this;

            var $items = $dm.find("img[data-pc-src][data-m-src],.ui_bg_switch");
            $items.each(function(idx, item){
                self._loadImage($(item),null);
            });
        },

        _resize: function(){
            var self = this,
                mode, winwidth;

            // winwidth = $(window).outerWidth(true);
            winwidth = window.innerWidth; //BTOCSITE-7335 수정
            
            if(winwidth > 767) mode = self.options.pc_prefix;
            else mode = self.options.mobile_prefix;
            if(self.mode != mode) {
                self.mode = mode;
                var $items = $(self.options.selector +"img[data-pc-src][data-m-src][data-current-image],.ui_bg_switch[data-current-image]");
                $items.each(function(idx,item){
                    var $img = $(item);
                    var src = $img.attr('data-' + mode + '-src');
                    var currentImage = $img.attr('data-current-image');
                    if(src && src != currentImage) {
                        if($img.hasClass("ui_bg_switch")) {
                            $img.css({
                                'background-image': 'url(' + src + ')'
                            });
                            $img.attr('data-current-image',src);
                        } else {
                            $img.attr("src", src);
                            //$img.attr("data-lazy", src);
                            $img.attr('data-current-image',src);
                        }
                    }
                });
            }
        },

        _loadImage: function _loadImage($img, cb) {
            var self = this;
            var mode, winwidth;

            winwidth = $(window).outerWidth(true);
            (winwidth > 767) ? mode = self.options.pc_prefix : mode = self.options.mobile_prefix;

            //if(self.mode != mode) {
                //self.mode = mode;
                var src = $img.attr('data-' + mode + '-src');
                var currentImage = $img.attr('data-current-image');
                if(src && src != currentImage) {
                    if($img.hasClass("ui_bg_switch")) {
                        $img.css({
                            'background-image': 'url(' + src + ')'
                        });
                        $img.attr('data-current-image',src);
                    } else {
                        $img.attr("src", src); 
                        //$img.attr("data-lazy", src);
                        $img.attr('data-current-image',src);
                    }
                    /*
                    if ($img[0].complete) {
                        cb.call($img);
                    } else {
                        $img.one('load', cb);
                    }
                    */
                }
                // $img.attr("src", src);
                // if ($img[0].complete) {
                //     cb.call($img);
                // } else {
                //     $img.one('load', cb);
                // }
                /*
                var imgsrc = item.dataset[(self.mode + "Src")];
                if(imgsrc && imgsrc != item.dataset.currentImage) {
                    item.dataset.currentImage = imgsrc;
                    item.src = imgsrc;
                    var $img = $(item);
                    if ($img[0].complete) {
                        cb.call($img);
                    } else {
                        $img.one('load', cb);
                    }
                }
                */
            //}
        }
    });

    return LazyLoaderSwitch;
});