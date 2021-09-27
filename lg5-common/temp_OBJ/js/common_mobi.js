/*if(!navigator.userAgent.match(/Mobile|iP(hone|od)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
   var loc = document.location.href;
   var pre_loc = loc.substring(0,loc.indexOf("/html")+5);
   var post_loc = loc.substring(loc.indexOf("/html")+10);
   document.location.href = pre_loc+post_loc;
} */
$(function() {
    $('a[href="#"]').click(function(event) {
        event.preventDefault();
    });

    // BTOCSITE-5810 [UI] 오브제컬렉션 제품 상세 오류
    // $(".logo a").attr("href", "/html_mobi/index.html");

    $(".siteInfo").find("li").each(function() {
        var texta = $(this).text();
        if (texta == "소식지 신청") {
            $(this).remove();
        }
    });

    if ($("div").hasClass("st_function")) {
        var st = $(".st_function").offset().top + 10,
            st2 = st + $(window).height() + 10,
            st3 = st2 + $(window).height() + 10,
            st4 = st3 + $(window).height() + 10;
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
    var font = new FontFaceObserver('Noto Sans KR');

    font.load().then(function() {
        //console.log('Noto Sans KR has loaded.');
    }).catch(function() {
        //console.log('Noto Sans KR failed to load.');
    });


    $('.only_mobile .collect_tab').find("button").click(function() {
        var positionT = "#" + $(this).attr("class");
        var attrPosition = $(positionT).offset().top + 10;
        $('html, body').animate({
            scrollTop: attrPosition
        }, 500);
        return false;
    });



    $(window).scroll(function() {
        if ($("div").hasClass("collect_tab")) {
            //var headHM = $(".objetcollection-tabs").height();
            var scrollTopaM = $(window).scrollTop();
            var co_designM = $("#co_designM").offset().top;
            var co_functionM = $("#co_functionM").offset().top;
            var co_galleryM = $("#co_galleryM").offset().top;

            if (scrollTopaM < co_designM) {
                $(".only_mobile .collect_tab span").removeClass("active");
                $(".only_mobile .collect_tab > ul > li:first-child span").addClass("active");
            } else if (scrollTopaM >= co_designM && scrollTopaM < co_functionM) {
                $(".only_mobile .collect_tab span").removeClass("active");
                $(".only_mobile .collect_tab .co_designM span").addClass("active");
            } else if (scrollTopaM >= co_functionM && scrollTopaM < co_galleryM) {
                $(".only_mobile .collect_tab span").removeClass("active");
                $(".only_mobile .collect_tab .co_functionM span").addClass("active");
            } else if (scrollTopaM >= co_galleryM) {
                $(".only_mobile .collect_tab span").removeClass("active");
                $(".only_mobile .collect_tab .co_galleryM span").addClass("active");
            }
        }
    });

    $(".btnMobi").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#hd .head .gnb").animate({
                right: "-9999px"
            });
        } else {
            $(this).addClass("active");
            $("#hd .head .gnb").animate({
                right: "0px"
            });
        }
    });

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
    $(".share .btn-share").on("click", function() {
        $(".sns_popup, .mask").fadeIn();
    });
    //OBJET TOOLTIP
    $(".btn-Tooltip").on("click", function() {
        $(".objet_popup, .mask").fadeIn();
    });
    // 팝업 닫기
    $(".layer_popup .btn-close").on("click", function() {
        $(".layer_popup, .mask").fadeOut();
    });

    $(".btn-site").click(function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $("#ft .family-site > li > ul").slideUp();
        } else {
            $(this).addClass("active");
            $("#ft .family-site > li > ul").slideDown();
        }
    });
});