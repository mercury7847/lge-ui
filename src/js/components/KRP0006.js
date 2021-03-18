(function() {
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
                var biz = $item.attr('data-biz-type');
                var ajaxUrl = $item.attr('data-response-url');

                //모델아이디가 있으면 쿠키저장
                var _type = $item.attr('data-type');
                if(_type == "r-top" && !(!modelID)) {
                    lgkorUI.addCookieArrayValue(lgkorUI.RECENT_PROD_COOKIE_NAME,modelID,lgkorUI.MAX_SAVE_RECENT_PRODUCT);
                }
        
                if(self.firstLoad && !(!ajaxUrl)){
                    self.firstLoad = false;

                    var param = {
                        "modelId":modelID,
                        "bizType":biz
                    }
                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
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

            /*
            self.component.on('click', '.inner a', function(e){
                e.preventDefault();
                var url = $(this).attr('href');
                if(url) {
                    var form = $('<form action="' + url + '" method="post"></form>');
                    $('body').append(form);
                    form.submit();
                }
            });
            */
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
                    } else {
                        //PDP페이지를 5번 이상 방문 시(최근 본 제품이 5개 이상일때)
                        var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
                        var array = cookieValue.split('|');
                        var count = $item.attr('data-top-cookie-count');
                        var checkCookieCount = !count ? 5 : count; 
                        if(array.length >= checkCookieCount) {
                            //2021-03-17
                            //현재 서버에서 잘못오고 있어서 임의로 데이타 수정 (큐레이션으로 이동) 큐레이션 url 불확실
                            //data.productCurationProposal = {"uiInfo": "https://wwwstg.lge.co.kr/my-collection/curation-submain", "uiMessage": "제품 선택에 고민이 있으신가요? 내게 맞는 제품을 찾아보세요."};
                            self.reloadComponent($item, data.productCurationProposal);
                        }
                    }
                } else if(_type == "r-btm") {
                    //하단영역
                    var check = lgkorUI.stringToBool(data.categoryBestProduct.success);
                    if(check) {
                        //제품 비교하기 페이지에서 제품 페이지 진입 시
                        var referrer = document.referrer;
                        var currentUrl = location.href.split("//")[1].split('/')[0];
                        var compareUrl = currentUrl + $item.attr('data-bottom-compare-url');
                        if(!(!compareUrl) && referrer && (referrer.indexOf(compareUrl) != -1)) {
                            self.reloadComponent($item, data.storeConsultation);
                        } else if(check) {
                            self.reloadComponent($item, data.categoryBestProduct);
                        }
                    } else {
                        self.reloadComponent($item, data.storeConsultation);
                    }
                }
            });
        },

        reloadComponent: function($dm, data) {
            var resTemplate = '<div class="inner">' +
                '<a href="{{uiInfo}}"><p class="txt">{{uiMessage}}</p></a>' +
                '<button type="button" class="btn-close"><span class="blind">닫기</span></button>' +
            '</div>'
            if(data.uiInfo && data.uiMessage && data.uiMessage.length > 0) {
                $dm.append(vcui.template(resTemplate, data));
                //$dm.find('.inner p.txt').text(data.uiMessage);
                //$dm.find('.inner a').attr("href",data.uiInfo);
                $dm.show();
            } else {
                $dm.hide();
            }
        }
    };

    $(document).ready(function(){
        if(!document.querySelector('.KRP0006')) return false;
        KRP0006.init();
    });
})();