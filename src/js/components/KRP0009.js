$(function () {
    if(!document.querySelector('.KRP0009')) return false;

    ;(function($, _$){   
        
        vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {

            // localStorage 
            var Storage = {

                set : function(key, value){
                    var storage = localStorage.getItem(key);
                    var storageData = storage? JSON.parse(storage) : {};        
                    storageData = Object.assign(storageData, value);
                    localStorage.setItem(key, JSON.stringify(storageData));        
                    return storageData;
                },

                get :function(key, name){							
                    var storage = localStorage.getItem(key); 
                    if(name){							
                        var storageData = storage? JSON.parse(storage) : {}; 						
                        return storageData[name];
                    }else{
                        return storage? JSON.parse(storage) : {};
                    }   
                },

                remove:function(key, name){    
                    if(name){
                        var storage = localStorage.getItem(key);
                        var storageData = storage? JSON.parse(storage) : {}; 						
                        delete storageData[name];						
                        localStorage.setItem(key, JSON.stringify(storageData)); 
                        return storageData;
                    }else{
                        localStorage.removeItem(key);
                        return null;
                    }						
                }
            }


            
            var sliderTmpl = 
            '<li data-id={{filterId}}><div class="head">'+
                '<a href="#{{headId}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">'+
                    '<div class="tit">{{title}}</div>'+
                    '<span class="blind ui_accord_text">내용 열기</span>'+
                '</a></div><div class="desc ui_accord_content" id="{{headId}}">'+
                '<div class="cont">'+
                    '<div class="range-wrap"><div data-filter-id={{filterId}} class="ui_filter_slider {{uiName}}" data-input={{input}} data-range="{{range}}" data-min-label="minLabel" data-max-label="maxLabel"></div>'+
                    '<p class="min range-num"></p><p class="max range-num"></p></div>'+
            '</div></div></li>';

            var checkboxTmpl = 
            '<li data-id={{filterId}}><div class="head">'+
                '<a href="#{{headId}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">'+
                    '<div class="tit">{{title}}<span class="sel_num"><span class="blind">총 선택 갯수</span>{{count}}</span></div>'+
                    '<span class="blind ui_accord_text">내용 열기</span>'+
                '</a></div><div class="desc ui_accord_content" id="{{headId}}">'+
                '<div class="cont">'+
                '{{#each (item, index) in list}}'+
                '<div class="chk-wrap"><input type="checkbox" name={{filterId}} value={{item.value}} id="{{item.value}}" {{item.enable}}><label for="{{item.value}}">{{item.title}} ({{item.modelCount}})</label></div>'+
                '{{/each}}' +
            '</div></div></li>';

            var colorChipTmpl = 
            '<li data-id={{filterId}}><div class="head">'+
                '<a href="#{{headId}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">'+
                    '<div class="tit">{{title}}<span class="sel_num"><span class="blind">총 선택 갯수</span>{{count}}</span></div>'+
                    '<span class="blind ui_accord_text">내용 열기</span>'+
                '</a></div><div class="desc ui_accord_content" id="{{headId}}">'+
                '<div class="cont">'+
                '{{#each (item, index) in list}}'+
                '<div class="chk-wrap-colorchip {{item.filterName}}"><input type="checkbox" name={{filterId}} value={{item.value}} id="{{item.value}}" {{item.enable}}><label for="{{item.value}}">{{item.title}} ({{item.modelCount}})</label></div>'+
                '{{/each}}' +
            '</div></div></li>';
/* 
            addToCartFlag: "N"
            bizType: "B2C"
            buName1: "HA"
            bundlePlpDisplayFlag: "Y"
            bundlesTotalCount: 0
            categoryId: "CT10000021"
            categoryName: "Refrigerators"
            defaultProductTag: "COMING SOON"
            defaultSiblingModelFlag: "Y"
            discountedRate: "33"
            ecommerceFlag: "N"
            findTheDealerFlag: "N"
            findTheDealerUrl: null
            imageAltText: "Front "
            inchCode: ""
            inquiryToBuyFlag: "N"
            inquiryToBuyUrl: null
            mediumImageAddr: "/us/images/refrigerators/md07514557/350.jpg"
            modelId: "MD07514557"
            modelName: "LRFCS25D3S"
            modelRollingImgList: "/us/images/refrigerators/md07514557/350.jpg,/us/images/refrigerators/md07514557/thumbnail/3501.jpg,/us/images/refrigerators/md07514557/thumbnail/3502.jpg,/us/images/refrigerators/md07514557/thumbnail/3503.jpg,/us/images/refrigerators/md07514557/thumbnail/3504.jpg,/us/images/refrigerators/md07514557/thumbnail/3505.jpg"
            modelStatusCode: "ACTIVE"
            modelType: "G"
            modelUrlPath: "/us/refrigerators/lg-lrfcs25d3s-french-3-door-refrigerator"
            msrp: 1799.99
            obsCurrency: null
            obsInventoryFlag: null
            obsOriginalPrice: 0
            obsProductCount: 0
            obsProductUrl: ""
            obsSellFlag: null
            obsSellingPrice: 0
            obsTotalCount: 15
            plpHighlightModelFlag: "Y"
            productTag1: "COMING SOON"
            productTag2: ""
            promotionPrice: 1199.99
            promotionText: "Refrigerator Deals"
            promotionTotalCount: 5
            rDiscountedPrice: "600"
            rDiscountedPriceCent: "00"
            rPrice: "1799"
            rPriceCent: "99"
            rPromoPrice: "1199"
            rPromoPriceCent: "99"
            retailerPricingFlag: "N"
            retailerPricingText: "See Retailer for Pricing"
            reviewRating: "0"
            reviewRatingPercent: "0"
            reviewRatingStar: "0"
            reviewRatingStar2: "0.0"
            salesModelCode: "LRFCS25D3S"
            salesSuffixCode: "ASTCNA0"
            siblingCode: "Print-Proof-Stainless-Steel"
            siblingGroupCode: "LRFCS25D3"
            siblingLocalValue: "Print Proof Stainless Steel"
            siblingModels: [{…}]
            siblingType: "COLOR"
            smallImageAddr: "/us/images/refrigerators/md07514557/260.jpg"
            smallModelRollingImgList: "/us/images/refrigerators/md07514557/260.jpg,/us/images/refrigerators/md07514557/thumbnail/2601.jpg,/us/images/refrigerators/md07514557/thumbnail/2602.jpg,/us/images/refrigerators/md07514557/thumbnail/2603.jpg,/us/images/refrigerators/md07514557/thumbnail/2604.jpg,/us/images/refrigerators/md07514557/thumbnail/2605.jpg"
            sortBy: null
            target: "NEW"
            thinqTotalCount: 35
            totalCount: 60
            totalSize: 41
            userFriendlyName: "25 cu. ft. French Door Refrigerator"
            whereToBuyFlag: "Y"
            whereToBuyUrl: "/us/refrigerators/lg-lrfcs25d3s-french-3-door-refrigerator#pdp_where"
            wtbExternalLinkName: ""
            wtbExternalLinkSelfFlag: ""
            wtbExternalLinkUrl: ""
            wtbExternalLinkUseFlag: "N"
            wtbUseFlag: "Y"
 */

            var productItemTmpl = 
            '<li class="">'+
                '<div class="item">'+
                    '<div class="promotion-badge">'+
                        '<span class="badge">코리아세일페스파</span>'+
                        '<span class="badge">으뜸효율 10%</span>'+
                    '</div>'+
                    '<div class="product-image">'+
                        '<a href="#">'+
                            '<img data-src={{productImage}} alt="" class="lazyload">'+
                        '</a>'+
                    '</div>'+
                '<div class="product-contents">'+
                    '{{#if defaultSiblingModelFlag}}'+
                        '<div class="option-color">'+
                            '<div class="color-list" role="radiogroup">'+
                                '{{#each (item, index) in list}}'+  
                                    '<div role="radio" class="chk-wrap-colorchip {{item.siblingCode}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                                        '<input type="radio" data-category-id={{categoryId}} id="product-{{item.modelName}}" name="{{siblingType}}" value="{{item.modelId}}">'+
                                        '<label for="product-{{item.modelName}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                                    '</div>'+
                                '{{/each}}' +
                            '</div>'+
                        '</div>'+
                    '{{/if}}'+ 
                    '<div class="badge-product">'+
                        '<span class="badge">NEW</span>'+
                        '<span class="badge">BEST</span>'+
                    '</div>'+
                    '<div class="product-info">'+
                        '<div class="product-name">'+
                            '<a href="#" id="{{modelId}}">{{userFriendlyName}}</a>'+
                        '</div>'+
                        '<div class="sku">{{modelName}}</div>'+
                        '<div class="review-info">'+
                            ' <a href="#">'+
                                '<div class="star is-review"><span class="blind">리뷰있음</span></div>'+
                                '<div class="average-rating"><span class="blind">평점</span>4.0</div>'+
                                '<div class="review-count"><span class="blind">리뷰 수</span>(48)</div>'+
                            ' </a>'+
                        '</div>'+
                        '<ul class="spec-info">'+
                            '<li>용량 : 840L</li>'+
                            '<li>전체크기(WxHxD) : 912 x 1,790 x 927 mm</li>'+
                            '<li>형태 : 노크온 매직스페이스</li>'+
                            '<li>패턴 : 미드나잇</li>'+
                            '<li><span class="care-option">케어십 가능</span></li>'+
                        '</ul>'+
                        '</div>'+
                        '<div class="price-area">'+
                            '<div class="purchase-price">'+
                                '<em class="blind">판매가격</em>'+
                                '<span class="price">5,200,000<em>원</em></span>'+
                            '</div>'+
                            '<div class="product-price">'+
                                '<div class="reduced-price">'+
                                    '<em class="blind">최대 혜택가격</em>'+
                                    '<span class="price">360,000<em>원</em></span>'+
                                '</div>'+
                                '<div class="discount-rate">'+
                                    '<em class="blind">할인율</em>'+
                                    '<span class="price">15<em>%</em></span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="badge-benefit">'+
                            '<span class="text">3%할인</span>'+
                            '<span class="text">사은품</span>'+
                            '<span class="text">캐시백</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="product-wish ">'+
                        '<span class="chk-wrap">'+
                            '<input type="checkbox" id="wish-chk4" name="wish-chk4" checked="">'+
                            '<label for="wish-chk4"><span class="blind">찜하기</span></label>'+
                        '</span>'+
                    '</div>'+
                    '<div class="product-compare">'+
                        '<span class="chk-wrap">'+
                            '<input type="checkbox" id="compare-chk4" name="compare-chk4">'+
                            '<label for="compare-chk4"><span class="blind">비교하기</span></label>'+
                        '</span>'+
                    '</div>'+
                    '<div class="product-button">'+
                        '<a href="#n" class="btn">자세히 보기</a>'+
                    '</div>'+
                '</div>'+
            '</li>'


            var isRender = false;


            // 
            var locationObj = vcui.uri.parseUrl(window.location);
            var storageName = encodeURIComponent(locationObj.path)+'_lgeProductFilter';
            var storageNameExpire = encodeURIComponent(locationObj.path)+'_lgeProductFilter_expire'; // 만료일 
            var expire = Storage.get(storageNameExpire);				

            if(expire && expire.expireDate < new Date().getTime()){
                Storage.remove(storageName);
                Storage.remove(storageNameExpire);
                console.log('remove expire')
            }

            Storage.set(storageNameExpire, {'expireDate' : new Date().getTime() + (20*1000)});	//24*3600000 // 20초로 테스트중 만료일 설정 
            var storageFilters = Storage.get(storageName);	

            //console.log(storageFilters);



            // range slider  
            function setSliderData(id, data){
                var inputStr = ''
                for(var key in data) inputStr += data[key]+',';
                inputStr = inputStr.replace(/,$/,'');
                storageFilters[id] = inputStr;
                Storage.set(storageName, storageFilters);
                setApplyFilter(storageFilters);
            }


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
                }
                if(!noRequest) requestData(obj);
            }
            

            function reset(id){

                var obj = Storage.get(storageName);	

                for(var key in obj){	
                        
                    var $parent = $('[data-id="'+ key +'"]');
                    $parent.find('input[name="'+key+'"]').prop('checked', false);
                    
                    if($parent.find('[data-filter-id="'+ key +'"]').data('ui_rangeSlider')){
                       $parent.find('[data-filter-id="'+ key +'"]').vcRangeSlider('reset', 'Min,Max');
                    }
                }

                storageFilters = {};
                Storage.remove(storageName);
                				
                requestData({});
            }


            function updateFilter(arr){

                for(var i=0; i<arr.length; i++){
                    var item = arr[i];
                    var itemArr = item.data;
                    var $parent = $('[data-id="'+ item['filterId'] +'"]');

                    for(var j=0; j<itemArr.length; j++){
                        $parent.find('input[value="'+ itemArr[j]['filterValueId']+'"]').prop('disabled', itemArr[j]['enable']=='N');
                        $parent.find('label[for="'+ itemArr[j]['filterValueId']+'"]').text(itemArr[j]['filterValueName'] +' ('+ itemArr[j]['modelCount']+')');
                    }
                }
            }

            function renderProdList(arr){

                //console.log($('.product-items-wrap .items-list'));
                ///lg5-common/images/dummy/@img-product.jpg
                
                for(var i=0; i<arr.length; i++){
                    console.log(arr[i]);
                    // console.log(arr[i]['siblingModels']);
                }
            }

            function renderFilter(arr){

                if(isRender) {
                    updateFilter(arr);
                    return;
                }
           
                for(var i=0; i<arr.length; i++){
                    var item = arr[i];
                    if(item.filterTypeCode=='00'){
                        var uArr = item.data.sort(function(a, b) { 
                            return parseInt(a.filterValueName) < parseInt(b.filterValueName) ? -1 : parseInt(a.filterValueName) > parseInt(b.filterValueName) ? 1 : 0;
                        });

                        var rStr = uArr[0]['filterValueName']+','+uArr[uArr.length-1]['filterValueName'];
                        html = vcui.template(sliderTmpl,{
                            filterId : item['filterId'],
                            headId : 'headId_'+i,
                            title : item['filterName'],
                            count : item['modelCount'],
                            uiName : 'ui_'+item['filterName'].toLowerCase()+'_slider',
                            input : ',',
                            range : rStr,
                            roundUnit : 1,
                        });

                    }else{
                        if(item.facetSourceCode=='COLR'){
                            var dArr = vcui.array.map(item.data, function(dItem, idx){
                                return {
                                    title:dItem['rangePointStyle'], 
                                    filterName : dItem['filterValueName'],
                                    value:dItem['filterValueId'], 
                                    modelCount : String(dItem['modelCount']), 
                                    enable:dItem['enable'] == 'N'? 'disabled' : '',
                                }
                            });

                            html = vcui.template(colorChipTmpl,{
                                filterId : item['filterId'],
                                headId : 'headId_'+i,
                                title : item['filterName'],
                                count : '',//item['modelCount'],
                                list : dArr
                            });

                        }else{
                            var dArr = vcui.array.map(item.data, function(dItem, idx){
                                return {
                                    title:dItem['filterValueName'], 
                                    filterName : dItem['filterValueName'],
                                    value:dItem['filterValueId'], 
                                    modelCount:String(dItem['modelCount']), 
                                    enable:dItem['enable'] == 'N'? 'disabled' : '',
                                }
                            });
    
                            html = vcui.template(checkboxTmpl,{
                                filterId : item['filterId'],
                                headId : 'headId_'+i,
                                title : item['filterName'],
                                count : '',//item['modelCount'],
                                list : dArr
                            });
                        }

                    }

                    $('.ui_filter_accordion ul').append(html);
                    isRender = true;
                    

                }

                $('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged',function (e, data) {

                    $(e.currentTarget).siblings('.min').text(data.minValue);
                    $(e.currentTarget).siblings('.max').text(data.maxValue);

                    if(e.type=='rangesliderchanged'){
                        var filterId = $(e.currentTarget).data('filterId');
                        setSliderData(filterId, data);
                    }
    
                }).vcRangeSlider({mode:true});

                $('.ui_order_accordion').vcAccordion();
                $('.ui_filter_accordion').vcAccordion();

                setApplyFilter(storageFilters, true);

            }


            //이벤트 바인딩

            $('.ui_filter_accordion').on('accordionexpand', function(e,data){

                if(data.content.find('.ui_filter_slider')) {
                    data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                }   
            });

            
            $('.ui_filter_accordion').on('change', 'input', function(e){
                var name = e.target.name;
                var valueStr = "";
                $('.ui_filter_accordion').find('input[name="'+ name +'"]:checked').each(function(idx, item){
                    valueStr = valueStr + item.value+','
                });
                valueStr = valueStr.replace(/,$/,'');
                
                if(valueStr==''){
                    delete storageFilters[name];
                    Storage.remove(storageName, name);
                }else{
                    storageFilters[name] = valueStr;
                    Storage.set(storageName, storageFilters);
                }
                setApplyFilter(storageFilters);
            });

            $('#filterModalLink').on('click', function(e){
                e.preventDefault();
                $('.lay-filter').addClass('open');
            });

            $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                e.preventDefault();
                $('.lay-filter').removeClass('open');
            });

            $('input[name="sorting"]').on('change', function(e){
                e.preventDefault();
                var idx = $('input[name="sorting"]').index(this);
                $('.ui_sorting_selectbox').vcSelectbox('selectedIndex', idx, false);
                setApplyFilter(storageFilters);
            });
            
            $('#filterResetBtn').on('click', function(){
                reset();
            });

            $('.ui_sorting_selectbox').on('change', function(e,data){
                var value = e.target.value;
                $('input[name="sorting"][value="'+ value +'"]').prop('checked', true).change();
            }).vcSelectbox();

            $('input[name="categoryCheckbox"]').on('change', function(e){

                if($('input[name="categoryCheckbox"]:checked').length < 2){
                    $(e.currentTarget).prop('checked', true);
                }else{
                    $('input[name="categoryCheckbox"][value="'+ e.target.value +'"]').prop('checked', e.target.checked);
                }
                
                var len = $('input[name="categoryCheckbox"]:checked').length/2;
                $('#categoryCnt').text(len + '개 선택');
            });


            $('input[name="categoryCheckbox"]:checked').change();

            //이벤트 바인딩 end



            function requestData(obj){

                var nObj = vcui.extend(obj,{sorting:$('input[name="sorting"]:checked').val()});
                console.log(nObj);

                var idx = Math.random() > 0.5? 1 : 0;
                var ajaxUrl = '/lg5-common/data-ajax/filter/retrieveCategoryProductList'+idx+'.json'; // 테스트용
                

                _$.ajax({
                    type : "POST",
                    url : ajaxUrl,
                    dataType : "json",
                    data : nObj

                }).done(function(result) {

                    var enableList = result.data && result.data[0].filterEnableList;
                    var filterList = result.data && result.data[0].filterList;
                    var totalCount = result.data && result.data[0].totalCount;
                    

                    var productList = result.data && result.data[0].productList;

                    console.log(productList);

                    var filterObj = vcui.array.reduce(filterList, function (prev, cur) {
                        if(prev[cur['filterId']]) prev[cur['filterId']].push(cur);
                        else prev[cur['filterId']] = [cur];
                        return prev;
                    }, {}); 

                    var newFilterArr = [];

                    for(var key in filterObj){

                        var filterValues = vcui.array.map(filterObj[key], function(item, index) {	
                            var enableArr = vcui.array.filter(enableList, function(target){
                                //facetValueId->filterValueId facetValueId 삭제됨. filterValueId로 대체되어야함.

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
                                'filterTypeCode' : item['filterTypeCode'], //99
                                'rangePointStyle' : item['rangePointStyle'],
                                'facetSourceCode': item['facetSourceCode'], //COLR
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
                                //facetValueId 삭제되면 주석처리 필요.
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

                   renderFilter(newFilterArr);
                   renderProdList(productList);

                }).fail(function(error) {
                    // console.error(error);
                })
            }

            setApplyFilter(storageFilters);


        });           
        
    })(
        function (selector){
            return $('.KRP0009').find(selector); 
        }, $
    );
});