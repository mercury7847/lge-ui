(function(){
    var KRP0010_PRINT = '<html lang="ko">' +
        '<head>' +
            '<meta charset="UTF-8">' +
            '<meta http-equiv="X-UA-TextLayoutMetrics" content="gdi" />' +
            '<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">' +
            '<title>제품 상세 스펙</title>' +
            '<link rel="shortcut icon" href="/lg5-common/images/favicon.ico">' +
            '<link rel="stylesheet" href="/lg5-common/css/reset.min.css" />' +
            '<link rel="stylesheet" href="/lg5-common/css/app.min.css" />' +
            '<link type="text/css" rel="stylesheet" href="/lg5-common/css/components/KRP0010.min.css" />' +
            '<script src="/lg5-common/js/libs/jquery-2.2.4.min.js"></script>' +
            // '<script src="/lg5-common/js/libs/jquery.transit.min.js"></script>' +
            // '<script src="/lg5-common/js/libs/jquery.event.move.min.js"></script>' +
            // '<script src="/lg5-common/js/libs/jquery.twentytwenty.min.js"></script>' +
            // '<script src="/lg5-common/js/libs/jquery.mCustomScrollbar.min.js"></script>' +
            // '<script src="/lg5-common/js/vcui.min.js"></script>' +
            // '<script src="/lg5-common/js/vcui.common-ui.min.js"></script>' +
            // '<script src="/lg5-common/js/lg.common.min.js"></script>' +
            // '<script src="/lg5-common/js/components/KRP0010.min.js"></script>' +
        '</head>' +
        '<body><div class="wrap"><div class="container"><div id="pdp_spec" class="component-wrap">' +
            '<section class="component KRP0010"><div class="component-inner"><div><div class="prod-spec-wrap">' +
                '{{#raw html}}' +
            '</div></div></div></section>' +
        '</div></div></div></body>' +
    '</html>'
    $(document).ready(function(){
        if(!document.querySelector('.KRP0010')) return false;
        
        var $KRP0010 = $('.KRP0010');

        $KRP0010.find('.btn_collapse_more a').eq(0).attr('title', '제품스펙 상세정보 펼치기');
        $KRP0010.find('.btn_collapse_more a').eq(1).attr('title', '제품스펙 상세정보 접기');
        $KRP0010.on('click', '.btn_collapse_more a', function(e){
            e.preventDefault();

            var idx = $(this).index() ? 0 : 1;
            var wrap = $(this).closest('.prod-spec-wrap');
            var spec = wrap.find('.prod-spec-detail');
            if(idx){
                spec.slideDown();

                var offsetop = $(this).parent().offset().top;
                $('html, body').stop().animate({scrollTop:offsetop}, 300);
            } else{
                spec.slideUp();
            }
            $(this).parent().children().css('display', 'none').eq(idx).css('display', 'block');
        });

        $KRP0010.on('click', 'div.prod-print button', function(e){
            e.preventDefault();
            var $parent = $(this).parents('div.prod-spec-wrap');
            var html = $parent.html();
            var setting = "width=640, height=800, all=no";
            var objWin = window.open('', 'print',setting);
            objWin.document.write(vcui.template(KRP0010_PRINT, {"html":html}));
            objWin.focus(); 
            objWin.document.close();
            objWin.onload=function() {
                $(objWin.document).find('div.prod-spec-detail').show();
                objWin.print();
                objWin.close();
            }
        });
    });
})();