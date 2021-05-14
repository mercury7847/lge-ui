function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setEvent();
    },
    setEvent : function(){
        var $tabs = this.tabs;
        $tabs.on('click', function( e ){
            e.preventDefault();
            var href = $(this).data().href;
            var idx = $tabs.index(this);

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
                    /*
                    vcui.require(['common/footer'], function(){
                        $('footer').vcFooter();
                    });
                    */
                    lgkorUI.init();
                    $tabs.removeClass('on').eq(idx).addClass('on');
                }
            });
        });
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    new MainSwiper( mainSwiperID );
});