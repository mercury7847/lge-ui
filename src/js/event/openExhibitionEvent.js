(function() {
    var KRP0008 = {
        init: function() {
            var self = this;
            //처음 로그인 체크를 하는 ajax 호출 여부
            self.processProductBuy = null;
            self.loginCheckEnd = false;

            self.isDragging = false;

            self.setting();
            self.popUpDataSetting();

            if(self.$component.data('consumables')) {
                vcui.require(['support/consumables.min'], function (consumables) {
                    self.prepare();
                    self.consumables = consumables;
                });
            } else {
                self.prepare();
            }
        },
    }
})();

$(document).ready(function() {    

    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        console.log($wrap.find('.ui_recom_carousel'));
        $wrap.find('.ui_recom_carousel').vcCarousel({
            infinite: true,            
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : true,
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

    })
});
