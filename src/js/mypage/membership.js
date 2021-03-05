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
                //self.$dateFilterStartDate = self.$dateFilter.find('#date-input1');
                //self.$dateFilterEndDate = self.$dateFilter.find('#date-input2');
                self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
                self.$memberlist = self.$contWrap.find('div.member-lists');
                self.titWrap = self.$memberlist.parents('.sects').find('.tit-wrap');
                self.$noData = self.$contWrap.find('div.no-data');

                //self.searchStartDate = null;
                //self.searchEndDate = null;

                /*
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
                */

                vcui.require([/*'ui/validation', */'ui/pagination', 'ui/datePeriodFilter'], function () {
                    //self.validation = new vcui.ui.Validation('div.cont-wrap div.filters',{register:register});
                    self.$pagination =  self.$contWrap.find('div.pagination').vcPagination({scrollTop:self.titWrap.offset().top});
                    self.$dateFilter.vcDatePeriodFilter({"dateBetweenCheckValue":"3m","dateBetweenCheckEnable":false});
                    self.bindEvents();
                    self.checkNoData();
                });
            },

            bindEvents: function() {
                var self = this;

                self.$editButton.on('click', function (e) {
                    var url = $(this).attr('data-link-url');
                    location.href = url;
                });
 
                /*
                self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
                });
                */

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
                /*
                var result = self.validation.validate();
                if(!result.success){
                    return;
                }
                */

                //var param = {};
                var param = self.$dateFilter.vcDatePeriodFilter('getSelectOption');
                param.page = page;
                /*
                var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                if(changeDate) {
                    self.searchStartDate = startDate;
                    self.searchEndDate = endDate;
                } else {
                    if(self.searchStartDate) {
                        var date = new Date(vcui.date.format(self.searchStartDate,'yyyy-MM-dd')); 
                        self.$dateFilterStartDate.vcCalendar('setDate', date);
                    }
                    if(self.searchEndDate) {
                        var date = new Date(vcui.date.format(self.searchEndDate,'yyyy-MM-dd')); 
                        self.$dateFilterEndDate.vcCalendar('setDate', date);
                    }
                    
                    startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                    endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                }
                */

                /*
                if(startDate && endDate) {
                    param = {
                        "startDate":startDate,
                        "endDate":endDate,
                        "purchaseType":self.$dateFilter.find('input[name="purchaseType"]:checked').val(),
                        "page":page
                    }
                } else {
                    return;
                }
                */

                var ajaxUrl = self.$dateFilter.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    //페이지
                    self.$pagination.vcPagination('setPageInfo',result.param.pagination);

                    var arr = data instanceof Array ? data : [];
                    var $list = self.$memberlist.find('ul');
                    $list.empty();
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy. MM. dd');
                            $list.append(vcui.template(listItemTemplate, item));
                        });
                        self.$memberlist.show();
                        console.log('show',self.$memberlist);
                    } else {
                        self.$memberlist.hide();
                        console.log('hide',self.$memberlist);
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