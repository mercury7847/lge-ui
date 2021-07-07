(function() {
    var b2cOnline = {
        validation : null,
        init: function() {
            var self = this;
                self.setting();
                self.bindEvents();
        },

        setting: function() {
            var self = this;
                self.addressFinder   = new AddressFind();
                self.$container      = $('.container');
                self.$form           = self.$container.find('#systemAirconForm');
                self.$estimateBtn    = self.$container.find('.estimateBtn');
                self.$inqueryBtn     = self.$container.find('.inqueryBtn');
                self.$addressFindBtn = self.$container.find('.addr-box-wrap .btn');
                self.$defaultAddress = self.$container.find('#defaultAddress');

            // systemAirconForm validation
            var register = {
                phoneNo:{
                    required: true,
                    minLength: 10,
                    maxLength: 11,
                    errorMsg: "정확한 휴대폰번호를 입력해주세요."
                },
                userEmail: {
                    required: true,
                    errorMsg: "이메일의 형식이 아닙니다.",
                    pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
                agreePrivacyCheck : {
                    required : true
                }
            };
            vcui.require(['ui/validation'], function () {
                self.validation = new vcui.ui.Validation('#systemAirconForm',{register:register});
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

            // 온라인 견적 문의내역 조회
            self.$inqueryBtn.on('click', function() {

                console.log("문의 내역조회 %o", self.$form.data('inqueryUrl') );
                lgkorUI.confirm("작성하신 내용이 초기화 된 후<br>온라인견적 문의 내역 조회 페이지로<br>이동됩니다. 이동 하시겠습니까?", {
                    title: "",
                    cancelBtnName: "취소",
                    okBtnName: "확인",
                    ok: function(){
                        self.$form[0].reset();
                        var url  =  self.$form.data('inqueryUrl');
                        if(url) location.href = url;
                    }
                });
            });

            // 온라인 견적 문의하기
            self.$estimateBtn.on('click', function(){
                var validationResult = self.validation.validate().success;
                
                if( validationResult ) {
                    var ajaxUrl = self.$form.data('estimateUrl');
                    var param = self.validation.getAllValues();
                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                        if(result.data.status === 'success') {
                            lgkorUI.alert("", {
                                title: '온라인 견적 문의가 접수 되었습니다.<br>담당자가 확인후 연락 드릴<br>예정입니다.'
                            });
                        }
                    });
                }
            });
            //주소 찾기 버튼
            self.$addressFindBtn.on('click', function(e) {
                var $btn = $(e.target);
                var $zipCode = $btn.closest('.addr-box-wrap').find(".addr1");
                var $address = $btn.closest('.addr-box-wrap').find(".addr2");

                self.addressFinder.open(function(data) { 
                    var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;
                        $zipCode.val(data.zonecode);
                        $address.val(address);
                }); 
            });

            // 기본 주소와 동일
            self.$defaultAddress.on('change', function(e){
                if(this.checked) {
                    console.log("체크");
                    var addr1 = $('input[name="addr1"]').val();
                    var addr2 = $('input[name="addr2"]').val();
                    var addr3 = $('input[name="addr3"]').val();

                    if(addr1 == '' || addr2 == '' || addr3 == ''){
                        self.$addressFindBtn.eq(0).focus();
                    } else {
                        $('input[name="plc-addr1"]').val(addr1);
                        $('input[name="plc-addr2"]').val(addr2);
                        $('input[name="plc-addr3"]').val(addr3);
                    }
                } else {
                    console.log("체크 해제");
                    $('input[name="plc-addr1"]').val('');
                    $('input[name="plc-addr2"]').val('');
                    $('input[name="plc-addr3"]').val('');
                }
            });
        },
    };
    var b2cOnlineSearch = {
        validation : null,
        init: function() {
            var self = this;
                self.setting();
                self.bindEvents();
        },
        setting : function() {
            var self = this;
                self.$container      = $('.container');
                self.$form           = self.$container.find('#searchForm');
                self.$searchBtn    = self.$container.find('.btn-search');
            
                var register = {
                    search: {
                        required: true,
                        maxLength: 20,
                        pattern: /^[a-z|A-Z|0-9]+$/,
                        msgTarget: '.err-block',
                        errorMsg: '접수번호를 입력해 주세요.',
                        patternMsg: '정확한 접수번호를 입력해 주세요.'
                    }
                };
                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.Validation('#searchForm',{register:register});
                });

        },
        bindEvents : function() {
            var self = this;
                self.$searchBtn.on('click',function(){
                    var validationResult = self.validation.validate().success;
                    if( validationResult) {
                        var param = self.validation.getAllValues();
                        var url = self.$form.data('inqueryResult');
                        if(url) location.href =  url+'?'+ $.param( param );
                    }
                });
        },
        
    }
    
    $(window).ready(function() {
        
        if($('#systemAirconForm').length) b2cOnline.init(); 
        if($('#searchForm').length) b2cOnlineSearch.init(); 

    });
})();