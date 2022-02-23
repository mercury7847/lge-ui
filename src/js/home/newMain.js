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

    //BTOCSITE-7335
    function setVideoCurrentSrc(type){
        var $scene = $('.scene');
        var $visual = $scene.find('.scene-visual');

        if( type != "" && type != "undefined" && type != undefined) {
            $visual.each(function(idx){
                var $video = $(this).find('video');

                if( $video.attr('src') != $video.data(type + '-src') ) {
                    $video.attr('src', $video.data(type + '-src'))
                }
    
                if( $video.attr('poster') != $video.data(type + '-poster') ) {
                    $video.attr('poster', $video.data(type + '-poster'))
                }
    
                return;
            });
        }
    }
    
    var $context = !!$('[data-hash="home"]').length ? $('[data-hash="home"]') : $(document);

    vcui.require(['ui/scrollNavi','ui/smoothScroll','ui/lazyLoaderSwitch','libs/intersection-observer.min'], function () {
        // 플로우배너
      
        // 메인성능개선 - 제거
        // $('body').vcLazyLoaderSwitch('reload', $context.find('.contents'));
        
        // BTOCSITE-5938-285 메인 검색창 스크롤 밀림 현상 수정
        // $('body').addClass('ignore-overflow-hidden');

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
            
            if(data.name == 'mobile'){
                sliderSet();
                setVideoCurrentSrc('m') //BTOCSITE-7335
            }else if(data.name == 'pc'){
                sliderSet()
                setVideoCurrentSrc('pc') //BTOCSITE-7335
            }           
            

        });   

        function sliderSet() {
            var recomSlider01 = $('.recom-list-slide01');
            var recomSlider02 = $('.recom-list-slide02');
            var recomSlider03 = $('.recom-list-slide03');

            var recomSlider01Num = recomSlider01.find('.slide-item').length;
            var recomSlider02Num = recomSlider02.find('.slide-item').length;
            var recomSlider03Num = recomSlider03.find('.slide-item').length;
            var infoSliderNum = $('.info-area').find('.slide-item').length;

            var recomOpt = {
                arrows: true,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite:false,
                variableWidth:false,
                outerEdgeLimit: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: false,
                            arrows:false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite:false,
                            variableWidth:true,
                            outerEdgeLimit: true
                        }
                    }
                ]
            }
            var memberOpt = {
                arrows: false,
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite:false,
                variableWidth:false,
                outerEdgeLimit: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: false,
                            arrows:false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite:false,
                            variableWidth:true,
                            outerEdgeLimit: true
                        }
                    }
                ]
            }
            var infoOpt = {
                arrows: true,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite:true,
                    vertical: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    pauseOnHover: true,
                    pauseOnFocus: true
            }

            if(recomSlider01.hasClass('slick-slider')){
                recomSlider01.not('.slick-initialized').slick(recomOpt);
            } else {
                if(recomSlider01Num > 1){
                    recomSlider(recomSlider01,recomOpt);
                }
            }
            if(recomSlider02.hasClass('slick-slider')){
                recomSlider02.not('.slick-initialized').slick(recomOpt);
            } else {
                if(recomSlider02Num > 1){
                    recomSlider(recomSlider02,recomOpt);
                }
            }
            if(recomSlider03.hasClass('slick-slider')){
                recomSlider03.not('.slick-initialized').slick(recomOpt);
            } else {
                if(recomSlider03Num > 1){
                    recomSlider(recomSlider03,recomOpt);
                }
            }
            if($('.info-area').hasClass('slick-slider')){
                $('.info-area').not('.slick-initialized').slick(infoOpt);
            } else {
                if(infoSliderNum == 0) {
                    $('.info-section').hide();
                } else if(infoSliderNum == 1) {
                    $('.info-area-wrap').addClass('info-solo');
                } else if(infoSliderNum > 1) {
                    $('.info-area').slick(infoOpt);
                } 
            }
            if($('.membership-type-slide').hasClass('slick-slider')){
                $('.membership-type-slide').not('.slick-initialized').slick(memberOpt);
            } else {
                $('.membership-type-slide').slick(memberOpt);
            }
        }

        function recomSlider(slider,recomOpt) {
            var slider = slider;
            var recomOpt = recomOpt;
            slider.slick(recomOpt);
        }

        // BTOCSITE-2193 e                 

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

        // $('.img.only-' + (isMobileScreen() ? "mobile" : "desktop") + ' > video').each(function() {
        //     // 이미 생성된 비디오 요소 옵저브
        //     this.muted = true
        //     this.parentElement.classList.add('video')
        //     sceneIO.observe(this)
        // })

        $('.img.scene-visual > video').each(function() {
            // 이미 생성된 비디오 요소 옵저브
            this.muted = true
            this.parentElement.classList.add('video')
            sceneIO.observe(this)
        })

        // 재생/멈춤 클릭이벤트 위치 수정
        $('.btn-info-play').on('click', function() {
            if($(this).hasClass('pause')){
                $(this).removeClass('pause');
                $('.info-area').slick('slickPause')
                $('.btn-info-play span').text('재생');
            } else {
                $(this).addClass('pause');
                $('.info-area').slick('slickPlay');
                $('.btn-info-play span').text('멈춤');
            }
        });
        
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
//BTOCSITE-2193 s
$(document).on('click', '.scene a, .section a', function(e){
    var target = this.getAttribute('target');
    if(target == "_blank"){
        if(isApp()) {
            e.preventDefault();
            var appUrl = $(this).attr('href');
            if (!(appUrl.match('https://'))) {
                appUrl = 'https://'+window.LGEAPPHostName+appUrl;
            } 
            if(vcui.detect.isIOS){
                var jsonString = JSON.stringify({'url': appUrl, 'command':'sendOutLink'});
                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
            } else {
                android.openLinkOut(appUrl);
            }
        } 
    }
})
//BTOCSITE-2193 e
