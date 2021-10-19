$(function () {
    $.extend( $.easing,{
        def: 'easeOutQuad',
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    });

    var isMobileScreen = function() {
        return vcui.detect.isMobileDevice || window.innerWidth < 768
    }
    
    var $context = !!$('[data-hash="home"]').length ? $('[data-hash="home"]') : $(document);

    vcui.require(['ui/scrollNavi','ui/smoothScroll','ui/lazyLoaderSwitch','libs/intersection-observer.min'], function () {
        // 플로우배너
        
        $('body').vcLazyLoaderSwitch('reload', $context.find('.contents'));
        
        $('body').addClass('ignore-overflow-hidden');

        $context.find('.ui_carousel_slider_banner1,.ui_carousel_slider_banner2').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $context.find('.ui_carousel_slider_banner1').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){
            
            var $slider = $(this).find('.ui_carousel_slide:not(ui_carousel_cloned)');
            if($slider.length <= carousel.slidesToShow){
                $slider.addClass('on');
                $(this).find('.flow-bar-wrap').hide();
            }else{
                $(this).find('.flow-bar-wrap').show();
            }

            var wd = $(this).find('.flow-bar-wrap').width();
            var dotWd = Math.ceil(wd/carousel.slideCount);
            $(this).find('.flow-bar').css({
                'width':dotWd,
                'left':dotWd*index
            });


        }).vcCarousel({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : false,
            centerMode: true,
            centerPadding: '13.3%',
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerPadding: '13.3%',
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '19%',
                    }
                }
            ]
        });

        $context.find('.ui_carousel_slider_banner2').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){

            var $slider = $(this).find('.ui_carousel_slide:not(ui_carousel_cloned)');
            if($slider.length <= carousel.slidesToShow){
                $slider.addClass('on');  
                $(this).find('.flow-bar-wrap').hide();
            }else{
                $(this).find('.flow-bar-wrap').show();
            }

            var wd = $(this).find('.flow-bar-wrap').width();
            var dotWd = Math.ceil(wd/carousel.slideCount);
            $(this).find('.flow-bar').css({
                'width':dotWd,
                'left':dotWd*index
            });

        }).vcCarousel({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : true,
            centerMode: true,
            centerPadding: '13.3%',
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerMode: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '25%',
                    }
                }
            ]
        });

            
        var isApplication = isApp();
        var $window  = $(window);
        var $contentWrap = $context.find('.section-cover');
        var $scenes = $context.find('.scene').add('.section-cover');
        var maxLens = $scenes.length - 1;

        // 웨일 결합처리
        $context.find('.foot-cont').find('.menu-opener').on('click', function(e){
            $('html,body').scrollTop(maxLens*winHeight);
        });

        $context.find('.scene').css({'overflow':'hidden'});
        
        $context.find('.container').css({'overflow':'visible', 'height':'auto'});     

        $(document).on('click', 'a', function(e){
            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#'){
                e.preventDefault();
            }            
        });

        $window.on('breakpointchange', function(e){

            var data = window.breakpoint;
            var isRecom = $context.find('.recom-list-slide').data('ui_carousel');
            var isBenefit = $context.find('.benefit-list-slide').data('ui_carousel');

            if(data.name == 'mobile'){

                if(!isRecom){
                    $context.find('.recom-list-slide').vcCarousel({                        
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    });
                }

                if(!isBenefit){
                    $context.find('.benefit-list-slide').vcCarousel({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100                            
                    });
                }


            }else if(data.name == 'pc'){

                $context.find('.recom-list-slide').find('.ui_carousel_dots').hide();
                $context.find('.benefit-list-slide').find('.ui_carousel_dots').hide();
                if(isRecom){
                    $context.find('.recom-list-slide').vcCarousel('destroy');
                }
                if(isBenefit){
                    $context.find('.benefit-list-slide').vcCarousel('destroy');
                }
            }

        });               

        var observerOption = {
            root: null,
            rootMargin: '10px',
            threshold: []
        }
        for (var i=0; i<=1.0; i+= 0.01) {
            observerOption.threshold.push(i);
        }
        var sceneIO = new IntersectionObserver(function(entries, observer) {

            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0.7) {
                    entry.target.muted = true
                    !entry.target.ended && entry.target.play()
                } else if(entry.intersectionRatio === 0) {
                    entry.target.currentTime = 0
                } else {
                    entry.target.pause()
                }
            })

        }, observerOption)

        $('.img.only-' + (isMobileScreen() ? "mobile" : "desktop") + ' > video').each(function() {
            // 이미 생성된 비디오 요소 옵저브
            this.muted = true
            this.parentElement.classList.add('video')
            sceneIO.observe(this)
        })
        
        if(isApplication){
            $('header').find('.header-bottom').addClass('app-btm');
        } 

        $(document).on('click', 'a', function(e){
            var scrollTop = $contentWrap.scrollTop();
            if(window.sessionStorage) window.sessionStorage.setItem('lgeMainScrollTop', scrollTop);
        });

        $window.trigger('breakpointchange');
    });

});