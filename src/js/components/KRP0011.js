(function() {
    var productItem =
    '<li>' +
        '<div class="item rec-items">'+
            '<div class="product-image" aria-hidden="true">'+
                '{{#if (bizType == "PRODUCT")}}'+
                '<a href="#">'+
                    '<img src="{{mediumImageAddr}}" alt="{{modelDisplayName}}">'+
                '</a>'+
                '{{/if}}' +
                '{{#if (bizType == "CARESOLUTION")}}'+
                '<a href="{{modelUrlPath}}">'+
                    '<img src="{{mediumImageAddr}}" alt="{{modelDisplayName}}">'+
                '</a>'+
                '{{/if}}' +
            '</div>'+
            '<div class="product-contents">'+
                '<div class="product-info">'+
                    '<div class="product-name">'+
                        '<a href="#">{{modelDisplayName}}</a>'+
                    '</div>'+
                    '<div class="sku">{{modelName}}</div>'+
                    '{{#if (reviewsCount != "0")}}' +
                    '<div class="review-info">'+
                        '<a href="#">'+
                            '<div class="star is-review"><span class="blind">리뷰있음</span></div>'+
                            '<div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>'+
                            '<div class="review-count"><span class="blind">리뷰 수</span>({{reviewsCount}})</div>'+
                        '</a>'+
                    '</div>'+
                    '{{/if}}' +
                '</div>'+
            '</div>'+
            '{{#if (bizType == "PRODUCT")}}'+
            '<div class="price-area">'+
                '{{#if (obsOriginalPrice != "0")}}'+
                '<div class="original">'+
                    '<em class="blind">할인 전 정가</em>'+
                    '<span class="price">{{obsOriginalPrice}}<em>원</em></span>'+
                '</div>'+
                '{{/if}}' +
                '{{#if (obsSellingPrice != "0")}}'+
                '<div class="total">'+
                    '<em class="blind">할인 후 판매가</em>'+
                    '<span class="price">{{obsSellingPrice}}<em>원</em></span>'+
                '</div>'+
                '{{/if}}' +
            '</div>'+
            '{{/if}}' +
            '{{#if (bizType == "CARESOLUTION")}}'+
            '<div class="product-bottom rental-type">'+
                '<div class="price-area care">'+
                    '<div class="total-price"><em class="text">기본 월 요금</em>'+
                        '<span class="price"><em>월</em> 29,900<em>원</em></span>'+
                    '</div>'+
                    '{{#if (visitPer != "null")}}'+
                    '<span class="small-text">({{visitPer}}개월/1회 방문)</span>'+
                    '{{/if}}' +
                '</div>'+
            '</div>'+
            '{{/if}}' +
        '</div>'+
    '</li>';

    $(window).ready(function(){

        if(!document.querySelector('.KRP0011')) return false;

        var KRP0011 = {
            init: function(){
                var self = this;

                self.setting();
                self.bindEvents();

            },
            setting: function() {
                var self = this;
                self.$section = $('.KRP0011');
                self.$recommend = self.$section.find('.recommend-wrap');
                self.$prodViewNow = self.$recommend.find('.prod-box.now .product-items');
                self.$prodRecommend = self.$recommend.find('.prod-box.recommend .product-items');

                self.$tabs = $('.option-tabs .tabs');
                self.$tabList = self.$tabs.find('li a');
                self.$recommendProductData = recommendProduct.data;


            },
            bindEvents: function() {
                var self = this;

                //구매/렌탈 탭 클릭시 유사제품 상품 리스트 변경
                self.$tabList.on('click',function(){
                    var $idx = $(this).parent().index();
                    self.$prodViewNow.empty();

                    if($idx === 0){
                    // 구매 탭
                        console.log("구매 탭 클릭");
                        self.makeProdList(recommendProduct.data[0],self.$prodRecommend);
                    }else if($idx === 1) {
                    //렌탈 탭
                        console.log("렌탈 탭 클릭");
                        self.makeProdList(recommendProduct.data[1],self.$prodViewNow);
                        console.log("makeProdList 실행");
                    }
                });

                //유사제품 추천
                $('.KRP0011').on('click', 'button[data-model-ids]', function(e){
                    e.preventDefault();

                    var url = $(this).data('compareUrl');
                    lgkorUI.addEqualCompare($(this).data('modelIds'), url);
                });
            },
            makeProdList: function(data,target){
                var self = this;


                if(typeof recommendProduct != 'undefined') {
                    $.each(data, function(idx,item){
                        target.append(vcui.template(productItem,item));
                        if(idx === "compareList"){
                            $.each(item.compareList,function(idx,item){
                                target.append(vcui.template(productItem,item));
                            })
                        }
                    })
                }
            }
        }
        KRP0011.init();
    });
})();