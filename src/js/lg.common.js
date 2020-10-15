;(function(global){

    if(global['lgkorUI']) return;
    console.log("lgkorUI start!!!");

    $.fn.buildCommonUI = function () {
        vcui.require([        
                            'ui/selectbox',
                            'ui/calendar',
                            'ui/accordion',
                            'ui/carousel',
                            'ui/modal',
                            'ui/tab',       
                            'ui/lazyLoader',
                            "ui/videoBox",
                            "ui/youtubeBox",
                            "ui/imageSwitch",
                            "ui/dropdown",
                            "ui/textControl",
                            "ui/scrollview",
                            "ui/fileInput",
                            "ui/radioShowHide",
                            "ui/starRating"
        ], function () {    
            console.log("buildCommonUI!!!!");
            
            this.vcImageSwitch();
            this.vcLazyLoader();
    
            this.find('.ui_calendar').vcCalendar();
            this.find('.ui_accordion').vcAccordion();        
            this.find('.ui_selectbox').vcSelectbox();
            this.find('.ui_dropdown').vcDropdown();
            this.find('.ui_tab').vcTab();
            this.find('.ui_carousel').vcCarousel();
            this.find('.animation-box').vcVideoBox();
            this.find('.youtube-box').vcYoutubeBox();
            this.find('.ui_textcontrol').vcTextcontrol();
            this.find('.ui_scrollview').vcScrollview();
            this.find('.ui_fileinput').vcFileinput();
            this.find('.ui_radio_visible').vcRadioShowHide();
            this.find('.ui_star_rating').vcStarRating();


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
        COMPARE_ID: "compare_list",
        COMPARE_LIMIT: 3,
        init: function(){
            this._preloadComponents();
            this._addTopButtonCtrl();
        },
    
        // 주요 컴포넌트를 미리 로드
        _preloadComponents: function () {
            var self = this;

            vcui.require([  
                'helper/responsiveImage',
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
                'ui/lazyLoader',
                "ui/videoBox",
                "ui/youtubeBox",
                "ui/imageSwitch"
            ], function (ResponsiveImage, BreakpointDispatcher) {
                
                
    
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
                
                var breakpoint = {
                    mobile: 768,
                    pc: 100000
                }
                
                new ResponsiveImage('body', breakpoint);


                var $doc = $(document);                       

                //resize 이벤트 발생 시 등록 된 이벤트 호출...
                self.resizeCallbacks = [];
                $(window).on("addResizeCallback", function(e, callback){
                    self.resizeCallbacks.push(callback);
                }).on('resize', function(e){
                    for(var idx in self.resizeCallbacks){
                        self.resizeCallbacks[idx].call();
                    }

                    self._resetFlexibleBox();
                });  
                self._resetFlexibleBox();              
    
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
    
                            if(this.$('.ui_carousel').length>0){
                                this.$('.ui_carousel').vcCarousel('update');
                            }
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
                            if(data && data.content.find('.ui_carousel').length > 0) {
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }
                        }
                    }
                });
    
                $('header').vcHeader(); //헤더 모듈 적용...
                $('footer').vcFooter(); //푸터모듈 적용...

                $('body').buildCommonUI();
    
                $.holdReady(false); // ready함수 실행을 허용(이전에 등록된건 실행해준다.)
    
                // 모달이 열렸을 때 페이지 스크롤을 막기 위함 ////////////////////////////
                $doc.on('modalfirstopen modallastclose', function (e) {
    
                }).on('modalshown', function (e) {
                    // 모달이 뜰때 모달내부에 있는 공통 컴포넌트 빌드
                    //$(e.target).buildCommonUI();
                });
                //////////////////////////////////////////////////////////////////////
    
                // 아코디온이 펼쳐지거나 닫힐 때 레이아웃 사이즈가 변하기 때문에 resize이벤트를 강제로 발생시킨다.
                // $doc.on('accordionexpand accordioncollapse', vcui.delayRun(function (e) {
                //     $(window).triggerHandler('resize');
                // }, 200));
                ///////////////////////////////////////////////////////////////////////
            });
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
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });
        },

        _resetFlexibleBox: function(){
            //리스트 height 재설정
            $('body').find('.ui_flexible_height').each(function(idx, item){
                var maxheight = 0;
                $(item).find('> li').each(function(cdx, child){
                    var flexiblebox = $(child).find('.ui_flexible_box .ui_flexible_cont');
                    maxheight = Math.max(maxheight, flexiblebox.outerHeight(true));
                });

                $(item).find('> li .ui_flexible_box').height(maxheight);
            });
        },

        showLoading:function(msg){
            var str = msg? msg : '데이터를 불러오는 중입니다.';
            $('html').addClass('dim');
            $('body').vcSpinner({msg:str});
            $('body').vcSpinner('spin', str);    
        },
    
        hideLoading:function(){
            $('html').removeClass('dim');
            $('body').vcSpinner('stop');
        },

        addCompareProd: function(data){
            var self = this;

            var compareStorage = self.getStorage(self.COMPARE_KEY);
            if(compareStorage[self.COMPARE_ID] == undefined){
                compareStorage[self.COMPARE_ID] = [data];
            } else{
                var leng = compareStorage[self.COMPARE_ID].length;
                if(leng < self.COMPARE_LIMIT){
                    compareStorage[self.COMPARE_ID].push(data);
                } else{
                    $(window).trigger('excessiveCompareStorage');
                    return false;
                }
            }
            self.setStorage(self.COMPARE_KEY, compareStorage);

            return true;
        },

        removeCompareProd: function(id){
            var self = this;

            var compareStorage = self.getStorage(self.COMPARE_KEY);
            compareStorage[self.COMPARE_ID] = vcui.array.filter(compareStorage[self.COMPARE_ID], function(item){
                return item['id'] != id;
            });

            self.setStorage(self.COMPARE_KEY, compareStorage);
        },

        initCompareProd: function(){
            var self = this;
            
            var obj = {};
            obj[self.COMPARE_ID] = [];
            self.setStorage(self.COMPARE_KEY, obj);
        },

        setStorage: function(key, value){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};        
            storageData = Object.assign(storageData, value);
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
        }
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        lgkorUI.init();
    });

})(window);

