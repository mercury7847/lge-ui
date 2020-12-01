(function() {
    var listTmpl = 
        '<li>' +
            '<a href="{{url}}" class="item">' +
                '<div class="item-image">' +
                    '<img src="{{img.src}}" alt="{{img.alt}}" aria-hidden="true">' +
                '</div>' +
                '<div class="item-conts">' +
                    '{{# if (typeof flag != "undefined") { #}}' +
                    '<div class="flag-wrap">' +
                        '<span class="flag">{{flag}}</span>' +
                    '</div>' +
                    '{{# } #}}' +
                    '<p class="tit">{{title}}</p>' +
                    '<ul class="infos">' +
                        '<li>{{date}}</li>' +
                        '<li>조회 {{view}}</li>' +
                    '</ul>' +
                '</div>' +
            '</a>' +
        '</li>';

    $(window).ready(function() {
        var notice = {            
            params: {},
            init: function() {
                var _self = this,
                    $contents = $('.contents.notice');
                
                _self.$searchWrap = $contents.find('.search-wrap');
                _self.$pagination = $contents.find('.pagination');
                _self.$sortsWrap = $contents.find('.sorting-wrap');
                _self.$sortTotal = $contents.find('#count');
                _self.$sortSelect = $contents.find('.ui_selectbox');
                _self.$listWrap = $contents.find('.list-wrap');
                _self.$noData = $contents.find('.no-data');

                _self.params = {
                    'keyword': _self.$searchWrap.find('#keyword').val(),
                    'orderType': _self.$sortSelect.eq(0).vcSelectbox('value'),
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

                    _self.$searchWrap.find('#keyword').val(_self.params['keyword']);
                    _self.$sortTotal.html(page.totalCount);                    
                    _self.$pagination.pagination('update', page);
                    _self.$listWrap.find('ul').empty();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        _self.$listWrap.find('ul').html(html);
                    
                        _self.$listWrap.show();
                        _self.$noData.hide();
                    } else {
                        _self.$listWrap.hide();
                        _self.$noData.show();
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var _self = this;
                
                _self.$searchWrap.find('.btn-search').on('click', function() {
                    _self.params = $.extend({}, _self.params, {
                        'keyword': _self.$searchWrap.find('#keyword').val(),
                        'page': 1
                    });
                    
                    _self.searchList();
                });

                _self.$sortSelect.on('change', function() {
                    _self.params = $.extend({}, _self.params, {
                        'orderType': _self.$sortSelect.eq(0).vcSelectbox('value'),
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