(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRP0006')) return false;

        var KRP0006 = {
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
            },

            setting: function() {
                var self = this;
                self.firstLoad = true;
                self.component = $('.KRP0006');

                self.component.each(function(idx, item){
                    var $item = $(item);
                    $item.hide();
                    var modelID = $item.attr('data-model-id');
                    var sku = $item.attr('data-sku');
                    var ajaxUrl = $item.attr('data-response-url');

                    //모델아이디가 있으면 쿠키저장
                    var _type = $item.attr('data-type');
                    if(_type == "r-top" && !(!modelID)) {
                        //console.log("### KRP0006 setting(); ###", _typem, modelID )
                        lgkorUI.addCookieArrayValue(lgkorUI.RECENT_PROD_COOKIE_NAME,modelID,lgkorUI.MAX_SAVE_RECENT_PRODUCT);
                    }
            
                    if(self.firstLoad && !(!ajaxUrl)){
                        self.firstLoad = false;

                        var param = {
                            "modelID":modelID,
                            "sku":sku
                        }
                        //console.log("### KRP0006 requestAjaxData(); ###", ajaxUrl, param)
                        lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                            //console.log("### KRP0006 requestAjaxData result###", result.data)
                            var data = result.data ? result.data : {};
                            self.reloadData(data);
                        });
                    }
                });
            },

            bindEvents: function() {
                var self = this;
                self.component.on('click', '.inner button', function(e){
                    e.preventDefault();
                    $(this).closest('.inner').slideUp(200);
                });
            },

            reloadData: function(data) {
                var self = this;
                self.component.each(function(idx, item){
                    var $item = $(item);
                    var _type = $item.attr('data-type');

                    if(_type == "r-top") {
                        //상단 영역
                        var check = lgkorUI.stringToBool(data.ResponseUITop.success);
                        if(check) {
                            self.reloadComponent($item, data.ResponseUITop);              
                        } else if(data.productCurationProposal) {
                            //PDP페이지를 5번 이상 방문 시(최근 본 제품이 5개 이상일때)
                            var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
                            var array = cookieValue.split('|');
                            var count = $item.attr('data-top-cookie-count');
                            var checkCookieCount = !count ? 5 : count; 
                            if(array.length >= checkCookieCount) {
                                self.reloadComponent($item, data.productCurationProposal);
                            }
                        }
                    } else if(_type == "r-btm") {
                        //하단영역
                        var check = lgkorUI.stringToBool(data.categoryBestProduct.success);
                        if(data.storeConsultation) {
                            //제품 비교하기 페이지에서 제품 페이지 진입 시
                            var referrer = document.referrer;
                            var currentUrl = location.href.split("//")[1].split('/')[0];
                            var compareUrl = currentUrl + $item.attr('data-bottom-compare-url');
                            if(!(!compareUrl) && referrer && (referrer.indexOf(compareUrl) != -1)) {
                                self.reloadComponent($item, data.storeConsultation);
                            } else if(check) {
                                self.reloadComponent($item, data.categoryBestProduct);
                            }
                        } else if(check) {
                            self.reloadComponent($item, data.categoryBestProduct);
                        }
                    }
                });
            },

            reloadComponent: function($dm, data) {
                if(data.uiInfo && data.uiMessage) {
                    $dm.find('.inner p.txt').text(data.uiMessage);
                    $dm.find('.inner a').attr("href",data.uiInfo);
                    $dm.show();
                } else {
                    $dm.hide();
                }
            }
        };

        KRP0006.init();
    });
})();