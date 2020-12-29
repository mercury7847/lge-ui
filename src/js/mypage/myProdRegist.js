
(function(){
    var productListItemTemplate = '<li class="lists" data-model-id="{{id}}" data-sku={{sku}}>' +
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

    var downloadListItemTemplate = '<li class="lists ui_dropdown">' +
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

    $(window).ready(function() {

        var checkModelSuccess = false;

        var myProductRegistration = {         
            init: function() {
                var self = this;
                vcui.require(['ui/modal', 'ui/validation', 'ui/pagination'], function () {             
                    self.setting();
                    self.bindEvents();
                    self.bindPopupEvents();
                });
            },

            setting: function() {
                var self = this;  
                self.$contents = $('div.lnb-contents');
                //등록가능제품
                self.$registProductList = self.$contents.find('div.my-product-lists:eq(0)');
                self.$registProductMoreBtn = self.$registProductList.find('button.btn-moreview');
                self.$registProductNoData = self.$registProductList.find('div.no-data');
                self.$productRegistSelf = self.$registProductList.find('div.btm-box button');

                //보유제품목록
                self.$myProductList = self.$contents.find('div.my-product-lists:eq(1)');
                self.$myProductNoData = self.$myProductList.find('div.no-data');

                //보유제품 등록 팝업
                self.$registMyProductPopup = $('#registMyProductPopup');
                var $inputs = self.$registMyProductPopup.find('dl.forms div.box div.input-wrap input');
                var $buttons = self.$registMyProductPopup.find('dl.forms div.box div.cell button');
                //모델번호
                self.$modelInput = $inputs.eq(0);
                self.$modelCheckOk = self.$modelInput.siblings('p.comp');
                self.$modelCheckButton = $buttons.eq(0);
                self.$modelCheckOk.hide();

                //시리얼넘버
                self.$snInput = $inputs.eq(1);
                self.$snCheckButton = $buttons.eq(1);

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
                var $selectbox = self.$downloadPopup.find('.ui_selectbox');
                self.$selectOS = $selectbox.eq(0);
                self.$selectCategory = $selectbox.eq(1);
                self.$downloadPopupPagination = self.$downloadPopup.find('.pagination');

                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                //등록가능제품 등록하기
                self.$registProductList.on('click','>ul li div.btn-group a', function(e) {
                    e.preventDefault();
                    self.registMyProductPopupClear();

                    var sku = $(this).parents('li').attr('data-sku');
                    self.$modelInput.val(sku);
                    checkModelSuccess = true;
                    self.$modelCheckOk.show();

                    self.$registMyProductPopup.vcModal();
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
                    self.$registMyProductPopup.vcModal();
                });

                //보유제품 삭제
                self.$myProductList.on('click','>ul li button.btn-delete', function(e) {
                    var ajaxUrl = self.$contents.attr('data-remove-url');
                    var $this = $(this);
                    var _id = $this.parents('li').attr('data-model-id');
                    if(_id) {
                        lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":_id}, function(result) {
                            var data = result.data;
                            var success = lgkorUI.stringToBool(data.success);
                            if(success) {
                                $this.parents('li').remove();
                                self.checkNoData();
                            }
                        });
                    }
                });

                //보유제품 툴팁 닫기
                self.$myProductList.on('click','>ul li div.notice button', function(e) {
                    $(this).parents('.notice').hide();
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
                    self.requestDownloadData(_id,null,null,1,true);
                });

            },

            bindPopupEvents: function() {
                var self = this;

                //모델명 확인
                self.$modelInput.on('input', function(e){
                    checkModelSuccess = false;
                    self.$modelCheckOk.hide();
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
                            lgkorUI.alert('', {title: "해당 제품 모델명이 존재하지 않습니다."});
                        }
                    });
                });

                //제조번호 확인
                self.$snCheckButton.on('click', function(e){
                    var ajaxUrl = self.$registMyProductPopup.attr('data-sn-url');
                    lgkorUI.requestAjaxData(ajaxUrl, {"sn":self.$snInput.val()}, function(result) {
                        var data = result.data;
                        if(!lgkorUI.stringToBool(data.success)) {
                            lgkorUI.alert('', {title: "해당 제조번호가 존재하지 않습니다.<br>제조번호 확인 후 다시 입력해 주세요."});
                        }
                    });
                });

                //보유제품 등록
                self.$registMyProductPopup.on('click','footer div.btn-group button' ,function(e){
                    var $button = $(this);
                    if($button.index() == 0) {
                        //취소
                        self.$registMyProductPopup.vcModal('close');
                    } else {
                        //등록
                        if(checkModelSuccess) {
                            var result = self.registMyProductValidation.validate().success;
                            if(result) {
                                var param = self.registMyProductValidation.getAllValues();
                                var ajaxUrl = self.$registMyProductPopup.attr('data-insert-url');
                                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                                    location.reload();
                                });
                            }
                        } else {
                            lgkorUI.alert('', {title: "제품 모델명을 확인해 주세요."});
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
                    window.location = url;
                });

                //다운로드팝업 셀렉트OS
                
                //다운로드팝업 셀렉트 카테고리

                //다운로드팝업 페이지
                self.$downloadPopupPagination.vcPagination().on('page_click', function(e, data) {
                    var _id = self.$downloadPopup.attr('data-model-id');
                    var os = self.$selectOS.vcSelectbox('selectedOption').value;
                    var category = self.$selectCategory.vcSelectbox('selectedOption').value;
                    self.requestDownloadData(_id,os,category,data,false);
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
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy.MM');
                        $list.append(vcui.template(productListItemTemplate, item));
                    });
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
                self.$modelCheckOk.hide();
                
                self.$registMyProductPopup.find('input').val("");
                self.$registMyProductPopup.find('.ui_selectbox').vcSelectbox('selectedIndex',0);
                self.$registMyProductPopup.find('.err-block').hide();
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

            requestDownloadData: function(_id, os, category, page, openPopup) {
                var self = this;
                var ajaxUrl = self.$downloadPopup.attr('data-list-url');

                if(!os) {
                    self.$selectOS.vcSelectbox('selectedIndex', 0, false);
                    os = self.$selectOS.vcSelectbox('selectedOption').value;
                }
                if(!category) {
                    self.$selectCategory.vcSelectbox('selectedIndex', 0, false);
                    category = self.$selectCategory.vcSelectbox('selectedOption').value;
                }

                lgkorUI.requestAjaxData(ajaxUrl, {"id":_id, "page":page, "os":os, "category":category}, function(result) {
                    var data = result.data;
                    var param = result.param;

                    self.$downloadPopupPagination.vcPagination('setPageInfo',param.pagination);
                    self.$downloadPopup.find('div.tit-wrap .tit em').text(vcui.number.addComma(data.totalCount));

                    var arr = data.listData instanceof Array ? data.listData : [];
                    var $list = self.$downloadPopup.find('div.sw-download-lists>ul');
                    $list.empty();
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                        var list = item.list;
                        if(list) {
                            list.forEach(function(item, index) {
                                list[index].date = vcui.date.format(item.date,'yyyy.MM.dd');
                            });
                        }
                        //item.list = list;
                        $list.append(vcui.template(downloadListItemTemplate, item));
                    });

                    if(openPopup) {
                        self.$downloadPopup.vcModal();
                    }
                });
            },
        }
        
        myProductRegistration.init();
    });
    /*
    function bindEvents(){
        $('.mypage').on('click', '.manual-btn, .download-btn, .btn-delete, .requestCareship-btn, .newProdCheck-btn', function(e){
            e.preventDefault();

            var matchIdx;
            var modelID = $(this).closest('.lists').data('modelId');

            matchIdx = $(this).attr('class').indexOf('manual');
            if(matchIdx > -1) openManualPop(modelID);

            matchIdx = $(this).attr('class').indexOf('download');
            if(matchIdx > -1) openDownLoadPop(modelID);

            matchIdx = $(this).attr('class').indexOf('delete');
            if(matchIdx > -1) deleteProdList(modelID);

            matchIdx = $(this).attr('class').indexOf('requestCareship');
            if(matchIdx > -1) requestCareship(modelID);

            matchIdx = $(this).attr('class').indexOf('newProdCheck');
            if(matchIdx > -1) newProdCheck(modelID);

        }).on('click', '.notice button', function(e){
            e.preventDefault();

            $(this).parent().hide();
        })
    }

    function openManualPop(mid){
        
        $('#popup-manual').vcModal();
    }

    function openDownLoadPop(mid){
        
        $('#popup-download').vcModal();
    }

    function deleteProdList(mid){                
        lgkorUI.confirm("", {
            title: "보유제품을 삭제하시겠습니까 ?",
            okBtnName: "삭제",
            ok: function(){
                lgkorUI.showLoading();
        
                var sendata = {
                    modelID: mid
                }
                lgkorUI.requestAjaxData(DELETE_REGISTED_PRODUCT, sendata, function(result){
                    
                    if(result.data.success == "Y"){
                        $('.contents.mypage .my-product-lists ul li.lists[data-model-id='+mid+']').remove();
                    } else{
                        lgkorUI.alert(result.data.alert.desc, {
                            title: result.data.alert.title
                        });
                    }
        
                    lgkorUI.hideLoading();
                });
            }
        });
    }

    function requestCareship(mid){

    }

    function newProdCheck(mid){

    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
    */
})();