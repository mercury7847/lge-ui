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
    '                       <li class="slide-conts ui_carousel_slide" data-category-id="{{obj.categoryId}}">\n'+
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
    '       {{#if isPrice}}'+
    '       {{#if totalPrice}}'+
    '           <div class="price">{{#raw totalPrice}}</div>\n'+
    '       {{/if}}'+
    '       {{/if}}'+
    '   </div>\n'+
    '</a>';

var rankBuyProductTmpl = '{{#each obj in list}}\n'+
    '   <li>\n'+
    '       <a href="{{obj.modelUrlPath}}" data-model-id="{{obj.modelId}}">\n'+
    '       <div class="flag"><span class="num">{{obj.num}}</span></div>\n'+
    '       <div class="img"><img src="{{obj.mediumImageAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '       <div class="product-info">\n'+
    '           <p class="tit">{{obj.modelDisplayName}}</p>\n'+
    '           {{#if obj.isPrice}}'+
    '               {{#if obj.totalPrice}}'+
    '                   <div class="price">{{#raw obj.totalPrice}}</div>\n'+
    '               {{/if}}'+
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
    '               <div class="product-info {{obj.textClass}}">\n'+
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
    '           <div class="img"><img src="{{obj.mediumImageAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
    '           <div class="info">\n'+
    '               <div class="model">{{obj.modelDisplayName}}</div>\n'+
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
    '   <div class="slide-box">\n'+
    '       <div class="img"><img src="{{fullImagePath}}" alt="{{modelDisplayName}}"></div>\n'+    
    '       <div class="product-area">\n'+
    '           <div class="product-contents">\n'+
    '               <div class="flag-wrap bar-type">\n'+
    '                   {{#each title in flags}}\n'+
    '                       <span class="flag"><span class="blind">제품 상태</span>{{title}}</span>\n'+
    '                   {{/each}}\n'+
    '               </div>\n'+
    '               <p class="tit"><a href="{{modelUrlPath}}"><span class="blind">모델명</span>{{modelDisplayName}}</a></p>\n'+
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

    vcui.require(['ui/tab', 'ui/lazyLoaderSwitch', 'ui/carousel'], function () {

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
                "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>2021 아카데미 앵콜 Festival",
                "imageAlt" : "",
                "date" : "2021.04.01~2021.04.30",
                "modelUrlPath" : "/notebook/16z90p-ga79k",
                "textClass":"fc-black"  
            },
            {
                "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>2021 아카데미 앵콜 Festival",
                "imageAlt" : "",
                "date" : "2021.03.01~2021.04.04",
                "modelUrlPath" : "/temp/under-construction",
                "textClass" : "fc-black"
            }
        ]
        // 직접관리하는 영역 끝

        
        var storeCategoryTabUrl = $('.ui_category_tab').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeCategoryTab.json';
        var storeSubCategoryTabUrl = $('.ui_category_tab_contents').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeSubCategoryTab.json';
        var storeRankBuyProductUrl = $('.ui_buy_product').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeRankBuyProduct.json';
        var storeExhibitionProductUrl = $('.ui_exhib_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeExhibition.json';
        var storeNewRecommendProductUrl = $('.ui_new_product_carousel').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeNewRecommendProduct.json';
        var exhibitionModelId = $('.ui_exhib_carousel').data('modelId');
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
                    item['isPrice'] = item['obsSellFlag'] && item['obsInventoryFlag'] && item['obsCartFlag'] && item['obsSellFlag']=='Y' && item['obsInventoryFlag']=='Y' && item['obsCartFlag']=='Y';

                    var obj = newProductRecommendLocal[index];

                    item['fullImagePath'] = obj && obj['fullImagePath'];
                    item['isReview'] = parseInt(item['reviewsCount']) > 0 ? true : false;
                    item['reviewLinkPath'] = item['modelUrlPath']? item['modelUrlPath'] + "#pdp_review" : null;
                    item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);

                    if(parseInt(item['reviewsCount']) > 0 ){
                        item['reviewsCount'] = vcui.number.addComma(parseInt(item['reviewsCount']));
                    }


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
                

                $(window).on('breakpointchange.newrecommend', function(e){

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

                $(window).trigger('breakpointchange.newrecommend');
                
            }

        }


        // 제품 추천 렌더링
        function buildRecommend(){

            $(window).on('breakpointchange.recommend', function(e){

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
                        item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);

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

            $(window).trigger('breakpointchange.category');
            var data = result.data;
            if(data && data.data){

                var arr = data.data;
                arr = vcui.array.map(arr, function(item,index){
                    var categoryId = item['categoryId'];
                    var iconPath = '';                    
                    if(categoryId){
                        iconPath = '/lg5-common/images/PRS/'+ categoryId +'.svg';
                    }else{
                        iconPath = '/lg5-common/images/icons/noimage.svg';
                    }
                    item['iconPath'] = iconPath;
                    return item;
                });

                var tabContentStr = vcui.template(categoryTabContentsTmpl, {list:arr});
                $('#'+categoryId).find('.ui_carousel_track').html(tabContentStr);

                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){    

                    $('#'+categoryId).find('.ui_category_carousel').vcCarousel({
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }).vcCarousel('reinit');
                    
                }else if(breakpoint.name == 'pc'){    
                    $('#'+categoryId).find('.ui_category_carousel').vcCarousel('destroy');                      
                }  

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


                $('.module-box.cnt01 .ui_category_tab.ui_smooth_scroll').vcSmoothScroll('refresh');


                $(window).on('breakpointchange.category', function(e){

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
                    item['modelDisplayName'] = vcui.string.stripTags(item['modelDisplayName']);
                    item['num'] = index+1;
                    return item;
                });


                if(sortArr.length>0){

                    var bestObj = $.extend(true,rankBuyProductLocal,sortArr[0]);
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
    
                    sortArr = vcui.array.removeAt(sortArr, 0);
                    var rankBuyProductHtml = vcui.template(rankBuyProductTmpl, {list:sortArr});
                    $('.ui_buy_product').find('.list').html(rankBuyProductHtml);   
    
                    $('body').vcLazyLoaderSwitch('reload', $('.ui_buy_product'));

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