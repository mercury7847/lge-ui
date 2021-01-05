
(function(){
    var visitAlarmItemTemplate = '<li class="{{#if type=="prev"}}off{{#elsif type=="next"}}on after{{#else}}off after{{/if}}" data-id="{{id}}">' +
        '<div class="inner">' +
            '<div class="svc-info">' +
                '<p class="date">' +
                    '<small>{{#if type=="prev"}}이전{{#elsif type=="next"}}다음{{#else}}이후{{/if}} 방문 서비스</small>' +
                    '{{date}}' +
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
                '{{#if type=="next"}}<button type="button" class="btn size border"><span>방문일정 변경요청</span></button>{{/if}}' +
            '</div>' +
        '</div>' +
    '</li>'

    $(window).ready(function() {
        var visitAlarm = {
            init: function(){
                var self = this;
                self.setting();
                self.bindEvents();

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
                self.$myVisitQna = self.$contents.find('div.my-visit-qna li div.cont').eq(0);
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

                var $popupChangeVisitDate = $('#popupChangeVisitDate');

                //방문일정 변경 팝업
                self.$list.on('click', 'div.svc-lists button', function(e){
                    e.preventDefault();
                    var _id = $(this).parents('li').attr('data-id');
                    $popupChangeVisitDate.attr('data-id',_id);
                    $popupChangeVisitDate.vcModal();
                });

                //방문일정 변경 팝업 날짜 선택
                $popupChangeVisitDate.on('click', 'table.box-table tr td button', function(e){
                    e.preventDefault();
                    var $table = $(this).parents('table.box-table');
                    $table.find('tr td.choice').removeClass('choice');
                    var $td = $(this).parents('td');
                    $td.addClass('choice');
                    $table.find('tr th.choice').removeClass('choice');
                    $td.siblings('th').addClass('choice');
                });

                //방문일정 변경 팝업 확인
                $popupChangeVisitDate.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e){
                    e.preventDefault();
                    var $table = $popupChangeVisitDate.find('table.box-table.tb-calendar');
                    var $td = $table.find('tr td.choice');
                    var date = $td.attr('data-value');

                    $table = $popupChangeVisitDate.find('table.box-table.tb-timetable');
                    $td = $table.find('tr td.choice');
                    var time = $td.attr('data-value');

                    self.requestChangeVisitDay($popupChangeVisitDate.attr('data-id'), date, time);
                });
            },

            requestData: function(contract) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"contract":contract}, function(result) {
                    var data = result.data;
                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                        self.$list.append(vcui.template(visitAlarmItemTemplate, item));
                    });
                });
            },

            requestChangeVisitDay: function(visitId, date, time) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-change-url');
                var postData = {"id":visitId, "date":date, "time":time};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        var toast = data.toast;
                        if(toast) {
                            $(window).trigger("toastshow", toast);
                        }
                        var reply = data.reply;
                        if(reply) {
                            self.$myVisitQna.text(reply);
                        }
                    }
                }); 
                $('#popupChangeVisitDate').vcModal('close');
            },
        }

        visitAlarm.init();
    });
})();