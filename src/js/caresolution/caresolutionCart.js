(function() {
    var cartItemTemplate = '<li class="order-item {{#if soldout}}disabled{{/if}}" data-item-id="{{itemID}}">' +
        '<div class="item-image"><a href="{{itemUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<div class="product-info">' +
            '<div class="flag-wrap bg-type">' +
                '<span class="flag"><span class="blind">제품타입</span>{{type}}</span>' +
            '</div>' +
            '<div class="item-name"><a href="{{itemUrl}}">{{title}}</a></div>' +
            '<div class="item-options"><div class="sku"><span class="blind">제품번호</span>{{sku}}</div><div class="sibling-option"><span class="blind">제품옵션</span>{{colorOption}}</div></div>' +
            '<div class="item-options2">{{#each (item, index) in option}}<p>{{#if index == 0}}옵션 : {{/if}}{{item}}</P>{{/each}}</div>' +
        '</div>' +
        '<div class="product-payment">' +
            '<div class="amount">' +
            '<div class="price">{{#if originalPrice}}<p class="original">월 {{originalPrice}}원</p>{{/if}}<p class="total">월 {{salePrice}}원</p></div>' +
            '{{#if tooltip}}<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">계약내용 자세히 보기</span>' +
            '<span class="tooltip-box"><p>{{tooltip}}</p><button type="button" class="btn-close"><span class="blind">닫기</span></button></span></div>{{/if}}' +
            //'<a href="#" class="btn-info"><span class="blind">매월 납부금 계약내용 자세히 보기</span></a>' +
        '</div><div class="btn-area">' +
            '{{#if subscriptionUrl}}<button type="button" class="btn pink border size" data-url={{subscriptionUrl}}><span>청약신청</span></button>{{#else}}<button type="button" class="btn pink border size" disabled><span>청약신청불가</span></button>{{/if}}' +
        '</div></div>' +
        '<span class="chk-wish-wrap"><input type="checkbox" id="chk-wish-{{itemID}}" name="chk-wish-{{itemID}}" {{#if (wish)}}checked{{/if}}><label for="chk-wish-{{itemID}}"><span class="blind">{{#if wish}}찜한상품{{#else}}찜하기{{/if}}</span></label></span>' +
        '<span class="chk-wrap"><input type="checkbox" id="chk-select-{{itemID}}" name="chk-select-{{itemID}}"><label for="chk-select-{{itemID}}"><span class="blind">선택안함</span></label></span>' +
        '<div class="item-delete"><button type="button" class="btn-delete"><span class="blind">제품 삭제</span></button></div>' +
        '</li>'
    
    var subscriptionItemTemplate = '<li><span class="item-subtit">{{type}}</span>' +
        '<strong class="item-tit">{{title}}</strong>' +
        '<div class="item-spec"><span>{{sku}}</span>' +
        '<span>월 {{salePrice}}원</span></div></li>'
    
    var subscriptionDisableItemTemplate = '<li class="item-disabled"><span class="item-subtit">{{type}}</span>' +
        '<strong class="item-tit">{{title}}</strong>' +
        '<div class="item-spec"><span>{{sku}}</span>' +
        '<span>월 {{salePrice}}원</span></div>' +
        '<p class="text-disabled"><span>설치 불가능 제품</span></p></li>'

    var paymentItemTemplate = '<li><dl><dt class="text">{{text}}</dt><dd class="price {{appendClass}}">{{price}}</dd></dl></li>';
    var totalPaymentItemTemplate = '<dl><dt class="text">{{text}}</dt><dd class="price">{{price}}</dd></dl>{{#if desc}}<p class="desc">{{desc}}</p>{{/if}}'
    $(window).ready(function() {
        var careCartInfo = new CareCartInfo('div.col-right');

        var careCart = {
            init: function() {
                //케어솔루션 리스트
                //self.careCartInfo = CareCartInfo('div.col-right');
                self.$cartContent = $('#tab2');
                self.$cartWrap = self.$cartContent.find('div.cart-wrap');
                self.$cartAllCheck = self.$cartContent.find('div.check-option div.chk-wrap input');
                self.cartItemCheckQuery = "li.order-item span.chk-wrap input";
                self.$cartSelectRemove = self.$cartContent.find('div.check-option div.btn-area button.btn-text');
                self.$cartList = self.$cartContent.find('div.list-wrap');

                //청약정보
                //self.$subscriptionInfo = self.$cartContent.find('div.col-right div.item-info');
                //요금정보
                //self.$paymentInfo = self.$cartContent.find('div.col-right div.payment-amount-info');
                //신청서확인
                //self.$agreement = self.$cartContent.find('div.col-right div.agree-box');

                //계약신청서 확인/동의
                //self.$agreementAllCheck = self.$agreement.find('div.chk-btm span.chk-wrap input');
                //self.agreementItemCheckQuery = "li span.chk-wrap input";

                //nodata
                self.$noData = self.$cartContent.find('div.no-data-wrap');

                //추천제품
                self.$recommendProduct = $('div.product-recommend-wrap');

                var _self = this;
                _self.bindEvents();
                _self.checkNoData();
            },

            bindEvents: function() {
                var _self = this;

                //전체선택
                self.$cartAllCheck.on('change',function (e) {
                    var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                    $cartItemCheck.prop('checked', self.$cartAllCheck.is(':checked'));
                    $cartItemCheck.each(function (index, item) {
                        _self.changeBlindLabelTextSiblingCheckedInput(item,'선택함','선택안함');
                    });
                });

                //리스트 아이템 선택
                self.$cartList.on('click', self.cartItemCheckQuery, function(e) {
                    var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                    self.$cartAllCheck.prop('checked', !$cartItemCheck.is(':not(:checked)'));
                    _self.changeBlindLabelTextSiblingCheckedInput(this,'선택함','선택안함');
                });

                //리스트 아이템 청약하기 버튼
                self.$cartList.on('click', 'div.product-payment div.btn-area button', function(e) {
                    _self.locationButtonUrl(this);
                });

                //리스트 아이템 찜하기
                self.$cartList.on('click', 'span.chk-wish-wrap input', function(e) {
                    var itemID = $(this).parents('li.order-item').attr('data-item-id');
                    var checked = $(this).is(':checked');
                    _self.requestWishItem(itemID, checked);
                });

                //전체삭제
                self.$cartSelectRemove.on('click', function(e) {
                    var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                    var itemList = [];
                    cartItemCheck.each(function (index, item) {
                        var itemID = $(item).parents('li.order-item').attr('data-item-id');
                        itemList.push(itemID);
                    });
                    if(itemList.length > 0) {
                        _self.requestRemoveItem(itemList);
                    }
                });

                //리스트 아이템 삭제
                self.$cartList.on('click', 'div.item-delete button.btn-delete', function(e) {
                    var itemID = $(this).parents('li.order-item').attr('data-item-id');
                    _self.requestRemoveItem([itemID]);
                });

                /*
                //계약신청서 확인/동의 전체 선택
                self.$agreementAllCheck.on('change',function (e) {
                    var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
                    $itemCheck.prop('checked', self.$agreementAllCheck.is(':checked'));
                });

                //계약신청서 아이템 선택
                self.$agreement.on('click', self.agreementItemCheckQuery, function(e) {
                    var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
                    self.$agreementAllCheck.prop('checked', !$itemCheck.is(':not(:checked)'));
                });

                //청약하기
                self.$agreement.on('click', 'div.btn-area button', function(e) {
                    _self.clickSubscriptionButton(this);
                });
                */

                //추천제품 장바구니
                self.$recommendProduct.on('click', 'div.slide-box button', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    _self.requestCartItem(itemID);
                });

                //추천제품 찜하기
                self.$recommendProduct.on('click', 'div.slide-box span.chk-wish-wrap input', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    var checked = $(this).is(':checked');
                    _self.requestWishItem(itemID, checked);
                });
            },

            updateList: function(data) {
                console.log(data);
                var _self = this;

                //카트 목록
                var $list_ul = self.$cartList.find('ul.order-list');
                $list_ul.empty();
                var arr =  data ? (data.list instanceof Array ? data.list : []) : [];
                arr.forEach(function(item, index) {
                    item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                    item.salePrice = item.salePrice ? vcui.number.addComma(item.salePrice) : null;
                });

                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(cartItemTemplate, item));
                    });
                    self.$cartWrap.show();
                } else {
                    self.$cartWrap.hide();
                }
                _self.checkNoData();

                //청약정보
                /*
                $list_ul = self.$subscriptionInfo.find('ul.item-list');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        if(item.soldout) {
                            $list_ul.append(vcui.template(subscriptionDisableItemTemplate, item));
                        } else {
                            $list_ul.append(vcui.template(subscriptionItemTemplate, item));
                        }
                    });
                    self.$subscriptionInfo.show();
                } else {
                    self.$subscriptionInfo.hide();
                }
                */
            },

            updatePaymentInfo: function(data) {
                //요금정보
                var $list_ul = self.$paymentInfo.find('ul.payment-list');
                $list_ul.empty();
                var arr = data ? (data.price instanceof Array ? data.price : []) : [];

                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(paymentItemTemplate, item));
                    });
                    self.$paymentInfo.show();
                }

                if(data.total) {
                   self.$paymentInfo.find('div.total-payment-amount').html(vcui.template(totalPaymentItemTemplate, data.total));
                   self.$paymentInfo.show();
                } else {
                    if (arr.length < 1) {
                        self.$paymentInfo.hide();
                    }
                }
            },

            changeBlindLabelTextSiblingCheckedInput: function(input, trueText, falseText) {
                $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
            },

            noData: function(visible) {
                if(visible) {
                    self.$noData.show();
                } else {
                    self.$noData.hide();
                }
            },

            checkNoData: function() {
                var _self = this;
                _self.noData(self.$cartList.find('li.order-item').length > 0 ? false : true);
            },

            //아이템 삭제 (리스트로 전달)
            requestRemoveItem: function(items) {
                var _self = this;
                var ajaxUrl = self.$cartContent.attr('data-remove-url');
                var postData = JSON.stringify(items);
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    _self.updateList(result.data);
                   // _self.updatePaymentInfo(result.data);
                   console.log(careCartInfo);
                   careCartInfo.updateList(result.data);
                   careCartInfo.updatePaymentInfo(result.data);
                });
            },

            //아이템 찜하기
            requestWishItem: function(itemID, wish) {
                var ajaxUrl = self.$cartContent.attr('data-wish-url');
                var postData = {"itemID":itemID, "wish":wish};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },

            //장바구니에 담기
            requestCartItem: function(itemID) {
                var ajaxUrl = self.$cartContent.attr('data-cart-url');
                var postData = {"itemID":itemID};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },

            //청약신청하기 버튼 클릭
            clickSubscriptionButton: function(dm) {
                var _self = this;
                var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
                if(!$itemCheck.is(':not(:checked)')) {
                    _self.locationButtonUrl(dm);
                } else {
                    //동의서가 다 체크되지 않음
                }
            },

            //dom의 data-url을 읽어서 이동시킴
            locationButtonUrl: function(dm) {
                var url = $(dm).attr('data-url');
                location.href = url;
            }
        };

        careCart.init();
    });
})();