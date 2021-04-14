$(function() {
    new WOW().init();
    var sumM = 0;

    scrollEventM();

    $(".only_mobile .img-overflow").each(function() {
        var imgovM = $(this).width();
        $(this).css("height", imgovM);
    });


    $(window).on('resize', function() {
        scrollEventM();
        $(".only_mobile .img-overflow").each(function() {
            var imgovM = $(this).width();
            $(this).css("height", imgovM);
        });

    });

    $(window).scroll(function() {
        scrollEventM();
        $(".only_mobile .img-overflow").each(function() {
            var imgovM = $(this).width();
            $(this).css("height", imgovM);
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
            var tranlateM = 'scale(' + scrPM + ') translateY(' + -scrollEM * 0.60 + 'px) translateX(0px)';
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
        if (scrollEM >= 200) {
            $(".only_mobile .collec_info01 .co_txStyle01").addClass("fix");
            $(".only_mobile .collec_info01 .co_txStyle01").fadeIn();
        } else {
            $(".only_mobile .collec_info01 .co_txStyle01").removeClass("type02 fix");
            $(".only_mobile .collec_info01 .co_txStyle01").fadeOut();
        }

        if (scrollEM >= 30) {
            $(".only_mobile .ref-img").addClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-wash-big\.png$/, 'img-wash.png'));
        } else {
            $(".only_mobile .ref-img").removeClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-wash\.png$/, 'img-wash-big.png'));
        }

        var fadeStartM = 200,
            fadeUntilM = 300,
            fadeOutM = 1800,
            fadeEndM = 700,
            fadingM = $(".ref-bg");
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
            //$(".collec_info01 .co_txStyle01").addClass("type02");
            fading2M.css({
                "z-index": "4",
                visibility: "visible",
            }).fadeIn(500);
            fading22M.css({
                visibility: "visible",
            }).fadeIn(500);
            $(".only_mobile .ref-bg").css("z-index", "2");
        } else {
            fading2M.fadeOut(500);
            fading22M.fadeOut(500);
            $(".only_mobile .ref-bg").css("z-index", "");
        }

        if (scrollEM >= 2000) {
            $(".only_mobile .collec_info01").css("opacity", "0");
        } else if (scrollEM < 1999) {
            $(".only_mobile .collec_info01").css("opacity", "1");
        }

        var refScM = $(".only_mobile .ref-design").offset().top - $(window).height();
        if (scrollEM < refScM) {
            $("#reFscrollM").css("z-index", "4");
        }

        var divFenixM = $(".only_mobile .img-fenix").offset().top - 250,
            divFeboM = $(".only_mobile .scr-ev .co_txStyle03").offset().top,
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
            var scrP2M = 1.2 + scraaM;
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

        var multiStart1M = $(".only_mobile .wt-block-scroll").offset().top,
            multiStart2M = multiStart1M + $(window).height(),
            multiStart3M = multiStart2M + $(window).height(),
            multiOpaticyM = 0;

        if (scrollEM >= multiStart1M && scrollEM <= multiStart2M) {
            multiOpaticyM = (scrollEM - multiStart1M) / (multiStart2M - multiStart1M);
            $(".only_mobile .wt-block-scroll .light-design").css({
                'opacity': 1 - multiOpaticyM,
                position: "fixed",
                top: "0px"
            });
            $(".only_mobile .wt-block-scroll .light-design-on").css({
                'opacity': multiOpaticyM,
                position: "fixed",
                top: "0px"
            });
        } else if (scrollEM < multiStart1M) {
            $(".only_mobile .wt-block-scroll > div").removeAttr("style");
        } else if (scrollEM >= multiStart2M) {
            $(".only_mobile .wt-block-scroll .light-design").css({
                'opacity': 0,
                position: "absolute",
            });
            $(".only_mobile .wt-block-scroll .light-design-on").css({
                'opacity': 1,
                position: "absolute",
                top: "100vh"
            });
        }

        var amultiStart1M = $(".only_mobile .washTower_step").offset().top,
            amultiStart2M = amultiStart1M + $(window).height(),
            amultiStart3M = amultiStart2M + $(window).height(),
            amultiStart4M = amultiStart3M + ($(window).height()),
            amultiOpaticyM = 0;
        var wHM = $(window).height();
        ////console.log(amultiStart1, amultiStart2, amultiStart3);
        if (scrollEM < amultiStart1M) {
            $(".only_mobile .washTower_step > div").css({
                position: "absolute",
                top: "0px",
                bottom: "initial"
            });
        } else if (scrollEM >= amultiStart1M && scrollEM <= amultiStart4M) {
            $(".only_mobile .washTower_step > div").css({
                position: "fixed",
                top: "0px",
                bottom: "initial"
            });
        } else if (scrollEM > amultiStart4M) {
            $(".only_mobile .washTower_step > div").css({
                position: "absolute",
                top: "initial",
                bottom: "0px"
            });
        }

        ////console.log(amultiStart4);
        if (scrollEM >= (amultiStart2M - (wHM / 2)) && scrollEM < amultiStart2M) {
            amultiOpaticyM = (scrollEM - (amultiStart2M - (wHM / 2))) / (amultiStart2M - (amultiStart2M - (wHM / 2)));
            //console.log("1");
            $(".only_mobile .step01 > div").css({ 'opacity': 1 - amultiOpaticyM });
            $(".only_mobile .step03 > div").css({ 'opacity': 0 });
            $(".only_mobile .step02 > div").css({ 'opacity': amultiOpaticyM });
        } else if (scrollEM >= (amultiStart3M - (wHM / 2)) && scrollEM < amultiStart3M) {
            amultiOpaticyM = (scrollEM - (amultiStart3M - (wHM / 2))) / (amultiStart3M - (amultiStart3M - (wHM / 2)));
            //console.log("2");
            $(".only_mobile .step01 > div").css({ 'opacity': 0 });
            $(".only_mobile .step02 > div").css({ 'opacity': 1 - amultiOpaticyM });
            $(".only_mobile .step03 > div").css({ 'opacity': amultiOpaticyM });
        }
        if (scrollEM >= amultiStart3M) {
            //console.log("3");
            $(".only_mobile .step01 > div").css({ 'opacity': 0 });
            $(".only_mobile .step02 > div").css({ 'opacity': 0 });
            $(".only_mobile .step03 > div").css({ 'opacity': 1 });
        } else if (scrollEM < amultiStart1M) {
            $(".only_mobile .step01 > div").css({ 'opacity': 1 });
            $(".only_mobile .step02 > div").css({ 'opacity': 0 });
            $(".only_mobile .step03 > div").css({ 'opacity': 0 });
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
    }

    $(".only_mobile .style-button > ul > li > button").click(function() {
        $(".only_mobile .style-button > ul > li > button").removeClass("active");
        $(this).addClass("active");
        $(".only_mobile .collec_info05 > ul > li").removeClass("fade");
        var thisaM = "." + $(this).attr("id");
        $(thisa).addClass("fade");
    });

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