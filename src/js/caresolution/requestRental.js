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

    var creditInquireButton;

    var requestInfoBlock, requestInfoY;

    var step1Block, step2Block, step3Block;
    var step1Validation, step2Validation, cardValidation, bankValidation;

    var deliveryMnger;
    var addressFinder;

    var step = 0;

    //var isPostCode = false;

    var addHtmls = {
        installAbled: '<p class="comp">설치 가능 지역</p>'
    }

    function init(){
        console.log("requestRental Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/accordion', 'ui/modal', 'ui/validation'], function () {             
            setting();
            bindEvents();
        });

        //load(postcodeLoadComplete);
    }

    /*
    function _importApiJs(){
        var defer = $.Deferred();
        var script = document.createElement('script');

        script.onload = function () {
            defer.resolve();
        };
        script.onerror = function(e){ 
            defer.reject('map api를 로드할수 없습니다.');          
        }
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";        
        document.head.appendChild(script);  

        return defer.promise();
    }
    function load(callback){
        if(window.daum && window.daum.Postcode){
            if(callback) callback();
        }else{
            _importApiJs().done(function(){
                if(callback) callback();
            }).fail(function(e){
                alert(e);
            }) 
        } 
    }

    function postcodeLoadComplete(){
        console.log("postcodeLoadComplete");
        isPostCode = true;
    }
*/

    //초기 셋팅...
    function setting(){
        CREDIT_INQUIRE_URL = $('.requestRentalForm').data('creditInquireUrl');
        INSTALL_ABLED_URL = $('.requestRentalForm').data('installAbledUrl');
        CARD_ABLED_URL = $('.requestRentalForm').data('cardAbledUrl');
        ARS_AGREE_URL = $('.requestRentalForm').data('arsAgreeUrl');

        step1Block = $('.requestRentalForm ul li:nth-child(1)');
        step2Block = $('.requestRentalForm ul li:nth-child(2)');
        step3Block = $('.requestRentalForm ul li:nth-child(3)');

        requestInfoBlock = $('.col-right');
        requestInfoY = requestInfoBlock.offset().top;
        if(!vcui.detect.isMobile){
            requestInfoBlock.data('infoHidden', true);
            requestInfoBlock.find('.item-info').hide();
        }

        $('.agree-box').vcCheckboxAllChecker();
        requestAgreeChecker = $('.agree-box').vcCheckboxAllChecker('instance');
        requestButton = $('.agree-box').find('button.btn');

        $('.ui_accordion').vcAccordion();
        stepAccordion = $('.ui_accordion').vcAccordion('instance');

        privacyAgreeChker = $('input[name=chkPrivacy]');


        $('#popup-privacy').vcCheckboxAllChecker();
        privacyAgreeAllChker = $('#popup-privacy').vcCheckboxAllChecker('instance');

        privacyAgreeOkButton = $('#popup-privacy .btn-group .btn:nth-child(2)').css({cursor:'default'});

        creditInquireButton = $('.creditInquire');

        var register = {
            userEmail:{
                required: true,
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        }
        step1Validation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(1)',{register:register});


        step2Validation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(2)');

        cardValidation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(3) .by-card');
        bankValidation = new vcui.ui.Validation('.requestRentalForm ul li:nth-child(3) .by-bank');

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

        creditInquireButton.on('click', function(e){
            e.preventDefault();

            setCreditInquire();
        })

        $('.popup-wrap').on('click', '.btn-group .agree-confirm', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            privacyAgreeAllChker.setChecked(chkername, true);

            var idname = $(this).closest('.popup-wrap').attr('id');
            $("#"+idname).vcModal('close');
        }).on('click', '.btn-group .agree-cancel', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            privacyAgreeAllChker.setChecked(chkername, false);
        });

        $('.search-postcode').on('click', function(e){
            e.preventDefault();

            getPostCode($(this).closest('.conts'));
        });

        $('.openDelivery').on('click', function(e){
            e.preventDefault();

            openDeliveryPop($(this).closest('.conts'))
        });

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
            }
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
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();
            setArsAgreeConfirm();
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

        if(!vcui.detect.isMobile){
            $(window).on('scroll', function(e){
                setScrollMoved();
            });
            setScrollMoved();
        }
    }

    function setScrollMoved(){
        var winwidth = $(window).width();
        if(winwidth > 1024){
            var scrolltop = $(window).scrollTop();
            if(scrolltop > requestInfoY-54){
                if(!requestInfoBlock.hasClass('fixed')) requestInfoBlock.addClass('fixed');
    
                var formy = $('.requestRentalForm').offset().top;
                var isHidden = requestInfoBlock.data('infoHidden');
                if(scrolltop > formy){
                    if(isHidden){
                        requestInfoBlock.data('infoHidden', false);
                        requestInfoBlock.find('.item-info').slideDown();
                    }
                } else{
                    if(!isHidden){
                        requestInfoBlock.data('infoHidden', true);
                        requestInfoBlock.find('.item-info').slideUp();
                    }
                }

                var footery = -scrolltop + $('footer').first().offset().top - 100;
                var infoheight = requestInfoBlock.find('.info-area').outerHeight(true);
                if(footery < infoheight){
                    console.log(infoheight)
                    requestInfoBlock.find('.info-area').css({y:footery - infoheight})
                } else{
                    requestInfoBlock.find('.info-area').css({y:0})
                }
            } else{
                if(requestInfoBlock.hasClass('fixed')) requestInfoBlock.removeClass('fixed');
            }
        } else{
            if(requestInfoBlock.hasClass('fixed')) requestInfoBlock.removeClass('fixed');

            requestInfoBlock.find('.item-info').show();
        }
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
        if(result.success){
            console.log("step1Validation.validate(); Success!!!");

            completed = $('.requestRentalForm').data('creditInquire');
        } else{
            console.log(result.validItem);
        }

        return completed;
    }

    //설치 정보 입력 밸리데이션...
    function setStep2Validation(){
        var completed = false;
        var result = step2Validation.validate();
        if(result.success){
            console.log("step2Validation.validate(); Success!!!");

            completed= $('.requestRentalForm').data('installAbled');
        } else{
            console.log(result.validItem);
        }

        return completed;
    }

    //납부 정보 입력 밸리데이션...
    function setStep3Validation(){
        var cardApply, chk, value, paymethod, result;
        cardApply = step3Block.find('input[name=cardApplication]:checked').val();
        if(cardApply == "Y"){
            chk = step3Block.find('input[name=cardApplyaAgree]').prop('checked');
            if(!chk) return false;

            value = step3Block.find('select[name=associatedCard] option:selected').val();
            if(value == "") return false;
        }

        paymethod = step3Block.find('.new-type > ul > li.on').index();
        result = paymethod ? cardValidation.validate() : bankValidation.validate();
        if(result.success != "Y") return false;

        chk = $('.requestRentalForm').data('arsAgree');
        if(!chk) return false;

        chk = step3Block.find('input[name=selfClearingAgree]').prop('checked');
        if(!chk) return false;
        
        
        return true;
    }

    //설치 가능여부 확인...
    function setInstallAbledConfirm(){
        var values = step2Validation.getValues();
        if(values.zipCode == "" || values.userAddress == ""){
            lgkorUI.alert('', {
                title:'상세주소를 입력해주세요.'
            });

            return;
        }

        lgkorUI.requestAjaxData(INSTALL_ABLED_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.success == "Y") $('.requestRentalForm').data('installAbled', true);
            else $('.requestRentalForm').data('installAbled', false);
        });
    }

    //신용정보 조회...
    function setCreditInquire(){
        lgkorUI.requestAjaxData(CREDIT_INQUIRE_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.success == "Y") $('.requestRentalForm').data('creditInquire', true);
            else $('.requestRentalForm').data('creditInquire', false);
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
        lgkorUI.requestAjaxData(CARD_ABLED_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            var chk = result.data.success == "Y" ? true : false;
            $('.requestRentalForm').data('cardAbled', chk);            
            step3Block.find('.arsAgreeRequest').prop('disabled', !chk);
        });
    }

    //ARS출금동의 신청...
    function setArsAgreeConfirm(){
        lgkorUI.requestAjaxData(ARS_AGREE_URL, {}, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            var chk = result.data.success == "Y" ? true : false;
            $('.requestRentalForm').data('arsAgree', chk);
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
            lgkorUI.alert('', {
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