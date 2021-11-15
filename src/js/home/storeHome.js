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
    });


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

        $(window).on('breakpointchange.recommend', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    
                
                $context.find('.ui_recom_carousel').vcCarousel('destroy');
                
            }else if(breakpoint.name == 'pc'){   
                
                $context.find('.ui_recom_carousel').vcCarousel({
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });
            }    
        })

        $(window).trigger('breakpointchange.recommend');
        
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
                        $buyProduct.vcTab('select',0).vcSmoothScroll('scrollToActive');
                break;
                default :
                    // 탭이동 이벤트
                    var idx = data.selectedIndex;
                    var superCategoryId = $buyProduct.find('.tabs li a').eq(idx).data("category");
                        console.log("tabbeforechange %o",idx);
                        buildRankBuyProduct({
                            superCategoryId : superCategoryId
                        })
                break;
            }
        }).vcTab();
        $buyProduct.vcSmoothScroll('refresh');
    }


    // 많이 구매하는 제품 화면 렌더링
    function buildRankBuyProduct(param){
        // $('body').vcLazyLoaderSwitch('reload', $buyProduct);
    }
});
