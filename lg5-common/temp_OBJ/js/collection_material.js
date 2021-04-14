$(function() {
    new WOW().init();
    var rellax = new Rellax('.rellax');

    scrollEvent();

    $(window).on('resize', function() {
        scrollEvent();
    });


    $(window).scroll(function() {
        scrollEvent();
    });

    $(".rellax").each(function() {
        var divH = $(this).parent("div").offset().top / 2;
        $(this).find(".img-overflow").css("margin-top", divH);
    });

    function scrollEvent() {
        var scrollE = $(window).scrollTop();

        $(".only_pc .img-overflow").each(function() {
            var scrollDiv = $(this).offset().top - $(window).height();
            if (scrollE >= scrollDiv) {
                var scrollDV = (scrollE - scrollDiv) / (scrollDiv - scrollDiv + $(window).height());
                //console.log(scrollDV);

                var rellaxScroll = -1 * ($(this).height() / 4) + ($(this).height() / 4 * scrollDV);
                var matrixH = "matrix(1, 0, 0, 1, 0, " + rellaxScroll + ")";
                $(this).find("img").css({
                    transform: matrixH
                });
            } else {
                $(this).find("img").removeAttr("style");
            }
        });

        var multiStart1 = $(".only_pc .mat-bx2").offset().top,
            multiStart2 = multiStart1 + $(window).height(),
            multiStart3 = multiStart2 + $(window).height(),
            multiStart4 = multiStart3 + $(window).height(),
            multiOpaticy = 0;

        if (scrollE >= multiStart1 && scrollE < multiStart2) {
            $("#material2 .Title_02").css({
                position: "fixed",
                width: "1080px",
                left: "50%",
                "margin-left": "-540px",
                "top": "50%",
            }).fadeIn(1000);
            $(".only_pc .mask-bx").fadeOut(1000);
            $(".only_pc .mat-bx3 .ct_width").fadeOut(1000);
        } else if (scrollE < multiStart1) {
            $("#material2 .Title_02").removeAttr('style');
        } else if (scrollE >= multiStart2 && scrollE < multiStart3 - 200) {
            $("#material2 .Title_02").fadeOut(1000);
            $(".only_pc .mat-list .ct_width").fadeOut(1000);
            $(".only_pc .mat-bx3 .ct_width").css({
                position: "fixed",
            }).fadeIn(1000);
            $(".only_pc .mask-bx").fadeIn(1000);
        } else if (scrollE >= multiStart3 - 200 && scrollE < multiStart4) {
            $(".only_pc .mat-bx3 .ct_width").fadeOut(1000);
            $(".only_pc .mat-list .ct_width").fadeIn(1000);
            $(".only_pc .mask-bx").fadeIn(1000);
        }

    }
});