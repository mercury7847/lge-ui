$(document).ready(function() {
    CS.MD.drawOption();
    $('[data-target]').drawOption();

    vcui.require(['ui/carousel', 'ui/validation', 'ui/modal'], function () {
        $('.category-select-carousel').vcCarousel({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            arrows: true,
            customPaging: function(carousel, i) {
                var $button = $('<button type="button" class="btn-indi"><span class="blind">'+(i+1)+'번 내용 보기'+'</span></button>');
                return $button;
            },
            responsive: [
                {
                    breakpoint:768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows: false
                    }
                }
            ]
        });
    });
});