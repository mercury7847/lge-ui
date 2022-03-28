var odc = {
    /**
     * 최초 실행 시 필요한 변수 정의 및 이벤트 함수 실행
     */
    init: function () {
       var self = this;

       self.heroBannerCarousel();
       self.showRoomCarousel();
       self.showRoomMark();

       self.recommendedTab();

       self.allView();

       self.bindEvent();
    },

    /**
     * 공통 이벤트 관련
     */
    bindEvent: function () {

    },

    /**
     * 공통 : 전체보기
     */
    allView: function() {
        var self = this;

        var $allView = $('[data-all-view]');
        var $allViewButton = $('.odc-all-view');

        $allView.each(function(){
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
        var $slide = $('.odc-hero .odc-hero__slide');
        var $indicator = $('.odc-hero__indicator');
        var $slideCurrent = $('.odc-hero__current');
        var $totalCount = $('.odc-hero__total');
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

        self.heroBannerSetting();
    },

    /**
     * ODCC0003 : show room type 1
     */
    showRoomSetting: function () {
        var $slide = $('.odc-show-room-type1__slide');
        var $indicator = $('.odc-show-room-type1__indicator');
        var $dots = $('.odc-show-room-type1__dots');
        var $slideCurrent = $('.odc-show-room-type1__current');
        var $totalCount = $('.odc-show-room-type1__total');
        var currentIndex = $slide.siblings('.ui_carousel_current').index() || 1;

        if($slide.length > 1) {
            $indicator.show();
            $dots.show();
            $slideCurrent.text(currentIndex);
            $totalCount.text($slide.length-2);
        } else {
            // 기존 ui 공통 carousel.js와 보여주는 기능 중 겹치는 부분이 있는데 다르게 구현해야 하여 추가함
            $indicator.hide();
            $dots.hide();
        }
    },

    showRoomCarousel: function() {
        var self = this;

        if($('.odc-show-room-type1__body').length) {
            $('.odc-show-room-type1__body').vcCarousel({
                infinite: true,
                pauseOnHover: false,
                pauseOnFocus: false,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                dotsSelector:'.ui_carousel_dots',
                touchThreshold: 100,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150
            }).on('carouselafterchange', function (e, slide) {
                self.showRoomSetting();
            })

            self.showRoomSetting();
        }
    },

    showRoomMark: function() {
        var self = this;

        $('.odc-show-room-type1__mark').on('mouseenter', function(){
            $(this).closest('.odc-show-room-type1__item').find('.odc-show-room-type1__display').removeClass('is-active');
            $(this).closest('.odc-show-room-type1__display').addClass('is-active');
        })
    },

    /**
     * ODCC0005 : 제품 추천 탭
     */
    recommendedTab: function () {
        var self = this;
        var $tab = $('.odc-recommend-tab__button');
        var $tabPanel = $('.odc-recommend-tab__panel');

        $tab.on('click', function(){
            var targetId = $(this).data('panelTarget');

            $tab.removeClass('is-active');
            $(this).addClass('is-active');

            $tabPanel.removeClass('is-active');
            $('#' + targetId).addClass('is-active');
        });
    }
}

$(function(){
    odc.init();
});