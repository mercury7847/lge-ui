(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id={{id}} data-sku={{sku}} data-wishListId={{wishListId}} data-wishItemId={{wishItemId}}>' +
        '<div class="col-table">' +
            '<div class="col"><div class="product-info">' +
                '<div class="thumb"><a href="#n"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
                '<div class="infos">' +
                    '<p class="name"><a href="#n"><span class="blind">제품명</span>{{title}}</a></p>' +
                    '<p class="e-name"><span class="blind">영문제품번호</span>{{sku}}</p>' + 
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
            '{{#if !disabled}}<div class="col btn-col"><button type="button" class="btn size border"><span>장바구니</span></button></div>{{/if}}' +
        '</div>' +
        '<button type="button" class="btn-delete"><span class="blind">삭제</span></button>' +
    '</li>';

    $(window).ready(function() {

        var wishList = {         
            init: function() {
                var self = this;
                vcui.require(['ui/pagination'], function () {
                    self.setting();
                    self.bindEvents();
                    self.requestData({"page": 1});
                });
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.info-tbl-wrap ul');
                self.$pagination = self.$contents.find('.pagination').vcPagination();
                self.$noData = self.$contents.find('.no-data');
            },

            bindEvents: function() {
                var self = this;

                self.$list.on('click','li button', function(e) {
                    var $li = $(this).parents('li');
                    if($(this).hasClass('btn-delete')) {
                        //삭제
                        var _id = $li.attr('data-id');
                        self.requestRemove(_id);
                    } else {
                        //장바구니
                        self.requestCart($li);
                    }
                });

                self.$pagination.on('page_click', function(e, data) {
                    self.requestData({"page": data});
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;
                    
                    self.$pagination.vcPagination('setPageInfo',param.pagination);

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                        item.price = item.price ? vcui.number.addComma(item.price) : null;
                        self.$list.append(vcui.template(listItemTemplate, item));
                    });
                    self.checkNoData();
                });
            },

            requestRemove: function(_id) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-remove-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":_id}, function(result){
                    var data = result.data;
                    var success = lgkorUI.stringToBool(data.success);
                    if (success) {
                        self.requestData({"page": self.$pagination.attr('data-page')});
                    }
                });

            },

            requestCart: function($dm) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-cart-url');
                var postData = {
                    "sku":$dm.attr('data-sku'),
                    "wishListId":$dm.attr('data-wishListId'),
                    "wishItemId":$dm.attr('data-wishItemId'),
                }
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },

            checkNoData: function() {
                var self = this;
                if(self.$list.find('li').length > 0) {
                    self.$noData.hide();
                    self.$pagination.show();
                } else {
                    self.$noData.show();
                    self.$pagination.hide();
                }
            },
        }
        
        wishList.init();
    });
})();