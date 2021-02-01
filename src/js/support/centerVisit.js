(function() {
    var localOptTemplate = '<option value={{code}}>{{codeName}}</option>';
    var centerTmpl =
        '{{#each (item, index) in listData}}' +
        '<tr>' +
            '<td>' +
                '<div class="rdo-wrap">' +
                    '<input type="radio" name="center" id="rdo{{index+1}}" value="{{item.shopID}}" data-dept-code="{{item.deptCode}}">' +
                    '<label for="rdo{{index+1}}"></label>' +
                '</div>' +
            '</td>' +
            '<td class="info">' +
                '<label for="rdo{{index+1}}">' +
                    '<p class="name">{{item.shopName}}</p>' +
                    '<p class="address">{{item.shopAdress}}</p>' +
                '</label>' +
            '</td>' + 
            '<td>' +
                '<a href="#{{item.shopID}}" class="btn-detail"><span class="blind">상세보기</span></a>' +
            '</td>' + 
        '</tr>' +
        '{{/each}}';
    var topicTmpl = 
        '{{#each (item, index) in topicList}}' +
        '<li>' +
            '<span class="rdo-wrap btn-type3">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
                '{{# } else { #}}' +
                '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}">' +
                '{{# } #}}' +
                '<label for="topic{{index}}"><span>{{item.name}}</span></label>' +
            '</span>' +
        '</li>' + 
        '{{/each}}';
    var subTopicTmpl = 
        '{{#each (item, index) in subTopicList}}' +
        '<li>' +
            '<span class="rdo-wrap">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}" data-error-msg="정확한 세부증상을 선택해주세요." data-required="true" required>' +
                '{{# } else { #}}' +
                '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}">' +
                '{{# } #}}' +
                '<label for="subTopic{{index}}">{{item.name}}</label>' +
            '</span>' +
        '</li>' +
        '{{/each}}';
    var engineerTmpl =
        '{{#each (item, index) in engineerList}}' +
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="engineer-box">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
                '{{# } #}}' +
                '<label for="engineer{{index}}">' +
                    '<div class="img">' +
                        '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                    '</div>' +
                    '<p class="tit">{{item.engineerName}}</p>' +
                    '<p class="desc">{{item.centerName}}</p>' +
                '</label>' +
            '</div>' +  
        '</div>' +
        '{{/each}}';

    var dateUtil = vcui.date;

    var validation;
    var authManager;

    var reservation = {
        init: function() {
            var self = this;

            self.$cont = $('.contents');
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWrap = self.$cont.find('.my-product-wrap');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');
            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$cont.find('#stepModel');

            // 센터찾기
            self.$stepCenter = self.$cont.find('#stepCenter');
            self.$centerPagination = self.$stepCenter.find('.pagination');

            self.$citySelect = $('#localSi');
            self.$boroughSelect = $('#localGu');
            self.$localSearchButton = $('.search-local');
            self.$searchUserAdressButton = $('.search-address');
            self.$searchCurrentButton = $('.search-current');
            
            self.$subwayCitySelect = $('#subwayLocal');
            self.$subwayLineSelect = $('#subwayLine');
            self.$subwayStationSelect = $('#subwayStation');
            self.$searchSubwayButton = $('.search-subway');

            self.$citySelect2 = $('#address');
            self.$address1 = $('#keyword');
            self.searchCenterName = $('#tab3').find('.btn-search');

            // 희망날짜
            self.$stepDate = self.$cont.find('#stepDate');
            self.$dateWrap = self.$stepDate.find('.date-wrap');
            self.$timeWrap = self.$stepDate.find('.time-wrap');

            // 엔지니어
            self.$stepEngineer = self.$cont.find('.engineer-to-visit');
            self.$engineerPopup = $('#choiceEngineerPopup');
            self.$engineerSlider = self.$engineerPopup.find('.engineer-slider');

            // 정보입력
            self.$stepInput = self.$cont.find('#stepInput');
            self.$topicBox = self.$stepInput.find('#topicBox');
            self.$topicListWrap = self.$stepInput.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');
            self.$subTopicBox = self.$stepInput.find('#subTopicBox');
            self.$subTopicListWrap = self.$stepInput.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');
            self.$solutionsBanner = self.$stepInput.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            // 본인인증
            self.$authPopup = $('#certificationPopup');

            self.centerUrl = self.$stepCenter.data('centerUrl');
            self.localUrl = self.$stepCenter.data('localListUrl');
            self.subwayUrl = self.$stepCenter.data('subwayListUrl');
            self.stationUrl = self.$stepCenter.data('stationListUrl');
            self.userAdressCheckedUrl = self.$stepCenter.data('userAdressCheckedUrl');
            self.detailUrl = self.$stepCenter.data('detailUrl');
            self.dateUrl = self.$stepDate.data('dateUrl');
            self.timeUrl = self.$stepDate.data('timeUrl');
            self.engineerUrl = self.$stepInput.data('engineerUrl');
            
            self.searchType = 'local';
            self.isLogin = lgkorUI.isLogin;

            var register = {
                date: {
                    required: true,
                    msgTarget: '.err-msg',
                    errorMsg: '날짜를 선택해주세요.'
                },
                time: {
                    required: true,
                    msgTarget: '.err-msg',
                    errorMsg: '시간을 선택해주세요.'
                },
                userName: {
                    required: true,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '한글 또는 영문만 입력 가능합니다.'
                },
                phoneNo: {
                    required: true,
                    pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                    msgTarget: '.err-block',
                    errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                    patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                }
            }
            var authOptions = {
                elem: {
                    popup: '#certificationPopup',
                    name: '#authName',
                    phone: '#authPhoneNo',
                    number: '#authNo'
                },
                register: {
                    authName: {
                        required: true,
                        msgTarget: '.err-block',
                        pattern: /^[가-힣a-zA-Z]+$/,
                        errorMsg: '이름을 입력해주세요.',
                        patternMsg: '한글 또는 영문만 입력 가능합니다.'
                    },
                    authPhoneNo: {
                        required: true,
                        msgTarget: '.err-block',
                        pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                        errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                        patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                    },
                    authNo:{
                        required: true,
                        msgTarget: '.err-block',
                        errorMsg: '인증번호를 입력해주세요.'
                    }
                }
            };

            vcui.require(['ui/validation', 'helper/naverMapApi'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});

                if (!self.isLogin) authManager = new AuthManager(authOptions);

                $('#route').val(lgkorUI.isMobile() ? 'WWW2' : 'WWWW1');

                self.bindEvent();

                self.$cont.commonModel({
                    register: register,
                    selected: {
                        category: self.$cont.find('#category').val(),
                        categoryName: self.$cont.find('#categoryNm').val(),
                        subCategory: self.$cont.find('#subCategory').val(),
                        subCategoryName: self.$cont.find('#subCategoryNm').val(),
                        modelCode: self.$cont.find('#modelCode').val(),
                        productCode: self.$cont.find('#productCode').val()
                    }
                });

                self.$engineerSlider.vcCarousel({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 10000,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint:767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                    ]
                });

                self.$dateWrap.calendar({
                    inputTarget: '#date'
                });
                self.$timeWrap.timeCalendar({
                    inputTarget: '#time'
                });

                $('.ui_search').search({
                    template: {
                        autocompleteList: '<li><a href="#{{shopID}}" class="btn-detail" title="새창 열림">{{shopName}}</a></li>',
                    }
                });

                new vcui.helper.NaverMapApi({
                    mapService: 'naver',
                    keyID: 'vsay0tnzme',
                    appKey: 'oqYmIfzrl6E72lYDAvNeII5x9wEWUNwKrcUctzVa'
                }).load(function(){
                    
                });  
            });
        },
        bindEvent: function() {
            var self = this;

            // 모델 재선택 하기 후 이벤트
            self.$cont.on('reset', function(e) {
                self.reset();
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data, url) {    
                self.model = data;
                
                self.requestCenterData({
                    category: self.model.category,
                    subCategory: self.model.subCategory,
                    modelCode: self.model.modelCode,
                    serviceType: $('#serviceType').val(),
                    page:1
                }, url);

                self.$cont.commonModel('updateSummary', {
                    product: [data.categoryName, data.subCategoryName, data.modelCode],
                    reset: 'product'
                });
                
                self.$myProductWrap.hide();

                self.$cont.commonModel('next', self.$stepCenter);
                self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                    self.$selectedModelBar.vcSticky();
                });
            });

            $('.ui_tab').on('tabchange', function(e, data) {
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
                }
            });

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
                var windowHeight = $(window).innerHeight();
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no");
            });
            $('.center-list-wrap').on('click', '.btn-detail', function(){
                var id = $(this).attr("href").replace("#", "");
                var windowHeight = $(window).innerHeight();
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no");
            });

            self.searchCenterName.on('click', function() {
                self._setSearch();
            });
            


            self.$centerPagination.on('pageClick', function(e) {
                var param = {
                    page: e.page
                };

                self.requestCenterData(param)
            });

            self.$stepCenter.on('change', '[name=center]', function() {
                $('#shopID').val($(this).val());
                self.param = $(this).data();
                self.requestDate();
            });


            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                
                self.$solutionsBanner.hide();
                self.requestSubTopic(url, param);
            });

            // 세부 증상 선택
            self.$subTopicList.on('change', '[name=subTopic]', function() {
                var $this = $(this),
                    url = self.$subTopicListWrap.data('ajax'),
                    param = {
                        topic : $('input[name=topic]:checked').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.reqeustSolutions(url, param);
            });

            // 솔루션 배너
            self.$solutionsBanner.find('.btn-link').on('click', function(){
                var url = $(this).data('href');
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };   

                self.setSolutions(url, param, false);
            });

            // 날짜 선택
            self.$dateWrap.on('dateselected', function() {
                self.requestTime();
            });
            self.$timeWrap.on('timeselected', function() {
                self.reqestEngineer();
            });

            // 엔지니어 선택 팝업 오픈
            self.$engineerPopup.on('modalshown', function() {
                self.$engineerSlider.vcCarousel('resize');
            });

            // 엔지니어 선택
            self.$engineerPopup.find('.btn-group .btn').on('click', function() {
                var url = self.$engineerPopup.data('lockUrl'),
                    $this = self.$engineerPopup.find('[name=engineer]').filter(':checked'),
                    infoData = $this.data(),
                    param;

                param = {
                    serviceType: $('#serviceType').val(),
                    date: $('#date').val(),
                    time: $('#time').val(),
                    lockUserId: $('#lockUserId').val(),
                    productCode: $('#productCode').val(),
                }

                param = $.extend(param, infoData);

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            self.$engineerPopup.vcModal('hide');
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (self.isLogin) {
                        lgkorUI.confirm('', {
                            title:'예약 하시겠습니까?',
                            okBtnName: '확인',
                            cancelBtnName: '취소',
                            ok: function() {
                                self.requestComplete();
                            }
                        });       
                    } else {
                        authManager.open(function() {
                            $('#authName').val($('#userNm').val()).prop('readonly', true);
                            $('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
                    }
                }
            });

            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send();
            });

            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function(success, result) {
                    success && self.requestComplete();
                });
            });
        },
        reset: function() {
            var self = this;

            self.model = {};
            self.param = {};

            self.$dateWrap.calendar('reset');
            self.$timeWrap.timeCalendar('reset');

            self.$topicList.empty();
            self.$subTopicList.empty();
            self.$solutionsBanner.hide();

            $('#engineerNm').val('');
            $('#engineerCode').val('');
            $('#centerNm').val('');
            $('#centerCode').val('');
            $('#date').val('');
            $('#time').val('');
        
            self.$stepInput.find('[name=buyingdate]').closest('.conts').find('.form-text').remove();
            self.$stepInput.find('[name=buyingdate]').prop('checked', false);
            self.$stepInput.find('#content').val('');

            if (!self.isLogin) {
                self.$stepInput.find('#userNm').val('');
                self.$stepInput.find('#phoneNo').val('');
            } else {
                self.$myProductWrap.show();
            }

            self.$cont.commonModel('next', self.$stepModel);
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
                        searchCity: self.userCityName,
                        searchBorough: self.userBoroughName
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

            console.log("keywords :", keywords)

            return keywords;
        },
        searchAddressToCoordinate: function(address, callback) { 
            var self = this;
            var point;
            
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
        //지역 검색...
        _setLocalSearch: function(){
            var self = this;

            var keyword = self.$boroughSelect.val() || self.$citySelect.val();
            var trim = keyword.replace(/\s/gi, '');
            if(trim.length){
                var callback = function() {
                    self.requestCenterData()
                };

                self.searchResultMode = true;
                self.schReaultTmplID = "localSearch";
                
                self.searchAddressToCoordinate(trim, callback);
            }
        },

        // 내 주소로 검색....
        _setUserAdressSearch: function(){
            var self = this;

            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(self.userAdressCheckedUrl, {}, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    self.userCityName = result.data.userAdress.cityValue;
                    self.userBoroughName = result.data.userAdress.boroughValue;
                    self.searchResultMode = true;
                    self.schReaultTmplID = "localSearch";

                    self.requestCenterData();
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

        // 현재 위치 검색
        _setCurrentSearch: function() {
            var self = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(pos) {
                    self.latitude = pos.coords.latitude;
                    self.longitude = pos.coords.longitude;

                    self.searchResultMode = true;
                    self.schReaultTmplID = "localSearch";

                    self.requestCenterData();
                }, function(error) {
                    
                }); 
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

                self.requestCenterData();
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
                    self.requestCenterData()
                };

                self.schReaultTmplID = "search";
                self.searchResultMode = true;

                $(window).off('keyup.searchShop');

                self.searchAddressToCoordinate(self.$citySelect2.val(), callback);
            } else{
                lgkorUI.alert("", {
                    title: "광역 시/도 선택 후 센터 명을 입력해주세요."
                });
            }
        },
        setWarranty: function(data) {
            var self = this;
            var $warranty = self.$stepInput.find('[name=buyingdate]');

            if (self.isLogin) {
                if (data.warrantyText && data.warrantValue) {
                    $warranty.closest('.conts').append('<p class="form-text">'+data.warrantyText+'</p>');
                    $warranty.filter('[value='+data.warrantValue+']').prop('checked', true);
                    
                    $warranty.closest('.rdo-list-wrap').hide();
                } else {
                    $warranty.closest('.rdo-list-wrap').show();
                }
            }
        },
        requestCenterData: function(options, url) {
            var self = this;
            var param = self._getKeyword();
            var url = url || self.centerUrl;
            
            if (!options) {
                var options = {
                    page:1
                }
            }

            param = $.extend(param, options);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    dataArr = data.listData instanceof Array ? data.listData : [],
                    html;

                if (dataArr.length) {
                    html = vcui.template(centerTmpl, data);
                    self.$stepCenter.find('table tbody').html(html);
                    self.$centerPagination.pagination('update', data.listPage);

                    self.$stepCenter.find('.no-data').hide();
                    self.$stepCenter.find('.center-list-wrap').show();
                    self.$centerPagination.show();
                } else {
                    self.$stepCenter.find('.no-data').show();
                    self.$stepCenter.find('.center-list-wrap').hide();
                    self.$centerPagination.hide();
                }

                self.setWarranty(data);
                self.setTopic(data);

                lgkorUI.hideLoading();
            });
        },
        setTopic: function(data) {
            var self = this;
            var success = (data.topicList instanceof Array && data.topicList.length) ? true : false;
            
            if (success) {
                self.$topicList.html(vcui.template(topicTmpl, data));
            }
        },
        requestSubTopic: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data,
                    html;
                    
                html = vcui.template(subTopicTmpl, data);

                self.$subTopicList.html(html);
                self.$subTopicBox.show();
            });
        },
        reqeustSolutions: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;
                
                if (data.resultFlag == 'Y') {
                    self.$solutionsBanner.show();
                } else {
                    self.$solutionsBanner.hide();
                }

                $('#solutionsFlag').val(data.resultFlag);
            });
        },
        setSolutions: function(url, param, isShown) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var url = self.$solutionsPopup.data('listUrl'),
                        param = {
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(url, param, true);
                });
            }, null, "html", true);
        },
        requestDate: function() {
            var self = this;
            var param = {
                category: self.model.category,
                subCategory: self.model.subCategory,
                productCode: $('#productCode').val(),
                serviceType: $('#serviceType').val(),
                deptCode: self.param.deptCode
            };

            lgkorUI.requestAjaxDataPost(self.dateUrl, param, function(result) {
                var data = result.data,
                    dateArr = data.dateList instanceof Array ? data.dateList : [],
                    fastDate;

                if (data.resultFlag == 'Y') {
                    if (dateArr.length) {
                        fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');
                    
                        self.$stepDate.find('.calendar-info .date').html(fastDate);    
                        $('.date-wrap').calendar('update', data.dateList);
                        self.dateParam = result.param;

                        self.$stepDate.addClass('active');
                    }
                } else {
                    if (data.resultMessage) {
                        if (data.tAlert == 'Y') {
                            self.$stepInput.find('.step-btn-wrap').show();
                            self.$stepDate.removeClass('active');
                        }

                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            });
        },
        requestTime: function() {
            var self = this;
            var param = {
                category: self.model.category,
                subCategory: self.model.subCategory,
                productCode: $('#productCode').val(),
                serviceType: $('#serviceType').val(),
                date: $('#date').val(),
                lockUserId: $('#lockUserId').val(),
                deptCode: self.param.deptCode
            };

            lgkorUI.requestAjaxDataPost(self.timeUrl, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.time-wrap').timeCalendar('update', data.timeList);
                        $('.time-wrap').find('.box-desc').hide();
                        $('.time-wrap').find('.box-table').show();
                    } else {
                        if (data.resultMessage) {
                            if (data.tAlert == 'Y') {
                                self.$stepDate.removeClass('active');
                                self.$completeBtns.hide();
                            }
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
        },
        reqestEngineer: function() {
            var self = this;
            var param = {
                serviceType: $('#serviceType').val(),
                category: $('#category').val(),
                subCategory: $('#subCategory').val(),
                productCode: $('#productCode').val(),
                lockUserId: $('#lockUserId').val(),
                productCode: $('#productCode').val(),
                date: $('#date').val(),
                time: $('#time').val(),
                deptCode: self.param.deptCode
            }

            lgkorUI.requestAjaxDataPost(self.engineerUrl, param, function(result) {
                var data = result.data,
                    arr = data.engineerList instanceof Array ? data.engineerList : []; 

                if (data.resultFlag == 'Y') {  
                    if (arr.length) {
                        self.updateEngineer(arr[0]);
                        if (arr.length > 1) {
                            var html = vcui.template(engineerTmpl, data);
                            
                            self.$engineerSlider.find('.slide-track').html(html);
                            self.$engineerSlider.vcCarousel('reinit');
                            self.$stepEngineer.find('.btn').show();
                        } else {
                            self.$stepEngineer.find('.btn').hide();
                        }
                        self.$stepInput.addClass('active');
                        self.$completeBtns.show();
                    }
                }
            });
        },
        updateEngineer: function(data) {
            var self = this,
                $engineerBox = self.$stepEngineer.find('.engineer-info'),
                $resultBox = self.$stepEngineer.find('.engineer-desc');

            self.$stepEngineer.find('.engineer-img img').attr({
                'src': data.image,
                'alt': data.engineerName
            });                             
            $engineerBox.find('.name').html(data.engineerName);
            $engineerBox.find('.center').html(data.centerName);

            $resultBox.find('.date').html(vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm"));
            $resultBox.find('.name').html(data.engineerName);

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);

            self.dateParam['resrvSeq'] = data.resrvSeq;
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            formData = $.extend(formData, self.dateParam);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    $('#acptNo').val(data.acptNo);
                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
                lgkorUI.hideLoading();
            }, 'POST');
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();