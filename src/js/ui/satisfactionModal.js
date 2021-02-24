vcui.define('ui/satisfactionModal', ['jquery', 'vcui'], function ($, core) {

    var satisfaction = (function(){
        if ($('#surveyPopup').length < 1) return false;
        
        var $popup = $('#surveyPopup'),
            $popupCont = $popup.find('.survey-pop');

        var surveyUrl = $popup.data('surveyUrl');  
        var register = {
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
                minLength: 20,
                maxLength: 120,
                msgTarget: '.err-block'
            }
        };

        vcui.require(['ui/validation'], function () {
            var validation = new vcui.ui.CsValidation('.survey-pop', {register:register});
        
            $popup.find('.btn-confirm').on('click', function() {
                var result = validation.validate(),
                    data = $.extend({}, validation.getAllValues());
        
                if (result.success) {
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost(surveyUrl, data, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            $popup.vcModal('hide');
                        }
        
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                        lgkorUI.hideLoading();
                    })
                }
            });
        
            $popup.on('modalhidden', function(e) {
                $popupCont.find('input[type=radio]').prop('checked', false);
                $popupCont.find('input,textarea').val('');
                $popupCont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
                $popupCont.find('#rating').vcStarRating('selectedIndex', 0);
                validation.reset();
            });
        });
    })();
});