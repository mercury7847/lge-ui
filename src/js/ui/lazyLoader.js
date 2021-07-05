/*!
 * @module vcui.ui.LazyLoader
 * @license MIT License
 * @description LazyLoader 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/lazyLoader', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var LazyLoader = core.ui('LazyLoader', {
        bindjQuery: 'lazyLoader',
        defaults: {
            range: 200,
            selector: 'img',
            mode: 'vertical',
            container: 'window',
            dataAttribute: 'data-src',
            useFade: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.scrollTimer = null;

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = $(self.options.selector+"[data-src]");
            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);
            
            self.$items.hide();
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
            /*
            self.$con.on('scroll' + self.eventNS, function () {
                self._action();
            }).trigger('scroll' + self.eventNS);
            */
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
                            $el.show();
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
            var src = $img.attr('data-src');
            $img.attr("src", src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        }
    });

    return LazyLoader;
});