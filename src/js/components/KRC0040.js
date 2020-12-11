$(window).ready(function(){
    if(!document.querySelector('.KRC0040')) return false;

    var marginTop = $('.KRP0009').length ? $('.KRC0040').outerHeight(true) : 0;
    
	// Make it easier to find ID values ​​in the teamsite edit screen
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
    
    vcui.require(['ui/sticky'], function () {
         $('.KRC0040').vcSticky({marginTop:marginTop, usedAnchor:true});

         marginTop += $('.KRC0040').outerHeight(true);

         $(window).on('scroll', function(e){
            var scrolltop = $(window).scrollTop();
            
            $('.KRC0040').find('.info-tab').each(function(idx, item){
                var percent = 0, display;
                var contID = $(item).find('a').attr('href');
                var bar = $(item).find('a .bar');
                var cont = $(contID);
                var contheight = cont.outerHeight(true);
                var contop = -scrolltop + $(contID).offset().top;
                if(contop < marginTop){
                    var scrolldist = marginTop - contop;
                    percent = scrolldist / contheight * 100;

                    if(percent > 100) percent = 0;
                }
                display = percent <= 0 ? 'none' : 'block';
                bar.css({width: percent+"%", display: display});
            });            
         });
    });

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