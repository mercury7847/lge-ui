
//BTOCSITE-7335 홈 개선 - 템플릿 삭제
$(function(){

    var $context = !!$('[data-hash="care"]').length ? $('[data-hash="care"]') : $(document);

    vcui.require(['ui/carousel','ui/tab','libs/jquery.transit.min'], function () {

        // 제품 코드 관리 부분
        $context.find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100
        });

        // 플로우배너
        $context.find('.ui_carousel_slider_banner').vcCarousel({
            infinite: true,
            //autoplay: true,
            //autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : true,
            centerMode: true,
            centerPadding: '13.5%',
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerMode: true,
                        centerPadding: '13.5%',
                    }
                },                
                {
                    breakpoint: 1400,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,  
                        centerMode: true, 
                        centerPadding: '17%',
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '25%',
                    }
                }
            ]
        });        

        $context.find('.ui_carousel_slider_banner2').vcCarousel({
            infinite: true,
            //autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth : true,
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                /*
                {
                    breakpoint: 900,
                    settings: {
                        infinite: true,
                        variableWidth : true,
                        dots: true,
                        slidesToShow: 2, 
                        slidesToScroll: 1
                    }
                },*/
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 2, 
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $context.find('.ui_product_tab').vcTab({selectors:{
            prevButton:".ui_smooth_prev",
            nextButton:".ui_smooth_next",
            smoothScroll:'.ui_smooth_tab'
        }});
        /* 케어솔루션 추천 제품 스와이프 및 히스토리 탭토글 기능 추가 : 2021-05-10 */

        var care_cecommended = $context.find('.care-recommended');
        var care_slider = care_cecommended.find('.ui_product_carousel_slider');
        var care_tabs = care_cecommended.find('.ui_smooth_tab .tabs');
        var tab = {
            totalSize: function () {
                return care_tabs.find('li').size();
            },
            currentTab: function () {
                return care_tabs.find('li.on').index() + 1;
            },
            triggerTab: function (idx) {

                care_tabs.find('li').eq(idx).find('a').trigger('click');
            },
            nav: {
                prev: function () {

                    var idx = (1 === tab.currentTab()) ? tab.totalSize() - 1 : tab.currentTab() - 2;
                    tab.triggerTab(idx);
                },
                next: function () {

                    var idx = (tab.totalSize() === tab.currentTab()) ? 0 : tab.currentTab();
                    tab.triggerTab(idx);
                }
            }
        };
        
        //BTOCSITE-2196 -start
        if( !vcui.detect.isMobileDevice) {
            care_cecommended.vcGesture({
                direction: 'horizontal'
            }, { passive: false }).on('gestureend', function (e, data) {
                // gesturestart gesturemove gestureend gesturecancel
                /* 탭 방향 전환 */
                if (data.direction === 'left') {
                    tab.nav.next();
                } else {
                    tab.nav.prev();
                }
            });
        } else {
            var touchFlag = true;
            var touchFlagTid = 0;

            care_cecommended.on('touchstart', function(e){
                var $this = $(this);
                var startX = e.changedTouches[0].clientX;
                var startY = e.changedTouches[0].clientY;
                var endX = 0;
                var endY = 0;

                $this.on('touchend', function(ev){
                    endX = ev.changedTouches[0].clientX;
                    endY = ev.changedTouches[0].clientY;

                    var dirLeft = startX - endX < 0;
                    var rangeX = Math.abs(startX - endX);
                    var rangeY = Math.abs(startY - endY);

                    if( rangeY > 30) return;
                    
                    if( touchFlag == true && rangeX > 100 ) {
                        touchFlag = false;
                        if(dirLeft) {
                            tab.nav.prev();
                            console.log('left')
                        } else {
                            tab.nav.next();
                            console.log('right')
                        }

                        clearTimeout(touchFlagTid);
                        touchFlagTid = setTimeout(function(){
                            touchFlag = true;

                            console.log("rangeX", rangeX)
                            console.log("rangeY", rangeY)
                        }, 50);
                    }
                    
                });
            });
        }
        //BTOCSITE-2196 -end


        /* 탭 클릭시 인덱스를 세션스토리지에 기록 */
        var store = window.sessionStorage;
        var session_name = 'care_cecommended_tabindex';
        care_tabs.find('a').on('click', function () {
            var idx = $(this).parent().index();
            store.setItem(session_name, idx);
        });

        /* 리로드시 탭 인덱스 세션이 있을 경우 트리거 */
        if (store.getItem(session_name)) {
            care_tabs.find('a').eq(store.getItem(session_name)).trigger('click');
        }

        /* //케어솔루션 추천 제품 스와이프 및 히스토리 탭토글 기능 추가 : 2021-05-10 */
        $context.find('.care-recommended').find('.ui_product_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            variableWidth : false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,   
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        
                    }
                }
                /* , { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } } */
            ]
        });

        // 케어솔루션 혜택
        // 다른 케어솔루션 
        $(window).on('breakpointchange.caresolution', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    
                $context.find('.ui_carousel_m1_slider').vcCarousel({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });
                
            }else if(breakpoint.name == 'pc'){    
                $context.find('.ui_carousel_m1_slider').vcCarousel('destroy');       
                $context.find('.ui_carousel_m1_slider').find('.indi-wrap').hide();                     
            }    
        });

        $(window).trigger('breakpointchange.caresolution');

        // 케어솔루션 가이드
        $context.find('.care-guide-visual .ui_carousel_slider2').vcCarousel({
            infinite: false,
            centerMode: true,
            //centerPadding: '25%',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : true,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 1, 
                        slidesToScroll: 1
                    }
                }
            ]
        });


        $(document).on('click', '.ui_care_detail_btn', function(e){
            e.preventDefault();
            var $target = $(e.currentTarget);
            var url = $target.data('url');
            if(url) location.href = url;
        });

        /* BTOCSITE-6883 신규 WSG 적용 - 렌탈/케어 */
        // 히어로배너
        $context.find('.ui_wide_slider').vcCarousel({
            autoplay: true
        }).on('carouselafterchange', function(e, slide, prev, next){
            heroBanner();
            // s BTOCSITE-5938-222 : 20211224 pauseOnFocus가 false인데 autoplay 멈춰서 강제로 다시 시작
            if(slide.focussed) {
                slide.play();
            }
            // e BTOCSITE-5938-222
        })

        function heroBanner() {
            var heroList = $('.hero-banner .slide-track > li');
            var heroListAct = heroList.siblings('.ui_carousel_current').index();
            var heroListLens = heroList.length;
            var custom = $('.custom-indi-wrap');
            var slideCurrent = custom.find('.slide-page .current');
            var slideCount = custom.find('.slide-page .count');        

            if( heroListLens > 1) {
                custom.show();
                slideCurrent.text(heroListAct);
                slideCount.text(heroListLens - 2);
            }
        }

        heroBanner();
        /* //BTOCSITE-6883 신규 WSG 적용 - 렌탈/케어 */
    }); 
});
