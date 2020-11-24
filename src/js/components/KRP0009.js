$(function () {
    if(!document.querySelector('.KRP0009')) return false;

    ;(function($, _$){   
        
        vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion', 'ui/carousel'], function () {

            var currentPage = '1';
            var categoryId = _$('input[type="hidden"][name="categoryId"]').val();
            var storageName = categoryId+'_lgeProductFilter';
            var storageFilters = lgkorUI.getStorage(storageName);
            var savedFilterArr = firstFilterList || []; // CMS에서 넣어준 firstFilterList를 이용
            var firstRender = false;

            var ajaxUrl = $('.plp-list-wrap').data('prodList');

            //템플릿 설정 슬라이더, 체크박스, 칼라칩, 상품아이템      

      
            var productItemTmpl = 
                '<li>'+
                '   <div class="item plp-item">'+
                '       {{#if badges}}'+
                '       <div class="badge">'+
                '           <div class="flag-wrap image-type left">'+
                '               {{#each badge in badges}}'+
                '               <span class="big-flag">'+
                '                   <img src="{{badge.image}}" alt="{{badge.context}}">'+
                '               </span>'+
                '               {{/each}}'+
                '           </div>'+
                '       </div>'+
                '       {{/if}}'+
                '       <div class="product-image" aria-hidden="true">'+
                '           <div class="slide-wrap ui_plp_carousel">'+
                '               <div class="indi-wrap">'+
                '                   <ul class="indi-conts ui_carousel_dots">'+
                '                       <li><button type="button" class="btn-indi"><span class="blind">##no##번 내용 보기</span></button></li>'+
                '                   </ul>'+
                '               </div>'+
                '               <div class="slide-content ui_carousel_list">'+
                '                   <div class="slide-track ui_carousel_track">'+
                '                       {{#each item in sliderImages}}'+
                '                       <div class="slide-conts ui_carousel_slide">'+
                '                           <a href="#">'+
                '                               <img src="{{item}}" alt="{{userFriendlyName}}">'+
                '                           </a>'+
                '                       </div>'+
                '                       {{/each}}'+
                '                   </div>'+
                '               </div>'+
                '               <div class="slide-controls">'+
                '                   <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
                '                   <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
                '               </div>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-contents">'+      
                '           {{#if defaultSiblingModelFlag}}'+      
                '           <div class="product-option {{siblingType}}">'+
                '               <div class="ui_smooth_scroll">'+
                '                   <ul class="option-list" role="radiogroup">'+
                '                       {{#each item in siblingModels}}'+
                '                       <li>'+
                '                           <div role="radio" class="{{#if siblingType=="color"}}chk-wrap-colorchip {{item.siblingCode}}{{#else}}rdo-wrap{{/if}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                '                               <input type="radio" data-category-id={{categoryId}} id="product-{{item.modelName}}" name="nm_{{modelId}}" value="{{item.modelId}}" {{#if modelId==item.modelId}}checked{{/if}}>'+
                '                               {{#if siblingType=="color"}}'
                '                               <label for="product-{{item.modelName}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                '                               {{#else}}'+
                '                               <label for="product-{{item.modelName}}">{{item.siblingValue}}</label>'+
                '                               {{/if}}'+
                '                           </div>'+
                '                       </li>'+
                '                       {{/each}}'+
                '                   </ul>'+
                '               </div>'+
                '               <div class="scroll-controls">'+
                '                   <button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">이전</span></button>'+
                '                   <button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">다음</span></button>'+
                '               </div>'+
                '           </div>'+
                '           {{#if isBadge}}'+ 
                '           <div class="flag-wrap bar-type">'+  
                '               {{#if productTag1}}'+ 
                '               <span class="flag">{{productTag1}}</span>'+
                '               {{/if}}'+ 
                '               {{#if productTag2}}'+ 
                '               <span class="flag">{{productTag2}}</span>'+
                '               {{/if}}'+ 
                '           </div>'+
                '           {{/if}}'+   
                '           <div class="product-info">'+
                '               <div class="product-name">'+
                '                   <a href="#">{{userFriendlyName}}</a>'+
                '               </div>'+                
                '               <div class="sku">{{modelName}}</div>'+                
                '               <div class="review-info">'+
                '                   <a href="#">'+                        
                '                       <div class="star is-review"><span class="blind">리뷰있음</span></div>'+
                '                       <div class="average-rating"><span class="blind">평점</span>42</div>'+
                '                       <div class="review-count"><span class="blind">리뷰 수</span>(36)</div>'+
                '                   </a>'+
                '               </div>'+    
                '               <ul class="spec-info">'+
                '                   {{#if isSpecInfo}}'+
                '                       {{#each item in specInfos}}'+
                '                           <li><span class="title">{{item.specName}} : </span>{{item.specInfo}}</li>'+
                '                       {{/each}}'+
                '                   {{/if}}'+
                '                   {{#if isCareShip}}'+
                '                           <li><span class="care-option">케어십 가능</span></li>'+
                '                   {{/if}}'+
                '               </ul>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-bottom">'+            
                '           <div class="flag-wrap bar-type">'+                
                '               <span class="flag">캐시백</span>'+                
                '               <span class="flag">사은품</span>'+                
                '           </div>'+
                '           <div class="price-area">'+      
                '               {{#if rPrice}}'+          
                '               <div class="original">'+
                '                   <em class="blind">판매가격</em>'+
                '                   <span class="price">{{rPrice}}<em>원</em></span>'+
                '               </div>'+ 
                '               {{/if}}'+
                '               {{#if rPromoPrice}}'+
                '               <div class="total">'+
                '                   <em class="blind">총 판매가격</em>'+
                '                   <span class="price">{{rPromoPrice}}<em>원</em></span>'+
                '               </div>'+
                '               {{/if}}'+
                '           </div>'+            
                '           <div class="btn-area-wrap">'+
                '               <div class="wishlist">'+
                '                   <span class="chk-wish-wrap large">'+
                '                       <input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}">'+
                '                       <label for="wish-{{modelId}}"><span class="blind">찜하기</span></label>'+
                '                   </span>'+
                '               </div>'+
                '               <div class="cart">'+
                '                   <a href="#n" class="btn-cart" data-id="{{modelId}}"><span class="blind">장바구니 담기</span></a>'+
                '               </div>'+
                '               <div class="btn-area">'+
                '                   <a href="#n" class="btn border" data-id="{{modelId}}">자세히 보기</a>'+
                '               </div>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-compare">'+
                '           <a href="#n" data-id="{{modelId}}"><span>비교하기</span></a>'+
                '       </div>'+        
                '   </div>'+
                '</li>';

            var paginationTmpl =             
            '<a href="#" data-id="{{prevNo}}" class="prev {{#if !leftPage}}disabled{{/if}}"><span class="blind">이전 페이지 보기</span></a>' +            
            '<span class="page_num">'+
                '{{#each item in list}}'+
                    '{{#if item.select}}' +
                        '<strong><span class="blind">현재 페이지</span>{{item.no}}</strong>'+
                    '{{#else}}'+
                        '<a href="#" data-id={{item.no}} title="{{item.no}}페이지 보기">{{item.no}}</a>'+
                    '{{/if}}'+
                '{{/each}}'+
            '</span>'+
            '<a href="#" data-id="{{nextNo}}" class="next {{#if !rightPage}}disabled{{/if}}"><span class="blind">다음 페이지 보기</span></a>'      

            
            // 필터를 리셋후 데이터를 호출함.
            function reset(){
                var obj = lgkorUI.getStorage(storageName);	
                for(var key in obj){	                        
                    var $parent = $('[data-id="'+ key +'"]');
                    $parent.find('input[name="'+key+'"]').prop('checked', false);                    
                    if($parent.find('[data-filter-id="'+ key +'"]').data('ui_rangeSlider')){
                       $parent.find('[data-filter-id="'+ key +'"]').vcRangeSlider('reset', 'Min,Max');
                    }
                }
                var rObj = vcui.extend({}, storageFilters);
                storageFilters = {'subCategoryId':rObj['subCategoryId']};
                lgkorUI.removeStorage(storageName);   
                lgkorUI.setStorage(storageName, storageFilters);
                requestData(storageFilters);
            }


            // 슬라이더 값을 스토리지에 저장함.
            function setSliderData(id, data){
                var inputStr = ''
                for(var key in data) inputStr += data[key]+',';
                inputStr = inputStr.replace(/,$/,'');
                storageFilters[id] = inputStr;
                lgkorUI.setStorage(storageName, storageFilters);
                setApplyFilter(storageFilters);
            }

            // **필터에 상태를 설정후 데이터를 호출함 (슬라이더,체크박스를 저장된 값으로 설정).
            // setApplyFilter(obj, true) => 설정만 실행
            function setApplyFilter(obj, noRequest){	

                for(var key in obj){		
                    var $parent = $('[data-id="'+ key +'"]');
                    var values = obj[key].split(',');
                    for(var i=0; i<values.length; i++){
                        $parent.find('input[id="'+ values[i] +'"]').prop('checked', true);
                    }
                    if($parent.find('[data-filter-id="'+ key +'"]').data('ui_rangeSlider')){
                        $parent.find('[data-filter-id="'+ key +'"]').vcRangeSlider('reset', obj[key]);
                    }
                    if(key == 'subCategoryId'){

                        $('input[name="categoryCheckbox"]').each(function(idx, item){
                            var fArr = vcui.array.filter(values, function(target){
                                return target == item.value;
                            });
                            $(item).prop('checked', fArr.length > 0? true:false);
                        });
                                               
                        var len = $('input[name="categoryCheckbox"]:checked').length/2;
                        $('#categoryCnt').text(len + '개 선택'); 
                    }	
                }
                // 데이터를 호출함. 
                if(!noRequest) requestData(obj);
            }            

            
            // 필터의 비활성 및 선택 갯수를 업데이트
            function updateFilter(arr){

                for(var i=0; i<arr.length; i++){
                    var item = arr[i];
                    var itemArr = item.data;
                    var $parent = $('[data-id="'+ item['filterId'] +'"]');

                    for(var j=0; j<itemArr.length; j++){
                        $parent.find('input[value="'+ itemArr[j]['filterValueId']+'"]').prop('disabled', itemArr[j]['enable']=='N');
                    }

                    var len = $parent.find('input:checked').length;
                    $parent.find('.sel_num').html('<span class="blind">총 선택 갯수</span> ('+ len +')</span>');

                }
            }

            /////////////////////////////////////////////////////////////////////////////////////

            // 상품 아이템을 오버시 이미지를 롤링.
            function fnRollingImage(e){                
                if($(e.currentTarget).data('ui_carousel')){
                    if(e.type == 'mouseover'){
                        $(e.currentTarget).vcCarousel('play');
                        
                    }else{
                       $(e.currentTarget).vcCarousel('stop');
                        setTimeout(function(){
                            $(e.currentTarget).vcCarousel('goTo', 0);
                        }, 500);
                    }
                }
            }

            // 상품 아이템 롤링기능을 PC,MOBILE일 때 교체.
            function fnBreakPoint(){
                var name = window.breakpoint.name;
                $('.ui_plp_carousel').off('mouseover mouseout mouseleave').vcCarousel("setOption", {autoplay:false,'speed':300}, true);
                if(name=="mobile"){
                    $('.ui_plp_carousel').off('mouseover mouseout mouseleave').vcCarousel("setOption", {autoplay:false,'speed':300}, true);

                }else if(name=="pc"){
                    $('.ui_plp_carousel').vcCarousel("setOption", {'speed':0}, true ).on('mouseover mouseout mouseleave', fnRollingImage);
                }   
            }

            // 상품 아이템들을 렌더링
            function renderProdList(arr, totalCnt){

                _$(window).off('breakpointchange.filter');
                $('.product-items-wrap .items-list').empty();
                $('#totalCount').text('총 '+totalCnt+'개');

                var images = '/lg5-common/images/dummy/@img-product.jpg,/lg5-common/images/dummy/@img-product2.jpg'; //테스트용
                //var images = '/lg5-common/images/dummy/@img-product.jpg';

                var html = '';
                
                for(var i=0; i<arr.length; i++){
                    var data = arr[i];

                    var siblingType = data.siblingType? data.siblingType.toLowerCase():'';
                    siblingType = siblingType=="color"? "color" : "text";
                    var sliderImages = images.split(','); // 테스트용 
                    // var sliderImages = data.modelRollingImgList.split(',');

                    if(data.rPrice) data.rPrice = vcui.number.addComma(data.rPrice);
                    if(data.rPromoPrice) data.rPromoPrice = vcui.number.addComma(data.rPromoPrice);

                    var isBigPromotion = data.bigPromotionText && data.bigPromotionImage || false;
                    var isPrice = data.rPrice && data.discountedRate || false;
                    var isPromotion = data.promotionText1 || data.promotionText2 || false;
                    var isBadge = data.productTag1 || data.productTag2;
                    var isSpecInfo = data.specInfos || false;
                    var isBenefit = data.benefitInfos || false;
                    var isCareShip = data.isCareShip || false;

                    var obj = vcui.extend(arr[i],{
                        isBigPromotion : isBigPromotion, 
                        sliderImages : sliderImages, 
                        siblingType: siblingType, 
                        isPrice : isPrice, 
                        isPromotion : isPromotion, 
                        isBadge : isBadge, 
                        isSpecInfo : isSpecInfo, 
                        isBenefit : isBenefit, 
                        isCareShip : isCareShip
                    });   
                    html += vcui.template(productItemTmpl,obj);   
                }

                $('.product-items-wrap .items-list').html(html);

                $('.ui_plp_carousel').vcCarousel('destroy').vcCarousel({
                    indicatorNoSeparator:/##no##/,
                    infinite:true, 
                    autoplaySpeed:500, 
                    speed:0, 
                    easing:'easeInOutQuad'
                });

                _$(window).on('breakpointchange.filter', function(e,data){
                    fnBreakPoint();
                });

                fnBreakPoint();

                setCompares();
            }
            
            // 페이징을 렌더링
            function renderPagination(obj){
                var listArr = [];
                for(var i=obj.loopStart; i<=obj.loopEnd; i++){
                    var nObj = {no:i, select:obj.page==i? true : false};
                    listArr.push(nObj);
                }
                var html = vcui.template(paginationTmpl, 
                    vcui.extend(obj,{ 
                        prevNo:String(parseInt(obj.page)-1), 
                        nextNo:String(parseInt(obj.loopEnd)+1), 
                        list : listArr
                    }));
                $('.pagination').html(html);
                if(obj && obj['page']) currentPage = obj['page'];
            }

            //시작
            function init(){
                bindEvent(); 
                fnBreakPoint(); // breackpoint 이벤트 초기실행
                // storageFilters 값이 있을때 필터를 설정.
                if(!vcui.isEmpty(storageFilters)){
                    setApplyFilter(storageFilters);
                }

                setCompares();
            }

            //비교하기 저장 유무 체크...
            function setCompares(){
                $('.product-list-area .list-wrap .product-items li .product-compare a').removeClass('on');
                var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
                var isCompare = vcui.isEmpty(storageCompare);
                if(!isCompare){
                    for(var i in storageCompare[lgkorUI.COMPARE_ID]){
                        var modelID = storageCompare[lgkorUI.COMPARE_ID][i]['id'];
                        console.log("modelID :", modelID);
                        $('.product-list-area .list-wrap .product-items li .product-compare a[data-id=' + modelID + ']').addClass('on');
                    }
                }
            }

            function setCompareState(atag){
                console.log("setCompareState :", atag)
                var id = $(atag).data('id');
                if(!$(atag).hasClass('on')){
                    var compare = $(atag).closest('.product-compare');
                    var contents = compare.siblings('.product-contents');
                    var productName = contents.find('.product-info .product-name a').text();
                    var productID = contents.find('.product-info .sku').text();
                    var image = compare.siblings('.product-image');
                    var productImg = image.find('.slide-content .slide-conts.on a img').attr("src");
                    var productAlt = image.find('.slide-content .slide-conts.on a img').attr("alt");

                    var compareObj = {
                        id: id,
                        productName: productName,
                        productID: productID,
                        productImg: productImg,
                        productAlt: productAlt
                    }
                    console.log("compareObj :", compareObj)

                    var isAdd = lgkorUI.addCompareProd(compareObj);
                    if(isAdd) $(atag).addClass("on");
                } else{
                    lgkorUI.removeCompareProd(id);
                }
            }

            //이벤트 바인딩
            function bindEvent(){
                // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
                $('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged',function (e, data) {
                    $(e.currentTarget).siblings('.min').text(vcui.number.addComma(data.minValue));
                    $(e.currentTarget).siblings('.max').text(vcui.number.addComma(data.maxValue));
                    if(e.type=='rangesliderchanged'){
                        var filterId = $(e.currentTarget).data('filterId');
                        setSliderData(filterId, data);
                    }
                }).vcRangeSlider({mode:true});

                // 아코디언 설정
                $('.ui_order_accordion').vcAccordion();
                $('.ui_filter_accordion').vcAccordion();

                // 필터 아코디언 오픈시 슬라이더 업데이트
                $('.ui_filter_accordion').on('accordionexpand', function(e,data){
                    if(data.content.find('.ui_filter_slider').length > 0) {
                        data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                    }   
                });

                // 필터안 체크박스 이벤트 처리
                $('.ui_filter_accordion').on('change', 'input', function(e){
                    var name = e.target.name;
                    var valueStr = "";
                    $('.ui_filter_accordion').find('input[name="'+ name +'"]:checked').each(function(idx, item){
                        valueStr = valueStr + item.value+','
                    });
                    valueStr = valueStr.replace(/,$/,'');                    
                    if(valueStr==''){
                        delete storageFilters[name];
                        lgkorUI.removeStorage(storageName, name);
                    }else{
                        storageFilters[name] = valueStr;
                        lgkorUI.setStorage(storageName, storageFilters);
                    }
                    setApplyFilter(storageFilters);
                });

                // 모바일 필터박스 열기
                $('#filterModalLink').on('click', function(e){
                    e.preventDefault();
                    $('.lay-filter').addClass('open');
                });

                // 모바일 필터박스 닫기
                $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                    e.preventDefault();
                    $('.lay-filter').removeClass('open');
                });                

                // 초기화버튼 이벤트 처리
                $('#filterResetBtn').on('click', function(){
                    reset();
                });
                $('.ui_reset_btn').on('click', function(){
                    reset();
                });

                // 정렬(인기순,최신순,...) , 커스텀 셀렉터박스와 연결, 이벤트 처리
                $('input[name="sorting"]').on('change', function(e){
                    e.preventDefault();
                    var idx = $('input[name="sorting"]').index(this);
                    $('.ui_sorting_selectbox').vcSelectbox('selectedIndex', idx, false);
                    setApplyFilter(storageFilters);
                });

                // 정렬(인기순,최신순,...) , 커스텀 셀렉터박스와 연결, 이벤트 처리
                $('.ui_sorting_selectbox').on('change', function(e,data){
                    var value = e.target.value;
                    $('input[name="sorting"][value="'+ value +'"]').prop('checked', true).change();
                }).vcSelectbox();

                $('.product-list-area .list-wrap .product-items').on('click', '> li .product-compare a', function(e){
                    e.preventDefault();
                    setCompareState(e.currentTarget);
                });


                // 서브카테고리 이벤트 처리 
                //$('input[name="categoryCheckbox"]').trigger('change', true);

                $('input[name="categoryCheckbox"]').on('change', function(e, noRequest){

                    if($('input[name="categoryCheckbox"]:checked').length < 2){
                        $(e.currentTarget).prop('checked', true);
                        return;
                    }else{
                        $('input[name="categoryCheckbox"][value="'+ e.target.value +'"]').prop('checked', e.target.checked);
                    }                

                    var subCategoryArr = [];
                    $('input[name="categoryCheckbox"]:checked').each(function(idx, item){
                        subCategoryArr.push(item.value);
                    });

                    subCategoryArr = vcui.array.unique(subCategoryArr);
                    var subCategoryId = vcui.array.reduce(subCategoryArr, function(acc, cur){
                        return acc+','+cur;
                    },'');
                    subCategoryId = subCategoryId.replace(/,/,'');

                    storageFilters['subCategoryId'] = subCategoryId;
                    lgkorUI.setStorage(storageName, storageFilters);
                    setApplyFilter(storageFilters, noRequest);
                });

                // 페이징 링크 이벤트 처리
                $('.pagination').on('click','a',function(e){
                    e.preventDefault();
                    var $target = $(e.currentTarget);
                    if($target.hasClass('disabled')) return;
                    var page = $target.data('id');
                    if(page){
                        currentPage = String(page);
                        requestData(storageFilters);
                    }
                    
                })

                // 상품아이템 Carousel 설정
                $('.ui_plp_carousel').vcCarousel({
                    indicatorNoSeparator:/##no##/, //기존{{no}}를 사용시 템플릿에서 오류발생 ##no##로 변경
                    infinite:true, 
                    autoplaySpeed:500, 
                    speed:0, 
                    easing:'easeInOutQuad',                    

                });

                // 브레이크포인트 이벤트 처리
                _$(window).on('breakpointchange.filter', function(e,data){
                    fnBreakPoint();
                }).on("changeStorageData", function(){
                    setCompares();
                })
            }


            // 슬라이더(가격,사이즈)정보를 filterValueId 로 변경합.
            function getSlideFilterValueId(arr, value, isMin){

                var returnStr='';
                var num = parseInt(value);
                for(var i=0; i<arr.length; i++){
                    var value1 = parseInt(arr[i]['filterValueName']);
                    var value2 = parseInt(arr[i+1] && arr[i+1]['filterValueName']);
                    if(value1 <= num && value2 >= num ){
                        if(isMin){
                            if(value1==num){
                                returnStr = arr[i]['filterValueId'];
                            }else{
                                returnStr = arr[i+1]['filterValueId'];
                            }                            
                        }else{
                            if(value2==num){
                                returnStr = arr[i+1]['filterValueId'];
                            }else{
                                returnStr = arr[i]['filterValueId'];
                            }                            
                        }
                        break;
                    }
                }
                return returnStr;
            }

            // ajax 보내는 데이터를 변경.(가격정보,사이즈정보를 id값으로 변경합.)
            function convertPostData(obj){

                var nObj = vcui.extend({
                    sort : $('input[name="sorting"]:checked').val(),
                    categoryId : categoryId,
                    page : currentPage,
                }, obj);

                for(var key in obj){
                    var fArr = vcui.array.filter(savedFilterArr, function(item){
                        return item.filterId == key && item.filterTypeCode=='00';
                    });                    
                    if(fArr.length>0){
                        var filterName = fArr[0]['filterName'].toLowerCase();
                        if(filterName == 'price' || filterName == 'size'){
                            var values = fArr[0]['data'];
                            var sArr = obj[key].split(',');
                            if(sArr.length>1){
                                if(vcui.isNumber(parseInt(sArr[0]))){
                                    nObj[filterName+'Min'] = getSlideFilterValueId(values, sArr[0], true);
                                }else{
                                    nObj[filterName+'Min'] = '';
                                }
                                if(vcui.isNumber(parseInt(sArr[1]))){
                                    nObj[filterName+'Max'] = getSlideFilterValueId(values, sArr[1], false);
                                }else{
                                    nObj[filterName+'Max'] = '';
                                }
                            }
                            delete nObj[key];
                        }
                    }
                }
                return nObj;
            }

            
            // 데이터를 요청합.
            function requestData(obj){

                lgkorUI.showLoading();
                console.log("requestURL: " + ajaxUrl)
                console.log('requestData: ', convertPostData(obj));

                _$.ajax({
                    type : "GET",
                    url : ajaxUrl,
                    dataType : "json",
                    data : convertPostData(obj)

                }).done(function(result) {

                    var enableList = result.data && result.data[0].filterEnableList;
                    var filterList = result.data && result.data[0].filterList;
                    var totalCount = result.data && result.data[0].totalCount;
                    var productList = result.data && result.data[0].productList;
                    var pageInfo = result.data && result.data[0].pageInfo;


                    var filterObj = vcui.array.reduce(filterList, function (prev, cur) {
                        if(prev[cur['filterId']]) prev[cur['filterId']].push(cur);
                        else prev[cur['filterId']] = [cur];
                        return prev;
                    }, {}); 

                    var newFilterArr = [];

                    for(var key in filterObj){
                        var filterValues = vcui.array.map(filterObj[key], function(item, index) {	
                            var enableArr = vcui.array.filter(enableList, function(target){
                                // ** facetValueId->filterValueId facetValueId 삭제됨. filterValueId로 대체되어야함.
                                if(target['filterId'] == item['filterId']){
                                    return vcui.array.filter(item['facetValueId'].split(','), function(fItem){
                                        return target['facetValueId'] == item['facetValueId'];
                                    });
                                }else{
                                    return false;
                                }
                                /*
                                if(target['filterId'] == item['filterId'] && target['filterValueId'] == item['filterValueId']){
                                    return true;
                                }else{
                                    return false;
                                }*/
                            });

                            var obj = {
                                'filterName' : item['filterName'], 
                                'filterValueName' : item['filterValueName'], 
                                'filterValueId' : item['filterValueId'], 
                                'facetValueId' : item['facetValueId'], 
                                'modelCount' : item['countModel'],
                                'filterTypeCode' : item['filterTypeCode'], //00(슬라이더),..
                                'rangePointStyle' : item['rangePointStyle'],
                                'facetSourceCode': item['facetSourceCode'], //COLR(칼라칩),..
                                'filterOrderNo': item['filterOrderNo'],
                            } 

                            if(enableArr.length>0){ 
                                var eArr = vcui.array.filter(enableArr, function(eItem){
                                    return eItem['facetValueId'] == obj['facetValueId'];
                                });
                                if(eArr.length>0){
                                    obj['modelCount'] = eArr[0]['modelCount'];
                                    obj['enable'] = eArr[0]['enable'];
                                }
                            };
                            
                            return obj;
                        });
                        filterValues = vcui.array.reduce(filterValues, function(prev, cur){
                            var items = vcui.array.filter(prev, function(item, index) {
                                return item['filterValueId'] === cur['filterValueId'];
                            });
                            if(items.length===0){ 
                                prev.push(cur);
                            }else{
                                //**facetValueId 삭제되면 주석처리 필요.
                                prev[prev.length-1]['facetValueId'] = prev[prev.length-1]['facetValueId'] +','+ cur['facetValueId'];
                            }	  
                            return prev;
                        },[]); 
                        if(filterValues.length>0){
                            newFilterArr.push({ 
                                filterId : key,
                                filterTypeCode : filterValues[0]['filterTypeCode'],
                                facetSourceCode : filterValues[0]['facetSourceCode'],
                                filterName : filterValues[0]['filterName'],
                                filterOrderNo : filterValues[0]['filterOrderNo'],
                                data : filterValues, 
                            });
                        }
                    }                       
                    
                    newFilterArr.sort(function(a, b) { 
                        return parseInt(a.filterOrderNo) < parseInt(b.filterOrderNo) ? -1 : parseInt(a.filterOrderNo) > parseInt(b.filterOrderNo) ? 1 : 0;
                    });

                    savedFilterArr = newFilterArr;  
                    updateFilter(newFilterArr);
                    renderProdList(productList, totalCount);
                    renderPagination(pageInfo);
                    firstRender = true;
                    lgkorUI.hideLoading();                   

                }).fail(function(error) {
                    console.error(error);
                    lgkorUI.hideLoading();
                })
            }
            
            init();
        });           
        
    })(
        function (selector){
            return $('.KRP0009').find(selector); 
        }, $
    );
});