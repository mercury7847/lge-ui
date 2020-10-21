$(window).ready(function(){
    if(!document.querySelector('.KRP0012')) return false;
    
    vcui.require(['ui/sticky'], function () {
        $('.KRP0012').vcSticky({stickyContainer: '.container-fluid'});
   
    });
})