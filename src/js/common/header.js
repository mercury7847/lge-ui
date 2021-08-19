
vcui.define('common/header', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var noneMemPopTemplate = 
        '<article id="popup-beforeNoneMemOrder" class="popup-wrap small">'+
            '<header class="pop-header">'+
                '<h1 class="tit"><span>주문/배송 조회</span></h1>'+
            '</header>'+
            '<section class="pop-conts common-pop non-members">'+
                '<div class="non-members-login">'+
                    '<p class="hello-msg">주문/배송 조회를 선택하셨습니다.</p>'+
                    '<p class="hello-desc">회원 주문조회를 하시려면 <em>[회원 로그인]</em>을 선택해주시고, 비회원 주문조회를 하시려면 <em>[비회원 주문조회]</em>를 선택해주세요.</p>'+
                '</div>'+
            '</section>'+
            '<footer class="pop-footer center">'+
                '<div class="btn-group">'+
                    '<button type="button" class="btn gray" onclick="location.href=' + "'{{orderurl}}'" + '"><span>비회원 주문조회</span></button>'+
                    '<button type="button" class="btn pink" onclick="location.href=' + "'{{loginurl}}'" + '"><span>회원 로그인</span></button>'+
                '</div>'+
            '</footer>'+
            '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>'+
        '</article>';

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

            self.isLogin = null;

            self._getLoginInfo();

            lgkorUI.requestCartCount(self.$el.attr('data-cart-url'));
            

            vcui.require(['ui/carousel', 'ui/smoothScroll', 'libs/jquery.transit.min'], function () {            
                self._setting();
                self._bindEvents();
                self._resize();
                self._arrowState();

                $('.marketing-link .ui_carousel_slider').vcCarousel({
                    infinite: false,
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    lastFix : true
                });

                $(window).on('scroll', function(){
                    var _scrollTop = $(this).scrollTop();
                    self._scroll(_scrollTop)
                });
                // $(window).on('load', function(){
                // });
            });

            var gotourl = self.$el.data('gotoUrl');
            var cancelurl = self.$el.data('cancelUrl');

            self.$el.find('.before-login a').each(function(idx, item){
                var href = $(item).attr('href');
                var exist = href.indexOf(cancelurl);
                if(exist > -1){
                    $(item).on('click', function(e){
                        e.preventDefault();

                        var popup = $('#popup-beforeNoneMemOrder');
                        if(!popup.length){
                            var poptemplate = vcui.template(noneMemPopTemplate, {orderurl: cancelurl, loginurl:gotourl});
                            $('body').append(poptemplate);
                        }                        
                        $('#popup-beforeNoneMemOrder').vcModal({opener:$(this)});
                    });
                }
            });
        },

        _getLoginInfo: function(){
            var self = this;

            var loginInfoUrl = self.$el.attr('data-login-info');
            lgkorUI.requestAjaxDataPost(loginInfoUrl, {}, function(result){
                self.isLogin = result.data.isLogin;
                self.$el.find('.login-info').css('display', 'none');

                if(self.isLogin){
                    self.$el.find('.login-info.after-login').css('display', 'block');
                    if(result.data.name) {
                        self.$el.find('.login-info.after-login > a:not(".btn-logout")').html('<span>' + result.data.name + '</span>님 안녕하세요');
                    }

                    if(self.displayMode){
                        if(self.displayMode == "pc") self.$el.find('.mypage.after-login').css('display', 'inline-block');
                        else{
                            self.$el.find('.btm-before-login').hide();
                            self.$el.find('.btm-after-login').show();
                        }
                    }
                } else{
                    self.$el.find('.login-info.before-login').css('display', 'block');

                    if(self.displayMode){
                        if(self.displayMode == "pc") self.$el.find('.mypage.before-login').css('display', 'inline-block');
                        else{
                            self.$el.find('.btm-before-login').show();
                            self.$el.find('.btm-after-login').hide();
                        }
                    }
                }
            }, false, true);
        },

        _setting: function(){
            var self = this;

            self.outTimer = null;

            self.$mypage = self.$el.find('.header-top .shortcut .mypage');

            self.$pcNaviWrapper = self.$el.find(".nav-wrap .nav");
            self.$pcNavItems = self.$el.find('.nav-wrap .nav > li');

            self.$dimmed = self.$el.find('.header-wrap .dimmed');
            self.$dimmed.hide();

            self.$mobileNaviWrapper = $(self.$pcNaviWrapper.clone()).width('100%');
            self.$mobileNaviItems = self.$mobileNaviWrapper.find('> li');
            self.$el.find(".nav-wrap").append(self.$mobileNaviWrapper);
            self.$mobileNaviWrapper.addClass("ui_gnb_accordion");
            self.$mobileNaviWrapper.find('img').remove();
            self.$mobileNaviWrapper.find('.nav-category-wrap').removeClass('super-category-content on')
            
            self.$hamburger = self.$el.find('.mobile-nav-button');
            self.$headerBottom = self.$el.find('.header-bottom');            

            self.$leftArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .prev');
            self.$rightArrow = self.$el.find('.nav-wrap .nav-arrow-wrap .next'); 
   
            // BTOCSITE-1814
            // pc 상태 on class 붙히는곳
            vcui.require(['ui/smoothScroll'], function (){
                if(!vcui.detect.isMobile) {
                    var href = ""+location.href;
                    $('.mobile-nav-wrap.mainNav').find('a.nav-item').removeClass('on');
                    $('.mobile-nav-wrap.mainNav').find('a.nav-item').each(function() {
                        if(href == this.href) $(this).addClass('on');
                    })
                }
    
                // $('.mobile-nav-wrap.mainNav').vcSmoothScroll({ preventDefaultException: { tagName: /^(A)$/i } });
                $('.mobile-nav-wrap.mainNav').vcSmoothScroll();
                $('.mobile-nav-wrap.mainNav').on('smoothscrollmove',function(e,data){
    
                    if(!data) {
                        var data = {
                            x:0,y:0,
                            isStart : true,
                            isEnd : false
    
                        }
                    }
    
                    if(!data.isStart && !data.isEnd) {
                        $(this).addClass('left right')
                    } else {
                        $(this).removeClass(data.isStart ? 'left' : 'right').addClass(data.isStart ? 'right' : 'left' )
                    }
                 
                }).trigger('smoothscrollmove')
            });


        },

        _bindEvents: function(){
            var self = this;

            //장바구니, 마이페이지홈 클릭시 로딩바 노출
            var $headerUtility = self.$el.find('div.utility');
            $headerUtility.find('li.cart a, li.mypage.after-login a').on('click', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                if(url) {
                    lgkorUI.showLoading();
                    setTimeout(function(){
                        location.href = url;
                    },500);
                }
            });

            //
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
                var active = self.$hamburger.hasClass('active');

                if(active){
                    lgkorUI.addHistoryBack(self.cid, function(){                    
                        self._menuToggle(true);
                    });
                } else{
                    lgkorUI.removeHistoryBack(self.cid);
                }
                

            });

            $(window).on('resizeend', function(){
                self._resize();
            });

           
            $('.mobile-category-container .category').vcSmoothScroll();

            $('.mobile-nav-wrap.is-depth > a.nav-item').attr("aria-expanded", true);
            $('.mobile-nav-wrap.is-depth > a.nav-item').append('<span class="blind">접힘</span>');
            $('.mobile-nav-wrap.is-depth > a.nav-item').on('click', function(e){
                e.preventDefault();

                $(this).toggleClass('on')
                $(this).parent().find('.nav-category-container').toggle();

                if($(this).hasClass('on')){
                    $(this).find('.blind').text("펼침");
                } else{
                    $(this).find('.blind').text("접힘");
                }
            });
            
            self._pcSetting();
            self._mobileSetting();
        },

        _focusFn:function(e){
            var self = this;
            if (self.$el[0] !== e.target && !$.contains(self.$el[0], e.target)) { 
                self._setOut();                    
                e.stopPropagation();
                $(document).off('focusin.header');
            }
        },

        _resize: function(){
            var self = this;
            var winwidth = window.innerWidth;
            if(winwidth > 767){
                if(self.displayMode != "pc"){
                    self._hamburgerDisabled();
                    
                    self.$pcNaviWrapper.css('display', 'inline-block');

                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                    self.$mobileNaviWrapper.hide();

                    self.displayMode = "pc";
                }

                if(self.isLogin != null){
                    if(self.isLogin){
                        self.$el.find('.mypage.after-login').css('display', 'inline-block');
                    } else{
                        self.$el.find('.mypage.before-login').css('display', 'inline-block');
                    }
                }


                self.$el.find('.btm-before-login').hide();
                self.$el.find('.btm-after-login').hide();

                self._arrowState();
            } else{
                if(self.displayMode != "m"){                    
                    self.$pcNaviWrapper.css('display', 'none');
                    self.$mobileNaviWrapper.show();
                    self.displayMode = "m";

                    setTimeout(function(){
                        $('.marketing-link .ui_carousel_slider').vcCarousel('update'); 
                    },100);
                }
                self.$leftArrow.hide();
                self.$rightArrow.hide();

                self.$el.find('.mypage').css('display', 'none');

                if(self.isLogin != null){
                    if(self.isLogin){
                        self.$el.find('.btm-before-login').hide();
                        self.$el.find('.btm-after-login').show();
                    } else{
                        self.$el.find('.btm-before-login').show();
                        self.$el.find('.btm-after-login').hide();
                    }
                }
            }
        },

        _scroll: function(scrollTop){
            var self = this;
            var direction = scrollTop > self.prevScrollTop ? 1:-1;

            if( Math.abs(scrollTop - self.prevScrollTop) < 15) {
                return;
            }
            self._mobileGnbSticky(scrollTop, direction)
        },

        _arrowState: function(){
            var self = this;

            var navwrapwidth = self.$el.find('.nav-wrap').width();
            var brandwidth = self.$el.find('.nav-wrap .nav-brand-gate').outerWidth(true);
            var navwidth = self.$pcNaviWrapper.outerWidth(true);

            if(navwrapwidth < brandwidth + navwidth){
                self.$leftArrow.show();
                self.$rightArrow.show();
                $('.nav-wrap').addClass('is-horizon-scroll')
            } else{
                self.$leftArrow.hide();
                self.$rightArrow.hide();
                $('.nav-wrap').removeClass('is-horizon-scroll')
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

            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            var superNavSwiper = null;
            var swiperConfig = {
                slidesPerView : 'auto',
                infinite: false
            }

            var $superContentLastAnchor = null;

            //탭 컨텐츠 마지막 앵커요소 이벤트
            function lastAnchorKeyEvent(){
                if( $superContentLastAnchor != null) {
                    $superContentLastAnchor.off('keydown.lastAnchor').on('keydown.lastAnchor', function(e){
                        var $currentContent = $(this).closest('.super-category-content');
                        var $currentNav = $('[href="#' + $currentContent.attr('id') + '"]')
        
                        if( e.keyCode == 9 && !e.shiftKey) {
                            if( $currentNav.closest('.swiper-slide').next('.swiper-slide').length) {
                                e.preventDefault();
                                $currentNav.closest('.swiper-slide').next('.swiper-slide').find('a').first().focus()
                            }
                        }
                    });
                }
            }

            self.$pcNavItems.each(function(idx, item){              
                var categoryLayer = $(item).find('> .nav-category-layer');
                var $superCont = $(item).find('.super-category-content');

                /* BTOCSITE-1937 스프레드 메뉴 수정 */
                if(categoryLayer.length){
                    if( $superCont.length ) {
                        $superCont.each(function(sdx, superItem){
                            self._addCarousel($(superItem).find('.ui_carousel_slider'));    
                            
                            //탭 컨텐츠 내의 첫번째 앵커요소 백탭시 해당탭메뉴로 포커스 이동
                            $(superItem).find('a, button').first().on('keydown', function(e){
                                var $this = $(this);
                                var $content = $this.closest('.super-category-content');
                                var $currentTab = $('[href="#' + $content.attr('id') + '"]');

                                if( e.keyCode == 9 && e.shiftKey) {
                                    e.preventDefault();
                                    $currentTab.focus();
                                }
                            });
                        });
                    } else {
                        self._addCarousel(categoryLayer.find('.ui_carousel_slider'));
                    }
                    categoryLayer.find('.ui_carousel_list').css('overflow', 'hidden');
                }
                

                /* BTOCSITE-1937 스프레드 메뉴 수정 */
                $(item).on('mouseover focus', '> a', function(e){
                    var $this = $(this);
                    var $parent = $this.parent();
                    var $superNav = $parent.find('.super-category-nav');
                    var $superContent = $parent.find('.super-category-content')
                    e.preventDefault();
                    
                    if( $superNav.length ) {                        
                        $superNav.find('.swiper-slide').removeClass('on')
                        $superNav.find('.swiper-slide').eq(0).addClass('on');
                        $superContent.removeClass('on');
                        $superContent.eq(0).addClass('on');
                        
                        //레이어 초기 활성화시 컨텐츠 내 앵커요소 키보드 탭 이동 이벤트
                        $superContentLastAnchor = $superContent.eq(0).find('a, button').not('.ui_carousel_hidden').last();
                        lastAnchorKeyEvent();

                        if( window.innerWidth > 767 && !vcui.detect.isMobile ) {
                            vcui.require(['libs/swiper_v4.min'], function(){
                                if( !$('.super-category-nav').hasClass('swiper-container-initialized')) {
                                    superNavSwiper = new Swiper('.nav:not(.ui_gnb_accordion) .super-category-nav', swiperConfig);
                                } else {
                                    superNavSwiper.update();
                                }
                            })
                        }
                    }
                    self._setOver(idx, 0);
                });
            });

            $('.nav-wrap .nav-inner').on('mouseover', function(e){
                self._removeOutTimeout();                
            });

            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            var $superCategoryNav =$('.nav').not('ui_gnb_accordion').find('.super-category-nav');

            $('header, .nav-category-inner').on('mouseleave', function(){
                self._setOut();
                $superContentLastAnchor = null
                if($superCategoryNav.hasClass('swiper-container-initialized')) {
                    superNavSwiper.destroy();
                    if( $superContentLastAnchor != null) {
                        $superContentLastAnchor.off('keydown.lastAnchor')
                        $superContentLastAnchor = null;
                    }
                }
            })

            /* BTOCSITE-1937 스프레드 메뉴 수정: 탭 메뉴 마우스오버, 포커스, 탭이동 이벤트 바인딩 */
            $superCategoryNav.find('a').on('mouseover focus keydown click', function(e){
                var $this = $(this);
                var $navInner = $this.closest('.nav-category-inner');
                var $currentContent = $this.attr('href');
                var $parent = $this.parent();
                var $parent = $this.closest('.swiper-slide');

                if(e.type == "click" ) {
                    e.preventDefault();
                }
                

                if( e.type == "mouseover" || e.type == "focus") {
                    e.preventDefault();
                    if( !$parent.hasClass('on')) {
                        $parent.addClass('on').siblings().removeClass('on');
                        $navInner.find($currentContent).addClass('on').siblings('.super-category-content').removeClass('on');
                        $navInner.find($currentContent).find('.ui_carousel_slider').vcCarousel('update')
    
                        $superContentLastAnchor = $navInner.find($currentContent).find('a, button').not('.ui_carousel_hidden').last();
                        lastAnchorKeyEvent();
                    }
                }

                if(e.type == "keydown" ) { //탭 메뉴 포커스 이동
                    if( e.keyCode == 9 && !e.shiftKey) {
                        e.preventDefault();
    
                        $navInner.find($currentContent).find('a').first().focus();
                    } else if( e.keyCode == 9 && e.shiftKey) {
                        if( $parent.prev('.swiper-slide').length) {
                            e.preventDefault();
    
                            $parent.prev('.swiper-slide').find('a').focus();
                        }
                    }
                }
            });
           
            self.$leftArrow.on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                self._setNavPosition(1);
            });
            self.$rightArrow.on('click', function(e){
                e.preventDefault();               
                e.stopPropagation();
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
            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            var categoryLayer = $(item).find('> .nav-category-layer');
            var $superCategoryContent = $(item).find('.super-category-content');
            if(categoryLayer.length){
                if( $superCategoryContent.length ) {
                    $superCategoryContent.filter('.on').find('.ui_carousel_slider').vcCarousel('update');
                } else {
                    categoryLayer.find('.ui_carousel_slider').vcCarousel('update');
                }
                
            }
        },

        _setOver: function(one, two){
            var self = this;

            self._removeOutTimeout();

            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            self.$pcNavItems.each(function(idx, item){
                if(idx == one){
                    self._setActiveAbled($(item), true);
                    self._showSubContents(item);
                } else{
                    self._setActiveAbled($(item), false);
                }
            });

            if(one > 0){
                self.$dimmed.show();
            } else{
                if(two < 0) self.$dimmed.hide();
                else self.$dimmed.show();
            }

            $(document).off('focusin.header').on('focusin.header', self._focusFn.bind(self));
        },

        _removeOutTimeout: function(){
            var self = this;
            
            clearTimeout(self.outTimer);
            self.outTimer = null;
        },

        _setOut: function(item){
            var self = this;

            self._removeOutTimeout();
       
            //self.outTimer = setTimeout(function(){
            self._setOutAction(item);
            //}, 180);
        },

        _setOutAction: function(item){
            var self = this;

            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            self.$pcNavItems.each(function(idx, item){
                self._setActiveAbled($(item), false);
            });
            self._setNavReturnPosition();
            self.$dimmed.hide();
        },

        _mobileSetting: function(){
            var self = this;
            var isSwipe = !!$('#sw_con').length;

            if( isSwipe ) {
                $('body').addClass('is-main-sticky-header');
            }            

            /* BTOCSITE-1937 스프레드 메뉴 수정 */
            self.$mobileNaviItems.each(function(idx, item){
                var $navDepth1Item = $(item).find('>.nav-item');
                var $superNav = $(item).find('.super-category-nav');

                if( $superNav.length ) {
                    var $cateContainer = $('<div class="nav-category-container"></div>');
                    var $cateContent = $('<ul></ul>');

                    $cateContainer.append('<div class="category-home"><a href="' + $navDepth1Item.attr('href') + '" class="super-category-item">' + $navDepth1Item.attr('data-super-category-item') + '</a></div>')

                    $superNav.find('.swiper-slide').each(function(idx, slide){
                        $(slide).find('a').find('.blind').remove();
                        var listHTML = $('<li></li>');
                        listHTML.append('<a href="#" class="super-category-item" target="_self">' + $(slide).find('a').text() + '</a>');
                        listHTML.append('<div class="nav-category-layer"><div class="nav-category-inner"></div></div>');
                        listHTML.find('.nav-category-inner').append($(item).find($(slide).find('a').attr('href')))
                        $cateContent.append(listHTML);
                    });
                    $cateContainer.append($cateContent)
                    $(item).find('.nav-category-layer').remove();
                    $cateContainer.insertAfter($navDepth1Item)
                }
            });
            self.$mobileNaviItems.find('> a, > span').addClass("ui_accord_toggle");
            self.$mobileNaviItems.find('> .nav-category-layer, > .nav-category-container').addClass("ui_accord_content");
            self.$mobileNaviItems.find('> .nav-category-container > ul').addClass('ui_gnb_accordion');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > a').addClass('ui_accord_toggle');
            self.$mobileNaviItems.find('> .nav-category-container > ul > li > .nav-category-layer').addClass('ui_accord_content');

            var gid = 0;
            self.$mobileNaviItems.find('> .nav-category-layer > .nav-category-inner').each(function(idx, item){
                $(item).find('.column > .category').addClass("ui_gnb_accordion");
                $(item).find('.column > .category').attr("data-accord-group", "group_"+gid);

                $(item).find('.column > .category > li').each(function(cdx, child){
                    var toggle = $(child).find('> a, > span');
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

            self._setStoryUpdateCheck();

            //BTOCSITE-178 모바일웹/앱 상단 GNB 스티키 처리 - BOTCSITE-2115
            self.prevScrollTop = $(window).scrollTop() || 0;

            $('.is-main-sticky-header #skipToContent').on('focusin', function(){
                $('.is-main-sticky-header').addClass('show-skip')
            }).on('blur', function(){
                $('.is-main-sticky-header').removeClass('show-skip')
            });
        },

        _mobileGnbSticky: function(scrollTop, direction){
            //BTOCSITE-178 모바일웹/앱 상단 GNB 스티키 처리 - BOTCSITE-2115
            var self = this;
            var $scrollContainer = $('body');
            

            if( $scrollContainer.hasClass('is-main-sticky-header')) {
                if( scrollTop > 0) {
                    $scrollContainer.addClass('header-fixed')
                } else {
                    $scrollContainer.removeClass('header-fixed')
                }

                if( scrollTop > 84) {
                    if( direction === 1 ) {
                        $scrollContainer.addClass('scroll-down')
                    } else if (direction === -1) {
                        $scrollContainer.removeClass('scroll-down')
                    }
                } else {
                    $scrollContainer.removeClass('scroll-down')
                }
                self.prevScrollTop = scrollTop;
            }
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

        _menuToggle: function(forceActive){
            var self = this,
            active, replaceText;

            replaceText = self.$hamburger.find('.blind');
            active = forceActive==undefined? self.$hamburger.hasClass('active') : forceActive;

            if(active){

                self.$hamburger.removeClass('active');                                  
                if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');

                setTimeout(function(){
                    replaceText.text("메뉴 열기");
                    $('.ui_gnb_accordion').vcAccordion("collapseAll");
                },600);

                self.$dimmed.hide();

            } else{
                self.$hamburger.addClass('active');
                if(!$('html').hasClass('scroll-fixed')) $('html').addClass('scroll-fixed');
                replaceText.text("메뉴 닫기");
                self.$dimmed.show();
            }

        },

        _hamburgerDisabled: function(){
            var self = this;

            var replaceText = self.$hamburger.find('.blind');
            replaceText.text("메뉴 열기");

            self.$hamburger.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
        },
        _setStoryUpdateCheck: function(){
            var $mobileNav = $('.mobile-nav-wrap');
            var $list = $mobileNav.find('li');
            var $storyList = $list.eq(2);

            var ajaxUrl = $mobileNav.data('storyUrl');

            if(ajaxUrl) {
                lgkorUI.requestAjaxData(ajaxUrl,{},function(resultData){
                    var data = resultData.data;
                    if( data > 0 && resultData.status=== "success") $storyList.addClass('icon-update')
                })
            }
        },
    });

    return Header;
});
