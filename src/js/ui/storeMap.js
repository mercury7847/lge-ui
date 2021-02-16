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
            viewZoom: 12,
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
                    '               <dd>{{bizHours.sunday}}</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       <div class="btn-group">'+
                                '{{#if consultFlag == "Y"}}'+
                    '           <a href="https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&inflow=bestshop&orgcode={{shopID}}" class="btn border size storeConsult-btn">매장 상담 신청</a>'+
                                '{{/if}}'+
                    '           <a href="{{detailUrl}}" class="btn border size detail-view">상세 정보</a>'+
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

            self.searchType = "local";

            self.itemArr = [];

            self.centerID = 0;
            self.centerMarker;

            self.userLatitude = "";
            self.userLongitude = "";

            new core.helper.NaverMapApi({
                mapService: self.options.mapService,
                keyID: self.options.keyID,
                appKey: self.options.appKey
            }).load(function(){
                if(window.breakpoint.isMobile){
                
                    lgkorUI.confirm("고객님께서 제공하시는 위치 정보는 현재 계신 위치에서 직선 거리 기준으로 가까운 매장 안내를 위해서만 이용 됩니다.<br><br>또한 상기 서비스 제공  후 즉시 폐기되며, 별도 저장되지 않습니다.<br><br>고객님의 현재 계신 위치 정보 제공에 동의하시겠습니까?", {
                        typeClass: "type2",
                        title: "위치 정보 제공 동의",
                        cancelBtnName: "아니요",
                        okBtnName: "네",
                        cancel: function(){
                            self._setting();
                        },
                        ok:function(){
                            self._getCurrentLocation();
                        }
                    });
                } else self._setting();
            });            
        },

        _setting : function _setting(lat, long){
            var self = this;

            var firstLat = lat ? lat : self.latitude;
            var firstLong = long ? long : self.longitude;

            var options = {
                center: new naver.maps.LatLng(firstLat, firstLong),
                level: 3
            };
            self.map = new naver.maps.Map(self.$el[0], options);

            self._bindEvent();
            
            self.triggerHandler('mapinit', {lat: self.userLatitude, long: self.userLongitude});
        },
        
        _getCurrentLocation : function _getCurrentLocation() {
            var self = this;       
            if (navigator.geolocation) {
                console.log("### _getCurrentLocation ###");
                navigator.geolocation.getCurrentPosition(
                    function(e){
                        self._onSuccessGeolocation(e);
                    }, 
                    function(e){
                        self._onErrorGeolocation();
                    }
                );
            } else {
                self._onErrorGeolocation();
            }        
        },

        _onSuccessGeolocation : function _onSuccessGeolocation(position) {
            var self = this;

            self.userLatitude = position.coords.latitude;
            self.userLongitude = position.coords.longitude;

            self._setting(self.userLatitude, self.userLongitude);
        },
        
        _onErrorGeolocation : function _onErrorGeolocation() {
            var self = this;

            lgkorUI.alert("", {
                title: "현재 위치를 찾을 수 없습니다.",
                ok: function(){
                    self._setting();
                }
            });
        },     

        _bindEvent: function _bindEvent() {
            var self = this;

            if(!self.map) return;

            // naver.maps.Event.addListener(self.map, 'zoom_changed', function() {                  
            //     if(self.searchMode) return;

            //     self._changeMarkersState();             
            // });

            // naver.maps.Event.addListener(self.map, 'dragend', function() {
            //     self._changeMarkersState();
            // });               
        },  

        _setItemInfo : function _setItemInfo(arr){
            var self = this;
            for(var i=0; i<arr.length; i++){    
                var items = arr[i];
                items.num = i;
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
            var center = self.searchType == "search" ? {_lat: self.latitude, _lng: self.longitude} : self.map.getCenter();
            console.log("### center ###", center)

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

            //var showItems = self._setItemVisible();
            
            //var arr = self._getNumberInArea(showItems);
            var arr = self._getNumberInArea(self.itemArr);

            self._setItemInfo(arr);
            self.triggerHandler('mapchanged', [arr]);   
        },

        _setMapBounds: function(){
            var self = this;

            var bounds = new naver.maps.LatLngBounds();
            var info = null;
            for(var i=0; i<self.itemArr.length; i++){
                info = self.itemArr[i].info;
                bounds.extend(new naver.maps.LatLng(info.gpsInfo.gpsy, info.gpsInfo.gpsx));
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
                self._addCustomMarker(obj.gpsInfo.gpsy, obj.gpsInfo.gpsx, obj, i);
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

        applyMapData: function(data, searchtype){
            var self = this;
            console.log("### applyMapData ###");
            self.deleteMapdata();

            self.searchType = searchtype;

            self.markerIndex = 0;

            self.itemArr = [];
            self._draw(data);   
            
            self._addInfoWindow();
  
            self._setMapBounds();

            self._changeMarkersState(); 
        },

        resize: function resize(width, height){
            var self = this;

            self.map.setSize({width: width, height: height})

            //self._changeMarkersState();
        },

        selectedMarker: function selectedMarker(id){
            var self = this;

            var centerPoint;
            self.itemArr = vcui.array.map(self.itemArr, function(item, index){
                var selected = item.id == id ? true : false;
                var isChange = item.info.selected == selected;
                item.info.selected = selected;        
                
                if(!selected){
                    if(item.infoWindow && item.infoWindow.getMap()){
                        item.infoWindow.close();
                    }
                } else{
                    if(item.infoWindow){
                        if(!item.infoWindow.getMap()) item.infoWindow.open(self.map, item.item);
                    }    
                    centerPoint = {items: item, lat: item.info.gpsInfo.gpsy, long: item.info.gpsInfo.gpsx}
                }

                if(!isChange) item.item.setIcon(self._getMarkerIcon(item.info, item.num));
                
                return item;
            });

            //self._changeMarkersState();

            var marker = centerPoint.items.item;
            self.markerIndex++;
            marker.setZIndex(self.markerIndex);

            var zoom = self.map.getZoom();
            if(zoom < 12) self.map.setZoom(12);
            
            self.map.panTo(new naver.maps.LatLng(centerPoint.lat, centerPoint.long), {duration:350, easing:"easeOutCubic"});

            self.triggerHandler('changemarkerstatus', [id]);   
        },

        addMaker: function(lat, long){
            var self = this;
            
            var maker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, long),
                map: self.map
            })
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});