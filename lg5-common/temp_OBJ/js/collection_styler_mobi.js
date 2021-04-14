$(function() {
    new WOW().init();
    var rellaxM = new Rellax('.only_mobile .rellax');

    var sumM = 0;
    $(".only_mobile .rellax").each(function() {
        var divHM = $(this).parent("div").offset().top / 2;
        $(this).find(".img-overflow2").css("margin-top", divHM);
    });

    if ($(window).width() > 1300) {
        var resizefirWM = $("#wrap").width() / 2 - 375;
        var resizefirW2M = $("#wrap").width() / 2 - 650;
        var firWM = resizefirWM + 3000;
        var firW2M = resizefirWM + (530 * 7);

        //console.log(resizefirWM);

        $(".only_mobile .slider00").css("width", resizefirWM);
        $(".only_mobile .ref-slider").css("width", firWM);

    } else {

        var resizefirWM = ($(window).width() - 750) / 2;

        var firWM = 3000;
        var firW2M = 530 * 7;

        //console.log(resizefirWM);

        $(".only_mobile .slider00").css("width", resizefirWM);
        $(".only_mobile .ref-slider").css("width", firWM);


    }

    scrollEventM();

    $(window).on('resize', function() {
        scrollEventM();
        $(".only_mobile .rellax").each(function() {
            var divHM = $(this).parent("div").offset().top / 2;
            $(this).find(".img-overflow2").css("margin-top", divHM);
        });

        if ($(window).width() > 1300) {
            var resizefirWM = $("#wrap").width() / 2 - 375;
            var resizefirW2M = $("#wrap").width() / 2 - 650;
            var firWM = resizefirWM + 3000;
            var firW2M = resizefirWM + (530 * 7);

            //console.log(resizefirWM);

            $(".only_mobile .slider00").css("width", resizefirWM);
            $(".only_mobile .ref-slider").css("width", firWM);

        } else {

            var resizefirWM = ($(window).width() - 750) / 2;

            var firWM = 3000;
            var firW2M = 530 * 7;

            //console.log(resizefirWM);

            $(".only_mobile .slider00").css("width", resizefirWM);
            $(".only_mobile .ref-slider").css("width", firWM);


        }

    });

    $(window).scroll(function() {
        scrollEventM();
        $(".only_mobile .rellax").each(function() {
            var divHM = $(this).parent("div").offset().top / 2;
            $(this).find(".img-overflow2").css("margin-top", divHM);
        });
    });

    function scrollEventM() {
        var scrollEM = $(window).scrollTop();
        //console.log(scrollEM);



        if (scrollEM >= 100) {
            $(".only_mobile .collect_tab").addClass("active");
            $(".only_mobile .collect_tab").css("top", "55px");
        } else {
            $(".only_mobile .collect_tab").removeClass("active");
            $(".only_mobile .collect_tab").css("top", "-55px");
        }

        if (scrollEM >= 1 && scrollEM < 30) {
            var scrPM = 1 - (scrollEM * 0.001);
            var tranlateM = 'scale(' + scrPM + ') translateX(' + -scrollEM + 'px) translateY(' + -scrollEM * 0.30 + 'px)';
            $(".only_mobile .ref-img").css({
                transform: tranlateM,
            });
            $(".only_mobile .detail .ref-width").css("text-align", "right");

        } else if (scrollEM >= 30 && scrollEM < 300) {
            var scrPM = 1 - (scrollEM * 0.00073);
            var tranlateM = 'scale(' + scrPM + ') translateY(' + -scrollEM * 1 + 'px) translateX(0px)';
            $(".only_mobile .ref-img").css({
                transform: tranlateM,
            });
            $(".only_mobile .detail .ref-width").css("text-align", "center");
            if ($(".only_mobile .ref-img").css("display") == "none") {
                $(".only_mobile .ref-img").fadeIn();
            }
        } else if (scrollEM >= 300) {
            $(".only_mobile .ref-img").fadeOut();
        }
        if (scrollEM >= 1400) {
            $(".only_mobile .collec_info01 .co_txStyle01").fadeIn();
        } else {
            $(".only_mobile .collec_info01 .co_txStyle01").fadeOut();
        }

        if (scrollEM >= 30) {
            $(".only_mobile .ref-img").addClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-styler-big\.png$/, 'img-styler.png'));
        } else {
            $(".only_mobile .ref-img").removeClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-styler\.png$/, 'img-styler-big.png'));
        }

        var fadeStartM = 200,
            fadeUntilM = 300,
            fadeOutM = 1500,
            fadeEndM = 700,
            fadingM = $(".only_mobile .ref-bg");
        var fadeStart2M = 1200,
            fadeUntil2M = 1300,
            fadeOut2M = 2300,
            fadeEnd2M = 2400,
            fading2M = $("#reFscrollM"),
            fading22M = $(".only_mobile .collec-name");
        var opacityM = 0,
            opacity2M = 0,
            opacity3M = 0,
            opacity4M = 0,
            opacity5M = 0;

        if (scrollEM <= fadeStartM) {
            opacityM = 0;
        } else if (scrollEM >= fadeStartM) {
            opacityM = (scrollEM - fadeStartM) / (fadeUntilM - fadeStartM);
        }

        if (scrollEM >= fadeOutM) {
            opacityM = 0;
            //$(".detail .ref-width .ref-img.scroll").css('opacity',opacity);
        }
        fadingM.css('opacity', opacityM);


        if (scrollEM == 0) {

        } else if (scrollEM >= 700) {
            if ($(".only_mobile .collec_info01 .co_txStyle01").hasClass("type02") == false) {
                $(".only_mobile .collec_info01 .co_txStyle01").addClass("type02 fix");
                fading2M.css({
                    "z-index": "4",
                    visibility: "visible",
                }).fadeIn(500);
                fading22M.css({
                    visibility: "visible",
                }).fadeIn(500);
                $(".only_mobile .ref-bg").css("z-index", "2");
            }
        } else {
            $(".only_mobile .collec_info01 .co_txStyle01").removeClass("type02 fix");
            fading2M.fadeOut(500);
            fading22M.fadeOut(500);
            $(".only_mobile .ref-bg").css("z-index", "");
        }

        if (scrollEM >= 1200) {
            $(".only_mobile .collec_info01").css("opacity", "0");
        } else if (scrollEM < 1199) {
            $(".only_mobile .collec_info01").css("opacity", "1");
        }

        var refScM = $(".only_mobile .ref-design").offset().top - $(window).height();
        if (scrollEM < refScM) {
            $("#reFscrollM").css("z-index", "4");
        }

        var refScM = $(".only_mobile .ref-design").offset().top - $(window).height();
        if (scrollEM < refScM) {
            $("#reFscrollM").css("z-index", "4");
        }

        var divFenixM = $(".only_mobile .img-fenix").offset().top - 250,
            divFeboM = $(".only_mobile .scr-ev").offset().top + 104,
            divCi04M = $(".only_mobile .collc_info03").offset().top,
            divCi06M = $(".only_mobile .collec_info04").offset().top,
            divFenix2M = $(".only_mobile .fenix-bx").offset().top - 100;
        var newPositionM = 0,
            newPosition2M = 0,
            opacityaM = 0;

        var newPosition2M = scrollEM - $(".only_mobile .img-fenix").offset().top;
        var newPosition22M = -1 * newPosition2M;
        var tranlate3M = 'translate(' + newPosition22M + 'px, 0px)';
        if (newPosition22M > 0) {
            var tranlate3M = 'translate(0px, 0px)';
        }

        if (scrollEM >= divCi04M && scrollEM < divCi06M) {
            opacityaM = (scrollEM - divCi04M) / (divCi06M - divCi04M);
        } else if (scrollEM >= divCi06M) {
            opacityaM = 1;
        }
        $(".only_mobile .scr-ev").css("opacity", opacityaM);

        if (scrollEM >= divFeboM && scrollEM < divFeboM + 200) {
            var scraaM = (scrollEM - divFeboM) / (divFeboM + 200 - divFeboM)
            var scrP2M = 1 + scraaM;
            var scaleaM = 'scale(' + scrP2M + ')';
            $(".only_mobile .fenix-bg").css({
                transform: scaleaM
            });
            ////console.log(scraa, scalea);
        } else if (scrollEM < divFeboM) {
            $(".only_mobile .fenix-bg").css({
                transform: "scale(1)"
            });
        }
        if (scrollEM >= divFeboM && scrollEM < divFeboM + 100) {
            $(".only_mobile .fenix-bx > p").css("opacity", "0.8");
        }
        if (scrollEM >= divFeboM + 50 && scrollEM < divFeboM + 150) {
            $(".only_mobile .fenix-bx > p").css("opacity", "0.6");
        } else {
            $(".only_mobile .fenix-bx > p").css("opacity", "1");
        }

        if (scrollEM >= divFenix2M + 100 && scrollEM <= divFenix2M + ($(window).height() * 3)) {
            $(".only_mobile .fenix-bx > p").css({
                "position": "fixed",
                "opacity": "1",
                //"color": "#fefefe"
            });
            $(".only_mobile .collec_info04 .fenix-bg").addClass("active");
        } else {
            $(".only_mobile .fenix-bx > p").css("position", "");
            $(".only_mobile .collec_info04 .fenix-bg").removeClass("active");
        }
        if (scrollEM >= divFenix2M) {
            $(".only_mobile .fenix-bx > p").css({ transform: tranlate3M });
        }


        /*
        var style01 = $(".collec_info05 .style01").offset().top;
        var style02 = $(".collec_info05 .style02").offset().top;
        var style03 = $(".collec_info05 .style03").offset().top;
        var style04 = $(".ref-function").offset().top;
        var opacityP = 0, opacityP2=0;
        		
        if ( scrollE >= style01 &&  scrollE < style02 ){
        	opacityP = ( scrollE - style01 ) / (  style02 - style01 );
        	opacityP2 = 1 - (( scrollE - style01 ) / (  style02 - style01 ));
        	$(".collec_info05 .co-style").css({
        		position: "fixed",
        	});
        	$(".collec_info05 .style02 .co-style").css({
        		position: "fixed",
        		opacity: opacityP
        	});

        	$(".collec_info05 .style01 .co-style").css({
        		opacity: opacityP2
        	});
        	$(".style-button").fadeIn();
        	$(".style-button > ul > li > button").removeClass("active");
        	$(".btn-style01").addClass("active");
        } else if ( scrollE >= style02 &&  scrollE < style03 ){
        	opacityP = ( scrollE - style02 ) / (  style03 - style02 );
        	opacityP2 = 1 - (( scrollE - style02 ) / (  style03 - style02 ));
        	$(".collec_info05 .style03 .co-style").css({
        		opacity: opacityP
        	});

        	$(".collec_info05 .style02 .co-style").css({
        		opacity: opacityP2
        	});
        	$(".style-button > ul > li > button").removeClass("active");
        	$(".btn-style02").addClass("active");
        } else if (  scrollE >= style03 &&  scrollE < style04 ) {
        		   
        	$(".style-button > ul > li > button").removeClass("active");
        	$(".btn-style03").addClass("active");
        	
        }  else if ( scrollE < style01 ) {
        	$(".collec_info05 .co-style").css({
        		position: "absolute"
        	});
        	$(".style-button").fadeOut();
        }
        if ( scrollE >= style04 ) {
        	$(".style-button").fadeOut();
        	opacityP2 = 1 - (( scrollE - style04 ) / (  (style04 + $(window).height() ) - style04 ));
        	$(".collec_info05 .style03 .co-style").css({
        		opacity: opacityP2
        	});
        }
        */
        var stM = $(".only_mobile .st_function").offset().top,
            st2M = stM + $(window).height(),
            st3M = st2M + $(window).height(),
            st4M = st3M + $(window).height(),
            st5M = st4M + $(window).height(),
            st6M = $(".only_mobile .styler_func .ct_width").offset().top,
            opaM = 0;

        if (scrollEM >= st6M && scrollEM < st5M) {
            opaM = (scrollEM - st6M) / (stM - st6M);
        } else if (scrollEM >= st5M) {
            opaM = 1 - (scrollEM - st5M) / ((st5M + 300) - st5M);
        }
        $(".only_mobile .sf-nav").css("opacity", opaM);


        if (scrollEM >= stM && scrollEM < st2M) {
            $(".only_mobile .sfVidoe02").fadeOut(1000);
            $(".only_mobile .sfVidoe02").find("video").get(0).pause();

            $(".only_mobile .sf-nav button").removeClass("active");
            $("#sfVidoe01M").addClass("active");

            if ($(".only_mobile .sfVidoe01").css("display") == "none") {
                $(".only_mobile .sfVidoe01").fadeIn(1000);
                $(".only_mobile .sfVidoe01").css("position", "fixed");
                $(".only_mobile .sfVidoe01").find("video").get(0).play();
            } else {
                $(".only_mobile .sfVidoe01").css("position", "fixed");
                $(".only_mobile .sfVidoe01").find("video").get(0).play();
            }
        } else if (scrollEM >= st2M && scrollEM < st3M) {
            $(".only_mobile sfVidoe01, .only_mobile .sfVidoe03").fadeOut(1000);
            $(".only_mobile .sfVidoe01, .only_mobile .sfVidoe03").find("video").get(0).pause();

            $(".only_mobile .sf-nav button").removeClass("active");
            $("#sfVidoe02M").addClass("active");

            if ($(".only_mobile .sfVidoe02").css("display") == "none") {
                $(".only_mobile .sfVidoe02").css("position", "fixed");
                $(".only_mobile .sfVidoe02").fadeIn(1000);
                $(".only_mobile .sfVidoe02").find("video").get(0).play();
            }
        } else if (scrollEM >= st3M && scrollEM < st4M) {
            $(".only_mobile .sfVidoe02, .only_mobile .sfVidoe04").fadeOut(1000);
            //$(".sfVidoe02, .sfVidoe04").find("video").get(0).pause();

            $(".only_mobile .sf-nav button").removeClass("active");
            $("#sfVidoe03M").addClass("active");

            if ($(".only_mobile .sfVidoe03").css("display") == "none") {
                $(".only_mobile .sfVidoe03").css("position", "fixed");
                $(".only_mobile .sfVidoe03").fadeIn(1000);
                $(".only_mobile .sfVidoe03").find("video").get(0).play();
            }
        } else if (scrollEM >= st4M && scrollEM < st5M) {
            $(".only_mobile .sfVidoe03").fadeOut(1000);
            $(".only_mobile .sfVidoe03").find("video").get(0).pause();

            $(".only_mobile .sf-nav button").removeClass("active");
            $("#sfVidoe04M").addClass("active");

            if ($(".only_mobile .sfVidoe04").css("display") == "none") {
                $(".only_mobile .sfVidoe04").fadeIn(1000);
                $(".only_mobile .sfVidoe04").css({
                    "position": "fixed",
                    "top": "0px",
                    "bottom": "inherit"
                });
                //$(".sfVidoe04").find("video").get(0).play();
            } else {
                $(".only_mobile .sfVidoe04").css({
                    "position": "fixed",
                    "top": "0px",
                    "bottom": "inherit"
                });
            }
        } else if (scrollEM >= st5M) {
            $(".only_mobile .sfVidoe03,.only_mobile .sfVidoe02,.only_mobile .sfVidoe01").css("display", "none");
            $(".only_mobile .sfVidoe04").css({
                "position": "absolute",
                "top": "inherit",
                "bottom": "0px"
            });
        } else if (scrollEM < stM) {
            $(".only_mobile .st_function > ul > li").removeAttr("style");
        }

    }

    /*
    $(".collect_tab").find("button").click(function(){
    	$(".collect_tab, .tab_ct").find("button").removeClass("active");
    	var thisC = "#" + $(this).attr("class");
    	$(this, thisC).addClass("active");
     });
     */
    loadedM();

    var myScrollM;
    var positionM;

    function loadedM() {
        positionM = document.getElementById('position');
        myScrollM = new IScroll('#reFscrollM', {
            probeType: 3,
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            bounce: false,

        });
        myScrollM.on('scroll', updatePositionM);
        myScrollM.on('scrollEnd', updatePositionM);



    }

    function updatePositionM() {

        var x = this.x >> 0;
        //console.log(x);


        var resWM = -1 * $(".only_mobile .ref-slider").width() + $(window).width();
        //console.log(resWM);
        if (x <= resWM) {
            $("#reFscrollM").css("z-index", "2");
        } else if (x == 0) {
            $("#reFscrollM").css("z-index", "2");
        } else {
            $("#reFscrollM").css("z-index", "999");
        }
    }

    $(".only_mobile .style-button > ul > li > button").click(function() {
        $(".only_mobile .style-button > ul > li > button").removeClass("active");
        $(this).addClass("active");
        $(".only_mobile .collec_info05 > ul > li").removeClass("fade");
        var thisaM = "." + $(this).attr("id");
        $(thisaM).addClass("fade");
    });
    /* 
    var style01 = $(".collec_info05 .style01").offset().top;
    var style02 = $(".collec_info05 .style02").offset().top;
    var style03 = $(".collec_info05 .style03").offset().top;
	
    $(".btn-style01").on("click", function(){
    	$('html, body').animate({scrollTop: style01 +1 }, 1000);
    });
    $(".btn-style02").on("click", function(){
    	$('html, body').animate({scrollTop: style02 +1 }, 1000);
    });
    $(".btn-style03").on("click", function(){
    	$('html, body').animate({scrollTop: style03 +1 }, 1000);
    });
    */
    var swiperM = new Swiper('.only_mobile .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        speed: 500,
    });
    var swiperM = new Swiper('.only_mobile .swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        speed: 500,
    });
});