var AddressFind = (function() {
    function AddressFind(completeCallback) {
        var self = this;
        self.completeCallback = completeCallback;

        self.isPostCode = false;
        self._loadDaumPostApiJs(function() {
            self.isPostCode = true;
        });
    }

    //public
    AddressFind.prototype = {
        open: function(completeCallback) {
            var self = this;
            if(completeCallback) {
                self.completeCallback = completeCallback;
            }
            if(self.isPostCode){
                self.daumPost.open();
            }
        },

        close: function() {
            var self = this;
            self.daumPost.close();
        },

        _importDaumPostApiJs: function() {
            var defer = $.Deferred();
            var script = document.createElement('script');
    
            script.onload = function () {
                defer.resolve();
            };
            script.onerror = function(e){ 
                defer.reject('map api를 로드할수 없습니다.');          
            }
            script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";        
            document.head.appendChild(script);  
    
            return defer.promise();
        },
        
        _loadDaumPostApiJs: function(callback){
            if(window.daum && window.daum.Postcode){
                if(callback) callback();
            } else {
                var self = this;
                self._importDaumPostApiJs().done(function(){
                    if(callback) callback();
                    self.daumPost = new daum.Postcode({
                        oncomplete: function(data){
                            if(self.completeCallback) self.completeCallback(data);
                        }
                    });
                }).fail(function(e){
                    alert(e);
                }) 
            } 
        }
    }

    return AddressFind;
})();

var AddressRegist = (function() {
    function AddressRegist(targetQuery, completeCallback) {
        var self = this;
        self.completeCallback = completeCallback;

        self.$content = $(targetQuery);
        self.$formWrap = self.$content.find('div.form-wrap');

        //주소찾기 버튼
        self.$addressFindButton = self.$content.find('section div.form-wrap dl.forms dd.conts div.box div.cell button');

        //주소 입력 완료 버튼
        self.$submitButton = self.$content.find('footer.pop-footer div.btn-group button');

        self.addressFind = new AddressFind(function(data){
            self._updateFromDaumPostData(data);
        });

        var register = {
            addressName:{
                required: true,
            },
            name:{
                required: true
            },
            zipCode:{
                required: true,
                pattern: /^[0-9]+$/
            },
            userAddress:{
                required: true
            },
            detailAddress:{
                required: true
            },
            mobilePhone:{
                required: true,
                pattern: /^[0-9]+$/
            },
            phone:{
                required: false,
                pattern: /^[0-9]+$/
            }
        }

        vcui.require(['ui/pagination','ui/validation'], function () {
            self._bindEvents();

            self.validation = new vcui.ui.Validation('#address-regist-form',{register:register});
            /* 
            self.validation.on('update', function(e){ 
                console.log('update');
            }).on('errors', function(e,data){
                console.log('errors', data);
            }).on('success', function(data){
                console.log('success');
            });
            */
        });
    }

    //public
    AddressRegist.prototype = {
        open: function(data) {
            var self = this;
            self._resetData(data);
            self.$content.vcModal();
        },

        close: function() {
            var self = this;
            self.$content.vcModal('close');
        },

        _bindEvents: function() {
            var self = this;
            
            //주소 찾기 버튼
            self.$addressFindButton.on('click', function(e) {
                self.addressFind.open();
            })

            self.$submitButton.on('click', function(e) {
                var result = self.validation.validate();
                if(result.success){
                    self._postAddressData(self.validation.getAllValues());
                }
            })
        },

        _updateFromDaumPostData: function(data) {
            //console.log('daumPost complete',data);
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            /*
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = '(' + extraRoadAddr + ')';
            }
            */
            var self = this;
            self.$formWrap.find('input[name=zipCode]').val(data.zonecode);
            self.$formWrap.find('input[name=userAddress]').val(data.roadAddress);
            self.$formWrap.find('input[name=detailAddress]').val('');
        },

        _postAddressData: function(data) {
            var self = this;
            var addressID = self.$content.attr('data-address-id');
            var ajaxUrl = self.$content.attr('data-insert-url');
            if(addressID) {
                //신규가 아닌 수정
                console.log('수정!!!');
                data.addressID = addressID;
                ajaxUrl = self.$content.attr('data-update-url');
            }
            console.log(data);
            lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result){
                self.completeCallback(data);
                self.close();
            });
        },

        _resetData:function(data) {
            var self = this;
            if(data) {
                self.$content.attr('data-address-id',data.addressID);
                $.each(data, function(key, value) {
                    console.log(key,value);
                    var $input = self.$formWrap.find('input[name=' + key + ']');
                    if($input.is(':checkbox')) {
                        $input.prop("checked", value);
                    } else {
                        $input.val(value);
                    }
                });
            } else {
                self.$content.removeAttr('data-address-id');
                self.$formWrap.find('input').val('');
            }
        }
    }

    return AddressRegist;
})();

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
        console.log(self.$addAddress);

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
                console.log('????',self.addressRegist);
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