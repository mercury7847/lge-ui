(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id="{{id}}" data-sku="{{sku}}" data-wishListId="{{wishListId}}" data-wishItemId="{{wishItemId}}" data-categoryId="{{categoryId}}" data-rtSeq="{{rtSeq}}" data-requireCare="{{requireCare}}">' +
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
                    '{{#if obsBtnFlag=="enable"}}' +
                    '{{#if originalPrice}}<small><span class="blind">할인전 가격</span>{{originalPrice}}원</small>{{/if}}' +
                    '{{#if price}}<span class="blind">구매가격</span>{{price}}원{{/if}}' +
                    '{{/if}}' +
                    '{{#if disabledReason}}<p class="soldout-msg m-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                '</p>' +
            '</div></div>' +
            '{{#if !disabled && obsBtnFlag=="enable"}}' +
                '<div class="col btn-col">' +
                    '{{#if typeFlag=="A"||typeFlag=="P"}}<button type="button" class="btn size border buycart"><span>구매 장바구니</span></button>{{/if}}' +
                    '{{#if typeFlag=="A"||typeFlag=="C"}}<button type="button" class="btn size border rentalcart"><span>렌탈 장바구니</span></button>{{/if}}' +
                '</div>' +
            '{{/if}}' +
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
                        //구매
                        if(lgkorUI.stringToBool($li.attr('data-requireCare'))) {
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
                    } else {
                        //렌탈
                        self.requestCart($li,"C");
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

            moreListData(page) {
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
                    self.$moreButton.show();
                } else {
                    self.$moreButton.hide();
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

                lgkorUI.requestCart(ajaxUrl, param);
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