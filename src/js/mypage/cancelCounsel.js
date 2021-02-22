(function(){
    var cancelCounsel = {         
        init: function() {
            var self = this;
            vcui.require(['ui/calendarTable'], function () {
                self.setting();
                self.bindEvents();
                self.$calendar.vcCalendarTable();
                self.$calendar.vcCalendarTable('update', ["20210222","20210223","20210224","20210225","20210226","20210227","20210302","20210303","20210304","20210305","20210306"]);
            });
        },

        setting: function() {
            var self = this;
            self.$calendar = $('div.box-wrap.calendar-wrap.test2');
        },

        bindEvents: function() {
        }
    }

    $(window).ready(function() {
        cancelCounsel.init();
    });
})();