;$(function() {
    var thinQMain = {
        init: function(){
            var self = this;
            self.settings();
            self.bindEvents()
            self.heroSlider();
            self.magazinSlider();
            self.setMagazineVideo();

            vcui.require(['libs/slick.min'], function () {
                
                self.contentTab();
            });
        },
        settings: function(){
            var self = this;
            self.$thinqMain = $('.thinq-main');
            self.$heroSlider = self.$thinqMain.find('.hero-banner');
            self.$magazin = self.$thinqMain.find('.magazine-wrap');
            self.$magazinSlider = self.$magazin.find('.ui_carousel_slider');

            self.$stickyTabWrap = self.$thinqMain.find('.thinq-tabs');
            self.$stickyTab = self.$stickyTabWrap.find('.ui_tab');

            self.$appContainer = self.$thinqMain.find('.app-wrap');
            self.$appTabArea = self.$appContainer.find('.app-tab-area')
            self.$appTabCont = self.$appTabArea.find('.app-tab-content');
            self.$appTabMenu = self.$appTabArea.find('.menu-slide-nav');
            self.$appTablist = self.$appTabMenu.find('.menu-item');
            self.$appTabBtnAll = self.$appTabArea.find('.btn-allview');
            self.$appGuideSlider = self.$appContainer.find('.download-guide-slide');
            self.$howToUseAppSlider = $('.howto-slider');
        },
        bindEvents: function(){
            var self = this;

            $(document).on('click', 'a', function(e){
                var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
                if(href == '#' || href == '#n'){
                    e.preventDefault();
                }else{
                    if (href && /^(#|\.)\w+/.test(href)) {                    
                        var $compareTarget = $('.thinq-tabs .ui_tab').find('a[href="'+href+'"]');
                        if($compareTarget[0] != e.currentTarget) {
                            $('.thinq-tabs .ui_tab').vcTab('selectByName', href);
                        }
                    }                
                }      
            });

            self.$appTabBtnAll.on('click', function(e){
                var $parent = $(this).parents('.menu-slide-block');
                if(!$parent.hasClass('is-active')){
                    $parent.addClass('is-active');
                    $(this).children('.txt').text('닫기');
                    self.appSmartTab.destroy()
                }else{
                    $parent.removeClass('is-active');
                    $(this).children('.txt').text('전체보기');
                    self.appSmartTab.init()
                }
            })

            self.$appTablist.find('a').on('click', function(e) {
                e.preventDefault();
                self.$appTabCont.find('.tab-cont').hide().filter(this.hash).show();
                self.$appTablist.removeClass('on');
                $(this).parent().addClass('on');
            }).filter(':eq(0)').click();

            self.$appGuideSlider.find('.btn-howToUse').on('click', function(e) {
                setTimeout(function(){
                    self.sliderInPopup.load();
                },100)
            })
        },
        heroSlider: function(){
            //최상단 히어로배너
            var self = this;

            self.$heroSlider.vcCarousel('destroy').vcCarousel({
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
            });

            var $thinqSlideNum = self.$heroSlider.find('.slide-conts');
            var $thinqSlideLength = self.$heroSlider.find('.custom-indi-wrap');
            if($thinqSlideNum.length === 1) {
                $thinqSlideLength.hide();
            }
        },
        magazinSlider: function(){
            var self = this;

            //매거진탭 영상하단 슬라이더
            self.$magazinSlider.vcCarousel({
                infinite: false,
                slidesToShow: 5,
                slidesToScroll: 5,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            });
        },
        setMagazineVideo: function(){
            var self = this;
            var videoTmpl = '<iframe src={{link}} '+
            'id="videoPlayerCode" frameborder="0" allowfullscreen="1" '+
            'allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" '+
            'title="YouTube video player"></iframe>';

            $('#thinq-cont4').off('click', '.video-thumb a');
            $('#thinq-cont4').on('click', '.video-thumb a', function(e){
                var href = $(e.currentTarget).attr('data-url').replace(/ /gi, "");
                $('#thinq-cont4').find('.video-box').empty().html(vcui.template(videoTmpl,{link:href}));   
                var $videoBtns = $('#thinq-cont4').find('.magazine-wrap .ui_carousel_slider .ui_carousel_slide');
                $videoBtns.removeClass('slide_on');
                $videoBtns.find('span.blind.bh-add').remove();
                $(e.currentTarget).closest('.ui_carousel_slide').addClass('slide_on').append('<span class="blind bh-add">선택됨</span>');
                var aT = $(e.currentTarget).closest('.ui_carousel_slide').find('a:eq(0)');
                if(aT.length > 0) {
                    aT.append('<span class="blind bh-add">선택됨</span>');
                }
            });
            
            var $videoBtns = $('#thinq-cont4').find('.magazine-wrap .ui_carousel_slider .ui_carousel_slide');
            var $videoOnBtn = $videoBtns.siblings('.slide_on').find('a[data-url]');
            $videoOnBtn.trigger('click');
        },
        contentTab: function(){
            var self = this;

            var stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            self.$stickyTab.on('tabchange', function(e, data){
                self.$thinqMain.scrollTop(0); 
                $('html, body').stop().animate({scrollTop:stickyTabOffsetTop});

                if( data.content[0] == $('.thinq-app')[0]) {
                    self.appSmartTab.load();
                    self.appDownloadGuideSlider.load();
                }
            })
        },
        appSmartTab: {
            slideConfig : {
                infinite: false,
                slidesToShow: 7,
                slidesToScroll: 7,
                focusOnSelect: true,
                responsive: [
                    {
                        breakpoint:1024,
                        settings:{
                            infinite: false,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            focusOnSelect: true,
                        }
                    },
                    {
                        breakpoint:768,
                        settings:{
                            infinite: false,
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            focusOnSelect: true,
                            arrows:false,
                        }
                    }
                ]
            },
            init: function(){
                var tabs = this;
                thinQMain.$appTabMenu.not('.slick-initialized').slick(tabs.slideConfig)
            },
            reinit: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('refresh')
            },
            load: function(){
                if( thinQMain.$appTabMenu.hasClass('slick-initialized') ) {
                    this.reinit();
                } else {
                    this.init();
                }
            },
            destroy: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('unslick');
            }
        },
        appDownloadGuideSlider:{
             // 앱 다운안내 슬라이드
            slideConfig: {
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            },
            init: function(){
                var guideSlider = this;
                thinQMain.$appGuideSlider.not('.slick-initialized').slick(guideSlider.slideConfig)
            },
            reinit: function(){
                thinQMain.$appGuideSlider.filter('.slick-initialized').slick('refresh')
            },
            load: function(){
                if( thinQMain.$appGuideSlider.hasClass('slick-initialized') ) {
                    this.reinit();
                } else {
                    this.init();
                }
            }
        },
        sliderInPopup: {
            // ThinQ 앱 설치 및 사용방법 슬라이드 
            slideConfig: {
                dots: true,
                infinite:false,
                spped:300,
                slidesToShow:3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }

                ]
            },
            init: function() {
                var slider = this;
                thinQMain.$howToUseAppSlider.not('.slick-initialized').slick(slider.slideConfig)
            },
            reinit: function(){
                thinQMain.$howToUseAppSlider.filter('.slick-initialized').slick('refresh')
            },
            load: function(){
                if( thinQMain.$howToUseAppSlider.hasClass('slick-initialized') ) {
                    this.reinit();
                } else {
                    this.init();
                }
            }
        },
        modelSearchPopupInit: function(){
            var self = this;
            $('.ui_selectbox').vcSelectbox();
        },
        scroll: function(scrollTop){
            var self = this;
            
            var stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            if(scrollTop >= stickyTabOffsetTop) {
                self.$thinqMain.addClass('active on');
            } else {
                self.$thinqMain.removeClass('active on');
            }
        },
        resize: function(){

        }
    };
    thinQMain.init();    

    $(window).on('resize', function(){

    })

    $(window).on('breakpointchange', function(e){
        var data = window.breakpoint;            
        if(data.name == 'mobile'){    
            isMobile = true;   
        }else if(data.name == 'pc'){    
            isMobile = false;
        }    
    })

    $(window).on('scroll', function(){
        var scrollTop = $(this).scrollTop()
        thinQMain.scroll(scrollTop)
    })

    // 접근성 탭 이동시 화면처리
    $(document).on('focusin', function(e){
        /* 20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
        // if($.contains($('.thinq-wrap')[0], e.target)){
        //     currentPage = pageLens;
        //     currentStep = stepLens;
        // }
        // else if($.contains($('.signature-hero')[0], e.target)){
        //     // currentPage = 0;
        //     // currentStep = 0;
        // }
        /* //20210629 BTOCSITE-1519 : 히어로배너 구조 변경 */
    });


});
    