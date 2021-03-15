
;(function(){
  
    var categoryTabTmpl = '{{#each item in list}}\n'+
        '   <li>\n'+
        '       <a href="#{{item.categoryId}}">{{item.categoryName}}</a>\n'+
        '   </li>\n'+
        '{{/each}}';

    var categoryTabContentsTmpl = '{{#each obj in list}}\n'+
        '   <div class="tabs-contents" id="{{obj.categoryId}}">\n'+
        '   <div class="slide-wrap category-list-slide">\n'+
        '        <div class="indi-wrap">\n'+
        '            <ul class="indi-conts ui_carousel_dots" style="display:none;">\n'+
        '                <li><button type="button" class="btn-indi"><span class="blind">{{obj.dotLabel}}</span></button></li>\n'+
        '            </ul>\n'+
        '        </div>\n'+
        '        <div class="category-list">\n'+
        '            <div class="slide-content ui_carousel_list">\n'+
        '                <ul class="slide-track ui_carousel_track">\n'+
        '                   {{#each item in obj.categoryList}}\n'+
        '                       <li class="slide-conts ui_carousel_slide">\n'+
        '                           <a href="{{item.linkPath}}" class="slide-box">\n'+
        '                               <i><img src="{{item.iconPath}}" alt={{item.iconAlt}}"></i>\n'+
        '                               <span class="txt">{{item.title}}</span>\n'+
        '                           </a>\n'+
        '                       </li>\n'+
        '                   {{/each}}\n'+
        '                </ul>\n'+
        '            </div>\n'+
        '        </div>\n'+
        '        <div class="slide-controls" style="display:none;">\n'+
        '            <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>\n'+
        '            <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>\n'+
        '        </div>\n'+
        '   </div>\n'+
        '   </div>\n'+
        '{{/each}}';

    var bestRankBuyProductTmpl =
        '<a href="{{linkPath}}" data-product-id="{{productId}}">\n'+
        '   <div class="flag"><img src="/lg5-common/images/PRS/img-flag-buy-best.svg" alt="BEST 1"></div>\n'+
        '   <span class="bg ui_bg_switch"'+ 
        '       style="background-image:url();"'+ 
        '       data-pc-src="{{pcImagePath}}"'+ 
        '       data-m-src="{{mobileImagePath}}"'+
        '       aria-hidden="hidden">\n'+
        '   </span>\n'+
        '   <div class="product-info">\n'+
        '       <p class="tit">{{productName}}</p>\n'+
        '       {{#if productPrice}}'+
        '           <div class="price">{{#raw productPrice}}</div>\n'+
        '       {{/if}}'+
        '   </div>\n'+
        '</a>';

    var rankBuyProductTmpl = '{{#each obj in list}}\n'+
        '   <li>\n'+
        '       <a href="{{obj.linkPath}}" data-product-id="{{obj.productId}}">\n'+
        '       <div class="flag"><span class="num">{{obj.num}}</span></div>\n'+
        '       <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
        '       <div class="product-info">\n'+
        '           <p class="tit">{{obj.productName}}</p>\n'+
        '           {{#if obj.productPrice}}'+
        '               <div class="price">{{#raw obj.productPrice}}</div>\n'+
        '           {{/if}}'+
        '       </div>\n'+
        '       </a>\n'+
        '   </li>\n'+
        '{{/each}}';

    
        ///lg5-common/images/PRS/img-plan-exhib-slid-01.jpg
        ///lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg
        // <sup>딱! 찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택
        // 2020.11.01~2020.11.30
    var exhibitionTmpl = '{{#each obj in list}}\n'+
        '   <li class="slide-conts ui_carousel_slide">\n'+
        '       <div class="slide-box">\n'+
        '           <div class="inner">\n'+
        '               <div class="img">\n'+
        '                   <img src=""'+
        '                   alt="{{obj.imageAlt}}"'+
        '                   data-pc-src="{{obj.pcImagePath}}"'+ 
        '                   data-m-src="{{obj.mobileImagePath}}" onError="lgkorUI.addImgErrorEvent(this)">'+
        '               </div>\n'+
        '               <div class="product-info">\n'+
        '                   <p class="tit">{{#raw obj.title}}</p>\n'+
        '                   <div class="date">{{obj.date}}</div>\n'+
        '                   <a href="{{obj.linkPath}}" class="btn border">자세히 보기</a>\n'+
        '               </div>\n'+
        '               <div class="product-list">\n'+
        '                   <ul>{{#raw obj.productList}}</ul>\n'+
        '               </div>\n'+                       
        '           </div>\n'+
        '       </div>\n'+
        '   </li>\n'+
        '{{/each}}';


    var exhibitionProductTmpl = '{{#each obj in list}}\n'+
        '   <li>\n'+
        '       <a href="{{obj.linkPath}}">\n'+
        '           <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
        '           <div class="info">\n'+
        '               <div class="model">{{obj.productName}}</div>\n'+
        '               <div class="code">{{obj.productId}}</div>\n'+
        '               <div class="price-area">\n'+
        '                   <div class="original">\n'+
        '                       {{#if obj.productOriginPrice}}'+
        '                           <em class="blind">기존가격</em>\n'+
        '                           <span class="price">{{#raw obj.productOriginPrice}}</span>\n'+
        '                       {{/if}}'+
        '                   </div>\n'+
        '                   <div class="total">\n'+
        '                       {{#if obj.productPrice}}'+
        '                           <em class="blind">판매가격</em>\n'+
        '                           <span class="price">{{#raw obj.productPrice}}</span>\n'+
        '                       {{/if}}'+
        '                   </div>\n'+
        '           </div>\n'+
        '           </div>\n'+
        '       </a>\n'+
        '   </li>\n'+
        '{{/each}}';


        var recommendTmpl = '{{#each obj in list}}\n'+
        '   <li class="slide-conts ui_carousel_slide">\n'+
        '       <a href="{{obj.linkPath}}" class="slide-box">\n'+
        '           <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
        '           <div class="info">\n'+
        '               <div class="model">{{obj.productName}}</div>\n'+
        '               <div class="code">{{obj.productId}}</div>\n'+
        '               <div class="price-area">\n'+
        '                   <div class="original">\n'+
        '                       {{#if obj.productOriginPrice}}'+
        '                           <em class="blind">기존가격</em>\n'+
        '                           <span class="price">{{#raw obj.productOriginPrice}}</span>\n'+
        '                       {{/if}}'+
        '                   </div>\n'+
        '                   <div class="total">\n'+
        '                       {{#if obj.productPrice}}'+
        '                           <em class="blind">판매가격</em>\n'+
        '                           <span class="price">{{#raw obj.productPrice}}</span>\n'+
        '                       {{/if}}'+
        '                   </div>\n'+
        '           </div>\n'+
        '           </div>\n'+
        '       </a>\n'+
        '   </li>\n'+
        '{{/each}}';

    


    var newItemTmpl = '{{#each obj in list}}\n'+
    '<li class="slide-conts ui_carousel_slide {{obj.fullClassName}}">\n'+
    '   <div class="slide-box">\n'+
    '       {{#if obj.fullClassName}}'+
    '           <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '       {{#else}}'+
    '           <div class="img"><a href="{{obj.linkPath}}"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></a></div>\n'+
    '       {{/if}}'+
    '       <div class="product-area">\n'+
    '           <div class="product-contents">\n'+
    '               <div class="flag-wrap bar-type">\n'+
    '                   {{#if obj.isFlag=="best"}}<span class="flag"><span class="blind">제품 상태</span>베스트</span>{{/if}}\n'+
    '                   {{#if obj.isFlag=="energy"}}<span class="flag"><span class="blind">제품 상태</span>으뜸효율 10%</span>{{/if}}\n'+
    '               </div>\n'+
    '               <p class="tit"><a href="{{obj.linkPath}}"><span class="blind">모델명</span>{{obj.productName}}</a></p>\n'+
    '               <p class="product-sku"><span class="blind">모델넘버</span>{{obj.productId}}</p>\n'+
    '               {{#if obj.reviewCount>="0"}}'+
    '                   <div class="review-info">\n'+
    '                       <a href="{{obj.reviewLinkPath}}">\n'+
    '                           <div class="star is-review"><span class="blind">리뷰있음</span></div>\n'+
    '                           <div class="average-rating"><span class="blind">평점</span>{{obj.averageRating}}</div>\n'+
    '                           <div class="review-count"><span class="blind">리뷰 수</span>(<span>{{obj.reviewCount}}</span>)</div>\n'+
    '                       </a>\n'+
    '                   </div>\n'+
    '               {{/if}}'+
    '           </div>\n'+
    '           <div class="product-price">\n'+
    '               <div class="original">{{#if obj.productOriginPrice}}<span class="blind">기존가격</span>{{#raw obj.productOriginPrice}}{{/if}}</div>\n'+
    '               <div class="total">{{#if obj.productPrice}}<span class="blind">판매가격</span>{{#raw obj.productPrice}}{{/if}}</div>\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>\n'+
    '{{/each}}';

        

    function init(){
        
        vcui.require(['ui/toggleCarousel', 'ui/tab', 'ui/lazyLoaderSwitch', 'ui/carousel'], function () {

            var storeCategoryTabUrl = '/lg5-common/data-ajax/home/storeCategoryTab.json';
            var storeRankBuyProductUrl = '/lg5-common/data-ajax/home/storeRankBuyProduct.json';
            var exhibitionProductUrl = '/lg5-common/data-ajax/home/storeExhibition.json';
            var recommendProductUrl = '/lg5-common/data-ajax/home/storeRecommendProduct.json';
            var newProductUrl = '/lg5-common/data-ajax/home/storeNewProduct.json';
            var newRecommendProductUrl = '/lg5-common/data-ajax/home/storeNewRecomProductUrl.json';
            

            // 많이 구매하는 제품 Best 이미지 로컬데이터
            var rankBuyProductLocal = {
                "pcImagePath" : "/lg5-common/images/PRS/img-buy-product-best.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-buy-product-best-m.jpg"
            }
            // 많이 구매하는 제품 요청 제품코드
            var rankBuyProductIds = ['75NANO99KNA','65NANO99KNA','55NANO99KNA','45NANO99KNA','35NANO99KNA']; 

            
            // 추천 기획전 로컬데이터
            var exhibitionLocal = [
                {
                    "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                    "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                    "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                    "imageAlt" : "",
                    "date" : "2020.11.01~2020.11.30",
                    "linkPath" : "#1",
                    "productIds" : "75NANO99KNA,55NANO99KNA"
                },
                {
                    "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                    "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                    "title" : "<sup>찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                    "imageAlt" : "",
                    "date" : "2020.11.01~2020.11.30",
                    "linkPath" : "#2",
                    "productIds" : "65NANO99KNA,45NANO99KNA"
                }
            ]


            // 제품 추천 제품코드
            var recommendProductIds = ['75NANO99KNA','65NANO99KNA','55NANO99KNA']; 


            // 새제품 강조 제품코드
            var newRecommendProductIds = ['75NANO99KNA','65NANO99KNA']; 
                
            // /lg5-common/images/PRS/img-new-product-list-full.jpg
            // /lg5-common/images/PRS/img-new-product-list-full-02.jpg
            // /lg5-common/images/dummy/temp/img-new-product-list-t02.jpg
            // "productId": "65NANO99KNA",
            // "linkPath":"#1",
            // "imagePath" : "/lg5-common/images/PRS/img-plan-exhib-slide-list-01.svg",
            // "productName" : "LG TROMM 미니워시+전기식 건조기 히트 전기식 건조기(듀얼 인버터히트)",
            // "productOriginPrice" : "2000000",
            // "productPrice" : "1000000"
            // "fullClassName" : "img-type"
            // isBest
            // isEnergy
            // isReview
            // averageRating
            // reviewCount


            function buildNewRecommend(result){

            }

            // 새제품 렌더링
            function buildNew(result){

                var data = result.data;
                if(data && data.productList){
                    var arr = data.productList;

                    var list = vcui.array.map(arr, function(item, index){

                        var originPrice = item['productOriginPrice'];
                        if(originPrice || originPrice!=='' || originPrice!=='0'){ 
                            item['productOriginPrice'] = vcui.number.addComma(originPrice) + '<em>원</em>';
                        }else{
                            item['productOriginPrice'] = null;
                        }
                        var price = item['productPrice'];
                        if(price || price!=='' || price!=='0'){ 
                            item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                        }else{
                            item['productPrice'] = null;
                        }

                        item['fullClassName'] = null;

                        //isReview

                        // item['isReview'] = true;

                        // "isFlag" : "",
                        // "averageRating" : "4.9",
                        // "reviewCount" : "20"

                        /*
                        "obsBtnRule": "enable",
                        "affiliateCode": null,
                        "bizType": "PRODUCT",
                        "modelName": "65NANO93KNB.AKR",
                        "modelDisplayName": "LG 나노셀 AI \u003csup\u003eThinQ\u003c/sup\u003e",
                        "modelId": "MD08044928",
                        "modelStatusCode": null,
                        "modelDiscontinuedDate": null,
                        "discontinuedDisplayEndDate": null,
                        "modelDiscontinuedDisplayFlag": null,
                        "modelPageType": null,
                        "modelGubun": "1",
                        "obsInventoryFlag": null,
                        "obsOriginalPrice": 0,
                        "obsMemberPrice": 0,
                        "obsDiscountPrice": 0,
                        "obsTotalDiscountPrice": 0,
                        "obsInventoryQty": 0,
                        "obsSellFlag": null,
                        "obsCartFlag": null,
                        "obsTabDisplayFlag": null,
                        "productLevelCode": null,
                        "salesModelCode": "65NANO93KNB",
                        "salesSuffixCode": "AKR",
                        "beforeVisitModelFlag": null,
                        "membershipFlag": null,
                        "modelComponent": null,
                        "reviewDisplayFlag": "Y",
                        "newProductBadgeFlag": null,
                        "cashbackBadgeFlag": "N",
                        "bestBadgeFlag": "N",
                        "cashbackBadgeGubun": null,
                        "imageAltText": null,
                        "largeImageAddr": null,
                        "mediumImageAddr": "/kr/images/tvs/md08044928/md08044928-350x350.jpg",
                        "model360Image": null,
                        "model360Title": null,
                        "smallImageAddr": "/kr/images/tvs/md08044928/md08044928-280x280.jpg",
                        "modelUrlPath": "/tvs/65nano93knb",
                        "categoryId": "CT50000025",
                        "categoryName": "TV",
                        "subCategoryId": "CT50000029",
                        "subCategoryName": "나노셀 TV",
                        "superCategoryId": "CT50000024",
                        "superCategoryName": "TV/AV",
                        "subCategoryCareshipFlag": "",
                        "lgpickFlag": "N",
                        "lgpickDisNo": null,
                        "years1TotAmt": null,
                        "visitPer": null,
                        "totalPrice": "0",
                        "reviewsScore": "0",
                        "reviewsCount": "0",
                        "wishListFlag": null,
                        "wishListId": null,
                        "wishItemId": null,
                        "cartListFlag": null,
                        "rtModelSeq": null,
                        */
                        

                        return item;
                    });

                    var newItemStr = vcui.template(newItemTmpl, {list : list});
                    $('.new-product-list').find('.ui_carousel_track').html(newItemStr);

                    $(window).on('breakpointchange', function(e){

                        var breakpoint = window.breakpoint;    
                        if(breakpoint.name == 'mobile'){    

                            $('.new-product-list').vcCarousel({
                                infinite: true,
                                slidesToShow: 1,
                                slidesToScroll: 1
                            });
                            
                        }else if(breakpoint.name == 'pc'){   
                            
                            $('.new-product-list').vcCarousel('destroy');
                        }    
                    })

                    $(window).trigger('breakpointchange');
                    
                }
                
            }
            


            // 제품 추천 렌더링
            function buildRecommend(result){

                var data = result.data;
                if(data && data.productList){
                    var arr = data.productList;

                    var list = vcui.array.map(arr, function(item, index){

                        var originPrice = item['productOriginPrice'];
                        if(originPrice || originPrice!=='' || originPrice!=='0'){ 
                            item['productOriginPrice'] = vcui.number.addComma(originPrice) + '<em>원</em>';
                        }else{
                            item['productOriginPrice'] = null;
                        }
                        var price = item['productPrice'];
                        if(price || price!=='' || price!=='0'){ 
                            item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                        }else{
                            item['productPrice'] = null;
                        }

                        return item;
                    });

                    var recommentStr = vcui.template(recommendTmpl, {list : list});
                    $('.ui_recom_carousel').find('.ui_carousel_track').html(recommentStr);
                    

                    $(window).on('breakpointchange', function(e){

                        var breakpoint = window.breakpoint;    
                        if(breakpoint.name == 'mobile'){    
                            
                            $('.ui_recom_carousel').vcCarousel('destroy');
                            
                        }else if(breakpoint.name == 'pc'){   
                            
                            $('.ui_recom_carousel').vcCarousel({
                                infinite: true,
                                slidesToShow: 2,
                                slidesToScroll: 2
                            });
                        }    
                    })

                    $(window).trigger('breakpointchange');
                    
                }
                
            }
            
            // 추천 기획전 렌더링
            function buildExhibit(result){

                var data = result.data;
                if(data && data.productList){
                    var arr = data.productList;

                    var nArr = vcui.array.map(exhibitionLocal, function(item, index){
                        var nObj = item;
                        var codesArr = nObj['productIds'].split(',');
                        var list = vcui.array.filter(arr, function(item) {
                            return vcui.array.include(codesArr, item['productId']);
                        });

                        list = vcui.array.map(list, function(item, index){
                            var originPrice = item['productOriginPrice'];
                            if(originPrice || originPrice!=='' || originPrice!=='0'){ 
                                item['productOriginPrice'] = vcui.number.addComma(originPrice) + '<em>원</em>';
                            }else{
                                item['productOriginPrice'] = null;
                            }
                            var price = item['productPrice'];
                            if(price || price!=='' || price!=='0'){ 
                                item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                            }else{
                                item['productPrice'] = null;
                            }

                            return item;
                        });

                        nObj['productList'] = vcui.template(exhibitionProductTmpl, {list : list});;
                        return nObj;
                    });

                    var exhibitionStr = vcui.template(exhibitionTmpl, {list : nArr});
                    $('.ui_exhib_carousel').find('.ui_carousel_track').html(exhibitionStr);
                    $('.ui_exhib_carousel').vcCarousel();

                    $('body').vcLazyLoaderSwitch('reload', $('.ui_exhib_carousel'));
                    
                }
                
            }
            
            // 카테고리 화면 렌더링
            function buildCategoryTab(result){

                var data = result.data;

                if(data && data.catagoryTab){
                    var arr = data.catagoryTab;

                    arr = vcui.array.map(arr, function(item){
                        item['dotLabel'] = '{{no}}번 내용 보기';
                        return item;
                    });

                    var tabStr = vcui.template(categoryTabTmpl, {list:arr});
                    var tabContentStr = vcui.template(categoryTabContentsTmpl, {list:arr});

                    $('.module-box.cnt01 .ui_category_tab_contents').empty().html(tabContentStr);
                    $('.module-box.cnt01 .ui_category_tab > .tabs').empty().html(tabStr);
                    $('.module-box.cnt01 .ui_category_tab').vcTab();


                    $(window).on('breakpointchange', function(e){

                        var breakpoint = window.breakpoint;    
                        if(breakpoint.name == 'mobile'){    
                            $('.category-list-slide').vcCarousel({
                                infinite: true,
                                variableWidth : false,
                                dots: true,
                                slidesToShow: 3,
                                slidesToScroll: 3
                            });
                            
                        }else if(breakpoint.name == 'pc'){    
                            $('.category-list-slide').vcCarousel('destroy');                            
                        }    
                    })

                    $(window).trigger('breakpointchange');


                }
            }

            // 많이 구매하는 제품 화면 렌더링
            function buildRankBuyProduct(result){

                var data = result.data;
                if(data && data.productList){
                    

                    var arr = data.productList;
                    var sortArr = vcui.array.reduce(rankBuyProductIds, function(prev, cur){
                        var fObj = vcui.array.filterOne(arr, function(item){
                            return item['productId'] === cur;
                        });
                        prev.push(fObj);
                        return prev;
                    },[]);

                    sortArr = vcui.array.map(sortArr, function(item, index){
                        var price = item['productPrice'];
                        if(price || price!=='' || price!=='0'){ 
                            item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                        }else{
                            item['productPrice'] = null;
                        }

                        item['num'] = index+1;
                        return item;
                    });

                    var fIdx = vcui.array.indexOf(sortArr, function(item){
                        return item['productId'] === rankBuyProductIds[0];
                    });

                    var bestObj = $.extend(true,rankBuyProductLocal,sortArr[fIdx]);

                    var bestRankBuyProductHtml = vcui.template(bestRankBuyProductTmpl, bestObj);
                    $('.buy-product').find('.best').html(bestRankBuyProductHtml);

                    if(window.breakpoint && window.breakpoint.name){

                        var breakName = window.breakpoint.name;
                        if(breakName==='mobile') breakName = 'm';
                        var name = "data-"+ breakName +"-src";
                        var $bestItem = $('.buy-product').find('.best').find('['+ name +']');
                        var imagePath = $bestItem.attr(name);
                        $bestItem.css({'background-image':'url("'+ imagePath +'")'}); 	

                    }

                    sortArr = vcui.array.removeAt(sortArr, fIdx);
                    var rankBuyProductHtml = vcui.template(rankBuyProductTmpl, {list:sortArr});
                    $('.buy-product').find('.list').html(rankBuyProductHtml);


                    $('body').vcLazyLoaderSwitch('reload', $('.buy-product'));

                }


            }


            // ajax request 부분

            // 카테고리 요청
            lgkorUI.requestAjaxData(storeCategoryTabUrl,{}, buildCategoryTab);

            // 많이 구매하는 제품 요청
            lgkorUI.requestAjaxData(storeRankBuyProductUrl,{productIds : rankBuyProductIds.toString()}, buildRankBuyProduct);
            
            // 추천 기획전 로컬데이터에서  제품코드 추출
            var exhibitProductIds = vcui.array.map(exhibitionLocal, function(item){
                return item['productCode'];
            });

            // 추천 기획전 요청
            lgkorUI.requestAjaxData(exhibitionProductUrl,{productIds : exhibitProductIds.toString()}, buildExhibit);

            // 제품 추천 요청
            lgkorUI.requestAjaxData(recommendProductUrl,{productIds : recommendProductIds.toString()}, buildRecommend);

            // 새제품 요청
            lgkorUI.requestAjaxData(newProductUrl, null, buildNew);

            // 새제품 추천부분 요청
            lgkorUI.requestAjaxData(newRecommendProductUrl, {productIds : newRecommendProductIds.toString()}, buildNewRecommend);


            //$('.new-product-list')

            
            $('.ui_lifestyle_list').vcCarousel({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
    
                responsive: [{
                    breakpoint: 100000,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
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
    }

    $(window).load(function(){
        init();
    })
})();



        /*
            

            $('.new-product-list').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    infinite: true,
                    variableWidth : false,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            });
            */
