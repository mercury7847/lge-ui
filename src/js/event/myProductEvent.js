(function() {
    var MyProductEvent = {
        init: function() {
            var self = this;
            //vcui.require(['ui/pagination','helper/textMasking'], function () {
                //self.txtMasking = new vcui.helper.TextMasking();
                self.setting();
                self.bindEvent();
                //self.requestData(1);
            //});
        },

        setting: function() {
            var self = this;
            self.$contents = $('.contents.event');
        },

        bindEvent: function() {

        }
    }

    $(document).ready(function() {
        MyProductEvent.init();
    });
})();