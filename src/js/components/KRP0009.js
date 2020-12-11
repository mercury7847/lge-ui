$(window).ready(function(){
    if(!document.querySelector('.KRP0009')) return false;
    
    vcui.require(['ui/sticky'], function () {
        var firstmargin = $('.KRC0040').outerHeight(true);
        $('.KRP0009').vcSticky({usedAnchor:true, anchorClass:".tab-menu > a", firstMarginTop:firstmargin}).on('changeanchor', function(e, data){
            if(data.selectIdx < 1){
                $('.KRC0040').slideDown(150);
            } else{
                $('.KRC0040').slideUp(150);
            }
        });   
    });
})