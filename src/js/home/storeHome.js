var categoryTabTmpl = '{{#each obj in list}}\n'+
'   <li>\n'+
'       <a href="#{{obj.categoryId}}">{{obj.categoryName}}</a>\n'+
'   </li>\n'+
'{{/each}}';




var categoryEmptyTabContentsTmpl = '{{#each obj in list}}\n'+
    '   <div class="tabs-contents" id="{{obj.categoryId}}">\n'+
    '        <div class="category-list">\n'+
    '           <ul class="ui_sub_category">\n'+                  
    '           </ul>\n'+
    '        </div>\n'+
    '   </div>\n'+
    '{{/each}}';

var categoryTabContentsTmpl = '{{#each obj in list}}\n'+
    '                       <li data-category-id="{{obj.categoryId}}">\n'+
    '                           <a href="{{obj.linkPath}}" class="slide-box">\n'+
    '                               <i><img src="{{obj.iconPath}}" alt=""></i>\n'+
    '                               <span class="txt">{{obj.title}}</span>\n'+
    '                           </a>\n'+
    '                       </li>\n'+
    '                   {{/each}}'

var bestRankBuyProductTmpl =
    '<a href="{{modelUrlPath}}" data-model-id="{{modelId}}" data-ec-product="{{ecProduct}}">\n'+
    '   <div class="flag"><img src="/lg5-common/images/PRS/img-flag-buy-best.svg" alt="BEST 1"></div>\n'+
    '   <span class="bg ui_bg_switch"'+ 
    '       style="background-image:url();"'+ 
    '       data-pc-src="{{pcImagePath}}"'+ 
    '       data-m-src="{{mobileImagePath}}"'+
    '       aria-hidden="hidden">\n'+
    '   </span>\n'+
    '   <div class="product-info">\n'+
    '       <p class="tit">{{#raw modelDisplayName}}</p>\n'+
    // '       <p class="tit">{{modelName}}</p>\n'+
    '       {{#if isPrice}}'+
    '       {{#if totalPrice}}'+
    '           <div class="price">{{#raw totalPrice}}</div>\n'+
    '       {{/if}}'+
    '       {{/if}}'+
    '   </div>\n'+
    '</a>';

var rankBuyProductTmpl = '{{#each obj in list}}\n'+
    '   <li>\n'+
    '       <a href="{{obj.modelUrlPath}}" data-model-id="{{obj.modelId}}" data-ec-product="{{obj.ecProduct}}">\n'+
    '       <div class="flag"><span class="num">{{obj.num}}</span></div>\n'+
    '       <div class="img"><img src="{{obj.mediumImageAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '       <div class="product-info">\n'+
    '           <p class="tit">{{#raw obj.modelDisplayName}}</p>\n'+
    // '           <p class="tit">{{obj.modelName}}</p>\n'+
    '           {{#if obj.isPrice}}'+
    '               {{#if obj.totalPrice}}'+
    '                   <div class="price">{{#raw obj.totalPrice}}</div>\n'+
    '               {{/if}}'+
    '           {{/if}}'+
    '       </div>\n'+
    '       </a>\n'+
    '   </li>\n'+
    '{{/each}}';

/* 20210615 추천 기획전 구조변경 */
var exhibitionTmpl = '{{#each obj in list}}\n'+
    '   <div class="product-list">\n'+
    '       <ul><li>{{#raw obj.productList}}</li></ul>\n'+
    '   </div>\n'+                       
    '{{/each}}';
/* //20210615 추천 기획전 구조변경 */

