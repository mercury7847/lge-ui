
(function(){
    var productListItemTemplate = '<li class="lists" data-model-id="{{id}}">' +
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

    $(window).ready(function() {

        var myProductRegistration = {         
            init: function() {
                var self = this;
                vcui.require(['ui/modal'], function () {             
                    self.setting();
                    self.bindEvents();
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

                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                //등록가능제품 등록하기
                self.$registProductList.on('click','>ul li div.btn-group a', function(e) {
                    e.preventDefault();
                    var ajaxUrl = self.$contents.attr('data-insert-url');
                    var _id = $(this).parents('li').attr('data-model-id');
                    if(_id) {
                        lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":_id}, function(result) {
                            location.reload();
                        });
                    }
                });

                //등록가능제품 더보기
                self.$registProductMoreBtn.on('click', function(e) {
                    var hiddenData = lgkorUI.getHiddenInputData();
                    var page = parseInt(hiddenData.page) + 1;
                    self.requestMoreData(page);
                });
                
                //보유제품 직접 등록

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

                //다운로드/sw

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
            }
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