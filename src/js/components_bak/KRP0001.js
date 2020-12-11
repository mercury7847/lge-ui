$(window).ready(function(){
    if(!document.querySelector('.KRP0001')) return false;

    vcui.require(['common/header'], function () {            
        $('header').vcHeader();
    });
})