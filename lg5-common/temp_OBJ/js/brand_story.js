$(function() {
    new WOW().init();
    var rellax = new Rellax('.rellax');

    scrollEvent();


    function parallaxIt() {
        'use strict';

        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        $fwindow.on('scroll resize', function() {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('.only_pc [data-type="content"]').each(function(index, e) {
            var $contentObj = $(this);
            var fgOffset = parseInt($contentObj.offset().top);
            var yPos;

            $fwindow.on('scroll resize', function() {
                yPos = (fgOffset - scrollTop) / ($contentObj.data('speed'));

                $contentObj.css('top', yPos);
            });
        });
        $('.only_pc [data-type="background"]').each(function() {
            var $backgroundObj = $(this);
            var backgroundObj2 = $(this).height() * 2;
            var bgOffset = parseInt($backgroundObj.offset().top - backgroundObj2);
            var yPos;
            var coords;
            var windowH = $(window).height();

            $fwindow.on('scroll resize', function() {
                yPos = -((scrollTop - bgOffset) / ($backgroundObj.data('speed') + windowH || 0));
                coords = '50% ' + yPos + 'px';
                console.log("windowH", windowH);
                console.log("yPos", yPos);
                console.log("coords", coords);
                $backgroundObj.css({ backgroundPosition: coords });
            });
        });

        $fwindow.trigger('scroll');
    };

    parallaxIt();

    $(window).on('resize', function() {
        scrollEvent();
    });


    $(window).scroll(function() {
        scrollEvent();
    });

    function scrollEvent() {
        var scrollE = $(window).scrollTop();

        var div = $(window).height(),
            div2 = $(window).height() * 2,
            div3 = $(window).height() * 3 - 100,
            div4 = $(window).height() * 4,
            opcity = 0,
            opcity2 = 0,
            opcity3 = 0;
        if (scrollE >= 0 && scrollE < div) {
            opcity = 1 - (scrollE / div);
        }

        $(".only_pc .brand-logo").css("opacity", opcity);

        if (scrollE >= div && scrollE < div2) {
            opcity2 = (scrollE - div) / (div2 - div);
        } else if (scrollE > div2 && scrollE < div3) {
            opcity2 = 1 - (scrollE - div2) / (div3 - div2);
        } else if (scrollE >= div3) {
            opcity3 = (scrollE - div2) / (div3 - div2);
            opcity2 = 0;
            $("#brand02").css({
                opacity: opcity3,
                position: "absolute"
            });
        }
        $("#brand01").css("opacity", opcity2);

        var divBrand = $("#brand-area2").offset().top,
            divBrand2 = $("#brand-area2").offset().top + $(window).height(),
            opcity4 = 0;

        if (scrollE >= divBrand && scrollE < divBrand2) {
            opcity4 = (scrollE - divBrand) / (divBrand2 - divBrand);
            $("#brand-area2").addClass("type-a");
            $("#brand_simul").css({
                "position": "fixed",
                "opacity": opcity4
            });
        } else if (scrollE >= divBrand2) {

            $("#brand_simul").css({
                "position": "absolute",
                "opacity": 1
            });
        } else {
            $("#brand-area2").removeClass("type-a");
            $("#brand_simul").css({
                "position": "fixed",
                "opacity": 0
            });
        }
    }
});