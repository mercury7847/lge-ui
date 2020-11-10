
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
        '                                           <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="color-{{modelId}}" value="{{item.siblingCode}}" data-sibling-name="{{item.siblingValue}}" data-sibling-type="siblingColors" {{#if selectColorID==item.siblingCode}}checked{{/if}}>'+
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
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="fee-{{modelId}}" value="{{item.siblingCode}}" data-sibling-name="{{item.siblingValue}}" data-sibling-type="siblingFee" {{#if selectFeeID==item.siblingCode}}checked{{/if}}>'+
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
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="period-{{modelId}}" value="{{item.siblingCode}}" data-sibling-name="{{item.siblingValue}}" data-sibling-type="siblingUsePeriod" {{#if selectUserPeriodID==item.siblingCode}}checked{{/if}}>'+
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
        '                                   <input type="radio" id="{{item.siblingCode}}-{{modelId}}" name="visit-{{modelId}}" value="{{item.siblingCode}}" data-sibling-name="{{item.siblingValue}}" data-sibling-type="siblingVisitCycle" {{#if selectVisitCycleID==item.siblingCode}}checked{{/if}}>'+
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
    var $sortSelector;
    var $prodListContainer;
    var $putItemContainer;

    function init(){
        vcui.require(['ui/carousel', 'ui/tab', 'ui/sticky', 'ui/modal', 'ui/selectbox'], function () {
            // setting();
            // eventBind();

            // loadCategoryList();


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

        $('.ui_carousel_slider2').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : false,
            speed : 200,
            dots: false
        });
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
        $('.ui_carousel_slider4').vcCarousel({
            infinite: false,
            slidesToScroll: 1,
            variableWidth : true,
            speed : 200,
            dots: false
        });

        $('.prd-select-wrap').css({display:'block'});

        var selectbox = $('.ui_selectbox').vcSelectbox('instance').on('selectboxopen', function(e, sbox){
            var dl = $(sbox).closest('dl');
            if(!dl.hasClass('open')) dl.addClass('open');
        }).on('selectboxclose', function(e, sbox){
            var dl = $(sbox).closest('dl');
            if(dl.hasClass('open')) dl.removeClass('open');
        })
        });


    }

    function setting(){
        $caresolutionContainer = $('.care-solution-wrap');
        $fixedTab = $('.fixed-tab-wrap');
        $typeTab = $fixedTab.find('.tabs-wrap.btn-type');
        $categoryTab = $fixedTab.find('.tabs-wrap.border-type');
        $sortSelector = $('.sort-select-wrap select');
        $prodListContainer = $('.prd-list-wrap');
        $putItemContainer = $('.prd-select-wrap');

        _totalContract = $('.ui_total_prod').data('prodTotal');

        _categoryListUrl = $caresolutionContainer.data("cateList");
        _prodListUrl = $caresolutionContainer.data("prodList");

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

            var categorytop = $caresolutionContainer.offset().top;
            $('html, body').animate({scrollTop:categorytop}, 120, function(){
                loadCareProdList(true);
            });
        });

        $sortSelector.on('change', function(e){
            loadCareProdList(true);
        });

        $prodListContainer.on('click', '> ul.inner > li.item .prd-add .btn-add', function(e){
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
            selectedTab($categoryTab.find('> .tabs > li:nth-child(1) > a'));

            if(!_isStickyApply){
                _isStickyApply = true;
                $fixedTab.vcSticky({stickyContainer: ".care-solution-wrap"});
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
        console.log("requestData : ", requestData)
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

        $('.ui_carousel_slider2').vcCarousel({
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : false,
            speed : 200,
            dots: false
        });
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
    }

    function closePutItemBox(){
        putItemStatus("close");

        var height = $putItemContainer.outerHeight(true) - $putItemContainer.find('.tit-wrap').outerHeight(true);
        $putItemContainer.stop().transition({y:height}, 350, "easeInOutCubic");
        $putItemContainer.find('.tit-wrap').stop().transition({'padding-bottom': 32}, 550, 'easeInOutCubic');
    }

    function hidePutItemBox(){
        putItemStatus("close");

        var height = $putItemContainer.outerHeight(true);
        $putItemContainer.stop().transition({y:height}, 350, "easeInOutCubic", function(){
           $putItemContainer.css({display:'none', y:0});
        });
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

    function getSortID(){
        return $sortSelector.val();
    }

    function getServiceName(){
        var currentab = $typeTab.find('.tabs li[class=on]');

        return currentab.find('a span').text();
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