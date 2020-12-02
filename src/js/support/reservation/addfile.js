$('.upload-wrap input[type=file]').change(function(){
    var id = $(this).attr("id");
    var newimage = new FileReader();
    newimage.readAsDataURL(this.files[0]);
    newimage.onload = function(e){
        $('.uploadpreview.' + id ).css('background-image', 'url(' + e.target.result + ')' );
        $('.uploadpreview.' + id ).closest('.upload-wrap').addClass('on');
    }
});

$('.upload-wrap .btn-ipt-del').click(function(){
    $(this).closest('.upload-wrap').removeClass('on');
});