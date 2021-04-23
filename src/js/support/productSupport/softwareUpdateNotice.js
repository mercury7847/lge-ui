(function() {
    var listTmpl = 
    '<tr>' +
        '<td>{{category}}</td>' +
        '<td class="board-tit">' +
            '<a href="{{url}}">' +
                '{{# if (typeof flag != "undefined") { #}}' +
                '<div class="flag-wrap">' +
                    '<span class="flag"><span class="blind">제품 상태</span>{{flag}}</span>' +
                '</div>' +
                '{{# } #}}' +
                '<p>{{title}}</p>' +
            '</a>' +
        '</td>' +
        '<td>{{category}}</td>' +
        '<td>{{date}}</td>' +
        '<td>{{view}}</td>' +
    '</tr>';

    $(window).ready(function() {
        var notice = {            
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.notice');

                
                self.$searchWrap = $contents.find('.search-wrap');
                self.$pagination = $contents.find('.pagination');
                self.$sortsWrap = $contents.find('.sorting-wrap');
                self.$sortTotal = $contents.find('#count');
                self.$sortSelect = $contents.find('.ui_selectbox');
                self.$listWrap = $contents.find('.tb_row');
                self.$noData = $contents.find('.empty-row');
                self.$download = $contents.find('.addfile-wrap');

                self.params = {
                    'keyword': self.$searchWrap.find('input[type="text"]').val(),
                    'category': self.$sortSelect.filter('#category').vcSelectbox('value'),
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

                self.$listWrap.on('click', '.board-tit a', function() {
                    lgkorUI.historyBack(this);
                });

                self.$searchWrap.find('input[type="text"]').on('input', function() {
                    var val = $(this).val().trim();

                    if (val.length > 1) {
                        $('.search-error').hide();
                    }
                });

                self.$searchWrap.find('input[type="text"]').on('keyup', function(e) {
                    if (e.keyCode == 13) { 
                        self.$searchWrap.find('.btn-search').trigger('click');
                    }
                });
                
                self.$searchWrap.find('.btn-search').on('click', function() {
                    var val = self.$searchWrap.find('input[type="text"]').val().trim();

                    if (val.length > 1) {
                        self.params = $.extend({}, self.params, {
                            'keyword': val,
                            'page': 1
                        });
                        
                        $('.search-error').hide();

                        self.searchList();
                    } else if (val.length == 1) {
                        $('.search-error').show();
                    } else {
                        self.params = $.extend({}, self.params, {
                            'keyword': '',
                            'page': 1
                        });

                        self.searchList();

                        $('.search-error').hide();
                    }
                });

                self.$sortSelect.on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'category': self.$sortSelect.filter('#category').vcSelectbox('value'),
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

                self.$download.find('.download', function(e) {
                    
                });
            }
        }
        
        notice.init();
    });
})();