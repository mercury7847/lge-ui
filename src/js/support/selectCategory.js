$(window).ready(function() {
    vcui.require(['ui/carousel'], function () {
        $('.category-carousel').vcCarousel({
            infinite: false,
            swipeToSlide: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows:false,
            customPaging: function(carousel, i) {
                var $button = $('<button type="button" class="btn-indi"><span class="blind">'+(i+1)+'번 내용 보기'+'</span></button>');
                return $button;
            },
            responsive: [{
                breakpoint:768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
    });
});