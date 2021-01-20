(function(){


    var searchResultText = {
        search: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        localSearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        roadSearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.',
        subwaySearch: '검색결과 <strong>{{total}}개</strong>의 센터가 있습니다.'
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

                        '{{#if bizStatus}}'+
                        '<div class="status-icon {{bizStatus.bizStatusClass}}">'+
                            '<span class="blind">{{bizStatus.bizStatusColor}} 표기</span>'+
                            '<strong class="status">{{bizStatus.bizStatusText}}</strong>'+
                        '</div>'+
                        '{{/if}}'+

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
                        '<ul class="optionIcon">'+
                            '<li>'+
                                '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                            '</li>'+
                            '<li>'+
                                '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                            '</li>'+
                            '<li>'+
                                '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                            '</li>'+
                            '<li>'+
                                '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+

                '</div>'+
            '</div>'+
        '</li>';

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
            self.$optionContainer.find('.all-chk input[type=checkbox]').attr('checked', true);

            //검색...
            self.searchKeyword = "";
            self.schReaultTmplID = "";

            self.$searchField = $('#tab3 .input-sch input');
            self.$searchButton = $('#tab3 .btn-search');

            self.$searchResultContainer = $('.result-list-box');

            self._resize();
            
            vcui.require(['ui/storeMap', 'ui/tab', 'ui/selectbox'], function () {
                lgkorUI.requestAjaxData(self.configUrl, {}, function(result){
                    self.bestShopUrl = result.data.bestShopUrl;
                    self.localUrl = result.data.localListUrl;
                    self.subwayUrl = result.data.subwayListUrl;
                    self.stationUrl = result.data.stationListUrl;
                    self.detailUrl = result.data.detailPageUrl;
                    self.userAdressCheckedUrl = result.data.userAdressCheckedUrl;

                    self.$mapContainer.vcStoreMap({
                        keyID: result.data.mapID,
                        appKey: result.data.appKey,
                        longitude : result.data.basicPosition.longitude,
                        latitude: result.data.basicPosition.latitude,
                        templates: {
                            infoWindow: 
                            '<div class="info-overlaybox">'+
                            '   <div class="inner">'+
                            '       <p class="name">{{shopName}}</p>'+
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
                            '<ul class="optionIcon">'+
                                '<li>'+
                                    '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                                '</li>'+
                                '<li>'+
                                    '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                                '</li>'+
                                '<li>'+
                                    '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                                '</li>'+
                                '<li>'+
                                    '<div class="dummy" style="background-color: rgba(255, 0, 0, 0.2);display: block;width: 48px;height: 48px;"></div>'+
                                '</li>'+
                            '</ul>'+
                            '       <div class="btn-group">'+
                            '           <a href="#n" class="btn border size">방문 예약</a>'+
                            '           <a href="#{{shopID}}" class="btn border size detail-view">상세 보기</a>'+
                            '       </div>'+
                            '   </div>'+
                            '</div>'
                        }
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
                });

                $(".sch-box .tabs-wrap.ui_store_search_tab").vcTab()
                .on("tabchange", function(e, data){
                    self._setListArea();

                    self._setTabInit();
                });

                self.$citySelect = $('.select1');
                self.$boroughSelect = $('.select2');
                self.$localSearchButton = $('.search-local');
                self.$searchUserAdressButton = $('.search-userAdress');
                
                self.$subwayCitySelect = $('#select3');
                self.$subwayLineSelect = $('#select4');
                self.$subwayStationSelect = $('#select5');
                self.$searchSubwayButton = $('.search-subway');
                // self.$searchAddress = $('#search_address');
                self.$citySelect2 = $('#select6');
                self.$areaSelect = $('#select7');
                self.$secterSelect = $('#select8');
                self.$searchAddressButton = $('.search-address-btn');
                self.$searchAddressButton2 = $('.search-address-btn2');
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
                self._setLocalSearch();
            });
            self.$searchUserAdressButton.on('click', function(e){
                self._setUserAdressSearch();
            });
            $('#select1').on('change', function(e){
                $('#select2').prop('disabled', false);
            });
            $('#select2').on('change', function(e){
                $('.search-local').prop('disabled', false);
            });
            self.$searchAddressButton.on('click', function(e){
                self._loadLocalAreaList2(e.target.value);
                self.$citySelect2.prop('disabled', false);
                self.$citySelect2.vcSelectbox('update');
                self.$areaSelect.prop('disabled', false);
                self.$areaSelect.vcSelectbox('update');
                self.$secterSelect.prop('disabled', false);
                self.$secterSelect.vcSelectbox('update');
                self.$searchAddressButton2.prop('disabled', false);
            });
            self.$citySelect2.on('change', function(e){
                self._loadLocalAreaList2();
            });
            self.$areaSelect.on('change', function(e){
                self._loadLocalAreaList3();
            });
            self.$searchAddressButton2.on('click', function(e){
                self._setUserAdressSearch();
            });

            self.$subwayCitySelect.on('change', function(e){
                lgkorUI.requestAjaxData(self.subwayUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayLineSelect, {title:"호선 선택", value:""}, "code");
                });
                self.$subwayLineSelect.prop('disabled', false);
            });
            self.$subwayLineSelect.on('change', function(e){
                lgkorUI.requestAjaxData(self.stationUrl, {codeType:'SUBWAY', pcode:e.target.value}, function(result){
                    self._setSubwayOption(result.data, self.$subwayStationSelect, {title:"역 선택", value:""}, "codeName");
                });
                self.$subwayStationSelect.prop('disabled', false);
            });
            self.$subwayLineSelect.on('change', function(e){
                self.$searchSubwayButton.prop('disabled', false);
            });
            self.$searchSubwayButton.on('click', function(e){
                self._setSubwaySearch();
            });
            
            $('.option-confirm-btn').on('click', function(e){
                self._setOptApply();
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
            self.$citySelect2.val();
        },

        _loadStoreData: function(){
            var self = this;
            var param = $.extend(self._getKeyword(), self.optionData);

            lgkorUI.requestAjaxDataPost(self.bestShopUrl, param, function(result){
                self.storeData = vcui.array.map(result.data, function(item, index){
                    item['id'] = item['shopID']; //info.shopID || agCode    
                    item['info'] = false;
                    return item;
                });
                self.$map.applyMapData(self.storeData);

                self.userCityName = self.userBoroughName = "";
            });
        },

        _loadLocalAreaList: function(val){
            var self = this;

            lgkorUI.requestAjaxData(self.localUrl, {pcode:encodeURI(val),codeType:'CITY'}, function(result){
                self._setSelectOption(self.$boroughSelect, result.data);
                self.$boroughSelect.vcSelectbox('update');
            });
        },

        _loadLocalAreaList2: function(val){
            var self = this;
            lgkorUI.requestAjaxData(self.localUrl, {city:encodeURI(val)}, function(result){
                self._setSelectOption(self.$areaSelect, result.data);
                self.$areaSelect.vcSelectbox('update');
                self._setSelectOption(self.$secterSelect, result.data);
                self.$secterSelect.vcSelectbox('update');
            });
        },

        _loadLocalAreaList3: function(val){
            var self = this;
            lgkorUI.requestAjaxData(self.localUrl, {city:encodeURI(val)}, function(result){
                self._setSelectOption(self.$secterSelect, result.data);
                self.$secterSelect.vcSelectbox('update');
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

        _getKeyword: function(){
            var self = this;

            var keywords = {
                searchKeyword: self.$searchField.val(),
                searchCity: self.userCityName ? self.userCityName : self.$citySelect.val(),
                searchBorough: self.userBoroughName ? self.userBoroughName : self.$boroughSelect.val(),
                searchSubwayLocal: self.$subwayCitySelect.val(),
                searchSubwayLine: self.$subwayLineSelect.val(),
                searchSubwayStation: self.$subwayStationSelect.val()
            }
            console.log("keywords :", keywords)

            return keywords;
        },

        //검색...
        _setSearch: function(){
            var self = this;
            
            var keyword = self.$searchField.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.schReaultTmplID = "search";
                self.searchResultMode = true;

                $(window).off('keyup.searchShop');

                self._loadStoreData();
            } else{
                lgkorUI.alert("", {
                    title: "검색어를 입력해주세요."
                });
            }
        },

        _setUserAdressSearch: function(){
            var self = this;

            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(self.userAdressCheckedUrl, {}, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    self.userCityName = result.data.userAdress.cityValue;
                    self.userBoroughName = result.data.userAdress.boroughValue;
                    self.searchResultMode = true;
                    self.schReaultTmplID = "localSearch";

                    self._loadStoreData();
                } else{
                    if(result.data.location && result.data.location != ""){
                        location.href = result.data.location;
                    } else{
                        lgkorUI.alert("", {
                            title: result.data.alert.title
                        });
                    }
                }
            });
        },

        //지역 검색...
        _setLocalSearch: function(){
            var self = this;

            var keyword = self.$boroughSelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.searchResultMode = true;
                self.schReaultTmplID = "localSearch";
                
                self._loadStoreData();
            } else{
                lgkorUI.alert("", {
                    title: "구/군을 선택해주세요."
                });
            }
        },

        _setSubwaySearch: function(){
            var self = this;
            console.log("_setSubwaySearch")
            var keyword = self.$subwayStationSelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                self.schReaultTmplID = "subwaySearch";
                self.searchResultMode = true;

                self._loadStoreData();
            } else{
                lgkorUI.alert("", {
                    title: "지하철 검색의 역명을 선택해 주세요."
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
            
             for(var i=0; i<data.length; i++){
                 var listData = {
                     num: i+1,
                     shopName: data[i].info.shopName,
                     bizHours: data[i].info.bizHours,
                     bizStatus: data[i].info.bizStatus,
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

            var resultxt = vcui.template(searchResultText[self.schReaultTmplID], {
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