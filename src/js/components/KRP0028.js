(function() {
    $(window).ready(function() {
        var KRP0028 = {
            init: function() {
                self.$KRP0028 = $('.KRP0028').first();
                self.$tab = self.$KRP0028.find('div.ui_tab');
                self.$list = self.$KRP0028.find('ul.box-list-inner');

                var _self = this;
                _self.bindEvents();
            },

            bindEvents: function() {
                var _self = this;
                self.$KRP0028.find('.ui_selectbox').on('change', function(e){
                    console.log('select',$(this),$(this).vcSelectbox('value'));
                    _self.requestData();
                });
            },

            requestData: function() {
            }
        };

        KRP0028.init();
    });
})();