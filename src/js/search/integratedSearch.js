(function() {
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>'; 
    var minLength = 2;
    var searchDelay = 1000;
    var searchTimer = null;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                self.$searchLayer = $('#layerSearch');
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                self.$buttonClearSearch = self.$searchLayer.find('div.input-sch button.btn-delete');
                var $search_result_area = self.$searchLayer.find('div.search-result-area');
                self.$inputSearchList = $search_result_area.find('div.input-result-list');

                self.$inputSearchList.hide();

                var _self = this;
                _self.bindEvents();

                /*
                var _self = this;
                vcui.require(['ui/pagination'], function () {
                    _self.bindEvents();
                });
                */
                //_self.searchNewData();
                /*
                vcui.require(['ui/inputClearButton'], function () {
                    self.$inputSearch.vcInputClearButton();
                });
                */
            },

            bindEvents: function() {
                var _self = this;

                //통합검색 노출
                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    _self.showAnimation(self.$searchLayer);
                });

                //통합검색 닫음
                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    clearTimeout(searchTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    _self.hideAnimation(self.$searchLayer);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                    _self.hideAnimation(self.$inputSearchList);
                  
                    var searchVal = this.value;
                    if(searchVal.length > 0) {

                    }

                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        _self.requestTimerSearch(searchVal);
                    }, searchDelay);
                });
            },

            showAnimation:function($item) {
                $item.css({'opacity':0});
                $item.show();
                $item.animate({opacity:1},100);
            },

            hideAnimation:function($item) {
                $item.animate({opacity:0},100,function() {
                    $item.hide();
                });
            },

            requestTimerSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$searchLayer.attr('data-url-timer');
                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var searchInput = d.param.input;
                    var replaceText = '<span class="search-word">' + searchInput + '</span>';

                    var data = d.data instanceof Array ? d.data : [];
                    var arr = [];
                    data.forEach(function(item, index) {
                        arr.push({"input":item, "text":item.replace(searchInput,replaceText)});
                    });

                    var $list_ul = self.$inputSearchList.find('ul');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(inputSearchListItemTemplate, item));
                    });
                    _self.showAnimation(self.$inputSearchList);
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        }

        intergratedSearch.init();
    });
})();