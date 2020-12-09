(function() {
    /*
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
*/

    var listItemTemplate =
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="slide-box">' +
                '<div class="product-image"><span class="img"><img src="{{imageUrl}}" alt="{{imageAlt}}"></span></div>' +
                '<div class="product-info">' +
                    '<div class="product-name"><strong>{{produncName}}</strong><span class="model-num">{{squ}}</span></div>' +
                    '<div class="info-area"><ul>' +
                        '<li>구매수량 : {{quantity}}</li>' +
                        '<li>{{store}}</li>' +
                        '<li>{{date}} {{type}}</li>' +
                    '</ul></div>' +
                '</div>' +
            '</div>' +
        '</div>';

    $(window).ready(function() {
        var myMembership = {
            init: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');

                self.$dateFilter = self.$contWrap.find('div.filters');
                self.$dateFilterStartDate = self.$dateFilter.find('#date-input1');
                self.$dateFilterEndDate = self.$dateFilter.find('#date-input2');
                self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
                self.$productSlide = $('div.slide-wrap');

                self.bindEvents();
            },

            bindEvents: function() {
                var self = this;

                self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
                });

                self.$inquiryButton.on('click',function (e) {
                    var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                    var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                    if(startDate && endDate) {
                        var param = {
                            "startDate":startDate,
                            "endDate":endDate,
                            "purchaseType":self.$dateFilter.find('input[name="purchaseType"]:checked').val()
                        }
                        self.requestData(param);
                    }
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$dateFilter.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];
                    var $list = self.$productSlide.find('div.slide-track');
                    $list.empty();
                    if(arr.length > 0) {
                        //self.$dateFilter.siblings('div.no-data').hide();
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy. MM. dd');
                            $list.append(vcui.template(listItemTemplate, item));
                        });
                        self.$productSlide.vcCarousel('reinit');
                        self.$productSlide.show();
                    } else {
                        self.$productSlide.hide();
                        //self.$dateFilter.siblings('div.no-data').show();
                    }
                });
            }
        };

        myMembership.init();                
    });
})();