
(function(){
    var EVT_ItemTemplate = '{{#each item in eventList}}'+
        '<div class="slide-conts ui_carousel_slide">'+
            '<a href="{{item.eventUrl}}" class="slide-box">'+ //data-ec-product="{{item.ecProduct}}" 데이터 전달
                '<span class="thumb" aria-hidden="true">'+
                    '<img src="{{item.eventListThumbnailPath}}" alt="">'+
                '</span>'+
                '<div class="info">'+
                    '<div class="flag-wrap bar-type">'+
                        '<span class="flag">'+
                            '<span class="blind">이벤트 구분</span>'+
                            '{{item.eventGubun}}'+
                        '</span>'+
                        '<span class="flag">'+
                            '<span class="blind">이벤트 유형</span>'+
                            '{{item.eventType}}'+
                        '</span>'+
                    '</div>'+
                    '<p class="tit">'+
                        '<span class="blind">이벤트 제목</span>'+
                        '{{item.eventTitle}}'+
                    '</p>'+
                    '<p class="date">'+
                        '<span class="blind">이벤트 기간</span>'+
                        '{{item.eventFromDate}} ~ {{item.eventToDate}}'+
                    '</p>'+
                '</div>'+
            '</a>'+
        '</div>'+
    '{{/each}}';



    $(function() {
        
        var evtDetail_SlideList = {
            init: function(){
                var self = this;
                self.setting();
                self.bindEvents();
            },
            

            setting: function() {
                var self = this;
                
                var EVT_detail_slideList = $('.ui_carousel_4_slider').find('.slide-track');
                var ajaxUrl = $('.evt_slide_warp').attr('data-list-url');
                console.log('ajaxUrl', ajaxUrl)
                lgkorUI.requestAjaxData(ajaxUrl, {}, function(result) {
                    

                    var list = result.data[0];


                    for(var key in list.eventList){
                        var item = list.eventList[key];

                        // function getEcCategoryName(item){
                        //     if( item.subCategoryName == "" || item.subCategoryName == undefined) {
                        //         return item.superCategoryName + "/" + item.categoryName 
                        //     } else {
                        //         return item.superCategoryName + "/" + item.categoryName  + '/' + item.subCategoryName
                        //     }
                        // }
                        // var ecProduct = {
                        //     "model_name": item.eventTitle,
                        //     "model_id": item.modelId,
                        //     "model_sku": item.modelName, 
                        //     "model_gubun": item.modelGubunName,
                        //     "price": vcui.number.addComma(item.obsOriginalPrice), 
                        //     "discounted_price": vcui.number.addComma(item.obsSellingPrice), 
                        //     "brand": "LG",
                        //     "category": getEcCategoryName(item),
                        //     "ct_id": item.subCategoryId
                        // }
                        // item.ecProduct = JSON.stringify(ecProduct);
                    }
                    console.log(list)
                    EVT_detail_slideList.empty().append(vcui.template(EVT_ItemTemplate, list)); // BTOCSITE-5938-455
                    
                    //슬라이드 옵션
                    $('.ui_carousel_4_slider').vcCarousel('setOption', 'responsive', [
                        {
                            breakpoint: 768,
                            settings: {
                                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                                speed: 150,
                                touchThreshold: 100,
                                infinite: false,
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                arrows:false,
                                dots:false,
                                variableWidth:true,
                                outerEdgeLimit: true,
                            }
                        },
                        {
                            breakpoint: 20000,
                            settings: {
                                infinite: false,
                                prevArrow:'.btn-arrow.prev',
                                nextArrow:'.btn-arrow.next',
                                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                                speed: 150,
                                touchThreshold: 100,
                                dots: true,
                                variableWidth:false,
                                outerEdgeLimit: false,
                                slidesToShow: 4,
                                slidesToScroll: 4,
                            }
                        }
                    ]).vcCarousel('reinit') // //슬라이드 비동기 처리 : dev 반영시 안되는 문제 responsive, vcCarousel('reinit') 추가
                    
                });

            },

            bindEvents: function() {
                var self = this;
            },
        }

        evtDetail_SlideList.init();
    });
})();