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
                var _self = this,
                    $contents = $('.contents.feedback');
                
                _self.$searchWrap = $contents.find('.search-wrap');
                _self.$pagination = $contents.find('.pagination');
                _self.$sortsWrap = $contents.find('.sorting-wrap');
                _self.$sortTotal = $contents.find('#count');
                _self.$sortSelect = $contents.find('.ui_selectbox');
                _self.$listWrap = $contents.find('.tb_row');
                _self.$noData = $contents.find('.empty-row');

                _self.params = {
                    'keyword': _self.$searchWrap.find('input[type="text"]').val(),
                    'orderType': _self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                    'page': 1
                };

                _self.$pagination.pagination();
            
                _self.bindEvent();
            },
            searchList: function() {
                var _self = this,
                    url = _self.$searchWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, _self.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    _self.$searchWrap.find('input[type="text"]').val(_self.params['keyword']);
                    _self.$sortTotal.html(page.totalCount);                    
                    _self.$pagination.pagination('update', page);
                    _self.$listWrap.find('tbody').find('tr').not( _self.$noData).remove();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        _self.$listWrap.find('tbody').prepend(html);
                        _self.$noData.hide();
                    } else {
                        _self.$noData.show();
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var _self = this;
                
                _self.$searchWrap.find('.btn-search').on('click', function() {
                    _self.params = $.extend({}, _self.params, {
                        'keyword': _self.$searchWrap.find('input[type="text"]').val(),
                        'page': 1
                    });
                    
                    _self.searchList();
                });

                _self.$sortSelect.on('change', function() {
                    _self.params = $.extend({}, _self.params, {
                        'orderType': _self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    });
                    _self.searchList();
                });

                _self.$pagination.on('pageClick', function(e) {
                    _self.params = $.extend({}, _self.params, {
                        'page': e.page
                    });
                    _self.searchList();
                });
            }
        }
        
        feedback.init();
    });
})();