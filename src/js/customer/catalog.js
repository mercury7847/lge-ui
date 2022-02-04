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
            var scrollTop = $(window).scrollTop();
            var scrollTabList = $('.catal-tab .tabs-wrap li');
            var catalTab = $(".catal-tab").offset().top;
            var catalog02 = $("#catalog02").offset().top - catalTab;
            var catalog03 = $("#catalog03").offset().top - catalTab;
            var catalog04 = $("#catalog04").offset().top - catalTab;
            var catalog05 = $("#catalog05").offset().top - catalTab;
            var catalog06 = $("#catalog06").offset().top - catalTab;
            var catalog07 = $("#catalog07").offset().top - catalTab;
            var catalog08 = $("#catalog08").offset().top - catalTab;
            var catalog09 = $("#catalog09").offset().top - catalTab;

            scrollTabList.removeClass('on');
            
            if( catalog02 > scrollTop ) {
                scrollTabList.eq(0).addClass('on');
            } else if( catalog02 <= scrollTop && catalog03 > scrollTop ) {
                scrollTabList.eq(1).addClass('on');
            } else if( catalog03 <= scrollTop && catalog04 > scrollTop ) {
                scrollTabList.eq(2).addClass('on');
            } else if( catalog04 <= scrollTop && catalog05 > scrollTop ) {
                scrollTabList.eq(3).addClass('on');
            } else if( catalog05 <= scrollTop && catalog06 > scrollTop ) {
                scrollTabList.eq(4).addClass('on');
            } else if( catalog06 <= scrollTop && catalog07 > scrollTop ) {
                scrollTabList.eq(5).addClass('on');
            } else if( catalog07 <= scrollTop && catalog08 > scrollTop ) {
                scrollTabList.eq(6).addClass('on');
            } else if( catalog08 <= scrollTop && catalog09 > scrollTop ) {
                scrollTabList.eq(7).addClass('on');
            } else if( catalog09 <= scrollTop ) {
                scrollTabList.eq(8).addClass('on');
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
