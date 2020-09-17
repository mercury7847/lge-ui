$(function () {
    if(!document.querySelector('.KRP0009')) return false;

    ;(function($, _$){   
        
        
        vcui.require(['ui/rangeSlider', 'ui/selectbox'], function () {

            // local storage 
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

            Storage.set(storageNameExpire, {'expireDate' : new Date().getTime() + (10*1000)});	//24*3600000 // 10초로 테스트중 만료일 설정 
            var storageFilters = Storage.get(storageName);	


            

            $('.ui_desc').on('rangesliderchanged', function (e, data) {
                console.log(data);

                $('.min').text(data.minValue);
                $('.max').text(data.maxValue);

            }).vcRangeSlider({priceUnit:'$', roundUnit:10});

            $('.ui_slider').vcRangeSlider({priceUnit:'$', roundUnit:10}).on('rangesliderchanged', function (e, data) {
                console.log(data);

            });

            //

            
            // 이벤트 바인딩
            $('input[type="checkbox"]').on('change', function(e){
                var id = e.target.id;
                if(e.target.checked){
                    storageFilters[id] = e.target.value;
                    Storage.set(storageName, storageFilters);
                }else{
                    delete storageFilters[id];
                    Storage.remove(storageName, id);
                }
                setApplyFilter(storageFilters);
            });

            $('.apply_filters').on('click', 'a', function(e){
                e.preventDefault();
                var id = $(e.currentTarget).parent().data('id');
                reset(id);
            });

            $('#clearFilterBtn').on('click', function(){
                reset();
            })

            //이벤트 바인딩 end

            // range slider  
            function setSliderData(id, data){
                var inputStr = ''
                for(var key in data) inputStr += data[key]+',';
                inputStr = inputStr.replace(/,$/,'');
                storageFilters[id] = inputStr;
                Storage.set(storageName, storageFilters);
                setApplyFilter(storageFilters);
            }



            function setApplyFilter(obj){		
                
                $('.apply_filters').empty();
                var tmpl='<div data-id="{{key}}">{{txt}} <a href="#">X</a></div>';
                var htmlStr = "";
                var txt = "";

                for(var key in obj){		
                    $('input[type="checkbox"][id="'+ key +'"]').prop('checked', true);

                    if($('[data-id="'+ key +'"]').data('ui_selectbox')){
                        $('[data-id="'+ key +'"]').vcSelectbox('selectedIndex', obj[key] , false);
                        continue;
                    }
                    if($('[data-id="'+ key +'"]').data('ui_rangeSlider')){
                        $('[data-id="'+ key +'"]').vcRangeSlider('option',{input:obj[key]}).vcRangeSlider('reset', false);

                        txt = obj[key] && obj[key].replace(',',' - ');
                        htmlStr = vcui.template(tmpl, { key:key,txt:key+' : '+txt});
                    }else{
                        txt = $('input[type="checkbox"][id="'+ key +'"]').parent().text();
                        htmlStr = vcui.template(tmpl, { key : key,txt : txt});
                    }

                    var $target = $('.apply_filters').find('[data-id="'+ key +'"]');
                    if($target.length > 0){
                        $target.html(htmlStr);
                    }else{
                        $('.apply_filters').append(htmlStr);
                    }							
                }
                requestData(obj);
            }
            

            function reset(id){

                var obj = Storage.get(storageName);	
                for(var key in obj){
                    if(!id || id==key){						
                        $('input[type="checkbox"][id="'+key+'"]').prop('checked', false);
                        var $target = $('.apply_filters').find('[data-id="'+ key +'"]');
                        if($target.length > 0) $target.remove();
                        
                        if($('[data-id="'+ key +'"]').data('ui_rangeSlider')){
                            $('[data-id="'+ key +'"]').vcRangeSlider('option',{input:null}).vcRangeSlider('reset', false);
                        }
                        if($('[data-id="'+ key +'"]').data('ui_selectbox')){
                            $('[data-id="'+ key +'"]').vcSelectbox('selectedIndex', null , false);
                        }
                    }
                }
                if(!id){
                    Storage.remove(storageName);
                    storageFilters = {};	
                }else{
                    delete storageFilters[id];
                    Storage.remove(storageName, id);
                }					
                requestData(Storage.get(storageName));
            }


            function render(arr){
            /* 

            <div class="head">
                    <a href="#head01" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">
                        <div class="tit">
                            서비스 구분
                        </div>
                        <span class="blind ui_accord_text">내용 열기</span>
                    </a>
                </div>
                <div class="desc ui_accord_content" id="head01">
                    <div class="cont">
                        <div class="rdo-wrap">
                            <input type="radio" id="rdo01" name="opt" checked>
                            <label for="rdo01">전체</label>
                        </div>
                        <div class="rdo-wrap">
                            <input type="radio" id="rdo02" name="opt">
                            <label for="rdo02">일반제품</label>
                        </div>
                        <div class="rdo-wrap">
                            <input type="radio" id="rdo03" name="opt" disabled>
                            <label for="rdo03">케어십 가능 제품</label>
                        </div>
                    </div>
                </div>

                <div class="filter_box">
                    <div id="productPrice">가격</div>
                    <div class="ui_price_slider" data-id="price" data-range="100000,10000000" data-round-unit="100000" data-unit-label="원" data-id="price" data-min-label="price range minimum" data-max-label="price range maximum"></div>
                </div>
        
                <div class="filter_box">
                    <div id="productSize">스크린 사이즈</div>
                    <div class="ui_size_slider" data-id="size" data-range="0,200" data-round-unit="1" data-unit-label="cm" data-min-label="size range minimum" data-max-label="size range maximum"></div>
                </div>
        
                <div class="filter_box">
                    <div id="c1">색상</div>
                    <label><input id="color0" type="checkbox" name="color" value="blue"> Blue</label>
                    <label><input id="color1" type="checkbox" name="color" value="red"> Red</label>			
                    <label><input id="color2" type="checkbox" name="color" value="yellow"> Yellow</label>			
                </div>
        
                <div class="filter_box">
                    <div id="c1">타입</div>
                    <label><input id="type0" type="checkbox" name="type" value="c1"> LG SIGNATURE</label>
                    <label><input id="type1" type="checkbox" name="type" value="c2"> OLED TVs</label>			
                    <label><input id="type2" type="checkbox" name="type" value="c3"> NanoCell TVs</label>			
                </div> */
                for(var i=0; i<arr.length; i++){

                }

                // 컴포넌트 설정
                /* 
                $('.ui_filter_selectbox').vcSelectbox().on('change', function(e,data){
                    storageFilters['sortBy'] = data.selectedIndex;
                    Storage.set(storageName, storageFilters);
                    setApplyFilter(storageFilters);
                });				
                
                $('.ui_price_slider').vcRangeSlider({
                    mode:true,
                }).on('rangesliderchanged', function (e, data) {				
                    var id = $(e.currentTarget).data('id');
                    setSliderData(id, data);
                }); 

                $('.ui_size_slider').vcRangeSlider({
                    mode:true,
                }).on('rangesliderchanged', function (e, data) {
                    var id = $(e.currentTarget).data('id');
                    setSliderData(id, data);
                }); */


            }


            function requestData(obj){

                var ajaxUrl = '/lg5-common/data-ajax/filter/retrieveCategoryProductList1.json';

                _$.ajax({
                    type : "POST",
                    url : ajaxUrl,
                    dataType : "json",
                    data : {id:"테스트"}

                }).done(function(result) {

                    var enableList = result.data && result.data[0].filterEnableList;
                    var arr = result.data && result.data[0].filterList;
                    console.log(result);

                    var filterObj = vcui.array.reduce(arr, function (prev, cur) {
                        if(prev[cur['filterId']]) prev[cur['filterId']].push(cur);
                        else prev[cur['filterId']] = [cur];
                        return prev;
                    }, {}); 

                   // console.log(filterObj);

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

                   render(newFilterArr);

                }).fail(function(error) {
                    // console.error(error);
                })
            }

            //setApplyFilter(storageFilters);

            requestData(Storage.get(storageName));
            

        });           
        
    })(
        function (selector){
            return $('.KRP0009').find(selector); 
        }, $
    );
});