(function() {
    var OpenExhibitionEvent = {
        init: function() {
            var self = this;
            vcui.require(['ui/tab', 'ui/carousel'], function () {
                self.setting();
            });
        },

        setting: function() {
            var self = this;

            self.$wrap = $('.ev-detail-wrap');
            console.log(self.$wrap.find('.ui_recom_carousel'));
            
            self.$wrap.find('.ui_recom_carousel').vcCarousel({
                infinite: false,            
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: false,
                /*
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
                */
            });
        }
    }

    $(document).ready(function() {
        OpenExhibitionEvent.init();
    }); 
})();