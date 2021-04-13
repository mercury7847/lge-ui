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

                var loginUrl = $(this).data('loginUrl');
                if(loginUrl && loginUrl.length > 0){
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = loginUrl;
                    }};
                    lgkorUI.confirm(null, obj);
                } else{
                    var url = $(this).data("sendUrl");
                    var eventId = $(this).data("eventId");
                    self.setMyProductRegiste(url, eventId);
                }
            })
        },

        setMyProductRegiste: function(sendurl, eventId) {
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
                chk2: "Y",
                eventId: eventId
            }
            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(sendurl,sendData,function(result) {
                var data = result.data;
                if(lgkorUI.stringToBool(data.success) && data.sendUrl) {
                    location.href = data.sendUrl;
                }
            });
        }
    }

    $(document).ready(function() {
        MyProductEvent.init();
    });
})();