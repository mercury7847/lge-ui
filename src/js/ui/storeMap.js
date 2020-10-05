/*!
 * @module vcui.ui.StoreMap
 * @license MIT License
 * @description Naver map 
 * @copyright VinylC UID Group
 * 
 */
vcui.define('ui/storeMap', ['jquery', 'vcui', 'helper/naverMapApi'], function ($, core) {
    "use strict";

    /**
     * @class
     * @description .
     * @name vcui.ui.StoreMap
     * @extends vcui.ui.View
     */

    var StoreMap = core.ui('StoreMap', /** @lends vcui.ui.StoreMap# */{
        bindjQuery: 'storeMap',
        defaults: { 
            mapService: 'naver',
            keyID: 'vsay0tnzme',
            appKey:'oqYmIfzrl6E72lYDAvNeII5x9wEWUNwKrcUctzVa',
            baseUrl : '',
            storeDataUrl : '/data/bestShop.json',
            longitude : 127.0395764,
            latitude: 37.5235644, // 최초로딩위치-절대(강남점)            
            x : 127.0395764,
            y : 37.5235644,
            overlayName : 'ui_overlay_item',
            templates: {
                customMarker : 
                    '<div title="{{title}}" data-id="{{id}}">'+
                    '   <div class="point{{selected}}">'+
                    '       <span class="num">{{num}}</span>'+
                    '       <span class="blind">{{select_txt}}</span>'+
                    '   </div>'+
                    '</div>',

                infoWindow: 
                    '<div class="info-overlaybox">'+
                    '   <div class="inner">'+
                    '       <p class="name">{{agName}}</p>'+
                    '       <p class="adress">{{agAddr1}}</p>'+
                    '       <div class="store-info">'+
                    '           <dl>'+
                    '               <dt>전화</dt>'+
                    '               <dd>{{agTel}}</dd>'+
                    '           </dl>'+
                    '           {{#if agFax != null}}'+
                    '           <dl>'+
                    '               <dt>팩스</dt>'+
                    '               <dd>{{agFax}}</dd>'+
                    '           </dl>'+
                    '           {{/if}}'+
                    '       </div>'+
                    '       <div class="hour-info">'+
                    '           <dl>'+
                    '               <dt>평&nbsp;&nbsp;일</dt>'+
                    '               <dd>{{agWeekday}}</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>토요일</dt>'+
                    '               <dd>{{agSaturday}}</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>일요일</dt>'+
                    '               <dd>{{agSunday}}</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       <div class="btn-group">'+
                    '           <a href="#n" class="btn">매장 상담 신청</a>'+
                    '           <a href="#{{agNum}}" class="btn detail-view">상세 정보</a>'+
                    '       </div>'+
                    '   </div>'+
                    '</div>'
            }
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            self.latitude = parseFloat(self.options.y || self.options.latitude);
            self.longitude = parseFloat(self.options.x || self.options.longitude);

            self.storeData = [];
            self.eventData = [];
            self.itemArr = [];

            new core.helper.NaverMapApi({
                mapService: self.options.mapService,
                keyID: self.options.keyID,
                appKey: self.options.appKey
            }).load(function(){
                self._setting();
            });            
        },

        _setting : function _setting(){
            var self = this;
            var options = {
                center: new naver.maps.LatLng(self.latitude, self.longitude),
                level: 3
            };
            self.map = new naver.maps.Map(self.$el[0], options);            

            if(vcui.detect.isMobile){
                //self._getCurrentLocation();
                self._requestStoreData();
            } else{
                self._requestStoreData();
            }
        },
        
        _getCurrentLocation : function _getCurrentLocation() {
            var self = this;       
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(e){
                        console.log("1")
                        self._onSuccessGeolocation(e);
                    }, 
                    function(e){
                        console.log("2")
                        self._onErrorGeolocation(e);
                    }
                );
            } else {
                console.log("3")
                self._onErrorGeolocation();
            }        
        },

        _requestStoreData : function _requestStoreData(){
            var self = this;
            //전국 베스트샵 매장 가져오기
            var url = self.options.baseUrl + self.options.storeDataUrl;

            $.ajax({
                type : "GET",
                url : url,
                dataType : "json",
            }).done(function(result) {
                if(result.length > 0){                    
                    self.eventData = result[0].eventData;
                    self.storeData = vcui.array.map(result[0].storeData, function(item, index){
                        item['id'] = item['agNum']; //info.agNum || agCode    
                        item['info'] = false;
                        return item;
                    });
                    self._draw(self.storeData);                                    
                    self.triggerHandler('mapinit', [result[0]]);

                    self._changeMarkersState(); 

                    self._bindEvent();
                }else{
                    self.triggerHandler('maperror', [{message:'매장정보가 없습니다.'}]);
                }

            }).fail(function(error) {
                // console.error(error);
                self.triggerHandler('maperror', [{message:'매장정보가 없습니다.'}]);
            });
        },   

        _draw : function _draw(arr){
            var self = this;

            if(!self.map) return;
                
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                self._addCustomMarker(obj.agGpsX, obj.agGpsY, obj, i);
            }
        },   

        _bindEvent: function _bindEvent() {
            var self = this;

            if(!self.map) return;

            naver.maps.Event.addListener(self.map, 'zoom_changed', function() {                  
                if(self.searchMode) return;

                self._changeMarkersState();             
            });

            naver.maps.Event.addListener(self.map, 'dragend', function() {
                self._changeMarkersState();
            });

            for(var idx in self.itemArr){
                var marker = self.itemArr[idx].item;
                var content = vcui.template(self.options.templates.infoWindow, self.itemArr[idx].info);	
                self.itemArr[idx].infoWindow = new naver.maps.InfoWindow({
                    content: [content].join(''),
                    borderWidth: 0,
                    backgroundColor: '#ffffff00',
                    disableAnchor: true,
                    pixelOffset: {x:0, y:-25}
                })
                naver.maps.Event.addListener(marker, 'click', function(e){
                    var id = $(e.overlay.icon.content).data('id');                    
                    var items = vcui.array.filter(self.itemArr, function(item, idx){
                        return item.id == id;
                    });
                    if(items[0].infoWindow.getMap()) items[0].infoWindow.close();
                    else items[0].infoWindow.open(self.map, e.overlay);

                    self.selectedMarker(items[0].id)
                    self._itemClickHandler(items[0]);
                });
            };                  
        },

        _changeMarkersState: function _changeMarkersState(showArr){
            var self = this;

            var items = showArr ? showArr : self.itemArr;
            var arr = self._getNumberInArea(items);
            console.log(items.length)
            console.log(arr.length)

            self._setItemVisible(true);
            self._setItemInfo(arr);

            self.triggerHandler('mapchanged', [arr]);   
        },

        _getNumberInArea : function _getNumberInArea(arr){
            var self = this;

            if(!self.map) return;

            var nArr = [];
            var mp, distance;
            var bounds = self.map.getBounds();
            var center = self.map.getCenter();

            for(var i=0; i<arr.length; i++){
                mp = arr[i]['item'].getPosition();
                distance = self._getDistance(center._lat, center._lng, mp._lat, mp._lng);
                arr[i]['distance'] = distance;

                if(bounds.hasPoint(mp)){
                    nArr.push(arr[i]);
                }
            }
            // 지도 중심에서 가까운 곳순으로 정렬 
            nArr.sort(function(a, b) { 
                return a.distance - b.distance;
            });

            return nArr;
        },    

        _setItemVisible:function _setItemVisible(flag, arr){
            var self = this;
            var item = null;
            for(var i=0; i<self.itemArr.length; i++){                     
                item = self.itemArr[i];
                if(vcui.array.include(arr, item)){
                    item['item'].setVisible(true);
                }else{
                    item['item'].setVisible(flag);
                }
                
                if(!item.info.selected){
                    if(item.infoWindow && item.infoWindow.getMap()){
                        item.infoWindow.close();
                    }
                } else{
                    if(item.infoWindow){
                        if(!item.infoWindow.getMap()) item.infoWindow.open(self.map, item.item);
                    }
                }
            }
        },     

        _setItemInfo : function _setItemInfo(arr){
            var self = this;
            for(var i=0; i<arr.length; i++){    
                var items = arr[i];
                items.item.setIcon(self._getMarkerIcon(items.info, i));    
            }
        },   

        _addCustomMarker : function _addCustomMarker(x,y,info,idx) {
            var self = this;
            if(!self.map) return;		
            
            var overlay = new naver.maps.Marker({
                position: new naver.maps.LatLng(x, y),
                map: self.map,
                icon: self._getMarkerIcon(info, idx)
            });

            var obj = {item:overlay, info:info, id:info['id'], distance:1000}; 
            self.itemArr.push(obj);             
        },

        _getMarkerIcon: function _getMarkerIcon(info, idx){
            var self = this;

            var content = vcui.template(
                self.options.templates.customMarker,
                {
                    id : info.id, 
                    num : idx < 99 ? idx+1 : "-",
                    title: info.agName,
                    selected: info.selected ? " on" : "",
                    select_txt: info.selected ? "선택됨" : "선택안됨"
                }
            );	

            return {
                content: content,
                size: new naver.maps.Size(34, 48),
                anchor: new naver.maps.Point(17, 48)
            };
        },

        _itemClickHandler : function _itemClickHandler(obj){
            var self = this;
            self.triggerHandler('mapitemclick', [obj]);
        },

        _onSuccessGeolocation : function _onSuccessGeolocation(position) {
            var self = this;
            if(!self.map) return;

            self.latitude = position.coords.latitude;
            self.longitude = position.coords.longitude;

            self.map.setCenter(new kakao.maps.LatLng(self.latitude, self.longitude));
        },
        
        _onErrorGeolocation : function _onErrorGeolocation() {
            var self = this;
        },      

        _getDistance : function _getDistance(lat1,lng1,lat2,lng2) {                    
            var R = 6371;
            var dLat = (lat2-lat1) * (Math.PI/180);
            var dLon = (lng2-lng1) * (Math.PI/180);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            return d;
        },

        _matchKeyword: function(item, keyword, matchKeyNames){
            var match = vcui.array.filter(matchKeyNames, function(key, idx){
                if(item.info[key].search(keyword) > -1) return true;
                else return false;
            });

            if(match.length) return true;
            else return false;
        },

        resize: function resize(){
            var self = this;
            self._changeMarkersState();
        },

        selectedMarker: function selectedMarker(id){
            var self = this;
            
            self.itemArr = vcui.array.map(self.itemArr, function(items){
                var selected = items.id == id ? true : false;
                return {...items, info: {...items.info, selected: selected}};
            });

            self._changeMarkersState();
        },

        search: function(keywords, matchIds){
            var self = this;

            var matchKeyNames = matchIds ? matchIds : ['agName', 'agAddr1', 'agAddr2', 'agNAddr1', 'agNAddr2'];
            
            var searchArr = vcui.array.filter(self.itemArr, function(item, idx){
                var match = false;
                for(var i in keywords){
                    var keyword = keywords[i];
                    if(Array.isArray(keyword)){
                        if(self._matchKeyword(item, keyword[0], matchKeyNames) && self._matchKeyword(item, keyword[1], matchKeyNames)){
                            console.log("array : " + item.info.agName, item.info.agAddr1, item.info.agAddr2, item.info.agNAddr1, item.info.agNAddr2, keyword);
                            match = true;
                            break;
                        }
                    } else{
                        if(self._matchKeyword(item, keyword, matchKeyNames)){
                            console.log(item.info.agName, item.info.agAddr1, item.info.agAddr2, item.info.agNAddr1, item.info.agNAddr2, keyword);
                            match = true;
                            break;
                        }
                    }
                }

                return match
            });       

            if(searchArr.length){
                var bounds = new naver.maps.LatLngBounds();
                var info = null;
                for(var i=0; i<searchArr.length; i++){
                    info = searchArr[i].info;
                    bounds.extend(new naver.maps.LatLng(info.agGpsX, info.agGpsY));
                }
                self.map.fitBounds(bounds);

                self._changeMarkersState(searchArr);
            } else{
                self.triggerHandler('mapsearchnodata');  
            }            
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});