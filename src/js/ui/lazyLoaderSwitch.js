/*!
 * @module vcui.ui.LazyLoader
 * @license MIT License
 * @description LazyLoader 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/lazyLoaderSwitch', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var LazyLoader = core.ui('LazyLoaderSwitch', {
        bindjQuery: 'lazyLoaderSwitch',
        defaults: {
            range: 200,
            selector: "",
            mode: 'vertical',
            container: 'window',
            dataAttribute: 'data-src',
            pc_prefix: "pc",
            mobile_prefix: "m",
            useFade: true
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.mode = "";

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = $(self.options.selector +" img[data-pc-src],img[data-m-src]");
            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);


            self._bindEvents();
            $(window).trigger('addResizeCallback', self._action());
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$con.on('scroll' + self.eventNS, function () {
                self._action();
            }).trigger('scroll' + self.eventNS);
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
                            //$el.css('opacity', 0);
                        }
                        self._loadImage($el, function () {
                            if (self.options.useFade) {
                                $el.stop().animate({ opacity: 1 });
                            }
                        });
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
        _loadImage: function _loadImage($img, cb) {
            var self = this,
                mode, winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767) mode = self.options.pc_prefix;
            else mode = self.options.mobile_prefix;
            if(self.mode != mode) self._changeImage(mode);



            var src = $img.attr('data-src');
            $img.attr("src", src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        },

        _changeImage: function(mode){
            var self = this;
            
            self.mode = mode;
            //self.mode = "m";
            /*
            self.$el.find('.ui_bg_switch').each(function(idx, item){
                var imgsrc = item.dataset[(self.mode + "Src")];
                if(imgsrc && item.dataset.backgroundImage != imgsrc) {
                    item.style.backgroundImage = 'url(' + imgsrc + ')';
                    item.dataset.backgroundImage = imgsrc;
                }
            });
            */

            self.$items.each(function(idx, item){
                /*
                var imgsrc = $(item).attr("data-" + self.mode + "-src");
                if(!imgsrc) {
                    imgsrc = $(item).attr('data-pc-src');
                }
                $(item).attr('src', imgsrc);
                */
                var imgsrc = item.dataset[(self.mode + "Src")];
                //imgsrc += '?test=test2';
                //var test = imgsrc.substring(imgsrc.lastIndexOf('/') + 1);
                //console.log(test);
                //console.log(self.mode + "Src",imgsrc,item.src);
                if(imgsrc && imgsrc != item.dataset.currentImage) {
                    item.dataset.currentImage = imgsrc;
                    var $img = $(item);
                    if ($img[0].complete) {
                        cb.call($img);
                    } else {
                        $img.one('load', cb);
                    }
                }
            })
        },
    });

    return LazyLoader;
});