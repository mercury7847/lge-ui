(function() {
    /*
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
*/

    var listItemTemplate = '<li class="item"><div class="inner">' +
        '<div class="product-image"><span class="img"><img src="{{imageUrl}}" alt="{{imageAlt}}"></span></div>' +
        '<div class="product-info">' +
            '<div class="product-name"><strong>{{produncName}}</strong><span class="model-num">{{sku}}</span></div>' +
            '<div class="info-area"><ul>' +
                '<li>구매수량 : {{quantity}}</li>' +
                '<li>{{store}}</li>' +
                '<li>{{date}} {{type}}</li>' +
            '</ul></div>' +
        '</div>' +
    '</div></li>';
    
    $(window).ready(function() {
        var myMembership = {
            init: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$editButton = self.$contWrap.find('#membershipEditButton');
                self.$dateFilter = self.$contWrap.find('div.filters');
                self.$dateFilterStartDate = self.$dateFilter.find('#date-input1');
                self.$dateFilterEndDate = self.$dateFilter.find('#date-input2');
                self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
                self.$memberlist = self.$contWrap.find('div.member-lists');
                self.$noData = self.$contWrap.find('div.no-data');

                var register = {
                    startDate:{
                        required: true,
                        errorMsg: "조회기간을 설정해주세요.",
                        msgTarget: '.err-block'
                    },
                    endDate:{
                        required: true,
                        errorMsg: "조회기간을 설정해주세요.",
                        msgTarget: '.err-block'
                    },
                };
                vcui.require(['ui/validation', 'ui/pagination'], function () {
                    self.validation = new vcui.ui.Validation('div.cont-wrap div.filters',{register:register});
                    self.$pagination =  self.$contWrap.find('div.pagination').vcPagination();
                    self.bindEvents();
                });

                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                self.$editButton.on('click', function (e) {
                    console.log(self.$editButton);
                    var url = $(this).attr('data-link-url');
                    location.href = url;
                });
 
                self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
                });

                self.$inquiryButton.on('click',function (e) {
                    self.requestData(1);
                });

                //페이지
                self.$pagination.on('page_click', function(e, data) {
                    self.requestData(data);
                });
            },

            requestData: function(page) {
                var self = this;
                var result = self.validation.validate();
                if(!result.success){
                    return;
                }

                var param = {};
                var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                if(startDate && endDate) {
                    param = {
                        "startDate":startDate,
                        "endDate":endDate,
                        "pointUseType":self.$dateFilter.find('input[name="pointUseType"]:checked').val(),
                        "page":page
                    }
                } else {
                    return;
                }

                var ajaxUrl = self.$dateFilter.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    //페이지
                    self.$pagination.vcPagination('setPageInfo',result.param.pagination);

                    var arr = data instanceof Array ? data : [];
                    var $list = self.$memberlist.find('ul');
                    $list.empty();
                    console.log($list);
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy. MM. dd');
                            $list.append(vcui.template(listItemTemplate, item));
                        });
                        self.$memberlist.show();
                    } else {
                        self.$memberlist.hide();
                    }
                    self.checkNoData();
                });
            },

            checkNoData: function() {
                var self = this;
                var $list = self.$memberlist.find('li.item');
                if($list.length > 0) {
                    self.$memberlist.show();
                    self.$pagination.show();
                    self.$noData.hide();
                } else {
                    self.$memberlist.hide();
                    self.$pagination.hide();
                    self.$noData.show();
                }
            },
        };

        myMembership.init();                
    });
})();