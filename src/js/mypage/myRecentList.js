(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id={{id}} data-sku={{sku}} data-categoryId={{categoryId}} data-rtSeq={{rtSeq}} data-requireCare={{requireCare}}>' +
        '<div class="col-table">' +
            '<div class="col"><div class="product-info">' +
                '<div class="thumb"><a href="{{pdpUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
                '<div class="infos">' +
                    '<p class="name"><a href="{{pdpUrl}}"><span class="blind">제품명</span>{{title}}</a></p>' +
                    '<p class="e-name"><span class="blind">영문제품번호</span>{{modelName}}</p>' + 
                    '{{#if disabledReason}}<p class="soldout-msg pc-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                    '<div class="more"><span class="blind">제품스펙</span><ul>' +
                        '{{#if !disabled}}{{#each item in spec}}<li>{{item}}</li>{{/each}}{{/if}}' +
                    '</ul></div>' +
                '</div>' +
                '<p class="price">' +
                    '{{#if originalPrice}}<small><span class="blind">할인전 가격</span>{{originalPrice}}원</small>{{/if}}' +
                    '{{#if price}}<span class="blind">구매가격</span>{{price}}원{{/if}}' +
                    '{{#if disabledReason}}<p class="soldout-msg m-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                '</p>' +
            '</div></div>' +
            '{{#if !disabled}}' +
                '<div class="col btn-col">' +
                    '{{#if typeFlag=="A"||typeFlag=="P"}}<button type="button" class="btn size border buycart"><span>구매 장바구니</span></button>{{/if}}' +
                    '{{#if typeFlag=="A"||typeFlag=="C"}}<button type="button" class="btn size border rentalcart"><span>렌탈 장바구니</span></button>{{/if}}' +
                '</div>' +
            '{{/if}}' +
        '</div>' +
        // '{{#if enableWish}}<span class="chk-wish-wrap">' +
        //     '<input type="checkbox" id="chk-like{{index}}" name="chk-like{{index}}" {{#if isWish}}checked{{/if}}>' +
        //     '<label for="chk-like{{index}}"><span class="blind">찜하기</span></label>' +
        // '</span>{{/if}}' +
        '<button type="button" class="btn-delete"><span class="blind">삭제</span></button>' +
    '</li>';

    $(window).ready(function() {

        var recentList = {         
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
                self.requestData();
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.info-tbl-wrap ul');
                self.$noData = self.$contents.find('.no-data');
            },

            bindEvents: function() {
                var self = this;

                self.$list.on('click','li input[type=checkbox]', function(e) {
                    //찜하기
                    var $li = $(this).parents('li');
                    var checked = $(this).is(':checked');
                    self.requestWish($li, checked);
                });

                self.$list.on('click','li button.btn-delete', function(e) {
                    var $li = $(this).parents('li');
                    self.requestRemove($li);
                });

                self.$list.on('click','li div.btn-col button', function(e) {
                    var $li = $(this).parents('li');
                    if($(this).hasClass("buycart")) {
                        //구매
                        if($li.attr('data-requireCare')) {
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
            },

            requestData: function() {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                    var data = result.data;
                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.index = index;
                        item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                        item.price = item.price ? vcui.number.addComma(item.price) : null;
                        self.$list.append(vcui.template(listItemTemplate, item));
                    });
                    self.checkNoData();
                });
            },

            requestRemove: function($dm) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-remove-url');
                var param = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    //"wishListId":$dm.attr('data-wishListId'),
                    //"wishItemId":$dm.attr('data-wishItemId'),
                    "categoryId":$dm.attr('data-categoryId'),
                    "rtSeq":$dm.attr('data-rtSeq')
                }

                var obj = {title:'', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                        var data = result.data;
                        var success = lgkorUI.stringToBool(data.success);
                        if (success) {
                            self.requestData();
                        }
                    });
                }};
                var desc = '삭제시 최근 본 제품 목록에서 제외<br>됩니다. 선택하신 제품을<br>최근 본 제품에서 삭제하시겠어요?';
                lgkorUI.confirm(desc, obj);
            },

            requestCart: function($dm,cartType) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-cart-url');
                
                var param = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    //"wishListId":$dm.attr('data-wishListId'),
                    //"wishItemId":$dm.attr('data-wishItemId'),
                    "categoryId":$dm.attr('data-categoryId'),
                    "rtSeq":$dm.attr('data-rtSeq'),
                    "typeFlag":cartType
                }
                lgkorUI.requestCart(ajaxUrl, param);
            },

            requestWish: function($dm, wish) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-wish-url');
                var success = function(data) {
                    $dm.attr("data-wishItemId",data.wishItemId);
                };
                var fail = function(data) {
                    $dm.find('span.chk-wish-wrap input').prop("checked",!wish);
                };

                var param = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    "wishListId":$dm.attr('data-wishListId'),
                    "wishItemId":$dm.attr('data-wishItemId'),
                    "wish":wish
                };

                lgkorUI.requestWish(
                    param,
                    wish,
                    success,
                    fail,
                    ajaxUrl
                );

                /*
                var postData = {
                    "id":$dm.attr('data-id'),
                    "sku":$dm.attr('data-sku'),
                    "wishListId":$dm.attr('data-wishListId'),
                    "wishItemId":$dm.attr('data-wishItemId'),
                    "wish":wish
                }
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        if(wish) {
                            $dm.attr("data-wishItemId",data.wishItemId);
                            $(window).trigger("toastshow","선택하신 제품이 찜한 제품에 추가되었습니다.");
                        } else{
                            $(window).trigger("toastshow","찜한 제품 설정이 해제되었습니다.");
                        }
                    } else {
                        $dm.find('span.chk-wish-wrap input').prop("checked",!wish);
                    }
                });
                */
            },
            
            checkNoData: function() {
                var self = this;
                if(self.$list.find('li').length > 0) {
                    self.$noData.hide();
                } else {
                    self.$noData.show();
                }
            },
        }
        
        recentList.init();
    });
})();