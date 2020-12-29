(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id={{id}}>' +
        '<div class="col-table">' +
            '<div class="col"><div class="product-info">' +
                '<div class="thumb"><a href="{{pdpUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
                '<div class="infos">' +
                    '<p class="name"><a href="{{pdpUrl}}"><span class="blind">제품명</span>{{title}}</a></p>' +
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
        '{{#if enableWish}}<span class="chk-wish-wrap">' +
            '<input type="checkbox" id="chk-like{{index}}" name="chk-like{{index}}" {{#if isWish}}checked{{/if}}>' +
            '<label for="chk-like{{index}}"><span class="blind">찜하기</span></label>' +
        '</span>{{/if}}' +
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
                    var _id = $(this).parents('li').attr('data-id');
                    var checked = $(this).is(':checked');
                    self.requestWish(_id, checked);
                });

                self.$list.on('click','li button', function(e) {
                    var _id = $(this).parents('li').attr('data-id');
                    if($(this).hasClass('btn-delete')) {
                        //삭제
                        self.requestRemove(_id);
                    } else {
                        //장바구니
                        self.requestCart(_id);
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

            requestRemove: function(_id) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-remove-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":_id}, function(result){
                    var data = result.data;
                    var success = lgkorUI.stringToBool(data.success);
                    if (success) {
                        self.requestData();
                    }
                });
            },

            requestCart: function(_id) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-cart-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":_id}, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        $(window).trigger("toastshow","장바구니에 추가 되었습니다.");
                    }
                });
            },

            requestWish: function(_id, wish) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-wish-url');
                var postData = {"itemID":_id, "wish":wish};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        if(wish) {
                            $(window).trigger("toastshow","찜하기 되었습니다.");
                        }
                    } else {
                        self.$list.find('li.box[data-id="'+_id+'"] span.chk-wish-wrap input').prop("checked",!wish);
                    }
                });
            },
            //$(window).trigger("toastshow", msg);
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