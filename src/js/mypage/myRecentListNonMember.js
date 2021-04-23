(function() {
    var listItemTemplate = '<li class="box {{#if disabledReason}}disabled{{/if}}" data-id="{{modelId}}">' +
        '<div class="col-table">' +
            '<div class="col"><div class="product-info">' +
                '<div class="thumb"><a href="{{modelUrlPath}}"><img src="{{mediumImageAddr}}" alt="{{#if imageAltText}}{{imageAltText}}{{/if}}" onError="lgkorUI.addImgErrorEvent(this);"></a></div>' +
                '<div class="infos">' +
                    '<p class="name"><a href="{{modelUrlPath}}"><span class="blind">제품명</span>{{#raw modelDisplayName}}</a></p>' +
                    '<p class="e-name"><span class="blind">영문제품번호</span>{{modelName}}</p>' + 
                    '{{#if disabledReason}}<p class="soldout-msg pc-view" aria-hidden="true">{{disabledReason}}</p>{{/if}}' +
                    '<div class="more"><span class="blind">제품스펙</span><ul>' +
                        '{{#each item in spec}}<li>{{item}}</li>{{/each}}' +
                    '</ul></div>' +
                '</div>' +
                '<p class="price">' +
                    '{{#if priceFlag=="Y"}}' +
                    '{{#if obsOriginalPrice}}<small><span class="blind">할인전 가격</span>{{obsOriginalPrice}}원</small>{{/if}}' +
                    '{{#if obsSellingPrice}}<span class="blind">구매가격</span>{{obsSellingPrice}}원{{/if}}' +
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

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result) {
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];
                    self.listData = arr;
                    self.$list.empty();
    
                    arr.forEach(function(item, index) {
                        item.index = index;
                        item.obsOriginalPrice = item.obsOriginalPrice ? vcui.number.addComma(item.obsOriginalPrice) : null;
                        item.obsSellingPrice = item.obsSellingPrice ? vcui.number.addComma(item.obsSellingPrice) : null;
                        item.spec = item.specInfo ? item.specInfo.split(",") : [];
                        item.priceFlag = item.obsSellFlag;
                        item.disabledReason = null;
                        if(item.extinction == "Y") {
                            item.disabledReason = "단종되었습니다.";
                            item.priceFlag = "N";
                        } else if(item.soludOut == "Y") {
                            item.disabledReason = "품절되었습니다.";
                            item.priceFlag = "Y";
                        }
                        self.$list.append(vcui.template(listItemTemplate, item));
                    });
    
                    self.checkNoData();
                });
            },

            requestRemove: function($dm) {
                var self = this;
                var _id = $dm.attr('data-id');

                var obj = {title:'삭제시 최근 본 제품 목록에서 제외<br>됩니다. 선택하신 제품을<br>최근 본 제품에서 삭제하시겠어요?', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                    lgkorUI.removeCookieArrayValue(lgkorUI.RECENT_PROD_COOKIE_NAME, _id);
                    self.requestData();
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