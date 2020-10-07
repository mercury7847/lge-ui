(function() {
    /*
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
*/
    var listItemTemplate =
                '<li class="lists {{liClass}}">'+
                '<div class="ui_flexible_box">'+
                '<dl><dt><span class="img"><img src="{{modelImageAddr}}" alt="{{modelName}}"></span>'+
                '<p class="name"><span class="blind">제품명</span>{{modelName}}</p>'+
                '<p class="num"><span class="blind">제품번호</span>{{modelNumber}}</p></dt>'+
                '<dd><ul class="infos">'+
                '<li>구매수량 : {{purchaseQuantity}}</li>'+
                '<li><span class="blind">구매처</span>{{purchaseStore}}</li>'+
                "<li>{{purchaseDate}} {{purchaseType}}</li>"+
                '</ul></dd></dl></div></li>';

    function searchPurchaseHistory(param) {
        var ajaxUrl = self.$dateFilter.data('url');

        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            if(d.status != 'success') {
                alert(d.message ? d.message : '오류발생');
                return;
            }
            /*
            var param = d.param;
            self.$dateFilterStartDate.vcCalendar('setDate', new Date(vcui.date.format(param.startDate,'yyyy.MM.dd')));
            self.$dateFilterEndDate.vcCalendar('setDate', new Date(vcui.date.format(param.endDate,'yyyy.MM.dd')));
            self.$dateFilter.find('input[name="rdo1"][value="'+param.purchaseType+'"]').prop('checked', true);
            */

            var contentHtml = "";

            var data = d.data;
            var arr = data.purchaseItems instanceof Array ? data.purchaseItems : [];
            if(arr.length > 0) {
                self.$dateFilter.siblings('div.no-data').hide();
                arr.forEach(function(item, index) {
                    contentHtml += vcui.template(listItemTemplate, {
                        ...item,
                        "liClass": "prod" + ((index < 10 ? '0' : '') + index),
                        "purchaseDate": vcui.date.format(item.purchaseDate,'yyyy. MM. dd'),
                        "purchaseType": item.purchaseType == 'buy'?'구매':(item.purchaseType == 'cancel'?'취소':'')
                    });
                });
            } else {
                self.$dateFilter.siblings('div.no-data').show();
            }
            self.$productList.html(contentHtml);
        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    $(window).ready(function() {
        var myMembership = {
            init: function() {
                self.$dateFilter = $('div.cont-box div.form-wrap');
                self.$dateFilterStartDate = self.$dateFilter.find('#uc-start');
                self.$dateFilterEndDate = self.$dateFilter.find('#uc-end');
                self.$productList = $('div.cont-box div.product-list-wrap ul.product-lists');


                vcui.require(["ui/tooltipTarget"], function () {
                    $('.ui_tooltip-target').vcTooltipTarget({"tooltip":".tooltip-box"});
                });

                //$('.ui_calendar').vcCalendar({ 'holidays': ['2017-09-06', '2017-09-07', '2017-09-08'] }); // hoildays:휴일등록
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
                            'purchaseType' : self.$dateFilter.find('input[name="rdo1"]:checked').val()
                        }
                        searchPurchaseHistory(param);
                    }
                });

                /*
                var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/my_membership.json';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
                    
                    var membershipPoint = d.data.membershipPoint;

                    $('#membership_point').text(vcui.number.addComma(membershipPoint.point)+" P");
                    $('#membership_level').text(membershipPoint.level);
                    $('#membership_purchase_year').text(vcui.number.addComma(membershipPoint.purchasePerYear)+"원");

                    var membershipInformation = d.data.membershipInformation;
                    $('#membership_info_name').text(membershipInformation.name);
                    $('#membership_info_tel').text(phoneNumber(membershipInformation.tel));
                    $('#membership_info_card').text(cardNumber(membershipInformation.card));
                    $('#membership_info_regist_date').text(vcui.date.format(membershipInformation.registrationDate,'yyyy.MM.dd'));
                    $('#membership_info_regist_store').text(membershipInformation.registrationStore);
                    $('#membership_info_favor_store').text(membershipInformation.favoriteStore);
                    $('#membership_info_address').text(membershipInformation.address);
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
                */

                //searchPurchaseHistory();
            }
        };

        myMembership.init();                
    });
})();




    /*
    "param": {
        "startDate" : "20200101",
        "endDate" : "20200910",
        "purchaseType" : "buy"
    },
    */
