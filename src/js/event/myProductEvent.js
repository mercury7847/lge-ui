(function() {
    var MyProductEvent = {
        init: function() {
            var self = this;

            self.setting();
        },

        setting: function() {
            var self = this;
            
            $('.myProductRegister').on('click', function(e){
                e.preventDefault();

                var url = $(this).data("sendUrl");
                if(url) {
                    self.setMyProductRegiste(url);
                }
            })
        },

        setMyProductRegiste: function(sendurl) {
            var self = this;

            var chk = $('#chk1-1').prop('checked');
            if(!chk){
                lgkorUI.alert("", {
                    title: "개인정보 수집 이용에 동의해 주세요."
                });
                return;
            }

            chk = $('#chk2-1').prop('checked');
            if(!chk){
                lgkorUI.alert("", {
                    title: "개인정보 처리 위탁에 동의해 주세요."
                });
                return;
            }

            var sendData = {
                chk1: "Y",
                chk2: "Y"
            }
            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(sendurl,sendData,function(result) {
                var data = result.data;
                if(lgkorUI.stringToBool(data.success) && data.sendUrl) {
                    location.href = result.data.sendUrl;
                }
            });
        }
    }

    $(document).ready(function() {
        MyProductEvent.init();
    });
})();