function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.$tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;
    this.ablePushState = true;
    this.swiper = null;
    this.currentHash = window.location.hash;

    this.hashToUrl = {
        '#home' : 'home',
        '#store' : 'store',
        '#story' : 'story',
        '#support' : 'support',
        '#care-solutions' : 'care-solutions'
    };

    this.urlToHash = {
        'home' : '#home',
        'store' : '#store',
        'story' : '#story',
        'support' : '#support',
        'care-solutions' : '#care-solutions'
    };

    this.hashArray = [
        'home', 'store', 'story', 'support', 'care-solutions'
    ];

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setMobileNav();
        this.setSwipe();
        this.setUrlEvent();
        
    },
    setSwipe : function(){
        var mainSwiper =  this;
        var currentHash = this.currentHash;

        this.swiper = new Swiper('#sw_con', {
            autoHeight : true,
            observer : true,
            slidesPerView : 1,
            /*
            hashNavigation : {
                watchState: true
            },
            */
            on : {
                'beforeInit' : function(){
                    $('#sw_con .swiper-slide').data('isLoaded', false);
                  //  $('#sw_con .swiper-slide').attr('data-isLoaded', false);
                },
                'init' : function(swiper){
                    var hash = mainSwiper.getLastSegmentByUrl();
                    var idx = mainSwiper.getIndexByHash( hash !== '' ? hash : 'home' );
                    if ( idx == 0){
                        var currentSlide = swiper.slides[swiper.activeIndex];
                        //var nextSlide = swiper.slides[swiper.activeIndex + 1];                        
                        mainSwiper.loadContent( currentSlide );
                        //mainSwiper.loadContent( nextSlide );
                    } else {
                        swiper.slideTo( idx );
                    }
                },
                'slideChange' : function(swiper){
                    console.log('active page', swiper.slides[swiper.activeIndex] );
                    console.log('swiper', swiper );
                    var currentSlide = swiper.slides[swiper.activeIndex];

                    mainSwiper.loadContent( currentSlide );
                    mainSwiper.currentIdx = swiper.activeIndex;

                    mainSwiper.$tabs.removeClass('on').eq(swiper.activeIndex).addClass('on');

                    $('html,body').stop().animate({scrollTop:0}, 300);

                    /*
                    var nextSlide = swiper.slides[swiper.activeIndex + 1];
                    var prevSlide = swiper.slides[swiper.activeIndex - 1];

                    if (nextSlide !== undefined){
                        mainSwiper.loadContent( nextSlide, false);
                    }

                    if (prevSlide !== undefined){
                        mainSwiper.loadContent( prevSlide, false);
                    }
                    */

                    //console.log('slideChange arguments', arguments);
                }
            }
        });

        $('#sw_con .swiper-slide').on('touchstart, touchmove', function( e ){
            //console.log('touchstart event', e);
            //console.log('is carouselList',!!$(e.target).parents('.ui_carousel_list').length);

            var isCategoryTab = !!$(e.target).closest('.ui_category_tab').length;
            var isCarouselList = !!$(e.target).closest('.ui_carousel_list').length;
            //var isCategoryTabContent = !!$(e.target).closest('.ui_category_tab_contents').length;
            var isTagScrollTab = !!$(e.target).closest('.ui_tag_smooth_scrolltab').length;
            var isSlick = !!$(e.target).closest('.slick-track').length;

            if (isCategoryTab || isCarouselList || isTagScrollTab || isSlick){
                e.stopPropagation();
            }
            
        });        

    },
    loadContent: function( currentSlide, pushFlag ){
        var self = this;
        var href = $(currentSlide).data().href;
        var isLoaded = $(currentSlide).data().isLoaded;
        var hash = '/' + $(currentSlide).data().hash;
        var currentPageData = _PAGE_DATA_TEMP[$(currentSlide).data().hash];

        if (pushFlag !== undefined){
            self.ablePushState = pushFlag;
        }

        if (self.ablePushState !== false){
            self.setDigitalData(currentPageData);
            console.log('PAGE_DATA', _PAGE_DATA_TEMP[$(currentSlide).data().hash]);
        }

        if (hash == '/home'){
            hash = '/';
        }

        //console.log('currentSlide hash', self.hashToUrl[hash]);

        if (!href) return;

        if (isLoaded) {
            if (self.ablePushState){
                history.pushState({}, '', hash);
            }
            self.ablePushState = true;
            self.switchQuickMenu( hash );
            setTimeout(function(){
                mainSwiper.swiper.updateAutoHeight();
            }, 1000);
            return;
        }

        $.ajax({
            method: 'POST',
            url : href,
            dataType : 'html',
            success : function( res ){
                $(currentSlide).html( res );
            },
            error : function(error){
                console.log('mainSwiper cant get HTML', error);
            },
            complete: function(){
                lgkorUI.init( $(currentSlide) );
                $(currentSlide).data().isLoaded = true;
            //    $(currentSlide).attr('data-isLoaded', true);
                if (self.ablePushState){
                    history.pushState({}, '', hash);
                }
                self.ablePushState = true;
                self.switchQuickMenu( hash );
            }
        }).done(function(){
            setTimeout(function(){
                mainSwiper.swiper.updateAutoHeight();
            }, 1000);
        });
    },
    setDigitalData : function( pageData ){
        // GA 관련 데이터 셋팅
        if (typeof(digitalData) !== 'undefined'){
            if (!!pageData){
                digitalData.pageInfo = pageData.digitalData.pageInfo;
            }
        } else {
            if (!!pageData){
                window.digitalData = {};
                window.digitalData.pageInfo = pageData.digitalData.pageInfo;
            }
        }
    },
    setMobileNav : function(){
        var self = this;
        var $tabs = this.$tabs;
        $tabs.on('click', function( e ){ 
            e.preventDefault();           
            var idx = $tabs.index(this);            
            self.swiper.slideTo(idx);
        });
    },
    setUrlEvent : function(){
        var self = this;
        $(window).on('popstate', function(){
            //console.log('popstate', location.href);
            var hash = self.getLastSegmentByUrl();
            var idx = self.getIndexByHash( hash !== '' ? hash : 'home' );
            self.ablePushState = false;
            self.swiper.slideTo(idx);            
        });
    },
    // fixed 처리된 모달 수정값
    getLeft: function(){
        return Math.abs($('#sw_con .swiper-wrapper').offset().left);
    },
    // url 마지막 경로 
    getLastSegmentByUrl: function(){
        return window.location.href.split('/').pop();
    },

    getHash: function(){
        console.log('urltohash value', this.urlToHash[ this.getLastSegmentByUrl() ] );
        var hash = '';
        if (!!this.urlToHash[ this.getLastSegmentByUrl() ] == false ){
            hash = this.urlToHash['home'];
        } else {
            hash = this.urlToHash[ this.getLastSegmentByUrl() ];
        }

        return hash;
    },

    getIndexByHash: function( hash ){
        var index = false;
        this.hashArray.forEach(function( value, idx ){
            if (value == hash) index = idx;
        });

        return index;
    },

    setActiveTabByHash: function( hash ){
        var idx = this.getIndexByHash( hash );
        this.$tabs.removeClass('on').eq(idx).addClass('on');        
    },

    switchQuickMenu : function( hash ){
        // 퀵메뉴 처리
        if ( hash == '/support' ){
            $('#floatBox > .btn-floating-wrap').hide();
            $('#floatBox > .floating-wrap').hide();
            $('#floatBox > #quickMenu').show();
        } else {
            $('#floatBox > #quickMenu').hide();
            $('#floatBox > .btn-floating-wrap').show();
            $('#floatBox > .floating-wrap').show();
            
        }
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    window.mainSwiper = new MainSwiper( mainSwiperID );

    //$('#floatBox').hide();

});







