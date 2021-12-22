$(window).ready(function(){
    if(!document.querySelector('.KRC0023')) return false;
    
    $('.KRC0023').buildCommonUI();

    vcui.require(['ui/toggleCarousel'], function () {

        //BTOCSITE-8625 LGE.COM PDP 내 캐로셀 컴포넌트 수정요청
        $('.KRC0023.slidesToShowMore').find('.ui_carousel_slider2').vcToggleCarousel({
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
        };

        $(".KRC0023").not(".slidesToShowMore").find('.ui_carousel_slider2').vcToggleCarousel({
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
    });    

})