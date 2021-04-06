(function() {
    var listItemTemplate = '<li class="box {{#if disabled}}disabled{{/if}}" data-id="{{id}}" data-sku="{{sku}}" data-categoryId="{{categoryId}}" data-rtSeq="{{rtSeq}}">' +
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
                    '{{#if price}}<span class="blind">구매가격</span>{{#if typeFlag=="C"}}월 {{/if}}{{price}}원{{/if}}' +
                    '{{/if}}' +
                    '{{#if disabledReason}}<p class="soldout-msg m-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                '</p>' +
            '</div></div>' +
        '</div>' +
        '<button type="button" class="btn-delete"><span class="blind">삭제</span></button>' +
    '</li>';

    $(window).ready(function() {

        var recentList = {         
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
                var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
                if(cookieValue) {
                    self.requestData(false);
                } else {
                    self.$noData.show();
                }
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.info-tbl-wrap ul');
                self.$noData = self.$contents.find('.no-data');
            },

            bindEvents: function() {
                var self = this;

                //삭제하기
                self.$list.on('click','li button.btn-delete', function(e) {
                    var $li = $(this).parents('li');
                    self.requestRemove($li);
                });
            },

            requestData: function() {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');

                lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result) {
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];
                    self.listData = arr;
                    self.$list.empty();
    
                    arr.forEach(function(item, index) {
                        item.index = index;
                        //item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                        //item.price = item.price ? vcui.number.addComma(item.price) : null;
                        //item.price = item.obsTotalDiscountPrice ? vcui.number.addComma(item.obsSellingPrice) : null;
                        self.$list.append(vcui.template(listItemTemplate, item));
                    });
    
                    self.checkNoData();
                });
            },

            requestRemove: function($dm) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-remove-url');
                var _id = $dm.attr('data-id');
                var param = {
                    "id":_id,
                    "sku":$dm.attr('data-sku'),
                    "categoryId":$dm.attr('data-categoryId'),
                    "rtSeq":$dm.attr('data-rtSeq')
                }

                var obj = {title:'삭제시 최근 본 제품 목록에서 제외<br>됩니다. 선택하신 제품을<br>최근 본 제품에서 삭제하시겠어요?', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                    lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                        var data = result.data;
                        var success = lgkorUI.stringToBool(data.success);
                        if (success) {
                            lgkorUI.removeCookieArrayValue(lgkorUI.RECENT_PROD_COOKIE_NAME, _id);
                            self.requestData();
                        }
                    });
                }};
                lgkorUI.confirm(null, obj);
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