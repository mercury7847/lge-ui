function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;
    this.swiper = null;
    this.currentHash = window.location.hash;

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setMobileNav();
        this.setSwipe();
        
    },
    setSwipe : function(){
        var mainSwiper =  this;
        var currentHash = this.currentHash;

        this.swiper = new Swiper('#sw_con', {
            autoHeight : true,
            observer : true,
            slidesPerView : 1,           
            hashNavigation : {
                watchState: true
            },
            on : {
                'beforeInit' : function(){
                    $('#sw_con .swiper-slide').data('isLoaded', false);
                },
                'init' : function(swiper){
                    console.log('window.location.hash', window.location.hash);
                    if (!!window.location.hash == false){
                        window.location.hash = '#home';
                    }
                    var currentSlide = swiper.slides[ mainSwiper.currentIdx ];
                    mainSwiper.loadContent( currentSlide );
                    //swiper.slideChange();
                },
                'slideChange' : function(swiper){
                    console.log('active page', swiper.slides[swiper.activeIndex] );
                    var currentSlide = swiper.slides[swiper.activeIndex];

                    mainSwiper.loadContent( currentSlide );
                    mainSwiper.currentIdx = swiper.activeIndex;

                    mainSwiper.tabs.removeClass('on').eq(swiper.activeIndex).addClass('on');

                   
                }
            }
        });

        $('#sw_con .swiper-slide').on('touchstart', function( e ){
            //console.log('touchstart event', e);
            //console.log('is carouselList',!!$(e.target).parents('.ui_carousel_list').length);

            var isCategoryTab = !!$(e.target).closest('.ui_category_tab').length;
            var isCarouselList = !!$(e.target).closest('.ui_carousel_list').length;
            var isCategoryTabContent = !!$(e.target).closest('.ui_category_tab_contents').length;
            var isTagScrollTab = !!$(e.target).closest('.ui_tag_smooth_scrolltab').length;
            var isSlick = !!$(e.target).closest('.slick-track').length;
            
            
            

            if (isCategoryTab || isCarouselList || isCategoryTabContent || isTagScrollTab || isSlick){
                e.stopPropagation();
            }
            
        });

        $('#sw_con .swiper-slide').on('touchmove', function( e ){
            //console.log('touchmove event', e);
            //console.log('is carouselList',!!$(e.target).parents('.ui_carousel_list').length);

            var isCategoryTab = !!$(e.target).closest('.ui_category_tab').length;
            var isCarouselList = !!$(e.target).closest('.ui_carousel_list').length;
            var isCategoryTabContent = !!$(e.target).closest('.ui_category_tab_contents').length;
            var isTagScrollTab = !!$(e.target).closest('.ui_tag_smooth_scrolltab').length;
            var isSlick = !!$(e.target).closest('.slick-track').length;

            if (isCategoryTab || isCarouselList || isCategoryTabContent || isTagScrollTab || isSlick){
                e.stopPropagation();
            }
        });

    },
    loadContent: function( currentSlide ){
        var href = $(currentSlide).data().href;
        var isLoaded = $(currentSlide).data().isLoaded;

        console.log('currentSlide', $(currentSlide).data());

        if (!href) return;

        if (isLoaded) return;

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
            }
        });
    },
    setMobileNav : function(){
        var $tabs = this.tabs;
        $tabs.on('click', function( e ){
            //e.preventDefault();
            //var href = $(this).data().href;
            var idx = $tabs.index(this);

            $tabs.removeClass('on').eq(idx).addClass('on');

            window.location.href = this.href;

            //if (!href) return;
            /*
            

            if (!href) return;

            if (idx == 0){
                $('html').attr('canscroll', 'true');
                $('html').css({
                    'overflow' : 'hidden',
                    'height' : '100%'
                });
            } else {
                $('html').attr('canscroll', 'false');
                $('html').css({
                    'overflow' : '',
                    'height' : ''
                });
            } 
            */       
            /*
            $.ajax({
                url : href,
                dataType : 'html',
                success : function( res ){
                    $('#sw_con').html( '<div class="swipe-item">' + res + '</div>' );
                },
                error : function(error){
                    console.log('mainSwiper cant get HTML', error);
                },
                complete: function(){                    
                    lgkorUI.init();
                    $tabs.removeClass('on').eq(idx).addClass('on');
                }
            });
            */
        });
    },
    // fixed 처리된 모달 수정값
    getLeft: function(){
        return Math.abs($('#sw_con .swiper-wrapper').offset().left);
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    window.mainSwiper = new MainSwiper( mainSwiperID );
});