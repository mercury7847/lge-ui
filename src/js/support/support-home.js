(function(){
    var supportHome = {
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
                        $listWrap.addClass('active').siblings().removeClass('active').find(self.el.list).stop().slideUp();
                        $list.stop().slideDown();
                    }
                    
                })
            },
            init : function(){
                this.toggle();
            }
        },
        showAll : {
            el : {
                container : '[data-more-container]',
                hidden : '[data-more-hidden]',
                btn : '[data-more-btn]'
            },
            show : function(){
                var self = this;
                var $moreBtn = $(self.el.btn);
            
                $moreBtn.on('click', function(){
                    var $this = $(this);
                    var $wrap = $this.closest(self.el.container);
                    var $hiddenItem =$wrap.find(self.el.hidden);
                    
                    $hiddenItem.addClass('show');
                    $this.hide();
                    e.preventDefault();
                })
            },
            init : function(){
                this.show();
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

                    self.award.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.award.config);
                    self.award.el.slider.addClass(self.slideActiveClass);

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
            this.showAll.init();
            this.slide.init();
            this.toggleList.init();
        }
    }

    
    $(window).ready(function(){
        supportHome.initialize();
    })
})();