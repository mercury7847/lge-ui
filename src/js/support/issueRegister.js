(function() {
    


    $(window).ready(function() {
        vcui.require([
            'ui/imageFileInput'
        ], function() {    
            $('.ui_imageinput').vcImageFileInput({
                totalSize: '4000000',
                format: 'jpg|jpeg|png|gif',
                message: {
                    size: '첨부파일 크기는 4MB 이하로 등록 해주세요.'
                }
            });
        });

        $('.btn-confirm').on('click', function(e) {
            var formData = new FormData();
                url = $('#submitForm').data('ajax');

            var files = $('.ui_imageinput').vcImageFileInput('getSelectFiles');
            
            if (!files.length) {
                var popObj = {
                    title: '사진을 첨부해 주세요.'
                }

                lgkorUI.alert("", popObj);
                return false;
            } else {
                $.each(files, function(index, item) {
                    formData.append('imageFile0' + (index+1), item);           
                });

                formData.append('registerNo', $('#registerNo').val() || '');
            }

            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data,
                    obj = {},
                    desc = '';

                if (data.resultFlag == 'Y') {
                    if (files.length == 1) {
                        if (data.successCount == 1) {
                            obj = {title: '사진이 등록 되었습니다.'};
                        }
                    } else {
                        if (data.successCount == 1) {
                            obj = {title: '2개의 사진 중, 1개만 등록 되었습니다.'};
                        } else {
                            obj = {title: '2개 사진이 등록 되었습니다.'};
                        }
                    }
                    obj = $.extend(obj, {
                        ok: function() {
                            location.href = $('#submitForm').attr('action');
                        }
                    });
                } else if (data.resultFlag == 'N') {
                    obj = {title: '사진 업로드에 실패했습니다.'};
                    desc = data.resultMessage
                }

                lgkorUI.alert(desc, obj);
            }, 'POST');
        });
    });
})();