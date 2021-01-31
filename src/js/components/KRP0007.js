//filterlayer.js 내용 복사
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
                    '<label for="rdo-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
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
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="color-{{filterId}}-{{idx}}">' +
                    '<label for="color-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
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
                    '<input type="checkbox" name="{{filterId}}" value="{{item.filterValueId}}" id="chk-{{filterId}}-{{idx}}">' +
                    '<label for="chk-{{filterId}}-{{idx}}">{{item.filterValueName}}</label>' +
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
                    $parent.find('span.sel_num').text('');
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
            self.$layFilter.find('div.filter-btn-wrap button.ui_confirm_btn').on('click', function(e){
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
                var value = e.target.value;
                self.$layFilter.find('input[name="sorting"][value="'+ value +'"]').prop('checked', true);
                self.triggerFilterChangeEvent();
            });


            // 필터의 정렬 선택시 리스트의 정렬값도 선택하게 함
            self.$layFilter.find('.ui_order_accordion div.ui_accord_content').on('change', 'input[name="sorting"]',function(e){
                var idx = $('input[name="sorting"]').index(this);
                var $target = self.$listSorting.find('.ui_selectbox');
                $target.vcSelectbox('selectedIndex', idx, false);
                self.triggerFilterChangeEvent();
            });

            //검색내 검색 버튼
            self.$listSorting.find('div.search-inner button').on('click',function(e){
                var $input = $(this).siblings('input');
                var searchIn = $input.val();
                $input.attr('data-searchvalue', searchIn);
                self.triggerFilterChangeEvent();
            });

            //필터의 검색내 검색 버튼
            /*
            self.$layFilter.find('div.search-inner button').on('click',function(e){
                var $input = $(this).siblings('input');
                var searchIn = $input.val();
                var $target = self.$searchResult.find('div.search-inner input');                    
                $target.attr('data-searchvalue', searchIn);
                self.triggerFilterChangeEvent();
            });
            */

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
                        data[el.name] = el.checked;
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

