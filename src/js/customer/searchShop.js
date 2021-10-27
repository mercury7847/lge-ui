(function(){
    /*
    <!-- IFRAME 시작 -->
    <iframe src="https://www.lge.co.kr/lgekor/bestshop/product/applyCounsel.do?device=w&inflow=mycollection&orgcode=0113"></iframe>
    <!-- IFRAME 종료  -->
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
        function isRegExp(a){
            return a.constructor===RegExp;
        }
        function isString(a){
            return typeof a.valueOf()==="string";
        }
        function escape(string) {
            return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
                // Escape all characters not included in SingleStringCharacters and
                // DoubleStringCharacters on
                // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
                switch (character) {
                case '"':
                case "'":
                case '\\':
                    return '\\' + character
                // Four possible LineTerminator characters need to be escaped:
                case '\n':
                    return '\\n'
                case '\r':
                    return '\\r'
                case '\u2028':
                    return '\\u2028'
                case '\u2029':
                    return '\\u2029'
                }
            })
        }
    
        function xsearch(str, a){
    
            var res=[];
            if(isRegExp(a)){
                str.replace(a,function(a,i){res.push(i);return a});
            }else{
                if(isString(a)){
                    res = xsearch(str,new RegExp(escape(a),"g"));
                }else{
                    res = xsearch(str, new RegExp(a.map(function(a){return (a.source===undefined?escape(a):a.source)}).join("|"),"g"));
                }
            }
            return res;
    
        }
    
        var searchResultText = {
            search: '<strong>"{{keyword}}"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
            local: '<strong>"{{keyword}}"</strong>와 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
            subway: '<strong>"{{keyword}}역"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
            myLocation: '내 주소와 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.'
        };
    
        var localOptTemplate = '<option value="{{value}}" data-code-desc="{{codeDesc}}">{{title}}</option>';
        // BTOCSITE-4785 : 매장 상담 예약 버튼 추가, 매장링크에 .shop-map-link class 추가
        var searchListTemplate = 
            '<li data-id="{{shopID}}">'+
                '<div class="store-info-list ui_marker_selector">'+
                    '<div class="point-wrap">'+
                        '<div class="point {{selected}}">'+
                            '<span class="num">{{num}}</span>'+
                            '<span class="blind">선택안됨</span>'+
                        '</div>'+
                    '</div>'+
                    '<div class="info-wrap">'+
                        '<a href="#" class="shop-map-link">'+
                            '<div class="tit-wrap">'+
                                '<p class="name">'+
                                    '<span class="blind">매장명</span>'+
                                    '{{shopName}}'+
                                '</p>'+
                                '{{#if flagInfo.length > 0}}'+
                                '<div class="flag-wrap bar-type">'+
                                    '{{#each flag in flagInfo}}'+
                                    '<span class="flag {{flag.flagClass}}">{{flag.flagName}}</span>'+
                                    '{{/each}}'+
                                '</div>'+
                                '{{/if}}'+
                            '</div>'+
                            '<p class="addr">'+
                                '<span class="blind">주소</span>'+
                                '{{shopAdress}}'+
                            '</p>'+
                        '</a>'+
                        '<div class="etc-info">'+
                            '<span class="tel">'+
                                '<span class="blind">전화번호</span>'+
                                '{{shopTelphone}}'+
                            '</span>'+
                            '<div class="btn-link-box">'+
                                '<a href="#" data-url="{{detailUrl}}" class="btn-link btn-detail">상세보기</a>'+
                                '<a href="{{orgCode}}" class="btn-link pink">매장 상담 예약</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</li>';
    
        var searchTypeNames = ["local", "subway", "search"];    
    
        var searchShop = {
            init: function(){
                var self = this;            
                self._setting();            
            },
    
            _setting: function(){
                var self = this;
    
                self.windowWidth;
                self.windowHeight;
    
                self.isTransion = false;

                // BTOCSITE-4785 s
                if(cartPrdList){
                    // // https://wwwdev50.lge.co.kr/support/visit-store-reservation?orgCode=1141&cartPrdList=MD08037890^refrigerators
                    self.shopUrl = "/support/visit-store-reservation?cartPrdList="+cartPrdList+"&orgCode=";
                    self.cartPrd = "?cartPrdList="+cartPrdList;
                } else {
                    self.shopUrl = "/support/visit-store-reservation?orgCode=";
                    self.cartPrd = "";
                }
                // BTOCSITE-4785 e
    
                self.$mapContainer = $('.map-container');
                self.bestShopUrl = $('.map-container').data("bestShop");
                self.localUrl = $('.map-container').data("localList");
                self.subwayUrl = $('.map-container').data("subwayList");
                self.stationUrl = $('.map-container').data("stationList");
                self.detailUrl = $('.map-container').data("detail");
                self.userAddress = $('.map-container').data("userAddress"); //'서울특별시 강동구 고덕로 130'
                self.currentLatitude = $('.map-container').data("latitude") || "37.5235644"; // 강남본점 위도
                self.currentLongitude = $('.map-container').data("longitude") || "127.0395764"; // 강남본점 경도
                self.loginUrl = $('.map-container').data("loginUrl");
                self.shopID = $('.map-container').data("shopId");
                self.salesCode = $('.map-container').data("salesCode");
    
    
                self.$leftContainer = $('.store-list-wrap'); //좌측 검색&리스트 컨테이너...
                self.$defaultListContainer = self.$leftContainer.find('.list-wrap'); //리스트 컨테이너...
                self.$defaultListLayer = self.$defaultListContainer.find('.sch-list .scroll-wrap .list-item'); 
                self.$searchContainer = self.$leftContainer.find('.sch-box');
                
                self.$mapArea = $('.map-area'); //맴 모듈 컨테이너...            
                self.$optionContainer = $('.opt-cont'); //옵션 컨테이너...
    
                self.$optionContainer.find('input[type=checkbox]').prop('checked', false); // 옵션을 다 품.
    
                self.$citySelect = $('#select1'); //시/도 선택
                self.$boroughSelect = $('#select2'); //구.군 선택
                self.$localSearchButton = $('.search-local'); //지역검색 버튼
                self.$searchUserAdressButton = $('.search-userAdress'); //내 주소 검색 버튼
    
                self.$subwayCitySelect = $('#select3'); //지역선택
                self.$subwayLineSelect = $('#select4'); //호선 선택
                self.$subwayStationSelect = $('#select5'); //역 선택
                self.$searchSubwayButton = $('.search-subway'); //지하철 검색 버튼
    
    
                self.$searchField = $('#tab3 .input-sch input');
                self.$searchButton = $('#tab3 .btn-search');
                self.$searchResultContainer = $('.result-list-box');
    
    
                self.$localSearchButton.prop('disabled', false);
                self.$boroughSelect.prop('disabled', false);            
                $('.result-btn-wrap .view-info-btn').hide(); // 
                
                
    
                self.$map = null; //맵 모듈...
                self.userLatitude = null;
                self.userLongitude = null; 
                self.applyOptions = null;          
                
                
                //검색...
                self.searchKeyword = "";
                self.searchType = "local";
    
                self.isUserAddressClick = false;
                
                self.defaultOptions = self._getOptions();
                self.applyOptions = self._getOptions();  
    
                self.defaultInfoViewId = vcui.uri.getParam('shopId');   
                self.totalStoreData = [];         
                
                vcui.require(['ui/storeMap', 'ui/tab', 'ui/selectbox', 'support/common/quickMenu.min'], function (StoreMap) {  
    
                    self.$map = new StoreMap(self.$mapArea,{
    
                        keyID: $('.map-container').data("mapId"),
                        appKey: $('.map-container').data("appKey"),
                        longitude : self.currentLongitude,
                        latitude: self.currentLatitude
    
                    }).on('maploaded', function(e){                    
                        
                        self._requestTotalStoreData();
                    
    
                    }).on('mapinit', function(e, data){
                        
                        self._resize();                     
                        self._bindEvents();
                        
                        var nArr = [];
                        if(self.defaultInfoViewId!==""){
                            
                            // url.param 에 shopId 가 있을때 infoWindow를 연 상태로 지도 표현
                            nArr = vcui.array.filter(self.totalStoreData , function(item, index){
                                return item.shopID === self.defaultInfoViewId;
                            });
                            
                            $(".sch-box .tabs-wrap").vcTab('select', 2); // 검색 탭으로 이동시킴.
    
                            if(nArr.length > 0) {
                                var shopName = nArr[0]['shopName'];
                                self.$searchField.val(shopName); 
                                self.$map.draw(nArr,null,null,true);
                            }  
                        }else if(self.salesCode!==""){   
                            // 세일코드가 있는 경우 
                            self._requestSaleStoreData();
    
                        }else{
                            if(self.userLatitude && self.userLongitude) {
                                // BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15
                                // 사용자 위치가 있을때 사용자 위치 기준 반경 25Km 검색 //에서 100km 수정 2021-09-13
                                nArr = self._filterDistance(self.totalStoreData , {lat: self.userLatitude, long:self.userLongitude, limit:100}).slice(0,7);
                                self.$map.draw(nArr, self.userLatitude, self.userLongitude, null, true);
                            }else{
                                // BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15
                                // 아무설정이 없을때 강남본점 기준을 반경 25Km 검색 //에서 100km 수정 2021-09-13
                                nArr = self._filterDistance(self.totalStoreData , {lat: self.currentLatitude, long:self.currentLongitude, limit:100}).slice(0,7);
                                self.$map.draw(nArr, self.currentLatitude, self.currentLongitude, null, true);
                            }
                        }
    
                    }).on('mapchanged', function(e, data){	
                        self._setItemList(data);
                        self._setItemPosition();     
    
                    }).on('changemarkerstatus', function(e, obj){
                        self._setMarkerSelected(obj);
    
                    }).on('maperror', function(e, error){
                        // console.log(error);
                    });
    
                    $('#quickMenu').vcQuickMenu();
                    $(".sch-box .tabs-wrap").vcTab().on("tabchange", function(e, data){
                        self._setListArea();
                        self._setTabInit();                    
                        self.searchType = searchTypeNames[data.selectedIndex];
                    });
                    
                    self.$boroughSelect.vcSelectbox('update');
                    
                });
            },
    
            _dataLoaded : function(){
                var self = this;
                setAppLocation = function(currentLocation){
                    if (currentLocation == '') currentLocation = '37.5235644,127.0395764';//
    
                    var arrLocation = currentLocation.split(',');
    
                    self.userLatitude = arrLocation[0];
                    self.userLongitude = arrLocation[1];
    
                    if(self.$map) {
                        self.$map.setUserLocation(self.userLatitude, self.userLongitude);
                        self.$map.start(self.userLatitude, self.userLongitude)
                    }
                    
                };
                var getAppCurrentLocation = function() {
                    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                        var obj = new Object();
                        obj.command = "getGPS";
                        obj.callback ="setAppLocation";
                        var jsonString= JSON.stringify(obj);
                        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    }
                    else
                    {
    
                        setTimeout(function(){
                            if(self.$map) self.$map.start();
                        },300);
                        try 
                        {
                            var appGeoAgree = android.getLocationActive();
                            if (appGeoAgree=='Y'){
                                android.getLocation('setAppLocation');
                            }
                            else
                            {
                                setAppLocation('37.5235644,127.0395764');		    	        			
                            }
                        } 
                        catch (e) 
                        {
                            
                            setAppLocation('37.5235644,127.0395764');
                        }
                    }	
                };
                
                if (!isApp()){ //앱에서 접근하는 경우 위치정보 조회 UI 생략
                    
                    var bestShopMapAgree = window.sessionStorage.getItem("bestShopMapAgree");
                    if(bestShopMapAgree && bestShopMapAgree=="Y"){
                        self._getCurrentLocation();
                    }else{
                        var msg = 'LG전자 주식회사(이하 "회사"라 합니다)는 고객님께서 현재 계신 위치에서 직선 거리 기준으로 가장 가까운 매장을 안내하기 위하여 위치정보를 수집하고 있습니다.<br>';
                        msg += '또한 상기 서비스 제공 후 즉시 폐기되며, 별도 저장되지 않습니다.<br>';
                        msg += '위치정보 수집이용 관련하여 보다 상세한 내용은 ';
                        msg += '‘<a href="https://qt-kr.m.lgaccount.com/customer/terms_detail?terms_type=A_ITG_LBS&amp;terms_svcCode=SVC709&amp;country=KR&amp;terms_publish=N&amp;division=noticeterms" target="_blank" title="새창열림">LG전자 위치기반서비스 이용약관</a>’';
                        msg += '을 참고해주시기 바랍니다.<br><br>고객님의 현재 계신 위치 정보 제공에 동의하시겠습니까?';
                        lgkorUI.confirm(msg, {
                            typeClass: "type2",
                            title: "위치 정보 제공 동의",
                            cancelBtnName: "아니요",
                            okBtnName: "네",
                            cancel: function(){                    
                                setTimeout(function(){
                                    if(self.$map) self.$map.start();
                                },300);
                            },
                            ok:function(){
                                setTimeout(function(){
                                    window.sessionStorage.setItem("bestShopMapAgree", "Y");
                                    self._getCurrentLocation();
                                },300);
                            }
                        }, self.$leftContainer.find(':not(.btn-fold):visible:focusable').first()[0]);
                    }
                        
                }
                else
                {
                    getAppCurrentLocation();
                }
                
            },
    
            _filterDistance:function(arr, options){
    
                var self = this;
                var limit = parseFloat(options.limit);
                var lat = parseFloat(options.lat);
                var long = parseFloat(options.long);
    
                var newArr = [];
    
                for(var i=0; i<arr.length; i++){
                    var item = arr[i];
                    var gpsInfo = item.gpsInfo;
                    var distance = self._getDistance(lat, long, parseFloat(gpsInfo.gpsy), parseFloat(gpsInfo.gpsx));
                    if(distance <= limit){
                        item['distance'] = distance;
                        newArr.push(item);
                    }
                }
    
                // 지도 중심에서 가까운 곳순으로 정렬 
                newArr.sort(function(a, b) { 
                    return a.distance - b.distance;
                });
    
                return newArr;
    
            },
    
            _bindEvents: function(){
                var self = this;
    
                window.infoWindowDetail = function(url){
                    var width = self.windowWidth < 1070 ? self.windowWidth : 1070;
    
                    if(isApp() && vcui.detect.isIOS){ 
                           var jsonString = JSON.stringify({'url':'https://'+window.LGEAPPHostName+url,'command':'openInAppBrowser'});
                           webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    } else {
                        void(window.open(url, "_blank", "width=" + width + ", height=" + self.windowHeight + ", scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));   
                    }
    
                    
                }
    
                self.$optionContainer.on('click', '.btn-sel', function(e){
                    e.preventDefault();
                    self._toggleOptContainer();
                });

                // BTOCSITE-4785 s
                $('.btn-dppdp-fold').on('click', function(e){
                    e.preventDefault();
                    $(this).parent().parent().parent().toggleClass('close');
                    if($(this).parent().parent().parent().hasClass('close')){
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '91px',
                        });
                    } else {
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '207px',
                        });
                    }
                    setTimeout(function(){
                        self._setListArea();
                    },400);
                });
                // BTOCSITE-4785 e
                // BTOCSITE-4785 : a link  .shop-map-link 로 변경
                self.$defaultListLayer.on('click', 'li > .ui_marker_selector .shop-map-link', function(e){
                    var id = $(this).closest('li').data('id');
                    self.$map.selectedMarker(id, this);
    
                    $('body,html').scrollTop(0);
                })
                .on('click', 'li > .ui_marker_selector .btn-detail', function(e){
                    e.preventDefault();
                    var url = $(e.currentTarget).data("url");
                    infoWindowDetail(url);
    
                });
    
                self.$searchField.on('focus', function(e){
                    $(window).on('keyup.searchShop', function(e){
                        if(e.keyCode == 13) {
                            e.preventDefault();
                            self._setSearch();
                        }
                    });
                });
    
                self.$searchButton.on('click', function(e){
                    e.preventDefault();
                    self._setSearch();
                });
    
    
                self.$searchResultContainer.on('click', '.btn-back', function(e){
                    e.preventDefault();
                    self._returnSearchMode();
                });
    
    
                // 리스트 보기/지도보기
                self.$searchContainer.on('click', '.btn-view', function(e){
                    e.preventDefault();
                    self._showMap();
                });
    
                self.$leftContainer.on('click', '.btn-fold', function(e){
                    e.preventDefault();
                    self._toggleLeftContainer();
                })
    
                self.$optionContainer.find('.all-chk dd input[type=checkbox]').on('change', function(e){
                    self._optAllChecked();
                });
                self.$optionContainer.find('.all-chk dt input[type=checkbox]').on('change', function(e){
                    self._optToggleAllChecked();
                });
                self.$optionContainer.on('click', '.btn-group button:first-child', function(e){
                    
                    e.preventDefault();
                    self._setOptINIT();
    
    
                }).on('click', '.btn-group button:last-child', function(e){
    
                    // 필터 적용
                    e.preventDefault();
                    self._setOptApply();
                });
    
                self.$citySelect.on('change', function(e){
                    self._loadLocalAreaList(e.target.value);
                });
                self.$localSearchButton.on('click', function(e){
                    self._setSearch();
                });
                self.$searchUserAdressButton.on('click', function(e){
                    self._setUserAdressSearch();
                });
    
                self.$subwayCitySelect.on('change', function(e){
                    lgkorUI.requestAjaxDataFailCheck(self.subwayUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                        self._setSubwayOption(result.data, self.$subwayLineSelect, {title:"호선 선택", value:""}, "code");
                    });
                });
                self.$subwayLineSelect.on('change', function(e){
                    lgkorUI.requestAjaxDataFailCheck(self.stationUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                        self._setSubwayOption(result.data, self.$subwayStationSelect, {title:"역 선택", value:""}, "codeName");
                    });
                });
                self.$searchSubwayButton.on('click', function(e){
                    self._setSearch();
                });
    
                $(window).on('resizeend', function(e){   
                    self._resize();
                });
                self._resize();
                //$(window).trigger('addResizeCallback', self._resize.bind(self));
            },
    
            _setTabInit: function(){
                var self = this;
                
                self.$searchField.val('');
    
                self.$citySelect.val();
                self.$boroughSelect.val();
                self.$subwayCitySelect.val();
                self.$subwayLineSelect.val();
                self.$subwayStationSelect.val();
            },
    
            _getCurrentLocation : function _getCurrentLocation() {
                var self = this;       
                if (navigator.geolocation) {
                    // console.log("### _getCurrentLocation ###");
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
    
            _onSuccessGeolocation : function _onSuccessGeolocation(position) {
                var self = this;
                self.userLatitude = position.coords.latitude;
                self.userLongitude = position.coords.longitude;
    
                if(self.$map) {
                    self.$map.setUserLocation(self.userLatitude, self.userLongitude);
                    self.$map.start(self.userLatitude, self.userLongitude);
                }
            },
            
            _onErrorGeolocation : function _onErrorGeolocation(e) {
                var self = this;
    
                var errorCodes={
                    'code1' : "위치정보 권한이 없습니다.",
                    'code2' : "위치정보 오류가 있습니다.",
                    'code3' : "제한된 시간이 지났습니다."
                }
    
                var msg;
                if(e){
                    msg = errorCodes["code" + e.code];
                } else{
                    msg = "현재 위치를 찾을 수 없습니다."
                }
    
                lgkorUI.alert("", {
                    title: msg,
                    ok: function(){
                        if(self.$map) self.$map.start();
                    }
                });
            },   
    
    
            _requestSaleStoreData : function(){
                var self = this;
    
                // lgkorUI.showLoading();
    
                lgkorUI.requestAjaxDataFailCheck(self.bestShopUrl, {searchType:'search', salesCode:self.salesCode}, function(result){
                    // BTOCSITE-4785
                    if(result.data.length == 0){
                        self.totalStoreData = result.data;
                        self.$defaultListLayer.append('<div class="no-data"><p>검색 결과가 없습니다.</p></div>'); 
                    } else if(result.data.length){
                        
                        var arr = vcui.array.map(result.data, function(item, index){
                            var itemObj = vcui.array.filterOne(self.totalStoreData, function(obj,i){
                                return item['shopID'] == obj['shopID']
                            });
                            return itemObj;
                        });
                        self.totalStoreData = arr;
    
                        var defaultLat = self.currentLatitude;
                        var defaultLong = self.currentLongitude;
    
                        if(self.userLatitude && self.userLongitude) {
    
                            defaultLat = self.userLatitude;
                            defaultLong = self.userLongitude;
                        }
                        // BTOCSITE-4785 : 반경 100km 이내 거리순 7개로 변경
                        //var nArr = self._filterDistance(arr , {lat: defaultLat, long:defaultLong, limit:10});
                        var nArr = self._filterDistance(arr , {lat: defaultLat, long:defaultLong, limit:100}).slice(0, 7);
    
                        if(nArr.length == 0){                       
                            // BTOCSITE-4785
                            lgkorUI.confirm("100Km이내에서 매장을 검색하지 못했습니다. <br>거리기준을 200Km를 기준으로 확장하여 매장을 검색 해보시겠습니까?", {
                                title: "",
                                cancelBtnName: "아니오",
                                okBtnName: "네",
                                ok: function(){
                                    setTimeout(function(){
                                        // BTOCSITE-4785
                                        var newArr = self._filterDistance(arr, {lat:defaultLat, long:defaultLong, limit:200});
                                        self.$map.draw(newArr, defaultLat, defaultLong);
                                        
                                    },300);
                                },
                                cancel:function(){
                                    setTimeout(function(){
                                        self._setItemList(nArr);
                                        self._setItemPosition();  
                                    },300);                             
                                }
                            }, self.$leftContainer.find(':not(.btn-fold):visible:focusable').first()[0]);
                        }else{
                            self.$map.draw(nArr, defaultLat, defaultLong);
                        }   
                    } 
    
                    // lgkorUI.hideLoading();
    
                }, function(err){
                    // console.log(err);
                    // console.log('map store 정보를 가져올수 없습니다.')
                    // lgkorUI.hideLoading();
                });
    
            },
    
            _requestTotalStoreData : function(){
    
                var self = this;
                if(self.totalStoreData.length > 0) return;
    
                // lgkorUI.showLoading();
    
                lgkorUI.requestAjaxDataFailCheck(self.bestShopUrl, {searchType:'search'}, function(result){
    
                    if(result.data.length){
    
                        self.totalStoreData = vcui.array.map(result.data, function(item, index){
                            item['id'] = item['shopID'];
                            item['info'] = false;
                            item["selected"] = false;
                            // BTOCSITE-4785
                            item["detailUrl"] = 'javascript:infoWindowDetail("'+ self.detailUrl+item['shopID']+self.cartPrd+'")' //self.detailUrl+item['shopID'];
                            //item["detailUrl"] = 'javascript:void(window.open("' + self.detailUrl+item['shopID'] + '", "_blank", "width=1070, height=' + self.windowHeight + ', scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"))';
                            return item;
                        });
                        self._dataLoaded();
                    } 
    
                    // lgkorUI.hideLoading();
    
                }, function(err){
                    // console.log('map store 정보를 가져올수 없습니다.')
    
                    // lgkorUI.hideLoading();
                });
    
            },
    
            _filterOptions:function(arr, keywords){
    
                var self = this;
    
                var checked = self.$optionContainer.find('input[type=checkbox]:checked');
                if(checked.length==0) return arr;
    
                var nArr = vcui.array.filter(arr, function(item,index){
    
                    var flagInfo = item.flagInfo;
                    var newStore = vcui.array.filterOne(flagInfo, function(info, i){
                        return info.flagName.toUpperCase() === 'NEW';
                    });
    
                    var newStoreType = (keywords.etcType==="Y" && (newStore? true : false))? true : false;
    
                    var ckServiceCenterType = keywords.serviceCenterType===''? false : true;
                    var ckStoreCompanyCodee = keywords.storeCompanyCode===''? false : true;
                    var ckStoreFormType = keywords.storeFormType===''? false : true;
                    var ckStoreType = keywords.storeType===''? false : true;
    
                    var serviceCenterTypeArr = keywords.serviceCenterType.split('|');
                    var storeCompanyCodeArr = keywords.storeCompanyCode.split('|');
                    var storeFormTypeArr = keywords.storeFormType.split('|');
                    var storeTypeArr = keywords.storeType.split('|');
    
                    // 수정 bestshop 으로 들어오면 bestshopHiplaza 을 추가해서 검색함.
                    if(vcui.array.include(storeCompanyCodeArr, 'bestshop')){
                        storeCompanyCodeArr.push('bestshopHiplaza');
                    }
    
    
                    var shopArr = item.shopType.split(',');
                    var storeArr = item.storeType.split(',');
    
                    var shopFilter = vcui.array.filter(storeCompanyCodeArr, function(x){ return vcui.array.include(shopArr, x)});
                    var storeFilter = vcui.array.filter(storeTypeArr, function(x){ return vcui.array.include(storeArr, x)});
    
                    var storeType = ckStoreType? storeFilter.length>0 : false;
                    var shopType = ckStoreCompanyCodee? shopFilter.length>0 : false;
    
                    var centerType = ckServiceCenterType? vcui.array.include(serviceCenterTypeArr, item.serviceCenterType) : false;               
                    var storeFormType = ckStoreFormType? vcui.array.include(storeFormTypeArr, item.storeFormType) : false;                
                    
    
                    return shopType || centerType || storeFormType || storeType || newStoreType;
                });
    
    
                return nArr;
    
            },
    
    
            _renderStore: function(lat, long){
                var self = this;
    
                self.applyOptions = self._getOptions(); // 롤백을 위해 저장;
                var keywords = self._getKeyword();
    
                if(lat && long){
                    /* BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */
                    // 내주소로 검색 반경 5Km 내 검색
                    //var nArr = self._filterDistance(self.totalStoreData, {lat:lat, long:long, limit:10}); //원본
                    var nArr = self._filterDistance(self.totalStoreData, {lat:lat, long:long, limit:100}).slice(0, 7);
    
                    nArr = self._filterOptions(nArr, keywords);
    
                    //console.log("nArr은 선택된 시/도의 전체:", nArr.length);
                    /* //BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */             
    
                    if(nArr.length==0){
                        // BTOCSITE-4785
                        lgkorUI.confirm("100Km이내에서 매장을 검색하지 못했습니다. <br>거리기준을 200Km를 기준으로 확장하여 매장을 검색 해보시겠습니까?", {
                            title: "",
                            cancelBtnName: "아니오",
                            okBtnName: "네",
                            ok: function(){
                                setTimeout(function(){
                                    var nArr = self._filterDistance(self.totalStoreData, {lat:lat, long:long, limit:200});
                                    nArr = self._filterOptions(nArr, keywords);
                                    self._setSearchResultMode(nArr.length);
                                    self.$map.draw(nArr, lat, long, null, true);
                                },300);
                            },
                            cancel:function(){
                                setTimeout(function(){
                                    self._setItemList(nArr);
                                    self._setItemPosition();  
                                },300);                             
                            }
                        },self.$leftContainer.find(':not(.btn-fold):visible:focusable').first()[0]);
                    }else{
                        self._setSearchResultMode(nArr.length);
                        self.$map.draw(nArr, lat, long, null, true);
                    }
                    
                    return;
                }
    
                var resultLen = 0;
    
                if(keywords.searchType =='local'){
                    var searchCity = self.$citySelect.find('option:selected').text();
                    var nArr = vcui.array.filter(self.totalStoreData, function(item,index){
                        return keywords.searchCity!==''? xsearch(item.shopAdress, searchCity).length > 0 : false;
                    });
                    nArr = vcui.array.filter(nArr, function(item,index){
                        return keywords.searchBorough!==''? xsearch(item.shopAdress, keywords.searchBorough).length > 0 : false;
                    });
                    
                    nArr = self._filterOptions(nArr, keywords);
                    resultLen = nArr.length;
                    self.$map.draw(nArr);
    
                }else if(keywords.searchType =='subway'){
    
                    var geo = keywords.searchCodeDesc.split(',');
                    if(geo.length>1){
                        var nArr = self._filterDistance(self.totalStoreData, {lat:geo[0], long:geo[1], limit:1});
                        nArr = self._filterOptions(nArr, keywords);
                        resultLen = nArr.length;
                        self.$map.draw(nArr, geo[0], geo[1]);
                    }
                }else if(keywords.searchType =='search'){
    
                    var nArr = vcui.array.filter(self.totalStoreData, function(item,index){
                        return keywords.searchKeyword!==''? xsearch(item.shopName, keywords.searchKeyword).length > 0 : false;
                    });
                    nArr = self._filterOptions(nArr, keywords);
                    resultLen = nArr.length;
                    self.$map.draw(nArr);
                }
    
                self._setSearchResultMode(resultLen);
    
    
            },
            
            _loadLocalAreaList: function(val){
                var self = this;
                
                lgkorUI.requestAjaxDataFailCheck(self.localUrl, {city:encodeURI(val)}, function(result){
                    self._setSelectOption(self.$boroughSelect, result.data);
                    self.$boroughSelect.vcSelectbox('update');
                });
            },
    
            _setSubwayOption: function(result, select, firstdata, valuekey){
                var self = this;
                var lines = vcui.array.map(result, function(item, idx){
                    return {
                        title: item.codeName,
                        value: item[valuekey],
                        codeDesc: item.codeDesc
                    }
                });
                lines.unshift(firstdata);
                self._setSelectOption(select, lines);
                select.vcSelectbox('update');
            },
    
            _setSelectOption: function(select, list){
                var self = this;
    
                select.empty();
    
                for(var i in list){
                    if(list[i].codeDesc == undefined || list[i].codeDesc == null) list[i].codeDesc = "";
                    var opt = vcui.template(localOptTemplate, list[i]);
                    select.append($(opt).get(0));
                }
            },
    
            //적용 된 옵션 되돌리기
            _applyOptionChecked: function(){
                var self = this;
                self._setOptionStatus(self.applyOptions);
            },
    
            //옵션 초기화
            _setDefaultOption: function(){
                var self = this;
                self._setOptionStatus(self.defaultOptions);
            },
    
            _setOptionStatus: function(data){
                var self = this;
    
                self.$optionContainer.find('input[type=checkbox]').prop('checked', false);
                
                for(var str in data){
                    var values = data[str].split("|");
                    for(var idx in values){
                        if(values[idx] != "") self.$optionContainer.find('input[value=' + values[idx] + ']').prop('checked', true);
                    }
                }
    
                self._optAllChecked();
            },
    
            _getOptions: function(){
                var self = this;
                
                var optdata = {
                    storeCompanyCode: self._getCheckedBox('.storeCompanyChker'),
                    serviceCenterType: self._getCheckedBox('.serviceCenterChker'),
                    storeFormType: self._getCheckedBox('.storeFormChker'),
                    storeType: self._getCheckedBox('.storeChker'),
                    etcType: self._getCheckedBox(".etcChker")
                }
                
                return optdata;
            },
    
            _getCheckedBox: function(gclass){
                var checked = [];
                $(gclass).find('input[type=checkbox]').each(function(idx, item){
                    if($(item).prop('checked')) checked.push($(item).attr('value'));
                });
    
                return checked.join("|");
            },
            // 필터 초기화
            _setOptINIT: function(){
                var self = this;
                self._setDefaultOption();
                self._setOptText();
            },
    
            _setOptText:function(){
    
                var self = this;
                var len = self.$optionContainer.find('input[type=checkbox]:checked').not('input[id=all-chk]').length;
                var html = ''
                if(len>0){
                    html = '옵션 선택 (' + len +')'
                }else{
                    html = '옵션 선택'
                }
                self.$optionContainer.find('#opt-label').find('em').html(html);
    
            },
    
            // 필터 적용 버튼
            _setOptApply: function(){
                var self = this;
                self._toggleOptContainer();
                self._renderStore();
                self._setOptText();
            },
    
            _optToggleAllChecked: function(){
                var self = this;
    
                var chked = self.$optionContainer.find('.all-chk dt input[type=checkbox]').prop('checked');
                self.$optionContainer.find('.all-chk dd input[type=checkbox]').prop('checked', chked);
            },
    
            _optAllChecked: function(){
                var self = this;
    
                var total = self.$optionContainer.find('.all-chk dd input[type=checkbox]').length;
                var chktotal = self.$optionContainer.find('.all-chk dd input[type=checkbox]:checked').length;
                
                var chked = total == chktotal ? true : false;
                self.$optionContainer.find('.all-chk dt input[type=checkbox]').prop('checked', chked);
            },
    
            // 거리 구하기
            _getDistance : function _getDistance(lat1,lng1,lat2,lng2) {                    
                var R = 6371;
                var dLat = (lat2-lat1) * (Math.PI/180);
                var dLon = (lng2-lng1) * (Math.PI/180);
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c; // Distance in km
                return d;
            },
    
            //옵션 레이어 열기 / 닫기
            _toggleOptContainer: function(){
                var self = this;
    
                if(!self.isTransion){
                    self.isTransion = true;
    
                    var optop;
                    var isOpen = self.$optionContainer.hasClass('open');
                    if(isOpen){
                        
                        optop = self.$leftContainer.height() - self.$optionContainer.find('.btn-sel').height();
                        self.$optionContainer.stop().transition({y:optop}, 350, "easeInOutCubic", function(){
                            self.isTransion = false;
                            self.$optionContainer.css({y:0}).removeClass('open');
                            
                        });
    
                        if(self.isMobile){
                            $('html, body').css({
                                overflow: 'visible'
                            });                       
    
                        }
                    } else{
                        optop = self.$optionContainer.position().top;
    
                        self._applyOptionChecked();
    
                        self.$optionContainer.addClass('open');
    
                        self.$optionContainer.stop().css({y:optop}).transition({y:0}, 350, "easeInOutCubic", function(){self.isTransion=false;});
    
                        if(self.isMobile){
                            $('html, body').css({
                                overflow: 'hidden'
                            });
    
                        }
                    }
                }
            },
    
            _toggleLeftContainer: function(){
                var self = this;            
                self.$leftContainer.toggleClass('close');            
                self._resize();
            },
    
            _showMap: function(flag){
                var self = this;                
                var toggle = self.$searchContainer.find('.btn-view');
    
                if(flag){
    
                    $('.store-map-con').css({
                        'position':'relative',
                        'visibility':'visible',
                        'left':'0',
                        'height':'320'
                    });                   
        
                    toggle.removeClass("map").addClass('list').find('span').text('리스트보기');        
                    self.$map.resize(self.windowWidth, 320);
    
                }else{
    
                    if(toggle.hasClass('map')){
    
                        $('.store-map-con').css({
                            'position':'relative',
                            'visibility':'visible',
                            'left':'0',
                            'height':'320'
                        });                   
            
                        toggle.removeClass("map").addClass('list').find('span').text('리스트보기');        
                        self.$map.resize(self.windowWidth, 320);
        
                    } else{                    
        
                        $('.store-map-con').css({
                            'position':'absolute',
                            'visibility':'hidden',
                            'left':'0',
                            'height':'0'
                        });
        
                        toggle.removeClass("list").addClass('map').find('span').text('지도보기');
                    }
    
                }
                
            },
    
            _getKeyword: function(){
                var self = this;
    
                var optdata = self._getOptions();
                var selectCodeDesc = self.$subwayStationSelect.find('option:selected').data("codeDesc");
    
                var keywords = {
                    searchType: self.searchType,
    
                    latitude: self.currentLatitude,
                    longitude: self.currentLongitude,
    
                    searchCity: self.$citySelect.val(),
                    searchBorough: self.$boroughSelect.val(),
                    
                    searchSubwayLocal: self.$subwayCitySelect.val(),
                    searchSubwayLine: self.$subwayLineSelect.val(),
                    searchSubwayStation: self.$subwayStationSelect.val(),
                    searchCodeDesc: selectCodeDesc == undefined ? "" : selectCodeDesc,
    
                    searchKeyword: self.$searchField.val(),
                    userAddressPoint: "",
    
                    storeCompanyCode: optdata.storeCompanyCode,
                    serviceCenterType: optdata.serviceCenterType,
                    storeFormType: optdata.storeFormType,
                    storeType: optdata.storeType,
                    etcType: optdata.etcType
    
                }
    
                return keywords;
            },
    
            //검색...
            _setSearch: function(){
                var self = this;
    
                /*
                self.$citySelect = $('#select1'); //시/도 선택
                self.$boroughSelect = $('#select2'); //구.군 선택
                self.$localSearchButton = $('.search-local'); //지역검색 버튼
                self.$searchUserAdressButton = $('.search-userAdress'); //내 주소 검색 버튼
    
                self.$localSearchButton.prop('disabled', false);
                self.$boroughSelect.prop('disabled', false);
                self.$boroughSelect.vcSelectbox('update');
    
                self.$subwayCitySelect = $('#select3'); //지역선택
                self.$subwayLineSelect = $('#select4'); //호선 선택
                self.$subwayStationSelect = $('#select5'); //역 선택
                self.$searchSubwayButton = $('.search-subway'); //지하철 검색 버튼
                */
    
    
                var selectedIndex = $(".sch-box .tabs-wrap").vcTab('getSelectIdx');
                self.searchType = searchTypeNames[selectedIndex];
    
    
                switch(self.searchType){
                    case "local":
                        if(self._searchFieldValidation(self.$citySelect, "시/도를 선택해주세요.")){
                            /* BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */
                            var $mapLocY = self.$citySelect.find(':selected').data('locationy');
                            var $mapLocX = self.$citySelect.find(':selected').data('locationx');
    
                            //console.log("111. val테스트 :", self.$citySelect.val());
                        
                            self._renderStore($mapLocY, $mapLocX); 

                            //console.log(self._renderStore($mapLocY, $mapLocX));
                            //console.log(self._renderStore());
                            
                            //2차 구/군 선택할때
                            if(!self.$boroughSelect.val() == false) {
                                //console.log("222. val테스트 :", self.$boroughSelect.val());
                                self._renderStore();
                            }
                            /* //BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */
                        }
                        break;
    
                    case "subway":
                        if(self._searchFieldValidation(self.$subwayCitySelect, "지역을 선택해주세요.")){
                            if(self._searchFieldValidation(self.$subwayLineSelect, "지하철 호선을 선택해주세요.")){
                                if(self._searchFieldValidation(self.$subwayStationSelect, "지하철역을 선택해주세요.")){
                                    self._renderStore();
                                }
                            }
                        }
                        break;
    
                    case "search":
                        if(self._searchFieldValidation(self.$searchField, "검색어를 입력해주세요.")){        
                            $(window).off('keyup.searchShop');        
                            self._renderStore();
                        }
                        break;
                }
            },
    
            _searchFieldValidation: function(field, errmsg){
                var self = this;
                
                var trim = field.val().replace(/\s/gi, '');
                if(trim.length){
                    return true;
                } else{
                    lgkorUI.alert("", {
                        title: errmsg
                    });
                    return false;
                }
            },
    
            //내 주소 검색
            _setUserAdressSearch: function(){
                var self = this;
    
                if(self.userAddress != ""){
    
                    self.$map.getAdressPositions(self.userAddress, function(result){
    
                        if(result.success == "Y"){
                            self.searchType="myLocation";
                            self._renderStore(result.pointy, result.pointx);
                            
                        } else{
                            // console.log(result.errMsg)
                            lgkorUI.alert("내 주소의 위치정보를 <br>찾을 수 없습니다.", {
                                title:''
                            });
                        }
                    });                
                } else{
                    if(self.loginUrl == ""){ // 주소정보가 없고 로그인 된 상태                    
                        lgkorUI.alert("", {
                            title:'등록된 주소 정보가 없습니다.'
                        });
                    } else{
    
                        lgkorUI.confirm("로그인 후 이용가능 합니다.<br>로그인하시겠어요? ", {
                            title: "",
                            cancelBtnName: "아니오",
                            okBtnName: "네",
                            ok: function(){
                                setTimeout(function(){
                                    location.href = self.loginUrl;
                                },300);
                            }
                        }, self.$searchUserAdressButton[0]);
                    }
                }
            },
    
            _setMarkerSelected: function(obj){
    
                var self = this;   
                var id = obj.id;
                var isOff = obj.isOff;                     
                var selectedMarker = self.$defaultListLayer.find('li[data-id="' + id + '"]');
                if(isOff){
                    selectedMarker.find('.point').removeClass('on');
                }else{
                    if(!selectedMarker.find('.point').hasClass('on')) selectedMarker.find('.point').addClass('on');
                    selectedMarker.siblings().find('.point').removeClass('on');
                    if(self.isMobile) self._showMap(true);
                }
                
            },
    
            //매장에 등록 된 이벤트 가져오기...
            _getEventInfo: function(id){
                var self = this;
                var evt = vcui.array.filter(self.eventArr, function(item, idx){
                    return item.code == id;
                });
    
                return evt;
            },
    
            //매장리스트 생성...
            _setItemList: function(data){
                var self = this;
                
                self.$defaultListLayer.empty();
                var arr = data; //$.extend(true,[],data);
    
                if(arr.length){
    
                    var html='';
                    for(var i=0; i<arr.length; i++){
                        var listData = {
                            num: i+1,
                            shopName: arr[i].info.shopName,
                            bizHours: arr[i].info.bizHours,
                            flagInfo: arr[i].info.flagInfo,
                            shopAdress: arr[i].info.shopAdress,
                            shopTelphone: arr[i].info.shopTelphone,
                            shopID: arr[i].info.shopID,
                            // BTOCSITE-4785
                            detailUrl:self.detailUrl+arr[i].info.shopID+self.cartPrd,
                            orgCode:self.shopUrl+arr[i].info.orgCode,
                            selected: arr[i].info.selected ? " on" : ""
                        }
    
                        html += vcui.template(searchListTemplate, listData);
                    }
    
                    self.$defaultListLayer.html(html);
                } else{
                    var keywords = self._getKeyword();
                    var nodata = self.searchType == searchTypeNames[2] ? '"' + keywords.searchKeyword + '"에 대한 ' : "";
                    self.$defaultListLayer.append('<div class="no-data"><p>' + nodata + '검색 결과가 없습니다.</p></div>');
                }
            },
    
            _setItemPosition: function(){
                var self = this;
    
                var selectItem = self.$defaultListLayer.find('> li .point.on');
                if(selectItem.length){
                    var parent = selectItem.closest('li');
                    var scrollwrap = self.$defaultListContainer.find('.scroll-wrap');
                    var scrolltop = scrollwrap.scrollTop();
                    var itemtop = parent.position().top;
                    var itembottom = -scrolltop + itemtop + parent.height();
                    if(itemtop < scrolltop || itembottom > scrollwrap.height()){
                        self.$defaultListContainer.find('.scroll-wrap').stop().animate({scrollTop: itemtop}, 220);
                    }
                }
            },
    
            _returnSearchMode: function(){
                var self = this;
                
                self.$searchContainer.stop().transition({opacity:1}, 320, "easeInOutCubic");
                // BTOCSITE-4785 s
                if($('.store-list-wrap').hasClass('display-product-search')){
                    $('.display-product-search-info-wrap').eq(0).show();
                    $('.display-product-search .dp-pdp-map').css({
                        'marginTop' : '0',
                    });
                    $('.display-product-search .store-map-con.isMobile').removeClass('dp-pdp-map');
                }
                // BTOCSITE-4785 e
                $('.result-list-box').stop().css({display:'none'})            
                
                $('.store-list-wrap .tit').show();
                self.$searchContainer.css('display', 'block');
                self.$defaultListContainer.css({paddingTop:0, opacity:0}).animate({opacity:1}, 300);
    
                self._setListArea();
    
                if(self.isMobile){
    
                    self.$optionContainer.show();
                    var toggle = self.$searchContainer.find('.btn-view');
    
                    if(toggle.hasClass('map')){
                        $('.store-map-con').css({
                            'position':'absolute',
                            'visibility':'hidden',
                            'left':'0',
                            'height':'320'
                        });
                    }
                }
                
    
                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
            },
    
            _setSearchResultMode: function(resultCnt){
    
                var self = this;
    
                
                self._setResultText(resultCnt);
                self.$searchContainer.stop().transition({opacity:0}, 320, "easeInOutCubic");
    
                $('.store-list-wrap .tit').hide();
                self.$searchContainer.css('display', 'none');
                // BTOCSITE-4785 s
                if($('.store-list-wrap').hasClass('display-product-search')){
                    $('.display-product-search-info-wrap').eq(0).hide();
                    $('.display-product-search .store-map-con.isMobile').addClass('dp-pdp-map');
                    if ($('.display-product-search-info').eq(1).hasClass('close')) {
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '91px',
                        });
                    } else {
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '207px',
                        });
                    }
                }
                // BTOCSITE-4785 e
                $('.result-list-box').stop().css({display:'block', opacity:0}).transition({opacity:1}, 410, "easeInOutCubic");
                
                var paddingtop = 0;
    
                if(self.isMobile){
                    self.$optionContainer.hide();
                    var resultop = $('.result-list-box').position().top;
                    var resultheight = $('.result-list-box').outerHeight(true);
                    var listop = self.$defaultListContainer.offset().top;
    
                    paddingtop = resultop + resultheight - listop;
    
                    $('.store-map-con').css({
                        'position':'relative',
                        'visibility':'visible',
                        'left':'0',
                        'height':'320',
                    });
                    $('body,html').scrollTop(0);
                }
                // BTOCSITE-4785 s
                //self.$defaultListContainer.css({paddingTop:paddingtop, opacity:0}).animate({opacity:1}, 300);  
                if(!$('.store-list-wrap').hasClass('display-product-search')){
                    self.$defaultListContainer.css({paddingTop:paddingtop, opacity:0}).animate({opacity:1}, 300); 
                }   
                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);      
                // BTOCSITE-4785 e
                self._setListArea();
                
            },
    
            _setResultText: function(total){
                var self = this;
    
                var keywords = self._getKeyword();
                var searchKeyword;
                if(self.searchType == "local"){
                    /* BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */
                    var cityname = self.$citySelect.find('option:selected').text();
                    var borough = self.$boroughSelect.find('option:selected').text();
                    
                    var $boroughVal = self.$boroughSelect.find('option:selected');
                    
                    if(!self.isUserAddressClick){
                        if( $boroughVal.val() != undefined && $boroughVal.val() != "") {
                            searchKeyword = cityname + " " + borough;
                        } else {
                            searchKeyword = cityname;
                        }
                    }else{
                        searchKeyword = self.userAddress;
                    }
                    /* //BTOCSITE-2890 : 전시매장 찾기개선 요청 2021-09-15 */
                } else if(self.searchType == "subway"){
                    var stationame = self.$subwayStationSelect.find('option:selected').text();
                    searchKeyword = stationame;
                } else{
                    searchKeyword = keywords.searchKeyword;
                }
    
    
                var resultxt = vcui.template(searchResultText[self.searchType], {
                    keyword: searchKeyword,
                    total: total ? total.toString() : "0"
                });
                self.$searchResultContainer.find('.result-txt').html(resultxt);
                self.isUserAddressClick = false;
            },
    
            //리스트 컨테이너 높이 설정...스크롤영역
            _setListArea: function(){
                var self = this;
                var $scrollWrap = self.$defaultListContainer.find('.scroll-wrap');
    
                if(self.isMobile){
    
                    $scrollWrap.css({
                        'height':'auto',
                        'overflowY':'initial'
                    });
    
                }else{                
                    
                    var container = self.$leftContainer.height();
                    var listTop = self.$defaultListContainer.position().top;
                    var title = $('.store-list-wrap .tit').height();
                    var opt = 80; //$('.store-list-box > .opt-cont').height();
                    var ht = container - listTop - title - opt;                   
    
                    $scrollWrap.css({
                        'height':ht,
                        'overflowY':'auto'
                    });
                }   
    
            },
    
    
            _resize: function(){
                var self = this;
    
                self.windowWidth = $(window).width();
                self.windowHeight = $(window).height();            
    
                var listwidth = self.$leftContainer.width();
                var mapwidth, mapheight, mapmargin;
    
                if(self.windowWidth < 1025){
    
                    self.isMobile = true;
                    mapmargin = 0;
                    mapwidth = self.windowWidth;
                    mapheight = 320;
    
                    if(!$('.store-map-con').hasClass('isMobile')){
    
                        $('.store-map-con').addClass('isMobile').css({
                            'position':'absolute',
                            'visibility':'hidden',
                            'left':'0',
                            'height':mapheight
                        });
        
                        $( ".btn-list-fold" ).after( $('.store-map-con') );
    
                    }
                    // BTOCSITE-4785 s
                    if($('.display-product-search-info').eq(1).hasClass('close')){
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '91px',
                        });
                    } else {
                        $('.display-product-search .dp-pdp-map').css({
                            'marginTop' : '207px',
                        });
                    }
                    // BTOCSITE-4785 s
    
                } else{
    
                    self.isMobile = false;                
    
                    if(self.$leftContainer.hasClass('close')){
                        mapmargin = 24;
                    } else{
                        mapmargin = listwidth;
                    }                
                    mapwidth = self.windowWidth - mapmargin;            
                    mapheight = $('.map-container').height();
    
                    if($('.store-map-con').hasClass('isMobile')){
    
                        self.$optionContainer.show();
    
                        $('.store-list-wrap').after( $('.store-map-con') );
                        $('.store-map-con').removeClass('isMobile').css({
                            'position':'absolute',
                            'visibility':'visible',
                            'left':'0',
                            'height':mapheight
                        });
    
                    }
                    // BTOCSITE-4785 s
                    $('.dp-pdp-map').css({
                        'marginTop' : '0',
                    });
                    // BTOCSITE-4785 e
                }
                
                self.$mapArea.css({
                    width: mapwidth,
                    height: mapheight,
                    'marginLeft': mapmargin
                });
    
                self._setListArea();
    
                if(self.$map) self.$map.resize(mapwidth, mapheight);
            }
        }
    
        $(window).ready(function(){
            searchShop.init();
            // BTOCSITE-4785 s
            var dpPdp  = getParameter("dpPdp");
            if(getParameter("dpPdp")){
                $(".store-list-wrap").addClass("display-product-search");
                $(".display-product-name").text(dpPdp);
            } 
            // BTOCSITE-4785 e
        });
    })();
    