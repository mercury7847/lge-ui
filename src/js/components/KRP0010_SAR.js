(function(){
    var sarItemTemplate = "<tr><td>{{mdlName}}</td><td>{{#if grade}}{{grade}}{{/if}}</td><td>{{sarCnt}}</td></tr>";

    var KRP0010_SAR = {
        init: function() {
            var self = this;
            self.setting();
            self.bindEvents();
            self.checkNoData();
        },

        setting: function() {
            var self = this;
            self.$component = $('.sar-popup');
            self.$inputSearch = self.$component.find('.input-sch input');
            self.$buttonSearch = self.$component.find('.input-sch button.btn-search');
            self.$resultList = $('.result-wrap');
            self.$noData = self.$resultList.find('tr.empty-row');
        },

        bindEvents: function() {
            var self = this;
            self.$buttonSearch.on('click', function(e){
                e.preventDefault();
                var searchVal = self.$inputSearch.val();
                if(searchVal && searchVal.length >= 3) {
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

            self.$component.on('click','button.win-btn-close', function (e) {
                e.preventDefault();
                close();
            });
        },

        //SAR 검색
        requestSearch:function(modelName) {
            var self = this;
            if(!modelName) return;
            var ajaxUrl = self.$component.data('searchUrl');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, {"modelName":modelName}, function(result) {
                var data = result.data;
                var arr = data instanceof Array ? data : [];
                //sar 리스트 갱신
                var $list_ul = self.$resultList.find('tbody');
                $list_ul.find('tr:not(.empty-row)').remove();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(sarItemTemplate, item));
                    });
                }
                self.checkNoData();
            });
        },

        checkNoData:function () {
            var self = this;
            var $list_ul = self.$resultList.find('tbody');
            var $tr = $list_ul.find('tr:not(.empty-row)');
            if($tr.length > 0) {
                $list_ul.append(self.$noData);
                self.$noData.hide();
            } else {
                //nodata
                self.$noData.show();
            }
        }
    };

    $(document).ready(function(){
        if(!document.querySelector('.sar-popup')) return false;
        //$('.sar-popup').buildCommonUI();
        KRP0010_SAR.init();
    });
})();