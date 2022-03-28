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
                    $contWrap.append('<div class="crema-product-reviews KRP0012-crema-review" data-product-code="' + productcode + '"></div>');
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
            if(location.pathname == '/html/components/KRP0012.html') ajaxUrl = '/lg5-common/data-ajax/pdp/pdp_status.json';
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
                '<button type="button" class="{{#if orderStatus}}crema-new-review-link{{/if}} btn" data-product-code="{{productcode}}" data-own-status="{{ownStatus}}" {{#if isMobile}}data-review-source="mobile_my_orders"{{/if}}>리뷰 작성하기</button>'+
                '</div>'
            };
            var sendata = {
                modelName: options.productcode,
                modelId: (digitalData.productInfo)? digitalData.productInfo.model_id:null,
                unifyId: (digitalData.userInfo)? digitalData.userInfo.unifyId:null,
            };
            var chkIE = false;
            var mutationObserver = new MutationObserver(function(entries) {
                entries.forEach(function(entry){
                    var id = crema.popup !== undefined ? crema.popup.iframe_id:'crema-review-popup';
                    if(vcui.detect.isIE) {
                        if($(entry.target).is('#'+id)) {
                            chkIE = true;
                        }
                        console.log('....chkIE')
                        if(chkIE && !$(entry.target).is(':visible')) {
                            chkIE = false;
                            document.getElementById($('.KRP0012-crema-review').find('iframe').attr('id')).contentDocument.location.reload(true);
                            // $('.KRP0012-crema-review').find('iframe').attr('src', $('.KRP0012-crema-review').find('iframe').attr('src'))
                        }
                    }else {
                        if(entry.removedNodes.length > 0) {
                            $(entry.removedNodes).each(function() {
                                if($(this).is('#'+id)) {
                                    // console.log('remove', crema)
                                    crema.message_handler.reload_all(crema.iframe_manager.iframes);
                                }
                            })
                        }
                    }
				});
            }); 
            lgkorUI.requestAjaxData(ajaxUrl, sendata, function(result) {
                var data = result.data[0];
                var appendTarget = $section.find('.review-info-text').size()>0 ? $section.find('.review-info-text'): $section.find('.review-wrap');
                options.orderStatus = (options.loginFlag && lgkorUI.stringToBool(data.isregistered)) ? true:false;
                options.ownStatus = lgkorUI.stringToBool(data.isregistered);
                options.isProduct = lgkorUI.stringToBool(data.isproduct);
                appendTarget.before(vcui.template(options.cremaReviewTemplate, options));
                lgkorUI.cremaReload();

                mutationObserver.observe($('body')[0], { attributes: true, childList: true, subtree: true });
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