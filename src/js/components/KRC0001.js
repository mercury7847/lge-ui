(function() {
	var listWrapTemplate = 
	'<div id="{{id}}" aria-discribedeby="newest" class="products-list-group tabs-cont component-inner-box">'+
	'</div>';

	var KRC0001_listItemTemplate = 
		'<div class="list-contents-wrap ui_carousel_slider">'+
			'<ul class="items unit-list ui_carousel_track">'+
				'{{#each item in productList}}'+
				'<li class="js-model ui_carousel_slide" data-id="{{item.modelId}}" data-sku="{{item.sku}}">' +
					'<div class="item" data-ec-product="{{item.ecProduct}}">' +
						'<div class="product-image">' +
							'<a href="{{item.modelUrlPath}}"><img data-lazy="{{item.mediumImageAddr}}" alt="{{item.imageAltText}}" aria-hidden="true" onError="lgkorUI.addImgErrorEvent(this)"></a>' +
						'</div>' +
						'<div class="product-contents">' +
							'<strong class="product-name">' +
								'<a href="{{item.modelUrlPath}}"><span class="blind">모델명</span>{{#raw item.modelDisplayName}}</a>' +
							'</strong>' +
							'<p class="product-sku"><span class="blind">모델넘버</span>{{item.salesModelCode}}</p>' +
							'<div class="review-info">' +
								'{{#if (item.reviewsCount != "0")}}'+
								'<div class="star is-review"><span class="blind">리뷰있음</span></div>' +
								'<div class="average-rating"><span class="blind">평점</span>{{item.reviewsScore}}</div>' +
								'<div class="review-count"><span class="blind">리뷰 수</span>({{item.reviewsCount}})</div>' +
								'{{/if}}' +
							'</div>' +
							'{{#if item.checkBtnFlag}}'+
								'<div class="product-price">' +
									'{{#if item.obsOriginalPrice}}<div class="original"><span class="blind">판매가</span><em>{{item.obsOriginalPrice}}</em>원</div>{{/if}}' +
									'{{#if item.obsSellingPrice}}<div class="total"><span class="blind">총 판매가</span><em>{{item.obsSellingPrice}}</em>원</div>{{/if}}' +
								'</div>' +
							'{{/if}}'+	
						'</div>' +
						'{{#if item.checkPriceFlag}}'+
							'<div class="product-button"><a href="#" class="btn border requestCart-btn" data-id="{{item.modelId}}" data-model-name="{{item.salesModelName}}" data-rtSeq="{{item.rtModelSeq}}" data-type-flag="{{item.bizType}}" data-contents="{{#raw item.modelDisplayName}}">장바구니에 담기</a></div>' + //BTOCSITE-1057 : data-contents 추가 2021-08-09
						'{{/if}}'+	
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
            //vcui.require(['ui/carousel'], function () {
				self.setting();
				self.bindEvents();
			//});
		},

		setting: function() {
			var self = this;
			
			self.$section = $('section.KRC0001');			
			self.$section.each(function(idx, item){
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
					if(tab.length) {
						listID = tab.attr('href').replace("#", "");
					} else {
						//2021-03-13 정승우  탭이없는 화면이 어째서 인지 있어서 예외처리
						//https://wwwstg.lge.co.kr/washing-machines/f21vdd#n
						/*
						tab = $(item).find('.tabs li.on > a');
						listID = tab.attr('href').replace("#", "");
						*/
					} 
					if(listID){
						if($(item).find("#"+listID).length > 0) {
							//이미있다
						} else {
							listgroup = vcui.template(listWrapTemplate, {id:listID});

							var tabIndex = tab.parent().index();
							if(tabIndex == 0) listwrap.prepend(listgroup);
							else{
								var nextId = $(item).find('.tabs li').eq(tabIndex-1).find('>a').attr('href');
								listwrap.find(nextId).after(listgroup);
							}
						}
					} else {
						//웬지 탭이 없다.
					}
				}
				
				if(listID && productListUrl && productListUrl.length > 0){
					var sendata = {};
					lgkorUI.requestAjaxDataPost(productListUrl, sendata, function(result) {
						var data = result.data[0];
						for(var key in data.productList){
							var item = data.productList[key];
							item.checkBtnFlag = self.checkBtnFlag(item);
							item.checkPriceFlag = self.checkPriceFlag(item);
							item.obsOriginalPrice = (item.obsOriginalPrice != null) ? vcui.number.addComma(item.obsOriginalPrice) : null;
							item.obsTotalDiscountPrice = (item.obsTotalDiscountPrice != null) ? vcui.number.addComma(item.obsTotalDiscountPrice) : null;
							item.obsSellingPrice = (item.obsSellingPrice != null) ? vcui.number.addComma(item.obsSellingPrice) : null;
							item.reviewsCount = (item.reviewsCount != null) ? vcui.number.addComma(item.reviewsCount) : "0";
							item.salesModelName = (item.salesModelName && item.salesModelName.length > 0) ? item.salesModelName : item.salesModelCode + '.' + item.salesSuffixCode;



							/* BTOCSITE-1683 : 카테고리ID 추가 2021-07-09 */
							function getEcCategoryName(item){
								if( item.subCategoryName == "" || item.subCategoryName == undefined) {
									return item.superCategoryName + "/" + item.categoryName 
								} else {
									return item.superCategoryName + "/" + item.categoryName  + '/' + item.subCategoryName
								}
							}
		
							var ecProduct = {
								"model_name": item.modelDisplayName.replace(/(<([^>]+)>)/ig,""),
								"model_id": item.modelId,
								"model_sku": item.modelName, 
								"model_gubun": item.modelGubunName,
								"price": vcui.number.addComma(item.obsOriginalPrice), 
								"discounted_price": vcui.number.addComma(item.obsSellingPrice), 
								"brand": "LG",
								"category": getEcCategoryName(item),
								"ct_id": item.subCategoryId
							}

							//console.log(item.obsOriginalPrice);
							item.ecProduct = JSON.stringify(ecProduct);
							/* //BTOCSITE-1683 : 카테고리ID 추가 2021-07-09 */
						}

						var lists = vcui.template(KRC0001_listItemTemplate, data);
						$("#"+listID).html(lists);
						self.setCarousel($("#"+listID).find('.ui_carousel_slider'));
						if($("#"+listID).index()) $("#"+listID).hide();
					});
				}
			});

			self.setCarousel(self.$section.find('div.products-list-wrap .ui_carousel_slider'));
		},

		/*
		checkBtnFlag: function(item) {
			if(lgkorUI.stringToBool(item.buyBtnFlag) && item.obsBtnRule=="enable") {
				return true;
			} else {
				return false;
			}
		},
		*/

		checkBtnFlag: function(item) {
			if(item.bizType == "PRODUCT") {
				if(lgkorUI.stringToBool(item.buyBtnFlag) && item.obsBtnRule=="enable") {
					return true
				} else {
					return false;
				}
			} else if(item.bizType == "DISPOSABLE") {
				//소모품 DISPOSABLE
				if (item.obsInventoryQty > 0) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		checkPriceFlag: function(item) {
			if(item.bizType == "PRODUCT") {
				if(lgkorUI.stringToBool(item.buyBtnFlag) && item.obsBtnRule=="enable") {
					return true
				} else {
					return false;
				}
			} else if(item.bizType == "DISPOSABLE") {
				//소모품 DISPOSABLE
				if(item.obsTotalDiscountPrice && !item.obsTotalDiscountPrice != "") {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},

		setCarousel: function(slider){
			slider.vcCarousel({
				infinite: false,
				prevArrow:'.btn-arrow.prev',
				nextArrow:'.btn-arrow.next',
				slidesToShow: 4,
				slidesToScroll: 4,
				lazyLoad: 'anticipated',
				cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
				speed: 150,
				touchThreshold: 100,
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
						slidesToScroll: 1,
					}
				}]
			});
		},

		bindEvents: function() {
			var self = this;

			self.$section.on('click', '.requestCart-btn', function(e){
				e.preventDefault();
				
				self.requestCart($(this));
			})
		},

		requestCart: function($this) {
			var self = this;

			var typeflag = $this.data('typeFlag');
			var sendflag = (typeflag == "PRODUCT" || typeflag == "DISPOSABLE") ? "P" : "C";

			var ajaxUrl = self.$section.attr('data-cart-url');
			
			var param = {
				"id":$this.data('id'),
				"sku":$this.data('modelName'),
				"rtSeq":$this.data('rtSeq'),
				"typeFlag": sendflag,
				// 		"pageType": "plp"
			}

			lgkorUI.requestCart(ajaxUrl, param, true);
		},
	};

	$(document).ready(function(){
		if(!document.querySelector('.KRC0001')) return false;
		$('.KRC0001').buildCommonUI();
		KRC0001.init();
	});
})();