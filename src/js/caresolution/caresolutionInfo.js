var CareCartInfo = (function() {
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
    
    function changeBlindLabelTextSiblingCheckedInput(input, trueText, falseText) {
        $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
    }

    function CareCartInfo(targetQuery) {
        var self = this;
        self.$cartContent = $(targetQuery);

        //청약정보
        self.$subscriptionInfo = self.$cartContent.find('div.item-info');
        //요금정보
        self.$paymentInfo = self.$cartContent.find('div.payment-amount-info');
        //신청서확인
        self.$agreement = self.$cartContent.find('div.agree-box');
    
        //계약신청서 확인/동의
        self.$agreementAllCheck = self.$agreement.find('div.chk-btm span.chk-wrap input');
        self.agreementItemCheckQuery = "li span.chk-wrap input";
        self.bindEvents();
    }

    //public
    CareCartInfo.prototype = {
        updateList: function(data) {
            var self = this;
            //청약정보
            var $list_ul = self.$subscriptionInfo.find('ul.item-list');
            $list_ul.empty();
            var arr =  data ? (data.list instanceof Array ? data.list : []) : [];
            arr.forEach(function(item, index) {
                item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : null;
                item.salePrice = item.salePrice ? vcui.number.addComma(item.salePrice) : null;
            });
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
        },
    
        updatePaymentInfo: function(data) {
            var self = this;
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

        bindEvents: function() {
            var self = this;
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
                self.clickSubscriptionButton(this);
            });
        },

        //청약신청하기 버튼 클릭
        clickSubscriptionButton: function(dm) {
            var self = this;
            var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
            if(!$itemCheck.is(':not(:checked)')) {
                var url = $(dm).attr('data-url');
                if(url) {
                    location.href = url;
                }
            } else {
                //동의서가 다 체크되지 않음
            }
        }
    }

    return CareCartInfo;
})();