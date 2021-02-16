(function(){
    var supportHome = {
        loginTooltip : function(){
            var $tooltip = $('.tooltip-login');
            var $btnClose = $tooltip.find('.btn-tooltip-close');


            $btnClose.on('click', function(e){
                $tooltip.hide();
                e.preventDefault();
            });
        },
        toggleList : {
            el : {
                container : '[data-toggle-list="container"]',
                wrap : '[data-toggle-list="wrap"]',
                list : '[data-toggle-list="list"]',
                btn : '[data-toggle-list="btn"]'
            },
            toggle : function(){
                var self = this;
    
                $(self.el.btn).on('click', function(e){
                    var $this = $(this);
                    var $listWrap = $this.closest(self.el.wrap);
                    var $list = $listWrap.find(self.el.list);
                    e.preventDefault();
    
                    if( $listWrap.hasClass('active')) {
                        $listWrap.removeClass('active');
                        $list.stop().slideUp();
                    } else {
                        $listWrap.addClass('active').siblings().removeClass('active').find(self.el.list).stop().slideUp(function(){
                            $(this).attr('style', '');
                        });
                        $list.stop().slideDown();
                    }
                    
                })
            },
            init : function(){
                this.toggle();
            }
        },
        moreShow : {
            el : {
                container : '[data-more="container"]',
                hidden : '[data-more="hidden"]',
                btn : '[data-more="btn"]'
            },
            hiddenVisible : function(){
                var self = this;
                var $moreBtn = $(self.el.btn);
            
                $moreBtn.on('click', function(e){
                    var $this = $(this);
                    var $wrap = $this.closest(self.el.container);
                    var $hiddenItem = $wrap.find(self.el.hidden);
                    
                    console.log($hiddenItem.length)
                    $hiddenItem.show();
                    $this.hide();
                    e.preventDefault();
                })
            },
            init : function(){
                this.hiddenVisible();
            }
        },
        slide : {
            slideActiveClass : "is-active",
            controls : {
                play : $('.btn-play')
            },
            notice : {
                el : {
                    slider : $('.notice-slider')
                },
                
                config : {
                    infinite: true,
                    autoplay: true,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    vertical:true
                },
            },
            main_service : {
                el : {
                    slider : $('.main-service-slider'),
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    dots : false,
                    arrows : false,
                    draggable : false, 
                    responsive: [
                        {
                            breakpoint: 1920,
                            settings: {
                                dots : false,
                                arrows : false,
                                draggable : false, 
                                slidesToScroll: 1,
                                arrowsUpdate: 'disabled',
                                slidesToShow: 4,
                            }
                        },
                        {
                            breakpoint: 1460,
                            settings: {
                                dots : true,
                                arrows : true,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                dots : true,
                                arrows : true,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                dots : true,
                                arrows : false,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        }
                    ]
                }
            },
            award : {
                el : {
                    slider : $('.award-slider'),
                },
                slideActiveClass : "is-active",
                config : {
                    infinite: true,
                    autoplay: true,
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    responsive: [
                        {
                            breakpoint: 1460,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 20000,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 4
                            }
                        }
                    ]
                },
            },
            init : function(){
                var self = this;
                vcui.require(['ui/carousel'], function () {    
                    //공지사항 슬라이드
                    self.notice.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.notice.config);
                    self.notice.el.slider.addClass(self.slideActiveClass);

                    self.main_service.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.main_service.config);
                    self.main_service.el.slider.addClass(self.slideActiveClass);

                    //수상목록
                    self.award.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.award.config);
                    self.award.el.slider.addClass(self.slideActiveClass);


                    //재생/정지 버튼
                    self.controls.play.on('click', function(e){
                        var $this = $(this);
                        var $slider = $this.closest('.slide-wrap.is-active');
                        e.preventDefault();
                        
                        if( $this.hasClass('pause') ) {
                            $slider.vcCarousel('play');
                            $this.removeClass('pause');
                        } else {
                            $slider.vcCarousel('pause');
                            $this.addClass('pause');
                        }
                    })
                });
            }


        },
        initialize: function(){
            this.loginTooltip();
            this.moreShow.init();
            this.slide.init();
            this.toggleList.init();
        }
    }

    
    $(window).ready(function(){
        supportHome.initialize();
    })
})();