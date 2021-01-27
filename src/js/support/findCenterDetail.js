(function() {
    var map;

    $(window).ready(function() {
        vcui.require(['ui/carousel', 'ui/storeMap'], function () {
            var data = $('.contents').data();

            $('.map').vcStoreMap({
                keyID: 'vsay0tnzme',
                latitude : data.latitude,
                longitude: data.longitude
            }).on('mapinit', function(e){
                map = $('.map').vcStoreMap('instance');
                var marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(data.latitude, data.longitude),
                        icon: {
                            url: '/lg5-common/images/icons/icon-point.svg',
                            // content: 
                            //     '<div>'+
                            //     '   <div class="point on">'+
                            //     '       <span class="num">-</span>'+
                            //     '   </div>'+
                            //     '</div>',
                            size: new naver.maps.Size(40, 40),
                            anchor: new naver.maps.Point(20, 40)
                        }
                    });

                marker.setMap(map.map);
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