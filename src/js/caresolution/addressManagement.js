var AddressManagement = (function() {
    var addressItemTemplate = '<li class="lists" data-id={{addressID}} data-address={{jsonData}}><div class="inner">' +
        '<dl class="addr">' +
            '<dt>' +
                '<p><span class="blind">배송지명</span>{{addressName}}</p>' +
                '{{#if defaultAddress}}<span class="flag-wrap"><span class="flag">기본배송지</span></span>{{/if}}' +
            '</dt>' +
            '<dd><p><span class="blind">이름</span>{{name}}</p><p><span class="blind">연락처</span>{{phoneString}}</p></dd>' +
            '<dd><p><span class="blind">주소</span>{{userAddress}} {{detailAddress}}</p></dd>' +
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

    function AddressManagement(targetQuery, registerTargetQuert, selectCallback) {
        var self = this;
        self.selectCallback = selectCallback;
        
        self.$content = $(targetQuery);

        //배송지 리스트
        self.$addressLists = self.$content.find('ul.address-lists');
        //페이지목록
        self.$pagination = self.$content.find('div.pagination');
        //데이타없음
        self.$noData = self.$content.find('div.no-data');
        //하단
        self.$footer = self.$content.find('.pop-footer');
        //배송지선택 버튼
        self.$selectAddress = self.$footer.find('div.btn-group button');
        //배송지추가 버튼
        self.$addAddress = self.$content.find('div.my-address-wrap button.btn-addr');

        self.addressRegist = new AddressRegist(registerTargetQuert, function(data){
            var param = {page:self.$pagination.attr("data-page")};
            self._getData(param);
        });

        vcui.require(['ui/pagination'], function () {
            self._bindEvents();
        });

        self._checkNoData();
    }

    //public
    AddressManagement.prototype = {
        open: function(selectCallback) {
            var self = this;
            if(selectCallback) {
                self.selectCallback = selectCallback;
            }
            var param = {"page": "0"}
            self._getData(param, function(){
                self.$content.vcModal();
            });
        },

        close: function() {
            var self = this;
            self.$content.vcModal('close');
        },

        _getData: function(param, complete) {
            var self = this;
            var ajaxUrl = self.$content.attr('data-list-url');
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                self._updateList(result);
                if(complete) {
                    complete();
                }
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
                    item.phoneString = item.mobilePhone ? vcui.number.phoneNumber(item.mobilePhone) : (item.phone ? vcui.number.phoneNumber(item.phone) : '');
                    item.jsonData = self._encodeAddressData(item);
                    self.$addressLists.append(vcui.template(addressItemTemplate, item));
                });
            }

            self._checkNoData();
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
                self.addressRegist.open();
            })

            //배송지 선택
            self.$selectAddress.on('click', function(e){
                var $item = self.$addressLists.find('li.lists div.inner span.rdo-wrap input:checked');
                var addressData = self._decodeAddressData($item.parents('li.lists').attr('data-address'));
                if(self.selectCallback) {
                    self.selectCallback(addressData);
                }
                self.close();
            });

            //아이템 수정
            self.$addressLists.on('click', 'li.lists div.inner div.btns button', function(e){
                var $this = $(this);
                var addressID = $this.parents('li.lists').attr('data-id');
                if($this.hasClass('edit')) {
                    //아이템 수정
                    console.log('아이템 수정');
                    var addressData = self._decodeAddressData($this.parents('li.lists').attr('data-address'));
                    self.addressRegist.open(addressData);
                } else if($this.hasClass('remove')){
                    //아이템 삭제
                    var ajaxUrl = self.$content.attr('data-remove-url');
                    var param = {addressID:addressID, page:self.$pagination.attr("data-page")};
                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                        self._updateList(result);
                    });

                }
            });
        },

        _checkNoData: function() {
            var self = this;
            self._noData(self.$addressLists.find('li.lists').length > 0 ? false : true);
        },

        _noData: function(visible) {
            var self = this;
            if(visible) {
                self.$noData.show();
                self.$addressLists.hide();
                self.$pagination.hide();
                self.$footer.hide();
            } else {
                self.$noData.hide();
                self.$addressLists.show();
                self.$pagination.show();
                self.$footer.show();
            }
        },

        _encodeAddressData: function(item) {
            return encodeURIComponent(JSON.stringify(item));
        },

        _decodeAddressData: function(data) {
            return JSON.parse(decodeURIComponent(data));
        }
    }

    return AddressManagement;
})();