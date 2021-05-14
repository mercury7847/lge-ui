function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;
    this.swiper = null;

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setContent();
        this.setSwipe();
    },
    setSwipe : function(){
        this.swiper = new Swiper('#sw_con', {
            hashNavigation : {
                watchState: true
            },
            on : {
                'beforeInit' : function(){

                },
                'slideChange' : function(swiper){
                    console.log('active page', swiper.slides[swiper.activeIndex] );
                    var currentSlide = swiper.slides[swiper.activeIndex];
                    var href = $(currentSlide).data().href;

                    if (!href) return;

                    $.ajax({
                        url : href,
                        dataType : 'html',
                        success : function( res ){
                            $(swiper.slides[swiper.activeIndex]).html( res );
                        },
                        error : function(error){
                            console.log('mainSwiper cant get HTML', error);
                        },
                        complete: function(){                    
                            lgkorUI.init();                            
                        }
                    });
                }
            }
        });

    },
    setContent : function(){
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
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    new MainSwiper( mainSwiperID );
});