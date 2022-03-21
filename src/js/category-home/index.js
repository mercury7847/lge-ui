$(function(){
    // 히어로 배너
    function heroBanner() {
        var heroList = $('.odc-hero .odc-hero__slide');
        var heroListAct = heroList.siblings('.ui_carousel_current').index();
        var heroListLens = heroList.length;
        var custom = $('.odc-hero__indicator');
        var slideCurrent = custom.find('.slide-page .current');
        var slideCount = custom.find('.slide-page .count');

        if(heroListLens > 1) {
            custom.show();
            slideCurrent.text(heroListAct);
            slideCount.text(heroListLens - 2);
        }
    }

    $('.odc-hero').vcCarousel({
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        dotsSelector: '.ui_wideslider_dots',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        touchThreshold: 100,
        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
        speed: 150
    })

    heroBanner();
});