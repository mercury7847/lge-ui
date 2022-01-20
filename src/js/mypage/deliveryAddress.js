
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
                    // BTOCSITE-5938-51 s
                    // '{{#if memberInfoAddress}}'+
                    //     '<a href="{{modHref}}" class="btn size border mod-link"><span>수정</span></a>'+
                    // '{{#else}}' + 
                    //     '<button type="button" class="btn size border edit-btn" data-edit-type="modify"><span>수정</span></button>'+
                    // '{{/if}}'+
                    // // '{{#if !defaultAddress}}<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>{{/if}}'+
                    // '{{#if !defaultAddress}}'+
                    //     '{{#if !memberInfoAddress}}'+
                    //         '<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>'+
                    //     '{{/if}}'+
                    // '{{/if}}'+
                    // BTOCSITE-5938-51 e
                    '<button type="button" class="btn size border edit-btn" data-edit-type="modify"><span>수정</span></button>'+
                    '{{#if !defaultAddress}}<button type="button" class="btn size border edit-btn" data-edit-type="delete"><span>삭제</span></button>{{/if}}'+
                '</div>'+
            '</div>'+
        '</li>';

    var noData = '<div class="no-data"><p>기본배송지를 등록해주세요.</p></div>';

    var addressListData;
    var addressInfoValidation;
    var addressFinder;

    function init(){
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'caresolution/addressManagement.min'], function () {
            setting();
            bindEvents();
    
            loadaddressList("list");
        });
    }

    function setting(){
        DELIVERY_ADDRESS_LIST = $('.contents.mypage').data('addressList');

        var register = {
            addressNickName:{
                required: true,
                errorMsg: "주소별칭을 입력해주세요.",
                msgTarget: '.err-block',
                // BTOCSITE-5938-396 s
                validate : function(value){
                    if( value.replace(/\s|　/gi, '') == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                // BTOCSITE-5938-396 e
            },
            receiverUser: {
                required: true,
                // BTOCSITE-5938-396
                minLength: 1,
                maxLength: 30,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block',
                // BTOCSITE-5938-396 s
                validate : function(value){
                    if( value.replace(/\s|　/gi, '') == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                // BTOCSITE-5938-396 e
            },
            zipCode: {
                required: true,
                errorMsg: "우편번호를 확인해주세요.",
                // msgTarget: '.err-block'
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-block'
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                // msgTarget: '.err-block'
                // BTOCSITE-5938-396 s
                validate : function(value){
                    if( value.replace(/\s|　/gi, '') == 0) {
                        return false;
                    } else {
                        return true;
                    }
                }
                // BTOCSITE-5938-396 e
            },
            phoneNumber: {
                required: true,
                minLength:10,
                errorMsg: "휴대폰번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            defaultAddress: {
                required: false
            }
        }

        $('#address-regist-form').find('input[name="addressNickName"]').attr('maxlength','60'); // 주소지 별칭 글자수 제한 60
        $('#address-regist-form').find('input[name="detailAddress"]').attr('maxlength', '50'); // 상세주소 글자수 제한 50

        addressInfoValidation = new vcui.ui.Validation('#address-regist-form',{register:register});
        // BTOCSITE-5938-396
        //addressInfoValidation.on()

        addressInfoValidation.on('errors', function(e,data){

        }).on('nextfocus', function(e,target){

            if(target.attr('name') == 'zipCode'){
                setTimeout(function () {
                    $('#popup-editAddress').find('.find-address').focus();
                }, 10);                        
            }            
        });

        addressFinder = new AddressFind();

        $('#address-regist-form input[name=telephoneNumber]').attr('type', 'number');
        lgkorUI.addLimitedInputEvent($('#address-regist-form input[name=telephoneNumber]'));

        $('input[type="number"]').attr('inputmode', 'numeric');
        $('input[type=number]').on('keydown', function(e){
            return e.keyCode !== 69;
        }).on('mousewheel', function(e){ // BTOCSITE-5938-478
            if($(this).attr('name')=='phoneNumber'||$(this).attr('name')=='telephoneNumber') return false;
        });
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
                    telephonenumber: "",
                    defaultAddress:false,
                    city: ""
                }
            }
            openeditAddressPop(pops, $(this))
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
                openeditAddressPop(pops, $(this));
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


        // BTOCSITE-5938-438
        $(document).on('input', 'input[type="text"]', function(){
            console.log(1);
            var $this = $(this),
                value = $this.val(),
                regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
                if (regex.test(value)) {
                    $this.val(value.replace(regex,""));
                    return;
                }
        });

        
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
            formdata.telephoneNumber = addressInfoValidation.getValues("telephoneNumber");

            loadaddressList(type, formdata);
        } 
    }

    //우편번호 찾기 연동...
    function getPostCode(){
        addressFinder.open(function(data){
            $('#popup-editAddress').data('city', data.sido + " " + data.sigungu);
            $('#popup-editAddress').find('input[name=zipCode]').val(data.zonecode);
            $('#popup-editAddress').find('input[name=userAddress]').val(data.roadAddress);
            $('#popup-editAddress').find('input[name=detailAddress]').val('').focus();
            $('#popup-editAddress').find('input[name=userAddress]').siblings('.err-block').hide();
        });
    }

    function openeditAddressPop(pops, opener){
        $('#popup-editAddress').find('.pop-title span').text(pops.popName);
        $('#popup-editAddress').find('.send-btn span').text(pops.btnName);
        $('#popup-editAddress').find('.err-block').hide();

        addressInfoValidation.setValues(pops.addressInfo);
        addressInfoValidation.setValues({telephoneNumber:pops.addressInfo.telephonenumber});

        $('#popup-editAddress').data("type", pops.editMode);
        $('#popup-editAddress').data("addressId", pops.addressInfo.addressID);
        $('#popup-editAddress').data("city", pops.addressInfo.city);
        $('#popup-editAddress').vcModal({opener:opener});
    }

    function loadaddressList(type, formdata){
        lgkorUI.showLoading();
        // BTOCSITE-5938-51
        //var modHref = $('.myp-sub li .mod-link').attr('href');
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
            telephonenumber: formdata ? (formdata.telephoneNumber ? formdata.telephoneNumber : "") : "",
            city: formdata ? formdata.city : ""
            // BTOCSITE-5938-51
            // memberInfoAddress: formdata ? formdata.memberInfoAddress : "",
            // modHref: formdata ? formdata.modHref : ""
        }

        lgkorUI.requestAjaxData(DELIVERY_ADDRESS_LIST, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                $('.addressListWrap').empty();

                addressListData = result.data.addressList;

                var isDefault = false;
                if(addressListData.length){                    
                    for(var idx in addressListData){
                        addressListData[idx]["dataID"] = idx;
                        addressListData[idx]["receiverUserMasking"] = addressListData[idx].receiverUser;
                        addressListData[idx]["addressMasking"] = addressListData[idx].userAddress + addressListData[idx].detailAddress;
                        addressListData[idx]["phoneNumberMasking"] = addressListData[idx].phoneNumber;
                        if(!addressListData[idx].addressNickName) addressListData[idx].addressNickName = "집";
                        // BTOCSITE-5938-51 s
                        // addressListData[idx]["memberInfoAddress"] = addressListData[idx].member_info_address;
                        // addressListData[idx]["modHref"] = modHref;
                         // BTOCSITE-5938-51 e
                        $('.addressListWrap').append(vcui.template(addressListTemplate, addressListData[idx]));

                        if(addressListData[idx].defaultAddress) isDefault = true;
                    }
                } 
                
                if(!isDefault) $('.addressListWrap').append(noData);
            }

            lgkorUI.hideLoading();
        });
    }

    /* BTOCSITE-5938-140 [모니터링] 안드로이드 키패드 관련 오류 */
    $(function () {
        var isAndroid = vcui.detect.isAndroid;
        var phNum = $('#address-regist-form .forms input[name=detailAddress], #address-regist-form .forms input#ipt4, #address-regist-form .forms input#ipt5');
        
        if(isAndroid) {
            phNum.on('focusin', function(){
                $('html').css('overflow', 'visible');
                $('body').css('overflow', 'visible');
                $('.wrap').css('display', 'none');
                $('.ui_modal_dim').css('display', 'none');
                $('.ui_modal_wrap').css('position', 'relative');
                $('.pop-conts').scrollTop( $(document).height() );
            });
            phNum.on('focusout', function(){
                $('html').css('overflow', 'hidden');
                $('body').css('overflow', 'hidden');
                $('.wrap').css('display', 'block');
                $('.ui_modal_dim').css('display', 'block');
                $('.ui_modal_wrap').css('position', 'fixed');
            });
        }
    });
    /* //BTOCSITE-5938-140 [모니터링] 안드로이드 키패드 관련 오류 */

    $(window).load(function(){
        init();

    })
})();
