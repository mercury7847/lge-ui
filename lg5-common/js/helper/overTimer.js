/*!
 * @module vcui.helper.Gesture
 * @license MIT License
 * @description 제스처 헬퍼
 * @copyright VinylC UID Group
 */
define('helper/overTimer', ['jquery', 'vcui'], function () {

    /**
     * 유저가 머무는 시간을 체크하기 위한 모듈
     * @class
     * @name vc ui.helper.OverTimer
     * @extends vcui.BaseClass
     */
    return core.helper('OverTimer', core.BaseClass.extend({
        $mixins: [core.EventListener],
        limitTime: 600000, // 제한시간
        remainTime: 60000, // 제한시간 전 알림시간
        /**
         * 생성자
         * @param options
         */
        initialize: function initialize(options) {
            var self = this;
            self.options = $.extend({}, options);

            core.each(self.options.events, function (item, name) {
                self.on(name, item);
            });
        },
        /**
         * 시작
         * @returns {OverTimer}
         */
        start: function start(setUpdateTime) {
            var self = this,
                oldPassTime,
                fn,
                limitTime = self.options.limitTime;

            self.stop();
            if (setUpdateTime) {
                self.trigger('timeupdate', { passTime: 0, remainTime: limitTime - setUpdateTime });
            } else {
                self.trigger('timeupdate', { passTime: 0, remainTime: limitTime });
            }

            // 처음에 제한시간 10:00은 보여주어야 하지 않나라는 의견이 있어서 10;00을 표시하고서 1초 후에 타이머를 시작한다.
            setTimeout(function () {
                self.activeTime = +new Date();
                setUpdateTime && (self.activeTime -= setUpdateTime);
                clearInterval(self.timer);
                self.timer = setInterval(fn = function fn() {
                    var time = +new Date(),
                        passTime = time - self.activeTime;

                    // setInterval의 시간차가 정확하지 않아서 0.3초마다 돌면서 초가 변경됐을 때 이벤트를 날림
                    if (passTime - oldPassTime <= 1000) {
                        return;
                    }
                    oldPassTime = passTime;

                    // 1초마다 발생
                    self.trigger('timeupdate', {
                        passTime: passTime,
                        remainTime: limitTime - passTime
                    });

                    if (!self.isNotified && passTime > limitTime - remainTime) {
                        self.isNotified = true;
                        // 30초전 발생
                        self.trigger('beforeovertime');
                    }

                    if (passTime > limitTime) {
                        // 종료시 발생
                        self.trigger('overtime');
                        self.stop();
                    }
                }, 200);
            }, 1000);

            return this;
        },
        /**
         * 정지
         * @returns {OverTimer}
         */
        stop: function stop() {
            clearInterval(this.timer);
            return this;
        },

        setLimitTime: function setLimitTime(time) {
            this.options.limitTime = time;
        },

        /**
         * 갱신
         * @returns {OverTimer}
         */
        refresh: function refresh(time) {
            this.isNotified = false;
            this.start(time);
            return this;
        }
    }));
});