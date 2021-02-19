$(function() {

    $.extend( $.easing,{
        def: 'easeOutQuad',
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    });
    

    vcui.require(['ui/carousel','libs/jquery.transit.min'], function () {     

        $('.signature-theme .ui_carousel_slider').vcCarousel({
            slidesToShow: 1,
            slidesToScroll: 1
        });

        $('.signature-showroom .ui_carousel_slider').vcCarousel({
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

        
        var $window   = $(window);
        var $contentWrap = $('.signature-wrap');
        var aniSpeed = 800;
        var wheelAniInterval = null;
        var wheelInterval = null;            
        var canScroll = true;
        var winHeight = $window.height();            
        var currentStep = 0;
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $('.signature-hero').children().add('.signature-wrap');
        var stepLens = 0;
        var posArr = [];
        var wheelArr = [];
        var regex = /^data-step-(-?\d*)/;

        $('.signature-hero').children().css({'overflow':'hidden'});
        $('html').css({'overflow':'hidden'});
        $('.container').css({'overflow':'visible', 'height':'auto'});     
        
        $('.next-arr').on('a', function(e){
            e.preventDefault();
        });

        
        

        $window.on('floatingTop', function(){
            render(0);
        });     

        // element 애니메이션 스탭
        function moveStep(step){

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
                if(i==0){
                    $target.transit(item.transit, function(){
                        currentStep = step;
                        canScroll = true;
                    });  
                }else{
                    $target.transit(item.transit);  
                }                               
            }
        }

        // 휠 애니메이션 스탭
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


        // 씬으로 이동
        function moveScene(idx, step, speed){

            if(!canScroll) return;  
            canScroll = false;   
            $contentWrap.scrollTop(0); 

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
        document.addEventListener('wheel', function(e){

            var curTime = new Date().getTime();
            if(typeof prevTime !== 'undefined'){
                var timeDiff = curTime-prevTime;
                if(timeDiff > 40){
                    if(currentStep == stepLens){
                        var st = $contentWrap.scrollTop();
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

        // 터치 이벤트 처리
        $(document).on('touchstart touchend touchcancel', function(e) {

            var data = _getEventPoint(e);
            if (e.type == 'touchstart') {
                touchSy = data.y;
            } else {

                if(currentStep == stepLens){
                    if(wheelInterval) clearTimeout(wheelInterval);
                    wheelInterval = setTimeout(function(){
                        var st = $contentWrap.scrollTop();
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

        // 스탭 이전 스타일 적용
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

        // 비디오 태그 생성
        function updateVideo(video) {
            var $target   = $(video||this),
                $wrap     = $target.closest('.img'),
                $image    = $wrap.find('img'),
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


        // 렌더링
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

            stepLens = wheelArr.length-1;                    
            $contentWrap.css({'overflow':'auto','height':winHeight});
            $('.contents').css({'overflow':'hidden', 'height':totalHeight});

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
        
        // 탭이동 이벤트 처리
        $('.signature-tabs .ui_tab').on('tabchange', function(e, data){
            $contentWrap.scrollTop(0); 
        });


        $(document).on('click', 'a', function(e){
            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#' || href == '#n'){
                e.preventDefault();
            }else{
                if (href && /^(#|\.)\w+/.test(href)) {                    
                    var $compareTarget = $('.signature-tabs .ui_tab').find('a[href="'+href+'"]');
                    if($compareTarget[0] != e.currentTarget) {
                        $('.signature-tabs .ui_tab').vcTab('selectByName', href);
                    }
                }                
            }      
        });

        // 앱 대응시 주석처리
        $window.on('resizeend', function(e){
            render();
        });
        $window.trigger('resizeend');
        // 앱 대응시 주석처리 end

        window.resizeScene = render;



    });
});
    