;$(function() {   
    var catalogList = {
        init: function(){
            var self = this;

            self.settings();
            self.bindEvents();
            self.initScroll();

            vcui.require(['libs/slick.min'], function () {
                self.catalSlider();               
            });
        },
        settings: function(){
            var self = this;
            self.$catalList = $('.catal-wrap');
            self.$catalListWrap = self.$catalList.find('.catal-list-wrap');        

            //전체 탭
            self.$stickyTabWrap = self.$catalList.find('.catal-tab');
            self.$stickyTab = self.$stickyTabWrap.find('.ui_tab');
            self.stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            self.anchorContent = self.$catalList.find('.anchor-contents');
            
            var scrollTop = $(window).scrollTop();
            var anchorScrollTop = $('.catal-tab .tabs').offset().top;

            if( scrollTop >= anchorScrollTop ) {
                self.$stickyTabWrap.find('.tabs-wrap').vcSticky('update');
            }

            self.scrollTab();
        },
        bindEvents: function(){ 
            var self = this;

            self.$stickyTabWrap.on('click', '.tabs a', function(e){                
                var id = $(this).attr('href');
                var tabSize = $('.tabs-wrap').height();
                var tabPdSize = parseInt($('.tabs-wrap').css('padding-top'));
                var offset = $(id).offset().top - (tabSize + tabPdSize);
                $('html, body').animate({scrollTop : offset}, 200);

                $('.catal-tab .tabs-wrap').find('li').removeClass('on');

                self.catalSlider();
			});


        },
        initScroll: function(){
            self.scroll();
            
            $(window).on('scroll', function(){
                var scrollTop = $(this).scrollTop();
                catalogList.scroll(scrollTop);
            });
        },
        scroll: function(scrollTop){
            //전체탭 스티키
            var self = this;

            if( self.$stickyTabWrap && self.$stickyTabWrap.length > 0 ) {
                if(scrollTop >= self.stickyTabOffsetTop) {
                    self.$stickyTabWrap.find('.tabs-wrap').vcSticky('update');
                }
            }
            
            self.scrollTab();

            setTimeout(function(){	
                $('.catal-tab .tabs-wrap').vcSmoothScroll('scrollToActive');	
            }, 200)
        },
        scrollTab: function(){
            // BTOCSITE-13884 4월 이북(제품 카탈로그) 업데이트 및 수정 요청 사항
            var scrollTop = $(window).scrollTop();
            var scrollTabList = $('.catal-tab .tabs-wrap li');
            var catalTab = $(".catal-tab").offset().top;
            var anchorCont = $(".anchor-contents");
            var ancLeng = anchorCont.length - 1;

            scrollTabList.removeClass('on');

            for(var i = 1; i < ancLeng; i++) {
                if( anchorCont.eq(1).offset().top - catalTab > scrollTop ) {
                    scrollTabList.eq(0).addClass('on');
                } else if( anchorCont.eq(i).offset().top - catalTab <= scrollTop && anchorCont.eq(i+1).offset().top - catalTab > scrollTop ) {
                    scrollTabList.eq(i).addClass('on');
                } else if( anchorCont.eq(ancLeng).offset().top - catalTab <= scrollTop ) {
                    scrollTabList.eq(ancLeng).addClass('on');
                }
            }
        },
        catalSlider: function(){
            $(window).on('breakpointchange.catalSlider', function(e){
                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){    
                    $('.catalog-slider').vcCarousel({
                        infinite: false,
                        dots: false,
                        slidesToShow: 2.3,
                        slidesToScroll: 1,
                        lastFix: true,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    });
                }else if(breakpoint.name == 'pc'){   
                    $('.catalog-slider').vcCarousel('destroy');
                }    
            })
            $(window).trigger('breakpointchange.catalSlider');
        }
    };
    catalogList.init(); 
});
