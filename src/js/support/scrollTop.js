$(window).ready(function(){
	var scrollTop = {
        init: function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $('.floating-menu.top').removeClass('call-yet');
                } else {
                    $('.floating-menu.top').addClass('call-yet');
                }
            });
            
            $('.back-to-top button').on('click', function (e) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });
        }
    }
    scrollTop.init();
});