(function() {
    var minLength = 2;
    var searchDelay = 1000;
    var searchTimer = null;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                self.$searchLayer = $('#layerSearch');
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');

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
                var _self = this;

                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    self.$searchLayer.css({'opacity':0});
                    self.$searchLayer.show();
                    self.$searchLayer.animate({opacity:1},100);
                });

                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    clearTimeout(searchTimer);
                    self.$searchLayer.animate({opacity:0},100,function() {
                        self.$searchLayer.hide();
                    });
                });

                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                  
                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        _self.requestTimerSearch(searchVal);
                    }, searchDelay);
                });
            },

            requestTimerSearch:function(searchValue) {
                var ajaxUrl = self.$searchLayer.attr('data-url-timer');
                console.log(ajaxUrl,searchValue);
            }
        }

        intergratedSearch.init();
    });
})();