vcui.define('ui/satisfactionModal', ['jquery', 'vcui'], function ($, core) {

    var satisfaction = (function(){
        if ($('#surveyPopup').length < 1) return false;
        
        vcui.require(['ui/validation'], function () {
            var $cont = $('.survey-pop');
            var register = {
                privcyCheck: {
                    msgTarget: '.err-block'
                },
                userName: {
                    msgTarget: '.err-block'
                },
                phoneNo: {
                    msgTarget: '.err-block'
                },
                gender: {
                    msgTarget: '.gender-err-block'
                },
                age: {
                    msgTarget: '.err-block'
                },
                serviceName: {
                    msgTarget: '.service-err-block'
                },
                csaFlag: {
                    msgTarget: '.csa-err-block'
                },
                rating: {
                    msgTarget: '.err-block'
                },
                content: {
                    msgTarget: '.err-msg'
                }
            };
            var validation = new vcui.ui.CsValidation('.survey-pop', {register:register});
        
            $('#surveyPopup').find('.btn-confirm').on('click', function() {
        
                var result = validation.validate(),
                    data = $.extend({}, validation.getAllValues());
        
                if (result.success) {
                    lgkorUI.requestAjaxDataPost($cont.data('ajax'), data, function(result) {
                        if (result.data.resultFlag == 'Y') {
                            $('#surveyPopup').vcModal('hide');
                        }
        
                        lgkorUI.alert("", {
                            title: result.data.resultMessage
                        });
                    })
                }
            });
        
            $('#surveyPopup').on('modalhidden', function(e) {
                //console.log(2)
                //$('.ui_modal_dim').stop().fadeOut();
                $cont.find('input,textarea').not(':readonly').val('');
            });
        });
    })();
});  

// (function(){
// })();