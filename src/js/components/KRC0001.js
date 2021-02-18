$(window).ready(function(){
	if(!document.querySelector('.KRC0001')) return false;

	$('.KRC0001').buildCommonUI();

	var listWrapTemplate = 
	'<div id="{{id}}" aria-discribedeby="newest" class="products-list-group tabs-cont component-inner-box">'+
	'</div>';

	var listItemTemplate = 
		'<div class="list-contents-wrap ui_carousel_slider">'+
			'<ul class="items unit-list ui_carousel_track">'+
				'{{#each item in productList}}'+
				'<li class="js-model ui_carousel_slide" data-id="{{item.modelId}}" data-sku="{{item.sku}}">' +
					'<div class="item">' +
						'<div class="product-image">' +
							'<a href="{{item.modelUrlPath}}"><img src="{{item.mediumImageAddr}}" alt="{{item.imageAltText}}" aria-hidden="true" onError="lgkorUI.addImgErrorEvent(this)"></a>' +
						'</div>' +
						'<div class="product-contents">' +
							'<strong class="product-name">' +
								'<a href="{{item.modelUrlPath}}"><span class="blind">모델명</span>{{#raw item.modelDisplayName}}</a>' +
							'</strong>' +
							'<p class="product-sku"><span class="blind">모델넘버</span>{{item.salesModelCode}}</p>' +
							'<div class="review-info">' +
								'{{#if (item.reviewsCount > 0)}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
								'<div class="average-rating"><span class="blind">평점</span>{{item.reviewsScore}}</div>' +
								'<div class="review-count"><span class="blind">리뷰 수</span>({{item.reviewsCount}})</div>' +
							'</div>' +
							'<div class="product-price">' +
								'{{#if item.obsOriginalPrice}}<div class="original"><span class="blind">판매가</span><em>{{item.obsOriginalPrice}}</em>원</div>{{/if}}' +
								'{{#if item.obsSellingPrice}}<div class="total"><span class="blind">총 판매가</span><em>{{item.obsSellingPrice}}</em>원</div>{{/if}}' +
							'</div>' +
						'</div>' +
						'<div class="product-button"><a href="#" class="btn border" data-id="{{item.modelId}}" data-model-name="{{item.sku}}" data-rtSeq="{{item.rtModelSeq}}" data-type-flag="{{item.bizType}}" {{#if item.obsBtnRule != "enable"}}disable{{/if}}>장바구니에 담기</a></div>' +
					'</div>' +
				'</li>'+
				'{{/each}}'+
			'</ul>'+
			'<ul class="indi-wrap ui_carousel_dots">'+
				'<li><button type="button" class="btn-indi"><span class="blind">1번 내용 보기</span></button></li>'+
			'</ul>'+
			'<div class="slide-controls">'+
				'<button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
				'<button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
			'</div>'+
		'</div>';

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
			$('section.KRC0001').each(function(idx, item){
				var title = $(item).find('.title');
				var productListUrl = $(item).data('listUrl');
				var listwrap = $(item).find('.products-list-wrap');
				var listID, listgroup;
				if(title.length && title.data('type') == "RV"){
					listID = "productList"
					listgroup = vcui.template(listWrapTemplate, {id:listID});
					listwrap.append(listgroup);
				} else{
					var tab = $(item).find('.tabs li > a[data-type="RV"]');
					if(tab.length){
						listID = tab.attr('href').replace("#", "");
						listgroup = vcui.template(listWrapTemplate, {id:listID});

						var tabIndex = tab.parent().index();
						if(tabIndex == 0) listwrap.prepend(listgroup);
						else{
							var nextId = $(item).find('.tabs li').eq(tabIndex-1).find('>a').attr('href');
							listwrap.find(nextId).after(listgroup);
						}
					}
				}
				
				if(listID){
					var sendata = {};
					lgkorUI.requestAjaxDataPost(productListUrl, sendata, function(result) {
						var lists = vcui.template(listItemTemplate, result.data[0]);
						$("#"+listID).append(lists);
						self.setCarousel($("#"+listID).find('.ui_carousel_slider'));
						// var data = result.data;
						// var arr = data instanceof Array ? data : [];
						// var $list_ul = self.$slider.find('ul');
						// $list_ul.empty();
						// arr.forEach(function(item, index) {
						// 	item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
						// 	item.price = item.price ? vcui.number.addComma(item.price) : null;
						// 	$list_ul.append(vcui.template(listItemTemplate, item));
						// });
						// $list_ul.vcImageSwitch('reload');
						// self.$slider.vcCarousel('reinit');
					});
				}
			});

			self.setCarousel(self.$section.find('div.products-list-wrap .ui_carousel_slider'));
		},

		setCarousel: function(slider){
			slider.vcCarousel({
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
		},

		bindEvents: function() {
			var self = this;

			self.$section.find('div.products-list-wrap .ui_carousel_slider').on('click', 'li div.product-button a', function(e){
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
			
			var param = {
				"id":$dm.attr('data-id'),
				"sku":$dm.attr('data-sku'),
				"wishListId":$dm.attr('data-wishListId'),
				"wishItemId":$dm.attr('data-wishItemId'),
				// "categoryId":$dm.attr('data-categoryId'),
				// "rtSeq":$dm.attr('data-rtSeq'),
				// "typeFlag":cartType
			}
			lgkorUI.requestCart(ajaxUrl, param);
		},
	};
	KRC0001.init();
})