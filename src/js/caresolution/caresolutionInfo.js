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
    var totalPaymentItemTemplate = '<dt class="text">총 {{count}}건</dt><dd class="price">월 {{price}}원</dd>'
    
    /*
    function changeBlindLabelTextSiblingCheckedInput(input, trueText, falseText) {
        $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
    }
    */

    function CareCartInfo(targetQuery) {
        var self = this;
        self.$cartContent = $(targetQuery);

        //로그인
        self.$loginInfo = self.$cartContent.find('div.box-link');

        //아이템정보
        self.$itemInfo = self.$cartContent.find('div.item-info');

        //요금정보
        self.$paymentInfo = self.$cartContent.find('div.payment-amount-info');
        self.$paymentButton = self.$paymentInfo.find('div.btn-area button');
        
        //신청서확인
        self.$agreement = self.$cartContent.find('div.agree-box');
    
        //계약신청서 확인/동의
        self.$agreementAllCheck = self.$agreement.find('div.chk-btm span.chk-wrap input');
        self.agreementItemCheckQuery = "li span.chk-wrap input";

        //청약하기 버튼
        self.$subscriptionButton = self.$agreement.find('div.btn-area button');

        self._bindEvents();
        self._bindPopupEvents();
    }

    //public
    CareCartInfo.prototype = {
        updateData: function(data) {
            var self = this;
            if(data.isLogin) {
                self.$loginInfo.hide();
            } else {
                self.$loginInfo.show();
            }
            self._updateItemInfo(data);
            self._updatePaymentInfo(data);
        },

        _updateItemInfo: function(data) {
            var self = this;
            var selectedItem = data ? (data.selectedItem instanceof Array ? data.selectedItem : []) : [];
            var itemList =  data ? (data.itemList instanceof Array ? data.itemList : []) : [];
            var infoData = [];
            selectedItem.forEach(function(item) {
                var find = itemList.filter(function(el){
                    return el.itemID == item;
                });
                if(find.length > 0) {
                    infoData.push(find[0]);
                }
            });

            //선택된 아이템들 정보
            var $list_ul = self.$itemInfo.find('ul.item-list');
            $list_ul.empty();
            if(infoData.length > 0) {
                infoData.forEach(function(item, index) {
                    item.originalPrice = item.originalPrice ? vcui.number.addComma(item.originalPrice) : '';
                    item.salePrice = item.salePrice ? vcui.number.addComma(item.salePrice) : '';

                    if(item.available) {
                        $list_ul.append(vcui.template(subscriptionDisableItemTemplate, item));
                    } else {
                        $list_ul.append(vcui.template(subscriptionItemTemplate, item));
                    }
                });
                self.$itemInfo.show();
            } else {
                self.$itemInfo.hide();
            }
        },
    
        _updatePaymentInfo: function(data) {
            var self = this;
            var paymentInfo = data.paymentInfo;

            var priceData = paymentInfo ? (paymentInfo.list instanceof Array ? paymentInfo.list : []) : [];

            //요금정보
            var $list_ul = self.$paymentInfo.find('ul.payment-list');
            $list_ul.empty();
            if(priceData.length > 0) {
                priceData.forEach(function(item, index) {
                    $list_ul.append(vcui.template(paymentItemTemplate, item));
                });
            }
            
            var totalData = paymentInfo.total;
            if(totalData) {
                var count = totalData.count;
                if(count > 0) {
                    self.$paymentButton.removeAttr('disabled');
                    self.$paymentButton.attr('disabled');
                } else {
                    self.$paymentButton.attr('disabled');
                }

                totalData.count = totalData.count ? vcui.number.addComma(totalData.count) : '';
                totalData.price = totalData.price ? vcui.number.addComma(totalData.price) : '';

                self.$paymentInfo.find('div.total-payment-amount dl').html(vcui.template(totalPaymentItemTemplate, totalData));
                self.$paymentButton.text('총 '+totalData.count +'개 신청하기');
            }
        },

        _bindEvents: function() {
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
    
            //청약하기버튼 클릭
            self.$subscriptionButton.on('click', function(e) {
                self._clickSubscriptionButton(this);
            });

            //신청하기버튼 클릭
            self.$paymentButton.on('click', function(e) {
                self._clickApplyButton(this);
            });
        },

        _bindPopupEvents: function() {
            var self = this;

            $('#careship-subscription-popup').on('click','div.btn-group button', function(e) {
                $('#careship-subscription-popup').vcModal('close');
                self._subscriptionItem();
            });
        },

        //신청하기 버튼 클릭
        _clickApplyButton: function(dm) {
            var ajaxUrl = $(dm).attr('data-check-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                if(result.data.title) {
                    var obj ={title:result.data.title , typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};
                    var desc = result.data.desc;
                    if(desc) {
                        obj.typeClass = 'type2'
                    }
                    lgkorUI.alert(desc, obj);
                }
            });
        },

        //청약신청하기 버튼 클릭
        _clickSubscriptionButton: function(dm) {
            var self = this;
            var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
            if(!$itemCheck.is(':not(:checked)')) {
                $('#careship-subscription-popup').vcModal();
            } else {
                //동의서가 다 체크되지 않음
            }
        },

        //청약신청하기
        _subscriptionItem: function() {
            var self = this;
            var ajaxUrl = self.$subscriptionButton.attr('data-check-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                if(result.data.title) {
                    var obj ={title:result.data.title , typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};
                    var desc = result.data.desc;
                    if(desc) {
                        obj.typeClass = 'type2'
                    }
                    lgkorUI.alert(desc, obj);
                }
            });
        }
    }

    return CareCartInfo;
})();