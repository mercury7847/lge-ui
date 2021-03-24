var Curation = (function() {
    //큐레이션 템플릿
    var curationTemplate = '<li><a href="#" class="curation" data-curation="{{curationId}}"><span>{{text}}</span></a></li>';
    var sFilterTemplate = '<li class="row" {{#if hidden}}style="display: none;"{{/if}}>' +
        '<div class="label">{{filterGroupName}}</div>' +
        '<div class="content">' +
            '<div class="fold-box">' +
                '<div class="ui_smooth_scrolltab">' +
                    '<div class="ui_smooth_tab">' +
                        '<div class="chk-group">' +
                            '{{#each (item, idx) in filterValues}}' +
                                '<div class="chk-wrap">' +
                                    '<input type="checkbox" id="{{filterId}}-{{idx}}" name="{{item.filterValueName}}" value="{{item.filterValueId}}" data-filter-id="{{filterId}}">' +
                                    '<label for="{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
                                '</div>' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<button type="button" class="btn-fold"><span class="blind">항목 더보기</span></button>' +
            '</div>' +
        '</div>' +
    '</li>';
    var sFilterResultTemplate = '<li data-filter-id="{{filterId}}" data-filter-value-id="{{filterValueId}}">' +
        '<div class="rounded">' +
            '<span class="text">{{filterValueName}}</span>' +
            '<a href="#sf" class="btn-delete"><span class="blind">선택한 항목 삭제</span></button>' +
        '</div>' +
    '</li>'

    function Curation($targetCuration, smartFilterChangeEventFunc, curationSelectEventFunc) {
        var self = this;
        self._setting($targetCuration, smartFilterChangeEventFunc, curationSelectEventFunc);
        self._bindEvents();
    }

    //public
    Curation.prototype = {
        _setting: function($targetCuration, smartFilterChangeEventFunc, curationSelectEventFunc) {
            var self = this;
            self.$el = $targetCuration;
            self.smartFilterChangeEventFunc = smartFilterChangeEventFunc;
            self.curationSelectEventFunc = curationSelectEventFunc;

            self.$curation = self.$el.find('div.recommended-curation');
            self.$smartFilterList = self.$el.find('div.smart-filter');
            self.$smartFilterResult = self.$smartFilterList.find('div.filter-result');
            self.$smartFilterMore = self.$smartFilterList.find('> .inner > .btn-moreview');
        },

        triggerSmartFilterChangeEvent: function () {
            var self = this;
            var filterData = self.getDataFromSmartFilter();
            self.smartFilterChangeEventFunc(filterData, self._makeFilterData(filterData));
        },

        //선택된 스마트 필터 반환
        getMakeDataFromSmartFilter: function() {
            var self = this;
            var filterData = self.getDataFromSmartFilter();
            return self._makeFilterData(filterData)
        },

        getDataFromSmartFilter: function() {
            var self = this;
            var data = {};
            self.$smartFilterResult.find('li[data-filter-value-id]').each(function(idx, el){
                var filterId = el.dataset.filterId;
                var filterValueId = el.dataset.filterValueId;
                //var tempArray = data[filterId];
                var tempArray = data['data'];
                if(!tempArray) {
                    tempArray = [];
                }
                tempArray.push(filterValueId);
                //data[filterId] = tempArray;
                data['data'] = tempArray;
            });
            return data;
        },

        _makeFilterData: function(data) {
            var makeData = {};
            for(key in data) {
                makeData[key] = data[key].join("||");
            }
            return JSON.stringify(makeData);
        },

        //선택된 큐레이션 반환
        getSelectedCuration: function() {
            var self = this;
            var $li = self.$curation.find('ul.curation-list > li.on');
            if($li.length > 0) {
                return $li.find('a.curation').data('curation');
            }
            return null;
        },

        //이벤트
        _bindEvents: function() {
            var self = this;
            
            //리사이즈할 경우 스마트 필터의 열고닫기 버튼을 새로 계산
            $(window).on('resizeend', function(){
                self.resizeCalcSmartFilter();
            });

            //스마트 큐레이션 아이템 클릭
            self.$curation.on('click', 'a.curation', function(e){
                e.preventDefault();
                var selectCuration = this.dataset.curation;
                
                self.curationSelectEventFunc(selectCuration);
            });

            //스마트필터 리스트 아이템 클릭
            self.$smartFilterList.on('click', 'div input', function(e){
                var checked = this.checked;
                var param = {
                    "filterId": this.dataset.filterId,
                    "filterValueId": this.value,
                    "filterValueName": this.name
                }
                if(checked) {
                    var $findLi = self.$smartFilterResult.find('li[data-filter-value-id="'+param.filterValueId+'"]');
                    if($findLi.length < 1) {
                        self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                        self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                        self.$smartFilterResult.show();
                    }
                } else {
                    self.removeSelectSmartFilterResult(param.filterValueId);
                }

                self.triggerSmartFilterChangeEvent();
            });

            //스마트필터 결과 리스트 아이템 삭제 버튼
            self.$smartFilterResult.on('click', 'a.btn-delete', function(e){
                e.preventDefault();
                var $li = $(this).parents('li');
                var filterValueId = $li.data('filterValueId');
                self.removeSelectSmartFilterResult(filterValueId);

                self.triggerSmartFilterChangeEvent();
            });

            //스마트필터 선택 초기화
            self.$smartFilterResult.on('click', 'button.btn-reset', function(e){
                e.preventDefault();
                self.$smartFilterResult.find('li[data-filter-value-id]').remove();
                self.$smartFilterList.find('input[data-filter-id]').prop('checked',false);
                self.$smartFilterResult.hide();

                self.triggerSmartFilterChangeEvent();
            });

            //스마트필터 더보기
            self.$smartFilterMore.on('click', function(e){
                var isOpen = !self.$smartFilterMore.data('open');
                self.$smartFilterMore.data('open',isOpen);
                var $li = self.$smartFilterList.find('li.row:gt(2)');
                if(isOpen) {
                    if($li.length > 0) {
                        $li.stop().slideDown(function(){
                            self.$smartFilterMore.addClass('unfold');
                            self.$smartFilterMore.find('span').text('필터 접기');
                        });
                    } else {
                        self.$smartFilterMore.addClass('unfold');
                        self.$smartFilterMore.find('span').text('필터 접기');
                    }
                } else {
                    if($li.length > 0) {
                        $li.stop().slideUp(function(){
                            self.$smartFilterMore.removeClass('unfold');
                            self.$smartFilterMore.find('span').text('필터 더보기');
                        });
                    } else {
                        self.$smartFilterMore.removeClass('unfold');
                        self.$smartFilterMore.find('span').text('필터 더보기');
                    }
                }
            });
        },

        setCurationData: function(data) {
            //console.log('set curation',data);
            var self = this;
            var curationData = data.curation;
            if(curationData && curationData.length > 0) {
                var $list_ul = self.$curation.find('ul.curation-list');
                $list_ul.empty();
                curationData.forEach(function(item,index) {
                    $list_ul.append(vcui.template(curationTemplate, item));
                });
                var scrillTab = self.$curation.find('.ui_smooth_scrolltab');
                scrillTab.vcSmoothScrollTab('refresh');
                scrillTab.vcSmoothScrollTab('setTabIndex',-999);
                
                self.$curation.show();
            } else {
                var $list_ul = self.$curation.find('ul.curation-list');
                $list_ul.empty();
                
                self.$curation.hide();
            }

            var smartFilterData = data.smartFilterList;
            if(smartFilterData && smartFilterData.length > 0) {
                var isOpen = self.$smartFilterList.data('open');
                var $list_ul = self.$smartFilterList.find('ul.default');
                $list_ul.empty();
                smartFilterData.forEach(function(item,index) {
                    item.hidden = !isOpen && (index > 2);
                    $list_ul.append(vcui.template(sFilterTemplate, item));
                });

                $list_ul.find('.ui_smooth_scrolltab').vcSmoothScrollTab();
                self.removeSelectSmartFilter();

                self.resizeCalcSmartFilter();

                self.$smartFilterList.off('.fold').on('click.fold','button.btn-fold',function(e){
                    var parent = $(this).parents();
                    if(parent.hasClass('unfold')) {
                        parent.removeClass('unfold');
                    } else {
                        parent.addClass('unfold');
                    }
                });

                self.$smartFilterList.show();
            } else {
                self.removeSelectSmartFilter();
                self.$smartFilterList.hide();
            }

            self.resetSmartFilterMoreButton();
        },

        removeSelectSmartFilter: function() {
            var self = this;
            var $list_ul = self.$smartFilterResult.find('ul.rounded-list');
            $list_ul.empty();

            self.$smartFilterResult.hide();
        },

        removeSelectSmartFilterResult: function(filterValueId) {
            if(filterValueId) {
                var self = this;
                var $findLi = self.$smartFilterResult.find('li[data-filter-value-id="'+filterValueId+'"]');
                if($findLi.length > 0) {
                    $findLi.remove();
                    self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');

                    self.$smartFilterList.find('input[value="'+filterValueId+'"]').prop('checked',false);
                    
                    if(self.$smartFilterResult.find('ul.rounded-list > li').length < 1) {
                        self.$smartFilterResult.hide();
                    }
                }
            }
        },

        addSelectSmartFilterResult: function(filterId, filterValueId) {
            var param = {
                "filterId" : filterId,
                "filterValueId" : filterValueId
            }
            var $findLi = self.$smartFilterResult.find('li[data-filter-value-id="'+param.filterValueId+'"]');
            if($findLi.length < 1) {
                self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                self.$smartFilterResult.show();
            }
        },

        resizeCalcSmartFilter: function() {
            var self = this;
            var $content = self.$smartFilterList.find('div.content');
            $content.each(function(idx, item){
                var $item = $(item);
                var height = $item.find('div.chk-group').outerHeight();
                if(height > 72) {
                    $item.find('button.btn-fold').show();
                } else {
                    $item.find('button.btn-fold').hide();
                }
                
            });
        },

        resetSmartFilterMoreButton: function() {
            var self = this;
            var isOpen = self.$smartFilterMore.data('open');
            if(isOpen) {
                self.$smartFilterMore.addClass('unfold');
                self.$smartFilterMore.find('span').text('필터 접기');
            } else {
                self.$smartFilterMore.removeClass('unfold');
                self.$smartFilterMore.find('span').text('필터 더보기');
            }
            var $li = self.$smartFilterList.find('li.row');
            if($li.length > 3) {
                self.$smartFilterMore.show();
            } else {
                self.$smartFilterMore.hide();
            }
        },

        resetCuration: function(data, triggerFilterChangeEvent) {
            var self = this;

            self.$curation.find('ul.curation-list > li').removeClass('on');
            var $a = self.$curation.find('ul.curation-list > li a[data-curation="' + data + '"]');
            $a.parents('li').addClass('on');
        },

        resetFilter: function(data, triggerFilterChangeEvent) {
            var self = this;

            var filterData = JSON.parse(data);
            if(filterData && filterData.data) {
                var arr = filterData.data.split('||');
                if(arr instanceof Array) {
                    arr.forEach(function(item,index) {
                        var $input = self.$smartFilterList.find('input[value="'+item+'"]');
                        if($input.length > 0) {
                            $input.prop('checked',true);

                            var param = {
                                "filterId": $input.data('filterId'),
                                "filterValueId": $input.val(),
                                "filterValueName": $input.attr('name')
                            }

                            var $findLi = self.$smartFilterResult.find('li[data-filter-value-id="'+param.filterValueId+'"]');
                            if($findLi.length < 1) {
                                self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                                self.$smartFilterResult.show();
                            }
                        }
                    });

                    self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                } else if(typeof arr === 'string' || arr instanceof String){
                    var $input = self.$smartFilterList.find('input[value="'+arr+'"]');
                    if($input.length > 0) {
                        $input.prop('checked',true);

                        var param = {
                            "filterId": $input.data('filterId'),
                            "filterValueId": $input.val(),
                            "filterValueName": $input.attr('name')
                        }

                        var $findLi = self.$smartFilterResult.find('li[data-filter-value-id="'+param.filterValueId+'"]');
                        if($findLi.length < 1) {
                            self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                            self.$smartFilterResult.show();
                        }
                    }

                    self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                }

                if(triggerFilterChangeEvent) {
                    self.triggerFilterChangeEvent();
                }
            }
        }
    }
    return Curation;
})();