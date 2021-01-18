(function() {
    var optionTmpl = '<option value={{value}}>{{title}}</option>';
    var centerTmpl =
        '{{#each (item, index) in listData}}' +
        '<tr>' +
            '<td>' +
                '<div class="rdo-wrap">' +
                    '<input type="radio" name="center" id="rdo{{index+1}}" value="{{item.centerCode}}">' +
                    '<label for="rdo{{index+1}}"></label>' +
                '</div>' +
            '</td>' +
            '<td class="adress-box">' +
                '<label for="rdo{{index+1}}">' +
                    '<strong class="center-name">{{item.centerName}}</strong>' +
                    '<p class="detailed-address">{{item.centerAdress}}</p>' +
                '</label>' +
            '</td>' + 
            '<td></td>' + 
        '</tr>' +
        '{{/each}}';
    var topicTmpl = 
        '{{#each (item, index) in topicList}}' +
        '<li>' +
            '<span class="rdo-wrap btn-type3">' +
                '{{# if (index == 0) { #}}' +
                '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
                '{{# } else { #}}' +
                '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}">' +
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
                '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}">' +
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
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
                '{{# } #}}' +
                '<label for="engineer{{index}}">' +
                    '<div class="img">' +
                        '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                    '</div>' +
                    '<p class="tit">{{item.engineerName}}</p>' +
                    '<p class="desc">{{item.centerName}}</p>' +
                '</label>' +
            '</div>' +  
        '</div>' +
        '{{/each}}';

    var dateUtil = vcui.date;

    var validation;
    var authManager;

    var reservation = {
        init: function() {
            var self = this;
            
            self.autoFlag = false;

            self.$cont = $('.contents');
            self.$submitForm = self.$cont.find('#submitForm');
            self.$stepArea = self.$cont.find('.step-area');
            self.$completeBtns = self.$cont.find('.btn-group');

            // 센터찾기
            self.$stepCenter = self.$cont.find('#stepCenter');
            self.$centerPagination = self.$stepCenter.find('.pagination');
            self.$localSi = self.$stepCenter.find('#localSi');
            self.$localGu = self.$stepCenter.find('#localGu');
            self.$localSearch = self.$stepCenter.find('.search-local');
            self.$currentSearch = self.$stepCenter.find('.search-current');
            self.$addressSearch = self.$stepCenter.find('.search-address');
            self.$subwayLocal = self.$stepCenter.find('#subwayLocal');
            self.$subwayLine = self.$stepCenter.find('#subwayLine');
            self.$subwayStation = self.$stepCenter.find('#subwayStation');
            self.$subwaySearch = self.$stepCenter.find('.search-subway');

            // 희망날짜
            self.$stepDate = self.$cont.find('#stepDate');
            self.$dateWrap = self.$stepDate.find('.date-wrap');
            self.$timeWrap = self.$stepDate.find('.time-wrap');

            // 엔지니어
            self.$stepEngineer = self.$cont.find('#stepEngineer');
            self.$engineerPopup = $('#choiceEngineerPopup');
            self.$engineerSlider = self.$engineerPopup.find('.engineer-slider');

            // 정보입력
            self.$stepInput = self.$cont.find('#stepInput');
            self.$topicBox = self.$stepInput.find('#topicBox');
            self.$topicListWrap = self.$stepInput.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');
            self.$subTopicBox = self.$stepInput.find('#subTopicBox');
            self.$subTopicListWrap = self.$stepInput.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');
            self.$solutionsBanner = self.$stepInput.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            // 본인인증
            self.$authPopup = $('#certificationPopup');

            self.centerUrl = self.$stepCenter.data('centerUrl');
            self.engineerUrl = self.$stepEngineer.data('engineerUrl');
            self.dateUrl = self.$stepDate.data('dateUrl');
            self.timeUrl = self.$stepDate.data('timeUrl');
            self.param;
            self.centerParam;

            vcui.require(['ui/validation', 'ui/formatter'], function () {
                var register = {
                    userName: {
                        msgTarget: '.err-block'
                    },
                    phoneNo: {
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget: '.err-block'
                    },
                    centerAdress: {
                        msgTarget: '.err-block'
                    }
                }

                var authOptions = {
                    elem: {
                        popup: '#certificationPopup',
                        name: '#authName',
                        phone: '#authPhoneNo',
                        number: '#authNo'
                    },
                    register: {
                        authName: {
                            pattern: /^[가-힣a-zA-Z]+$/,
                            msgTarget: '.err-block'
                        },
                        authPhoneNo: {
                            pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                            msgTarget: '.err-block'
                        },
                        authNo:{
                            msgTarget: '.err-block'
                        }
                    }
                }

                validation = new vcui.ui.CsValidation('.step-area', {register:register});
                csUI.isLogin && (authManager = new AuthManager(authOptions));

                self.$cont.commonModel({
                    register: register
                });

                self.$engineerSlider.vcCarousel({
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

                self.$dateWrap.calendar({
                    inputTarget: '#date'
                });
                self.$timeWrap.timeCalendar({
                    inputTarget: '#time'
                });

                self.$localSi.vcSelectTarget();
                self.$subwayLocal.vcSelectTarget();
                self.$subwayLine.vcSelectTarget();

                self.bindEvent();
            });
        },
        bindEvent: function() {
            var self = this;

            // 모델 재선택 하기 후 이벤트
            self.$cont.on('reset', function(e, module) {
                self.$solutionsBanner.hide();
                module._next(module.$stepModel);
            });

            // 모델 선택 후 이벤트
            self.$cont.on('complete', function(e, module, data, url) {    
                var param = {
                    modelCode: data.modelCode,
                    serviceType: $('#serviceType').val(),
                    category: data.category,
                    subCategory: data.subCategory
                };

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var resultData = result.data;

                    module._updateSummary({
                        product: [data.categoryName, data.subCategoryName, data.modelCode],
                        reset: true
                    });
                    
                    module.$myModelArea.hide();

                    module._next(self.$stepCenter);
                    module._focus(module.$selectedModelBar, function() {
                        module.$selectedModelBar.vcSticky();
                    });
                });
            });

            // 지역 검색
            self.$localSi.on('change', function() {
                self.$localSearch.prop('disabled', $(this).val() ? false : true);
            });
            self.$localGu.on('change', function() {

            });
            self.$localSearch.on('click', function() {
                var value = self.$localGu.val();

                if (!value) {
                    lgkorUI.alert("", { title: '시/군/구를 선택해주세요.' });
                    return;
                }

                self.centerParam = {
                    localSi: siVal,
                    localGu: guVal
                };

                self.setLocalSearch();
            });
            self.$currentSearch.on('click', function() {

            });
            self.$addressSearch.on('click', function() {

            });
            self.$subwayLocal.on('change', function() {
                
            });
            self.$subwayLine.on('change', function() {
                self.$subwaySearch.prop('disabled', $(this).val() ? false : true);
            });
            self.$subwayStation.on('change', function() {

            });
            self.$subwaySearch.on('click', function() {
                self.setSubwaySearch();
            });
            self.$centerPagination.on('pageClick', function(e) {
                var param = {
                    page: e.page
                };

                self.requestCenterData(param)
            });

            self.$stepCenter.on('change', '[name=center]', function() {
                self.requestDate();
            });


            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                
                self.$solutionsBanner.hide();
                self.requestSubTopic(url, param);
            });

            // 세부 증상 선택
            self.$subTopicList.on('change', '[name=subTopic]', function() {
                var $this = $(this),
                    url = self.$subTopicListWrap.data('ajax'),
                    param = {
                        topic : $('input[name=topic]:checked').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.reqeustSolutions(url, param);

                if (self.autoFlag) self.requestDate();
            });

            // 솔루션 배너
            self.$solutionsBanner.find('.btn-link').on('click', function(){
                var url = $(this).data('href');
                var param = {
                    topic : $('input[name=topic]:checked').val(),
                    subToic : $('input[name=subTopic]:checked').val(),
                    productCode : $('#productCode').val(),
                    page: 1
                };   

                self.setSolutions(url, param, false);
            });

            // 날짜 선택
            self.$dateWrap.on('dateselected', function() {
                self.requestTime();
            });
            self.$timeWrap.on('timeselected', function() {
                var url = self.$stepEngineer.data('ajax');

                var param = {};

                self.reqestEngineer(url, param);
            });

            // 엔지니어 선택 팝업 오픈
            self.$engineerPopup.on('modalshown', function() {
                self.$engineerSlider.vcCarousel('resize');
            });

            // 엔지니어 선택
            self.$engineerPopup.find('.btn-group .btn').on('click', function() {
                var url = self.$engineerPopup.data('lockUrl'),
                    $this = self.$engineerPopup.find('[name=engineer]').filter(':checked'),
                    infoData = $this.data(),
                    param;

                param = {
                    serviceType: $('#serviceType').val(),
                    date: $('#date').val(),
                    time: $('#time').val(),
                    lockUserId: $('#lockUserId').val(),
                    productCode: $('#productCode').val(),
                }

                param = $.extend(param, infoData);

                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        self.updateEngineer(infoData);
                    } else {
                        if (data.resultMessage) {
                            self.$engineerPopup.vcModal('hide');
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
            });

            // 신청 완료
            self.$completeBtns.find('.btn-confirm').on('click', function() {
                var result = validation.validate();

                if (result.success == true) {    
                    if (self.isLogin == 'Y') {
                        lgkorUI.confirm('', {
                            title:'예약 하시겠습니까?',
                            okBtnName: '확인',
                            cancelBtnName: '취소',
                            ok: function() {
                                self.requestComplete();
                            }
                        });       
                    } else {
                        authManager.open();
                    }
                }
            });

            self.$authPopup.find('.btn-send').on('click', function() {
                authManager.send();
            });

            self.$authPopup.find('.btn-auth').on('click', function() {
                authManager.confirm(this, function() {
                    self.requestComplete();
                });
            });
        },
        setSelectOption: function(target, type) {
            var self = this;
            var tmpl;

            switch(type) {
                case 'local': 
                    tmpl
                    break;
                case 'subway':
                    break;
                case 'center':
                    break;
            };

            target.empty();

            for (var i in list){
                var opt = vcui.template(localOptTemplate, list[i]);
                select.append($(opt).get(0));
            }
        },
        setLocalSearch: function() {
            var self = this;
            
            self.requestCenterData();
        },
        setSubwaySearch: function() {
            var self = this;
        
            self.requestCenterData();
        },
        setCenterSearch: function() {
            var self = this;

            self.requestCenterData();
        },
        requestCenterData: function(param) {
            var self = this;

            lgkorUI.requestAjaxDataPost(self.centerUrl, param, function(result) {
                var data = result.data,
                    dataArr = data.listData instanceof Array ? data.listData : [],
                    html;

                if (dataArr) {
                    html = vcui.template(centerTmpl, data);
                    self.$stepCenter.find('table tbody').html(html);
                    self.$centerPagination.pagination('update', data.listPage);
                }
            });
        },

        setTopicList: function(data) {
            var self = this;
            var html;

            html = vcui.template(topicTmpl, data);
            self.$topicList.html(html); 
        },
        requestSubTopic: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data,
                    html;
                    
                html = vcui.template(subTopicTmpl, data);

                self.$subTopicList.html(html);
                self.$subTopicBox.show();
            });
        },
        reqeustSolutions: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;
                
                if (data.resultFlag == 'Y') {
                    if (data.solutionFlag) {
                        self.$solutionsBanner.show();
                    } else {
                        self.$solutionsBanner.hide();
                    }
                }
            });
        },
        setSolutions: function(url, param, isShown) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var url = self.$solutionsPopup.data('listUrl'),
                        param = {
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(url, param, true);
                });
            }, null, "html", true);
        },
        requestDate: function() {
            var self = this;
            var url = self.$stepDate.data('dateUrl');

            var param = {};

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    dateArr = data.dateList instanceof Array ? data.dateList : [],
                    fastDate;

                if (data.resultFlag == 'Y') {
                    if (dateArr.length) {
                        fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');
                    
                        self.$stepDate.find('.calendar-info .date').html(fastDate);    
                        $('.date-wrap').calendar('update', data.dateList);
                        self.dateParam = result.param;

                        self.$stepDate.addClass('active');
                    }
                } else {
                    if (data.resultMessage) {
                        if (data.tAlert == 'Y') {
                            self.$stepInput.find('.step-btn-wrap').show();
                            self.$stepDate.removeClass('active');
                            self.$stepEngineer.removeClass('active');
                        }

                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            });
        },
        requestTime: function() {
            var self = this,
                url = self.$stepDate.data('timeUrl');

            var param = {};

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var data = result.data;

                    if (data.resultFlag == 'Y') {
                        $('.time-wrap').timeCalendar('update', data.timeList);
                        $('.time-wrap').find('.box-desc').hide();
                        $('.time-wrap').find('.box-table').show();
                    } else {
                        if (data.resultMessage) {
                            if (data.tAlert == 'Y') {
                                self.$stepDate.removeClass('active');
                                self.$stepEngineer.removeClass('active');
                                self.$completeBtns.hide();
                            }
                            
                            lgkorUI.alert("", {
                                title: data.resultMessage
                            });
                        }
                    }
                });
        },
        reqestEngineer: function(url, param) {
            var self = this;

            param = $.extend(param, self.dateParam);

            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data,
                    arr = data.engineerList instanceof Array ? data.engineerList : []; 

                if (data.resultFlag == 'Y') {  
                    if (arr.length) {
                        self.updateEngineer(arr[0]);
                        if (arr.length > 1) {
                            var html = vcui.template(engineerTmpl, data);
                            
                            self.$engineerSlider.find('.slide-track').html(html);
                            self.$engineerSlider.vcCarousel('reinit');
                            self.$stepEngineer.find('.btn').show();
                        } else {
                            self.$stepEngineer.find('.btn').hide();
                        }
                        self.$stepInput.addClass('active');
                        self.$completeBtns.show();
                    }
                }
            });
        },
        updateEngineer: function(data) {
            var self = this,
                $engineerBox = self.$stepEngineer.find('.engineer-info'),
                $resultBox = self.$stepEngineer.find('.engineer-desc'),
                topicNm = self.$stepInput.find('[name=topic]:checked').data('topicName'),
                subTopicNm = self.$stepInput.find('[name=subTopic]:checked').data('subTopicName')

            self.$stepEngineer.find('.engineer-img img').attr({
                'src': data.image,
                'alt': data.engineerName
            });                             
            $engineerBox.find('.name').html(data.engineerName);
            $engineerBox.find('.center').html(data.centerName);

            $resultBox.find('.date').html(vcui.date.format($('#date').val() + '' + $('#time').val() + '00', "yyyy.MM.dd hh:mm"));
            $resultBox.find('.topic').html(topicNm + '&gt;' + subTopicNm);
            $resultBox.find('.name').html(data.engineerName);

            $('#engineerNm').val(data.engineerName);
            $('#engineerCode').val(data.engineerCode);
            $('#centerNm').val(data.centerName);
            $('#centerCode').val(data.centerCode);

            self.dateParam['resrvSeq'] = data.resrvSeq;
        },
        requestComplete: function() {
            var self = this;

            var url = self.$submitForm.data('ajax');
            var formData = validation.getAllValues();

            formData = $.extend(formData, self.dateParam);

            lgkorUI.requestAjaxDataPost(url, formData, function(result) {
                var data = result.data;

                if (data.resultFlag == 'Y') {
                    $('#acptNo').val(data.acptNo);

                    self.$submitForm.submit();
                } else {
                    if (data.resultMessage) {
                        lgkorUI.alert("", {
                            title: data.resultMessage
                        });
                    }
                }
            }, 'POST');
        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();