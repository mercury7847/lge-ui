$(window).ready(function(){
	if(!document.querySelector('.KRC0001')) return false;

	$('.KRC0001').buildCommonUI();

	var listItemTemplate = '<li class="js-model ui_carousel_slide" data-id={{id}} data-sku={{sku}} data-wishListId={{wishListId}} data-wishItemId={{wishItemId}}>' +
		'<div class="item">' +
			'<div class="product-image">' +
				'<a href="{{url}}"><img data-pc-src="{{imagePC}}" data-m-src="{{imageMobile}}" class="lazyload" alt="{{imageAlt}}" aria-hidden="true"></a>' +
			'</div>' +
			'<div class="product-contents">' +
				'<strong class="product-name">' +
					'<a href="{{url}}"><span class="blind">모델명</span>{{title}}</a>' +
				'</strong>' +
				'<p class="product-sku"><span class="blind">모델넘버</span>{{sku}}</p>' +
				'<div class="review-info">' +
					'{{#if hasReview}}' +
						'<div class="star is-review"><span class="blind">리뷰있음</span></div>' +
					'{{#else}}' +
						'<div class="star"><span class="blind">리뷰없음</span></div>' +
					'{{/if}}' +
					'<div class="average-rating"><span class="blind">평점</span>{{rating}}</div>' +
					'<div class="review-count"><span class="blind">리뷰 수</span>(<span>{{review}}</span>개)</div>' +
				'</div>' +
				'<div class="product-price">' +
					'{{#if originalPrice}}<div class="original"><span class="blind">판매가</span><em>{{originalPrice}}</em>원</div>{{/if}}' +
					'{{#if price}}<div class="total"><span class="blind">총 판매가</span><em>{{price}}</em>원</div>{{/if}}' +
				'</div>' +
			'</div>' +
			'<div class="product-button"><a href="#" class="btn border">장바구니에 담기</a></div>' +
		'</div>' +
	'</li>'

	var KRC0001 = {
		init: function(){
			var self = this;
            vcui.require(['ui/carousel',"ui/imageSwitch"], function () {
				self.setting();
				self.bindEvents();
			});
		},

		setting: function() {
			var self = this;
			
			self.$section = $('section.KRC0001');
			self.$slider = self.$section.find('div.products-list-wrap .ui_carousel_slider');

			self.$slider.each(function(cdx, slide){
				$(slide).vcCarousel({
					infinite: false,
					prevArrow:'.btn-arrow.prev',
					nextArrow:'.btn-arrow.next',
					slidesToShow: 4,
					slidesToScroll: 4,
					responsive: [{
						breakpoint: 100000,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					},{
						breakpoint: 1320,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						}
					},{
						breakpoint: 1100,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						}
					},{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}]
				});
			});
		},

		bindEvents: function() {
			var self = this;

			var $tab = self.$section.find('.ui_smooth_tab');
			$tab.on('click', 'li a', function(e){
				e.preventDefault();
				var _id = $(this).attr('href');
				self.requestData(_id);
			});

			self.$slider.on('click', 'li div.product-button a', function(e){
				e.preventDefault();
				var $li = $(this).parents('li');
				self.requestCart($li);
			})
		},

		requestData: function(_id) {
			var self = this;
			var ajaxUrl = self.$section.attr('data-list-url');
			lgkorUI.requestAjaxData(ajaxUrl, {"id":_id}, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
				var $list_ul = self.$slider.find('ul');
				$list_ul.empty();
				arr.forEach(function(item, index) {
					item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                    item.price = item.price ? vcui.number.addComma(item.price) : null;
					$list_ul.append(vcui.template(listItemTemplate, item));
				});
				$list_ul.vcImageSwitch('reload');
				self.$slider.vcCarousel('reinit');
			});
		},

		requestCart: function($dm) {
			var self = this;
			var ajaxUrl = self.$section.attr('data-cart-url');
			var postData = {
				"id":$dm.attr('data-id'),
				"sku":$dm.attr('data-sku'),
				"wishListId":$dm.attr('data-wishListId'),
				"wishItemId":$dm.attr('data-wishItemId'),
			}
			lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
				var data = result.data;
				if(lgkorUI.stringToBool(data.success)) {
					$(window).trigger("toastshow", "선택하신 제품을 장바구니에 담았습니다.");
				}
			});
		},
	};
	KRC0001.init();
})