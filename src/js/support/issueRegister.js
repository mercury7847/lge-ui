(function() {
    


    $(window).ready(function() {
        var isMobile = vcui.detect.isMobileDevice;

        vcui.require([
            'ui/imageFileInput'            
        ], function() {    
            $('.ui_imageinput').vcImageFileInput({
                individualFlag: true,
                individual: {
                    size: 4 * 1024 * 1024
                },
                totalSize: 8 * 1024 * 1024,
                format: 'jpg|jpeg|png|gif',
                message: {
                    size: '첨부파일 사이즈는 4MB 이내로 등록 가능합니다.'
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

            lgkorUI.showLoading();
            lgkorUI.requestAjaxFileData(url, formData, function(result) {
                var data = result.data,
                    obj = {},
                    desc = '';

                if (data.resultFlag == 'Y') {
                    if (files.length == 1) {
                        if (data.successCount == 1) {
                            obj = {title: '1개 사진이 등록 되었습니다.'};
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
                            if (isMobile) {
                                location.href = $('#submitForm').attr('action');
                            } else {
                                window.close();
                            }
                        }
                    });
                } else if (data.resultFlag == 'N') {
                    obj = {title: '사진 업로드에 실패했습니다.'};
                    desc = '실패 사유 : ' + data.resultMessage
                }

                lgkorUI.alert(desc, obj);
                lgkorUI.hideLoading();
            }, 'POST');
        });
        // BTOCSITE-3429 add :: 모델 찾기 팝업 추가
        lgkorUI.searchModelName();
    });
})();