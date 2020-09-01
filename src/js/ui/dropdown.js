/*!
 * @module vcui.ui.Dropdown
 * @license MIT License
 * @description 드롭다운 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/dropdown', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document);
    var prefixClass = '.ui_dropdown_';

    var Dropdown = core.ui('Dropdown', {
        bindjQuery: 'dropdown',
        defaults: {
            appendToBody: false,
            disabled: false,
            autoHideClicked: true,
            autoHideFocusout: true,
            toggleSelector: '.ui_dropdown_toggle',
            listSelector: '.ui_dropdown_list'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.$list = self.$(self.options.listSelector);
            if (self.options.appendToBody) {
                self.$list.after(self.$holder = $('<span style="display:none"></span>'));
            }
            
            self._bindEvents();
        },
        _bindEvents: function _bindEvents() {
            var self = this;
            var opt = self.options;

            self.on('click', prefixClass + 'toggle', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (opt.disabled) {
                    return self.close();
                }

                self[self.$el.hasClass('open') ? 'close' : 'open']();
            });
        },
        _bindEventsByOpen: function _bindEventsByOpen() {
            var self = this;
            var opt = self.options;

            self.on('keydown', self._unhandleKeydown = function (e) {
                if (27 == e.keyCode) {
                    e.stopPropagation();
                    self.close();
                    self.$(':focusable:first').focus();
                }
            });

            self.on('click', prefixClass + 'list', self._unhandleClick = function (e) {
                if (!opt.autoHideFocusout) {
                    return;
                }
                if (opt.autoHideClicked) {
                    self.close();
                }
            });

            self.winOne('resize', self._unhandleResize = function () {
                self.close();
            });

            setTimeout(function () {
                // click 이벤트와 겹치지 않도록 한타임 늦게 바인딩한다.
                self.docOn("mousedown keydown", self._unhandleDocEvents = function (e) {
                    if (e.type === 'mousedown') {
                        var $list = self.$(prefixClass + 'list');
                        if (core.dom.contains(self.el, e.target, true) || core.dom.contains($list[0], e.target)) {
                            e.stopPropagation();
                        } else {
                            self.close();
                        }
                    } else {
                        var $toggle = self.$(prefixClass + 'toggle');
                        if (27 === e.keyCode) {
                            self.close(), $toggle.focus();
                        }
                    }
                });
            }, 10);

            self.docOn("focusin focusout", '.ui_dropdown_list', self._unhandleFocus = function (e) {
                clearTimeout(self.focusTimer), self.focusTimer = null;

                if ("focusout" === e.type && self.$el.hasClass("open")) {
                    self.focusTimer = setTimeout(function () {
                        self.close();
                    }, 10);
                }
            });
        },
        _unbindEventsByClose: function _unbindEventsByClose() {
            var self = this;
            var opt = self.options;

            self.off('keydown', self._unhandleKeydown);
            self.off('click', self._unhandleClick);
            self.winOff('resize', self._unhandleResize);
            self.docOff("focusin focusout", self._unhandleFocus);
            self.docOff('mousedown keydown', self._unhandleDocEvents);
        },
        open: function open() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                var $toggle = self.$(prefixClass + 'toggle');
                var offset = $toggle.offset();

                $('body').append(self.$list.css({
                    position: 'absolute',
                    left: offset.left,
                    top: offset.top + $toggle.outerHeight()
                }).show());
            }

            self._bindEventsByOpen();
            self.$el.addClass('open');
        },
        close: function close() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                self.$holder.before(self.$list.css({ position: '', left: '', top: '' }).hide());
            }

            self.$el.removeClass('open');
            clearTimeout(self.focusTimer);
            self._unbindEventsByClose();
        },
        disenabled: function(){

        },
        enabled: function(){
            
        }
    });

    return Dropdown;
});