var exhibitionProductTmpl = '{{#each obj in list}}\n'+
    '   <li>\n'+
    '       <a href="{{obj.modelUrlPath}}">\n'+
    '           <div class="img"><img src="{{obj.mediumImageAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '           <div class="info">\n'+
    '               <div class="model">{{#raw obj.modelDisplayName}}</div>\n'+
    '               <div class="code">{{obj.modelName}}</div>\n'+
    '               {{#if obj.isPrice}}'+
    '                   <div class="price-area">\n'+
    '                       <div class="original">\n'+
    '                           {{#if obj.obsOriginalPrice}}'+
    '                               <em class="blind">기존가격</em>\n'+
    '                               <span class="price">{{#raw obj.obsOriginalPrice}}</span>\n'+
    '                           {{/if}}'+
    '                       </div>\n'+
    '                       <div class="total">\n'+
    '                           {{#if obj.totalPrice}}'+
    '                               <em class="blind">판매가격</em>\n'+
    '                               <span class="price">{{#raw obj.totalPrice}}</span>\n'+
    '                           {{/if}}'+
    '                       </div>\n'+
    '                   </div>\n'+
    '               {{/if}}\n'+
    '           </div>\n'+
    '       </a>\n'+
    '   </li>\n'+
    '{{/each}}';


var newFullItemTmpl = '<li class="slide-conts ui_carousel_slide img-type">\n'+
    '   <div class="slide-box" data-ec-product="{{ecProduct}}">\n'+
    '       <div class="img"><img src="{{fullImagePath}}" alt="{{modelDisplayName}}"></div>\n'+    
    '       <div class="product-area">\n'+
    '           <div class="product-contents">\n'+
    '               <div class="flag-wrap bar-type">\n'+
    '                   {{#each title in flags}}\n'+
    '                       <span class="flag"><span class="blind">제품 상태</span>{{title}}</span>\n'+
    '                   {{/each}}\n'+
    '               </div>\n'+
    '               <p class="tit"><a href="{{modelUrlPath}}"><span class="blind">모델명</span>{{#raw modelDisplayName}}</a></p>\n'+
    '               <p class="product-sku"><span class="blind">모델넘버</span>{{modelName}}</p>\n'+
    '               {{#if isReview}}'+
    '                   <div class="review-info">\n'+
    '                       <a href="{{reviewLinkPath}}">\n'+
    '                           <div class="star is-review"><span class="blind">리뷰있음</span></div>\n'+
    '                           <div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>\n'+
    '                           <div class="review-count"><span class="blind">리뷰 수</span>(<span>{{reviewsCount}}</span>)</div>\n'+
    '                       </a>\n'+
    '                   </div>\n'+
    '               {{/if}}'+
    '           </div>\n'+
    '           <div class="product-price">\n'+
    '               {{#if isPrice}}\n'+
    '                   <div class="original">{{#if obsOriginalPrice}}<span class="blind">기존가격</span>{{#raw obsOriginalPrice}}{{/if}}</div>\n'+
    '                   <div class="total">{{#if totalPrice}}<span class="blind">판매가격</span>{{#raw totalPrice}}{{/if}}</div>\n'+
    '               {{/if}}\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>';

