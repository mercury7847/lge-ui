(function() {
    console.log("????");
    var firstLoad = true;
    var cartUrl = "";
    var removeUrl = "";

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
                '<button type="button" class="btn-del" data-id="{{id}}"><span>알림 삭제</span></button>'+
                '</div></div></li>';

    function noData(visible) {
        /*
        if(visible) {
            self.$mypage.find('.notice-list-wrap .nodata').show();
            self.$mypage.find('p.notice-txt').hide();
            self.$removeAll.attr("disabled", true);
        } else {
            self.$mypage.find('.notice-list-wrap .nodata').hide();
            self.$removeAll.removeAttr("disabled");
            self.$mypage.find('p.notice-txt').show();
        }
        */
    }

    function requestChangeCartData() {
        console.log(cartUrl);

        $.ajax({
            url: cartUrl
        }).done(function (d) {
            if(d.status != 'success') {
                alert(d.message ? d.message : '오류발생');
                return;
            }

            var data = d.data;
            console.log(data);
            var arr = data.cart instanceof Array ? data : [];

            var contentHtml = "";

            if(arr.length > 0) {
                noData(false);
            } else {
                noData(true);
            }

        }).fail(function(d){
            alert(d.status + '\n' + d.statusText);
        });
    }

    //지울려고 하는 알람id는 array로 전달
    function requestDeleteData(param) {

    }

    $(window).ready(function() {
        var myCart = {
            init: function() {
                var cartContent = $('div.contents.cart');
                cartUrl = cartContent.attr('data-url-cart');
                removeUrl = cartContent.attr('data-url-remove');

                this.bindEvents();

                console.log('cart');
                requestChangeCartData();
            },

            bindEvents: function() {
            }
        };

        myCart.init();
    });
})();