;(function(){
    var LOGIN_CONFIRM_URL;
    var SUPPLY_CONFIRM_URL;

    var emailInquiryValidation;
    var phoneInquiryValidation;

    function init(){    
        vcui.require(['ui/validation', 'ui/modal', 'ui/tab'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        LOGIN_CONFIRM_URL = $('.contents.non-members').data('confirmUrl');
        SUPPLY_CONFIRM_URL = $('.contents.non-members').data('disposableConfirmUrl');

        var register;

        register = {
            orderNumber:{
                required: true,
                errorMsg: "주문번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userEmail:{
                required: true,
                errorMsg: "이메일 주소를 다시 확인해주세요.",
                msgTarget: '.err-block',
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            userName: {
                required: true,
                errorMsg: "주문하신 분의 이름을 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        emailInquiryValidation = new vcui.ui.Validation('.ui_email_inquiry',{register:register});

        register = {
            orderNumber:{
                required: true,
                errorMsg: "주문번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userPhone:{
                required: true,
                errorMsg: "휴대폰 번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userName: {
                required: true,
                errorMsg: "주문하신 분의 이름을 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        phoneInquiryValidation = new vcui.ui.Validation('.ui_phone_inquiry',{register:register});
    }

    function bindEvents(){
        $('.non-members').on('click', '.confirm-btn', function(e){
            e.preventDefault();

            var result, type;
            var wrapper = $(this).closest('.non-members-login-tabs');
            if(wrapper.hasClass('ui_email_inquiry')){
                type = "EMAIL";
                result = emailInquiryValidation.validate();
            } else{
                type = "PHONE"
                result = phoneInquiryValidation.validate();
            }
            if(result.success) sendConfirm(type)
        });

        $('.ui_tab').vcTab()
        .on('tabchange', function(e, data){
            $('.err-block').hide();
        });
    }

    function sendConfirm(type){
        lgkorUI.showLoading();

        var emailValues = emailInquiryValidation.getValues();
        var phoneValues = phoneInquiryValidation.getValues();

        var sendata = {
            sendInquiryType: type,
            sendOrderNumber: type == "EMAIL" ? emailValues.orderNumber : phoneValues.orderNumber,
            sendUserName: type == "EMAIL" ? emailValues.userName : phoneValues.userName,
            sendUserEmail: emailValues.userEmail,
            snedPhoneNumber: phoneValues.userPhone
        }

        var firstSpeling = sendata.sendOrderNumber.substr(0,1).toUpperCase(); 
        var ajaxUrl = firstSpeling == "N" ? SUPPLY_CONFIRM_URL : LOGIN_CONFIRM_URL;

        console.log("sendata:",sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ajaxUrl, sendata, function(result){
            if(result.data.success == "Y"){
                lgkorUI.setHiddenInputData(sendata);
                console.log("### lgkorUI.getHiddenInputData() ###", lgkorUI.getHiddenInputData());

                $('#noneMemberForm').attr('action', result.data.sendUrl);

                setTimeout(function(){
                    $('#noneMemberForm').submit();  
                }, 100);
            } else{
                if(result.data.alert.isCustom){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                } else{
                    $('#popup-nodata').vcModal();
                }
            }
            lgkorUI.hideLoading();
        });
    }

    $(window).load(function(){
        init();
    })
})();