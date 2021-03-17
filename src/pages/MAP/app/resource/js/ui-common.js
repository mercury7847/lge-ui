$(document).ready(function(){
    $(".form-box .inner .input-wrap input").on({
        focusin : function(){
            $(this).closest(".input-wrap").addClass("focus");
        },
        focusout : function(){
            var inputVal = $(this).val();

            if(inputVal.length == 0){
                $(this).closest(".input-wrap").removeClass("focus");
            }
        }
    });

    //Accordion
    var accordHd = ".acc-header a";
    var accordCon = ".acc-content";
    $(accordHd).on({
        click : function(e){
            e.preventDefault();

            var dropdown = $(this).parent().next(accordCon);

            $(this).closest(".accord-item").toggleClass("open");
            $(this).closest(".accord-item").siblings().removeClass("open");
            $(this).parent().next(accordCon).slideToggle(200);
            $(accordCon).not(dropdown).slideUp(200);
        }
    });
});