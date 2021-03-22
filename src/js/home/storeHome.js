
var categoryTabTmpl = '{{#each obj in list}}\n'+
'   <li>\n'+
'       <a href="#{{obj.categoryId}}">{{obj.categoryName}}</a>\n'+
'   </li>\n'+
'{{/each}}';


var categoryEmptyTabContentsTmpl = '{{#each obj in list}}\n'+
    '   <div class="tabs-contents" id="{{obj.categoryId}}">\n'+
    '   <div class="slide-wrap category-list-slide ui_category_carousel">\n'+
    '        <div class="indi-wrap">\n'+
    '            <ul class="indi-conts ui_carousel_dots" style="display:none;">\n'+
    '                <li><button type="button" class="btn-indi"><span class="blind">{{obj.dotLabel}}</span></button></li>\n'+
    '            </ul>\n'+
    '        </div>\n'+
    '        <div class="category-list">\n'+
    '            <div class="slide-content ui_carousel_list">\n'+
    '                <ul class="slide-track ui_carousel_track">\n'+                  
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

var categoryTabContentsTmpl = '{{#each obj in list}}\n'+
    '                       <li class="slide-conts ui_carousel_slide">\n'+
    '                           <a href="{{obj.linkPath}}" class="slide-box">\n'+
    '                               <i><img src="{{obj.iconPath}}" alt={{obj.iconAlt}}"></i>\n'+
    '                               <span class="txt">{{obj.title}}</span>\n'+
    '                           </a>\n'+
    '                       </li>\n'+
    '                   {{/each}}'

var bestRankBuyProductTmpl =
    '<a href="{{modelUrlPath}}" data-model-id="{{modelId}}">\n'+
    '   <div class="flag"><img src="/lg5-common/images/PRS/img-flag-buy-best.svg" alt="BEST 1"></div>\n'+
    '   <span class="bg ui_bg_switch"'+ 
    '       style="background-image:url();"'+ 
    '       data-pc-src="{{pcImagePath}}"'+ 
    '       data-m-src="{{mobileImagePath}}"'+
    '       aria-hidden="hidden">\n'+
    '   </span>\n'+
    '   <div class="product-info">\n'+
    '       <p class="tit">{{modelDisplayName}}</p>\n'+
    '       {{#if totalPrice}}'+
    '           <div class="price">{{#raw totalPrice}}</div>\n'+
    '       {{/if}}'+
    '   </div>\n'+
    '</a>';

var rankBuyProductTmpl = '{{#each obj in list}}\n'+
    '   <li>\n'+
    '       <a href="{{obj.modelUrlPath}}" data-model-id="{{obj.modelId}}">\n'+
    '       <div class="flag"><span class="num">{{obj.num}}</span></div>\n'+
    '       <div class="img"><img src="{{obj.mediumImgAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '       <div class="product-info">\n'+
    '           <p class="tit">{{obj.modelDisplayName}}</p>\n'+
    '           {{#if obj.totalPrice}}'+
    '               <div class="price">{{#raw obj.totalPrice}}</div>\n'+
    '           {{/if}}'+
    '       </div>\n'+
    '       </a>\n'+
    '   </li>\n'+
    '{{/each}}';


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
    '                   <a href="{{obj.modelUrlPath}}" class="btn border">자세히 보기</a>\n'+
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
    '       <a href="{{obj.modelUrlPath}}">\n'+
    '           <div class="img"><img src="{{obj.mediumImgAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '           <div class="info">\n'+
    '               <div class="model">{{obj.modelDisplayName}}</div>\n'+
    '               <div class="code">{{obj.modelId}}</div>\n'+
    '               <div class="price-area">\n'+
    '                   <div class="original">\n'+
    '                       {{#if obj.obsOriginalPrice}}'+
    '                           <em class="blind">기존가격</em>\n'+
    '                           <span class="price">{{#raw obj.obsOriginalPrice}}</span>\n'+
    '                       {{/if}}'+
    '                   </div>\n'+
    '                   <div class="total">\n'+
    '                       {{#if obj.totalPrice}}'+
    '                           <em class="blind">판매가격</em>\n'+
    '                           <span class="price">{{#raw obj.totalPrice}}</span>\n'+
    '                       {{/if}}'+
    '                   </div>\n'+
    '           </div>\n'+
    '           </div>\n'+
    '       </a>\n'+
    '   </li>\n'+
    '{{/each}}';


