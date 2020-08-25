/*!
 * @module vcui.ui.StoreMap
 * @license MIT License
 * @description Kakao map 
 * @copyright VinylC UID Group
 * 
 * <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5dddbd78e7c3f80dd289ec188acf536c&libraries=services"></script>
 */
define('ui/storeMap', ['jquery', 'vcui'], function ($, core) {
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
            mapUrl:'//dapi.kakao.com/v2/maps/sdk.js?appkey=',
            appKey:'5dddbd78e7c3f80dd289ec188acf536c',
            baseUrl : '',
            storeDataUrl : '/data/bestShop.json',
            latitude: 37.5235644, // 최초로딩위치-절대(강남점)
            longitude : 127.0395764,
            overlayName : 'ui_overlay_item',
            templates: {
                customOverlay : null
                    // '<div class="customoverlay">' +
                    // '  <a href="#" class={{classname}} data-id={{id}}>' +
                    // '    <span class="title">{{title}}</span>' +
                    // '  </a>' +
                    // '</div>'
            }
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            self.latitude = self.options.latitude;
            self.longitude = self.options.longitude;
            self.storeData = [];
            self.eventData = [];
            self.itemArr = [];
            self.isOverlay = self.options.templates.customOverlay; // overlay 형태일때
            self._build();            
            
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


        _build: function _build() {
            var self = this;
            var script = document.createElement('script');
            script.onload = function () {
                kakao.maps.load(function(){

                    var options = {
                        center: new kakao.maps.LatLng(self.latitude, self.longitude),
                        level: 5
                   };
                    self.map = new kakao.maps.Map(self.$el[0], options);                    
                    
                    // 지도 오른쪽에 줌 컨트롤이 표시되도록 지도에 컨트롤을 추가한다.
                    // var zoomControl = new kakao.maps.ZoomControl();
                    // self.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

                    self._getCurrentLocation();
                    self._requestStoreData();                    
                });
            };
            script.onerror = function(e){
                self.triggerHandler('maperror',[{message:'api를 로드할수 없습니다.'}]);
            }
            script.src = self.options.mapUrl + self.options.appKey + '&libraries=services&autoload=false';
            document.head.appendChild(script);            
        },


        _bindEvent: function _bindEvent() {
            var self = this;
            if(!self.map) return;

            kakao.maps.event.addListener(self.map, 'zoom_changed', function() {                  
                if(self.searchMode) return;
                var arr = self._getNumberInArea();
                self._setItemVisible(true);
                self._setItemInfo(arr);
                self.triggerHandler('mapchanged', [arr]);                
            });

            kakao.maps.event.addListener(self.map, 'dragend', function() {
                var arr = self._getNumberInArea();
                self._setItemVisible(true);
                self._setItemInfo(arr);
                self.triggerHandler('mapchanged', [arr]);
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
            self._getCoord2Address(self.latitude, self.longitude);
        },

        _getNumberInArea : function _getNumberInArea(arr){
            var self = this;
            if(!self.map) return;
            var nArr = [];
            var mp;
            var bounds = self.map.getBounds();
            var center = self.map.getCenter();
            var iArr = arr? arr : self.itemArr;

            for(var i=0; i<iArr.length; i++){
                mp = iArr[i]['item'].getPosition();
                var distance = self._getDistance(center.getLat(), center.getLng(), mp.getLat(), mp.getLng());
                iArr[i]['distance'] = distance;
                if(bounds.contain(mp)) nArr.push(iArr[i]);
            }
            // 지도 중심에서 가까운 곳순으로 정렬 
            nArr.sort(function(a, b) { 
                return a.distance - b.distance;
            });

            return nArr;
        },
             

        _draw : function _draw(arr){
            var self = this;
            if(!self.map) return;
                
            for(var i=0; i<arr.length; i++){
                var obj = arr[i];
                if(self.isOverlay){
                    self._addOverlay(obj.agGpsX, obj.agGpsY, obj, i);
                }else{
                    self._addMarker(obj.agGpsX, obj.agGpsY, obj, i);
                }
            }
        },

        _setItemInfo : function _setItemInfo(arr){
            var self = this;
            for(var i=0; i<arr.length; i++){    
                var obj = arr[i];
                if(self.isOverlay){
                    self._setOverlayInfo(obj['item'], obj['info'], i);
                }else{
                    self._setMarkerImage(obj['item'], i);
                }
                
            }
        },   

        _addOverlay : function _addOverlay(x,y,info,idx) {
            var self = this;
            if(!self.map) return;			
            var overlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(x, y)
            });

            var obj = {item:overlay, info:info, id:info['id'], distance:1000}; 
            self._setOverlayInfo(overlay, info, idx);
            overlay.setMap(self.map);            
            self.itemArr.push(obj); 
            
        },

        _addMarker : function _addMarker(x, y, info, idx) {
            var self = this;
            if(!self.map) return;
            
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(x, y)
            });

            self._setMarkerImage(marker, idx);
            marker.setMap(self.map);     

            
            var obj = {item:marker, info:info, id:info['id'], distance:1000}; 
            self.itemArr.push(obj); 

            // marker 클릭시 이벤트 등록
            kakao.maps.event.addListener(marker, 'click', function(){
                self._itemClickHandler(obj.info);                
            });
        },

        _setMarkerImage : function _setMarkerImage(marker, idx){
            var self = this;  
            var imageSrc = idx<5? self.options.baseUrl + '/images/ico_map'+ (idx+1) +'.png' : self.options.baseUrl + '/images/ico_map_default.png';                      
            var markerImage = new kakao.maps.MarkerImage(imageSrc, new kakao.maps.Size(20, 26), new kakao.maps.Point(10, 30));
            marker.setImage(markerImage);
        },

        _setOverlayInfo : function _setOverlayInfo(overlay, info, idx){
            var self = this;              
            var content = vcui.template(
                self.options.templates.customOverlay,
                {
                    classname : self.options.overlayName, 
                    id : info.id, 
                    title : idx<5? "("+(idx+1)+") "+ info.agName : info.agName
                }
            );	
            overlay.setContent(content);
        },



        _requestStoreData : function _requestStoreData(){
            var self = this;
            //전국 베스트샵 매장 가져오기
            var url = self.options.baseUrl + self.options.storeDataUrl;  //"/data/bestShop.json";

            console.log(url);

            $.ajax({
                type : "POST",
                url : url,
                dataType : "json",
            }).done(function(result) {

                if(result.length > 0){
                    
                    self.eventData = result[0].eventData;
                    self.storeData = vcui.array.map(result[0].storeData, function(item, index){
                        item['id'] = item['agNum']; //info.agNum, agCode 둘중에 뭘로 해야지??
                        return item;
                    });

                    self._draw(self.storeData);                
                    self._bindEvent();
                    self.triggerHandler('mapinit', [result[0]]);

                    var arr = self._getNumberInArea();                
                    self.triggerHandler('mapchanged', [arr]);
                }else{
                    self.triggerHandler('maperror', [{message:'매장정보가 없습니다.'}]);
                }

            }).fail(function(error) {
                // console.error(error);
                self.triggerHandler('maperror', [{message:'매장정보가 없습니다.'}]);
            });
        },
        
        _getCurrentLocation : function _getCurrentLocation() {
            var self = this;       
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(){
                        self._onSuccessGeolocation();
                    }, 
                    function(){
                        self._onErrorGeolocation();
                    }
                );
            } else {
                self._onErrorGeolocation();
            }        
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

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});