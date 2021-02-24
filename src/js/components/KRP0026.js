(function() {
    var KRP0026 = {
        init: function() {
            var self = this;

            self.setting();
            self.bindEvents();

            //최초 시작시 선택되어 있는 카테고리탭으로 데이타 가져오기
            self.requestSelectedCategoryData();
        },

        setting: function() {
            var self = this;

            self.component = $('.KRP0026');

            // self.section.find('.ui_carousel_slider').vcCarousel({
            //     settings: "unslick",
            //     responsive: [
            //         {
            //             breakpoint: 10000,
            //             settings: "unslick"
            //         },
            //         {
            //             breakpoint: 768,
            //             settings: {
            //                 infinite: false,
            //                 dots: true,
            //                 slidesToShow: 1, 
            //                 slidesToScroll: 1
            //             }
            //         }
            //     ]
            // });

            var $tab = self.section.find('div.page-header .ui_tab');
            self.$categoryTab = $tab.eq(0);
            self.$subCategory = $tab.eq(1);
        },

        bindEvents: function() {
            var self = this;

            //카테고리탭
            self.$categoryTab.on('tabchange', function(e, data) {
                var href = $(data.button).attr('href').replace("#", "");
                console.log(href);
            });
        },

        requestSelectedCategoryData: function() {
            var self = this;
            var $a = self.$categoryTab.find('li.on a');
            var href = $a.attr('href').replace("#", "");
            console.log($a, href);
        }

    };

    $(window).ready(function(){
        if(!document.querySelector('.KRP0026')) return false;
        $('.KRP0026').buildCommonUI();
        KRP0026.init();
    });
})();