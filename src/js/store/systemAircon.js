(function() {

    var addressFinder = new AddressFind();
    $(window).ready(function() {
        var b2cOnline = {
            init: function() {
                var self = this;

          

                self.setting();
                // self.bindEvents();

                // self.requestSelectData();
            },

            setting: function() {
                var self = this;
                self.$form = $('div.cont-wrap .form-wrap');
                
                // self.$contWrap = $('div.cont-wrap');
                // self.$formWrap = self.$contWrap.find('.form-wrap');
                // self.$categorySelect = self.$formWrap.find('#categorySelect');
                // self.$areaSelect = self.$formWrap.find('#areaSelect');
                // self.$branchSelect = self.$formWrap.find('#branchSelect');
                // self.$inputReceipt = self.$formWrap.find('#inputReceipt');
                // self.$inputReceipt.attr("autocomplete","off");
                // self.$inquiryButton = self.$formWrap.find('#inquiryButton');

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
                    }
                };
                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.Validation('div.cont-wrap .form-wrap',{register:register});
                    self.validation.on('change', function(e,target){
                        var parent = $(this).parent().parent();
                        var errBlock = parent.find('.err-block:eq(0)');
                        if(errBlock.length > 0) {
                            errBlock.hide();
                        } else {
                            errBlock = parent.parent().find('.err-block:eq(0)');
                            errBlock.hide();
                        }
                    });
                });
            },

            bindEvents: function() {
                var self = this;
                console.log('bindEvents');

                // 온라인 견적 문의내역 조회
                self.$form.find('.confirmBtn').on('click', function() {
                    requestConfirm();
                });

                // 온라인 견적 문의하기
                self.$form.find('.inqueryBtn').on('click', function() {
                    requestInquery();
                });

                //주소 찾기 버튼
                self.$addressFindButton.on('click', function(e) {
                    self.addressFind.open();
                })



            },

            requestInquery: function() {

            },
            // requestSelectData: function() {
            //     var self = this;
            //     var ajaxUrl = self.$formWrap.attr('data-select-url');
            //     lgkorUI.showLoading();
            //     lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
            //         var data = result.data;
            //         areaData = data.area;
            //         branchData = data.branch;
            //         var arr = data.category instanceof Array ? data.category : [];
            //         self.$categorySelect.find('option:not(:eq(0))').remove();
            //         if(arr.length > 0) {
            //             arr.forEach(function(item, index) {
            //                 self.$categorySelect.append(vcui.template(localOptTemplate, item));
            //             });
            //         }
            //         self.$categorySelect.vcSelectbox('update');

            //         self.$areaSelect.find('option:not(:eq(0))').remove();
            //         self.$areaSelect.vcSelectbox('update');
            //         self.$branchSelect.find('option:not(:eq(0))').remove();
            //         self.$branchSelect.vcSelectbox('update');
            //     });
            // },

            // requestData: function(param) {
            //     var self = this;
            //     var ajaxUrl = self.$formWrap.attr('data-receipt-url');
            //     lgkorUI.showLoading();
            //     lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ajaxUrl, param, function(result) {
            //         var data = result.data;
            //         if(lgkorUI.stringToBool(data.success)) {
            //             if(data.alert) {
            //                 self.openAlert(result.data.alert);
            //             }
            //             self.$categorySelect.vcSelectbox('selectedIndex',0,true);
            //             self.$inputReceipt.val('');
            //         } else {
            //             if(data.alert) {
            //                 self.openAlert(result.data.alert);
            //             }
            //         }
            //     },"POST",null);
            // },

            openAlert: function(alert) {
                //알림
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName,
                    okBtnName: alert.okBtnName,
                    ok: function (){}
                };
                var desc = alert.desc ? alert.desc : null;
                if(desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.alert(desc, obj);
            },
        };

        b2cOnline.init();                
    });
})();