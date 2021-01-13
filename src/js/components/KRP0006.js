(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRP0006')) return false;
        
        var myRecentProductCookieName = 'myRecentProductTemp';

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
                    //test
                    ajaxUrl = "http://mktsvc.lgekrdev.lge.co.kr/kr/mkt" + "/api/responsible/retrieveResponseUI";

                    //모델아이디가 있으면 쿠키저장
                    if(!(!modelID)) {
                        lgkorUI.addCookieArrayValue(myRecentProductCookieName,modelID);
                    }
            
                    if(self.firstLoad && !(!ajaxUrl)){
                        self.firstLoad = false;

                        var param = {
                            "modelID":modelID,
                            "sku":sku
                        }
            
                        lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                            var data = result.data.length > 0 ? result.data[0] : {};
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

                    if(_type == "top") {
                        //상단 영역
                        var check = lgkorUI.stringToBool(data.ResponseUITop.success);
                        if(check) {
                            self.reloadComponent($item, data.ResponseUITop);              
                        } else if(data.productCurationProposal) {
                            //PDP페이지를 5번 이상 방문 시(최근 본 제품이 5개 이상일때)
                            var cookieValue = lgkorUI.getCookie(myRecentProductCookieName);
                            var array = cookieValue.split(',');
                            if(array.length > 4) {
                                self.reloadComponent($item, data.productCurationProposal);
                            }
                        }
                    } else if(type == "bottom") {
                        //하단영역
                        var check = lgkorUI.stringToBool(data.categoryBestProduct.success);
                        if(data.storeConsultation) {
                            //제품 비교하기 페이지에서 제품 페이지 진입 시
                            var referrer = document.referrer;
                            var compareUrl = "/lgekor/bestshop/counsel/counselMain.do"
                            if(referrer && (referrer.indexOf(compareUrl) != -1)) {
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