/*
"modelStatusCode":"ACTIVE",
"mediumImageAddr":"/kr/images/lg-homebrew/md08747121/md08747121-350x350.jpg",
"modelId":"MD08747121",
"modelUrlPath":"/care-solutions/lg-homebrew/bb052s",
"smallImageAddr":"/kr/images/lg-homebrew/md08747121/md08747121-280x280.jpg",
"salesModelCode":"BB052S",
"years1TotAmt":49900,
"categoryName":"맥주제조기",
"salesSuffixCode":"AKOR",
"largeImageAddr":"/kr/images/lg-homebrew/md08747121/md08747121-450x450.jpg",
"modelName":"BB052S",
"rtModelSeq":"1545027",
"modelDisplayName":"LG 홈브루",
"categoryId":"CT50000087"
*/


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
    '                   <button type="button" class="btn border ui_care_detail_btn" data-url="{{obj.modelUrlPath}}"><span>자세히 보기</span></button>\n'+
    '               </div>\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>\n'+
    '{{/each}}'

$(function(){
    vcui.require(['ui/carousel','ui/tab','libs/jquery.transit.min'], function () {

        // 제품 코드 관리 부분

        $('.ui_carousel_slider').vcCarousel({
            infinite: false,
            autoplay: false,
            slidesToScroll: 1,
            slidesToShow: 1
        });

        // 플로우배너

        $('.ui_carousel_slider_banner').vcCarousel({
            infinite: true,
            //autoplay: true,
            //autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth : true,
            centerMode: true,
            centerPadding: '13.5%',
            dots: false,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        dots: true,
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
                        dots: true,
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
                        dots: true,
                        slidesToShow: 1, 
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '25%',
                    }
                }
            ]
        });
        

        $('.ui_carousel_slider_banner2').vcCarousel({
            infinite: true,
            //autoplay: true,
            autoplaySpeed: 1800,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth : true,
            dots: false,

            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: true,
                        //autoplay: true,
                        variableWidth : false,
                        dots: true,
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
                        dots: true,
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
                        dots: true,
                        slidesToShow: 2, 
                        slidesToScroll: 1
                    }
                }
            ]
        });

        

        // 케어솔루션 혜택
        // 다른 케어솔루션 
        $(window).on('breakpointchange', function(e){

            var breakpoint = window.breakpoint;    
            if(breakpoint.name == 'mobile'){    
                $('.ui_carousel_m1_slider').vcCarousel({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                
            }else if(breakpoint.name == 'pc'){    
                $('.ui_carousel_m1_slider').vcCarousel('destroy');       
                $('.ui_carousel_m1_slider').find('.indi-wrap').hide();                     
            }    
        });
        $(window).trigger('breakpointchange');

        // 케어솔루션 가이드
        $('.care-guide-visual .ui_carousel_slider2').vcCarousel({
            infinite: false,
            centerMode: true,
            //centerPadding: '25%',
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth : true,
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


        $(document).on('click', '.ui_care_detail_btn', function(e){
            e.preventDefault();
            var $target = $(e.currentTarget);
            var url = $target.data('url');
            if(url) location.href = url;
        });

        var careProductUrl = '/lg5-common/data-ajax/home/storeCareProductList.json';


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
                        // centerMode : true,
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
    });    
});