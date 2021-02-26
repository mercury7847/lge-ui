(function() {
    var param;

    $(window).ready(function() {   
        var cookieVal = $('.product-info').find('.name em').text().split('.')[0];
        var cookie = lgkorUI.recentlySearch;

        cookie.addCookie(cookieVal);

        vcui.require([
            'ui/validation', 'ui/selectTarget'
        ], function() {
            var $cont = $('.appgate'),
                $submitForm = $cont.find('#submitForm'),
                url = $submitForm.attr('action');
                param = $submitForm.serialize();

            var $topic = $cont.find('#topic'),
                $subTopic = $cont.find('#subTopic'),
                $keyword = $cont.find('#keyword'),
                $btnSearch = $cont.find('.btn-search');

            var validation = new vcui.ui.CsValidation('.input-wrap.search', {
                register: {
                    keyword: {
                        msgTarget: '.err-msg'
                    }
                }
            });

            $topic.vcSelectTarget({
                addParam: '#productCode'
            });
           
            $subTopic.on('change', function() {
                var topicVal = $topic.find('option:checked').text();
                    subTopicVal = $subTopic.find('option:checked').text(),
                    parameter = param;

                if (subTopicVal == 'All') subTopicVal = '';

                parameter += '&topicNm=' + topicVal + '&subTopicNm=' + subTopicVal;
                location.href = url + '?' + parameter;
            });
            $keyword.on('keyup', function(e) {
                if(e.keyCode == 13) {
                    e.preventDefault();
                    $btnSearch.trigger('click');        
                }
            });
            $btnSearch.on('click', function() {
                var keywordVal = $keyword.val(),
                    parameter = param;

                var result = validation.validate();

                if (result.success == true) {
                    parameter += '&searchKeyword=' + keywordVal;
                    window.open(url + '?' + parameter);
                }
            });
        });
    });
})();