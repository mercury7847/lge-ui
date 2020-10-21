$(window).ready(function(){
    if(!document.querySelector('.KRP0012')) return false;
    
    vcui.require(['ui/sticky'], function () {
        var fluid = $('.KRP0012').closest('.container-fluid').length;
        console.log("fluid : ", fluid);
        if(fluid){
            $('.KRP0012').vcSticky({stickyContainer: '.container-fluid'});
        } else{
            $('.KRP0012').vcSticky();
        }        
    });
})