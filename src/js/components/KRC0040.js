$(window).ready(function(){
    if(!document.querySelector('.KRC0040')) return false;

    var marginTop = $('.KRP0009').length ? $('.KRC0040').outerHeight(true) : 0;
    
    vcui.require(['ui/sticky'], function () {
         $('.KRC0040').vcSticky({marginTop:marginTop, usedAnchor:true});   
    });
})