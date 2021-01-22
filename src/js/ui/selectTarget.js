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
                var data = result.data.optionData || result.data;
                var arr = data instanceof Array ? data : [];

                if (arr.length) {
                    self.draw(arr, value);
                    if (opt.callback) opt.callback.call(self, arr, self.options.target);
                }
                 
                lgkorUI.hideLoading();
            });
        },
        reset: function(resetFlag) {
            var self = this;
            var $target = $(self.options.target);

            self.$el.find('option:first-child').prop('selected', true);
            $target.find('option:not(.'+self.options.placeholderClass+', .default)').remove();
            if (resetFlag == 'placeholder') {
                $target.prop('disabled', true);
            }
            self.$el.vcSelectbox('update');
            $target.vcSelectbox('update');

            self.$el.trigger('reset');
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
                var $selectOpt = $(this.options[this.selectedIndex]);
                var resetFlag = $selectOpt.hasClass(self.options.placeholderClass) ? 'placeholder' : ($selectOpt.hasClass('default') ? 'default' : '') ;
                var params = $(this).serialize();

                if (self.options.addParam) params += '&' + $(self.options.addParam).serialize();
                
                if (resetFlag) {
                    self.reset(resetFlag);
                } else {
                    self._requestData(params, value);
                }
            });
        }
    });

    return SelectTarget;
});