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

        //2021-04-29 정승우
        //딱히 수정요청도 없었고 페이지에서 수정하는것이 좋지만 철수 관계로 수정요청할 타이밍이 안되니
        //떠나기전에 스크립트로 일단 처리해주고 감.
        //크롬에서 유튜브 iframe으로 요청할시 origin에러가 날경우 처리.
        //특히 iframe에서 src를 교체하는것이 아니고 통째로 교체를 한 이유는
        //iframe의 history pushState 습성 떄문에 히스토리 백이 원하는대로 동작하지 않음
        var iframe = $('article div.youtube-box .video-box > iframe');
        iframe.each(function(idx, item){
            var obj = $(item);
            var src = obj.attr('src');
            src += ('?autohide=1&autoplay=1' +
            '&cc_load_policy=0&controls=0' +
            '&disablekb=1&enablejsapi=1' +
            '&fs=0&iv_load_policy=3' +
            '&modestbranding=1&rel=0' +
            '&showinfo=0&start=0' +
            '&widgetid=1' +
            '&origin=' + location.origin);

            changeIframeSrc(item,src);
        });

        function changeIframeSrc(iframe, src) {
            var frame = iframe.cloneNode();
            frame.src = src;
            iframe.parentNode.replaceChild(frame, iframe);
        };
    })
});