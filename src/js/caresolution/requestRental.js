(function(){
    var CREDIT_INQUIRE_URL;
    var INSTALL_ABLED_URL;
    var CARD_ABLED_URL;
    var ARS_AGREE_URL;

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

    function init(){
        console.log("requestRental Start!!!");
    
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

        step1Block = $('.requestRentalForm ul li:nth-child(1)');
        step2Block = $('.requestRentalForm ul li:nth-child(2)');
        step3Block = $('.requestRentalForm ul li:nth-child(3)');

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

        var register = {
            registFrontNumber:{
                required: true,
                errorMsg: "생년월일을 다시 확인해주세요.",
                msgTarget: '.err-regist'
            },
            registBackFirst: {
                required: true,
                errorMsg: "생년월일을 다시 확인해주세요.",
                msgTarget: '.err-regist'
            },
            userEmail:{
                required: true,
                errorMsg: "이메일 주소를 다시 확인해주세요.",
                msgTarget: '.err-block',
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            zipCode: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address'
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address'
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-address'
            }
        }
        step1Validation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(1)',{register:register});


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
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address-install'
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address-install'
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
            }
        }
        step2Validation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(2)',{register:register});

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
        cardValidation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(3) .by-card',{register:register});

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
        bankValidation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(3) .by-bank',{register:register});

        deliveryMnger = new AddressManagement("#popup-delivery-list", "#popup-delivery-address");
        addressFinder = new AddressFind();
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
        $('#popup-privacy').on('click', '.btn-group .btn:nth-child(1)', function(e){
            setPrivacyAgreePop(false);
        });
        privacyAgreeOkButton.on('click', function(e){
            if(privacyAgreeAllChker.getAllChecked()){
                $('#popup-privacy').vcModal('close');
            }
        });


        rentalAgreeChker.on('change', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                openRentalAgreePopup();
            } else{
                setRentalAgreePop(false);
            }
        })
        $('#popup-rentalAgree').on('click', '.btn-group .btn:nth-child(1)', function(e){
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
            var idx = chkername.indexOf('rentalAgree')
            if(idx < 0) privacyAgreeAllChker.setChecked(chkername, true);
            else{
                rentalAgreeAllChker.setChecked(chkername, true);
                rentalAgreeChecked();
            }

            var idname = $(this).closest('.popup-wrap').attr('id');
            $("#"+idname).vcModal('close');
        }).on('click', '.btn-group .agree-cancel', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            var idx = chkername.indexOf('rentalAgree')
            if(idx < 0) privacyAgreeAllChker.setChecked(chkername, false);
            else{
                rentalAgreeAllChker.setChecked(chkername, false);
                rentalAgreeChecked();
            }
        });

        $('.search-postcode').on('click', function(e){
            e.preventDefault();

            getPostCode($(this).closest('.conts'));
        });

        $('.openDelivery').on('click', function(e){
            e.preventDefault();

            openDeliveryPop($(this).closest('.conts'))
        });

        $('input[name=nicePopChker]').on('change', function(e){
            setCreditInquire();
        })

        step2Block.on('change', 'input[name=installInpuType]', function(e){
            changeInstallInputType($(this).val());
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
        });

        $('input[name=rentalAgree]').on('change', function(){
            var chker = $(this).prop('checked');
            if(chker){
                $('#popup-rentalAgree').vcModal();
            }
        });

        $('#popup-cardApply').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step3Block.find('input[name=cardApplyaAgree]').prop('checked', chk);
            step3Block.find('.sendMessage').prop('disabled', !chk);

            if(chk) $('#popup-cardApply').vcModal('close');
        });

        $('#popup-selfClearing').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step3Block.find('input[name=selfClearingAgree]').prop('checked', chk);

            if(chk) $('#popup-selfClearing').vcModal('close');
        });

        step1Validation.on('validerror', function(e, data){
            if(Object.keys(data).length == 1){
                if(data.chkPrivacy){
                    $(window).trigger("toastshow", "개인정보 및 신용정보 제공 동의가 필요합니다.");
                }
            }
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
        console.log("step1 validation start!!");
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
                }
            }
        }

        return completed;
    }

    //설치 정보 입력 밸리데이션...
    function setStep2Validation(){
        var completed = false;
        console.log("step2 validation start!!");
        var result = step2Validation.validate();
        if(result.success){
            console.log("step2Validation.validate(); Success!!!");

            var data = getInputData('installAbled');
            console.log("setStep2Validation() > installAbled :", data);

            var chk = false;
            if(data == "Y"){
                chk = compareInstallAdress();
                console.log("chk :", chk)
            }

            if(!chk){
                lgkorUI.alert("", {
                    title: "설치 가능여부 확인이 필요합니다."
                });
            }

            completed = chk;
        } else{
            console.log("step2Validation.validate(); Fail!!!", result.validItem);
        }

        return completed;
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

        paymethod = step3Block.find('.new-type > ul > li.on').index();
        result = paymethod ? cardValidation.validate() : bankValidation.validate();
        if(result.success != "Y") return false;

        chk = getInputData('arsAgree');
        if(!chk !== "Y") return false;

        chk = step3Block.find('input[name=selfClearingAgree]').prop('checked');
        if(!chk) return false;
        
        console.log("step3Validation.validate(); Success!!!");
        
        
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
        console.log("setInstallAdress() >", installAdress)
    }
    //저장한 배송지역 주소 비교...
    function compareInstallAdress(){
        var chk = 0;
        var values = step2Validation.getValues();
        for(var str in installAdress){
            console.log("=========================================")
            console.log("installAdress[", str, '] :', installAdress[str])
            console.log("values[", str, '] :', values[str])
            console.log("=========================================")
            if(installAdress[str] !== values[str]) break;
            console.log("OK~~~")
            chk++;
        }

        console.log("compareInstallAdress(); > chk :", chk)

        if(chk < 3) return false;
        else return true;
    }

    //설치 가능여부 확인...
    function setInstallAbledConfirm(){
        var values = step2Validation.getValues();

        var errmsg = "";
        if(values.zipCode == "" || values.userAddress == "") errmsg = "주소를 확인해주세요.";
        else if(values.detailAddress == "") errmsg = "상세주소를 입력해주세요."

        if(errmsg != ""){
            lgkorUI.alert("", {
                title: errmsg
            });

            return;
        }

        installAdress = {};

        var code = [];
        $('.order-list li').each(function(idx, item){
            code.push($(item).data('itemId'));
        });
        var sendata = {
            rtModelSeq: code.join(','),
            waterTestYn: getInputData('waterTestYn'),
            zipCode: step2Validation.getValues("zipCode")
        }

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(INSTALL_ABLED_URL, sendata, function(result){
            console.log("success :", result.data.success);
            var abled = "N";
            if(lgkorUI.stringToBool(result.data.success)){
                lgkorUI.alert(result.data.alert.desc, {
                    title: result.data.alert.title
                });
                abled = "Y";
            } else{
                if(result.data.productStatus){
                    console.log("productStatus :", result.data.productStatus);
                    for(var str in result.data.productStatus){
                        var modelID = result.data.productStatus[str].modelID;
                        var installAbled = result.data.productStatus[str].installAbled;
                        var listItem = $('.order-list .order-item[data-item-id=' + modelID + ']');
                        if(installAbled == "Y"){
                            $(listItem).removeClass('disabled');
                        } else{
                            if(!$(listItem).hasClass('disabled')) $(listItem).addClass('disabled');
                            $(listItem).find('.disabled-message p').text(result.data.productStatus[str].availableMessage);
                            requestInfoBlock.setItemInfoDisabled(modelID, true)
                        }
                    }
                    productPriceInfo = result.data.productPriceInfo;
                    changeProductPriceInfo();

                    var total = parseInt(productPriceInfo.total.count);
                    if(total) abled = "Y";
                }
                
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

            console.log("setInstallAbledConfirm() abled :", abled);
            
            if(abled == "Y") setInstallAdress();
            
            setInputData('installAbled', abled);
        });
    }

    //신용정보 조회...
    function setCreditInquire(){
        var step1Value = step1Validation.getValues();
        var result = step1Validation.validate();
        if(result.validItem.registFrontNumber || result.validItem.registBackFirst || result.validItem.userEmail || result.validItem.zipCode){
            return;
        }

        var sendata = {
            rentalCareType: getInputData('rentalCareType'),
            registFrontNumber: step1Value.registFrontNumber,
            registBackFirst: step1Value.registBackFirst,
            userEmail: step1Value.userEmail,
            zipCode: step1Value.zipCode
        }
        console.log("sendata:",sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CREDIT_INQUIRE_URL, sendata, function(result){
            if(result.data.success == "P"){
                window.open('', 'nicePopUp', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
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
                } else{
                    setInputData('creditInquire', 'N');
                }
            }
        });
    }

    //설치 정보 입력 타입 선택...
    function changeInstallInputType(type){
        if(type == "equal"){
            var step1Value = step1Validation.getValues();

            for(var str in step1Value){
                step2Block.find('input[name=' + str +']').val(step1Value[str]);
            }

            var telephone = step2Block.find('input[name=userTelephone]');
            telephone.val(telephone.data('equalNumber'));

            step2Block.find('input[name=detailAddress]').val(step1Validation.getValues('detailAddress'));
        } else{
            step2Block.find('input').not('[name=installInpuType], [name=preVisitRequest]').val("")
        }
    }

    //납부카드확인...
    function setCardAbledConfirm(){
        var values = cardValidation.getValues();
        var sendata = {
            confirmType: "card",
            cardCompany: values.paymentCard,
            cardNumber: values.paymentCardNumber,
            cardPeriod: values.paymentCardPeriod
        }
        console.log("setCardAbledConfirm(); >", sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CARD_ABLED_URL, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            var chk = lgkorUI.stringToBool(result.data.success);
            setInputData('cardAbled', result.data.success);            
            step3Block.find('.arsAgreeRequest').prop('disabled', !chk);
        });
    }
    //납부계좌확인...
    function setBankAbledConfirm(){
        var values = bankValidation.getValues();
        var sendata = {
            confirmType: "bank",
            bankUser: bankValidation.getValues('bankUserName'),
            bankName: values.paymentBank,
            bankNumber: values.paymentBankNumber
        }
        console.log("setBankAbledConfirm(); >", sendata)
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(CARD_ABLED_URL, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            var chk = lgkorUI.stringToBool(result.data.success);
            setInputData('cardAbled', result.data.success);            
            step3Block.find('.arsAgreeRequest').prop('disabled', !chk);
        });
    }

    //ARS출금동의 신청...
    function setArsAgreeConfirm(){
        lgkorUI.requestAjaxData(ARS_AGREE_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            setInputData('arsAgree', result.data.success);
        });
    }

    function changePrevisitRequest(abled){
        if(abled == "Y"){
            step2Block.find('input[name=preVisitAgree]').prop('checked', false);
        }
    }

    //우편번호 찾기 연동...
    function getPostCode(item){
        addressFinder.open(function(data){
            item.find('input[name=zipCode]').val(data.zonecode);
            item.find('input[name=userAddress]').val(data.roadAddress);
            item.find('input[name=detailAddress]').val('');
        });
    }

    //배송지 목록 팝업 오픈...
    function openDeliveryPop(item){
        deliveryMnger.open(function(data){
            item.find('input[name=zipCode]').val(data.zipCode);
            item.find('input[name=userAddress]').val(data.userAddress);
            item.find('input[name=detailAddress]').val(data.detailAddress);
        });
    }

    function openRentalAgreePopup(){
        $('#popup-rentalAgree').vcModal()
        .on('modalhide', function(e){
            var chk = getRentalAgreeAllChecked();
            rentalAgreeChker.prop('checked', chk);
        });
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
        requestInfoBlock.updatePaymentInfo(newPriceInfo);
    }

    //청약신청하기...
    function rentalRequest(){
        var chk = false;
        if(setStep1Validation()){
            if(setStep2Validation()){
                if(setStep3Validation()){
                    chk = true;
                }
            }
        }

        if(!chk){
            lgkorUI.alert("", {
                title:'입력정보를 확인해주세요.'
            });
            return;
       }

        var agreechk = requestAgreeChecker.getAllChecked();
        console.log(agreechk)
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();