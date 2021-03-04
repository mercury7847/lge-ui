
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

            //$('.ui_carousel_4_slider').vcCarousel('setOption', 'infinite', true, true);
            
            $('.ui_lifestyle_list').vcCarousel({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
    
                responsive: [{
                    breakpoint: 100000,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
                    
            });


        $('.ui_carousel_slider').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                        
                    }
                },
                {
                    breakpoint: 1090,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 2, 
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: "unslick"
                }
            ]
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
        $('.ui_carousel_slider').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                        
                    }
                },
                {
                    breakpoint: 1090,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 2, 
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: "unslick"
                }
            ]
        });

            $('.new-product-list').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    infinite: true,
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
