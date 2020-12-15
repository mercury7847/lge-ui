(function() {
    var param;

    $(window).ready(function() {
        vcui.require([
            'ui/validation', 'ui/selectTarget'
        ], function() {
            var $submitForm = $('#submitForm'),
                url = $submitForm.attr('action');
                param = $submitForm.serialize();

            var $topic = $('#topic'),
                $subTopic = $('#subPic'),
                $keyword = $('#keyword'),
                $btnSearch = $('.btn-search');

            var validation = new vcui.ui.CsValidation('.keyword-search', {
                register: {
                    keyword: {
                        msgTarget: '.err-msg'
                    }
                }
            });

            $('#topic').vcSelectTarget();
           
            $subTopic.on('change', function() {
                var topicVal = $topic.val();
                    subTopicVal = $subTopic.val(),
                    parameter = param;

                parameter += '&topic=' + topicVal + '&subTopic=' + subTopicVal;
                location.href = url + '?' + param;
            });
            $btnSearch.on('click', function() {
                var keywordVal = $keyword.val(),
                    parameter = param;

                var result = validation.validate();

                if (result.success == true) {
                    parameter += '&keyword=' + keywordVal;
                    window.open(url + '?' + param);
                }
            });
        });
    });
})();