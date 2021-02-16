var FilterLayer = (function() {
    //필터 템플릿
    var filterSliderTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont"><div class="range-wrap">' +
                '<div name="{{filterId}}" class="ui_filter_slider ui_price_slider" data-range="0,{{length}}" data-values="{{filterValues}}" data-min="{{minFilterValue}}" data-max="{{maxFilterValue}}"></div>' +
                '<p class="min range-num">{{minTitle}}</p><p class="max range-num">{{maxTitle}}</p>' +
            '</div></div>' +
        '</div>' +
    '</li>';
    var filterRadioTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="rdo-wrap">' +
                    '<input type="radio" name="{{filterId}}" value="{{item.filterValueId}}" id="rdo-{{filterId}}-{{idx}}" {{#if idx==0}}checked{{/if}}>' +
                    '<label for="rdo-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterColorTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap-colorchip {{item.topFilterDisplayName}}">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="color-{{filterId}}-{{idx}}">' +
                    '<label for="color-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterCheckboxTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span>(0)</span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
        '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="chk-{{filterId}}-{{idx}}">' +
                    '<label for="chk-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';

    var filterCategoryTopTemplate = '<li><div class="chk-wrap">' +
        '<input type="checkbox" name="{{filterId}}" id="{{filterId}}-{{index}}" value="{{filterValueId}}">' +
        '<label for="{{filterId}}-{{index}}">{{filterValueName}}</label>'
    '</div></li>'

    function FilterLayer($targetFilter, $categorySelect, $listSorting, $targetFilterButton, filterChangeEventFunc) {
        var self = this;
        self.filterData = null;
        self.resetData = null;
        self.firstLoadTrigger = false;
        self.initLoadEnd = false;
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
    }

    //public
    FilterLayer.prototype = {
        _setting: function($targetFilter, $categorySelect, $listSorting, $targetFilterButton, filterChangeEventFunc) {
            var self = this;
            self.filterChangeEventFunc = filterChangeEventFunc;
            self.$layFilter = $targetFilter;
            self.$targetFilterButton = $targetFilterButton;
            self.$listSorting = $listSorting;
            self.$categorySelect = $categorySelect;
            
            self.$layFilter.find('.ui_filter_slider').vcRangeSlider();
            self.$layFilter.find('.ui_order_accordion').vcAccordion();
            self.$layFilter.find('.ui_filter_accordion').vcAccordion();
        },

        _bindEvents: function() {
            var self = this;

            // 필터 아코디언 오픈시 슬라이더 업데이트
            self.$layFilter.on('accordionexpand', '.ui_filter_accordion',function(e,data){
                if(data.content.find('.ui_filter_slider').length > 0) {
                    data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                }   
            });

            // 필터안 체크박스 이벤트 처리
            self.$layFilter.on('change', '.ui_filter_accordion input', function(e){
                $parent = $(this).parents('li');
                var length = $parent.find('input:checked').length;
                if(length > 0) {
                    $parent.find('span.sel_num').text('('+length+')');
                } else {
                    $parent.find('span.sel_num').text(' (0)');
                }
                self.triggerFilterChangeEvent();
            });

            // 모바일 필터박스 열기
            $('div.btn-filter a').on('click', function(e){
                e.preventDefault();
                self.$layFilter.addClass('open');
                self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);
            });

            // 모바일 필터박스 닫기
            $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                e.preventDefault();
                self.$layFilter.removeClass('open');
            });

            // 모바일 필터박스 확인
            self.$layFilter.find('div.filter-btn-wrap button').on('click', function(e){
                self.$layFilter.removeClass('open');
                self.triggerFilterChangeEvent();
            });

            // 초기화버튼 이벤트 처리
            self.$layFilter.on('click', 'div.btn-reset button', function(e){
                self.resetFilter();
                self.triggerFilterChangeEvent();
            });

            //품절상품 확인
            self.$listSorting.on('change', 'input[type="checkbox"]', function(e){
                self.triggerFilterChangeEvent();
            });

            //리스트 정렬 선택시 필터의 정렬 값도 선택하게함
            self.$listSorting.find('.ui_selectbox').on('change', function(e,data){
                //var value = e.target.value;
                //self.$layFilter.find('input[name="sorting"][value="'+ value +'"]').prop('checked', true);
                self.triggerFilterChangeEvent();
            });


            // 필터의 정렬 선택시 리스트의 정렬값도 선택하게 함
            /*
            self.$layFilter.find('.ui_order_accordion div.ui_accord_content').on('change', 'input[name="sorting"]',function(e){
                var idx = $('input[name="sorting"]').index(this);
                var $target = self.$listSorting.find('.ui_selectbox');
                $target.vcSelectbox('selectedIndex', idx, false);
                self.triggerFilterChangeEvent();
            });
            */

            //검색내 검색 버튼
            var listSortingSearchin = self.$listSorting.find('div.search-inner button');
            if(listSortingSearchin.length > 0) {
                listSortingSearchin.on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    $input.attr('data-searchvalue', searchIn);
                    self.triggerFilterChangeEvent();
                });
            }

            //필터의 검색내 검색 버튼
            var filterSearchin = self.$layFilter.find('div.search-inner button');
            if(filterSearchin.length > 0) {
                filterSearchin.on('click',function(e){
                    var $input = $(this).siblings('input');
                    var searchIn = $input.val();
                    $input.attr('data-searchvalue', searchIn);
                    if(listSortingSearchin.length > 0) {
                        var $listInput = listSortingSearchin.siblings('input');
                        $listInput.attr('data-searchvalue', searchIn);
                        console.log($listInput);
                    }
                    self.triggerFilterChangeEvent();
                });
            }

            // 서브카테고리 이벤트 처리 
                //$('input[name="categoryCheckbox"]').trigger('change', true);

            if(self.$categorySelect) {
                self.$categorySelect.on('change', 'input', function(e, noRequest){
                    self.triggerFilterChangeEvent();
                });
            }

            self._filterBindCustomEvents();
        },

        _filterUnbindCustomEvents: function() {
            var self = this;
            if(!self.$layFilter) {
                return;
            }
            // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
            self.$layFilter.find('.ui_filter_slider').off('rangesliderinit rangesliderchange rangesliderchanged');
        },

        //커스텀 필터 이벤트 (필터 리스트를 새로 그리면 매번 실행할것)
        _filterBindCustomEvents: function() {
            var self = this;
            if(!self.$layFilter) {
                return;
            }
            // 필터안 슬라이더 이벤트 처리 (가격, 사이즈,..)
            self.$layFilter.find('.ui_filter_slider').on('rangesliderinit rangesliderchange rangesliderchanged', function (e, data) {
                $(e.currentTarget).siblings('.min').text(vcui.number.addComma(data.minValue.title));
                $(e.currentTarget).siblings('.max').text(vcui.number.addComma(data.maxValue.title));
                if(e.type=='rangesliderchanged'){
                    $(this).attr({'data-min':data.minValue.value,'data-max':data.maxValue.value})
                    self.triggerFilterChangeEvent();
                }
            });
        },

        triggerFilterChangeEvent: function () {
            var self = this;
            self.filterChangeEventFunc(self.getDataFromFilter());
        },

        getDataFromFilter: function() {
            var self = this;
            var $btnFilter = self.$targetFilterButton;
            
            var data = {};
            self.$listSorting.find('input').each(function(idx, el){
                switch(el.type) {
                    case "checkbox":
                        data[el.name] = el.checked ? "Y" : "N";
                        break;
                    case "text":
                        var value = $(el).attr('data-searchValue');
                        if(value) {
                            data[el.name] = value;
                        }
                        break;
                    default:
                        break;
                }
            });

            self.$listSorting.find('.ui_selectbox').each(function(idx, el){
                data[el.name] = $(el).vcSelectbox('selectedOption').value;
            });
            
            var filterData = {};
            var selectedFilter = false;
            self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                var $el = $(el);
                var values = JSON.parse($el.attr('data-values'));
                var min = $el.attr('data-min');
                var max = $el.attr('data-max');
                var tempArray = values.slice(min,parseInt(max)+1).map(function(a) {
                    return a.filterValue;
                });
                if(tempArray.length != values.length) {
                    selectedFilter = true;
                    filterData[$el.attr('name')] = tempArray;
                }
            });

            self.$layFilter.find('.ui_filter_accordion input').each(function(idx, el){
                if(el.checked) {
                    if(!(el.value == null || el.value.trim().length == 0)) {
                        var tempArray = filterData[el.name];
                        if(!tempArray) {
                            tempArray = [];
                        }
                        tempArray.push(el.value);
                        filterData[el.name] = tempArray;
                        selectedFilter = true;
                    }
                }
            });

            //top 카테고리
            if(self.$categorySelect) {
                var items = self.$categorySelect.find('li input:checked');
                items.each(function(idx, el){
                    var tempArray = filterData[el.name];
                    if(!tempArray) {
                        tempArray = [];
                    }
                    tempArray.push(el.value);
                    filterData[el.name] = tempArray;
                });
            }

            if(selectedFilter) {
                $btnFilter.addClass('applied');
                $btnFilter.find('a span').text('옵션 적용됨');
                self.$layFilter.find('div.btn-reset button').show();
            } else {
                $btnFilter.removeClass('applied');
                $btnFilter.find('a span').text('옵션필터');
                self.$layFilter.find('div.btn-reset button').hide();
            }

            data["filterData"] = JSON.stringify(filterData);
            return data;
        },

        updateFilter: function(data) {
            var self = this;
            
            if(!self.initLoadEnd) {
                self.filterData = data;
                return;
            }

            self.$layFilter.css('display', '');
            self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);

            var arr = data instanceof Array ? data : [];
            if(arr.length > 0) {

                self._filterUnbindCustomEvents();

                var $list_ul = self.$layFilter.find('div.ui_filter_accordion > ul');
                $list_ul.empty();
                arr.forEach(function(item, index) {
                    item.index = index;
                    var length = item.filterList instanceof Array ? item.filterList.length : 0;
                    item.length = (length > 0) ? (length - 1) : 0;
                    item.filterValues.forEach(function(obj, idx){
                        if(obj.count) {
                            obj.count = vcui.number.addComma(obj.count);
                        } else {
                            obj.count = null;
                        }
                    });

                    switch(item.filterType) {
                        case "range":
                            hasSlider = true;
                            item.filterValues.forEach(function(obj, idx){
                                obj.value = ("" + idx);
                                obj.filterValue = obj.filterValueId;
                                obj.title = obj.filterValueName;
                                item.maxTitle = obj.title;
                                item.maxFilterValue = ""+idx;
                                if(idx == 0) {
                                    item.minTitle = obj.title;
                                    item.minFilterValue = "0";
                                }
                            });
                            item.filterValues = JSON.stringify(item.filterValues);
                            $list_ul.append(vcui.template(filterSliderTemplate, item));
                            break;
                        case "radio":
                            $list_ul.append(vcui.template(filterRadioTemplate, item));
                            break;
                        case "color":
                            $list_ul.append(vcui.template(filterColorTemplate, item));
                            break;
                        case "checkbox":
                            $list_ul.append(vcui.template(filterCheckboxTemplate, item));
                            break;
                        default: {
                                switch(item.filterGroupType){
                                    case "sub_category":
                                        if(lgkorUI.stringToBool(item.topFilterFlag) && self.$categorySelect) {
                                            var $list_category = self.$categorySelect.find('ul');
                                            $list_category.empty();
                                            item.filterValues.forEach(function(obj, idx){
                                                obj.filterId = item.filterId;
                                                obj.index = idx;
                                                $list_category.append(vcui.template(filterCategoryTopTemplate, obj));
                                            });
                                            self.$categorySelect.vcSmoothScrollTab('refresh');
                                        }
                                        break;
                                    case "color":
                                        $list_ul.append(vcui.template(filterColorTemplate, item));
                                        break;
                                    default:
                                        break;
                                }
                            }
                            break;
                    }
                });
            }

            self._filterBindCustomEvents();

            //필터를 초기화 했으니 필터리셋버튼 숨김
            self.$layFilter.find('div.btn-reset button').hide();
        },

        resetFilter: function(data, triggerFilterChangeEvent) {
            var self = this;
            
            if(!self.initLoadEnd) {
                self.resetData = data;
                self.firstLoadTrigger = triggerFilterChangeEvent;
                return;
            }

            /*
            //필터 정렬박스
            self.$layFilter.find('input[name="sorting"]:eq(0)').prop('checked', true);

            //리스트 정렬박스
            var $target = self.$listSorting.find('.ui_selectbox');
            $target.vcSelectbox('selectedIndex', 0, false);

            //솔드아웃 버튼
            self.$listSorting.find('input[type="checkbox"]').prop('checked', false);

            //검색내 검색어
            self.$listSorting.find('div.search-inner input').attr('data-searchvalue', '').val('');
            */
            
            self.$layFilter.find('div.search-inner input').val('');

            //필터 슬라이더
            self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                var $el = $(el);
                var values = JSON.parse($el.attr('data-values'));
                var min = 0;
                var max = values.length - 1;
                $el.attr('data-min',(min+""));
                $el.attr('data-max',(max+""));
                $el.vcRangeSlider('reset',min+','+max);
            });

            //필터 라디오버튼
            self.$layFilter.find('.ui_filter_accordion input[type="radio"]:eq(0)').each(function(idx, el){
                $(el).prop('checked', true);
            });

            //필터 체크박스
            self.$layFilter.find('.ui_filter_accordion input[type="checkbox"]').each(function(idx, el){
                $(el).prop('checked', false);
            });

            if(!(vcui.isEmpty(data))) {
                /*
                //필터 슬라이더
                self.$layFilter.find('.ui_filter_slider').each(function(idx, el){
                    var $el = $(el);
                    var values = JSON.parse($el.attr('data-values'));
                    var min = 0;
                    var max = values.length - 1;
                    $el.attr('data-min',min);
                    $el.attr('data-max',max);
                    $el.vcRangeSlider('reset',min+','+max);
                });

                //필터 라디오버튼
                self.$layFilter.find('.ui_filter_accordion input[type="radio"]:eq(0)').each(function(idx, el){
                    $(el).prop('checked', true);
                });

                //필터 체크박스
                self.$layFilter.find('.ui_filter_accordion input[type="checkbox"]').each(function(idx, el){
                    $(el).prop('checked', false);
                });
                */
                var selectedFilter = false;
                var $btnFilter = self.$targetFilterButton;

                for(key in data){
                    var findRange = self.$layFilter.find('.ui_filter_slider[name="'+key+'"]');
                    if(findRange.length > 0) {
                        selectedFilter = true;
                        var item = data[key];
                        var tempArray = [];
                        item.forEach(function(val, index) {
                            var findDm = findRange.find('li[data-filtervalue="'+val+'"]');
                            if(findDm.length > 0) {
                                tempArray.push(findDm.index());
                            }
                        });
                        var min = vcui.array.min(tempArray);
                        var max = vcui.array.max(tempArray);
                        findRange.attr('data-min',(min+""));
                        findRange.attr('data-max',(max+""));
                        findRange.vcRangeSlider('reset',min+','+max);
                        var index = findRange.parents('li').index();
                        findRange.parents('.ui_filter_accordion').vcAccordion('expand',index);
                    } else {
                        //check or radio
                        var item = data[key];
                        item.forEach(function(val, index) {
                            var findDm = self.$layFilter.find('.ui_filter_accordion input[value="'+val+'"]');
                            if(findDm.length > 0) {
                                selectedFilter = true;
                                findDm.prop('checked', true);
                                var index = findDm.parents('li').index();
                                findDm.parents('.ui_filter_accordion').vcAccordion('expand',index);
                            }
                        });

                        //check top Category
                        if(self.$categorySelect) {
                            var findCategory = self.$categorySelect.find('input[name="'+key+'"]');
                            if(findCategory.length > 0) {
                                findCategory.prop('checked', false);
                                item.forEach(function(val, index) {
                                    var findInput = self.$categorySelect.find('input[name='+key+'][value='+val+']');
                                    findInput.prop('checked', true);
                                });
                            }
                        }
                    }
                }

                if(selectedFilter) {
                    $btnFilter.addClass('applied');
                    $btnFilter.find('a span').text('옵션 적용됨');
                    self.$layFilter.find('div.btn-reset button').show();
                } else {
                    $btnFilter.removeClass('applied');
                    $btnFilter.find('a span').text('옵션필터');
                    self.$layFilter.find('div.btn-reset button').hide();
                }
            }

            if(triggerFilterChangeEvent) {
                self.triggerFilterChangeEvent();
            }
        },
    }
    return FilterLayer;
})();