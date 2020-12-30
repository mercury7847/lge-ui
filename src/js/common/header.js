
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

            self._getLoginInfo();

            vcui.require(['ui/carousel', 'ui/smoothScroll'], function () {            
                self._setting();
                self._bindEvents();
                self._resize();
                self._arrowState();

                $('.marketing-link .ui_carousel_slider').vcCarousel({
                    infinite: true,
                    swipeToSlide: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            });
        },

        _getLoginInfo: function(){
            var self = this;

            var loginInfoUrl = self.$el.data('loginInfo');
            lgkorUI.requestAjaxData(loginInfoUrl, {}, function(result){
                if(result.data.isLogin){
                    self.$el.find('.mypage.after-login').css('display', 'inline-block');
                } else{
                    self.$el.find('.mypage.before-login').css('display', 'inline-block');
                }
            });
        },

        _setting: function(){
            var self = this;

            self.outTimer = null;

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$pcNaviWrapper = self.$el.find(".nav-wrap .nav");
            self.$pcNavItems = self.$el.find('.nav-wrap .nav > li');

            self.$dimmed = self.$el.find('.nav-wrap .dimmed');

            self.$mobileNaviWrapper = $(self.$pcNaviWrapper.clone()).width('100%');
            self.$mobileNaviItems = self.$mobileNaviWrapper.find('> li');
            self.$el.find(".nav-wrap").append(self.$mobileNaviWrapper);
            
            self.$hamburger = self.$el.find('.mobile-nav-button');

            

            self.$leftArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .prev');
            self.$rightArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .next');
        },

        _bindEvents: function(){
            var self = this;

            self.$mypage.on('mouseover', function(e){
                e.preventDefault();

                self._mypageOver();
            }).on('mouseout', function(e){
                e.preventDefault();

                self._mypageOut();
            });

            self.$hamburger.on('click', function(e){
                e.preventDefault();

                self._menuToggle();
            });

            $(window).on('resize', function(){
                self._resize();
            });

            $('.mobile-category-container .category').vcSmoothScroll();

            $('.mobile-nav-wrap.is-depth > a').on('click', function(e){
                e.preventDefault();

                $(this).parent().find('.nav-category-container').toggle();
            });

            self._pcSetting();
            self._mobileSetting();
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).width();
            if(winwidth > 767){
                if(self.displayMode != "pc"){
                    self._hamburgerDisabled();
                    
                    self.$pcNaviWrapper.css('display', 'inline-block');

                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                    self.$mobileNaviWrapper.hide();

                    self.displayMode = "pc";
                }

                self._arrowState();
            } else{
                if(self.displayMode != "m"){                    
                    self.$pcNaviWrapper.css('display', 'none');
                    self.$mobileNaviWrapper.show();

                    self.displayMode = "m";
                }
                self.$leftArrow.hide();
                self.$rightArrow.hide();
            }
        },

        _arrowState: function(){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.outerWidth(true);

            if(navwrapwidth < brandwidth + navwidth){
                self.$leftArrow.show();
                self.$rightArrow.show();
            } else{
                self.$leftArrow.hide();
                self.$rightArrow.hide();
            }
        },

        _setNavPosition: function(course){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.outerWidth(true);

            var dist = navwrapwidth - (brandwidth + navwidth + 70);
            var navx = dist * -course;
            if(navx > 0) navx = 0;
            
            $('.nav-inner').stop().animate({'margin-left': navx}, 220);
        },

        _setNavReturnPosition: function(){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.data('initWidth');
            var marginleft = parseInt($('.nav-inner').css('margin-left'));

            if(navwrapwidth < brandwidth + navwidth){
                var dist = marginleft + brandwidth + navwidth + 70;
                if(dist < $(window).width() - 54){
                    var navx = $(window).width() - 40 - (brandwidth + navwidth + 70);
                    $('.nav-inner').stop().animate({'margin-left': navx}, 150);
                }
                var dist = navwrapwidth - (brandwidth + navwidth + 70);
            } else{
                $('.nav-inner').stop().animate({'margin-left': 0}, 150);
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

                var categoryLayer = $(item).find('> .nav-category-layer');
                if(categoryLayer.length){
                    self._addCarousel(categoryLayer.find('.ui_carousel_slider'));
                    //categoryLayer.find('.ui_carousel_list').css('overflow', 'hidden');
                }

                $(item).data('subwidth', categorywidth);
                $(item).on('mouseover', '> a', function(e){
                    self._setOver(idx, -1);
                }).on('mouseout', '> a', function(e){    
                    self._setOut();
                });

                $(item).find('> .nav-category-container > ul >li').each(function(cdx, child){
                    $(child).on('mouseover', '> a', function(e){
                        self._setOver(idx, cdx);
                    }).on('mouseout', '> a', function(){
                        self._setOut();
                    });

                    self._addCarousel($(child).find('.ui_carousel_slider'));
                });
            });

            self.$pcNaviWrapper.data('initWidth', self.$pcNaviWrapper.outerWidth(true));

            $('.nav-wrap .nav-inner').on('mouseover', function(e){
                self._removeOutTimeout();
            }).on('mouseout', function(e){
                self._setOut();
            });

            self.$leftArrow.on('click', function(e){
                e.preventDefault();

                self._setNavPosition(1);
            });
            self.$rightArrow.on('click', function(e){
                e.preventDefault();

                self._setNavPosition(-1);
            });

            self.$el.on('mouseover', '.slide-controls', function(e){
                e.preventDefault();
            })
        },

        _addCarousel: function(item){
            item.vcCarousel({
                infinite: true,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                autoplaySpeed: 3000,
                playSelector: '.btn-play.play'
            });
        },

        _setActiveAbled: function(item, abled){
            item.removeClass('active');
            item.find('> a').removeClass('active');

            if(abled){
                item.addClass('active');
                item.find('> a').addClass('active');
            }
        },

        _showSubContents: function(item){
            var self = this;

            var categoryLayer = $(item).find('> .nav-category-layer');
            if(categoryLayer.length){
                categoryLayer.find('.ui_carousel_slider').vcCarousel('update');
            }
        },

        _setOver: function(one, two){
            var self = this;

            self._removeOutTimeout();

            self.$pcNavItems.each(function(idx, item){
                var catecontainer = $(item).find('> .nav-category-container');

                if(idx == one){
                    self._setActiveAbled($(item), true);
                    self._showSubContents(item);
                    
                    if(catecontainer.length){
                        var subwidth = $(item).data('subwidth');           
                        catecontainer.stop().css('display', 'inline-block').animate({width:subwidth}, 200, function(){
                            self._arrowState();
                        });

                        catecontainer.find('> ul >li').each(function(cdx, child){
                            if(cdx == two){
                                self._setActiveAbled($(child), true);
                                self._showSubContents(child);
                            } else{
                                self._setActiveAbled($(child), false);
                            }
                        });
                    }
                } else{
                    if(catecontainer.length){
                        catecontainer.find('> ul >li').each(function(cdx, child){
                            self._setActiveAbled($(child), false);
                        });
                    } else{
                        self._setActiveAbled($(item), false);
                    }
                }
            });

            if(one > 0){
                self.$dimmed.show();
            } else{
                if(two < 0) self.$dimmed.hide();
                else self.$dimmed.show();
            }
        },

        _removeOutTimeout: function(){
            var self = this;
            
            clearTimeout(self.outTimer);
            self.outTimer = null;
        },

        _setOut: function(item){
            var self = this;

            self._removeOutTimeout();
       
            self.outTimer = setTimeout(function(){
                self._setOutAction(item);
            }, 180);
        },

        _setOutAction: function(item){
            var self = this;

            self.$pcNavItems.each(function(idx, item){
                var catecontainer = $(item).find('> .nav-category-container');
                if(catecontainer.length){
                    catecontainer.stop().animate({width:0}, 150, function(){
                        self._setActiveAbled($(item), false);
                        catecontainer.css('display', 'none');

                        self._arrowState();
                    });
                } else{
                    self._setActiveAbled($(item), false);
                }
            });


            self._setNavReturnPosition();
            
            self.$dimmed.hide();
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

        _mypageOver: function(){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.show();

            if(!self.$mypage.find('> a').hasClass('on')) self.$mypage.find('> a').addClass("on");
        },

        _mypageOut: function(){
            var self = this;

            var mypageLayer = self.$mypage.find('.mypage-layer');
            mypageLayer.hide();

            if(self.$mypage.find('> a').hasClass('on')) self.$mypage.find('> a').removeClass("on");
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

                $('.marketing-link .ui_carousel_slider').vcCarousel('update');
            }
        },

        _hamburgerDisabled: function(){
            var self = this;

            var replaceText = self.$hamburger.find('.blind');
            replaceText.text("메뉴 열기");

            self.$hamburger.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
        }
    });

    return Header;
});