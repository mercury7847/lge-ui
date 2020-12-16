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

        _build: function() {
            var self = this;

            self.smoothScroll = new vcui.ui.SmoothScroll(self.$el.find('.' + self.options.tabname), self.options.scrollOption);

            self.controls = self.$el.find('.'+self.options.ctrlname);
            if(self.controls.length){
                self.prevCtrler = self.controls.find('.'+self.options.prevname);
                self.nextCtrler = self.controls.find('.'+self.options.nextname);

                self.prevCtrler.hide();
                self._setArrowCtrlStatus();
            }

            self._setTabIndex();
        },

        _bindEvent  : function() {
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
                
                if(idx != self.tabIndex){
                    self.tabIndex = idx;
                    self._setTabIndex();

                    self.trigger("smoothscrolltabselecttab", [self.tabIndex])
                }
            });

            self.smoothScroll.on('smoothscrollrefresh smoothscrollend', function(e){
                self._setArrowCtrlStatus();
            });
        },

        _setArrowCtrlStatus: function(){
            var self = this;

            if(self.smoothScroll.maxScrollX == 0){
                self.controls.hide();
            } else{
                self.controls.show();

                if(self.smoothScroll.x == 0) self.prevCtrler.hide();
                else self.prevCtrler.show();

                if(self.smoothScroll.x == self.smoothScroll.maxScrollX) self.nextCtrler.hide();
                else self.nextCtrler.show();
            }
        },

        _setTabIndex: function(){
            var self = this;

            var tabwrap = self.$el.find('.' + self.options.tabname);
            var items = tabwrap.find(self.options.tabItem);
            
            items.removeClass(self.options.selectclass);
            items.eq(self.tabIndex).addClass(self.options.selectclass);

            self._setTabContents();
        },

        _setTabContents: function(){
            var self = this;
            
            var contID;
            var tabwrap = self.$el.find('.' + self.options.tabname);
            var items = tabwrap.find(self.options.tabItem);
            items.each(function(idx, item){
                contID = $(item).find('a').attr('href');
                if($(contID).length){
                    $(contID).stop().hide().css({opacity:0});
                }
            });

            contID = items.eq(self.tabIndex).find('a').attr('href');
            $(contID).stop().show().animate({opacity:1}, 220);
        },

        setTabIndex: function(idx){
            var self = this;

            self.tabIndex = idx;
            self._setTabIndex();
        },

        getTabIndex: function(){
            var self = this;

            return self.tabIndex;
        },

        resetStatus: function(selectIdx){
            var self = this;

            self.setTabIndex(selectIdx);

            self.smoothScroll.update();
            
            self._setArrowCtrlStatus();
        },

        refresh: function refresh() {
            var self = this;
            self.smoothScroll.refresh();
        },

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return SmoothScrollTab;
});