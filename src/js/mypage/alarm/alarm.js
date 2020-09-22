(function() {
    var paymentTemplate =
                '<li class="list"><div class="notice-box">'+
                '<span class="icons">알림 확인 상태 : <em class="{{read}}">{{readDescription}}</em></span>'+
                '<p class="date"><span class="blind">알림 도착 날짜 및 시간</span>{{alarmDate}}</p>'+
                '<div class="box"><span class="blind">알림 내용</span>'+
                '<p class="tit">{{title}}</p><p class="desc">{{description}}</p>'+
                '<div class="more-view"><p class="name"><span class="blind">제품명</span>{{productName}}</p>'+
                '<ul class="info"><li><dl><dt>제품코드</dt>dd>{{procuctCode}}<i aria-hidden="true">&bull;</i>{{categoryName}}</dd></dl></li>'+
                '<li><dl><dt>구매수량</dt><dd>{{purchaseQuantity}}</dd></dl></li>'+
                '<li><dl><dt>구매매장</dt><dd>{{purchaseStore}}</dd></dl></li>'+
                '<li><dl><dt>구매일자</dt><dd>{{purchaseDate}}</dd></dl></li></ul></div>'+
                '<div class="bottom-btn"><a href="{{linkUrl}}" class="btn-link">결제내역 자세히보기</a></div>'+
                '<button type="button" class="btn-del" data-id="#{{id}}"><span>알림 삭제</span></button>'+
                '</div></div></li>';
    
    var couponTemplate =
                '<li class="list"><div class="notice-box">'+
                '<span class="icons">알림 확인 상태 : <em class="{{read}}">{{readDescription}}</em></span>'+
                '<p class="date"><span class="blind">알림 도착 날짜 및 시간</span>{{alarmDate}}</p>'+
                '<div class="box"><span class="blind">알림 내용</span>'+
                '<p class="tit">{{title}}</p><p class="desc">{{description}}</p>'+
                '<div class="img coupon"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>'+
                '<div class="more-view"><p class="name">쿠폰안내</p>'+
                '<ul class="info"><li><dl><dt>발급일</dt><dd>{{startDate}}</dd></dl></li>'+
                '<li><dl><dt>유효기간</dt><dd>{{endDate}} 까지</dd></dl></li></ul>'+
                '<div class="btns"><a href="{{moreUrl}}" class="btn"><span>관련 제품 둘러보기</span></a></div></div>'+
                '<div class="bottom-btn"><a href="{{linkUrl}}" class="btn-link">보유 쿠폰 보기</a></div>'+
                '<button type="button" class="btn-del" data-id="#{{id}}"><span>알림 삭제</span></button>'+
                '</div></div></li>';

    var careTemplate =
                '<li class="list"><div class="notice-box">'+
                '<span class="icons">알림 확인 상태 : <em class="{{read}}">{{readDescription}}</em></span>'+
                '<p class="date"><span class="blind">알림 도착 날짜 및 시간</span>{{alarmDate}}</p>'+
                '<div class="box"><span class="blind">알림 내용</span>'+
                '<p class="tit">{{title}}</p><p class="desc">{{description}}</p>'+
                '<div class="more-view"><p class="name"><span class="blind">제품명</span>{{productName}}</p>'+
                '<ul class="info"><li><dl><dt>시작일</dt><dd>{{startDate}}</dd></dl></li>'+
                '<li><dl><dt>종료일</dt><dd>{{endDate}}</dd></dl></li>'+
                '<li><dl><dt>남은일자</dt><dd>{{remainDate}}일</dd></dl></li></ul>'+
                '<div class="btns"><a href="{{moreUrl}}" class="btn"><span>관련 제품 둘러보기</span></a></div></div>'+
                '<div class="bottom-btn"><a href="{{linkUrl}}" class="btn-link">케어솔루션 내역 보기</a></div>'+
                '<button type="button" class="btn-del" data-id="#{{id}}"><span>알림 삭제</span></button>'+
                '</div></div></li>';
    
    var eventTemplate =
                '<li class="list"><div class="notice-box">'+
                '<span class="icons">알림 확인 상태 : <em class="{{read}}">{{readDescription}}</em></span>'+
                '<p class="date"><span class="blind">알림 도착 날짜 및 시간</span>{{alarmDate}}</p>'+
                '<div class="box"><span class="blind">알림 내용</span><div class="flag-wrap"><span class="flag">이벤트</span></div>'+
                '<p class="tit">{{title}}</p><p class="desc">{{description}}</p>'+
                '<div class="img event"><img src="{{imageUrl}}" alt="{{imageAlt}}"></div>'+
                '<div class="more-view"><p class="name">이벤트안내</p>'+
                '<ul class="info"><li><dl><dt>기간</dt><dd>{{startDate}} ~ {{endDate}}</dd></dl></li>'+
                '<li><dl><dt class="blind">참여 방법</dt><dd>{{moreDescription}}</dd></dl></li></ul></div>'+
                '<div class="bottom-btn"><a href="{{linkUrl}}" class="btn-link">이벤트 참여하기</a></div>'+
                '<button type="button" class="btn-del" data-id="#{{id}}"><span>알림 삭제</span></button>'+
                '</div></div></li>';

    function makeItemData(data) {
        return {
            ...data,
            "read": data.read ? "off" : "on",
            "readDescription": data.read ? "읽음" : "안읽음"
        }
    }

    function noData(visible) {
        if(visible) {
            self.$mypage.find('.notice-list-wrap .nodata').show();
            self.$mypage.find('.cont-wrap .tab-contents .setting-btns').hide();
            self.$mypage.find('p.notice-txt').hide();
        } else {
            self.$mypage.find('.notice-list-wrap .nodata').hide();
            self.$mypage.find('.cont-wrap .tab-contents .setting-btns').show();
            self.$mypage.find('p.notice-txt').show();
        }
    }

    function requestData(param) {
        var ajaxUrl = self.$mypage.data('url');
        var typeExists = param ? param.hasOwnProperty ("type") : null;
        if(!typeExists) {
            var href = self.$mypage.find('div.cont-wrap div.ui_tab ul.tabs li.on a').attr('href');
            param = {'type': href.replace("#", "")}
        }

        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            if(d.status != 'success') {
                alert(d.message ? d.message : '오류발생');
                return;
            }

            var contentHtml = "";

            var data = d.data;
            var arr = data instanceof Array ? data : [];
            if(arr.length > 0) {
                noData(false);

                arr.forEach(function(item, index) {
                    switch(item.type) {
                        case "payment":
                            contentHtml += vcui.template(paymentTemplate, makeItemData(item));
                            break;
                        case "coupon":
                            contentHtml += vcui.template(couponTemplate, makeItemData(item));
                            break;
                        case "care":
                            contentHtml += vcui.template(careTemplate, makeItemData(item));
                            break;
                        case "event":
                            contentHtml += vcui.template(eventTemplate, makeItemData(item));
                            break;
                    }
                });
            } else {
                noData(true);
            }
            self.$mypage.find('ul.notice-lists').html(contentHtml);

            self.$mypage.find('ul.notice-lists').find('li.list div.notice-box button.btn-del').on('click',function(e){
                e.preventDefault();
                var _id = $(this).data('id');
                requestDeleteData({'id': _id});
            })

        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    function requestDeleteData(param) {
        var ajaxUrl = self.$mypage.data('deleteurl');

        $.ajax({
            url: ajaxUrl,
            data: param
        }).done(function (d) {
            if(d.status != 'success') {
                alert(d.message ? d.message : '오류발생');
                return;
            }
            var href = self.$mypage.find('div.cont-wrap div.ui_tab ul.tabs li.on a').attr('href');
            requestData({'type': href.replace("#", "")});
        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    $(window).ready(function() {
        var myAlarm = {
            init: function() {
                self.$mypage = $('.contents.mypage');
                self.$mypage.find('.tabs li a').on('click',function(e){
                    e.preventDefault();
                    var href = $(this).attr('href');
                    requestData({'type': href.replace("#", "")});
                })

                //requestData();
            }
        };

        myAlarm.init();
    });
})();