(function() {
    var MyProductEvent = {
        init: function() {
            var self = this;

            self.setting();
            self.bindEvent();
        },

        setting: function() {
            var self = this;
            
            $('.myProductRegister').on('click', function(e){
                e.preventDefault();

                self.setMyProductRegiste();
            })
        },

        setMyProductRegiste: function() {
            var self = this;

            var chk = $('.agreechk-1').prop('checked');
            if(!chk){
                lgkorUI.alert("", {
                    title: "개인정보 수집 이용에 동의해 주세요."
                });
                return;
            }

            chk = $('.agreechk-2').prop('checked');
            if(!chk){
                lgkorUI.alert("", {
                    title: "개인정보 처리 위탁에 동의해 주세요."
                });
                return;
            }
        }
    }

    $(document).ready(function() {
        MyProductEvent.init();
    });
})();