var recommendTmpl = '{{#each obj in list}}\n'+
    '   <li class="slide-conts ui_carousel_slide">\n'+
    '       <a href="{{obj.modelUrlPath}}" class="slide-box">\n'+
    '           <div class="img"><img src="{{obj.mediumImgAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '           <div class="info">\n'+
    '               <div class="model">{{obj.modelDisplayName}}</div>\n'+
    '               <div class="code">{{obj.modelId}}</div>\n'+
    '               <div class="price-area">\n'+
    '                   <div class="original">\n'+
    '                       {{#if obj.obsOriginalPrice}}'+
    '                           <em class="blind">기존가격</em>\n'+
    '                           <span class="price">{{#raw obj.obsOriginalPrice}}</span>\n'+
    '                       {{/if}}'+
    '                   </div>\n'+
    '                   <div class="total">\n'+
    '                       {{#if obj.totalPrice}}'+
    '                           <em class="blind">판매가격</em>\n'+
    '                           <span class="price">{{#raw obj.totalPrice}}</span>\n'+
    '                       {{/if}}'+
    '                   </div>\n'+
    '           </div>\n'+
    '           </div>\n'+
    '       </a>\n'+
    '   </li>\n'+
    '{{/each}}';


var newFullItemTmpl = '<li class="slide-conts ui_carousel_slide img-type">\n'+
    '   <div class="slide-box">\n'+
    '       <div class="img"><img src="{{fullImagePath}}" alt="{{modelDisplayName}}"></div>\n'+    
    '       <div class="product-area">\n'+
    '           <div class="product-contents">\n'+
    '               <div class="flag-wrap bar-type">\n'+
    '                   {{#if isFlag=="best"}}<span class="flag"><span class="blind">제품 상태</span>베스트</span>{{/if}}\n'+
    '                   {{#if isFlag=="energy"}}<span class="flag"><span class="blind">제품 상태</span>으뜸효율 10%</span>{{/if}}\n'+
    '               </div>\n'+
    '               <p class="tit"><a href="{{modelUrlPath}}"><span class="blind">모델명</span>{{modelDisplayName}}</a></p>\n'+
    '               <p class="product-sku"><span class="blind">모델넘버</span>{{modelId}}</p>\n'+
    '               {{#if isReview}}'+
    '                   <div class="review-info">\n'+
    '                       <a href="{{reviewLinkPath}}">\n'+
    '                           <div class="star is-review"><span class="blind">리뷰있음</span></div>\n'+
    '                           <div class="average-rating"><span class="blind">평점</span>{{averageRating}}</div>\n'+
    '                           <div class="review-count"><span class="blind">리뷰 수</span>(<span>{{reviewCount}}</span>)</div>\n'+
    '                       </a>\n'+
    '                   </div>\n'+
    '               {{/if}}'+
    '           </div>\n'+
    '           <div class="product-price">\n'+
    '               <div class="original">{{#if obsOriginalPrice}}<span class="blind">기존가격</span>{{#raw obsOriginalPrice}}{{/if}}</div>\n'+
    '               <div class="total">{{#if totalPrice}}<span class="blind">판매가격</span>{{#raw totalPrice}}{{/if}}</div>\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>';

    
    
