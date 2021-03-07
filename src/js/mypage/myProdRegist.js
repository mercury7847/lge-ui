(function(){
    var productListItemTemplate = '<li class="lists" data-model-id="{{id}}" data-sku="{{sku}}" data-ord-no="{{ordNo}}" data-model-code="{{modelCode}}">' +
        '<div class="inner">' +
            '<div class="thumb" aria-hidden="true"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>' +
            '<div class="info-wrap">' +
                '<p class="name"><span class="blind">모델명</span>{{sku}}</p>' +
                '<ul class="info-lists">' +
                    '<li><dl><dt>구매일자</dt><dd>{{date}}</dd></dl></li>' +
                    '<li><dl><dt>카테고리</dt><dd>{{category}}</dd></dl></li>' +
                    '<li><dl><dt>구매처</dt><dd>{{store}}</dd></dl></li>' +
                '</ul>' +
                '<div class="btn-group"><a href="#n" class="btn border size-m"><span>제품 등록</span></a></div>' +
            '</div>' +
        '</div>' +
    '</li>'

    var ownListItemTemplate = '<li class="lists" data-model-id="{{modelId}}" data-ord-no="{{ordNo}}" data-model-code="{{modelCode}}">' +
        '<div class="inner">' +
            '<div class="thumb{{#if disabled}} saleend{{/if}}" aria-hidden="true">' +
                '<img src="{{imageUrl}}" alt="{{imageAlt}}">' +
            '</div>' +
            '<div class="info-wrap">' +
                '<p class="name"><span class="blind">모델명</span>{{#raw modelName}}</p>' +
                '<p class="e-name"><span class="blind">영문모델명</span>{{enModelName}}</p>' +
                '<ul class="info-lists period">' +
                    '{{#if saleDate}}<li><dl><dt>구매일자</dt><dd>{{saleDate}}</dd></dl></li>{{/if}}' +
                    '{{#if creationDate}}<li><dl><dt>등록일자</dt><dd>{{creationDate}}</dd></dl></li>{{/if}}' +
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

    var downloadListItemTemplate2 = '<li class="lists ui_dropdown">' +
        '<div class="inner titles">' +
            '<a href="#"><div class="info-cell">' +
                '<p class="file-name">{{title}}</p>' +
                '<ul class="info-list">' +
                    '<li><span class="blind">버전</span>{{version}}</li>' +
                    '<li><span class="blind">카테고리</span>{{category}}</li>' +
                    '<li><span class="blind">등록일</span>{{date}}</li>' +
                '</ul>' +
            '</div></a>' +
            '<div class="btn-cell">' +
                '<span class="col"><button type="button" class="btn size border" data-file-url="{{url}}"><span>다운로드 {{fileSize}}</span></button></span>' +
                '{{#if list}}<span class="col"><button type="button" class="more-view-btn ui_dropdown_toggle">이전 버전 <span>보기</span></button></span>{{/if}}' +
            '</div>' +
        '</div>' +
        '{{#if list}}<ul class="prev-ver-list ui_dropdown_list">' +
            '{{#each item in list}}<li class="inner">' +
                '<a href="#"><div class="info-cell">' +
                    '<p class="file-name">{{item.title}}</p>' +
                    '<ul class="info-list">' +
                        '<li><span class="blind">버전</span>{{item.version}}</li>' +
                        '<li><span class="blind">카테고리</span>{{item.category}}</li>' +
                        '<li><span class="blind">등록일</span>{{item.date}}</li>' +
                    '</ul>' +
                '</div></a>' +
                '<div class="btn-cell">' +
                    '<span class="col"><button type="button" class="btn size border" data-file-url="{{item.url}}"><span>다운로드 {{item.fileSize}}</span></button></span>' +
                '</div>' +
            '</li>{{/each}}' +
        '</ul>{{/if}}' +
    '</li>'

    var checkModelSuccess = false;
    var checkSerialSuccess = false;

    var myProductRegistration = {
        init: function() {
            var self = this;
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
                    self.thisYear = year[year.length-1];
                } else {
                    self.thisYear = "";
                }

                self.thisMonth = parseInt(hiddenInput.month);

                self.requestMoreData(1);
                self.requestOwnData();

                self.modelCode = lgkorUI.getParameterByName('modelCode');
                if(self.modelCode) {
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
            self.$snCheckButton = $buttons.eq(1);

            // 대문자로 입력받기
            self.$modelInput.css('text-transform', 'uppercase');
            self.$snInput.css('text-transform', 'uppercase');
            
            var register = {
                year:{
                    required: true,
                    errorMsg: "날짜를 선책해주세요.",
                    msgTarget: '.err-block'
                },
                month:{
                    required: true,
                    errorMsg: "날짜를 선책해주세요.",
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
            self.$downloadPopupPagination = self.$downloadMainPage.find('.pagination').vcPagination();

            //모델병 확인방법 팝업
            //self.$modelCheckHelpPopup = $('#modelCheckHelpPopup');

            //nodata
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

        },

        bindEvents: function() {
            var self = this;

            //등록가능제품 등록하기
            self.$registProductList.on('click','>ul li div.btn-group a', function(e) {
                e.preventDefault();
                var $li = $(this).parents('li');
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
                var ajaxUrl = self.$contents.attr('data-add-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
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
                });
            });

            //등록가능제품 더보기
            self.$registProductMoreBtn.on('click', function(e) {
                var hiddenData = lgkorUI.getHiddenInputData();
                var page = parseInt(hiddenData.page) + 1;
                self.requestMoreData(page);
            });
            
            //보유제품 직접 등록
            self.$registProductList.on('click','div.btm-box button' ,function(e) {
                self.registMyProductPopupClear();    
                self.$registMyProductMainPage.show();
                self.$modelCheckHelpPage.hide();                
                self.$registMyProductPopup.vcModal();
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
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                        var data = result.data;
                        var success = lgkorUI.stringToBool(data.success);
                        if(success) {
                            $li.remove();
                            self.checkNoData();
                        }
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
            self.$registMyProductMainPage.on('click','p.link a', function(e) {
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
                    });
                } else {
                    var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(0)');
                    selectbox.vcSelectbox('selectedIndex', 0, true);

                    self.$registMyProductMainPage.hide();
                    self.$modelCheckHelpPage.show();
                }
            });

            //사용설명서
            self.$myProductList.on('click','>ul li div.btns button.manual-btn', function(e) {
                var _id = $(this).parents('li').attr('data-model-id');
                self.requestManualData(_id,1,false);
            });

            //다운로드/sw
            self.$myProductList.on('click','>ul li div.btns button.download-btn', function(e) {
                var _id = $(this).parents('li').attr('data-model-id');
                self.$downloadPopup.attr('data-model-id', _id);
                self.$downloadSearch.val("");
                self.$downloadSearch.data('search',null);
                self.requestDownloadData({"page":1}, true, true);
            });

        },

        bindPopupEvents: function() {
            var self = this;

            //모델명 확인
            self.$modelInput.on('input', function(e){
                checkModelSuccess = false;
                self.$modelCheckOk.hide();
                if(e.target.value.length > 20){
                    e.target.value = e.target.value.slice(0, 20);
                }
            })

            self.$modelCheckButton.on('click', function(e){
                var ajaxUrl = self.$registMyProductPopup.attr('data-sku-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"sku":self.$modelInput.val()}, function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        checkModelSuccess = true;
                        self.$modelCheckOk.show();
                    } else {
                        checkModelSuccess = false;
                        self.$modelCheckOk.hide();
                        lgkorUI.alert("", {title: "해당 제품 모델명이 존재하지 않습니다."});
                    }
                });
            });


            self.$snInput.on('input', function(e){
                checkSerialSuccess = false;
                if(e.target.value.length > 14){
                    e.target.value = e.target.value.slice(0, 14);
                }
            })

            //제조번호 확인

            self.$snCheckButton.on('click', function(e){
                var serialRegex = /^\d{3}[A-Za-z]{4}[\d\A-Za-z]{5,7}$/ /* /^\d{3}[A-Z]{4}[\d\A-Z]{7}$/ */
                checkSerialSuccess = serialRegex.test(self.$snInput.val());
                if(checkSerialSuccess) {
                    lgkorUI.alert("", {title: "제조번호(S/N)가 확인되었습니다."});
                } else {
                    lgkorUI.alert("", {title: "해당 제조번호(S/N)가 존재하지 않습니다.<br>제조번호 확인 후 다시 입력해 주세요."});
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
                            var ajaxUrl = self.$registMyProductPopup.attr('data-insert-url');
                            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                                self.$registMyProductPopup.vcModal('close');
                                self.requestOwnData();
                                $(window).trigger("toastshow", "제품 등록이 완료되었습니다.");
                            });
                        }
                    } else {
                        lgkorUI.alert("", {title: "제품 모델명을 확인해 주세요."});
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
                var page = parseInt(self.$manualPopup.attr('data-count')) + 1;
                self.requestManualData(_id,page,true);
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
                if(search) {
                    param.search = search;
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

            //메뉴얼 확인 방법 팝업
            //카테고리 선택
            self.$modelCheckHelpPage.on('change', '.ui_selectbox:eq(0)', function(e,data){
                var index = data.selectedIndex;
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
            self.$modelCheckHelpPage.on('change', '.ui_selectbox:eq(1)', function(e,data){
                var index = data.selectedIndex;
                var selectbox = self.$modelCheckHelpPage.find('.ui_selectbox:eq(1)');
                var option = selectbox.find('option').eq(index);
                self.$modelCheckHelpPage.find('div.example-result p.txt').text(option.attr('data-text'));
                self.$modelCheckHelpPage.find('div.example-result img').attr({'src':option.attr('data-image-url'),'alt':option.attr('data-image-alt')});
            });

            //보유제품 직접 등록 팝업 뒤로가기
            self.$modelCheckHelpPage.on('click','footer button' ,function(e) {
                self.$registMyProductMainPage.show();
                self.$modelCheckHelpPage.hide();
            });
        },

        requestOwnData: function() {
            var self = this;
            var ajaxUrl = self.$contents.attr('data-own-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                var data = result.data;
                var arr = data.listData instanceof Array ? data.listData : [];
                var $list = self.$myProductList.find('>ul');
                $list.empty();
                arr.forEach(function(item, index) {
                    item.saleDate = vcui.date.format(item.saleDate,'yyyy.MM');
                    item.creationDate = vcui.date.format(item.creationDate,'yyyy.MM.dd');
                    item.nextCareServiceDate = item.nextCareServiceDate ? vcui.date.format(item.nextCareServiceDate,'yyyy.MM.dd') : null;
                    $list.append(vcui.template(ownListItemTemplate, item));
                });
                self.checkNoData();
            });
        },

        requestMoreData: function(page) {
            var self = this;
            var ajaxUrl = self.$contents.attr('data-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, {"page":page}, function(result) {
                var data = result.data;
                var param = result.param;
                self.setPageData(param.pagination);
                var arr = data.listData instanceof Array ? data.listData : [];
                var $list = self.$registProductList.find('>ul');
                $list.empty();
                arr.forEach(function(item, index) {
                    item.date = vcui.date.format(item.date,'yyyy.MM');
                    $list.append(vcui.template(productListItemTemplate, item));
                });
                self.checkNoData();
            });
        },

        setPageData: function(param) {
            var self = this;
            var page = parseInt(param.page);
            var totalCount = parseInt(param.totalCount);
            if (page < totalCount) {
                self.$registProductMoreBtn.show();
            } else {
                //더이상 없다
                self.$registProductMoreBtn.hide();
            }

            lgkorUI.setHiddenInputData({
                totalCount: totalCount,
                page: page
            });
        },

        checkNoData: function() {
            var self = this;
            var $list = self.$registProductList.find('>ul li');
            if($list.length > 0) {
                var param = lgkorUI.getHiddenInputData();
                var page = parseInt(param.page);
                var totalCount = parseInt(param.totalCount);
                if (page < totalCount) {
                    self.$registProductMoreBtn.show();
                } else {
                    //더이상 없다
                    self.$registProductMoreBtn.hide();
                }
                self.$registProductNoData.hide();
            } else {
                self.$registProductMoreBtn.hide();
                self.$registProductNoData.show();
            }

            $list = self.$myProductList.find('>ul li');
            if($list.length > 0) {
                self.$myProductNoData.hide();
            } else {
                self.$myProductNoData.show();
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
            }
            self.$registMyProductMainPage.find('.ui_selectbox').vcSelectbox('selectedIndex',0);
            self.$registMyProductMainPage.find('.err-block').hide();
        },

        requestManualData: function(_id, page, isMore) {
            var self = this;
            var ajaxUrl = self.$manualPopup.attr('data-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, {"id":_id, "page":page}, function(result) {
                var data = result.data;
                var param = result.param;
                var pagination = param.pagination;

                self.$manualPopup.attr({"data-model-id":param.id, "data-page": pagination.page,"data-totalCount": pagination.totalCount});
                self.$manualPopup.find('div.tit-wrap .tit em').text(vcui.number.addComma(data.totalCount));

                if(parseInt(pagination.page) <  parseInt(pagination.totalCount)) {
                    self.$manualMoreButton.show();
                } else {
                    self.$manualMoreButton.hide();
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
                    self.$manualPopup.vcModal();
                }

                lgkorUI.resetFlexibleBox();
            });
        },

        requestDownloadData: function(param, selectOSUpdate, openDownloadPopup) {
            var self = this;

            //self.$downloadPopup.find('div.keyword-search .search-error').hide();

            if(param.search) {
                self.$downloadSearch.val(param.search);
            }

            var _id = self.$downloadPopup.attr('data-model-id');
            if(_id) {
                param.id = _id;
            }

            var ajaxUrl = self.$downloadPopup.attr('data-list-url');

            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;
                var param = result.param;

                self.$downloadPopupPagination.vcPagination('setPageInfo',param.pagination);
                self.$downloadMainPage.find('div.tit-wrap .tit em').text(vcui.number.addComma(data.totalCount));

                //if(selectOSUpdate) {
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
            });
        }
    }

    $(window).ready(function() {
        myProductRegistration.init();
    });
})();