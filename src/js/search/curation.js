var Curation = (function() {
    //큐레이션 템플릿
    var curationTemplate = '<li><a href="#{{curationId}}" class="curation"><span>{{text}}</span></a></li>';
    var sFilterTemplate = '<li class="row">' +
        '<div class="label">{{filterGroupName}}</div>' +
        '<div class="content">' +
            '<div class="fold-box">' +
                '<div class="chk-group">' +
                    '{{#each (item, idx) in  filterValues}}' +
                        '<div class="chk-wrap">' +
                            '<input type="checkbox" id="{{filterId}}-{{idx}}" name="{{filterId}}" value="{{item.filterValueId}}">' +
                            '<label for="{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
                        '</div>' +
                    '{{/each}}' +
                '</div>' +
                '<button type="button" class="btn-fold"><span class="blind">항목 더보기</span></button>' +
                '</div>' +
        '</div>' +
    '</li>';

    function Curation($targetCuration) {
        var self = this;
        /*
        vcui.require(['ui/rangeSlider', 'ui/accordion'], function () {
            self._setting($targetFilter, $categorySelect, $listSorting, $targetFilterButton, filterChangeEventFunc);
            self._bindEvents();
            self.initLoadEnd = true;
            if(self.filterData) {
                self.filterData = vcui.array.filter(self.filterData, function(item, idx){
                    return item.filterValues && item.filterValues.length > 0;
                });
                self.updateFilter(self.filterData);
            }
            if(self.resetData) {
                self.resetFilter(self.resetData, self.firstLoadTrigger);
            }
        });
        */
    }

    //public
    Curation.prototype = {
        _setting: function($targetCuration) {
            var self = this;
            self.$el = $targetCuration;
            self.$curation = self.$el.find('div.recommended-curation');
            self.$smartFilterList = self.$el.find('div.smart-filter');
            self.$smartFilterResult = self.$smartFilterList.find('div.filter-result');
        },

        _bindEvents: function() {
            var self = this;
        }
    }
    return Curation;
})();