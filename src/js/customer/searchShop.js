(function(){


    var searchResultText = {
        search: '<strong>"{{keyword}}"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
        local: '<strong>"{{keyword}}"</strong>와 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.',
        subway: '<strong>"{{keyword}}역"</strong>과 가까운 <strong>{{total}}개</strong>의 매장을 찾았습니다.'
    };

    var localOptTemplate = '<option value={{value}}>{{title}}</option>';

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

                self.$mapContainer.vcStoreMap({
                    keyID: $('.map-container').data("mapId"),
                    appKey: $('.map-container').data("appKey"),
                    longitude : self.currentLongitude,
                    latitude: self.currentLatitude
                }).on('mapinit', function(e,data){

                    self.$map = self.$mapContainer.vcStoreMap('instance');
                    self._loadStoreData();

                    self._bindEvents();
                }).on('mapchanged', function(e, data){	
                    
                    //self.$defaultListContainer.find('.scroll-wrap').scrollTop(0);
                    self._setItemList(data);
                    self._setItemPosition();                        

                    if(self.searchResultMode){
                        self._setSearchResultMode();
                    }

                }).on('mapsearchnodata', function(e){
                    //검색 결과 없을 때...
                    alert("검색 결과가 없습니다.");
                }).on('maperror', function(e, error){
                    console.log(error);
                });

                $(".sch-box .tabs-wrap").vcTab()
                .on("tabchange", function(e, data){
                    self._setListArea();
                    self._setTabInit();
                    
                    self.searchType = searchTypeNames[data.selectedIndex];
                    console.log("self.searchType:", self.searchType)
                });

                self.$citySelect = $('#select1'); //시/도 선택
                self.$boroughSelect = $('#select2'); //구.군 선택
                self.$localSearchButton = $('.search-local'); //지역검색 버튼
                self.$searchUserAdressButton = $('.search-userAdress'); //내 주소 검색 버튼

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
                window.open(self.detailUrl+"?shopID="+id, "_blank", "width=1070, height=" + self.windowHeight + ", location=no, menubar=no, status=no, toolbar=no")
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

        _loadStoreData: function(userAddressAbled){
            var self = this;

            lgkorUI.requestAjaxData(self.bestShopUrl, self._getKeyword(userAddressAbled), function(result){
                self.storeData = vcui.array.map(result.data, function(item, index){
                    item['id'] = item['shopID']; //info.shopID || agCode    
                    item['info'] = false;
                    return item;
                });
                self.$map.applyMapData(self.storeData);
            });
        },

        _loadLocalAreaList: function(val){
            var self = this;
            
            lgkorUI.requestAjaxData(self.localUrl, {city:encodeURI(val)}, function(result){
                self._setSelectOption(self.$boroughSelect, result.data);
                self.$boroughSelect.prop('disabled', false);
                self.$boroughSelect.vcSelectbox('update');

                self.$localSearchButton.prop('disabled', false);
            });
        },

        _setSubwayOption: function(result, select, firstdata, valuekey){
            var self = this;
            var lines = vcui.array.map(result, function(item, idx){
                return {
                    title: item.codeName,
                    value: item[valuekey]
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

        _setDefaultOption: function(){
            var self = this;

            self.$optionContainer.find('input[type=checkbox]').prop('checked', false);
            
            for(var str in self.defaultOptions){
                var values = self.defaultOptions[str].split("|");
                for(var idx in values){
                    console.log(values[idx])
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
            self._loadStoreData();
        },

        _setOptApply: function(){
            var self = this;

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
        
                    self.$map.resize();
                } else{
                    toggle.removeClass("list").addClass('map').find('span').text('지도보기');
    
                    $('.store-map-con').stop().transition({x:self.windowWidth}, 350, "easeInOutCubic", function(){self.isTransion = false;})
                }
            }
        },

        _getKeyword: function(userAddressAbled){
            var self = this;

            var userAddressPoint = userAddressAbled ? self.userAddressX + "," + self.userAddressY : "";

            var optdata = self._getOptions();

            var keywords = {
                searchType: self.searchType,

                searchCity: self.userCityName ? self.userCityName : self.$citySelect.val(),
                searchBorough: self.userBoroughName ? self.userBoroughName : self.$boroughSelect.val(),
                
                searchSubwayLocal: self.$subwayCitySelect.val(),
                searchSubwayLine: self.$subwayLineSelect.val(),
                searchSubwayStation: self.$subwayStationSelect.val(),

                searchKeyword: self.$searchField.val(),

                userAddressPoint: userAddressPoint,

                storeCompanyCode: optdata.storeCompanyCode,
                serviceCenterType: optdata.serviceCenterType,
                storeFormType: optdata.storeFormType,
                storeType: optdata.storeType,
                etcType: optdata.etcType
            }
            console.log("keywords :", keywords)

            return keywords;
        },

        //검색...
        _setSearch: function(){
            var self = this;
            var keyword, trim;
            switch(self.searchType){
                case "local":
                    keyword = self.$boroughSelect.val();
                    trim = keyword.replace(/\s/gi, '');
                    if(trim.length){
                        self.searchResultMode = true;
                        
                        self._loadStoreData();
                    } else{
                        lgkorUI.alert("", {
                            title: "구/군을 선택해주세요."
                        });
                    }
                    break;

                case "subway":
                    keyword = self.$subwayStationSelect.val();
                    trim = keyword.replace(/\s/gi, '');
                    if(trim.length){
                        self.searchResultMode = true;
        
                        self._loadStoreData();
                    } else{
                        lgkorUI.alert("", {
                            title: "지하철 검색의 역명을 선택해 주세요."
                        });
                    }
                    break;

                case "search":
                    keyword = self.$searchField.val();
                    trim = keyword.replace(/\s/gi, '');
                    if(trim.length){
                        self.searchResultMode = true;
        
                        $(window).off('keyup.searchShop');
        
                        self._loadStoreData();
                    } else{
                        lgkorUI.alert("", {
                            title: "검색어를 입력해주세요."
                        });
                    }
                    break;
            }
        },

        _setUserAdressSearch: function(){
            var self = this;

            if(self.userAddress){
                if(self.userAddressX == ""){
                    self.$map.getAdressPositions(self.userAddress, function(result){
                        if(result.success == "Y"){
                            self.userAddressX = result.pointx;
                            self.userAddressY = result.pointy;

                            console.log(self.userAddressX, self.userAddressY);

                            if (self.userAddressX){
                                self._loadStoreData(true);
                            }
                        } else{
                            console.log(result.errMsg)
                        }
                    });
                } else{
                    self._loadStoreData(true);
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

                var listop = self.$defaultListContainer.position().top;

                self._setResultText();
                $('.result-list-box').stop().css({display:'block', opacity:0, y:100}).transition({opacity:1, y:0}, 410, "easeInOutCubic");
                
                var resultheight = $('.result-list-box').height();
                self.$defaultListContainer.css({position:'absolute', top:listop}).transition({top:resultheight}, 420, "easeInOutCubic", function(){
                    self.$searchContainer.css('display', 'none');
                });

                self._setListArea();
                self.$defaultListContainer.find('.scroll-wrap').animate({scrollTop:0}, 120);
            }
        },

        _setResultText: function(){
            var self = this;

            var resultxt = vcui.template(searchResultText[self.searchType], {
                keyword: self.searchKeyword,
                total: self.$defaultListLayer.find('> li').length
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
            

            console.log(top, titheight, scheight, optheight, resultheight)

            var listheight;
            if(self.searchResultMode){
                listheight = self.windowHeight - top - resultheight - optheight - paddingtop - 5;
            } else{
                listheight = self.windowHeight - top - titheight - scheight - optheight - paddingtop - 5;
            }
            
            self.$defaultListContainer.find('.scroll-wrap').height(listheight);
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

                mapheight = self.$defaultListContainer.find('.scroll-wrap').height();
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

            if(self.$map) self.$map.resize();
        }
    }

    $(window).ready(function(){
        searchShop.init();
    });
})();