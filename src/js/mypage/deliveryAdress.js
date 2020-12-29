
;(function(){
    var DELIVERY_ADRESS_LIST;

    var adressListTemplate =     
        '<li class="lists">'+
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
                    '<button type="button" class="btn size border"><span>수정</span></button>'+
                    '{{#if !defaultAdess}}<button type="button" class="btn size border"><span>삭제</span></button>{{/if}}'+
                '</div>'+
            '</div>'+
        '</li>';

    var noData = '<div class="no-data"><p>기본배송지를 등록해주세요.</p></div>';

    var txtMasking;

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
    }

    function bindEvents(){
        $('.contents').on('click', '.addAdress-btn', function(e){
            e.preventDefault();

            console.log(this)
        })
    }

    function loadAdressList(){
        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(DELIVERY_ADRESS_LIST, {}, function(result){
            if(result.data.success == "Y"){
                //$('.adressListWrap').empty();

                var adressList = result.data.adressList;

                if(adressList.length){
                    for(var idx in adressList){
                        var receiverUser = txtMasking.name(adressList[idx].receiverUser);
                        var adress = adressList[idx].zipCode + adressList[idx].userAddress + adressList[idx].detailAdress;
                        var phoneNumber = txtMasking.phone(adressList[idx].phoneNumber);
                        console.log(receiverUser, phoneNumber, adress)
                        //$('.adressListWrap').append(vcui.template(adressListTemplate, result.data.adressList[idx]));
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