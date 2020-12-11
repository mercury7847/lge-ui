$(window).ready(function(){
    if(!document.querySelector('.KRP0042')) return false;

    $('.KRP0042').buildCommonUI();

    var KRP0042 = {
        init: function() {

            this.$el = $('.KRP0042');
            this.$form = this.$el.find('#searchForm');
            this.$keyword = this.$form.find('input[type="text"]');
            this.$button = this.$form.find('.btn-search');
            this.$error = this.$form.find('.err-msg');

            this.bindEvent();
        },
        searchModel: function(param) {
            var _self = this,
                length = (param || '').length;

            if (length > 1) {
                _self.$keyword.closest('.input-wrap').removeClass('error');
                _self.$error.hide();
                
                _self.$form.submit();
            } else {
                _self.$keyword.closest('.input-wrap').addClass('error');
                _self.$error.text('두 글자 이상 검색 키워드를 입력하시기 바랍니다.');
                _self.$error.show();
            }
        },
        bindEvent: function() {
            var _self = this;

            _self.$keyword.on('keydown', function(e) {
                var param = $(this).val();
                
                if (e.keyCode == 13) {
                    e.preventDefault();
                    _self.searchModel(param);
                }
            });

            _self.$button.on('click', function() {
                var param = _self.$keyword.val();

                _self.searchModel(param);
            });
        }
    }

    KRP0042.init();
});