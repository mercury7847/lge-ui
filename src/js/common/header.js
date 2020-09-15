
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

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$naviWrapper = self.$el.find(".header-bottom");
            self.$navItems = self.$el.find('.nav-wrap .nav > li');
            



            self.$prodWrapper = self.$naviWrapper.find('.nav-category-product');
            self.$product = self.$prodWrapper.find('.nav-item');
            self.$categoryWrapper = self.$prodWrapper.find('.nav-category-container');
            self.$category = self.$categoryWrapper.find('> ul');
            self.$categoryItems = self.$category.children();

            self.$hamburger = self.$el.find('.mobile-nav-button');

            self.prodWidth = self.$categoryWrapper.width();
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                self.gnbMode = "pc";

                self._hamburgerDisabled();
                self._addGnbEvents();
            } else{
                self.gnbMode = "m"; 

                self._gnbInit();
                self._removeGnbEvents();
            }
        },

        _bindEvents: function(){
            var self = this;

            self.$mypage.find('> a').on('click', function(e){
                e.preventDefault();

                self._mypageToggle(e.target);
            });

            self.$hamburger.on('click', function(e){
                e.preventDefault();

                self._menuToggle();
            });

            $(window).on('resize', function(){
                self._resize();
            });
        },

        _addGnbEvents: function(){
            var self = this;

            self.$navItems.each(function(idx, item){
                var itemHeight = $(item).outerHeight(true);
                var wid = 0;
                
                /******************************/
                $(item).find('> .nav-category-container').css('display', 'inline-block');
                $(item).find('> .nav-category-container > ul > li').each(function(cdx, child){
                    var pos = wid;
                    var childwidth = $(child).outerWidth(true);
                    wid += childwidth;
                    $(child).css({
                        //position: 'relative',
                        //left: pos
                    });                    
                });
                $(item).find('> .nav-category-container').css({
                    position: 'relative',
                    overflow: 'hidden',
                    'vertical-align': 'top',
                    width: 0,
                    display: 'none'
                    
                    //height: itemHeight
                });
                $(item).find('> .nav-category-container > ul').css({
                    position: 'relative',
                    'vertical-align': 'top',
                    width: '100%'
                });
                $(item).find('> a').css('vertical-align', 'top');

                $(item).css({'vertical-align':  'top'});

                $(item).data('subwidth', wid);
                $(item).on('mouseover', function(e){
                    self._setOver(this);
                }).on('mouseout', function(e){    
                    self._setOutTimer(this);
                });
            });
        },

        _removeGnbEvents: function(){
            var self = this;

            self.$navItems.off('mouseover mouseout');
        },

        _mypageToggle: function(target){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.toggle();
            
            if(mypageLayer.css('display') === 'block'){
                $(window).on('click.headerMypage scroll.headerMypage', function(e){
                    if(e.target !== target) {
                        console.log(e.target + " / " + target);
                        self._mypageToggle();
                    }
                })
            } else{
                $(window).off('click.headerMypage scroll.headerMypage');
            }
        },

        _menuToggle: function(){
            var self = this,
            active, replaceText;

            replaceText = self.$hamburger.find('.blind');
            active = self.$hamburger.hasClass('active');

            if(active){
                self.$hamburger.removeClass('active');
                replaceText.text("메뉴 열기");

                if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
            } else{
                self.$hamburger.addClass('active');
                replaceText.text("메뉴 닫기");

                if(!$('html').hasClass('scroll-fixed')) $('html').addClass('scroll-fixed');
            }
        },

        _hamburgerDisabled: function(){
            var self = this;

            var replaceText = self.$hamburger.find('.blind');
            replaceText.text("메뉴 열기");

            self.$hamburger.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
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

        _setOver: function(item){
            var self = this;

            var subwidth = $(item).data('subwidth');

            $(item).find('> a').addClass('active');
    
            $(item).find('> .nav-category-container').stop().css('display', 'inline-block').animate({width:subwidth}, 200);
        },

        _setOutTimer: function(item){
            var self = this;

            $(item).find('> .nav-category-container').stop().animate({width:0}, 150, function(){
                $(item).find('> a').removeClass('active');
                $(item).find('> .nav-category-container').css('display', 'none');
            });
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