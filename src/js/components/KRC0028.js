$(window).ready(function(){
    if(!document.querySelector('.KRC0028')) return false;

    $('.KRC0028').buildCommonUI();

    vcui.require(['ui/carousel'], function () {
        var $KRC0028 = $('.KRC0028');
        var $thumbSlider = $KRC0028.find('.ui_carousel_thumb_slider');

        $KRC0028.find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            fade:true,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        fade:false,
                        swipeToSlide:false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ],
            asNavFor: '.ui_carousel_thumb_slider'
        })

        $thumbSlider.vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: false,
            slidesToShow: 5,
            slidesToScroll: 1,
            focusOnChange:true,
            focusOnSelect: true,
            asNavFor: '.ui_carousel_slider'
        });

        $thumbSlider.find('div.ui_carousel_slide a').on('click', function(e){
            e.preventDefault();
        });
    });
})