/*!
 * @module vcui.helper.Timer
 * @license MIT License
 * @description 타이머 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/timer', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    /**
     * @class
     * @name vcui.helper.Timer
     * @description 타이머 플러그인
     * @example
     * var timer = new vcui.helper.Timer({
     *  interval: 2000,
     *  autoStart: false,
     *  onTiming: function () {
     *      console.log(Date.now()); // 2초마다 출력
     *  }
     * });
     *
     * timer.start();
     * timer.stop();
     */

    var Timer = core.helper('Timer', core.Class( /**@lends vcui.helper.Timer# */{
        $name: 'Timer',
        /**
         * 타이머
         * @param {object} options  옵션
         * @param {number} options.interval 인터벌 시간
         * @param {function} options.onStart 시작시에 실행될 함수
         * @param {function} options.onStop 정지시에 실행될 함수
         * @param {function} options.onTiming 타이밍마다 실행되는 콜백함수
         * @param {boolean} [options.autoStart=true] 자동시작 여부
         * @returns {{play: Function, stop: Function, start: Function, resume: Function, pause: Function}}
         */
        initialize: function initialize(options /*callback, options, autoStart*/) {
            var self = this,
                opts = {
                interval: 1000,
                count: -1,
                onTiming: function onTiming() {},
                autoStart: true
            };

            self.callbacks = $.Callbacks();
            self.playing = false;
            self.timerId = null;
            self.timerIndex = 0;
            self.options = core.extend(opts, options);

            if (self.options.onTiming) {
                self.callbacks.add(self.options.onTiming);
            }

            if (opts.autoStart === true) {
                self.play();
            }
        },
        _intervalCallback: function _intervalCallback(directRun) {
            var self = this,
                opts = self.options,
                _fn;

            clearTimeout(self.timerId);
            self.timerId = setTimeout(_fn = function fn() {
                if (!self.playing) {
                    return;
                }

                self.timerIndex += 1;
                if (self.options.count != -1 && self.options.count < self.timerIndex) {
                    return;
                }

                self.callbacks.fire();
                clearTimeout(self.timerId);
                self.timerId = setTimeout(_fn, opts.interval);
            }, opts.interval);
            if (directRun === true) {
                _fn();
            }
        },

        onTiming: function onTiming(fn) {
            this.callbacks.add(fn);
        },

        start: function start(directRun) {
            var self = this,
                opts = self.options;

            if (self.playing) {
                return;
            }

            self.playing = true;
            opts.onStart && opts.onStart();
            self._intervalCallback(directRun);
        },

        stop: function stop() {
            var self = this,
                opts = self.options;

            if (!self.playing) {
                return;
            }

            self.timerIndex = 0;
            self.playing = false;
            opts.onStop && opts.onStop();
            clearTimeout(self.timerId);
        },
        destroy: function destroy() {
            this.stop();
        }
    }));

    return Timer;
});