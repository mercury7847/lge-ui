$(window).ready(function(){
    if(!document.querySelector('.KRP0010')) return false;

    $('.KRP0010').buildCommonUI();

    /*
    vcui.require(['ui/carousel'], function () {
        $('.KRP0010').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            
        });
    });
*/

    var KRP0010 = {
        init: function() {
            //self = this;
            self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual').first();
            self.$detailInfo =  $('div.pdp-wrap div.pdp-info-area div.product-detail-info').first();
            self.$priceInfo = self.$detailInfo.find('div.product-detail-option div.price-info').first();
            self.$sibilingInfo = self.$priceInfo.siblings('div.sibling-info').first();

            //this.bindEvents();

            this.requestDetailData();
        },

        bindEvents: function() {
            //탭 이벤트
            self.$mypage.find('.ui_tab').on('tabchange', function(e, data) {
                if(firstLoad) {
                    //처음 변경되는 탭을 무시한다 화면에 최초 진입시
                    //탭을 통한 데이타 갱신이 아니라 따로 데이타를 전달할 경우 사용
                    firstLoad = false;
                    return;
                }
                var href = $(data.button).attr('href');
                this.requestData({'type': href.replace("#", "")});
            });

            //모달팝업 버튼
            $('#laypop .btn-wrap button:not(.ui_modal_close)').on('click',function(e){
                $(e.currentTarget).closest('#laypop').vcModal('hide');
                //모두 삭제
                var removeItems = [];
                self.$mypage.find('ul.notice-lists').find('li.list div.notice-box button.btn-del').each(
                    function () {
                        removeItems.push($(this).data('id'))
                    }
                );
                requestDeleteData({'id': removeItems});
            });

            self.$setting.on('click',function(e){
                //설정
                e.preventDefault();
            });
        },

        requestDetailData: function(param) {
            var ajaxUrl = self.$sibilingInfo.data('url-detail');
    
            $.ajax({
                url: ajaxUrl,
                data: param
            }).done(function (d) {
                if(d.status != 'success') {
                    alert(d.message ? d.message : '오류발생');
                    return;
                }
    
                var data = d.data;
                console.log(data);
    
                //뱃지
                var contentHtml = "";
                var arr = data.product_badge;
                var target = self.$pdpVisual.find('div.pdp-visual-image div.badge');
                arr.forEach(function(item, index) {
                    contentHtml += ('<img src="' + item.imageUrl + '" alt="' + item.imageAlt +'">');
                });
                target.html(contentHtml);
    
                //플래그
                contentHtml = "";
                arr = data.product_flag;
                target = self.$detailInfo.find('div.promotion-badge');
                arr.forEach(function(item, index) {
                    contentHtml += (' <span class="' + item.class + '">' + item.text +'</span>');
                });
                target.html(contentHtml);

                //타이틀
                target = self.$detailInfo.find('div.product-name h2.name');
                target.text(data.product_title);
                
                //제품명
                target = self.$detailInfo.find('div.sku');
                target.text(data.product_name);

                //평점
                target = self.$detailInfo.find('div.review-info div.average-rating');
                target.html(target.children());
                target.append(data.product_ratio);

                //리뷰수
                target = self.$detailInfo.find('div.review-info div.star')
                if(data.product_review_count > 0) {
                    target.addClass('is-review');
                } else {
                    target.removeClass('is-review');
                }
                target = self.$detailInfo.find('div.review-info div.review-count');
                target.html(target.children());
                target.append("(" + vcui.number.addComma(data.product_review_count) + "개)");

                var arr = data.price-info instanceof Array ? data.price-info : [];
                contentHtml = "";
                var itemHtml, itemArr;
                arr.forEach(function(item, index) {
                    itemArr = item.type_option instanceof Array ? item.type_option : [];

                    switch(item.type) {
                        case "product-benefit-none":
                            itemHtml = '<div class="product-benefit"><div class="title">'+item.type_text + '</div><ul>';
                            break;
                        case "product-benefit-popup":
                            itemHtml = '<div class="product-benefit"><div class="title">'+item.type_text + '</div><ul>';
                            break;
                    }
                    itemArr.forEach(function(item, index) {
                        itemHtml += ('<li>' + item + '</li>');
                    });
                    itemHtml += '</ul></div>';

                    contentHtml += itemHtml;
                });

                self.$priceInfo.find('.')


    
            }).fail(function(d){
                alert(d.status + '\n' + d.statusText);
            });
    
        }
    };

    KRP0010.init();
})