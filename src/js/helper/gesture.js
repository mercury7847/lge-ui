/*!
 * @module vcui.helper.Gesture
 * @license MIT License
 * @description 제스처 헬퍼
 * @copyright VinylC UID Group
 */
define('helper/gesture', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var Gesture = core.helper('Gesture', core.ui.View.extend({
        name: 'Gesture',
        defaults: {
            container: document,
            threshold: 50,
            direction: 'horizontal',
            gesture: null,
            gestureStart: null,
            gestureMove: null,
            gestureEnd: null
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            console.log("Helper~~")

            var direction = self.options.direction;

            self.isHoriz = direction === 'horizontal' || direction === 'both';
            self.isVerti = direction === 'vertical' || direction === 'both';
            self._bindGestureEvents();
        },

        _getEventPoint: function _getEventPoint(ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end' || ev.type === 'touchend') e = e.changedTouches && e.changedTouches[0] || e;else e = e.touches && e.touches[0] || e;
            return { x: e.pageX || e.clientX, y: e.pageY || e.clientY };
        },

        _getAngle: function _getAngle(startPoint, endPoint) {
            var x = startPoint.x - endPoint.x;
            var y = endPoint.y - startPoint.y;
            var r = Math.atan2(y, x); //radians
            var angle = Math.round(r * 180 / Math.PI); //degrees
            if (angle < 0) angle = 360 - Math.abs(angle);
            return angle;
        },

        _getDirection: function _getDirection(startPoint, endPoint, direction) {
            var angle,
                isHoriz = !direction || direction === 'horizontal' || direction === 'both',
                isVert = !direction || direction === 'vertical' || direction === 'both';

            if (isHoriz != isVert) {
                if (isHoriz) {
                    if (startPoint.x > endPoint.x) {
                        return 'left';
                    } else if (startPoint.x == endPoint.x) {
                        return '';
                    } else {
                        return 'right';
                    }
                } else {
                    if (startPoint.y > endPoint.y) {
                        return 'up';
                    } else if (startPoint.y == endPoint.y) {
                        return '';
                    } else {
                        return 'down';
                    }
                }
            }

            angle = this._getAngle(startPoint, endPoint);
            if (angle <= 45 && angle >= 0) {
                return 'left';
            } else if (angle <= 360 && angle >= 315) {
                return 'left';
            } else if (angle >= 135 && angle <= 225) {
                return 'right';
            } else if (angle > 45 && angle < 135) {
                return 'down';
            } else {
                return 'up';
            }
        },

        _getDiff: function _getDiff(a, b) {
            return { x: a.x - b.x, y: a.y - b.y };
        },

        _bindGestureEvents: function _bindGestureEvents() {
            var self = this,
                opt = self.options,
                touchStart,
                downPos,
                isSwipe = false,
                isScroll = false,
                eventNS = '.gesture' + self.cid;

            //self.$el[0].onselectstart = function (){ return false; };
            //self.$el.attr('unselectable', 'on');

            self.$el.on('mousedown' + eventNS + ', touchstart' + eventNS + '', function (downEvent) {
                if (downEvent.type === 'mousedown') {
                    downEvent.preventDefault();
                }
                downPos = touchStart = self._getEventPoint(downEvent);
                isSwipe = isScroll = false;

                $(opt.container).on('mousemove' + eventNS + ' touchmove' + eventNS, function (moveEvent) {
                    var touch = self._getEventPoint(moveEvent),
                        diff,
                        slope,
                        swipeY,
                        swipeX;

                    if (!touchStart || isScroll) return;
                    diff = self._getDiff(touch, touchStart);

                    if (!isSwipe) {
                        swipeX = Math.abs(diff.y) / (Math.abs(diff.x) || 1);
                        swipeY = Math.abs(diff.x) / (Math.abs(diff.y) || 1);
                        if (swipeX < 1 && self.isHoriz || swipeY < 1 && self.isVerti) {
                            touch.event = moveEvent;
                            if (self._gestureCallback('start', touch) === false) {
                                return;
                            }
                            var ev = $.Event('gesturestart');
                            self.triggerHandler(ev, touch);
                            if (ev.isDefaultPrevented()) {
                                return;
                            }
                            isSwipe = true;
                            self.$el.on('mousemove' + eventNS + ' touchmove' + eventNS + '', function (e) {
                                e.preventDefault();
                            });
                        } else {
                            if (self.isHoriz && swipeX > 1 || self.isVerti && swipeY > 1) {
                                isScroll = true;
                            }
                        }
                    }

                    if (isSwipe) {
                        moveEvent.stopPropagation();
                        moveEvent.preventDefault();

                        touch.diff = diff;
                        touch.direction = self._getDirection(touchStart, touch, opt.direction);
                        touch.event = moveEvent;
                        if (self._gestureCallback('move', touch) === false) {
                            return;
                        }
                        if (self.triggerHandler('gesturemove', touch) === false) {
                            return;
                        }
                    }
                }).on('mouseup' + eventNS + ' mousecancel' + eventNS + ' touchend' + eventNS + ' touchcancel' + eventNS, function (upEvent) {
                    if (isSwipe && touchStart) {
                        var touch = self._getEventPoint(upEvent, 'end');
                        touch.diff = self._getDiff(touch, touchStart);

                        touch.direction = self._getDirection(touchStart, touch, opt.direction);
                        touch.event = upEvent;
                        if (Math.abs(touch.diff.x) > opt.threshold || Math.abs(touch.diff.y) > opt.threshold) {
                            self._gestureCallback('end', touch);
                            self.triggerHandler('gestureend', touch);
                        } else {
                            self._gestureCallback('cancel', touch);
                            self.triggerHandler('gesturecancel', touch);
                        }

                        self.$el.off('mousemove' + eventNS + ' touchmove' + eventNS);

                        switch (touch.direction) {
                            case 'left':
                            case 'right':
                                if (Math.abs(touch.diff.x) > opt.threshold && self.isHoriz) {
                                    self._gestureCallback(touch.direction, touch);
                                    self.triggerHandler('gesture' + touch.direction, touch);
                                }
                                break;
                            case 'up':
                            case 'down':
                                if (Math.abs(touch.diff.y) > opt.threshold && self.isVerti) {
                                    self._gestureCallback(touch.direction, touch);
                                    self.triggerHandler('gesture' + touch.direction, touch);
                                }
                                break;
                        }
                    }

                    touchStart = null;
                    isScroll = false;
                    $(opt.container).off(eventNS);
                });
            }).on('click' + eventNS, 'a, button', function (e) {
                if (!downPos) {
                    return;
                }
                var pos = self._getEventPoint(e);
                if (downPos.x != pos.x || downPos.y != pos.y) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        },

        _gestureCallback: function _gestureCallback(type, data) {
            var self = this,
                ret;
            self.options['gesture' + type] && (ret = self.options['gesture' + type].call(self, data));
            self.options['gesture'] && (ret = self.options['gesture'].call(self, type, data));
            return ret;
        },

        destroy: function destroy() {
            var eventNS = '.gesture' + this.cid;
            this.$el.off(eventNS);
            $(this.options.container).off(eventNS);
            this.supr();
        }
    }));

    core.ui.bindjQuery(Gesture, 'Gesture');

    return Gesture;
});