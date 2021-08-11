$(document).ready(function() {
    // 아코디언 닫기 버튼
	$(".accordion-wrap .menu-close").on('click', function(e){
		var heada = $(this).parent().parent().parent().find(".head a");
		heada.trigger("click");
		//var scrollPosition = heada.offset().top;
		//scrollPosition = scrollPosition - 100;
		//$('html, body').stop().animate({scrollTop: scrollPosition}, 500);
    });

	//팝업 오픈
	$("button[data-href]").on('click', function(e){
		e.preventDefault();
		var _id = $(this).data("href");
		$(_id).vcModal({opener: this});
    });

	// 셀렉트 탭
	$(".tabs-selectbox select").on('change', function(e){
		var _value = $(this).val();
		if(_value){
			$(".company .tabs-contents").removeClass("on");
			$("#" + _value).show().siblings(".tabs-contents").hide();
		}
		else{
			$(".company .tabs-contents").addClass("on").show();
		}
    });

	// 환경 사회 더보기
	$(".view_more").on('click', function(e){
		var _this = $(this);
		if(_this.hasClass("on")){
			$(this).removeClass("on").html("더보기");
			$(this).parent().find(".content").removeClass("on")
		}else{
			$(this).addClass("on").html("닫기");
			$(this).parent().find(".content").addClass("on")
		}
    });
  
	setTimeout(function(){
		// 탭 슬라이드 위치 이동
		fcTabScrollLeft($('.border-type .tabs'));
		fcTabScrollLeft($('.btn-type .tabs'));
		// 첫번째 아코디언 열기
		fcOpenAccordion();
	}, 500);
	
	// 지난자료보기
	$(".cont_view_more>.content").css("display", "none");
	$(".cont_view_more>.btnArea>.btn").on('click', function(e) {
		if ($(".cont_view_more>.content").css("display") == 'none') {
			$(".cont_view_more>.content").css("display", "");
			$(".cont_view_more>.btnArea span").attr("class", "close").text("지난 자료 닫기");
			$(".cont_view_more>.btnArea>.btn").addClass("on");
		} else {
			$(".cont_view_more>.content").css("display", "none");
			$(".cont_view_more>.btnArea span").attr("class", "open").text("지난 자료 열기");
			$(".cont_view_more>.btnArea>.btn").removeClass("on");
		}
		e.preventDefault();
	});
	
	//Google Tag Manager (noscript)
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-WL297VL');
});

// 첫번째 아코디언 열기
function fcOpenAccordion(){
  if($(".tabs-contents .accordion-wrap").length > 0){
    $(".tabs-contents .accordion-wrap li.lists:first-child").find("a.accord-btn").trigger("click");
  }else{
    $($(".accordion-wrap li.lists:first-child")[0]).find("a.accord-btn").trigger("click");
  }
}

// 탭 슬라이드 위치 이동
function fcTabScrollLeft(tab){
	var totalWidth = -20;
	var liWidth = 0;
	var scrollLeft = 0;
	var scrollLeftEnd = 0;
	tab.find("li").each(function(index){
		liWidth = $(this).width();
		if($(this).hasClass("on")){
			scrollLeft = totalWidth;
			scrollLeftEnd = totalWidth + liWidth + 20;
		}
		totalWidth += liWidth + 20;
	});
	var tabWidth = tab.width();
	if(scrollLeftEnd > tabWidth){
		tab.scrollLeft(scrollLeft);
	}
}