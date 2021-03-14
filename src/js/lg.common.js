//통합앱 구축팀 요청...통합앱 식별 스크립트
var isApp = function(){
    return /LGEAPP|lgeapp\/[0-9\.]+$/.test(navigator.userAgent);
}


;(function(global){

    if(global['lgkorUI']) return;
    console.log("lgkorUI start!!!");
    if(vcui.detect.isMac) $('html').addClass('mac');
    if(isApp()) $('html').addClass('app');

    window.onload = function(){
        console.log('lazy??????????? onload');
        vcui.require([
            'ui/lazyLoaderSwitch',
            'ui/lazyLoader'
        ], function () {
            var $b = $('body');
            $b.vcLazyLoaderSwitch();
            $b.vcLazyLoader();
            console.log('lazy???????????');
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
            console.log("buildCommonUI!!!!");

            //this.vcImageSwitch();
            console.log(location.hostname)
            if(location.hostname == "cms50.lge.co.kr") {
                console.log('lazy cms50');
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
        INTERGRATED_SEARCH_VALUE: "intergratedSearchValue",
        MAX_SAVE_RECENT_KEYWORD: 5, //최근 검색어 저장 최대수
        MAX_SAVE_RECENT_PRODUCT: 10, //최근 본 제품 저장 최대수
        init: function(){
            this._bindErrBackEvent();
            this._addImgOnloadEvent();
            this._preloadComponents();
            this._addTopButtonCtrl();
            this._createMainWrapper();
            this._switchLinker();

            $('body').find('.container').attr('id', 'content');
        },

        _addImgOnloadEvent: function(){
            var self = this;
            $('img').not('[data-pc-src]').on('error', function(e){
                $(this).off('error');
                $(this).attr('src', self.NO_IMAGE);
                $(this).addClass('no-img');
            });
        },

        addImgErrorEvent: function(img){
            var self = this;
            img.onerror = null;
            $(img).attr('src', self.NO_IMAGE);
            $(img).addClass('no-img');
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
                'helper/breakpointDispatcher',
                'common/header', 
                'common/footer',  
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
                'ui/imageFileInput'
            ], function (/*ResponsiveImage,*/ BreakpointDispatcher) {
                
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

                            $('html, body').css({
                                overflow:"hidden"
                            });
    
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
                            $('html, body').css({
                                overflow:"visible"
                            });
                        }
                    }
                });
    
                // 아코디언의 기본설정을 멀티오픈으로 설정해놓는다,
                vcui.ui.setDefaults('Accordion', {
                    singleOpen: false,
                    events: {
                        accordionexpand: function (e, data) {
                            data.content.attr('tabindex', '0');                  
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
                            console.log(this)
                            if(data && data.content.find('.ui_carousel').length > 0) {
                                console.log("ui_carousel")
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

            self.loadKakaoSdkForShare();
        },

        //top 버튼 컨틀롤...
        _addTopButtonCtrl: function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $('.floating-menu.top').removeClass('call-yet');
                } else {
                    $('.floating-menu.top').addClass('call-yet');
                }
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
            $('body').find('.contents.error-page .btns a').on('click', function(e){
                e.preventDefault();

                var referrer = document.referrer;
                var index = referrer.indexOf('lge.co.kr');
                // if(index > 0) history.back();
                // else location.href = 

                history.back();
            })
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

        showLoading:function(msg){
            vcui.require(['ui/spinner'],function(){
                var str = msg? msg : '데이터를 불러오는 중입니다.';
                $('html').addClass('dim');
                $('body').append("<div class='loading_dim' style='position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.3);z-index:199999999'></div>")
                $('body').vcSpinner({msg:str});
                $('body').vcSpinner('spin', str); 
            })   
        },
    
        hideLoading:function(){
            vcui.require(['ui/spinner'],function(){
                $('.loading_dim').remove();
                $('html').removeClass('dim');
                $('body').vcSpinner('stop');
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
             * @example
             * lgkorUI.confirm('받은 알림을 전체삭제<br>하시겠습니까?', {                        
                ok:function(){},
                cancel:function(){}
                });
             */
            return function (msg, options) {
            
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
                

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true }, options)).vcModal('instance');
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
             * @example
             * lgkorUI.alert('<p>구매일자 : 2020. 06. 18</p><p>구매제품 : 얼음정수기냉장고</p>', {
                 title:'영수증 등록이 완료되었습니다.',
                 ok:function(){}
                });
             *  
             */
    
            return function (msg, options) {
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

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true }, options)).vcModal('instance');
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

            console.log("### addCompareProd ###", categoryId)

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
            self.setStorage(self.COMPARE_KEY, compareStorage);

            return true;
        },

        removeCompareProd: function(categoryId, id){
            var self = this;

            var compareStorage = self.getStorage(self.COMPARE_KEY);
            compareStorage[categoryId] = vcui.array.filter(compareStorage[categoryId], function(item){
                return item['id'] != id;
            });

            self.setStorage(self.COMPARE_KEY, compareStorage);
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

            console.log("### setCompapreCookie ###", compareCookie);

            self.setCookie(self.COMPARE_COOKIE_NAME, compareCookie);
        },

        setStorage: function(key, value){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};        
            //Internet Explorer 불가
            //storageData = Object.assign(storageData, value);
            $.extend(storageData, value);
            sessionStorage.setItem(key, JSON.stringify(storageData));

            console.log("### setStorage ###", storageData)
            
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

            console.log("### setStorage ###", storageData)
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

        //쿠키
        setCookie: function(cookieName, cookieValue, deleteCookie) {
            var cookieExpire = new Date();
            if(deleteCookie) {
                cookieExpire = new Date(1);
            } else {
                var days = 30*6;
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

        addCookieArrayValue: function(cookieName, addData, maxLength) {
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
            var days = 30*6;
            var cookieExpire = new Date();
            cookieExpire.setDate(cookieExpire.getDate() + days);
            var expireDateString = vcui.date.format(cookieExpire,'yyyyMMddhhmmss');

            addData += ("&&&" + expireDateString);

            itemArray.unshift(addData);
            itemArray = itemArray.slice(0,maxLength);

            items = itemArray.join('|');
            self.setCookie(cookieName, items);

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

        requestAjaxData: function(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout) {
            var self = this;
            var dtype = dataType? dataType : "json";
            var timeout = timeout ? timeout : 10000;
            $.ajax({
                type : type? type : "GET",
                url : url,
                dataType : dtype,
                data : data,
                timeout : 180000
            }).done(function (result) {

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
                    console.log('resultStatusFail',url,result);
                    if(ignoreCommonSuccessCheck) {
                        var data = result.data;
                        if(data && !Array.isArray(data) && typeof data === 'object') {
                            if(!data.success && !(typeof(data.success) === "boolean")) {
                                data.success = "N";
                                result.data = data;
                            }
                        } else {
                            if(result.message) {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                            result.data = {"success" : "N"};
                        }
                        if(callback && typeof callback === 'function') callback(result); 
                        else lgkorUI.hideLoading();
                    } else {
                        if(result.message) {
                            lgkorUI.alert("", {
                                title: result.message
                            });
                        }
                        lgkorUI.hideLoading();
                    }
                    return;
                }

                if(ignoreCommonSuccessCheck) {
                    var data = result.data;
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            data.success = "Y";
                            result.data = data;
                        }
                    }
                    if(callback && typeof callback === 'function') callback(result); 
                    else lgkorUI.hideLoading();
                } else {
                    var data = result.data;
                    //success가 비어 있으면 성공(Y) 라 친다
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            data.success = "Y";
                            result.data = data;
                        }
                    }
                    /*
                    if(!data.success && !(typeof(data.success) === "boolean")) {
                        data.success = "Y";
                    }
                    */
                    if(!self.stringToBool(data.success) && data.alert) {
                        //에러

                        lgkorUI.hideLoading();

                        console.log('resultDataFail',url,result);
                        self.commonAlertHandler(data.alert);
                    } else {
                        if(callback && typeof callback === 'function') callback(result);
                        else lgkorUI.hideLoading();
                    } 
                }                
            }).fail(function(err){
                //alert(url, err.message);
                console.log('ajaxFail',url,err);
                lgkorUI.hideLoading();
            }).always(function() {
                //console.log( "complete" );
            });
        },

        requestAjaxDataIgnoreCommonSuccessCheck: function(url, data, callback, type, dataType) {
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, true);
        },

        requestAjaxDataAddTimeout: function(url, timeout, data, callback, type, dataType, ignoreCommonSuccessCheck){
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout);
        },

        requestAjaxDataPost: function(url, data, callback, ignoreCommonSuccessCheck) {
            var self = this;
            self.requestAjaxData(url, data, callback, "POST", null, ignoreCommonSuccessCheck);
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
                    if(!self.stringToBool(data.success) && data.alert) {
                        //에러
                        console.log('resultDataFail',url,result);
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
                }
            }, true);
        },

        requestCart: function(ajaxUrl, param, isToast) {
            lgkorUI.showLoading();
            isToast = !(isToast) ? true : isToast;
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
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

                    if(isToast && lgkorUI.stringToBool(data.success)) {
                        $(window).trigger("toastshow", "선택하신 제품을 장바구니에 담았습니다.");
                    }
                } else {
                    if(data.alert && !vcui.isEmpty(data.alert)) {
                        if(isToast) {
                            $(window).trigger("toastshow",data.alert.title);
                        } else {
                            lgkorUI.alert("", {
                                title: data.alert.title
                            });
                        }
                    }
                }
            }, true);
        },

        requestWish: function(param, wish, callbackSuccess, callbackFail, postUrl) {
            lgkorUI.showLoading();
            var self = this;
            param.wish = wish;
            lgkorUI.requestAjaxDataPost(postUrl, param, function(result){
                var data = result.data;
                if(lgkorUI.stringToBool(data.success)) {
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
                    if(data.alert && !vcui.isEmpty(data.alert)) {
                        if(data.alert.isConfirm && data.alert.okUrl) {
                            data.alert.okUrl = data.alert.okUrl + location.href;
                        }
                        self.commonAlertHandler(data.alert);
                        /*
                        lgkorUI.alert("", {
                            title: data.alert.title
                        });
                        */
                    }
                }
            }, true);
        },

        commonAlertHandler: function(alert){
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
                lgkorUI.confirm(desc, obj);
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
                lgkorUI.alert(desc, obj);
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
            //console.log("moduleIDs :", moduleIDs);

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
                    imgPath: '/lg5-common/images/CS/img-model-name-example.jpg',
                    imageAlt: '모델명 및 제조번호 확인 예시 이미지',
                    categoryPlaceholder: '카테고리 선택',
                    subCategoryPlaceholder: '세부 카테고리 선택'
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

                        lgkorUI.hideLoading();
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
                            $resultImg = self.$result.find('.img img');
                        var data = result.data;
                        
                        $resultTxt.html(data.text);
                        $resultImg.attr('src', data.imgPath);
                        $resultImg.attr('alt', data.imageAlt);

                        lgkorUI.hideLoading();
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
                        var $resultTxt = self.$result.find('.txt'),
                            $resultImg = self.$result.find('.img img');
                        var options = self.options;

                        $resultTxt.html(options.text);
                        $resultImg.attr('src', options.imgPath);
                        $resultImg.attr('alt', options.imageAlt);

                        self.$category.find('option.placeholder').prop('selected', true);
                        self.$subCategory.prop('disabled', true);
                        self.$subCategory.find('option:not(.placeholder)').remove();

                        self.$category.vcSelectbox('update');
                        self.$subCategory.vcSelectbox('update');
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

        //크레마로그인
        cremaLogin:function() {
            if(typeof digitalData !== 'undefined') {
                if(digitalData.userInfo && !vcui.isEmpty(digitalData.userInfo)) {
                    window.cremaAsyncInit = function () {
                        crema.init("이름",digitalData.userInfo.unifyId);
                    };
                } else {
                    window.cremaAsyncInit = function () {
                        crema.init(null,null);
                    };
                }
            } else {
                window.cremaAsyncInit = function () {
                    crema.init(null,null);
                };
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        lgkorUI.init();
    });

    global.addEventListener('load', function(){
        vcui.require(['ui/sticky'], function () {
            $('.ui_sticky').vcSticky('update');
        });
    });

})(window);

