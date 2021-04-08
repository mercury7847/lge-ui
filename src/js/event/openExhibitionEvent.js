(function() {
    var OpenExhibitionEvent = {
        init: function() {
            var self = this;
            vcui.require([/*'ui/tab', */'ui/carousel'], function () {
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
                dots: false,
                //dots: false,
                //variableWidth : false,
                /*
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth : true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                            //lastFix:true
                        }
                    }
                    {
                        breakpoint: 10000,
                        settings: {
                            variableWidth : false,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            dots: false
                            //lastFix:false

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