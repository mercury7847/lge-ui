(function() {
    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                self.$searchWrap = $('div.contents.faq div.cont-wrap div.search-wrap');
                /*
                self.$selectbox = self.$searchWrap.find('select.ui_selectbox');
                var result_wrap = $('div.contents.faq div.cont-wrap div.result-wrap');
                self.$tab = result_wrap.find('div.ui_tab');
                self.$faqList = result_wrap.find('div.ui_accordion');
                self.$pagination = result_wrap.find('div.pagination');
                self.$nodata = result_wrap.find('div.no-data');

                var _self = this;
                vcui.require(['ui/pagination'], function () {
                    _self.bindEvents();
                });
                */
                //_self.searchNewData();
            }
        }

        intergratedSearch.init();
    });
})();