/*!
 * @module vcui.helper.Dragger
 * @license MIT License
 * @description 드래그 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('helper/dragger', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var context = window;
    var getPageScroll = function getPageScroll() {
        return {
            x: context.pageXOffset !== undefined ? context.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
            y: context.pageYOffset !== undefined ? context.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        };
    };

    document.onselectstart = function () {
        return false;
    };

    var Dragger = core.helper('Dragger', core.ui.View.extend({
        name: 'Dragger',
        defaults: {
            start: null,
            drag: null,
            stop: null,
            initX: 0,
            initY: 0,
            allowVerticalScrolling: true,
            allowHorizontalScrolling: true,

            bounds: {
                minX: null,
                maxX: null,
                minY: null,
                maxY: null
            }
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.bounds = $.extend({}, self.defaults.bounds, self.options.bounds);
            self.dragStart = { x: 0, y: 0, diffX: 0, diffY: 0, scrollX: 0, scrollY: 0 };
            self.isDragging = false;
            self.isScrolling = false;

            self.$el.css('msTouchAction', 'none');
            self.bindEvents();
            self.enabled = true;
        },
        bindEvents: function bindEvents() {
            var self = this;
            self.on('mousedown', self._handleMouseDown = self._eventMouseDown.bind(self));
            self.on('touchstart', self._handleTouchStart = self._eventTouchStart.bind(self));
            self.on('touchmove', self._handleTouchMove = self._eventTouchMove.bind(self));
            self.on('touchend', self._handleTopuchEnd = self._eventTouchEnd.bind(self));
            self.on('click', self._handleClick = self._preventClickWhenDrag.bind(self));
        },
        unbindEvents: function unbindEvents() {
            var self = this;
            self.off('mousedown', self._handleMouseDown);
            self.docOff('mousemove', self._handleMouseMove);
            self.docOff('mouseup', self._handleMouseUp);
            self.off('touchstart', self._handleTouchStart);
            self.off('touchmove', self._handleTouchMove);
            self.off('touchend', self._handleTopuchEnd);
            self.off('click', self._handleClick);
        },
        setBounds: function setBounds(newBounds) {
            $.extend(this.bounds, newBounds);
        },
        preventDragStart: function preventDragStart(e) {
            e.preventDefault();
        },
        hasDragged: function hasDragged() {
            return this.dragStart.diffX !== 0 || this.dragStart.diffY !== 0;
        },
        getNewPos: function getNewPos(pointPos) {
            var diffX, diffY, newX, newY;

            diffX = pointPos.x - this.dragStart.x;
            diffY = pointPos.y - this.dragStart.y;

            this.dragStart.diffX = diffX;
            this.dragStart.diffY = diffY;

            newX = diffX;
            newY = diffY;

            if (typeof this.bounds.minX === 'number') {
                newX = Math.max(newX, this.bounds.minX);
            }
            if (typeof this.bounds.maxX === 'number') {
                newX = Math.min(newX, this.bounds.maxX);
            }
            if (typeof this.bounds.minY === 'number') {
                newY = Math.max(newY, this.bounds.minY);
            }
            if (typeof this.bounds.maxY === 'number') {
                newY = Math.min(newY, this.bounds.maxY);
            }

            return {
                x: newX,
                y: newY
            };
        },
        _startDrag: function _startDrag(pointPos) {
            var self = this,
                pageScroll = getPageScroll();

            self.dragStart = {
                x: pointPos.x,
                y: pointPos.y,
                diffX: 0,
                diffY: 0,
                scrollX: pageScroll.x,
                scrollY: pageScroll.y
            };

            self.docOn('mousemove', self._handleMouseMove = self._eventMouseMove.bind(self));
            self.docOn('mouseup', self._handleMouseUp = self._eventMouseUp.bind(self));

            self.triggerHandler('dragstart', { pos: pointPos });
        },

        _moveHandle: function _moveHandle(pointPos) {
            var self = this,
                newPos = self.getNewPos(pointPos);

            self.triggerHandler('dragmove', { pos: newPos, x: newPos.x, y: newPos.y });
        },

        _stopDrag: function _stopDrag(pointPos) {
            var self = this;

            var newPos = self.getNewPos(pointPos);
            var dragSuccess = self.hasDragged() || !self.isScrolling;
            self.triggerHandler('dragend', { dragSuccess: dragSuccess, pos: newPos, x: newPos.x, y: newPos.y });
            self.isDragging = false;

            self.docOff('mousemove', self._handleMouseMove);
            self.docOff('mouseup', self._handleMouseUp);
        },

        _didPageScroll: function _didPageScroll() {
            var self = this;
            var pageScroll = getPageScroll();
            if (self.options.allowVerticalScrolling && pageScroll.y !== self.dragStart.scrollY) {
                return true;
            }
            if (self.options.allowHorizontalScrolling && pageScroll.x !== self.dragStart.scrollX) {
                return true;
            }
            return false;
        },
        _didDragEnough: function _didDragEnough(pos) {
            var self = this,
                opts = self.options;

            if (!opts.allowVerticalScrolling && Math.abs(pos.y - self.dragStart.y) > 10) {
                return true;
            }
            if (!opts.allowHorizontalScrolling && Math.abs(pos.x - self.dragStart.x) > 10) {
                return true;
            }
            return false;
        },
        _eventMouseDown: function _eventMouseDown(e) {
            this.isDragging = true;
            this._startDrag({ x: e.clientX, y: e.clientY });
        },

        _eventMouseMove: function _eventMouseMove(e) {
            if (!this.isDragging) return;
            this._moveHandle({ x: e.clientX, y: e.clientY });
        },

        _eventMouseUp: function _eventMouseUp(e) {
            if (!this.isDragging) return;
            this._stopDrag({ x: e.clientX, y: e.clientY });
        },
        _eventTouchStart: function _eventTouchStart(e) {
            this.isDragging = false;
            this._startDrag({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        },
        _eventTouchMove: function _eventTouchMove(e) {
            var self = this;
            if (self.isScrolling) return true;
            var pos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
            if (!self.isDragging) {
                if (self._didPageScroll()) {
                    self.isScrolling = true;
                    return true;
                }
                if (self._didDragEnough(pos)) {
                    self.isDragging = true;
                } else {
                    return true;
                }
            }
            e.preventDefault();
            self._moveHandle(pos);
        },
        _eventTouchEnd: function _eventTouchEnd(e) {
            var self = this,
                pos = {
                x: self.isScrolling ? self.dragStart.x : e.changedTouches[0].clientX,
                y: self.isScrolling ? self.dragStart.y : e.changedTouches[0].clientY
            };
            self._stopDrag(pos);
            self.isScrolling = false;
        },
        _preventClickWhenDrag: function _preventClickWhenDrag(e) {
            if (this.hasDragged()) {
                e.preventDefault();
            }
        },
        destroy: function destroy() {
            if (!this.enabled) return;
            this.unbindEvents();
            delete this.dragStart;
            delete this.isDragging;
            delete this.isScrolling;
            this.el.style.msTouchAction = undefined;
            delete this.enabled;
        }
    }));

    core.ui.bindjQuery(Dragger, 'Dragger');

    return Dragger;
});