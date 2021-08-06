(function() {
	var dartUrl;
	if (vcui.detect.isMobile) {
		dartUrl = 'http://m.dart.fss.or.kr/html_mdart/MD1007.html?rcpNo=';
	} else {
		dartUrl = 'http://dart.fss.or.kr/dsaf001/main.do?rcpNo=';
	}
    var listItemTemplate =
	     '<tr>'
		+	'<td class="board-tit">'
		+		'<a href="'+ dartUrl +'{{rceptNo}}" target="_blank">'
		+			'{{#if (isNew == "Y")}}'
		+				'<p class="new">NEW</p>'
		+			'{{/if}}'
		+			'<p>{{corpName}}(주) {{reportNm}}</p>'
		+		'</a>'
		+	'</td>'
		+	'<td>{{flrNm}}</td>'
		+	'<td>{{rceptDt}}</td>'
		+'</tr>';

    var disclosure = {
        init: function() {
            var self = this;
            vcui.require(['ui/pagination'], function () {
                self.setting();
                self.bindEvents();
                self.params = {};
            });
        },

        setting: function() {
            var self = this;
            	$contents = $('.com-text');
            self.$disclosureList = $contents.find('#disclosureList');
            self.$pagination = $contents.find('.pagination').vcPagination();
            self.$nodata = $contents.find('#no-data');
        },

        bindEvents: function() {
            var self = this;

            //페이지
            self.$pagination.on('page_click', function(e, data) {
                var param = {'page':data
                			,'pblntf_ty':$('#select1').val()}
                
                self.requestData(param);
                document.preventDefault();
            });
        },

        requestData:function(param) {
            var self = this;
            var ajaxUrl = '/company/investor/disclosureList.lgajax';

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var param = result.param;
                var data = result.data;

                self.params = param;
                self.params.page = param.pagination.page;
                //페이지
                self.$pagination.vcPagination('setPageInfo',param.pagination);
                var arr = data.listData instanceof Array ? data.listData : [];
                var listbody = self.$disclosureList;
                listbody.empty();
                
                if(arr.length > 0) {
                    self.$nodata.hide();
                    self.$pagination.show();
                    arr.forEach(function(item, index) {
                        listbody.append(vcui.template(listItemTemplate, item));
                    });
                    $('.tbl_add .item_num em').text(data.totalCount);
                    self.$disclosureList.show();
                    
                } else {
                    self.$disclosureList.hide();
                    self.$pagination.hide();
                    self.$nodata.show();
                }
                lgkorUI.hideLoading();
            });
        }
    };
    
    $(document).ready(function(){
    	disclosure.init();
    });
})();