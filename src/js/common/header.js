
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

            vcui.require(['ui/carousel', 'ui/smoothScroll'], function () {            
                self._setting();
                self._bindEvents();
                self._resize();
            });
        },

        _setting: function(){
            var self = this;

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$naviWrapper = self.$el.find(".nav-wrap .nav");
            self.$navItems = self.$el.find('.nav-wrap .nav > li');
            
            self.$hamburger = self.$el.find('.mobile-nav-button');
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                self._hamburgerDisabled();

                self._removeMobileEvents();
                self._addPcEvents();
            } else{
                self._removePcEvents();
                self._addMobildEvents();
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

            $('.mobile-category-container .category').vcSmoothScroll();

            $('.mobile-nav-category.is-depth > a').on('click', function(e){
                e.preventDefault();

                $(this).parent().find('.nav-category-container').toggle();
            });
        },

        _addPcEvents: function(){
            var self = this;

            self.$navItems.each(function(idx, item){              
                $(item).find('> .nav-category-container').css('display', 'inline-block');
                var categorywidth = $(item).find('> .nav-category-container').outerWidth(true);
                $(item).find('> .nav-category-container').css({
                    overflow: 'hidden',
                    width: 0,
                    display: 'none'
                });
                $(item).find('> .nav-category-container > ul').css({
                    width: '100%'
                });
                $(item).find('> a').css('vertical-align', 'top');

                $(item).css({'vertical-align':  'top'});

                $(item).data('subwidth', categorywidth);
                $(item).on('mouseover', function(e){
                    self._setOver(this);
                }).on('mouseout', function(e){    
                    self._setOut(this);
                });

                $(item).find('> .nav-category-container > ul >li').each(function(cdx, child){
                    $(child).on('mouseover', function(e){
                        self._setOver(this);
                    }).on('mouseout', function(){
                        self._setOut(this);
                    })
                });
            });
        },

        _removePcEvents: function(){
            var self = this;

            self.$navItems.each(function(idx, item){              
                $(item).find('> .nav-category-container').removeAttr('style');
                $(item).find('> .nav-category-container > ul').removeAttr('style');
                $(item).find('> a').removeAttr('style');
                $(item).removeAttr('style');

                $(item).off('mouseover mouseout');
                $(item).find('> .nav-category-container > ul >li').each(function(cdx, child){
                    $(child).off('mouseover mouseout');
                });
            });
        },

        _addMobildEvents: function(){
            var self = this;

            self.$naviWrapper.addClass("ui_gnb_accordion");
            self.$navItems.find('> a').addClass("ui_accord_toggle");
            self.$navItems.find('> .nav-category-layer, > .nav-category-container').addClass("ui_accord_content");
            self.$navItems.find('> .nav-category-container > ul').addClass('ui_gnb_accordion');
            self.$navItems.find('> .nav-category-container > ul > li > a').addClass('ui_accord_toggle');
            self.$navItems.find('> .nav-category-container > ul > li > .nav-category-layer').addClass('ui_accord_content');

            var gid = 0;
            self.$navItems.find('> .nav-category-layer > .nav-category-inner').each(function(idx, item){
                $(item).find('.column > .category').addClass("ui_gnb_accordion");
                $(item).find('.column > .category').attr("data-accord-group", "group_"+gid);
                $(item).find('.column > .category > li > a').addClass("ui_accord_toggle");
                $(item).find('.column > .category > li > .sub-category').addClass("ui_accord_content");

                gid++;
            })

            $('.ui_gnb_accordion').vcAccordion({
                singleOpen: true,
                parentClass: '.ui_gnb_accordion',
                itemSelector: "> li",
                toggleSelector: "> .ui_accord_toggle"
            });
        },

        _removeMobileEvents: function(){

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

        _setOver: function(item){
            var self = this;

            $(item).find('> a').addClass('active'); 

            var catecontainer = $(item).find('> .nav-category-container');
            if(catecontainer.length){
                var subwidth = $(item).data('subwidth');           
                $(item).find('> .nav-category-container').stop().css('display', 'inline-block').animate({width:subwidth}, 200);
            }

            var categoryLayer = $(item).find('> .nav-category-layer');
            if(categoryLayer.length){
                categoryLayer.find('.ui_carousel_slider').vcCarousel({
                    infinite: false,
                    swipeToSlide: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                categoryLayer.find('.ui_carousel_list').css('overflow', 'hidden');
            }
        },

        _setOut: function(item){
            var self = this;

            var catecontainer = $(item).find('> .nav-category-container');
            if(catecontainer.length){
                catecontainer.stop().animate({width:0}, 150, function(){
                    $(item).find('> a').removeClass('active');
                    $(item).find('> .nav-category-container').css('display', 'none');
                });
            } else{
                $(item).find('> a').removeClass('active');
            }
        }
    });

    return Header;
});