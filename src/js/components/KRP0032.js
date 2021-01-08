$(window).ready(function(){
	if(!document.querySelector('.KRP0032')) return false;

	$('.KRP0032').buildCommonUI();

	var popuplistItemTemplate = '<li>' +
        '<div class="img"><a href="{{url}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<dl><a href="{{url}}"><dt>{{title}}</dt><dd>{{#if price}}{{price}}원{{/if}}</dd></a></dl>' +
    '</li>'

	var KRP0032 = {
		init: function(){
			var self = this;
            self.setting();
            self.requestData(false);
		},

		setting: function() {
			var self = this;			
            self.$section = $('div.KRP0032');
            self.$image = self.$section.find('div.lately-linker img');
            self.$a = self.$section.find('div.lately-linker a.head-inner');
            self.$popup = $('#KRP0032');
            self.$list = self.$popup.find('div.lately-list ul');
            self.$noData = self.$popup.find('.no-data');
            
            self.$a.on('click', function(e){
                e.preventDefault();
                self.requestData(true);
            })
        },
        
		requestData: function(openPopup) {
			var self = this;
			var ajaxUrl = self.$popup.attr('data-list-url');
            var cookieValue = lgkorUI.getCookie('myRecentProduct');
            console.log(cookieValue);
            lgkorUI.requestAjaxData(ajaxUrl, {"id":cookieValue}, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
				self.$list.empty();
				arr.forEach(function(item, index) {
                    if(index == 0) {
                        self.$image.attr({"src":item.imageUrl,"alt":item.imageAlt})
                    }
                    item.price = item.price ? vcui.number.addComma(item.price) : null;
					self.$list.append(vcui.template(popuplistItemTemplate, item));
                });

                self.checkNoData();
                
                if(openPopup) {
                    self.$popup.vcModal();
                }
			});
        },
        
        checkNoData: function() {
            var self = this;

            if(self.$list.find('li').length > 0) {
                self.$noData.hide();
            } else {
                self.$noData.show();
            }
        },
	};
	KRP0032.init();
})