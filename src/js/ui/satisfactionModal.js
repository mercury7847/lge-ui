vcui.define('ui/satisfactionModal', ['jquery', 'vcui'], function ($, core) {

    var satisfaction = (function(){
        if ($('#surveyPopup').length < 1) return false;
        
        var $popup = $('#surveyPopup'),
            $popupCont = $popup.find('.survey-pop');

        var surveyUrl = $popup.data('surveyUrl');
        var param = {};
        var isContent = false;
        var register = {
            serviceName: {
                required: true,
                msgTarget: '.service-err-block'
            },
            csaFlag: {
                required: true,
                msgTarget: '.csa-err-block'
            },
            rating: {
                required: true,
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

            $popup.find('#rating').on('starRatingChange', function(e, data) {
                var $content = $popupCont.find('#content');
                var $contentLabel = $popupCont.find('[for="content"]');
                var value = parseInt(data.value);

                if (value < 4) {
                    isContent = true;
                    $content.prop('required', true);
                    $contentLabel.addClass('req');
                    $contentLabel.append('<span class="blind">필수입력</span>');
                } else {
                    isContent = false;
                    $content.prop('required', false);
                    $contentLabel.removeClass('req');
                    $contentLabel.find('.blind').remove();
                }
            });
            $popup.find('.btn-confirm').on('click', function() {
                var check = isContent ? ['serviceName', 'csaFlag', 'rating', 'content'] : ['serviceName', 'csaFlag', 'rating'];
                var result,
                    data = $.extend({}, param, validation.getAllValues());
        
                result = validation.validate(check);

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
                    });
                }
            });
            $popup.on('modalshow', function(e) {
                var $input = $popup.find('input[type=hidden]');
                var valArr = $input.serializeArray();

                valArr.forEach(function(item) {
                    param[item.name] = item.value;
                });
            });
            $popup.on('modalhide', function(e) {
                isContent = false;
                param = {};

                validation.reset();
                $popupCont.find('input[type=radio]').prop('checked', false);
                $popupCont.find('textarea').val('');
                $popupCont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
                $popupCont.find('#rating').vcStarRating('selectedIndex', 0);
            });
        });
    })();
});