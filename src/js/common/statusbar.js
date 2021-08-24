$(document).ready(function(){
	if(!document.querySelector('.web-status-bar')) return false;

	$('.web-status-bar').buildCommonUI();

	var mobileStatusBar = {
		init: function(){
            var self = this;
            
            self.setting();
			self.bindEvents();
			console.log(22)
		},

		setting: function() {
            var self = this;		
            	
            self.$statusBar = $('div.mobile-status-bar');
			self.$statusList = self.$statusBar.find('.mobile-status-list')
        },
		bindEvents: function(){
			var self = this;
			self.$statusList.find('.nav-anchor a').on('click', function(e){
				e.preventDefault();

				console.log(111)

				$('.mobile-nav-button').trigger('click');
			})
		}
	};
	mobileStatusBar.init();
});