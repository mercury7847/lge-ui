/*!
 * @module vcui.helper.ResponseImage
 * @license MIT License
 * @description 반응형에 따라 해당이미지를 로드해주는 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/responsiveImage', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    /**
     * class vcui.helper.ResponsiveImage
     * 창 사이드에 따라 img 태그의 data-src-mobile, data-src-pc 속성에서 알맞는 이미지로 교체
     */

    return core.helper('ResponsiveImage', core.ui.View.extend({
        $singleton: true,
        bindjQuery: true,
        defaults: {
            breakpoints: {
                mobile: 768,
                pc: 100000
            }
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            //self._makeSelector();
            self._bindEvents();
        },

        _makeSelector: function _makeSelector() {
            var self = this;

            self.selector = '';
            core.each(core.object.keys(this.options.breakpoints), function (name) {
                if (self.selector) {
                    self.selector += ',';
                }
                self.selector += 'img[data-src-' + name + ']';
            });
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            $(window).on('resize.responsiveimage orientationchange.responsiveimage load.responsiveimage', core.throttle(self._handleResize.bind(self), 50));
            self._handleResize();
        },

        _handleResize: function _handleResize() {
            var self = this;
            var $imgs; // = self.$(self.selector);
            var dataName,
                currentMode = '';

            var windowWidth = core.dom.getWinWidth();
            core.each(self.options.breakpoints, function (maxWidth, name) {
                if (maxWidth > windowWidth) {
                    dataName = 'src' + name.substr(0, 1).toUpperCase() + name.substr(1);
                    currentMode = name;
                    return false;
                }
            });

            if (currentMode === self.prevMode) {
                return;
            }
            self.prevMode = currentMode;

            $imgs = self.$('.ui_responsive_image');
            $imgs.each(function (i) {
                var src = $imgs.eq(i).css('visibility', 'visible').data(dataName);
                if (!src || this.src === src) {
                    return;
                }
                this.src = src;
            });
        }
    }));
});