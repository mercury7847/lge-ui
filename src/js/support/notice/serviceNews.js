(function() {
    var listTmpl = 
        '<li>' +
            '<a href="{{url}}" class="item">' +
                '<div class="item-image">' +
                    '<img src="{{img.src}}" alt="{{img.alt}}" aria-hidden="true">' +
                '</div>' +
                '<div class="item-conts">' +
                    '{{# if (typeof flag != "undefined" || (typeof fixing != "undefined" && fixing == "Y")) { #}}' +
                    '<div class="flag-wrap">' +
                        '{{# if (typeof fixing != "undefined" && fixing == "Y") { #}}' +
                        '<span class="icon-flag"><span class="blind">최상위 노출</span></span>' +
                        '{{# } #}}' +
                        '{{# if (typeof flag != "undefined") { #}}' +
                        '<span class="flag">{{flag}}</span>' +
                        '{{# } #}}' +
                    '</div>' +
                    '{{# } #}}' +
                    '<p class="tit">{{title}}</p>' +
                    '<ul class="options">' +
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
                var self = this,
                    $contents = $('.contents.service-news');
                
                self.$searchWrap = $contents.find('.search-wrap');
                self.$pagination = $contents.find('.pagination');
                self.$sortsWrap = $contents.find('.sorting-wrap');
                self.$sortTotal = $contents.find('#count');
                self.$sortSelect = $contents.find('.ui_selectbox');
                self.$listWrap = $contents.find('.list-wrap');
                self.$noData = $contents.find('.no-data');

                self.params = {
                    'keyword': self.$searchWrap.find('#keyword').val(),
                    'orderType': self.$sortSelect.eq(0).vcSelectbox('value'),
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

                    self.$searchWrap.find('#keyword').val(self.params['keyword']);
                    self.$sortTotal.html(page.totalCount);                    
                    self.$pagination.pagination('update', page);
                    self.$listWrap.find('ul').empty();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('ul').html(html);
                    
                        self.$listWrap.show();
                        self.$noData.hide();
                    } else {
                        self.$listWrap.hide();
                        self.$noData.show();
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;
                
                self.$searchWrap.find('.btn-search').on('click', function() {
                    self.params = $.extend({}, self.params, {
                        'keyword': self.$searchWrap.find('#keyword').val(),
                        'page': 1
                    });
                    
                    self.searchList();
                });

                self.$sortSelect.on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'orderType': self.$sortSelect.eq(0).vcSelectbox('value'),
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
        
        notice.init();
    });
})();