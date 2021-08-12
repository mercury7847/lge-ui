$(function () {
    $.extend( $.easing,{
        def: 'easeOutQuad',
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    });

    var isOnlyMobileDevice = vcui.detect.isMobileDevice && window.innerWidth < 768

    var sceneTmpl =  '<div class="scene">\n'+
        '   <div class="img">\n'+
        '       <img src={{imagePath}} alt={{imageAlt}}>\n'+
        '   </div>\n'+
        '   <section class="lay-conts ui-alert-msg">\n'+
        '   </section>\n'+
        '   <div class="btn-wrap laypop">\n'+
        '       <button type="button" class="btn ui_modal_close" data-role="ok"><span>{{okBtnName}}</span></button>\n'+
        '   </div>\n'+
        '</article>';



    var sceneTmpl = '<div class="scene">\n'+
        '   <div class="img">\n'+
        '       {{#if isImage}} <img src="{{imagePath}}" alt="{{imageAlt}}">\n'+
        '       {{#else}}<div class="video" data-src="{{videoPath}}" data-ext="{{videoExt}}" data-alt="{{videoAlt}}"></div>{{/if}}\n'+
        '   </div>\n'+
        '   <div class="text-cont">\n'+
        '       <p>{{#raw descTxt}}</p>\n'+
        '   </div>\n'+
        '   {{#if isBanner}} {{#raw bannerHtml}} {{#else}}\n'+ 
        '       <div class="text-link">\n'+
        '           <a href="{{linkPath}}">{{linkTxt}}</a>\n'+
        '       </div>\n'+
        '   {{/if}}\n'+
        '   <div class="counter">\n'+
        '       <span class="num"><span class="blind">현재위치</span>{{nowNum}}</span>/<span class="num"><span class="blind">전체갯수</span>{{totalNum}}</span>\n'+
        '   </div>\n'+
        '   <div class="next-arr">\n'+
        '       <a href="#" class="arr"><span class="blind">다음 테마관 이동</span></a>\n'+
        '   </div>\n'+
        '</div>';

    var bannerTmpl = '<div class="flow-banner">\n'+
        '   <div class="slide-wrap ui_carousel_slider_banner1">\n'+
        '       <div class="flow-bar-wrap">\n'+
        '           <div class="flow-bar" style="width:10%;"></div>\n'+
        '       </div>\n'+
        '       <div class="slide-content ui_carousel_list">\n'+
        '           <ul class="slide-track ui_carousel_track">\n'+
        '               {{#each item in list}}\n'+
        '                   <li class="slide-conts ui_carousel_slide">\n'+
        '                       <div class="thumb">\n'+
        '                           <img src="{{item.imagePath}}" alt="{{item.imageAlt}}">\n'+
        '                       </div>\n'+
        '                       <a href="{{item.linkPath}}" class="text-area">\n'+ 
        '                           <span class="inner"><span class="tit">{{item.linkTxt}}</span></span>\n'+
        '                       </a>\n'+
        '                   </li>\n'+                        
        '               {{/each}}\n'+                        
        '           </ul>\n'+
        '       </div>\n'+
        '       <div class="slide-controls">\n'+
        '           <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>\n'+
        '           <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>\n'+
        '       </div>\n'+
        '   </div>\n'+
        '</div>';
    
    var $context = !!$('[data-hash="home"]').length ? $('[data-hash="home"]') : $(document);

    vcui.require(['ui/scrollNavi','ui/smoothScroll','ui/lazyLoaderSwitch'], function () {
        // 플로우배너
        
        $('body').vcLazyLoaderSwitch('reload', $context.find('.contents'));

        // 화면 100% 채우기
        /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        // if (!isOnlyMobileDevice){
        //     $('html,body').css({'overflow':'hidden', 'height':'100%'});
        // }
        /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        
        $('body').addClass('ignore-overflow-hidden');

        $context.find('.ui_carousel_slider_banner1').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $context.find('.ui_carousel_slider_banner2').find('.flow-bar').css({
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
            //autoplay: true,
            //autoplaySpeed: 2000,
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
        var aniSpeed = vcui.detect.isMobile? 500 : 800;
        var wheelAniInterval = null;
        var wheelInterval = null;            
        var canScroll = true;
        var winHeight = $window.height();            
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $context.find('.scene').add('.section-cover');
        var maxLens = $scenes.length - 1;
        var posArr = [];
        var isMobileDevice = vcui.detect.isMobileDevice;

        var visualAnimInterval;

        if (isOnlyMobileDevice){
            //$scenes.eq(0).css('height', 'calc(100vh - 84px)');
        } else {
            //$scenes.eq(0).css('height', 'calc(100vh - 110px)'); //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23
        }
        

        // 웨일 결합처리
        $context.find('.foot-cont').find('.menu-opener').on('click', function(e){
            $('html,body').scrollTop(maxLens*winHeight);
        });

        $context.find('.scene').css({'overflow':'hidden'});
        
        $context.find('.container').css({'overflow':'visible', 'height':'auto'});     
        
        /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        // if ( !isOnlyMobileDevice ){            
        //     $context.find('.next-arr').on('click', 'a', function(e){
        //         e.preventDefault();
        //         wheelScene(1);
        //     });
        // } else {
        //     // BTOCSITE-740 
        //     /*
        //     $('.scene').addClass('active');
        //     setTimeout(function(){
        //         $('.scene').eq(0).addClass('on');
        //     },500);
        //     */
        // }
        /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

        

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
                    $context.find('.benefit-list-slide').on("carouselbeforechange", function(e, carousel, cIdx){
                        clearInterval(animCtrlers[3]);
                        animCtrlers[3] = null;
                    }).on("carouselafterchange", function(e, carousel, index){
                        var icons = carousel.$slides.eq(index).find('.ui_ico_anim');
                        icons.data("isReady", true);
                        setIconAnimCtrler(icons);
                    }).vcCarousel({                        
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


        var $html = (vcui.detect.isSafari || vcui.detect.isMobileDevice) ? $('body') : $('html, body');
        
        var maxScale = 110;
        /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        // if (!isOnlyMobileDevice){
        //     $scenes.find('.img img').css({
        //         width: maxScale + '%'
        //     });
        // }
        /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        
        

        function stopVisualAnim(){
            clearInterval(visualAnimInterval);
        }

        function playVisualAnim(){
            //if(currentPage > 0 && currentPage < 5){
                clearInterval(visualAnimInterval);

                var newwidth = maxScale;
                var currentImage = $scenes.eq(currentPage).find('.img img');
                visualAnimInterval = setInterval(function(){
                    newwidth -= 0.5;
                    if(newwidth < 100) newwidth = 100;
                    currentImage.css({
                        width: newwidth + "%"
                    });

                    if(newwidth == 100) clearInterval(visualAnimInterval);
                }, 18);
            //}
        }

        function wheelScene(delta) {

            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            if(!isOnlyMobileDevice){                
                return;
            } else {
                if(!canScroll) return; 
                return;
            }     
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */      
            
            var nextIndex = (delta < 0) ? -1 : 1;
            nextIndex = nextIndex + currentPage;
            nextIndex = Math.max(Math.min(nextIndex, maxLens), 0);
            if(currentPage == nextIndex) return;
            moveScene(nextIndex);
        }

        function moveScene(idx, speed){

            stopVisualAnim();

            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // if(!isOnlyMobileDevice){                
            //     if(!canScroll) return;  
            //     canScroll = false;   
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

            if ( $('html').attr('canscroll') == 'false' ){
                return;
            }
            
            $contentWrap.scrollTop(0);                
            $('html').addClass('sceneMoving');
            
            if ( speed == undefined ) speed = aniSpeed;
            var scrollTopData = winHeight * idx;

            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // if (!isOnlyMobileDevice){
            //     $scenes.removeClass('active').eq(idx).addClass('active');
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            
            
            if(wheelAniInterval) clearTimeout(wheelAniInterval);
            wheelAniInterval = setTimeout(function() {
                /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                // if(!isOnlyMobileDevice){
                //     if(! $('html').hasClass('sceneMoving')){
                //         return false;
                //     }
                // }
                /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

                var speedTime = currentPage<idx? parseInt(speed) : parseInt(speed)-200;
                speedTime = Math.max(0,speedTime);

                $html.stop(true).animate({
                    scrollTop: scrollTopData
                }, speedTime, 'easeInOutQuart',  function() { 
                    canScroll = true;

                    var hasTop = $('.floating-menu.top').hasClass('call-yet');
                    if(idx==0){
                        if(hasTop){
                            //$('.floating-menu.top').css('opacity', 0);
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').hide();
                            if(!(isApplication && location.pathname == "/")) {
                                $(window).trigger('floatingTopHide');
                                $('.floating-menu.top').addClass('call-yet');
                            }
                        } else {
                            /*
                            // 원본 소스
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').addClass('call-yet');
                            */

                            //임시 추가
                            //앱인데 메인이 아닐경우에만 실행
                            //$('.floating-menu.top').css('opacity', 1);
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').hide();
                            if(!(isApplication && location.pathname == "/")) {
                                $(window).trigger('floatingTopHide');
                                $('.floating-menu.top').addClass('call-yet');
                            }
                            //임시 추가 끝
                        }
                    }else{
                        if(hasTop){
                            //$('.floating-menu.top').css('opacity', 1); //임시추가 1줄
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                            $('.floating-menu.top').removeClass('call-yet');
                            $(window).trigger('floatingTopShow');
                            $('.floating-menu.top').show();

                        } else {
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                            $('.floating-menu.top').removeClass('call-yet');
                            $(window).trigger('floatingTopShow');
                            $('.floating-menu.top').show();
                        }                       
                    }
                    
                    $scenes.eq(currentPage).find('.img img').css({
                        width: maxScale + '%'
                    });
                    
                    currentPage = idx;   
                    /*
                    if(currentPage == 5) startIconAnim();
                    else stopIconAnim();
                    */
                    
                    $('html').removeClass('sceneMoving');
                    $scenes.removeClass('on').eq(idx).addClass('on');

                    /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                    // if (!isOnlyMobileDevice){
                    //     $scenes.each(function() {
                    //         if ( $(this).find('video').length != 0 ) {
                    //             if ( $(this).hasClass('on') ) {
                    //                 $(this).find('video')[0].play();
                    //             }else {
                    //                 $(this).find('video')[0].pause();
                    //                 $(this).find('video')[0].currentTime = 0;							
                    //             }
                    //         }
                    //     });
                    // }
                    /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

                    playVisualAnim();

                    if(vcui.detect.isIOS) {
                        if($contentWrap.hasClass('active')) {
                            $contentWrap.css({'overflow':'auto'});
                        } else {
                            $contentWrap.css({'overflow':''});
                        }
                    }
                });
            }, 100);

            if(idx > 1 && $context.find('.video-poster').length) $context.find('.video-poster').remove();
        } 

        var prevTime = new Date().getTime();

        // 휠 이벤트 처리

        if(!isOnlyMobileDevice){

            /* 메인테스트*/
            document.addEventListener('wheel', function(e){
                var open = $('#layerSearch').hasClass('open');           
                if(!open){    
                    var curTime = new Date().getTime();
                    if(typeof prevTime !== 'undefined'){
                        var timeDiff = curTime-prevTime;
                        if(timeDiff > 35){
                            if(currentPage == maxLens){
                                var st = $contentWrap.scrollTop();
                                if(st<=0 && e.deltaY<0){
                                    wheelScene(-1);
                                }
                            }else{
                                if(e.deltaY>0 || e.deltaY<0){
                                    wheelScene(e.deltaY);
                                }
                            }
                        }                    
                    }            
                    prevTime = curTime; 
                }       
            });
        }
        
        
        // 앱 하단 메뉴 컨트롤
        //lgkorUI.showAppBottomMenuOver(true);
        //lgkorUI.setEnableAppScrollBottomMenu(false);


        /* 메인테스트*/
        // BTOCSITE-27
        
        $('.container').on('touchstart touchend touchcancel', function(e) {
      
                var data = _getEventPoint(e);
                if (e.type == 'touchstart') {
                    touchSy = data.y;
                } else {
    
                    // if (touchSy - data.y > 80) {
                    //     // console.log('down');
                    //     lgkorUI.showAppBottomMenu(false);
    
                    // } else if (touchSy - data.y < -80) {
                    //     // console.log('up');
                    //     lgkorUI.showAppBottomMenu(true);
                    // }
                    
                    if(currentPage == maxLens){
                        if(wheelInterval) clearTimeout(wheelInterval);
                        wheelInterval = setTimeout(function(){
                            var st = $contentWrap.scrollTop();
                            if(st<=0 && touchSy - data.y < -80){
                                wheelScene(-1);
                            }
                        }, 100);
    
                    }else{
    
                        if (touchSy - data.y > 80) {
                            wheelScene(1);
                        } else if (touchSy - data.y < -80) {
                            wheelScene(-1);
                        }
                    } 
                }
        });
        
        /*
        var wrapTouchSy = 0;
        
        $contentWrap.on('touchstart touchend touchcancel', function(e) {
            
            var data = _getEventPoint(e);
            if (e.type == 'touchstart') {
                wrapTouchSy = data.y;
            } else {

                if (wrapTouchSy - data.y > 80) {
                    // console.log('down');
                    lgkorUI.showAppBottomMenu(false);

                } else if (wrapTouchSy - data.y < -80) {
                    // console.log('up');
                    lgkorUI.showAppBottomMenu(true);
                }

            }
        });
        */

        function _getEventPoint(ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end'|| ev.type === 'touchend') e = e.changedTouches && e.changedTouches[0] || e;
            else e = e.touches && e.touches[0] || e;

            return {
                x : e.pageX || e.clientX,
                y : e.pageY || e.clientY
            };
        }
        
        function _setCenterImage (target, boxW, boxH, targetW, targetH) {

            var rate, newW, newH;
            rate = ( targetW > targetH )? boxH/targetH : boxW/targetW;
            rate = ( boxH > Math.round(targetH*rate) )? boxH/targetH : ( boxW > targetW*rate )? boxW/targetW : rate;

            newW = Math.max(boxW, Math.round(targetW*rate));
            newH = Math.max(boxH, Math.round(targetH*rate));

            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // $(target).css({
            //     width: newW,
            //     height: newH,
            //     marginLeft: (boxW-newW)/2,
            //     marginTop: (boxH-newH)/2
            // });
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        }

        function _findIdx(py){
            for(var i=0; i<posArr.length; i++){
                if(posArr[i]>py){
                    return i;
                }
            }
            return 0;                
        }

        // 비디오 태그 처리
        function updateVideo(video, index) {
            // BTOSCITE-740 모바일 화면 동영상 사용중지
            //if(isMobileDevice) return;

            var isAndroid = vcui.detect.isAndroid;

            var $target   = $(video||this),
                $wrap     = $target.closest('.img'),
                // $image    = $wrap.find('img'),
                // loaded    = $target.data('loaded'),           
                //videoAttr = $target.data('options') || 'autoplay playsinline muted',
                videoAttr = $target.data('options') || 'playsinline muted',
                $sources  = $target.find('source'),
                oVideo;

            var src = $target.data('src');
            var posterSrc = $target.data('posterSrc');

            // window.innerWidth < 768
            // vcui.detect.isMobileDevice && window.innerWidth < 768
            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            if(window.innerWidth < 768 || isMobileDevice){
                posterSrc = $target.data('posterMSrc') || $target.data('posterSrc');
                src = $target.data('mSrc') || $target.data('src');
                //console.log("mobile")
            } 
            // else {
            //     posterSrc = $target.data('posterSrc') || $target.data('posterSrc');
            //     src = $target.data('src') || $target.data('src');
            //     //console.log("pc")
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

            if(posterSrc){
                if(index>0) {
                    videoAttr += " poster='"+posterSrc+"' preload='metadata'";
                }else {
                    videoAttr += " preload='auto'";
                }
            }

            // 비디오 요소 생성.
            var createVideoObject = function() {
                var extArr = $target.data('ext').toLowerCase().replace(/\s/g, '').split(',');
                // var regExp = "\.(mp4|webm|ogv)";
                // console.log(src, src.match(regExp));

                if ( !extArr.length ) return false;

                var $video = $('<video '+ videoAttr +'></video>');

                for (var i = extArr.length - 1; i >= 0; i--) {
                    if (extArr[i] == 'mp4') {
                        $('<source>', {src: src+'.mp4', type: 'video/mp4', prependTo: $video});
                    } else if (extArr[i] == 'webm') {
                        $('<source>', {src: src+'.webm', type: 'video/webm', appendTo: $video});
                    } else if (extArr[i] == 'ogv' || extArr[i] == 'ogg') {
                        $('<source>', {src: src+'.ogv', type: 'video/ogg', appendTo: $video});
                    }
                }
                    
                if ( $target.data('alt') != null ) {
                    $('<p>').text($target.data('alt')).appendTo($video);
                }
                $video.data($target.data());
                $target.replaceWith($video);
                $video   = $wrap.find('video');
                $sources = $video.find('source');

                $video.css({
                    'position':'absolute',
                    'width': 'auto !important',
                    'height': 'auto !important',
                    'min-width': '100%',
                    'min-height': '100%',
                    'top': '50%',
                    'left': '50%',
                    'transform': 'translate(-50%,-50%)',
                    '-webkit-transform': 'translateX(-50%) translateY(-50%)',
                    // 2021-07-23 수정 width: 100%로 수정
                    'width': '100%'
                })
                oVideo   = $video[0];
                /*
                if ( isAndroid ) {
                    $(document).one('touchstart.videoPlay', function() {
                        oVideo.play();
                    });
                }
                */
                $wrap.addClass('video');

                $video.on('loadeddata', function(e) {
                    $video.data('loaded', true);
                    //$(this).addClass('is-loaded111');
                    $wrap.trigger('videoLoaded');
                    //$wrap.trigger('imgLoaded');
                    //oVideo.play();
                }).trigger('load');
                
            }

            createVideoObject();
            
        }

        // 렌더링
        var render = function(idx){

            if(wheelAniInterval) clearTimeout(wheelAniInterval);
            if(wheelInterval) setTimeout(wheelInterval);
            wheelAniInterval = null;
            wheelInterval = null;

            $('html, body').stop(true);
            $('html').removeClass('sceneMoving');   

            //canScroll = true;    
            winWidth = $window.width();
            winHeight = $window.height();
            posArr = [];
                        
            //var $prevTarget = $('.container').prevAll(':not(#layerSearch):visible:first');            
            //var prevAllHeight = $prevTarget.offset().top + $prevTarget.height();
            var totalHeight = winHeight;
            var itemHeight = winHeight;
            var allHeight = 0;
            
            $scenes.each(function(i) {
                if(i==0){
                    //itemHeight = winHeight-prevAllHeight;
                    itemHeight = winHeight - $('#content').offset().top;
                }else{
                    itemHeight = winHeight;    
                }
                // BTOCSITE-740 스크롤 배너 사이즈 변경
                if (isOnlyMobileDevice){
                    itemHeight = 500;
                }
                

                allHeight += itemHeight;
                posArr.push(allHeight);
                /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                // if (!isOnlyMobileDevice){
                //     $(this).height(itemHeight);
                // }
                
                // var imageSize = {
                //     //<img data-natural-width = '1980' data-natural-height = '1080'>
                //     width : $(this).find('img').data('naturalWidth')? $(this).find('img').data('naturalWidth') : 720,//1920, 
                //     height : $(this).find('img').data('naturalHeight')? $(this).find('img').data('naturalHeight') : 1285,//1285 1476 1080
                // };
                /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

                var imageSize = {
                    //<img data-natural-width = '1980' data-natural-height = '1080'>
                    width : window.breakpoint.name=='pc'? 1920 : 720, 
                    //height : window.breakpoint.name=='pc'? 1080 : 1285 //1285 1476 1080
                    height : window.breakpoint.name=='pc'? 1080 : 920
                };

                $('body').vcLazyLoaderSwitch('reload', $context.find('.contents'));

                if(!$(this).hasClass('section-cover')) {
                    _setCenterImage($(this).find('.img'), winWidth, itemHeight, imageSize.width, imageSize.height);
                    $(this).find('.img.only-' + (vcui.detect.isMobileDevice ? "mobile" : "desktop") + ' > .video').each(function () {
                        updateVideo(this, i);
                    });
                }
                totalHeight += itemHeight;
            });

            setActivePlayByScroll();

            /* 메인 테스트 */    
            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */        
            // if(vcui.detect.isIOS) {
            //     if($contentWrap.hasClass('active')) {
            //         $contentWrap.css({'overflow':'auto','height':winHeight});
            //     } else {
            //         $contentWrap.css({'overflow':'','height':winHeight});
            //     }
            // } else {
            //     if (!isOnlyMobileDevice){
            //         $contentWrap.css({'overflow':'auto','height':winHeight});
            //     }
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */

            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // if (!isOnlyMobileDevice){
            //     $('.contents').css({'overflow':'hidden', 'height':totalHeight});
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            
            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // if(idx!==undefined){
            //     if ( !isOnlyMobileDevice ){
            //         currentPage = idx;
            //         moveScene(currentPage,0);
            //     } else {
            //         //$('.scene').eq(0).addClass('on');
            //     }
            // }else{
            //     if ( !isOnlyMobileDevice ){
            //         setTimeout(function(){
            //             currentPage = currentPage>0? currentPage : _findIdx($('html, body').scrollTop());
            //             moveScene(currentPage,0);
    
            //             if(window.sessionStorage){ 
            //                 var lgeMainScrollTop = window.sessionStorage.getItem('lgeMainScrollTop');
            //                 if(lgeMainScrollTop){
            //                     $contentWrap.scrollTop(lgeMainScrollTop);                            
            //                 }
            //                 window.sessionStorage.removeItem('lgeMainScrollTop');
            //             }
    
            //         }, 100);
            //     }
            // }
            /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            
        }

        $window.on('floatingTop', function(){
            //render(0);
            currentPage = 0;
            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
            // if (!isOnlyMobileDevice){
            //     moveScene(currentPage,0);
            // }
            /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
        });
        
        if(isApplication){

            render();
            $('header').find('.header-bottom').addClass('app-btm');

        } else{
            // 앱 대응시 주석처리
            $window.on('resizeend', function(e){
                render();
            });
            $window.trigger('resizeend');
            // 앱 대응시 주석처리 end

            //render();

        }

        $(document).on('click', 'a', function(e){
            var scrollTop = $contentWrap.scrollTop();
            if(window.sessionStorage) window.sessionStorage.setItem('lgeMainScrollTop', scrollTop);
        });

        //임시 추가
        //앱인데 메인일경우 처음 시작하면 맨위 첫번째 컨텐츠 일테니 뭐든 올려본다
        if(isApplication && location.pathname == "/") {
            //$(window).trigger('floatingTopShow');
            
            //??$('.floating-menu.top').css('opacity', 0);
            //??$('.floating-menu.top').removeClass('call-yet');

            //만약 시작부터 내려야 할 일이 있으면 알아서 조작
            //$('.floating-menu.btn-app-ar').css('margin-bottom', '-50px');
        }
        //임시 추가 끝

        $window.trigger('breakpointchange');
        window.resizeScene = render;
    });

    //메인 아이콘 애니매이션...
    var animCtrlers = [];
    var startIconAnim = function(){
        $context.find('.ui_ico_anim').each(function(idx, item){
            setIconAnimCtrler($(item));
        });
    }

    var stopIconAnim = function(){
        for(var idx in animCtrlers){
            if(animCtrlers[idx] != null){
                clearInterval(animCtrlers[idx]);
                animCtrlers[idx] = null;
            }
        }
    }

    var setIconAnimCtrler = function(icons){
        if(icons.data('isReady')){
            var ctrlerIdx = icons.data('ctrlerIdx');
            if(animCtrlers[ctrlerIdx] == null){
                animCtrlers[ctrlerIdx] = setInterval(function(){
                    var animIdx;
                    var currentIdx = icons.data('animIdx');
                    var total = icons.data('length');
                    if(currentIdx == total-1) animIdx = 0;
                    else animIdx = currentIdx+1;
        
                    icons.find('img').eq(currentIdx).hide();
                    icons.find('img').eq(animIdx).show();
                    icons.data('animIdx', animIdx);
                }, 30);
            }
        }
    }

    var loadAnimSourceComplete = function(img){
        var icons = $(img).parent();
        var idx = icons.data("loadIdx") + 1;
        icons.data("loadIdx", idx);

        if(icons.data("loadIdx") == icons.data("loadTotal")) icons.data('isReady', true);
    }
    window.loadAnimSourceComplete = loadAnimSourceComplete;

    var placeholderImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI0MzJweCIgaGVpZ2h0PSI0MzJweCIgdmlld0JveD0iMCAwIDQzMiA0MzIiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQzMiA0MzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cmVjdCB5PSIxIiBmaWxsPSIjRjRGNEY0IiB3aWR0aD0iNDMyIiBoZWlnaHQ9IjQzMiIvPgo8Zz4KCTxwYXRoIGZpbGw9IiNBQUFBQUEiIGQ9Ik0xMjIuMzgyLDIwMC45OWg2LjU4NXYyNy40MDhoMTMuMzQ4djUuNTE4aC0xOS45MzRWMjAwLjk5eiIvPgoJPHBhdGggZmlsbD0iI0FBQUFBQSIgZD0iTTE0NC4xODgsMjE3LjU4N2MwLTEwLjg1Nyw3LjAzLTE3LjIyLDE1Ljc5NS0xNy4yMmM0Ljc2MSwwLDguMDU0LDIuMDQ3LDEwLjE4OSw0LjIyN2wtMy41MTUsNC4xODIKCQljLTEuNjAyLTEuNTU3LTMuNDcxLTIuNzU4LTYuNDUyLTIuNzU4Yy01LjQ3MywwLTkuMjk5LDQuMjcxLTkuMjk5LDExLjM0NmMwLDcuMTYzLDMuMjkyLDExLjQ3OSw5Ljc0NCwxMS40NzkKCQljMS42MDIsMCwzLjIwNC0wLjQ0NSw0LjEzOC0xLjI0NnYtNi40OTZoLTUuODI5di01LjM4NGgxMS43MDJ2MTQuODYxYy0yLjIyNSwyLjE4LTYuMDk2LDMuOTYtMTAuNjc5LDMuOTYKCQlDMTUwLjk5NSwyMzQuNTM5LDE0NC4xODgsMjI4LjU3NiwxNDQuMTg4LDIxNy41ODd6Ii8+Cgk8cGF0aCBmaWxsPSIjQUFBQUFBIiBkPSJNMTc3LjIwNiwyMDAuOTloMjAuMjAxdjUuNDczaC0xMy42MTV2Ny42MDhoMTEuNTY4djUuNTE4aC0xMS41Njh2OC44MWgxNC4xMDR2NS41MThoLTIwLjY5VjIwMC45OXoiLz4KCTxwYXRoIGZpbGw9IiNBQUFBQUEiIGQ9Ik0yMDMuMTQ5LDIzMC4yNjhjMC0yLjQwMiwxLjczNS00LjI3MSw0LjA0OS00LjI3MWMyLjM1OCwwLDQuMDk0LDEuODY5LDQuMDk0LDQuMjcxCgkJcy0xLjczNSw0LjI3MS00LjA5NCw0LjI3MUMyMDQuODg0LDIzNC41MzksMjAzLjE0OSwyMzIuNjcsMjAzLjE0OSwyMzAuMjY4eiIvPgoJPHBhdGggZmlsbD0iI0FBQUFBQSIgZD0iTTIxNi4zMjEsMjE3LjU4N2MwLTEwLjg1Nyw2Ljk4NS0xNy4yMiwxNS4zMDYtMTcuMjJjNC4xODMsMCw3LjUyLDIuMDAyLDkuNjU1LDQuMjI3bC0zLjQ3LDQuMTgyCgkJYy0xLjY0Ni0xLjYwMi0zLjU2LTIuNzU4LTYuMDUyLTIuNzU4Yy00Ljk4MywwLTguNzIxLDQuMjcxLTguNzIxLDExLjM0NmMwLDcuMTYzLDMuMzgyLDExLjQ3OSw4LjU4NywxMS40NzkKCQljMi44MDQsMCw1LjAyOC0xLjMzNSw2LjgwOC0zLjI0OGwzLjQ3MSw0LjA5NGMtMi43MTQsMy4xNTgtNi4yMjksNC44NS0xMC41LDQuODVDMjIzLjA4NCwyMzQuNTM5LDIxNi4zMjEsMjI4LjU3NiwyMTYuMzIxLDIxNy41ODcKCQl6Ii8+Cgk8cGF0aCBmaWxsPSIjQUFBQUFBIiBkPSJNMjQzLjI4OCwyMTcuMzE5YzAtMTAuNzIzLDYuMDA3LTE2Ljk1MiwxNC43MjktMTYuOTUyYzguNzIxLDAsMTQuNzI4LDYuMjczLDE0LjcyOCwxNi45NTIKCQlzLTYuMDA3LDE3LjIyLTE0LjcyOCwxNy4yMkMyNDkuMjk1LDIzNC41MzksMjQzLjI4OCwyMjcuOTk4LDI0My4yODgsMjE3LjMxOXogTTI2Ni4wMjUsMjE3LjMxOWMwLTcuMDc0LTMuMTE1LTExLjMwMS04LjAwOS0xMS4zMDEKCQljLTQuODk1LDAtOC4wMSw0LjIyNy04LjAxLDExLjMwMWMwLDcuMDMsMy4xMTUsMTEuNTI0LDguMDEsMTEuNTI0QzI2Mi45MSwyMjguODQ0LDI2Ni4wMjUsMjI0LjM1LDI2Ni4wMjUsMjE3LjMxOXoiLz4KCTxwYXRoIGZpbGw9IiNBQUFBQUEiIGQ9Ik0yNzguNjY1LDIwMC45OWg3LjI5N2w1LjYwNiwxNS4zOTVjMC43MTIsMi4wNDYsMS4zMzUsNC4yMjcsMi4wMDMsNi4zNjNoMC4yMjIKCQljMC43MTItMi4xMzYsMS4yOTEtNC4zMTYsMi4wMDMtNi4zNjNsNS40NzMtMTUuMzk1aDcuMjk3djMyLjkyNmgtNi4wMDd2LTEzLjc0OWMwLTMuMTE0LDAuNDg5LTcuNjk3LDAuODAxLTEwLjgxMmgtMC4xNzgKCQlsLTIuNjcsNy43NDJsLTUuMDcyLDEzLjgzOGgtMy43ODJsLTUuMTE2LTEzLjgzOGwtMi42MjUtNy43NDJoLTAuMTc5YzAuMzEyLDMuMTE1LDAuODQ2LDcuNjk4LDAuODQ2LDEwLjgxMnYxMy43NDloLTUuOTE4VjIwMC45OXoKCQkiLz4KPC9nPgo8L3N2Zz4K"

    document.addEventListener('readystatechange',function(){
        if(document.readyState === 'complete') {
            $context.find('[data-icon-anim-src]').each(function(index, el){
                el.load = loadAnimSourceComplete(el)
                el.src = el.dataset['iconAnimSrc']
            })
        }
    })

    $context.find('.ui_ico_anim').each(function(idx, item){
        var leng = $(item).data('length');
        var patharr = $(item).find('img').attr('src').split("/");
        var pleng = patharr.length;
        var path = "";
        for(var j=0;j<pleng-1;j++){
            path += patharr[j] + "/"
        }
        var fn = patharr[pleng-1].substr(0, 1);

        animCtrlers[idx] = null;
        $(item).data("ctrlerIdx", idx);
        $(item).data("animIdx", 0);
        $(item).data("loadIdx", 1);
        $(item).data("isReady", false);
        
        var i, num;
        var total = 0;
        if(idx < 2){
            for(i=1;i<leng;i+=2){
                if(i < leng){
                    total++;

                    if(i < 10) var num = "00" + i;
                    else if(i>9 && i < 100) num = "0" + i;
                    else num = i;
                    $(item).append('<img src="'+placeholderImage+'" data-icon-anim-src="' + path + fn + num + '.png" alt="">');
                }
            }
        } else{
            for(i=1;i<leng;i++){
                total++;
                
                num = i < 10 ? "0" + i : i;
                $(item).append('<img src="'+placeholderImage+'" data-icon-anim-src="' + path + fn + num + '.png" alt="">');
            }
        }
        $(item).data("loadTotal", total);
        $(item).data('length', total+1);
    });
    $context.find('.ui_ico_anim img').css({position:'absolute', display:'none'});
    $context.find('.ui_ico_anim img:nth-child(1)').css({display:'block'});

    /* 20210503 : 모바일앱 다운로드 팝업 */
    if (vcui.detect.isMobileDevice && !isApp()) {
        var layer_id = '#mobile-close-popup';
        var el = $(layer_id);
        if (el.size() === 0) { return false; }
        var cookie_name = '__LGAPP_DLOG__';

        if (vcui.Cookie.get(cookie_name) === '') {
            vcui.modal(layer_id, open);
            var checkbox = $('#check-today');
            var download_btn = $('#lg__app-download');
            download_btn.on('click', function () {
                goAppUrl();
                
                return;
            });
            el.find('.ui_modal_close').one('click', function () {
                vcui.Cookie.set(cookie_name, 'hide', {"expires": 1, "path": '/'});
                return;
            });
        }
    }
    /* //20210503 : 모바일앱 다운로드 팝업 */

    function setActivePlayByScroll(){
        // BTOCSITE-740
        //if (!vcui.detect.isMobileDevice) return; //2021-07-23

        var sceneActiveQue = [];
        var scenes = $context.find('.scene');

        scenes.each(function(){
            var self = $(this);
            var video = self.find('video');
            //var rwrerer = video.parent('.only-mobile');
            var image = self.find('.img img');

            self.on('active.scroll', function(e, scrollTop){
                // var gnbHeight = 84;
                var gnbHeight = 110;
                var top = self.offset().top;
                //var sceneHeight = self.height();
                var sceneHeight = 500;
                var winHeight = $(window).height();               
                //if ( top >= scrollTop && (scrollTop + winHeight) >= (top + sceneHeight) ){  // 영역이 완전히 보일떄 
                if ( top >= (scrollTop + gnbHeight) - (sceneHeight /2) && (scrollTop + winHeight) - (sceneHeight /2) >= top ){  // 영역이 절반이상 보여질때 
                    self.addClass('on');
                    if (!!image.length){
                        /*
                        image.animate({
                            'width' : '100%'
                        });
                        */
                    }
                    /*
                    if (!!video.length){
                        video.get(0).play();
                    }
                    */

                    var viewHeight = 500; // 보여지는 영역 높이값
                    
                    // 배너가 화면보다 위에 있을떄
                    if (top < scrollTop){
                        viewHeight = (top + 500) - scrollTop;
                    }
                    // 배너가 화면보다 아래에 있을때
                    if (top + 500 > scrollTop + winHeight){
                        viewHeight = (scrollTop + winHeight) - top;
                    }

                    sceneActiveQue.push({
                        'el' : self,
                        'viewHeight' : viewHeight
                    });
                } else {
                    self.removeClass('on');
                    if (!!image.length){
                        /*
                        image.animate({
                            'width' : '110%'
                        });
                        */
                    }
                    
                    /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                    if (!!video.length && !video.get(0).paused){
                    // if (!!video.length && video.hasClass('is-loaded111') && !video.get(0).paused){
                        //console.log('reset video')
                        video.get(0).pause();
                        video.get(0).currentTime = 0;
                    }
                    /* //BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                }        
            });     
        });

        var scrollInterval = null;

        $(window).on('scroll.videoPlay', function(){
            //clearTimeout(scrollInterval);
            
            //scrollInterval = setTimeout(function(){                
                var scrollTop = $(window).scrollTop();
                
                //console.log('scrollTop', scrollTop);
                
                sceneActiveQue = [];

                scenes.each(function(){
                    $(this).trigger('active', scrollTop);
                });
                
                var hiActiveView = null;    // 가장 많이 보이고있는 배너
                sceneActiveQue.forEach(function( scene ){
                    //console.log('activeScene viewHeight', scene.viewHeight);
                    //console.log('activeScene el', scene.el);
                    scene.hiActiveView = false;

                    if (hiActiveView == null){
                        hiActiveView = scene;
                        scene.hiActiveView = true;
                    } else {
                        if (hiActiveView.viewHeight < scene.viewHeight ){
                            hiActiveView = scene;
                            scene.hiActiveView = true;
                            if (sceneActiveQue.length > 0){
                                sceneActiveQue[0].hiActiveView = false;
                            }
                        }

                        if (hiActiveView.viewHeight == scene.viewHeight ){
                            hiActiveView = scene;
                            scene.hiActiveView = true;
                            if (sceneActiveQue.length > 0){
                                sceneActiveQue[0].hiActiveView = false;
                            }
                        }
                    }
                });

                //console.log('########### sceneActiveQue ###########', sceneActiveQue);

                sceneActiveQue.forEach(function( scene, idx ){
                    var video = $(scene.el).find('video');
                    var sewewe = $(scene.el).find('.only-mobile').find('video'); 

                    if ( scene.hiActiveView == true ){
                        //console.log('true', scene.hiActiveView);
                        if (!!video.length ){
                        // if (!!video.length && video.get(0).currentTime == 0 && video.hasClass('is-loaded111')){ //class 체크 if
                            video.get(0).play(); //처음 플레이
                        }

                        if(window.innerWidth < 768){
                            sewewe.get(0).play();
                            //console.log("mobile---");
                        } else {
                            sewewe.get(0).pause();
                            sewewe.get(0).currentTime = 0;
                            //console.log("pc---");
                        }
                    }
                    if ( scene.hiActiveView == false ){
                        //console.log('false', scene.hiActiveView);
                        if (!!video.length){
                        // if (!!video.length && video.hasClass('is-loaded111') && !video.get(0).paused){ //class 체크 if
                            video.get(0).pause();
                            video.get(0).currentTime = 0;                            
                        }
                    }
                    
                    
        
                });
                //console.log('hiActiveView', hiActiveView);
                /*
                var video = $(hiActiveView.el).find('video');
                console.log('video', video);
                if (!!video.length){
                    video.get(0).play();
                }
                */
            //}, 500);
        });
        
        $(window).trigger('scroll.videoPlay');

        // 플로팅 버튼 AR 관련 
        if (isOnlyMobileDevice){
            var isApplication = isApp();

            setTimeout(function(){
                if (isApplication){
                    $('.floating-menu.btn-app-ar').css('display', 'block');                    
                    $('.floating-menu.top').hide();
                    $('.floating-menu.top').addClass('call-yet');
                    $(window).trigger('floatingTopHide');
                    $(window).scrollTop(0);
                }
            }, 100);

            $(window).on('scroll.floating', function(){                
                var scrollTop = $(window).scrollTop();
                var hasTop = $('.floating-menu.top').hasClass('call-yet');

                if(scrollTop == 0){
                    if(hasTop){
                        //$('.floating-menu.top').css('opacity', 0);
                        if ($('[data-hash=home]').hasClass('swiper-slide-active')){
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                        }
                        
                        $(window).trigger('floatingTopHide');
                        $('.floating-menu.top').hide();
                        if(!(isApplication && location.pathname == "/")) {
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').addClass('call-yet');
                        }
                    } else {
                        /*
                        // 원본 소스
                        $(window).trigger('floatingTopHide');
                        $('.floating-menu.top').addClass('call-yet');
                        */

                        //임시 추가
                        //앱인데 메인이 아닐경우에만 실행
                        //$('.floating-menu.top').css('opacity', 1);
                        if ($('[data-hash=home]').hasClass('swiper-slide-active')){
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                        }
                        $(window).trigger('floatingTopHide');
                        $('.floating-menu.top').hide();
                        if(!(isApplication && location.pathname == "/")) {
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').addClass('call-yet');
                        }
                        //임시 추가 끝
                    }
                }else{
                    if(hasTop){
                        //$('.floating-menu.top').css('opacity', 1); //임시추가 1줄
                        if ($('[data-hash=home]').hasClass('swiper-slide-active')){
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                        }
                        
                        $('.floating-menu.top').removeClass('call-yet');
                        $(window).trigger('floatingTopShow');
                        $('.floating-menu.top').show();

                    } else {
                        if ($('[data-hash=home]').hasClass('swiper-slide-active')){
                            $('.floating-menu.btn-app-ar').css('display', 'block');
                        }
                        $('.floating-menu.top').removeClass('call-yet');
                        $(window).trigger('floatingTopShow');
                        $('.floating-menu.top').show();
                    }                       
                }
            });
        }
    }
});