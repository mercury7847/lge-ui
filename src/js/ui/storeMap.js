/*!
 * @module vcui.ui.StoreMap
 * @license MIT License
 * @description Naver map 
 * @copyright VinylC UID Group
 * 
 */
// BTOCSITE-4785 s
var cartPrdList  = getParameter("cartPrdList");
function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// BTOCSITE-4785 e
vcui.define('ui/storeMap', ['jquery', 'vcui', 'helper/naverMapApi'], function ($, core) {
    "use strict";

    /**
     * @class
     * @description .
     * @name vcui.ui.StoreMap
     * @extends vcui.ui.View
     */
    // BTOCSITE-4785 s
    if(cartPrdList){
        // https://wwwdev50.lge.co.kr/support/visit-store-reservation?orgCode=1141&cartPrdList=MD08037890^refrigerators
        self.shopUrl = "/support/visit-store-reservation?cartPrdList="+cartPrdList+"&orgCode=";
    } else {
        self.shopUrl = "/support/visit-store-reservation?orgCode=";
    }
    // BTOCSITE-4785 e
    var StoreMap = core.ui('StoreMap', /** @lends vcui.ui.StoreMap# */{
        bindjQuery: 'storeMap',
        defaults: { 
            mapService: 'naver',
            keyID: '',
            appKey:'',
            longitude : 127.0314202, 
            latitude: 37.5211127, // 최초로딩위치-절대(강남점)            
            x : 127.0314202,
            y : 37.5211127,
            padding: 34,
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
                    '           {{#if consultFlag == "Y"}}'+
                    // '           <a href="https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&inflow=lgekor" class="btn border size storeConsult-btn" target="_blank">매장 상담 신청</a>'+
                    //210411 임시로 새창 뛰우기 바꿈. 개발에서 작업이 완료되면 교체
                                // BTOCSITE-4785
                    '           <a href="{{self.shopUrl}}{{orgCode}}" class="btn border size storeConsult-btn">매장 상담 예약</a>'+
                    '           {{/if}}'+
                    '           <a href="{{detailUrl}}" class="btn border size detail-view">상세 정보</a>'+
                    '       </div>'+
                    '       <button class="info-overlay-close"><span class="blind">닫기</span></button>'+
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
            self.infoWindow = null;
            self.$nextFocusTarget = null;

            self.centerID = 0;
            self.centerMarker;

            self.userLatitude = "";
            self.userLongitude = "";

            new core.helper.NaverMapApi({
                mapService: self.options.mapService,
                keyID: self.options.keyID,
                appKey: self.options.appKey
            }).load(function(){
                self.triggerHandler('maploaded');
            });            
        },

        setUserLocation :function setUserLocation(lat, long){
            var self = this;
            self.userLatitude = lat;
            self.userLongitude = long;

        },

        start : function start(lat, long){
            var self = this;
            if(self.map) return;

            var firstLat = lat ? lat : self.latitude;
            var firstLong = long ? long : self.longitude;

            var options = {
                center: new naver.maps.LatLng(firstLat, firstLong),
                level: 3
            };
            self.map = new naver.maps.Map(self.$el[0], options);

            if(self.userLatitude && self.userLongitude){

                var locationBtnHtml = '<div class="location-btn"><a href="#"><span class="blind">현재 위치</span></a></div>';
                naver.maps.Event.once(self.map, 'init_stylemap', function() {

                    var customControl = new naver.maps.CustomControl(locationBtnHtml, {
                        position: naver.maps.Position.LEFT_BOTTOM
                    });

                    customControl.setMap(self.map);
                    naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function() {
                        self.map.setCenter(new naver.maps.LatLng(self.userLatitude, self.userLongitude));
                    });
                });


                var myPointMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(self.userLatitude, self.userLongitude),
                    map: self.map,
                    icon: {
                         url:'/lg5-common/images/CS/icon-location-my-mo-32.svg'                 
                    },
                    size:new naver.maps.Size(32,32),
                    origin:new naver.maps.Point(0,0),
                    anchor:new naver.maps.Point(32,32)
                });

                myPointMarker.setMap(self.map);

            }            

            self._bindEvent();            
            self.triggerHandler('mapinit');
        },

        selectedMarker:function selectedMarker(id, nextFocusTarget){
            var self = this;
            var marker = vcui.array.filterOne(self.itemArr, function(item, i){
                return item.id === id;
            });

            if(marker && marker.item){
                self.$nextFocusTarget = nextFocusTarget instanceof $ ? nextFocusTarget : $(nextFocusTarget);
                new naver.maps.Event.trigger(marker.item,'click');
            }
        },
        

        _bindEvent: function _bindEvent() {
            var self = this;

            if(!self.map) return;

            naver.maps.Event.addListener(self.map, 'zoom_changed', function() {   
                self._updateMarkers();            
            });

            naver.maps.Event.addListener(self.map, 'dragend', function() {
                self._updateMarkers();  

            });   
            
        },  


        _getMarkerIcon: function _getMarkerIcon(info, idx, isClose){
            var self = this;

            var content = vcui.template(
                self.options.templates.customMarker,
                {
                    id : info.id, 
                    num : idx+1,
                    title: info.shopID,
                    selected: isClose? "" : (info.selected ? " on" : ""),
                    select_txt: isClose? "선택안됨" : (info.selected ? "선택됨" : "선택안됨")
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


        _updateMarkers : function _updateMarkers() {

            if(!self.map) return;

            var mapBounds = self.map.getBounds();
            var marker, position;
        
            for (var i = 0; i < self.itemArr.length; i++) {

                marker = self.itemArr[i]['item'];
                position = marker.getPosition();

                if(mapBounds.hasLatLng(position)){
                    items.push(item);
                    item['item'].setMap(self.map);

                } else{
                    item['item'].setMap(null);
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
        },
       

        _setMapBounds: function(lat, long, isFit){
            var self = this;

            var len = self.itemArr.length;
            var info = null;
            var bounds = new naver.maps.LatLngBounds();

            if(lat && long){
                bounds.extend(new naver.maps.LatLng(lat, long));
                len = isFit && len>3 ? 3 : len;
                info = self.itemArr[len-1].info;
                var gpsy = -(parseFloat(info.gpsInfo.gpsy) - lat) + lat;
                var gpsx = -(parseFloat(info.gpsInfo.gpsx) - long) + long;
                bounds.extend(new naver.maps.LatLng(gpsy, gpsx));
            }

            for(var i=0; i<len; i++){
                info = self.itemArr[i].info;
                bounds.extend(new naver.maps.LatLng(info.gpsInfo.gpsy, info.gpsInfo.gpsx));
            }

            self.map.fitBounds(bounds);  

            if(lat && long){
                self.map.setCenter(new naver.maps.LatLng(lat, long));
                
            }else{
                if(len==1){
                    self.map.setZoom(15);
                }
            }

        },

        _clickMarker:function(e){

            var self = this;
            var id = $(e.overlay.icon.content).data('id');                    
            var obj = vcui.array.filterOne(self.itemArr, function(item, idx){
                return item.id == id;
            });
            var marker = obj.item;

            if(obj.infoWindow.getMap()) {
                
                obj.infoWindow.close();
                obj.info.selected = false;     
                marker.setIcon(self._getMarkerIcon(obj.info, obj.num)); 
                self.triggerHandler('changemarkerstatus', [{id:id, isOff:true}]);                
                self.$el.off('focusin.storemap');


            }else {

                obj.infoWindow.open(self.map, e.overlay);
                obj.info.selected = true;

                $.each(self.itemArr, function(index, nObj){
                    var info = nObj.info;
                    nObj.item.setIcon(self._getMarkerIcon(info, nObj.num, true)); 
                })
                

                marker.setIcon(self._getMarkerIcon(obj.info, obj.num));                         

                self.markerIndex++;
                marker.setZIndex(self.markerIndex);                

                var lat = obj.info.gpsInfo.gpsy;
                var long = obj.info.gpsInfo.gpsx;
                var zoom = self.map.getZoom();
                if(zoom !== 15){
                    self.map.setZoom(15);
                }

                self.map.panTo(new naver.maps.LatLng(parseFloat(lat)+0.0053, long));

                var $focusTarget = $(obj.infoWindow.contentElement);
                var $first = $focusTarget.find(':visible:focusable').first();


                setTimeout(function(){
                    if($first[0]) $first.focus();
                },500);

                

                self.$el.off('focusin.storemap');
                self.$el.on('focusin.storemap', function (e) {

                    if ($focusTarget[0] !== e.target && !$.contains($focusTarget[0], e.target)) {                         
                        if($first[0]) $first.focus();
                        e.stopPropagation();
                    }
                });

                var en = self.makeEventNS('click');

                $focusTarget.off(en).on(en,'.info-overlay-close', function(evt){
                    evt.preventDefault();
                    if(obj.infoWindow.getMap()) {                
                        obj.infoWindow.close();
                        obj.info.selected = false;     
                        marker.setIcon(self._getMarkerIcon(obj.info, obj.num)); 
                        self.triggerHandler('changemarkerstatus', [{id:id, isOff:true}]);
                        self.docOff('focusin');
                        if(self.$nextFocusTarget && self.$nextFocusTarget[0]) self.$nextFocusTarget.focus();
                    }
                });
                

                self.triggerHandler('changemarkerstatus', [{id:id}]);

            }

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
                    // anchorSize: new naver.maps.Size(30, 300),
                })

                naver.maps.Event.addListener(marker, 'click', self._clickMarker.bind(self));
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

            var obj = {item:overlay, num:idx, info:info, id:info['id'], distance:1000}; 
            self.itemArr.push(obj);   
        },

        remove: function(){
            var self = this;
            var leng = self.itemArr.length;
            for(var i=0;i<leng;i++){
                var items = self.itemArr[i];
                var marker = items['item'];
                naver.maps.Event.clearListeners(marker,'click');

                items.info.selected = false;
                marker.setIcon(self._getMarkerIcon(items.info, items.num, true));
                marker.setMap(null);
                items.infoWindow.close();
            }

            self.itemArr = [];
        },

        
        draw : function draw(arr, defaultLat, defaultLong, isInfoWindow, isFit){
            var self = this;
            if(!self.map) return;

            self.remove();
            self.markerIndex = 0;
            self.itemArr = [];

            if(arr.length > 0){

                for(var i=0; i<arr.length; i++){
                    var obj = arr[i];
                    self._addCustomMarker(obj.gpsInfo.gpsy, obj.gpsInfo.gpsx, obj, i);
                }
    
                self._addInfoWindow();
                self._updateMarkers(); 
                self._setMapBounds(parseFloat(defaultLat), parseFloat(defaultLong), isFit);   
    
                if(isInfoWindow && self.itemArr.length > 0){
                    new naver.maps.Event.trigger(self.itemArr[0].item,'click');
                }

            }

            self.triggerHandler('mapchanged', [self.itemArr]); 

            

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

        delete: function(){
            var self = this;

            var leng = self.itemArr.length;
            for(var i=0;i<leng;i++){
                var items = self.itemArr[i];
                items.item.onRemove();
                items.infoWindow.onRemove();
            }
        },

        resize: function resize(width, height){
            var self = this;
            self.map.setSize({width: width, height: height})
        },

        addMaker: function(lat, long){
            var self = this;

            self.start();

            // new naver.maps.Marker({
            //     position: new naver.maps.LatLng(lat, long),
            //     map: self.map,
            //     icon: {
            //          url:'/lg5-common/images/CS/icon-location-my-mo-32.svg'                 
            //     },
            //     size:new naver.maps.Size(32,32),
            //     origin:new naver.maps.Point(0,0),
            //     anchor:new naver.maps.Point(32,32)
            // });

            
            new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, long),
                map: self.map
            })
        }

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return StoreMap;
});