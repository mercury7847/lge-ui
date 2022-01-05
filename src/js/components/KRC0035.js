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
				lazyLoad: 'anticipated', //수정 jsw,
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				touchThreshold: 100,
				speed: 150
			});
		});
		//$('body').vcLazyLoaderSwitch('reload',$KRC0035);
	});


	/* BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
	var infoDisclaimer = $('.KRC0035').find('.text-wrap');
    infoDisclaimer.each(function(cdx, item){

        $(item).find('.drop-info .dropInfo_openBtn').on('click', function(e){
			$(item).find('.dropContent').addClass('on');
			//$(this).hide(); //버튼이 사라지면서 컨텐츠 높낮이의 변화가 생겨 삭제
        });

        $(item).find('.drop-info .dropInfo_closeBtn').on('click', function(e){
			$(item).find('.dropContent').removeClass('on');
			$(item).find('.drop-info .dropInfo_openBtn').show();
        });
        
    });
	/* //BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
})