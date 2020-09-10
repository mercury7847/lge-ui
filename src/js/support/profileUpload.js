(function() {

    function chk_file_type() {
        var obj = this;
        var file_kind = obj.value.lastIndexOf('.');
        var file_name = obj.value.substring(file_kind+1,obj.length);
        var file_type = file_name.toLowerCase();
        var check_file_type=new Array();​
    
        check_file_type=['jpg','jpeg'];
    
        if(check_file_type.indexOf(file_type)==-1){
            alert('jpg만 업로드 가능합니다.');
            obj.value = '';
            return false;
        }

        if( !$(this).val() ) return;
        var f = this.files[0];
        var size = f.size || f.fileSize;
        var limit = 50000;
                    
        if( size > limit )
        {
            alert( '파일용량은 50kb 를 넘을수 없습니다.' );
            $(this).val('');
            return;
        }
    }

    $(window).ready(function() {
        $('input[type=file]').on('change', chk_file_type);
        /*----------------------------------------
        profile Upload https://codepen.io/StephenScaff/pen/dPpxpL
        ------------------------------------------*/
        var SITE = SITE || {};
        
        SITE.fileInputs = function() {
            var $this = $(this),
                $val = $this.val(),
                valArray = $val.split('\\'),
                newVal = valArray[valArray.length-1]
            if(newVal !== '') {
                $('.profile-regist-file-name').text(newVal);
                $(".profile-regist-text").hide();
            }
        };
        
    
        $('#profile-regist-file-upload').bind('change focus click', SITE.fileInputs);
    
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    $('.profile-regist-img img').attr('src', e.target.result);
                }
    
                reader.readAsDataURL(input.files[0]);
            }
        }
    
        $("#profile-regist-file-upload").change(function(){
            readURL(this);
        });
    });
})();