$(window).ready(function(){
	if(!document.querySelector('.KRP0032')) return false;

	$('.KRP0032').buildCommonUI();

	var popuplistItemTemplate = '<li>' +
        '<div class="img"><a href="{{modelUrlPath}}"><img src="{{smallImageAddr}}" alt="{{imageAltText}}"></a></div>' +
        '<dl><a href="{{modelUrlPath}}"><dt>{{#raw modelDisplayName}}</dt><dd>{{#if price}}{{price}}원{{/if}}</dd></a></dl>' +
    '</li>'

	var KRP0032 = {
		init: function(){
            var self = this;
            
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
                self.requestData(true);
            });

            self.$popup.on('click','.ui_modal_close',function(e){
                self.$popup.hide();
            });
            
            self.$section.hide();

            var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            //console.log("### KRP0032 Coolie Name ###:",cookieValue)
            if(cookieValue) {
                self.requestData(false);
            }
        },
        
		requestData: function(openPopup) {
			var self = this;
			var ajaxUrl = self.$popup.attr('data-list-url');
            //var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            
            lgkorUI.requestAjaxDataPost(ajaxUrl, null/*{"id":cookieValue}*/, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
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
                    self.$popup.show();
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