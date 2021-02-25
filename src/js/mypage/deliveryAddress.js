
;(function(){
    var DELIVERY_ADDRESS_LIST;

    var addressListTemplate =     
        '<li class="lists" data-id="{{dataID}}">'+
            '<div class="inner">'+
                '<div class="infos">'+
                    '<div class="title">'+
                        '<p>{{addressNickName}}</p>'+
                        '{{#if defaultAddress}}'+
                        '<span class="flag-wrap">'+
                            '<span class="flag">기본배송지</span>'+
                        '</span>'+
                        '{{/if}}'+
                    '</div>'+
                    '<ul class="my">'+
                        '<li><span class="blind">받으시는 분</span>{{receiverUserMasking}}</li>'+
                        '<li><span class="blind">연락처</span>{{phoneNumberMasking}}</li>'+
                    '</ul>'+
                    '<div class="address">'+
                        '<p><span class="blind">우편번호</span>{{zipCode}}</p>'+
                        '<p><span class="blind">주소</span>{{addressMasking}}</p>'+
                    '</div>'+
                '</div>'+
                '<div class="buttons">'+
                    '<button type="button" class="btn size border edit-btn" data-edit-type="modify"><span>수정</span></button>'+
                    '{{#if !defaultAddress}}<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>{{/if}}'+
                '</div>'+
            '</div>'+
        '</li>';

    var noData = '<div class="no-data"><p>기본배송지를 등록해주세요.</p></div>';

    var txtMasking;
    var addressListData;
    var addressInfoValidation;
    var addressFinder;

    function init(){
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'helper/textMasking', 'caresolution/addressManagement.min'], function () {
            setting();
            bindEvents();
    
            loadaddressList("list");
        });
    }

    function setting(){
        DELIVERY_ADDRESS_LIST = $('.contents.mypage').data('addressList');

        txtMasking = new vcui.helper.TextMasking();

        var register = {
            addressNickName:{
                required: true,
                errorMsg: "주소별칭을 입력해주세요.",
                msgTarget: '.err-block'
            },
            receiverUser: {
                required: true,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block'
            },
            zipCode: {
                required: true,
                errorMsg: "우편번호를 확인해주세요.",
                msgTarget: '.err-block'
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-block'
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-block'
            },
            phoneNumber: {
                required: true,
                errorMsg: "휴대폰번호를 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        addressInfoValidation = new vcui.ui.Validation('#address-regist-form',{register:register});

        addressFinder = new AddressFind();

        lgkorUI.addLimitedInputEvent($('#address-regist-form input[name=telephoneNumber]'));
    }

    function bindEvents(){
        $('.contents').on('click', '.addAddress-btn', function(e){
            e.preventDefault();

            var pops = {
                editMode: "add",
                popName: "주소 등록",
                btnName: "등록",
                addressInfo: {
                    addressID: "",
                    addressNickName: "",
                    receiverUser: "",
                    zipCode: "",
                    userAddress: "",
                    detailAddress: "",
                    phoneNumber: "",
                    telephoneNumber: "",
                    defaultAddress:false,
                    city: ""
                }
            }
            openeditAddressPop(pops)
        });

        $('.addressListWrap').on('click', '>li .edit-btn', function(e){
            e.preventDefault();

            var editype = $(this).data('editType');
            var dataId = $(this).closest("li.lists").data('id');

            if(editype == "modify"){
                var pops = {
                    editMode: "modify",
                    popName: "주소지 수정",
                    btnName: "주소 저장",
                    addressInfo: addressListData[dataId]
                }
                openeditAddressPop(pops);
            } else{
                deleteAddressData(dataId);
            }
        });

        $('#popup-editAddress').on('click', '.find-address', function(e){
            e.preventDefault();

            getPostCode();
        }).on('click', '.send-btn', function(e){
            e.preventDefault();

            sendaddressInfo();
        })
    }

    function deleteAddressData(id){
        lgkorUI.confirm("배송지를 삭제하시겠습니까?", {
            title: "",
            cancelBtnName: "취소",
            okBtnName: "삭제",
            ok: function(){
                loadaddressList("remove", addressListData[id]);
            }
        });
    }

    function sendaddressInfo(){
        var result = addressInfoValidation.validate();
        if(result.success){
            $('#popup-editAddress').vcModal('close');

            var type = $('#popup-editAddress').data("type");
            var formdata = addressInfoValidation.getValues();
            formdata.addressID = $('#popup-editAddress').data("addressId");
            formdata.city = $('#popup-editAddress').data("city");
            formdata.defaultAddress = $('#popup-editAddress input[name=defaultAddress]').prop('checked');
            loadaddressList(type, formdata);
        } 
    }

    //우편번호 찾기 연동...
    function getPostCode(){
        addressFinder.open(function(data){
            $('#popup-editAddress').data('city', data.sido + " " + data.sigungu);
            $('#popup-editAddress').find('input[name=zipCode]').val(data.zonecode);
            $('#popup-editAddress').find('input[name=userAddress]').val(data.roadAddress);
            $('#popup-editAddress').find('input[name=detailAddress]').val('');
        });
    }

    function openeditAddressPop(pops){
        $('#popup-editAddress').find('.pop-title span').text(pops.popName);
        $('#popup-editAddress').find('.send-btn span').text(pops.btnName);
        $('#popup-editAddress').find('.err-block').hide();

        addressInfoValidation.setValues(pops.addressInfo);

        $('#popup-editAddress').data("type", pops.editMode);
        $('#popup-editAddress').data("addressId", pops.addressInfo.addressID);
        $('#popup-editAddress').data("city", pops.addressInfo.city);
        $('#popup-editAddress').vcModal();
    }

    function loadaddressList(type, formdata){
        lgkorUI.showLoading();

        var sendata = {
            type: type,
            addressID: formdata ? formdata.addressID : "",
            addressNickName: formdata ? formdata.addressNickName : "",
            defaultAddress: formdata ? formdata.defaultAddress : "",
            receiverUser: formdata ? formdata.receiverUser : "",
            zipCode: formdata ? formdata.zipCode : "",
            userAddress: formdata ? formdata.userAddress : "",
            detailAddress: formdata ? formdata.detailAddress : "",
            phoneNumber: formdata ? formdata.phoneNumber : "",
            telephoneNumber: formdata ? (formdata.telephoneNumber ? formdata.telephoneNumber : "") : "",
            city: formdata ? formdata.city : ""
        }
        console.log("send data:", sendata);

        lgkorUI.requestAjaxData(DELIVERY_ADDRESS_LIST, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                $('.addressListWrap').empty();

                addressListData = result.data.addressList;

                if(addressListData.length){
                    for(var idx in addressListData){
                        addressListData[idx]["dataID"] = idx;
                        addressListData[idx]["receiverUserMasking"] = txtMasking.name(addressListData[idx].receiverUser);
                        addressListData[idx]["addressMasking"] = txtMasking.substr(addressListData[idx].userAddress + addressListData[idx].detailAddress, 20);
                        addressListData[idx]["phoneNumberMasking"] = txtMasking.phone(addressListData[idx].phoneNumber);
                        $('.addressListWrap').append(vcui.template(addressListTemplate, addressListData[idx]));
                    }
                } else{
                    $('.addressListWrap').after(noData);
                }
            }

            lgkorUI.hideLoading();
        });
    }

    $(window).load(function(){
        init();
    })
})();