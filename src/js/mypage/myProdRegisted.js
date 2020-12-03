
(function(){
    var DELETE_REGISTED_PRODUCT;

    function init(){
        console.log("My Product Registed start!!");
    
        vcui.require(['ui/modal'], function () {             
            setting();
            bindEvents();
        });
    }

    function setting(){
        DELETE_REGISTED_PRODUCT = $('.contents.mypage').data("deleteProd");
        console.log($('.contents.mypage'))
    }

    function bindEvents(){
        $('.mypage').on('click', '.manual-btn, .download-btn, .btn-delete, .requestCareship-btn, .newProdCheck-btn', function(e){
            e.preventDefault();

            var matchIdx;
            var modelID = $(this).closest('.lists').data('modelId');

            matchIdx = $(this).attr('class').indexOf('manual');
            if(matchIdx > -1) openManualPop(modelID);

            matchIdx = $(this).attr('class').indexOf('download');
            if(matchIdx > -1) openDownLoadPop(modelID);

            matchIdx = $(this).attr('class').indexOf('delete');
            if(matchIdx > -1) deleteProdList(modelID);

            matchIdx = $(this).attr('class').indexOf('requestCareship');
            if(matchIdx > -1) requestCareship(modelID);

            matchIdx = $(this).attr('class').indexOf('newProdCheck');
            if(matchIdx > -1) newProdCheck(modelID);

        }).on('click', '.notice button', function(e){
            e.preventDefault();

            $(this).parent().hide();
        })
    }

    function openManualPop(mid){
        
        $('#popup-manual').vcModal();
    }

    function openDownLoadPop(mid){
        
        $('#popup-download').vcModal();
    }

    function deleteProdList(mid){                
        lgkorUI.confirm("", {
            title: "보유제품을 삭제하시겠습니까 ?",
            okBtnName: "삭제",
            ok: function(){
                lgkorUI.showLoading();
        
                var sendata = {
                    modelID: mid
                }
                lgkorUI.requestAjaxData(DELETE_REGISTED_PRODUCT, sendata, function(result){
                    
                    if(result.data.success == "Y"){
                        $('.contents.mypage .my-product-lists ul li.lists[data-model-id='+mid+']').remove();
                    } else{
                        lgkorUI.alert(result.data.alert.desc, {
                            title: result.data.alert.title
                        });
                    }
        
                    lgkorUI.hideLoading();
                });
            }
        });
    }

    function requestCareship(mid){

    }

    function newProdCheck(mid){

    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();