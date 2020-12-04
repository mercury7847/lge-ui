(function() {
    

    $(window).ready(function() {
        vcui.require([
            'ui/imageFileInput'
        ], function () {    
            $('.ui_imageinput').vcImageFileInput({
                totalSize: '50000',
                format: 'jpg|jpeg',
                message: {
                    format: 'JPG만 업로드 가능합니다.',
                    size: '첨부파일 크기는 50kb 이하로 등록 해주세요.'
                }
            });
        });

        $('.btn-confirm').on('click', function(e) {
            var id = $(e.currentTarget).data('id');
            var obj = {title:'', typeClass:'', ok : function(){ 

            }};
            var desc = '';

            var register = {
                businessNumber: {
                    required: true,
                },
                businessGroup: {
                    required: true,
                },
                name: {
                    required: true,
                },
                imageFile: {
                    required: true
                }
            }

            var validation = new vcui.ui.CsValidation('#submitForm', {register:register});
    
            if (id == "#confirmPop"){
                obj = $.extend(obj, {
                    title:'저장하시겠습니까?',
                    cancelBtnName: '아니오',
                    okBtnName: '예',
                    ok: function() {
                        var ajaxUrl = $('.profile-upload-wrap').data('ajax'),
                            param = {
                                
                            };

                        lgkorUI.requestAjaxDataPost(ajaxUrl, param, function() {

                        });
                    }
                });
                desc = '';
            }
            lgkorUI.alert(desc, obj);
        });
    });
})();