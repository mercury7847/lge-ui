(function() {
    var firstLoad = true;
    var cartUrl = "";
    var removeUrl = "";

    var cartItemTemplate =
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
                        '<input type="number" class="quantity" title="수량 입력" value="{{Quantity}}">' +
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
                    '<input type="checkbox" id="favoritem{{index}}" name="favoritem" {{#if (favorite)}}checked{{/if}}>' +
                    '<label for="favoritem{{index}}"><span class="blind">찜하기</span></label>' +
                '</span></div>' +
                '<div class="item-delete"><button type="button" class="btn-delete"><span class="blind">상품 삭제</span></button></div>' +
                '</div>';

    function noData(visible) {
        /*
        if(visible) {
            self.$mypage.find('.notice-list-wrap .nodata').show();
            self.$mypage.find('p.notice-txt').hide();
            self.$removeAll.attr("disabled", true);
        } else {
            self.$mypage.find('.notice-list-wrap .nodata').hide();
            self.$removeAll.removeAttr("disabled");
            self.$mypage.find('p.notice-txt').show();
        }
        */
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
            
            var arr = data.cart instanceof Array ? data.cart : [];

            //var contentHtml = "";

            if(arr.length > 0) {
                noData(false);
                self.$cartList.empty();
                arr.forEach(function(item, index) {
                    item.index = "" + index;
                    //item.totalOnly = (item.order == item.total);
                    //console.log(item);
                    var test = vcui.template(cartItemTemplate,item);
                    self.$cartList.append(test);
                    //console.log(test);
                });
            } else {
                noData(true);
            }

        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    //지울려고 하는 알람id는 array로 전달
    function requestDeleteData(param) {

    }

    $(window).ready(function() {
        var myCart = {
            init: function() {
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

                this.bindEvents();

                requestChangeCartData();
            },

            bindEvents: function() {
            }
        };

        myCart.init();
    });
})();