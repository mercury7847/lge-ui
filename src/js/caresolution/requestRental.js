(function(){
    var CREDIT_INQUIRE_URL;
    var INSTALL_ABLED_URL;
    var CARD_ABLED_URL;
    var ARS_AGREE_URL;
    var REQUEST_SUBMIT_URL;
    var PREPAYMENT_CHECKED_URL;
    var MSG_SEND_URL;

    var requestAgreeChecker;
    var requestButton;

    var stepAccordion;

    var privacyAgreeChker;
    var privacyAgreeAllChker;
    var privacyAgreeOkButton;

    var rentalAgreeChker;
    var rentalAgreeAllChker;
    var rentalAgreeOkButton;

    var creditInquireButton;

    var requestInfoBlock;

    var step1Block, step2Block, step3Block;
    var step1Validation, step2Validation, cardValidation, bankValidation;

    var deliveryMnger;
    var addressFinder;

    var productPriceInfo;
    var cardDiscountPrice = 0;

    var step = 0;

    var installAdress = {}
    var cardInputData = {};
    var bankInputData = {};

    var allOwnedProductYn;

    var beforeVisitModelFlag;

    var ajaxMethod = "post";

    var selectPaymentMethod;

    var contractUserPhone = "";

    var isBeforeUnload = true;

    function init(){    
        vcui.require(['ui/checkboxAllChecker', 'ui/accordion', 'ui/modal', 'ui/validation'], function () {             
            setting();
            bindEvents();
        });
    }

    //초기 셋팅...
    function setting(){
        CREDIT_INQUIRE_URL = $('.requestRentalForm').data('creditInquireUrl');
        INSTALL_ABLED_URL = $('.requestRentalForm').data('installAbledUrl');
        CARD_ABLED_URL = $('.requestRentalForm').data('cardAbledUrl');
        ARS_AGREE_URL = $('.requestRentalForm').data('arsAgreeUrl');
        REQUEST_SUBMIT_URL = $('.requestRentalForm').data('submitUrl');
        PREPAYMENT_CHECKED_URL = $('.requestRentalForm').data('prepaymentCheckedUrl');
        MSG_SEND_URL = $('.requestRentalForm').data('msgSendUrl');

        step1Block = $('.requestRentalForm ul li:nth-child(1)');
        step2Block = $('.requestRentalForm ul li:nth-child(2)');
        step3Block = $('.requestRentalForm ul li:nth-child(3)');

        contractUserPhone = getInputData("contractUserDefaultPhone");

        requestInfoBlock = new CareCartInfo('div.col-right', '.requestRentalForm');

        $('.agree-box').vcCheckboxAllChecker();
        requestAgreeChecker = $('.agree-box').vcCheckboxAllChecker('instance');
        requestButton = $('.agree-box').find('button.btn');

        $('.ui_accordion').vcAccordion();
        stepAccordion = $('.ui_accordion').vcAccordion('instance');

        privacyAgreeChker = $('input[name=chkPrivacy]');
        $('#popup-privacy').vcCheckboxAllChecker();
        privacyAgreeAllChker = $('#popup-privacy').vcCheckboxAllChecker('instance');
        privacyAgreeOkButton = $('#popup-privacy .btn-group .btn:nth-child(2)').css({cursor:'default'});


        rentalAgreeChker = $('input[name=rentalAgree]');
        $('#popup-rentalAgree').vcCheckboxAllChecker();
        rentalAgreeAllChker = $('#popup-rentalAgree').vcCheckboxAllChecker('instance');
        rentalAgreeOkButton = $('#popup-rentalAgree .btn-group .btn:nth-child(2)').css({cursor:'default'});
        

        creditInquireButton = $('.creditInquire');


        // number e block;
        $('input[type=number]').on('keydown', function(e){
            return e.keyCode !== 69;
        });

        var register = {
            registFrontNumber:{
                required: true,
                errorMsg: "생년월일을 다시 확인해주세요.",
                msgTarget: '.err-regist'
            },
            registBackFirst: {
                required: true,
                errorMsg: "주민번호 뒤 첫자리를 다시 확인해주세요.",
                msgTarget: '.err-regist-first'
            },
            userEmail:{
                required: true,
                errorMsg: "이메일 주소를 다시 확인해주세요.",
                msgTarget: '.err-block',
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            zipCode: {
                required: true
            },
            userAddress: {
                required: true
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-address'
            }
        }
        step1Validation = new vcui.ui.Validation('.requestRentalForm ul.step-block > li:nth-child(1)',{register:register});

        register = {
            userName:{
                required: true,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block'
            },
            userPhone: {
                required: true,
                errorMsg: "휴대폰 번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userTelephone: {
                required: true,
                errorMsg: "전화번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            zipCode: {
                required: true
            },
            userAddress: {
                required: true
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-address-install'
            },
            inatallPlace: {
                required: true,
                errorMsg: "설치장소를 선택해주세요.",
                msgTarget: '.err-block'
            },
            inatallDate: {
                required: true,
                errorMsg: "설치희망일을 선택해주세요.",
                msgTarget: '.err-block'
            },
            preVisitAgree:{
                required: true,
            }
        }
        step2Validation = new vcui.ui.Validation('.requestRentalForm ul.step-block > li:nth-child(2)',{register:register});

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
        cardValidation = new vcui.ui.Validation('.requestRentalForm ul.step-block > li:nth-child(3) .by-card',{register:register});

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
        bankValidation = new vcui.ui.Validation('.requestRentalForm ul.step-block > li:nth-child(3) .by-bank',{register:register});

        $('#popup-delivery-address').data("exception", true);
        deliveryMnger = new AddressManagement("#popup-delivery-list", "#popup-delivery-address", null, true);
        addressFinder = new AddressFind();

        step1Block.find('input[name=detailAddress]').attr('maxlength', 50);
        step2Block.find('input[name=detailAddress]').attr('maxlength', 50);
    }

    //이벤트 등록...
    function bindEvents(){
        stepAccordion.on('accordionbeforeexpand', function(e, data){
            if(data.index > step){

                if(!setNextStep()){
                    e.preventDefault();
                    return;
                }
                
                var contop = $(data.header).offset().top;
                $('html, body').stop().animate({scrollTop:contop}, 350);
            }
        });

        $('.nextStep-btn').on('click', function(e){
            e.preventDefault();

            if(setNextStep()){
                stepAccordion.expand(step, true);
                var activeValue = stepAccordion.getActivate();
                var contop = $(activeValue.header[step]).offset().top;
                $('html, body').stop().animate({scrollTop:contop}, 350);
            }
        })

        requestButton.on('click', function(e){
            rentalRequest();
        });

        privacyAgreeChker.on('change', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                openPrivacyPopup();
            } else{
                setPrivacyAgreePop(false);
            }
        });


        step1Block.find('.input-mix-wrap .cell .btn-link').on('click', function(e){
            e.preventDefault();

            openPrivacyPopup();
        });

        privacyAgreeAllChker.on('allCheckerChange', function(e, status){
            setPrivacyAgreeStatus(status);
        });
        $('#popup-privacy').on('click', '.btn-group .btn:nth-child(1), .btn-close', function(e){
            setPrivacyAgreePop(false);
        });
        privacyAgreeOkButton.on('click', function(e){
            if(privacyAgreeAllChker.getAllChecked()){
                $('#popup-privacy').vcModal('close');
            }
        });

        rentalAgreeChker.on('change', function(e){
            var chk = $(this).prop('checked');

            setRentalAgreePop(false);

            if(chk){
                openRentalAgreePopup();
            }
        })
        $('#popup-rentalAgree').on('click', '.btn-group .btn:nth-child(1), .btn-close', function(e){
            setRentalAgreePop(false);
        });
        rentalAgreeOkButton.on('click', function(e){
            if(getRentalAgreeAllChecked()){
                $('#popup-rentalAgree').vcModal('close');
            }
        });
        $('#popup-rentalAgree').on('change', 'input[type=checkbox]', function(){
            rentalAgreeChecked();
        });



        creditInquireButton.on('click', function(e){
            e.preventDefault();

            setCreditInquire();
        });

        $('.popup-wrap').on('click', '.btn-group .agree-confirm', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            var idx = chkername.indexOf('rentalAgree');
            var cdx = chkername.indexOf('careshipAgree');

            if(idx > -1 || cdx > -1){
                rentalAgreeAllChker.setChecked(chkername, true);
                rentalAgreeChecked();
            } else{
                privacyAgreeAllChker.setChecked(chkername, true);
            }

            var idname = $(this).closest('.popup-wrap').attr('id');
            $("#"+idname).vcModal('close');
        }).on('click', '.btn-group .agree-cancel', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            var idx = chkername.indexOf('rentalAgree');
            var cdx = chkername.indexOf('careshipAgree');

            if(idx > -1 || cdx > -1){
                rentalAgreeAllChker.setChecked(chkername, false);
                rentalAgreeChecked();
            } else{
                privacyAgreeAllChker.setChecked(chkername, false);
            }
        });

        $('.search-postcode').on('click', function(e){
            e.preventDefault();

            var idx = $(this).closest('.lists').index();
            getPostCode($(this).closest('.conts'), idx);
        });

        $('.openDelivery').on('click', function(e){
            e.preventDefault();

            var idx = $(this).closest('.lists').index();
            openDeliveryPop($(this).closest('.conts'), idx)
        });

        $('input[name=nicePopChker]').on('change', function(e){
            setCreditInquire();
        })

        step2Block.on('change', 'input[name=installInpuType]', function(e){
            changeInstallInputType($(this).prop("checked"));
        }).on('change', 'input[name=preVisitRequest]', function(e){
            changePrevisitRequest($(this).val());
        }).on('change', 'input[name=preVisitAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk) {
                $(this).prop('checked', false);
                $('#popup-previsit').vcModal();
            }
        }).on('click', '.input-mix-wrap .cell .btn-link', function(e){
            e.preventDefault();
            $('#popup-previsit').vcModal();
        }).on('click', '.installAbledConfirm', function(e){
            e.preventDefault();
            setInstallAbledConfirm();
        });

        $('#popup-previsit').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step2Block.find('input[name=preVisitAgree]').prop('checked', chk);

            if(chk) $('#popup-previsit').vcModal('close');
        });


        step3Block.on('change', 'input[name=cardApplication]', function(){
            var chk = $(this).val();
            if(chk == "Y"){
                step3Block.find('input[name=cardApplyaAgree]').prop('checked', false);
                step3Block.find('.sendMessage').prop('disabled', true);
                step3Block.find('select[name=associatedCard] option').eq(0).prop('selected', true);
                step3Block.find('select[name=associatedCard]').vcSelectbox('update');
                step3Block.find('.discount-txt').text('');
            } else{
                cardDiscountPrice = 0;
                changeProductPriceInfo();
            }
        }).on('change', 'select[name=associatedCard]', function(){
            var selectopt = step3Block.find('select[name=associatedCard] option:selected');
            cardDiscountPrice = selectopt.data('discountPrice') ? parseInt(selectopt.data('discountPrice')) : 0;
            if(cardDiscountPrice && cardDiscountPrice > 0) {
                var discountcomma = vcui.number.addComma(cardDiscountPrice);
                step3Block.find('.discount-txt').text("최대 " + discountcomma + "원 청구 할인");
            } else{
                step3Block.find('.discount-txt').text('');
            }
            changeProductPriceInfo();
        }).on('change', 'input[name=cardApplyaAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-cardApply').vcModal();
            }
        }).on('click', '.cardApplyaAgree', function(e){
            e.preventDefault();
            $('#popup-cardApply').vcModal();
        }).on('change', 'select[name=paymentCard], input[name=paymentCardNumber], input[name=paymentCardPeriod]', function(e){
            var chk = 0;
            if(step3Block.find('select[name=paymentCard]').val() != "") chk++;
            if(step3Block.find('input[name=paymentCardNumber]').val() != "") chk++;
            if(step3Block.find('input[name=paymentCardPeriod]').val() != "") chk++;
            
            step3Block.find('.paymentCardConfirm').prop('disabled', chk < 3);
        }).on('change', 'select[name=paymentBank], input[name=paymentBankNumber]', function(e){
            var chk = 0;
            if(step3Block.find('select[name=paymentBank]').val() != "") chk++;
            if(step3Block.find('input[name=paymentBankNumber]').val() != "") chk++;
            
            step3Block.find('.paymentBankConfirm').prop('disabled', chk < 2);
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal();
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal();
        }).on('click', '.paymentCardConfirm', function(e){
            e.preventDefault();
            setCardAbledConfirm();
        }).on('click', '.paymentBankConfirm', function(e){
            e.preventDefault();
            setBankAbledConfirm();
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();
            setArsAgreeConfirm();
        }).on('change', 'input[name=rdo04]', function(){
            var chk = $(this).val();

            if(chk == "Y"){
                setPrepaymentChecked();
            }
        });

        $('#popup-cardApply').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step3Block.find('input[name=cardApplyaAgree]').prop('checked', chk);
            step3Block.find('.sendMessage').prop('disabled', !chk);

            if(chk) $('#popup-cardApply').vcModal('close');
        }).on('click', '.msgSend-btn', function(e){
            e.preventDefault();
            //문자 동의 발송

            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(MSG_SEND_URL, null, null, ajaxMethod);
        });

        $('#popup-selfClearing').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step3Block.find('input[name=selfClearingAgree]').prop('checked', chk);

            if(chk) $('#popup-selfClearing').vcModal('close');
        });

        $(window).on('beforeunload', function(e){
            if(isBeforeUnload) return '변경사항이 저장되지 않을 수 있습니다.'
        });
    }

    function setNextStep(){
        var isComplete = false;
        switch(step){
            case 0:
                isComplete = setStep1Validation();
                break;

            case 1:
                isComplete = setStep2Validation();
                break;
        }
        
        if(isComplete) step++;

        return isComplete;
    }

    //계약자 정보입력 밸리데이션...
    function setStep1Validation(){
        var completed = false;
        var result = step1Validation.validate();
        var data = getInputData('creditInquire');
        if(result.success){
            completed = data === "Y" ? true : false;
            if(!completed){
                lgkorUI.alert("", {
                    title: "신용정보 조회로 계약 가능 여부<br>확인이 필요합니다."
                });
            }
        } else{
            var leng = Object.keys(result.validItem).length;
            if(data == "Y"){
                if(leng == 1) completed = true;
            } else{
                if(leng == 1){
                    lgkorUI.alert("", {
                        title: "신용정보 조회로 계약 가능 여부<br>확인이 필요합니다."
                    });
                } else{
                    var isRFN = result.validItem.registFrontNumber;
                    var isRBF = result.validItem.registBackFirst;
                    var isUE = result.validItem.userEmail;
                    if(!isRFN && !isRBF && !isUE){
                        var isZP = result.validItem.zipCode;
                        var isUD = result.validItem.userAddress;
                        if(isZP && isUD) $(window).trigger("toastshow", "주소를 확인해주세요.");
                        else{
                            var isCP = result.validItem.chkPrivacy;
                            var isDA = result.validItem.detailAddress;
                            if(!isDA && isCP) $(window).trigger("toastshow", "개인정보 및 신용정보 제공 동의가 필요합니다.");
                        }
                    } 
                }
            }
        }

        return completed;
    }

    function step2InstallValidation(){
        var result = step2Validation.validate(["zipCode", "userAddress"]);
        if(!result.success){
            $(window).trigger("toastshow", "주소를 확인해주세요.");
            return false;
        }
        
        result = step2Validation.validate(["detailAddress"]);
        if(!result.success) return false;

        return true;
    }

    //설치 정보 입력 밸리데이션...
    function setStep2Validation(){
        var completed = false;
        var result = step2Validation.validate(["userName", "userPhone", "userTelephone"]);
        if(result.success){
            var installvalidate = step2InstallValidation();
            if(installvalidate){
                var data = getInputData('installAbled');

                var chk = false;
                if(data == "Y"){
                    chk = compareInputData(installAdress, step2Validation.getValues());
                }
                
                if(!chk){
                    lgkorUI.alert("", {
                        title: "설치 가능여부 확인이 필요합니다."
                    });
                } else{
                    if(allOwnedProductYn == "Y"){
                        var installplace = step2Validation.validate(["inatallPlace"]);
                        chk = installplace.success;
                    } else{
                        var restresult = step2Validation.validate(["inatallPlace", "inatallDate"]);
                        chk = restresult.success;
                        if(chk){
                            var isBeforeVisitChk = false;
                            if(beforeVisitModelFlag == "M"){
                                isBeforeVisitChk = true;
                            } else if(beforeVisitModelFlag == "O"){
                                var preVisitRequest = step2Block.find("input[name=preVisitRequest]:checked").val();
                                if(preVisitRequest == "Y"){
                                    isBeforeVisitChk = true;
                                }
                            }

                            if(isBeforeVisitChk){
                                var beforeVisitAgree = step2Validation.validate(["preVisitAgree"]);
                                chk = beforeVisitAgree.success;

                                if(!chk) $(window).trigger("toastshow", "서비스 제공을 위한 개인정보 수집/이용 동의가 필요합니다.");
                            }
                        }
                    }
                }
            }
            completed = chk;
        } 

        return completed;
    }

    //결제수단 체크
    function getPaymentMethod(){
        var paymethod = step3Block.find('.payment-method input[name=method-pay]:checked').data("visibleTarget");
        var result = paymethod == ".by-bank" ? "bank" : "card";

        return result;
    }

    //납부정보 결재수단 INPUT 밸리데이션...
    function paymentFiledValidation(){
        var paymethod = getPaymentMethod();
        var result = paymethod == "bank" ? bankValidation.validate() : cardValidation.validate();
        if(!result.success){
            return "";
        }

        return paymethod;
    }

    //납부정보 결재수단 밸리데이션...
    function paymentValidation(){
        var paymethod = paymentFiledValidation();
        if(paymethod == "") return false;

        var cardAbled = getInputData('cardAbled');
        if(selectPaymentMethod != paymethod || cardAbled == "N"){
            var msg = paymethod == "bank" ? "납부 계좌 확인을 통해 납부 가능 여부를 확인해주세요." : "납부 카드 확인을 통해 납부 가능 여부를 확인해주세요.";
            lgkorUI.alert("",{title:msg});

            selectPaymentMethod = "";
            setInputData('arsAgree', "N");
            
            return false;
        }

        var chk = paymethod == "bank" ? compareInputData(bankInputData, bankValidation.getValues()) : compareInputData(cardInputData, cardValidation.getValues());
        if(!chk){
            var msg = paymethod == "bank" ? "납부 계좌 확인을 통해 납부 가능 여부를 확인해주세요." : "납부 카드 확인을 통해 납부 가능 여부를 확인해주세요.";
            lgkorUI.alert("",{title:msg});

            step3Block.find('.arsAgreeRequest').prop('disabled', true);

            selectPaymentMethod = "";
            setInputData('arsAgree', "N");

            return false;
        }

        return true;
    }

    //납부 정보 입력 밸리데이션...
    function setStep3Validation(){
        var cardApply, chk, value, paymethod, result;
        cardApply = step3Block.find('input[name=cardApplication]:checked').val();
        if(cardApply == "Y"){
            chk = step3Block.find('input[name=cardApplyaAgree]').prop('checked');
            if(!chk){
                $(window).trigger("toastshow", "제휴카드 발급/변경 자동 등록을 위한 제3자 정보제공 동의가 필요합니다.");
                return false;
            } 

            value = step3Block.find('select[name=associatedCard] option:selected').val();
            if(value == ""){
                $(window).trigger("toastshow", "신용카드의 카드사를 선택해주세요.");
                return false;
            }
        }
        
        chk = paymentValidation();
        if(!chk) return false;

        chk = getInputData('arsAgree');
        if(chk !== "Y"){
            lgkorUI.alert("",{
                title: "자동결제를 위해 ARS 출금동의 신청해주세요"
            })
            return false;
        }

        chk = step3Block.find('input[name=selfClearingAgree]').prop('checked');
        if(!chk){
            lgkorUI.alert("", {
                title: '자동결제를 위해 정기결제 신청을 동의해주세요.'
            });
            return false;
        }        
        
        return true;
    }

    //배송지역 주소 저장...
    function setInstallAdress(){
        var values = step2Validation.getValues(); 
        installAdress = {
            zipCode: values.zipCode,
            userAddress: values.userAddress,
            detailAddress: values.detailAddress
        }
    }

    //입력 후 데이터가 바뀐 경우 체크..
    function compareInputData(initData, currentData){
        var chk = true;
        for(var str in initData){
            if(initData[str] !== currentData[str]){
                chk = false;

                break;
            }
        }

        return chk;
    }

    //설치 가능여부 확인...
    function setInstallAbledConfirm(){
        var result = step2InstallValidation();
        if(!result) return;

        lgkorUI.showLoading();

        installAdress = {};

        allOwnedProductYn = "N";
        beforeVisitModelFlag = "N";

        var code = [];
        $('.order-list li').each(function(idx, item){
            code.push($(item).data('itemId'));
        });
        
        var selectCardValue = 0;
        var isCardRequest = step3Block.find('input[name=cardApplication]').val();
        if(isCardRequest == "Y"){
            selectCardValue = step3Block.find('select[name=associatedCard]').find('option:selected').data('discountPrice');
        }
        

        
        var sendata = {
            rtModelSeq: code.join(','),
            waterTestYn: getInputData('waterTestYn'),
            zipCode: step2Validation.getValues("zipCode"),
            cardDiscountPrice: selectCardValue
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(485, sendata, function(result){
            lgkorUI.hideLoading();

            productPriceInfo = result.data.productPriceInfo;

            if(result.data.productStatus){
                for(var str in result.data.productStatus){
                    var modelID = result.data.productStatus[str].modelID;
                    var installAbled = result.data.productStatus[str].installAbled;
                    var listItem = $('.order-list .order-item[data-item-id=' + modelID + ']');
                    if(installAbled == "Y"){
                        $(listItem).removeClass('disabled');
                        $(listItem).find('.disabled-message p').text("");
                        requestInfoBlock.setItemInfoDisabled(modelID, false)
                    } else{
                        if(!$(listItem).hasClass('disabled')) $(listItem).addClass('disabled');
                        $(listItem).find('.disabled-message p').text(result.data.productStatus[str].availableMessage);
                        requestInfoBlock.setItemInfoDisabled(modelID, true)
                    }
                }
            }

            var abled = "N";
            if(lgkorUI.stringToBool(result.data.success)){
                lgkorUI.alert(result.data.alert.desc, {
                    title: result.data.alert.title
                });
                abled = "Y";
            } else{
                var total = parseInt(productPriceInfo.total.count);
                if(total) abled = "Y";
                
                lgkorUI.confirm(result.data.alert.desc, {
                    typeClass: "type2",
                    title: result.data.alert.title,
                    cancelBtnName: result.data.alert.leftBtnName,
                    okBtnName: result.data.alert.rightBtnName,
                    cancel: result.data.alert.leftUrl && result.data.alert.leftUrl != "" ? function(){
                        location.href = result.data.alert.leftUrl;
                    } : "",
                    ok: result.data.alert.rightUrl && result.data.alert.rightUrl != "" ? function(){
                        location.href = result.data.alert.rightUrl;
                    } : ""
                });
            } 

            if(result.data.newProductInfo && result.data.newProductInfo.length){
                $('.order-list li').each(function(idx, item){
                    var info = result.data.newProductInfo[idx];

                    $(item).find('.item-options2').empty();
                    for(var i in info.options) $(item).find('.item-options2').append("<p>" + info.options[i] + "</p>");                    

                    $(item).find('.amount .price').empty();
                    if(info.originalPrice) $(item).find('.amount .price').append('<p class="original">' + info.originalPrice + '</p>');
                    if(info.totalPrice) $(item).find('.amount .price').append('<p class="total">' + info.totalPrice + '</p>');
                });
            }

            cardDiscountPrice = result.data.cardDiscountPrice || 0;
            changeProductPriceInfo();
            
            if(abled == "Y"){
                setInstallAdress();

                allOwnedProductYn = result.data.allOwnedProductYn;

                beforeVisitModelFlag = result.data.beforeVisitModelFlag || "N";

                if(result.data.allOwnedProductYn == "Y"){
                    step2Block.find('.forAOP').hide();
                } else{
                    step2Block.find('.forAOP').show().find('input, select, button').prop('disabled', false);
                    step2Block.find('.forAOP').find('.ui_selectbox').vcSelectbox('update');
                    step2Block.find('.datepicker').removeClass('disabled');

                    var rbv = step2Block.find(".requestBeforeVisit");
                    rbv.show();
                    rbv.find('.tit .label').removeClass('req');
                    rbv.find('.tit .label span').remove();
                    if(beforeVisitModelFlag == "M"){
                        rbv.find('.tit .label').addClass('req');
                        rbv.find('.tit .label').append('<span class="blind">필수</span>');
                        //preVisitRequest
                        step2Validation.setValues({preVisitRequest:"Y"});
                        step2Block.find('input[name=preVisitAgree]').prop('checked', false);
                        rbv.find('.visible-target1').show();
                        rbv.find('input[name=preVisitRequest]').not('[value=Y]').prop('disabled', true);
                    } else if(beforeVisitModelFlag == "N"){
                        rbv.hide();
                    }
                }

                step2Block.find('select[name=inatallPlace]').prop('disabled', false);
                step2Block.find('select[name=inatallPlace]').vcSelectbox('update');

                step2Block.find('input[name=detailAddress]').prop('disabled', true);
                step2Block.find('button.installAbledConfirm').prop('disabled', true);
            }
            
            setInputData('installAbled', abled);
        }, ajaxMethod);
    }

    //신용정보 조회...
    function setCreditInquire(){
        var step1Value = step1Validation.getValues();
        var result = step1Validation.validate();
        if(result.validItem.registFrontNumber || result.validItem.registBackFirst || result.validItem.userEmail || result.validItem.zipCode){
            return;
        }

        lgkorUI.showLoading();

        var sendata = {
            rentalCareType: getInputData('rentalCareType'),
            registFrontNumber: step1Value.registFrontNumber,
            registBackFirst: step1Value.registBackFirst,
            userEmail: step1Value.userEmail,
            zipCode: step1Value.zipCode
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CREDIT_INQUIRE_URL, sendata, function(result){
            if(result.data.success == "P"){
                void(window.open("", "nicePopUp", "width=500, height=550, scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));   
                document.form_chk.action = result.data.niceAntionUrl;
                document.form_chk.EncodeData.value = result.data.sEncData;
                document.form_chk.param_r1.value = result.data.param_r1;
                document.form_chk.param_r2.value = result.data.param_r2;
                document.form_chk.param_r3.value = result.data.param_r3;
                document.form_chk.m.value = "safekeyService";
                document.form_chk.target = "nicePopUp";
                document.form_chk.submit();

                $('.niceChker').show();
            } else{
                lgkorUI.alert(result.data.alert.desc, {
                    title: result.data.alert.title
                });
    
                if(lgkorUI.stringToBool(result.data.success)){
                    setInputData('safekey', result.data.safekey);
                    setInputData('nicePersonLogSeq', result.data.nicePersonLogSeq);
                    setInputData('creditInquire', 'Y');

                    step1Block.find('input[name=registFrontNumber]').prop("disabled", true);
                    step1Block.find('input[name=registBackFirst]').prop("disabled", true);

                    //step1LastValidation();             
                } else{
                    setInputData('creditInquire', 'N');
                }
            }
        }, ajaxMethod);
    }

    function step1LastValidation(){
        var step1Value = step1Validation.getValues();
        var result = step1Validation.validate();
        var isDA = result.validItem.detailAddress;
        if(!isDA){
            stepAccordion.expand(1, true)
        }
    }

    //설치 정보 입력 타입 선택...
    function changeInstallInputType(type){
        if(type){
            var step1Value = step1Validation.getValues();

            for(var str in step1Value){
                step2Block.find('input[name=' + str +']').val(step1Value[str]);
            }
            step2Block.find('input[name=userTelephone]').val(contractUserPhone);

            step2Block.find('input[name=detailAddress]').val(step1Validation.getValues('detailAddress'));

            step2Validation.validate(["userName", "userPhone", "userTelephone", "zipCode", "userAddress", "detailAddress"]);
        } else{
            step2Block.find('input').not('[name=installInpuType], [name=preVisitRequest]').val("")
        }
        setInputData('installAbled', "N");
        step2Block.find('button.installAbledConfirm').prop('disabled', false);
    }

    //설치정보 배송지목록 선택 시
    function setInstallInfos(data){
        step2Block.find('input[name=userName]').val(data.receiverUser);
        step2Block.find('input[name=userPhone]').val(data.phoneNumber);
        step2Block.find('input[name=userTelephone]').val(data.telephoneNumber);
        step2Block.find('input[name=zipCode]').val(data.zipCode);
        step2Block.find('input[name=userAddress]').val(data.userAddress);
        step2Block.find('input[name=detailAddress]').val(data.detailAddress);
        
        step2Block.find('input[name=installInpuType]').prop('checked', false);

        step2Block.data("infoType", "list");
    }
    //설치정보 주소찾기 선택시
    function setInstallInfosSearch(){
        step2Block.find('input[name=installInpuType]').prop('checked', false);
    }

    //납부카드확인...
    function setCardAbledConfirm(){
        var paymethod = paymentFiledValidation();
        if(paymethod == "") return false;

        var values = cardValidation.getValues();
        var sendata = {
            confirmType: "card",
            cardCompany: values.paymentCard,
            cardNumber: values.paymentCardNumber,
            cardPeriod: values.paymentCardPeriod
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CARD_ABLED_URL, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            var chk = lgkorUI.stringToBool(result.data.success);
            setInputData('cardAbled', result.data.success);            
            step3Block.find('.arsAgreeRequest').prop('disabled', !chk);

            if(chk){
                cardInputData = {
                    paymentCard: values.paymentCard,
                    paymentCardNumber: values.paymentCardNumber,
                    paymentCardPeriod: values.paymentCardPeriod
                }
                selectPaymentMethod = "card";
            } else{
                cardInputData = {};
            }
        }, ajaxMethod);
    }
    //납부계좌확인...
    function setBankAbledConfirm(){
        var paymethod = paymentFiledValidation();
        if(paymethod == "") return false;

        var values = bankValidation.getValues();
        var sendata = {
            confirmType: "bank",
            bankUser: bankValidation.getValues('bankUserName'),
            bankName: values.paymentBank,
            bankNumber: values.paymentBankNumber
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CARD_ABLED_URL, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });




            var chk = lgkorUI.stringToBool(result.data.success);
            setInputData('cardAbled', result.data.success);            
            step3Block.find('.arsAgreeRequest').prop('disabled', !chk);

            if(chk){
                bankInputData = {
                    bankUserName: bankValidation.getValues('bankUserName'),
                    paymentBank: values.paymentBank,
                    paymentBankNumber: values.paymentBankNumber
                }
                selectPaymentMethod = "bank";
            } else{
                bankInputData = {};
            }
        }, ajaxMethod);
    }

    //ARS출금동의 신청...
    function setArsAgreeConfirm(){
        var chk = paymentValidation();
        if(!chk){
            setInputData('cardAbled', "N");       
            return;
        }        

        lgkorUI.showLoading();

        setInputData('arsAgree', "N");

        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_URL, 180000, {}, function(result){            
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            setInputData('arsAgree', result.data.success);
        }, ajaxMethod, null, true);
    }

    function changePrevisitRequest(abled){
        if(abled == "Y"){
            step2Block.find('input[name=preVisitAgree]').prop('checked', false);
        }
    }

    //우편번호 찾기 연동...
    function getPostCode(item, idx){
        addressFinder.open(function(data){
            item.find('input[name=zipCode]').val(data.zonecode);
            item.find('input[name=userAddress]').val(data.roadAddress);
            item.find('input[name=detailAddress]').val('');
            
            if(idx){
                setInputData('installAbled', "N");
                step2Block.find('input[name=detailAddress]').prop('disabled', false);
                step2Block.find('button.installAbledConfirm').prop('disabled', false);

                setInstallInfosSearch();
            } else{
                contractUserPhone = "";
            }
        });
    }

    //배송지 목록 팝업 오픈...
    function openDeliveryPop(item, idx){
        deliveryMnger.open(function(data){
            item.find('input[name=zipCode]').val(data.zipCode);
            item.find('input[name=userAddress]').val(data.userAddress);
            item.find('input[name=detailAddress]').val(data.detailAddress);

            $('.err-address').hide();

            if(idx){
                setInputData('installAbled', "N");
                step2Block.find('input[name=detailAddress]').prop('disabled', false);
                step2Block.find('button.installAbledConfirm').prop('disabled', false);

                setInstallInfos(data);
            } else{
                contractUserPhone = data.telephoneNumber;
            }
        });
    }

    function openRentalAgreePopup(){
        $('#popup-rentalAgree').vcModal()
        .on('modalhide', function(e){
            var chk = getRentalAgreeAllChecked();
            rentalAgreeChker.prop('checked', chk);
        });

        var scrollTarget;
        if($('#popup-rentalAgree').find('.careshipUserChecked').length){
            $('#popup-careshipAgree-userCheck').on('modalhide', function(){
                setTimeout(function(){$('#popup-rentalAgree .ui_all_checker').focus();}, 300);
            }).vcModal();

            scrollTarget = ".careshipUserChecked";
        }

        if($('#popup-rentalAgree').find('.rentalUserChecked').length){
            $('#popup-rentalAgree-userCheck').on('modalhide', function(){
                setTimeout(function(){$('#popup-rentalAgree .ui_all_checker').focus();}, 300);
            }).vcModal();

            scrollTarget = ".rentalUserChecked";
        }
        // setTimeout(function(){
        //     var movetop = $('#popup-rentalAgree').find(scrollTarget).position().top - 30;
        //     $('#popup-rentalAgree').find('.pop-conts').scrollTop(movetop);
        // }, 100);
    }

    function openPrivacyPopup(){
        $('#popup-privacy').vcModal()
        .on('modalhide', function(e){
            var chk = privacyAgreeAllChker.getAllChecked();
            privacyAgreeChker.prop('checked', chk);
            creditInquireButton.prop('disabled', !chk);
        });
    }
    function setPrivacyAgreeStatus(status){
        if(status){
            privacyAgreeOkButton.css('cursor', 'pointer').removeClass('disabled');
            if(!privacyAgreeOkButton.hasClass('pink')) privacyAgreeOkButton.addClass('pink');
        } else{
            privacyAgreeOkButton.css('cursor', 'default').removeClass('pink');
            if(!privacyAgreeOkButton.hasClass('disabled')) privacyAgreeOkButton.addClass('disabled');
        }
    }
    function setPrivacyAgreePop(status){
        $('#popup-privacy').find('input[type=checkbox]').prop('checked', status);
        setPrivacyAgreeStatus(status)
    }

    function setRentalAgreePop(status){
        $('#popup-rentalAgree').find('input[type=checkbox]').prop('checked', status);
        setRentalAgreeStatus(status)
    }
    function setRentalAgreeStatus(status){
        if(status){
            rentalAgreeOkButton.css('cursor', 'pointer').removeClass('disabled');
            if(!rentalAgreeOkButton.hasClass('pink')) rentalAgreeOkButton.addClass('pink');
        } else{
            rentalAgreeOkButton.css('cursor', 'default').removeClass('pink');
            if(!rentalAgreeOkButton.hasClass('disabled')) rentalAgreeOkButton.addClass('disabled');
        }
    }
    function rentalAgreeChecked(){
        var chked = getRentalAgreeAllChecked();
        setRentalAgreeStatus(chked);
    }
    function getRentalAgreeAllChecked(){
        var chked = 0;
        $('#popup-rentalAgree').find('input[type=checkbox]').not('[name=rentalAgree-infoUtility], [name=all-chk3]').each(function(idx, item){
            if($(this).prop('checked')) chked++;
        });
        if(chked < 3) return false;
        else return true;
    }

    function getInputData(iptname){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        return ipt.val();
    }

    function setInputData(iptname, value){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        ipt.val(value);
    }

    function changeProductPriceInfo(){
        var newPriceInfo = vcui.clone(productPriceInfo);
        if(cardDiscountPrice > 0){
            newPriceInfo.total.price = parseInt(newPriceInfo.total.price) - cardDiscountPrice;
            newPriceInfo.list.push({
                text: "제휴카드 할인",
                price: "최대 월 -" + vcui.number.addComma(cardDiscountPrice) + "원",
                appendClass: "sale"
            })
        }

        if(newPriceInfo.total.price < 0) newPriceInfo.total.price = 0;
        requestInfoBlock.updatePaymentInfo(newPriceInfo);
    }

    //1년 요금 선납할인 체크
    function setPrepaymentChecked(){
        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(PREPAYMENT_CHECKED_URL, {}, function(result){
            if(result.data.success == "Y"){
                lgkorUI.alert("", {
                    title: result.data.alert.title
                });

                step3Block.find('input[name=rdo04]').each(function(idx, item){
                    if($(item).val() == "N") $(item).prop('checked', true);
                    else $(item).prop('checked', false);
                })
            }
            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    //청약신청하기...
    function rentalRequest(){
        var chk = false;
        //stepAccordion.expand(1, true)
        var stepperStatus = stepAccordion.getActivate();
        if(setStep1Validation()){
            if(stepperStatus.content.length < 2) stepAccordion.expand(1, true);

            if(setStep2Validation()){
                if(stepperStatus.content.length < 3) stepAccordion.expand(2, true);

                if(setStep3Validation()){
                    chk = true;
                }
            }
        }

        if(!chk){
            return;
       }

        var agreechk = requestAgreeChecker.getAllChecked();
        if(!agreechk){
            $(window).trigger("toastshow", "청약 신청을 위해 케어솔루션 청약신청 고객 동의가 필요합니다.");
            return;
        }        

        var step1Value = step1Validation.getValues(); 
        var step2Value = step2Validation.getValues();
        var cardValue = cardValidation.getValues();
        var bankValue = bankValidation.getValues();
        var payment = getPaymentMethod() == "bank";

        var notes = step2Block.find('input[name=installRequriement]').val();
        var instReqDate = step2Value.inatallDate;
        var collectRequest = step2Block.find('input[name=collectRequest]:checked').val();
        var preVisitRequest = step2Block.find('input[name=preVisitRequest]:checked').val();

        if(allOwnedProductYn == "Y"){
            notes = "";
            instReqDate = "";
            collectRequest = "";
            preVisitRequest = "";
        } else{
            if(beforeVisitModelFlag == "N"){
                preVisitRequest = "";
            }
        }

        var sendata = {
            CUST_REG_NO: step1Value.registFrontNumber,
            CUST_POST_CODE: step1Value.zipCode,
            CUST_BAS_ADDR: step1Value.userAddress,
            CUST_DTL_ADDR: step1Value.detailAddress,
            EMAIL: step1Value.userEmail,
            REG_FIRST_DIGIT: step1Value.registBackFirst,
            PREPAY_FLAG: step3Block.find('input[name=rdo04]:checked').val(),
            TRANS_TYPE: payment ? "B" : "C",
            TRANS_MEM_NAME: bankValidation.getValues('bankUserName'),
            TRANS_CORP_NAME: payment ? bankValue.paymentBank : cardValue.paymentCard,
            TRANS_ACCOUNT_NUM: payment ? bankValue.paymentBankNumber : cardValue.paymentCardNumber,
            TRANS_CARD_EXPIRY: cardValue.paymentCardPeriod,
            CARD_REQ_YN: step3Block.find('input[name=cardApplication]:checked').val(),
            CARD_CORP_TYPE: step3Block.find('select[name=associatedCard] option:selected').val(),
            RCV_NAME: step2Value.userName,
            RCV_TEL_NO: step2Value.userTelephone,
            RCV_HP_NO: step2Value.userPhone,
            RCV_POST_CODE: step2Value.zipCode,
            RCV_BAS_ADDR: step2Value.userAddress,
            RCV_DTL_ADDR: step2Value.detailAddress,
            INFO_USED_AGREE: $('#popup-rentalAgree').find('input[name=rentalAgree-infoUtility]').prop('checked') ? "Y" : "N",
            MEM_POINT_USED: step3Block.find('input[name=chk03-3]').prop('checked') ? "Y" : "N",
            isAgree: step3Block.find('input[name=useMemPoint]').prop('checked'),
            INSTALL_PLACE: step2Value.inatallPlace,

            NOTES: notes,
            INST_REQ_DATE: instReqDate,
            collectRequest: collectRequest,
            preVisitRequest: preVisitRequest
        };

        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(REQUEST_SUBMIT_URL, sendata, function(result){
            if(result.data.success == "Y"){
                isBeforeUnload = false;

                var endtitle = "";
                var endesc = "";
                var endbntname = "";
                if(result.data.endTypeFlag == "C"){
                    endtitle = "케어십 청약 안내";
                    endesc = "케어십 청약이 완료되었습니다.해당 케어십 제품은 추가로 제품 주문이 필요합니다.<br><br>주문 실패시, 7일이내 마이페이지 > 쇼핑관리에서 주문가능합니다.";
                    endbntname = "제품 주문하러 가기";
                } else if(result.data.endTypeFlag == "M"){
                    endtitle = "케어솔루션/케어십 청약 안내";
                    endesc = "케어솔루션/케어십 청약이 완료되었습니다. 해당 케어십 제품은 추가로 제품 주문이 필요합니다.<br><br></br>주문 실패시, 7일이내 마이페이지 > 쇼핑관리에서 주문가능합니다.";
                    endbntname = "케어십 제품 주문하러 가기";
                }

                if(endtitle != ""){
                    lgkorUI.hideLoading();

                    lgkorUI.alert(endesc, {
                        title: endtitle,
                        okBtnName: endbntname,
                        ok: function(){
                            location.href= result.data.sendUrl;
                        }
                    });
                } else{
                    location.href= result.data.sendUrl;
                }
            } else{
                lgkorUI.hideLoading();

                lgkorUI.alert("", {
                    title: result.data.alert.title
                });
            }
        }, ajaxMethod);
    }

    $(document).ready(function(){
        init();
    })
})();