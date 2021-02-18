$(function() {

    vcui.require(['ui/carousel','libs/jquery.transit.min'], function () {     
        
        $('.install-wrap .ui_carousel_slider').on('carouselafterchange', function(e, carousel, index){

            var $items = $('.ui_device').find('.screen-slider > li');
            var xp = -428;
            if(carousel.previousSlide < index) xp = 428;
            $items.eq(carousel.previousSlide).css({x:0, opacity:1}).transit({x:-xp});
            $items.eq(index).css({x:xp, opacity:1}).transit({x:0});

        }).vcCarousel({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1
        });


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
            swing: function (x, t, b, c, d) {
                return $.easing[$.easing.def](x, t, b, c, d);
            },
            easeInQuad: function (x, t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (x, t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (x, t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (x, t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (x, t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInExpo: function (x, t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (x, t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        });

        $('.app-use-wrap .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
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
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: "unslick"
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
        
        
        var $window   = $(window);
        var aniSpeed = 800;
        var wheelAniInterval = null;
        var wheelInterval = null;            
        var canScroll = true;
        var winHeight = $window.height();            
        var currentStep = 0;
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $('#fixed-wrap').children().add('.thinq-wrap');
        var stepLens = 0;
        var posArr = [];
        var wheelArr = [];

        var regex = /^data-step-(-?\d*)/;


        $('#fixed-wrap').children().css({'overflow':'hidden'});
        $('html').css({'overflow':'hidden'});
        $('.container').css({'overflow':'visible', 'height':'auto'});     
        
        $('.next-arr').on('a', function(e){
            e.preventDefault();
        });

        $(document).on('click', 'a', function(e){
            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#'){
                e.preventDefault();
            }            
        });

        $window.on('resizeend', function(e){
            render();
        });

        $window.on('floatingTop', function(){
            render(0);
        });         


        function moveStep(step, flag){

            if(!canScroll) return;  
            if(currentStep == step) return;
            canScroll = false; 

            var arr = wheelArr[step];
            if(!vcui.isArray(arr)){ 
                currentStep = step;
                return; 
            }

            for(var i =0; i<arr.length; i++){
                var item = arr[i];
                var $target = $(item.target);                
                $target.transit(item.transit);                
            }

            if(!flag){
                if(wheelInterval) clearTimeout(wheelInterval);
                wheelInterval = setTimeout(function(){
                    currentStep = step;
                    canScroll = true;
                }, 400);
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

        function stringToObj(str){
            
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

        function moveScene(idx, step, speed){

            if(!canScroll) return;  
            canScroll = false;   

            $('.brand-wrap').scrollTop(0);   
            appMotion(0); 

            $('html').addClass('sceneMoving');                    
            if ( speed == undefined ) speed = aniSpeed;
            var scrollTopData = winHeight * idx;                    
            $scenes.removeClass('active').eq(idx).addClass('active');
            
            if(wheelAniInterval) clearTimeout(wheelAniInterval);
            wheelAniInterval = setTimeout(function() {
                if(! $('html').hasClass('sceneMoving')){
                    return false;
                }

                $('html, body').stop(true).animate({
                    scrollTop: scrollTopData
                }, speed, 'easeInOutQuart',  function() { 
                    canScroll = true
                    currentPage = idx;     
                    moveStep(step, true);          
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
        

        document.addEventListener('wheel', function(e){
            
            if(currentStep == stepLens){
                // if(wheelInterval) clearTimeout(wheelInterval);
                // wheelInterval = setTimeout(function(){
                    var st = $('.brand-wrap').scrollTop();
                    if(st==0 && e.deltaY<0){
                        wheelScene(-1);
                    }
                //}, 100);
            }else{
                if(e.deltaY>0 || e.deltaY<0){
                    wheelScene(e.deltaY);
                }
            }  

        });

        
        $(document).on('touchstart touchend touchcancel', function(e) {

            var data = _getEventPoint(e);
            if (e.type == 'touchstart') {
                touchSy = data.y;
            } else {

                if(currentStep == stepLens){
                    if(wheelInterval) clearTimeout(wheelInterval);
                    wheelInterval = setTimeout(function(){
                        var st = $('.brand-wrap').scrollTop();
                        if(st==0 && touchSy - data.y < -80){
                            wheelScene(-1, true);
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

        function _findIdx(py){
            var idx = 0;
            for(var i=0; i<posArr.length; i++){
                if(posArr[i]>py){
                    idx = i;
                    break;
                }
            }
            return idx;                
        }

        function _findStep(page){
            for(var i=0; i<wheelArr.length; i++){
                var arr = wheelArr[i];
                if(vcui.isArray(arr)){
                    var pageId = arr[0]['pageId'];
                    if(pageId == page) return i;
                }else{
                    return i;
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
            var $target   = $(video||this),
                $wrap     = $target.closest('.img'),
                $image    = $wrap.find('img'),
                key       = $target.data('key'),
                loaded    = $target.data('loaded'),
                src       = $target.data('src'),                        
                isAndroid = vcui.detect.isAndroid,
                /*
                modeV     = 5, // 사이즈별로 로드시
                srcArr = (function() {
                    var s5 = $target.data('src-v5') || $target.data('src'),
                        s4 = $target.data('src-v4') || s5,
                        s3 = $target.data('src-v3') || s4,
                        s2 = $target.data('src-v2') || s3,
                        s1 = $target.data('src-v1') || s2,
                        arr = [null,s1,s2,s3,s4,s5];
                    return arr;
                })(),
                src  = srcArr[modeV],
                */
                src    = $target.data('src'),                        
                videoAttr = $target.data('options') || 'autoplay loop playsinline muted',
                $video    = $target.find('video'),
                $sources  = $target.find('source'),
                oVideo;

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


        function render(page){

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
                        
            var $prevTarget = $('.container').prevAll(':visible:first');
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
                        if(attributeIndex==1) cssVal = stringToObj(attr.value);

                        arr.push({
                            sort : match[1],
                            target : this,
                            transit : stringToObj(attr.value),
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


            stepLens = wheelArr.length-1;                    
            $('.brand-wrap').css({'overflow':'auto','height':winHeight});
            $('.contents').css({'overflow':'hidden', 'height':totalHeight});

            console.log(wheelArr);

            if(page!==undefined){
                currentPage = page;
                currentStep = _findStep(currentPage);
                setBeforeCss(currentStep);
                moveScene(currentPage,currentStep,0);
            }else{
                setTimeout(function(){
                    currentPage = currentPage>0? currentPage : _findIdx($('html, body').scrollTop());
                    currentStep = _findStep(currentPage);
                    setBeforeCss(currentStep);
                    moveScene(currentPage,currentStep,0);
                }, 100);
            }
            
        }          

        $('.app-wrap').css('position','relative');

        var deviceY = 0;
        var deviceH = 612;
        var isLifeWrap = false;
        var isThinqApp = false;
        
        $('.thinq-tabs').on('tabchange', function(e, data){

            $('.brand-wrap').scrollTop(0); 
            $('.brand-wrap').off('scroll.app');  
            $('.brand-wrap').off('scroll.lifestyle');
            appMotion(0); 

            if(data.content[0] == $('.thinq-app')[0]){                
                deviceY = $('.ui_device').position().top;
                isThinqApp = true;                
                $('.brand-wrap').on('scroll.app', scrollEvent);  
            }else{
                isThinqApp = false;
            }

            if(data.content[0] == $('.thinq-lifestyle')[0]){
                isLifeWrap = true;
                $('.brand-wrap').on('scroll.lifestyle', scrollEvent);  
            }else{
                isLifeWrap = false;
            }

        })
        
        $('.ui_device').find('.frame').css({'transition':'transform 0.1s'})
        $('.ui_device').find('.screen').css({'transition':'opacity 0.1s'})
        $('.typography').css({'transition':'opacity 0.1s'});

        function transFunc(distance, start, end, scroll, sy){
            var progress = sy? ((sy - scroll) - distance) /distance : (scroll - distance) /distance;
            if (progress <= 0.001) progress = 0;
            if (progress >= 0.999) progress = 1;   
            var cal = (end - start) * progress;
            var val = start + cal;
            return val;
        }

        var isMobile = false;

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

            $('.ui_device').find('.frame').css({'scale':val});
            $('.typography').css({'opacity':val2});
            $('.ui_device').find('.intro').css({'opacity':val3});
            $('.ui_device').find('.ui_last').css({'opacity':val4});

            var useWrap = $('.app-use-wrap').position().top;

            if(st + deviceH*2 - 188 > useWrap){
                var ny = st + deviceH*2 - 188 - useWrap;
                $('.ui_device').css('top', -ny);
            }

            if(!isMobile){
                if(st > deviceY+15){
                    $('.ui_device').css('left','calc(50% - 7px)').addClass('fixed');
                }else{
                    $('.ui_device').css({'left':'','top':''}).removeClass('fixed');
                }                
            }

            if(strollTop == 0){
               $('.ui_device').css({'left':'','top':''}).removeClass('fixed');
            }

        }

        function scrollEvent(){
            if(isThinqApp){
                appMotion($('.brand-wrap').scrollTop());                
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
        
        $window.trigger('breakpointchange');
        $window.trigger('resizeend');


    });
});
    