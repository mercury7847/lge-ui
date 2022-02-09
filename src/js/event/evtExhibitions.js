$(document).ready(function() { 
    // BTOCSITE-4785 s
    if ($('.btn-pdp-alert').length) {
        goPdpUrl();
    }
    // BTOCSITE-4785 e
    var $wrap = $('.ev-detail-wrap');
    vcui.require(['ui/tab', 'ui/carousel'], function () {

        $wrap.find('.ui_objet_carousel').vcCarousel({         
            slidesToShow: 3,
            // slidesToScroll: 1,
            // centerPadding:'60px',
            dots: false,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        slidesToShow: 3,
                        centerMode:true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    })
});

// BTOCSITE-4785 s
function goPdpUrl() {
    $('.btn-pdp-alert').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        //BTOCSITE-9570 진열기획전 페이지 수정 요청 문구 수정
        lgkorUI.alert('해당 페이지는 제품 정보만 확인 가능합니다.<br>&#39;구매 매장 확인/예약 하기&#39;를 통해 구매 가능합니다.<br><br>매장 진열된 제품으로(생산 단종)<br>정가보다 할인해서 구매 가능한 모델입니다.', {
            title: "",
            okBtnName: "확인",
            ok: function(){
                location.href = href;
            }
        });
    });
}
// BTOCSITE-4785 e

// BTOCSITE-11191 지점별 필터 기능 추가
var evFilterItemTemplate =
'<li data-uniq-id="{{uniqId}}">' +
    '<div class="item evt-item">' +
        '{{#if promotionBadges}}'+
        '<div class="badge">' +
            '<div class="flag-wrap image-type left">'+
                '{{#each badge in promotionBadges}}'+
                    '{{#if badge.badgeImgUrl}}'+
                    '<span class="big-flag">'+
                        '<img src="{{badge.badgeImgUrl}}" alt="{{badge.badgeName}}">'+
                    '</span>'+
                    '{{/if}}'+
                '{{/each}}'+
            '</div>'+
        '</div>'+
        '{{/if}}' +
        '<div class="product-image" aria-hidden="true">' +
            '<a href="{{modelUrlPath}}" class="btn-pdp-alert"><img src="{{image}}" alt="{{categoryName}} {{modelDisplayAltName}} {{sku}} 썸네일"></a>' +
        '</div>' +
        '<div class="product-contents">' +
            '<div class="product-info">' +
                '<div class="product-name">' +
                    '<a href="{{modelUrlPath}}" class="btn-pdp-alert">{{#raw modelDisplayName}}</a>' +
                '</div>' +
                '<div class="sku">{{#if modelName}}{{modelName}}{{/if}}</div>' +
                '<div class="review-info">' +
                    '<a href="#">' +
                        '{{#if (reviewsCount != "0")}}' +
                        '<div class="star is-review"><span class="blind">리뷰있음</span></div>' +
                        '<div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>' +
                        '<div class="review-count"><span class="blind">리뷰 수</span>({{reviewsCount}})</div>' +
                        '{{/if}}' +
                    '</a>' +
                '</div>' +
                '<ul class="spec-info">' +
                    '{{#if firstBulletName}}<li>{{firstBulletName}}</li>{{/if}}'+
                    '{{#if showBulletFeatures}}' +
                    '{{#each item in showBulletFeatures}}' +
                    '<li>{{#raw item.specText}}</li>' +
                    '{{/each}}' +
                    '{{/if}}' +
                    '{{#if lastBulletName}}<li>{{lastBulletName}}' +
                    '{{#if (subCategoryId == "CT50000070")}}<span class="care-n">,</span><span class="redcare-option">1년 무상케어</span>{{/if}}' +
                    '</li>{{/if}}'+
                '</ul>' +
            '</div>' +
        '</div>'+
        '<div class="product-bottom">' +
            '{{#if checkPriceFlag}}'+

                //케어솔루션 경우
                '{{#if bizType == "CARESOLUTION"}}' +
                '<div class="price-area care">' +
                    '<div class="total-price">' +
                        '<em class="text">기본 월 요금</em>' +
                        '<span class="price"><em>월</em> {{years1TotAmt}}<em>원</em></span>' +
                    '</div>' +

                    '{{#if visitPer != "0"}}' +
                     '<span class="small-text">({{visitPer}}개월/1회 방문)</span>' +
                    '{{/if}}' +
                    '{{#if visitPer == "0"}}' +
                     '<span class="small-text">(방문없음/자가관리)</span>' +
                    '{{/if}}' +
                '</div>' +
                '{{#else}}' +
                '<div class="price-area">' +
                '{{#if obsTotalDiscountPrice}}' +
                    '{{#if obsBtnRule == "enable"}}'+
                        '{{#if obsTotalDiscountPrice == 0 || obsSellingPrice == obsOriginalPrice}}' + // BTOCSITE-5387 세일가격이 값0 이였을때
                            '{{#if obsOriginalPrice}}' +
                            '<div class="total">' +
                                '<em class="blind">판매가격</em>' +
                                '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                            '</div>' +
                            '{{/if}}' +

                        '{{#else}}' +

                         '{{#if obsOriginalPrice}}' +
                            '<div class="original">' +
                                '<em class="blind">판매가격</em>' +
                                '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                            '</div>' +
                         '{{/if}}' +

                        '{{#if obsSellingPrice}}' +
                            '<div class="total">' +
                                '<em class="blind">총 판매가격</em>' +
                                '<span class="price">{{obsSellingPrice}}<em>원</em></span>' +
                            '</div>' +
                        '{{/if}}' +
                    '{{/if}}' +
                '{{/if}}' +
              '{{/if}}' +

              '{{#else}}' +
                 '{{#if obsOriginalPrice}}' +
                    '<div class="total">' +
                        '<em class="blind">총 판매가격</em>' +
                        '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                    '</div>' +
                    '{{/if}}' +
                '{{/if}}' +
             '{{/if}}' +
           '{{/if}}' +

            '<div class="btn-area-wrap">' +
                '<div class="btn-area">' +
                    '<a href="{{storeUrlPath}}" class="btn border size-m btn-store">구매 매장 확인/예약하기</a>' +
                '</div>' +
                '<div class="btn-area">' +
                    '<a href="{{modelUrlPath}}" class="btn border size-m btn-pdp-alert">제품 정보 확인하기</a>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
'</li>';

var evFilter = {
    init: function(){

    },

    bindEvent: function(){

    },

    requestData: function(){

    }
}

$(function(){
    evFilter.init();
})

