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

            console.log(self.$wrap, self.$wrap.find('.ui_recom_carousel'));
            self.$wrap.find('.ui_recom_carousel').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 4,
                slidesToShow: 1,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            //variableWidth: true,
                            slidesToScroll: 1,
                            slidesToShow: 1
                        }
                    }
                    /*,
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToScroll: 4,
                            slidesToShow: 1
                        }
                    }
                    */
                ]
            });

            /*
            self.$wrap.find('.ui_recom_carousel').vcCarousel({
                infinite: false,            
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            //variableWidth : true,
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            dots: true
                            //lastFix:true
                        }
                    },
                    {
                        breakpoint: 10000,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false
                            //lastFix:false

                        }
                    }
                ]
            });
            */
        }
    }

    $(document).ready(function() {
        OpenExhibitionEvent.init();
    }); 
})();