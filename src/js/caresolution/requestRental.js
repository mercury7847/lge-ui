(function(){
    var $requestAgreeChecker;
    var $requestButton;

    var $stepAccordion;

    var step = 0;

    function init(){
        console.log("requestRental Start!!!");
    
        vcui.require(['ui/checkboxAllChecker', 'ui/accordion'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        $('.agree-box').vcCheckboxAllChecker();
        $requestAgreeChecker = $('.agree-box').vcCheckboxAllChecker('instance');
        $requestButton = $('.agree-box').find('button.btn');

        $('.ui_accordion').vcAccordion();
        $stepAccordion = $('.ui_accordion').vcAccordion('instance').on('accordionbeforeexpand', function(e, data){

            if(data.index > step){
                e.preventDefault();
                return
            }
        });
    }

    function bindEvents(){
        $requestButton.on('click', function(e){
            rentalRequest();
        })
    }

    function rentalRequest(){
        var agreechk = $requestAgreeChecker.getAllChecked();
        console.log(agreechk)
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();