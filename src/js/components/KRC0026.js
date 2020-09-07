$(document).ready(function() {
	if(!document.querySelector('.KRC0026')) return false;

    $('.KRC0026').buildCommonUI();

	var modal = {
		wrappers: document.querySelectorAll('.KRC0026 .modal-layers'),
		wrapper: null,
		init: function(){
			var _this = this;
			for (var i = 0; i < _this.wrappers.length; i++) {
				_this.wrapper = _this.wrappers[i];
				_this.addEvent();
			}
		},
		initSlick: function(e){
			var _modal = e.currentTarget,
				_el = {
					_visual: _modal.querySelector('.visual-box-belt'),
					_text: _modal.querySelector('.text-box-belt')
				};

			if(!$(_el._visual).hasClass('slick-initialized')) {
				_el._visual.id = _modal.id + '_visual';
				_el._text.id = _modal.id + '_text';

				$(_el._visual).slick({
					asNavFor : "#"+_el._text.id,	// sync
					infinite : false,
					fade: true,
					responsive : [
						{
							breakpoint: 768,
							settings : {
								dots: true,
								arrows: false
							}
						}
					]
				});
				$(_el._text).slick({
					asNavFor : "#"+_el._visual.id,	// sync
					arrows: false,
					infinite : false,
					adaptiveHeight : true
				});
			}else {
				$(_el._visual).slick('setPosition');
				$(_el._text).slick('setPosition');
			}

		},
		hideVideo: function(e) {
			var _modal = e.currentTarget;
			$(_modal).find('.video-asset').remove();
		},
		addEvent: function(){
			var _this = modal;
			$(_this.wrapper).on({
				'shown.bs.modal': _this.initSlick,
				'hide.bs.modal': _this.hideVideo
			}, '.banner-layer');
			$(_this.wrapper).on({
				'beforeChange': _this.hideVideo
			}, '.slick-initialized');
		}
	};

	modal.init();
});