(function() {

    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="topic{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';
    var subTopicTmpl = 
    '{{#each (item, index) in subTopicList}}' +
    '<li>' +
        '<span class="rdo-wrap">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}" data-error-msg="정확한 세부증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}">' +
            '{{# } #}}' +
            '<label for="subTopic{{index}}">{{item.name}}</label>' +
        '</span>' +
    '</li>' +
    '{{/each}}';
    var validation;
    var addressFinder;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$form = $('#submitForm');

            vcui.require(['ui/validation', 'ui/formatter'], function () {

                var register = {
                    topic: {
                        required: true,
                        msgTarget: '.topic-msg'
                    },
                    subTopic: {
                        required: true,
                        msgTarget: '.sub-topic-msg'
                    },
                    bdType: {
                        required: true,
                        msgTarget: '.bd-type-msg'
                    },
                    fan: {
                        required: true,
                        msgTarget: '.fan-msg'
                    },
                    addFan: {
                        required: true,
                        msgTarget: '.add-fan-msg'
                    },
                    installType: {
                        required: true,
                        msgTarget: '.install-type-msg'
                    },
                    tvPosition: {
                        required: true,
                        msgTarget: '.tv-position-msg'
                    },
                    userNm: {
                        msgTarget: '.err-block' 
                    },
                    phoneNo: {
                        msgTarget: '.err-block'
                    },
                    zipCode: {
                        msgTarget: '.err-block'
                    },
                    userAddress: {
                        msgTarget: '.err-block'
                    },
                    detailAddress: {
                        msgTarget: '.err-block'
                    }
                }

                validation = new vcui.ui.CsValidation('#stepInput', {register:register});

                $('.contents').commonModel({
                    register: register,
                    callback: function(data, info) {
                        var html = '';
                        
                        html = vcui.template(topicTmpl, info);

                        $('#topicList ul').html(html);

                        if (data.category == '1019'){
                            if (data.subCategory == "1129"){
                                $("#fanBox").show();
                                $("#bdTypeBox").show();
                            } else {
                                $("#fanBox").show();
                                $("#bdTypeBox").hide();
                            }
                        }

                        $("#fanBox input[type=radio]").off('change').on('change', function() {
                            var val = $(this).val();

                            if (val == 0 || val == 1) {
                                $("#addFanBox").show();
                            } else {
                                $("#addFanBox").hide();
                            }
                        }); 
                        
                        if (data.subCategory == "1086" || data.subCategory == "1021") {
                            $("#installTypeBox").show();
                        } else {
                            $("#installTypeBox").hide();
                        }
                        
                        if (data.subCategory == "D002795" || data.subCategory == "1040" || data.subCategory == "1041" || data.subCategory == "1043") {
                            $("#tvPositionBox").show();
                        } else {
                            $("#tvPositionBox").hide();
                        }
                    }
                });

                addressFinder = new AddressFind();

                self.bindEvent();
            });
        },
        
        bindEvent: function() {
            var self = this;

            $('#stepInput').find('.btn-next').on('click', function() {
                var $this = $(this),
                    url = $('#stepInput').data('ajax'),
                    param = validation.getAllValues(),
                    result;

                param = $.extend(param, {
                    topic: $('input[name=topic]').val(),
                    subTopic: $('input[name=subTopic]').val(),
                    serviceType: $('#serviceType').val(),
                    productCode: $('#productCode').val(),
                    category: $('#category').val(),
                    subCategory: $('#subCategory').val()
                });

                result = validation.validate();

                if (result.success) {
                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var data = result.data;

                        if (data.resultFlag == 'Y') {
                            $('#stepDate').addClass('active');
                        }
                    });
                }
            });

            $("#solutionBanner .btn-link").click(function(){
                var url = $(this).data('href');
                var param = {
                    topic : '',
                    subToic : '',
                    productCode : ''
                };
                
                lgkorUI.requestAjaxData(url, param, function(result){
                    $('#solutionsPopup').html(result).vcModal();
                }, null, "html");
            });
            $('.tb-calendar').on('click', 'button', function() {
                $('#date').val('');
            });
            $('.tb-timetable').on('click', 'button', function() {
                var url = $('#stepDate').data('ajax'),
                    param = {
                        serviceType: '',
                        category: '',
                        subCategory: '',
                        lockUserId: '',
                        zipCode: '',
                        userAddress: '',
                        detailAddress: '',
                        date: '',
                        time: ''
                    }

                $('#time').val('');

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {

                        $('#stepEnginner').find('.engineer-img img').attr({
                            'src': data.enginnerList[0].img,
                            'alt': data.enginnerList[0].name
                        });
                        $('#stepEnginner').find('.engineer-info .name').html(data.enginnerList[0].name);
                        $('#stepEnginner').find('.engineer-info .center').html(data.enginnerList[0].center);
                        $('#stepEnginner').find('.engineer-desc .date').html('2020.08.17 11:20');
                        $('#stepEnginner').find('.engineer-desc .name').html($('[name=topic]').data('topicName') + '&gt;' + $('[name=subTopic]').data('subTopicName'));

                        if (data.enginnerList.length && data.enginnerList.length > 1) {
                            $('#stepEnginner').find('button').show();
                        } else {
                            $('#stepEnginner').find('button').hide();
                        }

                        $('#stepEnginner').show();
                        $('.btn-group').show();
                    }
                });
            });

            self.$form.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) {
                     self.$form.find('input[name=zipCode]').val(data.zonecode);
                     self.$form.find('input[name=userAddress]').val(data.roadAddress);
                     self.$form.find('input[name=detailAddress]').val('');
                }); 
            });

            self.$form.on('change', 'input[name=topic]', function() {
                var $this = $(this),
                    url = $('#topicList').data('ajax'),
                    param = {
                        topic : $this.val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
                    var html = '';
                        
                    html = vcui.template(subTopicTmpl, data);

                    $('#subTopicBox').show();
                    $('#subTopicBox').find('ul').html(html);
                });
            });

            self.$form.on('change', 'input[name=subTopic]', function() {
                var $this = $(this),
                    url = $('#subTopicList').data('ajax'),
                    param = {
                        topic : $('input[name=topic]').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;
                    
                    if (data.resultFlag == 'Y') {
                        if (data.solutionFlag) {
                            $('#solutionBanner').show();
                        } else {
                            $('#solutionBanner').hide();
                        }
                    }
                });
            });

            self.$form.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {                        
                    lgkorUI.confirm('', {
                        title:'예약 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            var url = self.$form.data('ajax');
                            var param = validation.getAllValues();

                            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                                var data = result.data;
            
                                if (data.resultFlag == 'Y') {
                                    self.$form.submit();
                                }
                            });
                        }
                    });
                }
            });
            self.$form.find('.btn-cancel').on('click', function() {
                var url = $(this).data('url');
                lgkorUI.confirm('', {
                    title:'취소 하시겠습니까?',
                    okBtnName: '확인',
                    cancelBtnName: '취소',
                    ok: function() {
                        location.href = url;
                    }
                });
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();