(function() {
    var localOptTemplate = '<option value="{{code}}">{{codeName}}</option>';
    var centerTmpl =
        '{{#each (item, index) in listData}}' +
        '<tr>' +
            '<td>' +
                '<button type="button" class="btn size border btn-center" data-shop-id="{{item.shopID}}" data-dept-code="{{item.deptCode}}" title="{{item.shopName}}"><span>선택</span></button>' +
            '</td>' +
            '<td class="info">' +
                '<p class="name">{{item.shopName}}</p>' +
                '<p class="address">{{item.shopAdress}}</p>' +
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
        /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

        // BTOCSITE-7660 슬라이드 원본
        // '<div class="slide-conts ui_carousel_slide">' +
        //     '<div class="engineer-box">' +
        //         '{{# if (index == 0) { #}}' +
        //         '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
        //         '{{# } else { #}}' +
        //         '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
        //         '{{# } #}}' +
        //         '<label for="engineer{{index}}">' +
        //             '<div class="img">' +
        //                 '<img src="{{item.image}}" alt="{{item.engineerName}} 엔지니어 사진" aria-hidden="true">' +
        //             '</div>' +
        //             '<p class="tit">{{item.engineerName}}</p>' +
        //             '<p class="desc">{{item.centerName}}</p>' +
        //         '</label>' +
        //     '</div>' +  
        // '</div>' +

        '<li class="chk-wrap">' +
            '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
            '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
            '{{# } #}}' +
            '<label for="engineer{{index}}">' +
                // '<div class="img">' +
                //     '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                // '</div>' +
                // '<p class="tit">{{item.engineerName}}</p>' +
                // '<p class="desc">{{item.centerName}}</p>' +
                '<span>{{item.engineerName}}</span>' +
                '<span>{{item.centerName}}</span>' +
            '</label>' +
        '</li>' +
        /* //BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
        '{{/each}}';

    var dateUtil = vcui.date;
    var detect = vcui.detect;
    var isMobile = detect.isMobile;
    var isLogin = lgkorUI.isLogin;
    var cookie = lgkorUI.cookie;
    var validation;
    var authManager;
    var naverMap;

    var reservation = {
        init: function() {
            var self = this;

            self.$cont = $('.contents');
            self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWrap = self.$cont.find('.my-product-wrap');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');

            self.$submitForm = self.$cont.find('#submitForm');
            self.$completeBtns = self.$cont.find('.btn-group');
            self.$stepArea = self.$cont.find('.step-area');
            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepCenter = self.$cont.find('#stepCenter');
            self.$stepDate = self.$cont.find('#stepDate');
            self.$stepInput = self.$cont.find('#stepInput');
            self.warrantyGuide = $('#ratesWarrantyGuidePopup');

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
            self.$keywordWrap = $('.ui_search');
            self.searchCenterName = $('#tab-3').find('.btn-search');

            // 희망날짜
            self.$dateWrap = self.$stepDate.find('.date-wrap');
            self.$timeWrap = self.$stepDate.find('.time-wrap');

            // 엔지니어
            self.$engineerResult = self.$cont.find('.engineer-to-visit');
            self.$engineerOpener = $('[data-href="#choiceEngineerPopup"]');
            self.$engineerPopup = $('#choiceEngineerPopup');

            /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
            // self.$engineerSlider = self.$engineerPopup.find('.engineer-slider'); //원본
            self.$engineerSlider = self.$engineerPopup.find('.engineer-popup');
            /* //BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

            // 정보입력
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
            
            self.resultUrl = self.$searchModelWrap.data('resultUrl');
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

            var seq = lgkorUI.searchParamsToObject('seq');
            var data = {
                lockUserId: self.$cont.find('#lockUserId').val(),
                pageCode: self.$cont.find('#pageCode').val()
            };
            var register = {
                privcyCheck: {
                    required: true,
                    msgTarget: '.err-block',
                    errorMsg: '개인정보 수집 및 이용에 동의 하셔야 이용 가능합니다.'
                },
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
                topic : {
                    required : true,
                    msgTarget : '.topic-msg'
                },
                subTopic : {
                    required : true,
                    msgTarget : '.sub-topic-msg'
                },
                userNm: {
                    required: true,
                    maxLength: 30,
                    pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                    msgTarget: '.err-block',
                    errorMsg: '이름을 입력해주세요.',
                    patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                },
                phoneNo: {
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                    msgTarget: '.err-block',
                    errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                    patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                    validate : function(value){
                        return validatePhone(value);
                    } 
                }
            }
            
            if (seq) {
                self.$cont.find('#seq').val(seq);
                $.extend(data, {seq: seq});
            }

            self.data = $.extend(true, {}, data);
            self.options = $.extend(true, {}, data);

            vcui.require(['ui/validation', 'helper/naverMapApi', 'support/common/searchModel.min'], function () {
                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                naverMap = new vcui.helper.NaverMapApi({
                    mapService: 'naver',
                    keyID: 'ca0xg7ikh5',
                    appKey: 'FuS0E5wYrci3jWj6OoAt30PSJXtE9cJsSUwJy4xP'
                }).load();  
                
                if (!isLogin) {
                    authManager = new AuthManager({
                        elem: {
                            popup: '#certificationPopup',
                            name: '#authName',
                            phone: '#authPhoneNo',
                            number: '#authNo'
                        },
                        register: {
                            authName: {
                                required: true,
                                maxLength: 30,
                                pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                                msgTarget: '.err-block',
                                errorMsg: '이름을 입력해주세요.',
                                patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                            },
                            authPhoneNo: {
                                required: true,
                                minLength: 10,
                                maxLength: 11,
                                msgTarget: '.err-block',
                                errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                                patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                                validate : function(value){
                                    return validatePhone(value);
                                } 
                            },
                            authNo:{
                                required: true,
                                msgTarget: '.err-block',
                                errorMsg: '인증번호를 입력해주세요.',
                            }
                        }
                    });
                }

                self.bindEvent();

                /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 슬라이드 삭제 */
                // self.$engineerSlider.vcCarousel({
                //     slidesToShow: 4,
                //     slidesToScroll: 4,
                //     infinite: false,
                //     responsive: [
                //         {
                //             breakpoint: 10000,
                //             settings: {
                //                 infinite: false,
                //                 slidesToShow: 4,
                //                 slidesToScroll: 4,
                //             }
                //         },
                //         {
                //             breakpoint: 1024,
                //             settings: {
                //                 infinite: false,
                //                 slidesToShow: 3,
                //                 slidesToScroll: 3,
                //             }
                //         },
                //         {
                //             breakpoint:767,
                //             settings: {
                //                 infinite: false,
                //                 variableWidth : true,
                //                 slidesToShow: 1,
                //                 slidesToScroll: 1
                //             }
                //         }
                //     ]
                // });

                self.$dateWrap.calendar({inputTarget:'#date'});
                self.$timeWrap.timeCalendar({inputTarget:'#time'});
                self.$cont.vcSearchModel({model:data}); 

                self.$keywordWrap.search({
                    template: {
                        autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="#{{item.shopID}}" class="btn-detail" title="새창 열림">{{item.shopName}}</a></li>{{/each}}</ul>',
                    }
                });
            });
        },
        bindEvent: function() {
            var self = this;

            $('[data-href="#ratesWarrantyGuidePopup"]').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/visitInfoClick.do', '/acecount/visitInfoClickm.do');
            });

            // 모델 재선택 하기 후 이벤트
            self.$cont.on('reset', function(e) {
                self.reset();
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, data) {    
                var url = self.resultUrl,
                    param = $.extend(true, self.data, data)
            
                self.requestCenterData(param, url);
                self.$cont.vcSearchModel('updateSummary', {
                    product: [param.categoryNm, param.subCategoryNm, param.modelCode],
                    reset: 'product'
                });

                self.data = $.extend(true, self.data, data)
            });

            self.$cont.find('.ui_tab').on('tabchange', function(e, data) {
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
                    self._setSearch();
                }
            });
            self.$keywordWrap.on('autocomplete', function(e, param, url, callback) {
                var data = {
                    searchCity: self.$citySelect2.val(),
                    searchKeyword: param.keyword
                }

                lgkorUI.requestAjaxData(url, data, function(result) {
                    callback(result.data);
                });
            });
            self.$keywordWrap.on('autocompleteClick', function(e, el) {
                var id = $(el).attr("href").replace("#", "");
                var windowHeight = $(window).innerHeight();
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });
            $('.center-result-wrap table').on('click', '.btn-detail', function(){
                var id = $(this).attr("href").replace("#", "");
                var windowHeight = $(window).innerHeight();
                window.open(self.detailUrl+"-"+id, "_blank", "width=1070, height=" + windowHeight + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=1");
            });
            self.searchCenterName.on('click', function() {
                self._setSearch();
            });

            // 엔지니어 선택 팝업 오픈
            self.$engineerOpener.on('click', function() {
                var $this = $(this);
                var url = self.$engineerPopup.data('engineerListUrl');
                var data = $.extend(true, {}, self.data),
                    param = {
                        category: data.category,
                        subCategory: data.subCategory,
                        productCode: data.productCode,
                        serviceType: data.serviceType,
                        deptCode: self.data.deptCode,
                        lockUserId: data.lockUserId,
                        date: data.date,
                        time: data.time      
                    };
                
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data,
                        arr = data.engineerList instanceof Array ? data.engineerList : []; 

                    if (data.resultFlag == 'Y') {  
                        if (arr.length) {
                            var html = vcui.template(engineerTmpl, data);
                            
                            /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
                            // self.$engineerSlider.find('.slide-track').html(html); // 원본
                            self.$engineerSlider.find('.engineer-infoP').html(html);
                            /* //BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */

                            self.$engineerSlider.vcCarousel('reinit');
                        } else {
                            lgkorUI.alert('', {
                                title: '방문 가능한 다른 엔지니어가 없습니다.'
                            }, $this[0]);
                        }
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            }, $this[0]);
                        }
                    }
                    lgkorUI.hideLoading();
                });
            });

            self.$engineerSlider.on('carouselreinit', function() {
                self.$engineerPopup.vcModal();
            });

            self.$engineerPopup.on('modalhidden', function() {
                self.$engineerOpener.focus();
            });

            self.$stepCenter.on('click', '.btn-center', function() {
                var shopId = $(this).data('shopId'),
                    deptCode = $(this).data('deptCode');
                
                self.$cont.find('#seq').val(shopId);

                self.data = $.extend(self.data, {
                    seq: shopId,
                    deptCode: deptCode
                });
                $('.btn-center').removeClass('active');
                $(this).addClass('active');
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
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/visitSolutionsClick.do', '/acecount/visitSolutionsClickm.do');
                self.setSolutions(param, false);
            });

            // 날짜 선택
            self.$dateWrap.on('dateselected', function(e, date) {
                self.data['date'] = date;
                self.requestTime();
            });
            self.$timeWrap.on('timeselected', function(e, time) {
                self.data['time'] = time;

                //주영
                //BTOCSITE-9289 : 시간까지 선택된 상태에서 페이지 나갈때 param보내는 기능 추가
                var unlockUrl = self.$stepDate.data('unlockUrl'); //데이터 가져오기
                var unlockParam = {}; //unlockParam 빈 객체를 만들기

                if( $('#productCode').val() != undefined) { //빈값이진 undefined인지 확인 : undefined 가 아니면 unlockParam.productCode 는 밸류값이 들어간다
                    unlockParam.productCode = $('#productCode').val()
                }
                if( $('#serviceType').val() != undefined) {
                    unlockParam.serviceType = $('#serviceType').val()
                }
                if( $('#lockUserId').val() != undefined) {
                    unlockParam.lockUserId = $('#lockUserId').val()
                }

                lgkorUI.requestAjaxDataPost(unlockUrl, unlockParam, function(res){
                    if (res.data.resultFlag == 'Y') {
                        console.log('최초 unlockParam', unlockParam);
                    }
                })

                // //console.log('페이지 나갈때 unlockParam', unlockParam);
                $(window).on("beforeunload", function() {
                    //alert("111111");
                    lgkorUI.requestAjaxDataPost(unlockUrl, unlockParam, function(res){
                        if (res.data.resultFlag == 'Y') {
                            //alert("2222222");
                            console.log('페이지 나갈때 unlockParam', unlockParam);
                            //alert("3333333");
                            //alert("4444444");
                        }
                    })
                 });
                 
                self.reqestEngineer();
            });

            self.warrantyGuide.on('modalshown', function(){
                var $this = $(this);
                var $tab = $this.find('.ui_tab');
                var $tabCont =  $this.find('.tabs-contents');

                $tabCont.hide().eq(0).show();
            })

            // self.warrantyGuide.find('.ui_tab').on('tabchange', function(e, data){
            //     var $this = $(this);
            //     var $popupCont = $this.closest('.pop-conts');
            //     var $tabCont = $popupCont.find('.tabs-contents');

            //     console.log(data.button[0].hash)

            //     $tabCont.hide();
            //     $tabCont.filter(data.button[0].hash).show();
            // })


            // 엔지니어 선택
            self.$engineerPopup.find('.btn-group .btn').on('click', function() {
                var url = self.$engineerPopup.data('lockUrl'),
                    $this = self.$engineerPopup.find('[name=engineer]').filter(':checked'),
                    infoData = $this.data(),
                    param, data;

                self.data = $.extend(self.data, infoData);
                data = self.data;
                param = {
                    productCode: data.productCode,
                    serviceType: data.serviceType,
                    lockUserId: data.lockUserId,
                    date: data.date,
                    time: data.time,
                    beforeEngineerCode: $('#engineerCode').val()
                }

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    lgkorUI.hideLoading();
                    
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            });

            // 신청 완료
            /* BTOCSITE-6393 [고객지원] 센터 방문 예약 시, 모바일 (스마트폰/일반폰) 접수 시 휴대폰 인증 제외 : 인증 팝업 예외 처리*/
            self.$completeBtns.find('.btn-confirm').on('click', function(data) {
                var result = validation.validate();

                //console.log("data", self.data.subCategory); 가져온 데이터

                var $ifData = self.data.subCategory,
                    $cellPhone = "CT50019097",
                    $smartPhone = "CT50019117";

                if (result.success == true) {    
                    if (isLogin || $ifData == $cellPhone || $ifData == $smartPhone) {
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
                            self.$authPopup.find('#authName').val($('#userNm').val()).prop('readonly', true);
                            self.$authPopup.find('#authPhoneNo').val($('#phoneNo').val()).prop('readonly', true);  
                        });
                    }
                }
            });
            /* //BTOCSITE-6393 [고객지원] 센터 방문 예약 시, 모바일 (스마트폰/일반폰) 접수 시 휴대폰 인증 제외 : 인증 팝업 예외 처리*/

            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send(this);
            });

            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function(success, result) {
                    success && self.requestComplete();
                });
            });

            //BTOCSITE-9289 : 예약 중일때 취소시 param 보내는 여부
            $('#canclePopup .btn-cancel-confirm').on('click', function(e){
                //e.preventDefault();

                var unlockUrl = $('#canclePopup').data('unlockUrl'); //데이터 가져오기
                var _href = $(this).attr('href');
                var unlockParam = {}; //unlockParam 빈 객체를 만들기
                
                if( $('#productCode').val() != undefined) { //빈값이진 undefined인지 확인 : undefined 가 아니면 unlockParam.productCode 는 밸류값이 들어간다
                    unlockParam.productCode = $('#productCode').val()
                }
                if( $('#serviceType').val() != undefined) {
                    unlockParam.serviceType = $('#serviceType').val()
                }
                if( $('#lockUserId').val() != undefined) {
                    unlockParam.lockUserId = $('#lockUserId').val()
                }

                //보내는 param 확인
                console.log('unlockParam', unlockParam)

                //데이터 통신
                lgkorUI.requestAjaxDataPost(unlockUrl, unlockParam, function(res){
                    if (res.data.resultFlag == 'Y') {
                        location.href = _href; 
                    } else {
                        location.href = _href; 
                    }
                })
            });
        },
        reset: function() {
            var self = this;
            var $listTable = self.$stepCenter.find('.center-result-wrap .tb_row'),
                $noData = self.$stepCenter.find('.no-data');

            $listTable.find('tbody').empty();
            $listTable.hide();
            $noData.show();

            self.data = $.extend(true, {}, self.options);

            self.$topicList.empty();
            self.$subTopicList.empty();
            self.$solutionsBanner.hide();

            self.$citySelect.find('option:first-child').prop('selected', true);
            self.$citySelect.vcSelectbox('update');
            self.$boroughSelect.find('option:first-child').prop('selected', true);
            self.$boroughSelect.prop('disabled', true).vcSelectbox('update');
            self.$localSearchButton.prop('disabled', true);
            
            self.$subwayCitySelect.find('option:first-child').prop('selected', true);
            self.$subwayCitySelect.vcSelectbox('update');
            self.$subwayLineSelect.find('option:first-child').prop('selected', true);
            self.$subwayLineSelect.prop('disabled', true).vcSelectbox('update');
            self.$subwayStationSelect.find('option:first-child').prop('selected', true);
            self.$subwayStationSelect.prop('disabled', true).vcSelectbox('update');
            self.$searchSubwayButton.prop('disabled', true);

            self.$citySelect2.find('option:first-child').prop('selected', true);
            self.$citySelect2.vcSelectbox('update');
            self.$address1.val('').prop('disabled', true);

            self.$cont.find('.ui_tab').vcTab('select', 0);
            

            $('#engineerNm').val('');
            $('#engineerCode').val('');
            $('#centerNm').val('');
            $('#centerCode').val('');
            $('#seq').val('');
        
            self.$stepInput.find('[name=buyingdate]').closest('.conts').find('.form-text').remove();
            self.$stepInput.find('[name=buyingdate]').prop('checked', false);
            self.$stepInput.find('#content').val('');

            if (!isLogin) {
                self.$stepInput.find('#userNm').val('');
                self.$stepInput.find('#phoneNo').val('');
            }

            self.$completeBtns.hide();

            validation.reset();
            self.$dateWrap.calendar('reset');
            self.$timeWrap.timeCalendar('reset');
            self.$cont.find('.ui_input_clearbutton').trigger('update');
            self.$cont.find('.ui_all_checkbox').vcCheckboxAllChecker('setAllNoneChecked');
            self.$cont.find('.ui_textcontrol').trigger('textcounter:change', { textLength: 0 });
        },
        _getKeyword: function(){
            var self = this;
            var keywords = {};

            switch(self.searchType) {
                case 'local':
                case 'current':
                case 'road':
                case 'user':
                    keywords = {
                        latitude:self.latitude,
                        longitude:self.longitude
                    };    
                    break;
                case 'center':
                    keywords = {
                        searchCity: self.$citySelect2.val(),
                        searchKeyword: self.$address1.val()
                    };
                    break;
                case 'subway':
                    keywords = {
                        searchSubwayLocal: self.$subwayCitySelect.val(),
                        searchSubwayLine: self.$subwayLineSelect.val(),
                        searchSubwayStation: self.$subwayStationSelect.val()
                    };
                    break;
            };

            console.log("keywords :", keywords)

            return keywords;
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

            var keyword = self.$citySelect.val() + ' ' + self.$boroughSelect.val();
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
                var data = result.data;

                if(lgkorUI.stringToBool(data.success)){
                    var callback = function() {
                        self.requestCenterData()
                    };

                    self.searchResultMode = true;
                    self.schReaultTmplID = "localSearch";

                    self.searchAddressToCoordinate(data.userAdress, callback);
                } else{
                    if(data.location && data.location != ""){
                        lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                            typeClass:'type2',
                            title:'',
                            okBtnName: '네',
                            cancelBtnName: '아니요',
                            ok: function() {
                                location.href = data.location;
                            }
                        }, self.$searchUserAdressButton[0]);
                    } else{
                        lgkorUI.alert("", {
                            title: data.alert.title
                        }, self.$searchUserAdressButton[0]);
                    }
                }
            });
        },

        // 현재 위치 검색
        _setCurrentSearch: function() {
            var self = this;
            var opener = self.$searchCurrentButton[0];
            var searchCurrentSearch = function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(pos) {
                        self.latitude = pos.coords.latitude;
                        self.longitude = pos.coords.longitude;
    
                        self.searchResultMode = true;
                        self.schReaultTmplID = "localSearch";
                        
                        cookie.setCookie('geoAgree','Y', 1);

                        self.requestCenterData();
                    }, function(error) {
                        lgkorUI.alert('현재 위치를 찾을 수 없습니다.', {
                            title: '현재 위치 정보',
                            typeClass: 'type2'
                        }, opener);
                    }); 
                } else {
                    lgkorUI.alert('위치 기반 서비스를 제공하지 않습니다.', {
                        title: '현재 위치 정보',
                        typeClass: 'type2'
                    }, opener);
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
                        typeClass: 'type2'
                    }, opener);
                }};
            var desc = '<p>고객님께서 제공하시는 위치 정보는 현재 계신 위치에서 직선 거리 기준으로 가까운 센터 안내를 위해서만 이용 됩니다. <br><br>또한 상기 서비스 제공  후 즉시 폐기되며, 별도 저장되지 않습니다. <br><br>고객님의 현재 계신 위치 정보 제공에 동의하시겠습니까?</p>';
                
            if (!cookie.getCookie('geoAgree')) {
                lgkorUI.confirm(desc, obj, opener);
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
            
            if (isLogin) {
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
                };
            }

            param = $.extend(true, param, options);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    dataArr = data.listData instanceof Array ? data.listData : [],
                    html;
                var $listTable = self.$stepCenter.find('.center-result-wrap .tb_row'),
                    $noData = self.$stepCenter.find('.no-data');

                $listTable.find('tbody').empty();

                if (dataArr.length) {
                    html = vcui.template(centerTmpl, data);
                    $listTable.find('tbody').html(html);

                    $noData.hide();
                    $listTable.show();
                } else {
                    $noData.show();
                    $listTable.hide();
                }

                if (data.resultFlag == 'Y') {
                    self.setWarranty(data);
                }

                self.setTopic(data);

                self.$stepDate.removeClass('active');
                self.$stepInput.removeClass('active');
                self.$completeBtns.hide();

                self.$dateWrap.calendar('reset');
                self.$timeWrap.timeCalendar('reset');

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
        setSolutions: function(param, isShown) {
            var self = this;
            var url = self.$solutionsPopup.data('listUrl');

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var param = {
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(param, true);
                });
            }, null, "html", true);
        },
        requestDate: function() {
            var self = this;
            var data = self.data;
            var param = {
                category: data.category,
                subCategory: data.subCategory,
                productCode: data.productCode,
                serviceType: data.serviceType,
                deptCode: data.deptCode
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.dateUrl, param, function(result) {
                var data = result.data,
                    dateArr = data.dateList instanceof Array ? data.dateList : [],
                    fastDate;


                if (data.resultFlag == 'Y') {
                    if (dateArr.length) {
                        fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');
                    
                        self.$stepDate.find('.calendar-info .date').html(fastDate);    
                        self.$dateWrap.calendar('update', data.dateList);
                        self.data = $.extend(self.data, result.param);

                        self.$stepDate.addClass('active').attr('tabindex', '0').focus().removeAttr('tabindex');
                        

                        self.$timeWrap.timeCalendar('reset');
                        self.$stepInput.removeClass('active');
                        self.$completeBtns.hide();
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

                    self.$stepDate.removeClass('active');
                    self.$stepInput.removeClass('active');
                    self.$completeBtns.hide();

                    self.$dateWrap.calendar('reset');
                    self.$timeWrap.timeCalendar('reset');
                }

                lgkorUI.hideLoading();
            });
        },
        requestTime: function() {
            var self = this;
            var data = self.data;
            var param = {
                category: data.category,
                subCategory: data.subCategory,
                productCode: data.productCode,
                serviceType: data.serviceType,
                deptCode: data.deptCode,
                lockUserId: data.lockUserId,
                date: data.date                
            };

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.timeUrl, param, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    self.$timeWrap.timeCalendar('update', data.timeList);
                    self.$timeWrap.find('.box-desc').hide();
                    self.$timeWrap.find('.box-table').show();
                } else {
                    if (data.resultMessage) {
                        if (data.tAlert == 'Y') {
                            self.$stepDate.removeClass('active');
                            self.$completeBtns.hide();
                        }
                        
                        lgkorUI.alert("", { title: data.resultMessage });
                    }
                }

                self.$stepInput.removeClass('active');
                self.$completeBtns.hide();

                lgkorUI.hideLoading();
            }, 'POST');
        },
        reqestEngineer: function() {
            var self = this;
            var data = self.data,
                param = {
                    category: data.category,
                    subCategory: data.subCategory,
                    productCode: data.productCode,
                    serviceType: data.serviceType,
                    deptCode: self.data.deptCode,
                    lockUserId: data.lockUserId,
                    date: data.date,
                    time: data.time      
                };
            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.engineerUrl, param, function(result) {
                var data = result.data,
                    arr = data.engineerList instanceof Array ? data.engineerList : []; 
                var slideConfig = {
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
                                variableWidth : true,
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                };

                if (data.resultFlag == 'Y') {  
                    if (arr.length) {
                        self.updateEngineer(arr[0]);
                        if (arr.length > 1) {
                            // var html = vcui.template(engineerTmpl, data);
                            
                            // self.$engineerSlider.find('.slide-track').html(html);
                            // self.$engineerSlider.filter('.is-loaded').vcCarousel('reinit');
                            // self.$engineerSlider.not('.is-loaded').vcCarousel(slideConfig);
                            self.$engineerResult.find('.btn').show();
                        } else {
                            self.$engineerResult.find('.btn').hide();
                        }
                        self.$stepInput.addClass('active');
                        self.$completeBtns.show();

                        lgkorUI.scrollTo(self.$stepInput, $('.prod-selected-wrap').outerHeight());
                    }
                }
                lgkorUI.hideLoading();
            });
        },
        updateEngineer: function(data) {
            var self = this,
                $engineerBox = self.$engineerResult.find('.engineer-profile'),
                $resultBox = self.$engineerResult.find('.engineer-desc');

            $engineerBox.find('.engineer-img img').attr({
                'src': data.image,
                'alt': data.engineerName + ' 엔지니어 사진'
            });                             
            $engineerBox.find('.name').html(data.engineerName);
            $engineerBox.find('.center').html(data.centerName);

            // $resultBox.find('.date').html(vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm"));
            // $resultBox.find('.name').html(data.engineerName);

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);

            /* BTOCSITE-7660 고객지원 - 출장/내방/예약변경 시 SE 사진 비노출 요청 */
            $resultBox.find('.txt').html('<span>'+vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm")+'</span>에 <span>'+data.engineerName+'</span> <span>('+data.centerName+')</span> 전문 엔지니어가 <span>'+self.data.subCategoryNm+'</span> <span class="bold">제품 점검이 가능합니다.</span><br><br>센터 방문 예약을 완료를 위해 아래 정보를 추가 입력해 주시기 바랍니다.');

            self.data['resrvSeq'] = data.resrvSeq;
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            formData = $.extend(formData, self.data);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    $('#acptNo').val(data.acptNo);
                    self.$submitForm.submit();
                } else {
                    lgkorUI.hideLoading();
                    
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            }, 'POST');
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();