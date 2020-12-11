$(window).ready(function(){
    if(!document.querySelector('.KRP0043')) return false;

    $('.KRP0043').buildCommonUI();

    var KRP0043 = {
        init: function() {

            this.$el = $('.KRP0043');

            this.$btnSearch = this.$el.find('.btn-search');
            this.$input = this.$el.find('input[type="text"]');

            this.bindEvent();
        },
        searchModel: function(val, $box) {
            var $activeItem = $box.find('li:contains("' + val + '")');

            if ($activeItem.length > 0) {
                $activeItem.show();
                $box.find('li').not($activeItem).hide();
                $box.find('.list-wrap').show();
                $box.find('.no-data').hide();
            } else {
                $box.find('.list-wrap').hide();
                $box.find('.no-data').show();
            }
        },
        bindEvent: function() {
            var _self = this;

            _self.$input.on('keydown', function(e) {
                var $box = $(this).closest('.product-area'),
                    param = $(this).val().toUpperCase();
                
                if (e.keyCode == 13) {
                    _self.searchModel(param, $box);
                }
            });

            _self.$btnSearch.on('click', function() {
                var $box = $(this).closest('.product-area'),
                    param = _self.$input.val().toUpperCase();
                    

                _self.searchModel(param, $box);    
            });
        }
    }

    KRP0043.init(this);
});