(function() {
    var OpenExhibitionEvent = {
        init: function() {
            var self = this;
            vcui.require(['ui/carousel'], function () {
                self.setting();
            });
        },

        setting: function() {
            var self = this;

            self.$wrap = $('.ev-detail-wrap');
            self.$wrap.find('.ui_recom_carousel').vcCarousel({
                infinite: false,            
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            lastFix:true
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            lastFix:false
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            lastFix:false
                        }
                    },
                    {
                        breakpoint: 10000,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            lastFix:false

                        }
                    }
                ]
            });
        }
    }

    $(document).ready(function() {
        OpenExhibitionEvent.init();
    }); 
})();