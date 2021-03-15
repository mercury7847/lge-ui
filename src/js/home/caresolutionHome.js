

// /lg5-common/images/dummy/temp/img-care-01.jpg

var itemTmpl = '{{#each obj in list}}\n'+
    '<li class="item ui_carousel_slide">\n'+
    '   <div class="prd-care-vertical ">\n'+
    '       <div class="img-wrap">\n'+
    '           <a href="{{obj.modelUrlPath}}">\n'+
    '               <img src="{{obj.mediumImgAddr}}" alt="{{obj.modelDisplayName}}" onError="lgkorUI.addImgErrorEvent(this)">\n'+
    '           </a>\n'+
    '       </div>\n'+
    '       <div class="txt-wrap">\n'+
    '           <p class="tit"><span class="blind">{{obj.modelDisplayName}}</p>\n'+
    '           <p class="code"><span class="blind">제품 코드</span>{{obj.modelId}}</p>\n'+
    '       </div>\n'+
    '       <div class="info-wrap">\n'+
    '           <div class="price-wrap">\n'+
    '               <div class="total-price">\n'+
    '                   {{#if obj.totalPrice}}'+
    '                       <p class="price">{{obj.totalPrice}}</p>\n'+
    '                   {{/if}}'
    '                   <button type="button" class="btn border" data-url={{obj.modelUrlPath}}><span>담기</span></button>\n'+
    '               </div>\n'+
    '           </div>\n'+
    '       </div>\n'+
    '   </div>\n'+
    '</li>\n'+
    '{{/each}}'

$(function(){
    vcui.require(['ui/carousel','ui/tab'], function () {

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
                /*
                {
                    breakpoint: 900,
                    settings: {
                        infinite: true,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerMode: true,
                        centerPadding: '26.5%',
                    }
                },*/
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

        // 케어솔루션 추천제품 
        $('.ui_carousel_slider1').vcCarousel({
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            variableWidth : true,
            responsive: [
                {
                    breakpoint: 10000,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 4,
                        slidesToScroll: 1, 
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,   
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        infinite: false,
                        variableWidth : false,
                        dots: true,
                        slidesToShow: 1, 
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

        $('.ui_product_tab').on('tabbeforechange tabinit', function(e,data){

            if(e.type=='tabinit'){

            }else{
                e.preventDefault();
                $('.ui_product_tab').vcTab('select', data.selectedIndex, true );
            }
            

        }).vcTab({selectors:{
            prevButton:".ui_smooth_prev",
            nextButton:".ui_smooth_next",
            smoothScroll:'.ui_smooth_tab'
        }});
    });    
});