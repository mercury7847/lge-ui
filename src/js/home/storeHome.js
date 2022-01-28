$(function(){

    var $context = !!$('[data-hash="store"]').length ? $('[data-hash="store"]') : $(document);

    // 20210730 BTOCSITE-2596 스토어 > PC 히어로 배너 재생 버튼 동작 안함 오류
    /* BTOCSITE-6882 신규 WSG 적용 - 스토어 */
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
        heroBanner();
    })

    // 히어로 배너
    function heroBanner() {
        var heroList = $('.contents.store .hero-banner .slide-track > li');
        var heroListAct = heroList.siblings('.ui_carousel_current').index();
        var heroListLens = heroList.length;
        var custom = $('.contents.store .custom-indi-wrap');
        var slideCurrent = custom.find('.slide-page .current');
        var slideCount = custom.find('.slide-page .count');        

        if( heroListLens > 1) {
            custom.show();
            slideCurrent.text(heroListAct);
            slideCount.text(heroListLens - 2);
        }
    }   
    heroBanner();

    // 추천제품 (LG와 함께하는 # 라이프)
    $(window).on('breakpointchange.product_lifestyle', function(e){
        var breakpoint = window.breakpoint;    
        if(breakpoint.name == 'mobile'){                    
            $context.find('.ui_lifestyle_list').vcCarousel({
                infinite: false,
                dots: false,
                slidesToShow: 1.2,
                slidesToScroll: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100
            });
            
        }else if(breakpoint.name == 'pc'){
            $context.find('.ui_lifestyle_list').vcCarousel('destroy');
        }    
    })

    $(window).trigger('breakpointchange.product_lifestyle');

    // slide 1개일 경우 모바일 full 이미지
    var lifestyleLeng = $('.ui_lifestyle_list .slide-track > li').length; // 추천제품 (LG와 함께하는 # 라이프)
    var exhibLeng = $('.product-slide.ui_exhib_carousel .slide-track > li').length; // 추천 기획전
    var productLeng = $('.product-slide.ui_product_lifestyle .slide-track > li').length; // 카테고리 추천 배너

    if( lifestyleLeng == 1) {
        $('.ui_lifestyle_list .slide-track').addClass('solo');
    }
    if( exhibLeng == 1) {
        $('.product-slide.ui_exhib_carousel').css('padding-bottom', '0');
        $('.product-slide.ui_exhib_carousel .slide-track').addClass('solo');
    }
    if( productLeng == 1) {
        $('.product-slide.ui_product_lifestyle').css('padding-bottom', '0');
        $('.product-slide.ui_product_lifestyle .slide-track').addClass('solo');
    }

    // 추천 기획전, 카테고리 추천 배너
    $('.ui_exhib_carousel, .ui_product_lifestyle').vcCarousel({
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
        speed: 150,
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    infinite: false,
                    dots: false,
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100,
                }
            }
        ]
    });

    $(window).on('breakpointchange.lifestyle', function(e){
        var breakpoint = window.breakpoint;    
        if(breakpoint.name == 'mobile'){                    
            $context.find('.ui_exhib_carousel, .ui_product_lifestyle').vcCarousel({
                infinite: false,
                dots: false,
                slidesToShow: 1.2,
                slidesToScroll: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
            });
            
        }else if(breakpoint.name == 'pc'){
            $context.find('.ui_exhib_carousel, .ui_product_lifestyle').vcCarousel({
                infinite: false,
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
            });
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
                    dots: false,
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
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
    /* //BTOCSITE-6882 신규 WSG 적용 - 스토어 */

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
    }
    buildCategoryTab();
    //-E- BTOCSITE-1488 스토어 홈 > 카테고리 추가요청 : gbnId값 추가

    /* BTOCSITE-6882 신규 WSG 적용 - 스토어 (이달의 추천 제품 스와이프 기능 추가) */
    var ui_product_tab = {
        $el : $context.find('.ui_product_tab'),
        $tabs : $context.find('.ui_product_tab > .tabs'),
        $tabContent : $context.find('.ui_product_tab > .buy-product-tabcontent'),
        startX : 0,
        startY : 0,
        endX : 0,
        endY : 0,

        totalSize: function () {
            return this.$tabs.find('li').size();
        },
        currentTab: function () {
            return this.$tabs.find('li.on').index() + 1;
        },
        triggerTab: function (idx) {

            this.$tabs.find('li').eq(idx).find('a').trigger('click');
        },
        prev: function () {
            var idx = (1 === this.currentTab()) ? this.totalSize() - 1 : this.currentTab() - 2;
            this.triggerTab(idx);
        },
        next: function () {
            var idx = (this.totalSize() === this.currentTab()) ? 0 : this.currentTab();
            this.triggerTab(idx);
        },
        init: function() {

            var self = this;
                self.$el =  $context.find('.module-buy-product .ui_product_tab');
                self.$tabs =  this.$el.find('>.tabs');
                self.$tabContent =   $context.find('.module-buy-product .buy-product-tabcontent');

                self.$el.on('tabbeforechange tabchange tabinit', function(e, data){
                    //탭 이벤트 분기z
                    switch(e.type) {
                        case "tabinit" :
                            // 탭초기화시 탭선택
                                var idx = Math.floor(Math.random() * self.totalSize() || 0);
                                self.$el.vcTab('select',idx).vcSmoothScroll('scrollToActive');
                        break;
                        default :
                        break;
                    }
            
                    self.$el.vcSmoothScroll('scrollToActive');
                }).vcTab().vcSmoothScroll('refresh');
            
                if( !vcui.detect.isMobileDevice) {
                    self.$tabContent.vcGesture({
                        direction: 'horizontal'
                    }, { passive: false }).on('gestureend', function (e, data) {
                        // gesturestart gesturemove gestureend gesturecancel
                        /* 탭 방향 전환 */
                        if (data.direction === 'left') {
                            ui_product_tab.next();
                        } else {
                            ui_product_tab.prev();
                        }
                    });
                } else {
                    var touchFlag = true;
                    var touchFlagTid = 0;
            
                    self.$tabContent.on('touchstart', function(e){
                        self.startX = e.changedTouches[0].clientX;
                        self.startY = e.changedTouches[0].clientY;
                        self.endX = 0;
                        self.endY = 0;
                    });


                    self.$tabContent.on('touchend', function(e){
                        self.endX = e.changedTouches[0].clientX;
                        self.endY = e.changedTouches[0].clientY;
        
                        var dirLeft = self.startX - self.endX < 0;
                        var rangeX = Math.abs(self.startX - self.endX);
                        var rangeY = Math.abs(self.startY - self.endY);
        
                        if( rangeY > 30) return;
                        
                        if( touchFlag == true && rangeX > 100 ) {
                            touchFlag = false;
                            if(dirLeft) {
                                self.prev();
                                // console.log('left')
                            } else {
                                self.next();
                                // console.log('right')
                            }
        
                            clearTimeout(touchFlagTid);
                            touchFlagTid = setTimeout(function(){
                                touchFlag = true;
        
                                // console.log("rangeX", rangeX)
                                // console.log("rangeY", rangeY)
                            }, 50);
                        }
                    });
                }
        }
    };
    ui_product_tab.init();
    /* //BTOCSITE-6882 신규 WSG 적용 - 스토어 (이달의 추천 제품 스와이프 기능 추가) */    
});