$(function(){

    vcui.require(['ui/toggleCarousel', 'ui/tab', 'ui/lazyLoaderSwitch', 'ui/carousel'], function () {


        var storeCategoryTabUrl = $('.ui_category_tab').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeCategoryTab.json';
        var storeSubCategoryTabUrl = $('.ui_category_tab_contents').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeSubCategoryTab.json';
        var storeRankBuyProductUrl = $('.ui_buy_product').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeRankBuyProduct.json';
        var storeExhibitionProductUrl = $('.ui_exhib_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeExhibition.json';
        var storeNewRecommendProductUrl = $('.ui_recom_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeNewRecommendProduct.json';


        // 많이 구매하는 제품 Best 이미지 로컬데이터
        var rankBuyProductLocal = {
            "pcImagePath" : "/lg5-common/images/PRS/img-buy-product-best.jpg",
            "mobileImagePath" : "/lg5-common/images/PRS/img-buy-product-best-m.jpg"
        }
        // 많이 구매하는 제품 요청 제품코드
        var rankBuyModelId = ['75NANO99KNA','65NANO99KNA','55NANO99KNA','45NANO99KNA','35NANO99KNA']; 

        
        // 추천 기획전 로컬데이터
        var exhibitionLocal = [
            {
                "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                "imageAlt" : "",
                "date" : "2020.11.01~2020.11.30",
                "modelUrlPath" : "#1",
                "modelId" : "75NANO99KNA,55NANO99KNA"
            },
            {
                "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                "title" : "<sup>찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                "imageAlt" : "",
                "date" : "2020.11.01~2020.11.30",
                "modelUrlPath" : "#2",
                "modelId" : "65NANO99KNA,45NANO99KNA"
            }
        ]


        // 제품 추천 제품코드
        var recommendModelId = ['75NANO99KNA','65NANO99KNA','55NANO99KNA']; 
        

        // 새제품 추천 로컬데이터
        var newProductRecommendLocal = [
            {
                "fullImagePath" : "/lg5-common/images/PRS/img-new-product-list-full.jpg",
                "modelId" : "65NANO99KBB"
            },
            {
                "fullImagePath" : "/lg5-common/images/PRS/img-new-product-list-full-02.jpg",
                "modelId" : "75NANO99KBB"
            }
        ]

            


        // 새제품 추천 렌더링
        function buildNewRecommend(result){

            var data = result.data;
            if(data && data.data){
                var arr = data.data;

                var list = vcui.array.map(arr, function(item, index){

                    var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                    var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                    var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                    if(obsOriginalPrice || obsOriginalPrice!=='' || obsOriginalPrice!=='0'){ 
                        item['obsOriginalPrice'] = vcui.number.addComma(obsOriginalPrice) + '<em>원</em>';
                    }else{
                        item['obsOriginalPrice'] = null;
                    }

                    var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;

                    if(price || price!=='' || price!=='0'){ 
                        item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                    }else{
                        item['totalPrice'] = null;
                    }

                    var obj = vcui.array.filterOne(newProductRecommendLocal, function(rItem){
                        return rItem['modelId'] === item['modelId'];
                    });

                    item['fullImagePath'] = obj && obj['fullImagePath'];
                    item['isReview'] = parseInt(item['reviewCount']) > 0 ? true : false;
                    item['reviewLinkPath'] = item['reviewLinkPath'] || "";

                    return item;
                });

                var posArr = [0, 6];

                $.each(posArr, function(index, item){

                    if(list[index]){                        
                        var newHtml = vcui.template(newFullItemTmpl, list[index]);
                        var $track = $('.ui_new_product_carousel').find('.ui_carousel_track');
                        var $appendTarget = $track.find('.ui_carousel_slide').eq(item);
                        if($appendTarget[0]) $appendTarget.after(newHtml);
                    }
                })
                

                $(window).on('breakpointchange', function(e){

                    var breakpoint = window.breakpoint;    
                    if(breakpoint.name == 'mobile'){    

                        $('.ui_new_product_carousel').vcCarousel({
                            infinite: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        });
                        
                    }else if(breakpoint.name == 'pc'){   
                        
                        $('.ui_new_product_carousel').vcCarousel('destroy');
                    }    
                })

                $(window).trigger('breakpointchange');
                
            }

        }


        // 제품 추천 렌더링
        function buildRecommend(){

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
        
        // 추천 기획전 렌더링
        function buildExhibit(result){

            var data = result.data;
            if(data && data.data){
                var arr = data.data;

                var nArr = vcui.array.map(exhibitionLocal, function(item, index){
                    var nObj = item;
                    var codesArr = nObj['modelId'].split(',');
                    var list = vcui.array.filter(arr, function(item) {
                        return vcui.array.include(codesArr, item['modelId']);
                    });

                    list = vcui.array.map(list, function(item, index){

                        var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                        var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                        var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                        if(obsOriginalPrice || obsOriginalPrice!=='' || obsOriginalPrice!=='0'){ 
                            item['obsOriginalPrice'] = vcui.number.addComma(obsOriginalPrice) + '<em>원</em>';
                        }else{
                            item['obsOriginalPrice'] = null;
                        }
                        
                        var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;
                        if(price || price!=='' || price!=='0'){ 
                            item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                        }else{
                            item['totalPrice'] = null;
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


        function errorRequest(err){
            //console.log(err);
        }

        function buildSubCatagoryTab(result, categoryId){

            var data = result.data;
            if(data && data.data){

                var arr = data.data;
                var tabContentStr = vcui.template(categoryTabContentsTmpl, {list:arr});
                $('#'+categoryId).find('.ui_carousel_track').html(tabContentStr);

                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){    
                    $('#'+categoryId).find('.ui_category_carousel').vcCarousel({
                        infinite: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 3
                    });
                    
                }else if(breakpoint.name == 'pc'){    
                    $('#'+categoryId).find('.ui_category_carousel').vcCarousel('destroy');                            
                }  


                console.log(arr);

            }

        }
        
        // 카테고리 화면 렌더링
        function buildCategoryTab(result){

            var data = result.data;

            if(data && data.data){
                var arr = data.data;

                arr = vcui.array.map(arr, function(item,index){
                    item['dotLabel'] = '{{no}}번 내용 보기';
                    return item;
                });


                var tabStr = vcui.template(categoryTabTmpl, {list:arr});
                var tabContentStr = vcui.template(categoryEmptyTabContentsTmpl, {list:arr});

                $('.module-box.cnt01 .ui_category_tab_contents').empty().html(tabContentStr);
                $('.module-box.cnt01 .ui_category_tab > .tabs').empty().html(tabStr);

                $('.module-box.cnt01 .ui_category_tab').on('tabbeforechange tabchange tabinit', function(e, data){    
                    
                    var categoryId = null;

                    console.log(data);

                    if(e.type=='tabinit'){

                        categoryId = arr[0].categoryId;
                        lgkorUI.requestAjaxDataFailCheck(storeSubCategoryTabUrl,{categoryId:categoryId}, function(e){
                            buildSubCatagoryTab(e, categoryId);
                        }, errorRequest);

                    }else if(e.type=='tabbeforechange'){

                        $(data.content).css({opacity:0});

                        var len = $(data.content).find('.ui_carousel_track > li').length;
                        if(len>0) return;
                        e.preventDefault();

                        categoryId = arr[data.selectedIndex].categoryId;

                        lgkorUI.requestAjaxDataFailCheck(storeSubCategoryTabUrl,{categoryId:categoryId}, function(e){
                            buildSubCatagoryTab(e, categoryId);
                            $('.module-box.cnt01 .ui_category_tab').vcTab('select', data.selectedIndex, true );
                            $(data.content).transit({opacity:1});

                        }, errorRequest);
                    
                        
                    }else{
                        $(data.content).transit({opacity:1});
                    }
                }).vcTab();


                $(window).on('breakpointchange', function(e){

                    var breakpoint = window.breakpoint;    
                    if(breakpoint.name == 'mobile'){    
                        $('.ui_category_carousel').vcCarousel({
                            infinite: true,
                            variableWidth : false,
                            dots: true,
                            slidesToShow: 3,
                            slidesToScroll: 3
                        });
                        
                    }else if(breakpoint.name == 'pc'){    
                        $('.ui_category_carousel').vcCarousel('destroy');                            
                    }    
                })

                $(window).trigger('breakpointchange');


            }
        }

        // 많이 구매하는 제품 화면 렌더링
        function buildRankBuyProduct(result){

            var data = result.data;
            if(data && data.data){

                var arr = data.data;
                var sortArr = vcui.array.reduce(rankBuyModelId, function(prev, cur){
                    var fObj = vcui.array.filterOne(arr, function(item){
                        return item['modelId'] === cur;
                    });
                    prev.push(fObj);
                    return prev;
                },[]);

                /*
                "modelId":"MD",
                "saleModelCode":"FQ2"
                "saleSuffixCode":"AKOR",
                "modelName":"FQ",
                "modelDisplayName":"LG 휘센",
                "obsOriginalPrice":null,
                "obsMemberPrice":
                "obsDiscountPrice":"",
                "obsSellFlag":"",
                "obsInventoryFlag":"",
                "obsInventoryQty":"",
                "modelStatusCode":"ACTIVE",
                "categoryId":"",
                "categoryName":"",
                "modelUrlPath":"",
                "samllImgAddr":"",
                "mediumImgAddr":"",
                "largeImgAddr":""
                "totalPrice": obsOriginalPrice - obsMemberPrice - obsDiscountPrice
                */
                        
                

                sortArr = vcui.array.map(sortArr, function(item, index){

                    var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                    var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                    var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                    var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;
                    if(price || price!=='' || price!=='0'){ 
                        item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                    }else{
                        item['totalPrice'] = null;
                    }

                    item['num'] = index+1;
                    return item;
                });

                var fIdx = vcui.array.indexOf(sortArr, function(item){
                    return item['modelId'] === rankBuyModelId[0];
                });

                var bestObj = $.extend(true,rankBuyProductLocal,sortArr[fIdx]);

                var bestRankBuyProductHtml = vcui.template(bestRankBuyProductTmpl, bestObj);
                $('.ui_buy_product').find('.best').html(bestRankBuyProductHtml);

                if(window.breakpoint && window.breakpoint.name){

                    var breakName = window.breakpoint.name;
                    if(breakName==='mobile') breakName = 'm';
                    var name = "data-"+ breakName +"-src";
                    var $bestItem = $('.ui_buy_product').find('.best').find('['+ name +']');
                    var imagePath = $bestItem.attr(name);
                    $bestItem.css({'background-image':'url("'+ imagePath +'")'}); 	

                }

                sortArr = vcui.array.removeAt(sortArr, fIdx);
                var rankBuyProductHtml = vcui.template(rankBuyProductTmpl, {list:sortArr});
                $('.ui_buy_product').find('.list').html(rankBuyProductHtml);


                $('body').vcLazyLoaderSwitch('reload', $('.ui_buy_product'));

            }


        }


        // ajax request 부분

        // 카테고리 요청
        lgkorUI.requestAjaxDataFailCheck(storeCategoryTabUrl,{}, buildCategoryTab);

        // 많이 구매하는 제품 요청
        lgkorUI.requestAjaxDataFailCheck(storeRankBuyProductUrl,{modelId : rankBuyModelId.toString()}, buildRankBuyProduct);
        
        // 추천 기획전 로컬데이터에서  제품코드 추출
        var exhibitModelId = vcui.array.map(exhibitionLocal, function(item){
            return item['modelId'];
        });

        // 추천 기획전 요청
        lgkorUI.requestAjaxDataFailCheck(storeExhibitionProductUrl,{modelId : exhibitModelId.toString()}, buildExhibit);

        
        // 새제품 추천 제품코드
        var newProductRecommendModelId = vcui.array.map(newProductRecommendLocal, function(item){
            return item['modelId'];
        });

        // 새제품 추천부분 요청
        lgkorUI.requestAjaxDataFailCheck(storeNewRecommendProductUrl, {modelId : newProductRecommendModelId.toString()}, buildNewRecommend);

        
        buildRecommend();

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


});