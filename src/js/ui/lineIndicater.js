
vcui.define('ui/lineIndicater', ['jquery', 'vcui', 'ui/svgProgress'], function ($, core) {
    "use strict";

    var _DOMS = {
        indicate: 'ui_lineindicate',
        indexMaker: 'ui_index_maker',
        totalMaker: 'ui_total_maker',
    }

    var LineIndicater = core.ui('LineIndicater', {
        bindjQuery: true,
        defaults: {
            mode: 'indicate',
            type: 'line',
            
            width: 50,
            thickness: 1,
            bgthickness: 0,
            activeColor: '#ff0000',
            bgColor: '#bbb',

            startIndex: 0,
            totalIndex: 1,

            timerSpeed: 4500,
            progressSpeed: 100,

            disableClass: "off"
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.indicate = null;
            
            self.selectIndexMaker = null;
            self.selectTotalMaker = null;
            self.selectIndex = self.options.startIndex;
            self.selectTotal = self.options.totalIndex;
            
            self._setting();
        },

        _setting: function(){
            var self = this;

            self._setSvgProgress();
            self._setIndexMaker();

            self._init();
        },

        _setSvgProgress: function(){
            var self = this;

            self.$el.find('.' + _DOMS.indicate).vcSvgProgress(self.options);
            self.indicate = self.$el.find('.' + _DOMS.indicate).vcSvgProgress('instance');
        },

        _setIndexMaker: function(){
            var self = this;

            var indexMaker = self.$el.find('.' + _DOMS.indexMaker);
            var totalMaker = self.$el.find('.' + _DOMS.totalMaker);
            if(indexMaker.length && totalMaker.length){
                self._addIndexMaker(indexMaker, totalMaker);
            }
        },

        _updateStatus: function(){
            var self = this

            if(self.selectIndexMaker != null) self.selectIndexMaker.text(self.selectIndex+1);
        },

        _init: function(){
            var self = this;

            self.indicate.setInit();
        },

        _setIndex: function(idx){
            var self = this;

            if(idx != self.selectIndex && idx > -1 && idx < self.selectTotal){
                self.selectIndex = idx;            
            
                self._updateStatus();
                self.indicate.setIndex(idx);
            }
        },

        _reset: function(options){
            var self = this;

            self.options = $.extend(self.options, options);
        },

        _addIndexMaker: function(current, total){
            var self = this;

            if(current != undefined && total != undefined){
                self.selectIndexMaker = current;
                self.selectTotalMaker = total;

                self.selectTotalMaker.text(self.selectTotal);
                self.selectIndexMaker.text(self.selectIndex+1);
            }
        },

        /** PUBLIC METHOD**/
        setInit: function(){
            var self = this;
            
            self.selectIndex = 0;

            self._init();
        },

        addIndexMaker: function(current, total){
            var self = this;

            self._addIndexMaker(current, total);
        },

        setIndex: function(idx){
            var self = this;

            self._setIndex(idx);
        },

        reset: function(options){
            var self = this;

            self._reset(options);
        }
    });

    return LineIndicater;
});