$(window).ready(function(){
    if(!document.querySelector('.KRP0003')) return false;

    vcui.require(['common/footer'], function () {            
        $('footer').vcFooter();
    });
})