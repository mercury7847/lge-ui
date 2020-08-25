$(window).ready(function(){
    
    vcui.require(['ui/carousel', 'ui/modal'], function () {
        $('.category-wrap').vcCarousel({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            arrows: true,
            customPaging: function(carousel, i) {
                var $button = $('<button type="button"><em class="blind">'+(i+1)+'</em></button>');
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

})

// $(window).resize(function() {
//     if($(window).width() < 768){
//         $('body').find('.ui_tab').vcTab();
//     } else {
        
//     }
// });