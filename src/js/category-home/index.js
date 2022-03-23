var odc = {
    /**
     * 최초 실행 시 필요한 변수 정의 및 이벤트 함수 실행
     */
    init: function () {
       var self = this;

       self.heroBannerCarousel();
       self.heroBannerSetting()

       self.showRoomCarousel();

       self.allView();
       self.bindEvent();
    },

    /**
     * 이벤트 관련
     */
    bindEvent: function () {

    },

    /**
     * 공통 : 전체보기
     */
    allView: function() {
        var self = this;

        var $allViewTarget = $('[data-all-view]');
        var $allViewButton = $('.odc-all-view');

        $allViewTarget.each(function(){
            var item = $($(this).data('allViewItem'));
            var limit = $(this).data('allViewLimit');
            if(item.length > limit){
                $(this).find($allViewButton).show();
            }
        })

        $allViewButton.on('click', function(){
            if($(this).hasClass('is-active')){
                $($(this).data('allViewTarget')).removeClass('is-active');
                $(this).removeClass('is-active');
                $(this).find('.odc-all-view__text').text('전체보기');
            } else {
                $($(this).data('allViewTarget')).addClass('is-active');
                $(this).addClass('is-active');
                $(this).find('.odc-all-view__text').text('전체닫기');
            }
        })
    },

    /**
     * ODCC0001 : 상단 hero 배너
     */
    heroBannerSetting: function () {
        var self = this;
        var $slide = $('.odc-hero .odc-hero__slide');
        var $indicator = $('.odc-hero__indicator');
        var $slideCurrent = $indicator.find('.odc-hero__current');
        var $totalCount = $indicator.find('.odc-hero__count');
        var currentIndex = $slide.siblings('.ui_carousel_current').index() || 1;

        if($slide.length > 1) {
            $indicator.show();
            $slideCurrent.text(currentIndex);
            $totalCount.text($slide.length-2);
        }
    },

    heroBannerCarousel: function() {
        var self = this;

        $('.odc-hero').vcCarousel({
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            touchThreshold: 100,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150
        }).on('carouselafterchange', function(e, slide){
            self.heroBannerSetting();
        })
    },

    showRoomCarousel: function() {
        var self = this;

        if($('.odc-show-room__body').length) {
            $('.odc-show-room__body').vcCarousel({
                infinite: true,
                pauseOnHover: false,
                pauseOnFocus: false,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                touchThreshold: 100,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150
            }).on('carouselafterchange', function (e, slide) {
                //self.heroBannerSetting();
            })
        }
    }
}

$(function(){
    odc.init();
});