var FilterLayer = (function() {
    //필터 템플릿
    var filterSliderTemplate = '<li data-filterId="{{filterId}}" class="filter-slider-tag">' +
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
                    '<input type="radio" name="{{filterId}}" value="{{item.filterValueId}}" id="rdo-{{filterId}}-{{idx}}" data-contents="{{#raw filterGroupName}}" {{#if idx==0}}checked{{/if}}>' + //BTOCSITE-1057 : data-contents 추가 2021-08-09
                    '<label for="rdo-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterColorTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span></span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
            '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap-colorchip {{item.topFilterDisplayName}}">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="color-{{filterId}}-{{idx}}" data-contents="{{#raw filterGroupName}}">' + //BTOCSITE-1057 : data-contents 추가 2021-08-09
                    '<label for="color-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    var filterCheckboxTemplate = '<li data-filterId="{{filterId}}">' +
        '<div class="head">' +
            '<a href="#{{filterId}}-{{index}}" class="link-acco ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<div class="tit">{{filterGroupName}}<span class="sel_num"><span class="blind">총 선택 갯수 </span></span></div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="desc ui_accord_content" id="{{filterId}}-{{index}}">' +
        '<div class="cont">' +
                '{{#each (item, idx) in filterValues}}<div class="chk-wrap">' +
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="chk-{{filterId}}-{{idx}}" data-contents="{{#raw filterGroupName}}">' + //BTOCSITE-1057 : data-contents 추가 2021-08-09
                    '<label for="chk-{{filterId}}-{{idx}}">{{item.filterValueName}}{{#if item.count}} ({{item.count}}){{/if}}</label>' +
                '</div>{{/each}}' +
            '</div>' +
        '</div>' +
    '</li>';
    /* BTOCSITE-2785 : add 2021-07-16 */
    var filterCategoryTopTemplate = '<li data-productTarget="s{{index}}">' +
            '<div class="rdo-wrap">' +
                '<input type="radio" name="{{filterId}}" id="{{filterId}}-{{index}}" value="{{filterValueId}}">' +
                '<label for="{{filterId}}-{{index}}">{{filterValueName}}</label>'+
            '</div>' +
        '</li>';
    /* //BTOCSITE-2785 : add 2021-07-16 */
    function FilterLayer($targetFilter, $categorySelect, $listSorting, $targetFilterButton, unfoldFlagName, filterChangeEventFunc) {
        var self = this;
        self.cid = vcui.getUniqId(8);
        self.filterData = null;
        self.resetData = null;
        self.firstLoadTrigger = false;
        self.initLoadEnd = false;
        vcui.require(['ui/rangeSlider', 'ui/accordion'], function () {
            self._setting($targetFilter, $categorySelect, $listSorting, $targetFilterButton, unfoldFlagName, filterChangeEventFunc);
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
        _setting: function($targetFilter, $categorySelect, $listSorting, $targetFilterButton, unfoldFlagName, filterChangeEventFunc) {
            var self = this;
            self.filterChangeEventFunc = filterChangeEventFunc;
            self.$layFilter = $targetFilter;
            self.$targetFilterButton = $targetFilterButton;
            self.$listSorting = $listSorting;
            self.$categorySelect = $categorySelect;
            self.unfoldFlagName = unfoldFlagName;
            
            self.$layFilter.find('.ui_filter_slider').vcRangeSlider();
            self.$layFilter.find('.ui_order_accordion').vcAccordion();
            self.$layFilter.find('.ui_filter_accordion').vcAccordion();
        },

        _bindEvents: function() {
            var self = this;
            console.log()

            // 필터 아코디언 오픈시 슬라이더 업데이트
            self.$layFilter.on('accordionexpand', '.ui_filter_accordion',function(e,data){
                if(data.content.find('.ui_filter_slider').length > 0) {
                    data.content.find('.ui_filter_slider').vcRangeSlider('update', true);
                }
            });
            self.$layFilter.on()
            
            // self.$openFilterDefault();

            // 필터안 체크박스 이벤트 처리
            self.$layFilter.on('change', '.ui_filter_accordion input', function(e){
                /*
                var $parent = $(this).parents('li');
                var length = $parent.find('input:checked').length;
                if(length > 0) {
                    $parent.find('span.sel_num').text(' ('+length+')');
                } else {
                    $parent.find('span.sel_num').text(' (0)');
                }
                */
                self.resetSelectFilterCount(this);
                self.triggerFilterChangeEvent();
            });

            // 모바일 필터박스 열기
            $('div.btn-filter a').on('click', function(e){
                e.preventDefault();
                
                self.$layFilter.addClass('open');
                self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);

                lgkorUI.addHistoryBack(self.cid, function(){    
                    $('.plp-filter-wrap .filter-close button').trigger('click'); 
                });

                $('html, body').css({
                    overflow:"hidden"
                });
            });

            // 모바일 필터박스 닫기
            $('.plp-filter-wrap').on('click', '.filter-close button',function(e){
                e.preventDefault();
                self.$layFilter.removeClass('open');
                
                lgkorUI.removeHistoryBack(self.cid);

                $('html, body').css({
                    overflow:"visible"
                });
            });
            // BTOCSITE-2161 :: dim 클릭시 모바일 필터박스 닫기
            self.$layFilter.find('.dimmed').on('click', function(e){
                e.preventDefault();
                self.$layFilter.removeClass('open');
                
                lgkorUI.removeHistoryBack(self.cid);

                $('html, body').css({
                    overflow:"visible"
                });
            });

            // 모바일 필터박스 확인
            self.$layFilter.find('div.filter-btn-wrap button').on('click', function(e){
                self.$layFilter.removeClass('open');
                $('html, body').css({
                    overflow:"visible"
                });
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
                    self.$layFilter.removeClass('open');
                });

                listSortingSearchin.siblings('input').keydown(function(key) {
                    if (key.keyCode == 13) {
                        key.preventDefault();
                        listSortingSearchin.trigger('click');
                    }
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
                    }
                    self.triggerFilterChangeEvent();
                    self.$layFilter.removeClass('open');
                });

                filterSearchin.siblings('input').keydown(function(key) {
                    if (key.keyCode == 13) {
                        key.preventDefault();
                        filterSearchin.trigger('click');
                    }
                });
            }

            // 서브카테고리 이벤트 처리 
                //$('input[name="categoryCheckbox"]').trigger('change', true);

            if(self.$categorySelect) {
                self.$categorySelect.on('change', 'input', function(e, noRequest){
                    self.triggerFilterChangeEvent();

                    //console.log('li' , $(e.currentTarget).closest('li').trigger('click'));
                });
            }

            self._filterBindCustomEvents();
        },

        //BTOCSITE-1396 검색 > PC > 상세필터 > "카테고리"를 디폴트 펼침
        _filterDefaultOpen:function () {
            var $searchTab = $('.contents.search .search-tabs-wrap .tabs');
            var $list = $searchTab.find('li');
            var $currentList = $list.filter('.on');
            var labelName = $currentList.attr('data-label');

            if( labelName == "케어용품/소모품" || labelName == "제품" || labelName == "고객지원") {
                var $category = $('.contents.search .ui_filter_accordion');
                $category.vcAccordion("expandAll");
            }
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
                    if(el.value && el.value.length > 0) {
                        var tempArray = filterData[el.name];
                        if(!tempArray) {
                            tempArray = [];
                        }
                        tempArray.push(el.value);
                        filterData[el.name] = tempArray;
                    }
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
            if(!(data instanceof Array)) return;
            
            var self = this;
            
            if(!self.initLoadEnd) {
                self.filterData = data;
                return;
            }

            self.$layFilter.css('display', '');
            self.$layFilter.find('.ui_filter_slider').vcRangeSlider('update',true);

            //var expands = [];
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
                        obj.count = obj.count ? obj.count = vcui.number.addComma(obj.count) : null;
                        obj.filterValueName = obj.topFilterDisplayName ? obj.topFilterDisplayName : obj.filterValueName;
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
                                                obj.index = (idx+1);
                                                if(idx == 0) {
                                                    //전체 넣기
                                                    var allObj = JSON.parse(JSON.stringify(obj));
                                                    allObj.index = 0;
                                                    allObj.filterValueId = "";
                                                    allObj.filterValueName = "전체";
                                                    $list_category.append(vcui.template(filterCategoryTopTemplate, allObj));
                                                }
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

                //선택된 값으로 항목 열어두기
                if(self.unfoldFlagName) {
                    self.openFilterSection(data, self.unfoldFlagName);
                }

                self._filterBindCustomEvents();
            }

            //self._filterBindCustomEvents();

            //필터를 초기화 했으니 필터리셋버튼 숨김
            self.$layFilter.find('div.btn-reset button').hide();
            // BTOCSITE-2847 PLP > 상세필터 동작오류 start
            $('.result-area .btn-filter.applied').removeClass('applied');
            // BTOCSITE-2847 PLP > 상세필터 동작오류 end
            
            //for(var idx in expands) self.$layFilter.find('.ui_filter_accordion').vcAccordion("expand", expands[idx]);
            self._filterDefaultOpen();
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
            //2021-03-05 검색관련해서 수정.
            /*
            self.$layFilter.find('.ui_filter_accordion input[type="radio"]').each(function(idx, el){
                $(el).prop('checked', false);
            });
            */
            //첫번쨰 라디오 버튼 선택
            self.$layFilter.find('.ui_filter_accordion input[type="radio"]:eq(0)').each(function(idx, el){
                $(el).prop('checked', true);
            });

            //필터 체크박스
            self.$layFilter.find('.ui_filter_accordion input[type="checkbox"]').each(function(idx, el){
                $(el).prop('checked', false);
            });

            var selectedCategory = false;

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
                        if(!self.unfoldFlagName) {
                            var index = findRange.parents('li').index();
                            var $pa = findRange.parents('.ui_filter_accordion');
                            //$pa.vcAccordion('setOption','useAnimate',false);
                            $pa.vcAccordion('expand',index,false);
                            //$pa.vcAccordion('setOption','useAnimate',true);
                        }
                    } else {
                        //check or radio
                        var item = data[key];                        
                        item.forEach(function(val, index) {
                            var findDm = self.$layFilter.find('.ui_filter_accordion input[value="'+val+'"]');                       
                            if(findDm.length > 0) {
                                selectedFilter = true;
                                findDm.prop('checked', true);
                                /*
                                var index = findDm.parents('li').index();
                                var $pa = findDm.parents('.ui_filter_accordion');
                                //$pa.vcAccordion('setOption','useAnimate',false);
                                $pa.vcAccordion('expand',index,false);
                                //$pa.vcAccordion('setOption','useAnimate',true);
                                */
                            }

                        });

                        //check top Category
                        if(self.$categorySelect) {
                            var findCategory = self.$categorySelect.find('input[name="'+key+'"]');
                            if(findCategory.length > 0) {
                                findCategory.prop('checked', false);
                                item.forEach(function(val, index) {
                                    var findInput = self.$categorySelect.find('input[name='+key+'][value="'+val+'"]');
                                    findInput.prop('checked', true);
                                    selectedCategory = true;
                                });
                            }
                        }
                    }
                }

                //체크된 버튼이 있는 항목 열어두기
                var checkedRadio = self.$layFilter.find('.ui_filter_accordion input:checked');
                checkedRadio.each(function(idx, findDm) {
                    var $findDm = $(findDm);
                    var index = $findDm.parents('li').index();
                    var $pa = $findDm.parents('.ui_filter_accordion');
                    //$pa.vcAccordion('setOption','useAnimate',false);
                    $pa.vcAccordion('expand',index,false);
                    //$pa.vcAccordion('setOption','useAnimate',true);
                });

                self.$layFilter.find('.ui_filter_accordion input[type=checkbox]:checked').each(function(idx,obj){
                    self.resetSelectFilterCount(obj);
                });

                if(selectedFilter) {
                    $btnFilter.addClass('applied');
                    $btnFilter.find('a span').text('옵션 적용됨');
                    self.$layFilter.find('div.btn-reset button').show();
                } else {
                    $btnFilter.removeClass('applied');
                    $btnFilter.find('a span').text('옵션필터');
                    self.$layFilter.find('div.btn-reset button').hide();
                }
            } else {
                self.$layFilter.find('.ui_filter_accordion input[type=checkbox]').each(function(idx,obj){
                    self.resetSelectFilterCount(obj);
                });
            }

            //만약 선택된 카테고리가 없으면 전체로 선택
            if(!selectedCategory && self.$categorySelect) {
                self.$categorySelect.find('input:eq(0)').prop('checked', true);
            }

            if(triggerFilterChangeEvent) {
                self.triggerFilterChangeEvent();
            }
        },

        resetSelectFilterCount: function(filterItem) {
            var $parent = $(filterItem).parents('li');
            var $selNum = $parent.find('span.sel_num');
            if($selNum.length > 0) {
                var length = $parent.find('input:checked').length;
                if(parseInt(length) > 0) {
                    $selNum.text(' ('+length+')');
                } else {
                    $selNum.text('');
                }
            }
        },

        enableFilterList: function(filterList) {
            var self = this;
            var enableData = {};
            filterList.forEach(function(filterItem, index) {
                var filterId = filterItem.filterId;
                if(!enableData[filterId]) {
                    enableData[filterId] = [];
                }

                enableData[filterId].push(filterItem.filterValueId);
            });
            
            for(key in enableData){
                var filterValues = enableData[key];
                var findDm = self.$layFilter.find('li[data-filterid="'+key+'"]');
                //2021-03-18 정승우 체크박스는 제외해 달라는 요청
                findDm.find(':input:not([type=checkbox])').each(function(idx,input){
                    var val = input.value;
                    var arr = vcui.array.filter(filterValues, function(item, index) {
                        return item == val;
                    });
                    if(arr.length > 0) {
                        input.disabled = false;
                    } else {
                        input.disabled = true;
                    }
                });
            }
        },

        //선택된 값으로 항목 열기
        openFilterSection: function(data, unfoldFlagName) {
            var self = this;
            var foldFlag = unfoldFlagName || self.unfoldFlagName;
            var arr = data instanceof Array ? data : [];
            if(foldFlag && arr.length > 0) {
                var $list_ul = self.$layFilter.find('div.ui_filter_accordion > ul');
                
                //열려있지만 체크된 값이 없는 항목 체크	
                var closeIndex = [];	
                var $li = $list_ul.find('>li:not(.filter-slider-tag).on');	
                $li.each(function(idx, findDm) {	
                    var $findDm = $(findDm);	
                    if($findDm.find('input:checked').length < 1) {	
                        var index = $findDm.index();	
                        // BTOCSITE-2847 PLP > 상세필터 동작오류 start	
                        //closeIndex.push(index);	
                         // BTOCSITE-2847 PLP > 상세필터 동작오류 end	
                    }	
                });
                var $pa =  $list_ul.parents('.ui_filter_accordion');
                arr.forEach(function(item, index) {
                    var isOpen = lgkorUI.stringToBool(item[self.unfoldFlagName]);
                    if(isOpen) {
                        var $findDm = $list_ul.find('li[data-filterId="' + item.filterId + '"]');
                        if($findDm.length > 0) {
                            var index = $findDm.index();
                            closeIndex = vcui.array.remove(closeIndex, index);
                            //var $pa = $findDm.parents('.ui_filter_accordion');
                            //$pa.vcAccordion('setOption','useAnimate',false);
                            $pa.vcAccordion('expand',index,false);
                            //$pa.vcAccordion('setOption','useAnimate',true);
                        }
                    }
                });

                closeIndex.forEach(function(item, index) {
                    //$pa.vcAccordion('setOption','useAnimate',false);
                    $pa.vcAccordion('collapse',item,false);
                    //$pa.vcAccordion('setOption','useAnimate',true);
                });
            }
        },

        openFilterSectionAll: function(minLength) {
            var self = this;
            if(minLength && minLength > 0) {
                var $li = self.$layFilter.find('li[data-filterid]');
                if($li.length > minLength) return;
            }
            
            self.$layFilter.find('.ui_filter_accordion').each(function(idx, findDm) {
                var $pa = $(findDm);
                $pa.vcAccordion('expand',idx,false);
            });
        }

    }
    return FilterLayer;
})();