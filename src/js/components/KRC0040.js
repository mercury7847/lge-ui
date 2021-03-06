$(window).ready(function(){
    if(!document.querySelector('.KRC0040')) return false;
	
    ;(function(){
        var $component;
		var $mainSticky;
		
		var $onText;
		var $moreInfos;

		var selectIdx;
		var prevIdx;

        function init(){
            setting();
            bindEvents();
        }

        function setting(){
            $component = $('.KRC0040');
			$onText = $component.find('.on-txt');
			$moreInfos = $component.find('.more-infos');

            $mainSticky = $('.KRP0009');

            selectIdx = prevIdx = 0;

			$component.parent().height($component.innerHeight());
        }

        function bindEvents(){
    
            $component.on('click', '.info-tab a', function(e){
				var id = $(this).attr('href');
				var idx = id.indexOf("#iw_comp");
				if(idx > -1){
					e.preventDefault();
			
					scrollMoved(id);
				}
			});
			
			$onText.on('click', function(e){
				e.preventDefault();

				toggleTabList();
			})
        
            $(window).on('scroll.KRC0040', function(e){
				var scrolltop = $(window).scrollTop();
				
				var topDistance = 0;
				if($mainSticky.length) topDistance += $mainSticky.height();

				var comptop = $component.parent().offset().top;
				var dist = -scrolltop + comptop;	
                
                if(dist <= topDistance){
					var top = $mainSticky.length ? $mainSticky.height() : 0;
                    $component.addClass('fixed').css({
                        position:"fixed",
						top:top,
						width:'100%',
                        zIndex:91
                    });
                } else{
                    $component.removeClass('fixed').removeAttr('style');
                }
				
				var currentIdx = -1;
				var isAllHidden = true;
				$component.find('.info-tab').each(function(idx, item){
					var percent = 0, display;
					var contID = $(item).find('a').attr('href');

					var contIDX = contID.indexOf("#iw_comp");
					if(contIDX > -1){
						var bar = $(item).find('a .bar');
						var cont = $(contID);
						if(cont.length){
							var conty = cont.offset().top;
							var contheight = cont.outerHeight(true);
	
							if(!idx) conty -= $component.height();
							
							var endanchor = $(item).find('a').data('endTarget');
							if(endanchor && $(endanchor).length){
								var endy = $(endanchor).offset().top;
								var endheight = $(endanchor).outerHeight(true);
								contheight = endy - conty + endheight;
							}
			
							var contop = -scrolltop + conty;
							if(contop < topDistance){
								var scrolldist = topDistance - contop;
								percent = scrolldist / contheight * 100;
			
								if(percent > 100) percent = 0;
							}
							display = percent <= 0 ? 'none' : 'block';
							bar.css({width: percent+"%", display: display});
	
							if(display == "block") {
								isAllHidden = false;
								currentIdx = idx;
							}
						}
					}
				}); 
				
				if(selectIdx != currentIdx){
					prevIdx = selectIdx;
					selectIdx = currentIdx;

					var no = selectIdx;
					if(selectIdx < 0){
						no = prevIdx;
					}

					$moreInfos.children().removeClass('active');
					$moreInfos.children().eq(no).addClass('active');
					$onText.text($moreInfos.children().eq(no).text());
				}
            });
		}
		
		function toggleTabList(){
			if(!$moreInfos.data('isOpen')){
				$moreInfos.data('isOpen', true);
				var leng = $moreInfos.children().length;
				var itemheight = $moreInfos.children().height();
				$moreInfos.height(itemheight*leng);

				$moreInfos.closest('.product-info-more').addClass('open');
			} else{
				$moreInfos.data('isOpen', false);
				$moreInfos.height(0);

				$moreInfos.closest('.product-info-more').removeClass('open');
			}
		}

        function scrollMoved(id){
            if($(id).length){
				var topDistance = 0;
				if($mainSticky.length) topDistance += $mainSticky.height()-2;

				var movtop = $(id).offset().top - topDistance;
				
				$('html, body').stop().animate({scrollTop:movtop}, 200);
				
				if($moreInfos.data('isOpen')){
					toggleTabList();
				}
            }
        }
    
        init();
    })();
    
	// Make it easier to find ID values ??????in the teamsite edit screen
	window.Clipboard = (function (window, document, navigator) {
		var textArea,
			copy;

		function isOS() {
			return navigator.userAgent.match(/ipad|iphone/i);
		}

		function createTextArea(text) {
			textArea = document.createElement('textArea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.top = '0';
			textArea.style.left = '0';
			textArea.style.opacity = '0.0001';
			textArea.style.width = '100%';
			textArea.style.height = '100%';
			textArea.style.padding = '0';
			textArea.style.pointerEvents = "none";
			textArea.style.fontSize = '16px';
			document.body.appendChild(textArea);
		}

		function selectText() {
			var range,
				selection;

			if (isOS()) {
				range = document.createRange();
				range.selectNodeContents(textArea);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				textArea.setSelectionRange(0, 999999);
			} else {
				textArea.select();
			}
		}

		function copyToClipboard() {
			document.execCommand('copy');
			document.body.removeChild(textArea);
		}

		copy = function (text) {
			createTextArea(text);
			selectText();
			copyToClipboard();
		};
		return {
			copy: copy
		};
	})(window, document, navigator);

    if($('body').hasClass('iw-fullscreen-edit')) {
		$('.component-wrap').each(function() {
			var obj = $(this).parent();
			if(obj.is('.iw_component')) {
				var iwid = obj.attr('id');
				if(iwid) {
					obj.find('.component-wrap').append('<a href="#" class="btn copy-myid" style="position:absolute;left:0;top:0;background:#d9ffde;opacity:0.5;text-transform:none;color:#000;z-index:1000;">'+iwid+'</a>');
				}
			}
		});
		$('body').on('click', 'a.copy-myid', function(e) {
			e.preventDefault();
			var iwid = $(this).text();
			Clipboard.copy(iwid);
			$(this).append('<div id="copyedText" style="font-size:13px;">Copied!</div>');
			setTimeout(function() {
				$('#copyedText').remove();
			}, 1500);
		});
	};
})