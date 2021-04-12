$(function() {

    $.extend($.easing, {
        def: 'easeOutQuad',
        easeInOutQuart: function(x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    });


    vcui.require(['ui/carousel', 'ui/lazyLoaderSwitch', 'libs/jquery.transit.min'], function() {

        var $sigTheme = $('.objet-theme .ui_carousel_slider');
        $sigTheme.vcCarousel({
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: 'progressive'
        });

        var $sigShowRoom = $('.objet-showroom .ui_carousel_slider');
        $sigShowRoom.vcCarousel({
            settings: "unslick",
            lazyLoad: 'progressive',
            responsive: [{
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
        $('body').vcLazyLoaderSwitch('reload', $sigTheme);
        $('body').vcLazyLoaderSwitch('reload', $sigShowRoom);

        var isApplication = isApp();
        var $window = $(window);
        var $contentWrap = $('.objet-wrap');
        var aniSpeed = vcui.detect.isMobile ? 500 : 800;
        var wheelAniInterval = null;
        var wheelInterval = null;
        var canScroll = true;
        var winHeight = $window.height();
        var currentStep = 0;
        var currentPage = 0;
        var touchSy = 0;
        var $scenes = $('.objet-hero').children().add('.objet-wrap');
        var stepLens = 0;
        var pageLens = $scenes.length - 1;
        var posArr = [];
        var wheelArr = [];
        var regex = /^data-step-(-?\d*)/;

        // 웨일 결합처리
        $('.foot-cont').find('.menu-opener').on('click', function(e) {
            $('html,body').scrollTop(pageLens * winHeight);
        });


        // 화면 100% 채우기
        $('html,body').css({ 'overflow': 'hidden', 'height': '100%' });
        // 모달창 닫기시 overflow:hidden 무시함.
        $('body').addClass('ignore-overflow-hidden');



        $('.objet-hero').children().css({ 'overflow': 'hidden' });
        //$('html').css({ 'overflow': 'hidden' });
        $('.container').css({ 'overflow': 'visible', 'height': 'auto' });

        $('.next-arr').on('click', 'a', function(e) {
            e.preventDefault();
            var step = $(e.currentTarget).data('currentStep');
            if (step) currentStep = step;
            wheelScene(1);
        });


        $window.on('floatingTop', function() {
            // currentPage = 0;
            // currentStep = 1;
            // setBeforeCss(currentStep, wheelArr);
            // moveScene(currentPage,currentStep,0);

            currentPage = 0;
            currentStep = 1;
            setBeforeCss(currentStep);
            moveScene(currentPage, currentStep, 0);


        });

        // element 애니메이션 스탭
        function moveStep(step) {

            if (!canScroll) return;
            if (currentStep == step) return;
            canScroll = false;

            var arr = wheelArr[step];
            if (!vcui.isArray(arr)) {
                currentStep = step;
                //console.log(currentStep);
                canScroll = true;
                return;
            }

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                var $target = $(item.target);

                var isDisplay;
                var obj = $.extend({}, item.transit);

                if (obj['display'] !== undefined) {
                    isDisplay = obj['display'];
                    delete obj['display'];
                }

                if (isDisplay !== undefined && isDisplay !== 'none') {
                    $target.css('display', isDisplay);
                }

                if (i == 0) {
                    $target.transit(obj, aniSpeed, function() {
                        if (isDisplay === 'none') {
                            $target.css('display', isDisplay);
                        }
                        currentStep = step;
                        canScroll = true;

                    });
                } else {
                    $target.transit(obj, aniSpeed, function() {
                        if (isDisplay === 'none') {
                            $target.css('display', isDisplay);
                        }
                    });
                }
            }
        }

        // 휠 애니메이션 스탭
        function wheelScene(delta) {
            if (!canScroll) return;
            var nextStep = (delta < 0) ? -1 : 1;
            nextStep = nextStep + currentStep;
            nextStep = Math.max(Math.min(nextStep, stepLens), 0);
            if (currentStep == nextStep) return;

            var arr = wheelArr[nextStep];

            if (vcui.isArray(arr)) {
                var pageId = arr[0]['pageId'];
                if (currentPage == pageId) {
                    moveStep(nextStep);
                } else {
                    moveScene(pageId, nextStep);
                }

            } else {
                moveScene(arr, nextStep);
            }

        }

        var $html = (vcui.detect.isSafari || vcui.detect.isMobileDevice) ? $('body') : $('html, body');


        // 씬으로 이동
        function moveScene(idx, step, speed) {

            if (!canScroll) return;
            canScroll = false;
            $contentWrap.scrollTop(0);

            $('html').addClass('sceneMoving');
            if (speed == undefined) speed = aniSpeed;
            //var scrollTopData = winHeight * idx;
            var scrollTopData = $(window).height() * idx;
            $scenes.removeClass('active').eq(idx).addClass('active');

            if (wheelAniInterval) clearTimeout(wheelAniInterval);
            wheelAniInterval = setTimeout(function() {
                if (!$('html').hasClass('sceneMoving')) {
                    return false;
                }

                var speedTime = currentPage < idx ? parseInt(speed) : parseInt(speed) - 300;
                speedTime = Math.max(0, speedTime);

                $('html, body').stop(true).animate({
                    scrollTop: scrollTopData
                }, speedTime, 'easeInOutQuart', function() {
                    canScroll = true;


                    var hasTop = $('.floating-menu.top').hasClass('call-yet');
                    if (currentPage == 0) {
                        if (!hasTop) {
                            $(window).trigger('floatingTopHide');
                            $('.floating-menu.top').addClass('call-yet');
                        }
                    } else {
                        if (hasTop) {
                            $(window).trigger('floatingTopShow');
                            $('.floating-menu.top').removeClass('call-yet');
                        }
                    }

                    currentPage = idx;
                    moveStep(step);
                    $('html').removeClass('sceneMoving');
                    $scenes.removeClass('on').eq(idx).addClass('on');
                    $("html,body").scrollTop(scrollTopData);
                    $scenes.each(function() {
                        if ($(this).find('video').length != 0) {
                            if ($(this).hasClass('on')) {
                                $(this).find('video')[0].play();
                            } else {
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
        if (!vcui.detect.isMobileDevice) {

            document.addEventListener('wheel', function(e) {

                var open = $('#layerSearch').hasClass('open');
                if (!open) {
                    var curTime = new Date().getTime();
                    if (typeof prevTime !== 'undefined') {
                        var timeDiff = curTime - prevTime;
                        if (timeDiff > 35) {
                            if (currentStep == stepLens) {
                                var st = $contentWrap.scrollTop();
                                if (st <= 0 && e.deltaY < 0) {
                                    wheelScene(-1);
                                }
                            } else {
                                if (e.deltaY > 0 || e.deltaY < 0) {
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

                if (currentStep == stepLens) {
                    if (wheelInterval) clearTimeout(wheelInterval);
                    wheelInterval = setTimeout(function() {
                        var st = $contentWrap.scrollTop();
                        if (st <= 0 && touchSy - data.y < -80) {
                            wheelScene(-1);
                        }
                    }, 100);

                } else {

                    if (touchSy - data.y > 80) {
                        wheelScene(1);
                    } else if (touchSy - data.y < -80) {
                        wheelScene(-1);
                    }
                }

            }
        });


        function _stringToObj(str) {

            var regex = /(.*)\:(.*)/;
            var arr = str.replace(/ /gi, "").split(',');
            var obj = {};

            for (var i = 0; i < arr.length; i++) {
                var match = arr[i].match(regex);
                if (match !== null) {
                    obj[match[1]] = match[2] == "''" ? '' : match[2];
                }
            }

            return obj;
        }

        function _getEventPoint(ev, type) {
            var e = ev.originalEvent || ev;
            if (type === 'end' || ev.type === 'touchend') e = e.changedTouches && e.changedTouches[0] || e;
            else e = e.touches && e.touches[0] || e;
            return {
                x: e.pageX || e.clientX,
                y: e.pageY || e.clientY
            };
        }

        function _findIdx(py) {
            for (var i = 0; i < posArr.length; i++) {
                if (posArr[i] > py) {
                    return i;
                }
            }
            return 0;
        }

        function _findStep(page) {

            for (var i = 0; i < wheelArr.length; i++) {
                var arr = wheelArr[i];
                if (vcui.isArray(arr)) {
                    var pageId = arr[0]['pageId'];
                    if (pageId == page) return i;
                } else {
                    if (arr == page) return i;
                }
            }
            return 0;
        }

        // 스탭 이전 스타일 적용
        function setBeforeCss(step) {
            for (var k = 0; k < step; k++) {
                var arr = wheelArr[k];
                if (vcui.isArray(arr)) {
                    for (var j = 0; j < arr.length; j++) {
                        var obj = arr[j];
                        var target = obj['target'];
                        var transit = obj['transit'];
                        $(target).css(transit);
                    }
                }
            }
        }




        // 렌더링
        var render = function(page) {

            if (wheelAniInterval) clearTimeout(wheelAniInterval);
            if (wheelInterval) setTimeout(wheelInterval);
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
                $(this).find('*').each(function(j) {
                    var attributeIndex = 0;
                    var attributesLength = this.attributes.length;
                    var cssVal = null;

                    for (; attributeIndex < attributesLength; attributeIndex++) {
                        var attr = this.attributes[attributeIndex];
                        var match = attr.name.match(regex);
                        if (match === null) continue;
                        if (attributeIndex == 1) cssVal = _stringToObj(attr.value);
                        arr.push({
                            sort: match[1],
                            target: this,
                            transit: _stringToObj(attr.value),
                            pageId: i
                        });
                    }
                    if (cssVal) $(this).css(cssVal);

                });

                arr.sort(function(a, b) {
                    return parseInt(a.sort) - parseInt(b.sort);
                });

                if (arr.length > 0) {
                    var fArr = [arr[0]];
                    for (var k = 0; k < arr.length; k++) {
                        var obj1 = arr[k];
                        var obj2 = arr[k + 1];
                        if (obj2) {
                            if (obj1.sort !== obj2.sort) {
                                wheelArr.push(fArr);
                                fArr = [obj2];
                            } else {
                                fArr.push(obj2);
                            }
                        } else {
                            wheelArr.push(fArr);
                        }
                    }
                } else {
                    wheelArr.push(i);
                }

                if (i == 0) {
                    itemHeight = winHeight - prevAllHeight;
                } else {
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

            stepLens = wheelArr.length - 1;
            let fixH;
            if ($(window).width() < 768) {
                fixH = 0;
            } else {
                fixH = 16;
            }

            let sceneH = winHeight - $(".header").height() - $(".mobile-nav-wrap").height() + fixH;
            $contentWrap.css({ 'overflow': 'auto', 'height': winHeight });
            //$('.contents').css({ 'overflow': 'hidden', 'height': totalHeight });
            $('.scene01').css({ 'overflow': 'hidden', 'height': sceneH });

            if (page !== undefined) {
                currentPage = page;
                currentStep = _findStep(currentPage);
                setBeforeCss(currentStep, wheelArr);
                moveScene(currentPage, currentStep, 0);
            } else {
                currentPage = _findIdx($('html, body').scrollTop());
                currentStep = _findStep(currentPage);
                setBeforeCss(currentStep);
                moveScene(currentPage, currentStep, 0);
            }
        }

        // 탭이동 이벤트 처리
        // 탭이동 이벤트 처리
        $('.objetcollection-tabs .ui_tab').on('tabchange', function(e, data) {
            //오류 처리
            $('html,body').scrollTop(pageLens * winHeight);
            $contentWrap.scrollTop(0);
        });


        $(document).on('click', 'a', function(e) {

            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");

            if (href == '#' || href == '#n') {
                e.preventDefault();
            } else {
                if (href && /^(#|\.)\w+/.test(href)) {

                    e.preventDefault();

                    var $compareTarget = $('.objetcollection-tabs .ui_tab').find('a[href="' + href + '"]');
                    if ($compareTarget[0] != e.currentTarget) {
                        if (currentPage !== pageLens) {
                            moveScene(pageLens, stepLens, 0);
                        }
                        $('.objetcollection-tabs .ui_tab').vcTab('selectByName', href);
                        if (href == '#content') {
                            $('.objetcollection-tabs .ui_tab').find('a').eq(0).focus();
                        }
                    }
                }
            }
        });

        // 접근성 탭 이동시 화면처리
        // $(document).on('focusin', function(e) {

        //     if ($.contains($('.Objet-wrap')[0], e.target)) {
        //         currentPage = pageLens;
        //         currentStep = stepLens;
        //     } else if ($.contains($('.Objet-hero')[0], e.target)) {
        //         // currentPage = 0;
        //         // currentStep = 0;
        //     }

        // });

        //전시기록 더보기...
        // var $artGuide = $('.Objet-section.art-guide');
        // var $artMoreBtn = $artGuide.find('button.btn-moreview');
        // $artGuide.find('.art-guide-list > li:gt(5)').hide();

        // var artGuideLen = $artGuide.find('.art-guide-list > li').length;
        // if (artGuideLen < 6) $artMoreBtn.hide();


        // $artMoreBtn.on('click', function(e) {
        //     e.preventDefault();

        //     var $span = $(this).find('span').eq(0);
        //     var toggleTxt = $(this).data('toggleTxt');
        //     var txt = $span.text();
        //     $(this).data('toggleTxt', txt);

        //     if ($(this).hasClass('fold')) {
        //         $(this).removeClass('fold');
        //         $span.text(toggleTxt);
        //         $artGuide.find('.art-guide-list > li:gt(5)').hide();
        //     } else {
        //         $(this).addClass('fold');
        //         $span.text(toggleTxt);
        //         $artGuide.find('.art-guide-list > li').show();
        //     }
        // });


        if (isApplication) {
            render();
            $('header').find('.header-bottom').addClass('app-btm');
        } else {
            // 앱 대응시 주석처리
            $window.on('resizeend', function(e) {
                render();
            });
            $window.trigger('resizeend');
            // 앱 대응시 주석처리 end
        }

        // 시작시 한 스탭 이동시킴.
        // setTimeout(function() {
        //     if (currentStep < 1) wheelScene(1);
        // }, 1000);
        $(window).load(function() {
            $(".floating-menu.top button").trigger("click");


            var sOriginImgUrl = window.location.href;
            var arSplitUrl = sOriginImgUrl.split("?"); //   "#" 로 전체 url 을 나눈다
            var nArLength = arSplitUrl.length;
            var targetName = arSplitUrl[nArLength - 1]; // 나누어진 배열의 맨 끝이 타겟
            console.log("targetName", targetName);
            if (targetName == "objet-cont1" || targetName == "objet-cont2" || targetName == "objet-cont3" || targetName == "objet-cont4" || targetName == "objet-cont5") {

                setTimeout(function() {
                    $('.next-arr').trigger("click"); //wheelScene(1);
                    setTimeout(function() {
                        $("[aria-controls='" + targetName + "']").trigger("click");
                    }, 1000);
                }, 500);


            }
            $("[aria-controls='objet-cont4']").on("click", function() {
                setTimeout(function() {
                    var swiper = new Swiper('.gallery_top_list', {
                        //autoHeight: true, //enable auto height
                        spaceBetween: 0,
                        autoplay: {
                            delay: 2500,
                            disableOnInteraction: false,
                        },
                        loop: true,

                        pagination: {
                            el: '.gallery_top_list .swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    });
                }, 100);

            })




        });


        window.resizeScene = render;

    });
});