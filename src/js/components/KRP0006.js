(function() {
    var KRP0006 = {
        init: function() {
            var self = this;
            //0407 임시로 막음
            /*
            self.setting();
            self.bindEvents();
            */
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
                var $this = $(this);
                var modelID = $this.attr('data-model-id');
                var uiType = $this.attr('data-ui-type');
                //쿠키저장 (1달)
                if(modelID && uiType) {
                    lgkorUI.addCookieArrayValue("_responseUI_"+modelID,uiType,10,30);
                }
                $this.closest('.inner').slideUp(200);
            });
        },

        checkSuccess: function name(data) {
            return lgkorUI.stringToBool(data.success);
        },

        reloadData: function(data) {
            var self = this;
            self.component.each(function(idx, item){
                var $item = $(item);
                var modelID = $item.attr('data-model-id');

                //저장된 쿠키 가져오기
                var _cookies = lgkorUI.getCookie("_responseUI_"+modelID);
                var cookies = _cookies ? _cookies : "";

                var _type = $item.attr('data-type');
                if(_type == "r-top") {
                    //상단 영역
                    if(self.checkSuccess(data.purchaseoffer) && cookies.indexOf("1") < 0) {
                        //1.구매제안 : 현재 제품이 장바구니에 담겨 있는 경우
                        self.reloadComponent($item, "1", modelID, data.purchaseoffer);             
                    } else if(self.checkSuccess(data.proposalExtend) && cookies.indexOf("2") < 0){
                        //2.케어솔루션제안 : 보유한 케어솔루션 제품 중 계약 만료 기간이 60일 미만으로 남은 시점에 모든 (일반제품, 소모품, 케어솔루션 등) 제품의 PDP 진입 시.
                        self.reloadComponent($item, "2", modelID, data.proposalExtend);
                    } else if(self.checkSuccess(data.newProduct) && cookies.indexOf("3") < 0){
                        //3.신제품추천 : 현재보고 있는 제품과 동일 카테고리 內 출시 1개월 이내 제품이 있을 시.
                        self.reloadComponent($item, "3", modelID, data.newProduct); 
                    } else if(self.checkSuccess(data.categoryExhibition) && cookies.indexOf("4") < 0){
                        //4.카테고리 기획전 추천 : 해당 제품이 포함된 기획전이 현재 진행 중일 시.
                        self.reloadComponent($item, "4", modelID, data.categoryExhibition); 
                    }
                } else if(_type == "r-btm") {
                    //하단 영역
                    if(self.checkSuccess(data.storeConsultation) && cookies.indexOf("5") < 0) {
                        //1.매장 상담 신청 : 제품 비교하기 페이지에서 제품 페이지 진입 시

                        self.reloadComponent($item, "5", modelID, data.storeConsultation);             
                    } else if(cookies.indexOf("6") < 0){
                        //2. 카테고리 베스트 제품 추천 : 최근 본 제품이 4개 이하인 경우
                        var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
                        var array = cookieValue.split('|');
                        if(array.length < 5) {
                            self.reloadComponent($item, "6", modelID, data.categoryBestProduct);
                        }
                    }
                }
            });
        },

        reloadComponent: function($dm, uiType, modelID, data) {
            var resTemplate = '<div class="inner">' +
                '<a href="{{uiUrlPath}}"><p class="txt">{{uiMessage}}</p></a>' +
                '<button type="button" class="btn-close" data-model-id="{{modelID}}" data-ui-type="{{uiType}}"><span class="blind">닫기</span></button>' +
            '</div>';
            data.modelID = modelID;
            data.uiType = uiType;
            if(data.uiUrlPath && data.uiMessage && data.uiMessage.length > 0) {
                $dm.append(vcui.template(resTemplate, data));
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