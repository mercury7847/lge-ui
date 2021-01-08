$(window).ready(function(){
    if(!document.querySelector('.KRP0006')) return false;
    
    $('.KRP0006').on('click', '.inner button', function(e){
        e.preventDefault();

        $(this).closest('.inner').slideUp(200);
    });

    $('.KRP0006').each(function(idx, item){
        $(item).hide();
        var responseData = $(item).data('responseData');
        var modelID = $(item).data('modelId');
        var type = $(item).data('type');
        
        if(!$(item).data("isFirstLoad")){
            $(item).data("isFirstLoad", true);
            if(type == "top"){
                var sendata = {
                    modeiID: modelID
                }
                lgkorUI.requestAjaxData(responseData, sendata, function(result){
                    if(result.data.responseMessage && result.data.responseMessage != ""){
                        $(item).show().find('.inner p.txt').empty().text(result.data.responseMessage);
                    } else{

                    }
                });
            } else if(type == "bottom"){
                var referrer = document.referrer;
                console.log("referrer:",referrer)
            }
        }
    });
})