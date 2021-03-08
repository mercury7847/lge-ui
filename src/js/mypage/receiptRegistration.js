(function() {
    var localOptTemplate = '<option value="{{value}}">{{title}}</option>';

    var areaData = [];
    var branchData = [];

    $(window).ready(function() {
        var receiptRegist = {
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
                self.requestSelectData();
            },

            setting: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$formWrap = self.$contWrap.find('.form-wrap');
                self.$categorySelect = self.$formWrap.find('#categorySelect');
                self.$areaSelect = self.$formWrap.find('#areaSelect');
                self.$branchSelect = self.$formWrap.find('#branchSelect');
                self.$inputReceipt = self.$formWrap.find('#inputReceipt');
                self.$inputReceipt.attr("autocomplete","off");
                self.$inquiryButton = self.$formWrap.find('#inquiryButton');

                var register = {
                    accountFlag:{
                        required: true,
                        errorMsg: "구매처를 선택해주세요.",
                        msgTarget: '.err-block'
                    },
                    localName:{
                        required: false,
                    },
                    spotName:{
                        required: true,
                        errorMsg: "구매처를 선택해주세요.",
                        msgTarget: '.err-block'
                    },
                    barcodeNo:{
                        required: true,
                        pattern: /^[0-9]+$/,
                        errorMsg: "영수증번호를 입력해주세요.",
                        msgTarget: '.err-block'
                    }
                };
                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.Validation('div.cont-wrap .form-wrap',{register:register});
                });
            },

            bindEvents: function() {
                var self = this;
                self.$inputReceipt.on("input",function(){
                    this.value = this.value.replace(/[^0-9]/g, '').substr(0,23);
                });
                
                self.$categorySelect.on('change', function(e){
                    var selectValue = e.target.value;
                    if(selectValue == "") {
                        //plcaholder 선택
                        self.$areaSelect.find('option:not(:eq(0))').remove();
                        self.$areaSelect.vcSelectbox('update');
                        self.$branchSelect.find('option:not(:eq(0))').remove();
                        self.$branchSelect.vcSelectbox('update');
                        self.validation.setRequireItem("spotName",true);
                    } else {
                        var data = areaData[selectValue];
                        if(data) {
                            var hasBrachDataCheck = false;
                            var arr = data instanceof Array ? data : [];
                            self.$areaSelect.find('option:not(:eq(0))').remove();
                            if(arr.length > 0) {
                                arr.forEach(function(item, index) {
                                    self.$areaSelect.append(vcui.template(localOptTemplate, item));
                                    var data = branchData[item.value];
                                    var arr = data instanceof Array ? data : [];
                                    if(arr.length > 0) {
                                        hasBrachDataCheck = true;
                                    }
                                });
                            }
                            self.$areaSelect.vcSelectbox('update');
                            self.$branchSelect.find('option:not(:eq(0))').remove();
                            self.$branchSelect.vcSelectbox('update');
                            self.$areaSelect.parents('div.select-wrap').show();

                            self.validation.setRequireItem("spotName",hasBrachDataCheck);
                        } else {
                            self.$areaSelect.parents('div.select-wrap').hide();
                            data = branchData[selectValue];
                            if(data) {
                                var arr = data instanceof Array ? data : [];
                                self.$branchSelect.find('option:not(:eq(0))').remove();
                                if(arr.length > 0) {
                                    arr.forEach(function(item, index) {
                                        self.$branchSelect.append(vcui.template(localOptTemplate, item));
                                    });
                                }
                                self.$branchSelect.vcSelectbox('update');
                                self.$branchSelect.parents('div.select-wrap').show();
                                self.validation.setRequireItem("spotName",true);
                            } else {
                                self.$branchSelect.parents('div.select-wrap').hide();
                                self.validation.setRequireItem("spotName",false);
                            }
                        }
                    }

                    self.$areaSelect.vcSelectbox('selectedIndex',0,false);
                    self.$branchSelect.vcSelectbox('selectedIndex',0,false);
                });

                self.$areaSelect.on('change', function(e){
                    var selectValue = e.target.value;
                    if(selectValue == "") {
                        //plcaholder 선택
                        self.$branchSelect.find('option:not(:eq(0))').remove();
                        self.$branchSelect.vcSelectbox('update');
                    } else {
                        var data = branchData[selectValue];
                        if(data) {
                            var arr = data instanceof Array ? data : [];
                            self.$branchSelect.find('option:not(:eq(0))').remove();
                            if(arr.length > 0) {
                                arr.forEach(function(item, index) {
                                    self.$branchSelect.append(vcui.template(localOptTemplate, item));
                                });
                            }
                            self.$branchSelect.vcSelectbox('update');
                            self.$branchSelect.parents('div.select-wrap').show();
                            self.validation.setRequireItem("spotName",true);
                        } else {
                            self.$branchSelect.parents('div.select-wrap').hide();
                            self.validation.setRequireItem("spotName",false);
                        }
                    }
                    self.$branchSelect.vcSelectbox('selectedIndex',0,false);
                });

                self.$inquiryButton.on('click', function(e) {
                    var result = self.validation.validate();
                    if(result.success){
                        self.requestData(self.validation.getAllValues());
                    } else {
                        if(result.validArray && result.validArray.length > 0) {
                            var item = result.validArray[0];
                            if(item.errmsg) {
                                lgkorUI.alert("", {title: item.errmsg});
                            }
                        }
                    }
                })
            },

            requestSelectData: function() {
                var self = this;
                var ajaxUrl = self.$formWrap.attr('data-select-url');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                    var data = result.data;
                    areaData = data.area;
                    branchData = data.branch;
                    var arr = data.category instanceof Array ? data.category : [];
                    self.$categorySelect.find('option:not(:eq(0))').remove();
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            self.$categorySelect.append(vcui.template(localOptTemplate, item));
                        });
                    }
                    self.$categorySelect.vcSelectbox('update');

                    self.$areaSelect.find('option:not(:eq(0))').remove();
                    self.$areaSelect.vcSelectbox('update');
                    self.$branchSelect.find('option:not(:eq(0))').remove();
                    self.$branchSelect.vcSelectbox('update');
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$formWrap.attr('data-receipt-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                    /*                    
                    var data = result.data;
                    console.log(data);
                    var alert = data.alert;
                    if(alert) {
                        self.openAlert(alert);
                    }
                    */
                });
            },

            /*
            openAlert: function(alert) {
                //알림
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName,
                    okBtnName: alert.okBtnName,
                    ok: function (){}
                };
                var desc = alert.desc;
                if(desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.alert(desc, obj);
            },
            */
        };

        receiptRegist.init();                
    });
})();