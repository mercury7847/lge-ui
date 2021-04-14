$(function() {
    new WOW().init();
    var rellaxM = new Rellax('.only_mobile .rellax');

    var sum = 0;

    $(".only_mobile .rellax").each(function() {
        var divHM = $(this).parent("div").offset().top / 2;
        $(this).find(".img-overflow2").css("margin-top", divHM);
    });

    scrollEventM();

    $(window).on('resize', function() {
        scrollEventM();
        $(".only_mobile .rellax").each(function() {
            var divHM = $(this).parent("div").offset().top / 2;
            $(this).find(".img-overflow2").css("margin-top", divHM);
        });
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

        if (scrollEM >= 1 && scrollEM < 30) {
            var scrPM = 1 - (scrollEM * 0.001);
            var tranlateM = 'scale(' + scrPM + ') translateX(' + -scrollEM + 'px) translateY(' + -scrollEM * 0.30 + 'px)';
            $(".only_mobile .ref-img").css({
                transform: tranlateM,
            });
            $(".only_mobile .detail .ref-width").css("text-align", "right");

        } else if (scrollEM >= 30 && scrollEM < 300) {
            var scrPM = 1 - (scrollEM * 0.003);
            var tranlateM = 'scale(0.7) translateY(' + -scrollEM * 1.5 + 'px) translateX(0px)';
            $(".only_mobile .ref-img").css({
                transform: tranlateM,
            });
            $(".only_mobile .detail .ref-width").css("text-align", "center");
            if ($(".only_mobile .ref-img").css("display") == "none") {
                $(".only_mobile .ref-img").fadeIn();
            }
        } else if (scrollEM >= $(window).height()) {
            $(".only_mobile .ref-img").fadeOut();
        }

        if (scrollEM >= 1400) {
            $(".only_mobile .collec_info01 .co_txStyle01").fadeIn();
        } else {
            $(".only_mobile .collec_info01 .co_txStyle01").fadeOut();
        }

        if (scrollEM >= 100) {
            $(".only_mobile .ref-img").addClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-washer-big\.png$/, 'img-washer.png'));
        } else {
            $(".only_mobile .ref-img").removeClass("scroll");
            $(".only_mobile .ref-img img").attr("src", $(".only_mobile .ref-img img").attr("src").replace(/img-washer\.png$/, 'img-washer-big.png'));
        }

        var fadeStartM = 500,
            fadeUntilM = 700,
            fadeOutM = 1000,
            fadeEndM = 1200,
            fadingM = $(".only_mobile .ref-bg");
        var fadeStart2M = 1200,
            fadeUntil2M = 1300,
            fadeOut2M = 2300,
            fadeEnd2M = 2400,
            fading2M = $("#reFscroll"),
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
            opacityM = (scrollEM - fadeEndM) / (fadeOutM - fadeEndM);
            //$(".detail .ref-width .ref-img.scroll").css('opacity',opacity);
        }
        fadingM.css('opacity', opacityM);


        if (scrollEM >= 100) {
            $(".only_mobile .collect_tab").addClass("active");
            $(".only_mobile .collect_tab").css("top", "55px");
        } else {
            $(".only_mobile .collect_tab").removeClass("active");
            $(".only_mobile .collect_tab").css("top", "-55px");
        }

        if (scrollEM == 0) {

        } else if (scrollEM >= 1200) {
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

        if (scrollEM >= 2000) {
            $(".only_mobile .collec_info01").css("opacity", "0");
        } else if (scrollEM < 1999) {
            $(".only_mobile .collec_info01").css("opacity", "1");
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


        var washScrollM = $(".only_mobile .wash-info-list").offset().top;
        if (scrollEM >= washScrollM) {
            $(".only_mobile .wash-info-list").css("opacity", "1");
        } else if (scrollEM < washScrollM) {
            $(".only_mobile .wash-info-list").css("opacity", "0");
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
    var myScroll2M;
    var position2M;

    function loadedM() {

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
        $(thisaM).addClass("fade");
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