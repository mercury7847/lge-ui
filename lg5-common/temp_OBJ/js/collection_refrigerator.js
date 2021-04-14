	$(function() {
	    var rellax = new Rellax('.only_pc .rellax');

	    $(".only_pc .rellax").each(function() {
	        var divH = $(this).parent("div").offset().top / 2;
	        $(this).find(".img-overflow2").css("margin-top", divH);
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

	    new WOW().init();

	    var sum = 0;


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

	    if ($(window).width() > 1300) {
	        var resizefirW = $(window).width() / 2 - 375;
	        var resizefirW2 = $(window).width() / 2 - 650;
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
	            var resizefirW = $(window).width() / 2 - 375;
	            var resizefirW2 = $(window).width() / 2 - 650;
	            var firW = resizefirW + 3000;
	            var firW2 = resizefirW + (530 * 7);

	            /////console.log( resizefirW );

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
	        // //console.log(scrollE);

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
	            if ($(".only_pc .ref-img").css("display") == "none") {
	                $(".only_pc .ref-img").fadeIn();
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
	            $(".only_pc .ref-img img").attr("src", $(".ref-img img").attr("src").replace(/img-ref-big\.png$/, 'img-ref.png'));
	        } else {
	            $(".only_pc .ref-img").removeClass("scroll");
	            $(".only_pc .ref-img img").attr("src", $(".ref-img img").attr("src").replace(/img-ref\.png$/, 'img-ref-big.png'));
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
	            fading2 = $(".only_pc #reFscroll"),
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

	        var refSc = $(".only_pc .ref-design").offset().top - $(window).height();
	        if (scrollE < refSc) {
	            $(".only_pc #reFscroll").css("z-index", "4");
	        }

	        var divFenix = $(".only_pc .img-fenix").offset().top - 250,
	            divFebo = $(".only_pc .scr-ev .co_txStyle04").offset().top,
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



	        var divY2 = $(".only_pc .info09W").offset().top;
	        var fadeStartDiv2 = divY2,
	            fadeUntilDiv2 = divY2 + 100;

	        if (scrollE >= fadeStartDiv2) {
	            opacity5 = (scrollE - fadeStartDiv2) / (fadeUntilDiv2 - fadeStartDiv2);
	            $(".only_pc .info09W").css("background-attachment", "fixed");
	        } else if (scrollE > fadeUntilDiv2) {
	            opacity5 = 0.64;
	        } else {
	            $(".only_pc .info09W").removeAttr("style");
	            opacity5 = 0;
	        }
	        $(".only_pc .infoMask").css({ 'opacity': opacity5 });

	        var divY3 = $(".only_pc .ct06-bg01").offset().top;
	        var divY4 = $(".only_pc .ct06-bg02").offset().top;
	        var fadeStartDiv3 = divY3,
	            fadeUntilDiv3 = divY3 + $(window).height(),
	            fadeUntilDiv32 = divY3 + ($(window).height() / 2),
	            fadeStartDiv4 = divY4,
	            fadeUntilDiv4 = divY4 + ($(window).height() / 2),
	            fadeUntilDiv5 = divY4 + ($(window).height());
	        var opacity6 = 0,
	            opacity7 = 0;

	        if (scrollE > fadeStartDiv3 && scrollE < fadeUntilDiv3) {
	            if ($(".only_pc .ct06-bg01 .ct-width").hasClass("wow2") == false) {
	                $(".only_pc .ct06-bg01 .ct-width").fadeIn().addClass("wow2");
	                $(".only_pc .ct06-bg02 .ct-width").fadeOut().removeClass("wow2");
	            }
	        } else if (scrollE < fadeStartDiv3) {
	            $(".only_pc .ct06-bg01 .ct-width").fadeOut().removeClass("wow2");
	        }

	        if (scrollE > fadeStartDiv3 && scrollE < fadeUntilDiv4) {
	            opacity6 = 1 - ((scrollE - fadeStartDiv3) / (fadeUntilDiv4 - fadeStartDiv3));
	        } else if (scrollE >= fadeUntilDiv4) {
	            opacity6 = 0;
	        }
	        $(".only_pc .info092W .bg01").css({ 'opacity': opacity6 });

	        if (scrollE > fadeStartDiv3 + 285) {
	            $(".only_pc .info092W .bg01").css({
	                "position": "fixed",
	                top: "-165px",
	            });
	        } else {
	            $(".only_pc .info092W .bg01").removeAttr("style");
	        }

	        if (scrollE > fadeStartDiv3 + 120) {
	            $(".only_pc .info092W .bg02").css({
	                "position": "fixed",
	                top: "initial",
	                top: "0px"
	            });
	        } else {
	            $(".only_pc .info092W .bg02").removeAttr("style");
	        }


	        if (scrollE > fadeStartDiv4 && scrollE < fadeUntilDiv4) {
	            if ($(".only_pc .ct06-bg02 .ct-width").hasClass("wow2") == false) {
	                $(".only_pc .ct06-bg01 .ct-width").fadeOut().removeClass("wow2");
	                $(".only_pc .ct06-bg02 .ct-width").fadeIn().addClass("wow2");
	            }
	        } else if (scrollE > fadeUntilDiv5) {
	            $(".only_pc .ct06-bg02 .ct-width").fadeOut().removeClass("wow2");
	        }
	        if (scrollE > fadeUntilDiv32 && scrollE < fadeUntilDiv4) {
	            opacity7 = (scrollE - fadeUntilDiv32) / (fadeUntilDiv4 - fadeUntilDiv32);
	        } else if (scrollE >= fadeUntilDiv4 && scrollE <= fadeUntilDiv4 + $(window).height() - 100) {
	            opacity7 = 1;
	        }
	        $(".only_pc .info092W .bg02").css({ 'opacity': opacity7 });





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


	        var refrig = $(".only_pc .collc_info07 .ct_width").offset().top + 246;
	        var refrig2 = refrig + $(window).height();
	        if (scrollE >= refrig && scrollE < refrig2) {
	            $(".only_pc .collc_info07 .ct_width2").css({
	                "position": "fixed",
	                "top": "0px",
	                "width": "1080px",
	                "left": "50%",
	                "margin-left": "-540px"
	            });
	            $(".only_pc .co07-refImg, .only_pc .co07-refImg-move").css({
	                "position": "fixed",
	                "top": "0px"
	            });
	        } else if (scrollE >= refrig2) {
	            $(".only_pc .collc_info07 .ct_width2").css({
	                "position": "absolute",
	                "bottom": "0px",
	                "top": "initial",
	                "width": "1080px",
	                "left": "50%",
	                "margin-left": "-540px"
	            });
	            $(".only_pc .co07-refImg, .only_pc .co07-refImg-move").css({
	                "position": "absolute",
	                "bottom": "0px",
	                "top": "initial",
	            });
	        } else if (scrollE < refrig) {
	            $(".only_pc .collc_info07 .ct_width2, .only_pc .co07-refImg, .only_pc .co07-refImg-move").removeAttr("style");
	        }

	        var fadeStartDiv = refrig,
	            fadeUntilDiv = refrig + 400,
	            fadingDiv = $(".only_pc .co07-refImg-move img");
	        if (scrollE >= fadeStartDiv) {
	            if (scrollE > fadeStartDiv && scrollE <= fadeUntilDiv) {
	                opacity4 = (scrollE - fadeStartDiv) / (fadeUntilDiv - fadeStartDiv);
	            } else if (scrollE > fadeUntilDiv) {
	                opacity4 = 1;
	            } else {
	                opacity4 = 0;
	            }
	        }
	        fadingDiv.css({ 'opacity': opacity4 });
	        ////console.log(divY, scrollE, fadeStartDiv , fadeUntilDiv);

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
	        myScroll = new IScroll('.only_pc #reFscroll', {
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
	        // //console.log(x);

	        var resW = -1 * $(".only_pc .ref-slider").width() + $(window).width();
	        // //console.log(resW);
	        if (x <= resW) {
	            $(".only_pc #reFscroll").css("z-index", "2");
	        } else if (x == 0) {
	            $(".only_pc #reFscroll").css("z-index", "2");
	        } else {
	            $(".only_pc #reFscroll").css("z-index", "999");
	        }
	    }

	});