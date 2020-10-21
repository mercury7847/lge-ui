$(window).ready(function(){
    if(!document.querySelector('.KRP0012')) return false;
    
    vcui.require(['ui/sticky'], function () {
        var parentClassName = $('.KRP0012').parent().parent().attr('class');
        $('.KRP0012').vcSticky({stickyContainer: '.'+parentClassName});
    });
})