/*!
 * @module vcui.ui.starRating
 * @license MIT License
 * @description VR 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 */
vcui.define('ui/selectTarget', ['jquery', 'vcui'], function ($, core) {
    "use strict";
   
    /**
     * @class
     * @description .
     * @name vcui.ui.starRating
     * @extends vcui.ui.View
     */

    var SelectTarget = core.ui('selectTarget', /** @lends vcui.ui.ElShowHide# */{
        bindjQuery: 'selectTarget',
        defaults: {
            placeholderClass: 'placeholder',
            addParam: null
        },
        templates: {
            option: '<option value={{value}}>{{name}}</option>'
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._bindEvent();
        },
        _requestData: function(params, value) {
            var self = this;
            var url = self.$el.data('ajax'),
                opt = self.options;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, params, function(result) {
                if (result.data) {
                    self.draw(result.data.optionData, value);
                    if (opt.callback) opt.callback.call(self, result.data.optionData, self.options.target);
                }
                 
                lgkorUI.hideLoading();
            });
        },
        reset: function() {
            var self = this;
            var $target = $(self.options.target);

            $target.find('option:not(.'+self.options.placeholderClass+', .default)').remove();
            $target.prop('disabled', true);
            $target.vcSelectbox('update');
        },
        draw: function(data, value) {
            var self = this;
            var $target = $(self.options.target),
                html = '';

            data.forEach(function(item) {
                html += vcui.template(self.templates.option, item);
            });

            $target.find('option:not(.'+self.options.placeholderClass+', .default)').remove();
            $target.append(html);
            value && $target.val(value);
            $target.prop('disabled', false);
            $target.vcSelectbox('update');
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$el.on('change', function(e, value) {
                var resetFlag = $(this.options[this.selectedIndex]).hasClass(self.options.placeholderClass, '.default');
                var params = $(this).serialize();

                if (self.options.addParam) parma += '&' + $(self.options.addParam).serialize();
                
                if (resetFlag) {
                    self.reset();
                } else {
                    self._requestData(params, value);
                }
            });
        }
    });

    return SelectTarget;
});