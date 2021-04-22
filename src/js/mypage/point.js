(function() {
    var listItemTemplate =
        '<li>'+
        '   <p class="date">{{date}}</p>'+
        '   <p class="desc">{{place}}</p>'+
        '   <p class="point">'+
        // '       <span class="mo_txt">포인트{{pointUseType}}</span>'+
        // '       <span class="num">{{pointSign}}{{point}}P <em class="pc_txt">{{pointUseType}}</em></span>' +
        '       <span class="num">{{pointSign}}{{point}}P</span>' +
        '   </p>'+
        '</li>';

    var myPoint = {
        init: function() {
            var self = this;
            self.$contWrap = $('div.cont-wrap');
            self.$dateFilter = self.$contWrap.find('div.filters');

            //self.$dateFilterStartDate = self.$dateFilter.find('#date-input1');
            //self.$dateFilterEndDate = self.$dateFilter.find('#date-input2');
            self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
            self.$pointList = self.$contWrap.find('.point-use-list ul');
            self.$pointTotal = self.$contWrap.find('.point-use-list .total dd');
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

            vcui.require([/*'ui/validation',*/'ui/pagination','ui/datePeriodFilter'], function () {
                //self.validation = new vcui.ui.Validation('div.cont-wrap div.filters',{register:register});
                self.$pagination =  self.$contWrap.find('div.pagination').vcPagination();
                self.$dateFilter.vcDatePeriodFilter({"dateBetweenCheckEnable":false, "minDate":"-20y"}).vcDatePeriodFilter('setNewYearDayToStartDate');
                self.bindEvents();
                self.checkNoData();
                self.requestData(1, true);
            });
        },

        bindEvents: function() {
            var self = this;

            /*
            self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                //시작일을 선택시 종료일의 시작날짜를 변경한다.
                self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
            });
            */

            self.$inquiryButton.on('click',function (e) {
                self.requestData(1, true);
            });

            //페이지
            self.$pagination.on('page_click', function(e, data) {
                self.requestData(data, true);
            });

            //멤버십 포인트 종류 라디오버튼
            self.$dateFilter.on('change','.select-list-wrap input[type=radio]',function(e){
                self.$inquiryButton.trigger('click');
            });

        },

        requestData: function(page, showLoading) {
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
                    "pointUseType":self.$dateFilter.find('input[name="pointUseType"]:checked').val(),
                    "page":page
                }
            } else {
                return;
            }
            */

            if(showLoading) lgkorUI.showLoading();
            var ajaxUrl = self.$dateFilter.attr('data-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;
                //페이지
                self.$pagination.vcPagination('setPageInfo',result.param.pagination);

                self.$pointTotal.text(vcui.number.addComma(data.totalPoint) + "P");
                var arr = data.listData instanceof Array ? data.listData : [];
                self.$pointList.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy. MM. dd');
                        item.point = vcui.number.addComma(item.point);
                        self.$pointList.append(vcui.template(listItemTemplate, item));
                    });
                    self.$pointList.show();
                } else {
                    self.$pointList.hide();
                }
                self.checkNoData();
            });
        },

        checkNoData: function() {
            var self = this;
            if(self.$pointList.find('li').length > 0) {
                self.$pointList.parent().show();
                self.$pagination.show();
                self.$noData.hide();
            } else {
                self.$pointList.parent().hide();
                self.$pagination.hide();
                self.$noData.show();
            }
        },
    };

    $(document).ready(function() {
        myPoint.init();
    });
})();