$(window).ready(function(){
    if(!document.querySelector('.KRC0065')) return false;

    var marginTop = $('.KRP0012').length ? $('.KRP0012').outerHeight(true) : 0;
    
    vcui.require(['ui/sticky'], function () {
         $('.KRC0065').vcSticky({marginTop:marginTop, usedAnchor:true});   
    });
})