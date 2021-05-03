$(function () {
            
    $.extend( $.easing,{
        def: 'easeOutQuad',
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    });

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
    

    vcui.require(['ui/scrollNavi','ui/smoothScroll','ui/lazyLoaderSwitch'], function () {
        // 플로우배너

        $('body').vcLazyLoaderSwitch('reload', $('.contents'));

        // 화면 100% 채우기
        $('html,body').css({'overflow':'hidden', 'height':'100%'});
        
        $('body').addClass('ignore-overflow-hidden');

        $('.ui_carousel_slider_banner1').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $('.ui_carousel_slider_banner2').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $('.ui_carousel_slider_banner1').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){
            
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

        $('.ui_carousel_slider_banner2').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){

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
        var $contentWrap = $('.section-cover');
        var aniSpeed = vcui.detect.isMobile? 500 : 800;
        var wheelAniInterval = null;
        var wheelInterval = null;            
        var canScroll = true;
        var winHeight = $window.height();            
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $('.scene').add('.section-cover');
        var maxLens = $scenes.length - 1;
        var posArr = [];
        var isMobileDevice = vcui.detect.isMobileDevice;

        var isThinQPage = !!$('.contents.thinq-main').length; // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.

        var visualAnimInterval;

        // 웨일 결합처리
        $('.foot-cont').find('.menu-opener').on('click', function(e){
            $('html,body').scrollTop(maxLens*winHeight);
        });

        $('.scene').css({'overflow':'hidden'});
        
        $('.container').css({'overflow':'visible', 'height':'auto'});     
        
        $('.next-arr').on('click', 'a', function(e){
            e.preventDefault();
            wheelScene(1);
        });

        $(document).on('click', 'a', function(e){
            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#'){
                e.preventDefault();
            }            
        });

        $window.on('breakpointchange', function(e){

            var data = window.breakpoint;
            var isRecom = $('.recom-list-slide').data('ui_carousel');
            var isBenefit = $('.benefit-list-slide').data('ui_carousel');

            if(data.name == 'mobile'){

                if(!isRecom){
                    $('.recom-list-slide').vcCarousel({                        
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }

                if(!isBenefit){
                    $('.benefit-list-slide').on("carouselbeforechange", function(e, carousel, cIdx){
                        clearInterval(animCtrlers[3]);
                        animCtrlers[3] = null;
                    }).on("carouselafterchange", function(e, carousel, index){
                        var icons = carousel.$slides.eq(index).find('.ui_ico_anim');
                        icons.data("isReady", true);
                        setIconAnimCtrler(icons);
                    }).vcCarousel({                        
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1                                
                    });
                }


            }else if(data.name == 'pc'){

                $('.recom-list-slide').find('.ui_carousel_dots').hide();
                $('.benefit-list-slide').find('.ui_carousel_dots').hide();
                if(isRecom){
                    $('.recom-list-slide').vcCarousel('destroy');
                }
                if(isBenefit){
                    $('.benefit-list-slide').vcCarousel('destroy');
                }
            }

        });               


        var $html = (vcui.detect.isSafari || vcui.detect.isMobileDevice) ? $('body') : $('html, body');

        var maxScale = 110;

        $scenes.find('.img img').css({
            width: maxScale + '%'
        });

        function stopVisualAnim(){
            clearInterval(visualAnimInterval);
        }

        function playVisualAnim(){
            if(currentPage > 0 && currentPage < 5){
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
            }
        }

        function wheelScene(delta) {

            if(!isMobileDevice){
                if(!canScroll) return; 
            }           
            
            var nextIndex = (delta < 0) ? -1 : 1;
            nextIndex = nextIndex + currentPage;
            nextIndex = Math.max(Math.min(nextIndex, maxLens), 0);
            if(currentPage == nextIndex) return;
            moveScene(nextIndex);
        }

        function moveScene(idx, speed){

            stopVisualAnim();

            if(!isMobileDevice){
                if(!canScroll) return;  
                canScroll = false;   
            }
            
            $contentWrap.scrollTop(0);                
            $('html').addClass('sceneMoving');
            
            if ( speed == undefined ) speed = aniSpeed;
            var scrollTopData = winHeight * idx;
            $scenes.removeClass('active').eq(idx).addClass('active');
            
            if(wheelAniInterval) clearTimeout(wheelAniInterval);
            wheelAniInterval = setTimeout(function() {

                if(!isMobileDevice){
                    if(! $('html').hasClass('sceneMoving')){
                        return false;
                    }
                }

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

                    if(currentPage == 5) startIconAnim();
                    else stopIconAnim();
                    
                    $('html').removeClass('sceneMoving');
                    $scenes.removeClass('on').eq(idx).addClass('on');

                    $scenes.each(function() {
                        if ( $(this).find('video').length != 0 ) {
                            if ( $(this).hasClass('on') ) {
                                $(this).find('video')[0].play();
                            }else {
                                $(this).find('video')[0].pause();
                                $(this).find('video')[0].currentTime = 0;							
                            }
                        }
                    });

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

            if(idx > 1 && $('.video-poster').length) $('.video-poster').remove();
        } 

        var prevTime = new Date().getTime();

        // 휠 이벤트 처리

        if(!isMobileDevice){

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
        lgkorUI.showAppBottomMenuOver(true);
        lgkorUI.setEnableAppScrollBottomMenu(false);


        /* 메인테스트*/
        $('.container').on('touchstart touchend touchcancel', function(e) {
            
            var data = _getEventPoint(e);
            if (e.type == 'touchstart') {
                touchSy = data.y;
            } else {

                if (touchSy - data.y > 80) {
                    // console.log('down');
                    lgkorUI.showAppBottomMenu(false);

                } else if (touchSy - data.y < -80) {
                    // console.log('up');
                    lgkorUI.showAppBottomMenu(true);
                }

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


            $(target).css({
                width: newW,
                height: newH,
                marginLeft: (boxW-newW)/2,
                marginTop: (boxH-newH)/2
            });
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

        function updateVideo(video) {

            var isAndroid = vcui.detect.isAndroid;

            var $target   = $(video||this),
                $wrap     = $target.closest('.img'),
                // $image    = $wrap.find('img'),
                // loaded    = $target.data('loaded'),           
                videoAttr = $target.data('options') || 'autoplay playsinline muted',
                $sources  = $target.find('source'),
                oVideo;

            var src = $target.data('src');
            var posterSrc = $target.data('posterSrc');

            if(isMobileDevice){
                posterSrc = $target.data('posterMSrc') || $target.data('posterSrc');
                src = $target.data('mSrc') || $target.data('src');
            }

            if(posterSrc){
                videoAttr += " poster='"+posterSrc+"'";
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
                    'transform': 'translate(-50%,-50%)'
                })
                oVideo   = $video[0];

                if ( isAndroid ) {
                    $(document).one('touchstart.videoPlay', function() {
                        oVideo.play();
                    });
                }
                $wrap.addClass('video');

                $video.on('loadeddata', function(e) {
                    $video.data('loaded', true);
                    $wrap.trigger('videoLoaded');
                    oVideo.play();
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

            canScroll = true;    
            winWidth = $window.width();
            winHeight = $window.height();
            posArr = [];
                        
            var $prevTarget = $('.container').prevAll(':not(#layerSearch):visible:first');
            var prevAllHeight = $prevTarget.offset().top + $prevTarget.height(); 
            var totalHeight = winHeight;
            var itemHeight = winHeight;
            var allHeight = 0;
            
            $scenes.each(function(i) {
                if(i==0){
                    itemHeight = winHeight-prevAllHeight;   
                }else{
                    itemHeight = winHeight;    
                }
                allHeight += itemHeight;
                posArr.push(allHeight);
                $(this).height(itemHeight);
                
                // var imageSize = {
                //     //<img data-natural-width = '1980' data-natural-height = '1080'>
                //     width : $(this).find('img').data('naturalWidth')? $(this).find('img').data('naturalWidth') : 720,//1920, 
                //     height : $(this).find('img').data('naturalHeight')? $(this).find('img').data('naturalHeight') : 1285,//1285 1476 1080
                // };

                var imageSize = {
                    //<img data-natural-width = '1980' data-natural-height = '1080'>
                    width : window.breakpoint.name=='pc'? 1920 : 720, 
                    height : window.breakpoint.name=='pc'? 1080 : 1285, //1285 1476 1080
                };

                $('body').vcLazyLoaderSwitch('reload', $('.contents'));

                if(!$(this).hasClass('section-cover')){
                    _setCenterImage($(this).find('.img'), winWidth, itemHeight, imageSize.width, imageSize.height);
                    $(this).find('.img > .video').each(function() {
                        updateVideo(this);
                    });
                }
                
                totalHeight += itemHeight;
            });  

            /* 메인 테스트 */
            if(vcui.detect.isIOS) {
                if($contentWrap.hasClass('active')) {
                    $contentWrap.css({'overflow':'auto','height':winHeight});
                } else {
                    $contentWrap.css({'overflow':'','height':winHeight});
                }
            } else {
                $contentWrap.css({'overflow':'auto','height':winHeight});
            }
            $('.contents').css({'overflow':'hidden', 'height':totalHeight});
            
            if(idx!==undefined){
                currentPage = idx;
                moveScene(currentPage,0);

                // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
                $(window).trigger('thinQScroll');
            }else{
                setTimeout(function(){
                    currentPage = currentPage>0? currentPage : _findIdx($('html, body').scrollTop());
                    moveScene(currentPage,0);

                    if(window.sessionStorage){ 
                        var lgeMainScrollTop = window.sessionStorage.getItem('lgeMainScrollTop');
                        if(lgeMainScrollTop){
                            $contentWrap.scrollTop(lgeMainScrollTop);                            
                        }
                        window.sessionStorage.removeItem('lgeMainScrollTop');
                    }

                    // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
                    $(window).trigger('thinQScroll');

                }, 100);
            }
            
        }

        $window.on('floatingTop', function(){
            //render(0);
            currentPage = 0;
            moveScene(currentPage,0);
        });

        // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
        $window.on('thinQScroll', function(){
            var hash = location.hash;
            switch (hash){
                case '#intro':
                    $('.thinq-tabs a[href="#thinq-cont1"]').trigger('click');
                    break;
                case '#life-style':
                    $('.thinq-tabs a[href="#thinq-cont2"]').trigger('click');
                    break;
                case '#app':
                    $('.thinq-tabs a[href="#thinq-cont3"]').trigger('click');
                    break;
                case '#magazine':
                    $('.thinq-tabs a[href="#thinq-cont4"]').trigger('click');
                    break;
                default:

            }
            currentPage = maxLens;
            moveScene(currentPage,0);
            //console.log('scenes length', maxLens);
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
        $('.ui_ico_anim').each(function(idx, item){
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

    $('.ui_ico_anim').each(function(idx, item){
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
                    $(item).append('<img onload="loadAnimSourceComplete(this)" src="' + path + fn + num + '.png" alt="">');
                }
            }
        } else{
            for(i=1;i<leng;i++){
                total++;
                
                num = i < 10 ? "0" + i : i;
                $(item).append('<img onload="loadAnimSourceComplete(this)" src="' + path + fn + num + '.png" alt="">');
            }
        }
        $(item).data("loadTotal", total);
        $(item).data('length', total+1);
    });
    $('.ui_ico_anim img').css({position:'absolute', display:'none'});
    $('.ui_ico_anim img:nth-child(1)').css({display:'block'});

    /* 20210430 : 모바일앱 다운로드 팝업 */
    if (vcui.detect.isMobileDevice) {
        var layer_id = '#mobile-close-popup';
        var el = $(layer_id);
        if (el.size() === 0) { return false; }
        var cookie_name = '__LGAPP_DLOG__';
        var app = {
            ios: {
                link: 'https://itunes.apple.com/app/id1561079401?mt=8'
            },
            android: {
                link: 'https://play.google.com/store/apps/details?id=kr.co.lge.android'
            }
        };
        if (vcui.Cookie.get(cookie_name) === '') {
            vcui.modal(layer_id, open);
            var checkbox = $('#check-today');
            var download_btn = $('#lg__app-download');
            download_btn.on('click', function () {
                var link = vcui.detect.isIOS ? ios.link : android.link;
                window.open(link, '_blank');
                return;
            });
            el.find('.pink.btn-close').one('click', function () {
                var close_btn = el.find('.ui_modal_close');
                if (checkbox.is(':checked')) {
                    vcui.Cookie.set(cookie_name, 'hide', {"expires": 1, "path": '/'});
                }
                close_btn.trigger('click');
                return;
            });
        }
    }
    /* //20210430 : 모바일앱 다운로드 팝업 */
    
});