(function(){
    var MODE_USER = "USER";
    var MODE_PAYMENT = "PAYMENT";
    var METHOD_CARD = "CARD";
    var METHOD_BANK = "BANK";

    var CONTRACT_INFO;
    var INFO_MODIFY_CONFIRM;
    var INFO_MODIFY_SAVE;
    var PAYMENT_METHOD_CONFIRM;
    var PAYMENT_SAVE_URL;
    var ARS_AGREE_URL;
    var ARS_AGREE_CHECK_URL;
    var REQUEST_CONTRACT_URL;
    var MEMPOINT_DEDUCT_URL;
    var REQUSET_CARD_URL;

    var mypage;
    var userInfoBlock, userModifyBlock;
    var paymentInfoBlock, paymentModifyBlock;

    var userInfo = {};
    var cardInfo = {};
    var bankInfo = {};
    var paymentMode;

    var sendPaymentMethod;

    var paymentInfo = {};

    var userInfoValidation;

    var cardValidation, bankValidation;

    var txtMasking;

    var ajaxMethod = "POST";

    var requestPartnerCardYn = "";

    var CERTI_ID, BATCH_KEY, CTI_REQUEST_KEY, associCardType;

    var arsAgree = 'N';
    var arsAgreeConfirm = 'N';
    var isClickedarsAgreeConfirmBtn = false;
    var isClickedarsAgreeConfirmCheckBtn = false;

    function init(){
        CONTRACT_INFO = $('.contents.mypage').data('contractInfoUrl');
        INFO_MODIFY_CONFIRM = $('.contents.mypage').data('modifyConfirmUrl');
        INFO_MODIFY_SAVE = $('.contents.mypage').data('modifySaveUrl');
        PAYMENT_METHOD_CONFIRM = $('.contents.mypage').data('paymentMethodUrl');
        PAYMENT_SAVE_URL = $('.contents.mypage').data('paymentSaveUrl');
        ARS_AGREE_URL = $('.contents.mypage').data('arsAgreeUrl');
        ARS_AGREE_CHECK_URL = $('.contents.mypage').data('arsAgreeCheckUrl');
        REQUEST_CONTRACT_URL = $('.contents.mypage').data('requestContractUrl');
        MEMPOINT_DEDUCT_URL = $('.contents.mypage').data('mempointDeductUrl');
        REQUSET_CARD_URL = $('.contents.mypage').data('requestCardUrl');
    
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'ui/tab', 'helper/textMasking'], function () {             
            setting();
            bindEvents();

            var firstData = $('select[name=contractInfo]').find('option:nth-child(1)').val();
            if(firstData) changeContractInfo();
            else{
                if(requestPartnerCardYn == "Y"){
                    var nodata = mypage.find('.no-data').text();
                    mypage.find('.no-data').html("<p>" + nodata + "<br>케어솔루션 계약시 제휴카드를 신청하시면 더욱 편리한 이용이 가능합니다.</p>");
                }
                requestPartnerCardYn = ""
            }
            /* BTOCSITE-98 add */
            if (vcui.detect.isIOS){
                $('.arsAgreeRequestCheck').attr('disabled', true).show();
                $('#iostxt').show();
            }

   
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
                pattern: /^[0-9]+$/,
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
                pattern: /^[0-9]+$/,
                errorMsg: "계좌번호를 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        bankValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.payment.modify .by-bank',{register:register});
        bankInfo = bankValidation.getAllValues();

        txtMasking = new vcui.helper.TextMasking();

        requestPartnerCardYn = getHiddenData("requestPartnerCardYn");
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

            setPaymentMethodAbled(this);
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();

            setArsAgreeConfirm();
        }).on('click', '.arsAgreeRequestCheck', function(e){
            e.preventDefault();
            arsAgreeConfirmCheck();
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal({opener:$(this)});
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal({opener:$(this)});
        }).on('click', '.cancel-btn', function(e){
            e.preventDefault();

            savePaymentInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            savePaymentInfoOk();
        });

        $('.mypage').on('click', '.contract-btn', function(e){
            e.preventDefault();
            
            if(userInfo.userEmail){
                $('#popup-contractIssue').find('.pop-conts .gray-txt-box p em').text(userInfo.userEmail);
    
                $('#popup-contractIssue').vcModal({opener:$(this)});
            } else{
                lgkorUI.alert("", {
                    title: "계약서를 받을 이메일 정보가 없습니다.<br>계약자 정보를 수정해주세요.",
                    ok: function(){
                        var movetop = $('.sects.user.viewer').offset().top - 80;
                        $('html, body').animate({scrollTop:movetop}, 120)
                    }
                });
            }
        }).on('click', '.requestCard-btn', function(e){
            e.preventDefault();

            setRequestCard();
        })
        // .on('click', '.paymenyList-btn', function(e){
        //     e.preventDefault();

        //     console.log("납부내역 조회");
        // }).on('click', '.cancelConsult-btn', function(e){
        //     e.preventDefault();

        //     console.log("해지상담 신청");
        // });

        $('.mempoint-btn').on('click', function(e){
            e.preventDefault();

            showMempointModify();
        });
        $('.mempoint-info').on('click', '.cancel-btn', function(e){
            e.preventDefault();

            cancelMempointModify();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            okMempointModify();
        }).on('change', 'input[name=point-cancel]', function(e){
            e.preventDefault();
            
            $(this).prop('checked', true);
        });

        $('#popup-contractIssue').on('click', '.btn-group button.pink', function(e){
            e.preventDefault();

            sendRequestContract();
        })

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

        $('select[name="contractInfo"]').on('change', function(e){
            changeContractInfo();
        });
    }

    //계약서 발급 신청
    function sendRequestContract(){
        var sendata = {
            userEmail:userInfo.userEmail,
            contractID: $('select[name=contractInfo]').find('option:selected').val()
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(REQUEST_CONTRACT_URL, sendata, function(result){
            if(result.data.success == "Y"){
                $('#popup-contractIssue').vcModal('close');

                if(result.data.alert && result.data.alert.title){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }
            } else{
                if(result.data.alert && result.data.alert.title){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }
            }
        }, ajaxMethod);
    }

    //정보변경 확인...
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
        sendata["contractID"] = $('select[name=contractInfo]').find('option:selected').val();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(INFO_MODIFY_CONFIRM, sendata, function(result){
            lgkorUI.confirm(alertmsg, {
                title: alertitle,
                cancelBtnName: "취소",
                okBtnName: "본인인증",
                ok: function(){
                    void(window.open("", "popupChk", "width=390, height=640, scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));   
                    document.form_chk.action = result.data.niceAntionUrl;
                    document.form_chk.m.value = result.data.m;
                    document.form_chk.EncodeData.value = result.data.sEncData;
                    document.form_chk.auth_type.value = result.data.auth_type;
                    document.form_chk.param_r1.value = result.data.param_r1;
                    document.form_chk.param_r2.value = result.data.param_r2;
                    document.form_chk.param_r3.value = result.data.param_r3;
                    document.form_chk.target = "popupChk";
                    document.form_chk.submit();

                    // editBasicInfomation();
                    //editPaymentInfomation();
                }
            });
        }, ajaxMethod);
    }

    //나이스 콜백 -정보변경
    function editBasicInfomation(){
        userInfoBlock.hide();
        userModifyBlock.show();
    }
    //나이스 콜백 -납부정보변경
    function editPaymentInfomation(){
        paymentInfoBlock.hide();
        paymentModifyBlock.show();
        paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', false);

        setHiddenData('paymentMethodConfirm', "N");
        setHiddenData('arsAgree', "N");
    }
    //나이스 콜백 -인증실패
    function fnNiceFail(msg){
        if(msg){
            lgkorUI.alert("", {
                title: msg
            })
        }
    }
    window.editBasicInfomation = editBasicInfomation;
    window.editPaymentInfomation = editPaymentInfomation;
    window.fnNiceFail = fnNiceFail;

    //사용자 정보변경 취소...
    function saveUserInfoCancel(){
        userInfoValidation.setValues(userInfo);
        userModifyBlock.find('.err-block').hide();
        userModifyBlock.hide();
        userInfoBlock.show();
    }
    //사용자 정보변경 저장...
    function saveUserInfoOk(){
        var result = userInfoValidation.validate();
        if(!result.success) return;

        lgkorUI.showLoading();

        var sendata = userInfoValidation.getAllValues();
        sendata.confirmType = MODE_USER;
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val();
        lgkorUI.requestAjaxData(INFO_MODIFY_SAVE, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                changeContractInfo();
            }

            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    //제휴카드 신청
    function setRequestCard(){
        if(associCardType){
            $(window).trigger("toastshow", "고객님은 이미 제휴카드를 이용중이십니다");
        } else{
            var contractInfoText = $('select[name=contractInfo]').find('option:selected').text();
            $('#popup-cardIssue').find('input[name=reqcard-contractInfo]').val(contractInfoText);
            $('#popup-cardIssue').vcModal({opener:$('.mypage .requestCard-btn')});
        }
    }

    //제휴카드 
    function setIssueCardList(data){
        var select = $('#popup-cardIssue').find('select[name=concertedCard]');
        select.empty();
        select.append('<option value="" class="placeholder">선택</option>');
        for(var idx in data){
            var opt = "<option value='" + data[idx].cardValue + "'>" + data[idx].cardName + "</option>";
            select.append(opt);
        }
        select.vcSelectbox('update');
    }

    //제휴카드 발급신청
    function requestCardIssue(){
        var val = $('#popup-cardIssue').find('input[name=cardIssueAllchker_1]').prop('checked');
        if(!val){
            lgkorUI.alert("", {
                title: "개인정보 수집/이용 동의해주세요."
            });
            return;
        }

        val = $('#popup-cardIssue').find('input[name=cardIssueAllchker_2]').prop('checked');
        if(!val){
            lgkorUI.alert("", {
                title: "개인정보 제3자 제공 동의 해주세요."
            });
            return;
        }

        val = $('#popup-cardIssue').find('select[name=concertedCard]').find('option:selected').val();
        if(!val){
            lgkorUI.alert("", {
                title: "제휴카드를 선택하세요."
            });
            return;
        }

        lgkorUI.showLoading();

        var sendata = {
            contractID: $('select[name=contractInfo]').find('option:selected').val(),
            selectCardValue: val
        }
        lgkorUI.requestAjaxData(REQUSET_CARD_URL, sendata, function(result){
            $('#popup-cardIssue').vcModal('close');

            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    //납부정보 input 밸리데이션...
    function paymentFieldValidation(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var result = paymentMethodIndex ? bankValidation.validate() : cardValidation.validate();
        
        return result.success;
    }
    //납부정보 입력 데이터 비교...
    function compareInputData(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var values = paymentMethodIndex ? bankValidation.getAllValues() : cardValidation.getAllValues();
        var chk = true;
        for(var str in values){
            if(paymentInfo[str] !== values[str]){
                chk = false;

                break;
            }
        }

        return chk;
    }
    //납부정보 확인 유무...
    function paymentConfirmYN(){
        var paymentMethodAbled = getHiddenData("paymentMethodConfirm");
        if(paymentMethodAbled == "N"){
            paymentErrorAlert();
            return false;
        }

        return true;
    }
    //납부 확인 오류창...
    function paymentErrorAlert(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        lgkorUI.alert("",{
            title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
        });
        setHiddenData('arsAgree', "N");
    }
    //납부카드/계좌 확인...
    function setPaymentMethodAbled(item){
        var chk = paymentFieldValidation();
        if(!chk) return false;

        paymentInfo = {};

        CERTI_ID = BATCH_KEY = "";

        var sendata;
        if($(item).hasClass('paymentCardConfirm')){
            sendata = cardValidation.getValues();
            sendata.confirmType = METHOD_CARD;
        } else{
            sendata = bankValidation.getValues();
            sendata.confirmType = METHOD_BANK;
        }
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val()
        lgkorUI.requestAjaxData(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.CERTI_ID) CERTI_ID = result.data.CERTI_ID;
            if(result.data.BATCH_KEY) BATCH_KEY = result.data.BATCH_KEY;

            if(lgkorUI.stringToBool(result.data.success)){
                paymentInfo = sendata.confirmType == METHOD_CARD ? cardValidation.getAllValues() : bankValidation.getAllValues();
                paymentInfo.confirmType = sendata.confirmType;
            }

            sendPaymentMethod = sendata.confirmType;

            setHiddenData('paymentMethodConfirm', result.data.success);

            /* BTOSCITE-98 add */
            if (vcui.detect.isIOS){
                setHiddenData('arsAgree', "N");
                arsAgreeConfirm = "N";
                $('.arsAgreeRequestCheck').attr('disabled', true);
            }
            /* //BTOSCITE-98 add */


        }, ajaxMethod);
    }

    //ARS출금동의 신청...
    var arsCallingInterval = null;
    var iosAgreeCallCheck = false;
    function setArsAgreeConfirm(){
        /* BTOCSITE-98 add */
        if (vcui.detect.isIOS){
            lgkorUI.showLoading();
        }

        isClickedarsAgreeConfirmBtn = true;
        $('.arsAgreeRequest').attr('disabled', true);
        clearTimeout(arsCallingInterval);
        arsCallingInterval = setTimeout(function(){
            $('.arsAgreeRequest').attr('disabled', false);
            if (vcui.detect.isIOS){
                lgkorUI.hideLoading();
            }
        }, 5000);
        /* //BTOCSITE-98 add */

        var chk = paymentConfirmYN();
        if(!chk) return;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return;
        }

        lgkorUI.showLoading();
        
        CTI_REQUEST_KEY = "";

        var sendata = sendPaymentMethod == METHOD_CARD ? cardValidation.getValues() : bankValidation.getValues();
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val();
        sendata.confirmType = sendPaymentMethod;

        setHiddenData('arsAgree', "N");

        // BTOCSITE-98 add
        if (vcui.detect.isIOS){
            $('.arsAgreeRequestCheck').attr('disabled', false);            
            arsAgreeConfirm = "N";
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
        } else {
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
        }
        /*
        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_URL, 180000, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;

            setHiddenData('arsAgree', result.data.success);
        }, ajaxMethod, null, true);
        */
        if(vcui.detect.isIOS) {
            if(!iosAgreeCallCheck ) {
                iosAgreeCallCheck = true;
                setTimeout(function (){
                    $.ajax({
                        method : ajaxMethod,
                        url : ARS_AGREE_URL,
                        data : sendata,
                        async : false,
                        success : function(result){         
                            if (!vcui.detect.isIOS){
                                lgkorUI.alert(result.data.alert.desc, {
                                    title: result.data.alert.title
                                });
                            }
            
                            // BTOCSITE-98 add
                            if (vcui.detect.isIOS){
                                //$('.arsAgreeRequestCheck').attr('disabled', false);
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                            } else {
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
                            }
                            
                            setHiddenData('arsAgree', result.data.success);                
                            // //BTOCSITE-98 add
                            iosAgreeCallCheck = false;
                        },
                        error : function(error){
                            //alert('error');
                            iosAgreeCallCheck = false;
                        },
                        complete : function(){
                            //alert('complete');
                            lgkorUI.hideLoading();
                            iosAgreeCallCheck = false;
                        }
                    });
                },1000);
            }
        } else {
            $.ajax({
                method : ajaxMethod,
                url : ARS_AGREE_URL,
                data : sendata,
                async : false,
                success : function(result){         
                    if (!vcui.detect.isIOS){
                        lgkorUI.alert(result.data.alert.desc, {
                            title: result.data.alert.title
                        });
                    }
    
                    // BTOCSITE-98 add
                    if (vcui.detect.isIOS){
                        //$('.arsAgreeRequestCheck').attr('disabled', false);
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                    } else {
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
                    }
                    
                    setHiddenData('arsAgree', result.data.success);                
                    // //BTOCSITE-98 add
                },
                error : function(error){
                    //alert('error');
                },
                complete : function(){
                    //alert('complete');
                    lgkorUI.hideLoading();
                }
            });
        }

    }
    // ARS 출금동의요청 체크 :: BTOCSITE-98 add
    var arsConfirmCallingInterval = null;
    function arsAgreeConfirmCheck(){
        isClickedarsAgreeConfirmCheckBtn = true;
        $('.arsAgreeRequestCheck').attr('disabled', true);
        clearTimeout(arsConfirmCallingInterval);
        arsConfirmCallingInterval = setTimeout(function(){
            $('.arsAgreeRequestCheck').attr('disabled', false);
        }, 3000);

        lgkorUI.showLoading();

        //CTI_REQUEST_KEY = "";
        arsAgreeConfirm = "N";

        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_CHECK_URL, 180000, {}, function(result){
            //console.log('출금동의요청 체크 결과', result);
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
            arsAgreeConfirm = result.data.success;

            if (arsAgreeConfirm !== "Y"){
                setHiddenData('arsAgree' , 'N');                
            }            
            
        }, ajaxMethod, null, true);
        
    }

    //납부 정보변경 취소...
    function savePaymentInfoCancel(){
        try{
            cardValidation.setValues(cardInfo);
            //$('.ui_card_number').vcFormatter('update');
    
            bankValidation.setValues(bankInfo);
            setHiddenData('paymentMethodConfirm', "N");
            setHiddenData('arsAgree', "N");
            paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', false);
            paymentModifyBlock.find('input[name=pointUseAgree]').prop('checked', false);
    
            setPaymentModeCont();
    
            paymentInfoBlock.show();
            paymentModifyBlock.hide();
        } catch(err){
            console.log(err);
        }
    }

    //납부 정보변경 저장...
    function savePaymentInfoOk(){
        var chk = paymentInfoValidation();
        if(chk){
            lgkorUI.showLoading();

            var sendata = {
                contractID: $('select[name=contractInfo]').find('option:selected').val(),
                CERTI_ID: CERTI_ID,
                BATCH_KEY: BATCH_KEY,
                CTI_REQUEST_KEY: CTI_REQUEST_KEY
            }
            for(var key in paymentInfo) sendata[key] = paymentInfo[key];
            
            lgkorUI.requestAjaxData(PAYMENT_SAVE_URL, sendata, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    changeContractInfo();
                }

                lgkorUI.hideLoading();
            }, ajaxMethod);
        } 
    }

    //납부 정보 유효성 체크
    function paymentInfoValidation(){
        var chk = paymentConfirmYN();
        if(!chk) return false;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return false;
        }

        if(getHiddenData("arsAgree") == "N" && !vcui.detect.isIOS){
            lgkorUI.alert("",{
                title: "자동결제를 위해 ARS 출금동의 신청해주세요."
            });
            
            return false;
        }

        /* BTOCSITE-98 add */
        if(arsAgreeConfirm !== "Y" && vcui.detect.isIOS){

            if (getHiddenData("arsAgree") !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 신청해주세요"
                });
                return false;
            }

            if (arsAgreeConfirm !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 확인 버튼을 클릭해 주세요"
                });
                return false;
            }
            
        }
        /* //BTOCSITE-98 add */

        if(!paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked')){
            lgkorUI.alert("",{
                title: "자동결제를 위해 정기결제 신청을 동의해주세요."
            });
            return false;
        }
        
        return true;
    }

    function showMempointModify(){
        $('.mempoint-btn').prop('disabled', true);

        $('.mempoint-info').find('input[name=point-cancel]').prop('checked', true);

        $('.mempoint-info .viewer').hide();

        $('.mempoint-info .modify').show();
        $('.mempoint-info .btn-group').show();
    }
    function cancelMempointModify(){
        $('.mempoint-btn').prop('disabled', false);

        $('.mempoint-info .viewer').show();

        $('.mempoint-info .modify').hide();
        $('.mempoint-info .btn-group').hide();
    }
    //멤버십 포인트 차감동의 저장
    function okMempointModify(){
        var sendata = {
            isAgree: $('.mempoint-info').data('isAgree'),
            deductType: $('.mempoint-info').data('deductType'),
            userPoint: $('.mempoint-info').data('userPoint'),
            deductPoint: $('.mempoint-info').data('deductPoint'),
            contractID: $('select[name=contractInfo]').find('option:selected').val()
        }
        
        if(sendata.isAgree){
            var chk = $('.mempoint-info').find('input[name=point-cancel]').prop('checked');
            sendata.isAgree = !chk;
        } else{
            sendata.deductType = $('.mempoint-info').find('input[name=point-ded]:checked').val();

            if(sendata.deductType == undefined || sendata.deductType == null){
                lgkorUI.alert("", {title:"차감 포인트를 선택해 주세요."});
                return;
            }
            sendata.isAgree = true;
        }
        
        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(MEMPOINT_DEDUCT_URL, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                changeContractInfo();
            }

            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    function changeFieldValue(gname, data){
        for(var key in data){
            $("."+gname).find('ul li[class=' + key + '] dd').empty().html(data[key]);
        }
    }

    function setContractInfo(data){
        mypage.find(".no-data").remove();

        console.log("setContractInfo %o",data);
        if(data != undefined && data != "" && data != null){
            var info;
    
            mypage.find(".section-wrap").show();
    
            info = getMaskingData(data.userInfo.user);
            changeFieldValue('user-info', info);
    
            info = getMaskingData(data.userInfo.actualUser);
            changeFieldValue('actual-info', info);

            data.contractInfo.contractID = "<span>" + data.contractInfo.contractID + "</span>";
            if(data.contractInfo.cancelRequestYn == "Y") data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelResultUrl + "' class='btn-link cancelConsult-btn'>해지요청 조회</a>";
            // else data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelConsultUrl + "' class='btn-link cancelConsult-btn'>해지상담 신청</a>";

            // BTOCSITE-175 케어솔루션 > 무상케어십 정보 추가 노출 요청            
            // contractType - R :케어솔루션 C : 케어십 
            // contDtlType - C00 : 무상케어십
            // 무상케어십일때 해지상담 신청 버튼 비노출 
            if(data.contractInfo.contDtlType != 'C00'){
                data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelConsultUrl + "' class='btn-link cancelConsult-btn'>해지상담 신청</a>";
            } 
            if(data.contractInfo.contractType === 'C' || data.contractInfo.contDtlType === 'C00' ) {
                // 케어십, 무상케어십 - 의무사용기간 숨김
                $('.contract-info .dutyPeriod').hide();
                
                // 케어십 - 계약기간 표시형식 변경
                if(data.contractInfo.contractType === 'C' && data.contractInfo.contDtlType != 'C00'){
                    data.contractInfo.period =  '<div>'+data.contractInfo.period +' ~ </div>' + 
                    '<dl class="bullet-list nomargin-top">' +
                    '<dd class="b-txt">케어십 계약기간은 1년이며, 계약기간 만료 시점에 계약 해지 의사가 없을 시 최초 계약 기간만큼 자동 연장됩니다.</dd>' +
                    '</dl>';
                } 
                // 계약기간 노출형식 : 년수(시작일 ~ 종료일)
                else {
                    var startArry = data.contractInfo.contStartDate.split('.');
                    var endArry = data.contractInfo.contEndDate.split('.');
                    var periodYear = endArry[0] - startArry[0];
                    data.contractInfo.period =  '<div>'+ periodYear +'년 ('+data.contractInfo.contStartDate  +' ~ ' + data.contractInfo.contEndDate +')</div>';
                }
            }
            // BTOCSITE-175 케어솔루션 > 무상케어십 정보 추가 노출 요청  : 비노출처리 : 계약서 발급신청버튼, 납부정보, 멤버십포인트 , 무상할인회차
            if( data.contractInfo.contDtlType === 'C00' ) {
                $('.contract-btn').hide();
                $('.sects.payment.viewer').hide();
                $('.member-point-info').hide();
                $('.tooltip-wrap').hide();
                $('.saleTurn').hide();
            } else {
                $('.contract-btn').show();
                $('.sects.payment.viewer').show();
                $('.member-point-info').show();
                $('.tooltip-wrap').show();
                $('.saleTurn').show();
            }

            // 렌탈케어 - 의무 사용기간 포맷 변경
            if(data.contractInfo.dutyPeriod && data.contractInfo.contractType === 'R') {
                $('.contract-info .dutyPeriod').show();
                var dutyPeriod = data.contractInfo.dutyPeriod.split(" ");
                    dutyPeriod.push(vcui.date.calcDate(dutyPeriod[1].replace(/\./g,'-'), '+'+(365*Number(dutyPeriod[0].replace('년','')))+'d', 'yyyy.MM.dd'));
                    data.contractInfo.dutyPeriod = dutyPeriod[0]+'('+dutyPeriod[1]+' ~ '+dutyPeriod[2]+')';
            }

            changeFieldValue('contract-info', data.contractInfo);
    
            info = {
                monthlyPrice: "<span>" + data.paymentInfo.monthlyPrice + "</span><a href='" + data.paymentInfo.paymentListUrl  + "' class='btn-link paymenyList-btn'>납부내역 조회</a>",
                withdrawDate: data.paymentInfo.withdrawDate
            }
            if(data.paymentInfo.paymentMethod == METHOD_CARD){
                paymentMode = "card";
    
                info.paymentMethod = "신용카드"
                info.methodName =  "<span>" + data.paymentInfo.cardInfo.cardComName + "</span><a href='" + data.paymentInfo.requestCardUrl  + "' class='btn-link requestCard-btn'>제휴카드 신청</a>";
                info.methodNumber = txtMasking.card(data.paymentInfo.cardInfo.cardNumber);
            } else{
                paymentMode = "bank";
    
                info.paymentMethod = "계좌이체";
                info.methodName =  "<span>" + data.paymentInfo.bankInfo.bankName + "</span><a href='" + data.paymentInfo.requestCardUrl  + "' class='btn-link requestCard-btn'>제휴카드 신청</a>";
                info.methodNumber = txtMasking.substr(data.paymentInfo.bankInfo.bankNumber, 4);
            }
            changeFieldValue('payment-info', info);
            if(data.paymentInfo.isGrouping || data.contractInfo.contStatus != "S"){
                $('.payment-info .requestCard-btn, .changePayment-btn').hide();
            } else{
                $('.payment-info .requestCard-btn, .changePayment-btn').show();
            }
            associCardType = data.paymentInfo.associCardType;

            var isAgreeText = "";
            var isAgree = data.memberPointInfo.isAgree;
            var deductype = data.memberPointInfo.deductType;
            var userpoint = data.memberPointInfo.userPoint;
            var deductpoint = data.memberPointInfo.deductPoint;
            var userpointComma = vcui.number.addComma(userpoint);
            var deductpointComma = vcui.number.addComma(deductpoint);
            if(isAgree){
                isAgreeText = "동의 ("+data.memberPointInfo.memPointPayLimit+")";
                if(deductype == "deduct"){
                    $('.mempoint-info input[value=deduct]').prop('checked', true);
                } else{
                    $('.mempoint-info input[value=all]').prop('checked', true);
                }
                $('.mempoint-info .agreeBox').show();
                $('.mempoint-info .noneAgreeBox').hide();
            } else{
                isAgreeText = "미동의";
                $('.mempoint-info .agreeBox').hide();
                $('.mempoint-info .noneAgreeBox').show();
            }
            $('.mempoint-info').find('.userPoint').text(userpointComma);
            $('.mempoint-info').find('.deductPoint').text(deductpointComma);
            $('.mempoint-info').find('.viewer').text(isAgreeText);
            $('.mempoint-info').data('isAgree', isAgree);
            $('.mempoint-info').data('deductType', deductype);
            $('.mempoint-info').data('userPoint', userpoint);
            $('.mempoint-info').data('deductPoint', deductpoint);
            cancelMempointModify();

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
                rcvPostCode: data.userInfo.actualUser.rcvPostCode,
                rcvBasAddr: data.userInfo.actualUser.rcvBasAddr,
                rcvDtlAddr: data.userInfo.actualUser.rcvDtlAddr
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
            bankValidation.setValues(bankInfo);

            setPaymentModeCont();
        } else{
            mypage.find(".section-wrap").hide();

            mypage.find(".section-wrap").before('<div class="no-data"><p>보유하신 케어솔루션 계약 정보가 없습니다.</p></div>');
        }
    }

    function setPaymentModeCont(){
        $('.mypage .section-wrap .sects.payment.modify input[data-visible-target]').prop("checked", false);
        $('.mypage .section-wrap .sects.payment.modify input[data-visible-target=".by-' + paymentMode + '"]').prop("checked", true);

        $('.mypage .section-wrap .sects.payment.modify').find('.tab-panel').hide();
        $('.mypage .section-wrap .sects.payment.modify').find('.tab-panel.by-' + paymentMode).show();
    }

    function getMaskingData(data){
        var newdata = {};
        for(var key in data){
            if(key == "name") newdata[key] = data[key];
            else if(key == "email") newdata[key] = data[key];
            else if(key == "adress") newdata[key] = data[key], 20;
            else newdata[key] = data[key];
        }

        return newdata;
    }

    function changeContractInfo(){
        lgkorUI.showLoading();

        var info = $('select[name=contractInfo]').find('option:selected').val();

        saveUserInfoCancel();

        paymentInfoBlock.show();
        paymentModifyBlock.hide();

        var sendata = {
            contractInfo: info
        }
        
        lgkorUI.requestAjaxData(CONTRACT_INFO, sendata, function(result){


            console.log("result %o",result);
            setContractInfo(result.data);

        

            lgkorUI.hideLoading();

            if(requestPartnerCardYn == "Y"){
                requestPartnerCardYn = "";

                var viewertop = $('.sects.payment.viewer').offset().top;
                $('html, body').animate({scrollTop:viewertop}, 200, function(){
                    setTimeout(function(){
                        setRequestCard();
                    }, 100);
                });
            } else {
                // BTOCSITE-2838 : 고객혜택에서 왔을때  매니저 정보로 이동 s
                var managerInfoLink= 'managerInfoLink';
                if ($('.section-inner').hasClass('manager-info') == true) {
                    if (lgkorUI.getStorage('managerInfoLink')){        
                        var managerInfoPosition = document.querySelector('.manager-info').offsetTop;
                        $('html, body').animate({scrollTop:managerInfoPosition + 30}, 0);
                        lgkorUI.removeStorage(managerInfoLink);
                    };
                } else {
                    lgkorUI.removeStorage(managerInfoLink);
                    $('html, body').animate({scrollTop:0}, 220);
                }
                // BTOCSITE-2838 :고객혜택에서 왔을때  매니저 정보로 이동 e
            }
        }, ajaxMethod);
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

    /* BTOCSITE-5138 210906 마이페이지>렌탈/케어>고객 실사용자 주소 변경 기능 추가 */
    $(function () {
        var addressFinder = new AddressFind();

        $('#addrBtn').on('click', function(e){
            addressFinder.open(function(data){
                $('input[name=rcvPostCode]').val(data.zonecode);
                $('input[name=rcvBasAddr]').val(data.roadAddress);
                
                // 상세정보로 포커스 이동
                $('input[name=rcvDtlAddr]').focus();
                $('input[name=rcvDtlAddr]').val('');
            });
        });
    });
    /* //BTOCSITE-5138 210906 마이페이지>렌탈/케어>고객 실사용자 주소 변경 기능 추가 */
})();
