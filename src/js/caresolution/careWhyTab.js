(function() {
    // 1. 타입
    // .module-type1 : 케어솔루션_제품모튤
    // .module-type2 : 케어십_유상제품 모듈
    // .module-type3 : 케어십_보유제품 모듈
    // .module-type4 : 케어십_용역제품 모듈

    var _listItemTemplate = 
        '<li class="item">'+
        '   <div class="prd-care-vertical {{moduleType}}">'+
        '       <div class="img-wrap">'+
        '           {{#if moduleType == "module-type1" || moduleType == "module-type2"}}<a href="{{modelUrlPath}}">{{/if}}'+
        '               <img src="{{modelImg}}" alt="{{#raw userFriendlyName}}">'+
        '           {{#if moduleType == "module-type1" || moduleType == "module-type2"}}</a>{{/if}}'+
        '       </div>'+
        '       <div class="txt-wrap">'+
        '       {{#if moduleType == "module-type3"}}'+
        '           <div class="flag-wrap"><span class="flag">보유제품</span></div>'+
        '       {{/if}}'+
        '           {{#if moduleType == "module-type1" || moduleType == "module-type2"}}<a href="{{modelUrlPath}}">{{/if}}'+
        '               <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{#raw userFriendlyName}}</p>'+
        '           {{#if moduleType == "module-type1" || moduleType == "module-type2"}}</a>{{/if}}'+
        '           <p class="code"><span class="blind">제품 코드</span>{{modelName}}</p>'+
        '       </div>'+
        '       <div class="info-wrap">'+
        '       {{#if moduleType == "module-type4"}}'+
        '           <p class="code-txt">{{modelDescription}}</p>'+
        '       {{/if}}'+

        '       {{#if purchaseInfo != null && purchaseInfo != undefined && purchaseInfo != ""}}'+
        '           <div class="txt-info">'+
        '           {{#each item in purchaseInfo}}'+
        '               <dl>'+
        '                   <dt>{{item.title}}</dt>'+
        '                   <dd>{{item.date}}</dd>'+
        '               </dl>'+
        '           {{/each}}'+
        '           </div>'+
        '       {{/if}}'+
        '           <div class="opt-info">'+
        '           {{#if siblingColors.length > 0}}'+
        '               <dl {{#if siblingColors.length == 1}}class="disabled"{{/if}}>'+
        '                   <dt>색상</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" id="colorSet-{{modelId}}" title="색상 선택" data-sibling-type="siblingColors" {{#if siblingColors.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingColors}}'+
        '                               <option data-model-id="{{item.modelId}}"'+
                                                    ' data-group-id="{{item.siblingGroupCode}}"'+
                                                    ' value="{{item.siblingCode}}"'+
                                                    '{{#if selectColorID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
        '                           {{/each}}'+
        '                           </select>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '           {{/if}}'+
        '           {{#if siblingFee.length > 0}}'+
        '               <dl {{#if siblingFee.length == 1}}class="disabled"{{/if}}>'+
        '                   <dt>가입비</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" id="feeSet-{{modelId}}" title="가입비 선택" data-sibling-type="siblingFee" {{#if siblingFee.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingFee}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectFeeID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
        '                           {{/each}}'+
        '                           </select>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '           {{/if}}'+
        '           {{#if siblingUsePeriod.length > 0}}'+
        '               <dl {{#if siblingUsePeriod.length == 1}}class="disabled"{{/if}}>'+
        '                   <dt>의무사용</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" id="usePeriodSet-{{modelId}}" title="의무사용 선택" data-sibling-type="siblingUsePeriod" {{#if siblingUsePeriod.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingUsePeriod}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectUserPeriodID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
        '                           {{/each}}'+
        '                           </select>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '           {{/if}}'+
        '           {{#if siblingVisitCycle.length > 0}}'+
        '               <dl {{#if siblingVisitCycle.length == 1}}class="disabled"{{/if}}>'+
        '                   <dt>방문주기</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" id="visiSet-{{modelId}}" title="방문주기 선택" data-sibling-type="siblingVisitCycle" {{#if siblingVisitCycle.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingVisitCycle}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectVisitCycleID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
        '                           {{/each}}'+
        '                           </select>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '           {{/if}}'+
        '           </div>'+
        '       {{#if priceInfo != null && priceInfo != undefined && priceInfo != ""}}'+
        '           <div class="txt-info price-info">'+
        '           {{#each item in priceInfo}}'+
        '               <dl>'+
        '                   <dt>{{item.title}}</dt>'+
        '                   <dd>{{item.price}}원</dd>'+
        '               </dl>'+
        '           {{/each}}'+
        '           </div>'+
        '       {{/if}}'+
        '       <div class="price-wrap type2">'+
        '           <dl>'+
        '               <dt>이용 요금</dt>'+
        '               <dd>월 {{monthlyPrice}}원</dd>'+
        '           </dl>'+
        '       </div>'+
        '       </div>'+
        '   </div>'+
        '</li>';

    $(window).ready(function() {
        var careWhyTab = {
            init: function() {
                var self = this;
                self.listData = {};
                self.visibleCount = 12;
                self.setting();
                self.bindEvents();
            },

            setting: function() {
                var self = this;

                self.$contents = $('div.contents');
                self.$section = self.$contents.find('div.csn-section');
                //카테고리탭
                self.$tab = self.$section.find('.ui_tab:eq(0)');
            },

            bindEvents: function() {
                var self = this;

                //카테고리탭 선택
                self.$tab.on("tabbeforechange", function(e, data){
                    var $a = $(this).find('li:eq('+data.selectedIndex+') a');
                    var categoryID = $a.attr('href').replace("#","");
                    self.requestProdList(categoryID);
                });

                //최초 선택시 카테고리탭 선택
                self.$tab.on("tabinit", function(e, data){
                    var categoryID = self.findSelectCategoryID();
                    self.requestProdList(categoryID);
                });

                var $list = self.$contents.find('div.tab-content .prd-list-wrap');
                $list.on('change', '.info-wrap select', function(e){
                    e.preventDefault();
                    self.changeItemOptions(this);
                });

                //더보기
                self.$contents.find('div.tab-content .btn-moreview').on('click',function(e){
                    self.moreAddProdList($(this).parents('div.tab-content'));
                });
            },

            findSelectCategoryID: function() {
                var self = this;
                var categoryId = null;
                var $a = self.$tab.find('li.on a');
                if($a.length > 0) {
                    var href = $a.attr('href');
                    if(href) {
                        categoryId = href.replace("#","");
                    }
                }
                return categoryId;
            },

            requestProdList: function(categoryID) {
                if(!categoryID) return;

                var self = this;
                var ajaxUrl = self.$contents.data('prodList');
                var param = {
                    "categoryID":categoryID,
                    "tabID":"1"
                }
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;

                    var $div = $('#'+categoryID);
                    $div.removeData('page');
                    var $list_ul = $div.find('.prd-list-wrap >ul');
                    $list_ul.empty();
                    var productList = (data.productList && data.productList instanceof Array) ? data.productList : [];
                    self.listData[categoryID] = productList;

                    self.moreAddProdList($div);

                    var count = productList.length;
                    $div.find('>p.prd-list-count span em').text(vcui.number.addComma(count));
                    if(count > 0) {
                        $div.find('>div.prd-list-wrap').show();
                        $div.find('>p.prd-list-count').show();
                    } else {
                        $div.find('>div.prd-list-wrap').hide();
                        $div.find('>p.prd-list-count').hide();
                    }
                });
            },

            addListItem:function($targetList, listData) {
                var self = this;
                if(listData) {
                    listData.forEach(function(item, index) {
                        self.setSiblingCodeNumbering(item);
                        $targetList.append(vcui.template(_listItemTemplate, item));
                    });
                }
            },

            setSiblingCodeNumbering:function(item){
                var key;
                for(key in item.siblingFee) item.siblingFee[key].siblingCode = item.siblingFee[key].siblingCode.toString();
                for(key in item.siblingUsePeriod) item.siblingUsePeriod[key].siblingCode = item.siblingUsePeriod[key].siblingCode.toString();
                for(key in item.siblingVisitCycle) item.siblingVisitCycle[key].siblingCode = item.siblingVisitCycle[key].siblingCode.toString();
            },

            selectBoxReinit:function($target){
                $target.find('.ui_selectbox').vcSelectbox().on('selectboxopen',function(e, sbox){
                    var dl = $(sbox).closest('dl');
                    if(!dl.hasClass('open')) dl.addClass('open');
                }).on('selectboxclose', function(e, sbox){
                    var dl = $(sbox).closest('dl');
                    if(dl.hasClass('open')) dl.removeClass('open');
                });
            },

            moreAddProdList:function($div) {
                var self = this;
                var categoryID = $div.attr("id");
                var $list_ul = $div.find('.prd-list-wrap >ul');

                var arr = self.listData[categoryID];
                var divPage = $div.data('page');

                var productList = arr ? arr : [];
                var page = divPage ? divPage + 1 : 1;
                $div.data("page",page);
                
                var startIndex = (page-1)*self.visibleCount;
                var endIndex = (page-1)*self.visibleCount + self.visibleCount;

                var moreList = productList.slice((page-1)*self.visibleCount,endIndex);
                if(moreList && moreList.length > 0) {
                    var startIndex = $list_ul.find('>li').length;
                    var count = moreList.length;
                    self.addListItem($list_ul, moreList);
                    var $li = $list_ul.find('>li').slice(startIndex,startIndex+count);
                    self.selectBoxReinit($li);
                }

                var checkCount = $list_ul.find('>li').length;
                if(checkCount < productList.length) {
                    $div.find('.btn-moreview').css('display','block');
                } else {
                    $div.find('.btn-moreview').css('display','none');
                }
            },

            getOptionData:function(item){
                var optgroup = $(item).closest('.prd-care-vertical').find('.info-wrap .opt-info')
                var optdata = {};
                var optstring = [];
                optgroup.children().each(function(idx, opt){
                    var selectItem = $(opt).find('.ui_selectbox').vcSelectbox('instance');
                    var selectValue = selectItem.value();
                    var selectName = selectItem.text();
                    var siblingType = selectItem.$el.data('siblingType');
        
                    var optblock = $(opt).find('.ui_selectbox').find('option').filter("[value="+selectValue+"]");
                    var selectModelId = optblock.data("modelId");
                    var groupId = optblock.data("groupId");
                    
                    optdata[siblingType] = {
                        name: selectName,
                        value: selectValue,
                        modelId: selectModelId,
                        groupId: groupId
                    }
                });

                return {
                    optdata: optdata,
                    optstring: optstring
                };
            },

            //옵션 변경 시...
            changeItemOptions:function(item){
                var self = this;
                var idx = $(item).parents('li.item').index();
                var optionData = self.getOptionData(item);
                var siblingType = $(item).data('siblingType');
                if(siblingType == "siblingColors"){
                    self.setChangeColorChip(idx, optionData.optdata);
                } else{
                    self.setChangeOptionChip(idx, optionData.optdata)
                }
            },

            //색상 옵션 변경...
            setChangeColorChip:function(idx, optdata){
                var self = this;
                var categoryID = self.findSelectCategoryID();
                var _currentItemList = self.listData[categoryID];
                var _currentObj = _currentItemList[idx];

                var param = {
                    "tabID": "1",
                    "modelID": optdata.siblingColors.modelId,
                    "colorCd": optdata.siblingColors.value,
                    "siblingGroupCd": optdata.siblingColors.groupId,
                    "rtModelSeq": _currentObj.rtModelSeq,
                    "blockID": idx
                }
                var ajaxUrl = self.$contents.data('colorModel');

                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    var data = result.data;

                    _currentObj.rtModelSeq = data.rtModelSeq;
                    _currentObj.monthlyPrice = data.monthPrice;

                    var $div = $('#'+categoryID);
                    var $list_ul = $div.find('.prd-list-wrap >ul');

                    self.setSiblingCodeNumbering(data);
                    for(var key in data){                
                        _currentObj[key] = data[key];
                    }

                    var deleteItem = $list_ul.find('li.item:eq('+idx+')');

                    deleteItem.after(vcui.template(_listItemTemplate, data));
                    deleteItem.remove();

                    var $li = $list_ul.find('li.item:eq('+idx+')');
                    self.selectBoxReinit($li);
                });
            },

            //색상 외 옵션 변경...
            setChangeOptionChip:function(idx, optdata){
                var self = this;
                var categoryID = self.findSelectCategoryID();
                var _currentItemList = self.listData[categoryID];
                var _currentObj = _currentItemList[idx];

                var param = {
                    "tabID": "1",
                    "modelID": optdata.siblingColors && optdata.siblingColors.modelId  ? optdata.siblingColors.modelId  : '',
                    "rtModelSeq": _currentObj.rtModelSeq,
                    "feeCd": optdata.siblingFee && optdata.siblingFee.value ? optdata.siblingFee.value : '',
                    "usePeriodCd": optdata.siblingUsePeriod && optdata.siblingUsePeriod.value ? optdata.siblingUsePeriod.value : '',
                    "visitCycleCd": optdata.siblingVisitCycle && optdata.siblingVisitCycle.value ? optdata.siblingVisitCycle.value : '',
                    "blockID": idx
                }
                var ajaxUrl = self.$contents.data('priceStatus');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    var data = result.data;

                    _currentObj.rtModelSeq = data.rtModelSeq;
                    _currentObj.monthlyPrice = data.monthPrice;

                    var $div = $('#'+categoryID);
                    var $list_ul = $div.find('.prd-list-wrap >ul');

                    $list_ul.find('li.item:eq('+idx+')').find('.price-wrap dl dd').text("월 " + data.monthPrice + "원");
                });
            }
        }

        careWhyTab.init();
    });
})();