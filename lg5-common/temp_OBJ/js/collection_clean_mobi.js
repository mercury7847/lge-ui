function onScreenM(targetEl) {
    var elementTop = $(targetEl).offset().top;
    var elementBottom = elementTop + $(targetEl).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    var dentisty = ($(window).scrollTop() - elementTop) * -2;
    var opacity = 1.2 - (Math.abs(dentisty) / $(window).height()).toFixed(1);

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
        return opacity;
    } else {
        return 0;
    }
};

$(function() {
    var rellaxM = new Rellax('.rellax', {
        center: true
    });

    new WOW().init();

    $('.collect_tab').find("button").click(function() {
        var positionTM = "#" + $(this).attr("class");
        var attrPositionM = $(positionTM).offset().top;
        $('html, body').animate({
            scrollTop: attrPositionM
        }, 500);
        return false;
    });

    var swiperM = new Swiper('.swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 30,
        observer: true,
        observeParents: true,
        slidesPerView: "auto",
        speed: 500,
        navigation: {
            nextEl: '.obj-swiper-button-next',
            prevEl: '.obj-swiper-button-prev',
        },
    });

    if (navigator.userAgent.match(/Trident\/7\./)) {
        $('body').on("mousewheel", function() {
            //remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDeltaM = event.wheelDelta;
            var currentScrollPositionM = window.pageYOffset;
            window.scrollTo(0, currentScrollPositionM - wheelDeltaM);
        });
    }

    $(".btn-play").click(function() {
        var videoM = $(this).closest('.video-v').find('video');
        $(videoM).get(0).play();
        $(videoM).fadeIn();
        $(this).closest('.video-container').fadeOut();
    });
});