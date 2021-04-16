(function() {
    var cartItemTemplate = '<li class="order-item is-check btm-message {{#if !(available)}}disabled{{/if}}" data-item-id="{{itemID}}" data-item-seq="{{itemSeq}}">' +
        '<div class="item-image"><a href="{{itemUrl}}"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a></div>' +
        '<div class="product-info">' +
            '<div class="flag-wrap bar-type">' +
                '<span class="flag"><span class="blind">제품타입</span>{{type}}</span>' +
            '</div>' +
            '<div class="item-name"><a href="{{itemUrl}}">{{#raw title}}</a></div>' +
            '<div class="sku"><span class="blind">제품번호</span>{{sku}}</div>' +
            '<div class="sibling-option"><p>{{colorOption}}</p></div>' +
            '<div class="item-options2">{{#each item in option}}<p>{{item}}</P>{{/each}}</div>' +
        '</div>' +
        '<div class="product-payment">' +
            '<div class="amount">' +
                '<div class="price">{{#if originalPrice}}<p class="original">월 {{originalPrice}}원</p>{{/if}}<p class="total">월 {{salePrice}}원</p></div>' +            
                //'{{#if tooltip}}<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">계약내용 자세히 보기</span>' +
                //'<span class="tooltip-box"><p>{{tooltip}}</p><button type="button" class="btn-close"><span class="blind">닫기</span></button></span></div>{{/if}}' +
                '<a href="{{tipUrl}}" class="btn-info"><span class="blind">매월 납부금 계약내용 자세히 보기</span></a>' +
            '</div>' +
        /*
            '<div class="btn-area">' +
                '{{#if subscriptionUrl}}<button type="button" class="btn pink border size" data-url="{{subscriptionUrl}}"><span>청약신청</span></button>{{#else}}<button type="button" class="btn pink border size" disabled><span>청약신청불가</span></button>{{/if}}' +
            '</div>' +
        */
        '</div>' +
        '{{#if availableMessage}}<div class="disabled-message"><p class="err-msg">{{availableMessage}}</p></div>{{/if}}' +
        //'{{#if isLogin}}<span class="chk-wish-wrap"><input type="checkbox" id="chk-wish-{{itemID}}-{{itemSeq}}" name="chk-wish-{{itemID}}-{{itemSeq}}" {{#if (wish)}}checked{{/if}}><label for="chk-wish-{{itemID}}-{{itemSeq}}"><span class="blind">{{#if wish}}찜한상품{{#else}}찜하기{{/if}}</span></label></span>{{/if}}' +
        '<span class="chk-wrap"><input type="checkbox" id="chk-select-{{itemID}}-{{itemSeq}}" name="chk-select" {{#if (available && check)}}checked{{/if}} {{#if !(available)}}disabled{{/if}}><label for="chk-select-{{itemID}}-{{itemSeq}}"><span class="blind">선택안함</span></label></span>' +
        '<div class="item-delete"><button type="button" class="btn-delete"><span class="blind">제품 삭제</span></button></div>' +
        '</li>';
        
    $(window).ready(function() {
        var careCartInfo = new CareCartInfo('div.col-right');

        var careCart = {
            init: function() {
                var self = this;
                //케어솔루션 리스트
                self.$tabCount = $('.ui_tab ul.tabs li a[href="#tab2"] span');
                self.$cartContent = $('#tab2');
                self.$cartWrap = self.$cartContent.find('div.cart-wrap');
                self.$checkOption = self.$cartWrap.find('div.check-option');
                self.$cartAllCheck = self.$cartContent.find('div.check-option div.chk-wrap input');
                self.cartItemCheckQuery = "li.order-item span.chk-wrap input";
                self.$cartSelectRemove = self.$cartContent.find('div.check-option div.btn-area button.btn-text');
                self.$cartList = self.$cartContent.find('div.list-wrap');

                //nodata
                self.$noData = self.$cartContent.find('div.no-data-wrap');
                //추천제품
                self.$recommendProduct = $('div.product-recommend-wrap');

                //vcui.require(['ui/checkboxAllChecker'], function () {
                    //self.$cartWrap.vcCheckboxAllChecker({checkBoxItemsTargetQuery:self.cartItemCheckQuery});
                    //self.cartAllChecker = self.$cartWrap.vcCheckboxAllChecker('instance');

                    self.bindEvents();
                    self.bindPopupEvents();
                    self.updateCartItemCheck();
                    self.checkNoData();

                    var reveal_url = self.$cartContent.attr('data-reveal-url');
                    if(reveal_url) {
                        lgkorUI.showLoading();
                        lgkorUI.requestAjaxDataPost(reveal_url, null, function(result){
                            self.updateList(result.data);

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
                            self.requestCartCount();

                            $('.product-recommend-wrap .ui_carousel_slider').vcCarousel('update');
                        });
                    } else $('.product-recommend-wrap .ui_carousel_slider').vcCarousel('update');
                //});
            },

            bindEvents: function() {
                var self = this;

                //전체선택
                /*
                self.$cartAllCheck.on('change', function (e) {
                    var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                    $cartItemCheck.prop('checked', self.$cartAllCheck.is(':checked'));
                    $cartItemCheck.each(function (index, item) {
                        self.changeBlindLabelTextSiblingCheckedInput(item,'선택함','선택안함');
                    });
                    self.requestInfo();
                });
                */

                //리스트 아이템 선택
                /*
                self.$cartList.on('click', self.cartItemCheckQuery, function(e) {
                    self.updateCartItemCheck();
                    self.changeBlindLabelTextSiblingCheckedInput(this,'선택함','선택안함');
                    self.requestInfo();
                });
                */

                $('.ui_tab').on("tabbeforechange", function(e, data){
                    e.preventDefault();
                    var $a = $(this).find('li:eq('+data.selectedIndex+') a');
                    var _id = $a.attr('href').replace("#","");
                    var url = $('#'+_id).attr('data-url');
                    if(url) {
                        location.href = url;
                    }
                });

                /*
                self.cartAllChecker.on('allCheckerChange', function(e, status){
                    self.requestInfo();
                });
                */

                //전체선택 체크박스
                self.$cartAllCheck.on('change', function (e) {
                    var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery);
                    $cartItemCheck.prop('checked', self.$cartAllCheck.is(':checked'));
                    $cartItemCheck.each(function (index, item) {
                        self.changeBlindLabelTextSiblingCheckedInput(item,'선택함','선택안함');
                    });
                    self.requestInfo();
                });

                //선택 체크박스
                self.$cartList.on('change', 'li span.chk-wrap input', function(e) {
                    self.requestInfo();
                });

                //리스트 아이템 청약하기 버튼
                self.$cartList.on('click', 'div.product-payment div.btn-area button', function(e) {
                    self.locationButtonUrl(this);
                });

                //리스트 아이템 찜하기
                self.$cartList.on('click', 'span.chk-wish-wrap input', function(e) {
                    var $li = $(this).parents('li.order-item');
                    var checked = $(this).is(':checked');
                    self.requestWish($li, checked);
                });

                //선택 삭제
                self.$cartSelectRemove.on('click', function(e) {
                    var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                    var itemList = [];
                    var itemSeqList = [];
                    cartItemCheck.each(function (index, item) {
                        var itemID = $(item).parents('li.order-item').attr('data-item-id');
                        var itemSeq = $(item).parents('li.order-item').attr('data-item-seq');
                        itemList.push(itemID);
                        itemSeqList.push(itemSeq);
                    });
                    if(itemList.length > 0) {
                        self.requestRemoveItem(itemList, itemSeqList);
                    }

                    /*
                    var obj = {title:'', cancelBtnName:'취소', okBtnName:'삭제', ok: function (){
                        var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked');
                        var itemList = [];
                        var itemSeqList = [];
                        cartItemCheck.each(function (index, item) {
                            var itemID = $(item).parents('li.order-item').attr('data-item-id');
                            var itemSeq = $(item).parents('li.order-item').attr('data-item-seq');
                            itemList.push(itemID);
                            itemSeqList.push(itemSeq);
                        });
                        if(itemList.length > 0) {
                            self.requestRemoveItem(itemList, itemSeqList);
                        }
                    }};
                    var desc = '선택된 제품을 삭제하시겠습니까?';
                    lgkorUI.confirm(desc, obj);
                    */
                });

                //리스트 아이템 삭제
                self.$cartList.on('click', 'div.item-delete button.btn-delete', function(e) {
                    var itemID = $(this).parents('li.order-item').attr('data-item-id');
                    var itemSeq = $(this).parents('li.order-item').attr('data-item-seq');
                    self.requestRemoveItem([itemID],[itemSeq]);
                });

                //리스트 아이템 안내 팁
                self.$cartList.on('click', 'div.product-payment div.amount a.btn-info', function(e) {
                    e.preventDefault();
                    self.requestItemTip(this);
                });

                //추천제품 장바구니(삭제)
                /*
                self.$recommendProduct.on('click', 'div.slide-box button', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    self.requestCartItem(itemID);
                });
                */

                //추천제품 찜하기 (삭제)
                /*
                self.$recommendProduct.on('click', 'div.slide-box span.chk-wish-wrap input', function(e) {
                    var itemID = $(this).parents('div.slide-box').attr('data-item-id');
                    var checked = $(this).is(':checked');
                    self.requestWishItem(itemID, checked);
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
                var self = this;
                /*
                if(self.cartAllChecker) {
                    self.cartAllChecker.update();
                }
                */
                var $cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':not(:disabled)');
                var $selectItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked:not(:disabled)');

                self.$cartAllCheck.prop('checked', ($cartItemCheck.length > 0 && $cartItemCheck.length == $selectItemCheck.length));
            },

            updateList: function(data) {
                var self = this;

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
                    self.$checkOption.show();
                } else {
                    self.$cartWrap.hide();
                }
                self.updateCartItemCheck();

                self.checkNoData();
            },

            changeBlindLabelTextSiblingCheckedInput: function(input, trueText, falseText) {
                $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
            },

            noData: function(visible) {
                var self = this;
                if(visible) {
                    //self.$checkOption.hide();
                    self.$cartContent.find('>div:not(.no-data-wrap)').hide();
                    self.$noData.show();
                } else {
                    self.$cartContent.find('>div:not(.no-data-wrap)').show();
                    self.$noData.hide();
                }
            },

            checkNoData: function() {
                var self = this;
                self.noData(self.$cartList.find('li.order-item').length > 0 ? false : true);
            },

            openModalFromHtml: function(html) {
                $('#request-tip-modal').html(html).vcModal();
            },

            //선택된 제품에 따른 구매정보들 요청
            requestInfo: function() {
                var self = this;
                var cartItemCheck = self.$cartList.find(self.cartItemCheckQuery+':checked:not(:disabled)');
                var itemList = [];
                var itemSeqList = [];
                cartItemCheck.each(function (index, item) {
                    var itemID = $(item).parents('li.order-item').attr('data-item-id');
                    var itemSeq = $(item).parents('li.order-item').attr('data-item-seq');
                    itemList.push(itemID);
                    itemSeqList.push(itemSeq);
                });
                if(itemList.length > 0) {
                    var ajaxUrl = self.$cartContent.attr('data-list-url');
                    var postData = {
                        'itemID': (itemList.length > 0) ? itemList.join() : null,
                        'itemSeq': (itemSeqList.length > 0) ? itemSeqList.join() : null,
                    };
                    var cardId = careCartInfo.getSelectCardId();
                    postData.easyRequestCard = cardId;
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(ajaxUrl, postData, function(result){
                        var data = result.data;
                        careCartInfo.updateData(data);
                        self.updateList(data);
                    });
                } else {
                    //선택된 제품이 없다
                    careCartInfo.setEmptyData();
                    self.updateCartItemCheck();
                }
            },

            //아이템 안내 팁
            requestItemTip: function(dm) {
                var self = this;
                var ajaxUrl = $(dm).attr('href');
                var $li = $(dm).parents('li');
                var param = {
                    'itemID': $li.attr('data-item-id'),
                    'itemSeq': $li.attr('data-item-seq')
                };
                var cardId = careCartInfo.getSelectCardId();
                param.easyRequestCard = cardId;
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    self.openModalFromHtml(result);
                }, null, "html");
            },

            //장바구니 카운트 갱신
            requestCartCount: function() {
                var self = this;
                var ajaxUrl = self.$cartContent.attr('data-count-url');
                if(ajaxUrl) {
                    lgkorUI.requestCartCount(ajaxUrl);
                }
            },

            //아이템 삭제 (리스트로 전달)
            requestRemoveItem: function(items, seqs) {
                var self = this;
                var ajaxUrl = self.$cartContent.attr('data-remove-url');
                var postData = {'itemID': (items instanceof Array ? items.join() : items),
                                'itemSeq': (seqs instanceof Array ? seqs.join() : seqs)};
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    self.updateList(result.data);
                    self.requestInfo();
                    $(window).trigger("toastshow", "선택한 제품이 삭제되었습니다.");
                    self.requestCartCount();
                });
            },

            //아이템 찜하기
            requestWish: function($dm, wish) {
                var self = this;
                var ajaxUrl = self.$cartContent.attr('data-wish-url');
                var success = function(data) {
                    //$dm.attr("data-wishItemId",data.wishItemId);
                };
                var fail = function(data) {
                    $dm.find('span.chk-wish-wrap input').prop("checked",!wish);
                };

                var param = {
                    "itemID":$dm.attr('data-item-id'),
                    "wish":wish
                };

                lgkorUI.requestWish(
                    param,
                    wish,
                    success,
                    fail,
                    ajaxUrl
                );
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