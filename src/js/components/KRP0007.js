(function () {
    var productItemTmpl = 
                '<li>'+
                '   <div class="item plp-item">'+
                '       {{#if isPromotionBadge}}'+
                '       <div class="badge">'+
                '           <div class="flag-wrap image-type left">'+
                '               {{#each badge in promotionBadge}}'+
                '               <span class="big-flag">'+
                '                   <img src="{{badge.image}}" alt="{{badge.context}}">'+
                '               </span>'+
                '               {{/each}}'+
                '           </div>'+
                '       </div>'+
                '       {{/if}}'+
                '       <div class="product-image" aria-hidden="true">'+
                '           <div class="slide-wrap ui_plp_carousel">'+
                '               <div class="indi-wrap">'+
                '                   <ul class="indi-conts ui_carousel_dots">'+
                '                       <li><button type="button" class="btn-indi"><span class="blind">##no##번 내용 보기</span></button></li>'+
                '                   </ul>'+
                '               </div>'+
                '               <div class="slide-content ui_carousel_list">'+
                '                   <div class="slide-track ui_carousel_track">'+
                '                       {{#each item in sliderImages}}'+
                '                       <div class="slide-conts ui_carousel_slide">'+
                '                           <a href="#">'+
                '                               <img src="{{item}}" alt="{{userFriendlyName}}">'+
                '                           </a>'+
                '                       </div>'+
                '                       {{/each}}'+
                '                   </div>'+
                '               </div>'+
                '               <div class="slide-controls">'+
                '                   <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
                '                   <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
                '               </div>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-contents">'+     
                '           {{#if defaultSiblingModelFlag}}'+      
                '           <div class="product-option {{siblingType}} ui_smooth_scrolltab">'+
                '               <div class="ui_smooth_tab">'+
                '                   <ul class="option-list" role="radiogroup">'+
                '                       {{#each item in siblingModels}}'+
                '                       <li>'+
                '                           <div role="radio" class="{{#if siblingType=="color"}}chk-wrap-colorchip {{item.siblingCode}}{{#else}}rdo-wrap{{/if}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                '                               <input type="radio" data-category-id={{categoryId}} id="product-{{item.modelName}}" name="nm_{{modelId}}" value="{{item.modelId}}" {{#if modelId==item.modelId}}checked{{/if}}>'+
                '                               {{#if siblingType=="color"}}'+
                '                               <label for="product-{{item.modelName}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                '                               {{#else}}'+
                '                               <label for="product-{{item.modelName}}">{{item.siblingValue}}</label>'+
                '                               {{/if}}'+
                '                           </div>'+
                '                       </li>'+
                '                       {{/each}}'+
                '                   </ul>'+
                '               </div>'+
                '               <div class="scroll-controls ui_smooth_controls">'+
                '                   <button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">이전</span></button>'+
                '                   <button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">다음</span></button>'+
                '               </div>'+
                '           </div>'+
                '           {{/if}}'+                
                '           {{#if isBadge}}'+ 
                '           <div class="flag-wrap bar-type">'+  
                '               {{#if productTag1}}'+ 
                '               <span class="flag">{{productTag1}}</span>'+
                '               {{/if}}'+ 
                '               {{#if productTag2}}'+ 
                '               <span class="flag">{{productTag2}}</span>'+
                '               {{/if}}'+ 
                '           </div>'+
                '           {{/if}}'+   
                '           <div class="product-info">'+
                '               <div class="product-name">'+
                '                   <a href="#">{{userFriendlyName}}</a>'+
                '               </div>'+                
                '               <div class="sku">{{modelName}}</div>'+                
                '               <div class="review-info">'+
                '                   <a href="#">'+                        
                '                       <div class="star is-review"><span class="blind">리뷰있음</span></div>'+
                '                       <div class="average-rating"><span class="blind">평점</span>42</div>'+
                '                       <div class="review-count"><span class="blind">리뷰 수</span>(36)</div>'+
                '                   </a>'+
                '               </div>'+    
                '               <ul class="spec-info">'+
                '                   {{#if isSpecInfo}}'+
                '                       {{#each item in specInfos}}'+
                '                           <li>{{#if item.specName != ""}}<span class="title">{{item.specName}} : </span>{{/if}}{{item.specInfo}}</li>'+
                '                       {{/each}}'+
                '                   {{/if}}'+
                '                   {{#if isCareShip}}'+
                '                           <li><span class="care-option">케어십 가능</span></li>'+
                '                   {{/if}}'+
                '               </ul>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-bottom">'+            
                '           <div class="flag-wrap bar-type">'+                
                '               <span class="flag">캐시백</span>'+                
                '               <span class="flag">사은품</span>'+                
                '           </div>'+
                '           <div class="price-area">'+      
                '               {{#if rPrice}}'+          
                '               <div class="original">'+
                '                   <em class="blind">판매가격</em>'+
                '                   <span class="price">{{rPrice}}<em>원</em></span>'+
                '               </div>'+ 
                '               {{/if}}'+
                '               {{#if rPromoPrice}}'+
                '               <div class="total">'+
                '                   <em class="blind">총 판매가격</em>'+
                '                   <span class="price">{{rPromoPrice}}<em>원</em></span>'+
                '               </div>'+
                '               {{/if}}'+
                '           </div>'+            
                '           <div class="btn-area-wrap">'+
                '               <div class="wishlist">'+
                '                   <span class="chk-wish-wrap large">'+
                '                       <input type="checkbox" id="wish-{{modelId}}" name="wish-{{modelId}}">'+
                '                       <label for="wish-{{modelId}}"><span class="blind">찜하기</span></label>'+
                '                   </span>'+
                '               </div>'+
                '               <div class="cart">'+
                '                   <a href="#n" class="btn-cart" data-id="{{modelId}}"><span class="blind">장바구니 담기</span></a>'+
                '               </div>'+
                '               <div class="btn-area">'+
                '                   <a href="#n" class="btn border" data-id="{{modelId}}">자세히 보기</a>'+
                '               </div>'+
                '           </div>'+
                '       </div>'+
                '       <div class="product-compare">'+
                '           <a href="#n" data-id="{{modelId}}"><span>비교하기</span></a>'+
                '       </div>'+        
                '   </div>'+
                '</li>';

    $(window).ready(function(){
        if(!document.querySelector('.KRP0007')) return false;

        $('.KRP0007').buildCommonUI();

        var storageName =   '__lgeProductFilter';
        var savedFilterArr = firstFilterList || []; // CMS에서 넣어준 firstFilterList를 이용

        var KRP0007 = {
            init: function() {
                var self = this;

                self.setting();
                self.bindEvents();

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

                var storageFilters = lgkorUI.getStorage(storageName);
                if(!(vcui.isEmpty(storageFilters)) && storageFilters.filterData) {
                    var filterData = JSON.parse(storageFilters.filterData);
                    if(firstEnableFilter) {
                        for(key in firstEnableFilter){
                            filterData[key] = firstEnableFilter[key];
                        }
                    }
                    self.filterLayer.resetFilter(filterData, true);
                } else {
                    var filterData = firstEnableFilter ? firstEnableFilter : {};
                    self.filterLayer.resetFilter(filterData, true);
                }
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
            },

            bindEvents: function() {
                var self = this;
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
                lgkorUI.requestAjaxData(ajaxUrl, data, function(result){
                    var data = result.data;
                    var param = result.param;
                    
                    var totalCount = data.totalCount;
                    self.$totalCount.text(vcui.number.addComma(totalCount) + "개");
                    
                    var listData = (data.listData && data.listData instanceof Array) ? data.listData : [];
                    //renderProdList(listData, totalCount);

                    self.setPageData(param.pagination);
                });
            }
        };
        KRP0007.init();
    });
})();