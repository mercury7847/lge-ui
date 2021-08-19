
(function(){

    var _categoryItemTemplate = '<li><a href="#n" data-cate-id="{{categoryID}}">{{categoryName}}</a></li>';
    
    // [.prd-care-vertical 옵션]
    // 1. 타입
    // .module-type1 : 케어솔루션_제품모튤
    // .module-type2 : 케어십_유상제품 모듈
    // .module-type3 : 케어십_보유제품 모듈
    // .module-type4 : 케어십_용역제품 모듈
    // 20210720 BTOCSITE-2537 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발
    var _listItemTemplate =
        '<li class="item">'+
        '   <div class="prd-care-vertical {{moduleType}}" data-index="{{index}}">'+
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
        '                   <dt>{{siblingTypeName}}</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" id="colorSet-{{modelId}}" title="{{siblingTypeName}} 선택" data-sibling-type="siblingColors" {{#if siblingColors.length == 1}}disabled{{/if}}>'+
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
        '           {{#if typeof siblingContractPeriod !== "undefined" && siblingContractPeriod.length > 0}}'+
        '               <dl {{#if siblingContractPeriod.length == 1}}class="disabled"{{/if}}>'+
        '                   <dt>계약기간</dt>'+
        '                   <dd>'+
        '                       <div class="sort-select-wrap">'+
        '                           <select class="ui_selectbox" data-combo-id="1" id="contractPeriodSet-{{modelId}}" title="계약기간 선택" data-sibling-type="siblingContractPeriod" {{#if siblingContractPeriod.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingContractPeriod}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectContractPeriodID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
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
        '                       <div class="sort-select-wrap"> '+
        '                           <select class="ui_selectbox" data-combo-id="2" id="usePeriodSet-{{modelId}}" title="의무사용 선택" data-sibling-type="siblingUsePeriod" {{#if siblingUsePeriod.length == 1}}disabled{{/if}}>'+
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
        '                           <select class="ui_selectbox" data-combo-id="3" id="visiSet-{{modelId}}" title="방문주기 선택" data-sibling-type="siblingVisitCycle" {{#if siblingVisitCycle.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingVisitCycle}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectVisitCycleID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
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
        '                           <select class="ui_selectbox" data-combo-id="4" id="feeSet-{{modelId}}" title="가입비 선택" data-sibling-type="siblingFee" {{#if siblingFee.length == 1}}disabled{{/if}}>'+
        '                           {{#each item in siblingFee}}'+
        '                               <option value="{{item.siblingCode}}"{{#if selectFeeID==item.siblingCode}} selected{{/if}}>{{item.siblingValue}}</option>'+
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
        '                   <div class="prd-care-horizon ui_flexible_box{{#if item.combineFlag == "Y"}} comb-type{{/if}}">'+
        '                       <div class="ui_flexible_cont">'+
        '                           <div class="img-wrap">'+
        '                               <img src="{{item.modelImg}}" alt="{{#raw item.displayName}}">'+
        '                           </div>'+
        '                           <div class="txt-wrap">'+
        '                             <div class="flag-wrap">'+
        '                                   <span class="flag"><span class="blind">서비스명</span>{{item.contractTypeNm}}</span>'+
        '                               </div>'+
        '                               <div class="tit-info">'+
        '                                   <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{#raw item.displayName}}</p>'+
        '                                   <p class="code"><span class="blind">제품 코드</span>{{item.modelName}}</p>'+
        '                               </div>'+
        '                               <p class="etc">월 {{item.originalPrice}}<span class="comb-txt">{{#raw item.combineText}}</span></p>'+
        '                           </div>'+  
        '                           <div class="del-item">'+
        '                               <button type="button" class="btn-del" tabindex="" data-model-id="{{item.modelId}}"><span class="blind">제품 삭제</span></button>'+
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

    var addFreeCareShipTempalte = 
        '<li class="slide-conts ui_carousel_slide freeCareshipBox">'+
            '<div class="conts-wrap">'+
                '<div class="prd-care-horizon ui_flexible_box holding-care2">'+
                    '<div class="ui_flexible_cont">'+
                        '<div class="box">'+
                            '<p class="tit">케어십 일시납 확인으로 기존 제품과의<br>결합 할인이 가능합니다.<br>제품을 담아 할인을 받아보세요.</p>'+
                            '<p class="txt">결합 할인 가능 제품만 해당, 기존계약 문의 1577-4090</p>'+
                        '</div>'+
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
            '           <img src="{{item.imageUrl}}" alt="{{#raw item.displayName}}">'+
            '       </div>'+
            '       <div class="txt-wrap">'+
            '           <div class="flag-wrap">'+
            '               <span class="flag"><span class="blind">서비스명</span>{{item.contractTypeNm}}</span>'+
            '           </div>'+
            '           <div class="tit-info">'+
            '               <p class="tit"><span class="blind">제품 디스플레이 네임</span>{{#raw item.displayName}}</p>'+
            '               <div class="etc-info">'+
            '                   <span class="txt"><span class="blind">제품 코드</span>{{item.modelName}}</span>'+
            '                   {{#if item.colorOption}}<span class="txt"><span class="blind">색상</span>{{item.colorOption}}</span>{{/if}}'+
            '               </div>'+
            '           </div>'+
            '           <div class="etc-info">'+
            '               {{#each info in item.option}}'+
            '               <span class="txt">{{info}}</span>'+
            '               {{/each}}'+
            '           </div>'+
            '           <div class="price-info">'+
            '               {{#if item.originalPrice}}<p class="price sale"><span class="blind">기본 이용 요금</span>월 {{item.originalPrice}}</p>{{/if}}'+
            '               <p class="price"><span class="blind">최종 이용 요금</span>월 {{item.monthPrice}}</p>'+
            '           </div>'+
            '       </div>'+
            '   {{/each}}'+
            '   </li>'+
            '</ul>'+
            '</div>';
            
    var noData = '<div class="no-data"><p>해당 카테고리의 제품이 없습니다.</p></div>';

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

    var _putItemList = [];

    var $caresolutionContainer;
    var $fixedTab;
    var $serviceTab;
    var $categoryTab;
    var $categoryTabCtrler;
    var $sortSelector;
    var $prodListContainer;
    var $putItemContainer;

    var _serviceID = 0;

    var _careCateId = "";
    var _isDirectCare = false;

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

        _careCateId = $caresolutionContainer.data("careCateId");

        $fixedTab.find('.service_tab').vcTab()
        .on('tabchange', function(e, data){
            changeService(data.selectedIndex)
        });

        $categoryTabCtrler = new vcui.ui.SmoothScrollTab('.ui_smoothScroll_tab');

        $(window).on('breakpointchange', function(e){
            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'pc'){    
                $('.contents.care-plan').find('.ui_carousel_slider').vcCarousel({
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
                        }
                    ]
                });   
                $('.contents.care-plan').find('.ui_carousel_slider .slide-controls').show();
            }else if(breakpoint.name == 'mobile'){    
                $('.contents.care-plan').find('.ui_carousel_slider').vcCarousel('destroy');    
                $('.contents.care-plan').find('.ui_carousel_slider .slide-controls').hide();                        
            }    
        });
        $(window).trigger('breakpointchange');
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

            var itenIdx = $(this).closest('li').index();
            removePutItem(itenIdx);
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
            } ;
        });

        $putItemContainer.find('.ui_active_toggle').off('click').on('click', function(e){
            e.preventDefault();
            
            var isOpen = !$(this).data('isOpen');
            setMobilePutItemBoxStatus(isOpen, true);
        })

        //카드 할인 드롭다운 선택
        $('#pop-estimate').on('click','.alliance-card .select-list li a', function(e){
            e.preventDefault();
            
            var $this = $(this);
            var $dropDown = $this.parents('.ui_dropdown');
            var cardId = $this.data("cardId");
            var selectext = cardId == "" ? $('#pop-estimate').data("cardDescription") : $this.attr('data-card-title');
            $dropDown.find('a.ui_dropdown_toggle').text(selectext);
            
            $dropDown.vcDropdown("close");

            var maxCardSale = $this.attr('data-card-sale');
            if(maxCardSale > 0) $('#pop-estimate').find('.discount-price').show().text("월 최대 " + vcui.number.addComma(maxCardSale) + "원 할인");
            else $('#pop-estimate').find('.discount-price').hide();

            $('#pop-estimate').data("selectId", $this.data('cardId'));

            var sumTotal = parseInt($('#pop-estimate').data("sumPrice"));
            var sum =  sumTotal - maxCardSale;
            if(sum < 0) sum = 0;
            var addCommaSum = vcui.number.addComma(sum);
            $('#pop-estimate').find(".estimate-usedPrice").text("월 " + addCommaSum + "원");

            $('#pop-estimate').find('.pop-conts > .bullet-list').hide();
            var descId = $this.data('descId');
            if(descId != "") $('#pop-estimate').find('.pop-conts > .bullet-list').eq(parseInt(descId)-1).show();            

        }).on('click', '.estimate-price > button', function(e){
            e.preventDefault();

            sendRequestConfirm();
        });

        $(window).on("scroll", function(){
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

    function setMobilePutItemBoxStatus(isOpen, anim){
        if(window.breakpoint.isMobile){
            var wraptop;
            var item = $putItemContainer.find('.ui_active_toggle');
            if(isOpen){
                $putItemContainer.find('.total-info').removeAttr('style');
                $putItemContainer.find('.total-info dl').show();
                wraptop = $(window).height() - $putItemContainer.find('.total-info').outerHeight(true) - $putItemContainer.find('.tit-wrap').outerHeight(true) - $putItemContainer.find('.slide-wrap').outerHeight(true) - 10;
                if(wraptop < 0) wraptop = 0;
                item.css({transform:'rotate(0deg)'});
            } else{
                $putItemContainer.find('.total-info').css({background:'#ffffff'})
                $putItemContainer.find('.total-info dl').hide();
                wraptop = $(window).height() - $putItemContainer.find('.total-info').outerHeight(true) - $putItemContainer.find('.tit-wrap').outerHeight(true)  +5;
                item.css({transform:'rotate(180deg)'});
            }
            item.data('isOpen', isOpen);
    
            if(window.breakpoint.name == 'mobile'){
                if(anim) $putItemContainer.stop().animate({top:wraptop}, 220);
                else $putItemContainer.css({top:wraptop});
            }
        }
    }

    function sendRequestConfirm(){
        lgkorUI.showLoading();

        var url = $('#pop-estimate').data('requestUrl');
        var sendata = {
            rtModelSeq: $('#pop-estimate').data('rtModelSeq'),
            easyRequestCard: $('#pop-estimate').data('selectId')
        }

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(url, sendata, function(result){
            lgkorUI.hideLoading();
            
            var alert = result.data.alert;
            if(alert) {
                if(alert.isConfirm) {
                    //컨펌
                    var obj ={title: alert.title,
                        typeClass: '',
                        cancelBtnName: alert.cancelBtnName,
                        okBtnName: alert.okBtnName,
                        ok: alert.okUrl ? function (){
                            location.href = alert.okUrl;
                        } : function (){},
                        cancel: alert.cancelUrl ? function (){
                            location.href = alert.cancelUrl;
                        } : function (){}
                    };
    
                    var desc = alert.desc ? alert.desc : null;
                    if(alert.title && alert.desc) {
                        obj.typeClass = 'type2'
                    }
                    lgkorUI.confirm(desc, obj);
                } else {
                    //알림
                    var obj ={title: alert.title,
                        typeClass: '',
                        cancelBtnName: alert.cancelBtnName,
                        okBtnName: alert.okBtnName,
                        ok: function (){}
                    };
    
                    var desc = alert.desc;
                    if(desc) {
                        obj.typeClass = 'type2'
                    }
                    lgkorUI.alert(desc, obj);
                }
            } else {
                window.location.href = result.data.sendUrl;
            }
        }, "POST");
    }

    //카테고리 로드...
    function loadCategoryList(){
        lgkorUI.showLoading();
        
        if(!_isDirectCare && _careCateId){
            var uitab = $fixedTab.find('.service_tab').vcTab('instance');
            uitab.select(_careCateId.tabId, true);

            _serviceID = _careCateId.tabId;
        }

        var tabID = getTabID();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_categoryListUrl, {tabID: tabID}, function(result){

            $categoryTab.find('.tabs').empty();

            var selectId = 0;
            for(var id in result.data){
                if(!_isDirectCare && _careCateId && _careCateId.tabCategoryId === result.data[id].categoryID){
                    selectId = id;
                }
                var category = vcui.template(_categoryItemTemplate, result.data[id]);
                $categoryTab.find('.tabs').append($(category).get(0));
            }
            $categoryTabCtrler.resetStatus(selectId);

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
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_prodListUrl, requestData, function(result){
            lgkorUI.hideLoading();
            
            if(!lgkorUI.stringToBool(result.data.success)){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }
            
            _currentItemList = vcui.array.map(result.data.productList, function(item, idx){                
                item['index'] = idx+1;
                item["serviceName"] = serviceName;

                setSiblingCodeNumbering(item);

                return item;
            });
            var leng = _currentItemList.length;
            var div = leng/_showItemLength;
            var rest = leng%_showItemLength;
            _page = 0;
            _pageTotal = parseInt(div);
            if(rest) _pageTotal += 1;

            $prodListContainer.find('> ul.inner').empty();

            if(leng){
                addProdItemList();
            } else{
                $prodListContainer.find('> ul.inner').append(noData);
            }
            

            if(!_isDirectCare && _careCateId && _careCateId.tabModelId) {
                var findArr = vcui.array.filter(result.data.productList, function(item, index) {
                    return (item.modelId == _careCateId.tabModelId);
                });
                if(findArr.length > 0) {
                    var findModel = JSON.parse(JSON.stringify(findArr[0]));
                    if(_careCateId.tabRtModelSeq) {
                        findModel.rtModelSeq = _careCateId.tabRtModelSeq;
                    }
                    requestAddPutItem(findModel);
                }
            }
            _isDirectCare = true;
            _careCateId = null;
        });
    }

    function setSiblingCodeNumbering(item){
        var key;
        for(key in item.siblingFee) item.siblingFee[key].siblingCode = item.siblingFee[key].siblingCode.toString();
        for(key in item.siblingUsePeriod) item.siblingUsePeriod[key].siblingCode = item.siblingUsePeriod[key].siblingCode.toString();
        for(key in item.siblingVisitCycle) item.siblingVisitCycle[key].siblingCode = item.siblingVisitCycle[key].siblingCode.toString();
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
        console.log("siblingType:",siblingType)
        if(siblingType == "siblingColors"){
            setChangeColorChip(idx, optionData.optdata);
        } else{
            setChangeOptionChip(idx, optionData.optdata, $(item).data('comboId'))
        }
    }

    //색상 외 옵션 변경...
    function setChangeOptionChip(idx, optdata, comboId){
        lgkorUI.showLoading();
        
        var sendata = {
            tabID: getTabID(),
            modelID: _currentItemList[idx]['modelId'],
            rtModelSeq: _currentItemList[idx]['rtModelSeq'],
            comboFlag: comboId,
            blockID: idx
        }

        // BTOCSITE-3499 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발_후속작업
        // 파라메터 없을시 기본값 적용
        if(optdata['siblingContractPeriod']) sendata.contractPeriodCd = optdata['siblingContractPeriod'].value || 0;
        if(optdata['siblingUsePeriod']) sendata.usePeriodCd = optdata['siblingUsePeriod'].value || 0;
        if(optdata['siblingVisitCycle']) sendata.visitCycleCd = optdata['siblingVisitCycle'].value || 0;
        if(optdata['siblingFee']) sendata.feeCd = optdata['siblingFee'].value || 0;

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_priceStatusUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(!lgkorUI.stringToBool(result.data.success)){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }
            
            var blockID = result.data.blockID;

            _currentItemList[blockID]["rtModelSeq"] = result.data["rtModelSeq"];
            _currentItemList[blockID]["monthlyPrice"] = result.data["monthPrice"];

            $prodListContainer.find('> ul.inner > li.item').eq(blockID).find('.price-wrap .price').text("월 " + result.data["monthPrice"] + "원");

            if(sendata.tabID == 0){
                var listBlock = $prodListContainer.find('> ul.inner > li.item').eq(blockID);

                // 20210720 BTOCSITE-2537 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발
                var o = result.data.siblingContractPeriod;
                var selectContractPeriodID = Object.keys(o).reduce(function (previous, current,currentIndex) {
                    return o[previous].siblingCode > o[current].siblingCode ? previous:current;
                });
                selectContractPeriodID = o[selectContractPeriodID].siblingCode;


                var o = result.data.siblingUsePeriod;
                var selectUserPeriodID = Object.keys(o).reduce(function (previous, current,currentIndex) {
                    return o[previous].siblingCode > o[current].siblingCode ? previous:current;
                });
                selectUserPeriodID = o[selectUserPeriodID].siblingCode;

                var o = result.data.siblingVisitCycle;
                var selectVisitCycleID = Object.keys(o).reduce(function (previous, current) {
                    return o[previous].siblingCode > o[current].siblingCode ? previous:current;
                });
                selectVisitCycleID = o[selectVisitCycleID].siblingCode;

                var o = result.data.siblingFee;
                var selectFeeID = Object.keys(o).reduce(function (previous, current) {
                    return o[previous].siblingCode > o[current].siblingCode ? previous:current;
                });
                selectFeeID = o[selectFeeID].siblingCode;

                setCliblingData(listBlock.find('select[data-sibling-type=siblingContractPeriod]'), result.data.siblingContractPeriod, result.data.selectContractPeriodID);
                setCliblingData(listBlock.find('select[data-sibling-type=siblingUsePeriod]'), result.data.siblingUsePeriod, result.data.selectUserPeriodID);
                setCliblingData(listBlock.find('select[data-sibling-type=siblingVisitCycle]'), result.data.siblingVisitCycle, result.data.selectVisitCycleID);
                setCliblingData(listBlock.find('select[data-sibling-type=siblingFee]'), result.data.siblingFee, result.data.selectFeeID);
            }
        });
    }
    function setCliblingData(selector, list, selectId){

        var selectIdx = 0;
        var list = vcui.array.map(list, function(item, idx){
            item['text'] =  item.siblingValue ;
            item['value'] = item.siblingCode;

            if(item.siblingCode == selectId) selectIdx = idx;
            return item;
        });
        selector.vcSelectbox('update', list).vcSelectbox('selectedIndex', selectIdx, false);

        // 20210720 BTOCSITE-2537 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발
        if(list.length === 1) {
            selector.vcSelectbox('disabled',true);
            selector.closest('dl').addClass("disabled");
        } else {
            selector.vcSelectbox('disabled',false);
            selector.closest('dl').removeClass("disabled");
        }
    }

    //색상 옵션 변경...
    function setChangeColorChip(idx, optdata){
        lgkorUI.showLoading();
        
        var sendata = {
            tabID: getTabID(),
            modelID: optdata.siblingColors.modelId,
            colorCd: optdata.siblingColors.value,
            siblingGroupCd: optdata.siblingColors.groupId,
            rtModelSeq: _currentItemList[idx]['rtModelSeq'],
            blockID: idx
        }

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_changeColorUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(!lgkorUI.stringToBool(result.data.success)){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            var blockID = result.data.blockID;
            
            setSiblingCodeNumbering(result.data);
            for(var key in result.data){                
                _currentItemList[blockID][key] = result.data[key]; 
            }

            var deleteItem = $prodListContainer.find('> ul.inner > li.item').eq(blockID);

            if(!_currentItemList[blockID].modelUrlPath) _currentItemList[blockID].modelUrlPath = "";
            else{
               if(getTabID() == 0) _currentItemList[blockID].modelUrlPath += "?dpType=careTab";
            }

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
            if(!_currentItemList[i].modelUrlPath) _currentItemList[i].modelUrlPath = "";
            else{
                if(getTabID() == 0) _currentItemList[i].modelUrlPath += "?dpType=careTab";
            }
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

        /*
         *BTOCSITE-3499 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발_후속작업
         * 임시 처리 - 추수 수정 예정
        $prodListContainer.find("> ul.inner select[data-combo-id='1']").each(function(){
            $(this).trigger('change')
        })
         */
    }

    //담기...
    function addPutItem(item){ 
        var idx = $(item).parents('.prd-care-vertical').data('index')-1;
        var optionData = getOptionData(item);
        var itemList = _putItemList.concat();
        itemList.unshift({
            rtModelSeq: _currentItemList[idx]['rtModelSeq'],
            modelId: _currentItemList[idx]['modelId'],
            siblingCd: optionData.optdata.siblingColors ? optionData.optdata.siblingColors.value : "",
            siblingGroupCd: optionData.optdata.siblingColors ? optionData.optdata.siblingColors.groupId : ""
        });

        var sendata = {
            type: "add",
            tabID: getTabID(),
            itemList: JSON.stringify(itemList)
        }
        
        requestPutItem(sendata);
    }

    function requestAddPutItem(data){
        var itemList = _putItemList.concat();
        itemList.unshift(data);

        var sendata = {
            tabID: getTabID(),
            itemList: JSON.stringify(itemList)
        }
        
        requestPutItem(sendata);
    }

    //담기 삭제...
    function removePutItem(id){
        _putItemList.splice(id, 1);

        var sendata = {
            type: "remove",
            tabID: getTabID(),
            itemList: JSON.stringify(_putItemList)
        }
        
        requestPutItem(sendata);
    }

    function requestPutItem(sendata){
        lgkorUI.showLoading();

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_putItemUrl, sendata, function(result){
            
            if(!lgkorUI.stringToBool(result.data.success)){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            if(result.data.isLogin){
                $('.freeCareshipBox').remove();
                var freeCareShip = result.data.contract.freeCareShip;
                if(freeCareShip == "Y" || freeCareShip == "X"){
                    $('.login-empty').hide();
                    
                    var template = freeCareShip == "Y" ? freeCareshipTemplate : addFreeCareShipTempalte;

                    $('.prd-contract-wrap.ui_active_toggle_wrap').show();
                    $('.ui_total_prod .ui_carousel_slider .slide-track').prepend(template);
                }
                $('.ui_total_prod .ui_carousel_slider').vcCarousel('reinit');
                lgkorUI.resetFlexibleBox();

                if($('.ui_total_prod .ui_carousel_slider .slide-track').children().length == 1){
                    $('.prd-contract-wrap.ui_active_toggle_wrap').hide();
                    $('.login-empty').show();
                } 

                $('.ui_total_prod .ui_carousel_slider').find('.ui_flexible_box').removeClass('comb-type');
                if(result.data.contract.transModelCheck){                    
                    $('.ui_total_prod .ui_carousel_slider').find('.ui_flexible_box[data-contract-flag='+result.data.contract.transModelCheck+']').eq(0).addClass('comb-type');
                }
            }

            if(sendata.type == "add") $(window).trigger("toastshow", "제품 담기가 완료되었습니다.");

            setPutItems(result.data);
        });
    }

    function setPutItems(listdata){
        $putItemContainer.find('.contract-slide').empty();

        _putItemList = [];
        
        var leng = listdata.itemList.length;
        if(leng){
            _putItemList = vcui.array.map(listdata.itemList, function(item){
                return {
                    rtModelSeq: item.rtModelSeq,
                    modelId: item.modelId,
                    siblingCd: item.siblingCd,
                    siblingGroupCd: item.siblingGroupCd
                }
            })

            var listItem = vcui.template(_putItemTemplate, {putitem_list: listdata.itemList});
            $putItemContainer.find('.contract-slide').append(listItem);

            var display = $putItemContainer.css('display');
            $putItemContainer.css({display:'block'});
            
            $('.contents.care-plan').find('.ui_carousel_slider3').vcCarousel({
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
                $('.contents.care-plan').find('.ui_carousel_slider3').find('.slide-controls').hide();
            } else{
                $('.contents.care-plan').find('.ui_carousel_slider3').find('.slide-controls').show();
            }
            $putItemContainer.css({display:display});
        }

        var totalinfo = $putItemContainer.find('.total-info');
        var newinfo = vcui.template(putItemPriceTemplate, listdata.total);
        totalinfo.after(newinfo);

        totalinfo.remove();
        
        $putItemContainer.find('.tit-wrap .num strong').text(leng);

        setPutItemStatus();
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
                else{
                    var isOpen = $putItemContainer.find('.ui_active_toggle').data('isOpen');
                    if(isOpen) setMobilePutItemBoxStatus(true, true);
                    else{
                        if(window.breakpoint.isMobile){
                            $putItemContainer.find('.total-info').css({background:'#ffffff'})
                            $putItemContainer.find('.total-info dl').hide();
                        }
                    }
                }
            }

            $putItemContainer.attr("tabindex", -1).focus();
        } else{
            hidePutItemBox();
        }
    }

    function openPutItemBox(){
        putItemStatus("open");

        setMobilePutItemBoxStatus(false, false);

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

        var sendata = {
            tabID: getTabID(),
            InputData: JSON.stringify(_putItemList)
        }

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(_estimateConfirmUrl, sendata, function(result){
            lgkorUI.hideLoading();
            
            if(!lgkorUI.stringToBool(result.data.success)){
                lgkorUI.commonAlertHandler(result.data.alert);
                return;
            }

            var estimatePrice = $('#pop-estimate').find('.estimate-price');
            for(var str in result.data.priceInfo){
                var price = str == "usedPrice" ? "월 " + result.data.priceInfo[str] : result.data.priceInfo[str];
                console.log(str, price)
                estimatePrice.find('.estimate-'+str).text(price);
            }

            $('#pop-estimate').data("requestUrl", result.data.priceInfo.requestUrl);
            $('#pop-estimate').data("sumPrice", result.data.priceInfo.sumPrice);

            $('#pop-estimate').find('.tooltip-wrap .tooltip-box a').attr('href', result.data.paymentInfo.discountUrl);

            var modelist = [];
            for(var idx in result.data.itemList) modelist.push(result.data.itemList[idx].csmsRtModelSeq);
            $('#pop-estimate').data("rtModelSeq", modelist.join(","));

         
            var $cardInfo = $('#pop-estimate').find('.alliance-card');
            var cardData = result.data.paymentInfo.card;
            if(cardData) {
                //카드데이타
                var selectList = $cardInfo.find('ul.select-list');
                selectList.empty();
                var groupItemTemplate = '<li class="divide"><span class="inner"><em>{{groupTitle}}</em></span></li>';
                var cardItemTemplate = '<li><a href="#" data-desc-id="{{descId}}" data-card-id="{{cardId}}" data-card-sale="{{salePrice}}" data-card-title="{{title}}">{{label}}</a></li>';

                cardData.forEach(function(obj, idx) {
                    if(obj.groupTitle) {
                        selectList.append(vcui.template(groupItemTemplate,obj));
                    }
                    if(obj.listItem) {
                        obj.listItem.forEach(function(item, index) {
                            item.label = item.title;
                            if(!item.cardId) {
                                item.label = "선택취소"
                            }
                            item.descId = idx;
                            selectList.append(vcui.template(cardItemTemplate, item));
                        });
                    }
                });

                $('#pop-estimate').data("cardDescription", result.data.paymentInfo.cardDescription);
                $cardInfo.find('.ui_dropdown a.ui_dropdown_toggle').text(result.data.paymentInfo.cardDescription);

                $cardInfo.show();
            } else {
                $cardInfo.hide();
            }
            $('#pop-estimate').find('.alliance-card .price').hide();
            //$list_ul.append($cardInfo);
            //$('#pop-estimate').find('.select-wrap').vcDropdown();
            
            $('#pop-estimate').find('.tit-wrap span.leng').empty().html("총 "+"<strong>"+result.data.totalCnt+"</strong>개");

            var listwrap = $('#pop-estimate').find('.estimate-list');
            var estimateProdList = vcui.template(_estimateProdTemplate, result.data);
            listwrap.after($(estimateProdList).get(0));
            listwrap.remove();

            $('#pop-estimate').find('.pop-conts > .bullet-list').hide();

            $('#pop-estimate').vcModal({opener:$putItemContainer.find('.total-info .btn')});
                
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
            var groupId = optblock.data("groupId");
            
            optdata[siblingType] = {
                name: selectName,
                value: selectValue,
                modelId: selectModelId,
                groupId: groupId
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

    $(document).ready(function() {
        init();
    });
})();