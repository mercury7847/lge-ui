/*!
 * @module vcui.ui.StoreMap
 * @license MIT License
 * @description Kakao map 
 * @copyright VinylC UID Group
 * 
 * <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5dddbd78e7c3f80dd289ec188acf536c&libraries=services"></script>
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
                    '       <p class="name">{{shopName}}</p>'+
                    '       <p class="adress">서울특별시 강남구 청담동 86-1 LG 청담빌딩 1층</p>'+
                    '       <div class="store-info">'+
                    '           <dl>'+
                    '               <dt>전화</dt>'+
                    '               <dd>02-3448-5191</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>팩스</dt>'+
                    '               <dd>02-3448-5190</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       <div class="hour-info">'+
                    '           <dl>'+
                    '               <dt>평&nbsp;&nbsp;일</dt>'+
                    '               <dd>10:30 ~ 20:30</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>토요일</dt>'+
                    '               <dd>10:30 ~ 20:30</dd>'+
                    '           </dl>'+
                    '           <dl>'+
                    '               <dt>일요일</dt>'+
                    '               <dd>11:00 ~ 20:30</dd>'+
                    '           </dl>'+
                    '       </div>'+
                    '       <div class="btn-group">'+
                    '           <a href="#n" class="btn">매장 상담 신청</a>'+
                    '           <a href="#n" class="btn">상세 정보</a>'+
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
            self.isCustomMarker = self.options.templates.customMarker; // overlay 형태일때

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
            
            // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
            // var zoomControl = new kakao.maps.ZoomControl();
            // self.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            if(vcui.detect.isMobile){
                self._getCurrentLocation();
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
                type : "POST",
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
                    self._bindEvent();

                    self._draw(self.storeData);                                    
                    self.triggerHandler('mapinit', [result[0]]);

                    self._changeMarkersState(true); 
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
                if(self.isCustomMarker){
                    self._addCustomMarker(obj.agGpsX, obj.agGpsY, obj, i);
                }else{
                    self._addMarker(obj.agGpsX, obj.agGpsY, obj, i);
                }
            }
        },   

        _bindEvent: function _bindEvent() {
            var self = this;

            if(!self.map) return;

            naver.maps.Event.addListener(self.map, 'zoom_changed', function() {                  
                if(self.searchMode) return;

                self._changeMarkersState(true);             
            });

            naver.maps.Event.addListener(self.map, 'dragend', function() {
                self._changeMarkersState(true);
            });
            
            // overlay 클릭시 이벤트 등록
            // marker 클릭시 이벤트 등록은 _addMarker 쪽에 있음.
            self.$el.on('click', '.'+self.options.overlayName, function(e){
                e.preventDefault();
                var id = $(e.currentTarget).data('id');
                var arr = vcui.array.filter(self.itemArr, function(item, index){
                    return item.id == id;
                })
                if(arr.length > 0){
                    self._itemClickHandler(arr[0]['info']);
                }
            });                        
        },

        search : function search(arr){
            var self = this;
            var bounds = new kakao.maps.LatLngBounds();   
            var item = null;
            for(var i=0; i<arr.length; i++){
                item = arr[i];
                bounds.extend(new kakao.maps.LatLng(item.agGpsX, item.agGpsY));
            }
            
            self.searchMode = true;  // search 시 zoom change를 막기위해 사용
            if(arr.length > 0) self.map.setBounds(bounds); //bounds, paddingtop, paddingright, paddingbottom, paddingleft

            var nArr = vcui.array.filter(self.itemArr, function(item, idx){
                return vcui.array.include(arr, function(a){
                    return a.id == item.id;
                });
            });
            
            nArr = self._getNumberInArea(nArr);
            self._setItemVisible(false, nArr);
            self._setItemInfo(nArr);
            self.triggerHandler('mapsearch', [nArr]);  
            self.searchMode = false;
        },

        _changeMarkersState: function _changeMarkersState(isTrigger){
            var self = this;

            var arr = self._getNumberInArea();

            self._setItemVisible(true);
            self._setItemInfo(arr);

            if(isTrigger) self.triggerHandler('mapchanged', [arr]);   
        },

        _getNumberInArea : function _getNumberInArea(arr){
            var self = this;

            if(!self.map) return;

            var nArr = [];
            var mp, distance;
            var bounds = self.map.getBounds();
            var center = self.map.getCenter();
            var iArr = arr ? arr : self.itemArr;

            for(var i=0; i<iArr.length; i++){
                mp = iArr[i]['item'].getPosition();
                distance = self._getDistance(center._lat, center._lng, mp._lat, mp._lng);
                iArr[i]['distance'] = distance;

                if(bounds.hasPoint(mp)){
                    nArr.push(iArr[i]);
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
            }
        },     

        _setItemInfo : function _setItemInfo(arr){
            var self = this;
            for(var i=0; i<arr.length; i++){    
                var items = arr[i];
                if(self.isCustomMarker){
                    items.item.setIcon(self._getMarkerIcon(items.info, i))
                }else{
                    self._setMarkerImage(items.item, i);
                }                
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

        _addMarker : function _addMarker(x, y, info, idx) {
            // var self = this;
            // if(!self.map) return;
            
            // var marker = new kakao.maps.Marker({
            //     position: new kakao.maps.LatLng(x, y)
            // });

            // self._setMarkerImage(marker, idx);
            // marker.setMap(self.map);     

            
            // var obj = {item:marker, info:info, id:info['id'], distance:1000}; 
            // self.itemArr.push(obj); 

            // // marker 클릭시 이벤트 등록
            // kakao.maps.event.addListener(marker, 'click', function(){
            //     self._itemClickHandler(obj.info);                
            // });
        },

        _setMarkerImage : function _setMarkerImage(marker, idx){
            var self = this;  
            var imageSrc = idx<5? self.options.baseUrl + '/images/ico_map'+ (idx+1) +'.png' : self.options.baseUrl + '/images/ico_map_default.png';                      
            var markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(20, 26), new kakao.maps.Point(10, 30));
            marker.setImage(markerImage);
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


        _getCoord2Address : function _getCoord2Address(x,y){
            var self = this;
            if(!self.map) return null;
            var geocoder = new kakao.maps.services.Geocoder();
            var coord = new kakao.maps.LatLng(x, y);
            geocoder.coord2Address(coord.getLng(), coord.getLat(), function(result, status){
                if (status === kakao.maps.services.Status.OK) {
                    return result;
                }else{
                    return null;
                }
            });
        },

        resize: function resize(){
            var self = this;
            self._changeMarkersState(true);
        },

        selectedMarker: function selectedMarker(id){
            var self = this;
            
            self.itemArr = vcui.array.map(self.itemArr, function(items){
                var selected = items.id == id ? true : false;
                return {...items, info: {...items.info, selected: selected}};
            });

            self._changeMarkersState(false);
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});