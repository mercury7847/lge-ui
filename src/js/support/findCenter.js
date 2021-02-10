function moveDetail(el, detailUrl, windowHeight) {
    var id = $(el).attr("href").replace("#", "");
    window.open(detailUrl+"-"+id, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
}

(function(){


    var searchResultText = {
        search: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        localSearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        roadSearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        subwaySearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        userAddressSearch: '내 주소 기준으로 <strong>{{total}}개</strong>의 센터가 있습니다.',
        currentSearch: '내 위치 기준으로 <strong>{{total}}개</strong>의 센터가 있습니다.'
    };

    var localOptTemplate = '<option value="{{code}}">{{codeName}}</option>';
    var noDataTemplate = '<div class="no-data"><p>검색 결과가 없습니다.</p></div>';

    var searchListTemplate = 
        '<li data-id="{{shopID}}">'+
            '<div class="store-info-list ui_marker_selector" role="button" tabindex="0">'+
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
                            '<p class="cell">'+
                                '<a href="#{{shopID}}" class="btn-link">상세보기</a>'+
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
            '</div>'+
        '</li>';
    var addressFinder;
    var cookie = lgkorUI.cookie;

    var searchShop = {
        init: function(){
            var self = this;
            
            self._setting();
            self._setOptData();
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

            self.$leftContainer = $('.store-list-wrap'); //좌측 검색&리스트 컨테이너...

            self.$defaultListContainer = self.$leftContainer.find('.list-wrap'); //리스트 컨테이너...
            self.$defaultListLayer = self.$defaultListContainer.find('.sch-list .scroll-wrap .list-item'); 

            self.$searchContainer = self.$leftContainer.find('.sch-box');

            self.$map = null; //맵 모듈...
            self.$mapContainer = $('.map-area'); //맴 모듈 컨테이너...
            
            self.$optionContainer = $('.opt-cont'); //옵션 컨테이너...
            //self.$optionContainer.find('.all-chk input[type=checkbox]').attr('checked', true);

            //검색...
            self.searchKeyword = "";
            self.schReaultTmplID = "";

            self.$searchResultContainer = $('.result-list-box');

            self._resize();
            
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
                        templates: {
                            infoWindow: 
                            '<div class="info-overlaybox">'+
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
                            '               <dt>평&nbsp;&nbsp;일</dt>'+
                            '               <dd>{{bizHours.week}}</dd>'+
                            '           </dl>'+
                            '           <dl>'+
                            '               <dt>토요일</dt>'+
                            '               <dd>{{bizHours.saturday}}</dd>'+
                            '           </dl>'+
                            '       </div>'+
                            '       {{# if(typeof serviceProduct != "undefined") { #}}' +
                            '       <ul class="opt-list">'+
                            '           {{#each item in serviceProduct}}' +
                            '           <li class="{{item.class}}">'+
                            '               <span class="name">{{item.name}}</span>'+
                            '           </li>' +
                            '           {{/each}}' +
                            '       </ul>'+
                            '       {{# } #}}' +
                            '       <div class="btn-group">'+
                            '           {{#if typeof consultUrl != "undfined"}}'+
                            '           <a href="{{consultUrl}}" class="btn dark-gray size" target="_blank" title="새창 열림">방문 예약</a>'+
                            '           {{/if}}'+
                            '           <a href="#{{shopID}}" class="btn dark-gray size detail-view" onclick="moveDetail(this, \''+self.detailUrl+'\', '+self.windowHeight+');">상세 보기</a>'+
                            '       </div>'+
                            '   </div>'+
                            '</div>'
                        }
                    }).on('mapinit', function(e,data){
                        var params = location.search.substr(location.search.indexOf("?") + 1);
                        var sval = "", temp;
                        params = params.split("&");
                        for (var i = 0; i < params.length; i++) {
                            temp = params[i].split("=");
                            if ([temp[0]] == 'seq') { sval = temp[1]; }
                        }

                        self.$map = self.$mapContainer.vcCenterMap('instance');

                        if (sval) {
                            self._loadStoreData(seq);
                        } else {
                            if (!vcui.detect.isMobile) { // pc device
                                if (!self.isLogin) { // 비로그인
                                    self._loadStoreData();
                                } else { // 로그인
                                    self._setUserAdressSearch(true);
                                }
                            } else { // mobile device
                                if (!self.isLogin) { // 비로그인
                                    self._setCurrentSearch(true);
                                } else { // 로그인
                                    self._setUserAdressSearch(true);
                                }
                            }
                        }

                        self._bindEvents();
                    }).on('mapchanged', function(e, data){
                        self._setItemList(data);
                        self._setItemPosition();                        

                        if(self.searchResultMode){
                            self._setSearchResultMode();
                        }
                    }).on('mapsearchnodata', function(e){
                        alert("검색 결과가 없습니다.");
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
                self.searchCenterName = $('#tab3').find('.btn-search');

                self.$zipCode = $('#zipCode');
                self.$address2 = $('#address2');
                self.$openAddressButton = $('.btn-address');
                self.$searchAddressButton = $('.search-address');
			});
        },

        _bindEvents: function(){
            var self = this;
            
            var activeTabIndex = self.$searchContainer.find('.ui_tab .tabs li.on').index();

            function setStoreClass(index){
                var $storeListWrap = $('.store-list-wrap');
                if( index == 0) {
                    $storeListWrap.addClass('local')
                } else {
                    $storeListWrap.removeClass('local')
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

            self.$optionContainer.on('click', '.btn-sel', function(e){
                e.preventDefault();

                self._toggleOptContainer();
            });

            self.$defaultListLayer.on('click', 'li > .ui_marker_selector', function(e){
                var $target = $(e.currentTarget);
                var id = $target.parent().data('id');
                
                self.$map.selectInfoWindow(id);
            })
            .on('click', 'li > .ui_marker_selector .btn-link', function(e){
                e.preventDefault();

                var id = $(this).attr("href").replace("#", "");
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });

            self.$mapContainer.on('click', '.detail-view', function(e) {
                e.preventDefault();

                var id = $(this).attr("href").replace("#", "");
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });


            self.$searchResultContainer.on('click', '.btn-back', function(e){
                $('.store-list-box').stop().animate({
                    top: $('.map-container').offset().top
                }, function(){
                    self.$leftContainer.removeClass('active');
                    $(this).removeClass('fixed');
                })
                
            });

            self.$searchContainer.on('click', '.btn-view', function(e){
                e.preventDefault();

                self._showMap();
            });

            self.$leftContainer.on('click', '.btn-fold', function(e){
                e.preventDefault();

                self._toggleLeftContainer();
            })

            // 옵션 설정
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
                e.preventDefault();

                self._setOptApply();
            });

            // 지역 검색
            self.$citySelect.on('change', function(e){
                self._loadLocalAreaList(e.target.value);
            });
            self.$localSearchButton.on('click', function(e){
                self._setLocalSearch();
                self.$leftContainer.addClass('active')
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
                    self.searchCenterName.trigger('click');
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
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no");
            });

            self.searchCenterName.on('click', function() {
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
                self._setKakaoSearch();
            });

            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
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
                if (seq) self.$map.selectedMarker(self.storeData[0].id);

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

        _setOptData: function(){
            var self = this;

            self.optionData = {
                serviceProduct: []
            }
            self.$optionContainer.find('.all-chk > dd > dl:nth-child(1) input').each(function(idx, item){
                if($(item).prop('checked')) self.optionData.serviceProduct.push($(item).val());
            });
        },

        _setOptINIT: function(){
            var self = this;

            self.$optionContainer.find('.opt-layer .list-item > dl:first-child .rdo-wrap:first-child input').prop("checked", true);
            self.$optionContainer.find('.opt-layer .list-item > dl:nth-child(2) .rdo-wrap:first-child input').prop("checked", true);
            self.$optionContainer.find('.all-chk dt input[type=checkbox]').prop('checked', true);
            self.$optionContainer.find('.all-chk dd input[type=checkbox]').prop('checked', true);
        },

        _setOptApply: function(){
            var self = this;

            self._setOptData();
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

        _toggleOptContainer: function(){
            var self = this;

            if(!self.isTransion){
                self.isTransion = true;

                var optop;
                var isOpen = self.$optionContainer.hasClass('open');
                if(isOpen){
                    optop = self.$leftContainer.height() - self.$optionContainer.find('.btn-sel').height();
                    self.$optionContainer.stop().transition({y:'calc(100% - 80px)'}, 350, "easeInOutCubic", function(){
                        self.isTransion = false;
                        // self.$leftContainer.find('.dim').remove();
                        self.$optionContainer.removeAttr('style').removeClass('open');
                    });
                } else{
                    optop = self.$optionContainer.position().top;

                    self.$optionContainer.addClass('open');
                    // self.$leftContainer.prepend('<div class="dim"></div>');
                    self.$optionContainer.stop().css({y:'calc(100% - 80px)'}).transition({y:0}, 350, "easeInOutCubic", function(){self.isTransion=false;});
                }
            }
        },

        _toggleLeftContainer: function(){
            var self = this;
            
            self.$leftContainer.toggleClass('close');
            
            self._resize();
        },

        _showMap: function(){
            var self = this;

            if(!self.isTransion){
                self.isTransion = true;
                
                var toggle = self.$searchContainer.find('.btn-view');
                if(toggle.hasClass('map')){
                    var maptop = self.$defaultListContainer.position().top;
                    $('.store-map-con').css({
                        position: 'absolute',
                        visibility: 'visible',
                        top: maptop,
                        left:0,
                        x: self.windowWidth,
                        height: self.$mapContainer.height(),
                        'z-index': 5
                    }).transition({x:0}, 350, "easeInOutCubic", function(){self.isTransion = false;});
        
                    toggle.removeClass("map").addClass('list').find('span').text('리스트보기');
        
                    self.$map.resize();
                } else{
                    toggle.removeClass("list").addClass('map').find('span').text('지도보기');
    
                    $('.store-map-con').stop().transition({x:self.windowWidth}, 350, "easeInOutCubic", function(){self.isTransion = false;})
                }
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
                        latitude:self.latitude,
                        longitude:self.longitude,
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

            var keyword = self.$boroughSelect.val() || self.$citySelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                var callback = function() {
                    self._loadStoreData();
                    self._showResultLayer();
                };

                self.searchResultMode = true;
                self.schReaultTmplID = "localSearch";
                
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
                    self.schReaultTmplID = "localSearch";

                    // self.$map.getAdressPositions(result.data.userAdress, callback);
                    self.searchAddressToCoordinate(result.data.userAdress, callback);
                    !init && self._showResultLayer();
                } else{
                    if (init) {
                        if (!vcui.detect.isMobile) { // pc device
                            self._loadStoreData();
                        } else { // mobile device
                            self._setCurrentSearch(true);
                        }
                    } else {
                        if(result.data.location && result.data.location != ""){
                            location.href = result.data.location;
                        } else{
                            lgkorUI.alert("", {
                                title: result.data.alert.title
                            });
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

                        self._loadStoreData();    
                        !init && self._showResultLayer();
                    }, function(error) {
                        lgkorUI.alert('현재 위치를 찾을 수 없습니다.', {
                            title: '현재 위치 정보',
                            typeClass: 'type2',
                            ok: function() {
                                self.searchResultMode = init ? false : true;

                                self.latitude = self.defaultLatitude;
                                self.longitude = self.defaultLongitude;

                                self._loadStoreData();    
                                !init && self._showResultLayer();
                            }
                        });
                    }); 
                } else {
                    lgkorUI.alert('위치 기반 서비스를 제공하지 않습니다.', {
                        title: '현재 위치 정보',
                        typeClass: 'type2',
                        ok: function() {
                            self.searchResultMode = init ? false : true;

                            self.latitude = self.defaultLatitude;
                            self.longitude = self.defaultLongitude;

                            self._loadStoreData();    
                            !init && self._showResultLayer();
                        }
                    });
                }
            };
            var obj ={
                title:'위치 정보 제공 동의', 
                typeClass:'type2', 
                okBtnName: '동의',
                cancelBtnName: '동의 안함',
                ok : function (){
                    searchCurrentSearch();
                },
                cancel: function() {
                    lgkorUI.alert('현재 위치를 찾을 수 없습니다.', {
                        title: '현재 위치 정보',
                        typeClass: 'type2',
                        ok: function() {
                            self.searchResultMode = init ? false : true;

                            self.latitude = self.defaultLatitude;
                            self.longitude = self.defaultLongitude;

                            self._loadStoreData();    
                            !init && self._showResultLayer();
                        }
                    });
                }};
            var desc = '<p>고객님께서 제공하시는 위치 정보는 현재 계신 위치에서 직선 거리 기준으로 가까운 매장 안내를 위해서만 이용 됩니다. <br><br>또한 상기 서비스 제공  후 즉시 폐기되며, 별도 저장되지 않습니다. <br><br>고객님의 현재 계신 위치 정보 제공에 동의하시겠습니까?</p>';
                
            if (!cookie.getCookie('geoAgree')) {
                lgkorUI.confirm(desc, obj);
            } else {
                searchCurrentSearch();
            }
        },

        // 지하철역 검색...
        _setSubwaySearch: function(){
            var self = this;
            console.log("_setSubwaySearch")
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
                var callback = function() {
                    self._loadStoreData()
                };

                self.schReaultTmplID = "search";
                self.searchResultMode = true;

                // $(window).off('keyup.searchShop');

                self.searchAddressToCoordinate(self.$citySelect2.val(), callback);

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

                // $(window).off('keyup.searchShop');
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

            var selectItem = self.$defaultListLayer.find('> li .point.on');
            if(selectItem.length){
                var parent = selectItem.closest('li');
                var scrollwrap = self.$defaultListContainer.find('.scroll-wrap');
                var scrolltop = scrollwrap.scrollTop();
                var itemtop = parent.position().top;
                var itembottom = -scrolltop + itemtop + parent.height();

                if (!vcui.detect.isMobile) {
                    self.$defaultListContainer.find('.scroll-wrap').mCustomScrollbar("scrollTo", parent, {timeout: 220});
                } else {
                    self.$defaultListContainer.find('.scroll-wrap').stop().animate({scrollTop: itemtop}, 220);
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

            var resultxt = vcui.template(searchResultText[self.schReaultTmplID], {
                keyword: self.searchKeyword,
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
            var optheight = self.$optionContainer.height();
            var resultheight = $('.result-list-box').height();
            var paddingtop = parseInt(self.$defaultListContainer.find('.sch-list').css('padding-top'));
            

            console.log(top, titheight, scheight, optheight, resultheight, paddingtop)

            var listheight;
            if(self.searchResultMode){
                listheight = self.windowHeight - resultheight - optheight - paddingtop;
            } else{
                listheight = self.windowHeight - titheight - scheight - paddingtop;
            }
            
            // self.$defaultListContainer.find('.scroll-wrap').height(listheight);
        },

        _showResultLayer : function(){
            var self = this;
            var $mapContainer = $('.map-container');

            self.$leftContainer.addClass('active');
            if( window.innerWidth < 768) {
                self.$leftContainer.find('.store-list-box').stop().animate({
                    marginTop : -$mapContainer.offset().top
                }, function(){
                    $(this).addClass('fixed');
                    $(this).attr('style', '');
                })
            }
        },

        _resize: function(){
            var self = this;

            self.windowWidth = $(window).width();
            self.windowHeight = $(window).innerHeight();

            self._setListArea();

            var listwidth = self.$leftContainer.width();
            var mapwidth, mapheight, mapmargin;
            if(window.breakpoint.isMobile){
                mapmargin = 0;
                mapwidth = self.windowWidth;

                mapheight = self.$defaultListContainer.find('.sch-list').outerHeight();
                $('.store-list-wrap.active').find('.store-list-box').not('.fixed:animated').addClass('fixed');
            } else{
                $('.store-list-wrap.active').find('.store-list-box').filter('.fixed').not(':animated').removeClass('fixed');
                if(self.$leftContainer.hasClass('close')){
                    mapmargin = 24;
                } else{
                    mapmargin = listwidth;
                }                
                mapwidth = self.windowWidth - mapmargin;            
                mapheight = $('.map-container').height();
            }

            self.$mapContainer.css({
                width: mapwidth,
                height: mapheight,
                'margin-left': mapmargin
            });

            if(self.$map) self.$map.resize();
        }
    }

    $(window).ready(function(){
        searchShop.init();
    });
})();