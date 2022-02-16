(function() {
    var KRP0012 = {
        init: function() {
            var self = this;
            //크레마
            lgkorUI.cremaLogin();

            var $section = $('.KRP0012');
            var $contWrap = $section.find('.cont-wrap');
            $contWrap.empty();

            var isMobile = vcui.detect.isMobile;
            var productcode = $section.data('productCode');
            //var widgetId = $section.data('widgetId');

            if(productcode) {
                //아이콘 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema_statistics_widget > iframe[src^="[http://review-api9.cre.ma/]http://review-api9.cre.ma";] { display: none !important; }</style>' +
                        '<div class="crema-product-reviews crema_statistics_widget" data-product-code="' + productcode +'" data-widget-id="' + "110" + '" data-widget-style="statistics"></div>');
                } else {
                    $contWrap.append('<style>.crema_statistics_widget > iframe[src^="[http://review-api9.cre.ma/]http://review-api9.cre.ma";] { display: none !important; }</style>' +
                        '<div class="crema-product-reviews crema_statistics_widget" data-product-code="' + productcode +'" data-widget-id="' + "109" + '" data-widget-style="statistics"></div>');
                }

                //상품 리뷰 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema-product-reviews > iframe { max-width: 100% !important; }</style><div class="crema-product-reviews" data-widget-id="' + "26" + '" data-product-code="' + productcode + '"></div>');
                } else {
                    $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '"></div>');
                }

                //상품 소셜 위젯
                if(isMobile){
                    $contWrap.append('<style>.crema-product-reviews > iframe { max-width: 100% !important; }</style><div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + "40" + '"></div>');
                } else {
                    $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + "39" + '"></div>');
                }
            }

            /*
            if(productcode && widgetId) {
                $contWrap.append('<div class="crema-product-reviews" data-product-code="' + productcode + '" data-widget-id="' + widgetId + '"></div>');
            }
            */
           self.reviewWrite(); // BTOCSITE-8083
        },
        // S : BTOCSITE-8083
        reviewWrite: function() {
            var $section = $('.KRP0012');
            var ajaxUrl = $section.attr('data-product-status')?$section.attr('data-product-status'):'/lg5-common/data-ajax/pdp/pdp_status.json';
            var options = {
                loginFlag : digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? true : false,
                productcode : $section.data('productCode'),
                ownStatus: false,
                orderStatus: false,
                cremaReviewTemplate = '<div class="review-write-wrap">'+
                    '<div class="txt-area">'+
                        '<p>보유 제품 등록하고 제품 리뷰 작성하면 최대 <strong>1,000P</strong>의 멤버십 포인트를 드립니다.</p>'+
                    '</div>'+
                    '<button type="button" class="{{#if ownStatus}}crema-new-review-link{{/if}} btn" data-product-code="{{enModelName}}" data-own-status="{{ownStatus}}">리뷰 작성하기</button>'+
                '</div>'
            };
            lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                var data = result.data;
                options.ownStatus = lgkorUI.stringToBool(data.ownStatus);
                options.orderStatus = lgkorUI.stringToBool(data.orderStatus);
                $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, {"enModelName":options.productcode, "ownStatus":options.ownStatus}));
            },null, null, null, null, null, function(request){
                var err = "ERROR : " + request.status;
	            console.log(err);
                $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, {"enModelName":options.productcode, "ownStatus":options.ownStatus}));
            });
            $section.on('click','.review-write-wrap .btn', function(e) {
                var msg = '보유제품 등록 후 리뷰 등록 가능합니다' //options.loginFlag ? '보유제품 등록 후 리뷰 등록 가능합니다':'리뷰 작성을 위해 로그인을 해주세요.';
                if(!lgkorUI.stringToBool($(this).attr('data-own-status'))) {
                    lgkorUI.confirm(msg, {
                        cancelBtnName: "아니오",
                        okBtnName: "네",
                        ok: function(){
                            var link =  '/my-page/manage-products'; //options.loginFlag ? '/my-page/manage-products' : "/sso/api/Login";
                            location.href = link;
                        }
                    });   
                }
            });
        }
        // E : BTOCSITE-8083
    }

    $(document).ready(function(){
        if(!document.querySelector('.KRP0012')) return false;
        //$('.KRP0012').buildCommonUI();
        KRP0012.init();
    });
})();