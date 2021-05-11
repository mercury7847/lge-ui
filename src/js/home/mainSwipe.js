function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setEvent();
    },
    setEvent : function(){
        this.tabs.on('click', function( e ){
            e.preventDefault();
            var href = $(this).data().href;

            if (!href) return;

            $.ajax({
                url : href,
                dataType : 'html',
                success : function( res ){
                    $('#sw_con').html( res );
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
                }
            });
        });
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    new MainSwiper( mainSwiperID );
});