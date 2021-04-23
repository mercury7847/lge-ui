$(function() {
    new WOW().init();
    var rellax = new Rellax('.rellax');
    $("[ui-modules='Footer']").css({ "position": "relative", "z-index": "99" });


    function parallaxIt() {
        'use strict';
        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        $fwindow.on('resize', function() {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });
        $(".objet-wrap").on('scroll', function() {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        });

        $('.only_mobile [data-type="content"]').each(function(index, e) {
            var $contentObj = $(this);
            var fgOffset = parseInt($contentObj.offset().top);
            var yPos;

            $fwindow.on('resize', function() {
                yPos = (fgOffset - scrollTop) / ($contentObj.data('speed'));
                $contentObj.css('top', yPos);
            });
            $(".objet-wrap").on('scroll', function() {
                yPos = (fgOffset - scrollTop) / ($contentObj.data('speed'));
                $contentObj.css('top', yPos);
            });
        });
        // $('.only_mobile [data-type="background"]').each(function() {
        //     var $backgroundObj = $(this);
        //     var backgroundObj2 = $(this).height() * 2;
        //     var bgOffset = parseInt($backgroundObj.offset().top - backgroundObj2);
        //     var yPos;
        //     var coords;

        //     $fwindow.on('resize', function() {
        //         yPos = -((scrollTop - bgOffset) / ($backgroundObj.data('speed') || 0));
        //         coords = '50% ' + yPos + 'px';
        //         //console.log("ffff");
        //         $backgroundObj.css({ backgroundPosition: coords });
        //     });
        //     $(".objet-wrap").on('scroll', function() {
        //         yPos = -((scrollTop - bgOffset) / ($backgroundObj.data('speed') || 0));
        //         coords = '50% ' + yPos + 'px';
        //         //console.log("gggg");
        //         $backgroundObj.css({ backgroundPosition: coords });
        //     });
        // });

        $fwindow.trigger('scroll');
    };

    parallaxIt();

    scrollEvent();

    $(window).on('resize', function() {
        scrollEvent();
    });


    $(window).on("scroll", function() {
        scrollEvent();
    });
    // $(".objet-wrap").on("scroll", function() {
    //     scrollEvent();
    // });
    // $("*").on("scroll", function() {
    //     scrollEvent();
    // });

    function scrollEvent() {
        var scrollE = $(window).scrollTop();
        //console.log(scrollE);

        var fixbG = $("#brand-areaM").offset().top;
        if (scrollE >= fixbG) {
            $(".only_mobile .fix-bg-brand").hide();
        } else {
            $(".only_mobile .fix-bg-brand").show();
        }


        // var fixGB2 = $("#brand-area2M").offset().top,
        //     fixGB3 = $("#brand-area2M").offset().top + $(window).height();
        // if (scrollE >= fixGB2 && scrollE < fixGB3) {
        //     $(".only_mobile .bg-fix-brand2").addClass("active");
        // } else if (scrollE >= fixGB3) {
        //     $(".only_mobile .bg-fix-brand2").removeClass("active");
        //     $(".only_mobile .bg-fix-brand2").addClass("active2");
        // } else {
        //     $(".only_mobile .bg-fix-brand2").removeClass("active2 active");
        // }


        // var div = $(window).height() * 2,
        //     div2 = $(window).height() * 3,
        //     div3 = $(window).height() * 4,
        //     div4 = $(window).height() * 5,
        //     div5 = $(window).height() * 6,
        //     opcity = 0,
        //     opcity2 = 0,
        //     opcity3 = 0;
        // if (scrollE >= 0 && scrollE < div) {
        //     opcity = 1 - (scrollE / div);
        // }

        // $(".only_mobile .brand-logo").css("opacity", opcity);

        // if (scrollE >= div && scrollE < div2) {
        //     opcity2 = (scrollE - div) / (div2 - div);
        // } else if (scrollE > div2 && scrollE < div3) {
        //     opcity2 = 1 - (scrollE - div2) / (div3 - div2);
        // } else if (scrollE >= div3 && scrollE < div4) {} else if (scrollE >= div4) {
        //     //opcity3= 1 - ( scrollE - div4 ) / ( div5 - div4 );

        // }

        // $("#brand01M").css("opacity", opcity2);

        // var divBrand = $("#brand-area2M").offset().top,
        //     divBrand2 = $("#brand-area2M").offset().top + $(window).height(),
        //     opcity4 = 0;

        // if (scrollE >= divBrand && scrollE < divBrand2) {
        //     opcity4 = (scrollE - divBrand) / (divBrand2 - divBrand);
        //     $("#brand-area2M").addClass("type-a");
        //     $("#brand_simulM").css({
        //         "position": "fixed",
        //         "opacity": opcity4
        //     });
        // } else if (scrollE >= divBrand2) {

        //     $("#brand_simulM").css({
        //         "position": "absolute",
        //         "opacity": 1
        //     });
        // } else {
        //     $("#brand-area2M").removeClass("type-a");
        //     $("#brand_simulM").css({
        //         "position": "fixed",
        //         "opacity": 0
        //     });
        // }

    }

























































    // new WOW().init();
    // var rellaxM = new Rellax('.rellax');


    // function parallaxItM() {
    //     'use strict';
    //     //console.log("1111");
    //     var $fwindowM = $(window);
    //     var scrollTopM = window.pageYOffset || document.documentElement.scrollTop;

    //     $fwindowM.on('resize', function() {
    //         scrollTopM = window.pageYOffset || document.documentElement.scrollTop;
    //     });
    //     $(".objet-wrap").on('scroll', function() {
    //         scrollTopM = window.pageYOffset || document.documentElement.scrollTop;
    //     });

    //     // $('.only_mobile [data-type="content"]').each(function(index, e) {
    //     //     var $contentObjM = $(this);
    //     //     var fgOffsetM = parseInt($contentObjM.offset().top);
    //     //     var yPosM;
    //     //     //console.log("2222");

    //     //     $fwindowM.on('resize', function() {
    //     //         yPosM = (fgOffsetM - scrollTopM) / ($contentObjM.data('speed'));
    //     //         //console.log("3333");
    //     //         $contentObjM.css('top', yPosM);
    //     //     });
    //     //     $(".objet-wrap").on('scroll', function() {
    //     //         yPosM = (fgOffsetM - scrollTopM) / ($contentObjM.data('speed'));
    //     //         //console.log("4444");
    //     //         $contentObjM.css('top', yPosM);
    //     //     });
    //     // });
    //     $('.only_mobile [data-type="background"]').each(function() {
    //         var $backgroundObjM = $(this);
    //         var backgroundObj2M = $(this).height() * 2;
    //         var bgOffsetM = parseInt($backgroundObjM.offset().top - backgroundObj2M);
    //         var yPosM;
    //         var coordsM;
    //         var windowH = $(window).height();
    //         //console.log("5555");
    //         $fwindowM.on('resize', function() {
    //             yPosM = -((scrollTopM - bgOffsetM) / ($backgroundObjM.data('speed') || 0));
    //             coordsM = '50% ' + yPosM + 'px';
    //             //console.log("6666");
    //             $backgroundObjM.css({ backgroundPosition: coordsM });
    //         });
    //         $(".objet-wrap").on('scroll', function() {
    //             yPosM = -((scrollTopM - bgOffsetM) / ($backgroundObjM.data('speed') || 0));
    //             coordsM = '50% ' + yPosM + 'px';
    //             //console.log("coordsM", coordsM);
    //             $backgroundObjM.css({ backgroundPosition: coordsM });
    //         });
    //     });

    //     $fwindowM.trigger('scroll');
    //     $(".objet-wrap").trigger('scroll');
    // };

    // parallaxItM();

    // scrollEventM();

    // $(window).on('resize', function() {
    //     scrollEventM();
    // });


    // $("*").on("scroll", function(e) {
    //     scrollEventM();
    //     //console.log("e", e);
    // });

    // function scrollEventM() {
    //     var scrollEM = $(".objet-wrap").scrollTop();
    //     //console.log(scrollEM);

    //     var fixbGM = $("#brand-areaM").offset().top;
    //     if (scrollEM >= fixbGM) {
    //         $(".only_mobile .fix-bg-brand").hide();
    //     } else {
    //         $(".only_mobile .fix-bg-brand").show();
    //     }
    //     //console.log("9999");

    //     var fixGB2M = $("#brand-area2M").offset().top,
    //         fixGB3M = $("#brand-area2M").offset().top + $(window).height();
    //     if (scrollEM >= fixGB2M && scrollEM < fixGB3M) {
    //         $(".only_mobile .bg-fix-brand2").addClass("active");
    //     } else if (scrollEM >= fixGB3M) {
    //         $(".only_mobile .bg-fix-brand2").removeClass("active");
    //         $(".only_mobile .bg-fix-brand2").addClass("active2");
    //     } else {
    //         $(".only_mobile .bg-fix-brand2").removeClass("active2 active");
    //     }


    //     var divM = $(window).height(),
    //         div2M = $(window).height() * 2,
    //         div3M = $(window).height() * 3,
    //         div4M = $(window).height() * 4,
    //         div5M = $(window).height() * 5,
    //         opcityM = 0,
    //         opcity2M = 0,
    //         opcity3M = 0;
    //     if (scrollEM >= 0 && scrollEM < divM) {
    //         opcityM = 1 - (scrollEM / divM);
    //     }

    //     $(".only_mobile .brand-logo").css("opacity", opcityM);

    //     if (scrollEM >= divM && scrollEM < div2M) {
    //         opcity2M = (scrollEM - divM) / (div2M - divM);
    //     } else if (scrollEM > div2M && scrollEM < div3M) {
    //         opcity2M = 1 - (scrollEM - div2M) / (div3M - div2M);
    //     } else if (scrollEM >= div3M && scrollEM < div4M) {} else if (scrollEM >= div4M) {
    //         //opcity3= 1 - ( scrollE - div4 ) / ( div5 - div4 );

    //     }

    //     $("#brand01M").css("opacity", opcity2M);

    //     var divBrandM = $("#brand-area2M").offset().top,
    //         divBrand2M = $("#brand-area2M").offset().top + $(window).height(),
    //         opcity4M = 0;

    //     if (scrollEM >= divBrandM && scrollEM < divBrand2M) {
    //         opcity4M = (scrollEM - divBrandM) / (divBrand2M - divBrandM);
    //         $("#brand-area2M").addClass("type-a");
    //         $("#brand_simulM").css({
    //             "position": "fixed",
    //             "opacity": opcity4M
    //         });
    //     } else if (scrollEM >= divBrand2M) {

    //         $("#brand_simulM").css({
    //             "position": "absolute",
    //             "opacity": 1
    //         });
    //     } else {
    //         $("#brand-area2M").removeClass("type-a");
    //         $("#brand_simulM").css({
    //             "position": "fixed",
    //             "opacity": 0
    //         });
    //     }

    // }
});