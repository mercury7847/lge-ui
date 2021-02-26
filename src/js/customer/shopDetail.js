
;(function(){

    function init(){
            
        vcui.require(['ui/storeMap', 'ui/carousel'], function () {
            var mapId = $('.contents.store-info-wrap').data("mapId");
            var appkey = $('.contents.store-info-wrap').data("appKey");
            var latitude = $('.contents.store-info-wrap').data("latitude");
            var longitude = $('.contents.store-info-wrap').data("longitude");
            var shopname = $('.contents.store-info-wrap').data("shopName");

            var searchRoadUrl;
            if(vcui.detect.isMobile){
                searchRoadUrl = "https://m.map.naver.com/route.nhn?ex=" + longitude + "&ey=" + latitude + "&ename=" + shopname + "&menu=route&pathType=1";
            } else{
                searchRoadUrl = "https://map.naver.com/index.nhn?elng=" + longitude + "&elat=" + latitude + "&etext=" + shopname + "&menu=route&pathType=1";
            }
            $('.searchRoad-btn').attr("href", encodeURI(searchRoadUrl));

            $('.map').vcStoreMap({
                keyID: mapId,
                appKey: appkey,
                longitude : longitude,
                latitude: latitude
            }).on('mapinit', function(e,data){
                var map = $('.map').vcStoreMap('instance');
                map.addMaker(latitude, longitude);
            });
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

        $('.event .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 2, 
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: 'unslick'
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

        $('.btn-close').on('click', function(e){
            e.preventDefault();

            window.close();
        });

        $('.chk-bookmark-wrap input[type=checkbox]').on('change', function(e){
            var ipt = $(this);
            var chk = ipt.prop('checked');
            var bookMarkerUrl = $('.contents.store-info-wrap').data("bookmarkUrl");

            var sendata = {
                checked: chk,
                shopId: $(this).data("shopId")
            }
            console.log(sendata)
            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(bookMarkerUrl, sendata, function(result){
                if(result.data.success == "N"){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                    
                    ipt.prop('checked', !chk);
                }
            });
        })
    }

    $(window).load(function(){
        init();
    })
})();