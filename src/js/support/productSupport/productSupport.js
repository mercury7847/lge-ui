(function() {
    
    
    
    $(window).ready(function() {
        var psp = {
            init: function() {
                var self = this;

                $('.ui_anchor_sticky').vcSticky({
                    wrap: true,
                    usedAnchor: true,
                    actClass: 'on',
                    actClass: 'on',
                    isContainerAbled: false
                });

                lgkorUI.initProductSlider();
                $('.related-info .info-slider').vcCarousel({
                    infinite: false,
                    autoplay: false,
                    slidesToScroll: 3,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToScroll: 3,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth: true
                            }
                        },
                        {
                            breakpoint: 20000,
                            settings: {
                                slidesToScroll: 3,
                                slidesToShow: 3
                            }
                        }
                    ]
                });
            }
        }
        
        psp.init();
    });
})();