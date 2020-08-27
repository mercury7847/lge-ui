$(window).ready(function(){
    if(!document.querySelector('.KRP0017')) return false;

    var KRP0017 = {
        tabmenu: null,
        init: function(){
            var self = KRP0017;

            vcui.require(['ui/smoothScroll'], function () {
                self.tabmenu = $('.KRP0017').find(".ui_tab > ul");
                self.tabmenu.vcSmoothScroll({
                    autoCenterScroll: true,
                    center: true,
                    scrollY: false,
                    preventDefault: true
                });
            });
        }
    }
    KRP0017.init();

    /*
    var $scroll = $('.ui_tab .overmenus_scroll');

    $scroll.vcSmoothScroll({
        autoCenterScroll: true,
        center: true,
        scrollY: false,
        preventDefault: true
    });

    $('.ui_tab').on('tabchange', function (e, data) {
        $scroll.vcSmoothScroll('scrollToActive', 300);
    });
    */
});