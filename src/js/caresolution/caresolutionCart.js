(function() {
    var cartItemTemplate = '<li class="order-item {{#if soldout}}disabled{{/if}}">' +
        '<div class="item-image"><a href="{{url}}"><img src="{{image_url}}" alt="{{image_alt}}"></a></div>' +
        '<div class="product-info">' +
            '<div class="flag-wrap bg-type">' +
                '<span class="flag"><span class="blind">제품타입</span>{{type}}</span>' +
            '</div>'
            '<div class="item-name"><a href="{{url}}">{{title}}</a></div>' +
            '<div class="item-options"><div class="sku"><span class="blind">제품번호</span>{{sku}}</div><div class="sibling-option"><span class="blind">제품옵션</span>{{color_option}}</div></div>' +
            '<div class="item-options2">{{#each item in option}}<p>item</P>{{/each}}</div>' +
        '</div>' +
        '<div class="product-payment">' +
            '<div class="amount">' +
            '<div class="price">{{#if original_price}}<p class="original">월 {{original_price}}원</p>{{/if}}<p class="total">월 {{sale_price}}원</p></div>' +
            '{{#if tooltip}}<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">계약내용 자세히 보기</span>'
            '<span class="tooltip-box"><p>{{tooltip}}</p><button type="button" class="btn-close"><span class="blind">닫기</span></button></span></div>{{/if}}' +
            //'<a href="#" class="btn-info"><span class="blind">매월 납부금 계약내용 자세히 보기</span></a>' +
        '</div><div class="btn-area">' +
            '{{#if subscription_url}}<button type="button" class="btn pink border size" data-url={{subscription_url}}><span>청약신청</span></button>{{#else}}<button type="button" class="btn pink border size" disabled><span>청약신청불가</span></button>{{/if}}' +
        '</div></div>' +
        '<span class="chk-wish-wrap"><input type="checkbox" id="chk-wish{{index}}" name="chk-wish{{index}}" data-id={{id}} {{#if (wish)}}checked{{/if}}><label for="chk-wish{{index}}"><span class="blind">찜하기</span></label></span>' +
        '<span class="chk-wrap"><input type="checkbox" id="chk-select{{index}}" name="chk-select{{index}}" data-id={{id}}><label for="chk-select{{index}}"><span class="blind">제품 선택</span></label></span>' +
        '<div class="item-delete"><button type="button" class="btn-delete" data-id={{id}}><span class="blind">제품 삭제</span></button></div>' +
        '</li>'

    var cartItemTemplate2 =
                '<div class="cart-item">' +
                '<div class="product-check"><span class="chk-wrap">' +
                    '<input type="checkbox" id="selectitem{{index}}" name="selectitem">' +
                    '<label for="selectitem{{index}}"><span class="blind">선택안함</span></label>' +
                '</span></div>' +
                '<div class="product-info">' +
                    '<div class="item-image"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div><div class="item-name">{{modelName}}</div>' +
                    '<div class="item-options"><div class="sku">{{modelNumber}}</div><div class="sibling-option">{{modelOption}}</div>' +
                '</div>' +
                '<div class="quantity-wrap">' +
                    '<div class="select-quantity"><div class="inner">' +
                        '<button type="button" class="minus"><span class="blind">뺴기</span></button>' +
                        '<input type="number" class="quantity" title="수량 입력" value="{{Quantity}}" readonly>' +
                        '<button type="button" class="plus"><span class="blind">더하기</span></button>' +
                    '</div></div>' +
                '</div><div class="delivery-option">' +
                    '{{#if (reservationAdvance)}}<a href="{{reservationAdvance}}" class="btn-text">사전방문 예약</a>{{/if}}' +
                    '{{#if (deliveryDesired)}}<a href="{{deliveryDesired}}" class="btn-text">배송희망일 지정</a>{{/if}}' +
                '</div></div>' +
                '{{#if (coupon.length > 0)}}' +
                '<div class="select-coupon"><div class="select-wrap">' +
                    '<select class="ui_selectbox" id="selectCoupon" title="쿠폰 선택">' +
                        '<option value="" class="placeholder">쿠폰을 선택해주세요.</option>' +
                        '{{#each item in coupon}}<option value="{{item.couponId}}">{{item.couponName}}</option>{{/each}}' +
                    '</select></div>' +
                '</div>'+
                '{{/if}}' +
                '<div class="product-payment">' +
                    '<div class="inner">' +
                        '<div class="calc-amount">{{order}}원 {{#if (sale)}}<em>- {{sale}}</em> {{/if}}+ 배송비 {{shipping}}원</div>' +
                        '<div class="amount">' +
                            '{{#if (order != total)}}<span class="purchase-price"><em class="blind">판매가격</em>{{order}}원</span>{{/if}}' +
                            '<span class="total-price"><em class="blind">총 금액</em>{{total}}원</span>' +
                        '</div>' +
                        '<div class="btn-purchase"><a href="#" class="btn bd-pink btn-small">바로구매</a></div>' +
                    '</div>' +
                '</div>' +
                '<div class="product-wish"><span class="chk-wish-wrap">' +
                    '<input type="checkbox" id="wishitem{{index}}" name="wishitem" {{#if (wish)}}checked{{/if}}>' +
                    '<label for="wishitem{{index}}"><span class="blind">찜하기</span></label>' +
                '</span></div>' +
                '<div class="item-delete"><button type="button" class="btn-delete"><span class="blind">상품 삭제</span></button></div>' +
                '</div>';

    function noData(visible) {
        if(visible) {
            $('div.no-data-wrap').show();
        } else {
            $('div.no-data-wrap').hide();
        }
    }

    function requestChangeCartData() {
        $.ajax({
            url: cartUrl
        }).done(function (d) {
            if(d.status != 'success') {
                alert(d.message ? d.message : '오류발생');
                return;
            }

            var data = d.data;
            console.log(data);
            
            //구매/렌탈 카운트
            self.$buyCount.text('구매 ' + data.buyCount + (data.buyCount>0?"+":""));
            self.$rentalCount.text('렌탈(케어솔루션) ' + data.rentalCount + (data.rentalCount>0?"+":""));
            
            if(data.isMember) {
                self.$nonMemberInfo.hide();
                if(data.address1) {
                    self.$memberAddressInfo.find('dd.text').html(data.address1+'<span class="detail-address">'+data.address2+'</span>');
                    self.$memberAddressInfo.show();
                    self.$memberNoAddressInfo.hide();
                } else {
                    self.$memberAddressInfo.hide();
                    self.$memberNoAddressInfo.show();
                }
            } else {
                self.$nonMemberInfo.show();
                self.$memberAddressInfo.hide();
                self.$memberNoAddressInfo.hide();
            }
            
            cartProducts = data.cart instanceof Array ? data.cart : [];

            //var contentHtml = "";

            self.$cartList.empty();
            if(cartProducts.length > 0) {
                noData(false);
                cartProducts.forEach(function(item, index) {
                    item.index = "" + index;
                    self.$cartList.append(vcui.template(cartItemTemplate,item));
                });

                self.$productCheck = $('div.product-check span input');
                self.$productCheck.on('change',function (e) {
                    self.$productAllCheck.prop('checked', !self.$productCheck.is(':not(:checked)'));
                    changeBlindLabelTextSiblingCheckedInput(this,'선택함','선택안함');
                });

                self.$productWish = $('div.product-wish span input');
                self.$productWish.on('click',function (e) {
                    changeBlindLabelTextSiblingCheckedInput(this,'찜한상품','찜하기');
                    var index = self.$productWish.index(this);
                    var product = cartProducts[index];
                    var param = {'productId':product.productId, 'wish':$(this).is(':checked')};
                    requestWishProduct(param);
                });

                self.$productQuantity = $('div.quantity-wrap div.select-quantity div input');
                self.$selectQuantity = $('div.quantity-wrap div.select-quantity div button');
                self.$selectQuantity.on('click',function (e) {
                    var input = $(this).siblings('input');
                    var quantity = changeQuantity = input.val();
                    var index = 0;
                    if($(this).hasClass('minus')) {
                        --changeQuantity;
                        if(changeQuantity < 1) {
                            changeQuantity = 1;
                        }
                        index = $('div.quantity-wrap div.select-quantity div button.minus').index(this);
                    } else if($(this).hasClass('plus')) {
                        ++changeQuantity;
                        index = $('div.quantity-wrap div.select-quantity div button.plus').index(this);
                    }
                    input.val(changeQuantity);
                    if(quantity != changeQuantity) {
                        //수량변화
                        var product = cartProducts[index];
                        var param = {'cart':[{'productId':product.productId, 'quantity':(""+changeQuantity)}]};
                        requestChangeCart(param);
                    }
                });

                self.$removeProduct = $('div.item-delete button');
                self.$removeProduct.on('click',function (e) {
                    var index = self.$removeProduct.index(this);
                    var product = cartProducts[index];
                    var param = {'cart':[{'productId':product.productId, 'quantity':'0'}]};
                    requestChangeCart(param);
                    $(this).parents('div.cart-item').remove();
                    checkNoData();
                });
            } else {
                noData(true);
                self.$productCheck = null;
            }

        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    //지울려고 하는 알람id는 array로 전달
    function requestWishProduct(param) {
        console.log(param);
    }

    //카트 선택사항 변경
    function requestChangeCart(param) {
        console.log(param);
    }

    function changeBlindLabelTextSiblingCheckedInput(input, trueText, falseText) {
        $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
    }

    function checkNoData() {
        noData(self.$cartList.find('div.cart-item').length > 0 ? false : true);
    }

    $(window).ready(function() {
        var careCart = {
            init: function() {

                self.$productAllCheck = $('div.cart-option div.chk-wrap input');
                self.$productCheck = null;

                /*
                var cartContent = $('div.contents.cart');
                cartUrl = cartContent.attr('data-url-cart');
                removeUrl = cartContent.attr('data-url-remove');
                self.$buyCount = $('div.page-header div.tabs-wrap ul.tabs li:nth-child(1) a');
                self.$rentalCount = $('div.page-header div.tabs-wrap ul.tabs li:nth-child(2) a');
                //
                self.$nonMemberInfo = $('div.info-box div:nth-child(1)');
                self.$memberAddressInfo = $('div.info-box div:nth-child(2)');
                self.$memberNoAddressInfo = $('div.info-box div:nth-child(3)');
                //
                self.$cartList = $('div.cart-list');
                //
                self.$productAllCheck = $('div.cart-option div.chk-wrap input');
                self.$productCheck = null;
                self.$selectedProductRemove = $('div.cart-option div.btn-area button');
                //
                self.$productWish = null;
                self.$productQuantity = null;
                self.$selectQuantity = null;
                self.$removeProduct = null;
*/
                this.bindEvents();

                //requestChangeCartData();
            },

            bindEvents: function() {
                /*
                self.$productAllCheck.on('change',function (e) {
                    self.$productCheck.prop('checked', self.$productAllCheck.is(':checked'));
                    self.$productCheck.each(function (index, item) {
                        changeBlindLabelTextSiblingCheckedInput(item,'선택함','선택안함');
                    });
                });

                $('div.cart-option div.btn-area button').on('click',function (e) {
                    var paramData = [];
                    var checkedProduct = $('div.product-check span input:checked');
                    checkedProduct.each(function (index, item) {
                        var index = self.$productCheck.index(item);
                        var product = cartProducts[index];
                        console.log({'productId':product.productId, 'quantity':'0'});
                        paramData.push({'productId':product.productId, 'quantity':'0'});
                    });
                    if(paramData.length > 0) {
                        requestChangeCart({cart:paramData});
                        checkedProduct.parents('div.cart-item').remove();
                        checkNoData();
                    }
                });
                */
            }
        };

        careCart.init();
    });
})();