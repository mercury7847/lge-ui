$(document).ready(function() {
	if(!document.querySelector('.KRC0030')) return false;

	var $obj = $('.KRC0030');
	var $objIndex = $obj.attr('data-index','0');
	var ani ={
		event: function(obj) {
			var $icon = $obj.find('.slider-nav .icon a');
			
			$icon.hover(function(){
				$(this).closest('.icon').addClass('hover');
			}, function(){
				$(this).closest('.icon').removeClass('hover');
			});
			$icon.on('click', function(){
				var $this = $(this).closest('.icon');
				var $thisIndex = $this.index();
				$this.siblings().removeClass('active').attr('aria-selected', false); //PJTWAUS-1 :  20191223 modify
				$this.addClass('active').attr('aria-selected', true); //PJTWAUS-1 : 20191223 modify
				$(this).parents('.icon-area').next().find('.group').removeClass('active');
				$(this).parents('.icon-area').next().find('.group').eq($thisIndex).addClass('active');
				$(this).parents('.KRC0030').attr('data-index',$thisIndex);
				return false;
			});
		}
	};

	ani.event();

});