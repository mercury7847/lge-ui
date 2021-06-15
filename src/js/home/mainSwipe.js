function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.$tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;
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
                    $('#sw_con .swiper-slide').attr('data-isLoaded', false);
                },
                'init' : function(swiper){
                    var hash = mainSwiper.getLastSegmentByUrl();
                    var idx = mainSwiper.getIndexByHash( hash !== '' ? hash : 'home' );
                    if ( idx == 0){
                        var currentSlide = swiper.slides[swiper.activeIndex];
                        mainSwiper.loadContent( currentSlide );
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
    loadContent: function( currentSlide ){
        var self = this;
        var href = $(currentSlide).data().href;
        var isLoaded = $(currentSlide).data().isLoaded;
        var hash = '/' + $(currentSlide).data().hash;

        if (hash == '/home'){
            hash = '/';
        }

        //console.log('currentSlide hash', self.hashToUrl[hash]);

        if (!href) return;

        if (isLoaded) {
            history.pushState({}, '', hash);            
            self.switchQuickMenu( hash );
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
                $(currentSlide).attr('data-isLoaded', true);
                history.pushState({}, '', hash);
                self.switchQuickMenu( hash );
            }
        });
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
            self.swiper.slideTo( idx );
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
            $('#floatBox > .floating-wrap').hide();
            $('#floatBox > #quickMenu').show();
        } else {
            $('#floatBox > .floating-wrap').show();
            $('#floatBox > #quickMenu').hide();
        }
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    window.mainSwiper = new MainSwiper( mainSwiperID );

    //$('#floatBox').hide();

});
