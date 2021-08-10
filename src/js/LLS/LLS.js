var lls = {
    init: function(){
        var self = this;
        
        self.settings();
        //self.backgroundSwitch();
        self.bindEvent();
        self.heroSlider();
        self.highlightSlider();
        self.onbroadProductSlider();
    },
    settings: function(){
        var self = this;
        self.$llsMain = $('.lls-main');
        self.$switch = self.$llsMain.find('.ui_background_switch')
        self.$pushBtn = self.$llsMain.find('.btn-lls-push');
        self.pushBtn = null;
        self.$highSection = self.$llsMain.find('.recently-highlight');
        self.$highSlider = self.$highSection.find('.recently-highlight-slider');

        self.$eventSection = self.$llsMain.find('.event-announced');
        self.$eventList = self.$eventSection.find('.event-item-list');
        self.$eventAnchor = self.$eventList.find('.item-list-anchor');
        self.$appInstallPopup = $('#appInstallGuidePopup');
    },
    backgroundSwitch: function(){
        var self = this;

        self.$switch.each(function(idx, item){
            var pcSrc = $(item).data('pcSrc');
            var moSrc = $(item).data('moSrc');
            var currentSrc =  window.innerWidth < 768 ? moSrc : pcSrc;
            $(item).css('background-image', 'url(' + currentSrc + ')')
        })
    },
    bindEvent: function(){
        var self = this;

        function LGEPushSetting(flag){
            var msg = {
                flagY: "엘LGE라 LIVE Show<br>알림 받기가 완료되었습니다.",
                flagN: "정보 알림을 받기 위해서<br>기기 알림을 켜주세요.",
            }
            if( flag == "Y" ) {
                lgkorUI.alert("", {
                    title: msg.flagY,
                    ok: function(el) {
                        if( vcui.detect.isIOS ) {
                            var jsonString= JSON.stringify({"command": "setMkt", "value": "Y"});
                            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                        } else {
                            android.setAdPushActive("Y")
                        }
                    }
                }, self.pushBtn);
            } else {
                lgkorUI.alert("", {
                    title: msg.flagN,
                    okBtnName: "기기 알림 켜기",
                    ok: function(el) {
                        location.href = '/mobile-app/option'
                    }
                }, self.pushBtn);
            }
        }

        //앱 알림받기 버튼
        self.$pushBtn.on('click', function(e){
            var _self = this;

            self.pushBtn = _self;
            e.preventDefault();

            if( isApp() ) {
                if(vcui.detect.isIOS){
                    var obj = new Object();
                    obj.command = "setMkt";
                    obj.value = "Y";
                    var jsonString= JSON.stringify(obj);
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                } else {
                    android.setAdPushActive("Y");
                }

                lgkorUI.alert("", {
                    title: "엘LGE라 LIVE Show<br>알림 받기가 완료되었습니다.",
                    ok: function(el) {
                        
                    }
                }, _self);
            }
            
        });


        //최신 하이라이트 목록 클릭시 모바일 기기가 아니면 앱설치 팝업 활성화
        self.$highSlider.find('.slide-item a').on('click', function(e){
            if( !vcui.detect.isMobileDevice ) {
                e.preventDefault();
                self.$appInstallPopup.vcModal({opener:$(this)});
            }
        });

        //이벤트 당첨자 발표 목록 클릭시 당첨자 발표 목록 윈도우팝업
        self.$eventAnchor.on('click', function(e){
            e.preventDefault();
            self.requestModal(this);
        });
        
    },
    requestModal: function(dm) {
        var _self = this;
        var ajaxUrl = $(dm).attr('href');
        window.open(ajaxUrl,'','width=912,height=760,scrollbars=yes');
    },
    heroSlider: function(){
        //히어로 배너 슬라이드
        var $heroSwiper = $('.hero-slider');
        var $playControl = $heroSwiper.find('.swiper-play-controls');
        var $btnPlay = $playControl.find('.btn-play');
        var liveTid = 0;
        var speed = 1000;

        function liveCheck($target, start, end){
            var date = new Date();
            var $flag = $target.find('.hero-item-flag');
            var $flagText = $flag.find('.flag-title-text');

            if( date >= new Date(start) && date <= new Date(end)) {
                $flag.addClass('live-now')
                $flag.find('.flag-title-text').text($flagText.data('liveText'))
            } else {
                $flag.removeClass('live-now')
                $flag.find('.flag-title-text').text($flagText.data('expectedText'))
            }
        }

        var heroSwiper = new Swiper('.hero-slider', {
            loop:true,
            slidesPerView:1,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function(swiper){
                    $btnPlay.addClass('stop');
                },
                // slideChange: function(swiper){
                //     var $currentSlide = $(swiper.slides[swiper.activeIndex]);
                //     var $flag = $currentSlide.find('.hero-item-flag');
                //     var liveStartTime = $flag.attr('data-live-start')
                //     var liveEndTime = $flag.attr('data-live-end');
                    
                //     liveCheck($currentSlide, liveStartTime, liveEndTime)
                //     clearInterval(liveTid)
                //     liveTid = setInterval(function(){
                //         liveCheck($currentSlide, liveStartTime, liveEndTime)
                //     }, speed)
                // }
            }
        });

        $btnPlay.on('click', function(e){
            var $this = $(this);
            var $alt = $this.find('.blind');
            var playTxt = $alt.data('playText');
            var stopTxt = $alt.data('stopText');

            e.preventDefault();

            if( $heroSwiper.hasClass('swiper-container-initialized') ) {
                if( $this.hasClass('stop')) {
                    $this.removeClass('stop')
                    heroSwiper.autoplay.stop();
                    $alt.text(playTxt);
                } else {
                    $this.addClass('stop')
                    heroSwiper.autoplay.start();
                    $alt.text(stopTxt);
                }
            }
        })
    },
    highlightSlider: function(){
        //최신 하이라이트 슬라이드
        var highlightSwiper = new Swiper('.recently-highlight-slider', {
            slidesPerView: "auto",
            slidesPerGroup:2, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.recently-highlight .swiper-button-next',
                prevEl: '.recently-highlight .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup:2, 
                },
                // when window width is >= 640px
                768: {
                  slidesPerView: 3,
                  slidesPerGroup:3,
                },
                1025: {
                    slidesPerView:5,
                    slidesPerGroup:5, 
                }
            }
        })
    },
    onbroadProductSlider: function(){
        //방송에 나온 그 제품 슬라이드
        var productSwiper = new Swiper('.onbroad-product-slider', {
            slidesPerView: "auto",
            slidesPerGroup:1, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.onbroad-product .swiper-button-next',
                prevEl: '.onbroad-product .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup:1, 
                },
                // when window width is >= 640px
                768: {
                  slidesPerView: 3,
                  slidesPerGroup:3,
                },
                1025: {
                    slidesPerView:5,
                    slidesPerGroup:5, 
                }
            }
        })
    }
}

$(function(){
    lls.init();
    
    //화면 리사이즈시 pc or mobile로 바뀔때 한번씩만 이벤트 실행
    // var prevWindowSize = window.innerWidth;

    // $(window).on('resize', function(){
    //     //모바일 사이즈로 변할때 한번만.
    //     if( window.innerWidth < 768 && prevWindowSize >= 768) {
    //         lls.backgroundSwitch();
    //         prevWindowSize = window.innerWidth;
    //         console.log('mo size')
    //     }

    //     //PC 사이즈로 변할때 한번만.
    //     if( window.innerWidth >= 768 && prevWindowSize < 768) {
    //         lls.backgroundSwitch();
    //         prevWindowSize = window.innerWidth;
    //         console.log('pc size')
    //     }
    // });
});