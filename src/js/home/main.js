$(function () {
            
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


    vcui.require(['ui/scrollNavi','ui/smoothScroll'], function () {
        // 플로우배너

        $('.ui_carousel_slider_banner1').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $('.ui_carousel_slider_banner2').find('.flow-bar').css({
            'transition': 'all 0.5s ease-out'
        });

        $('.ui_carousel_slider_banner1').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){
            
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
                        //autoplay: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerMode: true,
                        // centerPadding: '13.5%',
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

        $('.ui_carousel_slider_banner2').on('carouselinit carouselresize carouselafterchange', function(e, carousel, index){
            
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
                        //autoplay: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerMode: true,
                        // centerPadding: '13.5%',
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
    });



    var $window   = $(window);
    var aniSpeed = 800;
    var wheelAniInterval = null;
    var wheelInterval = null;            
    var canScroll = true;
    var winHeight = $window.height();            
    var currentPage = 0;
    var touchSy = 0;
    var $scenes = $('.scene').add('.section-cover');
    var maxLens = $scenes.length - 1;
    var posArr = [];

    $('.scene').css({'overflow':'hidden'});
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

    $window.on('breakpointchange', function(e){

        var data = window.breakpoint;
        var isRecom = $('.recom-list-slide').data('ui_carousel');
        var isBenefit = $('.benefit-list-slide').data('ui_carousel');

        if(data.name == 'mobile'){

            if(!isRecom){
                $('.recom-list-slide').vcCarousel({                        
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            }

            if(!isBenefit){
                $('.benefit-list-slide').vcCarousel({                        
                    infinite: false,
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

    })

    $window.on('resizeend', function(e){
        render();
    });

    $window.on('floatingTop', function(){
        render(0);
    });         

    function wheelScene(delta) {

        if(!canScroll) return; 
        var nextIndex = (delta < 0) ? -1 : 1;
        nextIndex = nextIndex + currentPage;
        nextIndex = Math.max(Math.min(nextIndex, maxLens), 0);
        if(currentPage == nextIndex) return;
        moveScene(nextIndex);
    }

    function moveScene(idx, speed){

        if(!canScroll) return;  
        canScroll = false;   
        $('.section-cover').scrollTop(0);                
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
            }, speed, 'easeInOutQuart',  function() { // easeInOutQuad, easeInOutQuart, easeInOutCubic
                canScroll = true
                currentPage = idx;                        
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

    document.addEventListener('wheel', function(e){

        var curTime = new Date().getTime();
        if(typeof prevTime !== 'undefined'){
            var timeDiff = curTime-prevTime;
            if(timeDiff > 200){
                if(currentStep == stepLens){
                    var st = $('.section-cover').scrollTop();
                    if(st==0 && e.deltaY<0){
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

    });

    
    
    $(document).on('touchstart touchend touchcancel', function(e) {

        var data = _getEventPoint(e);
        if (e.type == 'touchstart') {
            touchSy = data.y;
        } else {

            if(currentPage == maxLens){
                if(wheelInterval) clearTimeout(wheelInterval);
                wheelInterval = setTimeout(function(){
                    var st = $('.section-cover').scrollTop();
                    if(st==0 && touchSy - data.y < -80){
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

    function setCenterImage (target, boxW, boxH, targetW, targetH) {

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
        var idx = 0;
        for(var i=0; i<posArr.length; i++){
            if(posArr[i]>py){
                idx = i;
                break;
            }
        }
        return idx;                
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

    function render(idx){

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
                       
        var $prevTarget = $('.container').prevAll(':visible:first');
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
            
            var imageSize = {
                //<img data-natural-width = '1980' data-natural-height = '1080'>
                width : $(this).find('img').data('naturalWidth')? $(this).find('img').data('naturalWidth') : 1920, 
                height : $(this).find('img').data('naturalHeight')? $(this).find('img').data('naturalHeight') : 1080
            };

            setCenterImage($(this).find('.img'), winWidth, itemHeight, imageSize.width, imageSize.height);
            totalHeight += itemHeight;


            $(this).find('.img > .video').each(function() {
                updateVideo(this);
            });

                           
        });  

        
        $('.section-cover').css({'overflow':'auto','height':winHeight});
        $('.contents').css({'overflow':'hidden', 'height':totalHeight});

        if(idx!==undefined){
            currentPage = idx;
            moveScene(currentPage,0);
        }else{
            setTimeout(function(){
                currentPage = currentPage>0? currentPage : _findIdx($('html, body').scrollTop());
                moveScene(currentPage,0);
            }, 100);
        }
        
    }

    $window.trigger('breakpointchange');
    $window.trigger('resizeend');


});
