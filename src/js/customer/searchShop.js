(function(){


    var searchResultText = {
        search: '<strong>"{{keyword}}"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
        local: '<strong>"{{keyword}}"</strong>와 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
        subway: '<strong>"{{keyword}}역"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.'
    };

    var localOptTemplate = '<option value="{{value}}" data-code-desc="{{codeDesc}}">{{title}}</option>';

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
                    '<div class="etc-info">'+
                        '<span class="tel">'+
                            '<span class="blind">전화번호</span>'+
                            '{{shopTelphone}}'+
                        '</span>'+
                        '<a href="#{{shopID}}" class="btn-detail">상세보기</a>'+
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

            self.isChangeMode = false;
            self.searchResultMode = false;

            self.configUrl = $('.map-container').data("config"); 

            self.bestShopUrl = "";
            self.localUrl = "";
            self.subwayUrl = "";
            self.stationUrl = "";
            self.detailUrl = "";

            self.storeData = [];

            self.$leftContainer = $('.store-list-wrap'); //좌측 검색&리스트 컨테이너...

            self.$defaultListContainer = self.$leftContainer.find('.list-wrap'); //리스트 컨테이너...
            self.$defaultListLayer = self.$defaultListContainer.find('.sch-list .scroll-wrap .list-item'); 

            self.$searchContainer = self.$leftContainer.find('.sch-box');

            self.$map = null; //맵 모듈...
            self.$mapContainer = $('.map-area'); //맴 모듈 컨테이너...
            
            self.$optionContainer = $('.opt-cont'); //옵션 컨테이너...

            //검색...
            self.searchKeyword = "";
            self.searchType = "local";

            self.userAddressX = "";
            self.userAddressY = "";

            self.currentLatitude = "";
            self.currentLongitude = "";

            self.loginUrl = "";

            self.shopID = "";

            self.isUserAddressClick = false;

            self.isSalesCode = false;
            self.isReloadSalesCode = false;

            self.applyOptions;
            self.defaultOptions = self._getOptions();

            self.$searchField = $('#tab3 .input-sch input');
            self.$searchButton = $('#tab3 .btn-search');

            self.$searchResultContainer = $('.result-list-box');

            self._resize();
            
            vcui.require(['ui/storeMap', 'ui/tab', 'ui/selectbox'], function () {
                self.bestShopUrl = $('.map-container').data("bestShop");
                self.localUrl = $('.map-container').data("localList");
                self.subwayUrl = $('.map-container').data("subwayList");
                self.stationUrl = $('.map-container').data("stationList");
                self.detailUrl = $('.map-container').data("detail");
                self.userAddress = $('.map-container').data("userAddress");
                self.currentLatitude = $('.map-container').data("latitude");
                self.currentLongitude = $('.map-container').data("longitude");
                self.loginUrl = $('.map-container').data("loginUrl");
                self.shopID = $('.map-container').data("shopId");
                self.salesCode = $('.map-container').data("salesCode");

                self.$mapContainer.vcStoreMap({
                    keyID: $('.map-container').data("mapId"),
                    appKey: $('.map-container').data("appKey"),
                    longitude : self.currentLongitude,
                    latitude: self.currentLatitude
                }).on('mapinit', function(e, data){
                    self.$map = self.$mapContainer.vcStoreMap('instance');
                    
                    self._resize();
                    
                    self._loadStoreData(false, data, self.salesCode);                  

                    self._bindEvents();
                }).on('mapchanged', function(e, data){	
                    //self.$defaultListContainer.find('.scroll-wrap').scrollTop(0);
                    self._setItemList(data);
                    self._setItemPosition();                        

                    if(self.searchResultMode){
                        self._setSearchResultMode();
                    }

                }).on('changemarkerstatus', function(e, id){
                    self._setMarkerSelected(id);
                }).on('maperror', function(e, error){
                    console.log(error);
                });

                $(".sch-box .tabs-wrap").vcTab()
                .on("tabchange", function(e, data){
                    self._setListArea();
                    self._setTabInit();
                    
                    self.searchType = searchTypeNames[data.selectedIndex];
                });

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
			});
        },

        _bindEvents: function(){
            var self = this;

            self.$optionContainer.on('click', '.btn-sel', function(e){
                e.preventDefault();

                self._toggleOptContainer();
            });

            self.$defaultListLayer.on('click', 'li > .ui_marker_selector', function(e){
                var $target = $(e.currentTarget);
                var id = $target.parent().data('id');
                
                self.$map.selectedMarker(id);
            })
            .on('click', 'li > .ui_marker_selector .btn-detail', function(e){
                e.preventDefault();

                var id = $(this).attr("href").replace("#", "");
                void(window.open(self.detailUrl+id, "_blank", "width=1070, height=" + self.windowHeight + ", scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));
            });

            self.$searchField.on('focus', function(e){
                $(window).on('keyup.searchShop', function(e){
                    if(e.keyCode == 13) self._setSearch();
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
                lgkorUI.requestAjaxData(self.subwayUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayLineSelect, {title:"호선 선택", value:""}, "code");
                });
            });
            self.$subwayLineSelect.on('change', function(e){
                lgkorUI.requestAjaxData(self.stationUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayStationSelect, {title:"역 선택", value:""}, "codeName");
                });
            });
            self.$searchSubwayButton.on('click', function(e){
                self._setSearch();
            });

            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
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

        _loadStoreData: function(userAddressAbled, userLocation, salescode){
            var self = this;

            var keywords = self._getKeyword(userAddressAbled);
            if(userLocation && userLocation.lat){
                console.log("### userLocation ###", userLocation)
                keywords.latitude = userLocation.lat;
                keywords.longitude = userLocation.long;
            }

            if(salescode){
                self.isSalesCode = true;

                keywords.salesCode = salescode;
                keywords.userAddress = self.userAddress;
            }

            self.applyOptions = self._getOptions();

            self._sendKeywordData(keywords, userLocation);
        },
        
        _sendKeywordData: function(keywords, userLocation){
            var self = this;

            console.log("### _loadStoreData ###", keywords)
            lgkorUI.requestAjaxData(self.bestShopUrl, keywords, function(result){
                if(result.data.length){
                    self.storeData = vcui.array.map(result.data, function(item, index){
                        item['id'] = item['shopID']; //info.shopID || agCode    
                        item['info'] = false;
                        item["selected"] = false;
                        item["detailUrl"] = 'javascript:void(window.open("' + self.detailUrl+item['shopID'] + '", "_blank", "width=1070, height=' + self.windowHeight + ', scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"))';
                        return item;
                    });
                    self.$map.applyMapData(self.storeData, self.searchType, {lat: self.currentLatitude, long:self.currentLongitude});

                    self.isSalesCode = false;
                    self.isReloadSalesCode = false;
                } else{
                    if(self.isSalesCode){
                        if(self.isReloadSalesCode){
                            self.isSalesCode = false;
                            self.isReloadSalesCode = false;

                            self._loadStoreData(false, userLocation);
                        } else{
                            lgkorUI.confirm("10Km이내에서 매장을 검색하지 못했습니다. <br>거리기준을 20Km를 기준으로 확장하여 매장을 검색 해보시겠습니까?", {
                                title: "",
                                cancelBtnName: "아니오",
                                okBtnName: "네",
                                ok: function(){
                                    self.isReloadSalesCode = true;
    
                                    keywords.dist = 20;
                                    self._sendKeywordData(keywords);
                                },
                                cancel: function(){
                                    self._loadStoreData(false, userLocation); 
                                }
                            });
                        }
                    }
                }
            });
        },

        _loadLocalAreaList: function(val){
            var self = this;
            
            lgkorUI.requestAjaxData(self.localUrl, {city:encodeURI(val)}, function(result){
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
                    if(values[idx] != "") self.$optionContainer.find('input[name=' + values[idx] + ']').prop('checked', true);
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
                if($(item).prop('checked')) checked.push($(item).attr('name'));
            });

            return checked.join("|");
        },

        _setOptINIT: function(){
            var self = this;

            self._setDefaultOption();
        },

        _setOptApply: function(){
            var self = this;

            self._toggleOptContainer();

            self._loadStoreData();
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
                } else{
                    optop = self.$optionContainer.position().top;

                    self._applyOptionChecked();

                    self.$optionContainer.addClass('open');

                    self.$optionContainer.stop().css({y:optop}).transition({y:0}, 350, "easeInOutCubic", function(){self.isTransion=false;});
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
        
                    self.$map.resize(self.windowWidth, self.$defaultListContainer.height());
                } else{
                    toggle.removeClass("list").addClass('map').find('span').text('지도보기');
    
                    $('.store-map-con').stop().transition({x:self.windowWidth}, 350, "easeInOutCubic", function(){self.isTransion = false;})
                }
            }
        },

        _getKeyword: function(userAddressAbled){
            var self = this;

            var userAddressPoint;
            if(userAddressAbled){
                userAddressPoint = self.userAddressX + "," + self.userAddressY;
            } else{
                userAddressPoint = ""
            }

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

                userAddressPoint: userAddressPoint,

                storeCompanyCode: optdata.storeCompanyCode,
                serviceCenterType: optdata.serviceCenterType,
                storeFormType: optdata.storeFormType,
                storeType: optdata.storeType,
                etcType: optdata.etcType,

                shopId: self.shopID
            }
            self.shopID = "";

            return keywords;
        },

        //검색...
        _setSearch: function(){
            var self = this;
            var keyword, trim;


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


            switch(self.searchType){
                case "local":
                    if(self._searchFieldValidation(self.$citySelect, "시/도를 선택해주세요.")){
                        if(self._searchFieldValidation(self.$boroughSelect, "구/군을 선택해주세요.")){
                            self.searchResultMode = true;
                            
                            self._loadStoreData();
                        }
                    }
                    break;

                case "subway":
                    if(self._searchFieldValidation(self.$subwayCitySelect, "지역을 선택해주세요.")){
                        if(self._searchFieldValidation(self.$subwayLineSelect, "지하철 호선을 선택해주세요.")){
                            if(self._searchFieldValidation(self.$subwayStationSelect, "지하철역을 선택해주세요.")){
                                self.searchResultMode = true;
                
                                self._loadStoreData();
                            }
                        }
                    }
                    break;

                case "search":
                    if(self._searchFieldValidation(self.$searchField, "검색어를 입력해주세요.")){
                        self.searchResultMode = true;
        
                        $(window).off('keyup.searchShop');
        
                        self._loadStoreData();
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
                if(self.userAddressX == ""){
                    self.$map.getAdressPositions(self.userAddress, function(result){
                        if(result.success == "Y"){
                            self.userAddressX = result.pointx;
                            self.userAddressY = result.pointy;

                            if (self.userAddressX){
                                self.isUserAddressClick = true;
                                self.searchResultMode = true;
                                self._loadStoreData(true);
                            }
                        } else{
                            console.log(result.errMsg)
                        }
                    });
                } else{
                    self.isUserAddressClick = true;
                    self.searchResultMode = true;
                    self._loadStoreData(true);
                }
            } else{
                if(self.loginUrl == ""){
                    lgkorUI.alert("", {
                        title:'등록된 주소 정보가 없습니다.'
                    });
                } else{
                    location.href = self.loginUrl;
                }
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

            if(data.length){
                for(var i=0; i<data.length; i++){
                    var listData = {
                        num: i+1,
                        shopName: data[i].info.shopName,
                        bizHours: data[i].info.bizHours,
                        flagInfo: data[i].info.flagInfo,
                        shopAdress: data[i].info.shopAdress,
                        shopTelphone: data[i].info.shopTelphone,
                        shopID: data[i].info.shopID,
                        selected: data[i].info.selected ? " on" : ""
                    }
                    var list = vcui.template(searchListTemplate, listData);
                    self.$defaultListLayer.append(list);
                }
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

            if(self.isChangeMode){
                self.isChangeMode = false;
                self.searchResultMode = false;
                
                self.$searchContainer.stop().transition({opacity:1}, 320, "easeInOutCubic");

                $('.result-list-box').stop().css({display:'none'})
            
                
                $('.store-list-wrap .tit').show();
                self.$searchContainer.css('display', 'block');
                self.$defaultListContainer.css({paddingTop:0, opacity:0}).animate({opacity:1}, 300);

                self._setListArea();

                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
            };
        },

        _setSearchResultMode: function(){
            var self = this;

            self._setResultText();

            if(!self.isChangeMode){
                self.isChangeMode = true;

                self.$searchContainer.stop().transition({opacity:0}, 320, "easeInOutCubic");

                $('.store-list-wrap .tit').hide();
                self.$searchContainer.css('display', 'none');

                $('.result-list-box').stop().css({display:'block', opacity:0}).transition({opacity:1}, 410, "easeInOutCubic");
                
                var paddingtop = 0;
                if($(window).innerWidth() < 1025){
                    var resultop = $('.result-list-box').position().top;
                    var resultheight = $('.result-list-box').outerHeight(true);
                    var listop = self.$defaultListContainer.offset().top;

                    paddingtop = resultop + resultheight - listop;
                }

                self.$defaultListContainer.css({paddingTop:paddingtop, opacity:0}).animate({opacity:1}, 300);

                self._setListArea();
                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
            }
        },

        _setResultText: function(){
            var self = this;

            var keywords = self._getKeyword();
            var searchKeyword;
            if(self.searchType == "local"){
                if(!self.isUserAddressClick){
                    var cityname = self.$citySelect.find('option[value=' + keywords.searchCity + ']').text();
                    var borough = self.$boroughSelect.find('option[value=' + keywords.searchBorough + ']').text();
                    searchKeyword = cityname + " " + borough;
                }else searchKeyword = self.userAddress;
            } else if(self.searchType == "subway"){
                var stationame = self.$subwayStationSelect.find('option[value=' + keywords.searchSubwayStation + ']').text();
                searchKeyword = stationame;
            } else{
                searchKeyword = keywords.searchKeyword;
            }

            var total = self.$defaultListLayer.find('> li').length;
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

            var top = $('.container').position().top;
            var titheight = self.$leftContainer.find('> .tit').outerHeight(true);
            var scheight = self.$searchContainer.outerHeight(true);
            var optheight = self.$optionContainer.height();
            var resultheight = $('.result-list-box').height();
            var listop = self.$defaultListContainer.offset().top;
            var listpaddingtop = parseInt(self.$defaultListContainer.css('padding-top'));
            var paddingtop = parseInt(self.$defaultListContainer.find('.sch-list').css('padding-top'));

            var listheight;
            if(self.searchResultMode){
                listheight = self.windowHeight - listop - listpaddingtop - paddingtop - optheight;
            } else{
                listheight = self.windowHeight - listop - paddingtop - optheight;
            }
            
            self.$defaultListContainer.find('.scroll-wrap').height(listheight);
        },

        _resize: function(){
            var self = this;

            self.windowWidth = $(window).innerWidth();
            self.windowHeight = $(window).innerHeight();

            self._setListArea();

            var listwidth = self.$leftContainer.width();
            var mapwidth, mapheight, mapmargin;
            if(window.breakpoint.isMobile){
                mapmargin = 0;
                mapwidth = self.windowWidth;

                mapheight = self.$defaultListContainer.height();
            } else{
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

            if(self.$map) self.$map.resize(mapwidth, mapheight);
        }
    }

    $(window).ready(function(){
        searchShop.init();
    });
})();