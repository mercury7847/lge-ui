var CareCartInfo = (function() {
    var subscriptionItemTemplate = '<li data-item-id="{{itemID}}"><span class="item-subtit">{{type}}</span>' +
        '<strong class="item-tit">{{title}}</strong>' +
        '<div class="item-spec"><span>{{sku}}</span>' +
        '<span>월 {{salePrice}}원</span></div></li>'
    
    var subscriptionDisableItemTemplate = '<li class="item-disabled" data-item-id="{{itemID}}"><span class="item-subtit">{{type}}</span>' +
        '<strong class="item-tit">{{title}}</strong>' +
        '<div class="item-spec"><span>{{sku}}</span>' +
        '<span>월 {{salePrice}}원</span></div>' +
        '{{#if availableMessage}}<p class="text-disabled"><span>{{availableMessage}}</span></p>{{/if}}</li>'

    var paymentItemTemplate = '<li><dl><dt class="text">{{text}}</dt><dd class="price {{appendClass}}">{{price}}</dd></dl></li>';
    var totalPaymentItemTemplate = '<dt class="text">총 {{count}}건</dt><dd class="price">월 {{price}}원</dd>'
    
    /*
    function changeBlindLabelTextSiblingCheckedInput(input, trueText, falseText) {
        $(input).siblings('label').find('span').text($(input).is(':checked')?trueText:falseText);
    }
    */

    function CareCartInfo(targetQuery, itemInfoHiddenCheckTargetQuery) {
        var self = this;
        self._setting(targetQuery, itemInfoHiddenCheckTargetQuery);
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
            self.updateItemInfo(data);
            self.updatePaymentInfo(data.paymentInfo);
            self.updateAgreement(data.agreement);
        },

        setEmptyData: function() {
            var self = this;
            var resetPaymentData = {
                "total":{
                    "count": "0",
                    "price": "0"
                },
                "list":[
                    {
                        "text": "제품 수",
                        "price": "0개",
                        "appendClass": "num"
                    },
                    {
                        "text": "이용요금",
                        "price": "월 0원",
                        "appendClass": ""
                    }
                ]
            }
            self.updatePaymentInfo(resetPaymentData);
            self.updateItemInfo(null);
            self.updateAgreement(null);
        },

        updateItemInfo: function(data) {
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
                        $list_ul.append(vcui.template(subscriptionItemTemplate, item));
                    } else {
                        $list_ul.append(vcui.template(subscriptionDisableItemTemplate, item));
                    }
                });
                self.$itemInfo.show();
            } else {
                self.$itemInfo.hide();
            }
        },
    
        updatePaymentInfo: function(data) {
            var self = this;
            var paymentInfo = data ? data : {};

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
                } else {
                    self.$paymentButton.attr('disabled',true);
                }

                totalData.count = totalData.count ? vcui.number.addComma(totalData.count) : '';
                totalData.price = totalData.price ? vcui.number.addComma(totalData.price) : '';

                self.$paymentInfo.find('div.total-payment-amount dl').html(vcui.template(totalPaymentItemTemplate, totalData));
                self.$paymentButton.text('총 '+totalData.count +'개 신청하기');
            }
        },

        updateAgreement: function(data) {
            var self = this;
            var agreementData = data ? data : null;
            if(agreementData && agreementData.hasCareship) {
                var hasCareship = agreementData.hasCareship;
                self.$agreement.attr('data-has-careship',hasCareship);
            } else {
                self.$agreement.removeAttr('data-has-careship');
            }
        },

        _setting: function(targetQuery, itemInfoHiddenCheckTargetQuery) {
            var self = this;
            self.$cartContent = $(targetQuery);
            self.requestInfoY = self.$cartContent.offset().top;
            self.itemInfoHiddenCheckTarget = $(itemInfoHiddenCheckTargetQuery);

            //로그인
            self.$loginInfo = self.$cartContent.find('div.box-link');

            //아이템정보
            self.$itemInfo = self.$cartContent.find('div.item-info');

            //요금정보
            self.$paymentInfo = self.$cartContent.find('div.payment-amount-info');
            self.$paymentButton = self.$paymentInfo.find('div.btn-area button');
            
            //신청서확인
            self.$agreement = self.$cartContent.find('div.agree-box');
            vcui.require(['ui/checkboxAllChecker'], function () {
                self.$agreement.vcCheckboxAllChecker();
                self.requestAgreeChecker = self.$agreement.vcCheckboxAllChecker('instance');
            });
        
            //계약신청서 확인/동의
            self.$agreementAllCheck = self.$agreement.find('div.chk-btm span.chk-wrap input');
            self.agreementItemCheckQuery = "li span.chk-wrap input";

            //청약하기 버튼
            self.$subscriptionButton = self.$agreement.find('div.btn-area button');
            
            if(!vcui.detect.isMobile){
                self.$cartContent.data('infoHidden', true);
                self.$itemInfo.hide();
            }
        },
        
        _bindEvents: function() {
            var self = this;
            
            //계약신청서 확인/동의 전체 선택
            /*
            self.$agreementAllCheck.on('change',function (e) {
                var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
                $itemCheck.prop('checked', self.$agreementAllCheck.is(':checked'));
            });
    
            //계약신청서 아이템 선택
            self.$agreement.on('click', self.agreementItemCheckQuery, function(e) {
                var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
                self.$agreementAllCheck.prop('checked', !$itemCheck.is(':not(:checked)'));
            });
            */
    
            //청약하기버튼 클릭
            self.$subscriptionButton.on('click', function(e) {
                self._clickSubscriptionButton(this);
            });

            //신청하기버튼 클릭
            self.$paymentButton.on('click', function(e) {
                self._clickApplyButton(this);
            });

            //스크롤 이벤트
            if(!vcui.detect.isMobile){
                $(window).on('scroll', function(e){
                    self._setScrollMoved();
                });
                self._setScrollMoved();
            }
        },

        _bindPopupEvents: function() {
            var self = this;

            $('#careship-subscription-popup').on('click','div.btn-group button', function(e) {
                $('#careship-subscription-popup').vcModal('close');
                self._subscriptionItem();
            });
        },

        _setScrollMoved: function() {
            var self = this;
            if(self.itemInfoHiddenCheckTarget.length > 0) {
                var winwidth = $(window).width();
                if(winwidth > 1024){
                    var scrolltop = $(window).scrollTop();
                    if(scrolltop > self.requestInfoY-54){
                        if(!self.$cartContent.hasClass('fixed')) self.$cartContent.addClass('fixed');
            
                        var formy = self.itemInfoHiddenCheckTarget.offset().top;
                        var isHidden = self.$cartContent.data('infoHidden');
                        if(scrolltop > formy){
                            if(isHidden){
                                self.$cartContent.data('infoHidden', false);
                                self.$itemInfo.slideDown();
                            }
                        } else{
                            if(!isHidden){
                                self.$cartContent.data('infoHidden', true);
                                self.$itemInfo.slideUp();
                            }
                        }
        
                        var footery = -scrolltop + $('footer').first().offset().top - 100;
                        var infoheight = self.$cartContent.find('.info-area').outerHeight(true);
                        if(footery < infoheight){
                            //console.log(infoheight)
                            self.$cartContent.find('.info-area').css({y:footery - infoheight})
                        } else{
                            self.$cartContent.find('.info-area').css({y:0})
                        }
                    } else{
                        if(self.$cartContent.hasClass('fixed')) self.$cartContent.removeClass('fixed');
                    }
                } else{
                    if(self.$cartContent.hasClass('fixed')) self.$cartContent.removeClass('fixed');
        
                    self.$itemInfo.show();
                }
            }
        },

        //ajax 호출시 리턴된 alert을 뛰운다
        openCartAlert: function(alert) {
            if(alert.isConfirm) {
                //컨펌
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName,
                    okBtnName: alert.okBtnName,
                    ok: alert.okUrl ? function (){
                        location.href = alert.okUrl;
                    } : function (){}
                };

                var desc = alert.desc ? alert.desc : alert.title;
                if(alert.title && alert.desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.confirm(desc, obj);
            } else {
                //알림
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName,
                    okBtnName: alert.okBtnName,
                    ok: function (){}
                };

                var desc = alert.desc;
                if(desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.alert(desc, obj);
            }
        },

        //신청하기 버튼 클릭
        _clickApplyButton: function(dm) {
            var self = this;
            var ajaxUrl = $(dm).attr('data-check-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                var alert = result.data.alert;
                if(alert) {
                    self.openCartAlert(alert);
                } else {
                    window.location.href = result.data.url;
                }
            });
        },

        //청약신청하기 버튼 클릭
        _clickSubscriptionButton: function(dm) {
            var self = this;
            var agreechk = self.requestAgreeChecker.getAllChecked();
            //var $itemCheck = self.$agreement.find(self.agreementItemCheckQuery);
            //if(!$itemCheck.is(':not(:checked)'))
            if(agreechk) {
                //동의서 모두 체크
                //console.log(self.$agreement);
                if(self.$agreement.attr('data-has-careship')) {
                    //케어쉽 상품이 포함되어있는지 체크
                    $('#careship-subscription-popup').vcModal();
                } else {
                    //포함되어 있지 않으면 바로 청약신청
                    self._subscriptionItem();
                }
            } else {
                //동의서가 다 체크되지 않음
            }
        },

        //청약신청하기
        _subscriptionItem: function() {
            var self = this;
            var ajaxUrl = self.$subscriptionButton.attr('data-check-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                var alert = result.data.alert;
                if(alert) {
                    /*
                    var obj ={title:alert.title , typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};
                    var desc = alert.desc;
                    if(desc) {
                        obj.typeClass = 'type2'
                    }
                    lgkorUI.alert(desc, obj);
                    */
                    self.openCartAlert(alert);
                } else {
                    location.href = result.data.url;
                }
            });
        },

        setItemInfoDisabled: function(itemID, disabled) {
            var self = this;
            var $item_li = self.$itemInfo.find('li[data-item-id="' + itemID +'"]');
            if($item_li) {
                var $p_text_disabled = $item_li.find('p.text-disabled');
                if(disabled) {
                    $item_li.addClass('item-disabled');
                    if($p_text_disabled.length > 0) {
                        $p_text_disabled.show();
                    } else {
                        $item_li.append('<p class="text-disabled"><span>설치 불가능 제품</span></p>')
                    }
                } else {
                    $item_li.removeClass('item-disabled');
                    if($p_text_disabled.length > 0) {
                        $p_text_disabled.hide();
                    }
                }
            }
        }
    }

    return CareCartInfo;
})();