$(function () {
    var addressInfoValidation;
    var addressFinder;

    function init(){
        vcui.require(['ui/validation', 'ui/formatter', 'caresolution/addressManagement.min'], function (Validation) {
            setting();
            bindEvents();
        })
        setTimeout(function () {
            $("#agreechk").prop('checked', false);
        }, 100);
    }
    
    function setting(){
        var register = {
            name: {
                required: true,
                minLength: 1,
                maxLength: 30,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block',
                pattern: /^[가-힣a-zA-Z0-9\s]+$/,
                validate : function(value){
                    var valTest = new RegExp(this.pattern);
                    if( value.replace(/\s|　/gi, '') == 0) {
                        this.errorMsg = "이름을 입력해주세요.";
                        return false;
                    } else if(!valTest.test(value)){
                        this.errorMsg = "이름은 한글 또는 영문으로만 입력해주세요.";
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            phone: {
                required: true,
                minLength:10,
                errorMsg: "휴대폰번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            zipCode: {
                required: true,
                errorMsg: "우편번호를 확인해주세요.",
            },
            userAddress: {
                required: true,
                errorMsg: "주소를 확인해주세요.",
                msgTarget: '.err-block'
            },
            detailAddress: {
                required: true,
                errorMsg: "상세주소를 입력해주세요.",
                msgTarget: '.err-block',
                pattern: /^[가-힣a-zA-Z0-9@\s]+$/,
                validate : function(value){
                    var valTest = new RegExp(this.pattern);
                    if( value.replace(/\s|　/gi, '') == 0) {
                        this.msgTarget = '.err-block';
                        this.errorMsg = "상세주소를 입력해주세요.";
                        return false;
                    } else if(!valTest.test(value)){
                        this.msgTarget = '.err-block';
                        this.errorMsg = "'@'를 제외한 특수문자는 입력하실 수 없습니다.";
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            agreechk: {
                required: true,
                msgTarget: '.agree-err-block',
                errorMsg: '개인정보 수집/이용 동의 체크해주세요.'
            },
        }

        addressInfoValidation = new vcui.ui.Validation('#address-regist-form',{register:register});
        addressInfoValidation.on('errors', function(e,data){

        }).on('nextfocus', function(e,target){

            if(target.attr('name') == 'zipCode'){
                setTimeout(function () {
                    $('#popup-event-13447').find('.btn-address').focus();
                }, 10);                        
            }            
        });
        addressFinder = new AddressFind();
    }

    function bindEvents(){
        $('#popup-event-13447').on('click', '.btn-address', function(e){
            e.preventDefault();
            getPostCode();

        }).on('click', '.send-btn', function(e){
            e.preventDefault();
            sendaddressInfo();
        })

        $('.popup-event-13447').on('click', 'button.win-btn-close', function (e) {
            e.preventDefault();
            window.close();
        });

    }

    //우편번호 찾기 연동...
    function getPostCode(){
        addressFinder.open(function(data){
            $('#popup-event-13447').find('input[name=zipCode]').val(data.zonecode);
            $('#popup-event-13447').find('input[name=userAddress]').val(data.roadAddress);
            $('#popup-event-13447').find('input[name=detailAddress]').val('').focus();
            $('#popup-event-13447').find('input[name=userAddress]').siblings('.err-block').hide();
        });
    }

    // 응모하기
    function sendaddressInfo(){
        var validate = addressInfoValidation.validate();
        var url = $('#popup-event-13447').data('ajax');
        
        if(validate.success){
            lgkorUI.requestAjaxData(url, null, function(result) {
                if(result.status == 'success'){
                    lgkorUI.alert("", {
                        title: result.data.message,
                        ok: function(){
                            window.open('', '_self', '').close();
                        }
                    })
                }
            })                
        }
        
    }

    $(window).ready(function(){
        init();
    })
});