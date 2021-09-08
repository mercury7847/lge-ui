var tabTmpl = '{{#each obj in list}}\n'+
'   <li>\n'+
'       <a href="#{{obj.categoryType}}">{{obj.categoryName}}</a>\n'+
'   </li>\n'+
'{{/each}}';

var tabContentTmpl = '{{#each obj in list}}'+
    '<div id="{{obj.categoryType}}" class="tab-content" aria-labelledby="{{obj.categoryType}}" role="tabpanel">\n'+
    '   <div class="prd-list-wrap">\n'+
    '       <div class="slide-wrap ui_product_carousel_slider">\n'+
    '           <div class="indi-wrap">\n'+
    '               <ul class="indi-conts ui_carousel_dots" style="display: none;">\n'+
    '                   <li><button type="button" class="btn-indi"><span class="blind">{{obj.dotLabel}}</span></button></li>\n'+
    '               </ul>\n'+
    '           </div>\n'+
    '           <div class="slide-content ui_carousel_list">\n'+
    '               <ul class="inner slide-track ui_carousel_track">{{#raw obj.models}}</ul>\n'+
    '           </div>\n'+
    '       </div>\n'+           
    '   </div>\n'+
    '</div>\n'+
    '{{/each}}'

var itemTmpl = '{{#each obj in list}}'+
    '<li class="item ui_carousel_slide">\n'+
    '   <div class="prd-care-vertical">\n'+
    '       <div class="img-wrap">\n'+
    '           <a href="{{obj.modelUrlPath}}">\n'+
    '               <img src="{{obj.mediumImageAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this);">\n'+
    '           </a>\n'+
    '       </div>\n'+
    '       <div class="txt-wrap">\n'+
    '           <p class="tit"><span class="blind">제품명</span>{{obj.modelDisplayName}}</p>\n'+
    '           <p class="code"><span class="blind">제품 코드</span>{{obj.modelName}}</p>\n'+
    '       </div>\n'+
    '       <div class="info-wrap">\n'+
    '           <div class="price-wrap">\n'+
    '               <div class="total-price">\n'+
    '                   {{#if obj.years1TotAmt}}'+
    '                       <p class="price">{{#raw obj.years1TotAmt}}</p>\n'+
    '                   {{/if}}'+
    '                   <button type="button" class="btn border ui_care_detail_btn" data-url="{{obj.modelUrlPath}}" data-contents="{{obj.modelDisplayName}}"><span>자세히 보기</span></button>\n'+
    '               </div>\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>\n'+
    '{{/each}}'

