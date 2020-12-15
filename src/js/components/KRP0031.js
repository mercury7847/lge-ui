$(window).ready(function(){
    if(!document.querySelector('.KRP0031')) return false;

    $('.KRP0031').buildCommonUI();
    var register = {
        searchKeyword: {
            msgTarget: '.err-block',
            minLength: 2
        }
    };
    var validation;

    var KRP0031 = {
        init: function() {
            var self = this;

            self.$el = $('.KRP0031');
            self.$form = self.$el.find('#searchForm');
            self.$keyword = self.$form.find('input[type="text"]');
            self.$button = self.$form.find('.btn-search');

            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.Validation('#searchForm',{register:register});
                lgkorUI.searchModelName();
                self.bindEvent();
            });
        },
        searchModel: function() {
            var self = this

            var result = validation.validate();
            if (result.success) {
                self.$form.submit();
            } 
        },
        bindEvent: function() {
            var self = this;

            self.$keyword.on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.searchModel();
                }
            });

            self.$button.on('click', function() {
                self.searchModel();
            });
        }
    }

    KRP0031.init();
});