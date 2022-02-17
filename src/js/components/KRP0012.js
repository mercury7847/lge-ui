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
           setTimeout(self.reviewWrite, 1500); // BTOCSITE-8083
        },
        // S : BTOCSITE-8083
        reviewWrite: function() {
            var $section = $('.KRP0012');
            var ajaxUrl = $section.attr('data-product-status')?$section.attr('data-product-status'):'/mkt/api/product/retrieveProductRegisterInfo';
            var options = {
                isMobile: vcui.detect.isMobile,
                loginFlag : digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? true : false,
                productcode : $section.data('productCode'),
                ownStatus: false,
                orderStatus: false,
                cremaReviewTemplate: '<div class="review-write-wrap">'+
                '<div class="txt-area">'+
                '{{#if isProduct}}<p>보유 제품 등록하고 제품 리뷰 작성하면 최대 <strong>1,000P</strong>의 멤버십 포인트를 드립니다.</p>{{/if}}'+
                '</div>'+
                '<button type="button" class="{{#if orderStatus}}crema-new-review-link{{/if}} btn" data-product-code="{{productcode}}" data-own-status="{{ownStatus}}" {{#if isMobile}}review-source="mobile_my_orders"{{/if}}>리뷰 작성하기</button>'+
                '</div>'
            };
            var sendata = (options.loginFlag) ? {
                modelId: digitalData.productInfo.model_id,
                unifyId: digitalData.userInfo.unifyId,
            }:null;
            lgkorUI.requestAjaxData(ajaxUrl, sendata, function(result) {
                var data = result.data[0];
                options.orderStatus = (options.loginFlag && lgkorUI.stringToBool(data.isregistered)) ? true:false;
                options.ownStatus = lgkorUI.stringToBool(data.isregistered);
                options.isProduct = lgkorUI.stringToBool(data.isproduct);
                // console.log(options)
                $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, options));
            },"POST", null, null, null, null, function(request){
                $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, options));
                var err = "ERROR : " + (request == undefined) ? 'undefined' : request.status;
                console.log(err, options.loginFlag);
            });
            $section.on('click','.review-write-wrap .btn', function(e) {
                var msg = options.loginFlag ? '보유제품 등록 후 리뷰 등록 가능합니다':'리뷰 작성을 위해 로그인을 해주세요.';
                if(!lgkorUI.stringToBool($(this).attr('data-own-status'))) {
                    lgkorUI.confirm(msg, {
                        cancelBtnName: "아니오",
                        okBtnName: "네",
                        ok: function(){
                            var link =  options.loginFlag ? '/my-page/manage-products?tab=1' : "/sso/api/Login";
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