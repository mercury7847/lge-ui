(function() {
	var sustainable = {
		init : function() {
			var self = this;
			
			self.setting();
			self.bindEvents();
		},
		
		setting : function() {
			var self = this;
			self.$sustainable = $('.sustainable-download');
			self.$downloadBtn  = self.$sustainable.find('.btn');
			
			/* 모바일 PDF 다운로드 제한 */
			self.mobileFlag = /Mobile|iP(hone|od)|Windows (CE|Phone)|Minimo|Opera M(obi|ini)|BlackBerry|Nokia/;
	        if (navigator.userAgent.match(self.mobileFlag) && !navigator.userAgent.match(/iPad/)) {
	        	self.$sustainable.css("display", 'none');
	        }
		},
		
		bindEvents : function() {
			var self = this;
			
			self.$downloadBtn.on('click', function(e) {
				e.preventDefault();
				
				/* 태블릿, IE PDF 다운로드 제한 */
				if (navigator.userAgent.match(self.mobileFlag) && !navigator.userAgent.match(/iPad/)) {
		            return;
		        } else if (navigator.userAgent.match(/iPad|Android/) || (navigator.userAgent.match(/Safari/) && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints == 5)) {
		        	alert('PDF 변환 다운로드가 지원되지 않습니다. PC 브라우저 크롬과 엣지에서 다운로드 받아주세요.');
		            return;
		        } else {
		        	if (vcui.detect.isIE) {
		        		alert('PDF 변환 다운로드가 지원되지 않습니다. 브라우저 크롬과 엣지에서 다운로드 받아주세요.');
		        		return;
		        	}
		        	self.pdfDownload();
		        }
			});
			
		},
		
		/* PDF 변환 다운로드 */
		pdfDownload : async function() {
			var self = this;
			
			/* PDF 파일명 */
			var fileName = $('.sustainable-download .tit').text();
			fileName = fileName.replace('PDF', '').replace('다운로드', '').trim();
			if ($('.company > .com-tabs:eq(1) .tabs li.on a').contents()[0] != undefined) {
				fileName = fileName + '(' + $('.company > .com-tabs:eq(1) .tabs li.on a').contents()[0].textContent + ')';
			}
			fileName += '.pdf';
			
			/* 변환부분 외 hide */
			$('.com-text').parent().each(function(index, element) {
				if ($(element).css('display') == 'none') {
					$(element).remove();
				}
			});
			$('.com-text .accord-cont').css('display', 'block');
			$('.com-text .content').addClass('on');
			$('.com-text .view_more').addClass('on');
			$('.sustainable-download').remove();
			var comTextClone = $('.com-text').clone();
			$('body *').css('display', 'none');
			$('.company').css('display', '');
			var parentElement = $('.company').parent();
			while (parentElement.prop('tagName') != 'BODY') {
				parentElement.css('display', "");
				parentElement = parentElement.parent();
			}
			$('.company').prepend(comTextClone);
			$(window).trigger('resize');
			
			$('html').scrollTop(0);
			lgkorUI.showLoading();
			
			/* 이미지 높이 체크*/
			var bodyHeight = Number($('body').css("height").replace(/[^0-9]/g, ""));
			await (async function() {
				lgkorUI.hideLoading();
				await html2canvas($('body')[0]).then(function(canvas) {
					if (canvas.height < bodyHeight) {
						$('body').css('padding-bottom', (Number($('body').css('padding-bottom').replace(/[^0-9]/g, "")) + bodyHeight - Number(canvas.height)) + 'px');
					}
				});
				lgkorUI.showLoading();
			});
			
			/* PDF 생성*/
			await html2canvas($('body')[0]).then(function(canvas) {
				var doc = new jsPDF('p', 'mm', 'a4');
				var imgData = canvas.toDataURL('image/png');
				var imgWidth = 210;
				var pageHeight = 295;
				var imgHeight = canvas.height * imgWidth / canvas.width;
				var heightLeft = imgHeight;
				var position = 0;
				
				doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
				
				while (heightLeft >= 0) {
					position = heightLeft - imgHeight;
					doc.addPage();
					doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
					heightLeft -= pageHeight;
				}
				doc.save(fileName);
			});
			lgkorUI.hideLoading();
			document.location.reload();
		}
	};
	
	$(document).ready(function() {
		sustainable.init();
	});
})();