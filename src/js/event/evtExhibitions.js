$(document).ready(function() {    

    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        $wrap.find('.ui_objet_carousel').vcCarousel({
            infinite: true,            
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : true,
            dots: false,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        variableWidth : true,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        variableWidth : false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]

        });

    })
});
