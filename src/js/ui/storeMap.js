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
            keyID: '',
            appKey:'',
            longitude : 127.0395764,
            latitude: 37.5235644, // 최초로딩위치-절대(강남점)            
            x : 127.0395764,
            y : 37.5235644,
            boundsMargin: 50,
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
                    '       <p class="name">{{shopName}}</p>'+
                    '       <p class="adress">{{shopAdress}}</p>'+
                    '       <div class="store-info">'+
                    '           <dl>'+
                    '               <dt>전화</dt>'+
                    '               <dd>{{shopTelphone}}</dd>'+
                    '           </dl>'+
                    '           {{#if shopFax != null}}'+
                    '           <dl>'+
                    '               <dt>팩스</dt>'+
                    '               <dd>{{shopFax}}</dd>'+
                    '           </dl>'+
                    '           {{/if}}'+
                    '       </div>'+
                    '       <div class="hour-info">'+
                    '           <dl>'+
                    '               <dt>평&nbsp;&nbsp;일</dt>'+
                    '               <dd>{{bizHours.week}}</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>토요일</dt>'+
                    '               <dd>{{bizHours.saturday}}</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>일요일</dt>'+
                    '               <dd>{{bizHours.subday}}</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       <div class="btn-group">'+
                    '           <a href="#n" class="btn border size">매장 상담 신청</a>'+
                    '           <a href="#{{shopID}}" class="btn border size detail-view">상세 정보</a>'+
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
            self.latitude = parseFloat(self.options.latitude || self.options.y);
            self.longitude = parseFloat(self.options.longitude || self.options.x);

            self.itemArr = [];

            self.centerID = 0;
            self.centerMarker;

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

            self._bindEvent();
            
            self.triggerHandler('mapinit');
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
        },  

        _setItemInfo : function _setItemInfo(arr){
            var self = this;
            for(var i=0; i<arr.length; i++){    
                var items = arr[i];
                items.item.setIcon(self._getMarkerIcon(items.info, i));    
            }
        },   

        _getMarkerIcon: function _getMarkerIcon(info, idx){
            var self = this;

            var content = vcui.template(
                self.options.templates.customMarker,
                {
                    id : info.id, 
                    num : idx < 99 ? idx+1 : "-",
                    title: info.shopID,
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

        _getNumberInArea : function _getNumberInArea(arr){
            var self = this;

            if(!self.map) return;
            
            var nArr = [];
            var mp, distance;
            var bounds = self._getMapBounds();
            var center = self.map.getCenter();

            for(var i=0; i<arr.length; i++){
                mp = arr[i]['item'].getPosition();
                distance = self._getDistance(center._lat, center._lng, mp._lat, mp._lng);
                arr[i]['distance'] = distance;

                if(bounds.hasLatLng(mp)){
                    nArr.push(arr[i]);
                }
            }
            // 지도 중심에서 가까운 곳순으로 정렬 
            nArr.sort(function(a, b) { 
                return a.distance - b.distance;
            });

            return nArr;
        },    

        _setItemVisible:function _setItemVisible(){
            var self = this;
            var item = null;
            var position;
            var items = [];

            var bounds = self._getMapBounds();
            for(var i=0; i<self.itemArr.length; i++){                     
                item = self.itemArr[i];
                position = item['item'].getPosition();

                if(bounds.hasLatLng(position)){
                    items.push(item);
                    item['item'].setVisible(true);
;                } else{
                    item['item'].setVisible(false);

                    item.info.selected = false;
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

            return items;
        },   

        _showItem: function(item){
            if(item.getMap()) return;

            item.setMap(self.map);
        },

        _hideItem: function(item){
            if(!item.getMap()) return;

            item.setMap(null);
        },

        _changeMarkersState: function _changeMarkersState(){
            var self = this;

            if(!self.map) return;

            var showItems = self._setItemVisible();
            
            var arr = self._getNumberInArea(showItems);

            self._setItemInfo(arr);

            self.triggerHandler('mapchanged', [arr]);   
        },

        _setMapBounds: function(){
            var self = this;

            var bounds = new naver.maps.LatLngBounds();
            var info = null;
            for(var i=0; i<self.itemArr.length; i++){
                info = self.itemArr[i].info;
                bounds.extend(new naver.maps.LatLng(info.gpsInfo.gpsx, info.gpsInfo.gpsy));
            }
            self.map.fitBounds(bounds);  
        },

        _addInfoWindow: function(){  
            var self = this;

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

                    self.selectedMarker(items[0].id);
                });
            };   
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

        _draw : function _draw(arr){
            var self = this;

            if(!self.map) return;
                
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                self._addCustomMarker(obj.gpsInfo.gpsx, obj.gpsInfo.gpsy, obj, i);
            }
        },   

        _getMapBounds: function(){
            var self = this;

            var bounds = self.map.getBounds();
            var projection = self.map.getProjection();
            var sw = bounds.getSW();
            var ne = bounds.getNE();
            var offsetSW = projection.fromCoordToOffset(sw);
            var offsetNE = projection.fromCoordToOffset(ne);
            var  margin = self.options.boundsMargin;

            offsetSW.x = offsetSW.x + margin/2;
            offsetSW.y = offsetSW.y;
            offsetNE.x = offsetNE.x - margin/2;
            offsetNE.y = offsetNE.y + margin;

            return new naver.maps.LatLngBounds(projection.fromOffsetToCoord(offsetSW), projection.fromOffsetToCoord(offsetNE));
        },

        deleteMapdata: function(){
            var self = this;

            var leng = self.itemArr.length;
            for(var i=0;i<leng;i++){
                var items = self.itemArr[i];
                items.item.onRemove();
                items.infoWindow.onRemove();
            }
        },

        applyMapData: function(data){
            var self = this;

            self.deleteMapdata();

            self.itemArr = [];
            self._draw(data);   
            
            self._addInfoWindow();
  
            self._setMapBounds();

            self._changeMarkersState(); 
        },

        resize: function resize(){
            var self = this;

            self._changeMarkersState();
        },

        selectedMarker: function selectedMarker(id){
            var self = this;

            self.itemArr = vcui.array.map(self.itemArr, function(item, index){
                var selected = item.id == id ? true : false;
                item.info.selected = selected;         
                return item;
            });

            self._changeMarkersState();
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});