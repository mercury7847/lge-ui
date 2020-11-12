var AddressManagement = (function() {
    var addressItemTemplate = '<li class="lists"><div class="inner">' +
        '<dl class="addr">' +
            '<dt>' +
                '<p><span class="blind">배송지명</span>{{addressName}}</p>' +
                '{{#if defaultAddress}}<span class="flag-wrap"><span class="flag">기본배송지</span></span>{{/if}}' +
            '</dt>' +
            '<dd><p><span class="blind">이름</span>{{name}}</p><p><span class="blind">연락처</span>{{telString}}</p></dd>' +
            '<dd><p><span class="blind">주소</span>{{address1}} {{address2}}</p></dd>' +
        '</dl>' +
        '<div class="btns">' +
            '<button class="btn border size edit"><span>수정</span></button>' +
            '{{#if !(defaultAddress)}}<button class="btn border size remove"><span>삭제</span></button>{{/if}}' +
        '</div>' +
        '<span class="rdo-wrap">' +
            '<input type="radio" id="address-rdo1-{{index}}" name="address-rdo1" {{#if defaultAddress}}checked{{/if}}>' +
            '<label for="address-rdo1-{{index}}">배송지 선택</label>' +
        '</span>' +
    '</div></li>'

    function AddressManagement(targetQuery, registerTargetQuert, callback) {
        var self = this;
        self.$content = $(targetQuery);
        //배송지 리스트
        self.$addressLists = self.$content.find('ul.address-lists');
        //페이지목록
        self.$pagination = self.$content.find('div.pagination');
        //데이타없음
        self.$nodata = self.$content.find('div.no-data');
        //하단
        self.$footer = self.$content.find('.pop-footer');
        //배송지선택 버튼
        self.$selectAddress = self.$footer.find('div.btn-group button');
        //배송지추가 버튼
        self.$addAddress = self.$content.find('div.my-address-wrap button.btn-addr');

        vcui.require(['ui/pagination'], function () {
            self._bindEvents();
        });
    }

    //public
    AddressManagement.prototype = {
        open: function() {
            var self = this;
            var param = {"page": "0"}
            self._getData(param);
        },

        close: function() {
            self.$content.vcModal('close');
        },

        _getData: function(param) {
            var self = this;
            var ajaxUrl = self.$content.attr('data-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                self._updateList(result);
                self.$content.vcModal();
            });
        },

        _updateList: function(data) {
            var self = this;

            self.$pagination.vcPagination('setPageInfo', data.param.pagination);
            
            var itemList =  data.data instanceof Array ? data.data : [];

            self.$addressLists.empty();
            if(itemList.length > 0) {
                itemList.forEach(function(item, index) {
                    item.index = index;
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
            
            //페이지
            self.$pagination.vcPagination().on('page_click', function(e, data) {
                //기존에 입력된 데이타와 변경된 페이지로 검색
                var param = {"page":data}
                self._getData(param);
            });
            
            //배송지 추가
            self.$addAddress.on('click', function(e) {
                console.log('배송지 추가')
            })

            //배송지 선택
            self.$selectAddress.on('click', function(e){
                console.log('배송지 선택');
            });

            //아이템 수정
            self.$addressLists.on('click', 'li.lists div.inner div.btns button', function(e){
                var $this = $(this);
                if($this.hasClass('edit')) {
                    //아이템 수정
                    console.log('아이템 수정');
                } else if($this.hasClass('remove')){
                    //아이템 삭제
                    console.log('아이템 삭제');
                }
            });

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