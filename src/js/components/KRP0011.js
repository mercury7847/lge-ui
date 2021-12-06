(function() {
    var productItem =
        '<li>' +
            '<div class="item rec-items">'+
                '<div class="product-image" aria-hidden="true">'+
                    '<a href="{{modelUrlPath}}">'+
                        '<img src="{{mediumImageAddr}}" alt="{{modelDisplayName}}">'+
                    '</a>'+
                '</div>'+
                '<div class="product-contents">'+
                    '<div class="product-info">'+
                        '<div class="product-name">'+
                            '<a href="#">{{modelDisplayName}}</a>'+
                        '</div>'+
                        '<div class="sku">{{modelName}}</div>'+
                        '{{#if (reviewsCount != "0")}}' +
                        '<div class="review-info">'+
                            '<div class="star is-review"><span class="blind">리뷰있음</span></div>'+
                            '<div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>'+
                            '<div class="review-count"><span class="blind">리뷰 수</span>({{reviewsCount}})</div>'+
                        '</div>'+
                        '{{/if}}' +
                    '</div>'+
                '</div>'+

                //modelStatusCode=="ACTIVE" 판매가능상태
                //mixProductFlag=="N" 혼매가 아닌 상품
                '{{#if (modelStatusCode=="ACTIVE") && (mixProductFlag=="N")}}'+
                   '{{#if (buyBtnFlag=="enable")}}'+
                    '<div class="price-area">'+
                        '{{#if (obsSellingPrice != "0") && (obsOriginalPrice != "0")}}'+
                        '<div class="original">'+
                            '<em class="blind">할인 전 정가</em>'+
                            '<span class="price">{{vcui.number.addComma(obsOriginalPrice)}}<em>원</em></span>'+
                        '</div>'+
                        '{{/if}}'+
                        '{{#if (obsSellingPrice != "0")}}'+
                        '<div class="total">'+
                            '<em class="blind">할인 후 판매가</em>'+
                            '<span class="price">{{vcui.number.addComma(obsSellingPrice)}}<em>원</em></span>'+
                        '</div>'+
                        '{{/if}}'+
                    '</div>'+
                    '{{/if}}'+

                    '{{#if (years1TotAmt !=0)}}'+
                    '<div class="product-bottom rental-type">'+
                        '<div class="price-area care">'+
                            '<div class="total-price"><em class="text">기본 월 요금</em>'+
                                '<span class="price"><em>월</em> {{vcui.number.addComma(years1TotAmt)}}<em>원</em></span>'+
                            '</div>'+
                            '{{#if (visitPer != null) && (visitPer != undefined)}}'+
                                '{{#if (visitPer != "0")}}'+
                                '<span class="small-text">({{visitPer}}개월/1회 방문)</span>'+
                                '{{#else}}'+
                                '<span class="small-text">(방문없음/자가관리)</span>'+
                                '{{/if}}'+
                            '{{/if}}'+
                        '</div>'+
                    '</div>'+
                    '{{/if}}'+
                '{{/if}}'+
            '</div>'+
        '</li>';

    $(window).ready(function(){

        if(!document.querySelector('.KRP0011')) return false;

        var KRP0011 = {
            init: function(){
                var self = this;

                self.setting();
                self.setPath();
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

                //스펙 비교하기 버튼
                self.$compareModelIds = "";

            },
            setPath: function(){
                var self = this;

                if(dataList != null){
                    //랜탈 탭 일 경우 url에 랜탈탭 파라미터 추가
                    var kiosk = lgkorUI.getParameterByName("kiosk");
                    $(dataList.rentalCompareList).each(function(idx,item){
                        item.modelUrlPath = item.modelUrlPath + "?dpType=careTab";
                        if(kiosk) {
                            item.modelUrlPath += (item.modelUrlPath.indexOf("?") === -1) ? "?" : "&";
                            item.modelUrlPath += 'kiosk='+kiosk;
                        }
                    });
                }
            },
            bindEvents: function() {
                var self = this;

                if(dataList != null){
                    //구매/렌탈 탭 클릭시 유사제품 상품, 각각의 금액으로 변경
                    self.$tabList.on('click',function(){
                        var $idx = $(this).parent().index();
                        if($idx === 0){
                            // 구매 탭
                            if(dataList.productInfo !== null && dataList.compareList.length === 2){
                                drawTab("purchaseTab", dataList.productInfo, dataList.compareList);
                            }else{
                                self.$section.hide();
                            }
                        }else if($idx === 1) {
                            //렌탈 탭
                            if(dataList.rentalProductInfo !== null && dataList.rentalCompareList.length === 2){
                                drawTab("rentalTab", dataList.rentalProductInfo, dataList.rentalCompareList);
                            }else{
                                self.$section.hide();
                            }
                        }
                    });
                    function drawTab(tab,now,recommend){
                        self.$section.show();
                        self.$prodViewNow.empty();
                        self.$prodRecommend.empty();
                        self.makeProdList(tab,now, recommend);
                    };
                }
                //유사제품 추천(스펙 비교하기)
                $('.KRP0011').on('click', 'button[data-model-ids]', function(e){
                    e.preventDefault();
                    var url = $(this).data('compareUrl');
                    lgkorUI.addEqualCompare($(this).data('modelIds'), url);
                });
            },
            makeProdList: function(tabType,now,loopData){
                var self = this;
                var $compareId = [];

                $compareId.push(now.modelId); //스펙비교하기에 모델명 추가
                self.$prodViewNow.append(vcui.template(productItem,now)); //지금보고 있는 상품에 템플릿 그리기
                $.each(loopData,function(idx,item){
                    $compareId.push(item.modelId); //스펙비교하기에 모델명 추가
                    self.$prodRecommend.append(vcui.template(productItem,item));//추천 상품리스트 템플릿 그리기
                });

                //스펙비교하기 버튼에 모델명 교체
                self.$compareModelIds = $compareId.join("|");
                self.$section.find(".bottom-area button").attr('data-model-ids', self.$compareModelIds);
            }
        }
        KRP0011.init();
    });
})();