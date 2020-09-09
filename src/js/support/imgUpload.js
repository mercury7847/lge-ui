$(window).ready(function() {
    function readInputFile(e){
        var sel_files = [];
        
        sel_files = [];
        $('.profile-regist-img').empty();
        
        var files = e.target.files;
        var fileArr = Array.prototype.slice.call(files);
        var index = 0;
        
        fileArr.forEach(function(f){
            if(!f.type.match("image/.*")){
                alert("이미지 확장자만 업로드 가능합니다.");
                return;
            };
            if(files.length < 1){
                sel_files.push(f);
                var reader = new FileReader();
                reader.onload = function(e){
                    var html = "<img src=${e.target.result} data-file=${f.name} id=img_id_${index} />";
                    $('.profile-regist-img').append(html);
                    index++;
                };
                reader.readAsDataURL(f);
            }
        })
        if(files.length > 1){
            alert("최대 1장까지 업로드 할 수 있습니다.");
        }
    }
    
    $('#file-upload').on('change',readInputFile);
});