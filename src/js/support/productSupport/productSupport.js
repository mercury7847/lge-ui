(function() {
    var sticky = {
        el : {
            nav : $('.anchors-tabs-wrap')
        },
        scrollFlag : true,
        activeClass : 'on',
        activeSticky : function(winTop){
            var self = this;

            if( self.el.nav.prev().length ) {
                if( winTop >= self.el.nav.offset().top) {
                    self.el.nav.addClass('fixed')
                } else {
                    self.el.nav.removeClass('fixed');
                }
            }
        },
        swiper: null,
        config : {
            loop : false,
            slidesPerView : 'auto',
            allowTouchMove : true,
            breakpoints : {
                1024 : {
                    allowTouchMove : false,
                }
            }
        },        
        setNavleft : function(){
            var self = this;
            var $container = self.el.nav;
            var $nav = $container.find('.tabs-wrap');
            var $navUl = $nav.find('.tabs');
            var $list = $nav.find('.swiper-slide');
            var $curList = $list.filter('.on');
            var curVal;

            if( window.innerWidth < 768) {
                
            }
        },
        scroll : function(){
            var self = this;
            var winTop = $(window).scrollTop();

            self.activeSticky(winTop);

            self.el.nav.find('.swiper-slide a').each(function(){
                var $this = $(this);
                var $list = $this.closest('.swiper-slide');
                var curIndex = $list.index();
                var $currentSection = $($this.attr('href'));

                if( $currentSection.length && self.scrollFlag == true) {
                    if( winTop >= $currentSection.offset().top && winTop <= $currentSection.offset().top + $currentSection.outerHeight()) {
                        $list.addClass(self.activeClass).siblings().removeClass(self.activeClass);
                        self.swiper.slideTo(curIndex);
                        self.setNavleft();
                        return
                    }
                }
            })
        },
        init : function(){
            var self = this;
            var winTop = $(window).scrollTop();

            self.swiper = new Swiper('.anchor-sticky .swiper-container', self.config);
            self.activeSticky(winTop);
            self.setNavleft();
            self.el.nav.find('.swiper-slide a').on('click', function(e){
                var $this = $(this);
                var $list = $this.closest('.swiper-slide');
                var $currentSection = $($this.attr('href'));
                var curIndex = $list.index();
                var navHeight = self.el.nav.find('.anchor-sticky').outerHeight();
                var _scrollTop = 0;

                self.scrollFlag = false;

                if( curIndex > 0) {
                    _scrollTop = $currentSection.offset().top - navHeight + 1
                } else {
                    _scrollTop = self.el.nav.offset().top
                }
                $list.addClass(self.activeClass).siblings().removeClass(self.activeClass);
                self.swiper.slideTo(curIndex);
                $('html,body').stop().animate({
                    scrollTop : _scrollTop
                }, function(){
                    self.scrollFlag = true
                })
            });
            $(window).on('scroll', function(){
                sticky.scroll();
            });
        }
    }
    
    var psp = {
        init: function() {
            var self = this;

            lgkorUI.recentlySearch.addCookie($('#modelCode').val());

            lgkorUI.initProductSlider();
            $(document).on('click', '.btn-my-pd', function(e){
                if( !lgkorUI.isLogin ) {
                    e.preventDefault();

                    var _url = $(this).attr('href');

                    lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                        typeClass:'type2',
                        title:'',
                        okBtnName: '네',
                        cancelBtnName: '아니요',
                        ok: function() {
                            location.href = _url;
                        },
                        cancel: function() {
                            
                        }
                    });
                }
            });
            $('.related-info .info-slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 3,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            variableWidth: true
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    }
                ]
            });
        }
    }
    
    $(window).ready(function() {
        psp.init();
        sticky.init();
    });
})();