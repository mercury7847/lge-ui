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
    var engineerTmpl =
        '{{#each (item, index) in engineerList}}' +
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="engineer-box">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerNm}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerNm}}" data-center-code={{item.centerCode}} data-image="{{item.img}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerNm}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerNm}}" data-center-code={{item.centerCode}} data-image="{{item.img}}" value="{{index}}">' +
                '{{# } #}}' +
                '<label for="engineer{{index}}">' +
                    '<div class="img">' +
                        '<img src="{{item.img}}" alt="" aria-hidden="true">' +
                    '</div>' +
                    '<p class="tit">{{item.engineerNm}}</p>' +
                    '<p class="desc">{{item.centerNm}}</p>' +
                '</label>' +
            '</div>' +  
        '</div>' +
        '{{/each}}';
    var validation;
    var addressFinder;

    var reservation = {
        init: function() {
            var self = this;
            
            self.$cont = $('.contents');
            self.autoFlag = false;

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

                validation = new vcui.ui.CsValidation('.step-area', {register:register});

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

                        $('.engineer-slider').length && $('.engineer-slider').vcCarousel({
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            responsive: [
                                {
                                    breakpoint: 10000,
                                    settings: {
                                        slidesToShow: 4,
                                        slidesToScroll: 4,
                                    }
                                },
                                {
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3,
                                    }
                                },
                                {
                                    breakpoint:767,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2
                                    }
                                }
                            ]
                        });
                    }
                });

                addressFinder = new AddressFind();

                self.bindEvent();
            });
        },
        requestTimeData: function() {
            var self = this;
            var url = $('#stepInput').data('ajax'),
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
                            $('#stepInput').find('.step-btn-wrap').hide();
                            $('#stepDate').addClass('active');
                            $('#stepEngineer').removeClass('active');
                            $('.btn-group').hide();
                        }
                    });
                }
        },
        bindEvent: function() {
            var self = this;

            $('#choiceEngineerPopup').on('modalshown', function() {
                $('.engineer-slider').vcCarousel('resize');
            });

            $('#choiceEngineerPopup').find('.btn-group .btn').on('click', function() {
                var $this = $('[name=engineer]').filter(':checked'),
                    data = $this.data();

                $('#stepEngineer').find('.engineer-img img').attr({
                    'src': data.image,
                    'alt': data.engineerName
                });
                $('#stepEngineer').find('.engineer-info .name').html(data.engineerName);
                $('#stepEngineer').find('.engineer-info .center').html(data.centerName);

                $('#engineerNm').val(data.engineerName);
                $('#engineerCode').val(data.engineerCode);
                $('#centerNm').val(data.centerName);
                $('#centerCode').val(data.centerCode);
            });

            $('#stepInput').find('.step-btn-wrap .btn').on('click', function() {
                self.autoFlag = true;
                self.requestTimeData();
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
                        serviceType: $('#serviceType').val(),
                        category: $('#category').val(),
                        subCategory: $('#subCategory').val(),
                        lockUserId: $('#lockUserId').val(),
                        zipCode: $('#zipCode').val(),
                        userAddress: $('#userAddress').val(),
                        detailAddress: $('#detailAddress').val(),
                        date: $('#date').val(),
                        time: $('#time').val()
                    }

                $('#time').val('');

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {

                        $('#stepEngineer').find('.engineer-img img').attr({
                            'src': data.engineerList[0].img,
                            'alt': data.engineerList[0].engineerNm
                        });
                        $('#stepEngineer').find('.engineer-info .name').html(data.engineerList[0].engineerNm);
                        $('#stepEngineer').find('.engineer-info .center').html(data.engineerList[0].centerNm);
                        $('#stepEngineer').find('.engineer-desc .date').html('2020.08.17 11:20');
                        $('#stepEngineer').find('.engineer-desc .name').html($('[name=topic]').data('topicName') + '&gt;' + $('[name=subTopic]').data('subTopicName'));
                        $('#engineerNm').val(data.engineerList[0].engineerNm);
                        $('#engineerCode').val(data.engineerList[0].engineerCode);
                        $('#centerNm').val(data.engineerList[0].centerNm);
                        $('#centerCode').val(data.engineerList[0].centerCode);
                        if (data.engineerList.length && data.engineerList.length > 1) {
                            $('#stepEngineer').find('button').show();

                            var html = '';

                            html = vcui.template(engineerTmpl, data);

                            $('#choiceEngineerPopup .slide-track').html(html);
                            $('#choiceEngineerPopup .slide-wrap').vcCarousel('reinit');

                        } else {
                            $('#stepEngineer').find('button').hide();
                        }

                        $('#stepEngineer').addClass('active');
                        $('.btn-group').show();
                    }
                });
            });

            self.$cont.find('.btn-address').on('click', function() { 
                addressFinder.open(function(data) {
                    self.$cont.find('input[name=zipCode]').val(data.zonecode);
                    self.$cont.find('input[name=userAddress]').val(data.roadAddress);
                    self.$cont.find('input[name=detailAddress]').val('');

                    if (self.autoFlag) {
                        self.requestTimeData();
                    }
                }); 
            });

            self.$cont.on('change', 'input[name=topic]', function() {
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

            self.$cont.on('change', 'input[name=subTopic]', function() {
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

                if (self.autoFlag) {
                    self.requestTimeData();
                }
            });

            self.$cont.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {                        
                    lgkorUI.confirm('', {
                        title:'예약 하시겠습니까?',
                        okBtnName: '확인',
                        cancelBtnName: '취소',
                        ok: function() {
                            var url = $('#submitForm').data('ajax');
                            var param = validation.getAllValues();

                            param = $.extend(param, lgkorUI.getHiddenInputData('', 'step-area'));

                            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                                var data = result.data;
            
                                if (data.resultFlag == 'Y') {
                                    $('#submitForm')[0].data.value = JSON.stringify(param);
                                    $('#submitForm').submit();
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();