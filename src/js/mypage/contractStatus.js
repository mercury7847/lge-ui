(function(){
    var MODE_USER = "USER";
    var MODE_PAYMENT = "PAYMENT";
    var METHOD_CARD = "CARD";
    var METHOD_BANK = "BANK";

    var CONTRACT_INFO;
    var INFO_MODIFY_CONFIRM;
    var INFO_MODIFY_SAVE;
    var PAYMENT_METHOD_CONFIRM;
    var ARS_AGREE_URL;

    var mypage;
    var userInfoBlock, userModifyBlock;
    var paymentInfoBlock, paymentModifyBlock;

    var userInfo = {};
    var cardInfo = {};
    var bankInfo = {};
    var paymentModeIndex;

    var paymentInfo = {};

    var userInfoValidation;

    var cardValidation, bankValidation;

    var cardIssueValidation;

    var txtMasking;

    function init(){
        console.log("contractStatus start!!");

        CONTRACT_INFO = $('.contents.mypage').data('contractInfoUrl');
        INFO_MODIFY_CONFIRM = $('.contents.mypage').data('modifyConfirmUrl');
        INFO_MODIFY_SAVE = $('.contents.mypage').data('modifySaveUrl');
        PAYMENT_METHOD_CONFIRM = $('.contents.mypage').data('paymentMethodUrl');
        ARS_AGREE_URL = $('.contents.mypage').data('arsAgreeUrl');
    
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'ui/tab', 'helper/textMasking'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        mypage = $('.contents.mypage');

        userInfoBlock = mypage.find(".section-wrap .sects.user.viewer");
        userModifyBlock = mypage.find(".section-wrap .sects.user.modify");

        paymentInfoBlock = mypage.find(".section-wrap .sects.payment.viewer");
        paymentModifyBlock = mypage.find(".section-wrap .sects.payment.modify");

        var register = {
            userTelephone: {
                required: true,
                errorMsg: "전화번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userEmail:{
                required: true,
                errorMsg: "이메일 주소를 다시 확인해주세요.",
                msgTarget: '.err-block',
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            actualUserName: {
                required: true,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block'
            },
            actualUserPhone: {
                required: true,
                errorMsg: "휴대폰 번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            actualUserTelephone: {
                required: true,
                errorMsg: "전화번호를 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        userInfoValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.user.modify',{register:register});
        userInfo = userInfoValidation.getAllValues();

        register = {
            paymentCard:{
                required: true,
                errorMsg: "신용카드의 카드사를 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardNumber: {
                required: true,
                errorMsg: "신용카드의 카드번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardPeriod: {
                required: true,
                errorMsg: "신용카드의 유효기간을 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        cardValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.payment.modify .by-card',{register:register});
        cardInfo = cardValidation.getAllValues();

        register = {
            paymentBank: {
                required: true,
                errorMsg: "계좌이체할 은행명을 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentBankNumber: {
                required: true,
                errorMsg: "계좌번호를 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        bankValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.payment.modify .by-bank',{register:register});
        bankInfo = bankValidation.getAllValues();

        paymentModeIndex = $('.mypage .section-wrap .sects.payment.modify .ui_tab ul li[class=on]').index();

        cardIssueValidation = new vcui.ui.Validation($('#popup-cardIssue'));

        txtMasking = new vcui.helper.TextMasking();
    }

    function bindEvents(){
        mypage.find(".section-wrap .sects.viewer").on('click', '.tit-wrap button', function(e){
            e.preventDefault();

            sendChangeConfirm(this)
        });
        
        userModifyBlock.on('click', '.cancel-btn', function(e){
            e.preventDefault();

            saveUserInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            saveUserInfoOk()
        });

        paymentModifyBlock.on('click', '.paymentCardConfirm, .paymentBankConfirm', function(e){
            e.preventDefault();

            paymentMethodAbled(this);
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();

            setArsAgreeConfirm();
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal();
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal();
        }).on('click', '.cancel-btn', function(e){
            e.preventDefault();

            savePaymentInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            savePaymentInfoOk();
        });

        $('.mypage').on('click', '.contract-btn', function(e){
            e.preventDefault();
            $('#popup-contractIssue').vcModal();
        }).on('click', '.requestCard-btn', function(e){
            e.preventDefault();
            $('#popup-cardIssue').vcModal();
        }).on('click', '.paymenyList-btn', function(e){
            e.preventDefault();

            console.log("납부내역 조회");
        }).on('click', '.cancelConsult-btn', function(e){
            e.preventDefault();

            console.log("해지상담 신청");
        });

        $('#popup-cardIssue').on('click', '.requestIssue-btn', function(e){
            e.preventDefault();

            requestCardIssue();
        });

        $('#popup-selfClearing').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', chk);

            if(chk) $('#popup-selfClearing').vcModal('close');
        });

        $('select[name=contractInfo]').on('change', function(e, data){
            var info = $(this).find('option').eq(data.selectedIndex).val().split("|");
            changeContractInfo(info);
        });
    }

    //접보변경 확인...
    function sendChangeConfirm(item){

        var alertitle, alertmsg, sendata;
        var section = $(item).closest('.sects');
        if(section.hasClass('user')){
            alertitle = "계약자 정보 변경";
            alertmsg = "계약자 및 실사용자 정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까 ?";
            sendata = {confirmType: MODE_USER}
        } else{
            alertitle = "납부정보 변경";
            alertmsg = "납부정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까 ?";
            sendata = {confirmType: MODE_PAYMENT}
        }

        lgkorUI.confirm(alertmsg, {
            title: alertitle,
            cancelBtnName: "취소",
            okBtnName: "본인인증",
            ok: function(){
                lgkorUI.requestAjaxData(INFO_MODIFY_CONFIRM, sendata, function(result){
                    if(result.data.success == "Y"){
                        if(sendata.confirmType == MODE_USER){
                            userInfoBlock.hide();
                            userModifyBlock.show();
                        } else{
                            paymentInfoBlock.hide();
                            paymentModifyBlock.show();

                            setHiddenData('paymentMethodConfirm', "N");
                            setHiddenData('arsAgree', "N");
                        }
                    } else{
                        console.log("Fail !!!");
                    }
                });
            }
        });
    }

    //사용자 정보변경 취소...
    function saveUserInfoCancel(){
        userInfoValidation.setValues(userInfo);
        userModifyBlock.find('.err-block').hide();
        userModifyBlock.hide();
        userInfoBlock.show();
    }
    //사용자 정보변경 저장...
    function saveUserInfoOk(){
        var sendata = userInfoValidation.getAllValues();
        sendata.confirmType = MODE_USER;
        console.log("saveUserInfo : [sendata] ", sendata);
        lgkorUI.requestAjaxData(INFO_MODIFY_SAVE, sendata, function(result){
            if(result.data.success == "Y"){
                
            } else{
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            }
        });
    }

    //납부카드/계좌 확인...
    function paymentMethodAbled(item){
        var sendata;
        var mode = $(item).hasClass('paymentCardConfirm') ? METHOD_CARD : METHOD_BANK;
        var result = mode == METHOD_CARD ? cardValidation.validate() : bankValidation.validate();
        if(!result.success) return false;

        paymentInfo = {};

        if($(item).hasClass('paymentCardConfirm')){
            sendata = cardValidation.getValues();
            sendata.confirmType = METHOD_CARD;
        } else{
            sendata = bankValidation.getValues();
            sendata.confirmType = METHOD_BANK;
        }
        console.log("paymentMethodAbled(); sendata :", sendata);
        lgkorUI.requestAjaxData(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.success == "Y"){
                paymentInfo = sendata.confirmType == METHOD_CARD ? cardValidation.getAllValues() : bankValidation.getAllValues();
                paymentInfo.confirmType = sendata.confirmType;
            }

            setHiddenData('paymentMethodConfirm', result.data.success);
        });
    }

    //ARS출금동의 신청...
    function setArsAgreeConfirm(){
        lgkorUI.requestAjaxData(ARS_AGREE_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            setHiddenData('arsAgree', result.data.success);
        });
    }

    //납부 정보변경 취소...
    function savePaymentInfoCancel(){
        cardValidation.setValues(cardInfo);
        $('.ui_card_number').vcFormatter('update');

        bankValidation.setValues(bankInfo);
        setHiddenData('paymentMethodConfirm', "N");
        setHiddenData('arsAgree', "N");
        paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', false);
        paymentModifyBlock.find('input[name=pointUseAgree]').prop('checked', false);

        $('.mypage .section-wrap .sects.payment.modify .ui_tab').vcTab('select', paymentModeIndex);

        paymentInfoBlock.show();
        paymentModifyBlock.hide();
    }

    //납부 정보변경 저장...
    function savePaymentInfoOk(){
        var payments = paymentInfoValidation();
        if(payments.result){
            console.log("savePaymentInfo : [sendata] ", paymentInfo);
            lgkorUI.requestAjaxData(INFO_MODIFY_SAVE, paymentInfo, function(result){
                if(result.data.success == "Y"){
                    
                } else{
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }
            });
        } else{
            lgkorUI.alert("", {
                title: payments.title
            });
        }
    }

    function paymentInfoValidation(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify .ui_tab ul li[class=on]').index();
        var paymentMethodAbled = getHiddenData("paymentMethodConfirm");
        if(paymentMethodAbled  == "N"){
            return{
                result: false,
                title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
            }
        }
        
        var chk = 0;
        var values = paymentMethodIndex ? bankValidation.getAllValues() : cardValidation.getAllValues();
        for(var key in values){
            console.log("paymentInfo["+key+"]:", paymentInfo[key])
            if(values[key] == paymentInfo[key]) chk++;
        }
        
        if(chk != Object.keys(values).length){
            setHiddenData("paymentMethodConfirm", "N");
            return{
                result: false,
                title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
            }
        }

        if(getHiddenData("arsAgree") == "N"){
            return{
                result: false,
                title: "자동결제를 위해 ARS 출금동의 신청해주세요."
            }
        }

        if(!paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked')){
            return{
                result: false,
                title: "자동결제를 위해 정기결제 신청을 동의해주세요."
            }
        }

        return{
            result: true
        }
    }

    function requestCardIssue(){
        var result = cardIssueValidation.validate();
        if(!result.success){
            lgkorUI.alert("", {
                title: result.validArray[0].errmsg
            });

            return;
        }
    }

    function changeFieldValue(gname, data){
        for(var key in data){
            $("."+gname).find('ul li[class=' + key + '] dd').empty().html(data[key]);
        }
    }

    function setContractInfo(data){
        var info;

        info = getMaskingData(data.userInfo.user);
        changeFieldValue('user-info', info);

        info = getMaskingData(data.userInfo.actualUser);
        changeFieldValue('actual-info', info);

        data.contractInfo.contractID = "<span>" + data.contractInfo.contractID + "</span><a href='#n' class='btn-link cancelConsult-btn'>해지상담 신청</a>";
        changeFieldValue('contract-info', data.contractInfo);

        info = {
            monthlyPrice: "<span>" + data.paymentInfo.monthlyPrice + "</span><a href='#n' class='btn-link paymenyList-btn'>납부내역 조회</a>",
            withdrawDate: data.paymentInfo.withdrawDate
        }
        if(data.paymentInfo.paymentMethod == METHOD_CARD){
            paymentModeIndex = 0;

            info.paymentMethod = "신용카드"
            info.methodName =  "<span>" + data.paymentInfo.cardInfo.cardComName + "</span><a href='#n' class='btn-link requestCard-btn'>제휴카드 신청</a>";
            info.methodNumber = txtMasking.card(data.paymentInfo.cardInfo.cardNumber);
        } else{
            paymentModeIndex = 1;

            info.paymentMethod = "계좌이체"
            info.methodName =  data.paymentInfo.bankInfo.bankName;
            info.methodNumber = txtMasking.substr(data.paymentInfo.bankInfo.bankNumber, 4);
        }
        changeFieldValue('payment-info', info);

        changeFieldValue('manager-info', data.managerInfo);
              
        userInfo = {
            userName: data.userInfo.user.name,
            userPhone: data.userInfo.user.phoneNumber,
            userTelephone: data.userInfo.user.telephoneNumber,
            userEmail: data.userInfo.user.email,
            userAdress: data.userInfo.user.adress,
            actualUserName: data.userInfo.actualUser.name,
            actualUserPhone: data.userInfo.actualUser.phoneNumber,
            actualUserTelephone: data.userInfo.actualUser.telephoneNumber,
            actualUserAdress: data.userInfo.actualUser.adress
        }
        userInfoValidation.setValues(userInfo);

        cardInfo = {
            paymentCard: data.paymentInfo.cardInfo.cardComValue,
            paymentCardNumber: data.paymentInfo.cardInfo.cardNumber,
            paymentCardPeriod: data.paymentInfo.cardInfo.cardPeriod
        }
        cardValidation.setValues(cardInfo);

        bankInfo = {
            paymentBank: data.paymentInfo.bankInfo.bankValue,
            paymentBankNumber: data.paymentInfo.bankInfo.bankNumber,
            paymentUserName: data.paymentInfo.bankInfo.bankUser
        }
        bankValidation.setValues(cardInfo);

        $('.mypage .section-wrap .sects.payment.modify .ui_tab').vcTab('select', paymentModeIndex);
    }

    function getMaskingData(data){
        var newdata = {};
        for(var key in data){
            if(key == "name") newdata[key] = txtMasking.name(data[key]);
            else if(key == "email") newdata[key] = txtMasking.email(data[key]);
            else if(key == "adress") newdata[key] = txtMasking.substr(data[key], 20);
            else newdata[key] = txtMasking.phone(data[key]);
        }

        return newdata;
    }

    function changeContractInfo(info){
        lgkorUI.showLoading();

        saveUserInfoCancel();
        savePaymentInfoCancel();

        var sendata = {
            modelID: info[0],
            contractID: info[1]
        }
        lgkorUI.requestAjaxData(CONTRACT_INFO, sendata, function(result){
            setContractInfo(result.data);

            lgkorUI.hideLoading();
        });
    }

    function setHiddenData(iptname, value){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        ipt.val(value);
    }
    function getHiddenData(iptname){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        return ipt.val();
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();