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


            

            $('.ui_desc').on('rangesliderinit rangesliderchanged', function (e, data) {
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

            var sliderTmpl = 
            '<li><div class="head">'+
                '<a href="#{{headId}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">'+
                    '<div class="tit">{{title}}</div>'+
                    '<span class="blind ui_accord_text">내용 열기</span>'+
                '</a></div><div class="desc ui_accord_content" id="{{headId}}">'+
                '<div class="cont">'+
                    '<div class="ui_filter_slider {{uiName}}" data-range="{{range}}" data-min-label="minLabel" data-max-label="maxLabel"></div>'+
                    '<p class="min"></p><p class="max"></p>'+
            '</div></div></li>';

            var checkboxTmpl = 
            '<li><div class="head">'+
                '<a href="#{{headId}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">'+
                    '<div class="tit">{{title}}<span class="sel_num"><span class="blind">총 선택 갯수</span>{{count}}</span></div>'+
                    '<span class="blind ui_accord_text">내용 열기</span>'+
                '</a></div><div class="desc ui_accord_content" id="{{headId}}">'+
                '<div class="cont">'+
                '{{#each (item, index) in list}}'+
                '<div class="chk-wrap"><input type="checkbox" value={{item.value}} id="chk_{{index+1}}" {{item.enable}}><label for="chk_{{index+1}}">{{item.title}} ({{item.modelCount}})</label></div>'+
                '{{/each}}' +
            '</div></div></li>';

            function render(arr){
           
                for(var i=0; i<arr.length; i++){

                    var item = arr[i];
                    if(item.filterTypeCode=='00'){



                        var uArr = item.data.sort(function(a, b) { 
                            return parseInt(a.filterValueName) < parseInt(b.filterValueName) ? -1 : parseInt(a.filterValueName) > parseInt(b.filterValueName) ? 1 : 0;
                        });

                        var rStr = uArr[0]['filterValueName']+','+uArr[uArr.length-1]['filterValueName'];

                        console.log(rStr);


                        html = vcui.template(sliderTmpl,{
                            headId : 'headId_'+i,
                            title : item['filterName'],
                            count : item['modelCount'],
                            uiName : 'ui_'+item['filterName'].toLowerCase(),
                            // input : '',
                            range : rStr
                            
                        });
                    }else{

                        var dArr = vcui.array.map(item.data, function(dItem, idx){
                            return {
                                title:dItem['filterValueName'], 
                                value:dItem['filterValueId'], 
                                modelCount:dItem['modelCount'], 
                                enable:dItem['enable'] == 'N'? 'disabled' : '',
                            }
                        });

                        // console.log(dArr);



                        // enable: "Y"
                        // facetSourceCode: "CTGR"
                        // facetValueId: "FV60004667"
                        // filterName: "Types"
                        // filterOrderNo: "1"
                        // filterTypeCode: "99"
                        // filterValueId: "FV60004667"
                        // filterValueName: "French Door"
                        // modelCount: 16


                        html = vcui.template(checkboxTmpl,{
                            headId : 'headId_'+i,
                            title : item['filterName'],
                            count : item['modelCount'],
                            list : dArr
                        });

                    }

                    $('.ui_filter_accordion ul').append(html);

                    

                }

                // $('.ui_filter_slider').vcRangeSlider({mode:true});

                $('.ui_filter_slider').on('rangesliderinit rangesliderchanged', function (e, data) {
                    
                    console.log(data);
    
                    $('.min').text(data.minValue);
                    $('.max').text(data.maxValue);
    
                }).vcRangeSlider({mode:true, roundUnit:10000});


                $('.ui_filter_accordion').on('accordionexpand', function(e,data){

                    if(data.content.find('.ui_filter_slider')) {
                        data.content.find('.ui_filter_slider').vcRangeSlider('update');
                    }   

                }).vcAccordion();

                



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