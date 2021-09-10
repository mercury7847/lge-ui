(function(){
    var productListItemTemplate = //'<li class="lists" data-model-id="{{id}}" data-sku="{{sku}}" data-ord-no="{{ordNo}}" data-model-code="{{modelCode}}">' +
    '<li class="lists" data-model="{{jsonModel}}">' +
        '<div class="inner">' +
            '<div class="thumb" aria-hidden="true"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
            '<div class="info-wrap">' +
                '<p class="name"><span class="blind">모델명</span>{{#raw sku}}</p>' +
                '<ul class="info-lists">' +
                    '<li><dl><dt>구매일자</dt><dd>{{date}}</dd></dl></li>' +
                    '<li><dl><dt>카테고리</dt><dd>{{category}}</dd></dl></li>' +
                    '<li><dl><dt>구매처</dt><dd>{{store}}</dd></dl></li>' +
                '</ul>' +
                '<div class="btn-group"><a href="#n" class="btn border size-m"><span>제품 등록</span></a></div>' +
            '</div>' +
        '</div>' +
    '</li>'

    var ownListItemTemplate = '<li class="lists" data-model-id="{{modelId}}" data-ord-no="{{ordNo}}" data-model-code="{{modelCode}} ">' +
        '<div class="inner">' +
            '<div class="thumb{{#if disabled}} saleend{{/if}}" aria-hidden="true">' +
                // BTOCSITE-4086 : 제품링크 추가 - data 확인후 처리 예정
                // '<a href="{{url}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a>' +
                '<img src="{{imageUrl}}" alt="{{imageAlt}}">' +
            '</div>' +
            '<div class="info-wrap">' +
                // BTOCSITE-4086 : 제품링크 추가 - data 확인후 처리 예정
                // '<a href="{{url}}"><p class="name"><span class="blind">모델명</span>{{#raw modelName}}</p>' +
                // '<p class="e-name"><span class="blind">영문모델명</span>{{enModelName}}</p></a>' +
                '<p class="name"><span class="blind">모델명</span>{{#raw modelName}}</p>' +
                '<p class="e-name"><span class="blind">영문모델명</span>{{enModelName}}</p>' +
                '<ul class="info-lists period">' +
                    '{{#if saleDate}}<li><dl><dt>{{#if userType=="USER"}}구매월{{#else}}구매일자{{/if}}</dt><dd>{{saleDate}}</dd></dl></li>{{/if}}' +
                    //'{{#if creationDate}}<li><dl><dt>등록일자</dt><dd>{{creationDate}}</dd></dl></li>{{/if}}' +
                    '{{#if useDate}}<li><dl><dt>사용기간</dt><dd>{{useDate}}개월</dd></dl></li>{{/if}}' +
                    '{{#if careState}}<li><dl><dt>케어십 서비스</dt><dd><em{{#if careService}} class="can"{{/if}}>{{careState}}</em></dd></dl></li>{{/if}}' +
                    '{{#if nextCareServiceDate}}<li><dl><dt>다음 케어서비스 일자</dt><dd>{{nextCareServiceDate}}</dd></dl></li>{{/if}}' +
                '</ul>' +
                '<div class="btns">' +
                    '{{#if manualBtn}}<button type="button" class="btn size dark-gray manual-btn"><span>사용설명서</span></button>{{/if}}' +
                    '{{#if downloadBtn}}<button type="button" class="btn size dark-gray download-btn"><span>다운로드/SW</span></button>{{/if}}' +
                '</div>' +
                '<div class="btns link-type">' + 
                    '{{#each item in linkBtn}}' +
                        '<a href="{{item.url}}" class="btn-link">{{item.title}}</a>' +
                    '{{/each}}' +
                    '{{#if reviewBtn}}' +
                        '{{#if isMobile}}' +
                            '<a href="#" class="crema-new-review-link btn-link" data-product-code="{{enModelName}}" review-source="mobile_my_orders">리뷰작성</a>' +
                        '{{#else}}' +
                            '<a href="#" class="crema-new-review-link btn-link" data-product-code="{{enModelName}}">리뷰작성</a>' +
                        '{{/if}}' +
                    '{{/if}}' +
                '</div>' +
                '{{#if disabled}}<p class="product-on"><span class="blind">보유중인 제품이</span>{{#if disabledReason}}{{disabledReason}}{{#else}}단종되었습니다.{{/if}}</p>{{/if}}' +
            '</div>' +
            '{{#if inquryBtn}}' +
                '<div class="btn-group">' +
                    '{{#if inquryBtn.tooltip}}' +
                        '<div class="notice">' +
                            '<p>{{inquryBtn.tooltip}}</p>' +
                            '<button type="button" class="btn-off" aria-hidden="true"><span class="blind">닫기</span></button>' +
                        '</div>' +
                    '{{/if}}' +
                    '<a href="{{inquryBtn.url}}" class="btn border size-m newProdCheck-btn"><span>{{inquryBtn.title}}</span></a>' +
                '</div>' +
            '{{/if}}' +
            '<button type="button" class="btn-delete"><span class="blind">보유제품 삭제</span></button>' +
        '</div>' +
    '</li>'

    var manualListItemTemplate = '<li class="lists"><div class="ui_flexible_box"><div class="inner ui_flexible_cont">' +
        '<p class="guide-tit">제품 사용설명서</p>' +
        '<p class="guide-desc">{{title}}</p>' +
        '<div class="bottom-tbl">' +
            '<div class="cell">' +
                '<ul class="info-list">' +
                    '<li><span class="blind">등록일</span>{{date}}</li>' +
                    '<li><span class="blind">언어</span>{{language}}</li>' +
                '</ul>' +
            '</div>' +
            '<div class="cell">' +
                '{{#each item in files}}' +
                    '<button type="button" class="btn size border" data-file-url="{{item.url}}"><span>{{item.ext}}</span><span class="blind">파일 다운로드</span></button>' +
                '{{/each}}' +
            '</div>' +
        '</div>' +
    '</div></div></li>'

    var downloadListItemTemplate = '<li>' +
        '<p class="tit">' +
            '<button type="button" class="btn-info" data-href="{{detailUrl}}" data-cseq="{{cSeq}}">{{title}}</button>' +
        '</p>' +
        '<div class="info-wrap">' +
            '<ul class="options">' +
                '<li>{{category}}</li><li>{{date}}</li>' +
            '</ul>' +
            '<div class="btn-wrap">' +
                '{{#set os = file.os}}{{#set size = file.size}}' +
                '<a href="{{file.src}}" class="btn border size btn-download"><span>다운로드{{#if os}} {{os}}{{/if}}{{#if size}} {{size}}{{/if}}</span></a>' +
            '</div>' +
        '</div>' +
    '</li>';

    var checkModelSuccess = false;
    var checkSerialSuccess = false;

    var myProductRegistration = {
        init: function() {
            var self = this;
            
            //타이머
            self.searchTimer = null;

            self.loadingCount = 0;
            //크레마
            lgkorUI.cremaLogin();
            
            self.isMobileNow = false;
            if(vcui.detect.isMobile){
                self.isMobileNow = true;
            }

            vcui.require(['ui/validation', 'ui/pagination'], function () {             
                self.setting();
                self.bindEvents();
                self.bindPopupEvents();

                var hiddenInput = lgkorUI.getHiddenInputData();
                var buyplace = hiddenInput.buyplace;
                var placeArr = buyplace.split(',');
                if(placeArr.length > 0) {
                    var $select = self.$registMyProductMainPage.find('#slt02');
                    $select.empty();
                    $select.append('<option value="" class="placeholder">구매 장소 유형 선택</option>');
                    placeArr.forEach(function(item,index){
                        $select.append('<option value="'+item+'">'+item+'</option>');
                    });
                    $select.vcSelectbox('update');
                }

                var year = hiddenInput.year;
                year = year.split(',');
                if(year.length > 0) {
                    self.$yearSelect.empty();
                    self.$yearSelect.append('<option value="" class="placeholder">선택</option>');
                    year.forEach(function(item,index){
                        self.$yearSelect.append('<option value="'+item+'">'+item+'</option>');
                    });
                    self.$yearSelect.vcSelectbox('update');
                    self.thisYear = year[0];
                } else {
                    self.thisYear = "";
                }

                self.thisMonth = parseInt(hiddenInput.month);

                self.requestMoreData(1);
                self.requestOwnData(false);

                self.modelCode = lgkorUI.getParameterByName('modelCode');
                self.serialNumber = lgkorUI.getParameterByName('serialNumber');
                self.factoryModel = lgkorUI.getParameterByName('factoryModel');
                if(self.modelCode || self.serialNumber) {
                    self.registMyProductPopupClear();
                    self.$registMyProductMainPage.show();
                    self.$modelCheckHelpPage.hide();               
                    self.$registMyProductPopup.vcModal();
                }
            });
        },

        setting: function() {
            var self = this;  
            self.$contents = $('div.lnb-contents');
            var $tab = $('.tabs-wrap.ui_tab');
            self.$registProductTab = $tab.find('li:eq(0) a');
            self.$myProductTab = $tab.find('li:eq(1) a');

            //등록가능제품
            self.$registProductList = self.$contents.find('div.my-product-lists:eq(0)');
            self.$registProductMoreBtn = self.$registProductList.find('button.btn-moreview');
            //self.$registProductNoData = self.$registProductList.find('div.no-data');
            self.$productRegistSelf = self.$registProductList.find('div.btm-box button');

            //보유제품목록
            self.$myProductList = self.$contents.find('div.my-product-lists:eq(1)');
            self.$myProductNoData = self.$myProductList.find('div.no-data');

            //보유제품 등록 팝업
            self.$registMyProductPopup = $('#registMyProductPopup');
            self.$registMyProductPopup.find('input').attr('autocomplete','off');
            self.$myProductinputLayerAutoComplete = self.$registMyProductPopup.find('.input-layer-wrap .input-layer');

            //보유제품 등록 페이지
            self.$registMyProductMainPage = self.$registMyProductPopup.find('div.page-change:eq(0)');
            self.$modelCheckHelpPage = self.$registMyProductPopup.find('div.page-change:eq(1)');
            //년도 선택 셀렉트
            self.$yearSelect = self.$registMyProductMainPage.find('.ui_selectbox[name="year"]');
            //월 선택 셀렉트
            self.$monthSelect = self.$registMyProductMainPage.find('.ui_selectbox[name="month"]');

            var $inputs = self.$registMyProductMainPage.find('dl.forms div.box div.input-wrap input');
            var $buttons = self.$registMyProductMainPage.find('dl.forms div.box div.cell button');

            //모델번호
            self.$modelInput = $inputs.eq(0);
            self.$modelCheckOk = self.$modelInput.siblings('p.comp');
            self.$modelCheckButton = $buttons.eq(0);
            self.$modelCheckOk.hide();

            //시리얼넘버
            self.$snInput = $inputs.eq(1);
            //BTOCSITE-4086
            self.$snCheckOk = self.$snInput.siblings('p.comp');
            self.$snCheckButton = $buttons.eq(1);
            //BTOCSITE-4086
            self.$snCheckOk.hide();

            // 대문자로 입력받기
            self.$modelInput.css('text-transform', 'uppercase');
            self.$snInput.css('text-transform', 'uppercase');
            
            var register = {
                year:{
                    required: true,
                    errorMsg: "날짜를 선택해주세요.",
                    msgTarget: '.err-block'
                },
                month:{
                    required: true,
                    errorMsg: "날짜를 선택해주세요.",
                    msgTarget: '.err-block'
                },
            };

            self.registMyProductValidation = new vcui.ui.Validation('article[id="registMyProductPopup"]',{register:register});

            //사용설명서 팝업
            self.$manualPopup = $('#manualPopup');
            self.$manualMoreButton = self.$manualPopup.find('button.btn-moreview');

            //다운로드 팝업
            self.$downloadPopup = $('#downloadPopup');
            //다운로드 페이지
            self.$downloadMainPage = self.$downloadPopup.find('div.page-change:eq(0)');
            self.$downloadDetailPage = self.$downloadPopup.find('div.page-change:eq(1)');
            self.$downloadSearch = self.$downloadMainPage.find('#driverKeyword');
            self.$selectOS = self.$downloadMainPage.find('.ui_selectbox');
            self.$downloadPopupPagination = self.$downloadMainPage.find('.pagination').vcPagination({"scrollTarget":self.$downloadMainPage.find('section'),"scrollTop":100});

            //모델병 확인방법 팝업
            //self.$modelCheckHelpPopup = $('#modelCheckHelpPopup');

            //nodata
            //03-31 정승우 멤버십/마케팅 관련 데이타 가져오는게 아직 미흡하여 일단 막음
            /*
            var hiddenData = lgkorUI.getHiddenInputData();
            var membership = lgkorUI.stringToBool(hiddenData.membership);
            var marketing = lgkorUI.stringToBool(hiddenData.marketing);
            if(membership) {
                if(marketing) {
                    self.$registProductNoData = self.$contents.find('div.no-data');
                } else {
                    self.$registProductNoData = self.$contents.find('div.no-data-case:eq(1)');
                }
            } else {
                self.$registProductNoData = self.$contents.find('div.no-data-case:eq(0)');
            }
            */
            self.$registProductNoData = self.$contents.find('div.no-data');
        },

        bindEvents: function() {
            var self = this;
            
            //등록가능제품 보유제품으로 등록하기
            self.$registProductList.on('click','div.enroll-list ul li div.btn-group a', function(e) {
                e.preventDefault();
                var $li = $(this).parents('li');
                /*
                var _id = $li.attr('data-model-id');
                var sku = $li.attr('data-sku');
                var ordNo = $li.attr('data-ord-no');
                var modelCode = $li.attr('data-model-code');
                var param = {
                    "id":_id,
                    "sku":sku,
                    "ordNo":ordNo,
                    "modelCode":modelCode
                };
                */
                var param = $li.data('model');
                var ajaxUrl = self.$contents.attr('data-add-url');
                self.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    $li.remove();

                    //현재 탭과 다른탭의 카운트를 갱신하기위해 모두다 호출한다
                    self.requestMoreData(1);
                    self.requestOwnData(true);
                    self.hideLoading();
                    /*
                    var item = result.data;
                    if(item) {
                        var $list = self.$myProductList.find('>ul');
                        item.saleDate = vcui.date.format(item.saleDate,'yyyy.MM');
                        item.creationDate = vcui.date.format(item.creationDate,'yyyy.MM.dd');
                        item.nextCareServiceDate = item.nextCareServiceDate ? vcui.date.format(item.nextCareServiceDate,'yyyy.MM.dd') : null;
                        $list.append(vcui.template(ownListItemTemplate, item));
                        self.checkNoData();
                        $li.remove();
                        $(window).trigger("toastshow", "제품 등록이 완료되었습니다.");
                    }
                    */
                }, "POST", null, null, null, true, function(err){
                    self.hideLoading(true);
                });
            });

            //등록가능제품 더보기
            self.$registProductMoreBtn.on('click', function(e) {
                var hiddenData = lgkorUI.getHiddenInputData();
                var page = parseInt(hiddenData.page) + 1;
                self.requestMoreData(page);
            });
            
            //크레마# 이동 막음
            self.$myProductList.on('click','a.crema-new-review-link', function(e) {
                if($(this).attr('href') == "#") {
                    e.preventDefault();
                }
            });

            //보유제품 직접 등록
            self.$contents.on('click','div.enroll-info button' ,function(e) {
                self.registMyProductPopupClear();    
                self.$registMyProductMainPage.show();
                self.$modelCheckHelpPage.hide();                
                self.$registMyProductPopup.vcModal({opener:$(this)});
                self.$registMyProductMainPage.find('.btn-direct').trigger('click');
            });

            //보유제품 삭제
            self.$myProductList.on('click','>ul li button.btn-delete', function(e) {
                var ajaxUrl = self.$contents.attr('data-remove-url');
                var $this = $(this);

                var $li = $this.parents('li');
                var modelId = $li.attr('data-model-id');
                var ordNo = $li.attr('data-ord-no');
                var modelCode = $li.attr('data-model-code');
                var param = {
                    "modelId":modelId,
                    "ordNo":ordNo,
                    "modelCode":modelCode
                };

                var obj = {title:'', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                    self.showLoading();
                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                        var data = result.data;
                        var success = lgkorUI.stringToBool(data.success);
                        if(success) {
                            $li.remove();
                            self.checkNoData();
                        }
                        self.hideLoading();
                        //현재 탭과 다른탭의 카운트를 갱신하기위해 모두다 호출한다
                        self.requestMoreData(1);
                        self.requestOwnData(false);
                    }, "POST", null, null, null, true, function(err){
                        self.hideLoading(true);
                    });
                }};
                var desc = '선택하신 제품을<br>보유제품에서 삭제하시겠어요?';
                lgkorUI.confirm(desc, obj);
            });

            //보유제품 툴팁 닫기
            self.$myProductList.on('click','>ul li div.notice button', function(e) {
                $(this).parents('.notice').hide();
            });

            //모델명 확인 방법 팝업 열기
            //BTOCSITE-4086
            self.$registMyProductMainPage.on('click','.btn-model-check', function(e) {
                e.preventDefault();
                if(!self.modelData) {
                    var ajaxUrl = self.$registMyProductPopup.attr('data-list-url');
                    lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                        var optionTemplate = '<option value="{{value}}">{{value}}</option>';
                        var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(0)');
                        var data = result.data;
                        self.modelData = data;
                        selectbox.find('option:not(:eq(0))').remove();
                        var arr = data instanceof Array ? data : [];
                        arr.forEach(function(item, index) {
                            item.value = item.categoryName
                            selectbox.append(vcui.template(optionTemplate, {"value":item.categoryName}));
                        });
                        selectbox.vcSelectbox('update');

                        self.$registMyProductMainPage.hide();
                        self.$modelCheckHelpPage.show();
                        //BTOCSITE-4196
                        if( self.$modelCheckHelpPage.find('.example-result').data('init-content') == undefined ) {
                            self.$modelCheckHelpPage.find('.example-result').data('init-content', self.$modelCheckHelpPage.find('.example-result').html())
                        }
                    });
                } else {
                    /*
                    var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(0)');
                    selectbox.vcSelectbox('selectedIndex', 0, true);
                    */
                    self.$registMyProductMainPage.hide();
                    self.$modelCheckHelpPage.show();
                    self.$modelCheckHelpPage.find('section').scrollTop(0);
                }
                self.$modelCheckHelpPage.find('.btn-model').trigger('click');
            });

            
            
            //BTOCSITE-4086
            //보유 제품 직접 등록 : QR 스캔/직접 입력  선택버튼 
            self.$registMyProductMainPage.on('click','.scan-type-inbox button', function(e) {
                e.preventDefault();
                if ($(this).hasClass('btn-qrscan')) {
                    $(this).addClass('active');
                    $('.btn-direct').removeClass('active');
                    $('.info-req-box .qr').show();
                    $('.app-exec').removeClass('active');
                    $('#inp01').attr('readonly','readonly');
                    $('#inp02').attr('readonly','readonly');
                    $('.cell button').attr('disabled', true);
                    $('.btn-prod-reg').attr('disabled', true);
                    $('.pop-sub-title h2').text('입력 정보');

                } else {
                    $(this).addClass('active');
                    $('.btn-qrscan').removeClass('active');
                    $('.info-req-box .qr').hide();
                    $('.app-exec').addClass('active');
                    $('#inp01').removeAttr('readonly');
                    $('#inp02').removeAttr('readonly');
                    $('.cell button').attr('disabled', false);
                    $('.btn-prod-reg').attr('disabled', false);
                    $('.pop-sub-title h2').text('제품 정보');
                }
            });
            //제품별 QR/모델명/제조번호 부착 위치 : 모델명/제조번호/바코드/OR코드 선택 버튼 
            self.$modelCheckHelpPage.on('click','.example-type-inbox button', function(e) {
                e.preventDefault();
                if ($(this).hasClass('btn-model')) {
                    $(this).addClass('active');
                    $('.btn-qrcord').removeClass('active');
                    $('.example-type-list-wrap .bullet-list').hide();
                } else {
                    $(this).addClass('active');
                    $('.btn-model').removeClass('active');
                    $('.example-type-list-wrap .bullet-list').show();
                }
            });

            //사용설명서
            self.$myProductList.on('click','>ul li div.btns button.manual-btn', function(e) {
                var $li = $(this).parents('li');
                var _id = $li.attr('data-model-id');
                var sku = $li.attr('data-model-code');
                self.requestManualData(_id,sku,1,false);
            });

            //다운로드/sw
            self.$myProductList.on('click','>ul li div.btns button.download-btn', function(e) {
                var $li = $(this).parents('li');
                var _id = $li.attr('data-model-id');
                var sku = $li.attr('data-model-code');

                self.$downloadPopup.attr('data-model-id', _id);
                self.$downloadPopup.attr('data-model-code', sku);
                self.$downloadSearch.val("");
                self.$downloadSearch.data('search',null);
                self.requestDownloadData({"page":1}, true, true);
            });
        },

        //검색어 입력중 검색
        requestSearchAutoComplete:function(value) {
            var self = this;
            var ajaxUrl = self.$registMyProductPopup.data('autocompleteUrl');
            var modelName = value.toUpperCase();
            lgkorUI.requestAjaxData(ajaxUrl, {"sku":modelName}, function(result) {
                var data = result.data;

                var arr = (data && data.listData instanceof Array) ? data.listData : [];
                var $list_ul = self.$myProductinputLayerAutoComplete.find('ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>'
                    var replaceText = '<span class="search-word">' + modelName + '</span>';
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":vcui.string.replaceAll(item, modelName, replaceText)}));
                    });
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').addClass('on');
                    self.$myProductinputLayerAutoComplete.find('.no-data').hide();
                } else {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').addClass('on');
                    self.$myProductinputLayerAutoComplete.find('.no-data').show();
                }
                self.$myProductinputLayerAutoComplete.show()
            });
        },

        bindPopupEvents: function() {
            var self = this;

            //모델명 입력 체크
            self.$modelInput.on('input', function(e){
                checkModelSuccess = false;
                self.$modelCheckOk.hide();
                if(e.target.value.length > 20){
                    e.target.value = e.target.value.slice(0, 20);
                }

                clearTimeout(self.searchTimer);
                
                var searchVal = e.target.value;
                if (searchVal.length < 4) {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').removeClass('on');
                    self.$myProductinputLayerAutoComplete.hide();
                } else {
                    self.searchTimer = setTimeout(function() {
                        self.requestSearchAutoComplete(searchVal);
                    }, 300);
                }
            });

            self.$modelInput.on("focusout",function(e){
                e.preventDefault();
                setTimeout(function () {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').removeClass('on');
                    self.$myProductinputLayerAutoComplete.hide();
                },300);
            });

            //모델명 확인 버튼
            self.$modelCheckButton.on('click', function(e){
                var ajaxUrl = self.$registMyProductPopup.attr('data-sku-url');
                var modelName = self.$modelInput.val().toUpperCase();
                if ( modelName === '1') {
                    alert(1);
                    if ($('.btn-qrscan').hasClass('active')) {
                        lgkorUI.confirm("입력된 제품 모델명을 찾을 수 없습니다.<br>직접 입력으로 전환하시겠습니까?", {
                            title: "",
                            cancelBtnName: "확인",
                            okBtnName: "직접 입력하기",
                            ok: function(){
                                self.$registMyProductMainPage.find('.btn-direct').trigger('click');
                            }
                        });
                    }
                }
                lgkorUI.requestAjaxData(ajaxUrl, {"sku":modelName}, function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        checkModelSuccess = true;
                        self.$modelCheckOk.show();
                    } else {
                        checkModelSuccess = false;
                        self.$modelCheckOk.hide();
                        //BTOCSITE-4086 : QR스캔으로 값을 받아온 후 입력된 제품모델이 없을경우 confirm 추가
                        if ($('.btn-qrscan').hasClass('active')) {
                            lgkorUI.confirm("입력된 제품 모델명을 찾을 수 없습니다.<br>직접 입력으로 전환하시겠습니까?", {
                                title: "",
                                cancelBtnName: "확인",
                                okBtnName: "직접 입력하기",
                                ok: function(){
                                    self.$registMyProductMainPage.find('.btn-direct').trigger('click');
                                }
                            });
                        } else {
                            lgkorUI.alert("", {title: "해당 제품 모델명이 존재하지 않습니다."});
                        }
                    }
                });
            });

            //모델명 자동완성 클릭
            self.$myProductinputLayerAutoComplete.on('click', 'a', function (e) {
                e.preventDefault();
                var modelName = $(this).attr('href').replace('#', '');
                if(modelName && modelName.length > 0) {
                    self.$modelInput.val(modelName);
                    self.$modelCheckButton.trigger('click');
                }
            });

            //제조번호 길이 체크
            //2021-08-17 BTOCSITE-4196 수정
            // self.$snInput.on('input', function(e){
            //     checkSerialSuccess = false;
            //     if(e.target.value.length > 18){
            //         e.target.value = e.target.value.slice(0, 18);
            //     }
            // })

            //제조번호 확인
            //2021-08-17 BTOCSITE-4196 수정
            self.$snCheckButton.on('click', function(e){
                // var serialRegex = /^\d{3}[A-Za-z]{4}[\d\A-Za-z]{5,7}$/ /* /^\d{3}[A-Z]{4}[\d\A-Z]{7}$/ */
                var minLengthFlag = self.$snInput.val().length >= 12 ? true: false;
                
                var currentVal = [];
                var checkSerialSuccess = [];
                var regexArry = [/^[0-9]+$/, /^[a-zA-Z0-9]+$/, /^[0-9]+$/];

                currentVal[0] = self.$snInput.val().slice(undefined,3);
                currentVal[1] = self.$snInput.val().slice(3,14);
                currentVal[2] = self.$snInput.val().slice(14,18);

                currentVal.forEach(function(v, i){
                    if( v != "" ) {
                        checkSerialSuccess.push(regexArry[i].test(v))
                    }
                })
                if(minLengthFlag && checkSerialSuccess.indexOf(false) == -1) {
                    //BTOCSITE-4086
                    self.$snCheckOk.show();
                    // lgkorUI.alert("", {title: "제조번호(S/N)가 확인되었습니다."});
                } else {
                    //BTOCSITE-4086 : QR스캔으로 값을 받아온 후 입력된 제품모델이 없을경우 confirm 추가
                    if ($('.btn-qrscan').hasClass('active')) {
                        lgkorUI.confirm("입력된 제조번호를 찾을 수 없습니다.<br>직접 입력으로 전환하시겠습니까?", {
                            title: "",
                            cancelBtnName: "확인",
                            okBtnName: "직접 입력하기",
                            ok: function(){
                                self.$registMyProductMainPage.find('.btn-direct').trigger('click');
                            }
                        });
                    } else {
                        lgkorUI.alert("", {title: "해당 제조번호(S/N)가 존재하지 않습니다.<br>제조번호 확인 후 다시 입력해 주세요."});
                    }
                }
            });

            //구매년도 선택
            self.$yearSelect.on('change', function(e){
                var value = self.$yearSelect.vcSelectbox('selectedOption').value;
                var month = 12;
                if(value == self.thisYear) {
                    //현재 년도
                    month = self.thisMonth;
                }

                self.$monthSelect.empty();
                self.$monthSelect.append('<option value="" class="placeholder">선택</option>');
                for(var i=0;i<month;i++) {
                    self.$monthSelect.append('<option value="'+(i+1)+'">'+(i+1)+'</option>');
                }
                self.$monthSelect.vcSelectbox('update');
            });

            //보유제품 등록
            self.$registMyProductMainPage.on('click','footer div.btn-group button' ,function(e){
                var $button = $(this);
                if($button.index() == 0) {
                    //취소
                    self.$registMyProductPopup.vcModal('close');
                } else {
                    //등록
                    //2021-03-06 제조번호(sn) 필수 제외
                    //if(checkModelSuccess && checkSerialSuccess) {
                        
                    if(checkModelSuccess) {
                        var result = self.registMyProductValidation.validate().success;
                        if(result) {
                            var param = self.registMyProductValidation.getAllValues();
                            //factoryModel
                            var factoryModel = self.$registMyProductMainPage.data('factoryModel');
                            if(factoryModel) {
                                param.factoryModel = factoryModel;
                            } else {
                                param.factoryModel = null;
                            }
                            var ajaxUrl = self.$registMyProductPopup.attr('data-insert-url');
                            self.showLoading();
                            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                                self.$registMyProductPopup.vcModal('close');

                                //현재 탭과 다른탭의 카운트를 갱신하기위해 모두다 호출한다
                                self.requestMoreData(1);
                                self.requestOwnData(true);

                                self.hideLoading();
                            }, "POST", null, null, null, false, function(err){
                                self.hideLoading(true);
                            });
                        }
                    } else {
                        // BTOCSITE-4086 :모델명 / 제조번호 정보를 찾을 수 없을 경우 호출
                        if(!checkModelSuccess && !checkSerialSuccess) {
                            lgkorUI.confirm("<br>입력하신 제품 정보를 찾을 수 없습니다.<br>등록을 원하시는 제품을 이메일로 접수 할 수 있습니다.", {
                                title: "이메일로 접수 하시겠습니까?",
                                cancelBtnName: "취소",
                                okBtnName: "접수하기",
                                ok: function(){
                                    location.href = "/support/email-inquiry/?emailReg";
                                }
                            });
                            // lgkorUI.confirm("입력하신 제품 정보를 찾을 수 없습니다.<br>등록을 원하시는 제품을 이메일로 접수 할 수 있습니다.", {
                            //     title: "",
                            //     cancelBtnName: "취소",
                            //     okBtnName: "이메일 접수하기",
                            //     ok: function(){
                            //         location.href = "/support/email-inquiry/?emailReg";
                            //     }
                            // });
                        }

                        //lgkorUI.alert("", {title: "제품 모델명을 확인해 주세요."});
                        /*
                        if(!checkModelSuccess) {
                            lgkorUI.alert("", {title: "제품 모델명을 확인해 주세요."});
                        } else if(!checkSerialSuccess) {
                            lgkorUI.alert("", {title: "제조번호(S/N)를 확인해 주세요."});
                        }
                        */
                    }
                }
            });

            //메뉴얼 더보기
            self.$manualMoreButton.on('click', function(e){
                var _id = self.$manualPopup.attr('data-model-id');
                var code = self.$manualPopup.attr('data-model-code');
                var page = parseInt(self.$manualPopup.data('page')) + 1;
                self.requestManualData(_id,code,page,true);
            });

            //메뉴얼 다운로드
            self.$manualPopup.on('click','li button' ,function(e){
                var url = $(this).attr('data-file-url');
                if(!(!url)) {
                    window.location = url;
                }
            });

            //소프트웨어 다운로드
            //다운로드팝업 셀렉트OS
            self.$selectOS.on('change', function(e){
                var param = {"page":1};
                var os = self.$selectOS.vcSelectbox('selectedOption').value;
                if(os) {
                    param.os = os;
                }
                var search = self.$downloadSearch.data('search');
                if(search) {
                    param.search = search;
                }
                self.requestDownloadData(param, false, false);
            });
            
            //다운로드팝업 페이지
            self.$downloadPopupPagination.on('page_click', function(e, data) {
                var param = {"page":data};
                var os = self.$selectOS.vcSelectbox('selectedOption').value;
                if(os) {
                    param.os = os;
                }
                var search = self.$downloadSearch.data('search');
                if(search) {
                    param.search = search;
                }
                self.requestDownloadData(param, false, false);
            });

            //다운로드 파일
            /*
            self.$downloadPopup.on('click','li button.btn', function(e){
                var url = $(this).attr('data-file-url');
                if(!(!url)) {
                    window.location = url;
                }
            });
            */
           
            //다운로드 파일 상세 보기
            self.$downloadPopup.on('click','button.btn-info', function(e){
                var $li = $(this).parents('li');
                var downloadUrl = $li.find('a.btn-download').attr('href');
                self.$downloadPopup.data('downloadUrl',downloadUrl);
                var url = $(this).data('href');
                if(url) {
                    lgkorUI.requestAjaxData(url, null, function(result){
                        $('#detail-file-modal').html(result);
                        var driverDatilContent = $('#detail-file-modal').find('#driverDatilContent p').text();
                        $('#detail-file-modal').find('#driverDatilContent p').html(vcui.string.replaceAll(driverDatilContent, '\n', '<br>'));                        
                        var $result = $('#detail-file-modal').find('section:eq(0)');
                        self.$downloadDetailPage.find('section:eq(0)').html($result.html());
                        self.$downloadMainPage.hide();
                        self.$downloadDetailPage.show();
                    }, null, "html");
                }
            });

            //다운로드 상세 파일 다운로드 버튼
            self.$downloadPopup.on('click','div.page-change:eq(1) div.file-wrap button', function(e){
                var downloadUrl = self.$downloadPopup.data('downloadUrl');
                if(downloadUrl) {
                    window.location = downloadUrl;
                }
            });

            //다운로드 상세 검색
            self.$downloadSearch.keydown(function(key) {
                if (key.keyCode == 13) {
                    key.preventDefault();
                    self.$downloadPopup.find('button.btn-search').trigger('click');
                }
            });

            //다운로드 상세 검색
            self.$downloadPopup.on('click','div.search-input button.btn-search', function(e){
                var param = {"page":1};
                var search = self.$downloadSearch.val();
                if(search && search.length > 0) {
                    param.search = search;
                } else {
                    lgkorUI.alert("", {title: "검색어를 입력하고 조회해 주세요."});
                    return;
                }
                //if(search) {
                    self.$downloadSearch.data('search',search);
                    //var param = {"page":1,"search":search};
                    var os = self.$selectOS.vcSelectbox('selectedOption').value;
                    if(os) {
                        param.os = os;
                    }
                    self.requestDownloadData(param, false, false);
                //} else {
                    //$(this).parents('div.keyword-search').find('.search-error').show();
                //}
            });

            /*
            //다운로드 검색어 삭제 및 초기화
            self.$downloadPopup.on('click','div.search-input button.btn-delete', function(e){
                self.$downloadSearch.data('search',null);
                var param = {"page":1};
                var os = self.$selectOS.vcSelectbox('selectedOption').value;
                if(os) {
                    param.os = os;
                }
                self.requestDownloadData(param, false, false);
            });
            */

            self.$downloadDetailPage.on('click','footer button', function(e){
                self.$downloadDetailPage.hide();
                self.$downloadMainPage.show();
            });

            //모델 확인 방법 팝업
            //카테고리 선택
            self.$modelCheckHelpPage.on('change', '.ui_selectbox:eq(0)', function(e){
                var index = this.selectedIndex;
                var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(1)');
                if(index == 0) {
                    selectbox.prop('disabled', true);
                } else {
                    selectbox.prop('disabled', false);
                    index--;
                    var modelData = self.modelData[index];
                    var optionTemplate = '<option value="{{modelName}}" data-image-url="{{imageUrl}}" data-image-alt="{{imageAlt}}" data-text="{{text}}">{{modelName}}</option>';

                    selectbox.find('option:not(:eq(0))').remove();
                    var arr = modelData.modelList instanceof Array ? modelData.modelList : [];
                    arr.forEach(function(item, index) {
                        if(!item.imageUrl || !item.imageUrl.length) {
                            item.text = item.imageAlt = "제품 이미지 준비중입니다.";
                            item.imageUrl = "/lg5-common/images/img-nodata.svg";
                        }
                        selectbox.append(vcui.template(optionTemplate, item));
                    });                        
                    selectbox.vcSelectbox('update');
                }
                selectbox.vcSelectbox('selectedIndex', 0, true);
            });

            //모델 선택
            self.$modelCheckHelpPage.on('change', '.ui_selectbox:eq(1)', function(e){
                var index = this.selectedIndex;
                var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(1)');
                var option = selectbox.find('option').eq(index);

                var imageUrl = option.attr('data-image-url');
                var desc = option.attr('data-text');
                if(desc) {
                    self.$modelCheckHelpPage.find('div.example-result p.txt').html(vcui.string.replaceAll(option.attr('data-text'),"\n","<br>"));
                }
                if(imageUrl) {
                    self.$modelCheckHelpPage.find('div.example-result img').attr({'src':option.attr('data-image-url'),'alt':option.attr('data-image-alt')}).css('opacity',1);
                }
            });

            //보유제품 직접 등록 팝업 뒤로가기
            self.$modelCheckHelpPage.on('click','footer button' ,function(e) {
                var initExampleContent = self.$modelCheckHelpPage.find('.example-result').data('initContent');
                self.$registMyProductMainPage.show();
                self.$modelCheckHelpPage.hide();
                //BTOCSITE-4196
                self.$modelCheckHelpPage.find('.ui_selectbox:eq(0)').vcSelectbox('selectedIndex', 0, true);
                self.$modelCheckHelpPage.find('.example-result').html(initExampleContent)

            });
        },

        showLoading: function () {
            var self = this;
            ++self.loadingCount;
            self.loadingTimer = setTimeout(function() {
                self.hideLoading(true);
            }, 15000);
            lgkorUI.showLoading();
        },

        hideLoading: function (force) {
            var self = this;
            --self.loadingCount;
            if(self.loadingCount <= 0 || force) {
                clearTimeout(self.loadingTimer);
                self.loadingCount = 0;
                lgkorUI.hideLoading();
            }  
        },

        requestOwnData: function(addNewItem) {
            var self = this;
            var ajaxUrl = self.$contents.attr('data-own-list-url');
            self.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                var data = result.data;
                var totalListCount = data.totalListCount ? data.totalListCount : 0;
                //var $title = self.$myProductList.siblings('.tit-wrap');
                if(parseInt(totalListCount) > 0) {
                    //$title.find('.tit').text('보유 제품 목록('+ vcui.number.addComma(totalListCount) + ')');
                    self.$myProductTab.text('보유 제품 목록('+ vcui.number.addComma(totalListCount) + ')').attr('data-contents', '보유 제품 목록'); //BTOCSITE-1057 : data-contents 추가 2021-08-09;
                } else {
                    //$title.find('.tit').text('보유 제품 목록');
                    self.$myProductTab.text('보유 제품 목록').attr('data-contents', '보유 제품 목록'); //BTOCSITE-1057 : data-contents 추가 2021-08-09;
                }

                var arr = data.listData instanceof Array ? data.listData : [];
                var $list = self.$myProductList.find('>ul');
                $list.empty();
                arr.forEach(function(item, index) {
                    if(item.userType == "USER") {
                        item.saleDate = vcui.date.format(item.saleDate,'yyyy.MM');
                    } else {
                        item.saleDate = vcui.date.format(item.saleDate,'yyyy.MM.dd');
                    }
                    item.creationDate = vcui.date.format(item.creationDate,'yyyy.MM.dd');
                    item.nextCareServiceDate = item.nextCareServiceDate ? vcui.date.format(item.nextCareServiceDate,'yyyy.MM.dd') : null;
                    item.reviewBtn = lgkorUI.stringToBool(item.reviewBtn);
                    item.isMobile = self.isMobileNow;
                    $list.append(vcui.template(ownListItemTemplate, item));
                });
                self.checkNoData();

                //크레마 리로드
                lgkorUI.cremaReload();

                if(addNewItem) {
                    $(window).trigger("toastshow", "제품 등록이 완료되었습니다.");
                }
                self.hideLoading();
            }, null, null, null, null, true, function(err){
                self.hideLoading(true);
            });
        },

        requestMoreData: function(page) {
            var self = this;
            var ajaxUrl = self.$contents.attr('data-list-url');
            self.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, {"page":page}, function(result) {
                var data = result.data;
                var param = result.param;
                var totalListCount = data.totalListCount ? data.totalListCount : 0;
                //var $title = self.$registProductList.siblings('.tit-wrap');
                if(parseInt(totalListCount) > 0) {
                    //$title.find('.tit').text('등록 가능 제품('+ vcui.number.addComma(totalListCount) + ')');
                    self.$registProductTab.text('등록 가능 제품('+ vcui.number.addComma(totalListCount) + ')').attr('data-contents', '등록 가능 제품'); //BTOCSITE-1057 : data-contents 추가 2021-08-09
                } else {
                    //$title.find('.tit').text('등록 가능 제품');
                    self.$registProductTab.text('등록 가능 제품').attr('data-contents', '등록 가능 제품'); //BTOCSITE-1057 : data-contents 추가 2021-08-09
                }

                self.setPageData(param.pagination);
                var arr = data.listData instanceof Array ? data.listData : [];
                var $list = self.$registProductList.find('div.enroll-list ul');
                $list.empty();
                arr.forEach(function(item, index) {
                    item.jsonModel = JSON.stringify(item);
                    item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                    $list.append(vcui.template(productListItemTemplate, item));
                });
                self.checkNoData();
                self.hideLoading();
            }, null, null, null, null, true, function(err){
                self.hideLoading(true);
            });
        },

        setPageData: function(param) {
            var self = this;
            var page = parseInt(param.page);
            var totalCount = parseInt(param.totalCount);
            if (page < totalCount) {
                self.$registProductMoreBtn.css('display','block');
            } else {
                //더이상 없다
                self.$registProductMoreBtn.css('display','none');
            }

            lgkorUI.setHiddenInputData({
                totalCount: totalCount,
                page: page
            });
        },

        checkNoData: function() {
            var self = this;
            var $list = self.$registProductList.find('div.enroll-list ul>li');
            if($list.length > 0) {
                var param = lgkorUI.getHiddenInputData();
                var page = parseInt(param.page);
                var totalCount = parseInt(param.totalCount);
                if (page < totalCount) {
                    self.$registProductMoreBtn.css('display','block');
                } else {
                    //더이상 없다
                    self.$registProductMoreBtn.css('display','none');
                }
                self.$registProductNoData.hide();
                self.$registProductList.find('div.enroll-list .recommend-text').show();
                self.$registProductList.find('div.enroll-list ul').show();
            } else {
                self.$registProductMoreBtn.css('display','none');
                self.$registProductNoData.hide();
                self.$registProductList.find('div.enroll-list .recommend-text').hide();
                self.$registProductList.find('div.enroll-list ul').hide();
            }

            $list = self.$myProductList.find('>ul>li');
            if($list.length > 0) {
                self.$myProductNoData.hide();
            } else {
                self.$myProductNoData.hide();
            }
        },

        registMyProductPopupClear: function() {
            var self = this;

            checkModelSuccess = false;
            checkSerialSuccess = false;

            self.$modelCheckOk.hide();
            
            self.$registMyProductMainPage.find('input').val("");
            if(self.modelCode) {
                self.$registMyProductMainPage.find('input[name=sku]').val(self.modelCode);
                self.modelCode = null;
            }
            if(self.serialNumber) {
                //시리얼
                self.$registMyProductMainPage.find('input[name=sn]').val(self.serialNumber);
                self.serialNumber = null;
            }
            if(self.factoryModel) {
                self.$registMyProductMainPage.data('factoryModel',self.factoryModel);
                self.factoryModel = null;
            } else {
                self.$registMyProductMainPage.data('factoryModel',null);
            }
            self.$registMyProductMainPage.find('.ui_selectbox').vcSelectbox('selectedIndex',0);
            self.$registMyProductMainPage.find('.err-block').hide();

            self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').removeClass('on');
            self.$myProductinputLayerAutoComplete.hide();

            self.$modelCheckHelpPage.find('div.example-result p.txt').text('제품 카테고리를 선택하면, 해당 제품의 모델명 확인 방법을 안내해 드립니다.');
            self.$modelCheckHelpPage.find('div.example-result img').css('opacity',0);
            var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(0)');
            selectbox.vcSelectbox('selectedIndex', 0, true);
        },

        requestManualData: function(_id, sku, page, isMore) {
            var self = this;
            var ajaxUrl = self.$manualPopup.attr('data-list-url');
            self.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, {"id":_id, "sku":sku, "page":page}, function(result) {
                var data = result.data;
                var param = result.param;
                var pagination = param.pagination;

                self.$manualPopup.attr({"data-model-id":_id, "data-model-code":sku, "data-page": pagination.page,"data-totalCount": pagination.totalCount});
                self.$manualPopup.find('div.tit-wrap .tit em').text(vcui.number.addComma(data.totalCount));

                if(parseInt(pagination.page) <  parseInt(pagination.totalCount)) {
                    self.$manualMoreButton.css('display','block');
                } else {
                    self.$manualMoreButton.css('display','none');
                }
                var arr = data.listData instanceof Array ? data.listData : [];
                var $list = self.$manualPopup.find('div.user-guide-lists>ul');
                if(!isMore) {
                    $list.empty();
                }
                arr.forEach(function(item, index) {
                    item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                    $list.append(vcui.template(manualListItemTemplate, item));
                });

                if(!isMore) {
                    self.$manualPopup.vcModal({opener:self.$manualMoreButton});
                }

                lgkorUI.resetFlexibleBox();
                self.hideLoading();
            }, null, null, null, null, true, function(err){
                self.hideLoading(true);
            });
        },

        requsetOSData:function(param) {
            var self = this;
            var ajaxUrl = self.$downloadPopup.attr('data-os-url');
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var selectedOSValue = self.$selectOS.vcSelectbox('selectedOption').value;
                var selectedIndex = 0;

                var data = result.data;
                self.$selectOS.empty();
                var arr = data instanceof Array ? data : [];
                self.osList = arr;
                if(arr.length < 2) {
                    self.$selectOS.prop('disabled', true);
                    //self.$selectOS.append('<option value="">없음</option>');
                } else {
                    self.$selectOS.prop('disabled', false);
                }
                    //self.$selectOS.append('<option value="">전체</option>');
                arr.forEach(function(item, index){
                    if(selectedOSValue == item.code) {
                        selectedIndex = index;
                    }
                    self.$selectOS.append('<option value="' + item.code +'">' + item.codeName + '</option>');
                });
                self.$selectOS.vcSelectbox('update');
                self.$selectOS.vcSelectbox('selectedIndex',selectedIndex,false);
            });
        },

        requestDownloadData: function(param, selectOSUpdate, openDownloadPopup) {
            var self = this;

            //self.$downloadPopup.find('div.keyword-search .search-error').hide();

            if(!self.osList) {
                var ajaxUrl = self.$downloadPopup.attr('data-os-url');
                self.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    self.$selectOS.empty();
                    var arr = data instanceof Array ? data : [];
                    self.osList = arr;
                    if(arr.length < 2) {
                        self.$selectOS.prop('disabled', true);
                        //self.$selectOS.append('<option value="">없음</option>');
                    } else {
                        self.$selectOS.prop('disabled', false);
                    }
                        //self.$selectOS.append('<option value="">전체</option>');
                    arr.forEach(function(item, index){
                        self.$selectOS.append('<option value="' + item.code +'">' + item.codeName + '</option>');
                    });
                    self.$selectOS.vcSelectbox('update');
                    self.$selectOS.vcSelectbox('selectedIndex',0,false);

                    self.requestDownloadData(param, selectOSUpdate, openDownloadPopup);
                    self.hideLoading();
                }, null, null, null, null, true, function(err){
                    self.hideLoading(true);
                });
            } else {
                if(param.search) {
                    self.$downloadSearch.val(param.search);
                }

                var _id = self.$downloadPopup.attr('data-model-id');
                if(_id) {
                    param.id = _id;
                }
                var sku = self.$downloadPopup.attr('data-model-code');
                if(sku) {
                    param.sku = sku;
                }

                //OS 또 갱신
                self.requsetOSData(param);

                var ajaxUrl = self.$downloadPopup.attr('data-list-url');

                self.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;

                    self.$downloadPopupPagination.vcPagination('setPageInfo',param.pagination);
                    self.$downloadMainPage.find('div.tit-wrap .tit em').text(vcui.number.addComma(data.totalCount));

                    //if(selectOSUpdate) {

                        /*
                        var selectedOSValue = self.$selectOS.vcSelectbox('selectedOption').value;
                        var selectedIndex = 0;

                        self.$selectOS.empty();
                        var arr = data.osOption instanceof Array ? data.osOption : [];
                        if(arr.length < 2) {
                            self.$selectOS.prop('disabled', true);
                            //self.$selectOS.append('<option value="">없음</option>');
                        } else {
                            self.$selectOS.prop('disabled', false);
                        }
                            //self.$selectOS.append('<option value="">전체</option>');
                            arr.forEach(function(item, index){
                                if(selectedOSValue == item.code) {
                                    selectedIndex = index;
                                }
                                self.$selectOS.append('<option value="' + item.code +'">' + item.codeName + '</option>');
                            });
    //                    }
                        self.$selectOS.vcSelectbox('update');
                        if(selectOSUpdate) {
                            self.$selectOS.vcSelectbox('selectedIndex',0,false);
                        } else {
                            self.$selectOS.vcSelectbox('selectedIndex',selectedIndex,false);
                        }
                        */

                    //}

                    arr = data.listData instanceof Array ? data.listData : [];
                    var $list = self.$downloadMainPage.find('div.download-list-wrap>ul');
                    $list.empty();
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                            /*
                            var list = item.list;
                            if(list) {
                                list.forEach(function(item, index) {
                                    list[index].date = vcui.date.format(item.date,'yyyy.MM.dd');
                                });
                            }
                            */
                            $list.append(vcui.template(downloadListItemTemplate, item));
                        });
                        self.$downloadMainPage.find('.no-data').hide();
                        self.$downloadMainPage.find('div.desc-wrap p.desc').show();
                        self.$downloadPopupPagination.show();

                        $list.find('.ui_dropdown').vcDropdown();
                    } else {
                        self.$downloadMainPage.find('.no-data').show();
                        self.$downloadMainPage.find('div.desc-wrap p.desc').hide();
                        self.$downloadPopupPagination.hide();
                    }

                    if(openDownloadPopup) {
                        self.$downloadDetailPage.hide();
                        self.$downloadMainPage.show();
                        self.$downloadPopup.vcModal();
                    }
                    self.hideLoading();
                }, null, null, null, null, true, function(err){
                    self.hideLoading(true);
                });
            }
        }
    }

    $(document).ready(function() {
        myProductRegistration.init();
    });
})();