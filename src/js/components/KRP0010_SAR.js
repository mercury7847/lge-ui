(function(){
    var sarItemTemplate = "<tr><td>{{mdlName}}</td><td>{{#if grade}}{{grade}}{{/if}}</td><td>{{sarCnt}}</td></tr>";

    var KRP0010_SAR = {
        init: function() {
            var self = this;

            self.setting();
            self.bindEvents();
        },

        setting: function() {
            var self = this;
            self.$component = $('.sar-popup');
            self.$inputSearch = self.$component.find('.input-sch input');
            self.$buttonSearch = self.$component.find('.input-sch button.btn-search');
            self.$resultList = $('.result-wrap');

        },

        bindEvents: function() {
            var self = this;
            self.$buttonSearch.on('click', function(e){
                e.preventDefault();
                var searchVal = self.$inputSearch.val();
                if(searchVal && searchVal.length > 3) {
                    self.requestSearch(searchVal);
                } else {
                    lgkorUI.alert("",{title:"모델명을 3글자 이상 입력해 주세요."});
                }
            });

            self.$inputSearch.keydown(function(key) {
                if (key.keyCode == 13) {
                    key.preventDefault();
                    self.$buttonSearch.trigger('click');
                }
            });
        },

        //SAR 검색
        requestSearch:function(modelName) {
            var self = this;
            if(!modelName) return;

            var ajaxUrl = self.$component.data('searchUrl');
            lgkorUI.requestAjaxData(ajaxUrl, {"modelName":modelName}, function(result) {
                var data = result.data;
                var arr = data instanceof Array ? data : [];
                //sar 리스트 갱신
                var $list_ul = self.$resultList.find('tbody');
                $list_ul.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(sarItemTemplate, item));
                    });
                    self.$resultList.show();
                } else {
                    //nodata
                    self.$resultList.hide();
                }                
            });
        },
    };

    $(document).ready(function(){
        if(!document.querySelector('.sar-popup')) return false;
        //$('.KRP0008').buildCommonUI();
        KRP0010_SAR.init();
    });
})();