;$(function() {   
    var catalogList = {
        init: function(){
            var self = this;

            self.settings();

            vcui.require(['libs/slick.min', 'ui/pagination'], function () {
                self.bindEvents();
                self.resize();
                self.contentTab();
            });
        },
        settings: function(){
            var self = this;
            self.$catalList = $('.catal-wrap');
            self.$catalListWrap = self.$catalList.find('.catal-list-wrap');

            //전체 탭
            self.$stickyTabWrap = self.$catalList.find('.catal-tab');
            self.$stickyTab = self.$stickyTabWrap.find('.ui_tab');
            self.stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            self.anchorContent = self.$catalList.find('.anchor-contents');

            //anchorContent.css('display', 'block !important');
        },
        bindEvents: function(){ 
            var self = this;

            // //페이징 이벤트 실행
            // self.$pagination = self.$searchPopup.find('.pagination').vcPagination({scrollTop : 'noUse'});

            // //앵커요소로 전체탭 전환
            // $(document).on('click', 'a', function(e){
            //     var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            //     if(href == '#' || href == '#n'){
            //         e.preventDefault();
            //     }else{
            //         if (href && /^(#|\.)\w+/.test(href)) {
            //             var $compareTarget = $('.catal-tab .ui_tab').find('a[href="'+href+'"]');
            //             if($compareTarget[0] != e.currentTarget) {
            //                 $('.catal-tab .ui_tab').vcTab('selectByName', href);
            //             }
            //         }
            //     }
            // });

            

            //App 탭 > 우리집 스마트한 생활 > 메뉴 전체보기 버튼
            // self.$appTabBtnAll.on('click', function(e){
            //     var $parent = $(this).parents('.menu-slide-block');

            //     if( window.innerWidth > 1024) { // BTOCSITE-8564 
            //         if(!$parent.hasClass('is-active')){
            //             $parent.addClass('is-active');
            //             $(this).children('.txt').text('닫기');
            //             self.appSmartTab.destroy();
            //         }else{
            //             $parent.removeClass('is-active');
            //             $(this).children('.txt').text('전체보기');
            //             var currentIndex = self.$appTablist.filter('.is-active').index();
            //             self.appSmartTab.init(currentIndex);
            //         }
            //     }else{
            //         var currentIndex = self.$appTablist.filter('.slick-current').index();
            //         if(!$parent.hasClass('is-active')){
            //             $parent.addClass('is-active');
            //             $(this).children('.txt').text('닫기');
            //             self.appSmartTabMobile.destroy();
            //             self.$appTabCont.slick('slickSetOption', 'swipe', false);
            //             self.$appTablist.eq(currentIndex).addClass('is-active')
            //         }else{
            //             $parent.removeClass('is-active');
            //             $(this).children('.txt').text('전체보기');
            //             self.appSmartTabMobile.init(currentIndex); 
            //             self.$appTabCont.slick('slickSetOption', 'swipe', true);
                        
            //         }
            //     }  
            // })
        },
        scroll: function(scrollTop){
            //전체탭 스티키
            var self = this;

            if( self.$stickyTabWrap && self.$stickyTabWrap.length > 0 ) {
                if(scrollTop >= self.stickyTabOffsetTop) {
                    self.$catalListWrap.addClass('active on');
                } else {
                    self.$catalListWrap.removeClass('active on');
                }
            }
        },
        // magazinSlider: function(){
        //     var self = this;

        //     //매거진탭 영상하단 슬라이더
        //     self.$magazinSlider.vcCarousel({
        //         infinite: false,
        //         slidesToShow: 5,
        //         slidesToScroll: 5,
        //         responsive: [
        //             {
        //                 breakpoint: 768,
        //                 settings: {
        //                     slidesToShow: 2,
        //                     slidesToScroll: 2
        //                 }
        //             }
        //         ]
        //     });
        // },
        // sliderInPopup: {
        //     //App 탭 > 하단 슬라이드배너 > 팝업 > ThinQ 앱 설치 및 사용방법 슬라이드
        //     slideConfig: {
        //         dots: true,
        //         infinite:false,
        //         spped:300,
        //         slidesToShow:3,
        //         slidesToScroll: 3,
        //         responsive: [
        //             {
        //                 breakpoint: 768,
        //                 settings: {
        //                     slidesToShow: 1,
        //                     slidesToScroll: 1,
        //                 }
        //             }

        //         ]
        //     },
        //     init: function() {
        //         var slider = this;
        //         catalogList.$howToUseAppSlider.not('.slick-initialized').slick(slider.slideConfig)
        //     },
        //     reinit: function(){
        //         catalogList.$howToUseAppSlider.filter('.slick-initialized').slick('refresh')
        //     },
        //     load: function(){
        //         if( catalogList.$howToUseAppSlider.hasClass('slick-initialized') ) {
        //             this.reinit();
        //         } else {
        //             this.init();
        //         }
        //     }
        // },
        // contentTab: function(){
        //     //전체 탭
        //     var self = this;
        //     var appCateSticky = false;

        //     self.$stickyTab.on('tabchange', function(e, data){
        //         appCateSticky = false;

        //         /* BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */
        //         //window.hasHash는 최초 false. false 가 아니라면 스크롤 이벤트가 걸린다
        //         if(!window.hasHash) {
        //             $('html, body').animate({scrollTop:self.stickyTabOffsetTop});
        //         } else {
        //             //false면 #특정 링크로 접근했을시 기본 스크롤이벤트는 안걸린다.
        //             window.hasHash = false;
        //         }
        //         /* //BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */

        //         //$('html, body').animate({scrollTop:self.stickyTabOffsetTop});

        //         if( data.content[0] == $('.thinq-app')[0]) {
        //             if( window.innerWidth > 1024) {
        //                 //console.log('pc');
        //                 self.appSmartTab.load();
        //             }else{
        //                 //console.log('mobile !');
        //                 self.appSmartTabMobile.load();
        //                 self.appCateMenuScroll(true);
        //             }
        //             self.appDownloadGuideSlider.load();
        //         } else {

        //         }
        //     })

            

        // },
        // appCateMenuScroll: function(sticky){
        //     //App 탭 > 카테고리 메뉴 스티키
        //     var self = this;
        //     appCateSticky = sticky;
        //     $(window).on('scroll', function(){
        //         if(appCateSticky){
        //             var scrollTop = $(window).scrollTop();
        //             var tabOffsetT = self.$appTabCont.offset().top;
        //             var tabOffsetB = $('.app-tab-desc').offset().top;
                    
        //             if(scrollTop >= self.stickyTabOffsetTop) {
        //                 if( scrollTop >= tabOffsetT && scrollTop <= tabOffsetB){
        //                     self.$appTabMenuSticky.addClass('fixed');
        //                 }else if(scrollTop >= tabOffsetT - 76 && scrollTop <= tabOffsetB){
        //                     self.$catalListWrap.removeClass('active on');
        //                 }else{
        //                     self.$appTabMenuSticky.removeClass('fixed');
        //                     self.$catalListWrap.addClass('active on');
        //                 }
        //             } else {
        //                 self.$catalListWrap.removeClass('active on');
        //             }
        //         }
        //     })
        // },
        resize: function(){
            var self = this;
            if( window.innerWidth > 1024) {
                $('.app-tab-content').removeClass('tab-mobile-content');

            } else {
                $('.app-tab-content').addClass('tab-mobile-content');

            }
        }
    };
    catalogList.init();

    $(window).on('resize', function(){
        catalogList.resize();
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
        catalogList.scroll(scrollTop);
        
    })

    //BTOCSITE-88 추가
    $(window).on('thinQScroll', function(){

        var hash = location.hash;
        var hasHash = false;

        window.hasHash = false //BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성

        switch (hash){
            case '#intro':
                setTimeout(function(){
                    $('.catal-tab a[href="#thinq-cont1"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#life-style':
                setTimeout(function(){
                    $('.catal-tab a[href="#thinq-cont2"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#app':
                setTimeout(function(){
                    $('.catal-tab a[href="#thinq-cont3"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#magazine':
                setTimeout(function(){
                    $('.catal-tab a[href="#thinq-cont4"]').trigger('click');
                },100);
                hasHash = true;
                break;
            
            /* BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */
            case '#appExperience':
                setTimeout(function(){
                    window.hasHash = true; //window.hasHash 가 false 라면 스크롤 이벤트가 걸리지 마라

                    $('.catal-tab a[href="#thinq-cont3"]').trigger('click');
                    $('html, body').animate({scrollTop:$('.app-experience-intro').offset().top - 100});
                },100);
                
                hasHash = true;
                break;
            case '#appDownload':
                setTimeout(function(){
                    window.hasHash = true; //window.hasHash 가 false 라면 스크롤 이벤트가 걸리지 마라

                    $('.catal-tab a[href="#thinq-cont3"]').trigger('click');
                    $('html, body').animate({scrollTop:$('.app-download-guide').offset().top - 100});
                },100);
                
                hasHash = true;
                break;
            /* //BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */
            default:
        }
    });

    $(window).on('load', function(){
        //BTOCSITE-88 추가
        $(window).trigger('thinQScroll');
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
