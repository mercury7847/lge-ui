$(window).ready(function(){
    if(!document.querySelector('.KRC0023')) return false;
    
    $('.KRC0023').buildCommonUI();

    vcui.require(['ui/toggleCarousel'], function () {

        $('.KRC0023').each(function(){
            //BTOCSITE-9570 진열기획전 페이지 수정 요청으로 slidesToShowMore 케이스 추가
            if($(this).hasClass('slidesToShowMore')){
                $(this).find('.ui_carousel_slider2').vcToggleCarousel({
                    pcOption: "unbuild",
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    touchThreshold: 100,
                    speed: 150,
                    mobileOption: {
                        infinite: false,
                        dots: true,
                        slidesToShow: 1.28,
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    }
                });
            }else{
                $(this).find('.ui_carousel_slider2').vcToggleCarousel({
                    pcOption: "unbuild",
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    touchThreshold: 100,
                    speed: 150,
                    mobileOption: {
                        infinite: true,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    }
                });
            }
        })
    });    

})