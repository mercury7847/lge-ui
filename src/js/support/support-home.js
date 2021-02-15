(function(){
    var heroSupport  = {
        el : {
            $wrap : $('.home-hero-area .support-list-wrap'),
            $ilst : $('.home-hero-area .support-list > ul'),
            $btn : $('.home-hero-area .btn-list-toggle')
        },
        toggle : function(){
            var self = this;

            this.el.$btn.on('click', function(e){
                var $this = $(this);
                var $listWrap = $this.closest('.support-list');
                var $list = $listWrap.find('ul');
                e.preventDefault();

                if( $listWrap.hasClass('active')) {
                    $listWrap.removeClass('active');
                    $list.stop().slideUp();
                } else {
                    $listWrap.addClass('active').siblings().removeClass('active').find('ul').stop().slideUp();
                    $list.stop().slideDown();
                }
                
            })
        },
        init : function(){
            this.toggle();
        }
    }
    


    var relatedPages = {
        el : {
            $btnMore : $('.related-pages .btn-moreview')
        },
        toggle : function(){
            var self = this;
            
            self.el.$btnMore.on('click', function(){
                var $this = $(this);
                var $wrap = $this.closest('.related-pages');
                var $item = $wrap.find('.item');
                var $hiddenItem =$item.filter('.hidden');
                

                $hiddenItem.addClass('show');
                $this.hide();
                // if( $hiddenItem.filter('.show').length) {
                //     $hiddenItem.rmoveClass('show');
                // } else {
                    
                // }


                e.preventDefault();
            })

        },
        init : function(){
            this.toggle();
        }
    }

    var noticeSlider = {
        el : {
            slider : $('.notice-slider')
        },
        slideActiveClass : "is-active",
        slideConfig : {
            infinite: true,
            autoplay: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            vertical:true
        },
        initialize : function(data){
            var self = this;
    
            self.sliderInit();
        },
        sliderInit : function(){
            var self = this;
            vcui.require(['ui/carousel'], function () {    
                if( !self.el.slider.hasClass(self.slideActiveClass) ) {
                    self.el.slider.not('.is-active').vcCarousel(self.slideConfig);
                    self.el.slider.addClass(self.slideActiveClass);
                } else {
                    var activeSlider = self.el.slider.filter('.' + self.slideActiveClass);
                    activeSlider.vcCarousel('update');
                    activeSlider.vcCarousel('reinit');
                }
            });
        },
    }

    var awardSlider = {
        el : {
            slider : $('.award-slider'),
            btnPlay : $('.award-slider .btn-play')
        },
        slideActiveClass : "is-active",
        slideConfig : {
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
        initialize : function(data){
            var self = this;
    
            self.sliderInit();
        },
        sliderInit : function(){
            var self = this;
            vcui.require(['ui/carousel'], function () {    
                if( !self.el.slider.hasClass(self.slideActiveClass) ) {
                    self.el.slider.not('.is-active').vcCarousel(self.slideConfig);
                    self.el.slider.addClass(self.slideActiveClass);
                } else {
                    var activeSlider = self.el.slider.filter('.' + self.slideActiveClass);
                    activeSlider.vcCarousel('update');
                    activeSlider.vcCarousel('reinit');
                }
            });

            self.el.btnPlay.on('click', function(e){
                
                var $this = $(this);
                var $slider = self.el.slider.filter('.is-active');
                e.preventDefault();
                
                if( $this.hasClass('pause') ) {
                    $slider.vcCarousel('play');
                    $this.removeClass('pause');
                } else {
                    $slider.vcCarousel('pause');
                    $this.addClass('pause');
                }
            })
        },
    }

    $(window).ready(function(){
        heroSupport.init();
        relatedPages.init();
        awardSlider.initialize();
        noticeSlider.initialize();
    })
})();