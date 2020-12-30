vcui.define('ui/datePeriodFilter', ['jquery', 'vcui', 'ui/calendar', 'ui/validation'], function ($, core) {
    "use strict";

    var DatePeriodFilter = core.ui('DatePeriodFilter', /** @lends vcui.ui.DatePeriodFilter# */{
        $singleton: true,
        bindjQuery: 'datePeriodFilter',
        defaults: {
            validation:'div.filters',
            startDate:'.startDate',
            endDate:'.endDate',
            inquiryButton:'button.calendarInquiry-btn',
            errorCheck:true,
            errorMsg:'조회기간을 설정해주세요.',
            msgTarget:'.err-block',
            periodSelectInputName:'periodSelect',
            dateBetweenCheckEnable : true,
            dateBetweenCheckYear : 2,
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._setting();
            self._bindEvents();
        },

        _setting: function() {
            var self = this;
            
            self.$dateFilterStartDate =  self.$el.find(self.options.startDate);
            self.$dateFilterEndDate =  self.$el.find(self.options.endDate);
            self.$inquiryButton = self.$el.find(self.options.inquiryButton);

            self.$dateFilterStartDate.vcCalendar();
            self.$dateFilterEndDate.vcCalendar();

            if(self.options.errorCheck) {
                var register = {
                    startDate:{
                        required: true,
                        errorMsg: self.options.errorMsg,
                        msgTarget: self.options.msgTarget
                    },
                    endDate:{
                        required: true,
                        errorMsg: self.options.errorMsg,
                        msgTarget: self.options.msgTarget
                    },
                };

                self.validation = new vcui.ui.Validation(self.options.validation,{register:register});
            }

            //기간 선택 옵션버튼이 달려 있는 필터일 경우 선택되어 있는것이 있으면 오늘날짜를 기준으로 날짜를 세팅한다.
            var checkedInput = self.$el.find('input[name="' + self.options.periodSelectInputName + '"]:checked');
            if(checkedInput.length > 0) {
                var date = new Date();
                self.$dateFilterEndDate.vcCalendar('setDate', date);
                self.setBeforePeriod(checkedInput.val());
            }
        },

        _bindEvents: function() {
            var self = this;
            self.$dateFilterStartDate.on('calendarinsertdate', function (e, data) {
                //시작일을 선택시 종료일의 시작날짜를 변경한다.
                self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
            });

            self.$dateFilterStartDate.on('calendarselected', function(e){
                var checkedInput = self.$el.find('input[name="' + self.options.periodSelectInputName + '"]');
                checkedInput.prop('checked', false);
                //self.$el.find('input[type="radio"]').prop('checked', false);
            });

            self.$dateFilterEndDate.on('calendarselected', function(e){
                var checkedInput = self.$el.find('input[name="' + self.options.periodSelectInputName + '"]');
                checkedInput.prop('checked', false);
                //self.$el.find('input[type="radio"]').prop('checked', false);
            });

            self.$el.find('input[type="radio"]').on('click',function (e) {
                var name = $(this).attr('name');
                var checkedInput = self.$el.find('input[name="' + name + '"]:checked');
                if(name == self.options.periodSelectInputName) {
                    self.setBeforePeriod(checkedInput.val());
                }
                var param = {};
                param[name] = checkedInput.val();
                self.triggerHandler("dateFilter_option", param);
            });

            self.$inquiryButton.on('click',function (e) {
                if(self.options.errorCheck) {
                    var result = self.validation.validate().success;
                } else {
                    var result = true;
                }
                if(result){
                    if(self.dateBetweenValidation()) {
                        var param = self.getSelectOption();
                        if(param) {
                            self.triggerHandler("dateFilter_submit", param);
                        }
                    }
                }
            });
        },

        //시작일 넣기
        setStartDate: function (yyyyMMdd) {
            var self = this;
            var date = new Date(vcui.date.format(yyyyMMdd,'yyyy-MM-dd')); 
            self.$el.find(self.options.startDate).vcCalendar('setDate', date);
            self.$el.find(self.options.endDate).vcCalendar('setMinDate', date);
        },

        //종료일 넣기
        setEndDate: function (yyyyMMdd) {
            var self = this;
            var date = new Date(vcui.date.format(yyyyMMdd,'yyyy-MM-dd')); 
            self.$el.find(self.options.endDate).vcCalendar('setDate', date);
        },

        //종료일 기준으로 기간 선택. 숫자만 있는경우 일, m으로 끝나는 경우 달
        setBeforePeriod: function (period){
            var self = this;
            var date = self.$el.find(self.options.endDate).vcCalendar('getyyyyMMdd');
            if(date) {
                var d = self.yyyyMMddTodate(date); 
                period = period.toLowerCase();
                var n = period.includes("m");
                if(n) {
                    //월
                    var month = period.toLowerCase().replaceAll('m','');
                    var m = d.getMonth();
                    d.setMonth(d.getMonth() - month);

                    // If still in same month, set date to last day of 
                    // previous month
                    if (d.getMonth() == m) d.setDate(0);
                }else {
                    //일
                    var day = period;
                    d.setDate(d.getDate() - day);
                }

                d.setHours(0, 0, 0);
                d.setMilliseconds(0);

                self.setStartDate(vcui.date.format(d,'yyyyMMdd'));
            }
        },

        //현재 설정된 옵션값들을 가져온다
        getSelectOption: function() {
            var self = this;
            var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
            var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
            var checkedInput = self.$el.find('input[type="radio"]:checked');
            var param = null;
            if(startDate && endDate) {
                param = {
                    "startDate":startDate,
                    "endDate":endDate,
                }
                param[checkedInput.attr('name')] = checkedInput.val();
            }
            return param;
        },

        dateBetweenValidation: function(){
            var self = this;
            if(self.options.dateBetweenCheckEnable) {
                var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');

                if(startDate == null || endDate == null) {
                    lgkorUI.alert('', {title: "조회기간을 확인해 주세요."});
                    return false;
                }

                var starttime = self.yyyyMMddTodate(startDate);
                var endtime = self.yyyyMMddTodate(endDate);
                var period = endtime.getTime() - starttime.getTime();
                if(period < 0) {
                    lgkorUI.alert('', {title: "조회기간을 확인해 주세요."});
                    return false;
                }
        
                var limitperiod = self.options.dateBetweenCheckYear * 1000 * 60 * 60 * 24 * 365;
                if(period > limitperiod) {
                    lgkorUI.alert('', {title: "최대 조회 기간은<br>2년을 넘을 수 없습니다."});
                    return false;
                }
            }
            
            return true;
        },

        yyyyMMddTodate: function(date_str) {
            var yyyyMMdd = String(date_str);
            var sYear = yyyyMMdd.substring(0,4);
            var sMonth = yyyyMMdd.substring(4,6);
            var sDate = yyyyMMdd.substring(6,8);
            return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
        }

    });

    return DatePeriodFilter;
});