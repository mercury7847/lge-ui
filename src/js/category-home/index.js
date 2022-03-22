$(function(){
    // ODCC0001 : 상단 hero 배너
    var heroBanner = function () {
        var heroList = $('.odc-hero .odc-hero__slide');
        var heroListAct = heroList.siblings('.ui_carousel_current').index() || 1;
        var heroListLens = heroList.length;
        var custom = $('.odc-hero__indicator');
        var slideCurrent = custom.find('.odc-hero__current');
        var slideCount = custom.find('.odc-hero__count');

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
    }).on('carouselafterchange', function(e, slide){
        heroBanner();
    })

    heroBanner();

    // ODCC0002 : 2depth 카테고리
    var $category2depth = $(".odc-2depth-category__inner");
    var $category2depthMore = $(".odc-2depth-category__more");

    if($category2depth.find('a').length > 6){
        $category2depthMore.show();
        $category2depthMore.on('click', function(){
            if($(this).hasClass('is-active')){
                $category2depth.removeClass('is-active');
                $(this).removeClass('is-active');
                $(this).find('span').text('전체보기');
            } else {
                $category2depth.addClass('is-active');
                $(this).addClass('is-active');
                $(this).find('span').text('전체닫기');
            }
        })
    }
});