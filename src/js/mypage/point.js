(function() {
    var listItemTemplate =
                '<li><p class="date">{{date}}</p>'+
                '<p class="desc">{{shop}}</p>'+
                '<p class="point"><span class="mo_txt">{{description}}</span>'+
                '<span class="num">{{increase}}{{point}}P<em class="pc_txt"> {{purpose}}</em></span>'+
                '</p></li>';

    function searchPointHistory(param) {
        var ajaxUrl = self.$dateFilter.data('url');

        lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
            var param = result.param;
            var data = result.data;

            self.$dateFilterStartDate.vcCalendar('setDate', new Date(vcui.date.format(param.startDate,'yyyy.MM.dd')));
            self.$dateFilterEndDate.vcCalendar('setDate', new Date(vcui.date.format(param.endDate,'yyyy.MM.dd')));

            self.$dateFilter.find('input[name="rdo1"][value="'+param.pointUseType+'"]').prop('checked', true);

            var contentHtml = "";
            var arr = data.pointHistory instanceof Array ? data.pointHistory : [];
            if(arr.length > 0) {
                self.$dateFilter.siblings('div.no-data').hide();
                arr.forEach(function(item, index) {
                    contentHtml += vcui.template(listItemTemplate, {
                        ...item,
                        "point": vcui.number.addComma(item.point),
                        "date": vcui.date.format(item.date,'yyyy. MM. dd')
                    });
                });
            } else {
                self.$dateFilter.siblings('div.no-data').show();
            }
            self.$dateFilter.siblings('div.point-use-list').find('.lists').html(contentHtml);
            $('#my_totalpoint').text(vcui.number.addComma(data.totalPoint)+"P");
        });
    }

    $(window).ready(function() {
        var myPoint = {
            init: function() {
                self.$dateFilter = $('.cont-box .form-wrap');
                self.$dateFilterStartDate = self.$dateFilter.find('#uc-start');
                self.$dateFilterEndDate = self.$dateFilter.find('#uc-end');


                self.$dateFilter.find('#date-input-start').on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    self.$dateFilterEndDate.vcCalendar('setMinDate', data.date);
                });

                self.$dateFilter.find('#button-calendar-search').on('click',function (e) {
                    var startDate = self.$dateFilterStartDate.vcCalendar('getyyyyMMdd');
                    var endDate = self.$dateFilterEndDate.vcCalendar('getyyyyMMdd');
                    if(startDate && endDate) {
                        var param = {
                            startDate,
                            endDate,
                            'pointUseType' : self.$dateFilter.find('input[name="rdo1"]:checked').val()
                        }
                        searchPointHistory(param);
                    }
                });

                //searchPointHistory();
            }
        };

        myPoint.init();                
    });
})();