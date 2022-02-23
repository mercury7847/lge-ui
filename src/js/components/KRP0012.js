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
            var ajaxUrl = '/mkt/api/product/retrieveProductRegisterInfo';
            if(location.hostname == 'localhost' || location.port == '3010') ajaxUrl = '/lg5-common/data-ajax/pdp/pdp_status.json';
            var options = {
                isMobile: vcui.detect.isMobile,
                loginFlag : digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? true : false,
                productcode : $section.data('productCode'),
                isProduct: true,
                ownStatus: false,
                orderStatus: false,
                cremaReviewTemplate: '<div class="review-write-wrap">'+
                '{{#if isProduct}}<div class="txt-area">'+
                '<p>보유 제품 등록하고 제품 리뷰 작성하면 최대 <strong>1,000P</strong>의 멤버십 포인트를 드립니다.</p>'+
                '</div>{{/if}}'+
                '<button type="button" class="{{#if orderStatus}}js-crema-new-review-link{{/if}} btn" data-product-code="{{productcode}}" data-own-status="{{ownStatus}}" {{#if isMobile}}data-review-source="mobile_my_orders"{{/if}}>리뷰 작성하기</button>'+
                '</div>'
            };
            var sendata = {
                modelName: options.productcode,
                modelId: (digitalData.productInfo)? digitalData.productInfo.model_id:null,
                unifyId: (digitalData.userInfo)? digitalData.userInfo.unifyId:null,
            };
            lgkorUI.requestAjaxData(ajaxUrl, sendata, function(result) {
                var data = result.data[0];
                options.orderStatus = (options.loginFlag && lgkorUI.stringToBool(data.isregistered)) ? true:false;
                options.ownStatus = lgkorUI.stringToBool(data.isregistered);
                options.isProduct = lgkorUI.stringToBool(data.isproduct);
                console.log(options, sendata)
                $section.find('.review-info-text').append('<span style="padding: 0 3px;font-size:6px;background-color:#ff746a;color: #fff">STAGING: '+options.loginFlag+' / '+options.ownStatus+'/'+sendata.modelName+'/'+sendata.modelId+'<a href="https://sreview1.cre.ma/lge.co.kr/mobile/reviews/new?order_code=&sub_order_code=&product_subcode=&product_code=OLED88ZXKNA&review_source=&close_url='+location.href+'&app=0&device=mobile&secure_username=V292147c59acedc6e6bce4a638cb4007c3c8eb0de709484d17b102a51ab0b046b627424c38a031ce562903d8e3e038ddec&secure_user_name=V2cb54ba54b131b5ee6f38c12c31960aaa&secure_device_token=HNsfm0BNzgPnfC80&widget_env=100">test url</a></span>')
                $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, options));
                lgkorUI.cremaReload();
            },"POST", null, null, null, null, function(request){
                var err = (request == undefined) ? 'undefined' : request.status;
                console.log("ERROR : " + err);
                // $section.find('.review-info-text').before(vcui.template(options.cremaReviewTemplate, options));
            });
            var flag = false;
            $section.off("click").on('click','.review-write-wrap .btn', function(e) {
                if(!flag) {
                    flag = true;
                    var msg = options.loginFlag ? '보유제품 등록 후 리뷰 등록 가능합니다':'리뷰 작성을 위해 로그인을 해주세요.';
                    var opt = {
                        typeClass: options.loginFlag ? 'crema-review-confirm':'',
                        okBtnName: options.loginFlag ? '보유제품 등록하기':'예',
                        cancel: function(){
                            flag = false;
                        },
                        ok: function(){
                            var link =  options.loginFlag ? '/my-page/manage-products?tab=1': '/sso/api/Login';
                            location.href = link;
                        }
                    };
                    if(!lgkorUI.stringToBool($(this).attr('data-own-status'))) {
                        lgkorUI.confirm(msg, opt);
                    }else {
                        alert(isApp()+'/'+ vcui.detect.isIOS+'/'+ vcui.detect.isAndroid)
                        var params;
                        return params = {
                            "close_url": location.href,
                            "product_code": options.productcode,
                            "review_source": 'mobile_my_orders'
                        }, window.location.href = crema.util.review_url("mobile/reviews/new", params);
                    }
                }
                return false;
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