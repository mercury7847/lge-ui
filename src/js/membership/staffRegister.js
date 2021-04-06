;(function(){

    var joinValidation;

    var isJoin = false;

    function init(){
        vcui.require(['ui/validation'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        var register = {
            agreeChecker:{
                required: true,
                errorMsg: "보완유지 확인서에 동의해 주세요."
            },
            groupName: {
                required: true,
                errorMsg: "소속을 선택해 주세요."
            },
            userEmail: {
                required: true,
                errorMsg: "이메일을 입력해 주세요."
            },
            userName: {
                required: true,
                errorMsg: "성명을 입력해 주세요."
            }
        }
        joinValidation = new vcui.ui.Validation('.show1',{register:register});
    }

    function bindEvents(){
        $('.show1 .join-btn').on('click', function(e){
            e.preventDefault();

            if(!isJoin){
                var result = joinValidation.validate();
                console.log(result)
                if(!result.success){
                    lgkorUI.alert("", {
                        title: result.validArray[0].errmsg,
                        ok: function(){
                            setTimeout(function(){
                                $('.show1').find('input[name='+result.validArray[0].key+']').focus();
                            }, 300);
                        }
                    })
                } else{
                    
                    isJoin = true;

                    var sendurl = $('.show1').data('joinUrl');
                    var sendata = joinValidation.getValues();
                    console.log(sendata);
                    lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(sendurl, sendata);

                    $('.show2').show();
                    $('html, body').animate({scrollTop: $('.show2').offset().top}, 220)
                }
            }
        })
    }

    $(document).ready(function(){
        init();
    })
})();