(function() {
    var param;

    $(window).ready(function() {
        vcui.require(['ui/carousel', 'ui/storeMap'], function () {
            var data = $('.contents').data();

            $('.map').vcStoreMap({
                keyID: 'vsay0tnzme',
                latitude : data.latitude,
                longitude: data.longitude
            });
            
            $('.photo .ui_carousel_slider').vcCarousel({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                variableWidth : true,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: true,
                            slidesToShow: 2,
                            slidesToScroll: 2
                            
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            infinite: false,
                            variableWidth : true,
                            dots: true,
                            slidesToShow: 1, 
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
    });
})();