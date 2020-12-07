(function() {
    var PONT_INQUIRY_URL;
    
    var listItemTemplate =
                '<li>'+
                '   <p class="date">{{date}}</p>'+
                '   <p class="desc">{{place}}</p>'+
                '   <p class="point">'+
                '       <span class="mo_txt">포인트{{type}}</span>'+
                '       <span class="num">'+
                '           {{point}}'+
                '           <em class="pc_txt"> {{type}}</em>'
                '       </span>'+
                '   </p>'+
                '</li>';

    function init(){
        console.log("Point Start!!!");

        setting();
        bindEvents();
    }

    function setting(){
        PONT_INQUIRY_URL = $('.contents.mypage').data('pointInquiry');
    }

    function bindEvents(){
        $('.contents.mypage').on('click', '.calendarInquiry-btn', function(e){
            e.preventDefault();

            memberPointInquiry();
        });
    }

    function memberPointInquiry(){
        var startDate = $('.contents.mypage .startDate').vcCalendar('getyyyyMMdd');
        var endDate = $('.contents.mypage .endDate').vcCalendar('getyyyyMMdd');
        
        if(!getDateValidation(startDate, endDate)){
            lgkorUI.alert("", {
                title: "조회기간을 확인해 주세요."
            });

            return;
        }

        var inquiryType = $('.contents.mypage input[name=pointInquiry]:checked').val();

        lgkorUI.showLoading();

        var sendata = {
            startDate: startDate,
            endDate: endDate,
            inquiryType: inquiryType
        }
        lgkorUI.requestAjaxData(PONT_INQUIRY_URL, sendata, function(result){
            if(result.data.success == "Y"){
                var leng = result.data.pointList.length;
                if(leng){
                    setPointList(result.data.totalPoint, result.data.pointList);
                } else{
                    setNoData();
                }
            }

            lgkorUI.hideLoading();
        });
    }

    function getDateValidation(startdate, endate){
        if(startdate == null || endate == null) return false;

        var startime = new Date(vcui.date.format(startdate,'yyyy-MM-dd'));
        var endtime = new Date(vcui.date.format(endate,'yyyy-MM-dd'));
        if(startime.getTime() > endtime.getTime()) return false;

        return true;
    }

    function setPointList(total, list){
        $('.no-data').remove();

        $('.point-use-list .total dd').text(total);

        $('.point-use-list ul').empty();

        var newlist = vcui.array.map(list, function(item, idx){            
            return {
                date: item.date,
                place: item.place,
                point: item.point,
                type: item.point.substr(0, 1) == "+" ? "적립" : "사용"
            }
        });
        
        var html = "";
        for(var idx in newlist){
            html += vcui.template(listItemTemplate, newlist[idx]);
        }
        $('.point-use-list ul').append(html);
    }

    function setNoData(){
        $('.point-use-list').hide().after('<div class="no-data"><p>조회 결과가 없습니다.</p></div>');
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();