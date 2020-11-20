(function() {
    var cartItemTemplate = '<li class="order-item is-check {{#if available}}disabled{{/if}}" data-item-id="{{itemID}}">' +
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
            //'{{#if tooltip}}<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">계약내용 자세히 보기</span>' +
            //'<span class="tooltip-box"><p>{{tooltip}}</p><button type="button" class="btn-close"><span class="blind">닫기</span></button></span></div>{{/if}}' +
            '<a href="{{tipUrl}}" class="btn-info"><span class="blind">매월 납부금 계약내용 자세히 보기</span></a>' +
        '</div><div class="btn-area">' +
            '{{#if subscriptionUrl}}<button type="button" class="btn pink border size" data-url={{subscriptionUrl}}><span>청약신청</span></button>{{#else}}<button type="button" class="btn pink border size" disabled><span>청약신청불가</span></button>{{/if}}' +
        '</div></div>' +
        '{{#if isLogin}}<span class="chk-wish-wrap"><input type="checkbox" id="chk-wish-{{itemID}}" name="chk-wish-{{itemID}}" {{#if (wish)}}checked{{/if}}><label for="chk-wish-{{itemID}}"><span class="blind">{{#if wish}}찜한상품{{#else}}찜하기{{/if}}</span></label></span>{{/if}}' +
        '<span class="chk-wrap"><input type="checkbox" id="chk-select-{{itemID}}" name="chk-select-{{itemID}}" {{#if !(available)}}checked{{/if}}><label for="chk-select-{{itemID}}"><span class="blind">선택안함</span></label></span>' +
        '<div class="item-delete"><button type="button" class="btn-delete"><span class="blind">제품 삭제</span></button></div>' +
        '</li>';

    $(window).ready(function() {
        var careCartInfo = new CareCartInfo('div.col-right');

        var careCart = {
            init: function() {
                //케어솔루션 리스트
                self.$tabCount = $('.ui_tab ul.tabs li a[href="#tab2"] span');
                self.$cartContent = $('#tab2');
                self.$cartWrap = self.$cartContent.find('div.cart-wrap');
                self.$cartAllCheck = self.$cartContent.find('div.check-option div.chk-wrap input');
                self.cartItemCheckQuery = "li.order-item span.chk-wrap input";
                self.$cartSelectRemove = self.$cartContent.find('div.check-option div.btn-area button.btn-text');
                self.$cartList = self.$cartContent.find('div.list-wrap');

                //nodata
                self.$noData = self.$cartContent.find('div.no-data-wrap');

                //추천제품
                self.$recommendProduct = $('div.product-recommend-wrap');

                var _self = this;
                vcui.require(['ui/checkboxAllChecker'], function () {
                    self.$cartWrap.vcCheckboxAllChecker({checkBoxItemsTargetQuery:self.cartItemCheckQuery});
                    self.cartAllChecker = self.$cartWrap.vcCheckboxAllChecker('instance');

                    _self.bindEvents();
                    _self.bindPopupEvents();
                    _self.updateCartItemCheck();
                    _self.checkNoData();

                    var reveal_url = self.$cartContent.attr('data-reveal-url');
                    if(reveal_url) {
                        lgkorUI.requestAjaxDataPost(reveal_url, null, function(result){
                            _self.updateList(result.data);

                            var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                            var itemList = [];
                            cartItemCheck.each(function (index, item) {
                                var itemID = $(item).parents('li.order-item').attr('data-item-id');
                                itemList.push(itemID);
                            });
                            if(itemList.length > 0) {
                                careCartInfo.updateData(result.data);
                            } else {
                                //선택된 제품이 없다
                                careCartInfo.setEmptyData();
                            }
                        });
                    }
                });
            },

            bindEvents: function() {
                var _self = this;

                //전체선택
                /*
                self.$cartAllCheck.on('change', function (e) {
                    var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                    $cartItemCheck.prop('checked', self.$cartAllCheck.is(':checked'));
                    $cartItemCheck.each(function (index, item) {
                        _self.changeBlindLabelTextSiblingCheckedInput(item,'선택함','선택안함');
                    });
                    _self.requestInfo();
                });
                */

                //리스트 아이템 선택
                /*
                self.$cartList.on('click', self.cartItemCheckQuery, function(e) {
                    _self.updateCartItemCheck();
                    _self.changeBlindLabelTextSiblingCheckedInput(this,'선택함','선택안함');
                    _self.requestInfo();
                });
                */
               
                self.cartAllChecker.on('allCheckerChange', function(e, status){
                    console.log('allcheck');
                    _self.requestInfo();
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

                //선택 삭제
                self.$cartSelectRemove.on('click', function(e) {
                    var obj = {title:'', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                        var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                        var itemList = [];
                        cartItemCheck.each(function (index, item) {
                            var itemID = $(item).parents('li.order-item').attr('data-item-id');
                            itemList.push(itemID);
                        });
                        if(itemList.length > 0) {
                            _self.requestRemoveItem(itemList);
                        }
                    }};
                    var desc = '선택된 제품을 삭제하시겠습니까?';
                    lgkorUI.confirm(desc, obj);
                });

                //리스트 아이템 삭제
                self.$cartList.on('click', 'div.item-delete button.btn-delete', function(e) {
                    var itemID = $(this).parents('li.order-item').attr('data-item-id');
                    _self.requestRemoveItem([itemID]);
                });

                //리스트 아이템 안내 팁
                self.$cartList.on('click', 'div.product-payment div.amount a.btn-info', function(e) {
                    e.preventDefault();
                    _self.requestItemTip(this);
                });

                //추천제품 장바구니(삭제)
                /*
                self.$recommendProduct.on('click', 'div.slide-box button', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    _self.requestCartItem(itemID);
                });
                */

                //추천제품 찜하기 (삭제)
                /*
                self.$recommendProduct.on('click', 'div.slide-box span.chk-wish-wrap input', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    var checked = $(this).is(':checked');
                    _self.requestWishItem(itemID, checked);
                });
                */
            },

            bindPopupEvents: function() {
                //아이템 팁 중 제휴카드 혜택 안내
                $('#request-tip-modal').on('click','dl.bk-infos dd a', function(e) {
                    $('#card-benefit-popup').vcModal();
                });
            },

            //전체선택 버튼 상태 갱신
            updateCartItemCheck: function() {
                if(self.cartAllChecker) {
                    self.cartAllChecker.update();
                }
                var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                self.$cartAllCheck.prop('checked', !$cartItemCheck.is(':not(:checked)'));
            },

            updateList: function(data) {
                var _self = this;

                var isLogin = data.isLogin;

                //탭 카운트
                self.$tabCount.text(vcui.number.addComma(data.tabCount));
                
                //카트 목록
                var $list_ul = self.$cartList.find('ul.order-list');
                $list_ul.empty();
                var arr =  data ? (data.itemList instanceof Array ? data.itemList : []) : [];
                arr.forEach(function(item, index) {
                    item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                    item.salePrice = item.salePrice ? vcui.number.addComma(item.salePrice) : null;
                    item.isLogin = isLogin;
                });

                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(cartItemTemplate, item));
                    });
                    self.$cartWrap.show();
                } else {
                    self.$cartWrap.hide();
                }
                _self.updateCartItemCheck();
                _self.checkNoData();
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

            openModalFromHtml: function(html) {
                $('#request-tip-modal').html(html).vcModal();
            },

            //선택된 제품에 따른 구매정보들 요청
            requestInfo: function() {
                var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                var itemList = [];
                cartItemCheck.each(function (index, item) {
                    var itemID = $(item).parents('li.order-item').attr('data-item-id');
                    itemList.push(itemID);
                });
                if(itemList.length > 0) {
                    var ajaxUrl = self.$cartContent.attr('data-list-url');
                    var postData = {'itemID': (itemList.length > 0) ? itemList.join() : null};
                    lgkorUI.requestAjaxData(ajaxUrl, postData, function(result){
                        careCartInfo.updateData(result.data);
                    });
                } else {
                    //선택된 제품이 없다
                    careCartInfo.setEmptyData();
                }
            },

            //아이템 안내 팁
            requestItemTip: function(dm) {
                var _self = this;
                var ajaxUrl = $(dm).attr('href');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                    _self.openModalFromHtml(result);
                }, null, "html");
            },

            //아이템 삭제 (리스트로 전달)
            requestRemoveItem: function(items) {
                var _self = this;
                var ajaxUrl = self.$cartContent.attr('data-remove-url');
                var postData = {'itemID': (items instanceof Array ? items.join() : items) }
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    _self.updateList(result.data);
                    _self.requestInfo();
                    $(window).trigger("toastshow", "선택한 제품이 삭제되었습니다.");
                });
            },

            //아이템 찜하기
            requestWishItem: function(itemID, wish) {
                var ajaxUrl = self.$cartContent.attr('data-wish-url');
                var postData = {"itemID":itemID, "wish":wish};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },

            /*
            //장바구니에 담기
            requestCartItem: function(itemID) {
                var ajaxUrl = self.$cartContent.attr('data-cart-url');
                var postData = {"itemID":itemID};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },
            */

            //dom의 data-url을 읽어서 이동시킴
            locationButtonUrl: function(dm) {
                var url = $(dm).attr('data-url');
                location.href = url;
            }
        };

        careCart.init();
    });
})();