(function(){
    var cancelCounsel = {         
        init: function() {
            var self = this;
            vcui.require(['ui/validation', 'ui/calendarTable','ui/timeTable'], function () {
                self.setting();
                self.bindEvents();

                var param = lgkorUI.getHiddenInputData();
                if(param.dateList) {
                    self.$calendar.vcCalendarTable('update', param.dateList.split(','));
                };
            });
        },

        setting: function() {
            var self = this;
            self.$contWrap = $('div.cont-wrap');
            self.$calendar = $('div.calendar-wrap');
            self.$timeTable = $('div.timetable-wrap');
            self.$cancelButton = self.$contWrap.find('div.btn-group button:eq(0)');
            self.$okButton = self.$contWrap.find('div.btn-group button:eq(1)');

            self.$calendar.vcCalendarTable({"inputTarget":"div.hidden-input-group input[name=selectDate]"});
            self.$timeTable.vcTimeTable({"inputTarget":"div.hidden-input-group input[name=selectTime]"});

            var register = {
                inputReason:{
                    required: true,
                    errorMsg: "해지 신청사유를 입력해주세요.",
                    msgTarget: '.err-block'
                },
                selectDate:{
                    required: true,
                    errorMsg: "날짜를 선택해주세요."
                },
                selectTime:{
                    required: true,
                    errorMsg: "시간을 선택해주세요."
                },
            };

            self.registValidation = new vcui.ui.Validation('div.cont-wrap',{register:register});
        },

        bindEvents: function() {
            var self = this;
            self.$cancelButton.on('click',function(e){
                //history.back();
                var url = self.$contWrap.data('returnUrl');
                if(url) {
                    location.href = url;
                }
            });

            self.$okButton.on('click',function(e){
                var result = self.registValidation.validate();
                if(result.success) {
                    self.requestApply();
                } else {
                    result.validArray.forEach(function(obj,idx){
                        if(obj.key == "selectDate") {
                            var parent = self.$calendar.parent();
                            parent.find('.err-msg').text(obj.errmsg).show();
                            parent.find('.err-block').show();
                        };
                        if(obj.key == "selectTime") {
                            var parent = self.$timeTable.parent();
                            parent.find('.err-msg').text(obj.errmsg).show();
                            parent.find('.err-block').show();
                        };
                    });
                }
            });

            // 날짜 선택
            self.$calendar.on('dateselected', function(e,data) {
                var parent = self.$calendar.parent();
                parent.find('.err-block').hide();
                parent.find('span.desc').hide();
                parent.find('span.date').text(vcui.date.format(data,'yyyy.MM.dd')).show();
                self.requestTime();
            });

            //시간선택
            self.$timeTable.on('timeselected', function(e,data) {
                var parent = self.$timeTable.parent();
                parent.find('.err-block').hide();
                parent.find('span.desc').hide();
                parent.find('span.date').text(data.slice(0,2) + "시" + data.slice(-2) + "분").show();
            });

            //시간테이블 제거
            self.$timeTable.on('timeupdate', function(e,data) {
                var parent = self.$timeTable.parent();
                parent.find('.err-block').hide();
                parent.find('span.date').hide();
                parent.find('span.desc').show();
            });
        },

        requestTime: function() {
            var self = this;
            var url = self.$contWrap.data('timeUrl');
            var param = lgkorUI.getHiddenInputData();
            param.date = param.selectDate;
            param.selectDate = null;
            param.dateList = null;

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data;

                if(data.timeList) {
                    self.$timeTable.vcTimeTable('update', data.timeList);
                }
            });
        },

        requestApply: function() {
            var self = this;
            var url = self.$contWrap.data('requestUrl');
            var param = lgkorUI.getHiddenInputData();
            param.date = param.selectDate;
            param.selectDate = null;
            param.time = param.selectTime;
            param.selectTime = null;
            param.dateList = null;

            param.reason =  self.registValidation.getValues('inputReason');

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var url = self.$contWrap.data('okUrl');
                if(url) {
                    location.href = url;
                }
            });
        }
    }

    $(window).ready(function() {
        cancelCounsel.init();
    });
})();