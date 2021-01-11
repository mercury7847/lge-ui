
(function(){
    var visitAlarmItemTemplate = '<li class="{{#if type=="prev"}}off{{#elsif type=="next"}}on after{{#else}}off after{{/if}}" data-id="{{id}}">' +
        '<div class="inner">' +
            '<div class="svc-info">' +
                '<p class="date">' +
                    '<small>{{#if type=="prev"}}이전{{#elsif type=="next"}}다음{{#else}}이후{{/if}} 방문 서비스</small>' +
                    '{{dateString}}' +
                '</p>' +
                '{{#if type!="prev"}}<div class="visit-icons"><p>{{when}}</p></div>{{/if}}' +
                '<div class="infos"><p class="blind">방문 서비스 해당 제품</p>' +
                    '<ul>{{#each item in serviceList}}<li>{{item.name}}</li>{{/each}}</ul>' +
                '</div>' +
            '</div>' +
            '<div class="svc-lists"><p>{{#if type=="prev"}}이전{{#elsif type=="next"}}다음{{#else}}이후{{/if}} 방문 서비스 상세 내역</p>' +
                '<div class="svc-wrap"><ul class="svc-details">' +
                    '{{#each item in serviceList}}<li>{{item.name}}({{item.sku}}) - {{item.desc}}</li>{{/each}}' +
                '</ul></div>' +
                '{{#if serviceList.length > 5}}<div class="more-view-wrap" aria-hidden="true">' +
                    '<span class="more-view-btn">더보기</span>' +
                '</div>{{/if}}' +
                '{{#if type=="next"}}<button type="button" class="btn size border" data-date="{{date}}" data-time="{{time}}"><span>방문일정 변경요청</span></button>{{/if}}' +
            '</div>' +
        '</div>' +
    '</li>'

    var popUpVisitDayItemTemplate = '<tr>' +
        '{{#each item in listData}}' +
            '{{#if item.type=="disabled"}}' +
                '<td class="disabled" data-value="{{item.value}}"><button type="button" title="{{item.dateString}}" disabled><span>{{item.day}}</span><span class="blind">선택불가</span></button></td>' +
            '{{#elsif item.type=="enabled"}}' +
                '<td data-value="{{item.value}}"><button type="button" title="{{item.dateString}}"><span>{{item.day}}</span></button></td>' +
            '{{#elsif item.type=="expected"}}' +
                '<td class="expected" data-value="{{item.value}}"><button type="button" title="{{item.dateString}}" disabled><span>{{item.day}}</span><span class="blind">방문 예정일</span></button></td>' +
            '{{#else}}' +
                '<td></td>' +
            '{{/if}}' +
        '{{/each}}' +
    '</tr>';

    $(window).ready(function() {
        var visitAlarm = {
            init: function(){
                var self = this;
                self.setting();
                self.bindEvents();
                self.bindPopupEvents();

                /*
                var selectValue = self.$selectContract.vcSelectbox('selectedOption').value;
                if(selectValue) {
                    self.requestData(selectValue);
                }
                */
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.my-visit-schedule ul.schedule-list');
                self.$selectContract = self.$contents.find('div.form-wrap select.ui_selectbox').eq(0);
                self.$myVisitQna = self.$contents.find('div.my-visit-qna li').eq(0);
                self.$irregularCheckout = self.$contents.find('div.my-visit-qna li').eq(1);
                //
                self.$popupChangeVisitDate = $('#popupChangeVisitDate');
                self.$calendarTable = self.$popupChangeVisitDate.find('table.box-table.tb-calendar');
                self.$timeTable = self.$popupChangeVisitDate.find('table.box-table.tb-timetable');
                self.$visitDate = self.$popupChangeVisitDate.find('div.box-visit-date span.date');
            },

            bindEvents: function() {
                var self = this;

                /*
                var $myPage = $('.mypage');

                $('.mypage .svc-lists').each(function(idx, item){
                    var leng = $(item).find('ul.svc-details li').length;
                    if(leng < 6){
                        $(item).find('.more-view-btn').hide();
                    }
                });
                */

                self.$list.on('click', '.more-view-btn', function(e){
                    e.preventDefault();

                    if($(this).hasClass('open')){
                        $(this).removeClass('open');
                        $(this).text('더보기');
                        $(this).closest('.svc-lists').find('ul.svc-details').scrollTop(0);
                        $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open');
                    } else{
                        $(this).addClass('open');
                        $(this).text('닫기');
                        $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open').addClass('open');
                    }
                });

                self.$selectContract.on('change', function(e){
                    var selectValue = e.target.value;
                    self.requestData(selectValue);
                });

                //방문일정 변경 팝업
                self.$list.on('click', 'div.svc-lists button', function(e){
                    e.preventDefault();
                    var $li = $(this).parents('li');
                    var _id = $li.attr('data-id');
                    self.$popupChangeVisitDate.attr('data-id',_id);

                    var date = $(this).attr('data-date');
                    var time = $(this).attr('data-time');
                    self.requestEnableVisitDay(date, time);

                    /*
                    //선택되었던 날짜 초기화
                    var $td = self.$calendarTable.find('tr td.choice');
                    $td.find('span.blind').remove();
                    $td.removeClass('choice');

                    //선택되었던 시간 초기화
                    $td = self.$timeTable.find('tr td.choice');
                    $td.removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');

                    var time = $(this).attr('data-time');
                    $td = self.$timeTable.find('tr td[data-value="'+ time +'"]');
                    $td.addClass('choice');
                    $td.siblings('th').addClass('choice');
                    
                    //선택 시간 정보 텍스트 수정
                    var selectedData = self.getSelectedVisitDayData();
                    self.setVisitDateText(selectedData);

                    self.$popupChangeVisitDate.vcModal();
                    */
                });
            },

            bindPopupEvents: function() {
                var self = this;

                //방문일정 변경 팝업 날짜 선택
                self.$popupChangeVisitDate.on('click', 'table.box-table tr td button', function(e){
                    e.preventDefault();
                    var $table = $(this).parents('table.box-table');
                    var $td = $table.find('tr td.choice');
                    //var $span = $td.find('span.blind');
                    $td.find('span.blind').remove();
                    $td.removeClass('choice');

                    $td = $(this).parents('td');
                    $td.addClass('choice');
                    $td.prepend('<span class="blind">변경 요청일</span>');

                    $table.find('tr th.choice').removeClass('choice');
                    $td.siblings('th').addClass('choice');

                    var selectedData = self.getSelectedVisitDayData();

                    if($table.hasClass('tb-calendar')) {
                        //방문 가능 시간 데이타 가져오기
                        self.requestEnableVisitTime(selectedData.date);
                    } else {
                        self.setVisitDateText(selectedData);
                    }
                });

                //방문일정 변경 팝업 확인
                self.$popupChangeVisitDate.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e){
                    e.preventDefault();
                    var param = self.getSelectedVisitDayData();
                    if(param.date && param.time) {
                        self.requestChangeVisitDay(param);
                    }
                });
            },

            getSelectedVisitDayData: function() {
                var self = this;
                var $td = self.$calendarTable.find('tr td.choice');
                if($td.length < 1) {
                    $td = self.$calendarTable.find('tr td.expected');
                }
                var date = $td.attr('data-value');

                $td = self.$timeTable.find('tr td.choice');
                var time = $td.attr('data-value');

                var _id = self.$popupChangeVisitDate.attr('data-id');

                return {"id":_id, "date":date, "time":time}
            },

            requestData: function(contract) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"contract":contract}, function(result) {
                    var data = result.data;

                    var reply = data.reply;
                    self.setVisitQna(reply);

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.dateString = vcui.date.format(item.date,'yyyy.MM.dd');
                        self.$list.append(vcui.template(visitAlarmItemTemplate, item));
                    });
                });
            },

            requestEnableVisitDay: function (date, time) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-day-url');
                var $list = self.$calendarTable.find('tbody');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"date":date}, function(result){
                    var data = result.data;

                    //날짜 새로 그리기
                    var arr = data instanceof Array ? data : [];
                    $list.empty();
                    arr.forEach(function(obj, index) {
                        obj.expectedDate = date;
                        obj.listData.forEach(function(item, index) {
                            item.dateString = vcui.date.format(item.value,'yyyy년 M월.d일');
                            item.day = vcui.date.format(item.value,'d');
                            if(!(!item.value) && item.value == date) {
                                item.type = "expected";
                            }
                        });
                        $list.append(vcui.template(popUpVisitDayItemTemplate, obj));
                    });

                    //선택되었던 시간 초기화
                    var $td = self.$timeTable.find('tr td.choice');
                    $td.removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');

                    $td = self.$timeTable.find('tr td[data-value="'+ time +'"]');
                    $td.addClass('choice');
                    $td.siblings('th').addClass('choice');
                    
                    //선택 시간 정보 텍스트 수정
                    var selectedData = self.getSelectedVisitDayData();
                    self.setVisitDateText(selectedData);
                    
                    self.$popupChangeVisitDate.vcModal()
                }); 
            },

            requestChangeVisitDay: function(param) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-change-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        var toast = data.toast;
                        if(toast) {
                            $(window).trigger("toastshow", toast);
                        }
                        var reply = data.reply;
                        self.setVisitQna(reply);
                    }
                }); 
                $('#popupChangeVisitDate').vcModal('close');
            },

            setVisitQna: function(reply) {
                var self = this;
                if(reply) {
                    self.$myVisitQna.find('div.cont').text(reply);
                    self.$myVisitQna.show();
                } else {
                    self.$myVisitQna.hide();
                }
            },

            setVisitDateText: function(selectedData) {
                var self = this;
                self.$visitDate.text(vcui.date.format(selectedData.date,'yyyy.MM.dd') + " " + (!selectedData.time?"":selectedData.time));
            },

            requestEnableVisitTime:function(date) {
                var self = this;
                var ajaxUrl = self.$popupChangeVisitDate.attr('data-time-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {'date':date}, function(result){
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];

                    self.$timeTable.find('tr td.choice').removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');
                    var $td = self.$timeTable.find('tr td');
                    $td.each(function(idx, item){
                        var $item = $(item);
                        var fArr = vcui.array.filter(arr, function(target){
                            return target == $item.attr('data-value');
                        });

                        if(fArr.length > 0) {
                            $item.addClass('disabled');
                            $item.find('button').attr('disabled',true);
                        } else {
                            $item.removeClass('disabled');
                            $item.find('button').attr('disabled',null);
                        }
                    });

                    var selectedData = self.getSelectedVisitDayData();
                    self.setVisitDateText(selectedData);
                }); 
            }
        }

        visitAlarm.init();
    });
})();