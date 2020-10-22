(function() {
    var listDataTmpl = 
        '<li>' +
            '<a href="#">' +
                '{{# if (typeof flag != "undefined") { #}}' +
                    '<div class="flag-wrap">' +
                        '<span class="flag">{{flag}}</div>' +
                    '</div>' +
                '{{# } #}}' +
                '<h3 class="title">{{title}}</h3>' +
                '<ul class="infos">' +
                    '<li>{{date}}</li>' +
                    '<li><span class="view"><span class="blind">조회수</span>{{view}}</span></li>' +
                '</ul>' +
            '</a>' +
        '</li>';

    $(window).ready(function() {
        var notice = {
            form: document.querySelector('#submitForm'),
            params: {},
            init: function() {
                var _self = this,
                    $contents = $('.contents.notice');
                
                _self.$searchWrap = $contents.find('.search-wrap');
                _self.$pagination = $contents.find('.pagination');
                _self.$sortsWrap = $contents.find('.sorting-wrap');
                _self.$sortTotal = $contents.find('#count');
                _self.$sortSelect = $contents.find('.ui_selectbox');
                _self.$listWrap = $contents.find('.board-list-wrap');
                _self.$noData = $contents.find('.no-data');

                _self.params = {
                    'keyword': _self.$searchWrap.find('input[type="text"]').val(),
                    'category': _self.$sortSelect.eq(0).vcSelectbox('value'),
                    'orderType': _self.$sortSelect.eq(1).vcSelectbox('value'),
                    'page': 1
                };

                _self.$pagination.pagination();
            
                _self.bindEvent();
            },
            searchList: function(param) {
                var _self = this,
                    url = _self.$searchWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(url, _self.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    _self.$searchWrap.find('input[type="text"]').val(self.params['keyword']);
                    _self.$sortTotal.html(page.totalCount);                    
                    _self.$listWrap.find('ul').empty();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listDataTmpl, item);
                        });
                        _self.$listWrap.find('ul').html(html);

                        _self.$pagination.pagination('update', page);
                    
                        _self.$sortsWrap.show();
                        _self.$listWrap.show();
                        _self.$pagination.show();
                        _self.$noData.hide();
                    } else {
                        _self.$sortsWrap.hide();
                        _self.$listWrap.hide();
                        _self.$pagination.hide();
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
                        'category': _self.$sortSelect.eq(0).vcSelectbox('value'),
                        'orderType': _self.$sortSelect.eq(1).vcSelectbox('value'),
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
        
        notice.init();
    });
})();