(function() {
    var listItemTemplate =
		 '<tr>'
		+	'<td class="board-tit">'
		+		'<a href="/company/investor/announceView?anncmNo={{announcementNo}}&page={{page}}#com-tabs02">'
		+			'{{#if (isNew == "Y")}}'
		+				'<p class="new">NEW</p>'
		+			'{{/if}}'
		+			'<p>{{announcementTitle}}</p>'
		+		'</a>'
		+	'</td>'
		+	'<td class="dwn">'
		+		'{{#if (attachFileUrl)}}'
		+			'<a href="{{attachFileUrl}}" target="_blank" title="{{announcementTitle}}.pdf 다운로드"></a>'
		+		'{{/if}}'
		+	'</td>'
		+	'<td>{{createDate}}</td>'
		+	'<td>{{viewCount}}{{#if (viewCount == "0")}}0{{/if}}</td>'
		+'</tr>';
    var announce = {
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
            	$contents = $('div.com-text');
            self.$announceList = $contents.find('#announceList');
            self.$pagination = $contents.find('div.pagination').vcPagination({'scrollTarget':self.$announceList});
            self.$nodata = $contents.find('#no-data');
        },

        bindEvents: function() {
            var self = this;

            self.$pagination.on('page_click', function(e, data) {
                var param = {'page':data}
                self.requestData(param);
                history.replaceState(null, '', '?page=' + data);
            });
        },

        requestData:function(param) {
            var self = this;
            var ajaxUrl = '/company/investor/announceList.lgajax';

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var param = result.param;
                var data = result.data;

                self.params = param;
                self.params.page = param.pagination.page;

                self.$pagination.vcPagination('setPageInfo',param.pagination);

                var arr = data.listData instanceof Array ? data.listData : [];
                var listbody = self.$announceList
                listbody.empty();
                
                if(arr.length > 0) {
                    self.$nodata.hide();
                    self.$pagination.show();
                    arr.forEach(function(item, index) {
                        listbody.append(vcui.template(listItemTemplate, item));
                    });
                    $('.tbl_add .item_num em').text(data.totalCount);
                    self.$announceList.show();
                } else {
                    self.$announceList.hide();
                    self.$pagination.hide();
                    self.$nodata.show();
                }
                lgkorUI.hideLoading();
            });
        }
    };

    $(document).ready(function() {
        announce.init();
    });
})();