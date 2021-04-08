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
                slidesToScroll: 1,
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
                        breakpoint: 10000,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
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