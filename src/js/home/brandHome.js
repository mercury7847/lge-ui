;$(function() {
    var thinQMain = {
        init: function(){
            var self = this;

            vcui.require(['libs/slick.min', 'ui/pagination'], function () {
                self.settings();
                self.bindEvents()
                self.heroSlider();
                self.magazinSlider();
                self.setMagazineVideo();
                self.modelSearchInit();
                self.contentTab();
            });
        },
        settings: function(){
            var self = this;
            self.$thinqMain = $('.thinq-main');

            //상단 히어로배너
            self.$heroSlider = self.$thinqMain.find('.hero-banner');

            //전체 탭
            self.$stickyTabWrap = self.$thinqMain.find('.thinq-tabs');
            self.$stickyTab = self.$stickyTabWrap.find('.ui_tab');
            
            //APP 탭
            self.$appContainer = self.$thinqMain.find('.app-wrap');
            self.$appTabArea = self.$appContainer.find('.app-tab-area')
            self.$appTabCont = self.$appTabArea.find('.app-tab-content');
            self.$appTabMenu = self.$appTabArea.find('.menu-slide-nav');
            self.$appTablist = self.$appTabMenu.find('.menu-item');
            self.$appTabBtnAll = self.$appTabArea.find('.btn-allview');
            self.$appGuideSlider = self.$appContainer.find('.download-guide-slide');
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
            self.$pagination = self.$searchPopup.find('.pagination').vcPagination();

            self.$searchIntro = self.$searchPopup.find('.intro-message');
            self.$prdResult = self.$searchPopup.find('.product-result-wrap');
            self.$prdTotalCount = self.$prdResult.find('.prd-result-text');
            self.$nodata = self.$searchPopup.find('.no-data-message');
        },
        bindEvents: function(){
            var self = this;

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
                if(!$parent.hasClass('is-active')){
                    $parent.addClass('is-active');
                    $(this).children('.txt').text('닫기');
                    self.appSmartTab.destroy()
                }else{
                    var currentIndex = self.$appTablist.filter('.on').index();
                    $parent.removeClass('is-active');
                    $(this).children('.txt').text('전체보기');
                    self.appSmartTab.init(currentIndex)
                }
            })

            //App 탭 > 우리집 스마트한 생활 > 메뉴 클릭
            self.$appTablist.find('a').on('click', function(e) {
                e.preventDefault();
                self.$appTabCont.find('.tab-cont').hide().filter(this.hash).show();
                self.$appTablist.removeClass('on');
                $(this).parent().addClass('on');
            }).filter(':eq(0)').click();

            //App 탭 > 하단 슬라이드배너 > 앱 설치 및 사용방법 팝업 버튼 활성화시 팝업내 슬라이드 활성화
            self.$howToPopup.on('modalshown', function(e){
                self.sliderInPopup.load();
            })


            //검색팝업: 검색어 삭제
            self.$searchDel.on('click', function(e){
                self.$searchInput.val('');
            })

            //검색팝업: 검색 실행
            self.$btnInputSearch.on('click', function(e){
                var categoryId = self.$searchSelect.vcSelectbox('value')
                var searchKeyword = self.$searchInput.val();
                self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": 1});
            })

            self.$searchSelect.on('change', function(e){
                var categoryId = self.$searchSelect.vcSelectbox('value')
                var searchKeyword = self.$searchInput.val();
                self.requestModelData({"categoryId":categoryId,"keyword":searchKeyword,"page": 1});
            });

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
            //매거진 탭 내부 유튜브 영상 & 슬라이드
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
            //전체 탭
            var self = this;

            var stickyTabOffsetTop = self.$stickyTabWrap.offset().top;

            self.$stickyTab.on('tabchange', function(e, data){
                self.$thinqMain.scrollTop(0); 
                $('html, body').stop().animate({scrollTop:stickyTabOffsetTop});

                if( data.content[0] == $('.thinq-app')[0]) {
                    self.appSmartTab.load();
                    self.appDownloadGuideSlider.load();
                } else {
                    // if( self.$appTabArea.find('.menu-slide-block').hasClass('is-active')) {
                    //     self.$appTabBtnAll.trigger('click');
                    // }
                }
            })
        },
        appSmartTab: {
            //App 탭 > 우리집 스마트한 생활 메뉴 슬라이드
            prevSlidesToShow: 0,
            slideConfig : {
                infinite: false,                
                slidesToShow: 7,
                slidesToScroll: 7,
                responsive: [
                    {
                        breakpoint:1280,
                        settings:{
                            slidesToShow: 5,
                            slidesToScroll: 5,
                        }
                    },
                    {
                        breakpoint:768,
                        settings:{
                            arrows:false,
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    }
                ]
            },
            init: function(index){
                var tabs = this;

                if( !thinQMain.$appTabArea.find('.menu-slide-block').hasClass('is-active') ) {
                    thinQMain.$appTabMenu.not('.slick-initialized').slick(tabs.slideConfig)
                    if( index != undefined ) {
                        thinQMain.$appTabMenu.slick('slickGoTo', index)
                    }
                }
            },
            reinit: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('setPosition')
            },
            load: function(){
                if( this.prevSlidesToShow > 0 &&  this.prevSlidesToShow != thinQMain.$appTabMenu.slick('slickGetOption', 'slidesToShow')) {
                    this.reinit();
                    this.prevSlidesToShow = thinQMain.$appTabMenu.slick('slickGetOption', 'slidesToShow')
                } else {
                    this.init();
                    this.prevSlidesToShow = thinQMain.$appTabMenu.slick('slickGetOption', 'slidesToShow')
                }
            },
            destroy: function(){
                thinQMain.$appTabMenu.filter('.slick-initialized').slick('unslick');
                thinQMain.$appTabMenu.find('.menu-item').removeClass('active-first active-last')
            }
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
            console.log('request!!!')
            var self = this;
            var ajaxUrl = self.$searchPopup.data('ajaxUrl');
            var listTemplate =  '<li>' + 
            '   <div class="icon-wrap"><i class="icon icon-{{imgName}}"><span class="blind">{{categoryName}}</span></i></div>' + 
            '   <div class="text">' + 
            '       <span class="name">{{modelName}}</span>' + 
            '       <span class="serial-num">{{modelId}}</span>' + 
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
                            html += vcui.template(listTemplate, item);
                        })
                        self.$prdTotalCount.find('em').text(data.listData.length)
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
            
            if( self.$stickyTabWrap.length > 0 ) {
                var stickyTabOffsetTop = self.$stickyTabWrap.offset().top;
    
                if(scrollTop >= stickyTabOffsetTop) {
                    self.$thinqMain.addClass('active on');
                } else {
                    self.$thinqMain.removeClass('active on');
                }
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
    