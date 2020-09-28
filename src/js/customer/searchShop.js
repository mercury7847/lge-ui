(function(){

    var cityArr = [
        {title:'시/도선택', value:''},
        {title:'서울', value:'서울'},
        {title:'인천', value:'인천'},
        {title:'부산', value:'부산'},
        {title:'대구', value:'대구'},
        {title:'대전', value:'대전'},
        {title:'광주', value:'광주'},
        {title:'울산', value:'울산'},
        {title:'제주', value:'제주'},
        {title:'경기', value:'경기'},
        {title:'세종', value:'세종'},
        {title:'경남', value:'경남'},
        {title:'경북', value:'경북'},
        {title:'충남', value:'충남'},
        {title:'충북', value:'충북'},
        {title:'전남', value:'전남'},
        {title:'전북', value:'전북'},
        {title:'강원', value:'강원'},
    ];

    var listTemplate = ''+
        '<li data-id="{{agNum}}">'+
        '   <div class="store-info-list ui_marker_selector" role="button">'+
        '        <div class="point-wrap">'+
        '           <div class="point{{selected}}">'+
        '                <span class="num">{{num}}</span>'+
        '                <span class="blind">선탿안됨</span>'+
        '            </div>'+
        '        </div>'+
        '        <div class="info-wrap">'+
        '            <div class="tit-wrap">'+
        '                <p class="name">{{agName}}</p>'+
        '                <div class="flag-wrap">'+
        '                    {{#if agNewShopComment != null }}<span class="flag">NEW</span>{{/if}}'+
        '                    {{#if isEvent}}<span class="flag">이벤트</span>{{/if}}'+
        '                    {{#if agCenterWeekday != null }}<span class="flag">서비스센터</span>{{/if}}'+
        '               </div>'+
        '            </div>'+
        '            <p class="addr">{{agAddr1}}</p>'+
        '            <div class="etc-info">'+
        '                <span class="tel">{{agTel}}</span>'+
        '                <a href="#" class="btn-detail">상세보기</a>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</li>';

    var searchShop = {
        init: function(){
            var self = this;
            
            self._setting();
        },

        _setting: function(){
            var self = this;

            self.windowWidth;
            self.windowHeight;

            self.bestShopUrl = $('.map-container').data("bestshop");

            self.$leftContainer = $('.store-list-wrap'); //좌측 검색&리스트 컨테이너...

            self.$defaultListContainer = self.$leftContainer.find('.list-wrap'); //리스트 컨테이너...
            self.$defaultListLayer = self.$defaultListContainer.find('.sch-list .scroll-wrap .list-item'); 

            self.$searchContainer = self.$leftContainer.find('.sch-box');

            self.$map = null; //맵 모듈...
            self.$mapContainer = $('.map-area'); //맴 모듈 컨테이너...
            
            self.$optionSelector = $('.opt-cont'); //옵션 컨테이너...

            //검색...
            self.$searchField = $('#tab1 .input-sch input');
            self.$searchButton = $('#tab1 .btn-search');
            
            vcui.require(['ui/storeMap'], function () {
				
				self.$mapContainer.vcStoreMap({
                    baseUrl:'',
                    storeDataUrl: self.bestShopUrl
				}).on('mapinit', function(e,data){
                    self.$map = self.$mapContainer.vcStoreMap('instance');
                    
                    self._bindEvents();		

				}).on('mapchanged mapsearch', function(e, data){	
                    
                    self.$defaultListContainer.find('.scroll-wrap').scrollTop(0);
                    self._setItemList(data);
                    self._setItemPosition();

				}).on('mapitemclick', function(e,data){

                    self._setMarkerSelected(data.id);
                    self._setItemPosition();
                    
				}).on('maperror', function(e, error){
					console.log(error);
                });		
			});
        },

        _bindEvents: function(){
            var self = this;

            self.$optionSelector.on('click', '.btn-sel', function(e){
                e.preventDefault();

                console.log("option open")
            });

            self.$defaultListLayer.on('click', 'li > .ui_marker_selector', function(e){
                var $target = $(e.currentTarget);
                var id = $target.parent().data('id');
                
                self.$map.selectedMarker(id);
            })
            .on('click', 'li > .ui_marker_selector .btn-detail', function(e){
                e.preventDefault();

                console.log(e);
                //showDetailInfo(id);  
            });

            self.$searchField.on('focus', function(e){
                $(window).on('keyup.searchShop', function(e){
                    if(e.keyCode == 13) self._setSearch();
                })
            });
            self.$searchButton.on('click', function(e){
                self._setSearch();
            });

            $('#searchWrap').on('click', 'button', function(e){

                
                var city = $('#city').val();
                var secondName;
                var area = $('#area').val();
                var keyword = $('#searchKeyword').val();

                switch(city){
                    case '경남':
                        secondName = '경상남도';
                        break;
                    case '경북':
                        secondName = '경상북도';
                        break;
                    case '전남':
                        secondName = '전라남도';
                        break;
                    case '전북':
                        secondName = '전라남도';
                        break;
                    default:
                        secondName = city;
                }



                if(keyword!==''){
                    arr = vcui.array.filter(arr, function(item, idx){  							
                        return item['agName'].search(keyword) > -1;        
                    });

                    console.log(arr);
                }

                $('#map').vcStoreMap('search', arr);	

            });

            self._resize();
            $(window).trigger('addResizeCallback', self._resize.bind(self));
        },

        _setSearch: function(){
            var self = this;

            var searchWord = self.$searchField.val();
            var trim = searchWord.replace(/\s/gi, '');
            if(trim.length){
                self.$map.search(searchWord);
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
                     agName: data[i].info.agName,
                     agCenterWeekday: data[i].info.agCenterWeekday,
                     agNewShopComment: data[i].info.agNewShopComment,
                     isEvent: self._getEventInfo(data[i].id).length ? true : false,
                     agAddr1: data[i].info.agAddr1,
                     agTel: data[i].info.agTel,
                     agNum: data[i].info.agNum,
                     selected: data[i].info.selected ? " on" : ""
                 }
                 var list = vcui.template(listTemplate, listData);
                 self.$defaultListLayer.append($(list).get(0));
             }
        },

        _setItemPosition: function(){
            var self = this;

            var selectID = -1;
            self.$defaultListLayer.find('> li').each(function(idx, item){
                if($(item).find('.point').hasClass('on')){
                    var scrolltop = $(item).position().top;
                    console.log(scrolltop)
                    self.$defaultListContainer.find('.scroll-wrap').scrollTop(scrolltop);
                }
            })
        },

        //리스트 컨테이너 높이 설정...스크롤영역
        _setListArea: function(){
            var self = this;

            var top = $('.container').position().top;
            var titheight = self.$leftContainer.find('> .tit').outerHeight(true);
            var scheight = self.$searchContainer.outerHeight(true);
            var optheight = self.$optionSelector.height();
            var listheight = self.windowHeight - top - titheight - scheight - optheight;
            
            self.$defaultListContainer.find('.scroll-wrap').height(listheight);
        },

        _resize: function(){
            var self = this;

            self.windowWidth = $(window).width();
            self.windowHeight = $(window).height();

            var listwidth = self.$leftContainer.width();

            self.$mapContainer.css({
                width: self.windowWidth - listwidth,
                'margin-left': listwidth
            });

            self._setListArea();

            self.$map.resize();
        }
    }

    $(window).ready(function(){
        searchShop.init();
    });
})();