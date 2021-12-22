$(window).ready(function(){
	if(!document.querySelector('.KRC0032')) return false;

	$('.KRC0032').buildCommonUI();

	vcui.require(['ui/carousel'], function () {

		$('.KRC0032').find(".ui_carousel_slider").each(function(cdx, slide){
			$(slide).on('carouselinit', function(e,data){

				vcui.require(['ui/videoBox','ui/youtubeBox'], function(){

					$('.KRC0032').find(".ui_carousel_slider .youtube-box").vcYoutubeBox();
					$('.KRC0032').find(".ui_carousel_slider .animation-box").vcVideoBox();
				});

			}).vcCarousel({
				infinite: false,
				autoplay: true,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 1,
				slidesToScroll: 1,
				playSelector: '.btn-play.play',
				adaptiveHeight:true,
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				speed: 150,
				touchThreshold: 100

			}).on('carouselbeforechange', function(e, slide, prev, next){

				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).pause();
				}
			}).on('carouselafterchange', function(e, slide, prev, next){

				if($(slide.$slides.get(prev)).attr("ui-modules") == "VideoBox"){
					$(slide.$slides.get(prev)).find("video").get(0).play();
				}
			});
		});

		var tetete = $('.KRC0032').find('.carousel-box');

		tetete.each(function(cdx, item){
			//console.log("11111", $(item).find('.title').attr('id'));
			var titleAttr = $(item).attr("id");
			var slideID = titleAttr;

			$(item).find('.drop-info .dropInfo_openBtn').on('click', function(e){
				var mybtnAttr = $(this).attr('aria-describedby', slideID);

				console.log("콘텐츠의 아이디", titleAttr);
				console.log("내가 찍힌", mybtnAttr.attr('aria-describedby'));
				console.log("sssss", titleAttr = mybtnAttr);
				if(titleAttr = mybtnAttr) {
				    //console.log("111");
				    $(item).find('.dropContent').addClass('on');
				    //$(this).hide();
				}
			});

			$(item).find('.drop-info .dropInfo_closeBtn').on('click', function(e){
			    var mybtnAttr = $(this).attr('aria-describedby', slideID);
	
			    if(titleAttr = mybtnAttr) {
			        //console.log("111");
			        $(item).find('.dropContent').removeClass('on');
			        //$(item).find('.drop-info .dropInfo_openBtn').show();
			    }
			});
			
		});
	});





	
})