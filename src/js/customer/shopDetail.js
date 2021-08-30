;(function(){

    function init(){

        // 210324  title tag remove 추가
        var manageInfoStr = $('.manager-info .txt p').text();        
        manageInfoStr = vcui.string.stripTags(manageInfoStr);
        manageInfoStr = vcui.string.trim(manageInfoStr);
        $('.manager-info .txt p').html(manageInfoStr);

            
        vcui.require(['ui/storeMap', 'ui/carousel'], function () {
            var mapId = $('.contents.store-info-wrap').data("mapId");
            var appkey = $('.contents.store-info-wrap').data("appKey");
            var latitude = $('.contents.store-info-wrap').data("latitude");
            var longitude = $('.contents.store-info-wrap').data("longitude");
            var shopname = $('.contents.store-info-wrap').data("shopName");

            var searchRoadUrl;
            if(vcui.detect.isMobile){
                searchRoadUrl = "https://m.map.naver.com/route.nhn?ex=" + longitude + "&ey=" + latitude + "&ename=LG전자 " + shopname + "&menu=route&pathType=1";
            } else{
                searchRoadUrl = "https://map.naver.com/index.nhn?elng=" + longitude + "&elat=" + latitude + "&etext=LG전자 " + shopname + "&menu=route&pathType=1";
            }
            $('.searchRoad-btn').attr("href", encodeURI(searchRoadUrl));

            $('.map').vcStoreMap({
                keyID: mapId,
                appKey: appkey,
                longitude : longitude,
                latitude: latitude
            }).on('maploaded', function(e,data){
                var map = $('.map').vcStoreMap('instance');
                map.addMaker(latitude, longitude);
            });
        });

        $('.photo .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2,
            variableWidth : true,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        variableWidth : true,
                        dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    }
                }
            ]
        });

        $('.event .ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 2, 
            slidesToScroll: 2,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: 'unslick'
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100
                    }
                }
            ]
        });

        // 원본 $('.cont-wrap > .btn-close,.cont-wrap .footer button')
        $('.cont-wrap > .btn-close,.cont-wrap .footer button').on('click', function(e){
            e.preventDefault();
            // if(isApp() && vcui.detect.isIOS){
            //     var jsonString = JSON.stringify({'command':'closeInAppBrowser'});
            //     webkit.messageHandlers.callbackHandler.postMessage(jsonString);
            // } else {
            //     window.close();	
            // }
            window.close();	

        });
        // $('.cont-wrap [data-close]').on('click', function(e){
        //     e.preventDefault();
            	
        //    if(isApp() && vcui.detect.isIOS){ 
        //         var jsonString = JSON.stringify({'command':'closeInAppBrowser'});
        //         webkit.messageHandlers.callbackHandler.postMessage(jsonString);
        //     } else {
        //         window.close();
        //     }
        // });

        // $('.cont-wrap [data-close]').on('click', function(e){
        //     e.preventDefault();
            
        //    if(isApp() && vcui.detect.isIOS){ 
        //         var jsonString = JSON.stringify({'command':'closeInAppBrowser'});
        //         webkit.messageHandlers.callbackHandler.postMessage(jsonString);
        //     } else {
        //         window.close();
        //     }
        // });



        $('.chk-bookmark-wrap input[type=checkbox]').on('change', function(e){
            var ipt = $(this);
            var chk = ipt.prop('checked');
            var bookMarkerUrl = $('.contents.store-info-wrap').data("bookmarkUrl");

            var sendata = {
                checked: chk,
                shopId: $(this).data("shopId")
            }

            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(bookMarkerUrl, sendata, function(result){
                if(result.data.success == "N"){
                    lgkorUI.confirm("로그인 후 이용가능 합니다.<br>로그인하시겠어요? ", {
                        title: "",
                        cancelBtnName: "아니오",
                        okBtnName: "네",
                        ok: function(){
                            window.opener.location.href = result.data.loginUrl;
                            window.close();
                        }
                    });
                    
                    ipt.prop('checked', !chk);
                } else {
                    if(chk) {
                        //추가
                        $(window).trigger("toastshow","단골매장이 등록되었습니다.");
                    } else {
                        //삭제
                        $(window).trigger("toastshow","단골매장이 해제되었습니다.");
                    }
                }
            });
        });

        //매장 상담신청 부모창으로
        $('.link-btn-wrap a').on('click', function(e){
            e.preventDefault();
            var url = $(this).attr('href');
            if(url) {
                window.opener.location.href = url;
                window.close();
            }
        });
    }

    $(document).ready(function() {
        init();
    });
})();