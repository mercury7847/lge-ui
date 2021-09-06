var lls = {
    init: function(){
        var self = this;
        
        self.settings();
        //self.backgroundSwitch();
        self.bindEvent();
        self.heroSlider();
        self.highlightSlider();
        self.onbroadProductSlider();
        self.appPushVisibleCheck();
    },
    settings: function(){
        var self = this;
        self.mktValue = "";
        self.pushValue = "";
        self.$llsMain = $('.lls-main');
        self.$switch = self.$llsMain.find('.ui_background_switch')
        self.$pushBtn = self.$llsMain.find('.btn-lls-push');
        self.pushBtn = null;

        self.$heroWrap = self.$llsMain.find('.hero-wrap');
        self.$heroSwiper = self.$heroWrap.find('.hero-slider');
        self.$playBtn = self.$heroWrap.find('.play-controls .btn-play');

        self.$highSection = self.$llsMain.find('.recently-highlight');
        self.$highSlider = self.$highSection.find('.recently-highlight-slider');

        self.$onbroad = self.$llsMain.find('.onbroad-product');
        self.$onbroadSlider = self.$onbroad.find('.onbroad-product-slider');

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
    appPushVisibleCheck: function(){
        var self = this;
        if( isApp()) {
            
            if( vcui.detect.isIOS ) {
                appMKTpushCheck = function(value){
                    var valueArray = value.split("|");
                    self.mktValue = valueArray[1];
                }
                appPushCheck = function(value){
                    self.pushValue = value;
                }
                var jsonString= JSON.stringify({"command": "getSettingOptions", "callback": "appMKTpushCheck"});
                webkit.messageHandlers.callbackHandler.postMessage(jsonString);

                var pushString= JSON.stringify({"command": "getPushStatus", "callback": "appPushCheck"});
                webkit.messageHandlers.callbackHandler.postMessage(pushString);
            } else {
                self.mktValue = android.getAdPushActive()
                self.pushValue = android.getOSPush();
                // alert("self.mktValue::" + self.mktValue + " self.pushValue::" + self.pushValue)
            }

            setTimeout(function(){
                if( self.pushValue == "Y" && self.mktValue == "Y") {
                    self.$pushBtn.addClass('active').find('span').text('알림받는중');
                } else {
                    self.$pushBtn.removeClass('active').find('span').text('푸시알림받기');
                }
                self.$llsMain.find('.lls-push').addClass('active');
            }, 50)
        }
    },
    bindEvent: function(){
        var self = this;

        LGEPushSetting = function(flag){
            var msg = {
                flagY: self.showDate() + " 알림 허용 처리가 완료되었습니다.",
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
                        self.$pushBtn.addClass('active').find('span').text('알림받는중');
                    }
                }, self.pushBtn);
            } else {
                lgkorUI.alert("", {
                    title: msg.flagN,
                    okBtnName: "기기 알림 켜기",
                    ok: function(el) {
                        if( vcui.detect.isIOS ) {
                            var jsonString= JSON.stringify({"command": "goSetting"});
                            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                        } else {
                            void android.openOSSetting();
                        }
                    }
                }, self.pushBtn);
            }
        }

        //앱 알림받기 버튼
        self.$pushBtn.on('click', function(e){
            var _self = this;

            self.pushBtn = _self;
            e.preventDefault();

            self.appPushVisibleCheck();

            if( isApp() ) {
                setTimeout(function(){
                    if( $(this).hasClass('active')) {
                        lgkorUI.confirm("", {
                            title: "알림 받기 해제 시 마케팅 푸시<br>알림 거부 처리가 됩니다. 알림<br> 받기를 해제 하시겠습니까?",
                            okBtnName: "해제하기",
                            ok: function(el) {
                                if( vcui.detect.isIOS ) {
                                    var jsonString= JSON.stringify({"command": "setMkt", "value": "N"});
                                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                                } else {
                                    android.setAdPushActive("N")
                                }
    
                                lgkorUI.alert("", {
                                    title: self.showDate() + "<br>알림 해제 처리가 <br>완료되었습니다.",
                                    ok: function(el) {
                                       self.$pushBtn.removeClass('active').find('span').text('푸시알림받기')
                                    }
                                }, self.pushBtn);
                            }
                        }, self.pushBtn);
                    } else {
                        LGEPushSetting(self.pushValue)
                    }

                }, 70);
            }
        });


        //최신 하이라이트 목록 클릭시 모바일 기기가 아니면 앱설치 팝업 활성화
        self.$highSlider.find('.slide-item a').on('click', function(e){
            if( self.$highSlider.hasClass('swipping')) {
                e.preventDefault();
            } else {
                if( !vcui.detect.isMobileDevice ) {
                    e.preventDefault();
                    self.$appInstallPopup.vcModal({opener:$(this)});
                } 
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
    showDate: function(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var date = now.getDate();
        var hours = now.getHours();
        var textTime = year + "년 " + month + "월 " + date + "일 " + hours + "시" ;

        return textTime;
    },
    heroSlider: function(){
        //히어로 배너 슬라이드
        var self = this;
        
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

        if(self.$heroSwiper.find('.hero-item').length > 1) {
            self.$playBtn.addClass('active');
        }

        self.$heroSwiper.slick({
            dots: true,
            infinite: true,
            arrows: true,
            autoplay:true,
            autoplaySpeed: 5000,
            prevArrow: self.$heroWrap.find('.slick-prev'),
            nextArrow: self.$heroWrap.find('.slick-next')
        })

        self.$playBtn.addClass('stop').find('.blind').text(self.$playBtn.find('.blind').attr('data-stop-text'));
        self.$playBtn.on('click', function(e){
            var $this = $(this);
            var $text = $this.find('.blind');
            if( $(this).hasClass('stop') ) {
                $this.removeClass('stop')
                self.$heroSwiper.slick('slickPause')
                $text.text($text.attr('data-play-text'))
            } else {
                $this.addClass('stop')
                self.$heroSwiper.slick('slickPlay')
                $text.text($text.attr('data-stop-text'))
            }
        })
    },
    highlightSlider: function(){
        //최신 하이라이트 슬라이드
        var self = this;

        self.$highSlider.slick({
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            outerEdgeLimit: false,
            infinite:false,
            variableWidth:false,
            prevArrow: self.$highSection.find('.slick-prev'),
            nextArrow: self.$highSection.find('.slick-next'),
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    arrows:true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    variableWidth:false,
                    outerEdgeLimit: false,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    arrows:false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    variableWidth:true,
                    outerEdgeLimit: true,
                  }
                }
            ]
        })
        self.$highSlider.on('swipe', function(slick, dir){
            self.$highSlider.addClass('swipping')
        })
        self.$highSlider.on('afterChange', function(slick, currentSlide){
            self.$highSlider.removeClass('swipping')
        })

        self.$highSlider.find('a').on('click', function(e){
            if( self.$highSlider.hasClass('swipping')) {
                e.preventDefault()
                return;
            }
        });
    },
    onbroadProductSlider: function(){
        var self = this;
        var defaultConfig = {

        }

        //방송에 나온 그 제품 슬라이드
        self.$onbroadSlider.slick({
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite:false,
            variableWidth:false,
            outerEdgeLimit: false,
            prevArrow: self.$onbroad.find('.slick-prev'),
            nextArrow: self.$onbroad.find('.slick-next'),
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    arrows:true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    variableWidth:false
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    arrows:false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    variableWidth:true,
                    outerEdgeLimit: true,
                  }
                }
            ]
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
