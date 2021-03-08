vcui.define('ui/inputClearButton', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    var InputClearButton = core.ui('InputClearButton', {
        bindjQuery: 'inputClearButton',
        defaults: {
            alway: false
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            var query = self.$el.attr("data-clear-button");
            var target = self.$el.next().find(query).first();
            if(target.length < 1) {
                target = self.$el.parent().find(query).first();
                if(target.length < 1) {
                    target = self.$el.parent().parent().find(query).first();
                }
            }
            self.$clearButton = target;

            self._bindEvents();

            self._update();
        },

        changeVal: function changeVal(v) {
            var self = this;
            self.$el.val(v).trigger("input");
        },

        _update: function update() {
            var self = this;
            if(self.options.alway) {
                self.$clearButton.show();
                self.$el.parent().addClass('clear');
            } else {
                var value = self.$el.val();
                if(value && value.length > 0) {
                    self.$clearButton.show();
                    self.$el.parent().addClass('clear');
                } else {
                    if(!self.options.alway) {
                        self.$clearButton.hide();
                        self.$el.parent().removeClass('clear');
                    }
                }
            }

        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('update',function(e) {
                self._update();
            });

            self.$el.on('input focus',function(e) {
                self._update();
            });

            self.$clearButton.on('click', function() {
                self.$el.val('').focus();
                self.$el.trigger('input');
                self.$el.trigger('change');
                if(!self.options.alway) {
                    $(this).hide();
                }
            });
        },
    });

    return InputClearButton;
});