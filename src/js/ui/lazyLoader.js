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
            useFade: true
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            console.log("LazyLoader initialize!!!!");

            self.isVert = self.options.mode === 'vertical';
            self.largestPosition = 0;
            self.$items = self.$el.find(self.options.selector + "[data-src]");
            self.$con = self.$el.css('overflow') === 'scroll' ? self.$el : $(window);

            console.log(self.$items)

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$con.on('scroll' + self.eventNS, function () {
                self._action();
            }).trigger('scroll' + self.eventNS);

            setTimeout(function(){
                console.log("setTimeout();")
                self._action();
            }, 5000);
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
                self.$items = $(self.options.selector + "[data-src]");
                console.log(self.$items)
                self.$items = self.$items.filter(function () {
                    var $el = $(this),
                        pos = $el.offset()[self.isVert ? 'top' : 'left'],
                        chkpos = scrollValue + self.options.range + self._getContainerSize();
                    if (chkpos >= pos) {
                        if($el.data("lazyloaded") == undefined || !$el.data("lazyloaded")){
                            if (self.options.useFade) {
                                $el.css('opacity', 0);
                            }
                            self._loadImage($el, function () {
                                if (self.options.useFade) {
                                    $el.stop().animate({ opacity: 1 });
                                }
                            });
                            $el.data("lazyloaded", true);
                        }
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
            console.log("LazyLoader _loadImage : " + src);
            if ($img[0].complete) {
                cb.call($img);
            } else {
                $img.one('load', cb);
            }
        }
    });

    return LazyLoader;
});