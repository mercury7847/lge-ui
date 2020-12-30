
;(function(){
    var DELIVERY_ADRESS_LIST;

    var adressListTemplate =     
        '<li class="lists" data-id="{{dataID}}">'+
            '<div class="inner">'+
                '<div class="infos">'+
                    '<div class="title">'+
                        '<p>{{adressNickName}}</p>'+
                        '{{#if defaultAdess}}'+
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
                    '{{#if !defaultAdess}}<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>{{/if}}'+
                '</div>'+
            '</div>'+
        '</li>';

    var noData = '<div class="no-data"><p>기본배송지를 등록해주세요.</p></div>';

    var txtMasking;
    var adressListData;
    var adressInfoValidation;

    function init(){
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'helper/textMasking'], function () {
            setting();
            bindEvents();
    
            loadAdressList();
        });
    }

    function setting(){
        DELIVERY_ADRESS_LIST = $('.contents.mypage').data('adressList');

        txtMasking = new vcui.helper.TextMasking();

        var register = {
            adressNickName:{
                required: true,
                errorMsg: "주소별칭을 입력해주세요.",
                msgTarget: '.err-regist'
            },
            receiverUser: {
                required: true,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-regist'
            },
            zipCode: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address'
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-address'
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-address'
            }
        }
        adressInfoValidation = new vcui.ui.Validation('#address-regist-form',{register:register});
    }

    function bindEvents(){
        $('.contents').on('click', '.addAdress-btn', function(e){
            e.preventDefault();

            var pops = {
                editMode: "ADD",
                popName: "주소 등록",
                btnName: "등록"
            }
            openEditAdressPop(pops)
        });

        $('.adressListWrap').on('click', '>li .edit-btn', function(e){
            e.preventDefault();

            var editype = $(this).data('editType');
            var dataId = $(this).closest("li.lists").data('id');

            if(editype == "modify"){
                var pops = {
                    editMode: "MODIFY",
                    popName: "주소지 수정",
                    btnName: "주소 저장",
                    adressInfo: adressListData[dataId]
                }
                openEditAdressPop(pops);
            } else{
                deleteAdressData(dataId);
            }
        })
    }

    function openEditAdressPop(pops){
        $('#popup-editAdress').find('.pop-title span').text(pops.popName);
        $('#popup-editAdress').find('.send-btn span').text(pops.btnName);

        if(pops.adressInfo){

        } else{
            $()
        }

        $('#popup-editAdress').vcModal();
    }

    function loadAdressList(){
        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(DELIVERY_ADRESS_LIST, {}, function(result){
            if(result.data.success == "Y"){
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

    function deleteAdressData(id){

    }

    $(window).load(function(){
        init();
    })
})();