$(document).ready(function(){
	var $KRC0035 = $('.KRC0035');

	//if(!document.querySelector('.KRC0035')) return false;
    if(!($KRC0035.length > 0)) return false;
	
	var $KRC0035 = $('.KRC0035');

    $KRC0035.buildCommonUI();

    vcui.require(['ui/carousel'], function () {
		$KRC0035.find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).vcCarousel({
				infinite: false,
				autoplay: true,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				lazyLoad: 'anticipated', //수정 jsw
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				speed: 150,
				touchThreshold: 100
			});
		});
		//$('body').vcLazyLoaderSwitch('reload',$KRC0035);
	});


	/* BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
	var infoDisclaimer = $('.KRC0035');
	var visualWrapBtn = $('.visual-wrap').find('.dropInfo_openBtn'); //모바일
	var textWrapBtn = $('.text-wrap').find('.dropInfo_openBtn'); //피씨
	var hdlineTop = $('.m-hdline-top');
	// s : BTOCSITE-9207 2022-02-04
	var toggleInfoDisclaimer = function(_this, isOpen) {
		var target = _this.parents('.KRC0035');
		var height = Math.max.apply(null, target.find('.dropContent.on').map(function() {
			return $(this).outerHeight();
		})) - _this.outerHeight();
		if(isOpen) {
			if (_this.offset().top +_this.outerHeight() < target.offset().top + target.height()) {
				height = height - ((target.offset().top + target.height()) - (_this.offset().top +_this.outerHeight()));
			}
			if (height > 0) target.css('marginBottom', height);
			_this.parents('.drop-info').attr('data-sc-top', $(window).scrollTop()); // BTOCSITE-11987
		}else {
			// S : BTOCSITE-11987
			var currentTop = Number(_this.parents('.drop-info').attr('data-sc-top'))
            , targetHeight= Number(target.css('marginBottom').replace('px',''));
			target.removeAttr('style');
			var winTop = $(window).scrollTop();
            if(winTop !== currentTop && currentTop < winTop) {
                $(window).scrollTop(winTop-(targetHeight*2));
            }
			// E : BTOCSITE-11987
		}
	}
	// e : BTOCSITE-9207 2022-02-04

	

    infoDisclaimer.each(function(cdx, item){
		//console.log("v", visualWrapBtn);
		//console.log("t", textWrapBtn);
	
		if ($('.KRC0035.m-hdline-top').length) {
			//console.log("모바일11")
			$(item).find(visualWrapBtn).on('click', function(e){
				//console.log("모바일에만 작동");
				$(item).find('.visual-wrap .dropContent').addClass('on');
				//$(this).hide(); //버튼이 사라지면서 컨텐츠 높낮이의 변화가 생겨 삭제
				toggleInfoDisclaimer($(this), true) // BTOCSITE-9207 2022-02-04
			});

			$(item).find(textWrapBtn).on('click', function(e){
				//console.log("피씨에만 작동");
				$(item).find('.text-wrap .dropContent').addClass('on');
				//$(this).hide(); //버튼이 사라지면서 컨텐츠 높낮이의 변화가 생겨 삭제
				toggleInfoDisclaimer($(this), true) // BTOCSITE-9207 2022-02-04
			});
		} else {
			$(item).find('.drop-info .dropInfo_openBtn').on('click', function(e){
				//console.log("공통");
				$(item).find('.dropContent').addClass('on');
				//$(this).hide(); //버튼이 사라지면서 컨텐츠 높낮이의 변화가 생겨 삭제
				toggleInfoDisclaimer($(this), true) // BTOCSITE-9207 2022-02-04
			});
		}
	
		//close
        $(item).find('.drop-info .dropInfo_closeBtn').on('click', function(e){
			$(item).find('.dropContent').removeClass('on');
			$(item).find('.drop-info .dropInfo_openBtn').show();
			toggleInfoDisclaimer($(this), false) // BTOCSITE-9207 2022-02-04
        });
    });
	/* //BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
})