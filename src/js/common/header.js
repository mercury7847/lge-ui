
vcui.define('common/header', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var Header = core.ui('Header', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.isTrans = false;

            self.isHover = false;
            self.outTimer = null;

            self.isCategoryHover = false;
            self.categoryOutTimer = null;

            self.gnbMode = "pc";

            self.prodWidth = 0;
            
            self._setting();
            self._bindEvents();
            self._resize();
        },

        _setting: function(){
            var self = this;

            console.log("ddddd")

            self.$naviWrapper = self.$el.find(".header-bottom");
            self.$prodWrapper = self.$naviWrapper.find('.nav-category-product');
            self.$product = self.$prodWrapper.find('.nav-item');
            self.$categoryWrapper = self.$prodWrapper.find('.nav-category-container');
            self.$category = self.$categoryWrapper.find('> ul');
            self.$categoryItems = self.$category.children();

            self.$menuOpener = self.$el.find('.mobile-nav-button');

            self.prodWidth = self.$categoryWrapper.width();
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).outerWidth(true);
            if(winwidth > 1130){
                self._menuToggleDisabled();
                self.gnbMode = "pc";
            } else{
                self._gnbInit();
                self.gnbMode = "m"; 
            }
        },

        _bindEvents: function(){
            var self = this;

            self.$el.on('mouseover', function(){
                if(self.isHover){
                    self._setOver();
                }
            }).on('mouseout', function(){
                if(self.isHover){
                    self._setOutTimer();
                }
            });

            self.$prodWrapper.on('mouseover', function(){
                self._setOver();
            });

            self.$product.on('click', function(e){
                if(self.gnbMode == "m"){
                    e.preventDefault();

                    self._setProductActiveToggle(!self.$product.hasClass('active'));
                }
            });

            self.$categoryItems.each(function(idx, item){
                $(item).on('mouseover', function(){
                    if(!self.isCategoryHover) self._setCategoryOver(idx);
                }).on('mouseout', function(){
                    if(self.isCategoryHover) self._setCategoryOut(idx);
                });
            });

            self.$menuOpener.on('click', function(e){
                e.preventDefault();

                self._menuToggle();
            });

            $(window).on('resize', function(){
                self._resize();
            });
        },

        _menuToggle: function(){
            var self = this,
            active, replaceText;

            replaceText = self.$menuOpener.find('.blind');
            active = self.$menuOpener.hasClass('active');

            if(active){
                self.$menuOpener.removeClass('active');
                replaceText.text("메뉴 열기");

                if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
            } else{
                self.$menuOpener.addClass('active');
                replaceText.text("메뉴 닫기");

                if(!$('html').hasClass('scroll-fixed')) $('html').addClass('scroll-fixed');
            }
        },

        _menuToggleDisabled: function(){
            var self = this;

            var replaceText = self.$menuOpener.find('.blind');
            replaceText.text("메뉴 열기");

            self.$menuOpener.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
        },

        _menuToggleTansition: function(){

        },

        _gnbInit: function(){
            var self = this;

            self._removeOutTimer();
            self._setOut();
            
            self._setRemoveCategoryOutTimer();
            self._setCategoryOut();
        },

        _setCategoryOver: function(idx){
            var self = this;

            if(self.gnbMode == "pc"){
                self.isCategoryHover = true;
    
                var categoryItem = self.$categoryItems.eq(idx);
                var categoryAtag = categoryItem.find('.super-category-item');
                if(!categoryAtag.hasClass('active')) categoryAtag.addClass('active');
            }
        },

        _setCategoryOutTimer: function(idx){
            var self = this;

            if(self.gnbMode == "pc"){
                self.categoryOutTimer = setTimeout(function(){
                    self._setCategoryOut(idx);
                }, 128);
            }
        },

        _setRemoveCategoryOutTimer: function(){
            var self = this;

            if(self.categoryOutTimer != null){
                clearTimeout(self.categoryOutTimer);

                self.categoryOutTimer = null;
            }
        },

        _setCategoryOut: function(idx){
            var self = this;

            self.isCategoryHover = false;

            if(self.gnbMode == "pc"){
                var categoryItem = self.$categoryItems.eq(idx);
                var categoryAtag = categoryItem.find('.super-category-item');
                if(categoryAtag.hasClass('active')) categoryAtag.removeClass('active');
            }
        },

        _setOver: function(){
            var self = this,
            navItem;

            if(self.gnbMode == "pc"){
                self._removeOutTimer();
    
                self.isHover = true;
    
                self._setProductActiveToggle(true);
            }
        },

        _setOutTimer: function(){
            var self = this;

            if(self.gnbMode == "pc"){
                self.outTimer = setTimeout(function(){
                    self._setOut();
                }, 128);
            }
        },

        _removeOutTimer: function(){
            var self = this;

            if(self.gnbMode == "pc" && self.outTimer != null){
                clearTimeout(self.outTimer);

                self.outTimer = null;
            }
        },

        _setOut: function(){
            var self = this;
            
            self.isHover = false;

            if(self.gnbMode == "pc"){
                self._setProductActiveToggle(false);
            }
        },

        _setProductActiveToggle: function(active){
            var self = this;

            var replaceText = self.$product.find('.blind');
            if(active){
                if(!self.$product.hasClass('active')) self.$product.addClass('active');
                replaceText.text('제품 메뉴 닫기');
            } else{
                if(self.$product.hasClass('active')) self.$product.removeClass('active');
                replaceText.text('제품 메뉴 열기');
            }
        }
    });

    return Header;
});