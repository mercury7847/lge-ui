var AddressManagement = (function() {
    var addressItemTemplate = '<li class="lists"><div class="inner">' +
        '<dl class="addr">' +
            '<dt>' +
                '<p><span class="blind">배송지명</span>{{addressName}}</p>' +
                '{{#if defaultAddress}}<span class="flag-wrap"><span class="flag">기본배송지</span></span>{{/if}}' +
            '</dt>' +
            '<dd><p><span class="blind">이름</span>{{name}}</p><p><span class="blind">연락처</span>{{telString}}</p></dd>' +
            '<dd><p><span class="blind">주소</span>{{address1}} {address2}}</p></dd>' +
        '</dl>' +
        '<div class="btns">' +
            '<button class="btn border size"><span>수정</span></button>' +
            '{{#if !(defaultAddress)}}<button class="btn border size"><span>삭제</span></button>{{/if}}' +
        '</div>' +
        '<span class="rdo-wrap">' +
            '<input type="radio" id="rdo1-1" name="rdo1" {{#if defaultAddress}}checked{{/if}}>' +
            '<label for="rdo1-1">배송지 선택</label>' +
        '</span>' +
    '</div></li>'

    function AddressManagement(targetQuery, registerTargetQuert, callback) {
        var self = this;
        self.$content = $(targetQuery);
        //배송지 리스트
        self.$addressLists = self.$content.find('ul.address-lists');
        //페이지목록
        self.$pagination = self.content.find('div.pagination');
        //데이타없음
        self.$nodata = self.content.find('div.no-data');
        //하단
        self.$footer = self.content.find('.pop-footer');
        //배송지선택 버튼
        self.$selectAddress = self.footer.find('div.btn-group button');
        self._bindEvents();
    }

    //public
    CareCartInfo.prototype = {
        open: function() {
            var self = this;
            self._getData();
        },

        close: function() {
            self.$content.vcModal('close');
        },

        _getData: function() {
            var self = this;
            var ajaxUrl = self.$content.attr('data-address-url');
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                self._updateList(result.data);
                self.open();
            });
        },

        _updateList: function(data) {
            var self = this;
            var itemList =  data instanceof Array ? data : [];

            self.$addressLists.empty();
            if(itemList.length > 0) {
                self.$addressLists.forEach(function(item, index) {
                    item.telString = item.tel ? vcui.number.phoneNumber(item.tel) : '';
                    self.$addressLists.append(vcui.template(addressItemTemplate, item));
                });
                self.$addressLists.show();
            } else {
                self.$addressLists.hide();
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
    
            //청약하기버튼 클릭
            self.$subscriptionButton.on('click', function(e) {
                self._clickSubscriptionButton(this);
            });

            //신청하기버튼 클릭
            self.$paymentButton.on('click', function(e) {
                self._clickApplyButton(this);
            });
            */
        },

        /*
        _bindPopupEvents: function() {
            var self = this;

            $('#careship-subscription-popup').on('click','div.btn-group button', function(e) {
                $('#careship-subscription-popup').vcModal('close');
                self._subscriptionItem();
            });
        },
        */
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
                //동의서 모두 체크
                console.log(self.$agreement.attr('data-has-careship'));
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

    return AddressManagement;
})();