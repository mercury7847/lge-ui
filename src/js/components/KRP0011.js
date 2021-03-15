$(window).ready(function(){
    if(!document.querySelector('.KRP0011')) return false;
    

    //유사제품 추천...
    $('.KRP0011').on('click', 'button[data-model-ids]', function(e){
        e.preventDefault();

        var url = $(this).data('compareUrl');
        self.addEqualCompare($(this).data('modelIds'), url);
    })
});