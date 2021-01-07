$(window).ready(function(){
	if(!document.querySelector('.KRC0001')) return false;

	$('.KRC0001').buildCommonUI();

	var listItemTemplate = '<li class="js-model ui_carousel_slide">' +
    	'<div class="item">' +
            '<div class="slide-box">' +
                '<div class="product-image"><span class="img"><img src="{{imageUrl}}" alt="{{imageAlt}}"></span></div>' +
                '<div class="product-info">' +
                    '<div class="product-name"><strong>{{produncName}}</strong><span class="model-num">{{squ}}</span></div>' +
                    '<div class="info-area"><ul>' +
                        '<li>구매수량 : {{quantity}}</li>' +
                        '<li>{{store}}</li>' +
                        '<li>{{date}} {{type}}</li>' +
                    '</ul></div>' +
                '</div>' +
            '</div>' +
		'</div>' +
	'</li>'
		/*
var ttt =
	'<li class="js-model ui_carousel_slide ui_carousel_current on" style="float: left; width: 409px;" data-ui_carousel_index="0" aria-hidden="false" role="tabpanel" id="ui_carousel_slide00" aria-describedby="ui_carousel_slide-control00"> <!-- [KR수정] carousel 클래스 추가 : .ui_carousel_slide -->
	<div class="item">
		<div class="product-image">
			<a href="#n" tabindex=""><img data-pc-src="/lg5-common/images/KRC0001/@img-product02-pc.jpg" data-m-src="/lg5-common/images/KRC0001/@img-product02-mo.jpg" class="lazyload" alt="" aria-hidden="true" src="/lg5-common/images/KRC0001/@img-product02-pc.jpg"></a>
		</div>
		<div class="product-contents">
			<strong class="product-name">
				<a href="#n" tabindex=""><span class="blind">모델명</span>LG 울트라기어 게이밍 모니터 360</a>
			</strong>
			<p class="product-sku"><span class="blind">모델넘버</span>27GN880</p>
			<div class="review-info">
				<div class="star is-review"><span class="blind">리뷰있음</span></div>
				<div class="average-rating"><span class="blind">평점</span>4.0</div>
				<div class="review-count"><span class="blind">리뷰 수</span>(<span>48</span>개)</div>
			</div>
			<div class="product-price">
				<div class="original">
					<span class="blind">판매가</span><em>3,490,000</em>원
				</div>
				<div class="total">
					<span class="blind">총 판매가</span><em>3,490,000</em>원
				</div>
			</div>
		</div>
		<div class="product-button">
			<a href="#n" class="btn border" tabindex="">장바구니에 담기</a>
		</div>
	</div>
</li>'
*/
	var KRC0001 = {
		init: function(){
			var self = this;
            vcui.require(['ui/carousel'], function () {
				self.setting();
				self.bindEvents();
			});
		},

		setting: function() {
			var self = this;
			
			$('.KRC0001').find(".ui_carousel_slider").each(function(cdx, slide){
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

			//$('.ui_smooth_scrolltab').vcSmoothScrollTab();

			self.$section = $('section.KRC0001');
		},

		bindEvents: function() {
			var self = this;

			var $tab = self.$section.find('.ui_smooth_tab');
			$tab.on('click', 'li a', function(e){
				e.preventDefault();
				var _id = $(this).attr('href');
				self.requestData(_id);
			})
		},

		requestData: function(_id) {
			var self = this;
			var ajaxUrl = self.$section.attr('data-list-url');
			lgkorUI.requestAjaxData(ajaxUrl, {"id":_id}, function(result) {
				var data = result.data;
				console.log(data);
			});
		}
	};
	KRC0001.init();
})