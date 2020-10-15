
(function(){

    var _listItemTemplate =
        '<li class="item">'+
        '   <div class="prd-care-vertical">'+
        '       <span class="chk-wrap">'+
        '           <input type="checkbox" id="check1" name="check1" checked="">'+
        '           <label for="check1"><span class="blind">선택함</span></label>'+
        '       </span>'+
        '       <div class="img-wrap">'+
        '           <a href="#n">'+
        '               <img src="/lg5-common/images/dummy/@sample-226x226.jpg" alt="제품 이미지" style="opacity: 1;">'+
        '           </a>'+
        '       </div>'+
        '       <div class="txt-wrap">'+
        '           <p class="tit">'+
        '               <a href="#n">'+
        '                   <span class="blind">제품 디스플레이 네임</span>'+
        '                   스팀 건조기ThinQ (듀얼 인버터 히트펌프) 모델명이 두줄로 들어갈수 있음 모델명이 두줄로 들어갈수 있음 모델명이 두줄로 들어갈수 있음'+
        '               </a>'+
        '           </p>'+
        '           <p class="code"><span class="blind">제품 코드</span>WU900AS 코드값 한줄 처리 코드값 한줄 처리 코드값 한줄 처리 코드값 한줄 처리 코드값 한줄 처리</p>'+
        '       </div>'+
        '       <div class="info-wrap">'+
        '           <div class="opt-info">'+
        '               <dl>'+
        '                   <dt>색상</dt>'+
        '                   <dd class="color-opt" role="radiogroup">'+
        '                       <div class="slide-wrap ui_carousel_slider2 ui_carousel_initialized ui_carousel_slider" ui-modules="Carousel">'+
        '                           <div class="slide-content ui_carousel_list ui_static draggable" style="overflow: hidden;">'+
        '                               <div class="slide-track ui_carousel_track ui_static" style="opacity: 1; width: 176px; transform: translate3d(0px, 0px, 0px);">'+     

        '                                   <div class="slide-conts ui_carousel_slide ui_carousel_current on" data-ui_carousel_index="0" style="float: left; width: 44px;" aria-hidden="false" role="tabpanel" id="ui_carousel_slide170" aria-describedby="ui_carousel_slide-control170">'+
        '                                       <div role="radio" class="chk-wrap-colorchip LeatherYellow" title="LeatherYellow">'+
        '                                           <input type="radio" id="product1-color1" name="product1" checked="" tabindex="">'+
        '                                           <label for="product1-color1"><span class="blind">LeatherYellow</span></label>'+
        '                                       </div>'+
        '                                   </div>'+       
                                        
        '                               </div>'+
        '                           </div>'+
        '                           <div class="slide-controls">'
        '                               <button type="button" class="btn-arrow prev ui_carousel_prev ui_carousel_arrow disabled" aria-disabled="true" disabled="" style="display: inline-block;"><span class="blind">이전</span></button>'+
        '                               <button type="button" class="btn-arrow next ui_carousel_next ui_carousel_arrow" aria-disabled="false" style="display: block;"><span class="blind">다음</span></button>'+
        '                           </div>'+
        '                       </div>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>가입비</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
        '                           '+
        '                           <li>'
        '                               <span class="rdo-wrap">'+
        '                                   <input type="radio" id="rdo1-1" name="rdo1-1" checked="">'+
        '                                   <label for="rdo1-1">납부</label>'+
        '                               </span>'+
        '                           </li>'+
                                
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>의무사용</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
                                
        '                           <li>'+
        '                               <span class="rdo-wrap">'+
        '                                   <input type="radio" id="rdo1-2-1" name="rdo1-2" checked="">'+
        '                                   <label for="rdo1-2-1">3년</label>'+
        '                               </span>'+
        '                           </li>'+
        
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+
        '               <dl>'+
        '                   <dt>방문주기</dt>'+
        '                   <dd>'+
        '                       <ul class="rdo-tab-wrap" role="radiogroup">'+
                                
        '                           <li>'+
        '                               <span class="rdo-wrap">'+
        '                                   <input type="radio" id="rdo1-3-1" name="rdo1-3" checked="">'+
        '                                   <label for="rdo1-3-1">1개월</label>'+
        '                               </span>'+
        '                           </li>'+
                                
        '                       </ul>'+
        '                   </dd>'+
        '               </dl>'+
        '           </div>'+
        '           <dl class="price-info">'+
        '               <dt>월 요금</dt>'+
        '               <dd>40,900원</dd>'+
        '           </dl>'+
        '       </div>'+
        '   </div>'+
        '</li>';

    var putItemTemplate = 
        '<div class="conts-wrap">'+
        '   <div class="prd-care-horizon">'+
        '       <div class="flag-wrap">'+
        '           <span class="flag"><span class="blind">서비스명</span>케어솔루션</span>'+
        '       </div>'+
        '       <div class="img-wrap">'+
        '           <img src="/lg5-common/images/dummy/@sample-150x150.jpg" alt="제품 이미지" style="opacity: 1;">'+
        '       </div>'+
        '       <div class="txt-wrap">'+
        '           <div class="tit-info">'+
        '               <p class="tit"><span class="blind">제품 디스플레이 네임</span>스팀 건조기ThinQ&nbsp;(듀얼 인버터 히트펌프) 두줄 텍스트 두줄 텍스트 두줄 텍스트 두줄 텍스트</p>'+
        '               <p class="code"><span class="blind">제품 코드</span>WU900AS</p>'+
        '           </div>'+
        '           <p class="etc">월 61,900원</p>'+
        '       </div>'+            
        '       <div class="del-item">'+
        '           <button type="button" class="btn-del" tabindex=""><span class="blind">제품 삭제</span></button>'+
        '       </div>'+            
        '   </div>'+
        '</div>';

    var _totalContract;
    var _prodListUrl;

    function init(){
        _totalContract = $('.ui_total_prod').data('prodTotal');
        console.log("_totalContract: " + _totalContract);

        _prodListUrl = $('.care-solution-wrap').data("prodList");
        console.log("_prodListUrl: " + _prodListUrl);
    }


    vcui.require(['ui/carousel'], function () {
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
    });

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();