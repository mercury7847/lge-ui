/*if(navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
   var loc = document.location.href;
   var pre_loc = loc.substring(0,loc.indexOf("/html")+5);
   var post_loc = loc.substring(loc.indexOf("/html")+5);
   document.location.href = pre_loc+"_mobi"+post_loc;
}*/
$(function() {

    // $(".logo a").attr("href", "/html/index.html");

    // if ($("div").hasClass("priv-popup") === false) {
    //     if (navigator.userAgent.match(/Trident\/7\./)) {
    //         $('body').on("mousewheel", function() {
    //             //remove default behavior
    //             event.preventDefault();

    //             //scroll without smoothing
    //             var wheelDelta = event.wheelDelta;
    //             var currentScrollPosition = window.pageYOffset;
    //             window.scrollTo(2000, currentScrollPosition - wheelDelta);
    //         });
    //     }
    // }

    $('.only_pc .collect_tab').find("button").click(function() {
        var positionT = "#" + $(this).attr("class");
        var attrPosition;
        if ($(this).attr("class") == "wrap") {
            attrPosition = 0;
        } else {
            attrPosition = $(positionT).offset().top + 10;
        }
        //var attrPosition = $(positionT).offset().top;
        $('html, body').animate({
            scrollTop: attrPosition
        }, 500);
        return false;
    });



    $(window).scroll(function() {
        if ($("div").hasClass("collect_tab")) {
            //var headH = $(".objetcollection-tabs").height();
            var scrollTopa = $(window).scrollTop();
            var co_design = $("#co_design").offset().top;
            var co_function = $("#co_function").offset().top;
            var co_gallery = $("#co_gallery").offset().top;



            if (scrollTopa < co_design) {
                $(".only_pc .collect_tab span").removeClass("active");
                $(".only_pc .collect_tab > ul > li:first-child span").addClass("active");
            } else if (scrollTopa >= co_design && scrollTopa < co_function) {
                $(".only_pc .collect_tab span").removeClass("active");
                $(".only_pc .collect_tab .co_design span").addClass("active");
            } else if (scrollTopa >= co_function && scrollTopa < co_gallery) {
                $(".only_pc .collect_tab span").removeClass("active");
                $(".only_pc .collect_tab .co_function span").addClass("active");
            } else if (scrollTopa >= co_gallery) {
                $(".only_pc .collect_tab span").removeClass("active");
                $(".only_pc .collect_tab .co_gallery span").addClass("active");
            }
        }
    });


    if ($("div").hasClass("st_function")) {
        var st = $(".st_function").offset().top + 1,
            st2 = st + $(window).height() + 1,
            st3 = st2 + $(window).height() + 1,
            st4 = st3 + $(window).height() + 1;
        $("#sfVidoe01").click(function() {
            $('html, body').animate({
                scrollTop: st
            }, 500);
            return false;
        });
        $("#sfVidoe02").click(function() {
            $('html, body').animate({
                scrollTop: st2
            }, 500);
            return false;
        });
        $("#sfVidoe03").click(function() {
            $('html, body').animate({
                scrollTop: st3
            }, 500);
            return false;
        });
        $("#sfVidoe04").click(function() {
            $('html, body').animate({
                scrollTop: st4
            }, 500);
            return false;
        });
    }


    $(".exception").remove();
    //오브제 선택시 레이어
    /*
    $(".lg-appliances button").on("click",function(){
    	if ( $(".select_objet").hasClass("active") ) {
    		$(".select_objet").animate({
    			right: -400
    		}, 100);
    		$(".select_objet").animate({
    			right: 0
    		}, 100);
    	} else {
    		$(".select_objet").addClass("active");
    		$(".select_objet").animate({
    			right: 0
    		}, 500);
    		$(".share, .img-download").fadeOut();
    	}
    	
    });
	
    //오브제 타입 선택
    $(".btn-objet-type").on("click",function(){
    	$(".select_objet").animate({
    		right: -400
    	}, 100);
    	$(".select_objet > ul > li").removeClass("active");
    	$(this).parent("li").addClass("active");
    	$(".select_objet").animate({
    		right: 0
    	}, 100);
    });
    $(".select_objet .btn-close").on("click", function(){
    	$(".select_objet").removeClass("active");
    	$(".select_objet").animate({
    		right: -400
    	}, 500);
    	$(".share, .img-download").fadeIn();
    });
    */

    //sns 공유 팝업
    // $(".share .btn-share").on("click", function() {
    //     $(".sns_popup, .mask").fadeIn();
    // });

    // $(".btn-site").click(function() {
    //     if ($(this).hasClass("active")) {
    //         $(this).removeClass("active");
    //         $("#ft .family-site > li > ul").slideUp();
    //     } else {
    //         $(this).addClass("active");
    //         $("#ft .family-site > li > ul").slideDown();
    //     }
    // });

});