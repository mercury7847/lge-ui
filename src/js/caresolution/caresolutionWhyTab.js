$(function(){

    if(vcui.detect.isIOS){
        $('.csn-ars-bottom').hide();
    }

    vcui.require(['ui/tab','ui/sticky'], function () {

        $('.ui_why_tab').on('tabchange', function(e,data){

            var $content = $(data.content);
            var stickyHeight = $content.closest('.ui_sticky').height();
            var top = $content.offset().top - parseInt($content.css('padding-top'));
            $('html, body').scrollTop(top-stickyHeight);

        }).vcTab();

        

    })
});