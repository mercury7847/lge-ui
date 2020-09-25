
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

            self.displayMode = "";

            vcui.require(['ui/carousel', 'ui/smoothScroll'], function () {            
                self._setting();
                self._bindEvents();
                self._resize();
            });
        },

        _setting: function(){
            var self = this;

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$pcNaviWrapper = self.$el.find(".nav-wrap .nav");
            self.$pcNavItems = self.$el.find('.nav-wrap .nav > li');

            self.$mobileNaviWrapper = $(self.$pcNaviWrapper.clone()).width('100%');
            self.$mobileNaviItems = self.$mobileNaviWrapper.find('> li');
            self.$pcNaviWrapper.parent().append(self.$mobileNaviWrapper);
            
            self.$hamburger = self.$el.find('.mobile-nav-button');
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

            self._pcSetting();
            self._mobileSetting();
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                if(self.displayMode != "pc"){
                    self._hamburgerDisabled();
                    
                    self.$pcNaviWrapper.css('display', 'inline-block');

                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                    self.$mobileNaviWrapper.hide();

                    self.displayMode = "pc";
                }
            } else{
                if(self.displayMode != "m"){                    
                    self.$pcNaviWrapper.css('display', 'none');
                    self.$mobileNaviWrapper.show();

                    self.displayMode = "m";
                }
            }
        },

        _pcSetting: function(){
            var self = this;

            self.$pcNavItems.each(function(idx, item){              
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
                // $(item).find('> a').css('vertical-align', 'top');

                // $(item).css({'vertical-align':  'top'});

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

        _mobileSetting: function(){
            var self = this;

            self.$mobileNaviWrapper.addClass("ui_gnb_accordion");
            self.$mobileNaviWrapper.find('img').remove();
            self.$mobileNaviItems.find('> a').addClass("ui_accord_toggle");
            self.$mobileNaviItems.find('> .nav-category-layer, > .nav-category-container').addClass("ui_accord_content");
            self.$mobileNaviItems.find('> .nav-category-container > ul').addClass('ui_gnb_accordion');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > a').addClass('ui_accord_toggle');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > .nav-category-layer').addClass('ui_accord_content');

            var gid = 0;
            self.$mobileNaviItems.find('> .nav-category-layer > .nav-category-inner').each(function(idx, item){
                $(item).find('.column > .category').addClass("ui_gnb_accordion");
                $(item).find('.column > .category').attr("data-accord-group", "group_"+gid);

                $(item).find('.column > .category > li').each(function(cdx, child){
                    var toggle = $(child).find('> a');
                    var subcategory = $(child).find('> .sub-category');
                    var categorycontent = $(child).find('> .category-content');
                    if(!subcategory.length && !categorycontent.length){
                        toggle.addClass("none-toggle");
                    } else{
                        toggle.addClass("ui_accord_toggle");
                        subcategory.addClass("ui_accord_content");
                        categorycontent.addClass("ui_accord_content");
                    }
                });

                gid++;
            });

            $('.ui_gnb_accordion').vcAccordion({
                singleOpen: true,
                parentClass: '.ui_gnb_accordion',
                itemSelector: "> li",
                toggleSelector: "> .ui_accord_toggle"
            }).on('accordionbeforeexpand', function(e, data){
                $(data.oldContent).find('.ui_gnb_accordion').vcAccordion("collapseAll");
            }).on('accordioncollapse', function(e, data){
                $(data.content).find('.ui_gnb_accordion').vcAccordion("collapseAll");
            });
        },

        _mypageToggle: function(target){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.toggle();
            
            if(mypageLayer.css('display') === 'block'){
                if(!self.$mypage.find('> a').hasClass('on')) self.$mypage.find('> a').addClass("on");
                $(window).on('click.headerMypage scroll.headerMypage', function(e){
                    if(e.target !== target) {
                        self._mypageToggle();
                    }
                })
            } else{
                self.$mypage.find('> a').removeClass("on");
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

                $('.ui_gnb_accordion').vcAccordion("collapseAll");

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
                    slidesToScroll: 1,
                    playSelector: '.btn-play.play'
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