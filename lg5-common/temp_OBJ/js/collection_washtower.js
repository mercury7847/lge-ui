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
                $(this).find(".only_pc .img-overflow2").css("margin-top", divH);
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

    if ($(window).width() > 1300) {
        var resizefirW = $("#wrap").width() / 2 - 375;
        var resizefirW2 = $("#wrap").width() / 2 - 650;
        var firW = resizefirW + 3000;
        var firW2 = resizefirW + (530 * 7);

        ////console.log( resizefirW );

        $(".only_pc .slider00").css("width", resizefirW);
        $(".only_pc .ref-slider").css("width", firW);

    } else {

        var resizefirW = ($(window).width() - 750) / 2;

        var firW = 3000;
        var firW2 = 530 * 7;

        ////console.log( resizefirW );

        $(".only_pc .slider00").css("width", resizefirW);
        $(".only_pc .ref-slider").css("width", firW);


    }

    scrollEvent();

    $(window).on('resize', function() {
        scrollEvent();


        if ($(window).width() > 1300) {
            var resizefirW = $("#wrap").width() / 2 - 375;
            var resizefirW2 = $("#wrap").width() / 2 - 650;
            var firW = resizefirW + 3000;
            var firW2 = resizefirW + (530 * 7);

            ////console.log( resizefirW );

            $(".only_pc .slider00").css("width", resizefirW);
            $(".only_pc .ref-slider").css("width", firW);

        } else {


            var resizefirW = ($(window).width() - 750) / 2;

            var firW = 3000;
            var firW2 = 530 * 7;

            ////console.log( resizefirW );

            $(".only_pc .slider00").css("width", resizefirW);
            $(".only_pc .ref-slider").css("width", firW);


        }

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


        if (scrollE >= 300) {
            $(".only_pc .ref-img").addClass("scroll");
            $(".only_pc .ref-img img").attr("src", $(".only_pc .ref-img img").attr("src").replace(/img-wash-big\.png$/, 'img-wash.png'));
        } else {
            $(".only_pc .ref-img").removeClass("scroll");
            $(".only_pc .ref-img img").attr("src", $(".only_pc .ref-img img").attr("src").replace(/img-wash\.png$/, 'img-wash-big.png'));
        }

        if (scrollE >= 1 && scrollE < 300) {

            var scrP = 1 - (scrollE * 0.0004);
            var tranlate = 'scale(' + scrP + ') translateX(' + -(scrollE * 2) + 'px)';
            $(".only_pc .detail .ref-width").css("text-align", "right");

        } else if (scrollE >= 300 && scrollE < 700) {
            var scrP = 1 - (scrollE * 0.0006);

            var tranlate = 'scale(' + scrP + ') translateY(' + scrollE * 0.10 + 'px)';
            $(".only_pc .detail .ref-width").css("text-align", "center");

        } else if (scrollE < 1100) {
            $(".only_pc .collec_info01 .co_txStyle01").addClass("fix");

        } else if (scrollE < 1199) {
            if ($(".only_pc .ref-img").css("display") == "none") {
                $(".only_pc .ref-img").fadeIn();
            }
        } else if (scrollE >= 1200) {
            $(".only_pc .ref-img").fadeOut();
        }

        $(".only_pc .ref-img").css({
            transform: tranlate,
        });

        if (scrollE >= 950) {
            $(".only_pc .collec_info01 .co_txStyle01").fadeIn();
        } else {
            $(".only_pc .collec_info01 .co_txStyle01").fadeOut();
        }

        var fadeStart = 800,
            fadeUntil = 1000,
            fading = $(".only_pc .ref-bg");
        var fadeStart2 = 1100,
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
        } else if (scrollE >= fadeStart && scrollE < fadeStart2) {

            opacity = (scrollE - fadeStart) / (fadeUntil - fadeStart);

        } else if (scrollE >= fadeStart2 && scrollE < fadeUntil2) {

            opacity = 1 - (scrollE - fadeStart2) / (fadeUntil2 - fadeStart2);

        }
        fading.css('opacity', opacity);


        if (scrollE < 1300) {
            $(".only_pc .collec_info01 .co_txStyle01").removeClass("type02");
            fading2.fadeOut(500);
            fading22.fadeOut(500);
            $(".only_pc .ref-bg").css("z-index", "");
        } else if (scrollE >= 1300) {
            $(".only_pc .collec_info01 .co_txStyle01").addClass("type02");
            fading2.css({
                "z-index": "999",
                visibility: "visible",
            }).fadeIn(500);
            fading2.focusin();
            fading22.css({
                visibility: "visible",
            }).fadeIn(500);
            $(".only_pc .ref-bg").css("z-index", "3");
        }

        if (scrollE >= 2500) {
            $(".only_pc .collec_info01").css("opacity", "0");
        } else if (scrollE < 2499) {
            $(".only_pc .collec_info01").css("opacity", "1");
        }

        var refSc = $(".only_pc .ref-design").offset().top - $(window).height();
        if (scrollE < refSc) {
            $("#reFscroll").css("z-index", "999");
        }

        var divFenix = $(".only_pc .img-fenix").offset().top - 250,
            divFebo = $(".only_pc .scr-ev").offset().top + 104,
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
                //"color": "#fefefe"
            });
            $(".only_pc .collec_info04 .fenix-bg").addClass("active");
        } else {
            $(".only_pc .fenix-bx > p").css("position", "");
            $(".only_pc .collec_info04 .fenix-bg").removeClass("active");
        }
        if (scrollE >= divFenix2) {
            $(".only_pc .fenix-bx > p").css({ transform: tranlate3 });
        }

        var style01 = $(".only_pc .collec_info05 .style01").offset().top;
        var style12 = $(".only_pc .collec_info05 .style02").offset().top - ($(window).height() / 2);
        var style02 = $(".only_pc .collec_info05 .style02").offset().top;
        var style22 = $(".only_pc .collec_info05 .style03").offset().top - ($(window).height() / 2);
        var style03 = $(".only_pc .collec_info05 .style03").offset().top;
        var style04 = $(".only_pc .ref-function").offset().top;
        var opacityP = 0,
            opacityP2 = 0;

        if (scrollE >= style01 && scrollE < style12) {
            opacityP = (scrollE - style01) / (style12 - style01);
            opacityP2 = 1 - ((scrollE - style01) / (style12 - style01));
            $(".only_pc .collec_info05 .co-style").css({
                position: "fixed",
            });

            $(".only_pc .collec_info05 .style02 .co-style,.only_pc .collec_info05 .style03 .co-style").css({
                opacity: 0
            });
            $(".only_pc .collec_info05 .style01 .co-style").css({
                opacity: opacityP2
            });

            $(".only_pc .style-button").fadeIn();
            $(".only_pc .style-button > ul > li > button").removeClass("active");
            $(".only_pc .btn-style01").addClass("active");

        } else if (scrollE >= style12 && scrollE < style02) {
            opacityP = (scrollE - style12) / (style02 - style12);

            $(".only_pc .collec_info05 .style01 .co-style,.only_pc .collec_info05 .style03 .co-style").css({
                opacity: 0
            });
            $(".only_pc .collec_info05 .style02 .co-style").css({
                position: "fixed",
                opacity: opacityP
            });

        } else if (scrollE >= style02 && scrollE < style22) {
            opacityP2 = 1 - ((scrollE - style02) / (style22 - style02));
            $(".only_pc .collec_info05 .style02 .co-style").css({
                opacity: opacityP2
            });

            $(".only_pc .style-button > ul > li > button").removeClass("active");
            $(".only_pc .btn-style02").addClass("active");

        } else if (scrollE >= style22 && scrollE < style03) {
            opacityP = (scrollE - style22) / (style03 - style22);

            $(".only_pc .collec_info05 .style02 .co-style,.only_pc .collec_info05 .style01 .co-style").css({
                opacity: 0
            });
            $(".only_pc .collec_info05 .style03 .co-style").css({
                opacity: opacityP
            });

            $(".only_pc .style-button > ul > li > button").removeClass("active");
            $(".only_pc .btn-style03").addClass("active");

        } else if (scrollE < style01 - 1) {
            $(".only_pc .collec_info05 .co-style").css({
                position: "absolute"
            });
            $(".only_pc .style-button").fadeOut();
        }
        if (scrollE >= style04) {
            $(".only_pc .style-button").fadeOut();
            opacityP2 = 1 - ((scrollE - style04) / ((style04 + $(window).height()) - style04));
            $(".only_pc .collec_info05 .style03 .co-style").css({
                opacity: opacityP2
            });
            $(".only_pc .co-style").css("opacity", "0");
        }

        var multiStart1 = $(".only_pc .wt-block-scroll").offset().top,
            multiStart2 = $(".only_pc .wt-block-scroll").offset().top + $(window).height(),
            multiOpaticy = 0;

        if (scrollE >= multiStart1 && scrollE <= multiStart2) {
            multiOpaticy = (scrollE - multiStart1) / (multiStart2 - multiStart1);
            $(".only_pc .wt-block-scroll .light-design").css({
                'opacity': 1 - multiOpaticy,
                position: "fixed",
                top: "0px"
            });
            $(".only_pc .wt-block-scroll .light-design-on").css({
                'opacity': multiOpaticy,
                position: "fixed",
                top: "0px"
            });
        } else if (scrollE < multiStart1) {
            $(".only_pc .wt-block-scroll > div").removeAttr("style");
        } else if (scrollE >= multiStart2) {
            $(".only_pc .wt-block-scroll .light-design").css({
                'opacity': 0,
                position: "absolute",
            });
            $(".only_pc .wt-block-scroll .light-design-on").css({
                'opacity': 1,
                position: "absolute",
                top: "100vh"
            });
        }

        var amultiStart1 = $(".only_pc .washTower_step").offset().top,
            amultiStart2 = amultiStart1 + $(window).height(),
            amultiStart3 = amultiStart2 + $(window).height(),
            amultiOpaticy = 0;

        ////console.log(amultiStart1, amultiStart2, amultiStart3);

        if (scrollE > amultiStart1 && scrollE < amultiStart3) {
            $(".only_pc .washTower_step > div").css({
                position: "fixed",
                top: "0px"
            });
        } else {
            $(".only_pc .washTower_step > div").css({
                position: "relative",
                top: "0px"
            });
        }

        if (scrollE >= amultiStart1 && scrollE < amultiStart2) {
            amultiOpaticy = (scrollE - amultiStart1) / (amultiStart2 - amultiStart1);
            $(".only_pc .step01").css({ 'opacity': 1 - amultiOpaticy });
            $(".only_pc .step02").css({ 'opacity': amultiOpaticy });
        } else if (scrollE < amultiStart2) {
            $(".only_pc .step02").css({ 'opacity': 0 });
        }

        if (scrollE >= amultiStart2 && scrollE < amultiStart3) {
            amultiOpaticy = (scrollE - amultiStart2) / (amultiStart3 - amultiStart2);
            $(".only_pc .step02").css({ 'opacity': 1 - amultiOpaticy });
            $(".only_pc .step03").css({ 'opacity': amultiOpaticy });
        } else if (scrollE >= amultiStart3) {
            $(".only_pc .step01, .only_pc .step02").css({ 'opacity': 1 });
            $(".only_pc .step03").css({ 'opacity': 1 });
        }
        /*
        $(".img-overflow").each(function(){
        	var scrollDiv = $(this).offset().top - $(window).height();
        	if ( scrollE >= scrollDiv ) {
        		var scrollDV = ( scrollE - scrollDiv) / (  scrollDiv - scrollDiv + $(window).height());
        		////console.log(scrollDV);

        		var rellaxScroll = -1 * ( $(this).height() / 4 ) + ( $(this).height() / 4 * scrollDV) ;
        		var matrixH = "matrix(1, 0, 0, 1, 0, " + rellaxScroll +")";
        		$(this).find("img").css({
        			transform: matrixH
        		});
        	} else {
        		$(this).find("img").removeAttr("style");
        	}
        });
        */
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
        position = document.getElementById('position');
        myScroll = new IScroll('#reFscroll', {
            probeType: 3,
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            bounce: false,

        });
        myScroll.on('scroll', updatePosition);
        myScroll.on('scrollEnd', updatePosition);
    }

    function updatePosition() {

        var x = this.x >> 0;
        //console.log( x );

        var resW = -1 * $(".only_pc .ref-slider").width() + $(window).width();

        if (x <= resW) {
            $("#reFscroll").css("z-index", "2");
            $("#co_design").focusin();
        } else if (x == 0) {
            $("#reFscroll").css("z-index", "2");
        } else {
            $("#reFscroll").css("z-index", "999");
            $("#reFscroll").focusin();
        }
    }

    $(".only_pc .style-button > ul > li > button").click(function() {
        var thisa = "." + $(this).attr("id");
        var scrollMove = $(thisa).offset().top + 1;

        $('html, body').animate({
            scrollTop: scrollMove
        });
        return false;

        $(".only_pc .collec_info05 .co-style").css({
            opacity: "0",
        });
    });

});