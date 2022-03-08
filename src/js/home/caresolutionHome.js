//BTOCSITE-12128 메인성능개선 - 스크립트 구조 변경
(function(global){
    var script = {
        name : "caresolutionHome",
        hash : 'care-solutions'
    };

    if(global[script.name]) return; // 중복로딩 차단 

    var detect = vcui.detect;
    var isMobileDevice = detect.isMobileDevice;    


    var carePopupInit = 
    '<article id="care-init-popup" class="popup-wrap small main-init-popup care-popup"  style="max-width:500px">' + 
        '<header class="pop-header">' + 
            '<h1 class="tit"><span>안내</span></h1>' + 
        '</header>' + 
        '<section class="pop-conts" style="text-align:center;">' + 
            '<section class="section">' + 
                '<div class="headline">' + 
                    '<h3 class="h-tit-3">주주확정기준일설정공고</h3>' + 
                '</div>' + 
                '<div class="text-cont">' + 
                    '상법 제354조 및 우리 회사 정관 제21조에<br> 의거하여, ' + 
                    '다음과 같이 임시주주총회에서<br> 의결권을 행사할 주주 확정을 위한 ' + 
                    '기준일을<br> 정하였으니 양지하여 주시기 바랍니다. ' + 
                    '<br><br> - 다  음 - <br><br>' + 
                    '■주주확정기준일: 2021년 12월 10일<br><br>' +
                    '<p style="text-align:right;">2021년 11월 25일</p>' +
                    '<p style="text-align:right;">LG전자 주식회사</p>' +
                '</div>' + 
                '<div class="btn-wrap">' + 
                    '<a href="https://www.lge.co.kr/company/investor/announceView?anncmNo=18&page=1#com-tabs02" title="pdf 확인하기" class="btn full border size-m"><span>자세히 보기</span></a>' + 
                '</div>' + 
            '</section>' + 
        '</section>' + 
        '<div class="pop-footer check-type align-between">' + 
            '<span class="chk-wrap" data-role="today-cookie-check">' + 
                '<input type="checkbox" id="init-popup-check-today" name="init-popup-check-today">' + 
                '<label for="init-popup-check-today">7일동안 보지 않기</label>' + 
            '</span>' + 
            '<button type="button" class="btn pink btn-main-pop-close size"><span>닫기</span></button>' + 
        '</div>' + 
        '<button type="button" class="btn-close btn-main-pop-close"><span class="blind">닫기</span></button>' + 
    '</article>';



    var $context = isMobileDevice ? $('[data-hash="care-solutions"]') : $(document);
    var careCommon = {
        setting : function(){
            var self = this;
            // 제품 코드 관리 부분
            $context.find('.ui_carousel_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100
            });

            // 플로우배너
            $context.find('.ui_carousel_slider_banner').vcCarousel({
                infinite: true,
                //autoplay: true,
                //autoplaySpeed: 2000,
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth : true,
                centerMode: true,
                centerPadding: '13.5%',
                dots: false,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: true,
                            //autoplay: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 3,
                            slidesToScroll: 1, 
                            centerMode: true,
                            centerPadding: '13.5%',
                        }
                    },                
                    {
                        breakpoint: 1400,
                        settings: {
                            infinite: true,
                            //autoplay: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 2,
                            slidesToScroll: 1,  
                            centerMode: true, 
                            centerPadding: '17%',
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            infinite: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 1, 
                            slidesToScroll: 1,
                            centerMode: true,
                            centerPadding: '25%',
                        }
                    }
                ]
            });        

            $context.find('.ui_carousel_slider_banner2').vcCarousel({
                infinite: true,
                //autoplay: true,
                autoplaySpeed: 1800,
                slidesToShow: 4,
                slidesToScroll: 1,
                variableWidth : true,
                dots: false,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: true,
                            //autoplay: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            infinite: true,
                            //autoplay: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    /*
                    {
                        breakpoint: 900,
                        settings: {
                            infinite: true,
                            variableWidth : true,
                            dots: true,
                            slidesToShow: 2, 
                            slidesToScroll: 1
                        }
                    },*/
                    {
                        breakpoint: 768,
                        settings: {
                            infinite: true,
                            variableWidth : false,
                            // dots: true,
                            slidesToShow: 2, 
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            // 케어솔루션 가이드
            $context.find('.care-guide-visual .ui_carousel_slider2').vcCarousel({
                infinite: false,
                centerMode: true,
                //centerPadding: '25%',
                slidesToShow: 1,
                slidesToScroll: 1,
                variableWidth : true,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: false,
                            slidesToShow: 1, 
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            /* BTOCSITE-6883 신규 WSG 적용 - 렌탈/케어 */
            // 히어로배너
            var $hSlider =  $context.find('.contents.caresolution .ui_wide_slider').vcCarousel('refresh').vcCarousel({
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
            }).on('carouselafterchange', function(e, slide, prev, next){
                self.careHeroBanner();
            })

            self.careHeroBanner();

            self.carePopupInit();

        },
        bindEvent : function() {
            // 케어솔루션 혜택
            // 다른 케어솔루션 
            $(window).off('breakpointchange.caresolution').on('breakpointchange.caresolution', function(e){

                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){    
                    $context.find('.ui_carousel_m1_slider').vcCarousel({
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    });
                    
                }else if(breakpoint.name == 'pc'){    
                    $context.find('.ui_carousel_m1_slider').vcCarousel('destroy');       
                    $context.find('.ui_carousel_m1_slider').find('.indi-wrap').hide();                     
                }    
            });

            $(window).trigger('breakpointchange.caresolution');


            $('.ui_care_detail_btn').off('click').on('click', function(e){
                e.preventDefault();
                var $target = $(e.currentTarget);
                var url = $target.data('url');
                if(url) location.href = url;
            });
        },

        careHeroBanner : function() {
            var heroList = $context.find('.contents.caresolution .hero-banner .slide-track > li');
            var heroListAct = heroList.siblings('.ui_carousel_current').index();
            var heroListLens = heroList.length;
            var custom = $context.find('.contents.caresolution .custom-indi-wrap');
            var slideCurrent = custom.find('.slide-page .current');
            var slideCount = custom.find('.slide-page .count');        

            if( heroListLens > 1) {
                custom.show();
                slideCurrent.text(heroListAct);
                slideCount.text(heroListLens - 2);
            }
        },

        carePopupInit : function(){
            var enableUrl = [
                '^/care-solutions$', // 케어솔루션 홈
            ];
    
            var isPopUp = enableUrl.some(function(element) {
                return location.pathname.match(new RegExp(element,"g"))
            });
    
            $(function() {
                var cookie_InitPopName = '__LG_CARE_POPUP_INIT';
                if (vcui.Cookie.get(cookie_InitPopName) === '' && isPopUp ) {
                    if($('#care-init-popup').size() === 0 && !!vcui.modal) {
                        $('body').append(vcui.template(carePopupInit));
                        $('#care-init-popup').vcModal('show');
    
                        $(document).on('click', '#care-init-popup .btn-main-pop-close', function (e) {
                            var _expireChecked = $('#care-init-popup').find('.check-type input:checkbox').prop('checked');
    
                            if( _expireChecked ) {
                                vcui.Cookie.set(cookie_InitPopName, 'hide', {"expires": 7, "path": '/'});
                            }
                            $('#care-init-popup').vcModal('hide');
                            $('html, body').css('overflow', '');
                            return;
                        });
                    }
                }
            });
        },

        init : function(){
            var self = this;

            self.setting();
            self.bindEvent();
        }
    }


    /* 케어솔루션 추천 제품 */ 
    // BTOCSITE-11900 QA535 오류수정 start
    var careRecomTab = {
        $el :         $context.find('.care-recommended .ui_product_tab'),
        $tabs :       $context.find('.care-recommended .ui_product_tab > .tabs'),
        $tabContent : $context.find('.care-recommended .ui_product_carousel_slider'),
        startX : 0,
        startY : 0,
        endX : 0,
        endY : 0,

        totalSize: function () {
            return this.$tabs.find('li').size();
        },
        currentTab: function () {
            return this.$tabs.find('li.on').index() + 1;
        },
        triggerTab: function (idx) {
            this.$tabs.find('li').eq(idx).find('a').trigger('click');
        },
        prev: function () {
            var idx = (1 === this.currentTab()) ? this.totalSize() - 1 : this.currentTab() - 2;
            this.triggerTab(idx);
        },
        next: function () {
            var idx = (this.totalSize() === this.currentTab()) ? 0 : this.currentTab();
            this.triggerTab(idx);
        },
        init: function() {
            var self = this;
            self.$el =           $context.find('.care-recommended .ui_product_tab');
            self.$tabs =         this.$el.find('>.tabs');
            self.$tabContent =   $context.find('.care-recommended .ui_product_carousel_slider');

            self.$el.on('tabbeforechange tabchange tabinit', function(e, data){
                //탭 이벤트 분기
                switch(e.type) {
                    case "tabinit" :
                        // 탭초기화시 탭선택
                        // var idx = Math.floor(Math.random() * self.totalSize() || 0);
                        self.$el.vcTab('select',0).vcSmoothScroll('scrollToActive');
                    break;
                    default :
                    break;
                }
                self.$el.vcSmoothScroll('scrollToActive');
            }).vcTab().vcSmoothScroll('refresh');

            // 탭 클릭시 인덱스를 세션스토리지에 기록
            var store = window.sessionStorage;
            var session_name = 'care_cecommended_tabindex';
            self.$tabs.find('a').on('click', function () {
                var idx = $(this).parent().index();
                store.setItem(session_name, idx);
            });
            // 리로드시 탭 인덱스 세션이 있을 경우 트리거
            if (store.getItem(session_name)) {
                self.$tabs.find('a').eq(store.getItem(session_name)).trigger('click');
            }

            if( !vcui.detect.isMobileDevice ) {
                self.$tabContent.vcGesture({
                    direction: 'horizontal'
                }, { passive: false }).on('gestureend', function (e, data) {
                    // gesturestart gesturemove gestureend gesturecancel
                    if (data.direction === 'left') {
                        careRecomTab.next();
                    } else {
                        careRecomTab.prev();
                    }
                });
            } else {
                var touchFlag = true;
                var touchFlagTid = 0;
        
                self.$tabContent.on('touchstart', function(e){
                    self.startX = e.changedTouches[0].clientX;
                    self.startY = e.changedTouches[0].clientY;
                    self.endX = 0;
                    self.endY = 0;
                });


                self.$tabContent.on('touchend', function(e){
                    self.endX = e.changedTouches[0].clientX;
                    self.endY = e.changedTouches[0].clientY;
    
                    var dirLeft = self.startX - self.endX < 0;
                    var rangeX = Math.abs(self.startX - self.endX);
                    var rangeY = Math.abs(self.startY - self.endY);
    
                    if( rangeY > 30) return;
                    
                    if( touchFlag == true && rangeX > 100 ) {
                        touchFlag = false;
                        if(dirLeft) {
                            self.prev();
                            // console.log('left')
                        } else {
                            self.next();
                            // console.log('right')
                        }
    
                        clearTimeout(touchFlagTid);
                        touchFlagTid = setTimeout(function(){
                            touchFlag = true;
                            // console.log("rangeX", rangeX)
                            // console.log("rangeY", rangeY)
                        }, 50);
                    }
                });
            }
        }
    };

    $(window).ready(function(){
        if(isMobileDevice) {
            $(window).off('scriptLoad').on('scriptLoad',function(e,data) {
                if(data.script == script.name){
                    var currentSlide = data.swiper.slides[data.swiper.activeIndex];
                    if($(currentSlide).attr('data-hash') === script.hash) {
                        setTimeout(function(){
                            careCommon.init();
                            careRecomTab.init();
                        },150);
                    }
                }
            })

            $(window).on('scriptChange',function(e,data) {
                var currentSlide = data.swiper.slides[data.swiper.activeIndex];
                if($(currentSlide).attr('data-hash') === script.hash) {
                    setTimeout(function(){
                        careCommon.init();
                        careRecomTab.init();
                    },150);
                }
            })

            $(window).trigger('swConScriptLoad',{ script : script.name});
        } else {
            careCommon.init();
            careRecomTab.init();
        }

        global[script.name] = true; // 중복 로딩 체크
    })
})(window);

