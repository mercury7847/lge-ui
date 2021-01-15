
;(function(){

    function init(){
        console.log("Story Home Start!!!");

        vcui.require(['ui/toggleCarousel', 'ui/tab'], function () {

            $('.module-box.cnt01 .ui_tab').vcTab();
            var categoryTab = $('.module-box.cnt01 .ui_tab').vcTab("instance");
            categoryTab.on("tabchange", function(e, data){
                if(window.breakpoint.name == "mobile"){
                    $('.category-list-slide').vcToggleCarousel("update");
                }
            });

            $('.category-list-slide').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    infinite: true,
                    variableWidth : false,
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            });

            $('.product-recom-slide').vcToggleCarousel({
                pcOption: {
                    responsive: [
                        {
                            breakpoint: 10000,
                            settings: {
                                infinite: true,
                                variableWidth : false,
                                dots: true,
                                slidesToShow: 2,
                                slidesToScroll: 2
                                
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                infinite: true,
                                variableWidth : false,
                                dots: true,
                                slidesToShow: 2, 
                                slidesToScroll: 2
                            }
                        }
                    ]
                },
                mobileOption: "unbuild"
            });

            $('.new-product-list').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    infinite: false,
                    variableWidth : false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            });
        });
    }

    $(window).load(function(){
        init();
    })
})();
