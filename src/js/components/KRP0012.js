$(window).ready(function(){
    if(!document.querySelector('.KRP0012')) return false;
    
    vcui.require(['ui/sticky'], function () {
        var firstmargin = $('.KRC0065').outerHeight(true);
        $('.KRP0012').vcSticky({usedAnchor:true, anchorClass:".tab-menu > a", firstMarginTop:firstmargin}).on('changeanchor', function(e, data){
            if(data.selectIdx < 1){
                $('.KRC0065').slideDown(150);
            } else{
                $('.KRC0065').slideUp(150);
            }
        });   
    });
})