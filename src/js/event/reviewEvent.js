(function() {
    var checkModelSuccess = false;

    var ReviewEvent = {
        init: function() {
            var self = this;
            //타이머
            self.searchTimer = null;

            self.setting();
            self.bindEvent();
        },

        setting: function() {
            var self = this;
            self.$contents = $('.contents.event');
            self.$event3 = self.$contents.find('.event03');
            var $inputs = self.$event3.find('dl.forms div.box div.input-wrap input');
            var $buttons = self.$event3.find('dl.forms div.box div.cell button');
            //모델번호
            self.$modelInput = $inputs.eq(0);
            self.$modelInput.attr('autocomplete','off');
            self.$modelCheckOk = self.$modelInput.siblings('p.comp');
            self.$modelCheckOk.hide();
            self.$modelCheckButton = $buttons.eq(0);

            self.$reviewButton = self.$event3.find('.btns button');

            self.$myProductinputLayerAutoComplete = self.$event3.find('.input-layer-wrap .input-layer');
        },

        bindEvent: function() {
            var self = this;

            //모델명 확인 버튼
            self.$modelCheckButton.on('click',function(e){
                e.preventDefault();

                var ajaxUrl = self.$event3.attr('data-sku-url');
                var modelName = self.$modelInput.val().toUpperCase();
                lgkorUI.requestAjaxData(ajaxUrl, {"sku":modelName}, function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        checkModelSuccess = true;
                        self.$modelCheckOk.show();
                    } else {
                        checkModelSuccess = false;
                        self.$modelCheckOk.hide();
                        lgkorUI.alert("", {title: "해당 제품 모델명이 존재하지 않습니다."});
                    }
                });
            });

            //모델명 입력 체크
            self.$modelInput.on('input', function(e){
                checkModelSuccess = false;
                self.$modelCheckOk.hide();
                if(e.target.value.length > 20){
                    e.target.value = e.target.value.slice(0, 20);
                }

                clearTimeout(self.searchTimer);
                
                var searchVal = e.target.value;
                if (searchVal.length < 4) {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').removeClass('on');
                    self.$myProductinputLayerAutoComplete.hide();
                } else {
                    self.searchTimer = setTimeout(function() {
                        self.requestSearchAutoComplete(searchVal);
                    }, 300);
                }
            });

            self.$modelInput.on("focusout",function(e){
                e.preventDefault();
                setTimeout(function () {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').removeClass('on');
                    self.$myProductinputLayerAutoComplete.hide();
                },300);
            });

            //모델명 자동완성 클릭
            self.$myProductinputLayerAutoComplete.on('click', 'a', function (e) {
                e.preventDefault();
                var modelName = $(this).attr('href').replace('#', '');
                if(modelName && modelName.length > 0) {
                    self.$modelInput.val(modelName);
                    self.$modelCheckButton.trigger('click');
                }
            });
            
            self.$reviewButton.on('click',function(e){
                e.preventDefault();
                //로그인을 해야 하는가
                var login = self.$event3.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                //체크
                var param = {};
                var $chk = self.$event3.find('#chk1-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$event3.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                $chk = self.$event3.find('#chk3-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '콘텐츠 저작권 양도 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk3 = "Y"
                    }
                }

                var modelName = self.$modelInput.val().toUpperCase();
                var eventId = self.$event3.data('eventId');
                if(checkModelSuccess && modelName) {
                    param.sku = modelName;
                    param.eventId = eventId;
                    self.requestData(param);
                } else {
                    lgkorUI.alert("", {title: '제품 모델명을 확인해 주세요.'});
                }

            });
        },

        //검색어 입력중 검색
        requestSearchAutoComplete:function(value) {
            var self = this;
            var ajaxUrl = self.$event3.data('autocompleteUrl');
            var modelName = value.toUpperCase();
            lgkorUI.requestAjaxData(ajaxUrl, {"sku":modelName}, function(result) {
                var data = result.data;

                var arr = (data && data.listData instanceof Array) ? data.listData : [];
                var $list_ul = self.$myProductinputLayerAutoComplete.find('ul');
                $list_ul.empty();
                if(arr.length > 0) {
                    var autoCompleteItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>'
                    var replaceText = '<span class="search-word">' + modelName + '</span>';
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(autoCompleteItemTemplate, {"input":item, "text":vcui.string.replaceAll(item, modelName, replaceText)}));
                    });
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').addClass('on');
                    self.$myProductinputLayerAutoComplete.find('.no-data').hide();
                } else {
                    self.$myProductinputLayerAutoComplete.parents('.input-layer-wrap').addClass('on');
                    self.$myProductinputLayerAutoComplete.find('.no-data').show();
                }
                self.$myProductinputLayerAutoComplete.show()
            });
        },

        requestData:function(param) {
            var self = this;
            var ajaxUrl = self.$event3.data('reviewUrl');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                var data = result.data;
                if(lgkorUI.stringToBool(data.success) && data.sendUrl){
                    location.href = result.data.sendUrl;
                }
            });
        }
    }

    $(document).ready(function() {
        ReviewEvent.init();
    });
})();