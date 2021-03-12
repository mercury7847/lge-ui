$(window).ready(function(){
	if(!document.querySelector('.KRP0032')) return false;

	$('.KRP0032').buildCommonUI();

	var popuplistItemTemplate = '<li>' +
        '<div class="img"><a href="{{modelUrlPath}}"><img data-src="{{smallImageAddr}}" alt="{{imageAltText}}"></a></div>' +
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
                self.$popup.addClass('close');
                self.$popup.removeClass('open');
                self.$popup.hide();
            });
            
            self.$section.hide();

            var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            //console.log("### KRP0032 Coolie Name ###:",cookieValue)
            if(cookieValue) {
                self.requestData(false);
            }
        },
        
        resetImage: function() {
            var self = this;
            var $img = self.$popup.find('img[data-src]');
            $img.each(function(idx,obj){
                if(!obj.src.length || obj.src.length == "") {
                    obj.src = obj.dataset.src;
                }
            });
        },

        openPopup: function() {
            var self = this;
            self.resetImage();
            self.$popup.show();
            self.$popup.removeClass('close');
            self.$popup.addClass('open');
        },

		requestData: function(openPopup) {
			var self = this;
			var ajaxUrl = self.$popup.attr('data-list-url');
            //var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            
            lgkorUI.requestAjaxDataPost(ajaxUrl, null/*{"id":cookieValue}*/, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
                self.listData = arr;
				self.$list.empty();
				arr.forEach(function(item, index) {
                    if(index == 0) {
                        self.$image.attr({"src":item.smallImageAddr,"alt":item.imageAltText})
                    }
                    item.price = item.price ? vcui.number.addComma(item.obsSellingPrice) : null;
					self.$list.append(vcui.template(popuplistItemTemplate, item));
                });

                self.checkNoData();
                
                if(openPopup) {
                    self.openPopup();
                }
			});
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
})