(function(){
    var $requestAgreeChecker;
    var $requestButton;

    var $stepAccordion;

    var $privacyAgreeChker;
    var $privacyAgreeAllChker;
    var $privacyAgreeOkButton;

    var $creditInquireButton;

    var step1Block, step2Block, step3Block;
    var step1Validation, step2Validation, step3Validation;

    var step = 0;

    var isPostCode = false;

    var addHtmls = {
        installAbled: '<p class="comp">설치 가능 지역</p>'
    }

    function init(){
        console.log("requestRental Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/accordion', 'ui/modal', 'ui/validation'], function () {             
            setting();
            bindEvents();
        });

        load(postcodeLoadComplete);
    }

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

    function setting(){
        step1Block = $('.accordion-section ul li:nth-child(1)');
        step2Block = $('.accordion-section ul li:nth-child(2)');
        step3Block = $('.accordion-section ul li:nth-child(3)');

        $('.agree-box').vcCheckboxAllChecker();
        $requestAgreeChecker = $('.agree-box').vcCheckboxAllChecker('instance');
        $requestButton = $('.agree-box').find('button.btn');

        $('.ui_accordion').vcAccordion();
        $stepAccordion = $('.ui_accordion').vcAccordion('instance');

        $privacyAgreeChker = $('input[name=chkPrivacy]');


        $('#popup-privacy').vcCheckboxAllChecker();
        $privacyAgreeAllChker = $('#popup-privacy').vcCheckboxAllChecker('instance');

        $privacyAgreeOkButton = $('#popup-privacy .btn-group .btn:nth-child(2)').css({cursor:'default'});

        $creditInquireButton = $('.creditInquire');

        var register = {
            userEmail:{
                required: true,
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        }
        step1Validation = new vcui.ui.Validation('.accordion-section ul li:nth-child(1)',{register:register});
    }

    function bindEvents(){
        $stepAccordion.on('accordionbeforeexpand', function(e, data){
            if(data.index > step){

                if(!setNextStep()){
                    e.preventDefault();
                    return;
                }
                
                var contop = $(data.header).offset().top;
                $('html, body').stop().animate({scrollTop:contop}, 350);
            }
        });

        $requestButton.on('click', function(e){
            rentalRequest();
        });

        $privacyAgreeChker.on('change', function(e){
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

        $privacyAgreeAllChker.on('allCheckerChange', function(e, status){
            setPrivacyAgreeStatus(status);
        });

        $('#popup-privacy').on('click', '.btn-group .btn:nth-child(1)', function(e){
            setPrivacyAgreePop(false);
        });
        $privacyAgreeOkButton.on('click', function(e){
            if($privacyAgreeAllChker.getAllChecked()){
                $('#popup-privacy').vcModal('close');
            }
        });

        $creditInquireButton.on('click', function(e){
            e.preventDefault();

            setCreditInquire();
        })

        $('.popup-wrap').on('click', '.btn-group .agree-confirm', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            $privacyAgreeAllChker.setChecked(chkername, true);

            var idname = $(this).closest('.popup-wrap').attr('id');
            $("#"+idname).vcModal('close');
        }).on('click', '.btn-group .agree-cancel', function(e){
            e.preventDefault();

            var chkername = $(this).data('chkName');
            $privacyAgreeAllChker.setChecked(chkername, false);
        });

        $('.search-postcode').on('click', function(e){
            e.preventDefault();

            getPostCode($(this).closest('.conts'));
        });

        step1Validation.on('errors', function(e,data){
            console.log('errors', data); // 이걸 어떤식으로 쓸까?

        }).on('success', function(data){

            console.log(step1Validation.getValues());
            console.log('success');

        });


        step2Block.on('change', 'input[name=installInpuType]', function(e){
            changeInstallInputType($(this).val());
        }).on('change', 'input[name=preVisitRequest]', function(e){
            changePrevisitRequest($(this).val());
        }).on('change', 'input[name=preVisitAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk) $('#popup-previsit').vcModal();
        }).on('click', '.input-mix-wrap .cell .btn-link', function(e){
            e.preventDefault();
            $('#popup-previsit').vcModal();
        });

        $('#popup-previsit').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step2Block.find('input[name=preVisitAgree]').prop('checked', chk);

            if(chk) $('#popup-previsit').vcModal('close');
        });


        step3Block.on('change', 'input[name=cardApplyaAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk) $('#popup-cardApply').vcModal();
        }).on('click', '.input-mix-wrap .cell .btn-link', function(e){
            e.preventDefault();
            $('#popup-cardApply').vcModal();
        }).on('change', 'select[name=associatedCard]', function(e){
            var chk = $(this).val() != "" ? false : true;
            step3Block.find('.sendMessage').prop('disabled', chk);
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
        });

        $('#popup-cardApply').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            step3Block.find('input[name=cardApplyaAgree]').prop('checked', chk);

            if(chk) $('#popup-cardApply').vcModal('close');
        });

    }

    function setCreditInquire(){
        console.log('creditInquireButton')
    }

    function changeInstallInputType(type){
        if(type == "equal"){
            var step1Value = step1Validation.getValues();

            for(var str in step1Value){
                step2Block.find('input[name=' + str +']').val(step1Value[str]);
            }

            var telephone = step2Block.find('input[name=userTelephone]');
            telephone.val(telephone.data('equalNumber'));

            step2Block.find('input[name=detailAdress]').val(step1Validation.getValues('detailAdress'));
        } else{
            step2Block.find('input').not('[name=installInpuType], [name=preVisitRequest]').val("")
        }
    }

    function changePrevisitRequest(abled){
        if(abled == "Y"){
            step2Block.find('input[name=preVisitAgree]').prop('checked', false);
        }
    }

    function getPostCode(item){
        if(isPostCode){
            new daum.Postcode({
                oncomplete: function(data){
                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }
                    item.find('input[name=zipCode]').val(data.zonecode);
                    item.find('input[name=userAdress]').val(roadAddr);
                    item.find('input[name=detailAdress]').val('');
                }
            }).open();
        }
    }

    function openPrivacyPopup(){
        $('#popup-privacy').vcModal()
        .on('modalhide', function(e){
            var chk = $privacyAgreeAllChker.getAllChecked();
            $privacyAgreeChker.prop('checked', chk);
            $creditInquireButton.prop('disabled', !chk);
        });
    }
    function setPrivacyAgreeStatus(status){
        if(status){
            $privacyAgreeOkButton.css('cursor', 'pointer').removeClass('disabled');
            if(!$privacyAgreeOkButton.hasClass('pink')) $privacyAgreeOkButton.addClass('pink');
        } else{
            $privacyAgreeOkButton.css('cursor', 'default').removeClass('pink');
            if(!$privacyAgreeOkButton.hasClass('disabled')) $privacyAgreeOkButton.addClass('disabled');
        }
    }
    function setPrivacyAgreePop(status){
        $('#popup-privacy').find('input[type=checkbox]').prop('checked', status);
        setPrivacyAgreeStatus(status)
    }

    function setNextStep(){
        var isComplete = true;
        switch(step){
            case 0:
                //step1Validation.validate();
                break;
        }

        return isComplete;
    }

    function rentalRequest(){
        var agreechk = $requestAgreeChecker.getAllChecked();
        console.log(agreechk)
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();