// 테스트용 임시 페이지 데이터
var _PAGE_DATA_TEMP = {
    'home' : {
        'meta' : {
            'title' : 'LGE.COM | LG전자',
            'description' : '차원이 다른 가치를 제공하는 LG전자 노트북, TV 및 냉장고 등 다양한 제품으로 당신의 라이프 스타일을 완성해보세요. 엘지이닷컴에서 전 제품을 소개합니다.',
            'og:locale' : 'ko_KR',
            'og:site_name' : 'LG전자',
            'og:type' : 'website',
            'og:title' : 'LGE.COM | LG전자',
            'og:description' : '차원이 다른 가치를 제공하는 LG전자 노트북, TV 및 냉장고 등 다양한 제품으로 당신의 라이프 스타일을 완성해보세요. 엘지이닷컴에서 전 제품을 소개합니다.',
            'og:url' : 'https://wwwdev50.lge.co.kr',
            'og:image' : 'https://wwwdev50.lge.co.kr/lg5-common/images/common/share/share-default.jpg',
            'twitter:card' : 'summary',
            'canonical' : 'https://wwwdev50.lge.co.kr'
        },
        'digitalData' : {
            'pageInfo' : {
                "content_depth1": "홈",
                "content_depth2": null,
                "content_depth3": null,
                "content_depth4": null,
                "content_depth5": null,
                "event_page_category1": null,
                "event_page_category2": null,
                "event_page_category3": null,
                "exhibition_type": null
            }
        }
    },
    'store' : {
        'meta' : {
            'title' : '전체 제품 | LG전자',
            'description' : 'LG전자의 TV, 노트북 및 주방가전, 생활가전 등 모든 제품을 소개합니다. LG전자만의 차별화된 혁신 제품과 서비스로 당신의 소중한 일상을 완성해보세요.',
            'og:locale' : 'ko_KR',
            'og:site_name' : 'LG전자',
            'og:type' : 'website',
            'og:title' : '전체 제품 | LG전자',
            'og:description' : 'LG전자의 TV, 노트북 및 주방가전, 생활가전 등 모든 제품을 소개합니다. LG전자만의 차별화된 혁신 제품과 서비스로 당신의 소중한 일상을 완성해보세요.',
            'og:url' : 'https://wwwdev50.lge.co.kr/store',
            'og:image' : 'https://wwwdev50.lge.co.kr/lg5-common/images/common/share/share-default.jpg',
            'twitter:card' : 'summary',
            'canonical' : 'https://wwwdev50.lge.co.kr/store'            
        },
        'digitalData' : {
            'pageInfo' : {
                "content_depth1": "스토어",
                "content_depth2": null,
                "content_depth3": null,
                "content_depth4": null,
                "content_depth5": null,
                "event_page_category1": null,
                "event_page_category2": null,
                "event_page_category3": null,
                "exhibition_type": null
            }
        }
    },
    'story' : {
        'meta' : {
            'title' : '스토리 | LG전자',
            'description' : 'LG전자 스토리에서 최신 뉴스와 광고 캠페인부터 다양한 제품을 위한 활용 가이드, 매거진, e-카탈로그까지 필요한 정보를 확인하실 수 있습니다.',
            'og:locale' : 'ko_KR',
            'og:site_name' : 'LG전자',
            'og:type' : 'website',
            'og:title' : '스토리 | LG전자',
            'og:description' : 'LG전자 스토리에서 최신 뉴스와 광고 캠페인부터 다양한 제품을 위한 활용 가이드, 매거진, e-카탈로그까지 필요한 정보를 확인하실 수 있습니다.',
            'og:url' : 'https://wwwdev50.lge.co.kr/story',
            'og:image' : 'https://wwwdev50.lge.co.kr/lg5-common/images/common/share/share-default.jpg',
            'twitter:card' : 'summary',
            'canonical' : 'https://wwwdev50.lge.co.kr/story'            
        },
        'digitalData' : {
            'pageInfo' : {
                "content_depth1": "스토리",
                "content_depth2": null,
                "content_depth3": null,
                "content_depth4": null,
                "content_depth5": null,
                "event_page_category1": null,
                "event_page_category2": null,
                "event_page_category3": null,
                "exhibition_type": null
            }
        }
    },
    'care-solutions' : {
        'meta' : {
            'title' : '케어솔루션 렌탈 제품 | LG전자',
            'description' : 'LG전자 케어 솔루션과 케어십은 가전제품 케어 서비스입니다. 케어솔루션 제품을 구매하거나 렌탈한 고객님을 위한 케어 서비스를 안내해 드립니다.',
            'og:locale' : 'ko_KR',
            'og:site_name' : 'LG전자',
            'og:type' : 'website',
            'og:title' : '케어솔루션 렌탈 제품 | LG전자',
            'og:description' : 'LG전자 케어 솔루션과 케어십은 가전제품 케어 서비스입니다. 케어솔루션 제품을 구매하거나 렌탈한 고객님을 위한 케어 서비스를 안내해 드립니다.',
            'og:url' : 'https://wwwdev50.lge.co.kr/care-solutions',
            'og:image' : 'https://wwwdev50.lge.co.kr/lg5-common/images/common/share/share-default.jpg',
            'twitter:card' : 'summary',
            'canonical' : 'https://wwwdev50.lge.co.kr/care-solutions'            
        },
        'digitalData' : {
            'pageInfo' : {
                "content_depth1": "케어솔루션",
                "content_depth2": null,
                "content_depth3": null,
                "content_depth4": null,
                "content_depth5": null,
                "event_page_category1": null,
                "event_page_category2": null,
                "event_page_category3": null,
                "exhibition_type": null
            }
        }
    },
    'support' : {
        'meta' : {
            'title' : 'LG전자 고객지원',
            'description' : 'LG전자 고객지원 페이지입니다. LG 제품 사용 문의, 서비스 상담, 매장 찾기, 고객 제안 및 불만 기타 사항들의 신속한 처리를 위한 방법을 안내 드립니다.',
            'og:locale' : 'ko_KR',
            'og:site_name' : 'LG전자',
            'og:type' : 'website',
            'og:title' : 'LG전자 고객지원',
            'og:description' : 'LG전자 고객지원 페이지입니다. LG 제품 사용 문의, 서비스 상담, 매장 찾기, 고객 제안 및 불만 기타 사항들의 신속한 처리를 위한 방법을 안내 드립니다.',
            'og:url' : 'https://wwwdev50.lge.co.kr/support',
            'og:image' : 'https://wwwdev50.lge.co.kr/lg5-common/images/common/share/share-default.jpg',
            'twitter:card' : 'summary',
            'canonical' : 'https://wwwdev50.lge.co.kr/support'            
        },
        'digitalData' : {
            'pageInfo' : {
                "content_depth1": "고객지원",
                "content_depth2": null,
                "content_depth3": null,
                "content_depth4": null,
                "content_depth5": null,
                "event_page_category1": null,
                "event_page_category2": null,
                "event_page_category3": null,
                "exhibition_type": null
            }
        }
    }
};
