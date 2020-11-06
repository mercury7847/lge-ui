(function(){
    var $requestAgreeChecker;
    var $requestButton;

    var $stepAccordion;

    var $privacyAgreeChker;
    var $privacyAgreeAllChker;
    var $privacyAgreeOkButton;

    var step1Validation, step2Validation, step3Validation;

    var step = 0;

    function init(){
        console.log("requestRental Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/accordion', 'ui/modal', 'ui/validation'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        $('.agree-box').vcCheckboxAllChecker();
        $requestAgreeChecker = $('.agree-box').vcCheckboxAllChecker('instance');
        $requestButton = $('.agree-box').find('button.btn');

        $('.ui_accordion').vcAccordion();
        $stepAccordion = $('.ui_accordion').vcAccordion('instance');

        $privacyAgreeChker = $('.accordion-section ul li:nth-child(1) .input-mix-wrap input[type=checkbox]');


        $('#popup-privacy').vcCheckboxAllChecker();
        $privacyAgreeAllChker = $('#popup-privacy').vcCheckboxAllChecker('instance');

        $privacyAgreeOkButton = $('#popup-privacy .btn-group .btn:nth-child(2)').css({cursor:'default'});

        var register = {}
        step1Validation = new vcui.ui.Validation('.accordion-section ul li:nth-child(1)',{register:register});
    }

    function bindEvents(){
        $stepAccordion.on('accordionbeforeexpand', function(e, data){
            if(data.index > step){
                e.preventDefault();
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
        $('.accordion-section ul li:nth-child(1) .input-mix-wrap .cell .btn-link').on('click', function(e){
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
    }

    function openPrivacyPopup(){
        $('#popup-privacy').vcModal()
        .on('modalhide', function(e){
            $privacyAgreeChker.prop('checked', $privacyAgreeAllChker.getAllChecked());
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
        switch(step){
            case 0:

                break;
        }
    }

    function rentalRequest(){
        var agreechk = $requestAgreeChecker.getAllChecked();
        console.log(agreechk)
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();