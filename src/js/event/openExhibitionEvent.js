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
                slidesToScroll: 1,
                dots: false,
                lastFix:false,
                variableWidth : false,
                
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            variableWidth : false,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            lastFix:false

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth : true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            lastFix:true
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