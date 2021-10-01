(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id="{{id}}" data-sku="{{sku}}" data-wishListId="{{wishListId}}" data-wishItemId="{{wishItemId}}" data-categoryId="{{categoryId}}" data-rtSeq="{{rtSeq}}" data-requireCare="{{requireCare}}" data-typeFlag="{{typeFlag}}">' +
        '<div class="col-table">' +
            '<div class="col"><div class="product-info">' +
                '<div class="thumb"><a href="{{pdpUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}" onError="lgkorUI.addImgErrorEvent(this);"></a></div>' +
                '<div class="infos">' +
                    '<p class="name"><a href="{{pdpUrl}}"><span class="blind">제품명</span>{{#raw title}}</a></p>' +
                    '<p class="e-name"><span class="blind">영문제품번호</span>{{modelName}}</p>' + 
                    '{{#if disabledReason}}<p class="soldout-msg pc-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                    '<div class="more"><span class="blind">제품스펙</span><ul>' +
                        '{{#if !disabled}}{{#each item in spec}}<li>{{item}}</li>{{/each}}{{/if}}' +
                    '</ul></div>' +
                '</div>' +
                '<p class="price">' +

                    /* BTOCSITE-5387 시그니처 모델 가격 정책 : 2021-09-27 */
                    '{{#if obsBtnFlag=="enable"}}' +

                        '{{#if price == originalPrice}}' +
                            '<span class="blind">구매가격</span>' +
                            '{{#if typeFlag=="C"}}월 {{/if}}{{originalPrice}}원 : 값이 같으면 나옴' +

                        '{{#else}}' +

                            '{{#if originalPrice}}' +
                                '<small><span class="blind">할인전 가격</span>{{originalPrice}}원</small>' +
                            '{{/if}}' +
                            '{{#if price}}' +
                                '<span class="blind">구매가격</span>' +
                                '{{#if typeFlag=="C"}}월 {{/if}}{{price}}원' +
                            '{{/if}}' +

                        '{{/if}}' +
                    '{{/if}}' +
                    /* //BTOCSITE-5387 시그니처 모델 가격 정책 : 2021-09-27 */

                    '{{#if disabledReason}}<p class="soldout-msg m-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +

                '</p>' +
            '</div></div>' +
            '<div class="col btn-col">' +
                '{{#if !disabled && obsBtnFlag=="enable"}}<button type="button" class="btn size border buycart"><span>장바구니</span></button>{{/if}}' +
                // '<button type="button" class="btn size border"><span>자세히 보기</span></button>' +
            '</div>' +
        '</div>' +
        '<button type="button" class="btn-delete"><span class="blind">삭제</span></button>' +
    '</li>';

    $(window).ready(function() {

        var wishList = {         
            init: function() {
                var self = this;
                //vcui.require(['ui/pagination'], function () {
                    self.setting();
                    self.bindEvents();
                    self.listData = [];
                    self.requestData(/*{"page": 1}*/);
                //});
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.info-tbl-wrap ul');
                //self.$pagination = self.$contents.find('.pagination').vcPagination();
                self.$noData = self.$contents.find('.no-data');
                self.$moreButton = self.$contents.find('button.btn-moreview');
            },

            bindEvents: function() {
                var self = this;

                self.$list.on('click','li button.btn-delete', function(e) {
                    var $li = $(this).parents('li');
                    self.requestRemove($li);
                });

                self.$list.on('click','li div.btn-col button', function(e) {
                    var $li = $(this).parents('li');
                    if($(this).hasClass("buycart")) {
                        var typeFlag = $li.attr('data-typeFlag').toUpperCase();
                        if(typeFlag == "C") {
                            //렌탈장바구니로
                            self.requestCart($li,"C");
                        } else {
                            //일반구매제품
                            if(lgkorUI.stringToBool($li.attr('data-requireCare'))) {
                                //케어십 필수 제품
                                var obj = {
                                    title:'해당 제품은 케어십이 필요한 제품입니다.<br>렌탈 장바구니에서 케어십 청약신청 후<br>구매하실 수 있습니다.',
                                    ok: function (){
                                        self.requestCart($li,"C");
                                    }
                                };
                                lgkorUI.alert(null, obj);
                            } else {
                                self.requestCart($li,"P");
                            }
                        }
                    } else {
                        //자세히보기
                        var $a = $li.find('a:eq(0)');
                        var href = $a.attr('href');
                        if(href) {
                            location.href = href;
                        }
                    }
                });

                self.$moreButton.on('click',function(e){
                    var page = self.$list.data('page');
                    if(page) {
                        self.moreListData(page+1);
                    }
                });

                /*
                self.$pagination.on('page_click', function(e, data) {
                    self.requestData({"page": data});
                });
                */
            },

            requestData: function() {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                    var data = result.data;
                    //var param = result.param;
                    //self.$pagination.vcPagination('setPageInfo',param.pagination);

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.listData = arr;
                    self.$list.empty();
                    self.moreListData(1);
                    /*
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                        item.price = item.price ? vcui.number.addComma(item.price) : null;
                        self.$list.append(vcui.template(listItemTemplate, item));
                    });
                    */
                    self.checkNoData();
                });
            },

            moreListData: function(page) {
                var index = page - 1;
                if(index < 0) index = 0;
                var self = this;

                var arr =  self.listData.splice(0,10);
                arr.forEach(function(item, index) {
                    item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                    item.price = item.price ? vcui.number.addComma(item.price) : null;
                    self.$list.append(vcui.template(listItemTemplate, item));
                });

                self.$list.data('page',page);
                if(self.listData.length > 0) {
                    self.$moreButton.css('display','block');
                } else {
                    self.$moreButton.css('display','none');
                }

                /*
                var arr =  self.listData.slice(index*10,page*10);
                arr.forEach(function(item, index) {
                    item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                    item.price = item.price ? vcui.number.addComma(item.price) : null;
                    self.$list.append(vcui.template(listItemTemplate, item));
                });
                self.$list.data('page',page);
                if(page*10 >= self.listData.length) {
                    self.$moreButton.hide();
                } else {
                    self.$moreButton.show();
                }
                */
            },

            requestRemove: function($dm) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-remove-url');
                var param = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    "wishListId":$dm.attr('data-wishListId'),
                    "wishItemId":$dm.attr('data-wishItemId'),
                }

                var categoryId = $dm.attr('data-categoryId');
                param.categoryId = categoryId ? categoryId : null;
                var rtSeq = $dm.attr('data-rtSeq');
                param.rtSeq = rtSeq ? rtSeq : null;
                var requireCare = $dm.attr('data-requireCare');
                param.requireCare = requireCare ? lgkorUI.stringToBool(requireCare) :null;

                var obj = {title:'삭제시 찜한 제품 목록에서 제외<br>됩니다. 선택하신 제품을<br>찜한 제품에서 삭제하시겠어요?', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                        var data = result.data;
                        var success = lgkorUI.stringToBool(data.success);
                        if (success) {
                            self.requestData(/*{"page": self.$pagination.attr('data-page')}*/);
                        }
                    });
                }};
                //var desc = '삭제시 찜한 제품 목록에서 제외<br>됩니다. 선택하신 제품을<br>찜한 제품에서 삭제하시겠어요?';
                lgkorUI.confirm(null, obj);
            },

            requestCart: function($dm,cartType) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-cart-url');
                
                var param = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    "rtSeq":$dm.attr('data-rtSeq'),
                    "typeFlag":cartType,
                    //"categoryId":$dm.attr('data-categoryId'),
                    //"requireCare":$dm.attr('data-requireCare')
                }

                /*
                var categoryId = $dm.attr('data-categoryId');
                param.categoryId = categoryId ? categoryId : null;
                var rtSeq = $dm.attr('data-rtSeq');
                param.rtSeq = rtSeq ? rtSeq : null;
                var requireCare = $dm.attr('data-requireCare');
                param.requireCare = requireCare ? lgkorUI.stringToBool(requireCare) :null;
                */

                lgkorUI.requestCart(ajaxUrl, param, true);
            },

            checkNoData: function() {
                var self = this;
                if(self.$list.find('li').length > 0) {
                    self.$noData.hide();
                    //self.$pagination.show();
                } else {
                    self.$noData.show();
                    //self.$pagination.hide();
                }
            },
        }
        
        wishList.init();
    });
})();