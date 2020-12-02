//addfile image load
$('.upload-wrap input[type=file]').change(function(){
    var id = $(this).attr("id");
    var newimage = new FileReader();
    newimage.readAsDataURL(this.files[0]);
    newimage.onload = function(e){
        $('.uploadpreview.' + id ).css('background-image', 'url(' + e.target.result + ')' );
        $('.uploadpreview.' + id ).closest('.upload-wrap').addClass('on');
    }
});

//addfile image delete
$('.upload-wrap .btn-ipt-del').click(function(){
    $(this).closest('.upload-wrap').removeClass('on');
    $(this).closest('.upload-wrap').find('.uploadpreview').css('background-image', '');
    $(this).closest('.upload-wrap').find('.fileName').val('');
});

//addfile name value
var fileTarget = $('.upload-wrap .uploadBtn');
    fileTarget.on('change', function(){ 
        if(window.FileReader){ // modern browser
            var filename = this.files[0].name;
        }

        else { // old IE
            var filename = $(this).val().split('/').pop().split('\\').pop(); 
        }

    $(this).closest('.upload-wrap').find('.fileName').val(filename);
});