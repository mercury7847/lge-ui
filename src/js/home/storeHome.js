$(function(){

    var $context = !!$('[data-hash="store"]').length ? $('[data-hash="store"]') : $(document);

    // 20210730 BTOCSITE-2596 스토어 > PC 히어로 배너 재생 버튼 동작 안함 오류
    $context.find('.ui_wide_slider').vcCarousel('destroy').vcCarousel({
        autoplay: true,
        autoplaySpped: 5000,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        dotsSelector: '.ui_wideslider_dots',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false,
        touchThreshold: 100,
        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
        speed: 150
    }).on('carouselafterchange', function(e, slide){
        // s BTOCSITE-5938-222 : 20211224 pauseOnFocus가 false인데 autoplay 멈춰서 강제로 다시 시작
        if(slide.focussed) {
            slide.play();
            console.log('test')
        } 
        // e BTOCSITE-5938-222
    })


    /* BTOCSITE-654 : 속도|터치감도|easing 조정 */
    $context.find('.ui_lifestyle_list').vcCarousel({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
        speed: 150,
        touchThreshold: 100,
        responsive: [{
            breakpoint: 100000,
            settings: { slidesToShow: 4, slidesToScroll: 1, }
        }, { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
    });
    /* BTOCSITE-654 : 속도|터치감도|easing 조정 */

    $context.find('.ui_exhib_carousel').vcCarousel({
        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
        speed: 150,
        touchThreshold: 100
    });


    $(window).on('breakpointchange.lifestyle', function(e){
        var breakpoint = window.breakpoint;    
        if(breakpoint.name == 'mobile'){                    
            $context.find('.ui_product_lifestyle').vcCarousel({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100
            });
            
        }else if(breakpoint.name == 'pc'){    
            $context.find('.ui_product_lifestyle').vcCarousel('destroy');
        }    
    })

    $(window).trigger('breakpointchange.lifestyle');


    // 직접관리하는 영역                
    // 많이 구매하는 제품 -> Best 이미지관리

    // 새제품 렌더링
    function buildNewRecommend(){
        $(window).on('breakpointchange.newrecommend', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    

                $context.find('.ui_new_product_carousel').vcCarousel({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    lastFix: true,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });
                
            }else if(breakpoint.name == 'pc'){   
                
                $context.find('.ui_new_product_carousel').vcCarousel('destroy');
            }    
        })

        $(window).trigger('breakpointchange.newrecommend');

    }
    buildNewRecommend();
    // 추천 렌더링
    function buildRecommend(){
        //BTOCSITE-7335 : 스토어 홈 고객 추천제품 ajax 처리
        var $recomCarousel = $context.find('.ui_recom_carousel');
        var $box = $recomCarousel.closest('.module-box');
        var $titWrap = $box.find('.tit-wrap');
        var $userName = $titWrap.find('.tit .name');
        var ajaxUrl = $recomCarousel.data('ajaxUrl');
        var param = {};
        var slideConfig = {
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100
        };
        var listTemp = 
            '<li class="slide-conts ui_carousel_slide">' + 
                '<a href="{{modelUrlPath}}" class="slide-box" data-ec-product="{{ecProduct}}">' + 
                    '<div class="img"><img src="{{smallImageAddr}}" alt="{{modelDisplayName}}"></div>' + 
                    '<div class="info">' + 
                        '<div class="model">{{#raw modelDisplayName}}</div>' + 
                        '<div class="code">{{modelName}}</div>' + 
                        '{{#if obsOriginalPrice != ""}}'+
                        '<div class="price-area">' + 
                            '{{#if obsOriginalPrice != obsSellingPrice}}'+
                            '<div class="original">' + 
                                '<em class="blind">기존가격</em>' + 
                                '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' + 
                            '</div>' + 
                            '{{/if}}'+
                            '<div class="total">' + 
                                '<em class="blind">판매가격</em>' + 
                                '{{#if obsOriginalPrice != obsSellingPrice}}'+
                                    '<span class="price">{{obsSellingPrice}}<em>원</em></span>' + 
                                '{{#else}}'+
                                    '<span class="price">{{obsOriginalPrice}}<em>원</em></span>' + 
                                '{{/if}}'+
                            '</div>' + 
                        '</div>' + 
                        '{{/if}}'+
                    '</div>' + 
                '</a>' + 
            '</li>';
       
        function getEcCategoryName(item){
            if( item.subCategoryName == "" || item.subCategoryName == undefined) {
                return item.superCategoryName + "/" + item.categoryName 
            } else {
                return item.superCategoryName + "/" + item.categoryName  + '/' + item.subCategoryName
            }
        }

        
        function ConvertSystemSourcetoHtml(str){
            str = str.replace(/</g,"&lt;");
            str = str.replace(/>/g,"&gt;");
            str = str.replace(/\"/g,"&quot;");
            str = str.replace(/\'/g,"&#39;");
            //str = str.replace(/\n/g,"<br />");
            return str;
        }

        if( $recomCarousel.length == 0 ) return;
        lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
            var data = result.data;

            if( result.status == "success") {
                if( data.userName && data.listData.length > 0) {
                    $userName.text(data.userName);
                    var listHtml = "";

                    data.listData.forEach(function(listItem, listIdx){

                        listItem.obsOriginalPrice = listItem.obsOriginalPrice > 0 ? vcui.number.addComma(listItem.obsOriginalPrice) : ""
                        listItem.obsSellingPrice = listItem.obsSellingPrice > 0 ? vcui.number.addComma(listItem.obsSellingPrice) : ""
                        
                        var ecProduct = {
                            "model_name": listItem.modelDisplayName,
                            "model_id": listItem.modelId,
                            "model_sku": listItem.modelName, 
                            "model_gubun": listItem.modelGubunName,
                            "price": listItem.obsOriginalPrice, 
                            "discounted_price": listItem.obsSellingPrice, 
                            "brand": "LG",
                            "category": getEcCategoryName(listItem),
                            "ct_id": listItem.categoryId
                        }

                        listItem.ecProduct = ConvertSystemSourcetoHtml(JSON.stringify(ecProduct));
                        listHtml += vcui.template(listTemp, listItem)                        
                    })
                    $recomCarousel.find('.slide-track').empty().append(listHtml);
                    carouselInit(window.breakpoint)
                    $box.show();
                } else {
                    $box.hide();
                }
            }
        })

        function carouselInit(breakpoint){
            if(breakpoint.name == 'mobile'){    
                $recomCarousel.vcCarousel('destroy');
            }else if(breakpoint.name == 'pc'){   
                $recomCarousel.vcCarousel(slideConfig);
            }    
        }

        $(window).on('breakpointchange.recommend', function(e){
            carouselInit(window.breakpoint)
        })
    }
    buildRecommend();
    function errorRequest(err){
        console.log(err);
    }

    //-S- BTOCSITE-1488 스토어 홈 > 카테고리 추가요청 : gnbId값 추가
    function buildSubCatagoryTab(){
        $context.find('.ui_category_tab_contents .ui_sub_category').each(function(subCategory){
            if( $(subCategory).children('li').length < 4) {
                $(subCategory).css({
                    'justify-content' : 'center'
                });
            }
        })
    }
    
    // 카테고리 화면 렌더링
    function buildCategoryTab(){
        $context.find('.module-box.cnt01 .ui_category_tab').on('tabbeforechange tabchange tabinit', function(e, data){
            if(e.type=='tabinit'){
                buildSubCatagoryTab();
            }else if(e.type=='tabbeforechange'){
                $(data.content).css({opacity:0});
                var len = $(data.content).find('.ui_carousel_track > li').length;
                if(len>0) return;
                e.preventDefault();

                $(data.content).transit({opacity:1});
                $('.module-box.cnt01 .ui_category_tab').vcTab('select', data.selectedIndex, true );
                //buildSubCatagoryTab(); //BTOCSITE-1057 : data-contents 추가 2021-08-09
            }else{
                $(data.content).transit({opacity:1});
            }
        }).vcTab();

        $context.find('.module-box.cnt01 .ui_category_tab.ui_smooth_scroll').vcSmoothScroll('refresh');	
        /* BTOCSITE-3067 선택된 tab & 카테고리명 불러오기 - 210806 */	
        if(!!window.location.hash){	
            var $selectedTab = $context.find('.module-box.cnt01 .ui_category_tab > .tabs > li a[href="' + window.location.hash +'"]');	
            if ($selectedTab.length > 0){	
                var $list = $selectedTab.closest('li');	
                var currentIndex = $list.index();	
                $context.find('.module-box.cnt01 .ui_category_tab').vcTab('select',currentIndex);	
                /* BTOCISTE-3067 mobile일때 tab위치 조정 - 210810 */	
                setTimeout(function(){	
                    $('.ui_category_tab').vcSmoothScroll('scrollToActive');	
                }, 200)	
                /* BTOCISTE-3067 mobile일때 tab위치 조정 - 210810 */	
            }	
        }	
        /* //BTOCSITE-3067 선택된 tab & 카테고리명 불러오기 - 210806 */

        $(window).on('breakpointchange.category', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    
                $context.find('.ui_category_carousel').vcCarousel({
                    infinite: true,
                    variableWidth : false,
                    dots: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });

                
            }else if(breakpoint.name == 'pc'){    
                $context.find('.ui_category_carousel').vcCarousel('destroy');
            }    
        })

        $(window).trigger('breakpointchange.category');

        buyProductInit();
    }
    buildCategoryTab();
    //-E- BTOCSITE-1488 스토어 홈 > 카테고리 추가요청 : gbnId값 추가


    //-S- BTOCSITE-4349 [UI] 스토어 홈 > 많이 구매하는 제품 (이달의 추천제품) 영역 수정
    function buyProductInit() {
        var $buyProduct = $context.find('.module-box.module-buy-product .tabs-wrap')
        
        $buyProduct.on('tabbeforechange tabinit', function(e, data){
            //탭 이벤트 분기
            switch(e.type) {
                case "tabinit" :
                    // 탭초기화시 탭선택
                        var listLen = $buyProduct.find('.tabs > li').length;
                        var idx = Math.floor(Math.random() * listLen || 0);
                        $buyProduct.vcTab('select',idx).vcSmoothScroll('scrollToActive');
                break;
                default :
                break;
            }
        }).vcTab();
        $buyProduct.vcSmoothScroll('refresh');
    }
});
