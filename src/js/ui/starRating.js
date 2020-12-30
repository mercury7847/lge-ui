/*!
 * @module vcui.ui.starRating
 * @license MIT License
 * @description VR 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 */
vcui.define('ui/starRating', ['jquery', 'vcui'], function ($, core) {
    "use strict";
   
    /**
     * @class
     * @description .
     * @name vcui.ui.starRating
     * @extends vcui.ui.View
     */

    var StarRating = core.ui('starRating', /** @lends vcui.ui.ElShowHide# */{
        bindjQuery: 'starRating',
        defaults: {
            activeClass: 'on',
            wrapperClass: 'ui-rating-wrap',
            title: '선택'
        },
        templates: {
            // label: '<span class="ui-select-label">{{text}}</span>',
            option: '<a href="#" data-value="{{value}}" data-text="{{text}}" title="{{title}}">{{text}}</a>'
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.display = self.$el.css('display') !== 'none';
            self.$el.hide();

            self._creat();
            self._bindEvent();
        },
        _creat: function _creat() {
            var self = this,
                wrapperClass = self.options.wrapperClass;

            self.attrTitle = self.$el.attr('title') || self.options.title;
            self.$ratingBox = $('<div class="' + wrapperClass + '"></div>');

            self.$ratingBox.insertAfter(self.$el);

            self._creatOption();
            // self._creatLabel();
            self._update();
        },
        _creatOption: function _creatOption() {
            var self = this,
                html = '';

            core.each(core.toArray(self.el.options), function(item, i) {
                if (item.value) {
                    html += self.tmpl('option', {
                        value: item.value,
                        text: item.innerText,
                        title: self.attrTitle
                    });
                } else {
                    self.$ratingBox.data({
                        'defaultValue': item.value,
                        'defaultText': item.innerText
                    });
                }
            });

            self.$ratingBox.html(html);
        },
        _creatLabel: function _creatLabel() {
            var self = this,
                defaultText = self.$ratingBox.data('defaultText');

            self.$label = $(self.tmpl('label', {
                text: defaultText
            }));
            self.$ratingBox.append(self.$label);
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$ratingBox.on('click', 'a', function(e) {
                e.preventDefault();

                self.selectedIndex($(this).index() + 1);
            });
        },
        _update: function _update() {
            var self = this,
                index = self.el.selectedIndex;
                // text = index <= 0 ? self.$ratingBox.data('defaultText') : self.$ratingBox.find('a').eq(index - 1).data('text');

            self.$ratingBox.find('a').removeClass('on');
            // self.$label.text(text);

            index > 0 && self.$ratingBox.find('a').slice(0, index).addClass('on');
        },
        selectedIndex: function update(index) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.selectedIndex;
            } else {
                if (self.el.options.length - 1 >= index) {
                    self.el.selectedIndex = index;
                    self._update();
                }
            }
        },
        value: function value(value) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.value;
            } else {
                core.each(core.toArray(self.el.options), function(item, i) {
                    if (item.value == value) {
                        self.selectedIndex(i);
                        return false;
                    } 
                });
            }
        }
    });

    return StarRating;
});