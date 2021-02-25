;(function ($, core, global, undefined) {
    var delayTime = 1000,
        $win = $(global),
        isTouch = "ontouchstart" in global,
        offEvent = function offEvent() {
        $win.off("touchmove" + dotNs + " touchend" + dotNs);
    },
        ns = "vcFastClick",
        dotNs = "." + ns;

    $.fn.vcFastClick = function (clickHandler) {
        return $(this).each(function () {
            var clicked,
                $el = $(this);
            if (isTouch) {
                var timeThread, posX, posY, isMoved, touches, touchLength;
                $el.on("touchstart" + dotNs, function (startEvent) {
                    isMoved = false;
                    touchLength = 1;
                    touches = startEvent.originalEvent ? startEvent.originalEvent.touches[0] : startEvent.touches[0];
                    posX = touches.clientX;
                    posY = touches.clientY;
                    $win.on("touchmove" + dotNs, function (moveEvent) {
                        touches = moveEvent.originalEvent ? moveEvent.originalEvent.touches : moveEvent.touches;
                        touchLength = touches.length;
                        touches = touches[0];
                        if (Math.abs(touches.clientX - posX) > 10 || Math.abs(touches.clientY - posY) > 10) {
                            isMoved = true;
                            offEvent();
                        }
                    }).on("touchend" + dotNs, function (endEvent) {
                        offEvent();
                        if (isMoved || touchLength > 1) {
                            clicked = true;
                            endEvent.preventDefault();
                            clearTimeout(timeThread);
                            timeThread = setTimeout(function () {
                                clicked = false;
                            }, delayTime);
                            clickHandler();
                        }
                    });
                });
            }
            $el.on("click" + dotNs, function () {
                clicked || clickHandler();
            });
        });
    };
    $.fn.destroyVcFastClick = function () {
        $(this).off("touchstart" + dotNs + " click" + dotNs), isTouch && $win.off("touchmove" + dotNs + " touchend" + dotNs);
    };
})(jQuery, window[LIB_NAME], window);