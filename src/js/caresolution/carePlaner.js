
(function(){

    var _categoryItemTemplate = '<li><a href="#n" data-cate-id="{{categoryID}}">{{categoryName}}</a></li>';

    var _listItemTemplate =
        '<li class="item">'+
        '   <div class="prd-care-vertical module-type1" data-index="{{index}}">'+
        '       <div class="img-wrap">'+
        '           <a href="#n">'+
        '               <img src="{{modelImg}}" alt="{{userFriendlyName}}">'+
        '           </a>'+
        '       </div>'+
        '       <div class="txt-wrap">'+
        '           <p class="tit">'+
        '               <a href="#n">'+
        '                   <span class="blind">제품 디스플레이 네임</span>{{userFriendlyName}}'+
        '               </a>'+
        '           </p>'+
        '           <p class="code"><span class="blind">제품 코드</span>{{modelName}}</p>'+
        '       </div>'+
        '       <div class="info-wrap">'+
        '           <div class="opt-info">'+
        '               <dl>'+
        '                   <dt>색상</dt>'+
        '                   <dd class="color-opt" role="radiogroup">'+
        '                       <div class="slide-wrap ui_carousel_slider2">'+
        '                           <div class="slide-content ui_carousel_list">'+
        '                               <div class="slide-track ui_carousel_track">'+
        '                               {{#each item in siblingColors}}'+
        '                                   <div class="slide-conts ui_carousel_slide">'+
        '                                       <div role="radio" class="chk-wrap-colorchip {{item.siblingValue}}" title="{{item.siblingValue}}">'+
        '                                           <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="color-{{modelId}}" {{#if selectColorID==item.siblingCode}}checked{{/if}}>'+
        '                                           <label for="{{item.siblingCode}}-{{modelId}}"><span class="blind">{{item.siblingValue}}</span></label>'+
        '                                       </div>'+
        '                                   </div>'+
        '                               {{/each}}'+
        '                               </div>'+
        '                           </div>'+
        '                           <div class="slide-controls">'+
        '                               <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
        '                               <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
        '                           </div>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>가입비</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
        '                       {{#each item in siblingFee}}'+
        '                           <li>'+
        '                               <span class="rdo-wrap">'+
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="fee-{{modelId}}" {{#if selectFeeID==item.siblingCode}}checked{{/if}}>'+
        '                                   <label for="{{item.siblingCode}}-{{modelId}}">{{item.siblingValue}}</label>'+
        '                               </span>'+
        '                           </li>'+
        '                       {{/each}}'+
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>의무사용</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
        '                       {{#each item in siblingUsePeriod}}'+
        '                           <li>'+
        '                              <span class="rdo-wrap">'+
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="period-{{modelId}}" {{#if selectUserPeriodID==item.siblingCode}}checked{{/if}}>'+
        '                                   <label for="{{item.siblingCode}}-{{modelId}}">{{item.siblingValue}}</label>'+
        '                               </span>'+
        '                           </li>'+     
        '                       {{/each}}'+                       
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>방문주기</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
        '                       {{#each item in siblingVisitCycle}}'+
        '                           <li>'+
        '                               <span class="rdo-wrap">'+
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="visit-{{modelId}}" {{#if selectVisitCycleID==item.siblingCode}}checked{{/if}}>'+
        '                                   <label for="{{item.siblingCode}}-{{modelId}}">{{item.siblingValue}}</label>'+
        '                               </span>'+
        '                           </li>'+     
        '                       {{/each}}'+                       
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+                
        '           </div>'+
        '           <div class="price-wrap">'+
        '               <dl class="total-price">'+
        '                   <dt>월 요금</dt>'+
        '                   <dd>{{monthlyPrice}}</dd>'+
        '               </dl>'+
        '           </div>'+
        '       </div>'+
        '       <div class="prd-add">'+
        '           <button type="button" class="btn-add"><span>담기</span></button>'+
        '       </div>'+
        '   </div>'+
        '</li>';

    var _putItemTemplate = 
    '<div class="slide-wrap ui_carousel_slider3">'+
    '   <div class="slide-content ui_carousel_list">'+
    '       <div class="slide-track ui_carousel_track">'+
    '       {{#each item in putitem_list}}'+
    '           <div class="slide-conts ui_carousel_slide">'+
    '               <div class="conts-wrap">'+
    '                   <div class="prd-care-horizon">'+
    '                       <div class="img-wrap">'+
    '                           <img src="{{item.itemData.modelImg}}" alt="{{item.itemData.userFriendlyName}}">'+
    '                       </div>'+
    '                       <div class="txt-wrap">'+
    '                           <div class="flag-wrap">'+
    '                               <span class="flag"><span class="blind">서비스명</span>{{item.itemData.serviceName}}</span>'+
    '                           </div>'+
    '                           <div class="tit-info">'+
    '                               <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{item.itemData.userFriendlyName}}</p>'+
    '                               <p class="code"><span class="blind">제품 코드</span>{{item.itemData.modelName}}</p>'+
    '                           </div>'+
    '                           <p class="etc">월 {{item.itemData.monthlyPrice}}</p>'+
    '                       </div>'+            
    '                       <div class="del-item">'+
    '                           <button type="button" class="btn-del" tabindex="" data-put-id="{{item.putID}}"><span class="blind">제품 삭제</span></button>'+
    '                       </div>'+            
    '                   </div>'+
    '               </div>'+
    '           </div>'+
    '       {{/each}}'+
    '       </div>'+
    '   </div>'+
    '   <div class="slide-controls">'+
    '       <button type="button" class="btn-arrow prev ui_carousel_prev"><span class="blind">이전</span></button>'+
    '       <button type="button" class="btn-arrow next ui_carousel_next"><span class="blind">다음</span></button>'+
    '   </div>'+
    '</div>';

    var _showItemLength = 8;
    
    var _totalContract;

    var _page, _pageTotal;
    var _currentItemList;

    var _prodListUrl;
    var _categoryListUrl;

    var $caresolutionContainer;
    var $fixedTab;
    var $typeTab;
    var $categoryTab;
    var $sortSelector;
    var $prodListContainer;
    var $putItemContaienr;

    function init(){
        vcui.require(['ui/carousel', 'ui/tab', 'ui/sticky'], function () {
            setting();
            eventBind();

            loadCategoryList();
        });
    }

    function setting(){
        $caresolutionContainer = $('.care-solution-wrap');
        $fixedTab = $('.fixed-tab-wrap');
        $typeTab = $fixedTab.find('.tabs-wrap.btn-type');
        $categoryTab = $fixedTab.find('.tabs-wrap.border-type');
        $sortSelector = $('.sort-select-wrap select');
        $prodListContainer = $('.prd-list-wrap');
        $putItemContaienr = $('.prd-select-wrap');

        _totalContract = $('.ui_total_prod').data('prodTotal');

        _categoryListUrl = $caresolutionContainer.data("cateList");
        _prodListUrl = $caresolutionContainer.data("prodList");

        $fixedTab.vcSticky({stickyContainer: ".care-solution-wrap", marginTop: -30});

        $('.ui_carousel_slider').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            variableWidth : true,
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
                    breakpoint: 1024,
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

    function eventBind(){
        $categoryTab.on('click', '> .tabs > li > a', function(e){
            e.preventDefault();

            selectedTab(this);

            loadCareProdList(true);
        });

        $sortSelector.on('change', function(e){
            changeSortType();
        });

        $prodListContainer.find('> ul.inner').on('click', '> li.item .prd-add .btn-add', function(e){
            e.preventDefault();
            
            var idx = $(this).parents('.prd-care-vertical').data('index')-1;
            addPutItem(idx);
        });

        $prodListContainer.find('> ul.inner').on('change', '> li.item .info-wrap input[type=radio]', function(e){
            e.preventDefault();
            
            var idx = $(this).parents('.prd-care-vertical').data('index')-1;
            console.log(idx);
        });

        $putItemContaienr.on('click', 'button.btn-del', function(e){
            e.preventDefault();

            var putId = $(this).data('putId');
            removePutItem(putId);
        })

        $(window).on("changeStorageData", function(){
            setPutItems();
            setPutItemStatus();
        })
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
            selectedTab($categoryTab.find('> .tabs > li:nth-child(1) > a'));

            loadCareProdList(false);
        });
    }

    function loadCareProdList(isLoading){
        if(isLoading) lgkorUI.showLoading();

        var tabID = getTabID();
        var cateID = getCategoryID();
        var serviceName = getServiceName();
        lgkorUI.requestAjaxData(_prodListUrl, {tabID: tabID, categoryID: cateID}, function(result){

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
    }

    function addProdItemList(){
        var first = _page;
        var last = _page + _showItemLength;
        if(last > _currentItemList.length) last = _currentItemList.length;
        for(var i=first;i < last;i++){
            var prodlist = vcui.template(_listItemTemplate, _currentItemList[i]);
            $prodListContainer.find('> ul.inner').append($(prodlist).get(0));
        }

        $('.ui_carousel_slider2').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : false,
            speed : 200,
            dots: false
        });
    }

    function addPutItem(idx){        
        var data = {
            itemData: _currentItemList[idx],
            putID : _currentItemList[idx]['modelId'] + "-" + parseInt(Math.random()*999) + "-" + parseInt(Math.random()*99) + "-" + parseInt(Math.random()*9999)
        }

        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        if(putItemStorage[lgkorUI.CAREPLANER_ID] == undefined){
            putItemStorage[lgkorUI.CAREPLANER_ID] = [data];
        } else{
            var leng = putItemStorage[lgkorUI.CAREPLANER_ID].length;
            if(leng + _totalContract < lgkorUI.CAREPLANER_LIMIT){
                putItemStorage[lgkorUI.CAREPLANER_ID].push(data);
            } else{
                alert("limit over!!");
                return false;
            }
        }
        lgkorUI.setStorage(lgkorUI.CAREPLANER_KEY, putItemStorage);

        console.log(lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY))
    }

    function removePutItem(id){
        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        putItemStorage[lgkorUI.CAREPLANER_ID] = vcui.array.filter(putItemStorage[lgkorUI.CAREPLANER_ID], function(item){
            return item['putID'] != id;
        });

        lgkorUI.setStorage(lgkorUI.CAREPLANER_KEY, putItemStorage);
    }

    function setPutItems(){
        $putItemContaienr.find('.contract-slide').empty();

        var putItemCompare = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        var isPutItem = vcui.isEmpty(putItemCompare);
        if(!isPutItem){
            var listItem = vcui.template(_putItemTemplate, putItemCompare);
            $putItemContaienr.find('.contract-slide').append(listItem);

            $putItemContaienr.css('display', 'block');
            $('.ui_carousel_slider3').vcCarousel({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                variableWidth : true,
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

        var leng = putItemCompare[lgkorUI.CAREPLANER_ID] == undefined ? "0" : putItemCompare[lgkorUI.CAREPLANER_ID].length;
        $putItemContaienr.find('.tit_wrap .num strong').html(leng);
    }

    function setPutItemStatus(){
        var leng = $putItemContaienr.find('.contract-slide').length;
        if(leng){
            if($putItemContaienr.css('display') == 'none'){
                var height = $putItemContaienr.outerHeight(true);
                $putItemContaienr.css({display:'block', y:height});
                openPutItemBox();
            } 
        } else{
            hidePutItemBox();
        }
    }

    function openPutItemBox(){
        $putItemContaienr.removeClass('close');

        $putItemContaienr.stop().transition({y:0}, 550, "easeInOutCubic");
    }

    function closePutItemBox(){
        if(!$putItemContaienr.hasClass('close')) $putItemContaienr.addClass('close');

        //var height = _$('.KRP0018').outerHeight(true) - $('.sticy-compare .compare-title').outerHeight(true);
        //_$('.KRP0018').stop().transition({y:height}, 350, "easeInOutCubic");
    }

    function hidePutItemBox(){
        if(!$putItemContaienr.hasClass('close')) $putItemContaienr.addClass('close');

        // var height = _$('.KRP0018').outerHeight(true);
        // _$('.KRP0018').stop().transition({y:height}, 350, "easeInOutCubic", function(){
        //     _$('.KRP0018').css({display:'none', y:0});
        // });
    }

    function selectedTab(item){
        $(item).parents('li').siblings('li').removeClass('on').find('a').attr("aria-selected", false).find('em').remove();
        $(item).parent().addClass('on');
        $(item).attr("aria-selected", true).append('<em class="blind">선택됨</em>');
    }

    function getTabID(){
        var currentab = $typeTab.find('.tabs li[class=on]');
        var tabID = currentab.find('a').data('tabId');

        return tabID;
    }

    function getCategoryID(){
        var currentcate = $categoryTab.find('.tabs li[class=on]');
        var cateID = currentcate.find('a').data('cateId');
        
        return cateID;
    }

    function getServiceName(){
        var currentab = $typeTab.find('.tabs li[class=on]');

        return currentab.find('a span').text();
    }

    function changeSortType(){
        console.log($sortSelector.val())
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();