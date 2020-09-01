/*!
 * @module vcui.helper.BreakpointDispatcher
 * @license MIT License
 * @description 반응형 분기점을 지날때마다 이벤트를 발생시켜주는 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/breakpointDispatcher', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $win = $(window);

    function generate(breakpoints) {}

    /*
    [{
        mode: "xs",
        min: 0,
        max: 375
    }, {
        mode: "sm",
        min: 376,
        max: 767
    }, {
        mode: "md",
        min: 768,
        max: 1023
    }, {
        mode: "lg",
        min: 1024,
        max: 1279
    }, {
        mode: "xl",
        min: 1280,
        max: 1000000
    }]
     */
    /**
     * @namespace
     * @name vcui.helper.BreakpointDispatcher
     */
    var BreakpointDispatcher = core.helper.BreakpointDispatcher = /** @lends  vcui.helper.BreakpointDispatcher */{
        breakpoints: [{
            name: 'xs',
            breakpoint: 375
        }, {
            name: 'sm',
            breakpoint: 768
        }, {
            name: 'md',
            breakpoint: 1024
        }, {
            name: 'lg',
            breakpoint: 1280
        }, {
            name: 'xl',
            breakpoint: 100000
        }],
        config: function config(breakpoints) {
            this.breakpoints = breakpoints;
        },
        /**
         * breakpoint
         * @param breakpoints
         */
        start: function start(breakpoints) {
            var self = this,
                currentName = '',
                fn;

            if (breakpoints) {
                self.config(breakpoints);
            }

            $win.on('resize.breakpoint orientationchange.breakpoint load.breakpoint', fn = function fn() {
                var width = $win.width(),
                    min = 0,
                    data;

                for (var i = 0, item; item = self.breakpoints[i]; i++) {
                    if (i > 0) {
                        min = self.breakpoints[i - 1].breakpoint + 1;
                    }

                    if (width > min && width <= item.breakpoint && currentName != item.name) {
                        data = {
                            name: item.name,
                            min: min,
                            max: item.breakpoint,
                            prev: $win.data('breakpoint') || {}
                        };
                        $win.data('breakpoint', data).trigger('breakpointchange', data);
                        currentName = item.name;
                    }
                }
            });

            fn();

            /*$win.on('breakpointchange', function (e, data) {
                if (!data) {
                    $win.trigger('breakpointchange', $win.data('breakpoint'));
                }
            });*/
        }
    };

    return BreakpointDispatcher;
});