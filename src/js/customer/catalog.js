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
            
            var scrollTop = $(window).scrollTop();
            var anchorScrollTop = $('.catal-tab .tabs').offset().top;
            
            console.log('scrollTop :' +scrollTop)
            console.log('anchorScrollTop :' +anchorScrollTop)
            var anchorScrollLeft = $('.catal-tab .tabs .on').offset().left;
            console.log('★anchorScrollLeft :' +anchorScrollLeft);



            if( scrollTop >= anchorScrollTop ) {
                //self.$catalListWrap.addClass('active on');
                self.$stickyTabWrap.find('.tabs-wrap').vcSticky('update');
            } else {
                //self.$catalListWrap.removeClass('active on');
            }
        },
        bindEvents: function(){ 
            var self = this;

            self.$stickyTabWrap.on('click', '.tabs a', function(e){                
                var id = $(this).attr('href');
                var tabSize = $('.tabs-wrap').height();
                var tabPdSize = parseInt($('.tabs-wrap').css('padding-top'));
                var offset = $(id).offset().top - (tabSize + tabPdSize);
                $('html, body').animate({scrollTop : offset}, 200);

                self.catalSlider();
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

            // $(window).on('scroll', function(){
            //     var scrollTop = $(this).scrollTop();
            //     catalogList.scroll(scrollTop);
            // });

            if( self.$stickyTabWrap && self.$stickyTabWrap.length > 0 ) {
                if(scrollTop >= self.stickyTabOffsetTop) {
                    self.$stickyTabWrap.find('.tabs-wrap').vcSticky('update');
                    //self.$catalListWrap.addClass('active on');
                } else {
                    //self.$catalListWrap.removeClass('active on');
                }
            }
            
            self.scrollTab();


            

            setTimeout(function(){	
                $('.catal-tab .tabs-wrap').vcSmoothScroll('scrollToActive');	
            }, 200)
        },
        scrollTab: function(){
            var scrollTop = $(window).scrollTop();
            var scrollTabList = $('.catal-tab .tabs-wrap').find('li');
            var catalog01 = $("#catalog01").offset().top - 80;
            var catalog02 = $("#catalog02").offset().top - 80;
            var catalog03 = $("#catalog03").offset().top - 80;
            var catalog04 = $("#catalog04").offset().top - 80;
            var catalog05 = $("#catalog05").offset().top - 80;
            var catalog06 = $("#catalog06").offset().top - 80;
            var catalog07 = $("#catalog07").offset().top - 80;
            var catalog08 = $("#catalog08").offset().top - 80;
            var catalog09 = $("#catalog09").offset().top - 80;

            scrollTabList.removeClass('on');
            
            if( catalog01 <= scrollTop && catalog02 > scrollTop ) {
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
            

            

            // var scrollTop = $(window).scrollTop();
            // var catalCont = $('.anchor-contents');
            // var catalLens = catalCont.length;
            // var winHeight = $(window).height();
            // var catalContH = catalCont.height();
            // var hdH = $('.header').height();
            // var breadcrumb = $('.breadcrumb').height();
            // var pageH = $('.page-header').height();
            // var footH = $('.foot-cont').height();
            // var totalH = hdH + breadcrumb + pageH;



            // var catalTabH = $('.catal-tab').height();
            // var catalTabScr = $('.catal-tab').offset().top;


            // var conNumHH = (scrollTop / catalContH);
            // console.log('===conNumHH : ' + conNumHH);
            // var conNumH = conNumHH - 0.6;
            // //var conNum = Math.ceil(conNumH) - 1; //올림
            // //var conNum = Math.round(conNumH); //반올림

            
            // var conNum = parseInt(conNumH); //버림
            // //console.log('catalCont : ' + catalCont);
    
            // console.log('hdH : ' + hdH);
            // console.log('breadcrumb : ' + breadcrumb);
            // console.log('pageH : ' + pageH);
            // console.log('totalH : ' + totalH);
            // console.log('catalTabScr : ' + catalTabScr);

            
            
    
            // if( scrollTop > totalH) {
                
            //     for( var i = 0; catalLens > i; i++){        
            //         var articleTop = catalCont.eq(i).offset().top;
            //         var articleBottom = articleTop + catalCont.eq(i).outerHeight();
        
            //     }
            //     console.log('articleBottom : ' + articleBottom);
            //     console.log('winHeight : ' + winHeight);
            //     console.log('scrollTop : ' + scrollTop);
            //     console.log('catalContH : ' + catalContH);
            //     console.log('===높이 : ' + conNumH);
            //     console.log('===몇번째 요소인지 : ' + conNum);
        
            //     $('.catal-tab .tabs li').removeClass('on');
            //     $('.catal-tab .tabs li').eq(conNum).addClass('on');

            //     console.log('conNum : ' + conNum);
            //     console.log('catalCont.length : ' + catalCont.length);

            //     if( conNum > 0 ){
            //         conNum -1;
            //     }
            //     if( conNum >= catalLens) {
            //         console.log('===========')
            //         $('.catal-tab .tabs li').eq(catalLens-1).addClass('on')
            //     }

            //     //var anchorScrollLeft = $('.catal-tab .tabs .on').offset().left;
            //     //console.log('★anchorScrollLeft :' +anchorScrollLeft);
            //     // $('.catal-tab .tabs-wrap').animate({scrollLeft: anchorScrollLeft + 100}, 200);

            //     //$('.catal-tab .tabs-wrap.ui_smooth_scroll').vcSmoothScroll('refresh');	
                
            // }
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
