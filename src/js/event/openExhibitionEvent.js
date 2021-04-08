(function() {
    var openEventItemTemplate = '<li class="slide-conts ui_carousel_slide">' +
        '<a href="{{pdpUrl}}" class="slide-box">' +
            '<div class="img">' +
                '<img src="{{imagePC}}" class="pc data-lazy" alt="{{imageAlt}}">' +
                '<img src="{{imageMobile}}" class="mobile data-lazy" alt="{{imageAlt}}">' +
            '</div>' +
            '<div class="info">' +
                '<div class="model">{{modelName}}</div>' +
                '<div class="code">{{sku}}</div>' +
                '<div class="price-area">' +
                    '{{#if originalPrice}}<div class="original"><em class="blind">기존가격</em><span class="price">{{originalPrice}}<em>원</em></span></div>{{/if}}' +
                    '{{#if salePrice}}<div class="total"><em class="tit">혜택가</em><span class="price">{{salePrice}}<em>원</em></span></div>{{/if}}' +
                '</div>' +
            '</div>' +
        '</a>' +
    '</li>'

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
        }
    }

    $(document).ready(function() {
        OpenExhibitionEvent.init();
    }); 
})();