$(function(){

    var $context = !!$('[data-hash="care"]').length ? $('[data-hash="care"]') : $(document);

    vcui.require(['ui/carousel','ui/tab','libs/jquery.transit.min', 'helper/gesture'], function () {

        // 제품 코드 관리 부분
        $context.find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100
        });

        // 플로우배너
        $context.find('.ui_carousel_slider_banner').vcCarousel({
            infinite: true,
            //autoplay: true,
            //autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : true,
            centerMode: true,
            centerPadding: '13.5%',
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1, 
                        centerMode: true,
                        centerPadding: '13.5%',
                    }
                },                
                {
                    breakpoint: 1400,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,  
                        centerMode: true, 
                        centerPadding: '17%',
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '25%',
                    }
                }
            ]
        });        

        $context.find('.ui_carousel_slider_banner2').vcCarousel({
            infinite: true,
            //autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth : true,
            dots: false,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 1400,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                /*
                {
                    breakpoint: 900,
                    settings: {
                        infinite: true,
                        variableWidth : true,
                        dots: true,
                        slidesToShow: 2, 
                        slidesToScroll: 1
                    }
                },*/
                {
                    breakpoint: 768,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        // dots: true,
                        slidesToShow: 2, 
                        slidesToScroll: 1
                    }
                }
            ]
        });

        // 케어솔루션 혜택
        // 다른 케어솔루션 
        $(window).on('breakpointchange.caresolution', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    
                $context.find('.ui_carousel_m1_slider').vcCarousel({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                });
                
            }else if(breakpoint.name == 'pc'){    
                $context.find('.ui_carousel_m1_slider').vcCarousel('destroy');       
                $context.find('.ui_carousel_m1_slider').find('.indi-wrap').hide();                     
            }    
        });

        $(window).trigger('breakpointchange.caresolution');

        // 케어솔루션 가이드
        $context.find('.care-guide-visual .ui_carousel_slider2').vcCarousel({
            infinite: false,
            centerMode: true,
            //centerPadding: '25%',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : true,
            cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
            speed: 150,
            touchThreshold: 100,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: false,
                        slidesToShow: 1, 
                        slidesToScroll: 1
                    }
                }
            ]
        });


        $(document).on('click', '.ui_care_detail_btn', function(e){
            e.preventDefault();
            var $target = $(e.currentTarget);
            var url = $target.data('url');
            if(url) location.href = url;
        });

        var careProductUrl = $context.find('.care-recommended').data('ajaxUrl') || '/lg5-common/data-ajax/home/storeCareProductList.json';

        function requestTab(){

            lgkorUI.requestAjaxDataFailCheck(careProductUrl, {}, function(result){

                var data = result.data;
                if(data && data.data){
                    var arr = data.data;  

                    var fArr = vcui.array.filter(arr, function(item, index){
                        var list = item['models'];    
                        return list && vcui.isArray(list) && list.length > 0;
                    });

                    fArr = vcui.array.map(fArr, function(item,index){
                        item['dotLabel'] = '{{no}}번 내용 보기';
                        if(item['models']){

                            var nArr = item['models'];
                            var list = vcui.array.map(nArr, function(obj, index){
                                var years1TotAmt = parseInt(obj['years1TotAmt'] || "0");
                                if(years1TotAmt!==0){ 
                                    obj['years1TotAmt'] = '월 '+vcui.number.addComma(years1TotAmt) + '원';
                                }else{
                                    obj['years1TotAmt'] = null;
                                }            
                                return obj;
                            });

                            item['models'] = vcui.template(itemTmpl, {list:list})
                        }
                        return item;
                    });

                    if(fArr.length == 0){
                        $context.find('.care-recommended').hide();
                        return;
                    }

                    $context.find('.ui_product_tab').find('.tabs').html(vcui.template(tabTmpl, {list:fArr}));
                    $context.find('.ui_product_tab').after(vcui.template(tabContentTmpl, {list:fArr}));

                    $context.find('.ui_product_tab').vcTab({selectors:{
                        prevButton:".ui_smooth_prev",
                        nextButton:".ui_smooth_next",
                        smoothScroll:'.ui_smooth_tab'
                    }});
                    /* 케어솔루션 추천 제품 스와이프 및 히스토리 탭토글 기능 추가 : 2021-05-10 */

                    var care_cecommended = $context.find('.care-recommended');
                    var care_slider = care_cecommended.find('.ui_product_carousel_slider');
                    var care_tabs = care_cecommended.find('.ui_smooth_tab .tabs');
                    var tab = {
                        totalSize: function () {
                            return care_tabs.find('li').size();
                        },
                        currentTab: function () {
                            return care_tabs.find('li.on').index() + 1;
                        },
                        triggerTab: function (idx) {

                            care_tabs.find('li').eq(idx).find('a').trigger('click');
                        },
                        nav: {
                            prev: function () {

                                var idx = (1 === tab.currentTab()) ? tab.totalSize() - 1 : tab.currentTab() - 2;
                                tab.triggerTab(idx);
                            },
                            next: function () {

                                var idx = (tab.totalSize() === tab.currentTab()) ? 0 : tab.currentTab();
                                tab.triggerTab(idx);
                            }
                        }
                    };
                    care_cecommended.vcGesture({
                        direction: 'horizontal'
                    }, { passive: false }).on('gestureend', function (e, data) {
                        // gesturestart gesturemove gestureend gesturecancel
                        /* 탭 방향 전환 */
                        console.log("gesture end@@@")
                        if (data.direction === 'left') {
                            tab.nav.next();
                        } else {
                            tab.nav.prev();
                        }
                    });

                    /* 탭 클릭시 인덱스를 세션스토리지에 기록 */
                    var store = window.sessionStorage;
                    var session_name = 'care_cecommended_tabindex';
                    care_tabs.find('a').on('click', function () {
                        var idx = $(this).parent().index();
                        store.setItem(session_name, idx);
                    });

                    /* 리로드시 탭 인덱스 세션이 있을 경우 트리거 */
                    if (store.getItem(session_name)) {
                        care_tabs.find('a').eq(store.getItem(session_name)).trigger('click');
                    }

                    /* //케어솔루션 추천 제품 스와이프 및 히스토리 탭토글 기능 추가 : 2021-05-10 */
                    $context.find('.care-recommended').find('.ui_product_carousel_slider').vcCarousel({
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        variableWidth : false,
                        cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                        speed: 150,
                        touchThreshold: 100,
                        responsive: [
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,   
                                }
                            },
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    
                                }
                            }
                            /* , { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } } */
                        ]
                    });


                }                

            },function(err){
                $context.find('.care-recommended').hide();
            });    

        }

        requestTab();
        
        /*

        function buildTabProduct(result){

            var data = result.data;
            if(data && data.data){
                var arr = data.data;               


                var list = vcui.array.map(arr, function(item, index){

                    var years1TotAmt = parseInt(item['years1TotAmt'] || "0");
                    if(years1TotAmt!==0){ 
                        item['years1TotAmt'] = '월 '+vcui.number.addComma(years1TotAmt) + '원';
                    }else{
                        item['years1TotAmt'] = null;
                    }

                    return item;
                });

                return vcui.template(itemTmpl, {list:list});
            }

        }


        


        $('.ui_product_tab').on('tabbeforechange tabchange tabinit', function(e,data){               

            if(e.type =='tabbeforechange' || e.type=='tabinit'){

                $(data.content).css({opacity:0});

                var len = $(data.content).find('.ui_carousel_track > li').length;
                if(len>0) return;
                e.preventDefault();

                var url = $(data.relatedTarget).data('ajaxUrl') || careProductUrl;
                              
                lgkorUI.requestAjaxDataFailCheck(url, {}, function(result){
                    
                    var html = buildTabProduct(result);
                    $(data.content).find('.ui_carousel_track').empty().append(html);
                    $('.ui_product_tab').vcTab('select', data.selectedIndex, true );

                    $(data.content).find('.ui_product_carousel_slider').vcCarousel({
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        variableWidth : false,
                        // centerMode:true,
                        responsive: [
                            {
                                breakpoint: 10000,
                                settings: {
                                    // variableWidth : false,
                                    slidesToShow: 4,
                                    slidesToScroll: 1, 
                                }
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    // variableWidth : false,
                                    slidesToShow: 3,
                                    slidesToScroll: 1,   
                                }
                            },
                            {
                                breakpoint: 900,
                                settings: {
                                    // variableWidth : false,
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    // variableWidth : false,
                                    slidesToShow: 1, 
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });

                    $(data.content).transit({opacity:1});
                    
                }, function(err){
                    // console.log(err);
                });
            }else if(e.type=='tabchange'){

                $(data.content).transit({opacity:1});
            }

                

        }).vcTab({selectors:{
            prevButton:".ui_smooth_prev",
            nextButton:".ui_smooth_next",
            smoothScroll:'.ui_smooth_tab'
        }});
        */
    });    
});