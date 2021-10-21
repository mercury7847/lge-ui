;$(function() {

    $.fn.inViewport = function(wrapClass, tabHeight, offsetVh){

        var marginTop = ~~Math.round(parseFloat(tabHeight)) || 0;
        var elOffsetVh = ~~Math.round(parseFloat(offsetVh)) || 0;
        var ty = $(this).position().top + marginTop;
        var tb = ty + $(this).outerHeight();
        var sy = $(wrapClass).scrollTop();
        var vh = $(wrapClass).height() + sy + elOffsetVh;

        if($(wrapClass).height() < $(this).outerHeight()) {
            return Math.abs(ty - sy) < 100;
        }
        return ty > sy && vh > tb;
    };
    
    $.extend( $.easing,{
        def: 'easeOutQuad',
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    });

        //BTOCSITE-4251 히어로 슬라이드 배너 첫번째 이미지 프리로드 (테스트중)
        var $firstImg = $('.hero-brand .hero-banner .slide-track li').eq(0).find('.visual-area img')
        if($firstImg.length > 0){
            var heroPcImgSrc = $firstImg.data('pcSrc');
            var heroMoImgSrc = $firstImg.data('mSrc');
            var heroImg = new Image();
            heroImg.src = vcui.detect.isMobile ? heroMoImgSrc : heroPcImgSrc
        }
        //BTOCSITE-4251 히어로 슬라이드 배너 첫번째 이미지 프리로드 (테스트)


        // 20210730 BTOCSITE-2596 스토어 > PC 히어로 배너 재생 버튼 동작 안함 오류
        /* 20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
        var $thinqMain = $('.ui_wide_slider');
        $thinqMain.vcCarousel('destroy').vcCarousel({
            autoplay: true,
            autoplaySpped: 5000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
            swipeToSlide: true,
            
            dotsSelector: '.ui_wideslider_dots',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            touchThreshold: 100,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150
        });
        /* //20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */

        $('.install-wrap .ui_carousel_slider').on('carouselbeforechange', function(e, carousel, index, nextIdx){
            var $items = $device.find('.screen-slider > li');
            var xp = -428;
            if(nextIdx < index) xp = 428;
            $items.eq(index).css({x:0, opacity:1}).transit({x:xp});
            $items.eq(nextIdx).css({x:-xp, opacity:1}).transit({x:0});
        }).vcCarousel({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        $('.app-use-wrap .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.app-smart-wrap .ui_carousel_slider').vcCarousel({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,   
            dots:false,   
            fade:true, 
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots:false,   
                        fade:true, 
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        dots:true,
                        fade:false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

        $('.magazine-wrap .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });

        /* 20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
        var $thinqSlideNum = $thinqMain.find('.slide-conts');
        var $thinqSlideLength = $thinqMain.find('.custom-indi-wrap')
        if($thinqSlideNum.length === 1) {
            $thinqSlideLength.hide();
        }
        /* //20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
        
        var isApplication = isApp();
        var $window   = $(window);
        var $contentWrap = $('.thinq-wrap');   
        var aniSpeed = vcui.detect.isMobile? 500 : 800;
        var wheelAniInterval = null;
        var wheelInterval = null;            
        var canScroll = true;
        var winHeight = $window.height();            
        var currentStep = 0;
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $('#fixed-wrap').children().add('.thinq-wrap');
        var stepLens = 0;
        var pageLens = $scenes.length-1;
        var posArr = [];
        var wheelArr = [];      
        var regex = /^data-step-(-?\d*)/;
        var $html = (vcui.detect.isSafari || vcui.detect.isMobileDevice) ? $('body') : $('html, body');

        /* BTOCSITE-4657 하단 메뉴 전체보기 클릭시 상단 화면으로 이동 되는 오류 2021-08-25 */
            // 웨일 결합처리
            // $('.foot-cont').find('.menu-opener').on('click', function(e){
            //     $('html,body').scrollTop(pageLens*winHeight);
            // });
        /* //BTOCSITE-4657 하단 메뉴 전체보기 클릭시 상단 화면으로 이동 되는 오류 2021-08-25 */

        // 화면 100% 채우기
        //$('html,body').css({'overflow':'hidden', 'height':'100%'}); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경

        // 모달이후 overflow :visible 문제 해결
        $('body').addClass('ignore-overflow-hidden');


        //$('#fixed-wrap').children().css({'overflow':'hidden'}); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경
        //$('.container').css({'overflow':'visible', 'height':'auto'}); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경
        
        $('.next-arr').on('click', 'a', function(e){
            e.preventDefault();
            var step = $(e.currentTarget).data('currentStep');
            if(step) currentStep = step;
            wheelScene(1);
        });
        
        
        function moveStep(step){            
            
            if(!canScroll) return;
            canScroll = false;            

            var arr = wheelArr[step];
            if(!vcui.isArray(arr)){ 
                currentStep = step;
                canScroll = true;
                return; 
            }

            for(var i =0; i<arr.length; i++){
                var item = arr[i];
                var $target = $(item.target);   
                
                var isDisplay;
                var obj = $.extend({}, item.transit);
                
                if(obj['display']!==undefined){
                    isDisplay = obj['display'];
                    delete obj['display'];
                }
                
                if(isDisplay!==undefined && isDisplay!=='none'){
                    $target.css('display',isDisplay);
                }
                
                if(i==0){
                    $target.transit(obj, function(){
                        if(isDisplay==='none'){
                            $target.css('display',isDisplay);
                        }
                        currentStep = step;
                        canScroll = true;

                    });  
                }else{
                    $target.transit(obj, function(){
                        if(isDisplay==='none'){
                            $target.css('display',isDisplay);
                        }
                    });  
                }                                              
            }
        }


        function wheelScene(delta) {

            if(!canScroll) return;
            var nextStep = (delta < 0) ? -1 : 1;
            nextStep = nextStep + currentStep;
            nextStep = Math.max(Math.min(nextStep, stepLens), 0);                   
            if(currentStep == nextStep) return;

            var arr = wheelArr[nextStep];

            if(vcui.isArray(arr)){
                var pageId = arr[0]['pageId'];
                if(currentPage == pageId){
                    moveStep(nextStep);
                }else{
                    moveScene(pageId, nextStep);
                }                        

            }else{
                moveScene(arr, nextStep);
            }
            
        }
        

        function moveScene(idx, step, speed){
             
            if(!canScroll) return;
            canScroll = false;
            $contentWrap.scrollTop(0);   
            appMotion(0); 

            $('html').addClass('sceneMoving');                    
            if ( speed == undefined ) speed = aniSpeed;
            var scrollTopData = winHeight * idx;                    
            //$scenes.removeClass('active').eq(idx).addClass('active'); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경
            
            if(wheelAniInterval) clearTimeout(wheelAniInterval);
            wheelAniInterval = setTimeout(function() {
                if(! $('html').hasClass('sceneMoving')){
                    return false;
                }

                var speedTime = currentPage<idx? parseInt(speed) : parseInt(speed)-300;
                speedTime = Math.max(0,speedTime);

                $html.stop(true).animate({
                    scrollTop: scrollTopData
                }, speedTime, 'easeInOutQuart',  function() { 
                    canScroll = true;


                    var hasTop = $('.floating-menu.top').hasClass('call-yet');
                    if(idx==0){
                        if(!hasTop){
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').addClass('call-yet');
                        }
                    }else{
                        if(hasTop){
                            $(window).trigger('floatingTopShow');
                            $('.floating-menu.top').removeClass('call-yet');
                        }                        
                    }

                    currentPage = idx;  
                    moveStep(step);    
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
                });
            }, 100);

        }         


        var prevTime = new Date().getTime();

        // 휠 이벤트 처리

        if(!vcui.detect.isMobileDevice){

            document.addEventListener('wheel', function(e){

                var open = $('#layerSearch').hasClass('open');           
                if(!open){    
                    var curTime = new Date().getTime();
                    if(typeof prevTime !== 'undefined'){
                        var timeDiff = curTime-prevTime;
                        if(timeDiff > 35){
                            if(currentStep == stepLens){
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
        // lgkorUI.showAppBottomMenuOver(true);
        // lgkorUI.setEnableAppScrollBottomMenu(false);

        
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

                if(currentStep == stepLens){
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



        function _getEventPoint(ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end'|| ev.type === 'touchend') e = e.changedTouches && e.changedTouches[0] || e;
            else e = e.touches && e.touches[0] || e;
            return {
                x : e.pageX || e.clientX,
                y : e.pageY || e.clientY
            };
        }

        function _stringToObj(str){
            
            var regex = /(.*)\:(.*)/;
            var arr = str.replace(/ /gi, "").split(',');
            var obj = {};

            for(var i=0; i<arr.length; i++){
                var match = arr[i].match(regex);
                if(match !== null){
                    obj[match[1]] = match[2];
                }
            }
            return obj;
        }


        function _findIdx(py){
            for(var i=0; i<posArr.length; i++){
                if(posArr[i]>=py){
                    return i;
                }
            }
            return 0;                
        }

        function _findStep(page){
            for(var i=0; i<wheelArr.length; i++){
                var arr = wheelArr[i];
                if(vcui.isArray(arr)){
                    var pageId = arr[0]['pageId'];
                    if(pageId == page) return i;
                }else{
                    if(arr == page) return i;
                }
            }
            return 0;
        }

        function setBeforeCss(step){
            for(var k=0; k<step; k++){
                var arr = wheelArr[k];
                if(vcui.isArray(arr)){
                    for(var j=0; j<arr.length; j++){
                        var obj = arr[j];
                        var target = obj['target'];
                        var transit = obj['transit'];
                        $(target).css(transit);
                    }
                }
            }
        }

        function updateVideo(video) {

            var isAndroid = vcui.detect.isAndroid;
            var isMobileDevice = vcui.detect.isMobileDevice;

            var $target   = $(video||this),
                $wrap     = $target.closest('.img'),
                // $image    = $wrap.find('img'),
                // loaded    = $target.data('loaded'),                  
                videoAttr = $target.data('options') || 'autoplay loop playsinline muted',
                $sources  = $target.find('source'),
                oVideo;

            var src = $target.data('src');
            if(isMobileDevice){
                src = $target.data('mSrc') || $target.data('src');
            }

            // 비디오 요소 생성.
            var createVideoObject = function() {
                
                var extArr = $target.data('ext').toLowerCase().replace(/\s/g, '').split(',');
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


        var render = function(page){

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
            wheelArr = [];
                        
            
            var $prevTarget = $('.container').prevAll(':not(#layerSearch):visible:first');
            var prevAllHeight = $prevTarget.offset().top + $prevTarget.height(); 
            var totalHeight = winHeight;
            var itemHeight = winHeight;
            var allHeight = 0;
            
            $scenes.each(function(i) {                        
                var arr = [];
                $(this).find('*').each(function(j){
                    var attributeIndex = 0;
                    var attributesLength = this.attributes.length;   
                    var cssVal = null;

                    for (; attributeIndex < attributesLength; attributeIndex++) {
                        var attr = this.attributes[attributeIndex];
                        var match = attr.name.match(regex);
                        if(match === null) continue;                                
                        if(attributeIndex==1) cssVal = _stringToObj(attr.value);

                        arr.push({
                            sort : match[1],
                            target : this,
                            transit : _stringToObj(attr.value),
                            pageId : i                                 
                        });                                
                    }
                    if(cssVal) $(this).css(cssVal);

                });

                arr.sort(function(a,b){
                    return parseInt(a.sort) - parseInt(b.sort);
                });

                if(arr.length>0){
                    var fArr = [arr[0]];
                    for(var k=0; k<arr.length; k++){
                        var obj1 = arr[k];  
                        var obj2 = arr[k+1];  
                        if(obj2){                            
                            if( obj1.sort !== obj2.sort){
                                wheelArr.push(fArr);
                                fArr = [obj2];
                            }else{
                                fArr.push(obj2);
                            }
                        }else{
                            wheelArr.push(fArr);
                        }
                    }
                }else{
                    wheelArr.push(i);
                }      
                

                if(i==0){
                    itemHeight = winHeight-prevAllHeight;   
                }else{
                    itemHeight = winHeight;    
                }
                allHeight += itemHeight;
                posArr.push(allHeight);
                $(this).height(itemHeight);
                totalHeight += itemHeight;

                $(this).find('.img > .video').each(function() {
                    updateVideo(this);
                });
                            
            });  

            posArr.push(10000);


            stepLens = wheelArr.length-1;                    
            //$contentWrap.css({'overflow':'auto','height':winHeight}); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경
            //$('.contents').css({'overflow':'hidden', 'height':totalHeight}); //20210629 BTOCSITE-1519 : 히어로배너 구조 변경

            if(page!==undefined){
                currentPage = page;
                currentStep = _findStep(currentPage);
                setBeforeCss(currentStep);
                moveScene(currentPage,currentStep,0);

                // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
                setTimeout(function(){
                    $(window).trigger('thinQScroll');
                },100);

            }else{
                //setTimeout(function(){
                    currentPage = _findIdx($('html, body').scrollTop());    
                    currentStep = _findStep(currentPage);
                    setBeforeCss(currentStep);
                    moveScene(currentPage,currentStep,0);

                    // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
                    setTimeout(function(){
                        $(window).trigger('thinQScroll');
                    },100);

                //}, 100);
            }
            
        }    
        
        // 2021-05-03 add 김우람 :: thinq 외부 링크 기능 추가.
        $window.on('thinQScroll', function(){
            var hash = location.hash;
            var hasHash = false;
            switch (hash){
                case '#intro':
                    setTimeout(function(){
                        $('.thinq-tabs a[href="#thinq-cont1"]').trigger('click');
                    },100);
                    hasHash = true;
                    break;
                case '#life-style':
                    setTimeout(function(){
                        $('.thinq-tabs a[href="#thinq-cont2"]').trigger('click');
                    },100);
                    hasHash = true;
                    break;
                case '#app':
                    setTimeout(function(){
                        $('.thinq-tabs a[href="#thinq-cont3"]').trigger('click');
                    },100);
                    hasHash = true;
                    break;
                case '#magazine':
                    setTimeout(function(){
                        $('.thinq-tabs a[href="#thinq-cont4"]').trigger('click');
                    },100);
                    hasHash = true;
                    break;
                default:

            }
            if (hasHash){
                currentPage = pageLens;
                currentStep = _findStep(currentPage);
                setBeforeCss(currentStep);
                moveScene(currentPage,currentPage,0);
            }
            
        });
        
        ////////////////////////////////////
        // 탭 내부 스크립트
                

        var $device = $('.thinq-app').find('.ui_device'); // app 탭내 핸드폰
        var $typography = $('.thinq-app').find('.typography');
        var deviceY = 0;
        var deviceH = 612; // 핸드폰 사이즈
        var isLifeWrap = false;
        var isThinqApp = false;
        var isMobile = false;

        

        $('.thinq-app').find('.app-wrap').css('position','relative'); //$device.position().top 값을 구하기 위해 position 값이 필요 

        
        $('.thinq-section.smart-thinq-wrap .app-smart-tabs').on('tabchange', function(e,data){

            if($(e.currentTarget).siblings('.ui_carousel_slider').length>0) {    
                var idx = data.selectedIndex;
                $(e.currentTarget).siblings('.ui_carousel_slider').vcCarousel('goTo', idx);
            } 

        });

        $('.thinq-section.smart-thinq-wrap .ui_tab').on('tabchange', function(e,data){

            if(data.content.find('.ui_carousel_slider').length>0) {                                
                data.content.find('.ui_carousel_slider').vcCarousel('update').vcCarousel('goTo', 0, true);
            } 

        });

        // 탭이동 이벤트 처리
        var $stkTab = $contentWrap.find('.thinq-tabs');
        var $stkTabOffsetTop = $stkTab.offset().top;
        $('.thinq-tabs .ui_tab').on('tabchange', function(e, data){

            $contentWrap.scrollTop(0); 
            $contentWrap.off('scroll.app');  
            $contentWrap.off('scroll.lifestyle');

            $('html, body').stop().animate({scrollTop:$stkTabOffsetTop});


            $device.css('top', '');
            appMotion(0); 

            if(data.content[0] == $('.thinq-app')[0]){                
                deviceY = $device.position().top;
                isThinqApp = true;                
                $contentWrap.on('scroll.app', scrollEvent);  

                if(data.content.find('.ui_tab').length>0) {                     
                    data.content.find('.ui_tab').vcTab('update');
                } 

                if(data.content.find('.ui_carousel_slider').length>0) {  
                    data.content.find('.ui_carousel_slider').vcCarousel('update').vcCarousel('goTo', 0);
                } 

            }else{
                isThinqApp = false;
            }

            if(data.content[0] == $('.thinq-lifestyle')[0]){
                isLifeWrap = true;
                $contentWrap.on('scroll.lifestyle', scrollEvent);  
            }else{
                isLifeWrap = false;
            }

        })
        
        $device.find('.frame').css({'transition':'transform 0.1s'})
        $device.find('.screen').css({'transition':'opacity 0.1s'})
        $typography.css({'transition':'opacity 0.1s'});

        function transFunc(distance, start, end, scroll, sy){
            var progress = sy? ((sy - scroll) - distance) /distance : (scroll - distance) /distance;
            if (progress <= 0.001) progress = 0;
            if (progress >= 0.999) progress = 1;   
            var cal = (end - start) * progress;
            var val = start + cal;
            return val;
        }


        $window.on('breakpointchange', function(e){

            var data = window.breakpoint;            
            if(data.name == 'mobile'){    
                isMobile = true;   
            }else if(data.name == 'pc'){    
                isMobile = false;
            }    
        })

        function appMotion(strollTop){

            var st = strollTop - 88; 
            var val = transFunc(110, 1, isMobile? 0.78 : 0.63, st, 0);
            var val2 = transFunc(300, 1, 0.0, st, 0);
            var val3 = transFunc(300, 1, 0.0, st, 1000);
            var val4 = transFunc(300, 1, 0.0, st, 2000);

            $device.find('.frame').css({'scale':val});
            $typography.css({'opacity':val2});
            $device.find('.intro').css({'opacity':val3});
            $device.find('.ui_last').css({'opacity':val4});

            var useWrap = $('.app-use-wrap').position().top;            

            if(st + deviceH*2 - 188 > useWrap){
                var ny = st + deviceH*2 - 188 - useWrap;
                $device.css('top', -ny);
            }

            if(!isMobile){

                if(st > deviceY+15){                    
                    $device.addClass('fixed');
                    
                }else{
                    $device.css({'top':''}).removeClass('fixed');
                }                
            }

            if(strollTop == 0){
               $device.css({'top':''}).removeClass('fixed');
            }

        }

        function scrollEvent(){

            if(isThinqApp){
                // console.log($contentWrap.scrollTop());
                appMotion($contentWrap.scrollTop());                
            }   
            if(isLifeWrap){
                $('.free-life-wrap').find('.animate-target').each(function() {
                    if($(this).inViewport('.brand-wrap',88)) {                            
                        if(!$(this).hasClass('animated')){
                            $(this).addClass('animated');
                        }
                    }
                });
            }
        }


        function setMagazineVideo(){

            var videoTmpl = '<iframe src={{link}} '+
            'id="videoPlayerCode" frameborder="0" allowfullscreen="1" '+
            'allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" '+
            'title="YouTube video player"></iframe>';

            $('#thinq-cont4').off('click', '.video-thumb a');

            $('#thinq-cont4').on('click', '.video-thumb a', function(e){
                var href = $(e.currentTarget).attr('data-url').replace(/ /gi, "");
                $('#thinq-cont4').find('.video-box').empty().html(vcui.template(videoTmpl,{link:href}));   
                var $videoBtns = $('#thinq-cont4').find('.magazine-wrap .ui_carousel_slider .ui_carousel_slide');
                $videoBtns.removeClass('slide_on');
                $videoBtns.find('span.blind.bh-add').remove();
                $(e.currentTarget).closest('.ui_carousel_slide').addClass('slide_on').append('<span class="blind bh-add">선택됨</span>');
                var aT = $(e.currentTarget).closest('.ui_carousel_slide').find('a:eq(0)');
                if(aT.length > 0) {
                    aT.append('<span class="blind bh-add">선택됨</span>');
                }
            });
            
            var $videoBtns = $('#thinq-cont4').find('.magazine-wrap .ui_carousel_slider .ui_carousel_slide');
            var $videoOnBtn = $videoBtns.siblings('.slide_on').find('a[data-url]');
            $videoOnBtn.trigger('click');
        }

        

        $(document).on('click', 'a', function(e){
            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#' || href == '#n'){
                e.preventDefault();
            }else{
                if (href && /^(#|\.)\w+/.test(href)) {                    
                    var $compareTarget = $('.thinq-tabs .ui_tab').find('a[href="'+href+'"]');
                    if($compareTarget[0] != e.currentTarget) {
                        $('.thinq-tabs .ui_tab').vcTab('selectByName', href);
                    }
                }                
            }      
        });

        /* 20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
        var $thinq = $contentWrap.find('.thinq-tabs');
        var $thinqOffsetTop = $thinq.offset().top;

        $window.scroll(function(){
            if($window.scrollTop() >= $thinqOffsetTop) {
                $contentWrap.addClass('active on');
            } else {
                $contentWrap.removeClass('active on');
            }
        });
        /* //20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */

        // 접근성 탭 이동시 화면처리
        $(document).on('focusin', function(e){

            /* 20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
            // if($.contains($('.thinq-wrap')[0], e.target)){
            //     currentPage = pageLens;
            //     currentStep = stepLens;
            // }
            // else if($.contains($('.signature-hero')[0], e.target)){
            //     // currentPage = 0;
            //     // currentStep = 0;
            // }
            /* //20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */

        });


        function doWheelfixedElement(selector){
            function fixedScrolled(e) {
                var evt = e || window.event;
                var delta = evt.detail? evt.detail * (-120) : evt.wheelDelta; 
                $contentWrap.scrollTop($contentWrap.scrollTop() - delta);
            }
            var mousewheelevt = (/Gecko\//i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
            var nodes = document.querySelectorAll(selector);
            Array.prototype.forEach.call(nodes, function(item){
                if (item.attachEvent) item.attachEvent("on" + mousewheelevt, fixedScrolled);
                else if (item.addEventListener) item.addEventListener(mousewheelevt, fixedScrolled, false);
            });
        }

        

        doWheelfixedElement('.ui_device');         
        setMagazineVideo();


        $window.on('floatingTop', function(){
            currentPage = 0;
            currentStep = 0;
            setBeforeCss(currentStep);
            moveScene(currentPage,currentStep,0);

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
        }
        
        $window.trigger('breakpointchange');
        window.resizeScene = render;


});
    