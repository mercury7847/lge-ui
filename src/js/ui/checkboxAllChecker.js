/*!
 * @module vcui.ui.CheckboxAllChecker
 * @license MIT License
 * @description CheckboxAllChecker 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/checkboxAllChecker', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    return core.ui('CheckboxAllChecker', {
        bindjQuery: 'checkboxAllChecker',
        defaults: {
            allCheckClass: '.ui_all_checker', //전체 선택 체크박스 클래스...
            checkBoxItemsTargetQuery: null
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.$allChecker = self.$el.find(self.options.allCheckClass);

            self.update();            
            if (self.total === 0) {
                return;
            }

            self._bindEvents();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            // 전체선택 체크박스 선택시
            self.$allChecker.on('change', function (e) {
                self._toggleAllChecked();
            });

            // 소속 체크박스를 선택시
            self.$items.off('change');
            self.$items.on('change', function (e) {
                self._allChecked();
            });
        },

        update: function update() {
            var self = this;
            if(self.options.checkBoxItemsTargetQuery) {
                self.$items = self.$el.find(self.options.checkBoxItemsTargetQuery);
            } else {
                self.$items = self.$el.find('input[type=checkbox]').not(self.options.allCheckClass);
            }
            self.total = self.$items.size();

            self.$items.off('change');
            self.$items.on('change', function (e) {
                self._allChecked();
            });
        },

        _toggleAllChecked: function(){
            var self = this;

            var chk = self.$allChecker.prop('checked');
            self.$items.prop('checked', chk);

            self.trigger('allCheckerChange', [self.getAllChecked()]);
        },

        _allChecked: function(){
            var self = this;

            var leng = self.$items.closest(':checked').length;
            self.$allChecker.prop('checked', self.total === leng);

            self.trigger('allCheckerChange', [self.getAllChecked()]);
        },

        setChecked: function(iptname, chk){
            var self = this;

            self.$items.closest('[name='+iptname+']').prop('checked', chk);
            self._allChecked();
        },
        
        getAllChecked: function(){
            var self = this;

            var leng = self.$items.closest(':checked').length;
            return self.total === leng;
        }
    });
});