(function() {
    function comma(str) {
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
    function yyyyMMddString(str, seperator) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1' + seperator + '$2' + seperator + '$3');
    }

    function searchPurchaseHistory(param) {
        var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/my_purchase_history.json';
        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            var param = d.param;            
            $('#date-input-start').val(yyyyMMddString(param.startDate,'.'));
            $('#date-input-end').val(yyyyMMddString(param.endDate,'.'));
            $('#date-input-end').vcCalendar('setMinDate', new Date(yyyyMMddString(param.startDate,'.')));

            $('input[name="rdo1"][value="'+param.purchaseType+'"]').prop('checked', true);

            var listItemTemplate =
                '<li class={{liClass}}">'+
                '<dl><dt><span class="img"><img src="{{modelImageAddr}}" alt="{{modelName}}"></span>'+
                '<p><span class="blind">제품명</span>{{modelName}}</p>'+
                '<p class="num"><span class="blind">제품번호</span>{{modelNumber}}</p></dt>'+
                '<dd>구매수량 : {{purchaseQuantity}}</dd>'+
                '<dd><span class="blind">구매처</span>{{purchaseStore}}</dd>'+
                '<dd><span class="blind">구매일</span>{{purchaseDate}} 구매</dd>'+
                '</dl></li>';
            var contentHtml = "";

            var data = d.data;
            var arr = data.purchaseItems instanceof Array ? data.purchaseItems : [];
            if(arr.length > 0) {
                $('.no-data').hide();
                arr.forEach(function(item, index) {
                    contentHtml += vcui.template(listItemTemplate, {
                        ...item,
                        "liClass": "prod" + ((index < 10 ? '0' : '') + index),
                        "purchaseDate": yyyyMMddString(item.purchaseDate,' .')
                    });
                });
            } else {
                $('.no-data').show();
            }
            $('.svc-prod-list').html(contentHtml);
        });
    }

    $(window).ready(function() {
        var myMembership = {
            init: function() {

                vcui.require(["ui/tooltipTarget"], function () {
                    $('.ui_tooltip-target').vcTooltipTarget({"tooltip":".tooltip-box"});
                });

                //$('.ui_calendar').vcCalendar({ 'holidays': ['2017-09-06', '2017-09-07', '2017-09-08'] }); // hoildays:휴일등록
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
                            'purchaseType':$('input[name="rdo1"]:checked').val()
                        }
                        //console.log(param);
                        searchPurchaseHistory(param);
                    }
                });

                var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/my_membership.json';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    //console.log('ajax',d.data);
                    var membershipPoint = d.data.membershipPoint;

                    $('#membership_point').text(comma(membershipPoint.point)+" P");
                    $('#membership_level').text(membershipPoint.level);
                    $('#membership_purchase_year').text(comma(membershipPoint.purchasePerYear)+"원");

                    var membershipInformation = d.data.membershipInformation;
                    $('#membership_info_name').text(membershipInformation.name);
                    $('#membership_info_tel').text(phoneNumber(membershipInformation.tel));
                    $('#membership_info_card').text(cardNumber(membershipInformation.card));
                    $('#membership_info_regist_date').text(yyyyMMddString(membershipInformation.registrationDate,'.'));
                    $('#membership_info_regist_store').text(membershipInformation.registrationStore);
                    $('#membership_info_favor_store').text(membershipInformation.favoriteStore);
                    $('#membership_info_address').text(membershipInformation.address);
                });

                searchPurchaseHistory();
            }
        };

        myMembership.init();                
    });
})();