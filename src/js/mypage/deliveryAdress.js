
;(function(){
    var DELIVERY_ADRESS_LIST;

    var adressListTemplate =     
        '<li class="lists" data-id="{{dataID}}">'+
            '<div class="inner">'+
                '<div class="infos">'+
                    '<div class="title">'+
                        '<p>{{adressNickName}}</p>'+
                        '{{#if defaultAdress}}'+
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
                        '<p><span class="blind">주소</span>{{adressMasking}}</p>'+
                    '</div>'+
                '</div>'+
                '<div class="buttons">'+
                    '<button type="button" class="btn size border edit-btn" data-edit-type="modify"><span>수정</span></button>'+
                    '{{#if !defaultAdress}}<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>{{/if}}'+
                '</div>'+
            '</div>'+
        '</li>';

    var noData = '<div class="no-data"><p>기본배송지를 등록해주세요.</p></div>';

    var txtMasking;
    var adressListData;
    var adressInfoValidation;
    var addressFinder;

    function init(){
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'helper/textMasking', 'caresolution/addressManagement.min'], function () {
            setting();
            bindEvents();
    
            loadAdressList("list");
        });
    }

    function setting(){
        DELIVERY_ADRESS_LIST = $('.contents.mypage').data('adressList');

        txtMasking = new vcui.helper.TextMasking();

        var register = {
            adressNickName:{
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
            detailAdress: {
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
        adressInfoValidation = new vcui.ui.Validation('#address-regist-form',{register:register});

        addressFinder = new AddressFind();

        lgkorUI.addLimitedInputEvent($('#address-regist-form input[name=telephoneNumber]'));
    }

    function bindEvents(){
        $('.contents').on('click', '.addAdress-btn', function(e){
            e.preventDefault();

            var pops = {
                editMode: "add",
                popName: "주소 등록",
                btnName: "등록",
                adressInfo: {
                    adressNickName: "",
                    receiverUser: "",
                    zipCode: "",
                    userAddress: "",
                    detailAdress: "",
                    phoneNumber: "",
                    telephoneNumber: "",
                    defaultAdress:false
                }
            }
            openEditAdressPop(pops)
        });

        $('.adressListWrap').on('click', '>li .edit-btn', function(e){
            e.preventDefault();

            var editype = $(this).data('editType');
            var dataId = $(this).closest("li.lists").data('id');

            if(editype == "modify"){
                var pops = {
                    editMode: "modify",
                    popName: "주소지 수정",
                    btnName: "주소 저장",
                    adressInfo: adressListData[dataId]
                }
                openEditAdressPop(pops);
            } else{
                deleteAdressData(dataId);
            }
        });

        $('#popup-editAdress').on('click', '.find-adress', function(e){
            e.preventDefault();

            getPostCode();
        }).on('click', '.send-btn', function(e){
            e.preventDefault();

            sendAdressInfo();
        })
    }

    function deleteAdressData(id){
        lgkorUI.confirm("배송지를 삭제하시겠습니까?", {
            title: "",
            cancelBtnName: "취소",
            okBtnName: "삭제",
            ok: function(){
                loadAdressList("remove", adressListData[id]);
            }
        });
    }

    function sendAdressInfo(){
        var result = adressInfoValidation.validate();
        if(result.success){
            $('#popup-editAdress').vcModal('close');

            var type = $('#popup-editAdress').data("type");
            var formdata = adressInfoValidation.getValues();
            formdata.defaultAdress = $('#popup-editAdress input[name=defaultAdress]').prop('checked');
            loadAdressList(type, formdata);
        } 
    }

    //우편번호 찾기 연동...
    function getPostCode(){
        addressFinder.open(function(data){
            $('#popup-editAdress').find('input[name=zipCode]').val(data.zonecode);
            $('#popup-editAdress').find('input[name=userAddress]').val(data.roadAddress);
            $('#popup-editAdress').find('input[name=detailAdress]').val('');
        });
    }

    function openEditAdressPop(pops){
        $('#popup-editAdress').find('.pop-title span').text(pops.popName);
        $('#popup-editAdress').find('.send-btn span').text(pops.btnName);
        $('#popup-editAdress').find('.err-block').hide();

        adressInfoValidation.setValues(pops.adressInfo);

        $('#popup-editAdress').data("type", pops.editMode);
        $('#popup-editAdress').vcModal();
    }

    function loadAdressList(type, formdata){
        lgkorUI.showLoading();

        var sendata = {
            type: type,
            adressNickName: formdata ? formdata.adressNickName : "",
            defaultAdress: formdata ? formdata.defaultAdress : "",
            receiverUser: formdata ? formdata.receiverUser : "",
            zipCode: formdata ? formdata.zipCode : "",
            userAddress: formdata ? formdata.userAddress : "",
            detailAdress: formdata ? formdata.detailAdress : "",
            phoneNumber: formdata ? formdata.phoneNumber : "",
            telephoneNumber: formdata ? formdata.telephoneNumber : ""
        }
        console.log("send data:", sendata);

        lgkorUI.requestAjaxData(DELIVERY_ADRESS_LIST, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                $('.adressListWrap').empty();

                adressListData = result.data.adressList;

                if(adressListData.length){
                    for(var idx in adressListData){
                        adressListData[idx]["dataID"] = idx;
                        adressListData[idx]["receiverUserMasking"] = txtMasking.name(adressListData[idx].receiverUser);
                        adressListData[idx]["adressMasking"] = txtMasking.substr(adressListData[idx].zipCode + adressListData[idx].userAddress + adressListData[idx].detailAdress, 30);
                        adressListData[idx]["phoneNumberMasking"] = txtMasking.phone(adressListData[idx].phoneNumber);
                        $('.adressListWrap').append(vcui.template(adressListTemplate, adressListData[idx]));
                    }
                } else{
                    $('.adressListWrap').after(noData);
                }
            }

            lgkorUI.hideLoading();
        });
    }

    $(window).load(function(){
        init();
    })
})();