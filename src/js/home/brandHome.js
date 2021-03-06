;$(function() {   
    var thinQMain = {
        init: function(){
            var self = this;

            self.settings();
            self.heroSlider();

            vcui.require(['libs/slick.min', 'ui/pagination'], function () {
                self.bindEvents();
                self.magazinSlider();
                self.setMagazineVideo();
                self.modelSearchInit();
                self.contentTab();
                self.resize();
                self.appSmartTabMenu();
            });
        },
        settings: function(){
            var self = this;
            self.$thinqMain = $('.thinq-main');
            self.$thinqWrap = self.$thinqMain.find('.brand-wrap.thinq-wrap');

            //상단 히어로배너
            self.$heroSlider = self.$thinqMain.find('.hero-banner');

            //전체 탭
            self.$stickyTabWrap = self.$thinqMain.find('.thinq-tabs');
            self.$stickyTab = self.$stickyTabWrap.find('.ui_tab');
            self.stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            //APP 탭
            self.$appContainer = self.$thinqMain.find('.app-wrap');
            self.$appTabArea = self.$appContainer.find('.app-tab-area')
            self.$appTabCont = self.$appTabArea.find('.app-tab-content');
            self.$appTabContDetail = self.$appTabArea.find('.app-smart-detail'); // BTOCSITE-11029
            self.$appTabMenuSticky = self.$appTabArea.find('.menu-slide-block');
            self.$appTabMenu = self.$appTabArea.find('.menu-slide-nav');
            self.$appTablist = self.$appTabMenu.find('.menu-item');
            self.$appTabBtnAll = self.$appTabArea.find('.btn-allview');
            self.$appDownload = self.$appContainer.find('.app-download-guide');
            self.$appDownloadSlider = self.$appDownload.find('.guide-slider');
            self.$howToPopup = $('.popup-howto');
            self.$howToUseAppSlider = self.$howToPopup.find('.howto-slider');

            //매거진 탭
            self.$magazin = self.$thinqMain.find('.magazine-wrap');
            self.$magazinSlider = self.$magazin.find('.ui_carousel_slider');

            //검색팝업
            self.$searchPopup = $('#popupSearchMachine');
            self.$searchSticky = self.$searchPopup.find('.search-sticky-wrap');
            self.$searchSelect = self.$searchSticky.find('.ui_selectbox');
            self.$searchDel = self.$searchSticky.find('.btn-delete');
            self.$btnInputSearch = self.$searchSticky.find('.btn-search');
            self.$searchInput = self.$searchSticky.find('.input-wrap input[type="text"]');


            self.$searchIntro = self.$searchPopup.find('.intro-message');
            self.$prdResult = self.$searchPopup.find('.product-result-wrap');
            self.$prdTotalCount = self.$prdResult.find('.prd-result-text');
            self.$nodata = self.$searchPopup.find('.no-data-message');

            //체험하기 팝업
            self.$btnExperience = self.$thinqMain.find('.btn-experience');
            self.$popupExperience = self.$thinqMain.find('.popup-experience');
        },
        bindEvents: function(){
            var self = this;

            //페이징 이벤트 실행
            self.$pagination = self.$searchPopup.find('.pagination').vcPagination({scrollTop : 'noUse'});

            //체험하기 팝업
            self.$btnExperience.on('click',function(e){
                if(!vcui.detect.isMobile && !vcui.detect.isIE){
                    var target = "https://thinq.link/workexperience/index.html"; //BTOCSITE-12312 ThinQ 체험하기 URL 변경 요청
                    var width = 460;
                    var height = 800;
                    var xpos = (screen.availWidth - width)/2;
                    var ypos = (screen.availHeight - height)/2;
                    window.open(target, '_blank', 'width='+width + ',height=' + height + ',top=' + ypos + ',left=' + xpos + ',fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
                }else if (vcui.detect.isIE) {
                    var id = $(e.currentTarget).data('id');
                    var obj ={title:'.', ok : function (){ }};
                    var desc = '';
                    if(id=="#popup-experience"){
                        obj = $.extend(obj,{title:'인터넷 익스플로러(Internet Explorer) <br>브라우저에서 접속 불가합니다.<br> 크롬(Chrome) 브라우저 등에서 <br>재시도 부탁드립니다.'});
                        desc = '';
                    }
                    lgkorUI.alert(desc, obj);
                }else {
                    self.$popupExperience.vcModal("show");
                }
            });

            //앵커요소로 전체탭 전환
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

            //App 탭 > 우리집 스마트한 생활 > 메뉴 전체보기 버튼
            self.$appTabBtnAll.on('click', function(e){
                var $parent = $(this).parents('.menu-slide-block');

                // s : BTOCSITE-11029
                if(!$parent.hasClass('is-active')){
                    $parent.addClass('is-active');
                    $(this).children('.txt').text('닫기');
                    self.appSmartTab.destroy();
                }else{
                    $parent.removeClass('is-active');
                    $(this).children('.txt').text('전체보기');
                    var currentIndex = self.$appTablist.filter('.is-active').index();
                    self.appSmartTab.init(currentIndex);
                }
                // e : BTOCSITE-11029
                
            })

            

            //App 탭 > 하단 슬라이드배너 > 앱 설치 및 사용방법 팝업 버튼 활성화시 팝업내 슬라이드 활성화
            self.$howToPopup.on('modalshown', function(e){
                self.sliderInPopup.load();
            })


            //검색팝업: 검색어 삭제
            self.$searchDel.on('click', function(e){
                self.$searchInput.val('');
                $(this).hide();
            })

            //검색팝업: 검색 실행
            self.$btnInputSearch.on('click', function(e){
                var categoryId = self.$searchSelect.vcSelectbox('value')
                var searchKeyword = self.$searchInput.val();
                self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": 1});
            })

            //검색팝업: 셀렉트박스
            // self.$searchSelect.on('change', function(e){
            //     var categoryId = self.$searchSelect.vcSelectbox('value')
            //     var searchKeyword = self.$searchInput.val();
            //     self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": 1});
            // });

            //검색팝업: 검색어 입력
            self.$searchInput.on('keydown', function(e){
                var categoryId = self.$searchSelect.vcSelectbox('value')
                var searchKeyword = self.$searchInput.val();

                if( e.keyCode == 13) {
                    self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": 1});
                }
            })

            self.$searchInput.on('input', function(e){
                var searchKeyword = self.$searchInput.val();
                if( searchKeyword.length > 0 ){
                    self.$searchDel.show();
                } else {
                    self.$searchDel.hide();
                }
            })

            //검색팝업: 페이징 넘버 클릭
            self.$pagination.on('page_click', function(e, data) {
                var categoryId = self.$searchSelect.vcSelectbox('value')
                var searchKeyword = self.$searchInput.val();
                e.preventDefault();
                self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": data});
            });

            //검색팝업: 닫기
            self.$searchPopup.on('modalhide', function(e){
                self.modelSearchInit();
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

            /* BTOCSITE-13364 브랜드관 히어로 배너 영역 수정 */
            var $thinqSlideNum = self.$heroSlider.find('.slide-conts');
            var $thinqSlideLength = self.$heroSlider.find('.custom-indi-wrap');
            var $txtInfoEtc = self.$heroSlider.find('.text-info-etc');
            if($thinqSlideNum.length === 1) {
                $thinqSlideLength.hide();
                $txtInfoEtc.addClass('solo');
            }
            /* //BTOCSITE-13364 브랜드관 히어로 배너 영역 수정 */
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
            //매거진 탭 내부 유튜브 영상 & 슬라이드
            var self = this;
            var videoTmpl = '<iframe src={{link}} '+
            'id="videoPlayerCode" frameborder="0" webkitallowfullscreen="1" mozallowfullscreen="1" allowfullscreen="1" '+
            'allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" '+
            'sandbox="allow-scripts allow-same-origin allow-presentation" ' +
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
            //전체 탭
            var self = this;

            self.$stickyTab.on('tabchange', function(e, data){

                /* BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */
                //window.hasHash는 최초 false. false 가 아니라면 스크롤 이벤트가 걸린다
                if(!window.hasHash) {
                    $('html, body').animate({scrollTop:self.stickyTabOffsetTop});
                } else {
                    //false면 #특정 링크로 접근했을시 기본 스크롤이벤트는 안걸린다.
                    window.hasHash = false;
                }
                /* //BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */

                //$('html, body').animate({scrollTop:self.stickyTabOffsetTop});

                // s : BTOCSITE-11029
                if( data.content[0] == $('.thinq-app')[0]) {
                    self.appSmartTab.isAppTab = (window.breakpoint.isMobile) ? true:false;
                    self.appSmartTab.load();
                    self.appDownloadGuideSlider.load();
                }else {
                    self.appSmartTab.isAppTab = false;
                }
                // e : BTOCSITE-11029
            })

            

        },
        appSmartTabMenu: function() {
            //App 탭 > 우리집 스마트한 생활 > 메뉴 클릭
            var self = this;
            self.$appTablist.find('a').on('click', function(e) {
                e.preventDefault();
                // s : BTOCSITE-11029
                self.$appTabCont.find('.tab-cont').removeClass('is-active');
                self.$appTabCont.find('.tab-cont').filter(this.hash).addClass('is-active');
                $(this).parent().addClass('is-active').siblings().removeClass('is-active');

                if( !self.$appTabMenu.hasClass('slick-initialized')) {
                    self.$appTabBtnAll.trigger('click')
                }else {
                    self.appSmartTab.setHeights();
                    self.appSmartTab.setSlickDetail();
                }
                if(window.breakpoint.isMobile) $(window).scrollTop($('.tab-mobile-content').offset().top);
                // s : BTOCSITE-11029
            })
        },
        appSmartTab: {
            //App 탭 > 우리집 스마트한 생활 메뉴 슬라이드 (pc)
            isAppTab: false,
            slideConfig : {
                infinite: false,
                slidesToShow: 7,
                slidesToScroll: (window.breakpoint.isMobile)?4:7,
                responsive: [
                    {
                        breakpoint:1280,
                        settings:{
                            arrows:false,
                            slidesToShow: 5,
                            slidesToScroll: 5,
                        }
                    },
                    {
                        breakpoint:768,
                        settings:{
                            arrows:false,
                            slidesToShow: 4,
                            swipeToSlide: 4,
                        }
                    }
                ]
            },
            slideContentDetailConfig: { // BTOCSITE-11029
                infinite: false,
                arrows: false,
                adaptiveHeight:true,
                variableWidth: true,
                outerEdgeLimit: true,
            },
            init: function(index){
                var tabs = this;
                thinQMain.appSmartTab.setHeights(); // BTOCSITE-11029
                if( !thinQMain.$appTabArea.find('.menu-slide-block').hasClass('is-active') ) {
                    thinQMain.$appTabMenu.not('.slick-initialized').slick(tabs.slideConfig)
                    if( index != undefined ) {
                        thinQMain.$appTabMenu.slick('slickGoTo', index)
                    }
                    thinQMain.appSmartTab.setSlickDetail(); // BTOCSITE-11029
                }
            },
            reinit: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('setPosition')
            },
            load: function(){
                if( thinQMain.$appTabMenu.hasClass('slick-initialized')) {
                    this.reinit();
                } else {
                    this.init();
                }
            },
            destroy: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('unslick');
                thinQMain.$appTabMenu.find('.menu-item').removeClass('active-first active-last');
                thinQMain.$appTabMenu.find('.menu-item a').removeAttr('tabindex');
            },
            setHeights: function() {
                if(window.breakpoint.isMobile) {
                    var tabheight = thinQMain.$appTablist.map(function() {
                        return $(this).height();
                    });
                    if(Math.max.apply(null, tabheight) !== 0) thinQMain.$appTablist.css('height', Math.max.apply(null, tabheight));
                    thinQMain.$appTabCont.find('.is-active').find('.app-smart-detail').each(function() {
                        var $desc = $(this).find('.desc');
                        var arr = $desc.map(function() {
                            return $(this).height();
                        });
                        $desc.each(function() {
                            if(Math.max.apply(null, arr) !== 0) $(this).css('height', Math.max.apply(null, arr))
                        });
                    });
                }else {
                    thinQMain.$appTablist.css('height', 'auto');
                    thinQMain.$appTabCont.find('.app-smart-detail .desc').css('height','auto');
                }
            },
            setSlickDetail: function() { // BTOCSITE-11029
                var idx = thinQMain.$appTablist.filter('.is-active').index();
                if(idx != thinQMain.$appTabCont.find('.tab-cont').filter('.is-active').index()) {
                    thinQMain.$appTabCont.find('.tab-cont').removeClass('is-active').eq(idx).addClass('is-active');
                }
                if(window.breakpoint.isMobile) {
                    if(!thinQMain.$appTabContDetail.eq(idx).hasClass('slick-initialized')) {
                        if(thinQMain.$appTabContDetail.eq(idx).width() > 0) thinQMain.$appTabContDetail.eq(idx).slick(thinQMain.appSmartTab.slideContentDetailConfig); 
                    }else {
                        thinQMain.$appTabContDetail.eq(idx).slick('setPosition'); 
                    }
                }else {
                    if(thinQMain.$appTabContDetail.eq(idx).hasClass('slick-initialized')) {
                        thinQMain.$appTabContDetail.eq(idx).slick('unslick');
                    }
                }
            },
        },
        appDownloadGuideSlider:{
             //App 탭 > 앱 다운안내 슬라이드
            slideConfig: {
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            },
            init: function(){
                var guideSlider = this;
                thinQMain.$appDownloadSlider.not('.slick-initialized').slick(guideSlider.slideConfig)
            },
            reinit: function(){
                thinQMain.$appDownloadSlider.filter('.slick-initialized').slick('refresh')
            },
            load: function(){
                if( thinQMain.$appDownloadSlider.hasClass('slick-initialized') ) {
                    this.reinit();
                } else {
                    this.init();
                }
            }
        },
        sliderInPopup: {
            //App 탭 > 하단 슬라이드배너 > 팝업 > ThinQ 앱 설치 및 사용방법 슬라이드
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
        modelSearchInit: function(){
            var self = this;

            self.$searchSelect.vcSelectbox('selectedIndex', 0, false);
            self.$searchInput.val('');
            self.$searchDel.hide();
            self.searchSwap('.intro-message');
        },
        swapContent: function(target, targetArray, $parent){
            var self = this;
            if( targetArray && targetArray.length > 0 && target){
                targetArray.forEach(function(item){
                    var $currentTarget = $parent && parent != "" ? $parent.find(item) : $(item);

                    if( item == target ) {
                        $currentTarget.addClass('is-active');
                    } else {
                        $currentTarget.removeClass('is-active');
                    }
                })
            }
        },
        searchSwap: function(target){
            var self = this;
            var contArray = ['.intro-message', '.product-result-wrap', '.no-data-message'];

            self.swapContent(target, contArray, self.$searchPopup);
        },
        requestModelData: function(param){
            var self = this;
            var ajaxUrl = self.$searchPopup.data('ajaxUrl');
            var listTemplate =
            '<li>' +
            '   <div class="icon-wrap"><i class="icon icon-{{imgname}}"><span class="blind">{{categoryName}} 아이콘</span></i></div>' +
            '   <div class="text">' +
            '       <span class="name">{{categoryName}}</span>' +
            '       <span class="serial-num">{{salesModelCode}}</span>' +
            '   </div>' +
            '</li>';

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                if( result.status == "success") {
                    var data = result.data;

                    if(data.listData.length > 0) {
                        //리스트 페이지 노출
                        var html = "";

                        data.listData.forEach(function(item){
                            if( item.categoryName != "undefined" && item.categoryName != "" && item.imgname != "undefined" && item.imgname != "" && item.salesModelCode != "undefined" && item.salesModelCode != "") {
                                html += vcui.template(listTemplate, item);
                            }
                        })
                        self.$prdTotalCount.find('em').text(data.listPage.listCount)
                        self.$prdResult.find('.prd-result-lists').empty().append(html);
                        self.$pagination.vcPagination('setPageInfo', data.listPage)
                        self.searchSwap('.product-result-wrap')
                    } else {
                        //nodata 호출
                        self.searchSwap('.no-data-message');
                    }
                    lgkorUI.hideLoading();
                } else {
                    self.searchSwap('.no-data-message')
                    lgkorUI.hideLoading();
                }
            })
        },
        scroll: function(scrollTop){
            //전체탭 스티키
            var self = this;
            if(self.appSmartTab.isAppTab) {
                var scrollTop = $(window).scrollTop();
                var tabOffsetT = self.$appTabCont.offset().top;
                var tabOffsetB = $('.app-tab-desc').offset().top;
                if(scrollTop >= self.stickyTabOffsetTop) {
                    if( scrollTop >= tabOffsetT && scrollTop <= tabOffsetB){
                        if(self.$appTabCont.is(':visible') && !self.$appTabMenuSticky.hasClass('fixed')) self.$appTabMenuSticky.addClass('fixed');
                    }else if(scrollTop >= tabOffsetT - 76 && scrollTop <= tabOffsetB){
                        self.$thinqWrap.removeClass('active on');
                    }else{
                        self.$appTabMenuSticky.removeClass('fixed');
                        self.$thinqWrap.addClass('active on');
                    }
                } else {
                    self.$thinqWrap.removeClass('active on');
                }
            }else {
                if(self.$appTabMenuSticky.hasClass('fixed')) self.$appTabMenuSticky.removeClass('fixed');
                if( self.$stickyTabWrap && self.$stickyTabWrap.length > 0 ) {
                    if(scrollTop >= self.stickyTabOffsetTop) {
                        self.$thinqWrap.addClass('active on');
                    } else {
                        self.$thinqWrap.removeClass('active on');
                    }
                }
            }
        },
        resize: function(){
            var self = this;
            if( window.innerWidth > 1024) {
                $('.app-tab-content').removeClass('tab-mobile-content');

            } else {
                $('.app-tab-content').addClass('tab-mobile-content');

            }
            self.appSmartTab.setHeights(); // BTOCSITE-11029
            self.appSmartTab.setSlickDetail(); // BTOCSITE-11029
        }
    };
    thinQMain.init();

    $(window).on('resize', function(){
        thinQMain.resize();
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
        thinQMain.scroll(scrollTop);
        
    })

    //BTOCSITE-88 추가
    $(window).on('thinQScroll', function(){

        var hash = location.hash;
        var hasHash = false;

        window.hasHash = false //BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성

        switch (hash){
            case '#intro':
                setTimeout(function(){
                    $('.thinq-tabs a[href="#thinq-cont1"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#life-style':
                setTimeout(function(){
                    $('.thinq-tabs a[href="#thinq-cont2"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#app':
                setTimeout(function(){
                    $('.thinq-tabs a[href="#thinq-cont3"]').trigger('click');
                },100);
                hasHash = true;
                break;
            case '#magazine':
                setTimeout(function(){
                    $('.thinq-tabs a[href="#thinq-cont4"]').trigger('click');
                },100);
                hasHash = true;
                break;
            
            /* BTOCSITE-9983 - ThinQ 브랜드관 APP 메뉴 내 섹션별 URL 생성 */
            case '#appExperience':
                setTimeout(function(){
                    window.hasHash = true; //window.hasHash 가 false 라면 스크롤 이벤트가 걸리지 마라

                    $('.thinq-tabs a[href="#thinq-cont3"]').trigger('click');
                    $('html, body').animate({scrollTop:$('.app-experience-intro').offset().top - 100});
                },100);
                
                hasHash = true;
                break;
            case '#appDownload':
                setTimeout(function(){
                    window.hasHash = true; //window.hasHash 가 false 라면 스크롤 이벤트가 걸리지 마라

                    $('.thinq-tabs a[href="#thinq-cont3"]').trigger('click');
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
