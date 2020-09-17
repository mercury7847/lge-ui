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

                //var ajaxUrl = '/lg5-common/data-ajax/filter/retrieveCategoryProductList.json';

                _$.ajax({
                    type : "POST",
                    url : ajaxUrl,
                    dataType : "json",
                    data : {id:"테스트"}

                }).done(function(result) {

                    var enableList = result.data && result.data[0].filterEnableList;
                    var arr = result.data && result.data[0].filterList;

                    var filterObj = vcui.array.reduce(arr, function (prev, cur) {
                        if(prev[cur['filterId']]) prev[cur['filterId']].push(cur);
                        else prev[cur['filterId']] = [cur];
                        return prev;
                    }, {}); 

                    var newFilterArr = [];

                    for(var key in filterObj){

                        var filterValues = vcui.array.map(filterObj[key], function(item, index) {	
                            
                            var enableArr = vcui.array.filter(enableList, function(target){
                                if(target['filterId'] == item['filterId']){
                                    return vcui.array.filter(item['facetValueId'].split(','), function(fItem){
                                        return target['facetValueId'] == item['facetValueId'];
                                    });
                                }else{
                                    return false;
                                }
                            });

                            var obj = {
                                'filterName' : item['filterName'], 
                                'label' : item['filterValueName'], 
                                'value' : item['filterValueId'], 
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
                                return item['value'] === cur['value'];
                            });
                            if(items.length===0) prev.push(cur);	  
                            return prev;
                        },[]); 

                        if(filterValues.length>0){
                            newFilterArr.push({ 
                                id : key,
                                type : filterValues[0]['filterTypeCode'],
                                scode : filterValues[0]['facetSourceCode'],
                                name : filterValues[0]['filterName'],
                                order : filterValues[0]['filterOrderNo'],
                                data : filterValues, 
                            });
                        }
                    }
                    
                    newFilterArr.sort(function(a, b) { 
                        return parseInt(a.order) < parseInt(b.order) ? -1 : parseInt(a.order) > parseInt(b.order) ? 1 : 0;
                    });

                    //console.log(newFilterArr);

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