//통합앱 구축팀 요청...통합앱 식별 스크립트
var isApp = function(){
    return /LGEAPP|lgeapp\/[0-9\.]+$/.test(navigator.userAgent);
}
var goAppLink = function() {
    var path = location.pathname;
    return vcui.detect.isIOS ? 'lgeapp://goto?weblink='+path : 'lgeapp://goto?weblink='+path+'#Intent;scheme=lgeapp;package=kr.co.lge.android.dev;end;'
}
;(function(global){

    if(global['lgkorUI']) return;
    // console.log("lgkorUI start!!!");

    var isApplication = isApp();
    var isAndroid = vcui.detect.isAndroid;
    var isIOS = vcui.detect.isIOS;
    var isMobileDevice = vcui.detect.isMobileDevice; 

    if(vcui.detect.isMac) $('html').addClass('mac');
    if(isApplication) $('html').addClass('app');
    if(isMobileDevice) $('html').addClass('mdevice');


    window.onload = function(){
        vcui.require([
            'ui/lazyLoaderSwitch',
            'ui/lazyLoader'
        ], function () {
            var $b = $('body');
            $b.vcLazyLoaderSwitch();
            $b.vcLazyLoader();
        });
    };

    var alertTmpl =  '<article id="laypop" class="lay-wrap {{typeClass}}" style="display:block;" role="alert">\n'+
        '   <header class="lay-header">\n'+
        '       <h1 class="tit">{{#raw title}}</h1>\n'+
        '   </header>\n'+
        '   <section class="lay-conts ui-alert-msg">\n'+
        '   </section>\n'+
        '   <div class="btn-wrap laypop">\n'+
        '       <button type="button" class="btn ui_modal_close" data-role="ok"><span>{{okBtnName}}</span></button>\n'+
        '   </div>\n'+
        '</article>';



    var confirmTmpl =  '<article id="laypop" class="lay-wrap {{typeClass}}" style="display:block;" role="confirm">\n'+
        '   {{#if title}}'+
        '   <header class="lay-header">\n'+
        '       <h1 class="tit">{{#raw title}}</h1>\n'+
        '   </header>\n'+
        '   {{/if}}'+
        '   <section class="lay-conts ui-alert-msg">\n'+
        '   </section>\n'+
        '    <section class="lay-conts">\n'+
        '        <h6 class="ui-alert-msg"></h6>\n'+
        '    </section>\n'+
        '    <div class="btn-wrap laypop">\n'+
        '        <button type="button" class="btn gray ui_modal_close" data-role="cancel"><span>{{cancelBtnName}}</span></button>\n'+
        '        <button type="button" class="btn" data-role="ok"><span>{{okBtnName}}</span></button>\n'+
        '    </div>\n'+
        '</article>';


    $.fn.buildCommonUI = function () {
        vcui.require([
            'ui/selectbox',
            'ui/calendar',
            'ui/accordion',
            'ui/carousel',
            'ui/modal',
            'ui/tab',       
            "ui/videoBox",
            "ui/youtubeBox",
            "ui/dropdown",
            "ui/textControl",
            "ui/fileInput",
            "ui/radioShowHide",
            'ui/inputClearButton',
            "ui/starRating",
            "ui/tooltipTarget",
            "ui/sticky",
            "ui/formatter",
            "ui/scrollNavi",
            "ui/smoothScroll",
            "ui/smoothScrollTab",
            "ui/checkboxAllChecker",
            //"ui/imageSwitch"
            'ui/lazyLoaderSwitch',
            'ui/lazyLoader'
        ], function () {    
            // console.log("buildCommonUI!!!!");

            //this.vcImageSwitch();
            if(location.hostname == "cms50.lge.co.kr") {
                // console.log('lazy cms50');
                this.vcLazyLoaderSwitch();
                this.vcLazyLoader();
            }

            this.find('.ui_calendar').vcCalendar();
            this.find('.ui_accordion').vcAccordion();        
            this.find('.ui_dropdown').vcDropdown();
            this.find('.ui_tab').vcTab();
            this.find('.ui_carousel').vcCarousel();
            this.find('.animation-box').vcVideoBox();
            this.find('.youtube-box').vcYoutubeBox();
            this.find('.ui_textcontrol').vcTextcontrol();
            this.find('.ui_fileinput').vcFileinput();
            this.find('.ui_radio_visible').vcRadioShowHide();
            this.find('.ui_input_clearbutton').vcInputClearButton();
            this.find('.ui_star_rating').vcStarRating();
            this.find('.ui_tooltip-target').vcTooltipTarget();
            
            //this.find('.ui_card_number').vcFormatter({format: "card", maxlength:16});
            
            this.find('.ui_smooth_scroll').vcSmoothScroll();
            this.find('.ui_scroll_navi').vcScrollNavi();

            this.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

            this.find('.ui_sticky').vcSticky();

            this.find('.ui_all_checkbox').vcCheckboxAllChecker();

            this.find('.ui_selectbox').vcSelectbox({
                events:{
                    selectboxtoggle: function(e){
                        var selectwrap = $(e.currentTarget).siblings('.ui-selectbox-wrap');
                        var isOpen = selectwrap.hasClass('on');
                        if(isOpen){
                            var selectlist = selectwrap.find("> .ui-selectbox-list");
                            var margintop = selectlist.css('margin-top');
                            if(parseInt(margintop) < 0){
                                if(!selectwrap.hasClass('type_up')) selectwrap.addClass('type_up')
                            }
                        } else{
                            selectwrap.removeClass("type_up");
                        }
                    }
                }
            });

            this.find('.ui_wide_slider').vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: true,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                buildDots:false,
                dotsSelector:'.ui_wideslider_dots',
                slidesToShow: 1,
                slidesToScroll: 1
            });
            this.find('.ui_wide_dot_slider').vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: true,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
            this.find('.ui_carousel_4_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 4,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 4,
                            slidesToShow: 4
                        }
                    }
                ]
            });
            this.find('.ui_carousel_3_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 3,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: true,
                            slidesToScroll: 1,
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    }
                ]
            });
            this.find('.ui_carousel_1_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                // responsive: [
                //     {
                //         breakpoint: 768,
                //         settings: {
                //             variableWidth: true,
                //             centerMode: true
                //         }
                //     }
                // ]
            });

            lgkorUI.resetFlexibleBox();
        }.bind(this));

        return this;
    };

    

    /* 

    vcui.require.config({
        paths: {
            'jquery.transit': 'libs/jquery.transit'
        },
        waitSeconds: 15,
        onNodeCreated: function (node) {
            node.charset = 'euc-kr';
        }
    });
    

    // ajax 로 통신할때는 기본 케릭터셑이 utf-8 로 되어있음.
    // 따라서, euc-kr 로 설정된 서버에서 ajax 를 이용하여 한글로된 데이터를 전달하게 되면 글씨가 깨짐.
    // 이때는 아래와 같이 캐릭터셑을 euc-kr 로 설정해 주면 해결이 됩니다

    var pathname = location.pathname;
    if (pathname.indexOf('/html/') > -1) {
        console.log(pathname);
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded;charset=euc-kr',
            beforeSend: function (xhr) {
                xhr.overrideMimeType('application/x-www-form-urlencoded;charset=euc-kr');
            }
        });
    } 
    */
    
    $.holdReady(true);
    
    global['lgkorUI'] = {
        COMPARE_KEY: "prod_compare",
        CAREPLANER_KEY: "care_planer",
        CAREPLANER_ID: "putitem_list",
        CAREPLANER_PRICE: "putitem_price",
        MOBILE_CHECK_WIDTH: 768,
        STICKY_MODULES:[],
        NO_IMAGE: "/lg5-common/images/icons/noimage.svg",
        NO_IMAGE_MODEL_NAME: "/lg5-common/images/icons/noimage-modelName.svg",
        RECENT_PROD_COOKIE_NAME: "myRecentProduct", //최근 본 제품 쿠키
        COMPARE_COOKIE_NAME: "LG5_CompareCart", //비교하기 쿠키
        HOMEBREW_CHECK_COOKIE_NAME: "lgeAgeCheckFlag", //홈브류 연령체크 쿠키
        INTERGRATED_SEARCH_VALUE: "intergratedSearchValue",
        MAX_SAVE_RECENT_KEYWORD: 5, //최근 검색어 저장 최대수
        MAX_SAVE_RECENT_PRODUCT: 10, //최근 본 제품 저장 최대수,
        SEARCH_AUTOCOMPLETE_MIN_LENGTH: 1, // 검색 자동 완성 기능 실행 최소 글자수
        SEARCH_AUTOCOMPLETE_TIMER: 300, // 검색 자동 완성 기능 키보드 클릭 타이머
        DOMAIN_LIST:["www.lge.co.kr", 'wwwstg.lge.co.kr', 'wwwdev50.log.co.kr'],
        init: function(){
            var self = this;

            self._bindErrBackEvent();
            self._addImgOnloadEvent();
            self._preloadComponents();
            self._addTopButtonCtrl();
            self._createMainWrapper();
            self._switchLinker();

            var lnbContents = $('.contents .lnb-contents');
            if(lnbContents.length) lnbContents.attr('id', 'content');
            else $('body').find('.container').attr('id', 'content');
        },

        _addImgOnloadEvent: function(){
            var self = this;
            $('img').not('[data-pc-src]').on('error', function(e){
                var img = this;
                img.onerror = null;
                if ( !img.complete || !img.naturalWidth ) {
                    img.src = self.NO_IMAGE;
                    img.classList.add('no-img');
                }
                /*
                $(this).off('error');
                $(this).attr('src', self.NO_IMAGE);
                $(this).addClass('no-img');
                */
            });
        },

        addImgErrorEvent: function(img){
            var self = this;
            img.onerror = null;
            if ( !img.complete || !img.naturalWidth ) {
                img.src = self.NO_IMAGE;
                img.classList.add('no-img');
            }
        },

        addModelNameImgErrorEvent: function(img){
            var self = this;
            img.onerror = null;
            $(img).attr('src', self.NO_IMAGE_MODEL_NAME);
            $(img).addClass('no-img');
        },


        _createMainWrapper: function(){
            if ( $('.container-fluid:has(.header)').length && !$('main').length ) {
                //$('.container-fluid:has(.header) ~ div,.container-fluid.iw_section:has(.header) ~ section').not(':has(.footer-box)').wrapAll('<main></main>');
            }
        },
    
        // 주요 컴포넌트를 미리 로드
        _preloadComponents: function () {
            var self = this;

            vcui.require([  
                //'helper/responsiveImage',
                //'helper/breakpointDispatcher',
                'ui/spinner',         
                'ui/selectbox',
                'ui/calendar',
                'ui/accordion',
                'ui/carousel',
                'ui/modal',
                'ui/tab',       
                "ui/videoBox",
                "ui/youtubeBox",
                "ui/textControl",
                "ui/fileInput",
                "ui/radioShowHide",
                'ui/inputClearButton',
                "ui/starRating",
                "ui/tooltipTarget",
                "ui/toast",
                "ui/sticky",
                "ui/formatter",
                "ui/scrollNavi",
                "ui/smoothScroll",
                "ui/smoothScrollTab",
                'ui/imageFileInput',
                'common/header', 
                'common/footer',  
            ], function (/*ResponsiveImage,*/ /*BreakpointDispatcher*/) {
                
                // new BreakpointDispatcher({
                //     matches: {
                //         '(min-width: 768px)' : function(mq) {
                //             var data;
                //             if (mq.matches) {
                //                 // pc
                //                 data = {
                //                     name: 'pc',
                //                     min: 768,
                //                     max: 999999,
                //                     isMobile: false,
                //                     isPc: true,
                //                     prev: window.breakpoint || {}
                //                 };
                                
                //             } else {
                //                 // mobile
                //                 data = {
                //                     name: 'mobile',
                //                     min: 0,
                //                     max: 767,
                //                     isMobile: true,
                //                     isPc: false,
                //                     prev: window.breakpoint || {}
                //                 };
                //             }
    
                //             window.breakpoint = data;
                //             $(window).data('breakpoint', data).trigger('breakpointchange', data);
                //         }
    
                //         /* 
                //         '(min-width : 769px) and (max-width : 1599px)' : function(mq){
                //         },
                //         '(min-width : 1600px)' : function(mq){
                //         } 
                //         */
                //     }
                // }).start();     
                
                /*
                var breakpoint = {
                    mobile: 768,
                    pc: 100000
                }
                
                new ResponsiveImage('body', breakpoint);
                */
                
                var $doc = $(document);                       

                //resize 이벤트 발생 시 등록 된 이벤트 호출...
                $(window).on('resizeend', function(e){
                    self.resetFlexibleBox();
                });  
                self.resetFlexibleBox();

                /*
                self.resizeCallbacks = [];
                $(window).on("addResizeCallback", function(e, callback){
                    self.resizeCallbacks.push(callback);
                }).on('resize', function(e){
                    for(var idx in self.resizeCallbacks){
                        self.resizeCallbacks[idx].call();
                    }

                    //self._switchLinker();

                    self.resetFlexibleBox();
                });  
                self.resetFlexibleBox();
                */

                // 모달 기초작업 //////////////////////////////////////////////////////
                // 모달 기본옵션 설정: 모달이 들때 아무런 모션도 없도록 한다.(기본은 fade)
                vcui.ui.setDefaults('Modal', {
                    effect: 'fade',         // 모달이 뜰 때 사용할 효과
                    draggable: false,       // 모달을 드래그 할 수 있게 허용할 것인가..no
                    closeByEscape: false,   // esc키 누를 때 닫히게 할 것인가
                    closeByDimmed: false,   // dim 클릭시 닫히게 할 것인가
                    events: {
                        modalshown: function (e) {
                            // 모달이 뜨면 내부 컨텐츠 영역이 포커싱되도록 tabindex를 설정
                            //this.$('.pop_contents').attr('tabindex', 0);
                            //console.log(this);

                            // $('html, body').css({
                            //     overflow:"hidden"
                            // });
    
                            if(this.$('.ui_carousel').length>0){
                                this.$('.ui_carousel').vcCarousel('update');
                            }
                            if(this.$('.ui_smooth_scrolltab').length>0){
                                this.$('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                            }
                            if(this.$('.ui_smooth_scroll').length>0){
                                this.$('.ui_smooth_scroll').vcSmoothScroll('refresh');
                            }

                            if(this.$('.ui_pop_sticky').length > 0){
                                this.$('.ui_pop_sticky').vcSticky();
                            }
                        },
                        modalhidden: function(e){
                            var $modal = $(e.currentTarget);
                            var $opener = $modal.vcModal('getOpener');
                            if($opener) $opener.focus();

                            // $('html, body').css({
                            //     overflow:"visible"
                            // });
                        }
                    }
                });

                //캐로우셀
                vcui.ui.setDefaults('Carousel', {
                    events: {
                        carouselinit: function (e, data) {   
                            if(data.$el.find('.youtube-box').length>0) {                      
                                data.$el.find('.youtube-box').vcYoutubeBox();
                            }   
                            if(data.$el.find('.animation-box').length>0) {                      
                                data.$el.find('.animation-box').vcVideoBox();
                            }      
                        }
                    }
                });
    
                // 아코디언의 기본설정을 멀티오픈으로 설정해놓는다,
                vcui.ui.setDefaults('Accordion', {
                    singleOpen: false,
                    events: {
                        accordionexpand: function (e, data) {
                            // data.content.attr('tabindex', '0');                  
                            if(data.content.find('.ui_carousel').length>0) {                                
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }                            
                        }
                    }
                });
    
    
                // 탭의 기본설정을 설정해놓는다,
                vcui.ui.setDefaults('Tab', {
                    events: {
                        tabchange: function (e, data) {
                            if(data && data.content.find('.ui_carousel').length > 0) {
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }
                            if(data && data.content.find('.ui_smooth_scrolltab').length>0){
                                data.content.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                            }
                            if(data && data.content.find('.ui_smooth_scroll').length>0){
                                data.content.find('.ui_smooth_scroll').vcSmoothScroll('refresh');
                            }
                            if(data && data.content.find(".ui_carousel_slider").length > 0){
                                data.content.find('.ui_carousel_slider').vcCarousel('update');
                            }
                        }
                    }
                });
    
                $('header.header').vcHeader(); //헤더 모듈 적용...
                $('footer').vcFooter(); //푸터모듈 적용...

                $('body').buildCommonUI();
    
                $.holdReady(false); // ready함수 실행을 허용(이전에 등록된건 실행해준다.)
    
                // 모달이 열렸을 때 페이지 스크롤을 막기 위함 ////////////////////////////
                $doc.on('modalfirstopen modallastclose', function (e) {
    
                }).on('modalshown', function (e) {
                    // 모달이 뜰때 모달내부에 있는 공통 컴포넌트 빌드
                    $(e.target).buildCommonUI();
                    self.resetFlexibleBox();
                });
                //////////////////////////////////////////////////////////////////////
    
                // 아코디온이 펼쳐지거나 닫힐 때 레이아웃 사이즈가 변하기 때문에 resize이벤트를 강제로 발생시킨다.
                // $doc.on('accordionexpand accordioncollapse', vcui.delayRun(function (e) {
                //     $(window).triggerHandler('resize');
                // }, 200));
                ///////////////////////////////////////////////////////////////////////

                //공통 js-pop a태그 처리...
                $doc.on('click', '.js-popup', function(e){
                    e.preventDefault();

                    var target = this.getAttribute('href'),
                        popupWidth = parseInt(this.getAttribute('data-width')),
                        popupHeight = parseInt(this.getAttribute('data-height')),
                        screenWidth = parseInt(screen.width),
                        screenHeight = parseInt(screen.height),
                        intLeft = Math.floor((screenWidth - popupWidth) / 2),
                        intTop = Math.floor((screenHeight - popupHeight) / 2);
            
                    if (intLeft < 0) intLeft = 0;
                    if (intTop < 0) intTop = 0;
            
                    window.open(target, '_blank', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + intLeft + ',top=' + intTop + ',history=no,resizable=no,status=no,scrollbars=yes,menubar=no');
                });
                
                $('.toast-message').remove();
                $('body').append('<div class="toast-message"></div>');
                $('.toast-message').vcToast();
            });

            vcui.require([
                'helper/breakpointDispatcher'
            ], function (BreakpointDispatcher) {
                new BreakpointDispatcher({
                    matches: {
                        '(min-width: 768px)' : function(mq) {
                            var data;
                            if (mq.matches) {
                                // pc
                                data = {
                                    name: 'pc',
                                    min: 768,
                                    max: 999999,
                                    isMobile: false,
                                    isPc: true,
                                    prev: window.breakpoint || {}
                                };
                                
                            } else {
                                // mobile
                                data = {
                                    name: 'mobile',
                                    min: 0,
                                    max: 767,
                                    isMobile: true,
                                    isPc: false,
                                    prev: window.breakpoint || {}
                                };
                            }
    
                            window.breakpoint = data;
                            $(window).data('breakpoint', data).trigger('breakpointchange', data);
                        }
    
                        /* 
                        '(min-width : 769px) and (max-width : 1599px)' : function(mq){
                        },
                        '(min-width : 1600px)' : function(mq){
                        } 
                        */
                    }
                }).start();
            });

            self.loadKakaoSdkForShare();
        },

        //top 버튼 컨틀롤...
        _addTopButtonCtrl: function(){
            var self = this;
            $(window).scroll(function(){
                if(self.scrollTimer) {
                    clearTimeout(self.scrollTimer);
                }
                self.scrollTimer = setTimeout(function(){
                    if ($(this).scrollTop() > 100) {
                        $(window).trigger('floatingTopShow');
                        $('.floating-menu.top').removeClass('call-yet');
                    } else {
                        $(window).trigger('floatingTopHide');
                        $('.floating-menu.top').addClass('call-yet');
                    }
                }, 200);
            });
            
            $('.back-to-top button').on('click', function (e) {
                e.preventDefault();
                $(window).trigger('floatingTop');
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });
        },

        _switchLinker: function(){
            $('body').find('a[data-pc-href]').each(function(idx, item){
                var href = vcui.detect.isMobileDevice ? $(item).data("mHref") : $(item).data("pcHref");
                $(item).attr('href', href);
            });
        },

        //에러 페이지 되돌아가기
        _bindErrBackEvent: function(){
            var self = this;

            $('body').find('.contents.error-page .btns a').on('click', function(e){
                e.preventDefault();

                self._historyBack();
            })
        },

        _historyBack: function(){
            var self = this;
            
            var referrer = document.referrer;
            var index = -1;
            var leng = lgkorUI.DOMAIN_LIST.length;
            for(var i=0;i<leng;i++){
                index = referrer.indexOf(lgkorUI.DOMAIN_LIST[i]);
                if(index > -1){
                    break;
                }
            }
            
            if(index < 0) location.href = "/";
            else history.back();
        },

        resetFlexibleBox: function(){
            //리스트 height 재설정
            $('body').find('.ui_flexible_height').each(function(idx, item){
                var maxheight = 0;
                $(item).children().each(function(cdx, child){
                    var flexiblebox = $(child).find('.ui_flexible_box .ui_flexible_cont');
                    maxheight = Math.max(maxheight, flexiblebox.outerHeight(true));
                });

                $(item).find('.ui_flexible_box').height(maxheight);
            });
        },

        showLoading:function(msg, target){
            vcui.require(['ui/spinner'],function(){
                var str = msg? msg : '진행중입니다';
                var $target = target instanceof $ ? target : $(target);

                if($target[0]){
                    $target.vcSpinner({msg:str, position:'absolute'}).vcSpinner('spin'); 
                }else{
                    // $('html').addClass('dim');
                    $('body').append("<div class='loading_dim' style='position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.3);z-index:199999999'></div>")
                    $('body').vcSpinner({msg:str, position:'fixed'}).vcSpinner('spin'); 
                }
                
            }); 
        },

    
        hideLoading:function(target){
            vcui.require(['ui/spinner'],function(){

                var $target = target instanceof $ ? target : $(target);

                if($target[0]){
                    $target.vcSpinner('stop');
                }else{
                    $('.loading_dim').remove();
                    // $('html').removeClass('dim');
                    $('body').vcSpinner('stop');
                }
                
            });
        },

        confirm:function () {
            /**
             * 얼럿레이어
             * @memberOf vcui.ui
             * @name confirm
             * @function
             * @param {string} msg 얼럿 메세지
             * @param {Object} options 모달 옵션
             * @param {Element} opener 포커스 타겟
             * @example
             * lgkorUI.confirm('받은 알림을 전체삭제<br>하시겠습니까?', {                        
                ok:function(){},
                cancel:function(){}
                });
             */
            return function (msg, options, opener) {
            
                if (typeof msg !== 'string' && arguments.length === 0) {
                    options = msg;
                    msg = '';
                }
    
                var callbackOk, callbackCancel;
    
                if(options && options.ok && typeof options.ok =='function'){
                    callbackOk = options.ok;
                    delete options['ok'];
                } 
                if(options && options.cancel && typeof options.cancel =='function'){ 
                    callbackCancel = options.cancel;
                    delete options['cancel'];
                }
    
                $('html').addClass('dim');
                var tmplObj = {
                    cancelBtnName:options && options.cancelBtnName? options.cancelBtnName:'취소' ,
                    okBtnName:options && options.okBtnName? options.okBtnName:'확인' ,
                    typeClass:options && options.typeClass? options.typeClass:'' ,
                    title:options && options.title? options.title:''
                }
                var el = $(vcui.template(confirmTmpl, tmplObj)).appendTo('body');
                if(tmplObj.title) $(el).find('.lay-conts.ui-alert-msg').html(msg), $(el).find('.lay-conts:not(.ui-alert-msg)').remove();
                else $(el).find('.lay-conts h6.ui-alert-msg').html(msg), $(el).find('.lay-conts.ui-alert-msg').remove();
                

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true, isHash:false, alertType:true, opener:opener}, options)).vcModal('instance');
                modal.getElement().buildCommonUI();
                modal.on('modalhidden modalok modalcancel', function (e) {    
                    if(e.type =='modalok'){
                        if(callbackOk) callbackOk.call(this, e);
                    }else if(e.type == 'modalcancel'){
                        if(callbackCancel) callbackCancel.call(this, e);
                    }    
                    $('html').removeClass('dim');
                    el = null;
                    modal = null;
                });
                return modal;
            };
        }(),
    
        alert:function () {
            /**
             * 얼럿레이어
             * @memberOf vcui.ui
             * @name alert
             * @function
             * @param {string} msg 얼럿 메세지
             * @param {Object} options 모달 옵션
             * @param {Element} opener 포커스 타겟
             * @example
             * lgkorUI.alert('<p>구매일자 : 2020. 06. 18</p><p>구매제품 : 얼음정수기냉장고</p>', {
                 title:'영수증 등록이 완료되었습니다.',
                 ok:function(){}
                }, this);
             *  
             */
    
            return function (msg, options, opener) {
                if (typeof msg !== 'string' && arguments.length === 0) {
                    options = msg;
                    msg = '';
                }
    
                var callbackOk;
    
                if(options && options.ok && typeof options.ok =='function'){
                    callbackOk = options.ok;
                    delete options['ok'];
                } 
    
                $('html').addClass('dim');
    
                var el = $(vcui.template(alertTmpl, {
                    okBtnName:options && options.okBtnName? options.okBtnName:'확인' ,
                    typeClass:options && options.typeClass? options.typeClass:'' ,
                    title:options && options.title? options.title:''
                })).appendTo('body');
                $(el).find('.ui-alert-msg').html(msg);                

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true ,isHash:false, alertType:true, opener:opener}, options)).vcModal('instance');
                modal.getElement().buildCommonUI();
                modal.on('modalhidden modalok', function (e) {
    
                    if(e.type =='modalok'){
                        if(callbackOk) callbackOk.call(this, e);
                    }
                    $('html').removeClass('dim');
                    el = null;
                    modal = null;
                });
                return modal;
            };   
            
        }(),

        getCompareLimit: function(){
            return window.breakpoint.isMobile ? 2 : 3;
        },

        addCompareProd: function(categoryId, data){
            var self = this;
            

            var compareLimit = self.getCompareLimit();

            var compareStorage = self.getStorage(self.COMPARE_KEY);
            if(compareStorage[categoryId] == undefined){
                compareStorage[categoryId] = [data];
            } else{
                var leng = compareStorage[categoryId].length;
                if(leng < compareLimit){
                    compareStorage[categoryId].push(data);
                } else{
                    $(window).trigger('excessiveCompareStorage');
                    return false;
                }
            }
            self.setStorage(self.COMPARE_KEY, compareStorage, true);

            return true;
        },

        removeCompareProd: function(categoryId, id){
            var self = this;

            if(id) {
                var compareStorage = self.getStorage(self.COMPARE_KEY);
                compareStorage[categoryId] = vcui.array.filter(compareStorage[categoryId], function(item){
                    return item['id'] != id;
                });

                self.setStorage(self.COMPARE_KEY, compareStorage, true);
            } else {
                self.removeStorage(self.COMPARE_KEY, categoryId);
            }
        },

        initCompareProd: function(categoryId){
            var self = this;
            
            self.removeStorage(self.COMPARE_KEY, categoryId);
        },

        setCompapreCookie: function(categoryId){
            var self = this;

            var compareStorage = self.getStorage(self.COMPARE_KEY, categoryId);
            var compareIDs = [];
            for(var idx in compareStorage) compareIDs.push(compareStorage[idx].id);

            var compareCookie = compareIDs.join("|");

            self.setCookie(self.COMPARE_COOKIE_NAME, compareCookie);
        },

        addEqualCompare: function(ids, url){
            var self = this;

            self.setCookie(self.COMPARE_COOKIE_NAME, ids);

            location.href = url;
        },

        setStorage: function(key, value, isExtend){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};        
            //Internet Explorer 불가
            //storageData = Object.assign(storageData, value);
            if(isExtend) {
                $.extend(storageData, value);
            } else {
                storageData = value;
            }
            sessionStorage.setItem(key, JSON.stringify(storageData));
            
            $(window).trigger("changeStorageData");

            return storageData;
        },

        getStorage: function(key, name){							
            var storage = sessionStorage.getItem(key); 
            if(name){							
                var storageData = storage? JSON.parse(storage) : {}; 						
                return storageData[name];
            }else{
                return storage? JSON.parse(storage) : {};
            }   
        },

        removeStorage: function(key, name){    
            var returnValue;
            if(name){
                var storage = sessionStorage.getItem(key);
                var storageData = storage? JSON.parse(storage) : {}; 						
                delete storageData[name];						
                sessionStorage.setItem(key, JSON.stringify(storageData)); 
                returnValue =  storageData;
            }else{
                sessionStorage.removeItem(key);
                returnValue =  null;
            }
            
            $(window).trigger("changeStorageData");

            return returnValue;
        },

        //만료기간을 가진 스토리지 저장
        setExipreStorage: function(key, value, expireTime){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};        
            //Internet Explorer 불가
            //storageData = Object.assign(storageData, value);

            var cookieExpire = new Date();
            cookieExpire.setDate(cookieExpire.getDate() + days);
            var expireDateString = vcui.date.format(cookieExpire,'yyyyMMddhhmmss');

            value += ("&&&" + expireDateString);

            $.extend(storageData, value);
            sessionStorage.setItem(key, JSON.stringify(storageData));
            
            //$(window).trigger("changeStorageData");

            return storageData;
        },

        getExipreStorage: function(key){							
            var storage = sessionStorage.getItem(key); 
            if(storage){
                var i = JSON.parse(storage);
                
                var index = !i ? -1 : i.indexOf("&&&");
                if(index != -1) {
                    var checkExpire = new Date();

                    var arr = i.split('&&&');
                    if(arr.length > 1) {
                        var value = arr[0];
                        var date = arr[1];

                        var year = date.substring(0, 4);
                        var month = date.substring(4, 6);
                        var day = date.substring(6, 8);
                        var hour = date.substring(8, 10);
                        var minute = date.substring(10, 12);
                        var second = date.substring(12, 14);
                        var expire = new Date(year, month-1, day, hour, minute, second);
                        var res = vcui.date.compare(checkExpire,expire);
                        if(res != 1) {
                            //날짜 지남
                            self.removeStorage(key,null);
                            return null;
                        } else {
                            return value;
                        }
                     } else {
                         return i;
                     }
                }
            } else {
                return null;
            }
        },

        //lgkorUI.setCookie('','', false, 1);

        //쿠키
        setCookie: function(cookieName, cookieValue, deleteCookie, expireDay) {
            var cookieExpire = new Date();
            if(deleteCookie) {
                cookieExpire = new Date(1);
            } else {
                var days = expireDay? expireDay : 30*6;
                cookieExpire.setDate(cookieExpire.getDate() + days);
            }

            var cookiePath = null;
            var cookieDomain = null;
            var cookieSecure = false;

            var cookieText = escape(cookieName) + '=' + escape(cookieValue);
            cookieText += (cookieExpire ? ('; EXPIRES='+cookieExpire.toUTCString()) : '');
            cookieText += '; PATH=/';/*(cookiePath ? ('; PATH='+cookiePath) : '')*/;
            cookieText += (cookieDomain ? ('; DOMAIN='+cookieDomain) : '');
            cookieText += (cookieSecure ? '; SECURE' : '');

            document.cookie = cookieText;
        },

        getCookie: function(cookieName, getRealValue){
            var self = this;
            var cookieValue = null;
            if(document.cookie){
                var cookieKey = escape(cookieName) + "="; 
                var cookieArr = document.cookie.split(";");
                
                for(var i = 0; i < cookieArr.length; i++) {
                    if(cookieArr[i][0] === " ") {
                        cookieArr[i] = unescape(cookieArr[i].substring(1));
                    }
                    if(cookieArr[i].indexOf(cookieKey) === 0) {
                        cookieValue = unescape(cookieArr[i].slice(cookieKey.length, cookieArr[i].length));
                    }
                }
    /*
                var array = document.cookie.split((escape(cookieName)+'='));
                console.log(array);
                if(array.length >= 2){
                    var arraySub = array[1].split(';');
                    cookieValue = unescape(arraySub[0]);
                }
                */
            }

            var index = !cookieValue ? -1 : cookieValue.indexOf("&&&");
            if(index != -1) {
                //array
                var checkExpire = new Date();
                var itemArray = cookieValue.split('|');
                var valueArray = [];
                var resultArray = [];
                itemArray.forEach(function (i, index) {
                    var arr = i.split('&&&');
                    if(arr.length > 1) {
                        var value = arr[0];
                        var date = arr[1];

                        var year = date.substring(0, 4);
                        var month = date.substring(4, 6);
                        var day = date.substring(6, 8);
                        var hour = date.substring(8, 10);
                        var minute = date.substring(10, 12);
                        var second = date.substring(12, 14);
                        var expire = new Date(year, month-1, day, hour, minute, second);
                        var res = vcui.date.compare(checkExpire,expire);
                        if(res != 1) {
                            //날짜 지남
                            //console.log('날짜지남',value);
                        } else {
                            valueArray.push(value);
                            resultArray.push(i);
                        }
                    } else {
                        valueArray.push(value);
                        resultArray.push(i);
                    }
                });
                if(resultArray.length != itemArray.length) {
                    self.setCookie(cookieName, resultArray.join('|'));
                }
                cookieValue = (getRealValue) ? resultArray.join('|') : valueArray.join('|');
            }
            return cookieValue;
        },

        deleteCookie: function(cookieName){
            var self = this;
            var temp = self.getCookie(cookieName, true);
            if(temp){
                self.setCookie(cookieName,temp,true);
            }
        },

        addCookieArrayValue: function(cookieName, addData, maxLength, expireDay) {
            var self = this;
            var items = self.getCookie(cookieName, true); // 이미 저장된 값을 쿠키에서 가져오기
            var itemArray = [];
            if(items) {
                itemArray = items.split('|');
                //겹치는 값 제거
                var findIndex = -1;
                for(var n=0;n<itemArray.length;n++) {
                    var value = itemArray[n];
                    var arr = value.split('&&&');
                    if(arr.length > 1) {
                        value = arr[0];
                    }
                    if(value == addData) {
                        findIndex = n;
                        break;
                    }
                };
                if(findIndex != -1) {
                    itemArray.splice(findIndex, 1);
                }
            }

            //값 새로 저장
            var days = expireDay? expireDay : 30*6;
            var cookieExpire = new Date();
            cookieExpire.setDate(cookieExpire.getDate() + days);
            var expireDateString = vcui.date.format(cookieExpire,'yyyyMMddhhmmss');

            addData += ("&&&" + expireDateString);

            itemArray.unshift(addData);
            itemArray = itemArray.slice(0,maxLength);

            items = itemArray.join('|');
            self.setCookie(cookieName, items, false, expireDay);

            /*
            console.log('saved',itemArray.length);
            var test = self.getCookie(cookieName);
            var searchedList = test.split('|');
            console.log(searchedList);
            */
        },

        removeCookieArrayValue: function(cookieName, removeData) {
            var self = this;
            var items = self.getCookie(cookieName, true); // 이미 저장된 값을 쿠키에서 가져오기
            var itemArray = [];
            if(items) {
                itemArray = items.split('|');
                var findIndex = -1;
                for(var n=0;n<itemArray.length;n++) {
                    var value = itemArray[n];
                    var arr = value.split('&&&');
                    if(arr.length > 1) {
                        value = arr[0];
                    }
                    if(value == removeData) {
                        findIndex = n;
                        break;
                    }
                };
                if(findIndex != -1) {
                    itemArray.splice(findIndex, 1);
                    items = itemArray.join('|');
                    self.setCookie(cookieName, items);
                }
            }
        },

        loadKakaoSdkForShare: function(callback){
            var self = this;

            if(window.kakao){
                if(callback != null) callback();
            }else{
                var script = document.createElement('script');
        
                script.onload = function () {
                    if(callback != null){
                        callback();
                        return;
                    }
                    self.loadCommonShareUI();
                };
                script.onerror = function(e){ 
                    //alert('kakao api를 로드할수 없습니다.');
                    console.log('kakao api를 로드할수 없습니다.');
                }
                script.src = '//developers.kakao.com/sdk/js/kakao.min.js';        
                document.head.appendChild(script); 
            }
        },

        loadCommonShareUI: function(){
            vcui.require([
                'helper/sharer'
            ], function (Sharer) {
                // 공유하기 헬퍼 빌드
                Sharer.init({
                    selector: '.sns-list > li >  a',
                    attr: 'data-link-name' // sns서비스명을 가져올 속성
                });
            });
        },

        requestAjaxData: function(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout, ignoreCommonLoadingHide, failCallback) {
            var self = this;
            var dtype = dataType? dataType : "json";
            var timelimit = timeout ? timeout : 15000;
            $.ajax({
                type : type? type : "GET",
                url : url,
                dataType : dtype,
                data : data,
                timeout : timelimit
            }).done(function (result) {
                if(!ignoreCommonLoadingHide) lgkorUI.hideLoading();

                if(dtype != "json") {
                    if(callback && typeof callback === 'function') callback(result);
                    return;
                }

                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                    location.reload();                
                    return;
                }
                
                if(dtype == 'json' && result.status != 'success'){
                    //alert(result.message ? result.message : '오류발생');
                    if(ignoreCommonSuccessCheck) {
                        var data = result.data;
                        if(data && !Array.isArray(data) && typeof data === 'object') {
                            if(!data.success && !(typeof(data.success) === "boolean")) {
                                result.data.success = "N";
                            }
                        } else {
                            //     if(result.message) {
                            //         lgkorUI.alert("", {
                            //             title: result.message
                            //         });
                            //         //result.message = null;
                            //     }
                            //result.data = {"success" : "N"};
                            if(data && !data.success && !(typeof(data.success) === "boolean")) {
                                result.data.success = "N";
                            }
                        }
                        if(callback && typeof callback === 'function') callback(result); 
                    } else {
                        var data = result.data;
                        if(data && data.alert && !vcui.isEmpty(data.alert)) {
                            lgkorUI.alert("", {
                                title: data.alert.title
                            });
                        } else {
                            if(result.message) {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                        }
                        if(failCallback && typeof failCallback === 'function') failCallback();
                    }
                    return;
                }

                if(ignoreCommonSuccessCheck) {
                    var data = result.data;
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            result.data.success = "Y";
                        }
                    }
                    if(callback && typeof callback === 'function') callback(result); 
                } else {
                    var data = result.data;
                    //success가 비어 있으면 성공(Y) 라 친다
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            result.data.success = "Y";
                        }
                    }
                    /*
                    if(!data.success && !(typeof(data.success) === "boolean")) {
                        data.success = "Y";
                    }
                    */
                    if(data && !self.stringToBool(data.success) && data.alert) {
                        //에러
                        if(data && data.alert && !vcui.isEmpty(data.alert)) {
                            self.commonAlertHandler(data.alert);
                        }/* else {
                            if(result.message) {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                        }*/
                    } else {
                        if(callback && typeof callback === 'function') callback(result);
                    } 
                }                
            }).fail(function(err){
                //alert(url, err.message);
                if(!ignoreCommonLoadingHide) lgkorUI.hideLoading();
                if(failCallback && typeof failCallback === 'function') failCallback(err);

            });
        },

        requestAjaxDataFailCheck: function(url, data, successCallback, failCallback) {
            var self = this;
            self.requestAjaxData(url, data, successCallback, null, null, null, null, null, failCallback);
        },
        
        requestAjaxDataIgnoreCommonSuccessCheck: function(url, data, callback, type, dataType) {
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, true);
        },

        requestAjaxDataAddTimeout: function(url, timeout, data, callback, type, dataType, ignoreCommonSuccessCheck){
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout);
        },

        requestAjaxDataPost: function(url, data, callback, ignoreCommonSuccessCheck, ignoreCommonLoadingHide) {
            var self = this;
            self.requestAjaxData(url, data, callback, "POST", null, ignoreCommonSuccessCheck, null, ignoreCommonLoadingHide);
        },

        requestAjaxFileData: function(url, data, callback, type, dataType, ignoreCommonSuccessCheck) {
            var self = this;
            var dtype = dataType? dataType : "json";
            $.ajax({
                type : type? type : "GET",
                url : url,
                dataType : dtype,
                data : data,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false
            }).done(function (result) {
                
                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                    location.reload();                
                    return;
                }
                
                if(dtype == 'json' && result.status != 'success'){
                    //alert(result.message ? result.message : '오류발생');
                    console.log('resultStatusFail',url,result);
                    return;
                }

                if(ignoreCommonSuccessCheck) {
                    if(callback && typeof callback === 'function') callback(result); 
                } else {
                    var data = result.data;
                    //success가 비어 있으면 성공(Y) 라 친다
                    if(!data.success && !(typeof(data.success) === "boolean")) {
                        data.success = "Y";
                    }
                    if(data && !self.stringToBool(data.success) && data.alert) {
                        //에러
                        self.commonAlertHandler(data.alert);
                    } else {
                        if(callback && typeof callback === 'function') callback(result);
                    } 
                }   
            }).fail(function(err){
                //alert(url, err.message);
                console.log('ajaxFail',url,err);
            });
        },

        requestCartCount: function(ajaxUrl) {

            lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result){
                var data = result.data;
                if(lgkorUI.stringToBool(data.success)) {
                    var cartCnt = data.cartCnt ? ((typeof data.cartCnt  === 'number') ? data.cartCnt : parseInt(data.cartCnt)) : 0;
                    var utility = $('div.header-wrap div.utility');
                    utility.find('.cart span.count').remove();
                    if(cartCnt == 0) {
                        //제거
                    } else if(cartCnt > 99) {
                        //99개 넘음
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>99+</span>');
                    } else {
                        //NN
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>' + cartCnt + '</span>');
                    }

                    $('.header-wrap .header-top .utility .cart a').attr('href', data.cartUrl);
                }
            }, true, true);
        },

        requestCart: function(ajaxUrl, param, isToast) {
            lgkorUI.showLoading();
            isToast = !(isToast) ? true : isToast;
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                var data = result.data;
                if(data && lgkorUI.stringToBool(data.success)) {
                    var cartCnt = data.cartCnt ? ((typeof data.cartCnt  === 'number') ? data.cartCnt : parseInt(data.cartCnt)) : 0;
                    var utility = $('div.header-wrap div.utility');
                    utility.find('.cart span.count').remove();
                    if(cartCnt == 0) {
                        //제거
                    } else if(cartCnt > 99) {
                        //99개 넘음
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>99+</span>');
                    } else {
                        //NN
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>' + cartCnt + '</span>');
                    }
                    
                    $('.header-wrap .header-top .utility .cart a').attr('href', data.cartUrl);

                    if(isToast && lgkorUI.stringToBool(data.success)) {
                        $(window).trigger("toastshow", "선택하신 제품을 장바구니에 담았습니다.");
                    }
                } else {
                    if(data && data.alert && !vcui.isEmpty(data.alert)) {
                        if(isToast) {
                            $(window).trigger("toastshow",data.alert.title);
                        } else {
                            lgkorUI.alert("", {
                                title: data.alert.title
                            });
                        }
                    } else {
                        if(result.message) {
                            lgkorUI.alert("", {
                                title: result.message
                            });
                        }
                    }
                }
            }, true);
        },

        requestWish: function(param, wish, callbackSuccess, callbackFail, postUrl, opener) {
            console.log("opener:", opener)
            lgkorUI.showLoading();
            var self = this;
            param.wish = wish;
            lgkorUI.requestAjaxDataPost(postUrl, param, function(result){
                var data = result.data;
                if(data && lgkorUI.stringToBool(data.success)) {
                    if(wish) {
                        $(window).trigger("toastshow","선택하신 제품이 찜한 제품에 추가되었습니다.");
                    } else{
                        $(window).trigger("toastshow","찜한 제품 설정이 해제되었습니다.");
                    }
                    if(data.data && data.data.listData && data.data.listData.length > 0) {
                        callbackSuccess(data.data.listData[0]);
                    } else {
                        callbackSuccess({wishItemId:null});
                    }
                } else {
                    callbackFail(data);
                    if(data && data.alert && !vcui.isEmpty(data.alert)) {
                        if(data.alert.isConfirm && data.alert.okUrl) {
                            data.alert.okUrl = data.alert.okUrl + location.href;
                        }
                        self.commonAlertHandler(data.alert, opener);
                        /*
                        lgkorUI.alert("", {
                            title: data.alert.title
                        });
                        */
                    } else {
                        if(result.message) {
                            lgkorUI.alert("", {
                                title: result.message
                            }, opener);
                        }
                    }
                }
            }, true);
        },

        commonAlertHandler: function(alert, opener){
            if(!alert) {
                return;
            }
            var isConfirm = lgkorUI.stringToBool(alert.isConfirm);
            if(isConfirm) {
                //컨펌
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName ? alert.cancelBtnName : "취소",
                    okBtnName: alert.okBtnName ? alert.okBtnName : "확인",
                    ok: alert.okUrl ? function (){
                        location.href = alert.okUrl;
                    } : function (){},
                    cancel: alert.cancelUrl ? function (){
                        location.href = alert.cancelUrl;
                    } : function (){}
                };
    
                var desc = alert.desc ? alert.desc : null;
                if(alert.title && alert.desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.confirm(desc, obj, opener);
            } else {
                //알림
                var obj ={title: alert.title,
                    typeClass: '',
                    okBtnName: alert.okBtnName ? alert.okBtnName : "확인",
                    ok: function (){}
                };
    
                var desc = alert.desc ? alert.desc : null;
                if(desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.alert(desc, obj, opener);
            }
        },

        isString: function(value) {
            return typeof value === 'string' || value instanceof String;
        },

        stringToBool: function(str, returnNull) {
            if(!str) {
                return !(!returnNull);
            }
            if(typeof str === 'boolean') {
                return str;
            }
            if(str && (typeof str === 'string' || str instanceof String)) {
                var s = str.trim().toLowerCase();
                return (s == 'y' || s == 'yes' || s == 'true');
            }
            return str;
        },

        getHiddenInputData: function(iptname, wrapname, index){
            var hiddenWrapName = wrapname || "hidden-input-group";
            var hiddenIndex = index || "0";
            var hiddenWrap = $('.' + hiddenWrapName).eq(hiddenIndex);
            var data, str, name;

            if(iptname){
                if(vcui.isArray(iptname)){
                    data = {};
                    for(str in iptname){
                        name = iptname[str];
                        data[name] = hiddenWrap.find('input[name=' + name + ']').val();
                    }

                    return data;
                } else{
                    return hiddenWrap.find('input[name=' + iptname + ']').val();
                }
            } else{
                data = {};
                hiddenWrap.find('input[type=hidden]').each(function(idx, item){
                    name = $(item).attr('name');
                    data[name] = $(item).val();
                });

                return data;
            }
        },

        setHiddenInputData: function(iptname, value, wrapname, index){
            if(!iptname) return false;

            var hiddenWrapName = wrapname || "hidden-input-group";
            var hiddenIndex = index || "0";
            var hiddenWrap = $('.' + hiddenWrapName).eq(hiddenIndex);
            var str, val;

            if(typeof iptname === "object"){
                for(str in iptname){
                    hiddenWrap.find('input[name=' + str + ']').val(iptname[str]);
                }
            } else{
                val = vcui.isArray(value) ? value.join() : value;
                hiddenWrap.find('input[name=' + iptname + ']').val(val);
            }
        },

        addStickyModule: function(hei){
            var self = this;

            var moduleIDs = vcui.array.map(self.STICKY_MODULES, function(item){
                return item.uniqueID;
            });

            var uniqueID = self.setUniqueID();
            while(vcui.array.has(moduleIDs, uniqueID)) uniqueID = setUniqueID();

            self.STICKY_MODULES.push({
                uniqueID: uniqueID,
                moduleHeight: hei
            });

            return uniqueID;
        },

        setUniqueID: function(){
            var id = "";
            for(var i=0;i<10;i++){
                var ran = parseInt(Math.random()*10);
                id += ran.toString();
            }

            return id;
        },

        searchModelName: function(){
            var optionsTmpl =  '<option value="{{code}}">{{name}}</options>';

            var modelName = {
                options: {
                    text: '제품 카테고리를 선택하면, 해당 제품의 모델명 확인 방법을 안내해 드립니다.',
                    imgPath: '/kr/support/images/find-model/model-smart-phone.jpg',
                    imgAlt: '모델명 및 제조번호 확인 예시 사진'
                },
                init: function() {
                    var self = this;

                    self.$modelButton = $('[data-href="#modelNamePopup"]');
                    self.$modelPopup = $('#modelNamePopup');
                    self.$category = self.$modelPopup.find('#select1');
                    self.$subCategory = self.$modelPopup.find('#select2');
                    self.$result = self.$modelPopup.find('.example-result');

                    self.searchModelNameUrl = self.$modelPopup.data('modelUrl');
                    self.searchSubCategoryUrl = self.$modelPopup.data('subCategoryUrl');

                    self.bindEvent();
                },
                setting: function() {
                    var self = this;
                    
                    self.category = self.$modelPopup.data('category');
                    self.subCategory = self.$modelPopup.data('subCategory');
                    
                    if (self.category) {
                        self.$category.find('option[value="'+self.category+'"]').prop('selected', true);
                        self.$category.vcSelectbox('update');
                        self.searchSubCategory(self.category, self.subCategory);
                        if (self.subCategory) {
                            self.searchModelName(self.category, self.subCategory);
                        }
                    } else {
                        var $resultTxt = self.$result.find('.txt'),
                            $resultImg = self.$result.find('.img img'),
                            $viewBtn = self.$result.find('.img .btn-img-view');
                        var options = self.options;

                        $resultTxt.html(options.text);
                        $resultImg.attr('src', options.imgPath);
                        $resultImg.attr('alt', options.imgAlt);
                        $viewBtn.attr('href', options.imgPath);

                        self.$category.find('option.placeholder').prop('selected', true);
                        self.$subCategory.prop('disabled', true);
                        self.$subCategory.find('option:not(.placeholder)').remove();

                        self.$category.vcSelectbox('update');
                        self.$subCategory.vcSelectbox('update');
                    }
                },
                searchSubCategory: function(category, subCategory) {
                    var self = this;
                    var subCategory = subCategory || '';
                    var param = {
                        cateSelect: category || self.$category.val()
                    };
                    
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.searchSubCategoryUrl, param, function(result) {
                        var data = result.data;
                        var html = '';

                        data.forEach(function(item) {
                            html += vcui.template(optionsTmpl, item);
                        });

                        self.$subCategory.find('option:not(.placeholder)').remove();
                        self.$subCategory.append(html).prop('disabled', false);
                        self.$subCategory.find('option[value="'+subCategory+'"]').prop('selected', true);
                        self.$subCategory.vcSelectbox('update');
                    }, 'POST');
                },
                searchModelName: function(category, subCategory) {
                    var self = this;
                    var param = {
                        category: category || self.$category.val(),
                        subCategory: subCategory || self.$subCategory.val()
                    };
                    
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.searchModelNameUrl, param, function(result) {
                        var $resultTxt = self.$result.find('.txt'),
                            $resultImg = self.$result.find('.img img'),
                            $viewBtn = self.$result.find('.img .btn-img-view');
                        var data = result.data;
                        
                        $resultTxt.html(data.text);
                        $resultImg.attr('src', data.imgPath);
                        $resultImg.attr('alt', data.imgAlt);
                        $viewBtn.attr('href', data.imgPath);
                    }, 'POST');
                },
                bindEvent: function() {
                    var self = this;

                    self.$modelButton.on('click', function() {
                        self.setting();
                        self.$modelPopup.vcModal();
                    });

                    self.$category.on('change', function() {
                        self.searchSubCategory();
                    });

                    self.$subCategory.on('change', function() {
                        self.searchModelName();
                    });

                    self.$modelPopup.on('modalhidden', function() {
                        self.$modelButton.focus();
                    });
                }
            }

            modelName.init();
        },

        addLimitedInputEvent: function(ipt){
            ipt.on('input', function(){
                var maxleng = $(this).prop('maxlength');
                var str = $(this).val();
                if(str.length > maxleng){
                    $(this).val(str.slice(0, maxleng));
                }
            });
        },

        getParameterByName: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        //현재 페이지의 찜하기 객체를 찾아서 갱신한다
        checkWishItem: function(ajaxUrl,checkAttr) {
            if(!checkAttr) {
                checkAttr = "data-wish-model-name";
            }

            var $wishItem = $('input['+checkAttr+']');

            if($wishItem.length > 0) {
                lgkorUI.requestAjaxData(ajaxUrl, {"type":"list"}, function(result){
                    var data = result.data.data;
                    if(data){
                        var listData = data.listData != undefined ? data.listData : [];
                        var wishListId = data.wishListId;
                        /*
                        $wishItem.each(function(idx, item){
                            var $item = $(item);
                            if(!$item.data('wishListId')) {
                                $item.data('wishListId', wishListId);
                            };
                        }); 
                        */
                        if(wishListId) {
                            $wishItem.each(function(idx, item){
                                var $item = $(item);
                                if(!$item.data('wishListId')) {
                                    $item.data('wishListId', wishListId);
                                };
                                var itemId = $item.attr(checkAttr);
                                for (var i = 0, len = listData.length; i < len; i++) {
                                    var listItem = listData[i];
                                    if (listItem.sku == itemId) {
                                        $item.data(listItem);
                                        $item.prop("checked",true);
                                        break;
                                    }
                                }
                            });
                            /*
                            listData.forEach(function(item,index){
                                var $wish = $wishItem.filter('[' + checkAttr + '="'+item.sku+'"]' );
                                console.log($wish);
                                if($wish.length > 0) {
                                    $wish.data(item);
                                    $wish.prop("checked",true);
                                }
                            });
                            */
                        }
                    }
                },"GET", null, true);
            }
        },

        stringCompress:function(str, asArray) {
            asArray = (asArray === true);
            var i,
                dictionary = {},
                uncompressed = str,
                c,
                wc,
                w = "",
                result = [],
                ASCII = '',
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[String.fromCharCode(i)] = i;
            }
        
            for (i = 0; i < uncompressed.length; i += 1) {
                c = uncompressed.charAt(i);
                wc = w + c;
                //Do not use dictionary[wc] because javascript arrays
                //will return values for array['pop'], array['push'] etc
               // if (dictionary[wc]) {
                if (dictionary.hasOwnProperty(wc)) {
                    w = wc;
                } else {
                    result.push(dictionary[w]);
                    ASCII += String.fromCharCode(dictionary[w]);
                    // Add wc to the dictionary.
                    dictionary[wc] = dictSize++;
                    w = String(c);
                }
            }
        
            // Output the code for w.
            if (w !== "") {
                result.push(dictionary[w]);
                ASCII += String.fromCharCode(dictionary[w]);
            }
            return asArray ? result : ASCII;
        },

        stringDecompress:function (str) {
            var i, tmp = [],
                dictionary = [],
                compressed = str,
                w,
                result,
                k,
                entry = "",
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[i] = String.fromCharCode(i);
            }
        
            if(compressed && typeof compressed === 'string') {
                // convert string into Array.
                for(i = 0; i < compressed.length; i += 1) {
                    tmp.push(compressed[i].charCodeAt(0));
                }
                compressed = tmp;
                tmp = null;
            }
        
            w = String.fromCharCode(compressed[0]);
            result = w;
            for (i = 1; i < compressed.length; i += 1) {
                k = compressed[i];
                if (dictionary[k]) {
                    entry = dictionary[k];
                } else {
                    if (k === dictSize) {
                        entry = w + w.charAt(0);
                    } else {
                        return null;
                    }
                }
        
                result += entry;
        
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
        
                w = entry;
            }
            return result;
        },

        obj2HashString:function(obj) {
            var compress = lgkorUI.stringCompress(JSON.stringify(obj));
            //console.log(compress);
            var result = compress.substring(1, compress.length-1);
            //var result = compress;
            return result;
        },

        hashString2Obj:function(str) {
            var orig =  decodeURIComponent("{"+str+"}"); //"{"+str+"}";
            var decompress = lgkorUI.stringDecompress(orig);
            var result = JSON.parse(decompress);
            return result;
        },

        //크레마로그인
        cremaLogin:function() {

            // 크레마 init 구조상 cremaAsyncInit 함수가 먼저 선언되 있어야 초기화 오류가 안난다.
            window.cremaAsyncInit = function () {
                if(typeof crema !== 'undefined') {
                    crema.init(cremaid, cremaname);
                }
            };

            (function(i,s,o,g,r,a,m){
                var isMobile = false;
                if(vcui.detect.isMobile){
                    isMobile = true;
                }
                
                if(location.hostname == "www.lge.co.kr") {
                    r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
                } else {
                    r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
                }
            
                if(s.getElementById(g)){
                    return
                };
                a=s.createElement(o),m=s.getElementsByTagName(o)[0];
                a.id=g;
                a.async=1;
                a.src=r;
                m.parentNode.insertBefore(a,m);
            })(window,document,'script','crema-jssdk','//widgets.cre.ma/lge.co.kr/init.js');


            window.cremaAsyncInit();

        },

        //크레마리플래쉬
        cremaReload:function() {
            if(typeof crema !== 'undefined' && typeof crema == "object" && typeof crema.run == 'function') {
                setTimeout(function(){
                    crema.run();
                },500);
            }
        },

        // 앱 하단 메뉴 컨트롤 부분

        // 앱 하단메뉴가 화면을 덮는 형태인지 아닌지 결정
        showAppBottomMenuOver:function(flag){
            if(isApplication) {
                if(isAndroid && android) {
                    android.showBottomMenuOver(flag);
                }
                if(isIOS){
                    var jsonString= JSON.stringify({command:'showBottomMenuOver', value:flag? "Y":"N"});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },
        // 앱 하단메뉴 스크롤 기능 사용 여부 설정
        setEnableAppScrollBottomMenu:function(flag){
            if(isApplication) {
                if(isAndroid && android) {
                    android.setEnableScrollBottomMenu(flag);
                }
                if(isIOS){
                    var jsonString= JSON.stringify({command:"setEnableScrollBottomMenu", value : flag? "Y" : "N"});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },
        // 앱 하단메뉴 노출 여부 설정
        showAppBottomMenu:function(flag){

            if(isApplication) {
                if(isAndroid && android) android.showBottomMenu(flag);
                if(isIOS) {
                    var jsonString= JSON.stringify({command:'showBottomMenu', value:flag? "Y" : 'N'});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },

        // 앱 isLayoutPopup
        appIsLayerPopup:function(flag){

            if(isApplication) {
                if(isAndroid && android) android.isLayerPopup(flag);
                if(isIOS) {
                    var jsonString= JSON.stringify({command:'isLayerPopup', value:flag? "Y" : 'N'});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },

        // openAR 링크 보내기
        openAR:function(modelId){
            if(isApplication) {
                if(modelId){
                    if(isAndroid && android) android.openAR(modelId);
                    if(isIOS) {
                        var jsonString= JSON.stringify({command:'showAR', product:modelId});
                        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    }
                }
                return true;
            }else{
                //return false;
                if(modelId && vcui.detect.isMobile) {
                    var iosScheme = "lgeapp://goto?type=AR&product=" + modelId;
                    var androidScheme = "Intent://goto?type=AR&product=" + modelId;
                    if(location.hostname == "www.lge.co.kr") {
                        androidScheme += "#Intent;scheme=lgeapp;package=kr.co.lge.android;end";
                    } else {
                        androidScheme += "#Intent;scheme=lgeapp;package=kr.co.lge.android.stg;end";
                    }
                    //var androidScheme = "Intent://goto?type=AR&product=" + modelId + "#Intent;scheme=lgeapp;package=kr.co.lge.android;end"
                    lgkorUI.isAPPInstall(iosScheme, androidScheme);
                    return true;
                } else {
                    return false;
                }
            }
        },
        
        // history back 사용하기
        addHistoryBack:function(cid, callback){

            if(!isMobileDevice) return;

            var uid = '.history-back-'+cid;
            $(window).off('popstate'+uid).on('popstate'+uid, function(){      
                var state = window.history.state;
                if(state && state.data && state.data == uid){
                    if(callback && vcui.isFunction(callback)) callback.call(this);
                    $(window).off('popstate'+uid);
                }
            });

            window.history.replaceState({ data: uid }, null, null);
            window.history.pushState({ data: uid+'-open' }, null, null);

        },

        removeHistoryBack:function(cid){

            if(!isMobileDevice) return;

            var uid = '.history-back-'+cid;
            var state = window.history.state;
            if(state && state.data && state.data == uid+'-open'){
                window.history.back();
            }
            $(window).off('popstate'+uid);
        },

        //앱 설치 여부 체크

        //iOS, Android 앱 설치 여부 확인
        isAPPInstall:function(iosScheme, androidScheme) {
            var self = this;
            if (vcui.detect.isAndroid || vcui.detect.isIOS) {
                self.heartbeat = setInterval(function () {
                    console.log('interval', document.webkitHidden, document.hidden, document.mozHidden);
                    if(document.webkitHidden || document.hidden || document.mozHidden){
                        clearTimeout(self.appCheckTimer);
                        clearInterval(self.heartbeat);
                        console.log('앱이 설치 되어 있습니다.');
                    }
                }, 2);
            }

            if (vcui.detect.isAndroid) {
                self.appCheckTimer = setTimeout(function() {
                    clearInterval(self.heartbeat);
                    console.log('안드로이드 앱이 없습니다.');
                    $(window).trigger("appNotInstall");
                }, 3000);
                location.href = androidScheme;
            } else if (vcui.detect.isIOS) {
                self.appCheckTimer = setTimeout(function() {
                    clearInterval(self.heartbeat);
                    console.log('ios 앱이 없습니다.');
                    $(window).trigger("appNotInstall");
                }, 3000);
                location.href = iosScheme;
            }
        },
    }

    window.historyBack = lgkorUI._historyBack;

    document.addEventListener('DOMContentLoaded', function () {
        lgkorUI.init();
    });

    global.addEventListener('load', function(){
        vcui.require(['ui/sticky'], function () {
            $('.ui_sticky').vcSticky('update');
        });
    });

})(window);

