(function() {
    var eventItemList = '<li class="lists"><div class="list-inner">' +
        '<a href="{{eventUrl}}" target="{{#if eventTarget == "self"}}_self{{#else}}_blank{{/if}}" data-ec-promotion="{{ecPromotion}}">' + //BTOCSITE-2065 : 이벤트&기획전 페이지 내 데이터레이어 삽입 (수정 작업 요청) 2021-09-02
            '<span class="thumb">' +
                '<img src="{{eventListThumbnailPath}}" alt="{{eventListThumbnailAltText}}" aria-hidden="true">' +
                '{{#if eventEndFlag != "N"}}<span class="event-end"><em>종료된 이벤트</em></span>{{/if}}' +
                // '<span class="flag-wrap bg-type"><span class="flag"><span class="blind">제품 카테고리</span>{{categoryName}}</span></span>' +
            '</span>' +
            '<div class="info">' +
                '<div class="flag-wrap bar-type"><span class="flag"><span class="blind">이벤트 구분</span>{{eventGubun}}</span><span class="flag"><span class="blind">이벤트 유형</span>{{eventType}}</span></div>' +
                '<p class="tit"><span class="blind">이벤트 제목</span>{{eventTitle}}</p>' +
                '<p class="date"><span class="blind">이벤트 기간</span>{{eventFromDate}}~{{eventToDate}}</p>' +
            '</div>' +
        '</a>' +
        '{{#if winAnnouncementFlag != "N"}}<a href="{{#if eventId}}/benefits/event/eventWin-{{eventId}}{{/if}}" class="btn-link"><span>당첨자 발표</span></a>{{/if}}' +
    '</div></li>' 

    $(window).ready(function() {
        var KRP0022 = {
            init: function() {
                self.$KRP0022 = $('.KRP0022').first();
                self.$tab = self.$KRP0022.find('div.ui_tab');
                self.$list = self.$KRP0022.find('ul.box-list-inner');
                self.$noData = self.$KRP0022.find('div.no-data');

                self.saved_eventStatus = '';

                var _self = this;

                _self.bindEvents();
                _self.checkNoData();


                // BTOCSITE-5938-514 : IE에서 history back 시 이전에 선택된 필터 적용안되는 이슈 처리
                self.KRPOO22_history_data = 'KRPOO22_history_data';
                self.historyData = lgkorUI.getStorage(self.KRPOO22_history_data);

                if(Object.keys(self.historyData).length){
                    // 상단 tab 카테고리 영역 설정
                    self.$tab.find('ul.tabs li').removeClass('on');
                    self.$tab.find('ul.tabs li a[href="#'+self.historyData.categoryId+'"]').parent('li').addClass('on');


                    if(self.historyData.eventStatus == 'win') { // 당첨자 발표 필터 선택된 경우
                        self.$KRP0022.find("#eventSort").prop('checked', true);
                        self.$KRP0022.find("#eventStatus").val('end');
                        self.$KRP0022.find("#eventGubun").val(self.historyData.eventGubun);
                    } else {
                        self.$KRP0022.find("#eventStatus").val(self.historyData.eventStatus);
                        self.$KRP0022.find("#eventGubun").val(self.historyData.eventGubun);
                    }
                }

                _self.requestData(true);

            },

            bindEvents: function() {
                var _self = this;

                var $te_progress = '';
                var $te_end = '';

                
                
                /* BTOCSITE-6859 - 이벤트페이지 UI 변경 요청 - 추가 필터링 분기 작업 */
                self.$KRP0022.find('.ui_selectbox').on('change', function(e) {
                    //console.log( $(this).attr('id') )
                    if ( $(this).attr('id') !== 'eventStatus') {
                        // alert(e.type)
                    }else{
                        // alert( $(this).val() );
                        if( $(this).val() === 'progress' ){
                            $('input[name="win"]').prop('checked', false);
                        }
                    }
                     _self.requestData();
                });

                //BTOCSITE-6859 : change_on 되었을때 체크박스, 셀렉박스 이벤트
                self.$KRP0022.find('.ui_selectbox').on('change_on change_off', function(e) {

                    if ($(this).attr('id') === 'eventStatus') {
                        if (e.type === 'change_on') {
                            self.saved_eventStatus = $('#eventStatus').val();
                            $('input[name="win"]').prop('checked', true);
                            $(this).val('end').prop('selected', true).trigger('change');
                        } else {
                            self.saved_eventStatus = (self.saved_eventStatus === '') ? 'progress' : self.saved_eventStatus;
                            $('input[name="win"]').prop('checked', false);
                            $(this).val(self.saved_eventStatus).prop('selected', true).trigger('change');
                        }
                        _self.requestData();
                    }
                });

                //BTOCSITE-6859 : 당첨자 체크 박스 추가, 셀렉박스 연동 이벤트
                self.$KRP0022.find('#eventSort').on('change', function(e) {
                    // _self.requestData();
                    if( $(this).is(':checked') ){
                        self.$KRP0022.find('.ui_selectbox').trigger('change_on');
                    }else{
                        self.$KRP0022.find('.ui_selectbox').trigger('change_off');
                    }
                });
                /* //BTOCSITE-6859 - 이벤트페이지 UI 변경 요청 - 추가 필터링 분기 작업 */

                self.$tab.on("tabchange", function(e) {
                    _self.requestData();
                });

                self.$list.on('click', 'div.list-inner a.btn-link', function(e) {
                    e.preventDefault();
                    _self.requestModal(this);
                });

                // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 이벤트 추가
                self.$KRP0022.find('.accordion-button').on('click', function(e) {
                    self.$KRP0022.find('.tabs-wrap').toggleClass('expanded');
                    if (self.$KRP0022.find('.tabs-wrap').hasClass('expanded')) {
                        self.$KRP0022.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', false);
                    } else {
                        self.$KRP0022.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
                    }
                });
                self.$KRP0022.find('.fixed-area .dimmed').on('click', function(e) {
                    self.$KRP0022.find('.tabs-wrap').removeClass('expanded');
                    self.$KRP0022.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
                });
            },

            noData: function(visible) {
                if(visible) {
                    self.$noData.show();
                } else {
                    self.$noData.hide();
                }
            },

            checkNoData: function() {
                var _self = this;
                _self.noData(self.$list.find('li').length > 0 ? false : true);
            },

            requestData: function(isOnLoad) {
                var _self = this;
                var ajaxUrl = self.$KRP0022.attr('data-list-url');
                var selectIdx = self.$tab.vcTab('getSelectIdx');
                var selectedCategory = self.$tab.find('ul.tabs li:eq(' + selectIdx +') a').attr('href').replace("#", "");                
                var postData = {"categoryId":selectedCategory};
                
                //console.log("1111", postData);
                self.$KRP0022.find('.ui_selectbox').each(function (index, item) {
                    var $item = $(item);
                    postData[$item.attr('id')] = $item.vcSelectbox('value');
                });

                /* BTOCSITE-6859 - 이벤트페이지 UI 변경 요청 - 추가 필터링 분기 작업 */

                // self.$KRP0022.find('input:checkbox[name="win"]').each(function (index, item) {
                //     var $item = $(item);
                //     postData[$item.attr('id')] = $('input:checkbox[name="win"]').val();
                // });

                if($('input:checkbox[name="win"]').is(":checked") == true) {
                    postData['eventStatus'] = 'win';
                    //postData[$item.attr('id')] = $('input:checkbox[name="win"]').val();
                } 

                // BTOCSITE-203 기획전 및 이벤트 우선순위 개발 요청건
                // if($("#eventStatus").vcSelectbox('value') === 'progress') {
                //     postData['eventSort'] = '';  
                //     self.$KRP0022.find('#eventSort').closest(".sort-area").hide();
                // } else {
                //     self.$KRP0022.find('#eventSort').closest(".sort-area").show();
                // }

                /* //BTOCSITE-6859 - 이벤트페이지 UI 변경 요청 - 추가 필터링 분기 작업 */

                // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 탭 그려진 후에 아코디언버튼 세팅
                _self.setAccordionButton();
                $(window).on('resize', function() {
                    _self.setAccordionButton();
                });

                // BTOCSITE-5938-514 : postData session storage에 저장
                if(!isOnLoad) { // 첫 load 시 미실행
                    lgkorUI.setStorage(self.KRPOO22_history_data, postData, false);
                }
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    _self.updateList(result.data);
                });


                //console.log("결과", postData);
            },

            updateList: function(data) {
                var _self = this;
                self.$list.empty();
                var arr =  data ? (data instanceof Array ? data : []) : [];
                var eventList = (arr.length > 0) ? arr[0].eventList : [];

                eventList.forEach(function(item, index) {
                    //item.startDate = vcui.date.format(item.startDate,'yyyy.MM.dd');
                    //item.endDate = vcui.date.format(item.endDate,'yyyy.MM.dd');
                    item.eventType = item.eventType ? item.eventType : "";
                    item.eventId = item.eventId ? item.eventId : null;

                    /* BTOCSITE-2065 : 이벤트&기획전 페이지 내 데이터레이어 삽입 (수정 작업 요청) 2021-09-02 */
                    var ecPromotion = {
                        "promo_id": item.eventUrl,
                        "promo_name": item.eventTitle,
						"promo_creative": item.eventListThumbnailPath
                    }
                    item.ecPromotion = JSON.stringify(ecPromotion);
                    /* //BTOCSITE-2065 : 이벤트&기획전 페이지 내 데이터레이어 삽입 (수정 작업 요청) 2021-09-02 */

                    self.$list.append(vcui.template(eventItemList, item));
                });

                //sorting 
                //console.log("쏘팅된 개수", eventList.length);
                
                _self.checkNoData();
            },

            requestModal: function(dm) {
                var _self = this;
                var ajaxUrl = $(dm).attr('href');
                window.open(ajaxUrl,'','width=912,height=760,scrollbars=yes');
                /*
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                    _self.openModalFromHtml(result);
                }, null, "html");
                */
            },

            /*
            openModalFromHtml: function(html) {
                $('#event-modal').html(html).vcModal();
            },
            */

            // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 탭 길이에 따라 아코디언버튼 노출 유무 세팅
            setAccordionButton: function() {
                if(self.$KRP0022.find('.tabs').width() + 32 > window.innerWidth) {
                    self.$KRP0022.find('.tabs-wrap').addClass('hasButton');
                } else {
                    self.$KRP0022.find('.tabs-wrap').removeClass('expanded');
                    self.$KRP0022.find('.tabs-wrap').removeClass('hasButton');
                }
            }
        };

        KRP0022.init();
    });
})();