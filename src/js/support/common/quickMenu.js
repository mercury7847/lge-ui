vcui.define('support/common/quickMenu.min', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var QuickMenu = core.ui('QuickMenu', /** @lends vcui.ui.vcQuickMenu# */{
        bindjQuery: 'quickMenu',
        defaults: {
            
        },
        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            }
            
            self._setting();
            self._bindEvent();
        },
        _setting: function setting() {
            var self = this;
        
            self.$topBtn = self.$el.find('.btn-top');

            self.$service = self.$el.find('.service-menu');
            self.$serviceBtn = self.$service.find('.btn-expand');
            self.$history = self.$el.find('.history');
            self.$historyBtn = self.$history.find('.btn-expand');
            self.$closeBtn = self.$el.find('.btn-close');
            self.$historyPopup = $('#history-popup');
        },
        _altChange : function($target, boolean){
            var $altText = $target.find('.blind');
            var altValue = $altText.text();

            if (!boolean) { //on 클래스가 있을때 (닫을때)
                $altText.text(altValue.replace('닫기', '열기'));
            } else { //on 클래스가 없을때 (열때)
                $altText.text(altValue.replace('열기', '닫기'));
            }
        },
        _changeService: function(flag) {
            var self = this;
            if (!flag) {
                self.$service.removeClass('on');
                self.$serviceBtn.attr('aria-expanded', false);
                self.$el.removeClass('dim');
                self._altChange(self.$serviceBtn, false);
            } else {
                self.$history.removeClass('on');
                self.$service.addClass('on');
                self.$serviceBtn.attr('aria-expanded', true);
                self.$el.addClass('dim');
                self._altChange(self.$serviceBtn, true);
            }
        },
        _changeHistory: function(flag) {
            var self = this;

            if (self.$history.find('.history-list').length) {
                if (flag) {
                    self.$service.removeClass('on');
                    self.$history.addClass('on');
                    self.$el.addClass('dim');
                } else {
                    self.$history.removeClass('on');
                    self.$el.removeClass('dim');
                }
            }
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$service.find('.solutions-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingSolutionsClick.do', 'www.lge.co.kr/acecount/floatingSolutionsClickm.do');
            });
            self.$service.find('.manuals-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingDriverClick.do', 'www.lge.co.kr/acecount/floatingDriverClickm.do');
            });
            self.$service.find('.center-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingCenterClick.do', 'www.lge.co.kr/acecount/floatingCenterClickm.do');
            });
            self.$service.find('.chatbot-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingChatClick.do', 'www.lge.co.kr/acecount/floatingChatClickm.do');
            });
            self.$history.find('.history-list a').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingModelClick.do', 'www.lge.co.kr/acecount/floatingModelClickm.do');
            }); 
            self.$historyPopup.find('.lately-list a').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingModelClick.do', 'www.lge.co.kr/acecount/floatingModelClickm.do');
            });

            self.$serviceBtn.on('click', function() {
                self._changeService($(this).parent().hasClass('on') ? false : true);
            });

            self.$historyBtn.on('click', function() {
                self.$history.find('.history-list li').one('transitionend', function() {
                    self.$history.find('.history-list li:first-child a')[0].focus();
                });
                self._changeHistory(true);
            });

            self.$closeBtn.on('click', function() {
                self._changeHistory(false);
                self.$historyBtn.focus();
            });

            self.$topBtn.on('click', function (e) {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest(self.$el).length) {
                    self._changeService(false);
                    self._changeHistory(false);
                }
            });

            $(window).on('scroll resize', function(){
                self._changeService(false);
                self._changeHistory(false);

                if ($(this).scrollTop() > 100) {
                    self.$el.addClass('top');
                } else {
                    self.$el.removeClass('top');
                }
            });
        }
    });

    return QuickMenu;
});