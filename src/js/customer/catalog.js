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

            //self.$catalSlider = self.$catalList.find('.ui_carousel_slider');
        },
        bindEvents: function(){ 
            var self = this;

            self.$stickyTabWrap.on('click', '.tabs a', function(e){                
                var id = $(this).attr('href');
                var offset = $(id).offset().top - 100;
                $('html, body').animate({scrollTop : offset}, 200);
			});

        },
        initScroll: function(){
            $(window).on('scroll', function(){
                var scrollTop = $(this).scrollTop();
                catalogList.scroll(scrollTop);
            });
        },
        scroll: function(scrollTop){
            //전체탭 스티키
            var self = this;

            $(window).on('scroll', function(){
                var scrollTop = $(this).scrollTop();
                catalogList.scroll(scrollTop);
            });

            if( self.$stickyTabWrap && self.$stickyTabWrap.length > 0 ) {
                if(scrollTop >= self.stickyTabOffsetTop) {
                    self.$catalListWrap.addClass('active on');
                } else {
                    self.$catalListWrap.removeClass('active on');
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
                        slidesToShow: 2.2,
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
    // catalogList.catalSlider();
    
    $(function(){
        var scrollTop = $(this).scrollTop();
        var anchorScrollTop = $('.catal-tab .tabs').offset().top;
        if( scrollTop > anchorScrollTop ) {
            catalogList.scroll(scrollTop);
        }


        
        var catalCont = $('.anchor-contents');
        var catalLens = catalCont.length;
        //console.log('catalCont : ' + catalCont);
        for( var i = 0; catalLens > i; i++){
            //var catalId = catalCont.attr('id');
            var catalId = 'catalog0' + (i+1);
            
            //console.log(catalId +":" + $('# + ' +"catalId"+ ' + ').offset().top );
        }
    });
   

    
});
