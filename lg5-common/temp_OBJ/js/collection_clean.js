function onScreen(targetEl) {
    var elementTop = $(targetEl).offset().top;
    var elementBottom = elementTop + $(targetEl).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    var dentisty = ($(window).scrollTop() - elementTop) * -2;
    var opacity = 1 - (Math.abs(dentisty) / $(window).height()).toFixed(1);

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
        return opacity;
    } else {
        return 0;
    }
};
$(function() {
    var rellax = new Rellax('.rellax', {
        center: true
    });

    new WOW().init();

    $('.collect_tab').find("button").click(function() {
        var positionT = "#" + $(this).attr("class");
        var attrPosition = $(positionT).offset().top;
        $('html, body').animate({
            scrollTop: attrPosition
        }, 500);
        return false;
    });

    var swiper = new Swiper('.swiper-container2', {
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

    function scrollEvent() {
        var scrollE = $(window).scrollTop();

        if (scrollE > 300) {
            $(".collect_tab").addClass("active");
        } else {
            $(".collect_tab").removeClass("active");
        }

        //scroll offset active nav
        var co_design = $("#co_design").offset().top;
        var co_function = $("#co_function").offset().top;
        var co_gallery = $("#co_gallery").offset().top;

        if (scrollE < co_design) {
            $(".collect_tab span").removeClass("active");
            $(".collect_tab > ul > li:first-child span").addClass("active");
        } else if (scrollE >= co_design && scrollE < co_function) {
            $(".collect_tab span").removeClass("active");
            $(".collect_tab .co_design span").addClass("active");
        } else if (scrollE >= co_function && scrollE < co_gallery) {
            $(".collect_tab span").removeClass("active");
            $(".collect_tab .co_function span").addClass("active");
        } else if (scrollE >= co_gallery) {
            $(".collect_tab span").removeClass("active");
            $(".collect_tab .co_gallery span").addClass("active");
        }

        $('.detail.fixed').each(function() {
            ////console.log( onScreen($(this)) + ' / ' + $(this).attr("data-scroll-index"));
            var value = onScreen($(this));
            if (value > 0) {
                $(this).addClass('active');
                $(this).children('.fixed-title').css({
                    'opacity': value
                });
            } else {
                $(this).removeClass('active');
                $(this).children('.fixed-title').css({
                    'opacity': ''
                });
            }
        });

    }

    function throttleUsingRaf(cb) {
        var rAfTimeout = null;

        return function() {
            if (rAfTimeout) {
                window.cancelAnimationFrame(rAfTimeout);
            }
            rAfTimeout = window.requestAnimationFrame(function() {
                cb();
                rellax.refresh();
            })
        }
    }

    document.addEventListener('scroll', throttleUsingRaf(scrollEvent));
    document.addEventListener('resize', throttleUsingRaf(scrollEvent));
    scrollEvent();

    if (navigator.userAgent.match(/Trident\/7\./)) {
        $('body').on("mousewheel", function() {
            //remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }

    $(".btn-play").click(function() {
        var video = $(this).closest('.video-v').find('video');
        $(video).get(0).play();
        $(video).fadeIn();
        $(this).closest('.video-container').fadeOut();
    });
});