;(function(){

    var productItemTemplate =
        '<li>'+
            '<div class="item evt-item">' +
                '<div class="product-image" aria-hidden="true">' +
                '<a href="{{modelUrlPath}}"><img src="{{mediumImageAddr}}" alt="{{imageAltText}}"></a>' +
            '</div>' +
            '<div class="product-contents">' +
                '{{#if siblings}}'+
                    '{{#each sibling in siblings}}'+
                    '<div class="product-option ui_smooth_scrolltab {{sibling.siblingType}}">' +
                        '<div class="ui_smooth_tab">' +
                            '<ul class="option-list" role="radiogroup">' +
                                '{{#each item in sibling.siblingModels}}'+
                                    '<li>'+
                                        '<div role="radio" class="{{#if sibling.siblingType=="color"}}chk-wrap-colorchip {{item.siblingCode}}{{#else}}rdo-wrap{{/if}}" aria-describedby="{{modelId}}" title="{{item.siblingValue}}">'+
                                            '<input type="radio" data-category-id="{{categoryId}}" id="product-{{sibling.siblingType}}-{{item.modelName}}" name="nm_{{sibling.siblingType}}_{{modelId}}" value="{{item.modelId}}" {{#if modelId==item.modelId}}checked{{/if}}>'+
                                            '{{#if sibling.siblingType=="color"}}'+
                                                '<label for="product-{{sibling.siblingType}}-{{item.modelName}}"><span class="blind">{{item.siblingValue}}</span></label>'+
                                            '{{#else}}'+
                                                '<label for="product-{{sibling.siblingType}}-{{item.modelName}}">{{item.siblingValue}}</label>'+
                                            '{{/if}}'+
                                        '</div>'+
                                    '</li>'+
                                '{{/each}}' +
                            '</ul>' +
                        '</div>' +
                        '<div class="scroll-controls ui_smooth_controls">' +
                            '<button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">??????</span></button>' +
                            '<button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">??????</span></button>' +
                        '</div>' +
                    '</div>' +
                    '{{/each}}'+
                '{{/if}}'+
                '<div class="flag-wrap bar-type">' +
                    '{{#if newProductBadgeFlag}}<span class="flag">{{newProductBadgeName}}</span>{{/if}}' +
                    '{{#if bestBadgeFlag}}<span class="flag">{{bestBadgeName}}</span>{{/if}}' +
                '</div>' +
                '<div class="product-info">' +
                    '<div class="product-name">' +
                        '<a href="{{modelUrlPath}}">{{#raw modelDisplayName}}</a>' +
                    '</div>' +
                    '<div class="sku">{{#if salesModelCode}}{{salesModelCode}}{{/if}}</div>' +
                        '<div class="review-info">' +
                            '<a href="#">' +
                                '{{#if (reviewsCount != "0")}}' +
                                '<div class="star is-review"><span class="blind">????????????</span></div>' +
                                '<div class="average-rating"><span class="blind">??????</span>{{reviewsScore}}</div>' +
                                '<div class="review-count"><span class="blind">?????? ???</span>({{reviewsCount}})</div>' +
                                '{{/if}}' +
                            '</a>' +
                        '</div>' +
                        '<ul class="spec-info">' +
                            '{{#if showBulletFeatures}}' +
                                '{{#each item in showBulletFeatures}}' +
                                    '<li>{{#raw item.specText}}</li>' +
                                '{{/each}}' +
                            '{{/if}}' +
                            '{{#if cTypeCount > 0}}<li>{{lastBulletName}}</li>{{/if}}'+
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="product-bottom">' +
                    '<div class="flag-wrap bar-type">' +
                        '{{#if cashbackBadgeFlag}}<span class="flag">{{cashbackBadgeName}}</span>{{/if}}' +
                    '</div>' +
                    '<div class="price-area">' +
                        '{{#if obsOriginalPrice}}<div class="original">' +
                            '<em class="blind">????????????</em>' +
                            '<span class="price">{{obsOriginalPrice}}<em>???</em></span>' +
                        '</div>{{/if}}' +
                        '{{#if obsSellingPrice}}<div class="total">' +
                            '<em class="blind">??? ????????????</em>' +
                            '<span class="price">{{obsSellingPrice}}<em>???</em></span>' +
                        '</div>{{/if}}' +
                        '{{#if discount}}'+
                        '<div class="discount">'+
                            '<em class="blind">?????????</em>'+
                            '<span class="percentage">{{discount}}%</span>'+
                        '</div>'+
                        '{{/if}}'+
                    '</div>' +
                    '<div class="btn-area-wrap">' +
                        '<div class="cart">' +
                            '<a href="#n" class="btn-cart{{#if obsBtnRule != "enable"}} disabled{{/if}}" data-id="{{modelId}}" data-model-name="{{sku}}" data-rtSeq="{{rtModelSeq}}" data-type-flag="{{bizType}}" {{#if obsBtnRule != "enable"}}disable{{/if}}><span class="blind">???????????? ??????</span></a>' +
                        '</div>' +
                        '<div class="btn-area">' +
                            '<a href="{{modelUrlPath}}" class="btn border size-m" data-id="{{modelId}}">????????? ??????</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'+
        '</li>';
        
    var $contents;
    var $productList; // BTOCSITE-7637

    function init(){
        setting();
        bindEvents();

        var ajaxUrl = $contents.attr('data-wish-url');// BTOCSITE-7637
        lgkorUI.checkWishItem(ajaxUrl); // BTOCSITE-7637
    }

    function setting(){
        $contents = $('.contents.event.exhibition');
        //?????????
        $productList = $('.ev-prd-wrap ul.product-items');// BTOCSITE-7637
    }

    function bindEvents(){ 

        // BTOCSITE-7637
        //?????????
        $productList.on('change', 'li div.btn-area-wrap div.wishlist input', function(e){
            var login = $contents.data('loginUrl');
            var isLogin = $contents.data('loginflag');
            if(isLogin == "N"){
                var obj = {
                    title:'???????????? ????????? ????????? ???????????? <br>LG?????? ?????? ???????????? ???????????? ???????????????.', 
                    cancelBtnName:'??????', 
                    okBtnName:'??????', 
                    ok: function (){
                        location.href = login;
                    }
                };
                lgkorUI.confirm(null, obj);
                $(this).prop('checked', false);
                return;

            } else{
                var $this = $(this);
                var _id = $this.attr('data-id');
                var sku = $this.attr('data-model-name');
                var wishListId = $this.data("wishListId"); 
                var wishItemId = $this.data("wishItemId");
                var wish = $this.is(':checked');
                var param = {
                    "id":_id,
                    "sku":sku,
                    "wishListId": wishListId,
                    "wishItemId": wishItemId
                }

                if(wish){
                    param.type = "add";
                } else{
                    param.type = "remove";
                }

                var ajaxUrl = $contents.attr('data-wish-url');
                
                var success = function(data) {
                    $this.data("wishItemId",data.wishItemId);
                    $this.prop("checked",wish);
                };
                var fail = function(data) {
                    $this.prop("checked",!wish);
                };

                lgkorUI.requestWish(
                    param,
                    wish,
                    success,
                    fail,
                    ajaxUrl,
                    this
                );
            }
        });
        // BTOCSITE-7637

        // ????????????
        $contents.on('click', '.btn-area-wrap .cart .btn-cart', function(e){
            e.preventDefault();

            var typeflag = $(this).attr('data-type-flag');
            var sendflag = (typeflag == "PRODUCT" || typeflag == "DISPOSABLE") ? "P" : "C";

            if(!$(this).hasClass('disabled')){
                var $this = $(this);
                var param = {
                    "id":$this.attr('data-id'),
                    "sku":$this.attr('data-model-name'),
                    "rtSeq":$this.attr('data-rtSeq'),
                    "typeFlag": sendflag
                }

                var ajaxUrl = $contents.attr('data-cart-url');
                lgkorUI.requestCart(ajaxUrl, param, true);
            }
        }).on('change', '.product-option input[type=radio]', function(e){
            requestSibling(this);
        })
    }

    function requestSibling(rdo){
        var modelId = $(rdo).val();
        var changeItem = $(rdo).closest('.evt-item').parent();
        var bizType = changeItem.find('.product-bottom .btn-area-wrap .cart a').attr('data-type-flag');
        var ajaxurl = $contents.attr('data-sibling-url');
        var sendata = {
            "modelId": modelId,
            "bizType": bizType,
            "pageType": "plp",
            "callType": "productSummary"
        }
        
        lgkorUI.requestAjaxDataPost(ajaxurl, sendata, function(result){
            var arr = (result.data && result.data instanceof Array) ? result.data : [];

            if(arr.length){
                var item = arr[0];
                var listItem = makeListItem(item);
                changeItem.before(listItem);
                changeItem.remove();

                $contents.find('.ui_smooth_scrolltab').vcSmoothScrollTab();
            };
        }, true);
    }

    function makeListItem(item){

        for(var str in item.siblings){
            var siblingType = item.siblings[str].siblingType ? item.siblings[str].siblingType.toLowerCase() : '';
            item.siblings[str].siblingType = (siblingType == "color") ? "color" : "text";
        }

        var sliderImages = [];
        if(item.rollingImages && item.rollingImages.length){
            item.rollingImages.forEach(function(obj, idx) {
            if(obj && obj.smallImageAddr) {
                sliderImages.push(obj.smallImageAddr);
                }
            });
        } else {
            sliderImages.push(item.smallImageAddr);
        }
        item.sliderImages = sliderImages[0];
        
        item.obsOriginalPrice = (item.obsOriginalPrice != null) ? vcui.number.addComma(item.obsOriginalPrice) : null;
        item.obsTotalDiscountPrice = (item.obsTotalDiscountPrice != null) ? vcui.number.addComma(item.obsTotalDiscountPrice) : null;
        item.reviewsCount = (item.reviewsCount != null) ? vcui.number.addComma(item.reviewsCount) : "0";

        //flag
        item.newProductBadgeFlag = lgkorUI.stringToBool(item.newProductBadgeFlag);
        item.bestBadgeFlag = lgkorUI.stringToBool(item.bestBadgeFlag);
        item.cashbackBadgeFlag = lgkorUI.stringToBool(item.cashbackBadgeFlag);

        if(!item.newProductBadgeName) item.newProductBadgeName = "?????????"
        if(!item.bestBadgeName) item.bestBadgeName = "?????????";
        if(!item.cashbackBadgeName) item.cashbackBadgeName = "?????????"
        if(!item.lastBulletName) item.lastBulletName = "????????? ??????";
        
        //????????????
        item.wishListFlag = lgkorUI.stringToBool(item.wishListFlag);
        //?????????
        item.cartListFlag = lgkorUI.stringToBool(item.cartListFlag);
        if(!item.wishListId) item.wishListId = "";
        if(!item.wishItemId) item.wishItemId = "";

        if(!item.rtModelSeq) item.rtModelSeq = "";

        var bulletLength = item.bulletFeatures.length;
        var showLength = bulletLength;
        if(bulletLength > 4){
            showLength = item.cTypeCount > 0 ? 4 : bulletLength;
        }
        item.showBulletFeatures = [];
        for(var i=0;i<showLength;i++){
            item.showBulletFeatures.push(item.bulletFeatures[i]);
        }

        if(!item.obsBtnRule) item.obsBtnRule = "";

        if(!item.sku) item.sku = item.modelName;

        if(!item.discount) item.discount = "";

        if(!item.obsSellingPrice) item.obsSellingPrice = "";

        //console.log("### item.siblingType ###", item.siblingType)

        return vcui.template(productItemTemplate, item);
    }

    $(window).load(function(){
        init();
    });
})();