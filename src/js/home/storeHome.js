
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
        '       <div class="price">{{productPrice}}</div>\n'+
        '   </div>\n'+
        '</a>';

    var rankBuyProductTmpl = '{{#each obj in list}}\n'+
        '   <li>\n'+
        '       <a href="{{obj.linkPath}}" data-product-id="{{obj.productId}}">\n'+
        '       <div class="flag"><span class="num">{{obj.num}}</span></div>\n'+
        '       <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}" onError="lgkorUI.addImgErrorEvent(this)"></div>\n'+
        '       <div class="product-info">\n'+
        '           <p class="tit">{{obj.productName}}</p>\n'+
        '           <div class="price">{{obj.productPrice}}</div>\n'+
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
        '                   data-m-src="{{obj.mobileImagePath}}">'+
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


    // /lg5-common/images/PRS/img-plan-exhib-slide-list-01.svg
    // LG TROMM 미니워시+전기식 건조기 히트 전기식 건조기(듀얼 인버터히트)
    // 3,880,000<em>원</em>
    var exhibitionProductTmpl = '{{#each obj in list}}\n'+
        '   <li>\n'+
        '       <a href="{{obj.linkPath}}">\n'+
        '           <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}"></div>\n'+
        '           <div class="info">\n'+
        '               <div class="model">{{obj.productName}}</div>\n'+
        '               <div class="code">{{obj.productId}}</div>\n'+
        '               <div class="price-area">\n'+
        '                   <div class="original">\n'+
        '                       <em class="blind">기존가격</em>\n'+
        '                       <span class="price">{{#raw obj.productOriginPrice}}</span>\n'+
        '                   </div>\n'+
        '                   <div class="total">\n'+
        '                       <em class="blind">판매가격</em>\n'+
        '                       <span class="price">{{#raw obj.productPrice}}</span>\n'+
        '                   </div>\n'+
        '           </div>\n'+
        '           </div>\n'+
        '       </a>\n'+
        '   </li>\n'+
        '{{/each}}';


        var recommendTmpl = '{{#each obj in list}}\n'+
        '   <li class="slide-conts ui_carousel_slide">\n'+
        '       <a href="{{obj.linkPath}}" class="slide-box">\n'+
        '           <div class="img"><img src="{{obj.imagePath}}" alt="{{obj.productName}}"></div>\n'+
        '           <div class="info">\n'+
        '               <div class="model">{{obj.productName}}</div>\n'+
        '               <div class="code">{{obj.productId}}</div>\n'+
        '               <div class="price-area">\n'+
        '                   <div class="original">\n'+
        '                       <em class="blind">기존가격</em>\n'+
        '                       <span class="price">{{#raw obj.productOriginPrice}}</span>\n'+
        '                   </div>\n'+
        '                   <div class="total">\n'+
        '                       <em class="blind">판매가격</em>\n'+
        '                       <span class="price">{{#raw obj.productPrice}}</span>\n'+
        '                   </div>\n'+
        '           </div>\n'+
        '           </div>\n'+
        '       </a>\n'+
        '   </li>\n'+
        '{{/each}}';
        

    function init(){
        
        vcui.require(['ui/toggleCarousel', 'ui/tab', 'ui/lazyLoaderSwitch', 'ui/carousel'], function () {

            var storeCategoryTabUrl = '/lg5-common/data-ajax/home/storeCategoryTab.json';
            var storeRankBuyProductUrl = '/lg5-common/data-ajax/home/storeRankBuyProduct.json';
            var exhibitionProductUrl = '/lg5-common/data-ajax/home/storeExhibition.json';
            var recommendProductUrl = '/lg5-common/data-ajax/home/storeRecommendProduct.json';

            // 많이 구매하는 제품 요청 제품코드
            var rankBuyProductIds = ['0001','0003','0004','0002','0005']; 

            // 많이 구매하는 제품 이미지 로컬데이터
            var rankBuyProductLocal = {
                "pcImagePath" : "/lg5-common/images/PRS/img-buy-product-best.jpg",
                "mobileImagePath" : "/lg5-common/images/PRS/img-buy-product-best-m.jpg"
            }

            // 제품 추천 제품코드
            var recommendProductIds = ['0001','0003','0004']; 

            // 추천 기획전 제품코드
            var exhibitProductIds = ['0001|0003','0004|0002']; 

            // 추천 기획전 로컬데이터
            var exhibitionLocal = [
                {
                    "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                    "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                    "title" : "<sup>딱! 찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                    "imageAlt" : "",
                    "date" : "2020.11.01~2020.11.30",
                    "linkPath" : "#1"
                },
                {
                    "pcImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01.jpg",
                    "mobileImagePath" : "/lg5-common/images/PRS/img-plan-exhib-slid-01-m.jpg",
                    "title" : "<sup>찾던 LG전자 가전 혜택</sup>우리가족을 위한<br>건강관리가전<br>추가 혜택",
                    "imageAlt" : "",
                    "date" : "2020.11.01~2020.11.30",
                    "linkPath" : "#2"
                }
            ]



            // 제품 추천 렌더링
            function buildRecommend(result){

                var data = result.data;
                if(data && data.recommendProduct){
                    var arr = data.recommendProduct;

                    var list = vcui.array.map(arr, function(item, index){
                        var originPrice = item['productOriginPrice'] || '0';
                        item['productOriginPrice'] = vcui.number.addComma(originPrice) + '<em>원</em>';

                        var price = item['productPrice'] || '0';
                        item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';

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
                if(data && data.exhibitData){
                    var arr = data.exhibitData;

                    var nArr = vcui.array.map(exhibitionLocal, function(item, index){
                        var nObj = item;

                        var list = arr[index]['productList'];

                        list = vcui.array.map(list, function(item, index){
                            var originPrice = item['productOriginPrice'] || '0';
                            item['productOriginPrice'] = vcui.number.addComma(originPrice) + '<em>원</em>';

                            var price = item['productPrice'] || '0';
                            item['productPrice'] = vcui.number.addComma(price) + '<em>원</em>';

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

                if(data && data.rankBuyProduct){

                    var arr = data.rankBuyProduct;
                    var sortArr = vcui.array.reduce(rankBuyProductIds, function(prev, cur){
                        var fObj = vcui.array.filterOne(arr, function(item){
                            return item['productId'] === cur;
                        });
                        prev.push(fObj);
                        return prev;
                    },[]);

                    sortArr = vcui.array.map(sortArr, function(item, index){
                        var price = item['productPrice'] || '0';
                        item['productPrice'] = vcui.number.addComma(price) + '원';
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

            // 카테고리 요청
            lgkorUI.requestAjaxData(storeCategoryTabUrl,{}, buildCategoryTab);

            // 많이 구매하는 제품 요청
            lgkorUI.requestAjaxData(storeRankBuyProductUrl,{productIds : rankBuyProductIds.toString()}, buildRankBuyProduct);


            // 추천 기획전 요청
            lgkorUI.requestAjaxData(exhibitionProductUrl,{productIds : exhibitProductIds.toString()}, buildExhibit);

            // 제품 추천 요청
            lgkorUI.requestAjaxData(recommendProductUrl,{productIds : recommendProductIds.toString()}, buildRecommend);

            
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
        $('.ui_carousel_slider').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                        
                    }
                },
                {
                    breakpoint: 1090,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 2, 
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: "unslick"
                }
            ]
        });
            
            

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
