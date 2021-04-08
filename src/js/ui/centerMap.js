/*!
 * @module vcui.ui.StoreMap
 * @license MIT License
 * @description Naver map 
 * @copyright VinylC UID Group
 * 
 */
vcui.define('ui/centerMap', ['jquery', 'vcui', 'helper/naverMapApi'], function ($, core) {
    "use strict";

    /**
     * @class
     * @description .
     * @name vcui.ui.CenterMap
     * @extends vcui.ui.View
     */

    var CenterMap = core.ui('CenterMap', /** @lends vcui.ui.CenterMap# */{
        bindjQuery: 'centerMap',
        defaults: { 
            mapService: 'naver',
            keyID: '',
            appKey:'',
            longitude : 126.9784147,
            latitude: 37.5666805, // 최초로딩위치-절대(서울시청 기준)            
            x : 126.9784147,
            y : 37.5666805,
            zoom: 11,
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
                    '<div class="info-overlaybox" tabindex="0">'+
                    '   <div class="inner">'+
                    '       <div class="tit-wrap">'+
                    '           <p class="name">'+
                    '               <span class="blind">매장명</span>'+
                    '               {{shopName}}'+
                    '           </p>'+
                    '           {{# if(typeof bizStatus != "undefined") { #}}'+
                    '           {{# if(typeof bizStatus.bizStatusClass != "undefined") { #}}'+
                    '           <div class="status-icon {{bizStatus.bizStatusClass}}">'+
                    '           {{# } else { #}}'+
                    '           <div class="status-icon">'+
                    '           {{# } #}}'+
                    '               <strong class="status">{{bizStatus.bizStatusText}}</strong>'+
                    '           </div>'+
                    '           {{# } #}}'+
                    '       </div>'+
                    '       <p class="adress">{{shopAdress}}</p>'+
                    '       <div class="hour-info">'+
                    '           <dl>'+
                    '               <dt>평일 : </dt>'+
                    '               <dd>{{bizHours.week}}</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>토요일 : </dt>'+
                    '               <dd>{{bizHours.saturday}}</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       {{# if(typeof serviceProduct != "undefined") { #}}' +
                    '       <div class="useable-service">' + 
                    '           <strong class="useable-tit">서비스가능 제품 :</strong>' + 
                    '           {{#each (item, index) in serviceProduct}}' +
                    '               {{# if(index > 0) { #}}' +
                                    ', '+
                                    '{{# } #}}' +    
                                    '<span class="name">{{item.name}}</span>'+
                                '{{/each}}' +
                            '</div>' + 
                    '       <ul class="opt-list">'+
                    '           {{#each item in serviceProduct}}' +
                    '           <li class="{{item.class}}">'+
                    '               <span class="name">{{item.name}}</span>'+
                    '           </li>' +
                    '           {{/each}}' +
                    '       </ul>'+
                    '       {{# } #}}' +
                    '       <div class="btn-group">'+
                    '           {{#if typeof consultUrl != "undefined"}}'+
                    '           <a href="{{consultUrl}}" class="btn size" target="_blank" title="새창으로 열림 - {{shopName}}">방문 예약</a>'+
                    '           {{/if}}'+
                    '           <a href="#{{shopID}}" class="btn size detail-view" onclick="moveDetail(this, \''+self.detailUrl+'\', '+self.windowHeight+');" title="새창으로 열림 - {{shopName}}">상세 보기</a>'+
                    '       </div>'+
                    '   </div>'+
                    '   <button class="btn-overlay-close"><span class="blind">닫기</span></button>'+
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
            self.zoom = self.options.zoom;

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
                zoom: self.zoom,
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
                        self._onSuccessGeolocation(e);
                    }, 
                    function(e){
                        self._onErrorGeolocation(e);
                    }
                );
            } else {
                self._onErrorGeolocation();
            }        
        },

        _bindEvent: function _bindEvent() {
            var self = this;

            if(!self.map) return;  
            
            naver.maps.Event.addListener(self.map, 'idle', function() {
                var obj = vcui.array.filterOne(self.itemArr, function(item, idx){
                    return item.info.selected == true;
                });
                if (obj) self.infoContentSet(obj.id);
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
            // console.log("#### _changeMarkersState ###")
            if(!self.map) return;
            var items = self.itemArr;
            // var showItems = self._setItemVisible();
            
            // var arr = self._getNumberInArea(showItems);
            self._setItemInfo(items);
            self.triggerHandler('mapchanged', [items]);   
        },

        _setMapBounds: function(){
            var self = this;

            var bounds = new naver.maps.LatLngBounds();
            var info = null;
            var length = self.itemArr.length > 3 ? 3 : self.itemArr.length;

            for(var i=0; i<length; i++){
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
                    pixelOffset: new naver.maps.Point(0, -20),
                })
                naver.maps.Event.addListener(marker, 'click', function(e){
                    var id = $(e.overlay.icon.content).data('id');                    
                    // var items = vcui.array.filter(self.itemArr, function(item, idx){
                    //     return item.id == id;
                    // });
                    // if(items[0].infoWindow.getMap()) items[0].infoWindow.close();
                    // else {
                    //     items[0].infoWindow.open(self.map, e.overlay);
                    //     // infoContentSet(items[0], id);
                    // }

                    // self.selectedMarker(items[0].id);
                    self.selectInfoWindow(id);
                });
            };   
        },
        infoContentSet: function(id){
            var self = this;
            var items = self.itemArr.filter(function(item, index){
                return item.id == id;
            });

            if (items[0].infoWindow.getMap()) {
                var $target = $(items[0].infoWindow.contentElement);
                var $targetFocus = $target.find('a, button, input');

                $target.focus();
                $target.off('keydown').on('keydown', function(e){
                    if( e.shiftKey && e.keyCode == 9 ) {
                        
                        if( $(e.target).hasClass('info-overlaybox')) {
                            $targetFocus.last().focus();
                            e.preventDefault();
                        }
                    }
                });
                $targetFocus.first().off('keydown').on('keydown', function(e){
                    if( e.shiftKey && e.keyCode == 9 ) {
                        $targetFocus.last().focus();
                        e.preventDefault();
                    }
                });
                $targetFocus.last().off('keydown').on('keydown', function(e){
                    if( !e.shiftKey && e.keyCode == 9 ) {
                        $targetFocus.first().focus();
                        e.preventDefault();
                    }
                });
                $target.off('click').on('click', '.btn-overlay-close', function(e){
                    e.preventDefault();
                    if( items[0].infoWindow.getMap() ) {
                        $('[data-id="' + id + '"]').find('.store-info-list').focus();
                        items[0].infoWindow.close();
                        items[0].info.selected = false;
                    }
                });
            }
        },
        selectInfoWindow: function(id) {
            var self = this;
            var items;

            items = self.itemArr.filter(function(item, index){
                return item.id == id;   
            });

            if(items[0].infoWindow.getMap()){
                items[0].infoWindow.close();
            } else {
                items[0].infoWindow.open(self.map, items[0].item)
            };
            
            
            self.selectedMarker(items[0].id);
        },

        selectedMarker: function selectedMarker(id){
            var self = this;

            var centerPoint;
            var marker;

            vcui.array.map(self.itemArr, function(item, index){
                var selected = item.id == id ? true : false;
                item.info.selected = selected;        
                
                if(selected) marker = item;
            });

            centerPoint = {x: marker.info.gpsInfo.gpsx, y: marker.info.gpsInfo.gpsy}
            
            self._setCenter(centerPoint, -(marker.infoWindow.contentSize.height+marker.infoWindow.anchorSize.height+20+36)/2, 0);
            self._changeMarkersState();
        },

        _setCenter: function _setCenter(point, offsetX, offsetY) {
            var self = this;
            
            var scale = Math.pow(2, self.map.getZoom());
            var pixelOffset = new naver.maps.Point((offsetX / scale) || 0, (offsetY / scale) || 0);
            var worldCoordinateNewCenter = new naver.maps.Point(parseFloat(point.x) - pixelOffset.x, parseFloat(point.y) + pixelOffset.y);

            self.map.panTo(new naver.maps.LatLng(worldCoordinateNewCenter.x, worldCoordinateNewCenter.y), {duration:460, easing:"easeOutCubic"});
        },

        resizeInfoWindow: function() {
            var self = this;
            var items; 

            items = self.itemArr.filter(function(item, index){
                if (item.info.selected) {
                    return item;
                }
            });

            if(items[0].infoWindow.getMap()) items[0].infoWindow.close(), items[0].infoWindow.open(self.map, items[0].item);
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

        getAdressPositions: function(address, callback){
            var self = this;

            naver.maps.Service.geocode({
                query: address
              }, function(status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                  if (!address) {
                    callback({
                        success: "N",
                        errMsg: "Geocode Error, Please check address"
                    });
                    return;
                  }
                  callback({
                      success: "N",
                      errMsg: 'Geocode Error, address:' + address
                  });
                  return;
                }
            
                if (response.v2.meta.totalCount === 0) {
                    callback({
                        success: "N",
                        errMsg: 'No result.'
                    });
                  return;
                }
            
                  var item = response.v2.addresses[0];
                  var point = new naver.maps.Point(item.x, item.y);
                  
                  callback({
                      success: "Y",
                      pointx: point.x,
                      pointy: point.y
                  });
              });
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
            // console.log("### applyMapData ###");
            self.deleteMapdata();

            self.itemArr = [];
            self._draw(data);   
            if (self.itemArr.length) {
                self.itemArr[0].info.selected = true;
            }
            self._addInfoWindow();
            
            self._setMapBounds();
            
            self._changeMarkersState(); 
        },

        resize: function resize(width, height){
            var self = this;
            self.map.setSize({width: width, height: height})
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return CenterMap;
});