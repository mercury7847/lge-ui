
(function(){

    var _categoryItemTemplate = '<li><a href="#n" data-cate-id="{{categoryID}}">{{categoryName}}</a></li>';
    
    // [.prd-care-vertical 옵션]
    // 1. 타입
    // .module-type1 : 케어솔루션_제품모튤
    // .module-type2 : 케어십_유상제품 모듈
    // .module-type3 : 케어십_보유제품 모듈
    // .module-type4 : 케어십_용역제품 모듈

    var _listItemTemplate =
        '<li class="item">'+
        '   <div class="prd-care-vertical {{moduleType}}" data-index="{{index}}">'+
        '       <div class="img-wrap">'+
        '           <a href="#n">'+
        '               <img src="{{modelImg}}" alt="{{userFriendlyName}}">'+
        '           </a>'+
        '       </div>'+
        '       <div class="txt-wrap">'+
        '       {{#if moduleType == "module-type3"}}'+
        '           <div class="flag-wrap"><span class="flag">보유제품</span></div>'+
        '       {{/if}}'+
        '           <a href="#n">'+
        '               <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{userFriendlyName}}</p>'+
        '           </a>'+
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
        '                           <select class="ui_selectbox" id="colorSet-{{modelId}}" title="색상 선택" {{#if siblingColors.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingColors}}'+
        '                               <option value="{{item.siblingCode}}">{{item.siblingValue}}</option>'+
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
        '                           <select class="ui_selectbox" id="feeSet-{{modelId}}" title="가입비 선택"  {{#if siblingFee.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingFee}}'+
        '                               <option value="{{item.siblingCode}}">{{item.siblingValue}}</option>'+
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
        '                           <select class="ui_selectbox" id="usePeriodSet-{{modelId}}" title="의무사용 선택"  {{#if siblingUsePeriod.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingUsePeriod}}'+
        '                               <option value="{{item.siblingCode}}">{{item.siblingValue}}</option>'+
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
        '                           <select class="ui_selectbox" id="visiSet-{{modelId}}" title="방문주기 선택"  {{#if siblingVisitCycle.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingVisitCycle}}'+
        '                               <option value="{{item.siblingCode}}">{{item.siblingValue}}</option>'+
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
        '           <div class="price-wrap">'+
        '               <div class="total-price">'+
        '                   <p class="price">월 {{monthlyPrice}}원</p>'+
        '                   <button type="button" class="btn border putItemBtn"><span>담기</span></button>'+
        '               </div>'+
        '           </div>'+
        '       </div>'+
        '   </div>'+
        '</li>';

        //<!-- 결합된 상품이면 comb-type 클래스 추가 -->
    var _putItemTemplate = 
        '<div class="slide-wrap ui_carousel_slider3">'+
        '   <div class="slide-content ui_carousel_list">'+
        '       <div class="slide-track ui_carousel_track">'+
        '       {{#each item in putitem_list}}'+
        '           <li class="slide-conts ui_carousel_slide">'+
        '               <div class="conts-wrap">'+
        '                   <div class="prd-care-horizon ui_flexible_box{{#if item.itemData.combineProduct == "Y"}} comb-type{{/if}}">'+
        '                       <div class="ui_flexible_cont">'+
        '                           <div class="img-wrap">'+
        '                               <img src="{{item.itemData.modelImg}}" alt="{{item.itemData.userFriendlyName}}">'+
        '                           </div>'+
        '                           <div class="txt-wrap">'+
        '                             <div class="flag-wrap">'+
        '                                   <span class="flag"><span class="blind">서비스명</span>{{item.itemData.serviceName}}</span>'+
        '                               </div>'+
        '                               <div class="tit-info">'+
        '                                   <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{item.itemData.userFriendlyName}}</p>'+
        '                                   <p class="code"><span class="blind">제품 코드</span>{{item.itemData.modelName}}</p>'+
        '                               </div>'+
        '                               <p class="etc">월 {{item.itemData.monthlyPrice}}원<span class="comb-txt">{{item.itemData.combineText}}</span></p>'+
        '                           </div>'+  
        '                           <div class="del-item">'+
        '                               <button type="button" class="btn-del" tabindex="" data-put-id="{{item.putID}}"><span class="blind">제품 삭제</span></button>'+
        '                           </div>'+  
        '                       </div>'+
        '                   </div>'+
        '               </div>'+
        '           </li>'+
        '       {{/each}}'+
        '       </div>'+
        '   </div>'+
        '   <div class="slide-controls">'+
        '       <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
        '       <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
        '   </div>'+
        '</div>';

    var _estimateProdTemplate =    
        '   <div class="slide-wrap estimate_prod_slide">'+
        '       <div class="slide-content ui_carousel_list">'+
        '           <div class="slide-track ui_carousel_track ui_flexible_height">'+
        '           {{#each item in putitem_list}}'+
        '               <div class="slide-conts ui_carousel_slide">'+
        '                   <div class="conts-wrap">'+
        '                       <div class="item ui_flexible_box">'+
        '                           <div class="ui_flexible_cont">'+
        '                               <div class="img-wrap">'+
        '                                   <img src="{{item.itemData.modelImg}}" alt="{{item.itemData.userFriendlyName}}">'+
        '                               </div>'+
        '                               <div class="txt-wrap">'+
        '                                   <div class="flag-wrap">'+
        '                                       <span class="flag"><span class="blind">서비스명</span>{{item.itemData.serviceName}}</span>'+
        '                                   </div>'+
        '                                   <div class="tit-info">'+
        '                                       <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{item.itemData.userFriendlyName}}</p>'+
        '                                       <p class="price">월 {{item.itemData.monthlyPrice}}</p>'+
        '                                       <div class="etc-info">'+
        '                                           <span class="txt"><span class="blind">제품 코드</span>{{item.itemData.modelName}}</span>'+
        '                                           <span class="txt"><span class="blind">색상</span>{{item.itemData.selectColorName}}</span>'+
        '                                       </div>'+
        '                                   </div>'+
        '                                   <div class="etc-info">'+
        '                                   {{#each etc in item.itemData.detailProdInfo}}'+
        '                                       <span class="txt">{{item.itemData.detailProdInfo[etc]}}</span>'+
        '                                   {{/each}}'+
        '                                   </div>'+
        '                               </div>'+
        '                           </div>'+
        '                       </div>'+
        '                   </div>'+
        '               </div>'+
        '           {{/each}}'+
        '           </div>'+
        '       </div>'+
        '   </div>';

    var _showItemLength = 8;

    var _isStorageChk = false;
    var _isStickyApply = false;
    
    var _totalContract;

    var _page, _pageTotal;
    var _currentItemList;

    var _prodListUrl;
    var _categoryListUrl;

    var $caresolutionContainer;
    var $fixedTab;
    var $typeTab;
    var $categoryTab;
    var $categoryTabCtrler;
    var $sortSelector;
    var $prodListContainer;
    var $putItemContainer;

    function init(){
        vcui.require(['ui/carousel', 'ui/tab', 'ui/sticky', 'ui/modal', 'ui/selectbox', 'ui/smoothScrollTab'], function () {
            setting();
            eventBind();

            loadCategoryList();
        });


    }

    function setting(){
        $caresolutionContainer = $('.care-solution-wrap');
        $fixedTab = $('.fixed-tab-wrap');
        $typeTab = $fixedTab.find('.tabs-wrap.new-type');
        $categoryTab = $fixedTab.find('.cate-scroll-wrap');
        $sortSelector = $('.sort-select-wrap select');
        $prodListContainer = $('.prd-list-wrap');
        $putItemContainer = $('.prd-select-wrap');

        _totalContract = $('.ui_total_prod').data('prodTotal');

        _categoryListUrl = $caresolutionContainer.data("cateList");
        _prodListUrl = $caresolutionContainer.data("prodList");

        $categoryTabCtrler = new vcui.ui.SmoothScrollTab('.ui_smoothScroll_tab');

        $('.ui_carousel_slider').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 3,
                        slidesToScroll: 3
                        
                    }
                },
                {
                    breakpoint: 1090,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 2, 
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: "unslick"
                }
            ]
        });
    }

    function eventBind(){
        $typeTab .on('click', '.tabs li a', function(e){
            e.preventDefault();
        });

        $categoryTabCtrler.on('smoothscrolltabselecttab', function(e, data){
            var categorytop = $caresolutionContainer.offset().top;
            $('html, body').animate({scrollTop:categorytop}, 120, function(){
                loadCareProdList(true);
            });
        });

        $sortSelector.on('change', function(e){
            loadCareProdList(true);
        });

        $prodListContainer.on('click', '.putItemBtn', function(e){
            e.preventDefault();
            
            addPutItem(this);
        }).on('change', '> ul.inner > li.item .info-wrap input[type=radio]', function(e){
            e.preventDefault();

            changeItemOptions(this);
        });

        $putItemContainer.on('click', 'button.btn-del', function(e){
            e.preventDefault();

            var putId = $(this).data('putId');
            removePutItem(putId);
        }).on('click', 'button.btn-close', function(e){
            e.preventDefault();

            putItemToggleStatus();
        }).on('click', '.total-info .btn', function(e){
            e.preventDefault();

            openEstimatePopUp();
        });

        $('.ui_active_toggle').on('click', function(e){
            e.preventDefault();

            var togglewrap = $(this).closest('.ui_active_toggle_wrap');

            togglewrap.toggleClass('active');

            if(togglewrap.hasClass('active')){
                lgkorUI._resetFlexibleBox();
            };
        });

        $(window).on("changeStorageData", function(){
            setPutItems();
            setPutItemStatus();
        }).on('scroll', function(e){
            var scrolltop = $(window).scrollTop();
            var winheight = $(window).height();
            var contop = $caresolutionContainer.offset().top;
            var contheight = $caresolutionContainer.outerHeight(true);
            var bottomy = -scrolltop + contop + contheight;
            
            if(bottomy + 100 < winheight){
                setNextProdList();
            }
        });
    }

    function loadCategoryList(){
        lgkorUI.showLoading();

        var tabID = getTabID();
        lgkorUI.requestAjaxData(_categoryListUrl, {tabID: tabID}, function(result){
            $categoryTab.find('.tabs').empty();

            for(var id in result.data){
                var category = vcui.template(_categoryItemTemplate, result.data[id]);
                $categoryTab.find('.tabs').append($(category).get(0));
            }
            $categoryTabCtrler.setTabIndex(0);

            if(!_isStickyApply){
                _isStickyApply = true;
                $fixedTab.vcSticky({stickyContainer: ".care-solution-wrap", stickyClass:"tab-fix"});
            }

            loadCareProdList(false);
        });
    }

    function loadCareProdList(isLoading){
        if(isLoading) lgkorUI.showLoading();
        
        var serviceName = getServiceName();
        var requestData = {
            tabID: getTabID(),
            categoryID: getCategoryID(),
            sortID: getSortID()
        }
        lgkorUI.requestAjaxData(_prodListUrl, requestData, function(result){

            _currentItemList = vcui.array.map(result.data.productList, function(item, idx){
                item['index'] = idx+1;
                item["serviceName"] = serviceName;
                return item;
            });
            var leng = _currentItemList.length;
            var div = leng/_showItemLength;
            var rest = leng%_showItemLength;
            _page = 0;
            _pageTotal = parseInt(div);
            if(rest) _pageTotal += 1;

            $prodListContainer.find('> ul.inner').empty();

            addProdItemList();
            
            lgkorUI.hideLoading();
        });

        if(!_isStorageChk){
            _isStorageChk = true;

            setPutItems();
            setPutItemStatus();
        }
    }

    function changeItemOptions(item){
        var idx = $(item).closest('.prd-care-vertical').data('index')-1;
        console.log("changeItemOptions :", idx)
        var optionData = getOptionData(item);
    }

    function setNextProdList(){
        var page = _page + 1;
        if(page < _pageTotal){
            _page = page;

            addProdItemList(true);
        }
    }

    function addProdItemList(anim){
        var first = _page * 8;
        var last = first + _showItemLength;
        if(last > _currentItemList.length) last = _currentItemList.length;
        for(var i=first;i < last;i++){
            var prodlist = vcui.template(_listItemTemplate, _currentItemList[i]);
            var addItem = $(prodlist).get(0);
            $prodListContainer.find('> ul.inner').append(addItem);

            if(anim) $(addItem).css({y:200, opacity:0}).transition({y:0, opacity:1}, 450, "easeOutQuart");
        }

        $('.price-info dl:first-child').not('.default').addClass('default');

        $('.ui_selectbox').vcSelectbox().on('selectboxopen', function(e, sbox){
            var dl = $(sbox).closest('dl');
            if(!dl.hasClass('open')) dl.addClass('open');
        }).on('selectboxclose', function(e, sbox){
            var dl = $(sbox).closest('dl');
            if(dl.hasClass('open')) dl.removeClass('open');
        })
    }

    function addPutItem(item){ 
        var idx = $(item).parents('.prd-care-vertical').data('index')-1;
        var optdata = getOptionData(item);
        var data = {
            itemData: _currentItemList[idx],
            putID : _currentItemList[idx]['modelId'] + "-" + parseInt(Math.random()*999) + "-" + parseInt(Math.random()*99) + "-" + parseInt(Math.random()*9999),
            selectOptions: optdata
        }

        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        if(putItemStorage[lgkorUI.CAREPLANER_ID] == undefined){
            putItemStorage[lgkorUI.CAREPLANER_ID] = [data];
        } else{
            var leng = putItemStorage[lgkorUI.CAREPLANER_ID].length;
            if(leng + _totalContract < lgkorUI.CAREPLANER_LIMIT){
                putItemStorage[lgkorUI.CAREPLANER_ID].unshift(data);

                $(window).trigger("toastshow", "제품 담기가 완료되었습니다.");
            } else{
                $('#alert-overclick').vcModal();
                return false;
            }
        }
        lgkorUI.setStorage(lgkorUI.CAREPLANER_KEY, putItemStorage);
    }

    function removePutItem(id){
        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        putItemStorage[lgkorUI.CAREPLANER_ID] = vcui.array.filter(putItemStorage[lgkorUI.CAREPLANER_ID], function(item){
            return item['putID'] != id;
        });

        lgkorUI.setStorage(lgkorUI.CAREPLANER_KEY, putItemStorage);
    }

    function setPutItems(){
        $putItemContainer.find('.contract-slide').empty();

        var putItemCompare = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        var leng = putItemCompare[lgkorUI.CAREPLANER_ID] == undefined ? 0 : putItemCompare[lgkorUI.CAREPLANER_ID].length;
        if(leng){
            var listItem = vcui.template(_putItemTemplate, putItemCompare);
            $putItemContainer.find('.contract-slide').append(listItem);

            var display = $putItemContainer.css('display');
            $putItemContainer.css({display:'block'});
            
            $('.ui_carousel_slider3').vcCarousel({
                settings: "unslick",
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: false,
                            slidesToShow: 2,
                            slidesToScroll: 2
                            
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: false,
                            slidesToShow: 1, 
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: "unslick"
                    }
                ]
            });
            $putItemContainer.css({display:display});
        }
        
        $putItemContainer.find('.tit-wrap .num strong').text(leng);
    }

    function setPutItemStatus(){
        var leng = $putItemContainer.find('.contract-slide').children().length;
        if(leng){
            if($putItemContainer.css('display') == 'none'){
                var height = $putItemContainer.outerHeight(true);
                $putItemContainer.css({display:'block', y:height});
                openPutItemBox();
            } else{
                if($putItemContainer.hasClass('close')) openPutItemBox();
            }
        } else{
            hidePutItemBox();
        }
    }

    function openPutItemBox(){
        putItemStatus("open");

        $putItemContainer.stop().transition({y:0}, 550, "easeInOutCubic");
        $putItemContainer.find('.tit-wrap').stop().transition({'padding-bottom': 16}, 550, 'easeInOutCubic');

        var height = $('.default-bottom-wrap').outerHeight(true);
        $('.default-bottom-wrap').stop().transition({y:height}, 450, "easeInOutCubic", function(){
            $('.default-bottom-wrap').hide();
        });
    }

    function closePutItemBox(){
    }

    function hidePutItemBox(){
        putItemStatus("close");

        var height = $putItemContainer.outerHeight(true);
        $putItemContainer.stop().transition({y:height}, 350, "easeInOutCubic", function(){
           $putItemContainer.css({display:'none', y:0});
        });

        height = $('.default-bottom-wrap').outerHeight(true);
        $('.default-bottom-wrap').stop().show().transition({y:0}, 450, "easeInOutCubic");
    }

    function putItemToggleStatus(){
        if($putItemContainer.hasClass('close')){
            openPutItemBox();
        } else{
            closePutItemBox();
        }
    }
    function putItemStatus(status){
        if(status == "close"){
            if(!$putItemContainer.hasClass('close')) $putItemContainer.addClass('close');
            $putItemContainer.find('button.btn-close blind').text("열기");
        } else{
            if($putItemContainer.hasClass('close')) $putItemContainer.removeClass('close');
            $putItemContainer.find('button.btn-close blind').text("닫기");
        }
    }

    function openEstimatePopUp(){
        $('#pop-estimate').find('.estimate-list').empty();
        //estimate_prod_slide
        var putItemCompare = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        var putItemList = putItemCompare[lgkorUI.CAREPLANER_ID];
        var leng = putItemList.length;
        var estimateList = vcui.template(_estimateProdTemplate, putItemCompare);
        $('#pop-estimate').find('.estimate-list').append($(estimateList).get(0));

        $('#pop-estimate').find('.tit-wrap .leng').text('총 '+leng+'개');
        

        $('#pop-estimate').vcModal();

        $('.estimate_prod_slide').vcCarousel({
            settings: "unslick",
            responsive: [
                {
                    breakpoint: 10000,
                    settings: "unslick"
                },
                {
                    breakpoint: 767,
                    settings: {
                        infinite: false,
                        variableWidth : true,
                        dots: false,
                        slidesToShow: 1, 
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    function getTabID(){
        var tabIndx = $categoryTabCtrler.getTabIndex();
        return tabIndx;
    }

    function getCategoryID(){
        var currentcate = $categoryTab.find('.tabs li[class=on]');
        var cateID = currentcate.find('a').data('cateId');
        
        return cateID;
    }

    function getSortID(){
        return $sortSelector.val();
    }

    function getServiceName(){
        var currentab = $typeTab.find('.tabs li[class=on]');
        
        return currentab.find('a').data("serviceName");
    }

    function getOptionData(item){
        var optgroup = $(item).closest('.prd-care-vertical').find('.info-wrap .opt-info')
        var optdata = {};
        optgroup.children().each(function(idx, opt){
            var selectItem = $(opt).find('input[type=radio]:checked');
            var selectValue = selectItem.val();
            var selectName = selectItem.data('siblingName');
            var siblingType = selectItem.data('siblingType');
            
            optdata[siblingType] = {
                name: selectName,
                value: selectValue
            }
        });

        return optdata;
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();