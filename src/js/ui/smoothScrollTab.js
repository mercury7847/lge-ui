/*!
 * @module vcui.ui.SmoothScrollTab
 * @license MIT License
 * @description SmoothScrollTab
 * @copyright VinylC UID Group
 * 

 * 
 */
vcui.define('ui/smoothScrollTab', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var $win = $(window)

    /**
     * @class
     * @description .
     * @name vcui.ui.SmoothScrollTab
     * @extends vcui.ui.View
     */

    var SmoothScrollTab = core.ui('SmoothScrollTab', /** @lends vcui.ui.SmoothScrollTab# */{
        bindjQuery: 'smoothScrollTab',
        defaults: {
            tabname: 'ui_smooth_tab',
            ctrlname: 'ui_smooth_controls',
            prevname: 'ui_smooth_prev',
            nextname: 'ui_smooth_next',
            tabItem: "li",
            selectclass: "on",
            tabIndex:0,
            scrollOption:{
                autoCenterScroll: false,
                center: true
            }
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.tabIndex = self.options.tabIndex;
            
            self._build();
            self._bindEvent();            
        },

        _build: function _build() {
            var self = this;

            self.smoothScroll = new vcui.ui.SmoothScroll(self.$el.find('.' + self.options.tabname), self.options.scrollOption);

            self.controls = self.$el.find('.'+self.options.ctrlname);
            if(self.controls.length){
                self.prevCtrler = self.controls.find('.'+self.options.prevname);
                self.nextCtrler = self.controls.find('.'+self.options.nextname);
            }

            self._setTabIndex();
        },

        _bindEvent  : function _bindEvent() {
            var self = this;
            
            self.nextCtrler.on('click', function(e){
                e.preventDefault();
                self.smoothScroll.nextPage();
            })

            self.prevCtrler.on('click', function(e){
                e.preventDefault();
                self.smoothScroll.prevPage();
            });

            self.$el.on('click', self.options.tabItem, function(e){
                var idx = $(this).index();
                
            })
        },

        _setTabIndex: function _setTabIndex(){
            var self = this;
            
            var items = self.$el.find(self.options.tabItem);
            items.removeClass(self.options.selectclass);
            items.eq(self.options.tabIndex).addClass(self.options.selectclass);
        },

        setTabIndex: function setTabIndex(idx){
            var self = this;

            console.log(self.smoothScroll.maxScrollX)
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return SmoothScrollTab;
});