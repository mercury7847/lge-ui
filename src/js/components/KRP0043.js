$(window).ready(function(){
    if(!document.querySelector('.KRP0043')) return false;

    $('.KRP0043').buildCommonUI();

    var KRP0043 = {
        init: function(_this) {
            
            this.el = _this;
            this.$el = $(_this);
            this.$noData = this.$el.find('.no-data');
            this.$btnSearch = this.$el.find('.btn-search');
            this.$input = this.$el.find('input[type="text"]');
            this.$list = this.$el.find('.product-list');

            this.bindEvent();
        },
        bindEvent: function() {
            var _self = this;

            _self.$btnSearch.on('click', function() {
                var val = _self.$input.val().toUpperCase(),
                    $activeItem = _self.$list.find('li:contains("' + val + '")');

                if ($activeItem.length > 0) {
                    $activeItem.show();
                    _self.$list.find('li').not($activeItem).hide();
                    _self.$list.find('>div').show();
                    _self.$noData.hide();
                } else {
                    _self.$list.find('>div').hide();
                    _self.$noData.show();
                }
            });
        }
    }

    $('.KRP0043').each(function() {
        KRP0043.init(this);
    });
});