(function() {
    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="topic{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';
    var subTopicTmpl = 
    '{{#each (item, index) in subTopicList}}' +
    '<li>' +
        '<span class="rdo-wrap">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}" data-error-msg="정확한 세부증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="subTopic{{index}}">{{item.name}}</label>' +
        '</span>' +
    '</li>' +
    '{{/each}}';
    var validation;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');

            vcui.require(['ui/validation', 'ui/formatter'], function () {

                var register = {
                    topic: {
                        required: true,
                        msgTarget: '.topic-msg'
                    },
                    subTopic: {
                        required: true,
                        msgTarget: '.sub-topic-msg'
                    },
                    userNm: {
                        msgTarget: '.err-block' 
                    },
                    phoneNo: {
                        msgTarget: '.err-block'
                    }
                }

                validation = new vcui.ui.CsValidation('#submitForm', {register:register});

                $('.contents').commonModel({
                    register: register,
                    callback: function(data, info) {
                        var html = '';
                        
                        html = vcui.template(topicTmpl, info);

                        $('#topicList ul').html(html);
                    }
                });

                self.bindEvent();
            });
        },
        
        bindEvent: function() {
            var self = this;

            self.$form.on('change', 'input[name=topic]', function() {
                var $this = $(this),
                    url = $('#topicList').data('ajax'),
                    param = {
                        topic : $this.val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
                    var html = '';
                        
                    html = vcui.template(subTopicTmpl, data);

                    $('#subTopicBox').show();
                    $('#subTopicBox').find('ul').html(html);
                });
            });

            self.$form.on('change', 'input[name=subTopic]', function() {
                var $this = $(this),
                    url = $('#subTopicList').data('ajax'),
                    param = {
                        topic : $('input[name=topic]').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
                    
                    if (data.resultFlag == 'Y') {
                        if (data.solutionFlag) {
                            $('#solutionBanner').show();
                        } else {
                            $('#solutionBanner').hide();
                        }
                    }
                });
            });

            $("#solutionBanner .btn-link").click(function(){
                var url = $(this).data('href');
                var param = {
                    topic : '',
                    subToic : '',
                    productCode : ''
                };
                
                lgkorUI.requestAjaxData(url, param, function(result){
                    $('#solutionsPopup').html(result).vcModal();
                }, null, "html");
            });

            self.$form.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {                        
                    lgkorUI.confirm('', {
                        title:'저장 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            var ajaxUrl = self.$form.data('ajax');
                            var data = validation.getAllValues();
                            var formData = new FormData();
   
                            for (var key in data) {
                                formData.append(key, data[key]);
                            }

                            $.ajax({
                                type : 'POST',
                                url : ajaxUrl,
                                dataType : 'json',
                                data : formData,
                                enctype: 'multipart/form-data',
                                processData: false,
                                contentType: false
                            }).done(function (result) {
                                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                                    location.reload();                
                                    return;
                                }
                                
                                if(result.status != 'success'){
                                    alert(result.message ? result.message : '오류발생');
                                    return;
                                }

                                if (result.data.resultFlag == 'Y') {
                                    self.$form.submit();
                                }
                            }).fail(function(err){
                                alert(err.message);
                            });
                        }
                    });
                }
            });
            self.$form.find('.btn-cancel').on('click', function() {
                var url = $(this).data('url');
                lgkorUI.confirm('', {
                    title:'취소 하시겠습니까?',
                    okBtnName: '확인',
                    cancelBtnName: '취소',
                    ok: function() {
                        location.href = url;
                    }
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();