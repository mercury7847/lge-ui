(function() {
    var minLength = 2;
    var searchDelay = 1000;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                var searchLayer = $('div.contents.search div.search-layer');
                self.$inputSearch = searchLayer.find('div.input-sch input.txt');

                var _self = this;
                _self.bindEvents();

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
            },

            bindEvents: function() {
                var searchTimer = null;
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        console.log('timeOut',searchVal);
                    }, searchDelay);
                });
            },

            requestTimerSearch:function(searchValue) {
                var ajaxUrl = self.$searchWrap.attr('data-url');
            }
        }

        intergratedSearch.init();
    });
})();