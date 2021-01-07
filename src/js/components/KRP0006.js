$(window).ready(function(){
    if(!document.querySelector('.KRP0006')) return false;
    
    $('.KRP0006').on('click', '.inner button', function(e){
        e.preventDefault();

        $(this).closest('.inner').slideUp(200);
    });

    $('.KRP0006').each(function(idx, item){
        var responseData = $(item).data('responseData');
        var modelID = $(item).data('modelId');
        var type = $(item).data('type');
        var sendata = {
            type: type,
            modeiID: modelID
        }
        lgkorUI.requestAjaxData(responseData, sendata, function(result){
            $(item).find('.inner p.txt').empty().text(result.data.responseMessage);
        });
    });
})