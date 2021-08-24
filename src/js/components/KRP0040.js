$(document).ready(function(){
	if(!document.querySelector('.KRP0040')) return false;

	$('.KRP0040').buildCommonUI();

	var KRP0040 = {
		init: function(){
            var self = this;
            
            self.setting();
		},

		setting: function() {
            var self = this;		
            	
            self.$section = $('div.KRP0040');
        },
	};
	KRP0040.init();
});