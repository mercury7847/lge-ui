
vcui.define('helper/naverMapApi', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    /**
     * @class
     * @description .
     * @name vcui.helper.NaverMapApi
     * 
     */

    var NaverMapApi = core.helper.NaverMapApi = core.BaseClass.extend( /**@lends vcui.helper.NaverMapApi# */ {
        /**
         * 생성자
         * @param {Object} options
         */
        initialize: function(options) {
            var self = this;      

            self.options = core.extend({}, {
                mapService: '',
                keyID: '',
                appKey:''
            }, options);

        },
        _importApiJs: function _importApiJs(){
            var self = this;

            var defer = $.Deferred();
            var script = document.createElement('script');

            script.onload = function () {
                defer.resolve();
            };
            script.onerror = function(e){ 
                defer.reject('map api를 로드할수 없습니다.');          
            }
            script.src = '//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' + self.options.keyID;        
            document.head.appendChild(script);  

            return defer.promise();
        },


        load : function load(callback){
            var self = this;
            if(window.naver && window.naver.maps){
                if(callback) callback();
            }else{
                self._importApiJs().done(function(){
                    if(callback) callback();
                }).fail(function(e){
                    alert(e);
                }) 
            } 
        },

        //좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청한다. 도로명 주소는 좌표에 따라서 표출되지 않을 수 있다. x:위도 , y: 경도
        coord2Address : function coord2Address(x,y){
            var self = this;
            var defer = $.Deferred();
            self.load(function(){
                var geocoder = new kakao.maps.services.Geocoder();
                var coord = new kakao.maps.LatLng(y, x); //new kakao.maps.LatLng(37.5235644, 127.0395764);
                geocoder.coord2Address(coord.getLng(), coord.getLat(), function(result, status){
                    if(status === kakao.maps.services.Status.ERROR){
                        defer.reject('server error');  
                    }else{
                        defer.resolve(result);
                    }
                });	
            });
            return defer.promise();
        },

        //주소 정보에 해당하는 좌표값을 요청한다.
        addressSearch : function addressSearch(address){
            var self = this;
            var defer = $.Deferred();
            self.load(function(){
                var geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(address, function(result, status) {
                    if(status === kakao.maps.services.Status.ERROR){
                        defer.reject('server error');  
                    }else{
                        defer.resolve(result);
                    }
                });
                
            });
            return defer.promise();
        },

        //좌표 값에 해당하는 행정동, 법정동 정보를 얻는다.
        coord2RegionCode : function coord2RegionCode(x,y){
            var self = this;
            var defer = $.Deferred();
            self.load(function(){            
                var geocoder = new kakao.maps.services.Geocoder();
                geocoder.coord2RegionCode(x,y, function(result, status) {
                    if(status === kakao.maps.services.Status.ERROR){
                        defer.reject('server error');  
                    }else{
                        defer.resolve(result);
                    }
                });

            });
            return defer.promise();
        },

        //입력한 키워드로 검색한다.
        keywordSearch : function keywordSearch(keyword){
            var self = this;
            var defer = $.Deferred();
            self.load(function(){     
                var places = new kakao.maps.services.Places();
                places.keywordSearch(keyword, function(result, status) {
                    if(status === kakao.maps.services.Status.ERROR){
                        defer.reject('server error');  
                    }else{
                        defer.resolve(result);
                    }
                });

            });
            return defer.promise();
        },

        // 두 좌표의 거리를 구한다.
        getDistance : function getDistance(lat1,lng1,lat2,lng2) {                    
            var R = 6371;
            var dLat = (lat2-lat1) * (Math.PI/180);
            var dLon = (lng2-lng1) * (Math.PI/180);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            console.log(d)
            return d;
        },

    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return NaverMapApi;

});