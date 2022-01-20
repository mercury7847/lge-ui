$(document).ready(function(){
	if(!document.querySelector('.KRP0032')) return false;

	$('.KRP0032').buildCommonUI();

	var popuplistItemTemplate = '<li>' +
        '<div class="img"><a href="{{modelUrlPath}}"><img data-temp-src="{{smallImageAddr}}" alt="{{imageAltText}}"></a></div>' +
        '<dl><a href="{{modelUrlPath}}"><dt>{{#raw modelDisplayName}}</dt><dd>{{#if price}}{{price}}원{{/if}}</dd></a></dl>' +
    '</li>'

	var KRP0032 = {
		init: function(){
            var self = this;
            self.listData = null;
            self.setting();
		},

		setting: function() {
            var self = this;		
            	
            self.$section = $('div.KRP0032');
            self.$image = self.$section.find('div.lately-linker img');
            self.$a = self.$section.find('div.lately-linker a.head-inner');
            self.$popup = $('#KRP0032');
            self.$list = self.$popup.find('div.lately-list ul');
            
            self.$a.on('click', function(e){
                e.preventDefault();
                if(!self.listData) {
                    self.requestData(true);
                } else {
                    self.openPopup();
                }
            });

            self.$popup.on('click','.ui_modal_close',function(e){
                e.preventDefault();
                self.closePopup();
            });
            
            self.$section.hide();

            var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            if(cookieValue) {
                self.requestData(false);
            }
        },
        
        resetImage: function() {
            var self = this;
            var $img = self.$popup.find('img[data-temp-src]');
            $img.each(function(idx,obj){
                if(!obj.src.length || obj.src.length == "") {
                    obj.src = obj.dataset.tempSrc;
                }
            });
        },

        //리스트 열기
        openPopup: function() {
            var self = this;
            self.resetImage();
            self.$popup.show();
            self.$popup.removeClass('close');
            self.$popup.addClass('open');
            //
            self.bodyOvewflow = $('body').css('overflow').toLowerCase();
            self.ignoreOverflow = (self.bodyOvewflow != "hidden");
            if(self.ignoreOverflow){
                $('html, body').css({
                    overflow:"hidden"
                });
            }
        },

        //리스트 닫기
        closePopup: function() {
            var self = this;
            self.$popup.addClass('close');
            self.$popup.removeClass('open');
            self.$popup.hide();
            //
            if(self.ignoreOverflow) {
                if(self.bodyOvewflow) {
                    $('html, body').css({
                        overflow:self.bodyOvewflow
                    });
                } else {
                    $('html, body').css({
                        overflow:"visible"
                    });
                }
            }
        },

		requestData: function(openPopup) {
			var self = this;
			var ajaxUrl = self.$popup.attr('data-list-url');
            //var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            
            lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
                self.listData = arr;
				self.$list.empty();
				arr.forEach(function(item, index) {
                    if(index == 0) {
                        self.$image.attr({"src":item.smallImageAddr,"alt":item.imageAltText})
                    }
                    item.price = item.obsTotalDiscountPrice ? vcui.number.addComma(item.obsSellingPrice) : null;
					self.$list.append(vcui.template(popuplistItemTemplate, item));
                });

                self.checkNoData();
                
                if(openPopup) {
                    self.openPopup();
                }
			}, null, true);
        },
        
        checkNoData: function() {
            var self = this;

            if(self.$list.find('li').length > 0) {
                self.$section.show();
            } else {
                self.$section.hide();
            }
        }
	};
	KRP0032.init();
});