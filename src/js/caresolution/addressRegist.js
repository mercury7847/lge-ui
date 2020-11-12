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