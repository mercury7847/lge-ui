(function() {
    var listItemTemplate =
                '<li>'+
                '   <p class="date">{{date}}</p>'+
                '   <p class="desc">{{place}}</p>'+
                '   <p class="point">'+
                '       <span class="mo_txt">포인트{{pointUseType}}</span>'+
                '       <span class="num">{{pointSign}}{{point}}P <em class="pc_txt">{{pointUseType}}</em></span>' +
                '   </p>'+
                '</li>';

    $(window).ready(function() {
        var myPoint = {
            init: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$dateFilter = self.$contWrap.find('div.filters');
                self.$dateFilterStartDate = self.$dateFilter.find('#date-input1');
                self.$dateFilterEndDate = self.$dateFilter.find('#date-input2');
                self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
                self.$pointList = self.$contWrap.find('.point-use-list ul');
                self.$pointTotal = self.$contWrap.find('.point-use-list .total dd');
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
                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.Validation('div.cont-wrap div.filters',{register:register});
                });

                self.bindEvents();
                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
                });

                self.$inquiryButton.on('click',function (e) {
                    var result = self.validation.validate();
                    if(result.success){
                        var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                        var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                        if(startDate && endDate) {
                            var param = {
                                "startDate":startDate,
                                "endDate":endDate,
                                "pointUseType":self.$dateFilter.find('input[name="pointUseType"]:checked').val()
                            }
                            self.requestData(param);
                        }
                    }
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$dateFilter.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
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
                if( self.$pointList.find('li').length > 0) {
                    self.$pointList.parent().show();
                    self.$noData.hide();
                } else {
                    self.$pointList.parent().hide();
                    self.$noData.show();
                }
            },
        };

        myPoint.init();                
    });
})();