//KRP0007
(function () {
    var productItemTemplate =
    '<li>' +
        '<div class="item plp-item">' +
        '{{#if promotionBadges}}'+
            '<div class="badge">' +
                '<div class="flag-wrap image-type left">'+
                    '{{#each badge in promotionBadges}}'+
                        '<span class="big-flag">'+
                            '<img src="{{badge.badgeImgUrl}}" alt="{{badge.badgeName}}">'+
                        '</span>'+
                    '{{/each}}'+
                '</div>'+
            '</div>'+
        '{{/if}}' +
        '<div class="product-image" aria-hidden="true">' +
            '<div class="slide-wrap ui_plp_carousel">' +
                '<div class="indi-wrap">' +
                    '<ul class="indi-conts ui_carousel_dots">' +
                        '<li><button type="button" class="btn-indi"><span class="blind">##no##번 내용 보기</span></button></li>' +
                    '</ul>' +
                '</div>' +
                '<div class="slide-content ui_carousel_list">' +
                    '<div class="slide-track ui_carousel_track">' +
                        '{{#each (image, idx) in sliderImages}}'+
                            '<div class="slide-conts ui_carousel_slide">' +
                                '<a href="#"><img src="{{image}}" alt="{{modelDisplayName}} {{idx + 1}}]번 이미지"></a>' +
                            '</div>' +
                        '{{/each}}'+
                    '</div>' +
                '</div>' +
                '<div class="slide-controls">' +
                    '<button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>' +
                    '<button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="product-contents">' +
            '<div class="product-option ui_smooth_scrolltab {{siblingType}}">' +
                '<div class="ui_smooth_tab">' +
                    '<ul class="option-list" role="radiogroup">' +
                        '{{#each item in siblingModels}}'+
                            '<li>'+
                                '<div role="radio" class="{{#if siblingType=="color"}}chk-wrap-colorchip {{item.siblingCode}}{{#else}}rdo-wrap{{/if}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                                    '<input type="radio" data-category-id={{categoryId}} id="product-{{item.modelName}}" name="nm_{{modelId}}" value="{{item.modelId}}" {{#if modelId==item.modelId}}checked{{/if}}>'+
                                    '{{#if siblingType=="color"}}'+
                                        '<label for="product-{{item.modelName}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                                    '{{#else}}'+
                                        '<label for="product-{{item.modelName}}">{{item.siblingValue}}</label>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</li>'+
                        '{{/each}}' +
                    '</ul>' +
                '</div>' +
                '<div class="scroll-controls ui_smooth_controls">' +
                    '<button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">이전</span></button>' +
                    '<button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">다음</span></button>' +
                '</div>' +
            '</div>' +
            '<div class="flag-wrap bar-type">' +
                '{{#if newProductBadgeFlag}}<span class="flag">NEW</span>{{/if}}' +
                '{{#if bestBadgeFlag}}<span class="flag">BEST</span>{{/if}}' +
            '</div>' +
            '<div class="product-info">' +
                '<div class="product-name">' +
                    '<a href="#">{{modelDisplayName}}</a>' +
                '</div>' +
                '<div class="sku">{{#if salesModelCode}}{{salesModelCode}}{{/if}}</div>' +
                    '<div class="review-info">' +
                        '<a href="#">' +
                            '{{#if (reviewsCount > 0)}}<div class="star is-review"><span class="blind">리뷰있음</span></div>{{#else}}<div class="star"><span class="blind">리뷰없음</span></div>{{/if}}' +
                            '<div class="average-rating"><span class="blind">평점</span>{{reviewsScore}}</div>' +
                            '<div class="review-count"><span class="blind">리뷰 수</span>({{reviewsCount}})</div>' +
                        '</a>' +
                    '</div>' +
                    '<ul class="spec-info">' +
                        '{{#if bulletFeatures}}' +
                            '{{#each item in bulletFeatures}}' +
                                '<li>{{#raw item}}</li>' +
                            '{{/each}}' +
                        // <li><span class="title">용량 : </span>840L</li>
                        // <li><span class="title">전체크기(WxHxD) : </span>912 x 1,790 x 927 mm</li>
                        // <li><span class="title">형태 : </span>노크온 매직스페이스</li>
                        // <li><span class="title">패턴 : </span>미드나잇</li>
                        // <li><span class="care-option">케어십 가능</span></li>
                        '{{/if}}' +
                    '</ul>' +
                '</div>' +
            '</div>' +
            '<div class="product-bottom">' +
                '<div class="flag-wrap bar-type">' +
                    '{{#if cashbackBadgeFlag}}<span class="flag">캐시백</span>{{/if}}' +
                '</div>' +
                '<div class="price-area">' +
                    '{{#if obsOriginalPrice}}<div class="original">' +
                        '<em class="blind">판매가격</em>' +
                        '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' +
                    '</div>{{/if}}' +
                    '{{#if obsTotalDiscountPrice}}<div class="total">' +
                        '<em class="blind">총 판매가격</em>' +
                        '<span class="price">{{obsTotalDiscountPrice}}<em>원</em></span>' +
                    '</div>{{/if}}' +
                '</div>' +
                '<div class="btn-area-wrap">' +
                    '<div class="wishlist">' +
                        '<span class="chk-wish-wrap large">' +
                            '<input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}" data-id="{{modelId}}" data-model-name="{{modelName}}" {{#if wishListFlag}}checked{{/if}}>' +
                            '<label for="wish-{{modelId}}"><span class="blind">찜하기</span></label>' +
                        '</span>' +
                    '</div>' +
                    '<div class="cart">' +
                        '<a href="#n" class="btn-cart" data-id="{{modelId}}" data-model-name="{{modelName}}" {{#if !cartListFlag}}disable{{/if}}><span class="blind">장바구니 담기</span></a>' +
                    '</div>' +
                    '<div class="btn-area">' +
                        '<a href="{{detailUrl}}" class="btn border size-m" data-id="{{modelId}}">자세히 보기</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="product-compare">' +
                '<a href="#" data-id="{{modelId}}"><span>비교하기</span></a>' +
            '</div>' +
        '</div>' +
    '</li>';
                    
    $(window).ready(function(){
        if(!document.querySelector('.KRP0007')) return false;

        $('.KRP0007').buildCommonUI();

        var categoryId = lgkorUI.getHiddenInputData().categoryId;
        var storageName = categoryId+'_lgeProductFilter';
        
        var savedFilterArr = firstFilterList || []; // CMS에서 넣어준 firstFilterList를 이용

        var KRP0007 = {
            init: function() {
                var self = this;

                self.setting();
                self.bindEvents();

                //breackpoint 이벤트 초기실행
                self.fnBreakPoint();
                //비교하기 체크
                self.setCompares();

                self.filterLayer = new FilterLayer(self.$layFilter, self.$categorySelect, self.$listSorting, self.$btnFilter, function (data) {
                    //console.log(data);
                    lgkorUI.setStorage(storageName, data);

                    var param = data;
                    param.page = 1;
                    if(param) {
                        self.requestSearch(param, true);
                    }
                });

                self.filterLayer.updateFilter(savedFilterArr);

                //스토리지에 저장된 필터 체크
                //페이지에 선언된 필터와 비교해서 합침
                var storageFilters = lgkorUI.getStorage(storageName);
                var filterData = firstEnableFilter ? firstEnableFilter : {};

                if(!(vcui.isEmpty(storageFilters)) && storageFilters.filterData) {
                    var storageFilterData = JSON.parse(storageFilters.filterData);
                    for(key in filterData) {
                        storageFilterData[key] = filterData[key]; 
                    }
                    filterData = storageFilterData;
                }
                self.filterLayer.resetFilter(filterData, false);
            },

            setting: function() {
                var self = this;
                self.$section = $('.KRP0007');

                //필터
                self.$layFilter = self.$section.find('div.lay-filter');
                //모바일 필터열기버튼
                self.$btnFilter = self.$section.find('div.btn-filter');
                //정렬옵션
                self.$listSorting = self.$section.find('div.list-sorting');
                //카테고리 셀렉트
                self.$categorySelect = self.$section.find('div.cate-scroll-wrap.ui_smooth_scrolltab');

                //토탈 카운트
                self.$totalCount = self.$listSorting.find('#totalCount');
                //더보기 버튼
                self.$btnMore = self.$section.find('div.read-more-area button.read-more');

                //리스트
                self.$productList = self.$section.find('div.list-wrap ul.product-items');

                self.$productList.find('.ui_plp_carousel').vcCarousel({
                    indicatorNoSeparator:/##no##/,
                    infinite:true, 
                    autoplaySpeed:500, 
                    speed:0, 
                    easing:'easeInOutQuad'
                });

                self.$productList.find('.ui_smooth_scrolltab').vcSmoothScrollTab();
            },

            bindEvents: function() {
                var self = this;
                
                //찜하기
                self.$productList.on('click','li div.btn-area-wrap div.wishlist input',function(e){
                    var $this = $(this);
                    var _id = $this.attr('data-id');
                    var modelName = $this.attr('data-model-name');
                    var wish = $this.is(':checked');
                    var param = {
                        "id":_id,
                        "modelName":modelName
                    }
                    
                    var ajaxUrl = self.$section.attr('data-wish-url');
                    
                    var success = function(data) {
                        //$this.attr("data-wishItemId",data.wishItemId);
                    };
                    var fail = function(data) {
                        $this.prop("checked",!wish);
                    };

                    lgkorUI.requestWish(
                        param,
                        wish,
                        success,
                        fail,
                        ajaxUrl
                    );
                });

                //장바구니
                self.$productList.on('click','li div.btn-area-wrap div.cart a',function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var param = {
                        "id":$this.attr('data-id'),
                        "modelName":$this.attr('data-model-name')
                    }
                    var ajaxUrl = self.$section.attr('data-cart-url');
                    lgkorUI.requestCart(ajaxUrl, param);
                });

                //자세히보기
                /*
                self.$productList.on('click','li div.btn-area-wrap div.btn-area a',function(e){
                    e.preventDefault();
                });
                */

                //비교하기
                self.$productList.on('click', 'li .product-compare a', function(e){
                    e.preventDefault();
                    self.setCompareState(e.currentTarget);
                });

                //비교하기 컴포넌트 변화 체크
                $(window).on("changeStorageData", function(){
                    self.setCompares();
                })

                // 브레이크포인트 이벤트 처리
                $(window).on('breakpointchange.filter', function(e,data){
                    self.fnBreakPoint();
                });

                //더보기
                self.$btnMore.on('click', function(e) {
                    var param = self.filterLayer.getDataFromFilter();
                    var hiddenData = lgkorUI.getHiddenInputData();
                    param.page = parseInt(hiddenData.page) + 1;
                    if(param) {
                        self.requestSearch(param, false);
                    }
                });
            },

            setPageData: function(param) {
                var self = this;
                var page = parseInt(param.page);
                var totalCount = parseInt(param.totalCount);
                if (page < totalCount) {
                    self.$btnMore.show();
                } else {
                    //더이상 없다
                    self.$btnMore.hide();
                }

                lgkorUI.setHiddenInputData({
                    totalCount: totalCount,
                    page: page
                });
            },

            requestSearch: function(data, isNew){
                var self = this;
                var ajaxUrl = self.$section.attr('data-prod-list');
                data.categoryId = categoryId;                
                lgkorUI.requestAjaxData(ajaxUrl, data, function(result){
                    var data = result.data;
                    var param = result.param;

                    if(data.schCategoryId && data.schCategoryId.length > 0) {
                        categoryId = data.schCategoryId;
                        lgkorUI.setHiddenInputData({
                            "categoryId":categoryId
                        });
                    }
                    
                    var totalCount = data.totalCount;
                    if(totalCount) {
                        self.$totalCount.text(vcui.number.addComma(totalCount) + "개");
                    }
                    
                    if(isNew) {
                        self.$productList.empty();
                    }

                    var arr = (data.listData && data.listData instanceof Array) ? data.listData : [];

                    arr.forEach(function(item, index) {

                        var siblingType = item.siblingType ? item.siblingType.toLowerCase() : '';
                        item.siblingType = (siblingType == "color") ? "color" : "text";

                        var sliderImages = [item.mediumImageAddr];
                        if(item.galleryImages && item.galleryImages.length > 0) {
                            item.galleryImages.forEach(function(obj, idx) {
                                sliderImages.push(obj.largeImageAddr);
                            });
                        }
                        item.sliderImages = sliderImages;
                        
                        item.obsOriginalPrice = (item.obsOriginalPrice != null) ? vcui.number.addComma(item.obsOriginalPrice) : null;
                        item.obsTotalDiscountPrice = (item.obsTotalDiscountPrice != null) ? vcui.number.addComma(item.obsTotalDiscountPrice) : null;

                        //flag
                        item.newProductBadgeFlag = lgkorUI.stringToBool(item.newProductBadgeFlag);
                        item.bestBadgeFlag = lgkorUI.stringToBool(item.bestBadgeFlag);
                        item.cashbackBadgeFlag = lgkorUI.stringToBool(item.cashbackBadgeFlag);
                        
                        //장바구니
                        item.wishListFlag = lgkorUI.stringToBool(item.wishListFlag);
                        //찜하기
                        item.cartListFlag = lgkorUI.stringToBool(item.cartListFlag);
                        
                        self.$productList.append(vcui.template(productItemTemplate, item));

                        self.$productList.find('.ui_plp_carousel').vcCarousel('reinit');
                        self.$productList.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

                        self.fnBreakPoint();
                        self.setCompares();
                    });

                    self.setPageData(param.pagination);
                });
            },

            // 상품 아이템 롤링기능을 PC,MOBILE일 때 교체.
            fnBreakPoint:function(){
                var self = this;
                var name = window.breakpoint.name;
                self.$productList.find('.ui_plp_carousel').off('mouseover mouseout mouseleave').vcCarousel("setOption", {autoplay:false,'speed':300}, true);
                if(name=="mobile"){
                    self.$productList.find('.ui_plp_carousel').off('mouseover mouseout mouseleave').vcCarousel("setOption", {autoplay:false,'speed':300}, true);
                } else if(name=="pc"){
                    self.$productList.find('.ui_plp_carousel').vcCarousel("setOption", {'speed':0}, true ).on('mouseover mouseout mouseleave', function(e){
                        // 상품 아이템을 오버시 이미지를 롤링.
                        if($(e.currentTarget).data('ui_carousel')){
                            if(e.type == 'mouseover'){
                                $(e.currentTarget).vcCarousel('play');
                                
                            }else{
                               $(e.currentTarget).vcCarousel('stop');
                                setTimeout(function(){
                                    $(e.currentTarget).vcCarousel('goTo', 0);
                                }, 500);
                            }
                        }
                    });
                }   
            },

            //비교하기 저장 유무 체크...
            setCompares:function(){
                var self = this;
                self.$productList.find('li .product-compare a').removeClass('on');
                var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
                var isCompare = vcui.isEmpty(storageCompare);
                if(!isCompare){
                    for(var i in storageCompare[lgkorUI.COMPARE_ID]){
                        var modelID = storageCompare[lgkorUI.COMPARE_ID][i]['id'];
                        self.$productList.find('li .product-compare a[data-id=' + modelID + ']').addClass('on');
                    }
                }
            },

            setCompareState:function(atag){
                var $this = $(atag);
                var _id = $this.data('id');
                if(!$this.hasClass('on')){
                    var compare = $this.closest('.product-compare');
                    var contents = compare.siblings('.product-contents');
                    var productName = contents.find('.product-info .product-name a').text();
                    var productID = contents.find('.product-info .sku').text();
                    var image = compare.siblings('.product-image');
                    var productImg = image.find('.slide-content .slide-conts.on a img').attr("src");
                    var productAlt = image.find('.slide-content .slide-conts.on a img').attr("alt");

                    var compareObj = {
                        "id": _id,
                        "productName": productName,
                        "productID": productID,
                        "productImg": productImg,
                        "productAlt": productAlt
                    }

                    var isAdd = lgkorUI.addCompareProd(compareObj);
                    if(isAdd) $this.addClass("on");
                } else{
                    lgkorUI.removeCompareProd(_id);
                }
            }
        };
        KRP0007.init();
    });
})();