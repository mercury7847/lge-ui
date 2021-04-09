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
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
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

        // 웨일 결합처리
        $('.foot-cont').find('.menu-opener').on('click', function(e){
            $('html,body').scrollTop(maxLens*winHeight);
        });

        $('.scene').css({'overflow':'hidden'});

        /* 메인테스트*/
        $('html').css({'overflow':'hidden'});
        
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
                    $('.benefit-list-slide').vcCarousel({                        
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

                $('html, body').stop(true).animate({
                    scrollTop: scrollTopData
                }, speedTime, 'easeInOutQuart',  function() { 
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

                _setCenterImage($(this).find('.img'), winWidth, itemHeight, imageSize.width, imageSize.height);
                totalHeight += itemHeight;


                $(this).find('.img > .video').each(function() {
                    updateVideo(this);
                });
                            
            });  

            /* 메인 테스트 */

            $contentWrap.css({'overflow':'auto','height':winHeight});
            $('.contents').css({'overflow':'hidden', 'height':totalHeight});
            
            if(idx!==undefined){
                currentPage = idx;
                moveScene(currentPage,0);
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

                }, 100);
            }
            
        }

        $window.on('floatingTop', function(){
            render(0);
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


        $window.trigger('breakpointchange');
        window.resizeScene = render;      

    });
});