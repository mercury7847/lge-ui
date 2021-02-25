/*!
 * @module vcui.ui.RadioShowHide
 * @license MIT License
 * @description VR 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 */
vcui.define('ui/radioShowHide', ['jquery', 'vcui'], function ($, core) {
    "use strict";
   
    /**
     * @class
     * @description .
     * @name vcui.ui.RadioShowHide
     * @extends vcui.ui.View
     */

    var RadioShowHide = core.ui('RadioShowHide', /** @lends vcui.ui.ElShowHide# */{
        bindjQuery: 'radioShowHide',
        defaults: {
        },
        selectors: {
            radios:'[data-visible-target][type=radio]'
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._build();
            self._bindEvent();
        },

        _build: function _build() {
            var self = this;
            var opts = self.options;
            console.log(self.$radios)
            var radioName = self.$radios[0].name;
            self.$target = self.$radios.filter('input[name='+ radioName +']');
            self.change();          
            console.log(self.$target);       
        },

        _bindEvent: function _bindEvent() {

            var self = this;

            self.$target.on('change', function(e){
                self.change();
            });

        },


        change: function change() {

            var self = this;
            var showTarget = [];

            self.$target.each(function(){
                    
                var targetStr = $(this).attr('data-visible-target');
                var arr = targetStr? targetStr.split(','):[];
                var isChecked = this.checked;

                core.each(arr, function(value){
                    if(isChecked){
                        showTarget.push(core.string.trim(value));
                        // $(core.string.trim(value)).show();
                    }else{
                        $(core.string.trim(value)).hide();
                    }
                });		
            });

            core.each(showTarget, function(value) {
                $(value).show();
            });
        }

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return RadioShowHide;
});