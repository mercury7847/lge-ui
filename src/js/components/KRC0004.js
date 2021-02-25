$(window).ready(function(){

    if(!document.querySelector('.KRC0004')) return false;

    $('.KRC0004').buildCommonUI();

	var KRC0004 = {
        scrolling: function (pos, scrolls) {
            var msec = Math.abs(scrolls) / 20;
            if(msec < 250) {
                msec = 250;
            }
            if(msec > 400) {
                msec = 400;
            }

			//$([document.documentElement, document.body]).animate({
            $('html, body').stop().animate({
				scrollTop: pos
			}, msec);
        },
        
        init: function(){
            var _t = this;

            $('.openBtn').on('click', function(e) {
                e.preventDefault();
                var btn = $(this);
                var btnBox = btn.parent('.list-btn-area');
                var openCont = btnBox.next('.more-content');

                var tg = $(this).closest(".component");
                var adjustOption = ($(".KRC0004").length>0) ? Math.round($(".KRC0004").outerHeight()) : 0;
                var contTop = tg.find(".more-content").offset().top;
                var contAdjustTop = Math.round(contTop - adjustOption);

                var tgTop = tg.offset().top;
                var tgAdjustTop = Math.round(tgTop - adjustOption);

                if ( btn.hasClass('onOpen') ) {
                    openCont.slideUp(400);
                    btnBox.removeClass('open');
                    btn.removeClass('onOpen');
                    btn.find('span').text('더보기');

                    _t.scrolling($(this).closest(".component").offset().top, tgAdjustTop);
                } else {
                    openCont.slideDown(400);
                    btnBox.addClass('open');
                    btn.addClass('onOpen');
                    btn.find('span').text('닫기');

                    _t.scrolling($(this).closest(".list-btn-area").next(".more-content").offset().top, contAdjustTop);
                }
            });

            $('.in-close').on('click', function (e) {
                e.preventDefault();
                $(this).closest(".component").children(".cpt-wrap > .list-btn-area").removeClass("open");
                $(this).closest(".more-content").slideUp(400);
                
                $(this).closest(".more-content").prev('.list-btn-area').children('.more').focus();

                var tg = $(this).closest(".component");
				var adjustOption = ($(".KRC0004").length>0) ? Math.round($(".KRC0004").outerHeight()) : 0;
				var tgTop = tg.offset().top;
                var tgAdjustTop = Math.round(tgTop - adjustOption);

                _t.scrolling($(this).closest(".component").offset().top, tgAdjustTop);

                var offBtn = $('.openBtn');
                offBtn.removeClass('onOpen');
                offBtn.find('span').text('더보기');
                offBtn.parent('.list-btn-area').removeClass('open');
            });
        }
    }
    KRC0004.init();
});