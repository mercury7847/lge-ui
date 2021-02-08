/*!
 * @module vcui.ui.Timeline
 * @license MIT License
 * @description Timeline 컴포넌트
 * @copyright VinylC UID Group
 *
 *
 */
vcui.define('ui/timeline', ['jquery', 'vcui', 'libs/jquery.transit'], function($, core) {
    "use strict";

    /**
     * @class
     * @description
     * @name
     * @extends vcui.ui.View
     */

    var TweenItem = core.BaseClass.extend({

        initialize: function(id, target, start, end, animate) {
            var self = this;

            self.id = id;
            self.$el = target;
            self.seqId = -1;
            self.startFrame = start;
            self.endFrame = end;
            self.totalFrame = end - start;

            self.progress = 0;
            self.oldProgress = 0;
            self.currentFrame = 0;
            self.isPause = false;

            self.startCss = animate.start;
            self.endCss = animate.end;
            self.easing = animate.ease ? $.easing[animate.ease] : $.easing.easeNone;

            self.$child = self.$el.children();
            self.currentCss = {};


            self.tween(0);
        },

        pause: function() {
            var self = this;
            self.isPause = true;

        },
        restart: function() {
            var self = this;
            self.isPause = false;
        },

        getStartFrame: function() {
            var self = this;
            return self.startFrame;
        },

        getEndFrame: function() {
            var self = this;
            return self.endFrame;
        },

        getId: function() {
            var self = this;
            return self.id;
        },

        update: function(currentFrame) {
            var self = this;

            if (currentFrame < self.startFrame) return;
            self.progress = (currentFrame - self.startFrame) / self.totalFrame;
            if (self.oldProgress == self.progress) return;

            if (self.progress <= 0.001) self.progress = 0;
            if (self.progress >= 0.999) self.progress = 1;

            self.tween(self.progress);
            self.oldProgress = self.progress;

        },

        tween: function(d) {
            var self = this;
            if (self.isPause) return;
            var value = self.easing(d);
            var cal, val, start, end, seqId;

            for (var prop in self.endCss) {

                start = self.startCss[prop];
                end = self.endCss[prop];
                cal = 0.0;
                val = 0.0;

                if (core.isArray(end)) {
                    val = Interpolation.bezier(end, value);
                } else {
                    if (core.isNumeric(end)) {
                        start = parseFloat(start);
                        end = parseFloat(end);
                        cal = (end - start) * value;
                        val = start + cal;
                    } else {
                        val = self._convert(start, end, value);
                    }
                }

                if (prop == "seq") {
                    seqId = parseInt(val);
                    if (seqId != self.seqId && seqId > -1) {

                        if (self.$child.length > seqId) {
                            self.$child.eq(seqId).css({
                                visibility: 'visible'
                            });
                            self.$child.not(self.$child.eq(seqId)).css({
                                visibility: 'hidden'
                            });
                        }
                        self.seqId = seqId;
                    }
                }
                self.currentCss[prop] = val;
            }

            self.$el.css(self.currentCss);

        },
        _convert: function(stStr, edStr, d) {
            var outStr = "";

            var stArr = stStr.split(',');
            var endArr = edStr.split(',');
            if (endArr.length < 2) return;

            var cal, val, start, end;
            var arr = [];

            for (var i = 0; i < endArr.length; i++) {

                start = parseFloat(stArr[i]);
                end = parseFloat(endArr[i]);

                cal = (end - start) * d;
                val = start + cal;
                arr[i] = val;

            }

            for (var j = 0; j < arr.length; j++) {
                outStr += (arr.length - 1 == j) ? arr[j] : arr[j] + ",";
            }
            return outStr;
        }

    });



    var Timeline = core.ui('Timeline', /** @lends vcui.ui.Timeline# */ {
        bindjQuery: 'timeline',
        defaults: {
            tweens:null,
            status: false
        },
        selectors: {},
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            self._build();
        },

        _build: function() {

            var self = this;

            self.idCnt = 10000;
            self.direction = 1;
            self.isAnimate = false;
            self.labels = [];
            self.tweenItems = [];
            self.frameObj = {
                current: 0,
                total: 0
            };
            //self.$el.css({opacity:0});

            self.addTween(self.options.tweens);

        },

        _bindEvents: function() {
            var self = this;
        },

        _updateFrame: function() {
            var self = this;
            var total = 0;
            for (var o in self.tweenItems) {
                var endFrame = self.tweenItems[o].getEndFrame();
                if (total < endFrame) total = endFrame;
            }

            self.frameObj.total = total;
            if (self.frameObj.current >= self.frameObj.total) self.frameObj.current = self.frameObj.total;
        },

        _addTween: function(obj) {
            var self = this;

            var id = self.idCnt++;

            for (var o in self.tweenItems) {
                if (self.tweenItems[o].getId() == id) {
                    return;
                }
            }
            var $target = (obj.target instanceof $) ? obj.target : self.$el.find(obj.target);
            var aniObj = obj.animate;

            var frameArr = aniObj.frame.split(',');
            if (frameArr.length < 2) return;


            var startFrame = parseInt(frameArr[0]);
            var endFrame = parseInt(frameArr[1]);

            var endRdFrame;

            $target.each(function(i, target) {

                var random = aniObj.random ? core.number.random(0, endFrame - startFrame) + startFrame : endFrame;
                endRdFrame = parseInt(random);

                var item = new TweenItem(id, $(target), startFrame, endRdFrame, aniObj);
                self.tweenItems.push(item);

                if (self.frameObj.total < endRdFrame) self.frameObj.total = endRdFrame;
                id = self.idCnt++;

            });


        },

        _getIdValue: function(obj) {
            var objId;
            if (core.isObject(obj)) {
                if (obj.constructor.name === "BaseClass") {
                    objId = obj.getId();
                } else {
                    objId = obj.id;
                }
            } else {
                objId = obj;
            }
            return objId;
        },

        _removeTween: function(obj) {
            var self = this;
            var objId = self._getIdValue(obj);

            self.tweenItems = $.grep(self.tweenItems, function(item) {
                if (item.getId() === objId) {
                    item.clear();
                    return false;
                } else {
                    return true;
                }
            });
            self._updateFrame();
        },

        _animation: function() {
            var self = this;

            var frame = self.frameObj.current;
            for (var o in self.tweenItems) {
                self.tweenItems[o].update(frame);
            }

            if (self.options.status) self._status();
            self.uiTriggerHandler('update', self.frameObj);
            if (frame == self.frameObj.total) self.uiTriggerHandler('complete', self.frameObj);

        },

        getTotalFrame: function() {
            return this.frameObj && this.frameObj.total;
        },


        _status: function() {
            var self = this;
            if (!self.$status) {
                self.$status = $("<div id='timelineStatus' style='position:absolute; bottom:0px; right:0px; z-index:10000; padding:10px; font-size:12px; background-color:#000; color:#fff'></div>");
                $('body').prepend(self.$status);
            }
            self.$status.html(" total = " + self.frameObj.total + " / " + " current = " + self.frameObj.current.toFixed(0));

        },

        gotoLabel: function(label, option, isReset) {
            var self = this;
            var frame = self.getFrame(label);

            if (frame < 0) return;
            self.gotoFrame(frame, option, isReset);
        },


        getFrame: function(label) {
            var self = this;
            for (var o in self.labels) {
                if (self.labels[o].label == label) {
                    return self.labels[o].frame;
                }
            }
            return -1;
        },

        getLabel: function(frame) {
            var self = this;
            for (var o in self.labels) {
                if (self.labels[o].frame == frame) {
                    return self.labels[o].label;
                }
            }
            return null;
        },

        gotoFrame: function(frame, option, isReset) {
            var self = this;

            if (typeof(option) === "boolean") {
                isReset = option;
                option = null;
            }

            if (isReset) {
                self.stop();
                self.frameObj.current = 0;
                self._animation();
            }


            if (self.isAnimate) return;
            self.isAnimate = true;


            var config = option ? option : {
                duration: self.frameObj.total,
                ease: "linear"
            };

            if (config.duration == 0) {
                self.isAnimate = false;
                self.frameObj.current = frame;
                self._animation();

            } else {

                $(self.frameObj).clearQueue().stop().animate({
                    current: frame
                }, {
                    duration: config.duration ? config.duration : 1000,
                    easing: config.ease ? config.ease : "linear",
                    step: function(val) {
                        self._animation();
                    },
                    complete: function(e, data) {
                        self.isAnimate = false;
                        self._animation();
                    }
                });
            }
        },
        getCurrentFrame: function() {
            var self = this;
            return self.frameObj.current;
        },
        replaceTween: function(arr) {
            var self = this;
            self.removeTween(arr);
            self.addTween(arr);

        },
        addTween: function(arr) {
            var self = this;
            if (core.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    self._addTween(arr[i]);
                }
            } else {
                self._addTween(arr);
            }

        },
        removeTween: function(arr) {
            var self = this;

            if (core.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    self._removeTween(arr[i]);
                }
            } else {
                self._removeTween(arr);
            }
        },
        addLabel: function(label, frame) {
            var self = this;

            for (var o in self.labels) {
                if (self.labels[o].label == label) return;
            }
            var label = {
                label: label,
                frame: frame
            };
            self.labels.push(label);
            if (self.frameObj.total < frame) self.frameObj.total = frame;
        },
        stop: function() {
            var self = this;
            self.isAnimate = false;
            $(self.frameObj).clearQueue().stop();

        },
        restart: function(arr, isPlay) {
            var self = this;
            self.pause(arr, true);
        },
        pause: function(arr, isPlay) {
            var self = this;
            var objId;
            if (core.isArray(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    objId = self._getIdValue(arr[i]);
                    for (var o in self.tweenItems) {
                        if (self.tweenItems[o].getId() == objId) {
                            if (isPlay) {
                                self.tweenItems[o].restart();
                            } else {
                                self.tweenItems[o].pause();
                            }
                            break;
                        }
                    }
                }
            } else {
                for (var o in self.tweenItems) {
                    objId = self._getIdValue(arr);
                    if (self.tweenItems[o].getId() == objId) {
                        if (isPlay) {
                            self.tweenItems[o].restart();
                        } else {
                            self.tweenItems[o].pause();
                        }
                        return;
                    }
                }
            }
        }

    });

    var Interpolation = {
        bezier: function(v, k) {
            var b = 0,
                n = v.length - 1,
                bn = Interpolation.bernstein,
                i, bc, k1, k2, k3;
            for (i = 0; i <= n; i++) {
                bc = bn(n, i);
                k1 = Math.pow(1 - k, n - i);
                k2 = Math.pow(k, i);
                k3 = v[i];
                b += k1 * k2 * k3 * bc;
            }
            return b;
        },
        bernstein: function(n, i) {
            var fc = Interpolation.factorial;
            var a1 = fc(n);
            var b1 = fc(i);
            var c1 = fc(n - i);
            return a1 / b1 / c1;
        },
        factorial: function(n, i) {
            var a = [1];
            var s = 1,
                i;
            if (a[n]) return a[n];
            for (i = n; i > 1; i--) s *= i;
            return a[n] = s;
        }
    };

    function easeOutBounce(k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        } else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        } else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        } else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    }

    $.extend($.easing, {
        easeNone: function(k) {
            return k;
        },
        easeInQuad: function(k) {
            return k * k;
        },
        easeOutQuad: function(k) {
            return k * (2 - k);
        },
        easeInOutQuad: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k;
            return -0.5 * (--k * (k - 2) - 1);
        },
        easeInQuart: function(k) {
            return k * k * k * k;
        },
        easeOutQuart: function(k) {
            return 1 - (--k * k * k * k);
        },
        easeInOutQuart: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k * k * k;
            return -0.5 * ((k -= 2) * k * k * k - 2);
        },
        easeInQuint: function(k) {
            return k * k * k * k * k;
        },
        easeOutQuint: function(k) {
            return --k * k * k * k * k + 1;
        },
        easeInOutQuint: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        },
        easeInElastic: function(k) {
            var s, a = 0.1,
                p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            } else {
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        },
        easeOutElastic: function(k) {
            var s, a = 0.1,
                p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            } else {
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        },
        easeInOutElastic: function(k) {
            var s, a = 0.1,
                p = 0.4;
            if (k === 0) return 0;
            if (k === 1) return 1;
            if (!a || a < 1) {
                a = 1;
                s = p / 4;
            } else {
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        easeInBack: function(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        easeOutBack: function(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        easeInOutBack: function(k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        },
        easeInBounce: function(k) {
            return 1 - easeOutBounce(1 - k);
        },
        easeOutBounce: easeOutBounce,
        easeInOutBounce: function(k) {
            if (k < 0.5) return (1 - easeOutBounce(1 - k * 2)) * 0.5;
            return easeOutBounce(k * 2 - 1) * 0.5 + 0.5;
        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////

    return Timeline;
});