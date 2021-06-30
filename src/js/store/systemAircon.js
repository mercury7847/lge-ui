(function() {

    $(window).ready(function() {
        var b2cOnline = {
            validation : null,
            init: function() {
                var self = this;

          

                self.setting();
                self.bindEvents();

                // self.requestSelectData();
            },

            setting: function() {
                var self = this;
                self.addressFinder = new AddressFind();
                self.$container = $('.container');
                self.$inqueryBtn = self.$container.find('.inqueryBtn');
                self.$confirmBtn = self.$container.find('.confirmBtn');
                self.$addressFindBtn = self.$container.find('.addr-box-wrap .btn');


                console.log('setting');

                var register = {
                    userName:{
                        required: true,
                        errorMsg: "이름을 입력해 주세요.",
                        msgTarget: '.err-block'
                    },
                    phoneNo:{
                        required: true,
                        errorMsg: "정확한 휴대폰번호를 입력해주세요.",
                        msgTarget: '.err-block'
                    },
                    spotName:{
                        required: true,
                        errorMsg: "이메일을 입력하세요.",
                        msgTarget: '.err-block'
                    },
                    agreePrivacyCheck : {
                        required : true,
                        msgTarget : ".err-block"
                    }
                };
                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.Validation('div.cont-wrap .form-wrap',{register:register});
                    self.validation.on('nextfocus', function(e,$target){

                        console.log("target %o",$target);
                        if($target.attr('name') == 'addr1' || $target.attr('name') == 'plc-addr1'){
                            setTimeout(function () {
                                $target.closest('.addr-box-wrap').find('.btn').focus();
                            }, 10);                        
                        }
                    });
                });
            },

            bindEvents: function() {
                var self = this;
                console.log('bindEvents');

                // 온라인 견적 문의내역 조회
                self.$confirmBtn.on('click', function() {
               

                    lgkorUI.confirm("작성하신 내용이 초기화 된 후<br>온라인견적 문의 내역 조회 페이지로<br>이동됩니다. 이동 하시겠습니까?", {
                        title: "",
                        cancelBtnName: "취소",
                        okBtnName: "확인",
                        ok: function(){
                            console.log('내역조회 화면으로 이동');
                            // takebackOk();
                        }
                    });



                });

                // 온라인 견적 문의하기
                self.$inqueryBtn.on('click', function(){
                    self.validation.validate();
                    var validationResult = self.validation.validate().success;

                    console.log('validationResult %o', validationResult);

                    if( validationResult ) {
                        self.requestData(self.validation.getAllValues());

                        console.log('폼 서브밋 %o', validationResult);
                       // self.$form.find('#systemAirconForm').submit();
                    }
                });
                //주소 찾기 버튼
                self.$addressFindBtn.on('click', function(e) {

                    console.log("주소 버튼 %o",e.target);
                    var $btn = $(e.target);
                    var $zipCode = $btn.closest('.addr-box-wrap').find(".addr1");
                    var $address = $btn.closest('.addr-box-wrap').find(".addr2");


               console.log("btn %o %o",$btn,$btn.closest('.addr-box-wrap'));
                    self.addressFinder.open(function(data) { 
                        console.log("data %o",data);
                        console.log("주소 버튼 %o %o", $zipCode,$address);
                        var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;
                        $zipCode.val(data.zonecode);
                        $address.val(address);
                    }); 
                })
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$formWrap.attr('data-receipt-url');
        
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
    
                    if (data.resultFlag == 'Y') {
                        lgkorUI.hideLoading();
                        
                        lgkorUI.alert("", {
                            title: '온라인 견적 문의가 접수 되었습니다.<br>담당자가 확인후 연락 드릴<br>예정입니다.',
                            ok: function (){

                                console.log('온라인 견적 문의 하기 얼럿 이후 동작');

                            }

                        });

                        // self.$container.find('#systemAirconForm').submit();
                    }
                }, 'POST');

            },
            // openAlert: function(alert) {
            //     //알림
            //     var obj ={title: alert.title,
            //         typeClass: '',
            //         cancelBtnName: alert.cancelBtnName,
            //         okBtnName: alert.okBtnName,
            //         ok: function (){}
            //     };
            //     var desc = alert.desc ? alert.desc : null;
            //     if(desc) {
            //         obj.typeClass = 'type2'
            //     }
            //     lgkorUI.alert(desc, obj);
            // },
        };

        b2cOnline.init();                
    });
})();