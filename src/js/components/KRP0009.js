$(function () {
    if(!document.querySelector('.KRP0009')) return false;

    ;(function($, _$){   
        
        vcui.require(['ui/rangeSlider', 'ui/selectbox', 'ui/accordion'], function () {


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

            console.log(storageFilters);



            $('#filterResetBtn').on('click', function(){
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
                requestData(obj,1);
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

                var str = obj['sorting'];
                storageFilters = {sorting : str};
                Storage.remove(storageName);
                Storage.set(storageName, storageFilters);	
                console.log(storageFilters, Storage.get(storageName));
                				
                //requestData(Storage.get(storageName));
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

            var isRender = false;

            function update(arr){

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


            function render(arr){

                if(isRender) {
                    update(arr);
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

                $('.ui_filter_slider').on('rangesliderinit rangesliderchanged',function (e, data) {

                    $(e.currentTarget).siblings('.min').text(data.minValue);
                    $(e.currentTarget).siblings('.max').text(data.maxValue);

                    if(e.type=='rangesliderchanged'){
                        var filterId = $(e.currentTarget).data('filterId');
                        setSliderData(filterId, data);
                    }
    
                }).vcRangeSlider({mode:true});

                $('.ui_order_accordion').vcAccordion();
                $('.ui_filter_accordion').vcAccordion();


            }

            $('.ui_filter_accordion').on('accordionexpand', function(e,data){

                if(data.content.find('.ui_filter_slider')) {
                    data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                }   

            })

            
            $('.plp-filter-wrap').on('change', 'input', function(e){

                var name = e.target.name;
                var valueStr = "";
                $('.plp-filter-wrap').find('input[name="'+ name +'"]:checked').each(function(idx, item){
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

            /*
            _$(window).on('resizeend', function(e){

                if(_$(window).width() > 1780){

                    _$('.ui_modal_container').vcModal('close'); 

                    var ck = _$('#filterWrap').find('.plp-filter-wrap');
                    if(ck.length==0){
                        _$('#filterWrap').append(_$('.plp-filter-wrap'));
                    }
                   
                }else{
                    var ck = _$('#modalFilterList').find('.plp-filter-wrap');
                    if(ck.length==0){
                        _$('#modalFilterList').append(_$('.plp-filter-wrap'));
                    }
                }

            });

            _$(window).trigger('resizeend');
            */



            function requestData(obj, idx){

                var ajaxUrl = '/lg5-common/data-ajax/filter/retrieveCategoryProductList'+ idx +'.json';
                

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

            requestData(Storage.get(storageName), 0);
            

        });           
        
    })(
        function (selector){
            return $('.KRP0009').find(selector); 
        }, $
    );
});