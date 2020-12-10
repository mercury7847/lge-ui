(function() {
    var listTmpl = 
    '<tr>' +
        '<td class="board-tit">' +
            '<a href="{{url}}">' +
                '<p>{{title}}</p>' +
            '</a>' +
        '</td>' +
        '<td>{{date}}</td>' +
        '<td>조회 {{view}}</td>' +
    '</tr>';

    $(window).ready(function() {
        var feedback = {            
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.feedback');
                
                self.$searchWrap = $contents.find('.search-wrap');
                self.$pagination = $contents.find('.pagination');
                self.$sortsWrap = $contents.find('.sorting-wrap');
                self.$sortTotal = $contents.find('#count');
                self.$sortSelect = $contents.find('.ui_selectbox');
                self.$listWrap = $contents.find('.tb_row');
                self.$noData = $contents.find('.empty-row');

                self.params = {
                    'keyword': self.$searchWrap.find('input[type="text"]').val(),
                    'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                    'page': 1
                };

                self.$pagination.pagination();
            
                self.bindEvent();
            },
            searchList: function() {
                var self = this,
                    url = self.$searchWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    self.$searchWrap.find('input[type="text"]').val(self.params['keyword']);
                    self.$sortTotal.html(page.totalCount);                    
                    self.$pagination.pagination('update', page);
                    self.$listWrap.find('tbody').find('tr').not( self.$noData).remove();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('tbody').prepend(html);
                        self.$noData.hide();
                    } else {
                        self.$noData.show();
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;
                
                self.$searchWrap.find('.btn-search').on('click', function() {
                    self.params = $.extend({}, self.params, {
                        'keyword': self.$searchWrap.find('input[type="text"]').val(),
                        'page': 1
                    });
                    
                    self.searchList();
                });

                self.$sortSelect.on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    });
                    self.searchList();
                });

                self.$pagination.on('pageClick', function(e) {
                    self.params = $.extend({}, self.params, {
                        'page': e.page
                    });
                    self.searchList();
                });
            }
        }
        
        feedback.init();
    });
})();