(function() {
    function comma(str) {
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    function yyyyMMddString(str, seperator) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1' + seperator + '$2' + seperator + '$3');
    }

    function searchPointHistory(param) {
        var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/my_point_history.json';
        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            var param = d.param;            
            $('#date-input-start').val(yyyyMMddString(param.startDate,'.'));
            $('#date-input-end').val(yyyyMMddString(param.endDate,'.'));
            $('#date-input-end').vcCalendar('setMinDate', new Date(yyyyMMddString(param.startDate,'.')));

            $('input[name="rdo1"][value="'+param.pointUseType+'"]').prop('checked', true);

            var listItemTemplate =
                '<li><p class="date">{{date}}</p>'+
                '<p class="desc">{{shop}}</p>'+
                '<p class="point"><span class="mo_txt">{{description}}</span>'+
                '<span class="num">{{increase}}{{point}}P<em class="pc_txt">{{purpose}}</em></span>'+
                '</p></li>';
            var contentHtml = "";

            var data = d.data;
            var arr = data.pointHistory instanceof Array ? data.pointHistory : [];
            if(arr.length > 0) {
                $('.no-data').hide();
                arr.forEach(function(item, index) {
                    contentHtml += vcui.template(listItemTemplate, {
                        ...item,
                        "point": comma(item.point),
                        "date": yyyyMMddString(item.date,' .')
                    });
                });
            } else {
                $('.no-data').show();
            }
            $('.point-use-list').find('.lists').html(contentHtml);
            $('#my_totalpoint').text(comma(data.totalPoint)+" P");
        });
    }

    $(window).ready(function() {
        var myPoint = {
            init: function() {

                $('#date-input-start').on('calendarinsertdate', function (e, data) {
                    //시작일을 선택시 종료일의 시작날짜를 변경한다.
                    $('#date-input-end').vcCalendar('setMinDate', data.date);
                });

                $('#button-calendar-search').on('click',function (e) {
                    var startDate = $('#date-input-start').vcCalendar('getyyyyMMdd');
                    var endDate = $('#date-input-end').vcCalendar('getyyyyMMdd');
                    if(startDate && endDate) {
                        var param = {
                            startDate,
                            endDate,
                            'pointUseType':$('input[name="rdo1"]:checked').val()
                        }
                        //console.log(param);
                        searchPointHistory(param);
                    }
                });

                searchPointHistory();
            }
        };

        myPoint.init();                
    });
})();