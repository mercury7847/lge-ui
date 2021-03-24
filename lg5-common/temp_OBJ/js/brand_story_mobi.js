$(function() {
    new WOW().init();
    var rellaxM = new Rellax('.rellax');


    function parallaxItM() {
        'use strict';

        var $fwindowM = $(window);
        var scrollTopM = window.pageYOffset || document.documentElement.scrollTop;

        $fwindowM.on('scroll resize', function() {
            scrollTopM = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('.only_mobile [data-type="content"]').each(function(index, e) {
            var $contentObjM = $(this);
            var fgOffsetM = parseInt($contentObjM.offset().top);
            var yPosM;

            $fwindowM.on('scroll resize', function() {
                yPosM = (fgOffsetM - scrollTopM) / ($contentObjM.data('speed'));

                $contentObjM.css('top', yPosM);
            });
        });
        $('.only_mobile [data-type="background"]').each(function() {
            var $backgroundObjM = $(this);
            var backgroundObj2M = $(this).height() * 2;
            var bgOffsetM = parseInt($backgroundObjM.offset().top - backgroundObj2M);
            var yPosM;
            var coordsM;

            $fwindowM.on('scroll resize', function() {
                yPosM = -((scrollTopM - bgOffsetM) / ($backgroundObjM.data('speed') || 0));
                coordsM = '50% ' + yPosM + 'px';

                $backgroundObjM.css({ backgroundPosition: coordsM });
            });
        });

        $fwindowM.trigger('scroll');
    };

    parallaxItM();

    scrollEventM();

    $(window).on('resize', function() {
        scrollEventM();
    });


    $(window).scroll(function() {
        scrollEventM();
    });

    function scrollEventM() {
        var scrollEM = $(window).scrollTop();
        console.log(scrollEM);

        var fixbGM = $("#brand-areaM").offset().top;
        if (scrollEM >= fixbGM) {
            $(".only_mobile .fix-bg-brand").hide();
        } else {
            $(".only_mobile .fix-bg-brand").show();
        }


        var fixGB2M = $("#brand-area2M").offset().top,
            fixGB3M = $("#brand-area2M").offset().top + $(window).height();
        if (scrollEM >= fixGB2M && scrollEM < fixGB3M) {
            $(".only_mobile .bg-fix-brand2").addClass("active");
        } else if (scrollEM >= fixGB3M) {
            $(".only_mobile .bg-fix-brand2").removeClass("active");
            $(".only_mobile .bg-fix-brand2").addClass("active2");
        } else {
            $(".only_mobile .bg-fix-brand2").removeClass("active2 active");
        }


        var divM = $(window).height(),
            div2M = $(window).height() * 2,
            div3M = $(window).height() * 3,
            div4M = $(window).height() * 4,
            div5M = $(window).height() * 5,
            opcityM = 0,
            opcity2M = 0,
            opcity3M = 0;
        if (scrollEM >= 0 && scrollEM < divM) {
            opcityM = 1 - (scrollEM / divM);
        }

        $(".only_mobile .brand-logo").css("opacity", opcityM);

        if (scrollEM >= divM && scrollEM < div2M) {
            opcity2M = (scrollEM - divM) / (div2M - divM);
        } else if (scrollEM > div2M && scrollEM < div3M) {
            opcity2M = 1 - (scrollEM - div2M) / (div3M - div2M);
        } else if (scrollEM >= div3M && scrollEM < div4M) {} else if (scrollEM >= div4M) {
            //opcity3= 1 - ( scrollE - div4 ) / ( div5 - div4 );

        }

        $("#brand01M").css("opacity", opcity2M);

        var divBrandM = $("#brand-area2M").offset().top,
            divBrand2M = $("#brand-area2M").offset().top + $(window).height(),
            opcity4M = 0;

        if (scrollEM >= divBrandM && scrollEM < divBrand2M) {
            opcity4M = (scrollEM - divBrandM) / (divBrand2M - divBrandM);
            $("#brand-area2M").addClass("type-a");
            $("#brand_simulM").css({
                "position": "fixed",
                "opacity": opcity4M
            });
        } else if (scrollEM >= divBrand2M) {

            $("#brand_simulM").css({
                "position": "absolute",
                "opacity": 1
            });
        } else {
            $("#brand-area2M").removeClass("type-a");
            $("#brand_simulM").css({
                "position": "fixed",
                "opacity": 0
            });
        }

    }
});