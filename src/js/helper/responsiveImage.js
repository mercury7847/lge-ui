/*!
 * @module vcui.helper.ResponseImage
 * @license MIT License
 * @description 반응형에 따라 해당이미지를 로드해주는 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/responsiveImage', ['jquery','vcui'], function($, core) {
    "use strict";

    var getBg = function(el) {
        var style = el.currentStyle || window.getComputedStyle(el, false);
        return style.backgroundImage.slice(4, -1).replace(/"|'/g, "");
    };

    /**
     * class vcui.helper.ResponsiveImage
     * 창 사이드에 따라 img 태그의 data-src-mobile, data-src-pc 속성에서 알맞는 이미지로 교체
     */
    var ResponsiveImage = core.helper('ResponsiveImage', core.ui.View.extend({
        $singleton: true,
        name: 'ResponsiveImage',

        $statics: {
            run: function($el) {

                // window.breakpoint = { // 처음에만
                //     isMobile: isMobile,
                //     isPc: !isMobile,
                //     name: isMobile ? 'mobile' : 'pc'
                // }

                var currentMode = window.breakpoint.name;
                var $items = $el.find('[data-src-pc], [data-src-mobile]');

                $items.each(function() {
                    var src = this.getAttribute('data-src-' + currentMode);
                    var tagName = this.tagName.toLowerCase();

                    if (!src ||
                        (tagName === 'img' && this.src === src) ||
                        (tagName !== 'img' && getBg(this) === src)) {
                        return;
                    }
                    switch (tagName) {
                        case 'img':
                            this.src = src;
                            break;
                        default:
                            this.style.backgroundImage = 'url(' + src + ')';
                            break;
                    }
                });
            }
        },
        
        defaults: {
            breakpoints: {
                mobile: 768,
                pc: 100000
            }
        },
        initialize: function(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            ResponsiveImage.breakpoints = self.options.breakpoints;
            self.$items = $();
            //self._makeSelector();
            self._bindEvents();
        },

        _makeSelector: function() {
            var self = this;

            self.selector = '';
            core.each(core.object.keys(this.options.breakpoints), function(name) {
                if (self.selector) {
                    self.selector += ',';
                }
                self.selector += '[data-src-' + name + ']'
            });
        },

        _bindEvents: function() {
            var self = this;

            $(window).on('breakpointchange.responsiveimage orientationchange.responsiveimage load.responsiveimage',
                core.throttle(self._handleResize.bind(self), 50)
            );
            self._handleResize();
        },

        _handleResize: function() {
            var self = this;
            var currentMode = window.breakpoint.name;

            if (currentMode === self.prevMode) {
                return;
            }
            self.prevMode = currentMode;

            ResponsiveImage.run(self.$el);
        }
    }));


    return ResponsiveImage;

});