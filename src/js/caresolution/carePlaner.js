
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
        '                           <select class="ui_selectbox" id="colorSet-{{modelId}}" title="색상 선택" data-sibling-type="siblingColors" {{#if siblingColors.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingColors}}'+
        '                               <option data-model-id="{{item.modelId}}" value="{{item.siblingCode}}"{{#if selectColorID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
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
    
    //무상케어십 계약
    var freeCareshipTemplate =
        '<li class="slide-conts ui_carousel_slide freeCareshipBox">'+
            '<div class="conts-wrap">'+
                '<div class="prd-care-horizon ui_flexible_box free-care comb-type">'+
                    '<div class="ui_flexible_cont">'+
                        '<p>케어십 일시납 확인으로 <br>기존 결합 할인 적용되었습니다.</p>'+
                        '<span>기존계약 문의 1577-4090</span>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</li>';

    var putItemPriceTemplate = 
        '<div class="total-info">'+
            '<dl>'+
                '<dt>이용 요금</dt>'+
                '<dd>{{totalPrice}}</dd>'+
            '</dl>'+
            '<dl>'+
                '<dt>결합 할인</dt>'+
                '<dd class="sale">{{totalTrans}}</dd>'+
            '</dl>'+
            '<dl class="last">'+
                '<dt>제휴카드 할인시</dt>'+
                '<dd class="sale sm">{{affiliateCard}}</dd>'+
            '</dl>'+
            '<a href="#n" class="btn"><span>견적 확인하기</span></a>'+
        '</div>';

        var _estimateProdTemplate =
            '<div class="estimate-list">'+
            '<ul>'+
            '   {{#each item in itemList}}'+
            '   <li class="item">'+
            '       <div class="img-wrap">'+
            '           <img src="{{item.imageUrl}}" alt="{{item.displayName}}">'+
            '       </div>'+
            '       <div class="txt-wrap">'+
            '           <div class="flag-wrap">'+
            '               <span class="flag"><span class="blind">서비스명</span>{{item.contractTypeNm}}</span>'+
            '           </div>'+
            '           <div class="tit-info">'+
            '               <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{item.displayName}}</p>'+
            '               <div class="etc-info">'+
            '                   <span class="txt"><span class="blind">제품 코드</span>{{item.modelCd}}</span>'+
            '                   <span class="txt"><span class="blind">색상</span>{{item.colorOption}}</span>'+
            '               </div>'+
            '           </div>'+
            '           <div class="etc-info">'+
            '               {{#each info in item.option}}'+
            '               <span class="txt">{{info}}</span>'+
            '               {{/each}}'+
            '           </div>'+
            '           <div class="price-info">'+
            '               <p class="price sale"><span class="blind">기본 이용 요금</span>{{item.originalPrice}}</p>'+
            '               <p class="price"><span class="blind">최종 이용 요금</span>{{item.monthPrice}}</p>'+
            '           </div>'+
            '       </div>'+
            '   {{/each}}'+
            '   </li>'+
            '</ul>'+
            '</div>';
        
        var _estimatePriceTemplate = 
            '<div class="estimate-price">'+
                '<dl>'+
                    '<dt>기본 이용 요금</dt>'+
                    '<dd>{{totalPrice}}</dd>'+
                '</dl>'+
                '<dl>'+
                    '<dt>결합 할인</dt>'+
                    '<dd class="sale">{{totalTrans}}</dd>'+
                '</dl>'+
                '<dl class="total">'+
                    '<dt>최종 이용 요금</dt>'+
                    '<dd>{{usedPrice}}</dd>'+
                '</dl>'+
                '<button type="button" class="btn block" onClick="location.href={{requestUrl}}">'+
                    '<span>청약 신청하기</span>'+
                '</button>'+
            '</div>';
            

    var _showItemLength = 8;

    var _isStorageChk = false;
    var _isStickyApply = false;

    var _page, _pageTotal;
    var _currentItemList;

    var _prodListUrl;
    var _categoryListUrl;

    var _changeColorUrl;
    var _priceStatusUrl;
    var _putItemUrl;
    var _estimateConfirmUrl;

    var $caresolutionContainer;
    var $fixedTab;
    var $serviceTab;
    var $categoryTab;
    var $categoryTabCtrler;
    var $sortSelector;
    var $prodListContainer;
    var $putItemContainer;

    var _serviceID = 0;

    var tempPutItemIdx, tempPutID;

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
        $serviceTab = $fixedTab.find('.tabs-wrap.new-type');
        $categoryTab = $fixedTab.find('.cate-scroll-wrap');
        $sortSelector = $('.sort-select-wrap select');
        $prodListContainer = $('.prd-list-wrap');
        $putItemContainer = $('.prd-select-wrap');

        _putMaxCount = $caresolutionContainer.data("maxCount");
        _categoryListUrl = $caresolutionContainer.data("cateList");
        _prodListUrl = $caresolutionContainer.data("prodList");

        _changeColorUrl = $caresolutionContainer.data("colorModel");
        _priceStatusUrl = $caresolutionContainer.data("priceStatus");
        _putItemUrl = $caresolutionContainer.data("putItem");
        _estimateConfirmUrl = $caresolutionContainer.data("estimateConfirm");

        $fixedTab.find('.service_tab').vcTab()
        .on('tabchange', function(e, data){
            changeService(data.selectedIndex)
        });

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
        }).on('change', '.info-wrap select', function(e){
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
                lgkorUI.resetFlexibleBox();
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

    //카테고리 로드...
    function loadCategoryList(){
        lgkorUI.showLoading();

        var tabID = getTabID();
        console.log("tabID :", tabID)
        lgkorUI.requestAjaxData(_categoryListUrl, {tabID: tabID}, function(result){
            if(result.data.success == "N"){
                lgkorUI.hideLoading();
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            $categoryTab.find('.tabs').empty();

            for(var id in result.data){
                var category = vcui.template(_categoryItemTemplate, result.data[id]);
                $categoryTab.find('.tabs').append($(category).get(0));
            }
            $categoryTabCtrler.resetStatus(0);

            $('.service-tooltop .txt-wrap').hide();
            $('.service-tooltop .txt-wrap').eq(_serviceID).show();

            if(!_isStickyApply){
                _isStickyApply = true;
                $fixedTab.vcSticky({stickyContainer: ".care-solution-wrap", stickyClass:"tab-fix"});
            }

            loadCareProdList(false);
        });
    }

    //상품 리스트 로드...
    function loadCareProdList(isLoading){
        if(isLoading) lgkorUI.showLoading();
        
        var serviceName = getServiceName();
        var requestData = {
            tabID: getTabID(),
            categoryID: getCategoryID(),
            sortID: getSortID()
        }
        lgkorUI.requestAjaxData(_prodListUrl, requestData, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }
            
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
        });

        if(!_isStorageChk){
            _isStorageChk = true;

            setPutItems();
            setPutItemStatus();
        }
    }

    //서비스 변경...
    function changeService(sid){
        if(_serviceID != sid){
            _serviceID = sid;

            if(location.hostname === 'localhost'){
                if(_serviceID == 0){
                    _categoryListUrl = "/lg5-common/data-ajax/caresolution/carePlanerCategory.json";
                    _prodListUrl = "/lg5-common/data-ajax/caresolution/carePlanerProductList.json";
                } else{
                    _categoryListUrl = "/lg5-common/data-ajax/caresolution/carePlnerCareshipCategory.json";
                    _prodListUrl = "/lg5-common/data-ajax/caresolution/carePlanerCareshipList.json";
                }
            }

            loadCategoryList();
        }
    }

    //옵션 변경 시...
    function changeItemOptions(item){
        var idx = $(item).closest('.prd-care-vertical').data('index')-1;
        var optionData = getOptionData(item);

        var siblingType = $(item).data('siblingType');
        if(siblingType == "siblingColors"){
            setChangeColorChip(idx, optionData.optdata["siblingColors"].value, optionData.optdata["siblingColors"].modelId);
        } else{
            setChangeOptionChip(idx, optionData.optdata)
        }
    }

    //색상 외 옵션 변경...
    function setChangeOptionChip(idx, optdata){
        lgkorUI.showLoading();

        var sendata = {
            modelID: _currentItemList[idx]['modelId'],
            rtModelSeq: _currentItemList[idx]['rtModelSeq'],
            feeCd: optdata['siblingFee'].value,
            usePeriodCd: optdata['siblingUsePeriod'].value,
            visitCycleCd: optdata['siblingVisitCycle'].value,
            blockID: idx
        }

        lgkorUI.requestAjaxData(_priceStatusUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }
            
            var blockID = result.data.blockID;
            
            _currentItemList[blockID]["rtModelSeq"] = result.data["rtModelSeq"];
            _currentItemList[blockID]["monthlyPrice"] = result.data["monthPrice"];

            $prodListContainer.find('> ul.inner > li.item').eq(blockID).find('.price-wrap .price').text("월 " + result.data["monthPrice"] + "원");
        });
    }

    //색상 옵션 변경...
    function setChangeColorChip(idx, colorCd, colorModelId){
        lgkorUI.showLoading();
        
        var sendata = {
            modelID: colorModelId,
            colorCd: colorCd,
            blockID: idx
        }

        lgkorUI.requestAjaxData(_changeColorUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            var blockID = result.data.blockID;
            
            for(var key in result.data){
                _currentItemList[blockID][key] = result.data[key];
            }

            var deleteItem = $prodListContainer.find('> ul.inner > li.item').eq(blockID);

            var prodlist = vcui.template(_listItemTemplate, _currentItemList[blockID]);
            var addItem = $(prodlist).get(0);
            deleteItem.before(addItem);
            deleteItem.remove();

            $(addItem).find('.ui_selectbox').vcSelectbox().on('selectboxopen', function(e, sbox){
                var dl = $(sbox).closest('dl');
                if(!dl.hasClass('open')) dl.addClass('open');
            }).on('selectboxclose', function(e, sbox){
                var dl = $(sbox).closest('dl');
                if(dl.hasClass('open')) dl.removeClass('open');
            });
        });
    }

    //상품 리스트 더보기...
    function setNextProdList(){
        var page = _page + 1;
        if(page < _pageTotal){
            _page = page;

            addProdItemList(true);
        }
    }


    //더보기 리스트 추가...
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

    function requestPutItem(sendata){
        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(_putItemUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            if(result.data.isLogin){
                $('.freeCareshipBox').remove();
                if(result.data.contract.freeCareShip == "Y"){
                    var addlist = vcui.template(freeCareshipTemplate);
                    $('.ui_total_prod .ui_carousel_slider .slide-track').prepend(addlist);
                } 
                $('.ui_total_prod .ui_carousel_slider').vcCarousel('reinit');
                lgkorUI.resetFlexibleBox();

                if(result.data.contract.transModelCheck){
                    $('.ui_total_prod .ui_carousel_slider').find('.ui_flexible_box[data-contract-flag='+result.data.contract.transModelCheck+']')
                    .eq(0).removeClass('comb-type').addClass('comb-type');
                }
            }
            
            var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
            if(tempPutItemIdx > -1){
                var data = {
                    itemData: _currentItemList[tempPutItemIdx],
                    putID : _currentItemList[tempPutItemIdx]['modelId'] + "-" + parseInt(Math.random()*999) + "-" + parseInt(Math.random()*99) + "-" + parseInt(Math.random()*9999)
                }                
                
                if(putItemStorage[lgkorUI.CAREPLANER_ID] == undefined){
                    putItemStorage[lgkorUI.CAREPLANER_ID] = [data];
                } else{     
                    putItemStorage[lgkorUI.CAREPLANER_ID].unshift(data);
                    $(window).trigger("toastshow", "제품 담기가 완료되었습니다.");
                }
                putItemStorage[lgkorUI.CAREPLANER_PRICE] = {
                    totalPrice: result.data.total.totalPrice,
                    totalTrans: result.data.total.totalTrans,
                    affiliateCard: result.data.total.affiliateCard
                }
            } else{
                putItemStorage[lgkorUI.CAREPLANER_ID] = vcui.array.filter(putItemStorage[lgkorUI.CAREPLANER_ID], function(item){
                    return item['putID'] != tempPutID;
                });
            }
            lgkorUI.setStorage(lgkorUI.CAREPLANER_KEY, putItemStorage);
        });
    }

    //담기...
    function addPutItem(item){ 
        var idx = $(item).parents('.prd-care-vertical').data('index')-1;
        var sendata = {
            modelIds: [_currentItemList[idx]['modelId']],
            rtModelSeqs: [_currentItemList[idx]['rtModelSeq']]
        }

        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        if(putItemStorage[lgkorUI.CAREPLANER_ID]){
            for(var key in putItemStorage[lgkorUI.CAREPLANER_ID]){
                var storageData = putItemStorage[lgkorUI.CAREPLANER_ID][key];
                sendata.modelIds.push(storageData.itemData.modelId);
                sendata.rtModelSeqs.push(storageData.itemData.rtModelSeq);
            }
        }

        tempPutItemIdx = idx;
        tempPutID = "";
        
        requestPutItem(sendata);
    }

    //담기 삭제...
    function removePutItem(id){
        var sendata = {modelIds:[], rtModelSeqs:[]};
        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        for(var key in putItemStorage[lgkorUI.CAREPLANER_ID]){
            var storageData = putItemStorage[lgkorUI.CAREPLANER_ID][key];
            if(storageData.putID != id){
                sendata.modelIds.push(storageData.itemData.modelId);
                sendata.rtModelSeqs.push(storageData.itemData.rtModelSeq);
            }
        }

        tempPutItemIdx = -1;
        tempPutID = id;
        
        requestPutItem(sendata);
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
                settings: "unbuild",
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
                        settings: "unbuild"
                    }
                ]
            });
            if(leng < 3){
                $('.ui_carousel_slider3').find('.slide-controls').hide();
            } else{
                $('.ui_carousel_slider3').find('.slide-controls').show();
            }
            $putItemContainer.css({display:display});
        }

        var totalinfo = $putItemContainer.find('.total-info');
        var newinfo = vcui.template(putItemPriceTemplate, putItemCompare[lgkorUI.CAREPLANER_PRICE]);
        totalinfo.after(newinfo);

        totalinfo.remove();
        
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
        lgkorUI.showLoading();
        
        var sendata = {modelIds:[], rtModelSeqs:[]};
        var putItemStorage = lgkorUI.getStorage(lgkorUI.CAREPLANER_KEY);
        for(var key in putItemStorage[lgkorUI.CAREPLANER_ID]){
            var storageData = putItemStorage[lgkorUI.CAREPLANER_ID][key];
            sendata.modelIds.push(storageData.itemData.modelId);
            sendata.rtModelSeqs.push(storageData.itemData.rtModelSeq);
        }

        lgkorUI.requestAjaxData(_estimateConfirmUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(result.data.success == "N"){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            var estimatePrice = $('#pop-estimate').find('.estimate-price');
            var newelement = vcui.template(_estimatePriceTemplate, result.data.priceInfo);
            estimatePrice.after(newelement);
            estimatePrice.remove();

            var cardSelector = $('#pop-estimate').find('.alliance-card .ui_selectbox');
            cardSelector.find('option').remove();
            for(var key in result.data.cardList){
                console.log(result.data.cardList[key].cardValue)
                cardSelector.append("<option value='" + result.data.cardList[key].cardValue + "'>" + result.data.cardList[key].cardName + "</option>");
            }
            cardSelector.vcSelectbox('update');

            if(result.data.cardDescription) $('#pop-estimate').find('.alliance-card .price').text(result.data.cardDescription).show();
            else $('#pop-estimate').find('.alliance-card .price').hide();
            
            $('#pop-estimate').find('.tit-wrap span.leng').empty().html("총 "+"<strong>"+result.data.totalCnt+"</strong>개");

            var listwrap = $('#pop-estimate').find('.estimate-list');
            var estimateProdList = vcui.template(_estimateProdTemplate, result.data);
            listwrap.after($(estimateProdList).get(0));
            listwrap.remove();

            $('#pop-estimate').vcModal();
                
            $('#pop-estimate').find('.estimate-list').vcCarousel({
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
        });
    }

    function getTabID(){
        var uitab = $fixedTab.find('.service_tab').vcTab('instance');
        return uitab.getSelectIdx();
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
        var currentab = $serviceTab.find('.tabs li[class=on]');
        
        return currentab.find('a').data("serviceName");
    }

    function getOptionData(item){
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
            
            optdata[siblingType] = {
                name: selectName,
                value: selectValue,
                modelId: selectModelId
            }
        });

        if(_serviceID == 0){
            optstring.push(
                "가입비 " + optdata["siblingFee"].name + "원 선납",
                "계약기간 " + optdata["siblingUsePeriod"].name,
                "의무 사용기간 " + optdata["siblingUsePeriod"].name,
                "방문 주기 " + optdata["siblingVisitCycle"].name + "/1회"
            );
        }

        return {
            optdata: optdata,
            optstring: optstring
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();