$(function(){

    function getUriQuery(url, name){
        var parseUrl = vcui.uri.parseUrl(url);
        var obj = vcui.uri.parseQuery(parseUrl.query);
        return name? obj[name] : obj;
    }

    var $context = !!$('[data-hash="store"]').length ? $('[data-hash="store"]') : $(document);

    vcui.require(['ui/tab', 'ui/lazyLoaderSwitch', 'ui/carousel'], function () {

        $context.find('.ui_wide_slider').vcCarousel('destroy').vcCarousel({
            autoplay: true,
            autoplaySpped: 5000,
            infinite: true,
            pauseOnHover: false,
            pauseOnFocus: false,
            swipeToSlide: true,
            dotsSelector: '.ui_wideslider_dots',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: false,
            touchThreshold: 100,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150
        });

        
        $context.find('.ui_lifestyle_list').vcCarousel({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
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

        $(window).on('breakpointchange.lifestyle', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){                    
                $context.find('.ui_product_lifestyle').vcCarousel({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });
                
            }else if(breakpoint.name == 'pc'){    
                $context.find('.ui_product_lifestyle').vcCarousel('destroy');                            
            }    
        })

        $(window).trigger('breakpointchange.lifestyle');


        // 직접관리하는 영역                
        // 많이 구매하는 제품 -> Best 이미지관리

        var rankBuyProductLocal = {
            "pcImagePath" : "/lg5-common/images/PRS/img-buy-product-best.jpg",
            "mobileImagePath" : "/lg5-common/images/PRS/img-buy-product-best-m.jpg"
        }
        // 새로운 제품, 놓치지 마세요 -> 이미지관리
        var newProductRecommendLocal = [{
            "fullImagePath" : "/lg5-common/images/PRS/img-new-product-list-full.jpg"
        },
        {
            "fullImagePath" : "/lg5-common/images/PRS/img-new-product-list-full-02.jpg"
        }];
        // class명 '.ui_exhib_carousel'에 attribute가  data-model-id = 'event1-code1,event1-code2|event2-code1,event2-code2'로 들어오는 값과 매칭시켜서 보여줌. 
        // data-model-id = 'event1-code1,event1-code2' 이런 형식으로 들어오는경우 exhibitionLocal 에 첫번째 이벤트만 노출됨.
        // data-model-id = 'A0,A1|B0,B1|C0,C1' 이런 형식으로 들어오는경우 exhibitionLocal 도 갯수만큼 추가해야함.

        var exhibitionLocal = [
            {
                "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                "title" : "PC 아카데미 페스티벌<br>앵콜 기획전",
                "imageAlt" : "",
                "date" : "",
                "modelUrlPath" : "/benefits/exhibitions/detail-PE00007002",
                "textClass":"fc-black"  
            },
            {
                "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>2021 아카데미<br>앵콜 Festival",
                "imageAlt" : "",
                "date" : "2021.03.01~2021.04.04",
                "modelUrlPath" : "/temp/under-construction",
                "textClass" : "fc-black"
            }
        ]
        // 직접관리하는 영역 끝


        function getEcProduct(item){
            var displayName = item.modelDisplayName.replace(/(<([^>]+)>)/ig,"");
    
            function getCategoryName(){
                if( item.subCategoryName != "" && item.subCategoryName != "undefined") {
                    return item.superCategoryName + "/" + item.categoryName + "/" + item.subCategoryName
                } else {
                    return item.superCategoryName + "/" + item.categoryName; 
                }
            }
    
            var currentEcValue = {
                "model_name": displayName.trim(),
                "model_id": item.modelId,					
                "model_sku": item.modelName,					 
                "model_gubun": item.modelGubunName		
            }
    
            if( item.obsOriginalPrice != undefined && item.obsOriginalPrice !== null && item.obsOriginalPrice !== "" ) {
                currentEcValue.price = vcui.number.addComma(item.obsOriginalPrice)
            }
    
            if( item.obssellingprice != undefined  && item.obssellingprice !== null && item.obssellingprice !== "") {
                currentEcValue.discounted_price = vcui.number.addComma(item.obssellingprice)
            }
    
            currentEcValue.brand=  "LG";
            currentEcValue.category= getCategoryName()
    
            return currentEcValue;
        }
    

        
        var storeCategoryTabUrl = $context.find('.ui_category_tab').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeCategoryTab.json';
        var storeSubCategoryTabUrl = $context.find('.ui_category_tab_contents').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeSubCategoryTab.json';
        var storeRankBuyProductUrl = $context.find('.ui_buy_product').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeRankBuyProduct.json';
        var storeExhibitionProductUrl = $context.find('.ui_exhib_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeExhibition.json';
        var storeNewRecommendProductUrl = $context.find('.ui_new_product_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeNewRecommendProduct.json';
        var exhibitionModelId = $context.find('.ui_exhib_carousel').data('modelId');
        var exhibitionModelIdArr = exhibitionModelId? exhibitionModelId.split('|') : '';
        var newExhibitionLocal = [];

        for(var i=0; i<exhibitionModelIdArr.length; i++){
            var obj = exhibitionLocal[i];
            obj['modelId'] = exhibitionModelIdArr[i];
            newExhibitionLocal.push(obj);

        }

        // 새제품 추천 렌더링
        function buildNewRecommend(result){

            var data = result.data;
            if(data && data.data){
                var arr = data.data;

                var list = vcui.array.map(arr, function(item, index){
                    
                    var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                    var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                    var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                    var newTempEcProduct = getEcProduct(item);
                    item.ecProduct = JSON.stringify(newTempEcProduct);

                    if(obsOriginalPrice!==0){ 
                        item['obsOriginalPrice'] = vcui.number.addComma(obsOriginalPrice) + '<em>원</em>';
                    }else{
                        item['obsOriginalPrice'] = null;
                    }

                    var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;

                    if(price!==0){ 
                        item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                    }else{
                        item['totalPrice'] = null;
                    }
                    item['flags'] = (item['isFlag'] && item['isFlag'].split('|')) || ((item['isflag'] && item['isflag'].split('|')) || []);
                    item['isPrice'] = item['obsSellFlag'] && item['obsInventoryFlag'] && item['obsCartFlag'] && item['obssellingprice'] && item['obsSellFlag']=='Y' && item['obsInventoryFlag']=='Y' && item['obsCartFlag']=='Y' && item['obssellingprice'] > 0;

                    var obj = newProductRecommendLocal[index];

                    item['fullImagePath'] = obj && obj['fullImagePath'];
                    item['isReview'] = parseInt(item['reviewsCount']) > 0 ? true : false;
                    item['reviewLinkPath'] = item['modelUrlPath']? item['modelUrlPath'] + "#pdp_review" : null;
                    // item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);

                    if(parseInt(item['reviewsCount']) > 0 ){
                        item['reviewsCount'] = vcui.number.addComma(parseInt(item['reviewsCount']));
                    }


                    return item;
                });

                var posArr = [0, 6];
                $.each(posArr, function(index, item){

                    if(list[index]){       
                        var newHtml = vcui.template(newFullItemTmpl, list[index]);
                        var $track = $context.find('.ui_new_product_carousel').find('.ui_carousel_track');
                        var $appendTarget = $track.find('.ui_carousel_slide').eq(item);
                        if($appendTarget[0]) $appendTarget.after(newHtml);
                    }
                })
                

                $(window).on('breakpointchange.newrecommend', function(e){

                    var breakpoint = window.breakpoint;    
                    if(breakpoint.name == 'mobile'){    

                        $context.find('.ui_new_product_carousel').vcCarousel({
                            infinite: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            variableWidth: true,
                            lastFix: true
                        });
                        
                    }else if(breakpoint.name == 'pc'){   
                        
                        $context.find('.ui_new_product_carousel').vcCarousel('destroy');
                    }    
                })

                $(window).trigger('breakpointchange.newrecommend');
                
            }

        }


        // 제품 추천 렌더링
        function buildRecommend(){

            $(window).on('breakpointchange.recommend', function(e){

                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){    
                    
                    $context.find('.ui_recom_carousel').vcCarousel('destroy');
                    
                }else if(breakpoint.name == 'pc'){   
                    
                    $context.find('.ui_recom_carousel').vcCarousel({
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    });
                }    
            })

            $(window).trigger('breakpointchange.recommend');
            
        }
        
        // 추천 기획전 렌더링
        function buildExhibit(result){

            var data = result.data;
            if(data && data.data){
                var arr = data.data;

                var nArr = vcui.array.map(newExhibitionLocal, function(item, index){
                    var nObj = item;
                    var codesArr = nObj['modelId']? nObj['modelId'].split(',') : '';
                    var list = vcui.array.filter(arr, function(item) {
                        return vcui.array.include(codesArr, item['modelId']);
                    });

                    list = vcui.array.map(list, function(item, index){

                        var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                        var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                        var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                        if(obsOriginalPrice!==0){ 
                            item['obsOriginalPrice'] = vcui.number.addComma(obsOriginalPrice) + '<em>원</em>';
                        }else{
                            item['obsOriginalPrice'] = null;
                        }
                        
                        var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;
                        if(price!==0){ 
                            item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                        }else{
                            item['totalPrice'] = null;
                        }

                        item['isPrice'] = item['obsSellFlag'] && item['obsInventoryFlag'] && item['obsCartFlag'] && item['obsSellFlag']=='Y' && item['obsInventoryFlag']=='Y' && item['obsCartFlag']=='Y';
                        // item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);

                        return item;
                    });

                    /* 20210615 추천 기획전 구조변경 */
                    nObj['productList'] = vcui.template(exhibitionProductTmpl, {list : list});
                    var exhibitionStr = vcui.template(exhibitionTmpl, { list: nArr });
                    /* //20210615 추천 기획전 구조변경 */

                    return nObj;
                });

                //console.log(nArr )
                $('.ui_exhib_carousel .product-listCont').each(function(i,v) {
                    //console.log(i,v)
                    if(nArr[i]) {
                        $(this).find('ul').html(nArr[i].productList );
                    } 
                    
                })

                /* 20210615 추천 기획전 구조변경 */
                // var exhibitionStr = vcui.template(exhibitionTmpl, {list : nArr});
            
                // $('.ui_exhib_carousel').find('.product-listCont').html(exhibitionStr);
                /* //20210615 추천 기획전 구조변경 */
                $context.find('.ui_exhib_carousel').vcCarousel({
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });

                $('body').vcLazyLoaderSwitch('reload', $context.find('.ui_exhib_carousel'));
                
            }
            
        }


        function errorRequest(err){
            //console.log(err);
        }

        function buildSubCatagoryTab(result, categoryId){

            var data = result.data;
            if(data && data.data){

                var arr = data.data;
                arr = vcui.array.map(arr, function(item,index){
                    var categoryId = item['categoryId'];
                    var iconPath = '';                    
                    if(categoryId){
                        if (vcui.detect.isMobileDevice){
                            iconPath = '/lg5-common/images/PRS/mobile/'+ categoryId +'.svg';
                        } else {
                            iconPath = '/lg5-common/images/PRS/'+ categoryId +'.svg';
                        }
                    }else{
                        iconPath = '/lg5-common/images/icons/noimage.svg';
                    }
                    item['iconPath'] = iconPath;
                    return item;
                });

                var tabContentStr = vcui.template(categoryTabContentsTmpl, {list:arr});
                $context.find('#'+categoryId).find('.ui_sub_category').html(tabContentStr);

                // 4개 이하일때 중앙정렬
                if (arr.length < 4){
                    $context.find('#'+categoryId).find('.ui_sub_category').css({
                        'justify-content' : 'center'
                    });
                } else {
                    /*
                    $context.find('#'+categoryId).find('.ui_sub_category').css({
                        'justify-content' : ''
                    });
                    */
                }

            }

        }
        
        // 카테고리 화면 렌더링
        function buildCategoryTab(result){

            var data = result.data;

            if(data && data.data){
                var arr = data.data;

                var tabStr = vcui.template(categoryTabTmpl, {list:arr});
                var tabContentStr = vcui.template(categoryEmptyTabContentsTmpl, {list:arr});

                $context.find('.module-box.cnt01 .ui_category_tab_contents').empty().html(tabContentStr);
                $context.find('.module-box.cnt01 .ui_category_tab > .tabs').empty().html(tabStr);


                $context.find('.module-box.cnt01 .ui_category_tab').on('tabbeforechange tabchange tabinit', function(e, data){    
                    
                    var categoryId = null;

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
                            $context.find('.module-box.cnt01 .ui_category_tab').vcTab('select', data.selectedIndex, true );
                            $(data.content).transit({opacity:1});

                        }, errorRequest);
                    
                        
                    }else{
                        $(data.content).transit({opacity:1});
                    }
                }).vcTab();


                $context.find('.module-box.cnt01 .ui_category_tab.ui_smooth_scroll').vcSmoothScroll('refresh');

                $(window).on('breakpointchange.category', function(e){

                    var breakpoint = window.breakpoint;    
                    if(breakpoint.name == 'mobile'){    
                        $context.find('.ui_category_carousel').vcCarousel({
                            infinite: true,
                            variableWidth : false,
                            dots: true,
                            slidesToShow: 3,
                            slidesToScroll: 3
                        });

                        
                    }else if(breakpoint.name == 'pc'){    
                        $context.find('.ui_category_carousel').vcCarousel('destroy');                            
                    }    
                })

                $(window).trigger('breakpointchange.category');
            }
        }

        // 많이 구매하는 제품 화면 렌더링
        function buildRankBuyProduct(result){

            var data = result.data;
            if(data && data.data){

                var arr = data.data;
                var sortArr = vcui.array.map(arr, function(item, index){

                    var obsOriginalPrice = parseInt(item['obsOriginalPrice'] || "0");
                    var obsMemberPrice = parseInt(item['obsMemberPrice'] || "0");
                    var obsDiscountPrice = parseInt(item['obsDiscountPrice'] || "0");

                    var price = obsOriginalPrice - obsMemberPrice - obsDiscountPrice;
                    if(price!==0){ 
                        item['totalPrice'] = vcui.number.addComma(price) + '<em>원</em>';
                    }else{
                        item['totalPrice'] = null;
                    }
                    item['isPrice'] = item['obsSellFlag'] && item['obsInventoryFlag'] && item['obsCartFlag'] && item['obsSellFlag']=='Y' && item['obsInventoryFlag']=='Y' && item['obsCartFlag']=='Y';
                    // item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);

                    item['num'] = index+1;
                    return item;
                });


                if(sortArr.length>0){

                    var bestObj = $.extend(true,rankBuyProductLocal,sortArr[0]);
                    bestObj.ecProduct = JSON.stringify(getEcProduct(bestObj));
                    var bestRankBuyProductHtml = vcui.template(bestRankBuyProductTmpl, bestObj);
                    $context.find('.ui_buy_product').find('.best').html(bestRankBuyProductHtml);

                    if(window.breakpoint && window.breakpoint.name){

                        var breakName = window.breakpoint.name;
                        if(breakName==='mobile') breakName = 'm';
                        var name = "data-"+ breakName +"-src";
                        var $bestItem = $('.ui_buy_product').find('.best').find('['+ name +']');
                        var imagePath = $bestItem.attr(name);
                        $bestItem.css({'background-image':'url("'+ imagePath +'")'}); 	
    
                    }
    
                    sortArr = vcui.array.removeAt(sortArr, 0);
                    sortArr.forEach(function(item){
                        item.ecProduct = JSON.stringify(getEcProduct(item));
                    })

                    var rankBuyProductHtml = vcui.template(rankBuyProductTmpl, {list:sortArr});
                    $context.find('.ui_buy_product').find('.list').html(rankBuyProductHtml);   
    
                    $('body').vcLazyLoaderSwitch('reload', $context.find('.ui_buy_product'));

                }
            }

        }


        // 카테고리 요청
        lgkorUI.requestAjaxDataFailCheck(storeCategoryTabUrl,{}, buildCategoryTab, errorRequest);

        // 많이 구매하는 제품
        lgkorUI.requestAjaxDataFailCheck(storeRankBuyProductUrl,{}, buildRankBuyProduct, errorRequest);        
        
        // 추천 기획전
        lgkorUI.requestAjaxDataFailCheck(storeExhibitionProductUrl,{}, buildExhibit, errorRequest);
        
        // 새로운 제품, 놓치지 마세요
        lgkorUI.requestAjaxDataFailCheck(storeNewRecommendProductUrl, {}, buildNewRecommend, errorRequest);
        
        buildRecommend();       

    });


});