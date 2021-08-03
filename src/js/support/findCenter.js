function moveDetail(el, detailUrl, windowHeight) {
    var id = $(el).attr("href").replace("#", "");
    var currentUrl = detailUrl+"-"+id; //BTOCSITE-3617 센터 찾기 메뉴 및 센터 정보 상세 페이지 분기 개발 요청
    lgkorUI.setAcecounter('www.lge.co.kr/acecount/centerDetailClick.do', '/acecount/centerDetailClickm.do');

    //BTOCSITE-3617 센터 찾기 메뉴 및 센터 정보 상세 페이지 분기 개발 요청
    if( lgkorUI.getParameterByName("Thinq_cs") == 'y') {
        currentUrl = currentUrl + "?Thinq_cs=y";
    }
    window.open(currentUrl, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
}

function moveConsultPage() {
    lgkorUI.setAcecounter('www.lge.co.kr/acecount/centerMapVisitClick.do', '/acecount/centerMapVisitClickm.do');
}

(function(){
    var searchResultText = {
        search: '\"{{keyword}}"\ 가까운 <strong>{{total}}개</strong>의 센터를 찾았습니다.',
        localSearch: '\"{{keyword}}"\ 가까운 <strong>{{total}}개</strong>의 센터를 찾았습니다.',
        roadSearch: '선택한 주소의 가까운 <strong>{{total}}개</strong>의 센터를 찾았습니다.',
        subwaySearch: '\"{{keyword}}역\" 가까운 <strong>{{total}}개</strong>의 센터를 찾았습니다.',
        userAddressSearch: '내 주소 기준으로 <strong>{{total}}개</strong>의 센터를 찾았습니다.',
        currentSearch: '내 위치 기준으로 <strong>{{total}}개</strong>의 센터를 찾았습니다.'
    };

    var localOptTemplate = '<option value="{{code}}">{{codeName}}</option>';
    var noDataTemplate = '<div class="no-data"><p>검색 결과가 없습니다.</p></div>';

    var searchListTemplate = 
        '<li data-id="{{shopID}}">'+
            '<a href="#" class="store-info-list ui_marker_selector">'+
                '<div class="point-wrap">'+
                    '<div class="point {{selected}}">'+
                        '<span class="num">{{num}}</span>'+
                        '<span class="blind">선택안됨</span>'+
                    '</div>'+
                '</div>'+
                '<div class="info-wrap">'+
                    '<div class="tit-wrap">'+
                        '<p class="name">'+
                            '<span class="blind">매장명</span>'+
                            '{{shopName}}'+
                        '</p>'+
                        '{{# if(typeof bizStatus != "undefined") { #}}'+
                        '{{# if(typeof bizStatus.bizStatusClass != "undefined") { #}}'+
                        '<div class="status-icon {{bizStatus.bizStatusClass}}">'+
                        '{{# } else { #}}'+
                        '<div class="status-icon">'+
                        '{{# } #}}'+
                            '<strong class="status">{{bizStatus.bizStatusText}}</strong>'+
                        '</div>'+
                        '{{# } #}}'+
                    '</div>'+

                    '<p class="addr">'+
                        '<span class="blind">주소</span>'+
                        '{{shopAdress}}'+
                    '</p>'+

                    '<div class="etc-info">'+
                        '<div class="bizHours">'+
                            '<span class="blind">영업시간</span>'+
                            '<p class="cell">'+
                                '<span class="key">평일 : </span>'+
                                '<span class="value">{{bizHours.week}}</span>'+
                            '</p>'+
                            '<p class="cell">'+
                                '<span class="key">토요일 : </span>'+
                                '<span class="value">{{bizHours.saturday}}</span>'+
                            '</p>'+
                        '</div>'+
                        '{{# if(typeof serviceProduct != "undefined") { #}}' +
                        '<ul class="opt-list">'+
                            '{{#each item in serviceProduct}}' +
                            '<li class="{{item.class}}">'+
                                '<span class="name">{{item.name}}</span>'+
                            '</li>' +
                            '{{/each}}' +
                        '</ul>'+
                        '{{# } #}}' +
                    '</div>'+
                '</div>'+
            '</a>'+
            '<a href="#{{shopID}}" class="btn-link" title="새창으로 열림 - {{shopName}}">상세보기</a>'+
        '</li>';
    var addressFinder;
    var detectUtil = vcui.detect;
    var isMobile = detectUtil.isMobile; 
    var cookie = lgkorUI.cookie;

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

            self.isChangeMode = false;
            self.searchResultMode = false;
            self.searchType = 'local';
            self.isLogin = lgkorUI.isLogin;

            self.configUrl = $('.map-container').data("config"); 

            self.bestShopUrl = "";
            self.localUrl = "";
            self.subwayUrl = "";
            self.stationUrl = "";
            self.detailUrl = "";

            self.userCityName = "";
            self.userBoroughName = "";

            self.storeData = [];

            self.$container = $('.map-container');
            self.$leftContainer = $('.store-list-wrap'); //좌측 검색&리스트 컨테이너...

            self.$defaultListContainer = self.$leftContainer.find('.list-wrap'); //리스트 컨테이너...
            self.$defaultListLayer = self.$defaultListContainer.find('.sch-list .scroll-wrap .list-item'); 

            self.$searchContainer = self.$leftContainer.find('.sch-box');

            self.$map = null; //맵 모듈...
            self.$mapContainer = $('.map-area'); //맴 모듈 컨테이너...

            //검색...
            self.searchKeyword = "";
            self.schReaultTmplID = "";

            self.$searchResultContainer = $('.result-list-box');

            self._resize();

            // BTOCSITE-3617 : Thinq_cs 파라메타 있을때 방문예약 버튼 비노출
            if( lgkorUI.getParameterByName("Thinq_cs") == 'y') {
                self.$container.addClass('Thinq_cs');
            }
            
            vcui.require(['ui/centerMap'], function () {
                lgkorUI.requestAjaxData(self.configUrl, {}, function(result){
                    self.bestShopUrl = result.data.bestShopUrl;
                    self.localUrl = result.data.localListUrl;
                    self.subwayUrl = result.data.subwayListUrl;
                    self.stationUrl = result.data.stationListUrl;
                    self.detailUrl = result.data.detailPageUrl;
                    self.userAdressCheckedUrl = result.data.userAdressCheckedUrl;
                    self.defaultLongitude = result.data.basicPosition.longitude;
                    self.defaultLatitude = result.data.basicPosition.latitude;
                    self.longitude = result.data.basicPosition.longitude;
                    self.latitude = result.data.basicPosition.latitude;

                    self.$mapContainer.vcCenterMap({
                        keyID: result.data.mapID,
                        appKey: result.data.appKey,
                        longitude : result.data.basicPosition.longitude,
                        latitude: result.data.basicPosition.latitude,
                        zoom:14,
                        templates: {
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
                            '           <a href="{{consultUrl}}" class="btn size btnVisit" onclick="moveConsultPage();" target="_blank" title="새창으로 열림 - {{shopName}}">방문 예약</a>'+
                            '           {{/if}}'+
                            '           <a href="#{{shopID}}" class="btn size detail-view" onclick="moveDetail(this, \''+self.detailUrl+'\', '+self.windowHeight+');" title="새창으로 열림 - {{shopName}}">상세 보기</a>'+
                            '       </div>'+
                            '   </div>'+
                            '   <button class="btn-overlay-close"><span class="blind">닫기</span></button>'+
                            '</div>'
                        }
                    }).on('mapinit', function(e, data){
                        var centerSeq = lgkorUI.searchParamsToObject('seq');

                        self.$map = self.$mapContainer.vcCenterMap('instance');

                        if (centerSeq) {
                            self._loadStoreData(centerSeq);
                        } else {
                            if (!isMobile) { // pc device
                                if (!self.isLogin) { // 비로그인
                                    self._loadStoreData();
                                } else { // 로그인
                                    self._setUserAdressSearch(true);
                                }
                            } else { // mobile device
                                if (!cookie.getCookie('geoAgreeCancel')) {
                                    self._setCurrentSearch(true);
                                } else {
                                    self._loadStoreData();
                                }
                            }
                        }

                        self._bindEvents();
                    }).on('mapchanged', function(e, data){
                        self._setItemList(data);
                        self._setItemPosition();      

                        if(self.searchResultMode) self._setSearchResultMode();
                    }).on('maperror', function(e, error){
                        console.log(error);
                    });
                });

                addressFinder = new AddressFind();
                $('.ui_search').search({
                    template: {
                        autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="#{{item.shopID}}" class="btn-detail" title="새창 열림">{{item.shopName}}</a></li>{{/each}}</ul>',
                    }
                });

                !vcui.detect.isMobile && $('.scroll-wrap').mCustomScrollbar();

                self.$citySelect = $('#select1');
                self.$boroughSelect = $('#select2');
                self.$localSearchButton = $('.search-local');
                self.$searchUserAdressButton = $('.search-userAdress');
                self.$searchCurrentButton = $('.search-current');
                
                self.$subwayCitySelect = $('#select3');
                self.$subwayLineSelect = $('#select4');
                self.$subwayStationSelect = $('#select5');
                self.$searchSubwayButton = $('.search-subway');

                self.$citySelect2 = $('#select6');
                self.$address1 = $('#address1');
                self.$searchCenterName = $('#tab3').find('.btn-search');

                self.$zipCode = $('#zipCode');
                self.$address2 = $('#address2');
                self.$openAddressButton = $('.btn-address');
                self.$searchAddressButton = $('.search-address');
			});
        },
        _openWindowPop : function(target){
            var self = this;
            var id = $(target).attr("href").replace("#", "");
            var currentUrl = self.detailUrl+"-"+id; //BTOCSITE-3617 센터 찾기 메뉴 및 센터 정보 상세 페이지 분기 개발 요청
            lgkorUI.setAcecounter('www.lge.co.kr/acecount/centerDetailClick.do', '/acecount/centerDetailClickm.do');


            //BTOCSITE-3617 센터 찾기 메뉴 및 센터 정보 상세 페이지 분기 개발 요청
            if( lgkorUI.getParameterByName("Thinq_cs") == 'y') {
                currentUrl = currentUrl + "?Thinq_cs=y";
            }

            window.open(currentUrl, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
        },

        _bindEvents: function(){
            var self = this;
            
            var activeTabIndex = self.$searchContainer.find('.ui_tab .tabs li.on').index();

            function setStoreClass(index){
                var $storeListWrap = $('.store-list-wrap');
                var $storeMap = $('.store-map-con');
                if( index == 0) {
                    $storeListWrap.addClass('local');
                    $storeMap.addClass('local-map');
                } else {
                    $storeListWrap.removeClass('local')
                    $storeMap.removeClass('local-map');
                }
            }
            setStoreClass(activeTabIndex);

            self.$searchContainer.find('.ui_tab').on('tabchange', function(e, data) {
                setStoreClass(data.selectedIndex);
                switch(data.selectedIndex) {
                    case 0:
                        self.searchType = 'local';
                        break;
                    case 1:
                        self.searchType = 'subway';
                        break;
                    case 2:
                        self.searchType = 'center';
                        break;
                    case 3:
                        self.searchType = 'road';
                        break;
                }
            });

            self.$defaultListLayer.on('click', 'li > .ui_marker_selector', function(e){
                e.preventDefault();
                
                var $target = $(e.currentTarget);
                var id = $target.parent().data('id');
                
                self.$map.selectInfoWindow(id);


                if ($(window).innerWidth() < 1025) {
                    self._showMap(true);

                    if (!$(window).data('breakpoint').isMobile) {
                        $('html, body').stop().animate({scrollTop:self.$container.offset().top});
                    } else {
                        if (!self.$container.hasClass('result-map')) {
                            $('html, body').stop().animate({scrollTop:self.$container.offset().top});
                        } else {
                            $('html, body').stop().animate({scrollTop:0})
                        }
                    }
                }
            })
            .on('click', 'li > .btn-link', function(e){
                e.preventDefault();
                e.stopPropagation();
                self._openWindowPop(this)
            });

            self.$searchResultContainer.on('click', '.btn-back', function(e){
                self.$leftContainer.removeClass('active');
                $('.store-list-box').hide().stop().fadeIn(function(){
                    self.$leftContainer.removeClass('active');
                    $(this).attr('style', '');
                    $('.store-map-con').css('top', '').removeClass('active');
                })
                $('.map-container').removeClass('result-map');

                if( window.innerWidth < 768) {
                    $('.page-header').show().removeAttr('style');
                    $('.waiting-state').show()
                }
            });

            self.$leftContainer.on('click', '.btn-view', function(e){
                e.preventDefault();
                self._showMap();
            });

            self.$leftContainer.on('click', '.btn-fold', function(e){
                e.preventDefault();

                self._toggleLeftContainer();
            })

            // 지역 검색
            self.$citySelect.on('change', function(e){
                self._loadLocalAreaList(e.target.value);
            });
            self.$localSearchButton.on('click', function(e){
                self._setLocalSearch();
            });
            self.$searchUserAdressButton.on('click', function(e){
                self.searchType = 'user';
                self._setUserAdressSearch();
            });
            self.$searchCurrentButton.on('click', function(e) {
                self.searchType = 'current';
                self._setCurrentSearch();          
            });

            // 지하철역 검색
            self.$subwayCitySelect.on('change', function(e){
                lgkorUI.requestAjaxData(self.subwayUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayLineSelect, {codeName:"호선 선택", code:""}, "code");
                });
                self.$subwayLineSelect.prop('disabled', false);
            });
            self.$subwayLineSelect.on('change', function(e){
                lgkorUI.requestAjaxData(self.stationUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayStationSelect, {codeName:"역 선택", code:""}, "codeName");
                });
                self.$subwayStationSelect.prop('disabled', false);
            });
            self.$subwayLineSelect.on('change', function(e){
                self.$searchSubwayButton.prop('disabled', false);
            });
            self.$searchSubwayButton.on('click', function(e){
                //  지하철역 검색
                self._setSubwaySearch();
            });

            // 센터명 검색
            self.$citySelect2.on('change', function(e){
                if ($(this).val()) {
                    self.$address1.prop('disabled', false);
                } else {
                    self.$address1.val('').prop('disabled', true);
                    
                }
            });
            self.$address1.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$searchCenterName.trigger('click');
                }
            });

            $('.ui_search').on('autocomplete', function(e, param, url, callback) {
                var data = {
                    searchCity: self.$citySelect2.val(),
                    searchKeyword: param.keyword
                }

                lgkorUI.requestAjaxData(url, data, function(result) {
                    callback(result.data);
                });
            });
            $('.ui_search').on('autocompleteClick', function(e, el) {
                var id = $(el).attr("href").replace("#", "");
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });

            self.$searchCenterName.on('click', function() {
                // 센터명 검색
                self._setSearch();
            });

            // 주소 검색
            self.$openAddressButton.on('click', function() {
                addressFinder.open(function(data) { 
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;
                    self.$zipCode.val(data.zonecode);
                    self.$address2.val(address);
                    
                    self.searchAddressToCoordinate(data.address);
                }); 
            });
            self.$searchAddressButton.on('click', function() {
                // 주소 검색
                self._setKakaoSearch();
            });

            $(window).on('resizeend', function(e){
                self._resize();
            }).on('breakpointchange', function() {
                self.$map.resizeInfoWindow();
            });

            self._resize();
        },
        searchAddressToCoordinate: function(address, callback) { 
            var self = this;

            naver.maps.Service.geocode({
                address: address
            }, function(status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                var point = response.result.items[0].point;
                
                self.longitude = point.x;
                self.latitude = point.y;

                callback && callback();
            });
        },
        _setTabInit: function(){
            var self = this;
            
            self.$address1.val('');

            self.$citySelect.val();
            self.$boroughSelect.val();
            self.$subwayCitySelect.val();
            self.$subwayLineSelect.val();
            self.$subwayStationSelect.val();
            self.$citySelect2.val();
        },

        _loadStoreData: function(seq){
            var self = this;
            var param = $.extend(self._getKeyword(), self.optionData);

            if (seq) param = $.extend(param, {
                seq: seq
            });

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.bestShopUrl, param, function(result){
                self.storeData = vcui.array.map(result.data, function(item, index){
                    item['id'] = item['shopID']; //info.shopID || agCode    
                    item['info'] = false;
                    return item;
                });
                self.$map.applyMapData(self.storeData);
                self._setResultText();
                if (seq) {
                    self._showMap(true);
                    self.$map.selectInfoWindow(self.storeData[0].id);
                }
                self.userCityName = self.userBoroughName = "";
                if (self.searchType == 'current' || self.searchType == 'user') self.searchType = 'local';
                lgkorUI.hideLoading();
            });
        },

        _loadLocalAreaList: function(val){
            var self = this;

            lgkorUI.requestAjaxData(self.localUrl, {pcode:encodeURI(val),codeType:'CITY'}, function(result){
                var arr = result.data instanceof Array ? result.data : [];

                self._setSubwayOption(result.data, self.$boroughSelect, {codeName:"구/군 선택", code:""}, "code");
                self.$localSearchButton.prop('disabled', false);
                self.$boroughSelect.prop('disabled', arr.length ? false : true);
                self.$boroughSelect.vcSelectbox('update');
            });
        },

        _setSubwayOption: function(result, select, firstdata, valuekey){
            var self = this;
            var lines = vcui.array.map(result, function(item, idx){
                return {
                    codeName: item.codeName,
                    code: item[valuekey]
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
                var opt = vcui.template(localOptTemplate, list[i]);
                select.append($(opt).get(0));
            }
        },

        _toggleLeftContainer: function(){
            var self = this;
            
            self.$leftContainer.toggleClass('close');
            
            self._resize();
        },

        _showMap: function(flag){
            var self = this;

            if(!self.isTransion){
                self.isTransion = true;
                
                var toggle = self.$leftContainer.find('.btn-view');
                if(window.innerWidth < 1025) {
                    if(flag || toggle.hasClass('map')){
                        self.$mapContainer.css({
                            marginLeft : 0
                        })
                        self.$container.addClass('show-map');
                        toggle.removeClass("map").addClass('list').find('span').text('리스트보기');
                        
                    } else{
                        self.$container.removeClass('show-map');
                        toggle.removeClass("list").addClass('map').find('span').text('지도보기');
                    }
                }
                self.isTransion = false;
                self._resize();
            }
        },

        _getKeyword: function(){
            var self = this;

            var keywords = {};

            switch(self.searchType) {
                case 'local':
                    keywords = {
                        latitude:self.latitude,
                        longitude:self.longitude
                        ,pSi:self.pSi, // 210614 추가
                        pGu:self.pGu  // 210614 추가
                    };    
                    break;
                case 'current':
                    keywords = {
                        latitude:self.latitude,
                        longitude:self.longitude
                    };
                    break;
                case 'user':
                    keywords = {
                        latitude:self.latitude,
                        longitude:self.longitude
                    };
                    break;
                case 'subway':
                    keywords = {
                        searchSubwayLocal: self.$subwayCitySelect.val(),
                        searchSubwayLine: self.$subwayLineSelect.val(),
                        searchSubwayStation: self.$subwayStationSelect.val()
                    };
                    break;
                case 'center':
                    keywords = {
                        searchCity: self.$citySelect2.val(),
                        searchKeyword: self.$address1.val()
                    };
                    break;
                case 'road':
                    keywords = {
                        latitude:self.latitude,
                        longitude:self.longitude
                    };
                    break;
            };

            if (Object.keys(keywords).length == 0) {
                keywords = {
                    latitude:self.latitude,
                    longitude:self.longitude
                };
            }

            console.log("keywords :", keywords)

            return keywords;
        },

        //지역 검색...
        _setLocalSearch: function(){
            var self = this;

            var keyword = self.$citySelect.val() + ' ' + self.$boroughSelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                var callback = function() {
                    self._loadStoreData();
                    self._showResultLayer();
                };

                self.searchResultMode = true;
                self.schReaultTmplID = "localSearch";
                self.pSi = self.$citySelect.val(); // 210614 추가
                self.pGu = self.$boroughSelect.val(); // 210614 추가
                
                self.searchAddressToCoordinate(trim, callback);
            }
        },

        // 내 주소로 검색....
        _setUserAdressSearch: function(init){
            var self = this;

            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(self.userAdressCheckedUrl, {}, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    var callback = function() {
                        self._loadStoreData()
                    };

                    self.searchResultMode = init ? false : true;
                    self.schReaultTmplID = "userAddressSearch";

                    // self.$map.getAdressPositions(result.data.userAdress, callback);
                    self.searchAddressToCoordinate(result.data.userAdress, callback);
                    !init && self._showResultLayer();
                } else{
                    if (init) {
                        self._loadStoreData();
                    } else {
                        if(result.data.location && result.data.location != ""){
                            lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                                typeClass:'type2',
                                title:'',
                                okBtnName: '네',
                                cancelBtnName: '아니요',
                                ok: function() {
                                    location.href = result.data.location;
                                }
                            }, self.$searchUserAdressButton[0]);
                        } else{
                            lgkorUI.alert("", {
                                title: result.data.alert.title
                            }, self.$searchUserAdressButton[0]);
                        }
                    }
                }
            });
        },

        // 현재 위치 검색
        _setCurrentSearch: function(init) {
            var self = this;
            var searchCurrentSearch = function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(pos) {
                        self.latitude = pos.coords.latitude;
                        self.longitude = pos.coords.longitude;
    
                        self.searchResultMode = init ? false : true;
                        self.schReaultTmplID = "currentSearch";
                        
                        cookie.setCookie('geoAgree','Y', 1);
                        cookie.deleteAllCookie('geoAgreeCancel');

                        self._loadStoreData();    
                        !init && self._showResultLayer();
                    }, function(error) {
                        lgkorUI.alert('현재 위치를 찾을 수 없습니다.', {
                            title: '현재 위치 정보',
                            typeClass: 'type2',
                            ok: function() {
                                if (init) {
                                    self.searchResultMode = false;
    
                                    self.latitude = self.defaultLatitude;
                                    self.longitude = self.defaultLongitude;
                                    
                                    if (self.isLogin) {
                                        self._setUserAdressSearch(true);
                                    } else {
                                        self._loadStoreData();
                                    }
                                }
                            }
                        });
                    }); 
                } else {
                    lgkorUI.alert('위치 기반 서비스를 제공하지 않습니다.', {
                        title: '현재 위치 정보',
                        typeClass: 'type2',
                        ok: function() {
                            if (init) {
                                self.searchResultMode = false;

                                self.latitude = self.defaultLatitude;
                                self.longitude = self.defaultLongitude;
                                
                                if (self.isLogin) {
                                    self._setUserAdressSearch(true);
                                } else {
                                    self._loadStoreData();
                                }
                            }
                        }
                    });
                }
            };
            setAppLocation = function(currentLocation){
            	if (currentLocation == '') currentLocation = '37.55401,126.97486';//
            	
        		var arrLocation = currentLocation.split(',');
                self.latitude = arrLocation[0];
                self.longitude = arrLocation[1];

                self.searchResultMode = init ? false : true;
                self.schReaultTmplID = "currentSearch";

                self._loadStoreData();    
                !init && self._showResultLayer();
        	
    
            };
            var getAppCurrentLocation = function() {
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                	var obj = new Object();
                	obj.command = "getGPS";
                	obj.callback ="setAppLocation";
                	var jsonString= JSON.stringify(obj);
                	webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                } else {
    	        	try {
    	        		var appGeoAgree = android.getLocationActive();
    	        		if (appGeoAgree=='Y'){
    	        			android.getLocation('setAppLocation');
    	        			//searchCurrentSearch();
        	        		//setAppLocation(android.getLocation());	
    	        		} else {
                            if (!init) {
                                lgkorUI.alert('', {
                                    title: '설정 > 앱권한에서 위치정보 이용동의를 하셔야 이용 가능합니다.'
                                }, self.$searchCurrentButton[0]);
                            } else {
                                self.searchResultMode = false;

                                self.latitude = self.defaultLatitude;
                                self.longitude = self.defaultLongitude;
                                
                                self._loadStoreData();
                            }	
                            //setAppLocation('37.55401,126.97486');	    	        			
    	        		}
            		} catch (e) {
                        if (!init) {
                            lgkorUI.alert('', {
                                title: '설정 > 앱권한에서 위치정보 이용동의를 하셔야 이용 가능합니다.'
                            }, self.$searchCurrentButton[0]);
                        } else {
                            self.searchResultMode = false;

                            self.latitude = self.defaultLatitude;
                            self.longitude = self.defaultLongitude;
                            
                            self._loadStoreData();
                        }	
                        //setAppLocation('37.55401,126.97486');
            		}
                }	
            };
            
            var obj ={
                title:'센터찾기 위치 정보 수집 이용 동의', 
                typeClass:'type2', 
                okBtnName: '동의',
                cancelBtnName: '동의 안함',
                ok : function (){
                    searchCurrentSearch();
                },
                cancel: function() {
                    if(init) {
                        cookie.setCookie("geoAgreeCancel", 'Y', 1);
                        cookie.deleteAllCookie('geoAgree');
                    }

                    lgkorUI.alert('현재 위치를 찾을 수 없습니다.', {
                        title: '현재 위치 정보',
                        typeClass: 'type2',
                        ok: function() {
                            if (init) {
                                self.searchResultMode = false;

                                self.latitude = self.defaultLatitude;
                                self.longitude = self.defaultLongitude;
                                
                                if (self.isLogin) {
                                    self._setUserAdressSearch(true);
                                } else {
                                    self._loadStoreData();
                                }
                            }
                        }
                    });
                }};
            
            if (!isApp()) {
                var desc = '<p style="text-align:left;">LG전자 주식회사(이하 \'회사\'라 합니다)는 고객님께서 현재 계신 위치에서 직선 거리 기준으로 가장 가까운 센터를 안내하기 위하여 위치정보를 수집하고 있습니다. <br><br>또한 상기 서비스 제공 후 즉시 폐기되며, 별도 저장되지 않습니다. <br><br>위치정보 수집이용 관련하여 보다 상세한 내용은 ‘<a href="https://qt-kr.m.lgaccount.com/customer/terms_detail?terms_type=A_ITG_LBS&terms_svcCode=SVC709&country=KR&terms_publish=N&division=noticeterms" target="_blank" title="새창으로 열림" style="text-decoration:underline;">LG전자 위치기반서비스 이용약관</a>’을 참고해주시기 바랍니다. <br><br>고객님의 현재 계신 위치 정보 제공에 동의하시겠습니까?</p>';

	            if (!cookie.getCookie('geoAgree')) {
	                lgkorUI.confirm(desc, obj);
	            } else {
	                searchCurrentSearch();
	            }
            } else {
            	getAppCurrentLocation();
        	}
            
        },

        // 지하철역 검색...
        _setSubwaySearch: function(){
            var self = this;
            var keyword = self.$subwayStationSelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.schReaultTmplID = "subwaySearch";
                self.searchResultMode = true;

                self._loadStoreData();
                self._showResultLayer();
            } else{
                lgkorUI.alert("", {
                    title: "지하철 검색의 역명을 선택해 주세요."
                });
            }
        },

        // 센터명 검색...
        _setSearch: function(){
            var self = this;
            
            var keyword = self.$address1.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.schReaultTmplID = "search";
                self.searchResultMode = true;
                
                self._loadStoreData();
                self._showResultLayer();
            } else{
                lgkorUI.alert("", {
                    title: '광역 시/도 선택 후<br>센터 명을 입력해주세요.'
                });
            }
        },

        // 주소 검색...
        _setKakaoSearch: function() {
            var self = this;
            
            var keyword = self.$address2.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.schReaultTmplID = "roadSearch";
                self.searchResultMode = true;

                self._loadStoreData();
                self._showResultLayer();
            } else{
                lgkorUI.alert("", {
                    title: "주소찾기 버튼 선택하여 주소 검색 시 확인 가능합니다."
                });
            }
        },

        _setMarkerSelected: function(id){
            var self = this;
            
            var selectedMarker = self.$defaultListLayer.find('li[data-id="' + id + '"]');
            if(!selectedMarker.find('.point').hasClass('on')) selectedMarker.find('.point').addClass('on');
            selectedMarker.siblings().find('.point').removeClass('on');
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
            self.$defaultListLayer.siblings('.no-data').remove();
            
            if (data.length) {
                for(var i=0; i<data.length; i++){
                    var listData = {
                        num: i+1,
                        shopName: data[i].info.shopName,
                        bizHours: data[i].info.bizHours,
                        bizStatus: data[i].info.bizStatus,
                        serviceProduct: data[i].info.serviceProduct,
                        shopAdress: data[i].info.shopAdress,
                        shopID: data[i].info.shopID,
                        selected: data[i].info.selected ? " on" : ""
                    }

                    var list = vcui.template(searchListTemplate, listData);
                    self.$defaultListLayer.append(list);
                }
                self.$defaultListLayer.show();
            } else {
                self.$defaultListLayer.hide();
                self.$defaultListLayer.after(noDataTemplate);
            }
        },

        _setItemPosition: function(){
            var self = this;
            var $selectItem = self.$defaultListLayer.find('> li .point.on');

            if ($selectItem.length) {
                var $parent = $selectItem.closest('li');
                var $scrollwrap = self.$defaultListContainer.find('.scroll-wrap');
                var itemtop = $parent.position().top;

                if (!vcui.detect.isMobile) {
                    $scrollwrap.mCustomScrollbar("scrollTo", $parent, {timeout: 220});
                } else {
                    $scrollwrap.stop().animate({scrollTop: itemtop}, 220);
                }

                if (window.innerWidth < 1025 && self.$container.hasClass('show-map') && !self.$container.hasClass('result-map')) {
                    $('html, body').stop().animate({
                        scrollTop :self.$container.offset().top 
                    })
                }
            }
        },

        _returnSearchMode: function(){
            var self = this;

            if(self.isChangeMode){
                self.isChangeMode = false;
                self.searchResultMode = false;

                self.$searchContainer.css('display', 'block');

                $('.result-list-box').stop().transition({opacity:0, y:100}, 350, "easeInOutCubic");

                var titheight = self.$leftContainer.find('> .tit').outerHeight(true);
                var scheight = self.$searchContainer.outerHeight(true);
                self.$defaultListContainer.transition({top:titheight+scheight}, 420, "easeInOutCubic", function(){
                    $('.result-list-box').css('display', 'none');

                    self.$defaultListContainer.css({position:'relative', top:0});

                    self._setListArea();
                });
                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
            };
        },

        _setSearchResultMode: function(){
            var self = this;

            if(!self.isChangeMode){
                self.isChangeMode = true;
                self._setListArea();
                self._setResultText();
                /* 
                var listop = self.$defaultListContainer.position().top;

                $('.result-list-box').stop().css({display:'block', opacity:0, y:100}).transition({opacity:1, y:0}, 410, "easeInOutCubic");
                
                var resultheight = $('.result-list-box').outerHeight() + 48;
                self.$defaultListContainer.css({position:'absolute', top:listop}).transition({top:resultheight}, 420, "easeInOutCubic", function(){
                    self.$searchContainer.css('display', 'none');
                });

                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
                 */
                self._showResultLayer();
            }
        },

        _setResultText: function(){
            var self = this;

            var searchResultVal = {
                search: $('#address1').val(),
                localSearch: $('#select1 option:selected').text() + ($('#select2').val() ? ' ' + $('#select2 option:selected').text() : ''),
                roadSearch: '',
                subwaySearch: $('#select5').val(),
                userAddressSearch:'',
                currentSearch: ''
            };

            var resultxt = vcui.template(searchResultText[self.schReaultTmplID], {
                keyword: searchResultVal[self.schReaultTmplID],
                total: self.$defaultListLayer.find('> li').length.toString()
            });
            
            self.$searchResultContainer.find('.result-txt').html(resultxt)
        },

        //리스트 컨테이너 높이 설정...스크롤영역
        _setListArea: function(){
            var self = this;

            var top = $('.container').position().top;
            var titheight = self.$leftContainer.find('> .tit').outerHeight(true);
            var scheight = self.$searchContainer.outerHeight(true);
            // var optheight = self.$optionContainer.height();
            var resultheight = $('.result-list-box').height();
            var paddingtop = parseInt(self.$defaultListContainer.find('.sch-list').css('padding-top'));
            
            var listheight;
            if(self.searchResultMode){
                // listheight = self.windowHeight - resultheight - optheight - paddingtop;
                listheight = self.windowHeight - resultheight - paddingtop;
            } else{
                listheight = self.windowHeight - titheight - scheight - paddingtop;
            }
        },

        _showResultLayer : function(){
            var self = this;
            var $mapContainer = $('.map-container');

            self.$leftContainer.addClass('active');
            $('.store-map-con').addClass('active');
            self.$leftContainer.find('.store-list-box').hide().stop().fadeIn();
            $('.map-container').addClass('result-map');
            if( window.innerWidth < 768) {
                $('.page-header').hide();
                $('.waiting-state').hide()
                $('html,body').scrollTop(0);
            } else {
                $('html,body').stop().animate({
                    scrollTop : $('.map-container').offset().top
                }, 400)
            }
        },

        // 리사이즈 시 .store-map-con 위치 다시 계산

        //검색 시 .store-list-box, .store-map-con 위치 계산
        _calculationTop : function() {
            
        },

        //모바일 지도보기 클릭 시 맵 높이 설정
        _setMobileMapCon: function() {

        },

        _resize: function(){
            var self = this;

            self.windowWidth = self.$container.width();
            self.windowHeight = $(window).height();

            var mapwidth, mapheight, mapmargin;

            if(self.windowWidth < 1025){
                mapmargin = 0;
                mapwidth = self.windowWidth;
                mapheight = 400;

                if( self.$leftContainer.hasClass('active') ) {
                    $('.page-header:visible').hide();
                    $('.waiting-state:visible').hide();
                }
            } else{
                if( self.$leftContainer.hasClass('active') ) {
                    $('.waiting-state:hidden').show();
                }

                if(self.$leftContainer.hasClass('close')){
                    mapmargin = 0;
                } else{
                    mapmargin = self.$leftContainer.width();
                }
                
                mapwidth = self.windowWidth - mapmargin;
                mapheight = $('.map-container').height();
            }

            self.$mapContainer.css({
                width: mapwidth,
                height: mapheight,
                marginLeft: mapmargin
            });

            if(self.$map) self.$map.resize(mapwidth, mapheight);
        }
    }

    $(window).ready(function(){
        searchShop.init();

        $('.waiting-state .btn-waiting-toggle').on('click', function(){
            var $this = $(this);
            var $wrap = $this.closest('.waiting-state');

            if( $wrap.hasClass('hidden')) {
                $wrap.removeClass('hidden')
                $this.find('.blind').text('접기')
            } else {
                $wrap.addClass('hidden')
                $this.find('.blind').text('펼치기')
            }
        })

         // PC버전으로 돌아가면 지도 영역 스타일 초기화
         $(window).resize(function() {
            if ($(window).width() > 767) {
                $('.waiting-state').removeAttr('style');
            }
            if ($(window).width() > 1024) {
                $('.store-map-con').removeAttr('style');
                var toggle = searchShop.$leftContainer.find('.btn-view');
                if(toggle.hasClass('list')){
                    toggle.removeClass("list").addClass('map').find('span').text('지도보기');
                    $('.map-container').removeClass('show-map');
                }
            }
            searchShop._resize()
        });
    });
})();