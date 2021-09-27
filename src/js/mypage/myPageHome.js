(function(){
    var myHome = {
        likeProdTemplate: '<ul class="product-items">'+
                '{{#each item in list}}'+                                                  
                    '<li>'+
                        '<div class="item">'+                
                            '<div class="product-image" aria-hidden="true">'+
                                '<a href="{{item.pdpUrl}}">'+
                                    '<img src="{{item.imageUrl}}" alt="{{item.imageAlt}}">'+
                                '</a>'+                    
                            '</div>'+
                        '<div class="product-contents">'+
                            '<div class="product-info">'+
                                '<div class="product-name">'+
                                    '<a href="{{item.pdpUrl}}">{{#raw item.title}}</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        
                        /* BTOCSITE-5387 시그니처 모델 가격 정책 : 2021-09-27 */
                        '<div class="price-area">'+

                            '{{#if item.addCommaOriginalPrice == 0}}'+

                                '<div class="total">'+
                                    '<em class="blind">구매가격</em>'+
                                    '<span class="price">{{item.addCommaPrice}}<em>원</em></span>'+
                                '</div>'+
                
                            '{{#else}}' + 

                                '{{#if item.addCommaOriginalPrice != "0"}}'+
                                    '<div class="original">'+
                                        '<em class="blind">할인 전 정가</em>'+
                                        '<span class="price">{{item.addCommaOriginalPrice}}<em>원</em></span>'+
                                    '</div>'+
                                '{{/if}}'+
                                '{{#if item.addCommaPrice != "0"}}'+
                                    '<div class="total">'+
                                        '<em class="blind">할인 후 판매가</em>'+
                                        '<span class="price">{{item.addCommaPrice}}<em>원</em></span>'+
                                    '</div>'+
                                '{{/if}}'+

                            '{{/if}}'+


                        '</div>'+
                        /* //BTOCSITE-5387 시그니처 모델 가격 정책 : 2021-09-27 */

                    '</div>'+
                '</li>'+
            '{{/each}}'+
        '</ul>',
        noDataTemplate:'<div class="no-data"><span>{{#raw msg}}</span></div>',

        init: function() {
            var self = this;

            //크레마
            lgkorUI.cremaLogin();
            
            //
            var cremaReviewTemplate =
                (vcui.detect.isMobile) ? '<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}" review-source="mobile_my_orders">리뷰작성</a>':'<a href="#" class="crema-new-review-link btn border size" data-product-code="{{enModelName}}">리뷰작성</a>';
            
            var $li = $('li.review-here[data-model-code]');       
            $li.each(function(index, item){
                if(item.dataset.reviewFlag.toLowerCase() == "s") {
                    var enModelName = item.dataset.modelCode;
                    $(item).append(vcui.template(cremaReviewTemplate, {"enModelName":enModelName}));
                }
            });

            //크레마# 이동 막음
            $li.on('click','a.crema-new-review-link', function(e) {
                if($(this).attr('href') == "#") {
                    e.preventDefault();
                }
            });

            //크레마 리로드
            lgkorUI.cremaReload();

            self.setting();
        },

        setting: function(){
            var self = this;

            //
            var sendUrl = $('.contents.mypage.mypage-main').data("memberInfo");
            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(sendUrl, {}, function(result){
                for(var key in result){
                    var addCommaNum = vcui.number.addComma(result[key]);
                    $('.my-info').find('.' + key).text(addCommaNum);
                }  
            });   

            sendUrl = $('.contents.mypage.mypage-main').data("mypageInfo");
            lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(sendUrl, {}, function(result){
                if(result.status == "fail"){
                    lgkorUI.alert("", {
                        title: result.message
                    })
                } else{
                    //주문조회...
                    var cntxt;
                    var orderList = result.orderList;
                    var $orderProcess = $('.my-management.shopping .order-process');
                    var cnt = orderList.data.myShoppingCnt;
                    $orderProcess.find('.box-title .title').text("주문 조회(" + cnt + ")");
                    if(orderList.dataFlag == "Y"){                        
                        var num, key, numwrap;
                        var numberData = orderList.data.normalData;
                        var listwrap = $orderProcess.find('.process-wrap > ul > li:nth-child(1) .process-list');
                        for(key in numberData){
                            num = numberData[key];
                            numwrap = listwrap.find('.' + key);
                            numwrap.text(num);
                            numwrap.removeClass('zero');
                            
                            if(parseInt(num) <= 0) numwrap.addClass('zero');
                        }

                        numberData = orderList.data.caresolutionData;
                        listwrap = $orderProcess.find('.process-wrap > ul > li:nth-child(2) .process-list');
                        for(key in numberData){
                            num = numberData[key];
                            numwrap = listwrap.find('.' + key);
                            numwrap.removeClass('zero');

                            if(key == "complete" && parseInt(num) > 0){
                                var numtxt = "<a href='" + orderList.data.completeUrl + "'>" + num + "</a>";
                                numwrap.text("").html(numtxt);
                            } else{
                                numwrap.text(num);
                            }
                            
                            if(parseInt(num) <= 0) numwrap.addClass('zero');
                        }
                    } else{
                        $orderProcess.find('.process-wrap').empty().append(vcui.template(self.noDataTemplate, {msg:orderList.data.message}));
                    }

                    //찜한제품...
                    var wishList = result.wishList;
                    var $likeInfo = $('.my-management.shopping .like-info');
                    $likeInfo.find('.list-wrap').empty();
                    if(wishList.dataFlag == "Y"){                  
                        cnt = wishList.data.wishCnt;
                        cntxt = parseInt(cnt) > 0 ? "(" + cnt + ")" : "";
                        $likeInfo.find('.box-title .title').text("찜한 제품" + cntxt);

                        var newlist = vcui.array.map(wishList.data.list, function(item){
                            item.addCommaOriginalPrice = vcui.number.addComma(item.originalPrice);
                            item.addCommaPrice = vcui.number.addComma(item.price);

                            return item;
                        });

                        $likeInfo.find('.list-wrap').append(vcui.template(self.likeProdTemplate, {list:newlist}));
                    } else{
                        $likeInfo.find('.box-title .title').text("찜한 제품");
                        $likeInfo.find('.list-wrap').append(vcui.template(self.noDataTemplate, {msg:wishList.data.message}));
                    }
                }          
            });   
        }
    }

    $(document).ready(function() {
        myHome.init();
        //myHome.setting();
    });
})();