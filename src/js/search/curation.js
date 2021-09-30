var Curation = (function() {
    //큐레이션 템플릿
    var curationTemplate = '<li><a href="#" class="curation" data-curation="{{curationId}}"><span>{{text}}</span></a></li>';
    // BTOCSITE-1716 스마트필터와 상세필터 합치기 : 모바일일때 동시에 노출되는 checkbox 값 때문에 id와 lable 앞에 smart- 처리
    var sFilterTemplate = '<li class="row" {{#if hidden}}style="display: none;"{{/if}}>' +
        '<div class="label">{{filterGroupName}}</div>' +
        '<div class="content">' +
            '<div class="fold-box">' +
                '<div class="ui_smooth_scrolltab">' +
                    '<div class="ui_smooth_tab">' +
                        '<div class="chk-group">' +
                            '{{#each (item, idx) in filterValues}}' +
                                '<div class="chk-wrap">' +
                                    '<input type="checkbox" id="smart-{{filterId}}-{{idx}}" name="{{item.filterValueName}}" value="{{item.filterValueId}}" data-filter-id="{{filterId}}">' +
                                    '<label for="smart-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
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

            console.log("triggerSmartFilterChangeEvent filterdata %o",filterData);
            self.smartFilterChangeEventFunc(filterData, self._makeFilterData(filterData));
        },

        //선택된 스마트 필터 반환
        // getMakeDataFromSmartFilter: function() {
        //     var self = this;
        //     var filterData = self.getDataFromSmartFilter();
        //     return self._makeFilterData(filterData)
        // },

        getDataFromSmartFilter: function() {
            var self = this;
            var data = {};

            console.log("getDataFromSmartFilter %o",self.$smartFilterResult);
            self.$smartFilterResult.find('li[data-filter-value-id]').each(function(idx, el){
                var filterId = el.dataset.filterId;
                var filterValueId = el.dataset.filterValueId;
                var tempArray = data[filterId];
                //var tempArray = data['data'];
                if(!tempArray) {
                    tempArray = [];
                }
                tempArray.push(filterValueId);

                data[filterId] = tempArray;
                //data['data'] = tempArray;
            });

            console.log("스마트 필터 데이터 %o",data);
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
                var $li = $(this).parents('li');
                var isSelected = $li.hasClass('select-curation');
                var selectCuration = null;
                if(isSelected) {
                    $li.removeClass('on select-curation');
                } else {
                    $li.addClass('on select-curation');
                    selectCuration = this.dataset.curation;
                }

                self.curationSelectEventFunc(selectCuration);
            });

            //스마트필터 리스트 아이템 클릭
            self.$smartFilterList.on('click', 'div input', function(e){
                console.log("curation 클릭");
                var checked = this.checked;
                var param = {
                    "filterId": this.dataset.filterId,
                    "filterValueId": this.value,
                    "filterValueName": this.name
                }
                if(checked) {
                    var $findLi = self.$smartFilterResult.find("li[data-filter-value-id='"+param.filterValueId+"']");
                    if($findLi.length < 1) {
                        self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                        self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                        // self.$smartFilterResult.show();
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
                // self.$smartFilterResult.hide();


                // BTOCSITE-1716 
                if($('.lay-filter').hasClass('smart-type')) {
                    $('.lay-filter.smart-type').find('div.btn-reset button').show();
                }


                // BTOCSITE-1716 
                if($('.lay-filter').hasClass('smart-type')) {
                    $('.lay-filter.smart-type').find('div.btn-reset button').show();
                }

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

            console.log("setCurationData 초기 %o",data);
            var self = this;
            var curationData = data.curation;
            if(curationData && curationData.length > 0) {
                var $list_ul = self.$curation.find('ul.curation-list');
                $list_ul.empty();
                curationData.forEach(function(item,index) {
                    $list_ul.append(vcui.template(curationTemplate, item));
                });
                var scrillTab = self.$curation.find('.ui_smooth_scrolltab');

                scrillTab.vcSmoothScrollTab('setTabIndex',-999);
                
                setTimeout(function(){
                    scrillTab.vcSmoothScrollTab('refresh');
                },10);
                
                self.$curation.show();
            } else {
                var $list_ul = self.$curation.find('ul.curation-list');
                $list_ul.empty();
                
                self.$curation.hide();
            }

            self.smartFilterCnt = data.smartFilterList.count || 0;
            var smartFilterData = data.smartFilterList.data;
            if(smartFilterData && smartFilterData.length > 0) {
               
                var isOpen = self.$smartFilterList.data('open');
                var $list_ul = self.$smartFilterList.find('ul.default');
                $list_ul.empty();
                smartFilterData.forEach(function(item,index) {
                    item.hidden = !isOpen && (index > 2);
                    $list_ul.append(vcui.template(sFilterTemplate, item));
                });

                setTimeout(function(){
                    $list_ul.find('.ui_smooth_scrolltab').vcSmoothScrollTab();
                },10);
                
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
                // BTOCSITE-1716
                // self.$smartFilterList.show();
            } else {
                self.removeSelectSmartFilter();
                // BTOCSITE-1716
                // self.$smartFilterList.hide();
            }

            self.resetSmartFilterMoreButton(self.$smartFilterMore.data('open'));
        },

        removeSelectSmartFilter: function() {
            var self = this;
            var $list_ul = self.$smartFilterResult.find('ul.rounded-list');
            $list_ul.empty();

            // self.$smartFilterResult.hide();
        },

        removeSelectSmartFilterResult: function(filterValueId) {
            if(filterValueId) {
                var self = this;
                var $findLi = self.$smartFilterResult.find("li[data-filter-value-id='"+filterValueId+"']");
                if($findLi.length > 0) {
                    $findLi.remove();
                    self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');

                    self.$smartFilterList.find("input[value='"+filterValueId+"']").prop('checked',false);
                    
                    // if(self.$smartFilterResult.find('ul.rounded-list > li').length < 1) {
                    //     self.$smartFilterResult.hide();
                    // }
                }
            }
        },

        addSelectSmartFilterResult: function(filterId, filterValueId) {
            var param = {
                "filterId" : filterId,
                "filterValueId" : filterValueId
            }
            var $findLi = self.$smartFilterResult.find("li[data-filter-value-id='"+param.filterValueId+"']");
            if($findLi.length < 1) {
                self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                // self.$smartFilterResult.show();

                // BTOCSITE-1716
                if($('.lay-filter').hasClass('smart-type')) {
                    $('.lay-filter.smart-type').find('div.btn-reset button').show();
                }
                

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

        resetSmartFilterMoreButton: function(open) {
            var self = this;
            self.$smartFilterMore.data('open',open);
            if(open) {
                self.$smartFilterMore.addClass('unfold');
                self.$smartFilterMore.find('span').text('필터 접기');
            } else {
                self.$smartFilterMore.removeClass('unfold');
                self.$smartFilterMore.find('span').text('필터 더보기');
            }
            var $li = self.$smartFilterList.find('li.row');
            if($li.length > 3) {
                self.$smartFilterMore.css('display','block');
            } else {
                self.$smartFilterMore.css('display','none');
            }

            $li = self.$smartFilterList.find('li.row:gt(2)');
            if(open && $li.length > 0) {
                $li.stop().slideDown();
            }
        },

        resetCuration: function(data, triggerFilterChangeEvent) {
            console.log("curation resetCuration");
            var self = this;

            self.$curation.find('ul.curation-list > li').removeClass('on');
            var $a = self.$curation.find("ul.curation-list > li a[data-curation='" + data + "']");
            $a.parents('li').addClass('on select-curation');
        },

        resetFilter: function(data, triggerFilterChangeEvent) {
  

            var self = this;

            var filterData = JSON.parse(data);
            console.log("curation resetFilter %o",filterData);

            if(filterData) {

                var maxIndex = 0;
                for(key in filterData) {
                    var arr = filterData[key].split('||');
                    if(arr instanceof Array) {
                        arr.forEach(function(item,index) {
                            var $input = self.$smartFilterList.find("input[value='"+item+"']");
                            if($input.length > 0) {
                                $input.prop('checked',true);
    
                                var param = {
                                    "filterId": $input.data('filterId'),
                                    "filterValueId": $input.val(),
                                    "filterValueName": $input.attr('name')
                                }
    
                                var $findLi = self.$smartFilterResult.find("li[data-filter-value-id='"+param.filterValueId+"']");
                                if($findLi.length < 1) {
                                    self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                                    // self.$smartFilterResult.show();

                                    // BTOCSITE-1716
                                    if($('.lay-filter').hasClass('smart-type')) {
                                        $('.lay-filter.smart-type').find('div.btn-reset button').show();
                                    }
                                    
                                }

                                var parent = $input.parents('li.row');
                                if(parent.index() > maxIndex) {
                                    maxIndex = parent.index();
                                }
                            }
                        });
    
                        self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                    } else if(typeof arr === 'string' || arr instanceof String){
                        var $input = self.$smartFilterList.find("input[value='"+arr+"']");
                        if($input.length > 0) {
                            $input.prop('checked',true);
    
                            var param = {
                                "filterId": $input.data('filterId'),
                                "filterValueId": $input.val(),
                                "filterValueName": $input.attr('name')
                            }
    
                            var $findLi = self.$smartFilterResult.find("li[data-filter-value-id='"+param.filterValueId+"']");
                            if($findLi.length < 1) {
                                self.$smartFilterResult.find('ul.rounded-list').append(vcui.template(sFilterResultTemplate, param));
                                // self.$smartFilterResult.show();

                                // BTOCSITE-1716
                                if($('.lay-filter').hasClass('smart-type')) {
                                    $('.lay-filter.smart-type').find('div.btn-reset button').show();
                                }
                            }

                            var parent = $input.parents('li.row');
                            if(parent.index() > maxIndex) {
                                maxIndex = parent.index();
                            }
                        }
                        self.$smartFilterResult.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                    }

                    if(maxIndex > 2) {
                        this.resetSmartFilterMoreButton(true);
                    }
                }


                console.log("curation resetFilter smart-type %o",$('.lay-filter.smart-type'))
                // BTOCSITE-1716 좌측 스마트 필터 리셋              
                if($('.lay-filter').hasClass('smart-type')) {
                    var cntArray = [];
                    var $filterChecked = $('.smart-filter .filter-list input:checked');
                    $('.lay-filter.smart-type input').prop("checked", false);
                    $filterChecked.each(function(){
                        $('.lay-filter.smart-type input[value="'+$(this).val()+'"]').prop("checked", true);
                        cntArray = cntArray.concat($(this).val().split(','));
                    })

                    cntArray = cntArray.filter(function(item,index){
                        return cntArray.indexOf(item) === index;
                    });

                    var cnt = cntArray.length ||  self.smartFilterCnt;
                    $(".lay-filter .filter-head h1").html('필터<span>'+cnt+'개 제품</span>');


                    // 필터 더보기 클래스 붙히기
                    if($filterChecked.length >  0) {
                        $('.smart-filter .btn-filter').addClass('applied');
                    } else {
                        $('.smart-filter .btn-filter').removeClass('applied');
                    }

                    
                }
               

                if(triggerFilterChangeEvent) {
                    self.triggerFilterChangeEvent();
                }
            }
        }
    }
    return Curation;
})();