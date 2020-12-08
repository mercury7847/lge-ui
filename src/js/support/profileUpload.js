(function() {
    


    $(window).ready(function() {
        vcui.require([
            'ui/imageFileInput', 'ui/validation'
        ], function() {    
            $('.ui_imageinput').vcImageFileInput({
                totalSize: '50000',
                format: 'jpg|jpeg',
                message: {
                    format: 'JPG만 업로드 가능합니다.',
                    size: '첨부파일 크기는 50kb 이하로 등록 해주세요.'
                }
            });

            var register = {
                businessNumber: {
                    required: true,
                    msgTarget: '.err-block'
                },
                businessGroup: {
                    required: true,
                    msgTarget: '.err-block'
                },
                name: {
                    required: true,
                    msgTarget: '.err-block'
                },
                imageFile: {
                    required: true,
                    msgTarget: '.img-err-block'
                }
            }

            var validation = new vcui.ui.CsValidation('.profile-upload-form', {register:register});

            $('.btn-confirm').on('click', function(e) {
                var result = validation.validate();

                if (result.success == true) {
                    var id = $(e.currentTarget).data('id');
                    var obj = {title:'', typeClass:'', ok : function(){ 
        
                    }};
                    var desc = '';
        
                    if (id == "#confirmPop") {
                        obj = $.extend(obj, {
                            title:'저장하시겠습니까?',
                            cancelBtnName: '아니오',
                            okBtnName: '예',
                            ok: function() {
                                var ajaxUrl = $('.profile-upload-form').data('ajax'),
                                    param = new FormData($('.profile-upload-form')[0]);
                                   
                                $.ajax({
                                    type : 'POST',
                                    url : ajaxUrl,
                                    dataType : 'json',
                                    data : param,
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
                                    
                                    var popObj = {
                                        title: result.message,
                                        ok: function() {
                                            var popObj2 = {
                                                title:'지금 보고 있는 웹페이지 창을 닫으려고 합니다. 이 창을 닫으시겠습니까?',
                                                cancelBtnName: '아니오',
                                                okBtnName: '예',
                                                ok: function() {
                                                    self.close();
                                                },
                                                cancel: function() {
                                                    location.reload();
                                                }  
                                            };

                                            lgkorUI.confirm(desc, popObj2);
                                        }
                                    };

                                    lgkorUI.alert(desc, popObj);
                                }).fail(function(err){
                                    alert(err.message);
                                });
                            }
                        });
                    }
                    lgkorUI.confirm(desc, obj);
                }
            });
        });
    });
})();