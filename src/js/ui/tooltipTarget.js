vcui.define('ui/tooltipTarget', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var TooltipTarget = core.ui('TooltipTarget', /** @lends vcui.ui.TooltipTarget# */{
        //$singleton: true,
        bindjQuery: 'tooltipTarget',
        defaults: {
            interval: 200,
            tooltip: '.tooltip-box',
            type : 'click', //click, over
            layerOutClose : true, // 툴팁 바깥을 터치할 경우 닫기를 원함 (type over시 무시)
            closeButtonClass : 'btn-close',
            offsetParentClass : 'tooltip-wrap',
            fixed : null
        },

        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._setting();
            self._bindEvents();
        },

        changeType: function changeType(tooltipType) {
            var self = this;

            if(self.options.tooltip != tooltipType) {
                var eventEnter = self.options.type=='over'? 'mouseenter mouseleave focusin focusout click' : 'click';
                self.options.type = tooltipType;
                self.off(tooltipType,self.options.type,eventEnter);
                self.$tooltip.off('click','> .'+self.options.closeButtonClass);

                self._bindEvents();
            }
        },

        _setting: function() {
            var self = this;
            self.$tooltip = self.$el.siblings(self.options.tooltip);
            self.tooltipStyle = self.$tooltip.attr('style');
            var fixed = self.$el.attr('data-fixed');
            if(fixed) {
                self.options.fixed = fixed;
            }
        },

        _bindEvents: function() {
            var self = this;
            var eventEnter = self.options.type=='over'? 'mouseenter mouseleave focusin focusout click' : 'click';
            self.on(eventEnter, function (e) {
                switch (e.type) {
                    case 'mouseenter':
                    case 'focusin':
                    case 'click':
                        e.preventDefault();
                        self._open(true);
                        break;
                    case 'mouseleave':
                    case 'focusout':
                        e.preventDefault();
                        self._close();
                        break;
                }
            });

            if(self.options.type=='over'){
                self.on('mousedown', function () {
                    self._close();
                });
            }            

            self.$tooltip.on('click','> .'+self.options.closeButtonClass, function () {
                self._close();
            });

            $(window).on('resizeend', function(){
                self._positionCheck();
            });
        },

        _positionCheck: function() {
            var self = this;
            var isParentIsTooltipWarap = self.$tooltip.offsetParent().hasClass(self.options.offsetParentClass);

            var fixedClass = self.options.fixed;
            if(fixedClass) {
                if (isParentIsTooltipWarap) {
                    if(!self.$tooltip.hasClass(fixedClass)) {
                        self.$tooltip.addClass(self.options.fixed);
                    }
                } else {
                    if(self.$tooltip.hasClass(fixedClass)) {
                        self.$tooltip.removeClass(self.options.fixed);
                    }
                }
                return;    
            }

            if(self.isShow) {
                self._resetStyle();
                var windowWidth = $(window).width();
                var offset = self.$tooltip.offset();
                if (isParentIsTooltipWarap) {
                    var width = self.$tooltip.outerWidth(true);
                    if((offset.left + width) > windowWidth) {
                        offset.left = windowWidth - width;
                        offset.left = offset.left > 0 ? offset.left : 0;
                    }
                    self.$tooltip.offset(offset);
                }
                /*
                세로 위치 조정은 아직 필요없을듯 하다 (미완성)
                var documentHeight = $(document).height();
                var height = self.$tooltip.outerHeight(true);
                if((offset.top + height) > documentHeight) {
                    offset.top = documentHeight - height;
                    offset.height = offset.height > 0 ? offset.height : 0;
                }
                */
            }
        },

        _resetStyle: function() {
            var self = this;
            if(self.tooltipStyle) {
                self.$tooltip.attr('style',self.tooltipStyle);
            } else {
                self.$tooltip.removeAttr("style");
                //self.$tooltip.attr('style','');
            }
        },

        _open: function(effect) {
            var self = this;
            if(!self.options.tooltip) return;

            self.showTimer = setTimeout(function () {
                self.$el.parent("." + self.options.offsetParentClass).addClass('active');

                self.$tooltip.attr('aria-hidden', 'false');
                self.isShow = true;
                self._positionCheck();

                if (effect) {
                    self.$tooltip.fadeIn('fast', function(){
                        self.$tooltip.attr('tabindex', -1).focus();
                        self.$tooltip.removeAttr('tabindex');
                    });
                } else {
                    self.$tooltip.show();
                    self.$tooltip.attr('tabindex', -1).focus();
                    self.$tooltip.removeAttr('tabindex');
                }
                
                /*
                self.$tooltip.attr('aria-hidden', 'false');
                self.isShow = true;
                self._positionCheck();
                */
                self.setOuterTouchEvent(true);
            }, self.options.interval);
        },

        _close: function(effect) {
            var self = this;
            clearTimeout(self.showTimer);
            clearTimeout(self.hideTimer);
            self.hideTimer = self.showTimer = null;

            if (!self.isShow) {
                return;
            }
            self.isShow = false;

            var $parent = self.$el.parent("." + self.options.offsetParentClass);
            if (effect) {
                self.$tooltip.fadeOut('fast', function(){
                    $parent.attr('tabindex', -1).focus();
                    $parent.removeAttr('tabindex');
                });
            } else {
                self.$tooltip.hide();
                $parent.attr('tabindex', -1).focus();
                $parent.removeAttr('tabindex');
            }
            self.$tooltip.attr('aria-hidden', 'true');
            $parent.removeClass('active');
            self.setOuterTouchEvent(false);
        },

        setOuterTouchEvent: function(enable) {
            var self = this;
            if(enable) {
                if(self.options.layerOutClose) {
                    $(document).off('.tooltipTarget').on('click.tooltipTarget',function(e){
                        if(self.isShow) {
                            var $this = $(e.target);
                            if($this.hasClass('tooltip-box') || $(this).parents('tooltip-box').length > 0) {
                                //툴팁내부
                            } else {
                                //툴팁외부
                                self._close();
                            }
                        }
                    });
                }
            } else {
                $(document).off('.tooltipTarget');
            }
        },
    });

    return TooltipTarget;
});