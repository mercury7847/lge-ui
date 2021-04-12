(function() {
    var MyProductEvent = {
        init: function() {
            var self = this;

            self.isClick = false;

            self.setting();
        },

        setting: function() {
            var self = this;
            
            $('.myProductRegister').on('click', function(e){
                e.preventDefault();

                self.setMyProductRegiste($(this).data("sendUrl"));
            })
        },

        setMyProductRegiste: function(sendurl) {
            var self = this;

            if(!self.isClick){
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
    
                self.isClick = true;

                var sendata = {
                    chk1: "Y",
                    chk2: "Y"
                }
                lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(sendurl, sendata, function(result){ 
                    if(result.status == "fail"){
                        lgkorUI.alert("", {
                            title: result.message
                        });

                        self.isClick = false;
                    } else{
                        if(lgkorUI.stringToBool(result.data.success)){
                            location.href = result.data.sendUrl;
                        } else{
                            if(result.data.alert){
                                lgkorUI.alert("", {
                                    title: result.data.alert.title
                                });
                            }

                            self.isClick = true;
                        }
                    }
    
                });
            }
        }
    }

    $(document).ready(function() {
        MyProductEvent.init();
    });
})();