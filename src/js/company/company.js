$(document).ready(function() {
    // 아코디언 닫기 버튼
	$(".accordion-wrap .menu-close").on('click', function(e){
		var heada = $(this).parent().parent().parent().find(".head a");
		heada.trigger("click");
		//var scrollPosition = heada.offset().top;
		//scrollPosition = scrollPosition - 100;
		//$('html, body').stop().animate({scrollTop: scrollPosition}, 500);
    });

		// 아코디언 열릴 때 위치 조정
		$('.accordion-wrap li.lists .accord-btn').on('click', function(e) {
			var tag = $(this).closest('.lists');
	
			setTimeout(function(){
				var scrollPosition = tag.offset().top - 150; /* 150 : 상단 높이 인데 tab이 어떻게 걸릴지 몰라 숫치가 정확치 않음 */
				$('html, body').stop().animate({scrollTop: scrollPosition}, 300);
			}, 200);
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
			$(".cont_view_more>.btnArea span").attr("class", "open").text("지난 자료 보기");
			$(".cont_view_more>.btnArea>.btn").removeClass("on");
		}
		e.preventDefault();
	});
	$(".com-tabs>.tabs-wrap>ul.tabs>li a").on("click", function() {
		if (!$(this).parent().hasClass("on")){
			$(".cont_view_more>.content").css("display", "none");
			$(".cont_view_more>.btnArea span").attr("class", "open").text("지난 자료 보기");
			$(".cont_view_more>.btnArea>.btn").removeClass("on");
		}
	});
	
	//Google Tag Manager (noscript)
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-WL297VL');
	
	//SHEE 정책 다운로드
	if ($('#select_shee').val() == '') {
		$("#btn_shee").addClass("disabled").attr("disabled", true);
	} else {
		$("#btn_shee").removeClass("disabled").attr("disabled", false);
	}
	$('#select_shee').on("change", function() {
		if ($('#select_shee').val() == '') {
			$("#btn_shee").addClass("disabled").attr("disabled", true);
		} else {
			$("#btn_shee").removeClass("disabled").attr("disabled", false);
		}
	});
	$('#btn_shee').on("click", function() {
		openInApp($('#select_shee').val());
	});
});

// 첫번째 아코디언 열기

function fcOpenAccordion(){
	if($(".tabs-contents .accordion-wrap").length > 0){
		setTimeout(function(){
			$(".accordion-wrap").eq(0).find("li").eq(0).addClass('on');
			$(".accordion-wrap").eq(0).find("li").eq(0).find(".accord-cont.ui_accord_content").css('display','block');
		}, 200);
	}else{
		setTimeout(function(){
			$(".accordion-wrap").eq(0).find("li").eq(0).addClass('on');
			$(".accordion-wrap").eq(0).find("li").eq(0).find(".accord-cont.ui_accord_content").css('display','block');
		}, 200);
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

// 2번째 탭 fixed
$(function(){
	if(!$('#com-tabs02').length)return;
	$(window).scroll(function() {
		var tarTab = $('#com-tabs02').closest('.com-tabs');
		var tarTab2 = $('#com-tabs01').closest('.com-tabs').find('.tabs-wrap').innerHeight();
		var scrollTabs02 = tarTab.offset().top - tarTab2;
		if($(window).scrollTop() > scrollTabs02){
			tarTab.find('.tabs-wrap').addClass("act");
		}else{
			tarTab.find('.tabs-wrap').removeClass("act");
		}
	});
});

// pdf 다운로드
var openInApp = function (url, name, specs, replace) {
	var parser = document.createElement('a');
	parser.href = url;
	url = parser.href;
	
	if (isApp() && vcui.detect.isIOS) {
		var obj = {
			  'command' : 'openInAppBrowser'
			, 'url' : url
			, 'bottombar_show' : 'Y'
		};
		var jsonString = JSON.stringify(obj);
		webkit.messageHandlers.callbackHandler.postMessage(jsonString);
	} else if(isApp() && vcui.detect.isAndroid) {
		$(parser).get(0).click();
	} else {
		window.open(url, name, specs, replace);
	}
};