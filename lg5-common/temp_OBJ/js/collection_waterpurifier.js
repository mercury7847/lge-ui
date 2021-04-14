$(function() {
    new WOW().init();
    var rellax = new Rellax('.only_pc .rellax');

    var sum = 0;
    $(".only_pc .rellax").each(function() {
        var divH = $(this).parent("div").offset().top / 2;
        $(this).find(".img-overflow2").css("margin-top", divH);
    });

    var swiper = new Swiper('.only_pc .swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        speed: 500,
        navigation: {
            nextEl: '.only_pc .obj-swiper-button-next',
            prevEl: '.only_pc .obj-swiper-button-prev',
        },
    });

    function parallaxIt() {
        'use strict';

        var $fwindow = $(window);
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        $fwindow.on('scroll resize', function() {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            $(".only_pc .rellax").each(function() {
                var divH = $(this).parent("div").offset().top / 2;
                $(this).find(".img-overflow2").css("margin-top", divH);
            });
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

            $fwindow.on('scroll resize', function() {
                yPos = -((scrollTop - bgOffset) / ($backgroundObj.data('speed') || 0));
                coords = '50% ' + yPos + 'px';

                $backgroundObj.css({ backgroundPosition: coords });
            });
        });

        $fwindow.trigger('scroll');
    };

    parallaxIt();


    scrollEvent();

    $(window).on('resize', function() {
        scrollEvent();

    });

    $(window).scroll(function() {
        scrollEvent();
    });

    function scrollEvent() {
        var scrollE = $(window).scrollTop();
        //console.log(scrollE);

        if (scrollE > 300) {
            $(".only_pc .collect_tab").addClass("active");
        } else {
            $(".only_pc .collect_tab").removeClass("active");
        }


        if (scrollE >= 1 && scrollE < 300) {
            var scrP = 1 - (scrollE * 0.0005);
            var tranlate = 'scale(' + scrP + ') translateX(' + -scrollE + 'px)';
            $(".only_pc .ref-img").css({
                transform: tranlate,
            });
            $(".only_pc .detail .ref-width").css("text-align", "right");

        } else if (scrollE >= 300 && scrollE < 700) {
            var scrP = 1 - (scrollE * 0.00073);
            var tranlate = 'scale(' + scrP + ') translateY(' + -scrollE * 0.30 + 'px)';
            $(".only_pc .ref-img").css({
                transform: tranlate,
            });
            $(".only_pc .detail .ref-width").css("text-align", "center");
            if ($(".ref-img").css("display") == "none") {
                $(".ref-img").fadeIn();
            }
        } else if (scrollE >= 700) {
            $(".only_pc .ref-img").fadeOut();
        }
        if (scrollE >= 1400) {
            $(".only_pc .collec_info01 .co_txStyle01").fadeIn();
        } else {
            $(".only_pc .collec_info01 .co_txStyle01").fadeOut();
        }

        if (scrollE >= 300) {
            $(".only_pc .ref-img").addClass("scroll");
            $(".only_pc .ref-img img").attr("src", $(".only_pc .ref-img img").attr("src").replace(/img-wp-big\.png$/, 'img-wp.png'));
        } else {
            $(".only_pc .ref-img").removeClass("scroll");
            $(".only_pc .ref-img img").attr("src", $(".only_pc .ref-img img").attr("src").replace(/img-wp\.png$/, 'img-wp-big.png'));
        }

        var fadeStart = 500,
            fadeUntil = 700,
            fadeOut = 1000,
            fadeEnd = 1200,
            fading = $(".only_pc .ref-bg");
        var fadeStart2 = 1200,
            fadeUntil2 = 1300,
            fadeOut2 = 2300,
            fadeEnd2 = 2400,
            fading2 = $("#reFscroll"),
            fading22 = $(".only_pc .collec-name");
        var opacity = 0,
            opacity2 = 0,
            opacity3 = 0,
            opacity4 = 0,
            opacity5 = 0;

        if (scrollE <= fadeStart) {
            opacity = 0;
        } else if (scrollE >= fadeStart) {
            opacity = (scrollE - fadeStart) / (fadeUntil - fadeStart);
        }

        if (scrollE >= fadeOut) {
            opacity = (scrollE - fadeEnd) / (fadeOut - fadeEnd);
            //$(".detail .ref-width .ref-img.scroll").css('opacity',opacity);
        }
        fading.css('opacity', opacity);


        if (scrollE == 0) {

        } else if (scrollE >= 1200) {
            if ($(".only_pc .collec_info01 .co_txStyle01").hasClass("type02") == false) {
                $(".only_pc .collec_info01 .co_txStyle01").addClass("type02 fix");
                fading2.css({
                    "z-index": "4",
                    visibility: "visible",
                }).fadeIn(500);
                fading22.css({
                    visibility: "visible",
                }).fadeIn(500);
                $(".only_pc .ref-bg").css("z-index", "3");
            }
        } else {
            $(".only_pc .collec_info01 .co_txStyle01").removeClass("type02 fix");
            fading2.fadeOut(500);
            fading22.fadeOut(500);
            $(".only_pc .ref-bg").css("z-index", "");
        }

        if (scrollE >= 2500) {
            $(".only_pc .collec_info01").css("opacity", "0");
        } else if (scrollE < 1999) {
            $(".only_pc .collec_info01").css("opacity", "1");
        }


        var divFenix = $(".only_pc .img-fenix").offset().top - 250,
            divFebo = $(".only_pc .scr-ev .co_txStyle03").offset().top,
            divCi04 = $(".only_pc .collc_info03").offset().top,
            divCi06 = $(".only_pc .collec_info04").offset().top,
            divFenix2 = $(".only_pc .fenix-bx").offset().top - 100;
        var newPosition = 0,
            newPosition2 = 0,
            opacitya = 0;

        var newPosition2 = scrollE - $(".only_pc .img-fenix").offset().top;
        var newPosition22 = -1 * newPosition2;
        var tranlate3 = 'translate(' + newPosition22 + 'px, 0px)';
        if (newPosition22 > 0) {
            var tranlate3 = 'translate(0px, 0px)';
        }

        if (scrollE >= divCi04 && scrollE < divCi06) {
            opacitya = (scrollE - divCi04) / (divCi06 - divCi04);
        } else if (scrollE >= divCi06) {
            opacitya = 1;
        }
        $(".only_pc .scr-ev").css("opacity", opacitya);

        if (scrollE >= divFebo && scrollE < divFebo + 200) {
            var scraa = (scrollE - divFebo) / (divFebo + 200 - divFebo)
            var scrP2 = 1 + scraa;
            var scalea = 'scale(' + scrP2 + ')';
            $(".only_pc .fenix-bg").css({
                transform: scalea
            });
            ////console.log(scraa, scalea);
        } else if (scrollE < divFebo) {
            $(".only_pc .fenix-bg").css({
                transform: "scale(1)"
            });
        }
        if (scrollE >= divFebo && scrollE < divFebo + 100) {
            $(".only_pc .fenix-bx > p").css("opacity", "0.8");
        }
        if (scrollE >= divFebo + 50 && scrollE < divFebo + 150) {
            $(".only_pc .fenix-bx > p").css("opacity", "0.6");
        } else {
            $(".only_pc .fenix-bx > p").css("opacity", "1");
        }

        if (scrollE >= divFenix2 + 100 && scrollE <= divFenix2 + ($(window).height() * 3)) {
            $(".only_pc .fenix-bx > p").css({
                "position": "fixed",
                "opacity": "1",
                "color": "#fefefe"
            });
            $(".only_pc .collec_info04 .fenix-bg").addClass("active");
        } else {
            $(".only_pc .fenix-bx > p").css({
                "position": "",
                color: "#404840"
            });
            $(".only_pc .collec_info04 .fenix-bg").removeClass("active");
        }
        if (scrollE >= divFenix2) {
            $(".only_pc .fenix-bx > p").css({ transform: tranlate3 });
        }
    }

    /*
    $(".collect_tab").find("button").click(function(){
    	$(".collect_tab, .tab_ct").find("button").removeClass("active");
    	var thisC = "#" + $(this).attr("class");
    	$(this, thisC).addClass("active");
     });
     */
    loaded();

    var myScroll;
    var position;
    var myScroll2;
    var position2;

    function loaded() {
        position2 = document.getElementById('position2');
        myScroll2 = new IScroll('.only_pc .scroll-area', {
            probeType: 3,
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            bounce: false,

        });


    }

    function updatePosition() {

        var x = this.x >> 0;
        //console.log(x);
    }

    $(".only_pc .style-button > ul > li > button").click(function() {
        $(".only_pc .style-button > ul > li > button").removeClass("active");
        $(this).addClass("active");
        $(".only_pc .collec_info05 > ul > li").removeClass("fade");
        var thisa = "." + $(this).attr("id");
        $(thisa).addClass("fade");
    });

});