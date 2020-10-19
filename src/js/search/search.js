(function() {
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img data-pc-src="{{image_pc_url}}" data-m-src="{{image_m_url}}" alt="{{image_alt}}"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span><span class="price">{{price}}원</span>' +
        '</div></a></li>';
    var recentItemTemplate = '<li><a href="#{{text}}">{{text}}</a><button type="button" class="btn-delete" title="검색어 삭제" data-text="{{text}}"><span class="blind">삭제</span></button></li>';
    var popularItemTemplate = '<li><a href="#{{text}}">{{text}}</a></li>';
    var suggestedTagItemTemplate = '<li><a href="#{{text}}" class="rounded"><span class="text">#{{text}}</span></a></li>';
    var similarTextTemplate = '<a href="#{{text}}" class="similar-text">이것을 찾으셨나요? “{{text}}”</a>'

    var minLength = 2;
    var searchDelay = 2000;
    var searchTimer = null;
    var searchedValue = null;

    $(window).ready(function() {
        varvsearch = {
            init: function() {
                self.$searchLayer = $('div.contents.search div.input-keyword');
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
            
                self.$search_result_area = self.$searchLayer.find('div.search-result-area');
                self.$inputSearchList = self.$search_result_area.find('div.input-result-list');
            
            },

            bindEvents: function() {
                var _self = this;

                //검색창 입력중에는 최근/인기/추천 검색어 숨김
                self.$inputSearch.on('input', function(e){
                    _self.hideAnimation(self.$searchKeywordArea);
                    _self.hideAnimation(self.$searchSimilar);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(searchTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    var searchVal = self.$inputSearch.val();
                    _self.requestSearch(searchVal);
                });

            },
        }
        search.init();
    });
})();

