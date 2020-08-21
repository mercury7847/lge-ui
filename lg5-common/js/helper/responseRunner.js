/*!
 * @module vcui.helper.ResponseRunner
 * @license MIT License
 * @description 반응형 사이즈에 따라 실행해야 하는 스크립트가 있을 경우 사용함
 * @copyright VinylC UID Group
 */
define('helper/responseRunner', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $win = $(global);

    /**
     * 해상도에 따라
     * 스크립트를 실행해야 할 경우에 사용
     * @example
     * vcui.responser.add({
     *   id: 'test',
     *   width: [0, 320],
     *   onEnter: function () {
     *      // 0 ~ 320 사이에 진입했을 때 실행하고자 하는 코드 삽입
     *   },
     *   onLeave: function () {
     *      // 0 ~ 320 사이에서 벗어났을 때 실행하고자 하는 코드 삽입
     *   }
     * })
     */
    var ResponseRunner = core.helper('ResponseRunner', core.BaseClass.extend( /**@lends vcui.helper.ResponseRunner*/{
        $singleton: true,
        defaults: {
            breakpoints: {
                small: 320,
                medium: 640,
                large: 1280
            }
        },
        initialize: function initialize(options) {
            var self = this;

            self.breakpoints = options.breakpoints || self.defaults.breakpoints;
            self.states = [];

            self.start();
        },
        start: function start() {
            var self = this;

            self.winOn('resize orientationchange', self._resizeHandle.bind(self));
            self._resizeHandle();
        },
        _resizeHandle: function _resizeHandle() {
            var self = this;

            core.each(self.states, self.run.bind(self));
        },
        _checkEnter: function _checkEnter(state) {
            var self = this,
                width = $win.width();

            return state.minWidth < width && width <= state.maxWidth;
        },
        run: function run(state) {
            var self = this;
            var isEnter = self._checkEnter(state);
            var width = $win.width();

            if (isEnter && state._isEnter !== true) {
                state._isEnter = true;
                state.onEnter(width);
            } else if (!isEnter && state._isEnter !== false) {
                state._isEnter = false;
                state.onLeave(width);
            }
        },
        add: function add(state) {
            var self = this;

            if (state.name) {
                switch (state.name) {
                    case 'small':
                        state.minWith = 0;
                        break;
                    case 'middle':
                        state.minWidth = self.breakpoints.small + 1;
                        break;
                    case 'large':
                        state.minWidth = self.breakpoints.middle + 1;
                        break;
                }
                state.maxWidth = self.breakpoints[state.name];
            }

            core.extend({
                minWidth: 0,
                maxWidth: 100000,
                onEnter: core.noop,
                onLeave: core.noop
            }, state);

            if ('width' in state) {
                state.minWidth = state.width[0];
                state.maxWidth = state.width[1];
            }
            if (core.isString(state.minWidth)) {
                state.minWidth = self.breakpoints[state.minWidth][0];
            }
            if (core.isString(state.maxWidth)) {
                state.maxWidth = self.breakpoints[state.maxWidth][1];
            }

            self.states.push(state);
            self.run(state);
        },
        remove: function remove(id) {
            core.object.remove(function (item) {
                return item.id === id;
            });
        }
    }));

    return ResponseRunner;
});